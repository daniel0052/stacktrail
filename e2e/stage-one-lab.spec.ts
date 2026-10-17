import {test,expect} from '@playwright/test';
import {openRoute} from './helpers';
test('laboratório textual preserva solução, reflexão, dicas e autonomia entre etapas',async({page})=>{
 await openRoute(page,'/laboratorio/contato');
 await page.getByLabel('Código, raciocínio ou anotações da solução',{exact:true}).fill('Minha tentativa de estudo: validar antes de apresentar.');
 await page.getByLabel('O que aprendi / onde travei',{exact:true}).fill('Ainda preciso testar os limites.');
 await page.getByRole('button',{name:'Mostrar dica 1',exact:true}).click();await expect(page.locator('.hint')).toHaveCount(1);
 await page.getByRole('combobox',{name:'Etapa do laboratório',exact:true}).selectOption('00');await expect(page).toHaveURL(/etapas\/00\/laboratorio$/);
 await page.getByRole('combobox',{name:'Etapa do laboratório',exact:true}).selectOption('01');await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Cadastro de contato com validação',exact:true})}).click();
 await page.reload();await expect(page.getByLabel('Código, raciocínio ou anotações da solução',{exact:true})).toHaveValue('Minha tentativa de estudo: validar antes de apresentar.');
 await expect(page.getByLabel('O que aprendi / onde travei',{exact:true})).toHaveValue('Ainda preciso testar os limites.');await expect(page.locator('.hint')).toHaveCount(1);
 await expect(page.getByRole('button',{name:'Marcar como concluído',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();const dialog=page.getByRole('dialog');await expect(dialog.locator('textarea')).toContainText('Minha tentativa de estudo');await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
});
