# Verificação técnica independente — Etapa 01

Consulta e execução: **16/10/2026**. Escopo lido: os 11 arquivos MDX de
`src/content/stage-01/lessons/`, os nove contratos de `exercises.ts` e o relatório
`docs/etapa-01-auditoria-pedagogica.md`. Auditor independente do autor das correções;
as conclusões da educator não foram usadas como prova técnica.

## Estado real e fidelidade

- [x] Currículo consultado integralmente pelo MCP Notion nesta passagem:
  `3f63cadfab77812494d8d5a0312f1a7a`, resposta com as seções 1–10 completas,
  inclusive 10.1–10.4; sem indicação de truncamento, filhos ou paginação pendentes.
- [x] Todas as aulas e os nove exercícios inventariados; fontes abaixo abertas e
  seções pertinentes lidas diretamente.
- [x] Lacunas enviadas ao responsável antes da correção.
- [x] Falha reproduzida no DOM original e correção do HTML reconferida por execução.
- [x] Builds temporários Tailwind e Next e consulta React em Chromium executados;
  versões, adaptações e limites registrados abaixo. Scaffolding latest não executado.
- [x] Evidências documentais e execuções essenciais coletadas para os exemplos
  no ambiente explicitado; isso não certifica versões futuras ou soluções de estudantes.

O Notion confirma TypeScript como linguagem principal; HTML/CSS/DOM/fetch/HTTP
são o núcleo e Tailwind/React/Next são opcionais. Os nove exercícios e níveis
correspondem ao currículo. Os mocks, objetos de exemplo, handlers e roteiros são
**elaboração didática própria**, não normas nem implementações impostas pelo
Notion. A leitura do currículo não comprova a precisão técnica desses exemplos.

## Fontes diretamente consultadas

Todas consultadas em 16/10/2026. MDN e guias são documentação viva, sem edição
congelada; os URLs indicam os documentos realmente abertos, não referências apenas
copiadas das aulas. As seções a seguir delimitam o que foi conferido.

| ID | Fonte / seção lida | Versão ou condição |
| --- | --- | --- |
| S01 | [WAI Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/), Associating labels explicitly | Tutorial W3C/WAI; associação `for`/`id` |
| S02 | [MDN input email](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email), Validation / Value | Sintaxe, não existência de caixa postal |
| S03 | [MDN submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), descrição / validação | Validação inválida impede submit; `form.submit()` não dispara o evento |
| S04 | [MDN Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction), Cascading order | Inclui proximidade de escopo antes de ordem |
| S05 | [MDN box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing), Values / exemplos | Content-box versus border-box |
| S06 | [Vite Features](https://vite.dev/guide/features.html#transpile-only), Transpile Only | Vite transpila TS sem typecheck |
| S07 | [TS strict](https://www.typescriptlang.org/tsconfig/strict.html), descrição da família strict | TypeScript; opção não inclui automaticamente unused |
| S08 | [TS Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), typeof / truthiness / in / instanceof / discriminated unions | Handbook; exemplo local compilado com TS 5.9.3 |
| S09 | [TS Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), Type Assertions / Literal Types | Assertions não têm checagem runtime |
| S10 | [MDN sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), descrição / Return value | Mutação in place; padrão compara strings |
| S11 | [MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), Return value / Description | Rejeição não cancela outras operações |
| S12 | [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), Checking response status / Reading body / response type | 4xx/5xx resolvem Response; corpo pode falhar depois |
| S13 | [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), Simple requests / Preflighted requests / credentials | POST JSON não é safelisted; leitura credenciada exige configuração específica |
| S14 | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), §§6.4.1, 9.3.4–9.3.5, 15.3.1–15.3.5 | HTTP Semantics, junho/2022; estados/intenções de método |
| S15 | [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects), Creating / Retrieving / Gotchas | Strings/Blob/File, name, disabled e boundary |
| S16 | [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), Description / Exceptions | Strings por origem; indisponibilidade possível |
| S17 | [MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), descrição | Separação por origem e contexto de aba |
| S18 | [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), HttpOnly / Secure | Exceção HTTPS em localhost explicitada pela documentação |
| S19 | [Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite), passos 2–4 | Integração Tailwind 4; plugin + import CSS |
| S20 | [React Effects](https://react.dev/learn/you-might-not-need-an-effect), Updating state based on props/state / Filtering a list | Derivar filtro durante renderização |
| S21 | [React Rendering Lists](https://react.dev/learn/rendering-lists), Rules of keys | Keys únicas entre irmãos e estáveis |
| S22 | [React Render and Commit](https://react.dev/learn/render-and-commit), etapas render/commit | Nova renderização não implica recriar todo DOM |
| S23 | [Next Server/Client](https://nextjs.org/docs/app/getting-started/server-and-client-components), On the server / On the client first load / Using Client Components | Página atualizada 05/10/2026; App Router; prerender de Client Components e hidratação |
| S24 | [Next Installation](https://nextjs.org/docs/app/getting-started/installation), System requirements / Automatic installation | Documentação consultada indica Node mínimo 20.9; latest é variável |

## Matriz por aula e conceito

Local: cada nome abaixo é o arquivo `.mdx` de `src/content/stage-01/lessons/`.
“Verificada” vale para a afirmação e condições da linha, não para todo o manual,
segurança geral, aprendizagem ou qualquer solução do estudante.

| ID / aula / seção | Afirmação confrontada e natureza | Fonte / confronto | Classificação / estado |
| --- | --- | --- | --- |
| 01-HTML-1 html §2 | Label explícita relaciona `for` e `id`; `name` identifica o campo | S01, S15: vínculo e participação em FormData conferidos | **Verificada**; evidência documental |
| 01-HTML-2 html §2–3 | Validação cliente pode ser contornada; servidor revalida; submit nativo pode ser bloqueado por inválidos | S02/S03: validação nativa e caminho de submissão; sem promessa de segurança só pelo HTML | **Verificada** nas condições nativas descritas |
| 01-CSS-1 css §1 | Cascata resolve origem/importância/camada/especificidade; ordem desempata equivalentes | S04: equivalência precisa incluir proximidade de @scope. A clarificação atual cita @scope antes da ordem de aparição | **Verificada** após clarificação documental; exemplo sem @scope não era bloqueante |
| 01-CSS-2 css §1 / exemplo | Border-box inclui padding/borda, não margem | S05: cálculo normativo e exemplo coincidem | **Verificada**; sem inferir layout correto de qualquer conteúdo |
| 01-FUND-1 fundamentos / preparação | Vite pode servir TS com erro de tipos; typecheck deve ser separado | S06/S07: transpilar não executa verificação semântica TS | **Verificada**; compilação dos snippets executada |
| 01-FUND-2 fundamentos §2–3 | sort modifica array; cópia spread antes de sort preserva array externo | S10: mutação in place; cópia é superficial como a aula avisa | **Verificada**; ex03 relacionado |
| 01-FUND-3 fundamentos / preparação | “Preserve lang=pt-BR e um main” pressupunha HTML inicial não garantido pelo template | Instrução inspecionada; não se executou novo scaffold. Responsável alterou para definir idioma/acrescentar main, sem depender do template | **Parcialmente correta** inicialmente; **Verificada** como instrução atual de edição; corrigido por inspeção, instalação pendente |
| 01-TIPOS-1 tipos §1–2 | Tipos/assertions somem; unknown exige narrowing; `as` não valida JSON | S08/S09: assertions removidas sem runtime checking | **Verificada**; não se apresenta predicado como proteção automática |
| 01-TIPOS-2 tipos / isUsuario | Guard rejeita null/nome numérico/telefone numérico e aceita contrato pequeno | S08; execução do snippet publicado rejeitou quatro entradas adversas e aceitou `{id:1,nome:'Ana'}` | **Verificada** no contrato explícito, não identidade/autorização |
| 01-TIPOS-3 tipos §3 | Utility types são transformações estáticas, não validação PATCH | S09 e compilação local dos três blocos juntos; comportamento runtime não é atribuído aos aliases | **Verificada** no exemplo; sem alegar cobertura de todos os utility types do TS |
| 01-DOM-1 dom §1 | validade de e-mail pelo handler pressupõe input type=email | S02; HTML originalmente especificado sem tipo aceitou “nao-e-email”. HTML atual explícito reconferido: inválido e vazio rejeitados; endereço sintaticamente válido aceito | **Incorreta** como experiência original incompleta; **Verificada** após correção; gravidade média, validado em DOM simulado |
| 01-DOM-2 dom §1–2 | preventDefault não interrompe propagação; textContent não interpreta HTML; submit pode não chegar à validação personalizada | S03 e comportamento DOM; novalidate agora explícito. Delegação preserva checagem de contêiner | **Verificada** no fluxo descrito; teste assistivo humano não realizado |
| 01-ASYNC-1 assincrono §1 | Promise tem estados; await não paraleliza CPU nem congela página inteira | S11 contextualiza coordenação de promises; mock local é rotulado memória, não HTTP | **Verificada** como modelo de continuação; não se mediu desempenho |
| 01-ASYNC-2 assincrono §3 | Promise.all rejeita sem cancelar operações restantes | S11 e experimento: primeira rejeitou; segundo timer terminou mesmo assim | **Verificada**; não implica cancelamento automático |
| 01-HTTP-1 http §1 | PUT solicita criar/substituir estado; DELETE solicita remoção, sem garantia de implementação/autorização | S14 §§9.3.4–5: contrato e efeitos do servidor importam; texto usa intenção do método | **Verificada** no nível introdutório; não equivale a apagamento físico obrigatório |
| 01-HTTP-2 http §1–2 | 204 sem conteúdo; fetch resolve erro HTTP; json pode falhar depois | S14 §6.4.1/S12: status e leitura são decisões distintas | **Verificada**; exemplo trata 204 antes de JSON |
| 01-HTTP-3 http §4 | POST JSON cross-origin normalmente faz preflight; CORS não autentica; wildcard não basta para leitura credenciada | S13: tipos safelisted excluem JSON; credenciais e origem têm condições específicas | **Verificada** nas condições explícitas; cache de preflight pode evitar novo OPTIONS observado |
| 01-HTTP-4 http / FormData | Campos textuais são strings; Request multipart gera boundary e não envia por construção | S15/S12; Node confirmou string e boundary, sem rede | **Verificada** para objeto Request; browser real não reexecutado por este revisor |
| 01-HTTP-5 http / mock | Servidor de estudo realmente oferece cenários GET/POST/409/500/JSON/CORS no navegador | Código lido; execução anterior não tomada como prova nova. Responsável reexecutou os dois E2E publicados em test-results/factcheck-confirm.log: ambos passaram | **Verificada** no fluxo de estudo testado; execução do responsável identificada, sem atribuí-la a este revisor |
| 01-SEG-1 seguranca §1–2 | Storage strings por origem; sessionStorage separado por aba; leitura inválida tem fallback | S16/S17 e snippet: JSON inválido, versão desconhecida e string deram16; válido20 preservou20 | **Verificada** no pequeno esquema; rascunhos valiosos exigem preservação como a aula alerta |
| 01-SEG-2 seguranca §1 | HttpOnly impede leitura JS, mas scripts ainda fazem requests; Secure restringe HTTPS | S18: HttpOnly correto; falta exceção localhost para Secure | **Parcialmente correta** inicialmente; **Verificada** após clarificação localhost reconferida documentalmente; não é garantia contra XSS/CSRF |
| 01-SEG-3 seguranca §3 | Autorização e preço não podem confiar no frontend; dados/credenciais enviados ao browser são acessíveis | S18/S23: fronteira cliente não protege os dados entregues; a aula não propõe auth pronta | **Verificada** como limite de confiança, sem certificar segurança de app real |
| 01-TAIL-1 tailwind / configuração | Tailwind4/Vite usa pacote, plugin e @import; utilitários continuam CSS | S19 passos2–4 coincidem; dependência dev adequada ao build local | **Dependente de contexto ou versão**: Tailwind4; receita documental e build temporário 4.3.3 conferidos; scaffold latest **Não verificada** |
| 01-REACT-1 react §1–2 | Filtro derivado não precisa efeito; key estável; input controlado por value/onChange | S20/S21: mecanismos coincidem com o snippet | **Verificada** documentalmente e por montagem dos snippets em Vite/Chromium, com filtro sobre duas entradas |
| 01-REACT-2 react / Consulta | Ref bloqueia duplicata e estado governa UI; render não recria todo DOM | S22 e compilação; código usa finally para liberar ref e valida unknown | **Verificada** no fluxo React19.3.0 observado em Chromium: loading, sucesso, filtro, vazio,500 e JSON inválido; respostas controladas, sem alegar API externa |
| 01-NEXT-1 next §1 / Filtro | use client delimita grafo de módulo; dados serializados ao cliente são públicos | S23: imports entram no grafo cliente; Server Components em children não são todos convertidos. Aula não impõe use client à árvore toda | **Verificada**; clarificação de prerender HTML inicial/hidratação adicionada pelo responsável e reconferida; filtro hidratado operou no runtime observado |
| 01-NEXT-2 next / preparação/page/loading | Projeto App Router separado; página busca/valida e entrega somente id/nome | S23/S24 e tsc dos arquivos; versões/lockfile exigidos; no-store explícito | **Dependente de contexto ou versão**; build Next16.4.2 passou; runtime sucesso/vazio/500/recuperação observado; exibição transitória de loading não cronometrada |

## Problemas e impacto

1. **Média, DOM, corrigido e reconferido:** faltava especificar `type=email` no
   HTML pressuposto pelo handler. O texto agora fornece HTML completo, novalidate,
   label e descrição associada; explica que sintaxe válida não prova existência.
   Ex01 e miniatividade DOM são os impactos diretos; ex05 também reutiliza a
   distinção cliente/servidor. A biblioteca DOM confirmou os três resultados.
2. **Baixa, Fundamentos, corrigido por inspeção:** definir idioma/main em vez de
   pressupor que o template já contém esses valores. Novo scaffold não executado.
3. **Baixa, Segurança, corrigido e reconferido documentalmente:** documentar exceção localhost de Secure; manter
   recomendação HTTPS e limites de HttpOnly. Afeta interpretação da aula, sem
   alteração exigida no laboratório textual nem implementação de cookies no app.
4. **Baixa, Next, corrigido e reconferido documentalmente:** acrescentar prerender HTML inicial e hidratação de
   Client Components. Não fazer a simplificação cliente=jamais servidor. Compilação
   TS não substitui experiência Next separada.
5. **Baixa, CSS, clarificação aplicada e reconferida:** citar proximidade de escopo se explicar a
   ordem completa; o exemplo sem @scope não está errado por essa omissão.

## Nove exercícios: confronto de contratos, não correção de soluções inexistentes

| Exercício | Conceitos confrontados / fontes | Resultado da exigência / limite |
| --- | --- | --- |
| ex01 contato | label/teclado/validação/textContent, S01–S03 | **Verificada** como requisito; fonte de estudo DOM corrigida. Não há solução de estudante executada |
| ex02 tarefas | persistência JSON e validação, S16/S17/S09 | **Verificada**; storage não oferece sincronização nem confiança automática |
| ex03 catálogo | combinação filtros/sort numérico/mutação, S10 | **Verificada**; sort original modifica coleção, dica está adequada |
| ex04 usuários | response.ok/unknown/loading/rede, S12/S08 | **Verificada** como contrato; disponibilidade de API externa **Não verificada** |
| ex05 agendamento | POST JSON/GET/409 e revalidação servidor, S12–S14 | **Verificada** como contrato didático; conflito escolhido pelo domínio, não status universal de agenda |
| ex06 livros | mock assíncrono pode servir dados; paginação e favoritos precisam contrato, S11/S16 | **Verificada** como exigência local; nenhuma alegação de backend real |
| ex07 administração | GET/POST/PATCH/DELETE e auth no backend, S12/S14 | **Verificada** como contrato opcional; mock HTTP da aula avisa que não implementa PATCH/DELETE e exercício deve definir o próprio |
| ex08 carrinho | preço/estoque no servidor e quantidades inválidas, S23/S16 | **Verificada** como limite de confiança; não há pagamento real nem garantia financeira |
| ex09 comparativo | Tailwind opcional após CSS; semântica/funcionalidades preservadas, S19/S01 | **Dependente de contexto ou versão** na instalação; comparação é atividade, não promessa universal de melhor manutenção |

Nenhum exercício textual possui avaliador automático de código. Critérios e
checklists não provam que a implementação do aluno funciona; essa distinção está
correta no produto e continua exigida no relatório.

## Execuções próprias e revisão das conclusões antigas

Ambiente observado: Node **v24.21.0**, TypeScript **5.9.3**, jsdom **30.1.2**,
Vitest **5.0.4**, dependências já instaladas. Nenhuma instalação externa.

- `npm test -- --maxWorkers=2 src/tests/study-snippets.test.ts src/tests/stage-one-lessons.test.ts`:
  **12 testes passaram em dois arquivos**. Onze renderizações MDX e um teste
  de compilação strict/unused dos snippets publicados. Isso não é build Next,
  teste de runtime React, requisição HTTP nem garantia de precisão de toda aula.
- `node /tmp/factcheck-stage01.mjs`: script temporário deste revisor extraiu
  somente blocos autorais das aulas DOM/tipos/segurança, transpôs TS em arquivos
  `.mjs` temporários com o compilador instalado e importou esses módulos no Node.
  Não usou eval/Function nem código de estudante. Criou DOM fictício com jsdom,
  submeteu eventos e inspecionou o texto de saída. Os arquivos de módulos foram
  removidos em finally. O script não é um recurso do aplicativo.
- Primeiro experimento sobre HTML implícito antigo: valor `nao-e-email` gerou
  `E-mail informado: nao-e-email`, reproduzindo o erro. Alterar para type=email
  rejeitou. Segundo experimento extraiu o **HTML corrigido real da MDX**: inválido
  rejeitado, `ana@example.test` aceito, vazio rejeitado. jsdom não comprova aparência,
  teclado físico, leitor de tela ou entrega de e-mail.
- Guard `isUsuario` publicado: null, array vazio, nome numérico, telefone numérico
  rejeitados; usuário com id1/nomeAna aceito. Não prova todas as estruturas possíveis.
- Preferência publicada: texto JSON inválido, versão2 e fonte string retornaram16;
  versão1/fonte20 retornou20. Não se escreveu no storage pessoal.
- Experimento de Promise.all: uma Promise rejeitou; a outra concluiu depois;
  esperado e observado coincidiram. Não é medição de latência do mock de600ms.
- FormData/Request nativos do Node: quantidade como string e Content-Type com
  boundary automático confirmados; objeto Request não foi enviado. Browser tem
  implementação própria, que precisa de sua própria evidência.

Os três servidores temporários deste revisor foram encerrados após as verificações.

A auditoria anterior registrava notas3/4 em todas as dimensões e nenhum bloqueante
textual identificado. **Isso não era prova suficiente da precisão do exemplo DOM**:
esta passagem encontrou contraexemplo executável mesmo com MDX e TS aprovados.
As 48 rotas, dois E2E HTTP/FormData e o fluxo persistente relatados no documento
anterior continuam evidências históricas; não foram reapresentados como executados
por este revisor. Nesta auditoria global, o responsável reexecutou os dois E2E
HTTP/FormData e informou ambos aprovados em test-results/factcheck-confirm.log.
As limitações antigas sobre builds externos eram corretas para aquela passagem;
as execuções adicionais atuais abaixo ampliam a evidência sem validá-la retroativamente.

## Execuções adicionais dos opcionais

- Regressão versionada: `npm test -- --maxWorkers=2 src/tests/factcheck-stage-one.test.ts`
  passou, assim como lint desse arquivo. Extrai HTML e handler atuais; compila TS
  em arquivo temporário, importa no Node child e usa jsdom para verificar inválido,
  vazio, válido, recuperação de aria-invalid e foco. A primeira versão do teste
  usava stdout como sentinela; stdout veio vazio apesar de status0. Substituído por
  arquivo de resultado escrito somente após os asserts; a repetição passou.
- `npm view next version` retornou **16.4.2**. Projeto isolado em
  `/tmp/stacktrail-next-factcheck`, dependências instaladas ali (27 pacotes),
  Next16.4.2/React19.3.0/TS5.9.3. Copiados os três blocos TSX reais da MDX;
  acrescentados layout mínimo sem fontes externas, package e config de teste
  com um worker. `NEXT_TELEMETRY_DISABLED=1 npm run build --prefix /tmp/stacktrail-next-factcheck`
  com `next build --webpack` passou, incluindo TypeScript e rota dinâmica /reservas.
  Next ajustou opções obrigatórias no tsconfig temporário; não mudou o repositório.
- Fixture HTTP fictícia dedicada devolveu dois livros, lista vazia ou500; única
  adaptação no snippet Next foi porta4179→4191 para isolamento. Primeira tentativa
  usou4190, porta bloqueada por fetch (`bad port`), e mostrou o erro previsto da
  página. A porta da fixture foi corrigida e o build repetido com sucesso.
- `next start --port4188 --hostname127.0.0.1` serviu o build local. Chromium
  operou filtro após hidratação, ausência de resultados, resposta vazia, HTTP500
  e recuperação; sem pageerror. O primeiro seletor genérico de alert coincidiu
  com o anunciador de rota do Next; foi especificado para o parágrafo de erro em
  main e a jornada completa foi repetida com sucesso. Não se observou por tempo controlado o loading
  transitório nem se testou Route Handler opcional ou autenticação.
- Projeto separado `/tmp/stacktrail-vite-factcheck` reutilizou dependências locais
  por symlink, sem instalar ou editar as do repositório. Config, CSS e HTML reais
  da aula Tailwind compilados com Vite8.3.4/Tailwind4.3.3: build passou; CSS5.43kB.
  Chromium confirmou padding esquerdo16px, cor e foco no botão publicado.
- No mesmo projeto temporário, os dois blocos React foram reunidos e montados
  com createRoot/pluginReact. Chromium observou loading/sucesso/filtro/vazio/500/
  JSON inválido. Respostas foram controladas por Playwright route; isso testa UI
  React, não a implementação de servidor. Nenhum efeito foi adicionado para filtro.

## Gate

As lacunas apresentadas foram corrigidas e reconferidas dentro dos mecanismos
explicitados. Não permanece bloqueante técnico identificado nas afirmações
inventariadas. **Aprovação condicionada às versões e contratos verificados**:
scaffolding latest, APIs públicas, publicação e soluções de estudantes não foram
validados. Evidência documental, DOM simulado, compilação, HTTP real do responsável
e runtime dos opcionais são registros distintos; nenhum substitui os demais.
Não houve GitHub/LinkedIn, pagamento, envio de soluções, teste com estudantes ou
certificação WCAG. Loading transitório Next e Route Handler opcional permanecem
não executados, baixa gravidade no escopo introdutório e sem afirmação de sucesso
que exceda o observado.
