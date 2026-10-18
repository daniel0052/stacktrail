import {test,expect} from '@playwright/test';
import {openRoute} from './helpers';
import {contrastSample} from './contrast';
for(const theme of ['dark','light'] as const)test(`contraste04 estados ${theme}`,async({page},info)=>{
 await openRoute(page,'/etapas/04/laboratorio/php-07',theme);
 const button=page.getByRole('button',{name:'Executar simulação',exact:true});
 for(const state of ['normal','hover','focus']){await button.scrollIntoViewIfNeeded();if(state==='hover')await button.hover();if(state==='focus'){await button.focus();await page.keyboard.press('Shift+Tab');await page.keyboard.press('Tab');await expect(button).toBeFocused();}const value=await contrastSample(button);expect(value.unresolved).toEqual([]);expect(value.textRatio).toBeGreaterThanOrEqual(4.5);if(state==='focus'){expect(value.outlineStyle).not.toBe('none');expect(value.outlineRatio).toBeGreaterThanOrEqual(3);}await info.attach(state,{body:JSON.stringify(value),contentType:'application/json'});}
 for(const locator of [page.getByLabel('Método HTTP'),page.getByLabel('JSON da requisição'),page.getByRole('button',{name:/^PHP \+ Laravel/}),page.getByRole('button',{name:/^JavaScript\/TypeScript/}),page.getByRole('button',{name:theme==='dark'?'Ativar tema claro':'Ativar tema escuro'})]){await locator.scrollIntoViewIfNeeded();const value=await contrastSample(locator);expect(value.unresolved).toEqual([]);expect(value.textRatio).toBeGreaterThanOrEqual(4.5);}
 // Bring the previously clipped sidebar item into its own scroll viewport.
 await page.getByRole('button',{name:'Expandir menu',exact:true}).click();const item=page.locator('.lesson-nav[href="#/etapas/04/aulas/integracoes"]');await item.scrollIntoViewIfNeeded();expect((await contrastSample(item.locator('span').last())).textRatio).toBeGreaterThanOrEqual(4.5);
});
