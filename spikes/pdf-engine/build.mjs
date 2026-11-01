import { build } from 'esbuild';
import { mkdir, copyFile, readdir } from 'node:fs/promises';
const out='dist/engine-lab';await mkdir(`${out}/ocr`,{recursive:true});
for(const file of ['manifest.json','background.js','lab.html','lab.css'])await copyFile(`spikes/pdf-engine/extension/${file}`,`${out}/${file}`);
await build({entryPoints:['spikes/pdf-engine/extension/lab.mjs'],bundle:true,format:'esm',platform:'browser',outfile:`${out}/lab.js`,sourcemap:false});
await copyFile('node_modules/@embedpdf/pdfium/dist/pdfium.wasm',`${out}/pdfium.wasm`);
await copyFile('tmp/engine-spike/native-original.pdf',`${out}/native-original.pdf`);
await copyFile('node_modules/tesseract.js/dist/tesseract.min.js',`${out}/tesseract.min.js`);
await copyFile('node_modules/tesseract.js/dist/worker.min.js',`${out}/ocr/worker.min.js`);
for(const file of await readdir('node_modules/tesseract.js-core'))if(/\.wasm(\.js)?$/.test(file))await copyFile(`node_modules/tesseract.js-core/${file}`,`${out}/ocr/${file}`);
await copyFile('node_modules/@tesseract.js-data/eng/4.0.0/eng.traineddata.gz',`${out}/ocr/eng.traineddata.gz`);
await mkdir(`${out}/licenses`,{recursive:true});
for(const [from,to] of [['@embedpdf/pdfium/LICENSE','pdfium-wrapper-MIT.txt'],['@embedpdf/pdfium/LICENSE.pdfium','pdfium-bundled-notices.txt'],['tesseract.js/LICENSE.md','tesseract-Apache.txt'],['tesseract.js-core/LICENSE','tesseract-core.txt']])await copyFile(`node_modules/${from}`,`${out}/licenses/${to}`);
console.log(`Built ${out}; synthetic fixture only. Full transitive notice audit still required before distribution.`);

