import { init } from '@embedpdf/pdfium';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { PNG } from 'pngjs';
import { PdfEngine } from './engine.mjs';

const out = 'tmp/engine-spike'; mkdirSync(out, { recursive: true });
const e = new PdfEngine(await init({ wasmBinary: readFileSync('node_modules/@embedpdf/pdfium/dist/pdfium.wasm') }));
const a = e.api;
const h = { doc: a.FPDF_CreateNewDocument() };
const page = a.FPDFPage_New(h.doc, 0, 420, 220);
function add(text, x, y, size, color) {
  const obj = a.FPDFPageObj_NewTextObj(h.doc, 'Helvetica', size), ptr = e.utf16(text);
  try { assert(a.FPDFText_SetText(obj, ptr)); } finally { e.free(ptr); }
  a.FPDFPageObj_SetFillColor(obj, ...color, 255); a.FPDFPageObj_Transform(obj, 1, 0, 0, 1, x, y); a.FPDFPage_InsertObject(page, obj);
}
add('ORIGINAL WORD', 40, 150, 20, [20, 40, 90]);
add('Untouched content stays here.', 40, 80, 14, [0, 0, 0]);
assert(a.FPDFPage_GenerateContent(page));
const original = e.save(h); writeFileSync(`${out}/native-original.pdf`, original);
a.FPDF_ClosePage(page); e.close(h);
const reopened = e.open(original), p = e.page(reopened);
const before = e.runs(p), beforeImage = e.render(p);
const png = image => PNG.sync.write({ ...image, data: Buffer.from(image.data) });
writeFileSync(`${out}/native-before.png`, png(beforeImage));
e.replace(p, before[0].index, 'EDITED WORD');
const after = e.runs(p), afterImage = e.render(p);
assert.deepEqual(after[0].matrix, before[0].matrix); assert.equal(after[0].fontSize, before[0].fontSize); assert.deepEqual(after[0].color, before[0].color);
assert.deepEqual(after[1], before[1]);
let changedOutside = 0, changedInside = 0;
for (let y = 0; y < beforeImage.height; y++) for (let x = 0; x < beforeImage.width; x++) {
  const i = (y * beforeImage.width + x) * 4;
  if (!beforeImage.data.slice(i, i + 4).every((v, j) => v === afterImage.data[i + j])) {
    if (x >= 75 && x < 410 && y >= 90 && y < 155) changedInside++; else changedOutside++;
  }
}
assert(changedInside > 0); assert.equal(changedOutside, 0);
const edited = e.save(reopened); writeFileSync(`${out}/native-edited.pdf`, edited);
writeFileSync(`${out}/native-after.png`, png(afterImage));
a.FPDF_ClosePage(p); e.close(reopened);
const check = e.open(edited), cp = e.page(check), text = e.text(cp);
assert(text.includes('EDITED WORD')); assert(!text.includes('ORIGINAL')); assert(text.includes('Untouched content stays here.'));
a.FPDF_ClosePage(cp); e.close(check);
const report = { engine: '@embedpdf/pdfium@2.15.1', node: process.version, nativeRoundTrip: 'pass', preservedMatrixSizeColor: true, changedInside, changedOutside, originalSha256: createHash('sha256').update(original).digest('hex'), editedSha256: createHash('sha256').update(edited).digest('hex'), limitations: ['Synthetic Helvetica fixture only', 'No glyph/overflow guard in low-level adapter', 'No complex script shaping claim', 'Top-level objects only'] };
writeFileSync(`${out}/native-results.json`, JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2));
