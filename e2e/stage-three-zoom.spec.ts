import {test,expect,chromium,type Worker} from '@playwright/test';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {audit} from './helpers';
type ZoomApi={tabs:{query:(query:object)=>Promise<{id?:number;url?:string}[]>;setZoomSettings:(id:number,settings:object)=>Promise<void>;setZoom:(id:number,factor:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};
async function zoom(worker:Worker,factor:number){return worker.evaluate(async value=>{
 const api=(globalThis as unknown as {chrome:ZoomApi}).chrome;const tab=(await api.tabs.query({})).find(tab=>tab.url?.startsWith('http://127.0.0.1:4177/stacktrail/'));
 if(tab?.id===undefined)throw new Error('Aba local ausente');await api.tabs.setZoomSettings(tab.id,{mode:'automatic',scope:'per-tab'});await api.tabs.setZoom(tab.id,value);return api.tabs.getZoom(tab.id);
},factor);}
for(const theme of ['dark','light'] as const)test(`Etapa03 zoom real ${theme}`,async({browserName},info)=>{
 expect(browserName).toBe('chromium');
 test.setTimeout(120_000);const profile=await mkdtemp(join(tmpdir(),'stacktrail03-zoom-'));const extension=resolve('e2e/zoom-extension');
 const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
 try{const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0]??await context.newPage();const nativeDpr=await page.evaluate(()=>devicePixelRatio);
  for(const route of ['/etapas/03/aulas/ciclo','/etapas/03/laboratorio/laravel-crud','/etapas/03/autoavaliacao']){
   await page.goto(`http://127.0.0.1:4177/stacktrail/#${route}`);await expect(page.locator('main h1')).toBeVisible();if(route.includes('/aulas/'))await expect(page.locator('.lesson-content h2').first()).toBeVisible();if(route.includes('/laboratorio/'))await expect(page.getByRole('textbox',{name:/^Código de /})).toBeVisible();
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='light'?'Ativar tema claro':'Ativar tema escuro',exact:true}).click();
   await zoom(worker,1);await expect.poll(()=>page.evaluate(()=>devicePixelRatio)).toBeCloseTo(nativeDpr,3);const baseline=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));
   for(const factor of [2,4]){expect(await zoom(worker,factor)).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(baseline.width/factor)+1);const rendered=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));expect(rendered.dpr).toBeCloseTo(baseline.dpr*factor,1);await info.attach('zoom',{body:JSON.stringify({route,factor,baseline,rendered}),contentType:'application/json'});await audit(page,info);}
  }
 }finally{await context.close();await rm(profile,{recursive:true,force:true});}
});
