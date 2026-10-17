import {test,expect} from '@playwright/test';
import {audit,openRoute,font} from './helpers';
const routes=['/','/etapas','/etapas/00','/etapas/01','/etapas/02','/aulas','/laboratorio','/autoavaliacao'];
for(const theme of ['dark','light'] as const)for(const route of routes){
 test(`shared ${theme} ${route}`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await openRoute(page,route,theme);await audit(page,info);expect(errors).toEqual([]);
 });
}
for(const route of routes)for(const width of [320,375,768,1024,1440])for(const theme of ['dark','light'] as const){
 test(`shared responsive ${route} ${width} ${theme}`,async({page},info)=>{
  await page.setViewportSize({width,height:900});await openRoute(page,route,theme);await font(page,150);await audit(page,info);
  await page.getByRole('button',{name:'Recolher menu',exact:true}).click();
  await expect(page.getByRole('navigation',{name:'Atalhos de navegação'})).toBeVisible();await audit(page,info,{axe:false});
 });
}
test('skip link, fonte, navegação e foco do menu funcionam por teclado',async({page})=>{
 await openRoute(page,'/');await page.reload();await expect(page.locator('main h1')).toBeVisible();await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Pular para o conteúdo'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await font(page,90);await font(page,150);await font(page,100);
 const toggle=page.getByRole('button',{name:'Recolher menu',exact:true});await toggle.focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Expandir menu'})).toBeFocused();
});
