import {test} from '@playwright/test';
import {inventory,openRoute,audit} from './helpers';
for(const theme of ['dark','light'] as const)test(`rotas04 axe e reflow ${theme}`,async({page},info)=>{
 test.setTimeout(180000);
 for(const entry of inventory.filter(e=>e.stage==='04')){await openRoute(page,entry.route,theme);await audit(page,info);}
});
