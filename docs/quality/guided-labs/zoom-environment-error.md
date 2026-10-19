# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice.spec.ts >> real browser zoom 200/400 percent in both themes
- Location: e2e\practice.spec.ts:525:1

# Error details

```
Error: browserType.launchPersistentContext: spawn UNKNOWN
Call log:
  - <launching> C:\Users\danie\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,BlockOriginHeaderModificationOnRedirect,AvoidCorsURLLoaderRestartOnRedirect,Translate,AutoDeElevate,OptimizationHints,NetworkTimeServiceQuerying,AimEnabled,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --disable-extensions-except=C:\Users\danie\Documents\stacktrail\e2e\zoom-extension --load-extension=C:\Users\danie\Documents\stacktrail\e2e\zoom-extension --window-size=1440,1000 --user-data-dir=C:\Users\danie\AppData\Local\Temp\practice-zoom-TAm6kT --remote-debugging-pipe about:blank

```

# Test source

```ts
  428 |  await page.getByLabel('Dificuldade').selectOption('inicial');
  429 |  await expect(page.getByRole('status')).toContainText('3 exercícios');
  430 |  await page.getByLabel('Dificuldade').selectOption('todos');
  431 | 
  432 |  // 10. Filtrar por status
  433 |  await page.getByLabel('Status').selectOption('concluido');
  434 |  await expect(page.getByRole('status')).toContainText('Nenhum exercício encontrado com esses filtros.');
  435 |  await page.getByLabel('Status').selectOption('nao-iniciada');
  436 |  await expect(page.getByRole('status')).toContainText('11 exercícios');
  437 |  await page.getByLabel('Status').selectOption('todos');
  438 | 
  439 |  // 11. Filtrar por trilha, quando aplicável
  440 |  // Etapa 01 não possui filtro de trilha
  441 |  await expect(page.getByLabel('Trilha dos exercícios')).toHaveCount(0);
  442 |  // Etapa 03 possui filtro de trilha
  443 |  await stageSelect.selectOption('03');
  444 |  await expect(page.getByLabel('Trilha dos exercícios')).toBeVisible();
  445 |  await page.getByLabel('Trilha dos exercícios').selectOption('php');
  446 |  await expect(page.getByRole('status')).toContainText('9 exercícios');
  447 |  await page.getByLabel('Trilha dos exercícios').selectOption('javascript');
  448 |  await expect(page.getByRole('status')).toContainText('10 exercícios');
  449 |  await page.getByLabel('Trilha dos exercícios').selectOption('todos');
  450 |  await expect(page.getByRole('status')).toContainText('16 exercícios');
  451 | 
  452 |  // 12. Pesquisar pelo título
  453 |  await page.getByPlaceholder('Título, assunto ou competência...').fill('Catálogo Modular');
  454 |  await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
  455 |  await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/})).toBeVisible();
  456 | 
  457 |  // 13. Combinar filtros
  458 |  await page.getByPlaceholder('Título, assunto ou competência...').fill('');
  459 |  await page.getByLabel('Trilha dos exercícios').selectOption('javascript');
  460 |  await page.getByLabel('Dificuldade').selectOption('extra');
  461 |  await page.getByLabel('Status').selectOption('nao-iniciada');
  462 |  await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
  463 |  await expect(page.getByRole('link',{name:/Catálogo Modular com NestJS/})).toBeVisible();
  464 | 
  465 |  // 14. Limpar filtros secundários (preserva etapa)
  466 |  await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();
  467 |  await expect(stageSelect).toHaveValue('03');
  468 |  await expect(page.getByLabel('Dificuldade')).toHaveValue('todos');
  469 |  await expect(page.getByLabel('Status')).toHaveValue('todos');
  470 |  await expect(page.getByPlaceholder('Título, assunto ou competência...')).toHaveValue('');
  471 |  await expect(page.getByRole('status')).toContainText('16 exercícios');
  472 | 
  473 |  // 15, 16. Abrir Projetos e repetir testes de seleção de etapa
  474 |  await open(page,'/projetos');
  475 |  const projStageSelect=page.getByRole('combobox',{name:/^Etapa selecionada/});
  476 |  await expect(projStageSelect).toBeVisible();
  477 |  await expect(projStageSelect.locator('option[value="todos"]')).toHaveCount(0);
  478 |  await expect(projStageSelect.locator('option')).toHaveCount(20);
  479 |  // Automatic selection preserved from previous stage ('03')
  480 |  await expect(projStageSelect).toHaveValue('03');
  481 |  for(const stageId of ['00','01','02','03','04','05','06'] as const){
  482 |   await projStageSelect.selectOption(stageId);
  483 |   const tags=page.locator('.pf-cards .pf-card .pf-tags');
  484 |   const count=await tags.count();
  485 |   expect(count).toBeGreaterThan(0);
  486 |   for(let i=0;i<count;i++){
  487 |    await expect(tags.nth(i)).toContainText(`Etapa ${stageId}`);
  488 |   }
  489 |  }
  490 | 
  491 |  // 17, 18. Iniciar uma atividade e confirmar que aparece em "Em andamento"
  492 |  await open(page,'/etapas/02/exercicios/anatomia');
  493 |  await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
  494 |  await open(page,'/exercicios?etapa=02');
  495 |  await page.getByLabel('Status').selectOption('em-andamento');
  496 |  await expect(page.getByRole('link',{name:/Anatomia de 10 requisições/})).toBeVisible();
  497 | 
  498 |  // 19, 20. Concluir uma atividade e confirmar atualização dos filtros
  499 |  await open(page,'/etapas/02/exercicios/anatomia');
  500 |  await page.getByLabel('Solução, anotações ou link do repositório').fill('URLs testadas com sucesso.');
  501 |  for(const cb of await page.locator('main .pf-check input').all())await cb.check();
  502 |  await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
  503 |  await open(page,'/exercicios?etapa=02');
  504 |  await page.getByLabel('Status').selectOption('concluido');
  505 |  await expect(page.getByRole('link',{name:/Anatomia de 10 requisições/})).toBeVisible();
  506 |  await page.getByLabel('Status').selectOption('em-andamento');
  507 |  await expect(page.getByRole('status')).toContainText('Nenhum exercício encontrado com esses filtros.');
  508 | 
  509 |  // 21. Abrir atividade a partir de Meu progresso
  510 |  await open(page,'/etapas/02/projeto');
  511 |  await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
  512 |  await open(page,'/progresso');
  513 |  await page.getByRole('link',{name:/HTTP Diagnostic Lab/}).first().click();
  514 |  await expect(page.getByRole('heading',{name:/HTTP Diagnostic Lab/})).toBeVisible();
  515 | 
  516 |  // 22. Recarregar a página e verificar persistência
  517 |  await open(page,'/exercicios');
  518 |  await page.getByRole('combobox',{name:/^Etapa selecionada/}).selectOption('03');
  519 |  await page.reload();
  520 |  await expect(page.getByRole('combobox',{name:/^Etapa selecionada/})).toHaveValue('03');
  521 | 
  522 |  // 23. Layout mobile
  523 |  await page.setViewportSize({width:320,height:800});
  524 |  await open(page,'/exercicios?etapa=04');
  525 |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  526 | 
  527 |  // 24. Funcionamento no GitHub Pages
> 528 |  expect(page.url()).toContain('#/exercicios?etapa=04');
      |                ^ Error: browserType.launchPersistentContext: spawn UNKNOWN
  529 | });
  530 | test('real browser zoom 200/400 percent in both themes',async({browserName},info)=>{
  531 |  expect(browserName).toBe('chromium');test.setTimeout(120_000);
  532 |  const {chromium}=await import('@playwright/test');const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join,resolve}=await import('node:path');const profile=await mkdtemp(join(tmpdir(),'practice-zoom-')),extension=resolve('e2e/zoom-extension');
  533 |  const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
  534 |  try{const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0];for(const theme of ['dark','light'])for(const route of ['/','/etapas/00/projeto','/etapas/01/projeto','/etapas/02','/etapas/03','/etapas/04','/etapas/05','/etapas/07','/etapas/07/projeto','/progresso']){await page.goto('http://127.0.0.1:4181/stacktrail/#'+route);await expect(page.locator('main h1')).toBeVisible();if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  535 |  for(const factor of [2,4]){const actual=await worker.evaluate(async factor=>{type Api={tabs:{query:(v:object)=>Promise<{id:number;url:string}[]>;setZoom:(id:number,n:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};const c=(globalThis as unknown as {chrome:Api}).chrome;const tab=(await c.tabs.query({})).find(t=>t.url?.includes('127.0.0.1:4181'))!;await c.tabs.setZoom(tab.id,factor);return c.tabs.getZoom(tab.id);},factor);expect(actual).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(1440/factor)+10);await info.attach('zoom',{body:JSON.stringify({theme,route,factor,actual,...await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}))}),contentType:'application/json'});} }
  536 |  }finally{await context.close();await rm(profile,{recursive:true,force:true});}
  537 | });
  538 | 
  539 | 
  540 | 
  541 | test('Stage05 sectors, stack, persistence, alternative projects and free books',async({page})=>{
  542 |  await open(page,'/');await page.locator('.pf-stage[href="#/etapas/05"]').click();
  543 |  await expect(page.locator('.pf-data-hero')).toBeVisible();await expect(page.locator('.pf-data-flow')).toContainText('SQL → PostgreSQL');
  544 |  const php=page.getByRole('button',{name:/TRILHA A PHP/});const ts=page.getByRole('button',{name:/TRILHA B TypeScript/});
  545 |  await ts.focus();await page.keyboard.press('Enter');await expect(ts).toHaveAttribute('aria-pressed','true');await expect(page.locator('.pf-data-flow')).toContainText('Knex');
  546 |  await php.click();await expect(php).toHaveAttribute('aria-pressed','true');
  547 |  await page.getByRole('button',{name:'Iniciar etapa',exact:true}).click();
  548 |  await open(page,'/exercicios?etapa=05');await expect(page.locator('main .pf-card h2')).toHaveCount(9);
  549 |  await page.getByLabel(/^Setor/).selectOption('Saúde');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
  550 |  await page.getByLabel(/^Dificuldade/).selectOption('inicial');await expect(page.getByText('Nenhum exercício encontrado com esses filtros.',{exact:true}).first()).toBeVisible();
  551 |  await page.getByRole('button',{name:'Limpar filtros',exact:true}).first().click();await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('05');
  552 |  await page.getByLabel(/^Buscar na etapa/).fill('Fintech');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
  553 |  await page.locator('main .pf-card h2 a').click();await expect(page.locator('main')).toContainText('Financeiro');
  554 |  await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Rascunho sintético de teste; SQL não executado pela plataforma.');
  555 |  await open(page,'/progresso');await expect(page.getByRole('link',{name:'Fintech: transferência atômica'})).toBeVisible();
  556 |  await open(page,'/etapas/05');await page.getByRole('button',{name:'Parar etapa',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Retomar etapa',exact:true})).toBeVisible();
  557 |  await page.getByRole('button',{name:'Retomar etapa',exact:true}).click();
  558 |  await open(page,'/etapas/05/exercicios/05-ex-07');await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue(/Rascunho sintético/);await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await page.reload();await expect(page.getByLabel('Solução, anotações ou link do repositório')).toHaveValue(/Rascunho sintético/);
  559 |  await open(page,'/projetos?etapa=05');await expect(page.locator('main .pf-card h2')).toHaveCount(5);await expect(page.getByText('Projeto avançado equivalente — escolha um',{exact:true})).toHaveCount(3);
  560 |  await page.getByRole('link',{name:/SaaS Billing API/}).click();await page.getByRole('button',{name:'Começar atividade',exact:true}).click();
  561 |  await expect(page.getByRole('link',{name:'TypeScript: pg, Knex, migrations e relações →',exact:true})).toHaveCount(0);
  562 |  const help=page.getByRole('button',{name:'Pedir ajuda à IA',exact:true});await help.click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(help).toBeFocused();
  563 |  await open(page,'/referencias?etapa=05');await expect(page.locator('main .pf-reference')).toHaveCount(9);await page.getByRole('button',{name:'Carregar mais',exact:true}).click();expect(await page.locator('main .pf-reference').count()).toBeGreaterThan(9);
  564 |  await page.getByLabel(/^Tipo de material/).selectOption('Livros');await page.getByLabel(/^Acesso/).selectOption('Gratuito');await expect(page.getByRole('heading',{name:'Database Design',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Sistema de Banco de Dados',exact:true})).toHaveCount(0);
  565 |  await page.getByLabel(/^Acesso/).selectOption('Pago');await expect(page.getByRole('heading',{name:'Database Design',exact:true})).toHaveCount(0);await expect(page.locator('.pf-book-cover img')).toHaveCount(2);
  566 | });
  567 | 
  568 | test('Stage05 published routes in both themes, axe and page errors',async({page},info)=>{
  569 |  test.setTimeout(180_000);
  570 |  const list=['/etapas/05','/etapas/05/topicos','/etapas/05/referencias','/etapas/05/exercicios','/etapas/05/projeto','/projetos?etapa=05',...topics.filter(t=>t.stageId==='05').map(t=>`/etapas/05/topicos/${t.id}`),...tasks.filter(t=>t.stageId==='05').map(t=>`/etapas/05/exercicios/${t.slug}`),...projects.filter(t=>t.stageId==='05').map(t=>`/projetos/${t.slug}`)];
  571 |  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  572 |  for(const theme of ['dark','light']){
  573 |   await open(page,'/etapas/05');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:`Tema ${theme==='light'?'claro':'escuro'}`,exact:true}).click();
  574 |   for(const path of list){await open(page,path);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations,path).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);if(result.incomplete.length)await info.attach('incomplete-'+theme+'-'+path.replaceAll('/','_'),{body:JSON.stringify(result.incomplete),contentType:'application/json'});}
  575 |  }
  576 |  expect(errors).toEqual([]);
  577 |  await open(page,'/etapas/05');await page.setViewportSize({width:320,height:900});await page.getByLabel('Tamanho da fonte').selectOption('150');await page.screenshot({path:info.outputPath('stage05-mobile.png'),fullPage:false});
  578 | });
  579 | 
  580 | test('Stage05 status filters and achievement reversal from a real activity edit',async({page})=>{
  581 |  const p=blankPilot(),s=getStage('05',p.track)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);p.stageEvidence['05']='Registro sintético para teste de interface, sem execução de SQL';
  582 |  for(const task of [...s.exercises,...projects.filter(a=>a.id==='05-project-booking')]){const a=blankAttempt(task.id);p.attempts[task.id]={...a,solution:'Fixture de autoavaliação',checks:a.checks.map(()=>true),status:'concluido'};}
  583 |  p.attempts['05-ex-01']=blankAttempt('05-ex-01');await page.addInitScript(({key,p})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(p));},{key:PILOT_KEY,p});
  584 |  await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('concluido');await expect(page.locator('main .pf-card h2')).toHaveCount(8);
  585 |  await open(page,'/etapas/05/exercicios/05-ex-01');await page.getByRole('button',{name:'Começar atividade',exact:true}).click();await page.getByLabel('Solução, anotações ou link do repositório').fill('Tentativa declarada sintética para testar estado; não é solução SQL.');
  586 |  for(const checkbox of await page.locator('main .pf-check input').all())await checkbox.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();
  587 |  await open(page,'/progresso');const achievement=page.locator('article.pf-card').filter({has:page.getByRole('heading',{name:'Primeira etapa concluída',exact:true})});await expect(achievement).toHaveClass(/pf-achieved/);
  588 |  await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('concluido');await expect(page.locator('main .pf-card h2')).toHaveCount(9);
  589 |  await open(page,'/etapas/05/exercicios/05-ex-01');await page.getByLabel('Solução, anotações ou link do repositório').fill('Versão alterada deve exigir nova autoavaliação.');await page.reload();await expect(page.locator('main .pf-check input:checked')).toHaveCount(0);
  590 |  await open(page,'/progresso');await expect(achievement).not.toHaveClass(/pf-achieved/);
  591 |  await open(page,'/exercicios?etapa=05');await page.getByLabel(/^Status/).selectOption('em-andamento');await expect(page.locator('main .pf-card h2')).toHaveCount(1);
  592 | });
  593 | 
  594 | test('Stage06 testing hero, sectors, track switch, Bug Hunt project and 9 sectoral exercises',async({page})=>{
  595 |  await open(page,'/');await page.locator('.pf-stage[href="#/etapas/06"]').click();
  596 |  await expect(page.locator('.pf-hero-testing')).toBeVisible();
  597 |  await expect(page.getByRole('heading',{name:'Testes automatizados e depuração',exact:true})).toBeVisible();
  598 |  await expect(page.locator('.pf-test-steps .pf-test-step-card')).toHaveCount(3);
  599 |  await expect(page.locator('.pf-test-pipeline-flow li')).toHaveCount(3);
  600 |  await page.getByRole('button',{name:/TRILHA B/}).click();
  601 |  await expect(page.getByText('node:test / Vitest',{exact:true})).toBeVisible();
  602 |  await page.getByRole('button',{name:/TRILHA A/}).click();
  603 |  await expect(page.getByText('PHPUnit / Pest Unit',{exact:true})).toBeVisible();
  604 | 
  605 |  await open(page,'/exercicios?etapa=06');
  606 |  await expect(page.locator('main .pf-card h2')).toHaveCount(9);
  607 |  await page.getByLabel('Setor').selectOption('Fintech');
  608 |  await expect(page.getByRole('status')).toContainText('1 exercício encontrado');
  609 |  await expect(page.getByRole('link',{name:/Fintech: Reprodução e Teste de Regressão/})).toBeVisible();
  610 |  await page.getByRole('button',{name:'Limpar filtros',exact:true}).first().click();
  611 |  await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('06');
  612 |  await expect(page.locator('main .pf-card h2')).toHaveCount(9);
  613 | 
  614 |  await open(page,'/projetos?etapa=06');
  615 |  await expect(page.locator('main .pf-card h2')).toHaveCount(3);
  616 |  await expect(page.getByRole('link',{name:/Bug Hunt & Regression Portfolio/})).toBeVisible();
  617 | 
  618 |  await open(page,'/referencias?etapa=06');
  619 |  await expect(page.locator('main .pf-reference')).toHaveCount(9);
  620 |  await expect(page.locator('main .pf-book')).toHaveCount(3);
  621 |  await page.getByRole('button',{name:'Carregar mais',exact:true}).click();
  622 |  expect(await page.locator('main .pf-reference').count()).toBeGreaterThan(9);
  623 |  await page.getByLabel(/^Tipo de material/).selectOption('Livros');
  624 |  await expect(page.getByRole('heading',{name:/Refatoração/})).toBeVisible();
  625 |  await expect(page.locator('.pf-book-cover img').first()).toBeVisible();
  626 | });
  627 | 
  628 | test('Stage06 published routes in both themes, axe and page errors',async({page},info)=>{
```