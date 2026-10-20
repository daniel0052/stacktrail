# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stage-ten.spec.ts >> Stage10 themes, selected routes, reflow, font and axe
- Location: e2e/stage-ten.spec.ts:21:1

# Error details

```
Error: /etapas/10/topicos/10-next dark

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 35

- Array []
+ Array [
+   Object {
+     "description": "Ensure the order of headings is semantically correct",
+     "help": "Heading levels should only increase by one",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/heading-order?application=playwright",
+     "id": "heading-order",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "heading-order",
+             "impact": "moderate",
+             "message": "Heading order invalid",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Heading order invalid",
+         "html": "<h3>Pré-requisitos</h3>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "h3:nth-child(3)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
+ ]
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
    - link "Desenvolvimento Profissional" [ref=e18] [cursor=pointer]:
      - /url: "#/desenvolvimento-profissional"
    - link "Inglês" [ref=e19] [cursor=pointer]:
      - /url: "#/ingles"
    - link "Meu progresso" [ref=e20] [cursor=pointer]:
      - /url: "#/progresso"
  - main [active] [ref=e21]:
    - navigation "Percurso entre etapas" [ref=e22]:
      - link "← Roadmap" [ref=e23] [cursor=pointer]:
        - /url: "#/"
      - link "Etapa 09 — Etapa anterior" [ref=e24] [cursor=pointer]:
        - /url: "#/etapas/09"
        - text: ← Etapa 09
      - link "Etapa 11 — Próxima etapa" [ref=e25] [cursor=pointer]:
        - /url: "#/etapas/11"
        - text: Etapa 11 →
    - navigation "Seções da Etapa 10" [ref=e26]:
      - link "Visão geral" [ref=e27] [cursor=pointer]:
        - /url: "#/etapas/10"
      - link "Tópicos" [ref=e28] [cursor=pointer]:
        - /url: "#/etapas/10/topicos"
      - link "Referências" [ref=e29] [cursor=pointer]:
        - /url: "#/etapas/10/referencias"
      - link "Exercícios" [ref=e30] [cursor=pointer]:
        - /url: "#/etapas/10/exercicios"
      - link "Projeto principal" [ref=e31] [cursor=pointer]:
        - /url: "#/etapas/10/projeto"
    - paragraph [ref=e32]: ETAPA 10 / TÓPICOS
    - heading "07 — Introdução aplicada ao Next.js" [level=1] [ref=e33]
    - paragraph [ref=e34]: Objetivos curtos para orientar o estudo nas fontes. Estudo registrado e prática demonstrada são coisas diferentes.
    - article [ref=e36]:
      - paragraph [ref=e37]: 07 / BASE · COMUM
      - paragraph [ref=e38]: Avaliar App Router e fronteiras de renderização em uma pequena experiência separada.
      - heading "Pré-requisitos" [level=3] [ref=e39]
      - list [ref=e40]:
        - listitem [ref=e41]: React/TS, rotas, fetch e diferença entre recursos públicos e autenticados.
      - heading "Competências" [level=3] [ref=e42]
      - list [ref=e43]:
        - listitem [ref=e44]: Rotas/layouts, Server/Client Components, CSR/SSR/SSG, dados/metadados e deploy; registrar versão/flags, sem presumir defaults ou migrar a SPA principal.
      - heading "Quando considerar praticado" [level=3] [ref=e45]
      - list [ref=e46]:
        - listitem [ref=e47]: Entregar página pequena e justificar comportamento de renderização/cache observado e host necessário, sem segredos no cliente.
      - generic [ref=e48] [cursor=pointer]:
        - checkbox "Estudei este tópico" [ref=e49]
        - text: Estudei este tópico
      - paragraph [ref=e50]: Registro pessoal; não é teste técnico nem prova de domínio.
      - link "Consultar referências (4)" [ref=e51] [cursor=pointer]:
        - /url: "#/etapas/10/referencias?topico=10-next"
      - heading "Prática relacionada" [level=3] [ref=e52]
      - paragraph [ref=e53]:
        - link "Uma página aplicada no App Router →" [ref=e54] [cursor=pointer]:
          - /url: "#/etapas/10/exercicios/10-15"
      - paragraph [ref=e55]:
        - link "Fronteiras e host incompatíveis no Next.js →" [ref=e56] [cursor=pointer]:
          - /url: "#/etapas/10/exercicios/10-16"
    - generic [ref=e57]:
      - heading "Referências do tópico" [level=2] [ref=e58]
      - generic [ref=e59]:
        - article [ref=e60]:
          - generic [ref=e61]:
            - generic [ref=e62]: Inglês
            - generic [ref=e63]: Gratuito
            - generic [ref=e64]: Documentação oficial
          - heading [level=3] [ref=e65]:
            - link "Next.js · App Router installation ↗ (nova aba)" [ref=e66] [cursor=pointer]:
              - /url: https://nextjs.org/docs/app/getting-started/installation
              - text: Next.js · App Router installation ↗
              - generic [ref=e67]: (nova aba)
          - paragraph [ref=e68]: "Recorte: Criação, TypeScript e requisitos."
          - paragraph [ref=e69]: Documentação corrente; registrar versões efetivamente utilizadas
          - paragraph [ref=e70]: Registrar versão e flags realmente utilizadas; módulo aplicado, sem migrar o StackTrail para Next.js.
          - paragraph [ref=e71]: "Acesso conferido: 2026-10-19 · adequação: 2026-10-19. Consulta não garante disponibilidade futura nem todos os capítulos relacionados."
        - article [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: Inglês
            - generic [ref=e75]: Gratuito
            - generic [ref=e76]: Documentação oficial
          - heading [level=3] [ref=e77]:
            - link "Next.js · Server and Client Components ↗ (nova aba)" [ref=e78] [cursor=pointer]:
              - /url: https://nextjs.org/docs/app/getting-started/server-and-client-components
              - text: Next.js · Server and Client Components ↗
              - generic [ref=e79]: (nova aba)
          - paragraph [ref=e80]: "Recorte: Fronteiras, dados e interatividade."
          - paragraph [ref=e81]: Documentação corrente; registrar versões efetivamente utilizadas
          - paragraph [ref=e82]: Client Component pode ser pré-renderizado; não equiparar a CSR puro. Segredos somente no servidor, não em variável pública.
          - paragraph [ref=e83]: "Acesso conferido: 2026-10-19 · adequação: 2026-10-19. Consulta não garante disponibilidade futura nem todos os capítulos relacionados."
        - article [ref=e84]:
          - generic [ref=e85]:
            - generic [ref=e86]: Inglês
            - generic [ref=e87]: Gratuito
            - generic [ref=e88]: Documentação oficial
          - heading [level=3] [ref=e89]:
            - link "Next.js · Caching ↗ (nova aba)" [ref=e90] [cursor=pointer]:
              - /url: https://nextjs.org/docs/app/getting-started/caching
              - text: Next.js · Caching ↗
              - generic [ref=e91]: (nova aba)
          - paragraph [ref=e92]: "Recorte: Cache e revalidação conforme versão/flags."
          - paragraph [ref=e93]: Documentação corrente; registrar versões efetivamente utilizadas
          - paragraph [ref=e94]: Sem default universal de cache ou SSR; registrar cacheComponents/configuração e observar comportamento antes de concluir.
          - paragraph [ref=e95]: "Acesso conferido: 2026-10-19 · adequação: 2026-10-19. Consulta não garante disponibilidade futura nem todos os capítulos relacionados."
        - article [ref=e96]:
          - generic [ref=e97]:
            - generic [ref=e98]: Inglês
            - generic [ref=e99]: Gratuito
            - generic [ref=e100]: Documentação oficial
          - heading [level=3] [ref=e101]:
            - link "Next.js · Static exports ↗ (nova aba)" [ref=e102] [cursor=pointer]:
              - /url: https://nextjs.org/docs/app/guides/static-exports
              - text: Next.js · Static exports ↗
              - generic [ref=e103]: (nova aba)
          - paragraph [ref=e104]: "Recorte: Exportação estática e funcionalidades não suportadas."
          - paragraph [ref=e105]: Documentação corrente; registrar versões efetivamente utilizadas
          - paragraph [ref=e106]: SSR por requisição, cookies no servidor e Server Actions não cabem em export estático. SPA com API externa pode ser viável; não prometer SSR no GitHub Pages.
          - paragraph [ref=e107]: "Acesso conferido: 2026-10-19 · adequação: 2026-10-19. Consulta não garante disponibilidade futura nem todos os capítulos relacionados."
    - generic [ref=e108]:
      - heading "Livros relacionados" [level=2] [ref=e109]
      - paragraph [ref=e110]: Comprar livros não é necessário; as fontes gratuitas permanecem disponíveis.
  - contentinfo [ref=e111]:
    - generic [ref=e112]:
      - generic [ref=e113]:
        - link "StackTrail" [ref=e114] [cursor=pointer]:
          - /url: "#/"
        - paragraph [ref=e115]: Sua jornada de evolução na tecnologia.
        - paragraph [ref=e116]: Aprenda, pratique e desenvolva habilidades para o mercado.
      - navigation "Navegação do rodapé" [ref=e117]:
        - link "Roadmap Backend" [ref=e118] [cursor=pointer]:
          - /url: "#/"
        - link "Desenvolvimento Profissional" [ref=e119] [cursor=pointer]:
          - /url: "#/desenvolvimento-profissional"
        - link "Inglês" [ref=e120] [cursor=pointer]:
          - /url: "#/ingles"
        - link "GitHub" [ref=e121] [cursor=pointer]:
          - /url: https://github.com/daniel0052/stacktrail
    - paragraph [ref=e122]: © 2026 StackTrail · Projeto educacional
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | import {getStage} from '../src/practice/curriculum';
  4  | import {blankPilot,blankAttempt,withAttempt,withStageEvidence,PILOT_KEY} from '../src/practice/progress';
  5  | import {startExam} from '../src/practice/exam-state';
  6  | async function open(page:import('@playwright/test').Page,path:string){await page.goto('./#'+path);await expect(page.locator('main h1')).toBeVisible();}
  7  | for(const track of ['php','javascript'] as const)test(`Stage10 lifecycle, filters and three prompt roles ${track}`,async({page,context})=>{
  8  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,'/etapas/10');await page.getByRole('button',{name:track==='php'?/TRILHA A/:/TRILHA B/}).click();await expect(page.locator('main')).toContainText('INÍCIO DA FORMAÇÃO PLENO');
  9  |  const modules=page.locator('.pf-modules10 details');await expect(modules).toHaveCount(9);await expect(page.locator('.pf-modules10 details[open]')).toHaveCount(0);await modules.nth(0).locator('summary').focus();await page.keyboard.press('Enter');await modules.nth(1).locator('summary').click();await expect(modules.nth(0)).not.toHaveAttribute('open');
  10 |  await open(page,'/etapas/10/topicos');await expect(page.locator('main')).toContainText(track==='php'?'Integração React + Laravel':'Integração React + Express');await expect(page.getByRole('link',{name:track==='php'?'Integração React + Express →':'Integração React + Laravel →',exact:true})).toHaveCount(0);
  11 |  await open(page,'/exercicios?etapa=10');await expect(page.locator('main .pf-card h2')).toHaveCount(12);await page.getByRole('button',{name:/^Carregar mais exercícios/}).click();await expect(page.locator('main .pf-card h2')).toHaveCount(18);await page.getByLabel(/^Dificuldade/).selectOption('inicial');await page.getByLabel(/^Setor/).selectOption('Agendamentos');await expect(page.locator('main')).toContainText('Nenhum exercício encontrado');await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('10');await page.getByLabel(/^Buscar na etapa/).fill('Sessão, permissões');await page.getByRole('button',{name:'Iniciar atividade',exact:true}).click();await expect(page).toHaveURL(/10-13/);await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();await expect(page.locator('main')).toContainText(track==='php'?'Sanctum SPA':'store apropriado');
  12 |  await page.getByLabel(/^Solução, anotações/).fill('Fixture de UI, sem execução de projeto de estudante.');
  13 |  for(const [button,title,fragment] of [['Gerar projeto-base com IA','Gerar projeto-base com IA','IA PREPARADORA'],['Pedir ajuda à IA','Pedir ajuda à IA','IA TUTORA'],['Avaliar com IA','Avaliar com IA','IA REVISORA']]){await page.getByRole('button',{name:button,exact:true}).click();const dialog=page.getByRole('dialog',{name:title,exact:true});await expect(dialog.getByLabel(/^Prompt editável/)).toHaveValue(new RegExp(fragment));await expect(dialog.getByLabel(/^Prompt editável/)).not.toHaveValue(/\[(backend|security)10\]/);await dialog.getByRole('button',{name:'Copiar prompt',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain(fragment);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(page.getByRole('button',{name:button,exact:true})).toBeFocused();}
  14 |  await page.getByRole('button',{name:'Parar atividade',exact:true}).click();await page.reload();await expect(page.getByLabel(/^Solução, anotações/)).toHaveValue(/Fixture de UI/);await page.getByRole('button',{name:'Continuar atividade',exact:true}).click();for(const c of await page.locator('main .pf-check input').all())await c.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Desfazer conclusão',exact:true})).toBeVisible();await page.getByRole('button',{name:track==='php'?/TRILHA B/:/TRILHA A/}).click();await expect(page.getByLabel(/^Solução, anotações/)).toHaveValue('');await page.getByRole('button',{name:track==='php'?/TRILHA A/:/TRILHA B/}).click();await expect(page.getByLabel(/^Solução, anotações/)).toHaveValue(/Fixture de UI/);await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();
  15 |  await open(page,'/etapas/10/projeto');await expect(page.locator('main')).toContainText('Painel de Gestão de Pedidos');await expect(page.locator('main')).toContainText('Next é alternativa justificada');await expect(page.locator('main')).not.toContainText('[backend10]');
  16 |  await open(page,'/referencias?etapa=10');await page.getByLabel(/^Tipo de material/).selectOption('Livros');await expect(page.locator('.pf-book')).toHaveCount(3);await expect(page.locator('.pf-book-placeholder')).toHaveCount(3);await expect(page.locator('.pf-book-cover img')).toHaveCount(0);
  17 | });
  18 | test('Stage10 full completion reverses without affecting exam09 or old storage',async({page})=>{
  19 |  let p=blankPilot();p.currentStage='10';p.studied=getStage('10','php')!.topics.map(t=>t.id);p.juniorExam=startExam(undefined,'php','simulation');for(const a of [...getStage('10','php')!.exercises,getStage('10','php')!.project]){p=withAttempt(p,a.id,{solution:'Fixture sintética de estado.'});p=withAttempt(p,a.id,{checks:blankAttempt(a.id).checks.map(()=>true),status:'concluido'});}p=withStageEvidence(p,'10','Síntese de fixture');await page.addInitScript(({key,p})=>{if(!sessionStorage.getItem('seeded10')){localStorage.setItem(key,JSON.stringify(p));localStorage.setItem('backend-academy:progress','sentinela-legada');sessionStorage.setItem('seeded10','yes');}},{key:PILOT_KEY,p});await open(page,'/etapas/10');await expect(page.locator('main')).toContainText('100%');await open(page,'/etapas/10/exercicios/10-09');await page.getByRole('button',{name:'Desfazer conclusão',exact:true}).click();await open(page,'/etapas/10');await expect(page.locator('main')).not.toContainText('100%');await page.getByRole('button',{name:/Parar etapa/}).click();await page.reload();await page.getByRole('button',{name:/Retomar etapa/}).click();await page.getByRole('button',{name:/TRILHA B/}).click();await expect(page.locator('main')).not.toContainText('100%');expect(await page.evaluate(()=>localStorage.getItem('backend-academy:progress'))).toBe('sentinela-legada');expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).juniorExam.php.attempts.length,PILOT_KEY)).toBe(1);
  20 | });
  21 | test('Stage10 themes, selected routes, reflow, font and axe',async({page},info)=>{
> 22 |  test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const theme of ['dark','light']){await open(page,'/etapas/10');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();for(const path of ['/etapas/10','/etapas/10/topicos','/etapas/10/topicos/10-next','/exercicios?etapa=10','/etapas/10/exercicios/10-14','/etapas/10/exercicios/10-16','/etapas/10/projeto','/referencias?etapa=10','/progresso']){await open(page,path);for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} ${theme} ${width}`).toBe(true);}await page.getByLabel('Tamanho da fonte').selectOption('100');expect((await new AxeBuilder({page}).analyze()).violations,`${path} ${theme}`).toEqual([]);}await open(page,'/etapas/10');await page.setViewportSize({width:375,height:1000});await page.screenshot({path:info.outputPath(`stage10-${theme}-375.png`),fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:info.outputPath(`stage10-${theme}-1440.png`),fullPage:true});}expect(errors).toEqual([]);
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ^ Error: /etapas/10/topicos/10-next dark
  23 | });
  24 | 
```