import { createWorker } from 'tesseract.js';
import { init } from '@embedpdf/pdfium';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PNG } from 'pngjs';
import assert from 'node:assert/strict';
import { PdfEngine } from './engine.mjs';
import { imagePdf, patchPlainRegion } from './scan.mjs';
const out='tmp/engine-spike';
const e=new PdfEngine(await init({wasmBinary:readFileSync('node_modules/@embedpdf/pdfium/dist/pdfium.wasm')}));
const original=PNG.sync.read(readFileSync(`${out}/native-before.png`));
const replacement=PNG.sync.read(readFileSync(`${out}/native-after.png`));
const scanned=imagePdf(e,original,420,220);writeFileSync(`${out}/scan-original.pdf`,scanned);
const h=e.open(scanned),p=e.page(h);assert.equal(e.text(p),'');e.api.FPDF_ClosePage(p);e.close(h);
const worker=await createWorker('eng',1,{langPath:resolve('node_modules/@tesseract.js-data/eng/4.0.0'),cachePath:resolve('tmp/ocr-cache'),gzip:true});
try {
 const before=await worker.recognize(readFileSync(`${out}/native-before.png`),{}, {text:true,blocks:true});
 assert(before.data.text.includes('ORIGINAL WORD'));
 const words=before.data.blocks.flatMap(b=>b.paragraphs.flatMap(p=>p.lines.flatMap(l=>l.words)));
 const target=words.find(w=>w.text==='ORIGINAL');assert(target);
 // Expand recognized word bounds to the known line in this synthetic fixture.
 const box=[75,Math.max(0,target.bbox.y0-8),410,Math.min(original.height,target.bbox.y1+8)];
 const patched=patchPlainRegion(original,replacement,box);
 const bytes=PNG.sync.write({...patched,data:Buffer.from(patched.data)});
 const after=await worker.recognize(bytes);assert(after.data.text.includes('EDITED WORD'));assert(!after.data.text.includes('ORIGINAL'));assert(after.data.text.includes('Untouched content stays here.'));
 writeFileSync(`${out}/scan-after.png`,bytes);
 const pdf=imagePdf(e,patched,420,220);writeFileSync(`${out}/scan-edited.pdf`,pdf);
 const check=e.open(pdf),cp=e.page(check),render=e.render(cp);e.api.FPDF_ClosePage(cp);e.close(check);
 const roundTrip=await worker.recognize(PNG.sync.write({...render,data:Buffer.from(render.data)}));assert(roundTrip.data.text.includes('EDITED WORD'));assert(!roundTrip.data.text.includes('ORIGINAL'));
 const result={localOcr:'pass',model:'eng@1.0.0 / 4.0.0',sourceImageOnly:true,visiblePixelReplacement:true,reopenedPdfOcr:'pass',fidelity:'approximate',scope:'Synthetic English scan with known white background; no arbitrary scan reconstruction claim'};
 writeFileSync(`${out}/ocr-results.json`,JSON.stringify(result,null,2));console.log(result);
}finally{await worker.terminate();}
