# English Journey — Inglês para a Vida e Carreira Internacional

**Data**: 2026-10-18  
**Área**: `English Journey` (`/ingles`) — Área independente de idiomas e carreira global  
**Padrão curricular**: Common European Framework of Reference for Languages (CEFR) — Conselho da Europa (Companion Volume)  
**Persistência**: `localStorage` sob a chave `stacktrail:roadmap:1` (campo `english`)  

---

## 1. Missão e Princípios

O **English Journey** é uma área curricular independente do StackTrail concebida para orientar estudantes e desenvolvedores no domínio da língua inglesa do nível **A1 (Beginner)** ao **C2 (Proficient)**.

Diferente da área de Desenvolvimento Profissional (que não possui exercícios acadêmicos artificiais), o English Journey inclui exercícios práticos interativos, avaliações diagnósticas e revisões espaçadas, pois a aquisição de uma segunda língua demanda prática contínua, repetição contextual e escuta ativa.

### Princípios norteadores:
1. **Foco na vida real e carreira global**: Desenvolve inglês não apenas para termos de TI, mas para o cotidiano, reuniões internacionais, viagens, oratória técnica e processos seletivos globais.
2. **Descritores oficiais do CEFR**: Baseado integralmente nos descritores do Conselho da Europa (*CEFR Companion Volume*).
3. **Sem falsas promessas de certificação**: A conclusão do conteúdo da plataforma é autodeclarada e não equivale a um certificado oficial do CEFR, Cambridge, IELTS ou ETS.
4. **Cinco competências integradas**: Cada nível equilibra *Listening*, *Speaking*, *Reading*, *Writing* e *Vocabulary & Grammar*.
5. **Avaliação honesta e sem IA fake**: Exercícios objetivos são corrigidos localmente no navegador. Exercícios subjetivos (fala e escrita) oferecem rubricas analíticas transparentes e prompts estruturados e auditados para consulta externa opcional em assistentes de IA (sem chamadas automáticas ou notas inventadas).
6. **100% estático e sem dependências externas pagas**: Sem backend, sem contas, sem banco remoto e sem cobranças.
7. **Independência total**: Não altera etapas técnicas (00 a 19), não interfere em Desenvolvimento Profissional e mantém namespaces isolados.

---

## 2. Estrutura dos Níveis CEFR e Marcos

Foram estruturados 6 níveis com **24 marcos comunicativos lineares** (4 marcos por nível):

| Nível CEFR | Título Oficial | Objetivo Resumido | Marcos Comunicativos |
|---|---|---|---|
| **A1** | *Beginner / Breakthrough* | Compreensão e produção de expressões muito simples para necessidades imediatas. | 4 marcos (Apresentação pessoal, rotina, compras/direções e pedidos elementares) |
| **A2** | *Elementary / Waystage* | Comunicação em tarefas cotidianas simples e previsão de situações corriqueiras. | 4 marcos (Experiências passadas, viagens/hotéis, instruções de trabalho e preferências) |
| **B1** | *Intermediate / Threshold* | Comunicação independente sobre temas familiares, trabalho, lazer e expressão de opiniões. | 4 marcos (Contar histórias, expressar opiniões fundamentadas, reuniões diárias e lidar com imprevistos) |
| **B2** | *Upper Intermediate / Vantage* | Compreensão de ideias complexas, debates, argumentação e comunicação profissional fluida. | 4 marcos (Conduzir reuniões, defender pontos de vista técnicos, negociação e apresentações formais) |
| **C1** | *Advanced / Effective Operational Proficiency* | Flexibilidade, nuances, registro formal/informal e síntese de assuntos complexos. | 4 marcos (Liderança de projetos multifuncionais, redação de relatórios executivos, debate com diplomacia e entrevistas C-Level) |
| **C2** | *Proficient / Mastery* | Domínio sofisticado, precisão extrema, nuances culturais, humor, ironia e síntese avançada. | 4 marcos (Comunicação de alto impacto executivo, debate crítico de artigos de pesquisa, mediação intercultural e publicação acadêmica/estratégica) |

---

## 3. Trilha de Carreira Internacional

A seção de carreira fornece 8 módulos práticos com frameworks reais adotados por empresas multinacionais de tecnologia:

1. **STAR Framework para Entrevistas Comportamentais**: Estruturação de *Situation, Task, Action, Result* com métricas quantitativas.
2. **Currículo Internacional & LinkedIn**: Adaptação para modelos norte-americanos e europeus sem foto, com verbos de ação no passado e sem pronomes pessoais redundantes.
3. **Fórmula de Impacto do Google (X-Y-Z)**: *"Accomplished [X] as measured by [Y], by doing [Z]"*.
4. **Comunicação Assíncrona em Pull Requests e Code Reviews**: Como discordar construtivamente usando prefixos de convenção (*nit:*, *suggestion:*, *question:*).
5. **Apresentação e Defesa de Decisões Técnicas (RFCs & Trade-offs)**: Justificar escolhas arquiteturais pesando prós, contras e impacto no negócio.
6. **Negociação de Ofertas Internacionais e Remuneração Global**: Expressões profissionais para discutir equity, moeda forte e benefícios.
7. **Daily Stand-ups e Reuniões de Sincronização Ágil**: Frases eficientes para comunicar blockers sem jargão excessivo ou hesitação.
8. **Networking Internacional e Mensagens de Abordagem**: Como contatar recrutadores e líderes técnicos de forma respeitosa e personalizada.

---

## 4. Guia de Exames Oficiais e Fato Concretizado (TOEFL 2026)

Em conformidade rigorosa com a skill `stacktrail-factchecker`:
- **Cambridge English Qualifications**: Documentados B2 First (160–179), C1 Advanced (180–199) e C2 Proficiency (200–230), com validade indeterminada.
- **IELTS (Academic & General Training)**: Band score de 0 a 9.0 com validade de 2 anos.
- **TOEFL iBT (Atualização Oficial ETS de Janeiro de 2026)**: Documentada a transição da pontuação histórica (0–120) para a **escala de 1 a 6** com notas em meios pontos (0.5), alinhada de forma direta aos níveis do CEFR. Destaca-se que pontuações na escala legada continuam válidas até seu vencimento de 2 anos.

---

## 5. Experiência de Usuário: Arrastar com o Mouse (Drag-to-Scroll)

Conforme a diretriz do usuário de evitar barras de rolagem convencionais e favorecer navegação tátil com o mouse:
- **Interação Drag-to-Scroll**: Implementada através do hook customizado `useDragScroll`, permitindo ao usuário clicar e arrastar horizontalmente os containers de abas e da trilha CEFR.
- **Cursor de Mão**: O cursor padrão do container e dos itens interativos é alterado para `cursor: grab`, transitando dinamicamente para `cursor: grabbing` durante a rolagem ativa.
- **Supressão de Cliques Involuntários**: Clicar e arrastar suprime o disparo de `onClick` nos botões filhos através de `onClickCapture`, garantindo que o usuário não selecione abas acidentalmente ao finalizar o arrasto.
- **Indicador Visual com Ícone de Mão**: Foram adicionados crachás visuais com o ícone ✋ animado (*hand wave*) e a legenda *"Arraste com o mouse"*, orientando o estudante sobre a funcionalidade sem poluição visual.
- **Ocultação de Scrollbars**: As barras de rolagem nativas são completamente ocultadas via CSS (`scrollbar-width: none` e `::-webkit-scrollbar { display: none }`), preservando o suporte nativo a gestos de toque no mobile (`-webkit-overflow-scrolling: touch`) e navegação por teclado (`Tab`, `Shift+Tab`, `Focus`).

---

## 6. Verificação de Fontes e Referências

1. **Council of Europe — CEFR Companion Volume (2020)**:  
   *URL*: https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions  
   *Status*: Verificado e adotado integralmente nos descritores.
2. **BBC Learning English — 6 Minute English**:  
   *URL*: https://www.bbc.co.uk/learningenglish/english/features/6-minute-english  
   *Status*: Áudios e transcrições legítimos incorporados às atividades de Listening dos níveis A1 e B1.
3. **British Council — LearnEnglish Podcasts**:  
   *URL*: https://learnenglish.britishcouncil.org/general-english/audio-series/podcasts  
   *Status*: Áudios autênticos e tarefas de compreensão verificados.
4. **ETS TOEFL Score Scale Update**:  
   *URL*: https://www.ets.org/toefl/score-users/news/new-toefl-score-scale.html  
   *Status*: Confirmada a escala de 1 a 6 adotada em 2026.
5. **Livros e Obras de Referência com Capas Locais Verificadas**:
   - *English Grammar in Use* (Raymond Murphy — Cambridge University Press, 5th ed., 2019): `assets/books/english/english-grammar-in-use.jpg` (40.112 bytes)
   - *Practical English Usage* (Michael Swan — Oxford University Press, 4th ed., 2016): `assets/books/english/practical-english-usage.jpg` (28.254 bytes)
   - *English Vocabulary in Use — Upper-Intermediate* (Michael McCarthy, Felicity O'Dell — Cambridge, 4th ed., 2017): `assets/books/english/english-vocabulary-in-use.jpg` (23.753 bytes)
   - *Ship or Sheep? An Intermediate Pronunciation Course* (Ann Baker — Cambridge, 3rd ed., 2006): `assets/books/english/ship-or-sheep.jpg` (27.547 bytes)
   - *Communicating in Business* (Simon Sweeney — Cambridge, 2nd ed., 2004): `assets/books/english/communicating-in-business.jpg` (30.086 bytes)  
   *Tratamento de capas*: Capas reais verificadas servidas localmente a partir de `public-roadmap/assets/books/english/` e `public/assets/books/english/`, resolvidas através da função utilitária `resolveAssetUrl` (compatível com `import.meta.env.BASE_URL` para GitHub Pages `/stacktrail/`) e com fallback seguro para placeholder tipográfico com ícone SVG de livro em caso de falha de carregamento (`onError`).

---

## 7. Ciclo de Vida Completo das Atividades e Seção "Continuar Estudando"

Em atendimento às diretrizes pedagógicas (`stacktrail-educator`) e de interface (`stacktrail-uiux`), foi estabelecido um ciclo de vida rigoroso e transparente para todas as práticas:

- **Estados Formais**:
  1. `nao-iniciado` (○ Não iniciado)
  2. `em-andamento` (▶️ Em andamento)
  3. `interrompido` (⏸️ Interrompido / Pausado)
  4. `concluido` (✓ Concluído)

- **Ações e Regras**:
  - **Iniciar**: Abre a atividade, registra status `em-andamento`, atualiza a rota com âncora/parâmetro (`exercicio=...`), realiza scroll suave e concede foco ao elemento interativo.
  - **Parar**: Interrompe a atividade (`interrompido`) preservando integralmente no `localStorage` todas as respostas digitadas, opções marcadas e critérios selecionados.
  - **Continuar**: Retoma a atividade imediatamente do ponto exato onde foi interrompida, restaurando o estado `em-andamento`.
  - **Concluir**: Registra a conclusão após validação objetiva ou preenchimento integral dos critérios da rubrica de autoavaliação (+XP atribuído).
  - **Refazer**: Permite nova tentativa prática mantendo ou limpando o rascunho anterior.
  - **Desfazer conclusão**: Reverte o status para `em-andamento` e estorna o XP correspondente.

- **Seção "Continuar Estudando"**:
  - Exibida com destaque no topo da página sempre que existirem atividades (diagnóstico inicial, exercícios A1–C2 ou avaliações de nível) com status `em-andamento` ou `interrompido`.
  - Apresenta card contextual com metadados do exercício/nível e botões diretos de **Continuar** e **Parar**.

---

## 8. Diagnóstico Inicial de Nivelamento ("Não sei meu nível")

- Fluxo passo a passo com 8 questões progressivas contextualizadas abrangendo desde verb to be (A1) até estruturas condicionais e de discurso (C1).
- Controles de navegação questão a questão (anterior, próxima), barra de progresso em tempo real e ações imediatas de pausa e retoma.
- Persistência instantânea de cada resposta no `localStorage` sob `engProgress.initialPlacement`.
- Relatório de conclusão transparente: pontuação obtida, limitações explícitas do instrumento formativo, nível de partida sugerido e botão de início imediato no nível recomendado.
- Declaração explícita de ausência de vínculo ou equivalência a certificações formais (Cambridge, IELTS, TOEFL).

---

## 9. Bateria de Testes e Validação Técnica

- **Suíte de Testes Automatizados**: `src/tests/english-journey.test.tsx` (17 testes aprovados cobrindo isolamento com as 20 etapas técnicas 00–19, 6 níveis CEFR, 24 marcos, exercícios em 5 habilidades, ciclo de vida completo de atividades, navegação e foco por "Iniciar exercício", seção Continuar Estudando, fluxo completo de diagnóstico, capas locais de livros e drag-to-scroll).
- **TypeScript**: `npm run typecheck` aprovado com 0 erros (`tsc --noEmit`).
- **ESLint**: `npm run lint` aprovado com 0 erros e 0 warnings.
- **Suíte Geral**: `npm test -- --maxWorkers=2` com 49 arquivos de teste e 483 testes aprovados.
- **Vite Build**: `npm run build` aprovado gerando os bundles em `dist/`.
- **Verificação de Assets**: Capas de livros confirmadas no diretório `dist/assets/books/english/`.
- **Isolamento do Bundle**: `node scripts/check-practice-build.mjs` aprovado.

## 10. Correção de navegação e feedback —18/10/2026

Recorte de UI/UX sobre a implementação existente, preservando currículo, exercícios, respostas, IDs e armazenamento. Aplicada a skill stacktrail-uiux e revisão independente somente leitura, com reconferência renderizada.

- Os botões do hero e das nove áreas levam ao conteúdo solicitado com rolagem e foco no destino. O diagnóstico iniciado/retomado abre na questão; avançar/anterior e finalizar levam à nova pergunta/resultado. Cliques repetidos continuam levando ao destino sem exigir nova mudança de estado.
- Navegação respeita movimento reduzido. Não depende de temporizadores fixos; o destino é revelado após o commit da rota/conteúdo. Exercícios recebem foco no card, sem acionar seu primeiro botão por acidente.
- URL é a fonte da seção atual, com fallback para a visão do nível. Seção e nível são atualizados juntos, sem manter nível anterior; voltar/avançar preserva o destino e o alvo do exercício prevalece sobre filtros antigos. Cliques repetidos na mesma seção não duplicam entradas de histórico.
- Retomar/parar uma avaliação atua no nível do card, mesmo quando outro nível está selecionado.
- Indicador “seção · nível” e navegação aria-current/aria-controls comunicam o contexto. Nível em estudo anuncia confirmação; modos de leitura e revisão expõem seleção por aria-pressed.
- Cópia de prompt só informa sucesso após confirmação da área de transferência; falha tem mensagem junto ao botão, sem promessa falsa de cópia.
- Corrigido overflow observado em320px/fonte150%: seletorCEFR limitado ao pai e dica de arraste com quebra de linha. Cards de conquistas bloqueadas preservam contraste em tema claro, sem opacidade global sobre o texto.

Arquivos deste recorte: `src/practice/EnglishJourneyPage.tsx`, estilos estritamente `.pf-eng-*` em `practice.css`, regressões em `e2e/practice.spec.ts` e registros em `docs/QUALITY_AUDIT.md`/neste documento. Arquivos e alterações anteriores de outros agentes foram preservados. Nenhum commit, publicação, alteração de currículo ou requisição a IA externa.

Validação final e limitações são registradas após a rodada de navegador abaixo; evidências anteriores da seção9 não substituem esta reconferência.

### Evidências finais deste recorte

- `npm run build` passou (inclui TypeScript); lint e isolamento do bundle passaram. Mantido o aviso preexistente de chunk acima500kB.
- `npm test -- --maxWorkers=2`:483 testes/49 arquivos passaram. Após os últimos ajustes de navegação/contador, os17 testes de Inglês foram reconferidos; resultado final registrado na rodada.
- `npm run test:ui -- --grep "english ux"`:4/4 passaram, incluindo a matriz de9 destinos ×5 larguras ×2 temas (90 combinações), fonte150%, reflow, axe, foco/viewport e preferência de movimento reduzido. Histórico/clique repetido por teclado, cópia com sucesso/falha, persistência de leitura e avaliação no card correto foram exercitados.
- Ajuste final restrito ao contador e abertura de diagnóstico ativo:2/2 passaram na reconferência focada, com fluxo completo de diagnóstico no celular e barra/questão em320/375/768/1024/1440 nos dois temas/fonte150%. São5 regressões distintas de navegador no conjunto das rodadas, sem afirmar uma única execução de5 testes.
- Inspeção visual das capturas375: clique do hero chega à questão, contador/barra alinhados, temas claro/escuro e fonte150%. Revisão independente confirmou documento320px em viewport320px e destino da questão visível, sem tocar perfil pessoal.

Evidências: `docs/quality/english-navigation/navigation-run.json`, `diagnostic-final-run.json` e capturas locais. Zoom real200%/400% não foi reconferido nesta correção; permanece a limitação de inicialização doChromium com extensão registrada emQUALITY_AUDIT. Fonte150%/viewport não foram chamados de browserzoom. Axe não certificaWCAG; nenhuma auditoria curricular/linguística foi feita por esta correção. Nenhuma ação do usuário foi enviada a serviços externos, nenhuma migração/limpeza de progresso foi necessária e nenhum commit foi criado.
