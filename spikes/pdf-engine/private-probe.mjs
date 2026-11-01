// Optional private sample inspection. Accept a path explicitly; never print document text.
import { init } from '@embedpdf/pdfium';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PdfEngine } from './engine.mjs';
import { PNG } from 'pngjs';
import assert from 'node:assert/strict';
const source = process.argv[2]; if (!source) throw Error('Usage: node private-probe.mjs path-to-resume.pdf');
const bytes = readFileSync(source), hash = b => createHash('sha256').update(b).digest('hex');
const e = new PdfEngine(await init({ wasmBinary: readFileSync('node_modules/@embedpdf/pdfium/dist/pdfium.wasm') }));
const h = e.open(bytes), p = e.page(h), runs = e.runs(p);
const target = runs.find(r => r.text.trim() === 'Professional Summary');
if (!target) throw Error('Expected non-personal heading not found; no change made');
const before = e.render(p), replacement = 'Professional Profile ';
e.replace(p, target.index, replacement);
const after = e.render(p), style = e.runs(p).find(r => r.index === target.index);
const edited = e.save(h); e.api.FPDF_ClosePage(p); e.close(h);
const check = e.open(edited), cp = e.page(check), text = e.text(cp);
const roundTrip = text.includes(replacement.trim()) && !text.includes('Professional Summary');
const [left,bottom,right,top] = target.bounds; let outside = 0, changed = 0;
e.api.FPDF_ClosePage(cp);e.close(check);
for(let y=0;y<before.height;y++)for(let x=0;x<before.width;x++){
 const i=(y*before.width+x)*4;
 if(!before.data.slice(i,i+4).every((v,j)=>v===after.data[i+j])){
  changed++;
  if(x<Math.min(left,style.bounds[0])*2-3||x>Math.max(right,style.bounds[2])*2+3||y<before.height-Math.max(top,style.bounds[3])*2-3||y>before.height-Math.min(bottom,style.bounds[1])*2+3)outside++;
 }
}
mkdirSync('tmp/engine-spike/private',{recursive:true});
writeFileSync('tmp/engine-spike/private/resume-heading-edited.pdf',edited);
writeFileSync('tmp/engine-spike/private/resume-heading-after.png',PNG.sync.write({...after,data:Buffer.from(after.data)}));
const result={fixture:'sample-02',roundTrip,changedPixels:changed,changedOutsideTarget:outside,stylePreserved:JSON.stringify([target.fontSize,target.matrix,target.color])===JSON.stringify([style.fontSize,style.matrix,style.color]),sourceUnchanged:hash(bytes)===hash(readFileSync(source)),sourceSha256:hash(bytes),note:'Non-personal heading changed on a local copy; broad editing remains unproven.'};
writeFileSync('tmp/engine-spike/private-results.json',JSON.stringify(result,null,2));console.log(result);
assert(result.sourceUnchanged);assert(roundTrip);assert.equal(outside,0);assert(result.stylePreserved);
