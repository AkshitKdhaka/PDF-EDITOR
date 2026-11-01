import { build } from 'esbuild';
import { mkdir,copyFile } from 'node:fs/promises';
const out='dist/extension';await mkdir(`${out}/licenses`,{recursive:true});
for(const file of ['manifest.json','background.js','index.html','styles.css'])await copyFile(`apps/extension/${file}`,`${out}/${file}`);
await build({entryPoints:['apps/extension/app.mjs','apps/extension/pdf-worker.mjs'],bundle:true,format:'esm',platform:'browser',outdir:out,outExtension:{'.js':'.js'}});
await copyFile('node_modules/@embedpdf/pdfium/dist/pdfium.wasm',`${out}/pdfium.wasm`);
await copyFile('node_modules/@embedpdf/pdfium/LICENSE',`${out}/licenses/pdfium-wrapper.txt`);await copyFile('node_modules/@embedpdf/pdfium/LICENSE.pdfium',`${out}/licenses/pdfium-notices.txt`);
console.log(`Built ${out}. Local import/viewer preview; no editing or OCR yet.`);
