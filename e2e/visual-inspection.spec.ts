import {test,expect} from '@playwright/test';
import {contrastSample} from './contrast';
import {openRoute,font} from './helpers';
for(const theme of ['dark','light'] as const)for(const width of [375,1440])test(`visual inspection ${width} ${theme}`,async({page},info)=>{
 await page.setViewportSize({width,height:1000});await openRoute(page,'/',theme);if(width===375)await font(page,150);await page.screenshot({path:info.outputPath('homepage.png')});
 await openRoute(page,'/etapas/00/aulas/variaveis',theme);const editor=page.locator('.flow-editor').first();await editor.locator('header.visual-editor-heading').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('editor.png')});
 const normal=editor.locator('.flow-canvas-shell');expect(await normal.evaluate(element=>element.scrollHeight-element.clientHeight)).toBeLessThanOrEqual(1);const inactive=editor.getByRole('button',{name:'Refazer',exact:true});const inactiveColor=await contrastSample(inactive);expect(inactiveColor.unresolved).toEqual([]);expect(inactiveColor.textRatio).toBeGreaterThanOrEqual(4.5);
 await editor.getByRole('button',{name:'Ampliar fluxograma',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Fluxograma ampliado',exact:true});await expect(dialog).toBeVisible();
 const controls=dialog.locator('.flow-toolbar button:not(:disabled),.flow-canvas-palette button:not(:disabled)');
 for(const control of await controls.all()){await control.focus();await expect.poll(()=>control.evaluate(element=>{const r=element.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight;})).toBe(true);}
 await dialog.evaluate(element=>{element.scrollTop=0;});
 await page.screenshot({path:info.outputPath('expanded.png')});await dialog.getByRole('button',{name:'+ Processamento',exact:true}).click();await expect(dialog.getByRole('dialog',{name:'Editar Processamento',exact:true})).toBeVisible();const field=page.getByRole('dialog',{name:'Editar Processamento',exact:true}).getByRole('combobox');const color=await contrastSample(field);expect(color.unresolved).toEqual([]);expect(color.borderRatio).toBeGreaterThanOrEqual(3);await page.screenshot({path:info.outputPath('properties.png')});await page.keyboard.press('Escape');await page.keyboard.press('Escape');
 await openRoute(page,'/etapas/02/aulas/rest',theme);await page.getByRole('heading',{name:'Laboratório de contratos',exact:true}).scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('contracts.png')});
});
