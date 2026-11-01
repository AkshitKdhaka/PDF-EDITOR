import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const extension=resolve('dist/extension'),profile=resolve(`tmp/viewer-profile-${Date.now()}`);
const context=await chromium.launchPersistentContext(profile,{executablePath:process.env.CHROME_PATH,headless:true,ignoreDefaultArgs:['--disable-extensions'],args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`],viewport:{width:1440,height:1000}});
const checks=[],network=[],errors=[];
try{
 context.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(`chrome-extension://${new URL(worker.url()).host}/index.html`);await context.setOffline(true);
 const upload=async path=>page.locator('#file').setInputFiles(path);
 const ready=async()=>{await page.waitForFunction(()=>document.getElementById('status').textContent.startsWith('Ready. Viewing'),{},{timeout:30000});};
 const error=async()=>{await page.locator('#error').waitFor({state:'visible'});};
 await upload('tmp/viewer-fixtures/two-pages.pdf');await ready();assert.equal(await page.locator('#kind').textContent(),'Native text');assert.equal(await page.locator('#pages button').count(),2);assert((await page.locator('#runs').textContent()).includes('ORIGINAL WORD'));checks.push('native import and text inspection');
 await page.click('#next');await ready();assert.equal(await page.locator('#kind').textContent(),'Image-only page');checks.push('page navigation and image-only classification');
 await page.selectOption('#zoom','2');await ready();assert.equal(await page.locator('#page').getAttribute('width'),'840');checks.push('zoom');
 await upload('tmp/viewer-fixtures/mixed.pdf');await ready();assert.equal(await page.locator('#kind').textContent(),'Text and images');checks.push('mixed classification');
 await upload('tmp/viewer-fixtures/blank.pdf');await ready();assert.equal(await page.locator('#kind').textContent(),'View-only content');checks.push('blank/unsupported classification');
 await upload('tmp/viewer-fixtures/two-pages.pdf');await ready();
 await page.locator('#file').setInputFiles({name:'bad.pdf',mimeType:'application/pdf',buffer:Buffer.from('not a PDF')});await error();assert.equal(await page.locator('#filename').textContent(),'two-pages.pdf');checks.push('malformed import preserves active document');
 await upload('tmp/viewer-fixtures/too-many.pdf');await error();assert((await page.locator('#error').textContent()).includes('limits'));assert.equal(await page.locator('#filename').textContent(),'two-pages.pdf');checks.push('page cap');
 await page.evaluate(()=>{const transfer=new DataTransfer();transfer.items.add(new File([new Uint8Array(50*1024*1024+1)],'large.pdf',{type:'application/pdf'}));const input=document.getElementById('file');input.files=transfer.files;input.dispatchEvent(new Event('change'));});await error();assert.equal(await page.locator('#filename').textContent(),'two-pages.pdf');checks.push('file size cap');
 await upload('tmp/viewer-fixtures/locked.pdf');await page.locator('#password-dialog').waitFor({state:'visible'});await page.fill('#password','wrong');await page.click('button[type=submit]');await page.waitForFunction(()=>document.getElementById('password-message').textContent.includes('did not unlock'));await page.fill('#password','local-test-password');await page.click('button[type=submit]');await ready();assert.equal(await page.locator('#filename').textContent(),'locked.pdf');checks.push('password required, wrong password, retry');
 await upload('tmp/viewer-fixtures/locked.pdf');await page.locator('#password-dialog').waitFor({state:'visible'});await page.click('#password-cancel');assert.equal(await page.locator('#filename').textContent(),'locked.pdf');checks.push('password cancellation');
 // Send import and cancel within the same event loop turn, before parsing can reply.
 await page.evaluate(()=>{const file=new File(['%PDF-1.7\ninvalid'],'cancel.pdf',{type:'application/pdf'}),transfer=new DataTransfer();transfer.items.add(file);const input=document.getElementById('file');input.files=transfer.files;input.dispatchEvent(new Event('change'));document.getElementById('cancel').click();});
 await page.waitForTimeout(300);assert.equal(await page.locator('#filename').textContent(),'locked.pdf');assert((await page.locator('#status').textContent()).includes('Canceled'));checks.push('import cancellation ignores stale work');
 await upload('tmp/viewer-fixtures/two-pages.pdf');await ready();await page.screenshot({path:'tmp/viewer-desktop.png',fullPage:true});
 await page.setViewportSize({width:900,height:800});await page.screenshot({path:'tmp/viewer-small.png',fullPage:true});assert(await page.locator('#open').isVisible());checks.push('small viewport controls visible');
 // Validate protocol rejection independently of UI controls.
 const protocol=await page.evaluate(()=>new Promise(resolve=>{const w=new Worker(new URL('pdf-worker.js',location.href),{type:'module'});w.onmessage=({data})=>{w.terminate();resolve(data.error.code);};w.postMessage({protocolVersion:2,requestId:'test',sessionId:'test',baseRevision:0,operation:'inspect',payload:{}});}));assert.equal(protocol,'UNSUPPORTED_PROTOCOL');checks.push('worker protocol validation');
 assert.deepEqual(network,[]);assert.deepEqual(errors,[]);
 await mkdir('docs/evidence/task-003',{recursive:true});const report={date:'2026-11-01',browser:context.browser().version(),offline:true,checks,externalHttpRequests:network,pageErrors:errors,limitations:['No editing or OCR UI','No general PDF compliance claim','No cross-platform or screen-reader certification']};await writeFile('docs/evidence/task-003/browser-results.json',JSON.stringify(report,null,2));console.log(report);
}finally{await context.close();}
