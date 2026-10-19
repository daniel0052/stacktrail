import {expect,test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {topics,activities as tasks,projects,getStage} from '../src/practice/curriculum';
import {blankPilot,blankAttempt,PILOT_KEY} from '../src/practice/progress';
import {englishExercises,initialPlacementQuestions,englishLevels} from '../src/practice/english-journey';
const root='/etapas/01';
async function open(page:import('@playwright/test').Page,path:string){await page.goto(`./#${path}`);await expect(page.locator('main h1')).toBeVisible();}
test('missing book covers load locally with responsive layout and fallback',async({page},info)=>{
 const newCovers=['construindo-sistemas-seguros-resilientes','web-security-for-developers','api-security-in-action','o-codificador-limpo','ted-falar-convencer-emocionar','comunicacao-nao-violenta-4ed','habitos-atomicos'];
 const loaded=new Set<string>();
 for(const theme of ['dark','light']){
  await open(page,'/');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  for(const width of [320,375,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const route of ['/referencias?etapa=07','/desenvolvimento-profissional?view=livros']){
    await open(page,route);if(route.startsWith('/referencias'))await page.getByLabel(/^Tipo de material/).selectOption('Livros');
    const images=page.locator('.pf-book-cover img');expect(await images.count()).toBeGreaterThan(0);
    for(const img of await images.all()){
     await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
     const src=await img.getAttribute('src');expect(src).toMatch(/^\/stacktrail\/covers\//);expect(await img.getAttribute('alt')).toMatch(/^Capa/);
     for(const name of newCovers)if(src?.endsWith(`/${name}.webp`))loaded.add(name);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme}/${width}/${route}`).toBe(true);
    if(width===375||width===1440)await page.screenshot({path:info.outputPath(`covers-${theme}-${width}-${route.startsWith('/referencias')?'07':'professional'}.png`)});
   }
  }
 }
 expect([...loaded].sort()).toEqual([...newCovers].sort());
 await page.route('**/covers/api-security-in-action.webp',route=>route.abort());await open(page,'/referencias?etapa=07');await page.getByLabel(/^Tipo de material/).selectOption('Livros');
 const card=page.locator('.pf-book').filter({has:page.getByRole('heading',{name:'API Security in Action',exact:true})});await card.scrollIntoViewIfNeeded();await expect(card.getByRole('img',{name:/Capa indisponível/})).toBeVisible();
});
test('english ux: hero destinations, diagnostic steps/results and saved answers',async({page},info)=>{
 await page.setViewportSize({width:375,height:900});
 await open(page,'/ingles');await page.getByRole('button',{name:/Não sei meu nível/}).click();
 const section=page.locator('.pf-eng-view-diagnostic');
 await expect(section.locator('.pf-eng-diag-status-bar')).toBeFocused();await expect(section.locator('.pf-eng-diag-status-bar')).toBeInViewport();
 await expect(section.getByRole('group')).toBeInViewport();
 await page.screenshot({path:info.outputPath('english-hero-to-question-375.png')});
 await section.getByRole('radio').first().check();await section.getByRole('button',{name:/Próxima questão/}).click();
 await expect(section.locator('h3')).toBeFocused();await expect(section.locator('h3')).toBeInViewport();
 await section.getByRole('button',{name:/Questão anterior/}).click();await expect(section.getByRole('radio').first()).toBeChecked();
 await section.getByRole('button',{name:/Parar diagnóstico/}).click();await expect(section.getByText(/Diagnóstico pausado:/)).toBeInViewport();
 await page.reload();await expect(section.getByRole('radio').first()).toBeChecked();
 await section.getByRole('button',{name:/Continuar diagnóstico/}).click();
 for(let i=0;i<initialPlacementQuestions.length;i++){
  await section.getByRole('radio').first().check();
  if(i<initialPlacementQuestions.length-1)await section.getByRole('button',{name:/Próxima questão/}).click();
 }
 await section.getByRole('button',{name:/Finalizar diagnóstico/}).click();
 await expect(section.locator('.pf-eng-placement-result h3')).toBeFocused();await expect(section.locator('.pf-eng-placement-result h3')).toBeInViewport();
 const suggested=await section.locator('.pf-achieved h4 strong').innerText();await section.getByRole('button',{name:/Começar no nível/}).click();
 await expect(page).toHaveURL(new RegExp(`view=exercicios.*nivel=${suggested}|nivel=${suggested}.*view=exercicios`));
 await expect(page.locator('.pf-eng-view-exercises h2')).toBeFocused();await expect(page.locator('.pf-eng-view-exercises h2')).toBeInViewport();
});
test('english ux: diagnostic layout and focus at every width',async({page},info)=>{
 test.setTimeout(90_000);
 for(const theme of ['dark','light']){
  await open(page,'/ingles');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='dark'?'escuro':'claro'}`,exact:true}).click();
  for(const width of [320,375,768,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.getByRole('combobox',{name:'Tamanho da fonte'}).selectOption('150');
   await page.locator('.pf-eng-hero-left').getByRole('button',{name:/Não sei meu nível/}).click();
   const counter=page.locator('.pf-eng-diag-status-bar');
   await expect(counter).toBeFocused();await expect(counter).toBeInViewport();await expect(counter.getByRole('progressbar')).toBeInViewport();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
   if(width===375)await page.screenshot({path:info.outputPath(`english-question-${theme}-375-font150.png`)});
  }
 }
});
test('english ux: levels, history, exercise targets and clipboard feedback',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await open(page,'/ingles?nivel=A1');
 await page.locator('.pf-eng-level-node').filter({hasText:'B2'}).click();await expect(page).toHaveURL(/nivel=B2/);
 await expect(page.locator('.pf-eng-view-trilha h2')).toHaveText(englishLevels.find(l=>l.id==='B2')!.name);await expect(page.locator('.pf-eng-view-trilha h2')).toBeFocused();
 const writing=englishExercises.find(e=>e.level==='A1'&&e.skill==='writing')!;
 await open(page,`/ingles?view=exercicios&nivel=A1&exercicio=${writing.id}`);
 const card=page.locator(`[id="ex-${writing.id}"]`);await expect(card).toBeFocused();await expect(card).toBeInViewport();
 const nav=page.getByRole('navigation',{name:'Navegação da área de Inglês'});
 await nav.getByRole('button',{name:/Carreira Internacional/}).click();await expect(page.locator('.pf-eng-view-career h2')).toBeFocused();
 await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('.pf-eng-hero-left').getByRole('button',{name:/Carreira Internacional/}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('.pf-eng-view-career h2')).toBeFocused();await expect(page.locator('.pf-eng-view-career h2')).toBeInViewport();await page.emulateMedia({reducedMotion:'reduce'});
 await nav.getByRole('button',{name:/Exercícios Práticos/}).click();await page.getByLabel('Filtrar por habilidade').selectOption('listening');
 await page.goBack();await page.goBack();await expect(card).toBeVisible();await expect(card).toBeFocused();await expect(page.getByLabel('Filtrar por habilidade')).toHaveValue('todos');
 const copy=card.getByRole('button',{name:/Copiar prompt/});await copy.click();await expect(card.getByRole('status')).toContainText('Prompt copiado');expect(await page.evaluate(()=>navigator.clipboard.readText())).not.toBe('');
 await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('Denied'))}});});
 await card.getByRole('button',{name:/Prompt copiado/}).click();await expect(card.getByRole('alert')).toContainText('Não foi possível copiar');await expect(card.getByRole('button',{name:/Copiar prompt/})).toBeVisible();
 await nav.getByRole('button',{name:/Biblioteca/}).click();const reading=page.locator('.pf-eng-view-library .pf-book').first().getByRole('button',{name:'Lendo',exact:true});await reading.click();await expect(reading).toHaveAttribute('aria-pressed','true');await page.reload();await expect(reading).toHaveAttribute('aria-pressed','true');
});
test('english ux: resume and stop the evaluation of the selected card',async({page})=>{
 const pilot=blankPilot();pilot.english!.selectedLevel='A1';pilot.english!.evaluationDrafts={B2:{status:'interrompido',answers:{}}};
 await page.addInitScript(({key,value})=>localStorage.setItem(key,value),{key:PILOT_KEY,value:JSON.stringify(pilot)});
 await open(page,'/ingles?nivel=A1');
 await page.getByRole('region',{name:'Continuar estudando'}).getByRole('button',{name:'Continuar avaliação →'}).click();
 await expect(page).toHaveURL(/nivel=B2/);await expect(page.locator('.pf-eng-view-evaluation h2, .pf-eng-eval-panel h2').first()).toBeFocused();
 const readDrafts=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).english.evaluationDrafts,PILOT_KEY);
 expect((await readDrafts()).B2.status).toBe('em-andamento');expect((await readDrafts()).A1).toBeUndefined();
 await page.getByRole('region',{name:'Continuar estudando'}).getByRole('button',{name:'Parar',exact:true}).click();
 expect((await readDrafts()).B2.status).toBe('interrompido');expect((await readDrafts()).A1).toBeUndefined();
});
test('english ux: all study destinations, themes, reflow and reduced motion',async({page},info)=>{
 test.setTimeout(240_000);const views=['trilha','exercicios','avaliacao','diagnostico','carreira','revisao','biblioteca','exames','conquistas'];
 for(const theme of ['dark','light']){
  await open(page,'/ingles');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='dark'?'escuro':'claro'}`,exact:true}).click();
  for(const width of [320,375,768,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.getByRole('combobox',{name:'Tamanho da fonte'}).selectOption('150');
   for(const view of views){
    await open(page,`/ingles?view=${view}&nivel=A1`);
    const heading=page.locator('#english-study-content h2').first();await expect(heading).toBeFocused();await expect(heading).toBeInViewport();
    if(view==='diagnostico'&&await page.getByRole('button',{name:/Iniciar diagnóstico agora/}).count())await page.getByRole('button',{name:/Iniciar diagnóstico agora/}).click();
    const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:Array.from(document.querySelectorAll('main *')).filter(el=>el.getBoundingClientRect().right>innerWidth+1&&!el.closest('.pf-eng-drag-scroll')).slice(0,12).map(el=>({tag:el.tagName,class:el.className,right:Math.round(el.getBoundingClientRect().right)}))}));
    expect(overflow.scroll<=overflow.width,`${theme}/${width}/${view}: ${JSON.stringify(overflow)}`).toBe(true);
    await expect(page.locator('.pf-eng-feedback')).toContainText('Nível A1');
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations,`${theme}/${width}/${view}`).toEqual([]);
    if(width===375&&view==='diagnostico')await page.screenshot({path:info.outputPath(`english-diagnostic-${theme}-375.png`)});
   }
  }
 }
 expect(await page.locator('.pf-eng-hand-anim').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});
test('guided labs: A/B/C, clipboard, stack, roles and preserved lifecycle',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await open(page,'/etapas/01/exercicios/contato');
 await expect(page.getByRole('heading',{name:'Preparar ambiente de prática'})).toHaveCount(0);
 const b=tasks.find(t=>t.id==='06-ex-03')!;
 await open(page,`/etapas/06/exercicios/${b.slug}`);
 const initial=await page.evaluate(key=>localStorage.getItem(key),PILOT_KEY);
 const generate=page.getByRole('button',{name:'Gerar projeto-base com IA',exact:true});
 await page.getByLabel('Stack do laboratório').selectOption('php');await generate.click();
 const dialog=page.getByRole('dialog');const prompt=dialog.getByRole('textbox');
 await expect(prompt).toBeFocused();await expect(prompt).toContainText('IA PREPARADORA');await expect(prompt).toContainText('06-ex-03');await expect(prompt).toContainText('PHP + Laravel');
 await dialog.getByRole('button',{name:'Copiar prompt'}).click();await expect(dialog.getByRole('status')).toHaveText('Prompt copiado.');
 expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('API mínima de planos/assinaturas');
 await page.keyboard.press('Escape');await expect(generate).toBeFocused();
 await expect(page.getByRole('status').filter({hasText:'Estado:'})).toContainText('Não iniciada');
 const after=await page.evaluate(key=>localStorage.getItem(key),PILOT_KEY);
 expect(JSON.parse(after!).attempts).toEqual(initial?JSON.parse(initial).attempts:{});
 await page.getByLabel('Stack do laboratório').selectOption('javascript');await generate.click();await expect(prompt).toContainText('Stack do material: TypeScript + Node.js + Express');await dialog.getByRole('button',{name:'Fechar',exact:true}).click();
 const c=tasks.find(t=>t.id==='04-ex-05')!;await open(page,`/etapas/04/exercicios/${c.slug}`);
 await page.getByRole('button',{name:'Usar meu projeto',exact:true}).click();await expect(page.getByText('Confira o ponto de partida:',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Gerar projeto-base com IA',exact:true}).click();await expect(prompt).toContainText('Continuação: alternativa');await expect(prompt).toContainText('sem paginação/busca/filtros/ordenação');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();await expect(prompt).toContainText('hipótese inicial');await expect(prompt).toContainText('próxima pista');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();await expect(prompt).toContainText('código ou diff');await expect(prompt).toContainText('Não verificado');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Rascunho local preservado');
 await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('Rascunho local preservado');
 for(const box of await page.locator('main .pf-check input').all())await box.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.reload();await expect(page.getByRole('status').filter({hasText:'Estado:'})).toContainText('Concluída');await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Estado:'})).toContainText('Em andamento');
});
test('guided labs: themes, reflow, font, modal and axe',async({page},info)=>{
 test.setTimeout(180_000);
 for(const theme of ['dark','light']){
  await open(page,'/');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  for(const width of [320,375,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const id of ['06-ex-03','07-ex-05','04-ex-05']){
    const task=tasks.find(t=>t.id===id)!;await open(page,`/etapas/${task.stageId}/exercicios/${task.slug}`);await page.getByRole('combobox',{name:'Tamanho da fonte'}).selectOption('150');
    const panel=page.locator('.pf-preparation');await panel.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
    await page.getByRole('button',{name:'Gerar projeto-base com IA',exact:true}).click();await expect(page.getByRole('dialog').getByRole('textbox')).toBeFocused();
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
    await page.getByRole('dialog').getByRole('button',{name:'Fechar',exact:true}).scrollIntoViewIfNeeded();await expect(page.getByRole('dialog').getByRole('button',{name:'Fechar',exact:true})).toBeInViewport();
    if(width===320&&id==='06-ex-03')await page.screenshot({path:info.outputPath(`lab-modal-${theme}-320.png`)});
    await page.getByRole('dialog').getByRole('button',{name:'Fechar',exact:true}).focus();await page.keyboard.press('Tab');
    // Native dialogs may focus browser chrome and the scrollable dialog before its first control.
    for(let step=0;step<3&&!await page.getByRole('dialog').getByRole('textbox').evaluate(el=>el===document.activeElement);step++){
     expect(await page.evaluate(()=>document.activeElement===document.body||!!document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);await page.keyboard.press('Tab');
    }
    await expect(page.getByRole('dialog').getByRole('textbox')).toBeFocused();await page.keyboard.press('Escape');
   }
   await page.locator('.pf-preparation').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath(`lab-${theme}-${width}.png`)});
  }
 }
});
test('responsive screens, font controls and screenshots',async({page},info)=>{
 for(const theme of ['dark','light']){await open(page,'/');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
 for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});for(const route of ['/','/etapas/00','/etapas/00/projeto',root,`${root}/referencias`,`${root}/exercicios/contato`,`${root}/projeto`,'/etapas/02','/etapas/02/projeto','/etapas/03','/etapas/03/projeto','/etapas/04','/etapas/04/projeto','/etapas/05','/etapas/05/projeto','/etapas/06','/etapas/06/projeto','/progresso']){await open(page,route);await page.getByRole('combobox',{name:'Tamanho da fonte'}).selectOption('150');expect.soft(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme} ${width} ${route}`).toBe(true);}await page.screenshot({path:info.outputPath(`project-${theme}-${width}.png`),fullPage:false});}
 }
});
test('progress, in-progress activities, hints, prompts, keyboard and completion reversal',async({page,context},info)=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,`${root}/topicos/html`);await page.getByLabel('Estudei este tópico').check();await page.reload();await expect(page.getByLabel('Estudei este tópico')).toBeChecked();
 await open(page,`${root}/exercicios/contato`);await page.getByRole('link',{name:'Pular para o conteúdo'}).focus();await page.keyboard.press('Enter');expect(page.url()).toContain('/exercicios/contato');await expect(page.locator('main')).toBeFocused();
 await expect(page.getByRole('status')).toContainText('Estado: Não iniciada');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Estado: Em andamento');
 await open(page,'/progresso');
 await expect(page.getByRole('heading',{name:'Atividades em andamento'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Dados locais e backup'})).toHaveCount(0);
 await expect(page.getByRole('link',{name:'Cadastro de contato com validação'})).toBeVisible();
 await page.getByLabel('Tipo de atividade').selectOption('project');
 await expect(page.getByText('Nenhuma atividade em andamento neste filtro.')).toBeVisible();
 await page.getByLabel('Tipo de atividade').selectOption('exercise');
 await expect(page.getByRole('link',{name:'Continuar',exact:true}).last()).toBeVisible();
 await page.getByRole('button',{name:'Parar atividade',exact:true}).click();
 await expect(page.getByText('Nenhuma atividade em andamento neste filtro.')).toBeVisible();
 await page.reload();
 await expect(page.getByText('0 atividades em andamento.')).toBeVisible();
 await open(page,`${root}/exercicios/contato`);
 await expect(page.getByRole('button',{name:'Começar atividade',exact:true})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Estado: Não iniciada');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();await expect(page.getByText('Dica 1:',{exact:false})).toBeVisible();
 await page.getByLabel('Solução, anotações ou link do repositório').fill('Minha tentativa: repo local. Testes declarados.');
 const help=page.getByRole('button',{name:'Pedir ajuda à IA',exact:true});await help.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await expect(dialog.getByRole('textbox')).toBeFocused();await expect(dialog.getByRole('textbox')).toContainText('Solicite minha tentativa');await dialog.getByRole('textbox').fill('Prompt editado pelo estudante');await dialog.getByRole('button',{name:'Copiar prompt'}).click();await expect(dialog.getByRole('status')).toHaveText('Prompt copiado.');expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('Prompt editado pelo estudante');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(help).toBeFocused();
 await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();await expect(dialog.getByRole('textbox')).toContainText('Atendido / Parcialmente atendido / Não atendido / Não verificado');await page.screenshot({path:info.outputPath('review-dialog.png')});await dialog.getByRole('button',{name:'Fechar',exact:true}).click();
 for(const checkbox of await page.locator('main .pf-check input').all())await checkbox.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Estado: Concluída (por autoavaliação)');
 await page.reload();
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 await open(page,'/progresso');
 await expect(page.locator('.pf-stat-grid').filter({hasText:'Exercícios concluídos'})).toContainText('1Exercícios concluídos');
 await open(page,`${root}/exercicios/contato`);
 await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Estado: Em andamento');
 await open(page,'/progresso');
 await expect(page.locator('.pf-stat-grid').filter({hasText:'Exercícios concluídos'})).toContainText('0Exercícios concluídos');
 await open(page,`${root}/exercicios/contato`);
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await page.getByLabel('Solução, anotações ou link do repositório').fill('Tentativa alterada');await expect(page.getByRole('button',{name:'Concluir por autoavaliação',exact:true})).toBeDisabled();await expect(page.locator('main .pf-check input').first()).not.toBeChecked();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('stacktrail:roadmap:1')!).attempts['ex-01'].solution)).toBe('Tentativa alterada');
});
test('legacy migration preserves original storage and does not count old lessons',async({page})=>{
 const legacy={version:8,theme:'dark',fontSize:100,lessons:['html','css'],backendTrack03:'javascript',exercises:{'ex-01':{status:'concluido',solution:'old draft',reflection:'old reflection',hints:2,checks:[true,true,true,true]}}};await page.addInitScript(raw=>localStorage.setItem('backend-academy:progress',raw),JSON.stringify(legacy));await open(page,'/progresso');await expect(page.getByText('0/11 tópicos base estudados',{exact:false})).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('backend-academy:progress'))).toBe(JSON.stringify(legacy));await open(page,`${root}/exercicios/contato`);await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('old draft');await expect(page.getByRole('status')).toContainText('Concluída (por autoavaliação)');
});
test('filters, mobile navigation and project start/stop persistence',async({page})=>{
 await page.setViewportSize({width:375,height:900});await open(page,'/');await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation').getByRole('link',{name:'Exercícios',exact:true}).click();await expect(page.getByRole('button',{name:'☰ Menu',exact:true})).toHaveAttribute('aria-expanded','false');
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toBeVisible();
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/}).locator('option[value="todos"]')).toHaveCount(0);
 await page.getByRole('combobox',{name:/^Etapa selecionada/}).selectOption('00');
 await page.getByLabel('Dificuldade').selectOption('extra');
 await expect(page.getByRole('status')).toContainText('2 exercícios');
 await page.getByRole('combobox',{name:/^Etapa selecionada/}).selectOption('03');
 await expect(page.getByLabel('Trilha dos exercícios')).toBeVisible();
 await page.getByLabel('Trilha dos exercícios').selectOption('php');
 await expect(page.getByRole('status')).toContainText('9 exercícios');
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('03');
 await expect(page.getByRole('status')).toContainText('16 exercícios');
 await open(page,`/referencias?etapa=01&topico=next`);await page.getByRole('combobox',{name:/^Idioma/}).selectOption('Português brasileiro');await expect(page.getByRole('status')).toContainText('0 materiais encontrados');await expect(page.getByText('Nenhum material encontrado na Etapa 01')).toBeVisible();await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('01');await expect(page.locator('.pf-filter-summary')).not.toContainText('0 materiais encontrados');
 await open(page,`${root}/projeto`);await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();await page.getByLabel('Solução, anotações ou link do repositório').fill('Meu projeto ainda em elaboração');await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('Meu projeto ainda em elaboração');
 await open(page,'/progresso');await page.getByLabel('Tipo de atividade').selectOption('project');await expect(page.getByRole('link',{name:'Catálogo de livros responsivo'})).toBeVisible();
 await open(page,`${root}/projeto`);await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await expect(page.getByRole('button',{name:'Começar atividade',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();const r=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(r.violations).toEqual([]);await page.keyboard.press('Escape');
});
test('storage failure keeps in-memory attempt and clipboard absence has fallback',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Quota exceeded','QuotaExceededError');};Object.defineProperty(navigator,'clipboard',{get:()=>undefined});});await open(page,`${root}/exercicios/contato`);await page.getByLabel('Solução, anotações ou link do repositório').fill('unsaved in memory');await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();await expect(page.getByRole('dialog').getByRole('textbox')).toContainText('unsaved in memory');await page.getByRole('button',{name:'Copiar prompt',exact:true}).click();await expect(page.getByRole('dialog').getByRole('status')).toContainText('Cópia indisponível');await page.keyboard.press('Escape');await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
});
test('book alternative navigation and blocked storage recovery',async({page})=>{
 await open(page,root);await page.getByRole('link',{name:'TypeScript · Everyday Types',exact:true}).first().click();await expect(page.locator('#ref-ts')).toBeInViewport();expect(page.url()).toContain('#ref-ts');
 await page.addInitScript(()=>{Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError');};});await page.reload();await open(page,'/progresso');await expect(page.getByRole('heading',{name:'Meu progresso'})).toBeVisible();await expect(page.getByRole('alert')).toContainText('Não foi possível ler o progresso');
});

test('filter labels and helper text have distinct layout rows',async({page},info)=>{
 await page.setViewportSize({width:1440,height:1000});await open(page,'/');
 for(const label of await page.locator('.pf-tools .pf-field').all()){const bounds=await label.evaluate(el=>{const range=document.createRange();range.selectNode(el.firstChild!);const text=range.getBoundingClientRect();const control=el.querySelector('select')!.getBoundingClientRect();const help=el.querySelector('span')?.getBoundingClientRect();return {textBottom:text.bottom,controlTop:control.top,controlBottom:control.bottom,helpTop:help?.top};});expect(bounds.controlTop).toBeGreaterThan(bounds.textBottom);if(bounds.helpTop)expect(bounds.helpTop).toBeGreaterThan(bounds.controlBottom);}
 await page.screenshot({path:info.outputPath('roadmap-filters-desktop.png')});
});

for(const id of ['00','01','02','03','04','05','06'] as const)test(`stage ${id} completion, card, reversal, reload and compact menu`,async({page})=>{
 const p=blankPilot(),s=getStage(id,p.track)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);p.stageEvidence[id]='Evidências declaradas no teste de interface';
 for(const t of [...s.exercises.filter(t=>t.level==='inicial'||t.level==='intermediario'||((id==='03'||id==='04'||id==='05'||id==='06')&&t.level==='avancado'&&!t.optional)),...(id==='00'||id==='02'||id==='03'||id==='04'||id==='05'||id==='06'?[s.project]:[])]){const a=blankAttempt(t.id);p.attempts[t.id]={...a,solution:'Registro fictício para testar progresso, sem aprovação técnica',checks:a.checks.map(()=>true),status:'concluido'};}
 const last=p.studied.pop()!;await page.addInitScript(({key,p})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(p));},{key:PILOT_KEY,p});
 await open(page,`/etapas/${id}/topicos/${last}`);await page.getByLabel('Estudei este tópico').check();await open(page,`/etapas/${id}`);await expect(page.getByText('✓ Etapa concluída')).toBeVisible();await open(page,'/');const card=page.locator(`.pf-stage[href="#/etapas/${id}"]`);await expect(card).toHaveClass(/pf-complete/);await expect(card).toContainText('100%');await expect(page.locator('#pf-nav a[href^="#/etapas/"]')).toHaveCount(0);for(const name of ['Roadmap','Exercícios','Projetos','Livros e referências','Meu progresso'])await expect(page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name,exact:true})).toHaveCount(1);await page.reload();await expect(card).toHaveClass(/pf-complete/);
 await open(page,`/etapas/${id}/topicos/${last}`);await page.getByLabel('Estudei este tópico').uncheck();await open(page,'/');await expect(card).not.toHaveClass(/pf-complete/);await page.reload();await expect(card).not.toHaveClass(/pf-complete/);
 await open(page,'/etapas/19');await expect(page.getByText('ETAPA 19 / EM PREPARAÇÃO')).toBeVisible();await expect(page.getByRole('link',{name:/Etapa anterior/})).toBeVisible();
 await open(page,'/etapas/19/exercicios');await expect(page.getByRole('heading',{name:'Página não encontrada'})).toBeVisible();
});
test('Stage00 representation, bookshelf covers and local navigation after loading',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,'/etapas/00/exercicios/desafio-05');await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();const d=page.getByRole('dialog');await expect(d.getByRole('textbox')).toContainText('diagramas ou pseudocódigo');await expect(d.getByRole('textbox')).toContainText('Dicas já utilizadas (1)');await d.getByRole('button',{name:'Copiar prompt',exact:true}).click();await expect(d.getByRole('status')).toHaveText('Prompt copiado.');expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('Etapa: 00');await page.keyboard.press('Escape');
 await open(page,'/referencias?etapa=02');expect(await page.locator('.pf-book-cover img').count()).toBeGreaterThan(0);for(const img of await page.locator('.pf-book-cover img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);}await context.setOffline(true);await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Meu progresso',exact:true}).click();await expect(page.getByRole('heading',{name:'Meu progresso'})).toBeVisible();await context.setOffline(false);
});
test('stage start/pause/resume lifecycle across 00/01/02/03, progress preservation, mobile and distinct Stage 02/03 heroes',async({page},info)=>{
 await page.setViewportSize({width:1440,height:1000});
 // 1, 2, 3: Iniciar, Parar, Retomar Etapa 00
 await open(page,'/etapas/00');
 await expect(page.getByRole('button',{name:'Iniciar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 // 4, 5: Iniciar, Parar e Retomar Etapa 01
 await open(page,'/etapas/01');
 await expect(page.locator('.pf-map-art')).toHaveCount(1);
 await expect(page.locator('.pf-hero-net')).toHaveCount(0);
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 // 6, 7, 18: Iniciar Etapa 02, confirmar botão Parar etapa e composição visual distinta da Etapa 01
 await open(page,'/etapas/02');
 await expect(page.locator('.pf-hero-net')).toBeVisible();
 await expect(page.locator('.pf-map-art')).toHaveCount(0);
 await expect(page.locator('.pf-net-flow .pf-net-node')).toHaveCount(4);
 await page.screenshot({path:info.outputPath('stage-02-hero-desktop.png')});
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 // 8: Concluir exercícios da Etapa 02 e iniciar um projeto da Etapa 02
 await open(page,'/etapas/02/exercicios/anatomia');
 await page.getByLabel('Solução, anotações ou link do repositório').fill('URLs decompostas com testes documentados.');
 for(const cb of await page.locator('main .pf-check input').all())await cb.check();
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 await open(page,'/etapas/02/projeto');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 // 9, 10, 11, 12: Parar a Etapa 02 e confirmar que exercícios concluídos, projeto iniciado e porcentagem permanecem
 await open(page,'/etapas/02');
 await expect(page.locator('.pf-net-bar')).toContainText('5% dos registros previstos (1/17 unidades · 1/12 atividades concluídas)');
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await expect(page.locator('.pf-net-bar')).toContainText('Pausada');
 await expect(page.locator('.pf-net-bar')).toContainText('5% dos registros previstos (1/17 unidades · 1/12 atividades concluídas)');
 await open(page,'/etapas/02/exercicios/anatomia');
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 await open(page,'/etapas/02/projeto');
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 await open(page,'/');
 const card02=page.locator('.pf-stage[href="#/etapas/02"]');
 await expect(card02).toContainText('⏸ Pausada');
 await expect(card02).toContainText('5% dos registros previstos · 1/12 atividades concluídas');
 // 13, 14, 15: Retomar a Etapa 02, confirmar presença em Meu progresso e persistência após reload
 await open(page,'/etapas/02');
 await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await open(page,'/progresso');
 await expect(page.getByRole('heading',{name:'Etapas em andamento'})).toBeVisible();
 await expect(page.getByRole('link',{name:/Etapa 02 — Web, HTTP, redes, Git e ferramentas/})).toBeVisible();
 await expect(page.getByText('Atividades concluídas: 1/12',{exact:false})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('link',{name:/Etapa 02 — Web, HTTP, redes, Git e ferramentas/})).toBeVisible();
 // 17: Comportamento em mobile
 await page.setViewportSize({width:375,height:900});
 await open(page,'/etapas/02');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath('stage-02-hero-mobile.png')});
});
test('Stage 03 tracks (PHP+Laravel vs TS+Node+Express), NestJS optionality, exercises, projects and progress preservation',async({page,context},info)=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await page.setViewportSize({width:1440,height:1000});
 // 1: Abrir a Etapa 03 e verificar identidade visual distinta (.pf-hero-backend)
 await open(page,'/etapas/03');
 await expect(page.locator('.pf-hero-backend')).toBeVisible();
 await expect(page.locator('.pf-map-art')).toHaveCount(0);
 await expect(page.locator('.pf-hero-net')).toHaveCount(0);
 await page.screenshot({path:info.outputPath('stage-03-hero-php-desktop.png')});
 // 2: Selecionar Trilha A — PHP + Laravel e verificar que NestJS não aparece
 const btnPhp=page.getByRole('button',{name:/TRILHA A.*PHP \+ Laravel/});
 const btnTs=page.getByRole('button',{name:/TRILHA B.*TypeScript \+ Node\.js \+ Express/});
 await expect(btnPhp).toHaveAttribute('aria-pressed','true');
 await expect(page.getByText('NestJS — Aprofundamento opcional')).toHaveCount(0);
 // 4: Verificar tópicos da trilha PHP
 await open(page,'/etapas/03/topicos');
 await expect(page.getByRole('link',{name:'PHP moderno: sintaxe, arrays, funções, datas e JSON'}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Estrutura de diretórios e inicialização do Laravel'}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'NestJS (Opcional): módulos, controllers, providers, DTOs e pipes sobre Node.js'})).toHaveCount(0);
 // 5: Verificar exercícios da trilha PHP
 await open(page,'/etapas/03/exercicios');
 await expect(page.getByRole('link',{name:/Classe Livro e Catálogo CLI/}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/})).toHaveCount(0);
 // 7, 8, 9: Iniciar e parar Etapa 03, iniciar e concluir exercício PHP, revelar dicas e abrir prompts
 await open(page,'/etapas/03');
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await open(page,'/etapas/03/exercicios/php-classe-livro');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();
 await expect(page.getByText('Dica 1:',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();
 await expect(page.getByRole('dialog').getByRole('textbox')).toContainText('Trilha selecionada: PHP + Laravel');
 await page.keyboard.press('Escape');
 await page.getByLabel('Solução, anotações ou link do repositório').fill('Classe Livro com strict_types, __construct e toArray testada em CLI.');
 for(const cb of await page.locator('main .pf-check input').all())await cb.check();
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 // 3, 4, 5, 11, 12: Selecionar Trilha B — TypeScript + Node.js + Express, verificar NestJS opcional e preservação do progresso PHP
 await open(page,'/etapas/03');
 await expect(page.locator('.pf-net-bar')).toContainText('3% dos registros previstos na trilha (1/28 unidades · 1/12 atividades concluídas)');
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await btnTs.click();
 await expect(btnTs).toHaveAttribute('aria-pressed','true');
 await expect(page.getByText('Opcionais: NestJS (Opcional): módulos, controllers, providers, DTOs e pipes sobre Node.js.')).toBeVisible();
 await page.screenshot({path:info.outputPath('stage-03-hero-ts-desktop.png')});
 await open(page,'/etapas/03/topicos');
 await expect(page.getByRole('link',{name:'TypeScript no Backend: tipos, interfaces, unions, narrowing e generics'}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'NestJS (Opcional): módulos, controllers, providers, DTOs e pipes sobre Node.js'}).first()).toBeVisible();
 await open(page,'/etapas/03/exercicios');
 await expect(page.getByRole('link',{name:/Catálogo CLI em TypeScript Strict/}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/}).first()).toBeVisible();
 // Concluir um exercício TS e iniciar o projeto Backend Foundations Lab
 await open(page,'/etapas/03/exercicios/ts-catalogo-cli');
 await page.getByLabel('Solução, anotações ou link do repositório').fill('CLI tipada em TypeScript strict com busca e filtro.');
 for(const cb of await page.locator('main .pf-check input').all())await cb.check();
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await open(page,'/etapas/03/projeto');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 // Voltar para PHP e confirmar que o exercício PHP concluído permanece intacto
 await open(page,'/etapas/03');
 await btnPhp.click();
 await expect(page.locator('.pf-net-bar')).toContainText('3% dos registros previstos na trilha (1/28 unidades · 1/12 atividades concluídas)');
 await open(page,'/etapas/03/exercicios/php-classe-livro');
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 // 6, 13, 14, 15: Verificar Meu progresso, persistência no localStorage e responsividade mobile
 await open(page,'/progresso');
 await expect(page.getByRole('heading',{name:'Etapas em andamento'})).toBeVisible();
 await expect(page.getByRole('link',{name:/Etapa 03 — Fundamentos de Backend/})).toBeVisible();
 await expect(page.getByRole('link',{name:'Backend Foundations Lab'})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('link',{name:/Etapa 03 — Fundamentos de Backend/})).toBeVisible();
 await page.setViewportSize({width:375,height:900});
 await open(page,'/etapas/03');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath('stage-03-hero-mobile.png')});
});
test('Stage 04 REST contracts, business rules, track switching, distinct hero, exercises, projects and bookshelf stage filtering',async({page,context},info)=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await page.setViewportSize({width:1440,height:1000});
 // 1: Abrir Etapa 04 e verificar identidade visual própria (.pf-hero-rest)
 await open(page,'/etapas/04');
 await expect(page.locator('.pf-hero-rest')).toBeVisible();
 await expect(page.locator('.pf-hero-backend')).toHaveCount(0);
 await expect(page.locator('.pf-hero-net')).toHaveCount(0);
 await expect(page.locator('.pf-map-art')).toHaveCount(0);
 await expect(page.locator('.pf-rest-matrix')).toBeVisible();
 await expect(page.locator('.pf-verb-get')).toBeVisible();
 await expect(page.locator('.pf-verb-post')).toBeVisible();
 await page.screenshot({path:info.outputPath('stage-04-hero-desktop.png')});
 // 2: Iniciar, pausar e retomar Etapa 04
 await expect(page.getByRole('button',{name:'Iniciar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Parar etapa',exact:true}).click();
 await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 // 3: Verificar Trilha A (PHP) e Trilha B (TS/Express) na Etapa 04
 const btnPhp=page.getByRole('button',{name:/TRILHA A.*PHP \+ Laravel/});
 const btnTs=page.getByRole('button',{name:/TRILHA B.*TypeScript \+ Node\.js \+ Express/});
 await expect(btnPhp).toHaveAttribute('aria-pressed','true');
 await open(page,'/etapas/04/topicos');
 await expect(page.getByRole('link',{name:/Rotas de API, Controllers REST e organização de regras no Laravel/}).first()).toBeVisible();
 await open(page,'/etapas/04/exercicios');
 await expect(page.getByRole('link',{name:/CRUD básico REST na trilha escolhida/}).first()).toBeVisible();
 // Trocar para Trilha B
 await open(page,'/etapas/04');
 await btnTs.click();
 await expect(btnTs).toHaveAttribute('aria-pressed','true');
 await open(page,'/etapas/04/topicos');
 await expect(page.getByRole('link',{name:/Routers REST versionados, Controllers\/Handlers e serviços de domínio no Express/}).first()).toBeVisible();
 // 4: Abrir exercício de Problem Details e conferir dicas e prompt de IA
 await open(page,'/etapas/04/exercicios/problem-details-rfc9457');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();
 await expect(page.getByText('Dica 1:',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();
 const dialog=page.getByRole('dialog');
 await expect(dialog.getByRole('textbox')).toContainText('RFC 9457');
 await expect(dialog.getByRole('textbox')).toContainText('Etapa: 04');
 await page.keyboard.press('Escape');
 // 5: Concluir exercício e verificar progresso
 await page.getByLabel('Solução, anotações ou link do repositório').fill('Middleware RFC 9457 com application/problem+json implementado.');
 for(const cb of await page.locator('main .pf-check input').all())await cb.check();
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await expect(page.getByText('✓ Atividade concluída').first()).toBeVisible();
 // 6: Iniciar projeto principal Booking API
 await open(page,'/etapas/04/projeto');
 await expect(page.getByRole('heading',{name:/Booking API: REST & Business Rules/})).toBeVisible();
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 // 7: Verificar presença em Meu progresso
 await open(page,'/progresso');
 await expect(page.getByRole('heading',{name:'Etapas em andamento'})).toBeVisible();
 await expect(page.getByRole('link',{name:/Etapa 04 — APIs REST e Regras de Negócio/})).toBeVisible();
 await expect(page.getByRole('link',{name:/Booking API: REST & Business Rules/})).toBeVisible();
 // 8: Testar a nova página de Livros e Referências (Parte A)
 await open(page,'/referencias?etapa=04');
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('04');
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/}).locator('option[value="todos"]')).toHaveCount(0);
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/}).locator('option')).toHaveCount(20);
 await expect(page.locator('.pf-filter-summary')).toContainText('Etapa 04 — APIs REST e Regras de Negócio:');
 // Filtro por Tipo de Material: Livros
 await page.getByRole('combobox',{name:/^Tipo de material/}).selectOption('Livros');
 await expect(page.getByRole('heading',{name:/Livros recomendados na Etapa 04/})).toBeVisible();
 await expect(page.getByRole('heading',{name:/Referências técnicas da Etapa 04/})).toHaveCount(0);
 // Filtro por Tipo de Material: Documentações
 await page.getByRole('combobox',{name:/^Tipo de material/}).selectOption('Documentações');
 await expect(page.getByRole('heading',{name:/Referências técnicas da Etapa 04/})).toBeVisible();
 await expect(page.getByRole('heading',{name:/Livros recomendados na Etapa 04/})).toHaveCount(0);
 // Filtro por Especificações e RFCs e Busca textual
 await page.getByRole('combobox',{name:/^Tipo de material/}).selectOption('Especificações e RFCs');
 await page.getByPlaceholder('Título, autor, fonte, RFC ou assunto...').fill('RFC 9457');
 await expect(page.getByRole('status')).toContainText('1 material encontrado');
 await expect(page.getByRole('link',{name:/RFC 9457/})).toBeVisible();
 // Limpar filtros: deve resetar os complementares MAS preservar a etapa 04!
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('04');
 await expect(page.getByPlaceholder('Título, autor, fonte, RFC ou assunto...')).toHaveValue('');
 // 9: Responsividade mobile da Etapa 04
 await page.setViewportSize({width:375,height:900});
 await open(page,'/etapas/04');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath('stage-04-hero-mobile.png')});
});
test('exercises and projects scalable stage filtering: 24 verification steps',async({page})=>{
 // 1. Abrir Exercícios
 await open(page,'/exercicios');

 // 2. Confirmar ausência de "Todas as etapas"
 const stageSelect=page.getByRole('combobox',{name:/^Etapa selecionada/});
 await expect(stageSelect).toBeVisible();
 await expect(stageSelect.locator('option[value="todos"]')).toHaveCount(0);
 await expect(stageSelect.locator('option')).toHaveCount(20);

 // 3, 4, 5, 6, 7. Selecionar Etapas 00, 01, 02, 03, 04
 // 8. Confirmar que só aparecem exercícios da etapa selecionada
 for(const stageId of ['00','01','02','03','04','05','06'] as const){
  await stageSelect.selectOption(stageId);
  await expect(stageSelect).toHaveValue(stageId);
  const tags=page.locator('.pf-cards .pf-card .pf-tags');
  const count=await tags.count();
  expect(count).toBeGreaterThan(0);
  for(let i=0;i<count;i++){
   await expect(tags.nth(i)).toContainText(`Etapa ${stageId}`);
  }
 }

 // 9. Filtrar por dificuldade
 await stageSelect.selectOption('01');
 await page.getByLabel('Dificuldade').selectOption('inicial');
 await expect(page.getByRole('status')).toContainText('3 exercícios');
 await page.getByLabel('Dificuldade').selectOption('todos');

 // 10. Filtrar por status
 await page.getByLabel('Status').selectOption('concluido');
 await expect(page.getByRole('status')).toContainText('Nenhum exercício encontrado com esses filtros.');
 await page.getByLabel('Status').selectOption('nao-iniciada');
 await expect(page.getByRole('status')).toContainText('11 exercícios');
 await page.getByLabel('Status').selectOption('todos');

 // 11. Filtrar por trilha, quando aplicável
 // Etapa 01 não possui filtro de trilha
 await expect(page.getByLabel('Trilha dos exercícios')).toHaveCount(0);
 // Etapa 03 possui filtro de trilha
 await stageSelect.selectOption('03');
 await expect(page.getByLabel('Trilha dos exercícios')).toBeVisible();
 await page.getByLabel('Trilha dos exercícios').selectOption('php');
 await expect(page.getByRole('status')).toContainText('9 exercícios');
 await page.getByLabel('Trilha dos exercícios').selectOption('javascript');
 await expect(page.getByRole('status')).toContainText('10 exercícios');
 await page.getByLabel('Trilha dos exercícios').selectOption('todos');
 await expect(page.getByRole('status')).toContainText('16 exercícios');

 // 12. Pesquisar pelo título
 await page.getByPlaceholder('Título, assunto ou competência...').fill('Catálogo Modular');
 await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
 await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/})).toBeVisible();

 // 13. Combinar filtros
 await page.getByPlaceholder('Título, assunto ou competência...').fill('');
 await page.getByLabel('Trilha dos exercícios').selectOption('javascript');
 await page.getByLabel('Dificuldade').selectOption('extra');
 await page.getByLabel('Status').selectOption('nao-iniciada');
 await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
 await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/})).toBeVisible();

 // 14. Limpar filtros secundários (preserva etapa)
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();
 await expect(stageSelect).toHaveValue('03');
 await expect(page.getByLabel('Dificuldade')).toHaveValue('todos');
 await expect(page.getByLabel('Status')).toHaveValue('todos');
 await expect(page.getByPlaceholder('Título, assunto ou competência...')).toHaveValue('');
 await expect(page.getByRole('status')).toContainText('16 exercícios');

 // 15, 16. Abrir Projetos e repetir testes de seleção de etapa
 await open(page,'/projetos');
 const projStageSelect=page.getByRole('combobox',{name:/^Etapa selecionada/});
 await expect(projStageSelect).toBeVisible();
 await expect(projStageSelect.locator('option[value="todos"]')).toHaveCount(0);
 await expect(projStageSelect.locator('option')).toHaveCount(20);
 // Automatic selection preserved from previous stage ('03')
 await expect(projStageSelect).toHaveValue('03');
 for(const stageId of ['00','01','02','03','04','05','06'] as const){
  await projStageSelect.selectOption(stageId);
  const tags=page.locator('.pf-cards .pf-card .pf-tags');
  const count=await tags.count();
  expect(count).toBeGreaterThan(0);
  for(let i=0;i<count;i++){
   await expect(tags.nth(i)).toContainText(`Etapa ${stageId}`);
  }
 }

 // 17, 18. Iniciar uma atividade e confirmar que aparece em "Em andamento"
 await open(page,'/etapas/02/exercicios/anatomia');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await open(page,'/exercicios?etapa=02');
 await page.getByLabel('Status').selectOption('em-andamento');
 await expect(page.getByRole('link',{name:/Anatomia de 10 requisições/})).toBeVisible();

 // 19, 20. Concluir uma atividade e confirmar atualização dos filtros
 await open(page,'/etapas/02/exercicios/anatomia');
 await page.getByLabel('Solução, anotações ou link do repositório').fill('URLs testadas com sucesso.');
 for(const cb of await page.locator('main .pf-check input').all())await cb.check();
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await open(page,'/exercicios?etapa=02');
 await page.getByLabel('Status').selectOption('concluido');
 await expect(page.getByRole('link',{name:/Anatomia de 10 requisições/})).toBeVisible();
 await page.getByLabel('Status').selectOption('em-andamento');
 await expect(page.getByRole('status')).toContainText('Nenhum exercício encontrado com esses filtros.');

 // 21. Abrir atividade a partir de Meu progresso
 await open(page,'/etapas/02/projeto');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await open(page,'/progresso');
 await page.getByRole('link',{name:/HTTP Diagnostic Lab/}).first().click();
 await expect(page.getByRole('heading',{name:/HTTP Diagnostic Lab/})).toBeVisible();

 // 22. Recarregar a página e verificar persistência
 await open(page,'/exercicios');
 await page.getByRole('combobox',{name:/^Etapa selecionada/}).selectOption('03');
 await page.reload();
 await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('03');

 // 23. Layout mobile
 await page.setViewportSize({width:320,height:800});
 await open(page,'/exercicios?etapa=04');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);

 // 24. Funcionamento no GitHub Pages
 expect(page.url()).toContain('#/exercicios?etapa=04');
});
test('real browser zoom 200/400 percent in both themes',async({browserName},info)=>{
 expect(browserName).toBe('chromium');test.setTimeout(120_000);
 const {chromium}=await import('@playwright/test');const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join,resolve}=await import('node:path');const profile=await mkdtemp(join(tmpdir(),'practice-zoom-')),extension=resolve('e2e/zoom-extension');
 const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
 try{const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0];for(const theme of ['dark','light'])for(const route of ['/','/etapas/00/projeto','/etapas/01/projeto','/etapas/02','/etapas/03','/etapas/04','/etapas/05','/etapas/07','/etapas/07/projeto','/etapas/08','/etapas/08/topicos','/etapas/08/exercicios/08-16','/etapas/08/projeto','/etapas/09','/etapas/09/prova-final','/progresso']){await page.goto('http://127.0.0.1:4181/stacktrail/#'+route);await expect(page.locator('main h1')).toBeVisible();if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
 for(const factor of [2,4]){const actual=await worker.evaluate(async factor=>{type Api={tabs:{query:(v:object)=>Promise<{id:number;url:string}[]>;setZoom:(id:number,n:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};const c=(globalThis as unknown as {chrome:Api}).chrome;const tab=(await c.tabs.query({})).find(t=>t.url?.includes('127.0.0.1:4181'))!;await c.tabs.setZoom(tab.id,factor);return c.tabs.getZoom(tab.id);},factor);expect(actual).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(1440/factor)+10);await info.attach('zoom',{body:JSON.stringify({theme,route,factor,actual,...await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}))}),contentType:'application/json'});} }
 }finally{await context.close();await rm(profile,{recursive:true,force:true});}
});



test('Stage05 sectors, stack, persistence, alternative projects and free books',async({page})=>{
 await open(page,'/');await page.locator('.pf-stage[href="#/etapas/05"]').click();
 await expect(page.locator('.pf-data-hero')).toBeVisible();await expect(page.locator('.pf-data-flow')).toContainText('SQL → PostgreSQL');
 const php=page.getByRole('button',{name:/TRILHA A PHP/});const ts=page.getByRole('button',{name:/TRILHA B TypeScript/});
 await ts.focus();await page.keyboard.press('Enter');await expect(ts).toHaveAttribute('aria-pressed','true');await expect(page.locator('.pf-data-flow')).toContainText('Knex');
 await php.click();await expect(php).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
 await open(page,'/exercicios?etapa=05');await expect(page.locator('main .pf-card h2')).toHaveCount(9);
 await page.getByLabel(/^Setor/).selectOption('Saúde');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
 await page.getByLabel(/^Dificuldade/).selectOption('inicial');await expect(page.getByText('Nenhum exercício encontrado com esses filtros.',{exact:true}).first()).toBeVisible();
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).first().click();await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('05');
 await page.getByLabel(/^Buscar na etapa/).fill('Fintech');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
 await page.locator('main .pf-card h2 a').click();await expect(page.locator('main')).toContainText('Financeiro');
 await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Rascunho sintético de teste; SQL não executado pela plataforma.');
 await open(page,'/progresso');await expect(page.getByRole('link',{name:'Fintech: transferência atômica'})).toBeVisible();
 await open(page,'/etapas/05');await page.getByRole('button',{name:'Parar etapa',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 await open(page,'/etapas/05/exercicios/05-ex-07');await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue(/Rascunho sintético/);await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue(/Rascunho sintético/);
 await open(page,'/projetos?etapa=05');await expect(page.locator('main .pf-card h2')).toHaveCount(5);await expect(page.getByText('Projeto avançado equivalente — escolha um',{exact:true})).toHaveCount(3);
 await page.getByRole('link',{name:/SaaS Billing API/}).click();await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
 await expect(page.getByRole('link',{name:'TypeScript: pg, Knex, migrations e relações →',exact:true})).toHaveCount(0);
 const help=page.getByRole('button',{name:'Pedir ajuda à IA',exact:true});await help.click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(help).toBeFocused();
 await open(page,'/referencias?etapa=05');await expect(page.locator('main .pf-reference')).toHaveCount(9);await page.getByRole('button',{name:'Carregar mais',exact:true}).click();expect(await page.locator('main .pf-reference').count()).toBeGreaterThan(9);
 await page.getByLabel(/^Tipo de material/).selectOption('Livros');await page.getByLabel(/^Acesso/).selectOption('Gratuito');await expect(page.getByRole('heading',{name:'Database Design',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Sistema de Banco de Dados',exact:true})).toHaveCount(0);
 await page.getByLabel(/^Acesso/).selectOption('Pago');await expect(page.getByRole('heading',{name:'Database Design',exact:true})).toHaveCount(0);await expect(page.locator('.pf-book-cover img')).toHaveCount(2);
});

test('Stage05 published routes in both themes, axe and page errors',async({page},info)=>{
 test.setTimeout(180_000);
 const list=['/etapas/05','/etapas/05/topicos','/etapas/05/referencias','/etapas/05/exercicios','/etapas/05/projeto','/projetos?etapa=05',...topics.filter(t=>t.stageId==='05').map(t=>`/etapas/05/topicos/${t.id}`),...tasks.filter(t=>t.stageId==='05').map(t=>`/etapas/05/exercicios/${t.slug}`),...projects.filter(t=>t.stageId==='05').map(t=>`/projetos/${t.slug}`)];
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const theme of ['dark','light']){
  await open(page,'/etapas/05');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  for(const path of list){await open(page,path);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations,path).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);if(result.incomplete.length)await info.attach('incomplete-'+theme+'-'+path.replaceAll('/','_'),{body:JSON.stringify(result.incomplete),contentType:'application/json'});}
 }
 expect(errors).toEqual([]);
 await open(page,'/etapas/05');await page.setViewportSize({width:320,height:900});await page.getByLabel('Tamanho da fonte').selectOption('150');await page.screenshot({path:info.outputPath('stage05-mobile.png'),fullPage:false});
});

test('Stage05 status filters and achievement reversal from a real activity edit',async({page})=>{
 const p=blankPilot(),s=getStage('05',p.track)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);p.stageEvidence['05']='Registro sintético para teste de interface, sem execução de SQL';
 for(const task of [...s.exercises,...projects.filter(a=>a.id==='05-project-booking')]){const a=blankAttempt(task.id);p.attempts[task.id]={...a,solution:'Fixture de autoavaliação',checks:a.checks.map(()=>true),status:'concluido'};}
 p.attempts['05-ex-01']=blankAttempt('05-ex-01');await page.addInitScript(({key,p})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(p));},{key:PILOT_KEY,p});
 await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('concluido');await expect(page.locator('main .pf-card h2')).toHaveCount(8);
 await open(page,'/etapas/05/exercicios/05-ex-01');await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Tentativa declarada sintética para testar estado; não é solução SQL.');
 for(const checkbox of await page.locator('main .pf-check input').all())await checkbox.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await open(page,'/progresso');const achievement=page.locator('article.pf-card').filter({has:page.getByRole('heading',{name:'Primeira etapa concluída',exact:true})});await expect(achievement).toHaveClass(/pf-achieved/);
 await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('concluido');await expect(page.locator('main .pf-card h2')).toHaveCount(9);
 await open(page,'/etapas/05/exercicios/05-ex-01');await page.getByLabel('Solução, anotações ou link do repositório').fill('Versão alterada deve exigir nova autoavaliação.');await page.reload();await expect(page.locator('main .pf-check input:checked')).toHaveCount(0);
 await open(page,'/progresso');await expect(achievement).not.toHaveClass(/pf-achieved/);
 await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('em-andamento');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
});

test('Stage06 testing hero, sectors, track switch, Bug Hunt project and 9 sectoral exercises',async({page})=>{
 await open(page,'/');await page.locator('.pf-stage[href="#/etapas/06"]').click();
 await expect(page.locator('.pf-hero-testing')).toBeVisible();
 await expect(page.getByRole('heading',{name:'Testes automatizados e depuração',exact:true})).toBeVisible();
 await expect(page.locator('.pf-test-steps .pf-test-step-card')).toHaveCount(3);
 await expect(page.locator('.pf-test-pipeline-flow li')).toHaveCount(3);
 await page.getByRole('button',{name:/TRILHA B/}).click();
 await expect(page.getByText('node:test / Vitest',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:/TRILHA A/}).click();
 await expect(page.getByText('PHPUnit / Pest Unit',{exact:true})).toBeVisible();

 await open(page,'/exercicios?etapa=06');
 await expect(page.locator('main .pf-card h2')).toHaveCount(9);
 await page.getByLabel('Setor').selectOption('Fintech');
 await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
 await expect(page.getByRole('link',{name:/Fintech: Reprodução e Teste de Regressão/})).toBeVisible();
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).first().click();
 await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('06');
 await expect(page.locator('main .pf-card h2')).toHaveCount(9);

 await open(page,'/projetos?etapa=06');
 await expect(page.locator('main .pf-card h2')).toHaveCount(3);
 await expect(page.getByRole('link',{name:/Bug Hunt & Regression Portfolio/})).toBeVisible();

 await open(page,'/referencias?etapa=06');
 await expect(page.locator('main .pf-reference')).toHaveCount(9);
 await expect(page.locator('main .pf-book')).toHaveCount(3);
 await page.getByRole('button',{name:'Carregar mais',exact:true}).click();
 expect(await page.locator('main .pf-reference').count()).toBeGreaterThan(9);
 await page.getByLabel(/^Tipo de material/).selectOption('Livros');
 await expect(page.getByRole('heading',{name:/Refatoração/})).toBeVisible();
 await expect(page.locator('.pf-book-cover img').first()).toBeVisible();
});

test('Stage06 published routes in both themes, axe and page errors',async({page},info)=>{
 test.setTimeout(180_000);
 const list=['/etapas/06','/etapas/06/topicos','/etapas/06/referencias','/etapas/06/exercicios','/etapas/06/projeto','/projetos?etapa=06',...topics.filter(t=>t.stageId==='06').map(t=>`/etapas/06/topicos/${t.id}`),...tasks.filter(t=>t.stageId==='06').map(t=>`/etapas/06/exercicios/${t.slug}`),...projects.filter(t=>t.stageId==='06').map(t=>`/projetos/${t.slug}`)];
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const theme of ['dark','light']){
  await open(page,'/etapas/06');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  for(const path of list){await open(page,path);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations,path).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);if(result.incomplete.length)await info.attach('incomplete-'+theme+'-'+path.replaceAll('/','_'),{body:JSON.stringify(result.incomplete),contentType:'application/json'});}
 }
 expect(errors).toEqual([]);
 await open(page,'/etapas/06');await page.setViewportSize({width:320,height:900});await page.getByLabel('Tamanho da fonte').selectOption('150');await page.screenshot({path:info.outputPath('stage06-mobile.png'),fullPage:false});
});



test('Stage05 real editorial covers load locally and missing cover has fallback',async({page})=>{
 await open(page,'/referencias?etapa=05');await page.getByLabel(/^Tipo de material/).selectOption('Livros');const images=page.locator('.pf-book-cover img');await expect(images).toHaveCount(3);
 for(const image of await images.all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate((i:HTMLImageElement)=>i.naturalWidth)).toBeGreaterThan(0);expect(await image.getAttribute('src')).toMatch(/^\/stacktrail\/covers\/.+\.webp$/);expect(await image.getAttribute('alt')).toMatch(/^Capa/);}
 await page.route('**/covers/sistema-banco-dados-7ed.webp',route=>route.abort());await page.reload();const card=page.locator('.pf-book').filter({has:page.getByRole('heading',{name:'Sistema de Banco de Dados',exact:true})});await card.scrollIntoViewIfNeeded();await expect(card.getByRole('img',{name:/Capa indisponível/})).toBeVisible();
});


test('Implemented stages use locally served book covers',async({page})=>{
 for(const [stage,count] of [['00',1],['01',2],['02',5],['03',6],['04',8],['05',3],['06',3]] as const){
  await open(page,`/referencias?etapa=${stage}`);
  await page.getByLabel(/^Tipo de material/).selectOption('Livros');
  if(await page.getByLabel(/^Trilha/).count())await page.getByLabel(/^Trilha/).selectOption('todos');
  const images=page.locator('.pf-book-cover img');
  await expect(images).toHaveCount(count);
  for(const img of await images.all()){
   expect(await img.getAttribute('src')).toMatch(/^\/stacktrail\/covers\/[a-z0-9-]+\.webp$/);
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate((i:HTMLImageElement)=>i.naturalWidth)).toBeGreaterThan(0);
  }
 }
});


test('Stage07: trilhas, filtros, tentativas, prompts e pausa real',async({page})=>{
 await open(page,'/etapas/07');await expect(page.getByRole('heading',{level:1})).toHaveText('Segurança, autenticação e autorização');
 await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();await page.getByRole('button',{name:/TRILHA B/}).click();await expect(page.getByRole('button',{name:/TRILHA B/})).toHaveAttribute('aria-pressed','true');
 await open(page,'/etapas/07/topicos');await expect(page.getByRole('heading',{name:'Express: hash e sessão explícitos',exact:true})).toBeVisible();await expect(page.getByText('Laravel: autenticação e sessão',{exact:true})).toHaveCount(0);
 await open(page,'/exercicios?etapa=07');await expect(page.locator('article.pf-card')).toHaveCount(9);
 await page.getByLabel('Dificuldade').selectOption('intermediario');await expect(page.locator('article.pf-card')).toHaveCount(3);
 await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByLabel('Etapa selecionada')).toHaveValue('07');
 await open(page,'/exercicios?etapa=05');await page.getByLabel('Setor').selectOption({index:1});await page.getByLabel('Etapa selecionada').selectOption('07');await expect(page.getByLabel('Setor')).toHaveValue('todos');await expect(page.locator('article.pf-card')).toHaveCount(9);
 await open(page,'/etapas/07/exercicios/login-admin-loja');await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Tentativa Express sintética; sem credenciais.');
 await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();const help=page.getByRole('button',{name:'Pedir ajuda à IA',exact:true});await help.click();await expect(page.getByRole('dialog').getByRole('textbox')).toContainText('Etapa 07');await page.keyboard.press('Escape');await expect(help).toBeFocused();
 await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();await expect(page.getByRole('dialog').getByRole('textbox')).toContainText('vulnerabilidades comprovadas');await page.getByRole('dialog').getByRole('button',{name:'Fechar',exact:true}).click();
 await open(page,'/progresso');await expect(page.getByRole('link',{name:'E-commerce: login administrativo'}).first()).toBeVisible();
 await open(page,'/etapas/07');await page.getByRole('button',{name:'Parar etapa',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
 await page.getByRole('button',{name:/TRILHA A/}).click();await open(page,'/etapas/07/exercicios/login-admin-loja');await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('');
 await open(page,'/etapas/07');await page.getByRole('button',{name:/TRILHA B/}).click();await open(page,'/etapas/07/exercicios/login-admin-loja');await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('Tentativa Express sintética; sem credenciais.');await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('Tentativa Express sintética; sem credenciais.');
});

test('Stage07: conclusão, card100%, recarga e reversão da trilha no navegador',async({page})=>{
 const p=blankPilot();p.currentStage='07';p.track='php';p.studied=getStage('07','php')!.topics.filter(t=>!t.optional).map(t=>t.id);p.securityEvidence={php:'Síntese sintética de teste da interface'};
 for(const a of [...getStage('07','php')!.exercises.filter(a=>!a.optional),getStage('07')!.project])p.attempts[a.id+'@php']={...blankAttempt(a.id),solution:'Evidência sintética para teste da plataforma',checks:a.acceptanceCriteria.map(()=>true),status:'concluido'};
 await open(page,'/');await page.evaluate(({key,value})=>localStorage.setItem(key,value),{key:PILOT_KEY,value:JSON.stringify(p)});await page.reload();const card=page.locator('.pf-stage').filter({has:page.getByText('ETAPA 07',{exact:false})});await expect(card).toContainText('100%');await expect(card).toHaveClass(/pf-complete/);
 await open(page,'/etapas/07/projeto');await page.getByRole('button',{name:'Reabrir tentativa',exact:true}).click();await open(page,'/');await expect(card).not.toHaveClass(/pf-complete/);await page.reload();await expect(card).not.toContainText('100%');
});

test('Stage07: reflow, temas, livros e controles acessíveis',async({page},info)=>{
 test.setTimeout(120000);
 for(const theme of ['dark','light']){
  await open(page,'/');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});for(const route of ['/etapas/07','/etapas/07/projeto','/exercicios?etapa=07','/referencias?etapa=07']){await open(page,route);await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme}/${width}/${route}`).toBe(true);}await open(page,'/etapas/07');await page.screenshot({path:info.outputPath(`stage07-${theme}-${width}.png`)});await page.locator('.pf-security-hero').screenshot({path:info.outputPath(`stage07-hero-${theme}-${width}.png`)});if(width<=375){await open(page,'/etapas/07/exercicios/login-admin-loja');const trigger=page.getByRole('button',{name:'Avaliar com IA',exact:true});await trigger.click();await expect(page.getByRole('dialog').getByRole('textbox')).toBeFocused();expect(await page.getByRole('dialog').evaluate(el=>el.getBoundingClientRect().right<=innerWidth)).toBe(true);await page.keyboard.press('Escape');await expect(trigger).toBeFocused();}}
 }
 await page.setViewportSize({width:1440,height:1000});await open(page,'/referencias?etapa=07');await page.getByLabel(/^Tipo de material/).selectOption('Livros');await expect(page.locator('.pf-book')).toHaveCount(3);await expect(page.locator('.pf-book-placeholder')).toHaveCount(0);await expect(page.locator('.pf-book img')).toHaveCount(3);
 for(const route of ['/etapas/07','/etapas/07/projeto','/etapas/07/exercicios/reservas-testes-seguranca']){await open(page,route);const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(axe.violations).toEqual([]);if(axe.incomplete.length)await info.attach('stage07-incomplete',{body:JSON.stringify(axe.incomplete),contentType:'application/json'});}
});
