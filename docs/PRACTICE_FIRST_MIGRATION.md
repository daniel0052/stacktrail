> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# StackTrail 2.0 — piloto de orientação e prática

Data:17/10/2026. Branch `feat/practice-first-roadmap`. Somente01 foi migrada.

## Decisão e preservação

O novo produto organiza estudo externo, referências e prática. Não cria aulas,
resumos técnicos, tutoriais, simuladores de ensino ou respostas prontas. Descrições
curtas são objetivos; dicas são pistas. Não há execução de código do estudante,
chamada de IA, conta, banco ou serviço pago integrado.

A arquitetura anterior foi inspecionada antes da mudança. A branch partiu do HEAD
`3dea779`, com trabalho local da04 ainda sem commit. O histórico Git não foi reescrito;
os arquivos anteriores foram preservados. Snapshot local pré-migração:106arquivos
modificados/novos em `/tmp/stacktrail-before-practice-first/`, com manifesto/hash e
patch; é cópia temporária, não substitui backup durável ou commit. O README anterior
está em `docs/LEGACY_README.md`.

Reuso deliberado: tokens visuais, metadados20etapas e enunciados/IDs/aceitação dos
nove exercícios01. Não se reutilizou o ProgressProvider legado: ele importa conteúdos,
interpretador e projetos resolvidos. `src/main.tsx` agora importa apenas o novo
app/provider. `src/legacy-main.tsx` e `vite.legacy.config.ts` preservam execução antiga.
`dist/` usa `public-roadmap/`; não recebe ZIPs de `public/study/`. O empacotamento
anterior só roda por comando explícito. `dist-legacy/` é build separado, não publicação
nova. Nenhuma etapa além01 teve conteúdo migrado. Metadados00–19 são planejamento.

## Currículo e autoria

A página01 original foi consultada integralmente pelo MCP do Notion
(`3f63cadfab77812494d8d5a0312f1a7a`), sem filhos/paginação/truncamento pendentes
na resposta recebida. A auditoria `docs/auditoria-roadmap-backend.md` foi lida como
referência complementar: base frontend proporcional, frameworks opcionais, uma
trilha backend suficiente e projetos evolutivos. Não foram copiados exercícios,
diagramas ou textos do roadmap.sh. O Notion não foi editado.

**Derivado do currículo:** HTML/CSS/TS, DOM/eventos, async, HTTP/JSON/fetch/CORS,
FormData, URLs, DevTools, armazenamento/cookies e segurança do cliente; Tailwind,
React e Next opcionais; nove exercícios; três iniciais + ao menos um intermediário
integrado e demonstração das competências para avançar.

**Elaboração original autorizada:** dois desafios extras opcionais React/Next,
objetivos curtos, organização dos tópicos, prompts, metadados de curadoria e projeto
Central de Reservas Comunitárias — cliente web. Projeto é consolidação recomendada,
não nova obrigação retroativa. Mock externo por GUI permite praticar sem construir
backend. Futuro servidor poderá usar PHP/Laravel **ou** TS/Node/Express; Nest opcional.
SQL/ORM05 e Docker/CI/deploy08 não viraram pré-requisitos.

| Tópico | Objetivo/prática | Referências e recorte | Escopo |
| --- | --- | --- | --- |
| HTML/formulários | Contato acessível, teclado e feedback | MDN HTML/forms; WAI rótulos/validação | Base |
| CSS | Formulário e catálogo responsivos | Sintaxe, cascata, box model, unidades, estados, Flex/Grid | Base |
| Base JS em TS | Funções/condições/dados tipados; preparar ambiente | MDN funções/controle; TS instalação/tsc/strict/módulos; Pro Git local | Base |
| Tipos | Conferir dados externos e modelar domínio | Everyday Types/Narrowing/strict | Base |
| DOM/eventos | Interação e formulário | MDN DOM/FormData; WAI | Base |
| Async | Erros e atualização assíncrona | Using promises e Fetch EN | Base |
| Navegador/API | Busca, reserva e estados inspecionados | Fetch, URLSearchParams, encodeURIComponent, Chrome Network, CORS e mock | Base |
| Armazenamento/limites | Tarefas/favoritos, cookies, segredos e validação | Storage PT + local/session EN; cookies/CORS/Fetch | Base |
| Tailwind | Comparar interface com CSS puro | Tailwind4.3 Vite | Opcional |
| React | Reimplementar pequeno fluxo preservando critérios | React PT quickstart19.2 | Opcional |
| Next | Investigar fronteira de execução e evidências | App Router Server/Client Components EN | Opcional após React |

## Lacunas encontradas antes de corrigir

A revisão independente da curadoria encontrou traduções PT com problemas:
Promise confunde resolved/settled; Using promises tem garantia traduzida de forma
enganosa; Fetch contém afirmações antigas sobre credenciais; CORS atribui envio
pós-preflight ao servidor; Storage simplifica sessão/aba. Decisão: EN nos pontos
críticos; Storage PT apenas introdutório com referências específicas EN. A candidata
Microsoft Learn redirecionava para homepage TypeScript e foi rejeitada como cursoPT.
URLs inacessíveis nesta ferramenta não foram tratadas como inexistentes.

A revisão pedagógica encontrou fontes faltantes para CSS além de Flex/Grid,
preparação/compilação/módulos TS, FormData/URLs/DevTools/cookies e configuração do
mock, mais ponte Git e rubrica genérica. Corrigido: fontes específicas consultadas,
recortes e referências por atividade; mock local configurável sem programar backend;
rubrica distingue aplicabilidade/evidência; entregáveis também visíveis nos exercícios.
Pré-requisitos dos tópicos mostram a capacidade esperada, além do nome.

UI: skiplink conflitou com HashRouter; exportação poderia escolher dados antigos
após falha de quota; acesso bloqueado ao storage e ausência do clipboard não tinham
fallback; heróis transbordavam em320px/fonte150%. Corrigidos e testados esses fluxos.
Dois erros de seletores da própria suíte foram corrigidos antes da rodada completa.

## Referências, idiomas e livros

38referências gratuitas específicas e dois livros comerciais opcionais. Fontes
consultadas em17/10/2026 pelo root e/ou revisor independente, conferindo corpo e
recorte, não só URL. Catálogo tipado registra idioma real, custo do recurso indicado,
tipo, versão/ressalva, data de acesso e adequação. Índices não garantem cada filho.
A tabela detalhada está abaixo e os resultados GET em `REFERENCE_LINK_CHECK.json`:
40/40 páginas responderam200 na execução registrada; destinos finais ficaram nas
URLs canônicas selecionadas. Esse checker não verifica a qualidade dos conteúdos.

Livros Novatec: **Aprendendo TypeScript**, Josh Goldberg,2022, sem número de edição
confirmado; **Lógica de Programação e Algoritmos com JavaScript**, Edécio Fernando
Iepsen,2ªedição,2022. Catálogos brasileiros e sumários consultados; não se presumiu
leitura integral, nem se inventaram ISBNs/edições/preços. Materiais de2022 exigem
comparação com docs atuais. O segundo livro tem capítulos posteriores de backend,
fora do recorte01. Alternativas gratuitas estão em cada card. Nenhuma compra é gate.

Limites de versão: repo TS5.9.3, Handbook corrente já menciona6.0; React consultado
19.2, não prova cobertura exata do instalado19.3; Tailwind4.3; Next App Router sem
número exato confirmado no corpo; Mockoon latest sem versão local executada.
Chrome oferece tradução automática PT identificada. Não foram instalados mocks,
executados projetos do estudante ou auditados todos os exemplos das fontes.

## Progresso e backup

Chave do piloto `stacktrail:roadmap:1`; chave antiga `backend-academy:progress`
permanece intacta. São importados somente registros válidos ex01–09 com critérios
inalterados; status concluído requer tentativa e checklist correspondente. Flags
sem apoio são rebaixadas. Versões antigas reconhecidas1–8; qualquer campo não
mapeado/registro inválido permanece no arquivo bruto legado. Leituras não se tornam
estudo. Notebook legado fica no arquivo original/exportação, sem nova UI específica.

Alterar a tentativa limpa checklist, conclusão e evidência de revisão atual. Não
existe nota/certificado. Backup inclui schema do piloto e arquivo legado; importação
valida tudo antes de substituir somente piloto. Arquivos acima32MB são rejeitados.
Erro de salvamento permite exportar estado atual em memória; erro de leitura protege
o registro original de sobrescrita. Nenhum registro é enviado a servidor.

## Verificação e estado das fases

- [x] Arquitetura, AGENTS, currículo01, auditoria e trabalho existente inspecionados.
- [x] Branch solicitada criada e legado preservado separadamente.
- [x] Três skills atualizadas com skill-creator; quick_validate passou nas três.
- [x] Tópicos, fontes, livros, onze desafios, projeto sem solução e progresso implementados.
- [x] Revisão independente pedagógica/técnica e lacunas apresentadas antes de corrigir.
- [x] Typecheck, lint, testes unitários e builds principal/legado executados.
- [x] Navegação, reflow, prompts, persistência, importação e falhas conferidos no navegador.
- [x] GET das40fontes e conferência de isolamento do build principal executados.
- [ ] Revisão humana externa com estudantes e uso de tecnologias assistivas reais.
- [ ] Migração das outras19etapas: não iniciada neste pedido.

Comandos e resultados finais estão reconciliados abaixo, em CONTENT_VERIFICATION e QUALITY_AUDIT.
Testes iniciais:407 em40arquivos passaram; primeira rodada de navegador4/7 passou,
com overflow e dois erros na suíte. Após correções,7/7 passou (duas varreduras de
48rotas,50combinações de layout, jornadas e falhas). Testes do site não provam que
um estudante aprendeu nem que seu código está correto. Axe não certifica WCAG.
Zoom de navegador real200/400%, leitores de tela, Safari/Firefox, ambientes de mock,
deploy e serviços externos não estão comprovados por esta rodada.

## Plano incremental das próximas migrações

1. **Consolidar o piloto:** colher feedback real de navegação/curadoria/carga, atualizar
   fontes por recorte e manter regressões de compatibilidade. Não acrescentar aulas.
2. **00:** curar fontes de pensamento computacional e redesenhar desafios sem gabarito;
   decidir explicitamente o destino do editor antes de reaproveitá-lo no modelo novo.
3. **02:** referências e prática externa de HTTP/redes/Git/terminal; substituir finalidade
   didática dos simuladores por evidências externas, com ambiente gratuito acessível.
4. **03/04:** migrar duas alternativas suficientes, projetos autorais sem arquivos resolvidos;
   manter progressão linguagem/runtime → API → contratos/regras, sem banco obrigatório.
5. **05–09, sob autorização por etapa:** SQL/PostgreSQL/ORM05, testes06, segurança07,
   Docker/CI/deploy08 e release Júnior09. Evoluir o domínio de reservas com evidências
   proporcionais; preparar equivalência JS sem exigir Laravel junto.
6. **10–19:** referências e desafios Pleno/Sênior mediante demanda, sem antecipar sistemas
   distribuídos ou eletivos por popularidade. Corrigir ambiguidades da auditoria antes
   de publicar obrigações. Uma ferramenta por necessidade, não lista universal.

Em cada migração: ler fonte original, inventariar correspondências, curar fontes reais,
revisar desafios/projeto independentemente, conferir interface real e progresso,
registrar o que foi testado e pedir autorização antes de avançar ao próximo recorte.
Não houve commit, push, deploy nem edição do Notion nesta tarefa.

## Registro das fontes selecionadas

Data de acesso/adequação:17/10/2026. “Verificada no recorte” significa fonte aberta
com conteúdo pertinente identificado; não aprovação integral de cada exemplo da página.

| ID / fonte | Idioma | Recorte consultado | Versão / limite |
| --- | --- | --- | --- |
| css-base · [MDN · Primeiros passos com CSS](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics) | PT-BR | Sintaxe e seletores; índice de estudo | Índice vivo — Verificado o índice; links filhos e exemplos de ferramentas antigas não foram todos validados. |
| cascade · [MDN · Cascata, especificidade e herança](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts) | PT-BR | Prioridade e herança das regras | Documentação viva |
| box · [MDN · Modelo de caixas](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Box_model) | PT-BR | Dimensões, padding, borda e margem | Tradução com títulos em inglês |
| units · [MDN · CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units) | Inglês | Unidades e valores CSS | Documentação viva — Página PT candidata inacessível na consulta; alternativa EN confirmada. |
| states · [MDN · Pseudo-classes](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Reference/Selectors/Pseudo-classes) | PT-BR | Estados de interação: foco, hover e checked | Recorte introdutório — Índice traduzido pode omitir seletores mais recentes; data de modificação exibida é inconsistente, não usada como prova de atualidade. |
| setup · [TypeScript · Preparar ambiente](https://www.typescriptlang.org/download/) | Inglês | Instalação por projeto e compilador | Documentação corrente — Usar versão compatível com o projeto e registrar no README. |
| compiler · [TypeScript · The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) | Inglês | tsc, emissão e strict | Handbook corrente |
| modules · [TypeScript · Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) | Inglês | import/export e configuração do ambiente | Handbook corrente — Selecionar o uso no navegador; não exige Node backend. |
| formdata · [MDN · Using FormData Objects](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) | Inglês | Construção e envio de FormData | Web APIs atuais — Alternativa EN após falha de acesso à candidata PT. Comparar o contrato do formulário com JSON na referência Fetch. |
| query · [MDN · URLSearchParams](https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams) | PT-BR | Métodos, parâmetros repetidos e serialização | Documentação viva |
| encode · [MDN · encodeURIComponent](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) | PT-BR | Codificação de componente de URI | Documentação viva |
| network · [Chrome DevTools · Inspecionar rede](https://developer.chrome.com/docs/devtools/network?hl=pt-br) | PT-BR | Headers, status, payload, respostas e falhas | Chrome DevTools corrente — Conteúdo em português com tradução automática indicada pelo site. Rótulos e interface dependem da versão e do idioma do navegador. |
| cookies · [MDN · Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) | Inglês | Atributos e restrições de segurança | HTTP / navegadores atuais — Recorte introdutório de segurança do cliente; implementação de autenticação pertence às etapas posteriores. |
| git-setup · [Pro Git — preparação](https://git-scm.com/book/pt-br/v2) | PT-BR | Seções1.5,1.6,2.1: instalação, identidade e repositório | 2ªedição online, Scott Chacon/Ben Straub; recorte consultado, livro integral não lido |
| git · [Pro Git · Gravando alterações](https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Gravando-Altera%C3%A7%C3%B5es-no-Reposit%C3%B3rio) | PT-BR | status, staging e commit local | 2ª edição online — Ponte mínima para registrar o trabalho; branches e colaboração aprofundam na02. |
| mock · [Mockoon · Rotas HTTP](https://mockoon.com/docs/latest/api-endpoints/http-routes/) | Inglês | Configuração de método, caminho, status e resposta | Documentação latest; conferir versão local — Documentação gratuita. Ferramenta externa de mock local; não exige implementar um backend. Rotas HTTP simples não compartilham alterações. |
| mock-responses · [Mockoon · Múltiplas respostas](https://mockoon.com/docs/latest/route-responses/multiple-responses/) | Inglês | Alternar sucesso, conflito e falha | Documentação latest — Pode alternar respostas manualmente para testar estados; não equivale a regra real de concorrência. |
| mock-crud · [Mockoon · Rotas CRUD](https://mockoon.com/docs/latest/api-endpoints/crud-routes/) | Inglês | Coleção de estudo para GET, POST, PATCH e DELETE | Documentação latest — Opção para exercícios que exigem recuperar alterações. Não é banco nem API de produção. |
| html · [MDN · HTML básico](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax) | PT-BR | Estrutura e sintaxe HTML | Documentação viva |
| forms · [MDN · Formulários web](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms) | PT-BR | Índice de estrutura, controles e validação | Índice vivo — Verificado o índice; idioma e atualidade dos artigos filhos podem variar. |
| wai · [W3C WAI · Formulários acessíveis](https://www.w3.org/WAI/tutorials/forms/) | Inglês | Rótulos, instruções, validação e notificações | Atualizado em março de 2026 — Complemento em inglês para acessibilidade. |
| flex · [MDN · Conceitos de Flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts) | PT-BR | Eixos, quebra e alinhamento | Documentação viva |
| grid · [MDN · Conceitos de Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Grid_layout/Basic_concepts) | PT-BR | Trilhas, linhas, células e áreas | Documentação viva |
| functions · [MDN · Funções](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions) | PT-BR | Declaração, parâmetros e retorno | JavaScript; adaptar a tipagem em TypeScript — Apoio para a base JavaScript pressuposta pelo Handbook; não é um curso de TypeScript. |
| control · [MDN · Controle de fluxo e erros](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) | PT-BR | Condicionais e tratamento de exceções | JavaScript; adaptar a tipagem em TypeScript |
| ts · [TypeScript · Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) | Inglês | Arrays, objetos, funções, uniões e anotações | Handbook corrente; navegação já inclui TS 6.0 — Projeto usa TypeScript 5.9.3. Tradução PT candidata não pôde ser confirmada; não exigimos recursos exclusivos da versão mais recente. |
| narrow · [TypeScript · Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | Inglês | Guardas e refinamento de tipos | Handbook corrente; conferir compilador instalado — Fonte específica em inglês; complementar a base de tipos. |
| strict · [TypeScript · strict](https://www.typescriptlang.org/tsconfig/strict.html) | Inglês | Opção strict e condições de versão | TSConfig corrente — O conjunto de verificações pode evoluir entre versões. |
| dom · [MDN · DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model) | PT-BR | Introdução e interfaces de documentos | Web APIs atuais — Selecionar o recorte introdutório, sem percorrer todas as interfaces. |
| promise · [MDN · Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) | Inglês | Encadeamento e propagação de erros | JavaScript atual — Traduções PT examinadas têm trechos enganosos; preferida a fonte em inglês para este recorte. |
| fetch · [MDN · Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | Inglês | Resposta, status, JSON, erros e credenciais | Web APIs atuais — Tradução PT consultada contém afirmações antigas sobre credenciais. Fonte EN selecionada por adequação técnica. |
| cors · [MDN · CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) | Inglês | Preflight e requisições com credenciais | HTTP / navegadores atuais — Tradução PT contém atribuição incorreta de quem envia a requisição após preflight; preferida a EN. |
| storage · [MDN · Web Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API) | PT-BR | APIs de armazenamento por chave | Web APIs atuais — Leitura introdutória; limites de sessão e particionamento devem ser consultados nas referências EN específicas. |
| local · [MDN · localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Inglês | Persistência, origem e exceções | Web APIs atuais |
| session · [MDN · sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | Inglês | Origem, aba, recarga e restauração | Web APIs atuais |
| tailwind · [Tailwind · Instalação com Vite](https://tailwindcss.com/docs/installation/using-vite) | Inglês | Integração com Vite | Tailwind 4.3 — Opcional após CSS. Não combinar instruções de instalação da versão 3. |
| react · [React · Início rápido](https://pt-br.react.dev/learn) | PT-BR | Componentes, eventos e estado | Documentação observada: React 19.2 — Opcional; não é promessa de cobertura exata do React 19.3 instalado. |
| next · [Next.js · Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Inglês | Fronteira servidor/cliente no App Router | App Router; número exato não identificado no corpo — Opcional após React. Verificar versão do projeto antes de aplicar. |

Compatibilidade conservadora: checklists/conclusões só são transportados para o piloto
no snapshot legado v8 inventariado. Versões1–7 preservam rascunhos e reflexão, mas
requerem reconferir os critérios atuais; registros originais ficam intactos no arquivo legado.

Ponte Git inicial: [Pro GitPT](https://git-scm.com/book/pt-br/v2), Scott Chacon e
Ben Straub,2ªedição online gratuita. Consultados capítulos1.5(instalação),
1.6(identidade),2.1(repositório) e2.2(commits). Não foi lido o livro inteiro.
O índice é usado para reunir esses recortes, sem exigir o restante na01.

Reconferência técnica final tornou explícito: status de rotasCRUD do Mockoon são
automáticos;409 manual pertence ao cenárioHTTP configurável/sobrescrita separado.
A ponteGit cobre preparação antes dos primeiros commits. Nenhum mock foi executado.
A revisão pedagógica reconferiu as lacunas altas: não demonstrou bloqueante remanescente
no recorte; rubrica3/4 em fidelidade, progressão, desafios, avaliação e honestidade.
Fontes foram reconferidas separadamente. Suspeita de quebras de linha no prompt
não se confirmou: ensaio real >30linhas e ausência de barra+n literal passaram.
Notebook legado permanece recuperável manualmente no arquivo bruto.

Os rascunhos separados do editor/práticas antigas (`stacktrail:practice:1:...`)
não são apagados, mas não entram no backup global novo, assim como não integravam
exportação global antiga. Acesso depende da origem antiga; preserve esse navegador
ou recupere pelo legado. Não prometemos sincronização entre portas/dispositivos.

## Resultado final executado

| Verificação | Resultado observado |
| --- | --- |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou após corrigir globals dos checkers e escape redundante em teste. |
| `npm test -- --maxWorkers=2` |407testes em40arquivos passaram, incluindo regressões novas e legadas. |
| `npm run build` | Passou; JS344,51kB/CSS61,44kB minificados nesta rodada. |
| `npm run build:legacy` | Passou; aviso de chunk825kB no legado, separado do piloto. |
| `npm run test:ui` |9/9passaram no build final;96visitas comaxe e50combinações dedicadas de reflow. |
| Smoke do legado: `npm run test:ui:legacy -- shared.spec.ts --grep 'shared dark /$'` |1/1passou: entrada antiga funciona, comaxe/reflow nesse recorte. Não é nova varredura integral do legado. |
| `node scripts/check-practice-links.mjs` |40/40páginas HTTP200, destinos/idiomas declarados pelo HTML registrados; adequação revisada separadamente. |
| `node scripts/check-practice-build.mjs` |5arquivos publicados, semZIP/MDX/pacote study/entrylegado; sentinelas adicionais passaram. |
| Skills `quick_validate.py` | As três passaram; formato não certifica qualidade pedagógica ou acessibilidade. |
| `git diff --check` | Passou; sem commit/push/deploy. |

A revisão visual independente inspecionou mobile375×850, modal e desktop1440×1000;
foco inicial e retorno porEsc observados. Encontrou rótulos próximos dos selects:
a regra genérica do legado sobrepunha display dos campos. EscopoCSS corrigido;
a primeira reconferência9casos ficou8/9 porque o grid expôs largura intrínseca dos
selects em320/375px/fonte150%. Colunas minmax(0,1fr) e min-width0 resolveram a causa,
sem esconder overflow. A rodada seguinte9/9passou; geometria de rótulo/controle/ajuda
foi verificada em teste próprio e capturada. Não se somaram falhas como sucessos.

Artefatos das duas suítes foram isolados: `test-results-practice/` e
`playwright-report-practice/` pertencem ao piloto. Capturas viewport adicionais foram
recolhidas após o smoke legado para inspeção legível, mantendo o relatório completo9/9.

Reconferência independente das duas correções técnicas finais concluída por leitura:
preparaçãoGit e distinçãoMockoonHTTP/CRUD não contradizem as fontes consultadas.
Pendências anteriores desses recortes resolvidas, sem afirmar execução do mock.
A coleta adicional de capturas passou2/2; os artefatos foram inspecionados, incluindo
320px/fonte150% e filtros1440px. A interface mantém quebra de texto em ampliação
máxima; não se prometeu identidade visual pixel a pixel em todos os tamanhos.
