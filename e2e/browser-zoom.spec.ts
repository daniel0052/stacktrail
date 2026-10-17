import {test,expect,chromium,type Worker} from '@playwright/test';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {audit} from './helpers';
type ZoomApi={tabs:{query:(query:object)=>Promise<{id?:number;url?:string}[]>;setZoomSettings:(id:number,settings:object)=>Promise<void>;setZoom:(id:number,factor:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};
async function zoom(worker:Worker,factor:number){return worker.evaluate(async value=>{
 const api=(globalThis as unknown as {chrome:ZoomApi}).chrome;const tab=(await api.tabs.query({})).find(tab=>tab.url?.startsWith('http://127.0.0.1:4177/stacktrail/'));
 if(tab?.id===undefined)throw new Error('Aba local do teste ausente');await api.tabs.setZoomSettings(tab.id,{mode:'automatic',scope:'per-tab'});await api.tabs.setZoom(tab.id,value);return api.tabs.getZoom(tab.id);
},factor);}
for(const theme of ['dark','light'] as const)test(`browser zoom real ${theme}`,async({browserName},info)=>{
 expect(browserName).toBe('chromium');test.setTimeout(180_000);const profile=await mkdtemp(join(tmpdir(),'stacktrail-zoom-'));const extension=resolve('e2e/zoom-extension');
 const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
 try{
  const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0]??await context.newPage();page.setDefaultTimeout(10_000);const nativeDpr=await page.evaluate(()=>devicePixelRatio);
  for(const route of ['/','/etapas/00/aulas/variaveis','/aulas/http','/etapas/02/laboratorio/anatomia']){
   await page.goto(`http://127.0.0.1:4177/stacktrail/#${route}`);await expect(page.locator('main h1')).toBeVisible();if(route.includes('/aulas/'))await expect(page.locator('.lesson-content h2').first()).toBeVisible();
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='light'?'Ativar tema claro':'Ativar tema escuro',exact:true}).click();
   await zoom(worker,1);await expect.poll(()=>page.evaluate(()=>devicePixelRatio)).toBeCloseTo(nativeDpr,3);const baseline=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));
   for(const factor of [2,4]){const observed=await zoom(worker,factor);expect(observed).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(baseline.width/factor)+1);const rendered=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));expect(rendered.dpr).toBeCloseTo(baseline.dpr*factor,1);await info.attach('browser-zoom',{body:JSON.stringify({route,factor,observed,baseline,rendered}),contentType:'application/json'});await audit(page,info);
    if(factor===4&&route==='/etapas/00/aulas/variaveis'){
     const editor=page.locator('.flow-editor').first();await editor.getByRole('button',{name:'Ampliar fluxograma',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Fluxograma ampliado',exact:true});
     for(const name of ['Funções','Centralizar e ajustar','+ Processamento']){const control=dialog.getByRole('button',{name,exact:true});await control.focus();await expect.poll(()=>control.evaluate(element=>element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(await page.evaluate(()=>innerHeight)+1);expect(await control.evaluate(element=>{const r=element.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return hit===element||element.contains(hit);})).toBe(true);const box=await control.evaluate(element=>element.getBoundingClientRect().toJSON());await info.attach('expanded-control',{body:JSON.stringify({name,box,modal:await dialog.evaluate(element=>({height:element.clientHeight,scroll:element.scrollHeight,top:element.scrollTop,overflow:getComputedStyle(element).overflowY,rect:element.getBoundingClientRect().toJSON()}))}),contentType:'application/json'});await page.screenshot({path:info.outputPath('expanded-400.png')});expect(box).not.toBeNull();expect(box!.y+box!.height).toBeLessThanOrEqual(await page.evaluate(()=>innerHeight)+1);}
     await dialog.getByRole('button',{name:'+ Processamento',exact:true}).click();const properties=page.getByRole('dialog',{name:'Editar Processamento',exact:true});await properties.getByLabel('Conteúdo do bloco').fill('auxiliar = 2');await properties.getByRole('button',{name:'Salvar bloco',exact:true}).click();await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
    }
   }
  }
 }catch(error){const active=context.pages()[0];if(active){await active.screenshot({path:info.outputPath('failure.png')});await info.attach('page-text',{body:await active.locator('body').innerText(),contentType:'text/plain'});}throw error;}finally{await context.close();await rm(profile,{recursive:true,force:true});}
});
