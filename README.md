<p align="center"><img src="public/favicon.svg" width="72" height="72" alt="Marca StackTrail"></p>
<h1 align="center">StackTrail</h1>
<p align="center"><strong>Learn. Build. Evolve.</strong></p>
<p align="center">Aprendizagem de programação e desenvolvimento backend em português brasileiro,<br>com aulas, prática e progresso local.</p>

## Estado atual

O StackTrail é uma aplicação estática de estudo. Reúne **42 aulas e 47 desafios**
nas três etapas implementadas:

| Etapa | Conteúdo disponível | Prática |
| --- | --- | --- |
| **00 — Pensamento computacional** | 19 aulas em oito módulos: fundamentos, variáveis, decisões, repetições, vetores/matrizes, sub-rotinas, algoritmos e resolução integrada. | 29 desafios em três níveis: um narrativo e 28 visuais. |
| **01 — Frontend para Backend** | 11 aulas: HTML, CSS, TypeScript, DOM, assincronismo, HTTP e segurança; Tailwind, React e Next.js como explorações opcionais. | Nove exercícios em três níveis, com solução textual e autoavaliação. |
| **02 — Web, HTTP, redes, Git e ferramentas** | 12 aulas em cinco módulos, independentes de framework. | Nove desafios com bancada HTTP, rede, contratos REST, terminal e Git simulados; evidências externas declaradas. |

O mapa apresenta as etapas 00–19 em quatro fases. As etapas **03–19 estão em
preparação**, sem aulas simuladas ou exercícios já implementados. As fases organizam
competências de estudo e não garantem senioridade profissional.

> [!IMPORTANT]
> O conteúdo é elaborado com auxílio de inteligência artificial e pode conter erros
> ou informações desatualizadas. Confira conceitos em fontes oficiais e valide
> soluções com evidências. A plataforma complementa o estudo; não garante correção
> técnica de todo o material nem substitui revisão independente.

## Executar localmente

Requisitos: **Node.js 24.15 ou superior** e npm, conforme `package.json`.

```bash
npm ci
npm run dev
```

Abra a URL apresentada pelo Vite, normalmente
`http://127.0.0.1:5173/stacktrail/`. Se a porta estiver ocupada, o servidor poderá
usar outra. Host, protocolo e porta fazem parte da origem: mudar de `localhost`
para `127.0.0.1`, por exemplo, acessa outro armazenamento de progresso.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`build` inclui a verificação TypeScript e gera `dist/`. A prévia também usa
`/stacktrail/`. Para acompanhar testes durante alterações, use `npm run test:watch`.

## Como estudar

O mapa e as visões gerais levam a aulas, laboratório e autoavaliação. O menu
hambúrguer permite expandir/recolher a navegação; páginas de conteúdo abrem com o
menu recolhido. Há temas escuro/claro e ajuste de fonte entre 90% e 150%.

As aulas combinam objetivos, pré-requisitos, exemplos, erros comuns, revisão e
referências. Na Etapa 00, **exemplo resolvido, prática da aula e laboratório são
contextos separados**. Alguns exemplos são retomados explicitamente para estudar
outro aspecto; cada assunto tem vínculos de atividade definidos no conteúdo.

O seletor **Etapa do laboratório**, disponível na listagem e dentro dos exercícios,
permite alternar livremente entre as etapas 00, 01 e 02. A troca abre a listagem da
etapa escolhida e preserva os rascunhos e o progresso local de cada exercício.

O laboratório apresenta enunciado e critérios antes das dicas. As três pistas
aparecem progressivamente. Cada desafio mantém sua tentativa, reflexão, checklist
e estado de andamento. Os exercícios da Etapa 01 incluem cadastro de contato,
tarefas persistentes, catálogo local, busca de usuários, agendamento, dashboard de
livros, administração de agendamentos, checkout simulado e comparação CSS/Tailwind.

## Editor visual da Etapa 00

O estudante constrói sua própria solução, sem copiar a posição, a quantidade de
blocos ou os nomes internos de um modelo fixo.

1. Adicione blocos pela paleta usando clique, teclado ou arraste. A paleta continua
   disponível no modo ampliado.
2. Mova os blocos e conecte suas portas. Há seleção/exclusão, desfazer/refazer e
   alternativa de navegação por teclado.
3. Edite junto ao bloco. As propriedades escolhem o lado com espaço; no celular
   ficam em um painel inferior. A ajuda fecha por botão, Esc ou clique no fundo.
4. Informe os valores atuais. Cada entrada tem nome e tipo próprios: número,
   texto, booleano, array de números, array de textos ou matriz numérica. Um bloco
   pode ler várias entradas. Coleções usam colchetes fixos e quebram linha sem
   rolagem interna; por exemplo, `[1, 2]`, `["Ana", "Bia"]` e `[[1, 2], [3, 4]]`.
5. Execute no **mesmo canvas**. Há avanço automático com intervalos de 0,4 s, 0,8 s
   ou 1,5 s, pausa/retomada, avanço manual, passo anterior e acesso direto ao resultado.
   O bloco ativo, as variáveis, as saídas e a pilha ficam próximos dos controles.
6. Arraste o fundo para navegar, ajuste o zoom ou amplie. No celular em pé, uma
   orientação dispensável sugere girar a tela. A ampliação mantém edição e execução.

Os blocos de entrada mostram declarações como `nota: Número;`. Os valores ficam
no painel de entradas e na edição do bloco, ligados ao mesmo estado. A execução
do aluno não tem um segundo seletor de dados nem acrescenta um diagrama abaixo.
Nas demonstrações, o seletor identificado como **Entrada do exemplo** permite
explorar os casos publicados.

Funções e procedimentos têm grafos próprios, parâmetros, variáveis locais e retorno.
O interpretador acompanha chamadas, composição e recursão limitada no mesmo canvas.
Há expressões seguras, índices, conversões explícitas, vetores e matrizes.

## Simuladores da Etapa 02

- **HTTP:** método, endpoint, headers e JSON editáveis; CRUD de livros, HEAD/OPTIONS, ETag/304, sessão fictícia, preflight e cenários de erro. Nenhuma URL é acessada de verdade.
- **Rede:** percurso manual com DNS, conexão, TLS, infraestrutura, aplicação e resposta; falhas interrompem a camada correspondente. Modelo conceitual HTTPS/TCP com cache miss, sem medir rede nem reproduzir pacotes QUIC.
- **Contratos:** configuração de operação, método, rota, status, headers e representação; feedback por coerência, aceitando arrays/envelopes e IDs equivalentes. Não é certificação REST/OpenAPI.
- **Terminal:** comandos selecionados, arquivos virtuais em `/lab`, pipes, redirecionamentos, variáveis, permissões descritivas e cURL local. `help` lista a gramática; não executa shell real nem scripts.
- **Git:** arquivo didático, working tree, staging, commits/branches, merge, rebase linear com conflitos, remoto e PR fictícios. Não calcula hashes Git nem acessa repositórios reais.

HTTP, contrato, terminal e Git salvam journals locais por contexto de aula/exercício (`stacktrail:web:1:...`), com até 200 ações; são reexecutados por modelos permitidos ao carregar. Git admite até 100 commits didáticos. Esses rascunhos **não entram na exportação global de progresso**. A rede é um percurso reiniciável. Registre resultados relevantes no campo de evidências do exercício para exportá-los e copiá-los no prompt.

Concluir os seis exercícios iniciais/intermediários e registrar competências/evidências compõe o avanço declarado da Etapa 02; avançados não bloqueiam. A rubrica original (35/20/25/20) sugere ≥8/10, sem bloqueantes. Não há nota automática nem comprovação de PR, captura DevTools, publicação ou comando externo. Aprovação limitada de um contrato simulado não aprova a entrega externa.

## Avaliação e limites

**Código JavaScript/TypeScript colado nunca é executado.** Na Etapa 00, o interpretador
percorre apenas os blocos e a AST permitidos, sem `eval` ou execução arbitrária.
A Etapa 01 salva código/texto e autoavaliações; não corrige automaticamente esse código.

O avaliador visual executa casos publicados e adicionais, compara as saídas reais
com as esperadas e verifica tipos, estrutura executável, limites e restrições
explicitamente exigidas. Soluções visualmente diferentes podem ser aceitas.
**Passar nos testes não prova correção para todas as entradas.** Os casos adicionais
são revelados após a avaliação, mas estão no cliente e não constituem testes secretos.

Limites atuais: 120 blocos e 240 conexões por grafo, 16 funções, 16 entradas por
bloco, 32 declarações por escopo, 2000 passos e 24 níveis de chamadas. Vetores têm
até 100 itens e matrizes até 20 × 20; contratos podem impor limites menores.
Ordenações e outros algoritmos podem atingir o limite de passos em entradas grandes.

A conclusão de um desafio visual combina os testes da tentativa atual com a revisão
dos critérios. Alterar o algoritmo invalida os resultados anteriores; alterar dados
invalida o rastreamento anterior. Marcar uma leitura ou checklist não comprova
correção técnica. O cálculo dos indicadores das etapas está centralizado em
`src/features/progress/model.ts`.

## Progresso, privacidade e revisão com IA

O progresso é salvo em **localStorage**, por origem, navegador e dispositivo, sem
conta ou sincronização. É possível exportar/importar o progresso global em JSON.
Os arquivos incluem soluções e reflexões: evite guardar segredos ou dados pessoais.

- O esquema atual é **v5**, com migrações de v1/v2/v3/v4. A chave legada
  `backend-academy:progress` foi preservada para compatibilidade.
- Dados importados são validados e resultados dos fluxogramas são recalculados.
  Registros textuais e cadernos antigos são preservados nas migrações.
- Práticas das aulas têm rascunhos separados por aula, desafio e modo. Não afetam
  o laboratório e **não estão incluídas na exportação global**.
- As competências e evidências de aprendizagem são declaradas pelo estudante;
  a plataforma não verifica automaticamente todas essas declarações.

**Avaliar com IA** prepara um prompt editável com enunciado, critérios e contexto.
O estudante decide o que copiar e para onde enviar. Não há API de IA integrada,
envio automático de soluções, backend, autenticação ou banco de dados.

## Tecnologias utilizadas

<table>
  <tr>
    <td align="center"><img src="docs/icons/react.svg" width="36" height="36" alt=""><br><strong>React</strong></td>
    <td align="center"><img src="docs/icons/typescript.svg" width="36" height="36" alt=""><br><strong>TypeScript</strong></td>
    <td align="center"><img src="docs/icons/vite.svg" width="36" height="36" alt=""><br><strong>Vite</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/icons/tailwindcss.svg" width="36" height="36" alt=""><br><strong>Tailwind CSS</strong></td>
    <td align="center"><img src="docs/icons/mdx.svg" width="36" height="36" alt=""><br><strong>MDX</strong></td>
    <td align="center"><img src="docs/icons/reactrouter.svg" width="36" height="36" alt=""><br><strong>React Router</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/icons/vitest.svg" width="36" height="36" alt=""><br><strong>Vitest</strong></td>
    <td align="center"><img src="docs/icons/eslint.svg" width="36" height="36" alt=""><br><strong>ESLint</strong></td>
    <td align="center"><img src="docs/icons/githubactions.svg" width="36" height="36" alt=""><br><strong>GitHub Actions</strong></td>
  </tr>
</table>

Ícones do [Simple Icons](https://simpleicons.org/), armazenados em `docs/icons`
sob [CC0 1.0](docs/icons/LICENSE.md). Os nomes e as marcas pertencem aos seus
respectivos titulares.

Os ícones representam ferramentas presentes no código, nas dependências e nos
workflows do projeto. O realce de código usa `rehype-highlight`; os diagramas e o
interpretador são implementações próprias, sem serviço externo de execução.

## Arquitetura

Stack: React 19, TypeScript estrito, Vite 8, Tailwind CSS, React Router/HashRouter,
MDX, `remark-gfm` e `rehype-highlight`. Testes usam Vitest, Testing Library e jsdom;
lint usa ESLint/typescript-eslint. Versões exatas estão no lockfile.

```text
src/
  app/                       # shell, rotas, mapa, aulas, dashboards e autoavaliação
  components/
    web/                     # HTTP, rede, contratos, terminal e Git locais
    flow/                    # canvas, propriedades, entradas, execução e funções
    learning/                # componentes MDX, práticas e isolamento por aula
    lab/                     # enunciados, dicas, caderno e prompts de revisão
  content/
    roadmap.ts               # mapa das etapas 00–19
    stages.ts                # inventários e rotas das etapas implementadas
    stage-00/
      lessons/               # 19 aulas MDX
      lesson-activities.ts   # vínculos explícitos dos tópicos iniciais
      deep-curriculum.ts     # atividades e exemplos dos módulos ampliados
      exercises.ts           # inventário do laboratório
      flow-challenges.ts     # contratos e casos
      additional-cases.ts    # casos adicionais
    stage-01/                # 11 aulas, nove exercícios, contratos e rubrica
    stage-02/                # 12 aulas, nove exercícios, competências e rubrica
  features/
    web/                     # simuladores determinísticos e journals validados
    flow/                    # modelo, parser seguro, interpretador e persistência
    progress/                # esquema, migrações, armazenamento e indicadores
  styles/
  tests/
public/
  favicon.svg                # marca s_ vetorial, independente de fontes externas
  .nojekyll
.github/workflows/
  ci.yml                     # typecheck, lint, testes e build
  deploy.yml                 # build e publicação no GitHub Pages
AGENTS.md                    # instruções atuais para manutenção
README.md
```

Aulas MDX são carregadas sob demanda. Apenas conteúdo versionado no repositório é
compilado; textos do estudante não se tornam componentes nem scripts. O grafo
continua no formato v1, com campos opcionais para declarações e funções.

## Fontes e registros de desenvolvimento

O currículo do Notion orienta objetivos e sequência. Explicações, exemplos e
contratos próprios são identificados como elaboração didática. Consultas e decisões
anteriores estão documentadas; estes registros podem conter detalhes históricos
superados pelo código atual.

- [Plano e inventário inicial](docs/plano-e-inventario.md).
- [Reformulação da Etapa 00](docs/etapa-00-reformulacao.md).
- [Auditoria do conteúdo, editor e execução](docs/etapa-00-auditoria.md).
- [Histórico do laboratório visual](docs/stage-00-visual-lab.md).

Captura histórica da listagem de etapas; não comprova o estado de um deploy atual:

![Mapa do StackTrail](docs/screenshots/roadmap-sem-links-externos.jpg)

## GitHub Pages e automação

O projeto está configurado para um project site em **GitHub Pages**:

- `base: '/stacktrail/'` no Vite.
- HashRouter, como `/stacktrail/#/etapas/00/aulas/introducao` e
  `/stacktrail/#/laboratorio/contato`.
- `public/.nojekyll` e o favicon são copiados para `dist/`.
- O favicon é referenciado como `/favicon.svg` no HTML; o Vite aplica a base
  `/stacktrail/` no desenvolvimento e no build.

Há dois workflows: **CI**, em pull requests e pushes para `main`, e **Deploy to
GitHub Pages**, em pushes para `main` ou disparo manual. O deploy precisa do Pages
configurado para GitHub Actions e das permissões/ambiente definidos no workflow.

Existência do workflow e build local não comprovam publicação bem-sucedida. Se a
base ou o domínio mudar, revise o Vite e valide os assets gerados antes de publicar.

## Limites e próximos passos

Projeto em desenvolvimento. Expandir as demais etapas somente após validar o padrão
de aprendizagem e conforme novas solicitações. A conferência atual de teclado e
layout não equivale a auditoria completa de WCAG/leitores de tela. A aplicação usa
simuladores locais; a aula HTTP inclui um servidor de estudo opcional para executar
em projeto separado. A fixture automatizada de testes não faz parte da aplicação publicada.

## Segurança

Orientações para relatar vulnerabilidades e os limites das proteções do projeto
estão em [SECURITY.md](SECURITY.md). A política distingue configurações versionadas
de ajustes administrativos do GitHub que precisam ser conferidos pelo mantenedor.

## Licença

Ainda não há arquivo `LICENSE`; a licença do projeto não foi definida.

## Verificação da qualidade

A verificação técnica independente está em
[CONTENT_VERIFICATION.md](docs/CONTENT_VERIFICATION.md), com resultados por aula,
conceito, fonte consultada e teste. O processo combina `stacktrail-educator`
(qualidade pedagógica), `stacktrail-factchecker` (precisão técnica independente)
e `stacktrail-uiux` (acessibilidade e usabilidade). Notas pedagógicas, referências
listadas e build não substituem a verificação técnica.

As decisões, achados, cobertura e limitações estão em
[QUALITY_AUDIT.md](docs/QUALITY_AUDIT.md). As revisões pedagógicas das etapas
[00](docs/etapa-00-auditoria-pedagogica.md),
[01](docs/etapa-01-auditoria-pedagogica.md) e
[02](docs/etapa-02-auditoria-pedagogica.md) distinguem currículo, elaboração didática
e complementos técnicos.

```bash
npm run typecheck
npm run lint
npm test -- --maxWorkers=2
npm run build
npx playwright install chromium
npm run test:ui
```

Os testes de navegador iniciam servidores locais nas portas 4177, 5174 e 4179.
O último executa somente o exemplo HTTP escrito no material, com dados fictícios
e temporários. A suíte de zoom utiliza uma extensão de teste em perfil descartável
do Chromium; não altera o perfil pessoal. Relatórios temporários ficam em
`test-results/` e `playwright-report/`. Execute uma suíte Playwright por vez para
evitar que o encerramento de um servidor interrompa outra execução.
