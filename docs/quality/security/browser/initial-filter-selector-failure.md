# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.spec.ts >> Security combined filters and stage context recover without clearing stack
- Location: e2e/security.spec.ts:37:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByLabel('Categoria', { exact: true })

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
  - main [active] [ref=e25]:
    - generic [ref=e26]:
      - paragraph [ref=e27]: SECURITY KNOWLEDGE BASE / ÁREA INDEPENDENTE
      - heading "Segurança de Aplicações e Agentes de IA" [level=1] [ref=e28]
      - paragraph [ref=e29]: Investigue riscos,justifique controles e registre evidências. Acesso livre em qualquer senioridade; uma stack basta. Esta área não altera percentuais ou requisitos das etapas00–19.
      - paragraph [ref=e30]:
        - strong [ref=e31]: "Backend Security Top50:"
        - text: curadoria educacional própria do StackTrail,com exatamente50tópicos. Não é ranking oficial OWASP nem classificação por frequência de ataques.
      - generic [ref=e32]:
        - text: Stack desta prática
        - combobox "Stack desta prática" [ref=e33]:
          - option "PHP + Laravel"
          - option "TypeScript + Node.js + Express" [selected]
      - paragraph [ref=e34]: Progresso local e declarado,sem sincronização,nota automática,certificação ou comprovação de conformidade.
    - navigation "Seções de segurança" [ref=e35]:
      - link "Top50" [ref=e36] [cursor=pointer]:
        - /url: "#/security?view=catalog"
      - link "Padrões OWASP" [ref=e37] [cursor=pointer]:
        - /url: "#/security?view=standards"
      - link "Agentes,Skills e MCP" [ref=e38] [cursor=pointer]:
        - /url: "#/security?view=agents"
      - link "Laboratórios" [ref=e39] [cursor=pointer]:
        - /url: "#/security?view=labs"
      - link "Checklists" [ref=e40] [cursor=pointer]:
        - /url: "#/security?view=checklists"
      - link "Percursos e SSDLC" [ref=e41] [cursor=pointer]:
        - /url: "#/security?view=paths"
      - link "Meu progresso" [ref=e42] [cursor=pointer]:
        - /url: "#/security?view=progress"
      - link "Fontes e versões" [ref=e43] [cursor=pointer]:
        - /url: "#/security?view=references"
    - region "Filtros de segurança" [ref=e44]:
      - heading "50 Tópicos Essenciais de Segurança Backend" [level=2] [ref=e45]
      - paragraph [ref=e46]: Abra um tópico por vez. Profundidade é recomendação,sem bloqueio de acesso; exemplos e registro consideram a stack selecionada.
      - generic [ref=e47]:
        - generic [ref=e48]:
          - text: Buscar vulnerabilidade
          - searchbox "Buscar vulnerabilidade" [ref=e49]
        - generic [ref=e50]:
          - text: Categoria
          - combobox "Categoria" [ref=e51]:
            - option "Todas as categorias" [selected]
            - option "Authentication & Authorization (10)"
            - option "Injection & Input Validation (10)"
            - option "Data Protection & Cryptography (8)"
            - option "API & Business Logic Security (8)"
            - option "Configuration & Supply Chain (7)"
            - option "Monitoring, Resilience & Testing (7)"
        - generic [ref=e52]:
          - text: Senioridade recomendada
          - combobox "Senioridade recomendada" [ref=e53]:
            - option "Todas" [selected]
            - option "Júnior"
            - option "Pleno"
            - option "Sênior"
        - generic [ref=e54]:
          - text: Área
          - combobox "Área" [ref=e55]:
            - option "Backend e API" [selected]
            - option "Backend"
            - option "API"
        - generic [ref=e56]:
          - text: Tecnologia relacionada
          - combobox "Tecnologia relacionada" [ref=e57]:
            - option "Todas" [selected]
            - option "laravel"
            - option "express"
            - option "postgresql"
            - option "http"
            - option "ci-cd"
            - option "containers"
        - generic [ref=e58]:
          - text: Estado da prática
          - combobox "Estado da prática" [ref=e59]:
            - option "Todos" [selected]
            - option "Não iniciada"
            - option "Em andamento"
            - option "Pausada"
            - option "Concluída por autoavaliação"
      - button "Limpar busca e filtros" [ref=e60] [cursor=pointer]
      - paragraph [ref=e61]:
        - text: Contexto da Etapa07.
        - link "Ver todos os tópicos" [ref=e62] [cursor=pointer]:
          - /url: "#/security"
      - status [ref=e63]: 31 tópicos encontrados.
    - generic [ref=e64]:
      - article [ref=e65]:
        - paragraph [ref=e66]: 01/50 · Júnior
        - heading [level=2] [ref=e67]:
          - link "Broken Authentication" [ref=e68] [cursor=pointer]:
            - /url: "#/security/topics/bst50-01-broken-authentication"
        - paragraph [ref=e69]: Credenciais ou fatores não comprovam a identidade quando verificação, recuperação ou invalidação falham.
        - paragraph [ref=e70]: Não iniciada
      - article [ref=e71]:
        - paragraph [ref=e72]: 02/50 · Júnior
        - heading [level=2] [ref=e73]:
          - link "Broken Access Control" [ref=e74] [cursor=pointer]:
            - /url: "#/security/topics/bst50-02-broken-access-control"
        - paragraph [ref=e75]: Uma identidade válida ainda pode executar ações fora da política do recurso e da organização.
        - paragraph [ref=e76]: Não iniciada
      - article [ref=e77]:
        - paragraph [ref=e78]: 03/50 · Júnior
        - heading [level=2] [ref=e79]:
          - link "Broken Object Level Authorization (BOLA/IDOR)" [ref=e80] [cursor=pointer]:
            - /url: "#/security/topics/bst50-03-broken-object-level-authorization-bola-idor"
        - paragraph [ref=e81]: "Controlar a função não basta: cada objeto acessado precisa pertencer ao escopo autorizado."
        - paragraph [ref=e82]: Não iniciada
      - article [ref=e83]:
        - paragraph [ref=e84]: 04/50 · Júnior
        - heading [level=2] [ref=e85]:
          - link "Broken Function Level Authorization" [ref=e86] [cursor=pointer]:
            - /url: "#/security/topics/bst50-04-broken-function-level-authorization"
        - paragraph [ref=e87]: A permissão de ler uma coleção não implica permissão para administrar suas funções.
        - paragraph [ref=e88]: Não iniciada
      - article [ref=e89]:
        - paragraph [ref=e90]: 05/50 · Júnior
        - heading [level=2] [ref=e91]:
          - link "Privilege Escalation" [ref=e92] [cursor=pointer]:
            - /url: "#/security/topics/bst50-05-privilege-escalation"
        - paragraph [ref=e93]: Mudanças em papéis e atributos de identidade podem ampliar privilégios além da concessão permitida.
        - paragraph [ref=e94]: Não iniciada
      - article [ref=e95]:
        - paragraph [ref=e96]: 06/50 · Júnior
        - heading [level=2] [ref=e97]:
          - link "Session Management" [ref=e98] [cursor=pointer]:
            - /url: "#/security/topics/bst50-06-session-management"
        - paragraph [ref=e99]: Sessões precisam de criação, renovação, expiração e revogação coerentes entre navegador e servidor.
        - paragraph [ref=e100]: Não iniciada
      - article [ref=e101]:
        - paragraph [ref=e102]: 07/50 · Júnior
        - heading [level=2] [ref=e103]:
          - link "Credential Stuffing Defenses" [ref=e104] [cursor=pointer]:
            - /url: "#/security/topics/bst50-07-credential-stuffing-defenses"
        - paragraph [ref=e105]: Reutilização de credenciais vazadas permite tentativas automatizadas sem adivinhar uma senha nova.
        - paragraph [ref=e106]: Não iniciada
      - article [ref=e107]:
        - paragraph [ref=e108]: 08/50 · Pleno
        - heading [level=2] [ref=e109]:
          - link "Multi-Factor Authentication" [ref=e110] [cursor=pointer]:
            - /url: "#/security/topics/bst50-08-multi-factor-authentication"
        - paragraph [ref=e111]: "Um segundo fator reduz certos riscos de credenciais, mas cadastro, recuperação e reautenticação também precisam de proteção. Os fatores devem ser independentes: senha e PIN não são dois fatores."
        - paragraph [ref=e112]: Não iniciada
      - article [ref=e113]:
        - paragraph [ref=e114]: 09/50 · Pleno
        - heading [level=2] [ref=e115]:
          - link "Token Security" [ref=e116] [cursor=pointer]:
            - /url: "#/security/topics/bst50-09-token-security"
        - paragraph [ref=e117]: No cenário JWT, validar assinatura e claims exigidos pelo perfil de uso é diferente de apenas decodificar. Tokens opacos podem exigir consulta/introspecção e política no servidor; formato não define autorização.
        - paragraph [ref=e118]: Não iniciada
      - article [ref=e119]:
        - paragraph [ref=e120]: 10/50 · Pleno
        - heading [level=2] [ref=e121]:
          - link "Password Reset Security" [ref=e122] [cursor=pointer]:
            - /url: "#/security/topics/bst50-10-password-reset-security"
        - paragraph [ref=e123]: Recuperação é um fluxo de autenticação e precisa resistir a enumeração, reuso e troca de destinatário.
        - paragraph [ref=e124]: Não iniciada
      - article [ref=e125]:
        - paragraph [ref=e126]: 11/50 · Júnior
        - heading [level=2] [ref=e127]:
          - link "SQL Injection" [ref=e128] [cursor=pointer]:
            - /url: "#/security/topics/bst50-11-sql-injection"
        - paragraph [ref=e129]: Dados interpretados como estrutura SQL podem alterar a consulta pretendida.
        - paragraph [ref=e130]: Não iniciada
      - article [ref=e131]:
        - paragraph [ref=e132]: 12/50 · Júnior
        - heading [level=2] [ref=e133]:
          - link "Cross-Site Scripting (XSS)" [ref=e134] [cursor=pointer]:
            - /url: "#/security/topics/bst50-12-cross-site-scripting-xss"
        - paragraph [ref=e135]: Conteúdo não confiável chega a um contexto executável no navegador sem defesa apropriada ao destino.
        - paragraph [ref=e136]: Não iniciada
    - button "Carregar mais tópicos" [ref=e137] [cursor=pointer]
  - contentinfo [ref=e138]:
    - generic [ref=e139]:
      - generic [ref=e140]:
        - link "StackTrail" [ref=e141] [cursor=pointer]:
          - /url: "#/"
        - paragraph [ref=e142]: Sua jornada de evolução na tecnologia.
        - paragraph [ref=e143]: Aprenda, pratique e desenvolva habilidades para o mercado.
      - navigation "Navegação do rodapé" [ref=e144]:
        - link "Roadmap Backend" [ref=e145] [cursor=pointer]:
          - /url: "#/"
        - link "Desenvolvimento Profissional" [ref=e146] [cursor=pointer]:
          - /url: "#/desenvolvimento-profissional"
        - link "Inglês" [ref=e147] [cursor=pointer]:
          - /url: "#/ingles"
        - link "GitHub" [ref=e148] [cursor=pointer]:
          - /url: https://github.com/daniel0052/stacktrail
    - paragraph [ref=e149]: © 2026 StackTrail · Projeto educacional
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
> 38 |  await open(page,'/security?stage=07');await page.getByLabel('Stack desta prática').selectOption('javascript');await page.getByRole('combobox',{name:/^Categoria/}).selectOption('injection-validation');await page.getByLabel('Senioridade recomendada').selectOption('senior');await page.getByRole('button',{name:'Limpar busca e filtros'}).click();await expect(page.getByLabel('Stack desta prática')).toHaveValue('javascript');await expect(page.locator('main')).toContainText('Contexto da Etapa07');await page.getByRole('combobox',{name:/^Área/}).selectOption('api');await page.getByLabel('Tecnologia relacionada').selectOption('express');await page.getByLabel('Estado da prática').selectOption('completed');await expect(page.locator('main')).toContainText('Nenhum tópico encontrado');await page.getByRole('button',{name:'Limpar busca e filtros'}).click();await expect(page.getByLabel('Stack desta prática')).toHaveValue('javascript');
     |                                                                                                                                                                ^ Error: locator.selectOption: Test timeout of 60000ms exceeded.
  39 |  await open(page,'/ai-development-toolkit/agent-security');const platform=page.getByRole('combobox',{name:/^Plataforma para a revisão/});await expect(platform.locator('option')).toHaveCount(4);for(const value of ['codex','claude-code','cursor','github-copilot']){await platform.selectOption(value);await page.getByRole('button',{name:'Preparar revisão de segurança',exact:true}).click();await expect(page.getByRole('dialog').getByLabel('Prompt editável')).toHaveValue(/Primeiro pergunte/);await page.keyboard.press('Escape');}
  40 | });
  41 | 
  42 | test('Security retains memory across real app routes when storage fails',async({page})=>{
  43 |  await page.setViewportSize({width:375,height:1000});await open(page,securityItemRoute(securityTopics[0].id));await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw Error('quota fixture');};});await page.getByLabel('Evidências desta prática').fill('Memória preservada ao navegar');await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Ferramentas com IA',exact:true}).click();await page.getByRole('button',{name:'☰ Menu',exact:true}).click();await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Segurança',exact:true}).click();await page.getByRole('link',{name:'Retomar último registro',exact:true}).click();await expect(page.getByLabel('Evidências desta prática')).toHaveValue('Memória preservada ao navegar');await expect(page.getByRole('alert')).toContainText('memória');
  44 | });
  45 | 
```