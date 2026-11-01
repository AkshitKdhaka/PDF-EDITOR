import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const extension=resolve('dist/engine-lab');const profile=resolve(`tmp/browser-profile-${Date.now()}`);await mkdir(profile,{recursive:true});
const context=await chromium.launchPersistentContext(profile,{executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,ignoreDefaultArgs:['--disable-extensions'],args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
const external=[],errors=[];
try{
 context.on('request',request=>{if(/^https?:/.test(request.url()))external.push(request.url());});
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker',{timeout:15000});
 const id=new URL(worker.url()).host,page=await context.newPage();
 page.on('pageerror',error=>{errors.push(error.message);console.log('PAGE ERROR',error.message);});
 page.on('console',msg=>{if(msg.type()==='error')console.log('CONSOLE',msg.text());});
 await page.goto(`chrome-extension://${id}/lab.html`);
 await page.locator('#run').waitFor();await page.waitForFunction(()=>!document.getElementById('run').disabled||window.__failure);
 assert.equal(await page.evaluate(()=>window.__failure),undefined);
 await context.setOffline(true);
 await page.click('#run');console.log('Offline local tests started');await page.waitForFunction(()=>window.__report||window.__failure,{},{timeout:90000});
 const result=await page.evaluate(()=>({report:window.__report,error:window.__failure}));assert.equal(result.error,undefined);
 assert.equal(external.length,0);assert.deepEqual(errors,[]);
 await page.screenshot({path:'tmp/engine-spike/browser-lab.png',fullPage:true});
 const evidence={...result.report,offline:true,externalHttpRequests:external,pageErrors:errors,browserVersion:context.browser()?.version()};
 await writeFile('tmp/engine-spike/browser-results.json',JSON.stringify(evidence,null,2));console.log(evidence);
}finally{await context.close();}
