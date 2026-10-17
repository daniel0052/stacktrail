import {test,expect} from '@playwright/test';
import {inventory,openRoute,font,audit} from './helpers';
for(const entry of inventory.filter(entry=>entry.stage==='01'))for(const theme of ['dark','light'] as const){
 test(`stage01 ${theme} ${entry.route}`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width:375,height:900});await openRoute(page,entry.route,theme);await font(page,150);await audit(page,info);expect(errors).toEqual([]);
 });
}
