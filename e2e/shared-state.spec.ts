import {test,expect} from '@playwright/test';
import {openRoute,font,audit,inventory} from './helpers';
import {contrastSample} from './contrast';
for(const theme of ['dark','light'] as const){
 test(`shared controls rendered contrast ${theme}`,async({page},info)=>{
  await openRoute(page,'/etapas/00/autoavaliacao',theme);
  const field=page.locator('main textarea').first();
  for(const pseudo of [undefined,'::placeholder'] as const){const sample=await contrastSample(field,pseudo);await info.attach(`field-${pseudo??'normal'}`,{body:JSON.stringify(sample),contentType:'application/json'});expect(sample.unresolved).toEqual([]);expect(sample.textRatio).toBeGreaterThanOrEqual(4.5);if(!pseudo)expect(sample.borderRatio).toBeGreaterThanOrEqual(3);}
  await field.focus();expect((await contrastSample(field)).outlineRatio).toBeGreaterThanOrEqual(3);
  for(const size of [90,150] as const){await font(page,size);const disabled=page.getByRole('group',{name:'Tamanho dos textos'}).getByRole('button',{name:size===90?'Diminuir tamanho do texto':'Aumentar tamanho do texto'});expect(await disabled.isDisabled()).toBe(true);const sample=await contrastSample(disabled);expect(sample.unresolved).toEqual([]);expect(sample.textRatio).toBeGreaterThanOrEqual(4.5);}
  await font(page,100);await page.getByLabel('Arquivo JSON de progresso',{exact:true}).setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});await page.getByRole('button',{name:'Importar e substituir',exact:true}).click();await expect(page.getByRole('alert')).toBeVisible();expect((await contrastSample(page.getByRole('alert'))).textRatio).toBeGreaterThanOrEqual(4.5);await audit(page,info);
 });
 test(`shared dialog keyboard and code scrolling ${theme}`,async({page},info)=>{
  await page.setViewportSize({width:375,height:800});await openRoute(page,inventory.find(r=>r.stage==='01'&&r.kind==='exercise')!.route,theme);
  const trigger=page.getByRole('button',{name:'Avaliar com IA',exact:true});await trigger.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await audit(page,info);
  const close=page.getByRole('button',{name:'Fechar avaliação com IA',exact:true});await expect(close).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(dialog.getByRole('button',{name:'Fechar',exact:true})).toBeFocused();await page.keyboard.press('Tab');await expect(close).toBeFocused();await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
  await openRoute(page,'/aulas/html',theme);const code=page.getByRole('region',{name:'Código do exemplo, área rolável'}).first();await code.focus();await expect(code).toBeFocused();expect(await code.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  const regions=page.getByRole('region',{name:'Código do exemplo, área rolável'});let scrolled=false;
  for(let i=0;i<await regions.count();i++){const region=regions.nth(i);if(await region.evaluate(e=>e.scrollWidth>e.clientWidth)){await region.focus();await page.keyboard.press('ArrowRight');await expect.poll(()=>region.evaluate(e=>e.scrollLeft)).toBeGreaterThan(0);scrolled=true;break;}}
  expect(scrolled,'A aula contém linha longa e a área responde à seta horizontal').toBe(true);
 });
}
