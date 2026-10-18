> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](../README.md) e o [estado atual](../../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Revisão independente final das duas trilhas — 17/10/2026

## Escopo e independência

Revisor distinto do autor. Leitura das três skills e rubrica, pedido anexo,
metadata das 31 aulas/21 desafios, aulas novas e revisadas indicadas abaixo,
progresso v7, Provider, seletor, dashboard, índices, aula, laboratório e projetos.
Notion 3f63cadf-ab77-81ad-9194-c805b33198d8 consultado diretamente via MCP:
11 seções completas. O original prioriza PHP; a alternativa principal JS/TS é
ampliação solicitada, não alteração atribuída ao Notion.

Não executei navegador, instalações PHP, suíte global nem cada snippet de cada
aula. Os resultados de outros revisores não são tratados como execução minha.
A revisão de UI aqui é de código; responsividade/foco reais dependem da execução
do autor. Não há certificação WCAG ou garantia de aprendizagem.

## Achados enviados antes de correção

| Local | Gravidade | Evidência e impacto | Estado na revisão |
| --- | --- | --- | --- |
| exercises.ts, 03-ex05 | Alta, bloqueia atividade local | dica pede DB_DATABASE=:memory: e testIdeas mistura arquivo JSON com :memory:, mas catálogo usa catalog.path/file; critério exige banco isolado e requisito model | Pendente; trocar por caminho temporário por teste, catálogo dev preservado; manter IDs/4 critérios |
| exercises.ts, 03-ex08 | Média | pré-requisito Laravel principal pronto e outra trilha opcional contradiz escolha JS; destino só Express/Nest | Pendente; permitir qualquer principal e recorte na outra stack; editor pode oferecer referência explícita sem exigir Laravel para concluir |
| ts-contratos, prática | Baixa | @ts-expect-error suprime diagnóstico esperado; instrução pede registrar diagnóstico sem explicar como vê-lo | Melhoria: compilar com diretiva comprova erro esperado; remover temporariamente numa cópia permite observar diagnóstico |

Ausência de outros erros demonstrados nesta amostra não equivale a auditoria
exaustiva. Pendências acima precisam de reconferência após edição.

## Evidência técnica direta

Consulta em 17/10/2026, páginas abertas e seções lidas:

| Aula/conceito | Fonte/seção e versão | Classificação e condição |
| --- | --- | --- |
| js-valores: primitivos, null e inteiro seguro | [MDN Data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures), Primitive values/Number | Verificada; Number seguro dentro de ±(2^53−1), não qualquer number |
| js-funcoes: campos privados e receptor this | [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), Private elements/Binding this | Verificada; cópia rasa do exemplo não protege objetos aninhados |
| ts-contratos: T relaciona entrada/saída; private estático diferente de # | [TS Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), Generic Types; [TS Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html), Member Visibility/Caveats | Verificada no contrato introdutório; uso local TS5.9.3 |
| ts-narrowing: typeof/null/in e guards | [TS Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), typeof type guards/in operator | Verificada; operador in inclui cadeia de protótipos, exemplo não promete validação genérica de objetos hostis |
| ts-assincrono: Promise.all sem cancelamento automático | [MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), Description/rejection | Verificada; funções já chamadas produzem Promises; combinador não cria threads |
| express-validacao: strip de extras e partial/refine | [Zod API](https://zod.dev/api), Objects/strictObject/partial/refinements | Verificada por fonte e ensaio instalado Zod4.6.7; 200 codepoints contados explicitamente por spread |
| express-middleware/ts-assincrono: erro Promise | [Express Error handling](https://expressjs.com/en/guide/error-handling.html), Errors in asynchronous code/Promise chains/callback APIs | Dependente de contexto ou versão: Express5 encaminha rejeição retornada/aguardada; callback desconectado requer next/captura |
| laravel-testes: lock não é recuperação de queda | [PHP flock](https://www.php.net/manual/en/function.flock.php), Description/Notes | Dependente de contexto ou versão: coordenação de processos cooperantes; fonte não certifica atomicidade/crash recovery |
| 03-ex05 DB_DATABASE para catálogo JSON | Fonte primária local JsonBookCatalog.php + config/catalog.php/TestCase | Incorreta na atividade atual; configuração DB não seleciona arquivo catalog.path |
| progresso/conclusão | model.ts/backendTrackSummary e stageSummary | Verificada por regressões: ambas principais isoladamente bastam, preferência não retira conclusão, leituras/evidências/ex21 necessários; evidência é declaração |

## Rubrica por aula nova/revisada (escala 0–4)

Ordem: alinhamento / progressão / precisão-fontes / exemplos / prática / autonomia /
reprodutibilidade. Pontuação é avaliação de material, não prova de execução ou nota
curricular do aluno. Fontes e testes acima sustentam o recorte, não todas as afirmações
possíveis das aulas históricas.

| Aula | Notas | Evidência concreta |
| --- | --- | --- |
| linguagem-runtime | 3/3/3/3/3/3/3 | POST atravessa camadas; contraste Map/arquivo; health desligado distingue conexão de500 |
| js-valores | 3/3/3/3/3/3/3 | coerção Number e referências de filter, atividade normaliza sem mutar |
| js-funcoes | 3/3/3/3/3/3/3 | duas instâncias/closure, receptor this, classe e cópia rasa com limite |
| ts-contratos | 3/3/3/3/3/3/3 | Book/NewBook/Lookup e first<T>, contraprova JSON e exercício discriminado; melhoria diagnóstica acima |
| ts-narrowing | 3/3/3/3/4/3/3 | parser worked example; year ausente/null/limites e preservação de saída |
| ts-assincrono | 3/3/3/3/4/3/3 | read antes de write, contagem UTF16 explícita, rejeição e sequencial/concorrente |
| express-validacao | 3/3/3/3/4/3/3 | schema real, limites Unicode e PATCH seguido de GET, semântica extras |
| express-testes | 3/3/3/3/4/3/3 | fragmento identificado como fragmento; fonte executável; mutante temporário e recuperação |
| node-runtime | 3/3/3/3/4/3/3 | ESM labels.js compilado; unknown e ausência de garantia por assertion; year |
| node-http | 3/3/3/3/3/3/3 | URL bruta/query/HEAD explicitados; listen vs createServer; fechamento |
| express-middleware | 3/3/3/4/4/3/3 | parser/fallback ordem, Promise retornada vs callback e CORS leitura |
| express-crud | 3/3/3/3/4/3/3 | contrato local, ID léxico e PATCH sem mutação, ordenação como transferência |
| laravel-inicio | 3/3/3/3/3/3/3 | scaffold vs ZIP, prefixo, Artisan e execução sem banco; alternativas OS não alegadas testadas |
| laravel-testes | 3/3/3/3/4/3/3 | POST/PATCH/GET, arquivo corrompido, noções ORM preservadas e claramente opcionais |
| decisao | 3/3/3/4/4/3/3 | contexto PHP contrastado com equipe TS; Map vs arquivo não vira benchmark |
| projeto | 3/3/3/3/4/3/3 | instalação limpa e sequência CRUD, revisão com evidências, uma trilha suficiente |

Competências por trilha: linguagem+autoload/módulos possuem atividades próprias;
HTTP/rotas/validação têm projeto real; testes cobram efeito após recusa; README/ADR
cobram decisões e limites. PHP usa JSON e Express memória, diferença explícita e
não confundida com equivalência de armazenamento. Nest permanece extra; nada em
backendTrackSummary depende de sua leitura/exercício. Eloquent/migration preservam
vocabulário original sem participar das rotas principais.

## Execução independente efetiva

- `npm test -- --run src/tests/stage-three.test.ts src/tests/backend-projects.test.ts --maxWorkers=1`: **2 arquivos, 8 testes passaram**, duração490ms. Conferi código dos testes: inclui v6→v7, bancos PHP/JS separados, ambas conclusões, troca de preferência, requisito comum e solução alterada invalidando checks.
- Node **v24.21.0**, script próprio com assert em módulos dist dos exemplos: schema remove admin; PATCH vazio/null recusa;200 emojis aceita/201 recusa; titles rejeita null/objeto/campo numérico/vazio/itemnull; trim não muda entrada; first vazio devolveundefined. Todos passaram. Importei dist existente; não alego rebuild independente.
- Leitura do seletor: fieldset/legend, botões typebutton e aria-pressed, sem apagar progresso; Provider altera somente preferência. Navegação livre usa contexto da aula e lista filtrada. Layout/teclado real não executado pelo revisor.

## Decisão

Não identifiquei bloqueante conceitual grave nas oito aulas novas ou no algoritmo
de conclusão. **Não aprovar a atividade03-ex05 enquanto instruções de banco/:memory:
não forem corrigidas e reconferidas.** Ex08 também requer consistência com a escolha
JS. Gate geral ainda depende de renderização, matriz UI e execução final do autor,
além das correções, não de notas ou links deste documento.

## Reconferência incremental — mesma data

- Ex08: título e enunciado agora delimitam Laravel → Express/Nest como aprofundamento
  opcional, dizem explicitamente que quem conclui JS pode comparar no ADR sem esse
  desafio. `exerciseAreas['03-ex08'] === 'extra'` mantém a atividade fora dos dois
  percursos obrigatórios. Coerência resolvida por delimitação explícita, preservando
  editor e rascunhos legados. Estado: **validado por inspeção de texto e regra**.
- Ex05: requisitos, dica3 e ideia3 passaram a indicar `catalog.path` e arquivo
  temporário exclusivo, resolvendo a instrução operacional errada de SQLite.
  Na primeira reconferência ainda restavam `acceptanceCriteria[2]` e
  `commonErrors[2]` dizendo “banco”, e `commonErrors[0]` cobrava fillable num
  caminho sem Model. Reportado ao autor para concluir a limpeza. Estado:
  **corrigido parcialmente; reconferência textual final pendente**.
- Os resultados PHP/Laravel informados pelo autor não foram executados por este
  revisor; permanecem evidência do autor, sem duplicar autoria de execução.

## Reconferência textual final — 17/10/2026

Ex05: conferidos novamente requisito de armazenamento, critério3, dica3 e erros
comuns. Agora exigem arquivo temporário isolado/configuração `catalog.path`,
catálogo sem mutação e nenhuma dependência de Model/fillable ou banco. Os quatro
critérios e ID foram preservados. O bloqueante de instrução operacional está
**validado como resolvido por inspeção da correção pertinente**; não implica nova
execução PHP por este revisor.

`ts-contratos`: a atividade agora explica escopo da diretiva na próxima linha e
que ausência de erro esperado deve produzir diagnóstico, delimitando contraprovas
num arquivo de teste de tipos. A melhoria didática está **corrigida e reconferida**.
Ex08 permanece explicitamente adicional e fora da conclusão principal.

**Gate no recorte independente:** nenhum bloqueante técnico/pedagógico demonstrado
permanece nos trechos revisados. As notas da rubrica acima continuam adequadas após
essas correções. Isto encerra o recorte textual/metadata/progresso e os testes
selecionados deste revisor; não amplia sua cobertura para execução PHP, browser,
WCAG, publicação ou aprendizagem real. Gate integrado e evidências globais finais
continuam responsabilidade do relatório consolidado, sem converter resultados
relatados pelo autor em testes executados pelo revisor.

## Revisão adicional das três aulas comuns

Leitura integral após correção pelo autor: `ciclo`, `configuracao` e
`dependencias-testes`, mais `examples/stage-03/laravel-api/environment.example`
(arquivo autoral fictício, não configuração privada), Express `server.ts` e
Laravel `config/catalog.php`.

| Aula | Rubrica A/P/F/E/Pr/Au/R | Evidência e decisão |
| --- | --- | --- |
| ciclo | 3/3/3/3/4/3/3 | POST/mídia/status explicados; cenário local identificado como modelo; atividade agora reproduz em Laravel **ou** Express. Lifecycle Laravel é exemplo nomeado, não pré-requisito operacional de JS. Nenhum bloqueante de dependência cruzada restante |
| configuracao | 3/3/3/3/4/3/3 | blocos alternativos APP_ENV/DEBUG/LOG e PORT/STUDY_ORIGIN; catálogo vem de config semDB; declara que projetos Node não carregam .env automaticamente; atividade na trilha escolhida. Ambiente exemplo contém somente configuração fictícia, CACHE/SESSIONarray e semDB |
| dependencias-testes | 3/3/3/3/4/3/3 | prepara apenas runtime escolhido, npmci/build/test ou Composer; lock e instalar/compilar/testar distintos; testa efeito após recusa e mutante temporário. Melhoria pequena: descrever cliente de testes como casoLaravel e HTTPloopback como casoExpress, já explicado nas aulas específicas |

Fontes abertas diretamente nesta passagem:
[Node24 process.env](https://nodejs.org/docs/latest-v24.x/api/process.html#processenv),
seção process.env (documentação24.22.0 retornada; ambiente anterior executado24.21.0),
confirma objeto de ambiente do processo, sem equivalência a cofre;
[npm11 ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/), Description, confirma
lock obrigatório/consistência e instalação limpa. Classificação: **Verificada**
para essas afirmações. Leitura do código confirma PORT validada e origem passada
explicitamente à app; o arquivo de configuração de catálogo não consulta DB.
Não li ambiente privado nem declarei configuração fictícia como segredo.

Estado no recorte: correções de dependência cruzada **reconferidas por inspeção**,
sem bloqueante restante demonstrado. Renderização/browser/executar API após essas
últimas correções não feitos por este revisor; permanecem na validação do autor.
