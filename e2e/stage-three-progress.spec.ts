import {test,expect} from '@playwright/test';
import {openRoute} from './helpers';
import {exercises} from '../src/content/stage-03/exercises';
import {exerciseAreas,trackLessons} from '../src/content/stage-03/curriculum';
import {newProgress,newExerciseProgress} from '../src/features/progress/model';
test('duas trilhas preservam todos os contextos e JS conclui sem PHP ou Nest',async({page})=>{
 test.setTimeout(240_000);
 for(const exercise of exercises){
  await openRoute(page,`/etapas/03/laboratorio/${exercise.slug}`);
  const editor=exerciseAreas[exercise.id]==='common'?page.getByLabel('Código, raciocínio ou anotações da solução',{exact:true}):page.getByRole('textbox',{name:/^Código de /});
  await editor.fill(`// Fixture de interface ${exercise.id}`);
  await page.getByLabel('Evidências locais: comandos, resultados e reflexão').fill('Fixture de persistência; não comprova execução de aluno.');
  if(['common','javascript'].includes(exerciseAreas[exercise.id])){
   const checks=page.getByRole('group',{name:'Critérios demonstrados',exact:true}).getByRole('checkbox');for(let i=0;i<await checks.count();i++)await checks.nth(i).check();
   await page.getByRole('button',{name:'Marcar como concluído',exact:true}).click();
   await expect(page.getByRole('status').filter({hasText:'Estado atual:'})).toContainText('Concluído');
  }
 }
 for(const exercise of exercises){
  await openRoute(page,`/etapas/03/laboratorio/${exercise.slug}`);
  const editor=exerciseAreas[exercise.id]==='common'?page.getByLabel('Código, raciocínio ou anotações da solução',{exact:true}):page.getByRole('textbox',{name:/^Código de /});
  await expect(editor).toHaveValue(`// Fixture de interface ${exercise.id}`);
 }
 await openRoute(page,'/etapas/03/aulas');await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();
 for(const lesson of trackLessons('javascript')){
  await openRoute(page,`/etapas/03/aulas/${lesson.id}`);await page.getByLabel('Marcar esta aula como lida e revisada').check();
 }
 await openRoute(page,'/etapas/03/autoavaliacao');const inputs=page.getByRole('checkbox');
 for(let i=0;i<await inputs.count();i++){await page.getByLabel(`Evidência declarada ${i+1}`,{exact:true}).fill('Fixture de UI, sem evidência de execução externa.');await inputs.nth(i).check();}
 await expect(page.getByRole('status').filter({hasText:'Trilha selecionada concluída'})).toBeVisible();
 await page.getByRole('button',{name:/^PHP \+ Laravel/}).click();await expect(page.getByRole('checkbox').first()).not.toBeChecked();
 await expect(page.getByRole('status').filter({hasText:'Etapa 03 concluída por uma das trilhas'})).toBeVisible();
 await page.reload();await expect(page.getByRole('button',{name:/^PHP \+ Laravel/})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();await expect(page.getByLabel('Evidência declarada 1',{exact:true})).toHaveValue('Fixture de UI, sem evidência de execução externa.');
 await openRoute(page,'/etapas/03/laboratorio/express-crud');await page.getByRole('textbox',{name:/^Código de /}).fill('// tentativa modificada');await expect(page.getByRole('button',{name:'Marcar como concluído',exact:true})).toBeDisabled();
 await openRoute(page,'/etapas/03/autoavaliacao');await expect(page.getByRole('status').filter({hasText:'Etapa 03 concluída por uma das trilhas'})).toHaveCount(0);
});
test('seletor filtra índices, preserva acesso direto e troca contexto de aula',async({page})=>{
 await openRoute(page,'/etapas/03/aulas');await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();
 await expect(page.locator('main a[href$="/php-inicio"]')).toHaveCount(0);await expect(page.locator('main a[href$="/js-valores"]')).toBeVisible();await expect(page.locator('main a[href$="/ciclo"]')).toBeVisible();
 await openRoute(page,'/etapas/03/aulas/php-inicio');await expect(page.locator('main h1')).toContainText('PHP');
 await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();await expect(page).toHaveURL(/03\/aulas$/);
 await openRoute(page,'/etapas/03/aulas/dependencias-testes');await expect(page.getByRole('link',{name:'Próxima aula: VALORES →'})).toHaveAttribute('href',expect.stringContaining('/js-valores'));
 await openRoute(page,'/etapas/03/laboratorio');await expect(page.locator('main a[href$="/php-livro"]')).toHaveCount(0);await expect(page.locator('main a[href$="/fundamentos-backend"]')).toBeVisible();
});
test('v6 preserva rascunhos e evidências PHP sem aprovar JS',async({page})=>{
 await openRoute(page,'/etapas/03');const old={...newProgress(),version:6,lessons:['03:node-runtime'],evidence03:['Legado PHP','','','','',''],assessment03:[true,false,false,false,false,false],exercises:{'03-ex01':{...newExerciseProgress(exercises[0].acceptanceCriteria.length),solution:'Rascunho textual preservado'}}};
 await page.evaluate(value=>localStorage.setItem('backend-academy:progress',JSON.stringify(value)),old);await page.reload();
 await openRoute(page,'/etapas/03/autoavaliacao');await expect(page.getByLabel('Evidência declarada 1',{exact:true})).toHaveValue('Legado PHP');await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();await expect(page.getByRole('checkbox').first()).not.toBeChecked();await expect(page.getByLabel('Evidência declarada 1',{exact:true})).toHaveValue('');
 await openRoute(page,'/etapas/03/laboratorio/php-livro');await expect(page.getByText('Um registro textual anterior foi preservado.',{exact:false})).toBeVisible();
});
