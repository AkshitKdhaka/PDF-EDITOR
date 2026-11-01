export class PdfClient {
 constructor(){this.id=crypto.randomUUID();this.pending=new Map();this.worker=new Worker(new URL('pdf-worker.js',import.meta.url),{type:'module'});this.worker.onmessage=({data})=>{
  if(data?.protocolVersion!==1||data.sessionId!==this.id||data.baseRevision!==0)return;
  const pending=this.pending.get(data.requestId);if(!pending)return;clearTimeout(pending.timer);this.pending.delete(data.requestId);
  if(data.ok===true&&data.result)pending.resolve(data.result);else pending.reject(Object.assign(new Error('Worker request failed'),{code:data.error?.code??'ENGINE_FAILED'}));
 };this.worker.onerror=()=>this.stop('ENGINE_FAILED');}
 request(operation,payload){return new Promise((resolve,reject)=>{const requestId=crypto.randomUUID(),timer=setTimeout(()=>this.stop('TIMEOUT'),30000);this.pending.set(requestId,{resolve,reject,timer});this.worker.postMessage({protocolVersion:1,requestId,sessionId:this.id,baseRevision:0,operation,payload});});}
 stop(code='CANCELED'){this.worker.terminate();for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(Object.assign(new Error(code),{code}));}this.pending.clear();}
}
