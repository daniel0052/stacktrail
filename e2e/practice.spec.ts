import {expect,test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {topics,activities as tasks,references,projects,getStage} from '../src/practice/curriculum';
import {blankPilot,blankAttempt,PILOT_KEY} from '../src/practice/progress';
const root='/etapas/01';
async function open(page:import('@playwright/test').Page,path:string){await page.goto(`./#${path}`);await expect(page.locator('main h1')).toBeVisible();}
const routes=['/','/exercicios','/projetos','/referencias','/progresso',...Array.from({length:20},(_,i)=>'/etapas/'+String(i).padStart(2,'0')),...['00','01','02'].flatMap(id=>[`/etapas/${id}/topicos`,`/etapas/${id}/referencias`,`/etapas/${id}/exercicios`,`/etapas/${id}/projeto`]),...topics.map(t=>`/etapas/${t.stageId}/topicos/${t.id}`),...tasks.map(t=>`/etapas/${t.stageId}/exercicios/${t.slug}`),...projects.map(t=>`/projetos/${t.slug}`)];
for(const theme of ['dark','light'] as const)test(`published routes, reflow and axe: ${theme}`,async({page},info)=>{
 test.setTimeout(240_000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:1440,height:1000});await open(page,'/');if(theme==='light')await page.getByRole('button',{name:'Tema claro',exact:true}).click();
 for(const route of routes){await open(page,route);expect(await page.locator('html').getAttribute('data-theme')).toBe(theme);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect.soft(result.violations,route).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);if(result.incomplete.length)await info.attach(`incomplete-${route.replaceAll('/','_')}`,{body:JSON.stringify(result.incomplete),contentType:'application/json'});}
 expect(errors).toEqual([]);
});
test('responsive screens, font controls and screenshots',async({page},info)=>{
 for(const theme of ['dark','light']){await open(page,'/');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
 for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});for(const route of ['/','/etapas/00','/etapas/00/projeto',root,`${root}/referencias`,`${root}/exercicios/contato`,`${root}/projeto`,'/etapas/02','/etapas/02/projeto','/progresso']){await open(page,route);await page.getByRole('combobox',{name:'Tamanho da fonte'}).selectOption('150');expect.soft(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme} ${width} ${route}`).toBe(true);}await page.screenshot({path:info.outputPath(`project-${theme}-${width}.png`),fullPage:false});}
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
 await expect(page.locator('.pf-stat-grid')).toContainText('1Exercícios concluídos');
 await open(page,`${root}/exercicios/contato`);
 await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();
 await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('Estado: Em andamento');
 await open(page,'/progresso');
 await expect(page.locator('.pf-stat-grid')).toContainText('0Exercícios concluídos');
 await open(page,`${root}/exercicios/contato`);
 await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
 await page.getByLabel('Solução, anotações ou link do repositório').fill('Tentativa alterada');await expect(page.getByRole('button',{name:'Concluir por autoavaliação',exact:true})).toBeDisabled();await expect(page.locator('main .pf-check input').first()).not.toBeChecked();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('stacktrail:roadmap:1')!).attempts['ex-01'].solution)).toBe('Tentativa alterada');
});
test('legacy migration preserves original storage and does not count old lessons',async({page})=>{
 const legacy={version:8,theme:'dark',fontSize:100,lessons:['html','css'],backendTrack03:'javascript',exercises:{'ex-01':{status:'concluido',solution:'old draft',reflection:'old reflection',hints:2,checks:[true,true,true,true]}}};await page.addInitScript(raw=>localStorage.setItem('backend-academy:progress',raw),JSON.stringify(legacy));await open(page,'/progresso');await expect(page.getByText('0/11 tópicos base estudados',{exact:false})).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('backend-academy:progress'))).toBe(JSON.stringify(legacy));await open(page,`${root}/exercicios/contato`);await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('old draft');await expect(page.getByRole('status')).toContainText('Concluída (por autoavaliação)');
});
test('filters, mobile navigation and project start/stop persistence',async({page})=>{
 await page.setViewportSize({width:375,height:900});await open(page,'/');await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation').getByRole('link',{name:'Exercícios',exact:true}).click();await expect(page.getByRole('button',{name:'☰ Menu',exact:true})).toHaveAttribute('aria-expanded','false');await page.getByLabel('Dificuldade').selectOption('extra');await expect(page.getByRole('status')).toContainText('4 exercícios');await page.getByLabel('Trilha dos exercícios').selectOption('php');await expect(page.getByRole('status')).toContainText('Base comum');await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByRole('status')).toContainText('33 exercícios');
 await open(page,`${root}/referencias?topico=next`);await page.getByRole('combobox',{name:/^Idioma/}).selectOption('PT-BR');await expect(page.getByRole('status')).toHaveText('0 referências encontradas.');await expect(page.getByText('Nenhuma fonte deste recorte neste idioma.')).toBeVisible();await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByRole('status')).toContainText(`${references.length} referências`);
 await open(page,`${root}/projeto`);await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();await page.getByLabel('Solução, anotações ou link do repositório').fill('Meu projeto ainda em elaboração');await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue('Meu projeto ainda em elaboração');
 await open(page,'/progresso');await page.getByLabel('Tipo de atividade').selectOption('project');await expect(page.getByRole('link',{name:'Catálogo de livros responsivo'})).toBeVisible();
 await open(page,`${root}/projeto`);await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await expect(page.getByRole('button',{name:'Começar atividade',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();const r=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(r.violations).toEqual([]);await page.keyboard.press('Escape');
});
test('storage failure keeps in-memory attempt and clipboard absence has fallback',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Quota exceeded','QuotaExceededError');};Object.defineProperty(navigator,'clipboard',{get:()=>undefined});});await open(page,`${root}/exercicios/contato`);await page.getByLabel('Solução, anotações ou link do repositório').fill('unsaved in memory');await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();await expect(page.getByRole('dialog').getByRole('textbox')).toContainText('unsaved in memory');await page.getByRole('button',{name:'Copiar prompt',exact:true}).click();await expect(page.getByRole('dialog').getByRole('status')).toContainText('Cópia indisponível');await page.keyboard.press('Escape');await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
});
test('book alternative navigation and blocked storage recovery',async({page})=>{
 await open(page,root);await page.getByRole('link',{name:'TypeScript · Everyday Types',exact:true}).first().click();await expect(page.locator('#ref-ts')).toBeInViewport();expect(page.url()).toContain('/referencias#ref-ts');
 await page.addInitScript(()=>{Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError');};});await page.reload();await open(page,'/progresso');await expect(page.getByRole('heading',{name:'Meu progresso'})).toBeVisible();await expect(page.getByRole('alert')).toContainText('Não foi possível ler o progresso');
});

test('filter labels and helper text have distinct layout rows',async({page},info)=>{
 await page.setViewportSize({width:1440,height:1000});await open(page,'/');
 for(const label of await page.locator('.pf-tools .pf-field').all()){const bounds=await label.evaluate(el=>{const range=document.createRange();range.selectNode(el.firstChild!);const text=range.getBoundingClientRect();const control=el.querySelector('select')!.getBoundingClientRect();const help=el.querySelector('span')?.getBoundingClientRect();return {textBottom:text.bottom,controlTop:control.top,controlBottom:control.bottom,helpTop:help?.top};});expect(bounds.controlTop).toBeGreaterThan(bounds.textBottom);if(bounds.helpTop)expect(bounds.helpTop).toBeGreaterThan(bounds.controlBottom);}
 await page.screenshot({path:info.outputPath('roadmap-filters-desktop.png')});
});

for(const id of ['00','01','02'] as const)test(`stage ${id} completion, card, reversal, reload and compact menu`,async({page})=>{
 const p=blankPilot(),s=getStage(id)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);p.stageEvidence[id]='Evidências declaradas no teste de interface';
 for(const t of [...s.exercises.filter(t=>t.level==='inicial'||t.level==='intermediario'),...(id==='00'||id==='02'?[s.project]:[])]){const a=blankAttempt(t.id);p.attempts[t.id]={...a,solution:'Registro fictício para testar progresso, sem aprovação técnica',checks:a.checks.map(()=>true),status:'concluido'};}
 const last=p.studied.pop()!;await page.addInitScript(({key,p})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(p));},{key:PILOT_KEY,p});
 await open(page,`/etapas/${id}/topicos/${last}`);await page.getByLabel('Estudei este tópico').check();await open(page,`/etapas/${id}`);await expect(page.getByText('✓ Etapa concluída')).toBeVisible();await open(page,'/');const card=page.locator(`.pf-stage[href="#/etapas/${id}"]`);await expect(card).toHaveClass(/pf-complete/);await expect(card).toContainText('100%');expect(await page.locator('#pf-nav a').count()).toBe(5);await page.reload();await expect(card).toHaveClass(/pf-complete/);
 await open(page,`/etapas/${id}/topicos/${last}`);await page.getByLabel('Estudei este tópico').uncheck();await open(page,'/');await expect(card).not.toHaveClass(/pf-complete/);await page.reload();await expect(card).not.toHaveClass(/pf-complete/);
 await open(page,'/etapas/03');await expect(page.getByText('ETAPA 03 / EM PREPARAÇÃO')).toBeVisible();await expect(page.getByRole('link',{name:/Etapa anterior/})).toBeVisible();
 await open(page,'/etapas/03/exercicios');await expect(page.getByRole('heading',{name:'Página não encontrada'})).toBeVisible();
});
test('Stage00 representation, bookshelf covers and local navigation after loading',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,'/etapas/00/exercicios/desafio-05');await page.getByRole('button',{name:'Revelar dica 1',exact:true}).click();await page.getByRole('button',{name:'Avaliar com IA',exact:true}).click();const d=page.getByRole('dialog');await expect(d.getByRole('textbox')).toContainText('diagramas ou pseudocódigo');await expect(d.getByRole('textbox')).toContainText('Dicas já utilizadas (1)');await d.getByRole('button',{name:'Copiar prompt',exact:true}).click();await expect(d.getByRole('status')).toHaveText('Prompt copiado.');expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('Etapa: 00');await page.keyboard.press('Escape');
 await open(page,'/referencias');expect(await page.locator('.pf-book-cover img').count()).toBe(8);for(const img of await page.locator('.pf-book-cover img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);}await context.setOffline(true);await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Meu progresso',exact:true}).click();await expect(page.getByRole('heading',{name:'Meu progresso'})).toBeVisible();await context.setOffline(false);
});
test('stage start/pause/resume lifecycle across 00/01/02, progress preservation, mobile and distinct Stage 02 hero',async({page},info)=>{
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
test('real browser zoom 200/400 percent in both themes',async({browserName},info)=>{
 expect(browserName).toBe('chromium');test.setTimeout(120_000);
 const {chromium}=await import('@playwright/test');const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join,resolve}=await import('node:path');const profile=await mkdtemp(join(tmpdir(),'practice-zoom-')),extension=resolve('e2e/zoom-extension');
 const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
 try{const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0];for(const theme of ['dark','light'])for(const route of ['/','/etapas/00/projeto','/etapas/01/projeto','/etapas/02','/progresso']){await page.goto('http://127.0.0.1:4181/stacktrail/#'+route);await expect(page.locator('main h1')).toBeVisible();if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
 for(const factor of [2,4]){const actual=await worker.evaluate(async factor=>{type Api={tabs:{query:(v:object)=>Promise<{id:number;url:string}[]>;setZoom:(id:number,n:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};const c=(globalThis as unknown as {chrome:Api}).chrome;const tab=(await c.tabs.query({})).find(t=>t.url?.includes('127.0.0.1:4181'))!;await c.tabs.setZoom(tab.id,factor);return c.tabs.getZoom(tab.id);},factor);expect(actual).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(1440/factor)+10);await info.attach('zoom',{body:JSON.stringify({theme,route,factor,actual,...await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}))}),contentType:'application/json'});} }
 }finally{await context.close();await rm(profile,{recursive:true,force:true});}
});
