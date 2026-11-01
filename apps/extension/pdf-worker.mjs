import { init } from '@embedpdf/pdfium';

let api, mem, handle=0, original=0, sessionId;
const fail=code=>{throw Object.assign(new Error(code),{code});};
function alloc(size){const p=mem.wasmExports.malloc(size);if(!p)fail('LIMIT_EXCEEDED');return p;}
function free(p){mem.wasmExports.free(p);}
function dispose(){if(handle)api.FPDF_CloseDocument(handle);if(original)free(original);handle=original=0;}
async function initialize(){if(!api){api=await init({wasmBinary:await(await fetch(new URL('pdfium.wasm',self.location.href))).arrayBuffer()});mem=api.pdfium;api.PDFiumExt_Init();}}
function open(bytes,password){
 if(!(bytes instanceof ArrayBuffer)||bytes.byteLength===0)fail('INVALID_PDF');
 if(bytes.byteLength>50*1024*1024)fail('LIMIT_EXCEEDED');
 const header=new TextDecoder().decode(new Uint8Array(bytes,0,Math.min(1024,bytes.byteLength)));if(!header.includes('%PDF-'))fail('INVALID_PDF');
 if(typeof password!=='string'||password.length>1024)fail('INVALID_REQUEST');
 dispose();original=alloc(bytes.byteLength);mem.HEAPU8.set(new Uint8Array(bytes),original);
 handle=api.FPDF_LoadMemDocument(original,bytes.byteLength,password);
 if(!handle){const error=api.FPDF_GetLastError();free(original);original=0;fail(error===4?(password?'WRONG_PASSWORD':'PASSWORD_REQUIRED'):'INVALID_PDF');}
 const count=api.FPDF_GetPageCount(handle);if(count<1||count>200){dispose();fail('LIMIT_EXCEEDED');}
 return count;
}
function inspect(page){
 const regions=[],counts={text:0,image:0,other:0},ptr=alloc(16),tp=api.FPDFText_LoadPage(page);let visited=0;
 try{
  function visit(obj,path,depth){
   if(++visited>10000||depth>16)fail('LIMIT_EXCEEDED');
   const type=api.FPDFPageObj_GetType(obj);
   if(type===5){const count=api.FPDFFormObj_CountObjects(obj);for(let i=0;i<count;i++)visit(api.FPDFFormObj_GetObject(obj,i),`${path}.${i}`,depth+1);return;}
   const bounds=api.FPDFPageObj_GetBounds(obj,ptr,ptr+4,ptr+8,ptr+12)?Array.from(mem.HEAPF32.slice(ptr/4,ptr/4+4)):null;
   let text='';if(type===1){counts.text++;const size=api.FPDFTextObj_GetText(obj,tp,0,0);if(size>200000)fail('LIMIT_EXCEEDED');if(size>0){const buf=alloc(size);try{api.FPDFTextObj_GetText(obj,tp,buf,size);text=mem.UTF16ToString(buf);}finally{free(buf);}}}
   else if(type===3)counts.image++;else counts.other++;
   // Nested bounds are local to their form. Do not present them as page-space selections.
   regions.push({id:path,type:type===1?'text':type===3?'image':'unsupported',text,bounds:depth===0?bounds:null,nested:depth>0,capability:type===1&&text.trim()?'text-candidate':type===3?'ocr-candidate':'view-only'});
  }
  const count=api.FPDFPage_CountObjects(page);for(let i=0;i<count;i++)visit(api.FPDFPage_GetObject(page,i),String(i),0);
 }finally{free(ptr);if(tp)api.FPDFText_ClosePage(tp);}
 const hasText=regions.some(r=>r.type==='text'&&r.text.trim()),hasImages=counts.image>0;
 return {regions,counts,kind:hasText?(hasImages?'mixed':'native'):hasImages?'image-only':'unsupported'};
}
function render(page,scale){
 const w=api.FPDF_GetPageWidth(page),h=api.FPDF_GetPageHeight(page);
 if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0||h<=0)fail('UNSUPPORTED');
 const width=Math.ceil(w*scale),height=Math.ceil(h*scale);
 if(width*height>25000000||width>20000||height>20000)fail('LIMIT_EXCEEDED');
 const bitmap=api.FPDFBitmap_Create(width,height,1);if(!bitmap)fail('LIMIT_EXCEEDED');
 try{api.FPDFBitmap_FillRect(bitmap,0,0,width,height,0xffffffff);api.FPDF_RenderPageBitmap(bitmap,page,0,0,width,height,0,1);
  const ptr=api.FPDFBitmap_GetBuffer(bitmap),stride=api.FPDFBitmap_GetStride(bitmap),data=new Uint8ClampedArray(width*height*4);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){const s=ptr+y*stride+x*4,d=(y*width+x)*4;data[d]=mem.HEAPU8[s+2];data[d+1]=mem.HEAPU8[s+1];data[d+2]=mem.HEAPU8[s];data[d+3]=mem.HEAPU8[s+3];}
  return {width,height,data,pageWidth:w,pageHeight:h};
 }finally{api.FPDFBitmap_Destroy(bitmap);}
}
self.onmessage=async({data:m})=>{
 if(!m||typeof m.requestId!=='string'||typeof m.sessionId!=='string')return;
 const base={protocolVersion:1,requestId:m.requestId,sessionId:m.sessionId,baseRevision:0};
 try{
  if(m.protocolVersion!==1)fail('UNSUPPORTED_PROTOCOL');if(m.baseRevision!==0)fail('STALE_REVISION');
  if(!['inspect','renderPage','dispose'].includes(m.operation)||!m.payload)fail('INVALID_REQUEST');
  await initialize();
  if(m.operation==='dispose'){dispose();self.postMessage({...base,ok:true,result:{disposed:true}});return;}
  if(m.operation==='inspect'){open(m.payload.bytes,m.payload.password??'');sessionId=m.sessionId;}
  if(!handle||sessionId!==m.sessionId)fail('STALE_SESSION');
  const count=api.FPDF_GetPageCount(handle),index=m.payload.pageIndex??0,scale=m.payload.scale??1;
  if(!Number.isInteger(index)||index<0||index>=count||![0.5,0.75,1,1.25,1.5,2].includes(scale))fail('INVALID_REQUEST');
  const page=api.FPDF_LoadPage(handle,index);if(!page)fail('UNSUPPORTED');
  let result;try{result={pageCount:count,pageIndex:index,scale,...inspect(page),...render(page,scale)};}finally{api.FPDF_ClosePage(page);}
  self.postMessage({...base,ok:true,result},[result.data.buffer]);
 }catch(error){self.postMessage({...base,ok:false,error:{code:error.code??'ENGINE_FAILED',retryable:true}});}
};
