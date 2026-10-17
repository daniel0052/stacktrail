# Auditoria pedagógica da Etapa 01 —16/10/2026

Currículo integral consultado pelo MCP do Notion:3f63cadfab77812494d8d5a0312f1a7a, incluindo item10/mini-projeto, sem filhos, paginação ou truncamento pendentes. Aplicadas as skills educator eUI/UX; revisor independente leu11MDX e9exercícios e conferiu correções em duas passagens. O objetivo é adequação do material, não certificação de aprendizagem.

## Fidelidade

HTML/CSS → fundamentosTS/strict/DOM → async/fetch/HTTP/CORS/segurança é o núcleo. TypeScript permanece linguagem principal; Tailwind, React eNext continuam opcionais. Nove exercícios, IDs e níveis preservados. Publicação GitHub permanece requisito curricular declarado; ponte Git da Etapa02 é indicada, sem publicação automática nem mudança no cálculo do progresso. Etapas03–19 não receberam conteúdo.

| Objetivo conforme roadmap | Local / evidência de ensino e prática |
| --- | --- |
| HTML semântico/forms/teclado | html: documento, formulário, labels, validação e agendamento semCSS |
| Cascata/boxmodel/Flex/Grid/reflow/estados | css: duas experiências de layout e diagnóstico no DevTools |
| TS como linguagem e strict | fundamentos: ambientevanilla-ts, valores/funções/coleções/módulos; tipos: unions/guard/generics/utilitários |
| DOM/eventos/renderização segura | dom: submit/novalidate, narrowing, delegação e textContent |
| Promise/async/all e estados | assincrono: mock em memória eponte para experiênciaHTTPcompleta |
| HTTP/fetch/JSON/CORS/FormData | http: mensagens/status/guards; mockloopback; UIcompleta; FormData×JSON sem envio |
| Persistência e limites de confiança | seguranca: preferência validada, fallback, cookies/storage/XSS, publicação separada |
| Tailwind/React/Next opcionais | ambientes separados, utilitários, componente+consulta, página servidor+filtrocliente; limites explícitos |
| Exercícios iniciais/intermediários/avançados |9contratos originais com critérios, dicas graduais, reflexão e evidência declarada |

Textos, fixtures, exemplos de livros e contratos de mock são **elaboração didática própria**. As fontes técnicas abaixo sustentam mecanismos; não são atribuídos ao Notion como exigências adicionais.

## Lacunas apresentadas e corrigidas

- Alta: TS exigido sem ambiente executável → projeto separado, comandos, HTML/módulo, typecheck, primeiro resultado, interpretação de erro e alternativa online. Preservar versões/lockfile, sem prometer que latest será sempre igual.
- Alta: endpoints fictícios sem roteiro → mock de estudo Node emloopback, GET/POST/409 e cenários500/JSON/CORS; iniciar/encerrar/reiniciar, dados voláteis e limitações documentados. Apenas trecho de aula e fixture temporária de testes; nenhum backend adicionado ao runtime da plataforma.
- Média: FormData nominal → campos/name/string/File, conversão explícita, Request sem envio, boundary, decisão de formato eatividade de transferência.
- Média: UI de estados desconectada → HTML+handler, flag, disabled, feedback, renderização e finally, conectados a fetch/guard.
- Média: opcionais cobravam mais que mostravam → configuração Tailwind/Vite, consulta React com union/guard/ref e página Next servidor+loading+filtrocliente. Builds externos não são declarados executados.
- Média: Git/publicação semponte → rota de estudo Etapa02 e distinção entre execução local e publicação pendente; sem mudar critério ou publicar.
- Média encontrada na revisão final: unused do template conflitava com snippets isolados → três blocos de tipos reunidos em um módulo, funções usadas, tipos exportados e distinção de unused/strict. Regressão usa as opções publicadas.
- Baixa: ex09 exigia API para qualquer interface → pré-requisitos acompanham a interface escolhida.

## Rubrica independente final

A/P/F/E/V/U/R: alinhamento, progressão, precisão/fontes, exemplos, prática/avaliação, autonomia, reprodutibilidade. Todas≥3/4 por aula, sem bloqueante textual remanescente identificado. Notas não comprovam instalações externas, UI ou aprendizagem real.

| Aula | A/P/F/E/V/U/R | Evidência específica |
| --- | --- | --- |
| html |3/3/3/3/3/3/3| Estrutura/formulário, teclado e servidor como autoridade |
| css |3/3/3/3/3/3/3| Cascata, boxmodel, eixos e diagnóstico com conteúdo real |
| fundamentos |3/3/3/3/3/3/3| Bootstrap, primeiro resultado e transformações puras |
| tipos |3/3/3/3/3/3/3| Guards/unions/utilitários ecompilação strict+unused |
| dom |3/3/3/3/3/3/3| Narrowing de elemento, submit e texto seguro |
| assincrono |3/3/3/3/3/3/3| Estados de Promise, finally, concorrência eponteUI |
| http |3/3/3/3/3/3/3| Contrato executável, falhas distintas eFormData |
| seguranca |3/3/3/3/3/3/3| Persistência validada, riscos e evidências externas separadas |
| tailwind |3/3/3/3/3/3/3| Configuração/inspeção e comparação com CSSpuro |
| react |3/3/3/3/3/3/3| Props/estado/derivação e consulta com falhas |
| next |3/3/3/3/3/3/3| Página servidor validando, props públicas e filtrocliente |

## Fontes consultadas

Seções pertinentes lidas em16/10/2026 pelo autor e/ou revisor, sem afirmar leitura integral dos manuais:

- [Currículo Notion](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a): objetivos eopções.
- [Vite Guide](https://vite.dev/guide/), [templatevanilla-ts](https://raw.githubusercontent.com/vitejs/vite/main/packages/create-vite/template-vanilla-ts/tsconfig.json): criação/módulos eopções deunused.
- [TypeScript tooling](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html), [strict](https://www.typescriptlang.org/tsconfig/strict.html), [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html): ambiente echecagem.
- [NodeHTTP24](https://nodejs.org/docs/latest-v24.x/api/http.html): API utilizada pelo mockautoral.
- [MDNFetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects): status/rede/corpo eboundary.
- [WAIForms](https://www.w3.org/WAI/tutorials/forms/): labels, feedback eoperação.
- [ReactEffects](https://react.dev/learn/you-might-not-need-an-effect): dados derivados eeventos.
- [Next instalação](https://nextjs.org/docs/app/getting-started/installation), [Server/Client](https://nextjs.org/docs/app/getting-started/server-and-client-components): ambiente efronteira.
- [Tailwind/Vite](https://tailwindcss.com/docs/installation/using-vite): integração consultada.

## Validação efetivamente executada

-48/48 cenários de rotas nos dois temas,375px/fonte150 após aprofundamento; baseline anterior também48/48. Layout global com demais larguras ezoom permanece fase8.
-11aulas MDX renderizadas; compiladorTS verificou os trechos publicados de tipos, HTTP/UI, FormData, React eNext (filtro/page/loading) comstrict/noUnusedLocals/noUnusedParameters. Isso não é build Next.
-Dois testes Playwright executaram fixtures autorais extraídas da MDX: loading, resposta normal/vazia,500,JSONinválido,CORSreal,201/409/GET; strings/FormData/JSONnumérico/boundary automático. Porta5173 já ocupada: fixture usa5174 eajusta explicitamente aorigem, como ensina o roteiro; serviço existente preservado.
-Um fluxo de laboratório passou: texto/reflexão/dica persistidos após reload/troca de etapa, conclusão desabilitada sem critérios eprompteditável sem envio.
-Typecheck/lint/build passaram após corrigir opções do teste; aviso dechunk>500kB permanece.

Limites: comandos de scaffolding/instalação de novos projetos não executados nesta auditoria; fixture usa dependências locais existentes. Nenhum build Next externo, GitHub, LinkedIn, publicação ou APIpública foi validado. Nenhum código colado pelo estudante é executado. O mock não tem autenticação, banco ou semântica deprodução. Requisições echecklists deaprendizagem não são prova universal nem medição com estudantes.

## Reconferência técnica independente posterior

As notas e conclusões acima registram a revisão pedagógica daquela passagem;
não equivalem à aprovação técnica independente de cada afirmação. A auditoria
posterior com stacktrail-factchecker está em
[CONTENT_VERIFICATION.md](CONTENT_VERIFICATION.md), com fontes diretamente
consultadas, contraexemplos, correções e pendências por conceito. Em caso de
divergência, use a evidência técnica mais recente no escopo e versão registrados,
sem apagar o histórico nem presumir que o build valide o conteúdo.
