import {test,expect} from '@playwright/test';
import {lessons} from '../src/content/stage-04';
import {exercises} from '../src/content/stage-04/exercises';
test('build estático04 com baseGitHubPages, rotas e pacotes reais',async({page,request})=>{
 for(const path of ['/etapas/04','/etapas/04/aulas','/etapas/04/laboratorio','/etapas/04/autoavaliacao',...lessons.map(l=>`/etapas/04/aulas/${l.id}`),...exercises.map(e=>`/etapas/04/laboratorio/${e.slug}`)]){
  await page.goto('./#'+path);await expect(page.locator('main h1')).toBeVisible();if(path.includes('/aulas/'))await expect(page.locator('.lesson-content h2').first()).toBeVisible();await expect(page.locator('main')).not.toContainText('Página não encontrada');
 }
 for(const id of ['laravel-api','express-api']){const response=await request.get('study/stage-04/'+id+'.zip');expect(response.status()).toBe(200);expect((await response.body()).subarray(0,2).toString()).toBe('PK');}
 const icon=await page.locator('link[rel="icon"]').getAttribute('href');expect(icon).toBe('/stacktrail/favicon.svg');expect((await request.get(icon!)).ok()).toBe(true);
});
