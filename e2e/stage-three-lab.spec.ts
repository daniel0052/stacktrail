import {test,expect} from '@playwright/test';
import {openRoute,font,audit} from './helpers';
for(const theme of ['dark','light'] as const)test(`Etapa 03 laboratório ${theme}`,async({page},info)=>{
 await page.setViewportSize({width:375,height:1000});
 await openRoute(page,'/etapas/03/laboratorio/php-livro',theme);await font(page,150);
 const editor=page.getByRole('textbox',{name:'Código de src/Livro.php',exact:true});
 await expect(editor).toHaveValue(/Implemente/);
 const attempt='<?php\ndeclare(strict_types=1);\n// minha tentativa fictícia\n';
 await editor.fill(attempt);await page.getByRole('button',{name:'Verificar registro',exact:true}).click();
 await expect(page.getByRole('status').filter({hasText:'Não compilei nem executei'})).toBeVisible();
 const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar minha tentativa',exact:true}).click();
 const download=await downloading;expect(download.suggestedFilename()).toBe('php-basics-minha-tentativa.zip');await download.saveAs(info.outputPath(download.suggestedFilename()));
 await page.reload();await expect(editor).toHaveValue(attempt);
 await page.getByRole('button',{name:'Restaurar proposta inicial',exact:true}).click();await page.getByRole('button',{name:'Cancelar restauração',exact:true}).click();await expect(editor).toHaveValue(attempt);await expect(page.getByRole('button',{name:'Restaurar proposta inicial',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Restaurar proposta inicial',exact:true}).click();await page.getByRole('button',{name:'Confirmar restauração',exact:true}).click();await expect(editor).toHaveValue(/Implemente/);await expect(page.getByRole('button',{name:'Restaurar proposta inicial',exact:true})).toBeFocused();
 await audit(page,info);
});
