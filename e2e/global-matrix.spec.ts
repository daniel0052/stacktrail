import {test,expect} from '@playwright/test';
import {inventory,openRoute,font,audit} from './helpers';
// Every published route at a wide viewport; all routes also receive narrow coverage in stage suites.
for(const entry of inventory)for(const theme of ['dark','light'] as const)test(`wide ${theme} ${entry.route}`,async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await openRoute(page,entry.route,theme);await audit(page,info);expect(errors).toEqual([]);
});
const representatives=[
 '/etapas/00/aulas/variaveis','/etapas/00/aulas/matrizes','/etapas/00/aulas/subrotinas','/etapas/00/laboratorio/rotas','/aulas/http','/laboratorio/contato','/etapas/02/aulas/rest',
 ...inventory.filter(entry=>entry.stage==='02'&&entry.kind==='exercise').slice(0,5).map(entry=>entry.route),
];
for(const route of representatives)for(const width of [320,768,1024,1440])for(const theme of ['dark','light'] as const)test(`components ${width} ${theme} ${route}`,async({page},info)=>{
 await page.setViewportSize({width,height:900});await openRoute(page,route,theme);await font(page,150);await audit(page,info);
});
