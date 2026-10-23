import {expect,test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {getStage} from '../src/practice/curriculum';
import {blankPilot,blankAttempt,withAttempt,withStageEvidence,PILOT_KEY} from '../src/practice/progress';
async function open(page:import('@playwright/test').Page,path:string){await page.goto(`./#${path}`);await expect(page.locator('main h1')).toBeVisible();}
for(const track of ['php','javascript'] as const)test(`Stage08 real lifecycle and three prompt roles ${track}`,async({page,context})=>{
 page.setDefaultTimeout(12000);
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await open(page,'/etapas/08');
 await page.getByRole('button',{name:track==='php'?/TRILHA A/i:/TRILHA B/i}).click();
 await expect(page.getByRole('heading',{name:'Oito módulos, uma entrega progressiva'})).toBeVisible();
 const modules=page.locator('.pf-modules08 details');await expect(modules).toHaveCount(8);await expect(page.locator('.pf-modules08 details[open]')).toHaveCount(0);
 await modules.nth(0).locator('summary').focus();await page.keyboard.press('Enter');await expect(modules.nth(0)).toHaveAttribute('open','');await modules.nth(1).locator('summary').click();await expect(modules.nth(0)).not.toHaveAttribute('open');
 await open(page,'/exercicios?etapa=08');await expect(page.locator('main .pf-card h2')).toHaveCount(12);await page.getByRole('button',{name:/^Carregar mais exercícios/}).click();await expect(page.locator('main .pf-card h2')).toHaveCount(16);
 await page.getByLabel(/^Setor/).selectOption('Logística');expect(await page.locator('main .pf-card h2').count()).toBeLessThan(16);await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('08');
 await open(page,'/etapas/08/exercicios/08-02');
 const runtime=page.getByRole('heading',{name:'Requisitos funcionais',exact:true}).locator('..');await expect(runtime).toContainText(track==='php'?'PHP-FPM':'tsc');await expect(runtime).not.toContainText(track==='php'?'watcher':'PHP-FPM');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel(/^Solução, anotações/).fill('Registro sintético dos testes de UI, não execução de infraestrutura.');
 for(const [button,title,fragment] of [['Gerar projeto-base com IA','Gerar projeto-base com IA','IA PREPARADORA'],['Pedir ajuda à IA','Pedir ajuda à IA','IA TUTORA'],['Avaliar com IA','Avaliar com IA','IA REVISORA']]){
  await page.getByRole('button',{name:button,exact:true}).click();const dialog=page.getByRole('dialog',{name:title,exact:true});await expect(dialog).toBeVisible();await expect(dialog.getByLabel(/^Prompt editável/)).toHaveValue(new RegExp(fragment));await dialog.getByRole('button',{name:/Copiar/}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain(fragment);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
 }
 await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await page.reload();await expect(page.getByLabel(/^Solução, anotações/)).toHaveValue(/Registro sintético/);await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 for(const check of await page.locator('main input[type=checkbox]').all())await check.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Desfazer conclusão',exact:true})).toBeVisible();await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();
 await open(page,'/etapas/08/projeto');await expect(page.getByRole('heading',{name:/Da API local ao ambiente/})).toBeVisible();
 await open(page,'/referencias?etapa=08');await page.getByLabel(/^Tipo de material/).selectOption('Livros');await expect(page.locator('.pf-book')).toHaveCount(2);await expect(page.locator('.pf-book-cover img')).toHaveCount(2);await expect(page.locator('.pf-book-placeholder')).toHaveCount(0);for(const image of await page.locator('.pf-book-cover img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate((i:HTMLImageElement)=>i.naturalWidth)).toBeGreaterThan(0);expect(await image.getAttribute('src')).toMatch(/^(?:\/stacktrail\/)?assets\/books\/stage08\/.*\.webp$/);}
 await open(page,'/progresso');await expect(page.getByRole('link',{name:/Etapa 08/}).first()).toBeVisible();
});
test('Stage08 complete, pause, reload and reverse by declared state without crossing tracks',async({page})=>{
 let p=blankPilot();p.currentStage='08';p.studied=getStage('08','php')!.topics.map(t=>t.id);for(const a of [...getStage('08','php')!.exercises,getStage('08','php')!.project]){p=withAttempt(p,a.id,{solution:'Fixture sintética de autoavaliação.'});p=withAttempt(p,a.id,{checks:blankAttempt(a.id).checks.map(()=>true),status:'concluido'});}p=withStageEvidence(p,'08','Síntese de fixture');
 await page.addInitScript(({key,value})=>{if(!sessionStorage.getItem('seeded08')){localStorage.setItem(key,JSON.stringify(value));sessionStorage.setItem('seeded08','yes');}},{key:PILOT_KEY,value:p});await open(page,'/etapas/08');await expect(page.locator('main')).toContainText('100%');
 await open(page,'/etapas/08/exercicios/08-14');await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();await open(page,'/etapas/08');await expect(page.locator('main')).not.toContainText('100%');await page.getByRole('button',{name:/Parar etapa/}).click();await page.reload();await expect(page.getByRole('button',{name:/Retomar etapa/})).toBeVisible();await page.getByRole('button',{name:/Retomar etapa/}).click();
 await page.getByRole('button',{name:/TRILHA B/i}).click();await expect(page.locator('main')).not.toContainText('100%');
});
test('Stage08 route inventory, both themes, reflow and axe',async({page},info)=>{
 test.setTimeout(240_000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const stage=getStage('08')!;const routes=['/etapas/08','/etapas/08/topicos','/referencias?etapa=08','/exercicios?etapa=08','/projetos?etapa=08','/etapas/08/projeto',...stage.topics.map(t=>'/etapas/08/topicos/'+t.id),...stage.exercises.map(a=>'/etapas/08/exercicios/'+a.slug)];
 for(const theme of ['dark','light']){
  await open(page,'/etapas/08');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:'Tema '+(theme==='light'?'claro':'escuro'),exact:true}).click();
  for(const path of routes){await open(page,path);expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations,path).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);}
  for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await open(page,'/etapas/08');await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===320||width===1440)await page.screenshot({path:info.outputPath(`stage08-${theme}-${width}.png`),fullPage:false});}
  await page.getByLabel('Tamanho da fonte').selectOption('100');await page.setViewportSize({width:1440,height:1000});
 }
 expect(errors).toEqual([]);
});
