# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stage-ten.spec.ts >> Stage10 lifecycle, filters and three prompt roles php
- Location: e2e/stage-ten.spec.ts:7:50

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Limpar filtros', exact: true }) resolved to 2 elements:
    1) <button type="button" class="pf-button">Limpar filtros</button> aka getByRole('region', { name: 'Filtros de exercícios' }).getByRole('button', { name: 'Limpar filtros' })
    2) <button type="button" class="pf-button">Limpar filtros</button> aka locator('section').getByRole('button', { name: 'Limpar filtros' })

Call log:
  - waiting for getByRole('button', { name: 'Limpar filtros', exact: true })

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
  - main [ref=e21]:
    - paragraph [ref=e22]: PRÁTICA
    - heading "Exercícios sem respostas prontas" [level=1] [ref=e23]
    - paragraph [ref=e24]: Desafios progressivos, dicas sob seu controle e evidências registradas localmente. Nenhum gabarito completo.
    - group "Escolher trilha backend da Etapa 10" [ref=e26]:
      - button "TRILHA A PHP + Laravel React · TypeScript · API escolhida · Sessão · Testes" [pressed] [ref=e27] [cursor=pointer]:
        - generic [ref=e28]: TRILHA A
        - strong [ref=e29]: PHP + Laravel
        - generic [ref=e30]: React · TypeScript · API escolhida · Sessão · Testes
      - button "TRILHA B TypeScript + Node.js + Express React · TypeScript · API escolhida · Sessão · Testes" [ref=e31] [cursor=pointer]:
        - generic [ref=e32]: TRILHA B
        - strong [ref=e33]: TypeScript + Node.js + Express
        - generic [ref=e34]: React · TypeScript · API escolhida · Sessão · Testes
    - region "Filtros de exercícios" [ref=e35]:
      - generic [ref=e36]:
        - text: Etapa selecionada
        - combobox "Etapa selecionada" [ref=e37]:
          - option "Etapa 00 — Pensamento computacional"
          - option "Etapa 01 — Fundamentos de Frontend"
          - option "Etapa 02 — Web, HTTP, redes, Git e ferramentas"
          - 'option "Etapa 03 — Fundamentos de Backend: PHP/Laravel ou TypeScript/Node.js/Express"'
          - option "Etapa 04 — APIs REST e Regras de Negócio"
          - option "Etapa 05 — SQL, PostgreSQL e persistência"
          - option "Etapa 06 — Testes automatizados e depuração"
          - option "Etapa 07 — Segurança, autenticação e autorização"
          - option "Etapa 08 — Docker, CI/CD, deploy e fundamentos de Kubernetes"
          - option "Etapa 09 — Consolidação profissional e avaliação final Júnior"
          - option "Etapa 10 — Frontend Moderno e Integração Full Stack" [selected]
          - option "Etapa 11 — Arquitetura pragmática e integrações (em preparação)"
          - option "Etapa 12 — Mensageria, filas e resiliência (em preparação)"
          - option "Etapa 13 — Qualidade, segurança e entrega contínua (em preparação)"
          - option "Etapa 14 — Observabilidade e IA aplicada (em preparação)"
          - option "Etapa 15 — Projeto final de validação Pleno (em preparação)"
          - option "Etapa 16 — Escala, desempenho e sistemas distribuídos (em preparação)"
          - option "Etapa 17 — SRE, segurança e governança (em preparação)"
          - option "Etapa 18 — Liderança técnica e IA responsável (em preparação)"
          - option "Etapa 19 — Projeto final de validação Sênior (em preparação)"
      - generic [ref=e38]:
        - text: Setor
        - combobox "Setor" [ref=e39]:
          - option "Todos os setores da etapa"
          - option "Gestão administrativa"
          - option "E-commerce"
          - option "Logística"
          - option "Agendamentos" [selected]
          - option "Catálogo público"
      - generic [ref=e40]:
        - text: Dificuldade
        - combobox "Dificuldade" [ref=e41]:
          - option "Todas"
          - option "Iniciante" [selected]
          - option "Intermediário"
          - option "Avançado"
          - option "Desafio extra"
      - generic [ref=e42]:
        - text: Status
        - combobox "Status" [ref=e43]:
          - option "Todos" [selected]
          - option "Não iniciados"
          - option "Em andamento"
          - option "Concluídos"
      - generic [ref=e44]:
        - text: Trilha dos exercícios
        - combobox "Trilha dos exercícios" [ref=e45]:
          - option "Todas"
          - option "PHP/Laravel" [selected]
          - option "TypeScript/Node.js/Express"
      - generic [ref=e46]:
        - text: Buscar na etapa
        - searchbox "Buscar na etapa" [ref=e47]
      - button "Limpar filtros" [ref=e48] [cursor=pointer]
    - status [ref=e49]:
      - paragraph [ref=e50]:
        - strong [ref=e51]: "Etapa 10 — Frontend Moderno e Integração Full Stack:"
        - text: Nenhum exercício encontrado com esses filtros.
      - generic "Filtros complementares ativos" [ref=e52]:
        - generic [ref=e53]: "Setor: Agendamentos"
        - generic [ref=e54]: "Dificuldade: Iniciante"
        - generic [ref=e55]: "Trilha: PHP/Laravel"
    - generic [ref=e56]:
      - paragraph [ref=e57]: Nenhum exercício encontrado com esses filtros.
      - button "Limpar filtros" [ref=e58] [cursor=pointer]
  - contentinfo [ref=e59]:
    - generic [ref=e60]:
      - generic [ref=e61]:
        - link "StackTrail" [ref=e62] [cursor=pointer]:
          - /url: "#/"
        - paragraph [ref=e63]: Sua jornada de evolução na tecnologia.
        - paragraph [ref=e64]: Aprenda, pratique e desenvolva habilidades para o mercado.
      - navigation "Navegação do rodapé" [ref=e65]:
        - link "Roadmap Backend" [ref=e66] [cursor=pointer]:
          - /url: "#/"
        - link "Desenvolvimento Profissional" [ref=e67] [cursor=pointer]:
          - /url: "#/desenvolvimento-profissional"
        - link "Inglês" [ref=e68] [cursor=pointer]:
          - /url: "#/ingles"
        - link "GitHub" [ref=e69] [cursor=pointer]:
          - /url: https://github.com/daniel0052/stacktrail
    - paragraph [ref=e70]: © 2026 StackTrail · Projeto educacional
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
> 11 |  await open(page,'/exercicios?etapa=10');await expect(page.locator('main .pf-card h2')).toHaveCount(12);await page.getByRole('button',{name:/^Carregar mais exercícios/}).click();await expect(page.locator('main .pf-card h2')).toHaveCount(18);await page.getByLabel(/^Dificuldade/).selectOption('inicial');await page.getByLabel(/^Setor/).selectOption('Agendamentos');await expect(page.locator('main')).toContainText('Nenhum exercício encontrado');await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.getByLabel(/^Etapa selecionada/)).toHaveValue('10');await page.getByLabel(/^Buscar na etapa/).fill('Sessão, permissões');await page.getByRole('button',{name:'Iniciar atividade',exact:true}).click();await expect(page).toHaveURL(/10-13/);await expect(page.getByRole('button',{name:'Parar atividade',exact:true})).toBeVisible();await expect(page.locator('main')).toContainText(track==='php'?'Sanctum SPA':'store apropriado');
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Limpar filtros', exact: true }) resolved to 2 elements:
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
  22 |  test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const theme of ['dark','light']){await open(page,'/etapas/10');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();for(const path of ['/etapas/10','/etapas/10/topicos','/etapas/10/topicos/10-next','/exercicios?etapa=10','/etapas/10/exercicios/10-14','/etapas/10/exercicios/10-16','/etapas/10/projeto','/referencias?etapa=10','/progresso']){await open(page,path);for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} ${theme} ${width}`).toBe(true);}await page.getByLabel('Tamanho da fonte').selectOption('100');expect((await new AxeBuilder({page}).analyze()).violations,`${path} ${theme}`).toEqual([]);}await open(page,'/etapas/10');await page.setViewportSize({width:375,height:1000});await page.screenshot({path:info.outputPath(`stage10-${theme}-375.png`),fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:info.outputPath(`stage10-${theme}-1440.png`),fullPage:true});}expect(errors).toEqual([]);
  23 | });
  24 | 
```