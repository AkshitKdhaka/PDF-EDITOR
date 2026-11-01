import { init } from '@embedpdf/pdfium';
import { PdfEngine } from '../engine.mjs';
import { imagePdf, patchPlainRegion } from '../scan.mjs';
const $=id=>document.getElementById(id),assert=(condition,message)=>{if(!condition)throw Error(message);};
let engine,output;
function canvas(id,image){const c=$(id);c.width=image.width;c.height=image.height;c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(image.data),image.width,image.height),0,0);return c;}
function imageCanvas(image){const c=document.createElement('canvas');c.width=image.width;c.height=image.height;c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(image.data),image.width,image.height),0,0);return c;}
try {engine=new PdfEngine(await init({wasmBinary:await(await fetch('pdfium.wasm')).arrayBuffer()}));$('run').disabled=false;$('run').textContent='Run local edit + OCR tests';$('status').textContent='Ready. No account or network service required.';}
catch(error){$('status').textContent=`Engine failed: ${error.message}`;window.__failure=error.message;}
$('run').onclick=async()=>{
 $('run').disabled=true;$('save').disabled=true;output=null;window.__report=null;let worker;
 try{
  $('status').textContent='Testing native text replacement…';
  const original=new Uint8Array(await(await fetch('native-original.pdf')).arrayBuffer());
  const h=engine.open(original),p=engine.page(h);let before,after;
  try{const runs=engine.runs(p);before=engine.render(p);engine.replace(p,runs[0].index,'EDITED WORD');after=engine.render(p);output=engine.save(h);}finally{engine.api.FPDF_ClosePage(p);engine.close(h);}
  const check=engine.open(output),cp=engine.page(check);try{const t=engine.text(cp);assert(t.includes('EDITED WORD')&&!t.includes('ORIGINAL'),'Native round trip failed');}finally{engine.api.FPDF_ClosePage(cp);engine.close(check);}
  canvas('before',before);canvas('after',after);
  $('status').textContent='Recognizing the synthetic scan with bundled English OCR…';
  worker=await Tesseract.createWorker('eng',1,{workerPath:chrome.runtime.getURL('ocr/worker.min.js'),corePath:chrome.runtime.getURL('ocr'),langPath:chrome.runtime.getURL('ocr'),workerBlobURL:false,gzip:true,cacheMethod:'none'});
  const recognition=await worker.recognize(imageCanvas(before),{},{text:true,blocks:true});
  assert(recognition.data.text.includes('ORIGINAL WORD'),'Source OCR failed');
  const words=recognition.data.blocks.flatMap(b=>b.paragraphs.flatMap(p=>p.lines.flatMap(l=>l.words)));
  const target=words.find(w=>w.text==='ORIGINAL');assert(target,'OCR target not found');
  const patched=patchPlainRegion(before,after,[75,Math.max(0,target.bbox.y0-8),410,Math.min(before.height,target.bbox.y1+8)]);
  const scanBytes=imagePdf(engine,patched,420,220),sh=engine.open(scanBytes),sp=engine.page(sh);let raster;
  try{assert(engine.text(sp)==='','Scan unexpectedly contains native text');raster=engine.render(sp);}finally{engine.api.FPDF_ClosePage(sp);engine.close(sh);}
  const recognized=await worker.recognize(imageCanvas(raster));assert(recognized.data.text.includes('EDITED WORD')&&!recognized.data.text.includes('ORIGINAL'),'Edited scan OCR failed');
  window.__report={nativeRoundTrip:'pass',localOcr:'pass',scanPixelEditRoundTrip:'pass',runtime:'MV3 extension',assets:'bundled',scope:'Synthetic English fixture only; approximate scan reconstruction'};
  $('result').textContent=JSON.stringify(window.__report,null,2);$('status').textContent='Tests passed. Native output available below.';$('save').disabled=false;
 }catch(error){window.__failure=error.message;$('status').textContent=`Test failed: ${error.message}`;$('result').textContent=error.stack;}
 finally{if(worker)await worker.terminate();$('run').disabled=false;}
};
$('save').onclick=()=>{if(!output)return;const url=URL.createObjectURL(new Blob([output],{type:'application/pdf'}));const a=document.createElement('a');a.href=url;a.download='synthetic-native-edited.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);};
