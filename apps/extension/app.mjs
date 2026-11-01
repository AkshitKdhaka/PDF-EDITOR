import { PdfClient } from './client.mjs';
const $=id=>document.getElementById(id);
let active=null,pending=null,token=0,passwordJob=null;
const errors={INVALID_PDF:'This file could not be read as a PDF. Choose a valid PDF.',LIMIT_EXCEEDED:'This document or page exceeds the preview limits (50 MiB, 200 pages, or 25 million rendered pixels).',UNSUPPORTED:'This page cannot be displayed safely in this preview.',TIMEOUT:'Processing took too long. Try a smaller document or lower zoom.',ENGINE_FAILED:'The PDF worker stopped. Your previous preview is still available; try again.',INVALID_REQUEST:'The requested page or zoom is unavailable.',WRONG_PASSWORD:'That password did not unlock the PDF. Try again.'};
function controls(busy){$('cancel').hidden=!busy;$('prev').disabled=busy||!active||active.index===0;$('next').disabled=busy||!active||active.index===active.count-1;$('zoom').disabled=busy||!active;for(const b of $('pages').children)b.disabled=busy;}
function cancel(){token++;if(pending){pending.client?.stop();if(active?.client===pending.client)active.client=null;pending=null;}passwordJob=null;if($('password-dialog').open)$('password-dialog').close();$('password').value='';if(active)$('zoom').value=String(active.scale);controls(false);$('status').textContent=active?'Canceled. Previous page retained.':'Ready to open a PDF.';}
function display(result,name){
 if(!(result.data instanceof Uint8ClampedArray)||result.data.length!==result.width*result.height*4||!Array.isArray(result.regions))throw Error('Invalid worker result');
 const c=$('page');c.width=result.width;c.height=result.height;c.getContext('2d').putImageData(new ImageData(result.data,result.width,result.height),0,0);c.hidden=false;$('empty').hidden=true;
 $('filename').textContent=name;$('summary').textContent=`${result.pageCount} page${result.pageCount===1?'':'s'} · Local session`;$('page-label').textContent=`Page ${result.pageIndex+1} of ${result.pageCount}`;$('zoom').value=String(result.scale);
 const names={native:'Native text',mixed:'Text and images', 'image-only':'Image-only page',unsupported:'View-only content'};
 $('kind').textContent=names[result.kind]??'View-only content';
 $('description').textContent={native:'Text was found. Font coverage and safe editing still need verification.',mixed:'Both text and images were found. Images may be scans or decorative graphics; OCR need is not yet confirmed.','image-only':'No extractable text was found. This may be a scan or an image; local OCR will be needed to recognize any wording.',unsupported:'No directly extractable text or images were found. This may be a blank page, outlined text, or vector artwork.'}[result.kind];
 $('counts').textContent=`${result.counts.text} text objects · ${result.counts.image} images · ${result.counts.other} other objects`;
 $('runs').replaceChildren();for(const r of result.regions.filter(r=>r.type==='text'&&r.text.trim())){const div=document.createElement('div');div.className='run';div.dir='auto';div.textContent=r.text;const note=document.createElement('small');note.textContent=r.nested?'Nested text · view only':'Text candidate · editing not enabled';div.append(note);$('runs').append(div);}
 if(!$('runs').children.length)$('runs').textContent='No extractable text on this page.';
 $('pages').replaceChildren();for(let i=0;i<result.pageCount;i++){const b=document.createElement('button');b.textContent=`Page ${i+1}`;if(i===result.pageIndex)b.setAttribute('aria-current','page');b.onclick=()=>navigate(i);$('pages').append(b);}
}
async function importBytes(file,bytes,password='',jobToken){
 const current=jobToken??++token,client=new PdfClient();pending={client};controls(true);$('status').textContent='Opening and inspecting locally…';$('error').hidden=true;
 try{
  const result=await client.request('inspect',{bytes,password,pageIndex:0,scale:1});if(current!==token){client.stop();return;}
  display(result,file.name);active?.client?.stop();active={client,bytes,password,name:file.name,index:0,count:result.pageCount,scale:1};pending=null;controls(false);$('status').textContent='Ready. Viewing and inspection only; your original is unchanged.';
 }catch(e){client.stop();if(current!==token)return;pending=null;controls(false);
  if(['PASSWORD_REQUIRED','WRONG_PASSWORD'].includes(e.code)){passwordJob={file,bytes};$('password-message').textContent=e.code==='WRONG_PASSWORD'?errors.WRONG_PASSWORD:'Enter the PDF password. It stays in memory until this document is closed.';$('password').value='';$('password-dialog').showModal();$('password').focus();$('status').textContent='Waiting for the PDF password.';}
  else showError(e.code);
 }
}
function showError(code){$('error').textContent=errors[code]??'Unable to display this PDF. Try another file.';$('error').hidden=false;$('status').textContent=active?'Previous document retained.':'No document opened.';}
async function choose(file){if(!file)return;cancel();$('error').hidden=true;if(file.size>50*1024*1024){showError('LIMIT_EXCEEDED');return;}const current=++token;pending={client:null};controls(true);$('status').textContent='Reading local file…';try{const bytes=await file.arrayBuffer();if(current!==token)return;await importBytes(file,bytes,'',current);}catch{if(current===token){pending=null;controls(false);showError('INVALID_PDF');}}}
async function navigate(index,scale=active?.scale){if(!active||pending)return;const current=++token;const client=active.client??new PdfClient(),fresh=!active.client;pending={client};controls(true);$('error').hidden=true;$('status').textContent='Rendering page locally…';
 try{const result=await client.request(fresh?'inspect':'renderPage',fresh?{bytes:active.bytes,password:active.password,pageIndex:index,scale}:{pageIndex:index,scale});if(current!==token)return;display(result,active.name);active.client=client;active.index=index;active.scale=scale;pending=null;controls(false);$('status').textContent='Ready. Viewing and inspection only; your original is unchanged.';}
 catch(e){client.stop();if(current!==token)return;active.client=null;pending=null;controls(false);$('zoom').value=String(active.scale);showError(e.code);}
}
$('open').onclick=$('choose').onclick=()=>$('file').click();$('file').onchange=()=>{choose($('file').files[0]);$('file').value='';};$('cancel').onclick=cancel;
$('prev').onclick=()=>navigate(active.index-1);$('next').onclick=()=>navigate(active.index+1);$('zoom').onchange=()=>navigate(active.index,Number($('zoom').value));
$('password-form').onsubmit=e=>{e.preventDefault();const job=passwordJob,password=$('password').value;$('password-dialog').close();$('password').value='';passwordJob=null;if(job)importBytes(job.file,job.bytes,password);};$('password-cancel').onclick=cancel;$('password-dialog').addEventListener('cancel',e=>{e.preventDefault();cancel();});
for(const name of ['dragenter','dragover'])document.addEventListener(name,e=>{e.preventDefault();$('drop').classList.add('dragging');});document.addEventListener('dragleave',()=> $('drop').classList.remove('dragging'));document.addEventListener('drop',e=>{e.preventDefault();$('drop').classList.remove('dragging');if(e.dataTransfer.files.length!==1){showError('INVALID_PDF');return;}choose(e.dataTransfer.files[0]);});
window.addEventListener('pagehide',()=>{active?.client?.stop();pending?.client?.stop();active=null;passwordJob=null;});
