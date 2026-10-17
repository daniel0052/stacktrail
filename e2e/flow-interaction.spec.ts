import {test,expect} from '@playwright/test';
import {openRoute} from './helpers';
for(const theme of ['dark','light'] as const)test(`flow complete interaction ${theme}`,async({page},info)=>{
 await openRoute(page,'/etapas/00/aulas/variaveis',theme);
 const editor=page.locator('.flow-editor').first();
 await editor.getByRole('button',{name:'+ Processamento',exact:true}).click();
 const properties=page.getByRole('dialog',{name:'Editar Processamento',exact:true});
 await properties.getByLabel('Conteúdo do bloco').fill('auxiliar = 1');await properties.getByRole('button',{name:'Salvar bloco',exact:true}).click();
 const added=editor.getByRole('button',{name:/^bloco1: Processamento/});await expect(added).toBeFocused();
 const shape=added.locator('rect');expect(await shape.evaluate(el=>getComputedStyle(el).fill)).not.toBe('rgb(0, 0, 0)');
 const wrapper=added.locator('..');const before=await wrapper.getAttribute('transform');await editor.getByRole('button',{name:'Direita',exact:true}).click();expect(await wrapper.getAttribute('transform')).not.toBe(before);
 await editor.getByRole('button',{name:'Excluir seleção',exact:true}).click();await expect(added).toHaveCount(0);await editor.getByRole('button',{name:'Desfazer',exact:true}).click();await expect(added).toBeVisible();await editor.getByRole('button',{name:'Refazer',exact:true}).click();await expect(added).toHaveCount(0);
 await editor.getByRole('button',{name:'Saída Próximo de multiplicar',exact:true}).click();await editor.getByRole('button',{name:'Entrada de saida',exact:true}).click();
 await expect(editor.getByRole('button',{name:'Conexão multiplicar next saida',exact:true})).toBeAttached();
 await editor.getByRole('button',{name:'Passo a passo',exact:true}).click();
 const current=editor.locator('.flow-current > g > rect,.flow-current > g > polygon').first();await expect(current).toBeAttached();expect(await current.evaluate(el=>getComputedStyle(el).strokeDasharray)).not.toBe('none');
 const expand=editor.getByRole('button',{name:'Ampliar fluxograma',exact:true});await expand.click();const dialog=page.getByRole('dialog',{name:'Fluxograma ampliado',exact:true});await expect(dialog).toBeVisible();await expect(page.locator('#root')).toHaveAttribute('inert','');
 await dialog.getByRole('button',{name:'Funções',exact:true}).click();
 const functions=page.getByRole('dialog',{name:'Funções e sub-rotinas',exact:true});await expect(functions).toBeVisible();
 const firstFocus=await page.evaluate(()=>document.activeElement?.outerHTML);await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.activeElement?.outerHTML)).not.toBe(firstFocus);await page.keyboard.press('Shift+Tab');await page.keyboard.press('Escape');await expect(functions).toHaveCount(0);await expect(dialog.getByRole('button',{name:'Funções',exact:true})).toBeFocused();
 await dialog.getByRole('button',{name:'Centralizar e ajustar',exact:true}).focus();
 for(let i=0;i<10;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"],[data-block-editor]'))).toBe(true);}
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(expand).toBeFocused();
 await editor.getByRole('button',{name:/^(Executar|Continuar)$/}).click();await editor.getByRole('button',{name:'Ir ao resultado',exact:true}).click();await expect(editor.getByLabel('Estado da execução')).toContainText('"resultado": 6');
 const input=editor.locator('.flow-run-inputs input').first();await input.fill('2');await expect(editor.getByLabel('Estado da execução')).toContainText('mudaram');
 await editor.getByRole('button',{name:/^(Executar|Continuar)$/}).click();await editor.getByRole('button',{name:'Ir ao resultado',exact:true}).click();await expect(editor.getByLabel('Estado da execução')).toContainText('"resultado": 12');
 await info.attach('editor',{body:await editor.screenshot(),contentType:'image/png'});
 await page.reload();await expect(page.locator('.flow-editor').first().getByRole('button',{name:'Conexão multiplicar next saida',exact:true})).toBeAttached();
});
