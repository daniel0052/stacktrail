# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.spec.ts >> Security retains memory across real app routes when storage fails
- Location: e2e/security.spec.ts:41:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '☰ Menu', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Pular para o conteúdo" [ref=e4] [cursor=pointer]:
    - /url: "#conteudo"
  - banner [ref=e5]:
    - link "StackTrail ROADMAP & PRÁTICA" [ref=e6] [cursor=pointer]:
      - /url: "#/"
      - generic [aria-hidden] [ref=e7]: "{ }"
      - text: StackTrail
      - generic [ref=e8]: ROADMAP & PRÁTICA
    - generic [ref=e9]:
      - button "Tema claro" [ref=e10] [cursor=pointer]
      - generic [ref=e11]:
        - text: Fonte
        - combobox "Tamanho da fonte" [ref=e12]:
          - option "90%"
          - option "100%" [selected]
          - option "110%"
          - option "120%"
          - option "130%"
          - option "140%"
          - option "150%"
  - navigation "Navegação principal" [ref=e13]:
    - link "Roadmap" [ref=e14] [cursor=pointer]:
      - /url: "#/"
    - link "Exercícios" [ref=e15] [cursor=pointer]:
      - /url: "#/exercicios"
    - link "Projetos" [ref=e16] [cursor=pointer]:
      - /url: "#/projetos"
    - link "Livros e referências" [ref=e17] [cursor=pointer]:
      - /url: "#/referencias"
    - link "Segurança" [ref=e18] [cursor=pointer]:
      - /url: "#/security"
    - link "Desenvolvimento Profissional" [ref=e19] [cursor=pointer]:
      - /url: "#/desenvolvimento-profissional"
    - link "Inglês" [ref=e20] [cursor=pointer]:
      - /url: "#/ingles"
    - link "Engenharia com IA" [ref=e21] [cursor=pointer]:
      - /url: "#/engenharia-com-ia"
    - link "Competências do Mercado" [ref=e22] [cursor=pointer]:
      - /url: "#/competencias-do-mercado"
    - link "Ferramentas com IA" [ref=e23] [cursor=pointer]:
      - /url: "#/ai-development-toolkit"
    - link "Meu progresso" [ref=e24] [cursor=pointer]:
      - /url: "#/progresso"
  - main [ref=e25]:
    - generic [ref=e26]:
      - paragraph [ref=e27]: SECURITY KNOWLEDGE BASE / ÁREA INDEPENDENTE
      - heading "Broken Authentication" [level=1] [ref=e28]
      - paragraph [ref=e29]: Investigue riscos,justifique controles e registre evidências. Acesso livre em qualquer senioridade; uma stack basta. Esta área não altera percentuais ou requisitos das etapas00–19.
      - paragraph [ref=e30]:
        - strong [ref=e31]: "Backend Security Top50:"
        - text: curadoria educacional própria do StackTrail,com exatamente50tópicos. Não é ranking oficial OWASP nem classificação por frequência de ataques.
      - generic [ref=e32]:
        - text: Stack desta prática
        - combobox "Stack desta prática" [ref=e33]:
          - option "PHP + Laravel" [selected]
          - option "TypeScript + Node.js + Express"
      - link "Retomar último registro" [ref=e34] [cursor=pointer]:
        - /url: "#/security/topics/bst50-01-broken-authentication"
      - paragraph [ref=e35]: Progresso local e declarado,sem sincronização,nota automática,certificação ou comprovação de conformidade.
    - alert [ref=e36]: Não foi possível salvar segurança. Seu trabalho continua em memória nesta sessão; verifique o armazenamento do navegador.
    - navigation "Seções de segurança" [ref=e37]:
      - link "Top50" [ref=e38] [cursor=pointer]:
        - /url: "#/security?view=catalog"
      - link "Padrões OWASP" [ref=e39] [cursor=pointer]:
        - /url: "#/security?view=standards"
      - link "Agentes,Skills e MCP" [ref=e40] [cursor=pointer]:
        - /url: "#/security?view=agents"
      - link "Laboratórios" [ref=e41] [cursor=pointer]:
        - /url: "#/security?view=labs"
      - link "Checklists" [ref=e42] [cursor=pointer]:
        - /url: "#/security?view=checklists"
      - link "Percursos e SSDLC" [ref=e43] [cursor=pointer]:
        - /url: "#/security?view=paths"
      - link "Meu progresso" [ref=e44] [cursor=pointer]:
        - /url: "#/security?view=progress"
      - link "Fontes e versões" [ref=e45] [cursor=pointer]:
        - /url: "#/security?view=references"
    - generic [ref=e46]:
      - link "← Catálogo e percursos" [ref=e47] [cursor=pointer]:
        - /url: "#/security"
      - paragraph [ref=e48]: 1/50 · Authentication & Authorization · profundidade recomendada Júnior
      - heading "Risco e contexto" [level=2] [ref=e49]
      - paragraph [ref=e50]: Credenciais ou fatores não comprovam a identidade quando verificação, recuperação ou invalidação falham.
      - paragraph [ref=e51]:
        - strong [ref=e52]: "Severidade contextual:"
        - text: "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma conta de biblioteca fictícia permanece utilizável após a revogação da credencial. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal."
      - generic [ref=e53]:
        - term [ref=e54]: Cenário de ataque fictício
        - definition [ref=e55]: Uma conta de biblioteca fictícia permanece utilizável após a revogação da credencial.
        - term [ref=e56]: Causa raiz do cenário
        - definition [ref=e57]: Fluxos de entrada e recuperação confiam em estados fornecidos pelo cliente.
        - term [ref=e58]: Exemplo vulnerável — fluxo inerte
        - definition [ref=e59]:
          - code [ref=e60]: login → confiar em userId recebido → criar sessão.
        - term [ref=e61]: Implementação segura — modelo de controle
        - definition [ref=e62]:
          - code [ref=e63]: login → verificar credencial no servidor → renovar sessão → aplicar revogação.
        - term [ref=e64]: Exemplo Laravel
        - definition [ref=e65]: Usar mecanismos de autenticação Laravel e regenerar a sessão após login; não aceitar identidade do formulário.
      - paragraph [ref=e66]: Exemplos referenciais autorais,isolados e não executados; fluxos conceituais não são funções existentes nem aplicações prontas. Não constituem solução do laboratório. Confira documentação e configuração do runtime escolhido.
      - heading "Prevenção" [level=3] [ref=e67]
      - list [ref=e68]:
        - listitem [ref=e69]: login → verificar credencial no servidor → renovar sessão → aplicar revogação.
        - listitem [ref=e70]: Conferir a configuração efetiva e a fronteira de confiança neste cenário.
        - listitem [ref=e71]: Ligar cada decisão a teste e evidência; registrar risco residual.
      - heading "Security Tests" [level=3] [ref=e72]
      - list [ref=e73]:
        - listitem [ref=e74]: Credencial inválida
        - listitem [ref=e75]: conta revogada
        - listitem [ref=e76]: login válido seguido de logout.
      - paragraph [ref=e77]:
        - strong [ref=e78]: "Erro comum:"
        - text: Autenticar não concede acesso a todo recurso.
      - heading "Relações com OWASP e CWE" [level=3] [ref=e79]
      - paragraph [ref=e80]: Associações editoriais por mecanismo,não equivalências normativas nem diagnóstico automático de achado. Um CWE descreve somente o caso aplicável do tópico.
      - list [ref=e81]:
        - listitem [ref=e82]: A07:2025
        - listitem [ref=e83]: API2:2023
      - list [ref=e84]:
        - listitem [ref=e85]:
          - link "CWE-287 ↗ (nova aba)" [ref=e86] [cursor=pointer]:
            - /url: https://cwe.mitre.org/data/definitions/287.html
      - heading "Práticas e etapas relacionadas" [level=3] [ref=e87]
      - list [ref=e88]:
        - listitem [ref=e89]:
          - link "Etapa07" [ref=e90] [cursor=pointer]:
            - /url: "#/etapas/07"
        - listitem [ref=e91]:
          - link "Ciclo de credenciais de um clube de leitura" [ref=e92] [cursor=pointer]:
            - /url: "#/security/labs/security-lab-password-storage"
      - group [ref=e93]:
        - generic "Fontes oficiais,versões e limites (2)" [ref=e94] [cursor=pointer]
    - region "Registro de segurança" [ref=e95]:
      - heading "Minha prática e evidências" [level=2] [ref=e96]
      - status [ref=e97]: Em andamento · stack Laravel
      - generic [ref=e98]:
        - button "Pausar prática" [ref=e99] [cursor=pointer]
        - button "Pedir ajuda à IA" [ref=e100] [cursor=pointer]
        - button "Revisar com IA" [ref=e101] [cursor=pointer]
      - generic [ref=e102]:
        - text: Evidências desta prática
        - textbox "Evidências desta prática" [active] [ref=e103]: Memória preservada ao navegar
      - paragraph [ref=e104]: Editar evidências ou decisões de controle invalida critérios,conclusão e revisão anterior. Somente texto local; não guarde projeto inteiro,credenciais ou dados reais.
      - generic [ref=e105]:
        - text: Revisão externa declarada (opcional)
        - textbox "Revisão externa declarada (opcional)" [ref=e106]
      - heading "Critérios de autoavaliação" [level=3] [ref=e107]
      - generic [ref=e108] [cursor=pointer]:
        - checkbox "Distinguir Broken Authentication no cenário descrito,relacionando ativo,fronteira e causa sem severidade universal." [ref=e109]
        - text: Distinguir Broken Authentication no cenário descrito,relacionando ativo,fronteira e causa sem severidade universal.
      - generic [ref=e110] [cursor=pointer]:
        - 'checkbox "Justificar o controle: login → verificar credencial no servidor → renovar sessão → aplicar revogação." [ref=e111]'
        - text: "Justificar o controle: login → verificar credencial no servidor → renovar sessão → aplicar revogação."
      - generic [ref=e112] [cursor=pointer]:
        - checkbox "Relacionar casos de verificação (Credencial inválida; conta revogada; login válido seguido de logout.),evidências e limites,sem alegar execução ausente." [ref=e113]
        - text: Relacionar casos de verificação (Credencial inválida; conta revogada; login válido seguido de logout.),evidências e limites,sem alegar execução ausente.
      - button "Concluir por autoavaliação" [disabled] [ref=e114]
      - paragraph [ref=e115]: "Rubrica consultiva: risco/causa,controle,testes,evidência,regressões e limites. Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática ou certificação."
  - contentinfo [ref=e116]:
    - generic [ref=e117]:
      - generic [ref=e118]:
        - link "StackTrail" [ref=e119] [cursor=pointer]:
          - /url: "#/"
        - paragraph [ref=e120]: Sua jornada de evolução na tecnologia.
        - paragraph [ref=e121]: Aprenda, pratique e desenvolva habilidades para o mercado.
      - navigation "Navegação do rodapé" [ref=e122]:
        - link "Roadmap Backend" [ref=e123] [cursor=pointer]:
          - /url: "#/"
        - link "Desenvolvimento Profissional" [ref=e124] [cursor=pointer]:
          - /url: "#/desenvolvimento-profissional"
        - link "Inglês" [ref=e125] [cursor=pointer]:
          - /url: "#/ingles"
        - link "GitHub" [ref=e126] [cursor=pointer]:
          - /url: https://github.com/daniel0052/stacktrail
    - paragraph [ref=e127]: © 2026 StackTrail · Projeto educacional
```

# Test source

```ts
  1  | import {mkdtemp,rm} from 'node:fs/promises';
  2  | import {tmpdir} from 'node:os';
  3  | import {join,resolve} from 'node:path';
  4  | import {test,expect,chromium} from '@playwright/test';
  5  | import AxeBuilder from '@axe-core/playwright';
  6  | import {securityItems,securityItemRoute} from '../src/practice/security/security-registry';
  7  | import {securityTopics} from '../src/practice/security/security-topics';
  8  | import {securityChecklists,securityLabs} from '../src/practice/security/security-practice';
  9  | const open=async(page:import('@playwright/test').Page,path:string)=>{await page.goto('./#'+path);await expect(page.locator('main h1')).toBeVisible();};
  10 | test('Security filters, state lifecycle, prompts and isolation',async({page,context})=>{
  11 |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,'/security');await expect(page.locator('main .pf-card h2')).toHaveCount(12);await page.getByRole('button',{name:'Carregar mais tópicos',exact:true}).click();await expect(page.locator('main .pf-card h2')).toHaveCount(24);await page.getByLabel('Buscar vulnerabilidade').fill('zzzz-sem-resultado');await expect(page.locator('main')).toContainText('Nenhum tópico encontrado');await page.getByRole('button',{name:'Limpar busca e filtros'}).click();
  12 |  const id=securityTopics[0].id;await open(page,securityItemRoute(id));expect(await page.evaluate(()=>localStorage.getItem('stacktrail:security:1'))).toBeNull();await page.getByRole('button',{name:'Iniciar prática',exact:true}).click();await page.getByLabel('Evidências desta prática').fill('Evidência fictícia de estado, sem backend executado.');await page.getByRole('button',{name:'Pausar prática',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Retomar prática',exact:true}).click();await page.getByRole('button',{name:'Revisar com IA',exact:true}).click();const dialog=page.getByRole('dialog');const prompt=dialog.getByLabel('Prompt editável');await expect(prompt).toBeFocused();await expect(prompt).toHaveValue(/Evidência fictícia/);await prompt.fill('Prompt editado pelo usuário');await dialog.getByRole('button',{name:'Copiar prompt',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('Prompt editado pelo usuário');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Revisar com IA',exact:true})).toBeFocused();for(const c of await page.locator('main .pf-check input').all())await c.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Desfazer conclusão',exact:true})).toBeVisible();await page.getByLabel('Stack desta prática').selectOption('javascript');await expect(page.getByLabel('Evidências desta prática')).toHaveValue('');await page.getByLabel('Stack desta prática').selectOption('php');await page.getByLabel('Evidências desta prática').fill('Editado');await expect(page.getByRole('button',{name:'Concluir por autoavaliação',exact:true})).toBeDisabled();
  13 |  const checklist=securityChecklists[0];await open(page,securityItemRoute(checklist.id));await page.getByLabel('Evidências desta prática').fill('Contexto documental');for(const c of checklist.items){await page.getByRole('combobox',{name:new RegExp('^Estado — '+c.control.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).selectOption('not-applicable');await page.getByLabel('Evidência ou justificativa — '+c.control,{exact:true}).fill('Não aplicável neste escopo fictício; justificativa documentada.');}for(const c of await page.locator('main .pf-check input').all())await c.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.getByRole('combobox',{name:/^Estado —/}).first().selectOption('partial');await expect(page.getByRole('button',{name:'Concluir por autoavaliação',exact:true})).toBeDisabled();
  14 |  await open(page,securityItemRoute(securityLabs[0].id));await page.getByRole('button',{name:'Preparar base com IA'}).click();await expect(page.getByRole('dialog').getByLabel('Prompt editável')).toHaveValue(/IA PREPARADORA/);await page.keyboard.press('Escape');await page.getByRole('button',{name:'Revelar próxima dica'}).click();await expect(page.locator('.pf-hint')).toHaveCount(1);
  15 | });
  16 | test('Security all item routes, themes, reflow and accessibility',async({page},info)=>{
  17 |  test.setTimeout(420000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const theme of ['dark','light']){await open(page,'/security');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();for(const item of securityItems){await open(page,securityItemRoute(item.id));await expect(page.locator('main h1')).toHaveText(item.name);}for(const path of ['/security','/security?view=standards','/security?view=agents','/security?view=labs','/security?view=checklists','/security?view=paths','/security?view=progress','/security?view=references','/ai-development-toolkit/agent-security',securityItemRoute(securityTopics[0].id),securityItemRoute(securityLabs[0].id),securityItemRoute(securityChecklists[0].id)]){await open(page,path);for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+' '+width).toBe(true);}await page.getByLabel('Tamanho da fonte').selectOption('100');expect((await new AxeBuilder({page}).analyze()).violations,path).toEqual([]);}await open(page,'/security');for(const width of [375,1440]){await page.setViewportSize({width,height:1000});await page.screenshot({path:info.outputPath(`security-${theme}-${width}.png`),fullPage:true});}}expect(errors).toEqual([]);
  18 | });
  19 | 
  20 | type ZoomApiSecurity={tabs:{query:(query:object)=>Promise<{id?:number;url?:string}[]>;setZoomSettings:(id:number,settings:object)=>Promise<void>;setZoom:(id:number,factor:number)=>Promise<void>;getZoom:(id:number)=>Promise<number>}};
  21 | test('Security real browser zoom 200/400 and modal in both themes',async({browserName},info)=>{
  22 |  expect(browserName).toBe('chromium');
  23 |  test.setTimeout(120000);const profile=await mkdtemp(join(tmpdir(),'stacktrail-security-zoom-'));const extension=resolve('e2e/zoom-extension');const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1440,1000']});
  24 |  try{
  25 |   const worker=context.serviceWorkers()[0]??await context.waitForEvent('serviceworker');const page=context.pages()[0]??await context.newPage();
  26 |   const zoom=async(factor:number)=>worker.evaluate(async value=>{const api=(globalThis as unknown as {chrome:ZoomApiSecurity}).chrome;const tab=(await api.tabs.query({})).find(t=>t.url?.startsWith('http://127.0.0.1:4181/stacktrail/'));if(tab?.id===undefined)throw Error('Aba local de zoom ausente');await api.tabs.setZoomSettings(tab.id,{mode:'automatic',scope:'per-tab'});await api.tabs.setZoom(tab.id,value);return api.tabs.getZoom(tab.id);},factor);
  27 |   for(const theme of ['dark','light'])for(const path of ['/security',securityItemRoute(securityLabs[0].id),'/ai-development-toolkit/agent-security']){
  28 |    await page.goto('http://127.0.0.1:4181/stacktrail/#'+path);await expect(page.locator('main h1')).toBeVisible();if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();await zoom(1);const baseline=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));
  29 |    for(const factor of [2,4]){expect(await zoom(factor)).toBeCloseTo(factor,8);await expect.poll(()=>page.evaluate(()=>innerWidth)).toBeLessThanOrEqual(Math.ceil(baseline.width/factor)+1);const observed=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio,scroll:document.documentElement.scrollWidth}));expect(observed.dpr).toBeCloseTo(baseline.dpr*factor,1);expect(observed.scroll).toBeLessThanOrEqual(observed.width+1);await info.attach('real-browser-zoom',{body:JSON.stringify({path,theme,factor,baseline,observed}),contentType:'application/json'});
  30 |     if(path.includes('/labs/')){await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).click();const dialog=page.getByRole('dialog');await expect(dialog.getByLabel('Prompt editável')).toBeFocused();await expect(dialog.getByRole('button',{name:'Fechar',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();}
  31 |     if(path==='/security'&&factor===4)await page.screenshot({path:info.outputPath(`security-real-zoom400-${theme}.png`),fullPage:true});
  32 |    }
  33 |   }
  34 |  }finally{await context.close();await rm(profile,{recursive:true,force:true});}
  35 | });
  36 | 
  37 | test('Security combined filters and stage context recover without clearing stack',async({page})=>{
  38 |  await open(page,'/security?stage=07');await page.getByLabel('Stack desta prática').selectOption('javascript');await page.getByRole('combobox',{name:/^Categoria/}).selectOption('injection-validation');await page.getByLabel('Senioridade recomendada').selectOption('senior');await page.getByRole('button',{name:'Limpar busca e filtros'}).click();await expect(page.getByLabel('Stack desta prática')).toHaveValue('javascript');await expect(page.locator('main')).toContainText('Contexto da Etapa07');await page.getByRole('combobox',{name:/^Área/}).selectOption('api');await page.getByLabel('Tecnologia relacionada').selectOption('express');await page.getByLabel('Estado da prática').selectOption('completed');await expect(page.locator('main')).toContainText('Nenhum tópico encontrado');await page.getByRole('button',{name:'Limpar busca e filtros'}).click();await expect(page.getByLabel('Stack desta prática')).toHaveValue('javascript');
  39 |  await open(page,'/ai-development-toolkit/agent-security');const platform=page.getByRole('combobox',{name:/^Plataforma para a revisão/});await expect(platform.locator('option')).toHaveCount(4);for(const value of ['codex','claude-code','cursor','github-copilot']){await platform.selectOption(value);await page.getByRole('button',{name:'Preparar revisão de segurança',exact:true}).click();await expect(page.getByRole('dialog').getByLabel('Prompt editável')).toHaveValue(/Primeiro pergunte/);await page.keyboard.press('Escape');}
  40 | });
  41 | 
> 42 | test('Security retains memory across real app routes when storage fails',async({page})=>{
     |                                                                                                                                                                                                                                                                                                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
  43 |  await page.setViewportSize({width:375,height:1000});await open(page,securityItemRoute(securityTopics[0].id));await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw Error('quota fixture');};});await page.getByLabel('Evidências desta prática').fill('Memória preservada ao navegar');await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Ferramentas com IA',exact:true}).click();await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Segurança',exact:true}).click();await page.getByRole('link',{name:'Retomar último registro',exact:true}).click();await expect(page.getByLabel('Evidências desta prática')).toHaveValue('Memória preservada ao navegar');await expect(page.getByRole('alert')).toContainText('memória');
  44 | });
  45 | 
```