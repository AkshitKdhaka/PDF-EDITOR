// Read-only private scan OCR; emits aggregate metrics, never recognized contents.
import { init } from '@embedpdf/pdfium';
import { createWorker } from 'tesseract.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PNG } from 'pngjs';
import { createHash } from 'node:crypto';
import { PdfEngine } from './engine.mjs';
const source=process.argv[2];if(!source)throw Error('Supply local scan path');
const bytes=readFileSync(source),e=new PdfEngine(await init({wasmBinary:readFileSync('node_modules/@embedpdf/pdfium/dist/pdfium.wasm')}));
const h=e.open(bytes),p=e.page(h);let raster;
try{raster=e.render(p,2);}finally{e.api.FPDF_ClosePage(p);e.close(h);}
const worker=await createWorker('eng',1,{langPath:resolve('node_modules/@tesseract.js-data/eng/4.0.0'),cachePath:resolve('tmp/ocr-cache'),gzip:true});
try{
 const result=await worker.recognize(PNG.sync.write({...raster,data:Buffer.from(raster.data)}),{},{text:true,blocks:true});
 const report={fixture:'sample-01',operation:'Read-only local English OCR',characters:result.data.text.length,engineConfidence:result.data.confidence,groundTruthAccuracy:'Not measured',sourceUnchanged:createHash('sha256').update(bytes).digest('hex')===createHash('sha256').update(readFileSync(source)).digest('hex'),scanEditing:'Not attempted; noisy-background reconstruction unresolved'};
 writeFileSync('tmp/engine-spike/private-scan-results.json',JSON.stringify(report,null,2));console.log(report);
}finally{await worker.terminate();}
