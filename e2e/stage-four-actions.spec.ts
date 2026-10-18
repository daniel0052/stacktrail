import {test,expect} from '@playwright/test';
import {openRoute} from './helpers';
test('exporta OpenAPI e abre/fecha revisão com rubrica04',async({page})=>{
 await openRoute(page,'/etapas/04/laboratorio/php-10');await page.getByRole('button',{name:'D · OpenAPI',exact:true}).click();
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar openapi.yaml',exact:true}).click();const download=await downloadPromise;expect(download.suggestedFilename()).toBe('openapi.yaml');expect(await download.failure()).toBeNull();
 const review=page.getByRole('button',{name:'Avaliar com IA',exact:true});await review.click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog')).toContainText('Funcionalidade e regras de negócio');await expect(page.getByRole('dialog')).toContainText('30%');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(review).toBeFocused();
});
