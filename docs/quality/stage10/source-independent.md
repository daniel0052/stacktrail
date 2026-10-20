# Etapa 10 — consulta técnica independente

Consulta em 19/10/2026, por abertura de páginas com `web.run`, incluindo seções indicadas abaixo. Revisão somente de fontes e contratos; não foram executados projetos de estudantes nem lidos livros integrais. Currículo original lido no anexo `13b4f4d3-16a6-476e-8fe1-19223902d8b3/Pasted text.txt`. O currículo autoriza esta migração; não é evidência técnica.

## Lacunas apresentadas antes de correções

1. **MDN Fetch em português — parcialmente correta/histórica.** A introdução ainda contém afirmações problemáticas sobre cookies cross-site e credenciais. Não usar como autoridade essencial para autenticação/cancelamento. Preferir a edição inglesa atual, que distingue credenciais, SameSite, CORS, respostas HTTP e abortamento.
2. **Next.js — dependente de versão/configuração.** A URL antiga de caching redireciona para documentação de Cache Components. Não repetir regras antigas universais de cache de `fetch` ou confundir Server Component com SSR a cada requisição. Registrar versão e configuração do laboratório, e observar build/requisições.
3. **Sanctum — dependente de contexto.** O modo SPA first-party pressupõe SPA/API sob mesmo domínio raiz, embora possam estar em subdomínios e origens diferentes. `Fetch` não reproduz automaticamente o comportamento de Axios para o cabeçalho XSRF. Uma SPA arbitrária no GitHub Pages com API em domínio independente não satisfaz esse cenário por simples configuração CORS.
4. **Express — dependente de ambiente.** `MemoryStore` não é armazenamento de produção. Cookies de sessão, CORS e proteção CSRF precisam de políticas explícitas; esconder botões não autoriza operações no servidor.
5. **Capas — não verificada a licença de reprodução.** Os catálogos confirmam identificação bibliográfica, mas não autorização para redistribuir imagens. Usar fallback neutro, sem hotlink; não baixar capas com base apenas em URL pública.

Esses achados foram enviados ao implementador antes de alterações/reconferência. Estado: orientação técnica disponível; revisão do conteúdo implementado ainda pendente.

## Registro de fontes abertas e recortes

Todos os documentos desta tabela são gratuitos para consulta pública. Isso não inclui eventual hospedagem, compra de livros ou produtos associados. Documentação contínua sem número fixo não constitui versão imutável. URLs finais iguais às originais, exceto redirecionamentos explicitados.

| ID sugerido | Fonte / URL | Seção efetivamente conferida | Idioma real / versão | Adequação e limites |
| --- | --- | --- | --- | --- |
| 10-react-ts | [Utilizando TypeScript](https://pt-br.react.dev/learn/typescript) | Componentes, props, hooks e tipos | PT-BR, trechos EN; cabeçalho React v19.2 | React com TSX e tipos de eventos; não substitui validação de JSON externo. |
| 10-react-effects | [Talvez você não precise de um Effect](https://pt-br.react.dev/learn/you-might-not-need-an-effect) | Como remover Effects desnecessários; cache de cálculos | PT-BR parcialmente EN; v19.2 | Transformações derivadas durante renderização, eventos em handlers; medir antes de otimizar. Não recomendar efeito para filtragem simples. |
| 10-react-sync | [useEffect](https://pt-br.react.dev/reference/react/useEffect) | Buscar dados com Effects / limpeza | PT-BR parcialmente EN; v19.2 | Sincronização externa e corrida entre respostas; limpeza evita atualização obsoleta. Abortamento de transporte e proteção de estado são questões relacionadas, não garantia de rollback no servidor. |
| 10-ts-boundary | [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) | Type Assertions | EN, handbook contínuo | `as` não verifica dados em execução. Contratos precisam rejeitar JSON incompatível antes de tratá-lo como DTO. |
| 10-vite | [Getting Started](https://vite.dev/guide/) | Scaffolding / Compatibility Note | EN, guia atual | Template `react-ts`; Node 20.19+ ou 22.12+ com possível exigência maior por template. Fixar runtime suportado/lockfile, não exigir versão antiga por memória. |
| 10-vite-env | [Env Variables and Modes](https://vite.dev/guide/env-and-mode.html) | Env Variables / Protecting secrets | EN, guia atual | `VITE_*` entra no cliente; URL pública da API é configuração, senha/chave privada não. |
| 10-vite-deploy | [Deploying a Static Site](https://vite.dev/guide/static-deploy.html) | Build/local preview / GitHub Pages | EN, guia atual | Artefatos estáticos e `base` sob subdiretório; API/sessão continuam em servidor separado. Preview não é servidor de produção. |
| 10-router | [Routing — Declarative Mode](https://reactrouter.com/start/declarative/routing) | Routes, nested routes, dynamic segments | EN, documentação atual com modos separados | Componentes de rota SPA; não confundir APIs Declarative/Data/Framework. BrowserRouter requer fallback adequado no host; HashRouter é alternativa em hospedagem estática restrita. |
| 10-fetch | [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | Sending credentials; Canceling a request; Checking response status | EN, documento contínuo | HTTP 404/500 não rejeitam automaticamente; `response.ok`; AbortController/AbortError; `credentials: include` não supera SameSite ou políticas do navegador. CORS com credenciais exige origem explícita. |
| 10-cors | [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS) | Requisições com credenciais / preflight | PT-BR, trechos EN | Origin inclui esquema/host/porta; CORS controla leitura pelo navegador e não substitui autenticação, autorização ou CSRF. Não recomendar `no-cors` como solução de integração. |
| 10-sanctum | [Sanctum SPA Authentication](https://laravel.com/framework/docs/13.x/sanctum) | SPA Authentication; Configuration; CSRF Protection; Logging In | EN, Laravel 13.x | Original `https://laravel.com/docs/13.x/sanctum` redireciona à URL final. Sessão/cookies, domínio raiz comum, domínios stateful com porta local, credentials/CORS e XSRF; 401/419 exigem tratamento de expiração. Não armazenar bearer token por padrão nesse cenário. |
| 10-session | [express-session](https://expressjs.com/en/resources/middleware/session/) | session(options); cookie; MemoryStore | EN, middleware atual | Original termina `.html`, redireciona à URL final. Cookie contém ID, dados ficam no servidor. HttpOnly/Secure/SameSite, proxy confiável conforme implantação; store adequado ao ambiente. |
| 10-csrf | [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) | Token-based mitigation; SameSite; defense in depth | EN, contínuo | Validação CSRF em operações autenticadas por cookie; SameSite é defesa adicional, XSS pode comprometer proteção. Não chamar cookie HttpOnly de proteção completa contra XSS. |
| 10-next-boundary | [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | When to use; reducing JS; passing data | EN, App Router atual | Layout/page server por padrão; interatividade/browser APIs exigem fronteira cliente, props serializáveis. Client Components podem receber HTML inicial; `use client` não significa ausência de pré-renderização. |
| 10-next-cache | [Caching](https://nextjs.org/docs/app/getting-started/caching) | Enabling Cache Components; Usage | EN, modelo atual | Original `/getting-started/caching-and-revalidating` redireciona. Página condicionada a `cacheComponents: true`; diferencia modelo anterior e flags. Não generalizar defaults nem acrescentar esse aprofundamento como requisito do módulo introdutório. |
| 10-next-static | [Static exports](https://nextjs.org/docs/app/guides/static-exports) | Browser APIs; Unsupported Features; Deploying; Version History | EN, atualizado 09/08/2026 na página | `output: 'export'`; artefatos `out`. Sem cookies/Server Actions/ISR e recursos dependentes de request no servidor; estático pode buscar API no navegador. Não prometer SSR dinâmico no Pages. |
| 10-testing | [About Queries](https://testing-library.com/docs/queries/about/) | Types of Queries; Priority | EN, docs contínuas | Papel/nome e labels; queries assíncronas para mudança observável. Testar comportamento, não detalhes internos; teste de componente não comprova integração real com API. |
| 10-wcag | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Keyboard, Focus Visible, Reflow, Contrast, Labels, Error Identification, Status Messages | EN, recomendação W3C 2.2 | Referência normativa AA; axe e testes isolados não certificam conformidade. Teclado, foco, feedback e leitura precisam de avaliação pertinente. |
| 10-performance | [Web Vitals](https://web.dev/articles/vitals) | Core Web Vitals; measurement | EN, documento contínuo | LCP/INP/CLS; distinguir ensaio local e dados de campo. Não substituir INP por FID nem prometer desempenho por memoização sem medição. Não adicionar telemetria à plataforma por implicação. |

MDN PT-BR Fetch consultada como contraexemplo: [Usando Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch), introdução, linhas 177–180 na representação consultada. Conteúdo histórico não recomendado como referência essencial da etapa.

## Livros opcionais: catálogo e direitos

Catálogos públicos, obras pagas; valores/estoque podem mudar e não são pré-requisito. Consulta do catálogo/sumário não é leitura integral. Não se confirmou licença de reutilização de capas em nenhum destes casos; manter fallback neutro local/tipográfico. Não inferir edição quando o catálogo não a informa.

| Obra | Metadados confirmados | Recorte / limite | Alternativa gratuita |
| --- | --- | --- | --- |
| [Aprendendo TypeScript](https://novatec.com.br/livros/aprendendo-typescript/) | Josh Goldberg; Novatec; português; 2022; ISBN impresso 9786586057997; ebook 9788575228302; número de edição não declarado no catálogo consultado | Tipos, narrowing, funções e configuração; publicação anterior às ferramentas atuais, usar docs para versões. Impresso/ebook listados. | Handbook TypeScript e React com TypeScript. |
| [React Fluente](https://novatec.com.br/livros/react-fluente/) | Tejas Kumar; Novatec; português; 2024; ISBN impresso 9788575229095; ebook 9788575229101; número de edição não declarado | JSX, reconciliação, padrões e desempenho; aprofundamento opcional, não exigir internals avançados. Catálogo lista impresso/ebook. | React Learn e referência atual. |
| [Inclusive Components](https://www.smashingmagazine.com/printed-books/inclusive-components/) | Heydon Pickering; Smashing; inglês; dezembro de 2019; ISBN 9783945749821; número de edição não declarado | Componentes inclusivos; não substitui WCAG 2.2 posterior. Página indicava impresso esgotado e ebook disponível na consulta. | WCAG 2.2, documentação de queries semânticas. |

## Contraprovas para conferir na implementação

- Busca A lenta e B rápida: B permanece visível após A; abortamento esperado não deve produzir alerta de falha para o usuário.
- Resposta 200 com JSON incompatível não vira lista válida por `as Product[]`; 204 e erro HTML também têm tratamento explícito.
- Alterar filtro na página final redefine a paginação conforme contrato, sem resultados antigos aparentarem pertencer ao filtro novo.
- Cliente A solicita recurso de B diretamente por HTTP: autorização no servidor continua exigida mesmo com rota/botão oculto.
- Pedido com cookie sem proteção CSRF apropriada ao cenário é recusado; `credentials: include` com origem `*` não é correção válida.
- Logout/expiração limpa dados privados visíveis e evita renderizar resposta tardia da sessão anterior.
- Next Server/Client e CSR/SSR/SSG são eixos distintos; build estático não comprova atendimento por servidor a cada request.
- Projeto principal React não deve exigir Next ou duas APIs; ambas as trilhas oferecem o mesmo contrato frontend com adaptações da autenticação.

Não foi executado código de estudante, instalação de futuro laboratório, deploy nem auditoria do conteúdo ainda não criado. Prontidão depende de reconferência dos arquivos, testes e revisão UI/UX do implementador.

## Reconferência do primeiro catálogo implementado

Leitura integral de `src/practice/stage-ten.ts` em 19/10/2026: nove módulos, dois tópicos específicos de backend, 18 exercícios e um projeto. Foram consultadas também as dez URLs efetivas abaixo que diferem ou ampliam o primeiro registro. Todas gratuitas; consulta de conteúdo com `web.run`, sem execução de exemplos. A classificação abaixo não equivale a aprovação dos futuros ambientes gerados.

| ID efetivo | URL / título | Seções conferidas / idioma / versão | Julgamento |
| --- | --- | --- | --- |
| 10-react-state | [Gerenciando o Estado](https://pt-br.react.dev/learn/managing-state) | Estrutura, compartilhamento, preservação, contexto; PT-BR com exemplos/trechos EN, v19.2 | Verificada: fonte única, evitar duplicação, elevar estado e Context introdutório. |
| 10-ts | [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | Guards, união discriminada e exaustividade; EN, handbook contínuo | Verificada para modelar estados e verificar valores externos; não confundir predicado incorreto com validação efetiva. |
| 10-forms | [input](https://react.dev/reference/react-dom/components/input) | Providing a label; controlling an input; pitfalls; EN, React atual | Verificada: label, value/onChange e valores controlados coerentes. Não substitui validação backend. |
| 10-cors | [CORS EN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) | Credentialed requests / preflight / wildcard restrictions; EN, contínua | Verificada; esta é a URL efetivamente usada no catálogo. Teste HTTP fora do navegador não prova aplicação CORS. |
| 10-xss | [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) | Framework Security; Output Encoding; HTML Sanitization; EN, contínua | Verificada: escape hatch React e HTML bruto exigem cuidado, escaping não cobre todo contexto. |
| 10-next | [Next Installation](https://nextjs.org/docs/app/getting-started/installation) | System requirements / CLI / manual installation; EN, App Router corrente | Verificada: mínimo Node20.9 na página; templates/configurações podem mudar. Registrar lockfile, versão e flags, sem importar defaults antigos. |
| 10-testing | [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/) | The problem / solution / guiding principle; EN, contínua | Verificada: comportamento observável e interações próximas do uso real. Queries específicas têm fonte complementar no registro anterior. |
| 10-msw | [Quick start](https://mswjs.io/docs/quick-start) | Installation, request handlers, process/tool integration; EN, atualizado30/09/2026 | Original `/docs/getting-started` redireciona. Mock de rede em Node/Vitest; separar `setupServer` de `setupWorker`, resetar handlers. Não certifica API real. |
| 10-a11y | [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) | Labels, grouping, instructions, validation, notifications; EN | Verificada para estados/erros de formulários; complementa norma WCAG e ensaio manual. |
| 10-profiler | [Profiler](https://react.dev/reference/react/Profiler) | Caveats, onRender, Measuring rendering performance; EN, React atual | Dependente do build: profiling acrescenta custo e está desabilitado na produção padrão; requer build especial para produção. Comparação precisa declarar condições. |

### Achados comunicados antes das correções

- **Bloqueante de contrato / incorreta:** `10-ex-10` conserva `category=papelaria`, mas prevê P4/livros após mudar somente `q` para livro. Filtros combinados exigem vazio nessa situação; alternativa é declarar limpeza da categoria antes da busca. Estado: pendente de reconferência.
- **Clareza de validação / parcialmente especificada:** `10-ex-09` lista campos do DTO sem todos os tipos/faixas. Fixar strings e inteiros/faixas, total não negativo e tratamento de propriedades extras torna a aceitação verificável. Estado: pendente.
- **Laboratório / parcialmente especificado:** `10-ex-14` descreve falha genérica de navegador. Fixar roteiro/chamada e sintoma de rede observável, sem entregar a configuração causadora ou patch, melhora reprodutibilidade. Estado: pendente.
- **Segurança / melhoria requerida:** logout/401 precisa invalidar respostas pendentes da sessão anterior; caso contrário dados privados podem reaparecer após limpeza/troca de identidade. Estado: pendente.
- **Desempenho / dependente de build:** `10-ex-18` deve admitir profiling em desenvolvimento identificado ou produção com profiling habilitado; callback `<Profiler>` não é medida disponível por padrão no build de produção comum. Estado: pendente.

Não foram identificadas soluções completas embutidas nos enunciados/dicas consultados. Contextos, status HTTP e regras como reset de página/409 são contratos autorais pertinentes, não padrões universais impostos pelas bibliotecas. O projeto mantém uma API, React/TS obrigatório, Next opcional, servidor autoritativo, mock separado de integração real e alternativa de deploy local controlado. A compatibilidade Sanctum/domínio e host Next ainda depende de como `[security10]` e `[backend10]` serão resolvidos.

### Reconferência após correções — 19/10/2026

Arquivos relidos: `stage-ten.ts`, trecho `activityForTrack` de `curriculum.ts`, inventário10 e `starterEnvironment` de `preparation.ts`, `preparation-prompt.ts` e `prompts.ts`. Os estados anteriores acima são histórico dos achados, substituídos pelas conclusões desta seção.

| Achado | Evidência de correção | Estado |
| --- | --- | --- |
| Filtro combinado contraditório | Caso10-ex-10 agora remove category antes de mudar q para livro; P4 torna-se resultado coerente. | Validado por inspeção do contrato. |
| DTO incompleto | 10-ex-09 fixa strings não vazias, priceCents inteiro não negativo, page≥1, pageSize1–50,total≥0; campos extras ignorados sem autoridade/renderização. | Validado por inspeção. |
| LaboratórioCORS genérico | 10-ex-14 e inventárioB especificam POST/api/login direto200 e perfilbrowser-fail com rejeição Fetch/consoleCORS, configuração realmente defeituosa, duas origens fixas e origem negativa; proíbem Promise.reject artificial e exposição da causa. | Contrato validado; futuro código gerado permanece não executado/não validado. |
| Resposta antiga apóslogout | 10-ex-13, integrador e prompts10 exigem invalidação de respostas pendentes da identidade anterior apóslogout/401. | Requisito corrigido; implementação do estudante não presumida. |
| Profilerprodução | 10-ex-18 e preparação admitem dev identificado ou profilingbuild explícito, sem exigir callback no buildprodução padrão. | Validado contra caveat oficial. |
| URLs correntes | Cache aponta `/getting-started/caching`; MSW aponta `/docs/quick-start`. | Corrigido; páginas finais já abertas nesta consulta. |

O resolver preserva índices dos critérios e substitui `[backend10]`/`[security10]` nos requisitos, competências e critérios; mantém uma API, filtra fonte da outra stack e explicita domínio raiz/CSRF/credenciais no Laravel ou cookieID/store/CSRF no Express. Prompts gerais distinguem Pages/API em domínios arbitrários e SSR em host estático; não sugerem desligar CORS/CSRF. O tokenXSRF com Fetch é documentado no catálogo de referência, incluindo decodificação; não se presume comportamento automático de Axios.

InventárioA/B/C10 evita backend onde análise/estado local basta, oferece alternativa à API própria e preserva o trabalho do estudante. O integradorC fornece API/PostgreSQL funcional anterior à UI, sem painel, formulário, integração ou suíteUI prontos. Preparação Next é uma experiência separada, não exige PHP ou migração da aplicação; comandos de build/runtime/export devem ser compatíveis com a versão declarada. As regras comuns proíbem diagnóstico, patch, arquivo/linha revelados, regressão-alvo pronta e resultados de execução fictícios.

Os três livros agora estão no catálogo com autores/anos/ISBNs confirmados, edição não inferida, caráter pago/opcional, alternativas gratuitas e placeholders neutros. Não foram baixadas capas nesta revisão porque a permissão de reprodução permanece não demonstrada.

**Resultado factual consultivo:** nenhum bloqueante conceitual remanescente identificado nos arquivos inspecionados. Esta conclusão é de conteúdo/contratos e não substitui typecheck, lint, testes de persistência/isolamento, auditoria UI/UX nem validação local de futura base gerada. Não foi executado código de estudante ou deploy.

### Adendo do implementador — pedido posterior de capas reais

Após a revisão, o usuário determinou: “quero que use imagem da capa do livro e guarde na public”. A implementação passou a usar três imagens reais dos catálogos (TypeScript reutiliza asset existente), copiadas para `public/assets/books/stage10/` e `public-roadmap/assets/books/stage10/`. Títulos/autores foram conferidos visualmente no arquivo local pelo implementador, e a revisãoUI independente confirmou carregamento local das três imagens. Origem/bytes em `covers-origin.json`; sem hotlink, geração artificial ou alegação de licença livre. O achado inicial sobre ausência de licença livre continua factual; não é convertido em licença concedida pelo editor. O fallback permanece para falha de carregamento. Este adendo é do implementador e não amplia retroativamente a revisão independente.
