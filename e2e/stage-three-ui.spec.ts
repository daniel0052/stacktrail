import {test,expect} from '@playwright/test';
import {openRoute,font,audit} from './helpers';
for(const theme of ['dark','light'] as const) for(const width of [320,375,768,1024,1440]) test(`independente03 ${theme} ${width}`,async({page},info)=>{
 await page.setViewportSize({width,height:1000});
 for(const route of ['/etapas/03','/etapas/03/autoavaliacao','/etapas/03/aulas/ciclo','/etapas/03/laboratorio/php-livro','/etapas/03/aulas/js-valores','/etapas/03/laboratorio/express-schemas']){
 await openRoute(page,route,theme);await font(page,150);
 if(route.endsWith('/ciclo')){
 const sim=page.getByRole('region',{name:'Visualizador do ciclo de requisição'});
 await sim.getByRole('button',{name:'Próximo passo',exact:true}).click();
 await expect(sim.getByRole('button',{name:'Passo anterior',exact:true})).toBeEnabled();
 await sim.getByRole('button',{name:'Reiniciar ciclo',exact:true}).click();
 await expect(sim.getByRole('button',{name:'Passo anterior',exact:true})).toBeDisabled();
 }
 if(route.endsWith('php-livro')){
 const edit=page.getByRole('textbox',{name:'Código de src/Livro.php',exact:true});await expect(edit).toBeVisible();await edit.focus();await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Código com realce',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Restaurar proposta inicial',exact:true}).click();await page.getByRole('button',{name:'Cancelar restauração',exact:true}).click();await expect(page.getByRole('button',{name:'Restaurar proposta inicial',exact:true})).toBeFocused();
 const review=page.getByRole('button',{name:/Avaliar com IA/});await review.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(review).toBeFocused();
 }
 await audit(page,info);
 }
});
