// Negative capability probes: passing extraction does not establish shaping fidelity.
import { init } from '@embedpdf/pdfium';
import { readFileSync, writeFileSync } from 'node:fs';
import { PdfEngine } from './engine.mjs';
const e=new PdfEngine(await init({wasmBinary:readFileSync('node_modules/@embedpdf/pdfium/dist/pdfium.wasm')}));
const results=[];
for(const [script,text] of [['Latin','HELLO'],['Devanagari','नमस्ते'],['Arabic','مرحبا'],['CJK','你好']]){
 const h=e.open(readFileSync('tmp/engine-spike/native-original.pdf')),p=e.page(h);
 e.replace(p,0,text);const bytes=e.save(h);e.api.FPDF_ClosePage(p);e.close(h);
 const check=e.open(bytes),cp=e.page(check);
 results.push({script,textRoundTrip:e.text(cp).includes(text),shapingVerified:false});
 e.api.FPDF_ClosePage(cp);e.close(check);
}
writeFileSync('tmp/engine-spike/script-results.json',JSON.stringify(results,null,2));console.log(results);
