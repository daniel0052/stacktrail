> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Etapa 02 — inventário, implementação e validação

## Fonte e autoria

Página [ETAPA 02 — Web, HTTP, redes, Git e ferramentas](https://app.notion.com/p/3f63cadfab7781398a71cedc5c4a3994), lida integralmente pelo MCP em 15/10/2026. Conteúdo retornado com fechamento completo, sem truncamento, filhos/paginação pendentes. Somente leitura.

Conforme o roadmap: HTTP/URLs/métodos/status/headers/JSON/cookies/cache/CORS; DNS/IP/portas/TCP/UDP/TLS/proxy/CDN; REST/contratos/OpenAPI; shell/cURL/Bruno ou Postman; Git colaborativo/PR/segredos. Ordem preservada em cinco módulos e 12 aulas. TypeScript opcional, sem framework obrigatório. Nove exercícios originais nos três níveis, avançados opcionais. Rubrica 35% HTTP/REST, 20% rede/diagnóstico, 25% ferramentas/testes, 20% Git/documentação. Meta sugerida ≥8/10 sem bloqueantes, não calculada automaticamente.

Critérios originais: explicar percurso DNS/TLS/HTTP; distinguir métodos/status/headers/cookies/CORS; testar com cURL e Bruno/Postman; especificar API; abrir PR/resolver conflito; publicar laboratório e receber feedback. Não foi inventada exigência de implementar backend. A política local de progresso exige seis desafios iniciais/intermediários e competências com evidências declaradas; essa política é didática, não uma contagem definida no Notion.

Explicações, cenários, dados fictícios e simuladores são elaboração didática própria. Não foram adicionados links ao Notion nos dados públicos da Etapa 02; links preexistentes em aulas da Etapa 00 não foram alterados. Foram consultados MDN CORS/Cookies, curl manpage, Git rebase e OpenAPI; A versão HTML da RFC 9110 excedeu o limite da ferramenta web; sua versão oficial em texto foi consultada em https://www.rfc-editor.org/rfc/rfc9110.txt. Não foi executado cURL externo, Git real de aluno ou integração GitHub ao validar os simuladores.

## Arquitetura e escopo

Conteúdo em `content/stage-02`; modelos determinísticos em `features/web`; interfaces em `components/web`; rotas `/etapas/02`. Progresso global v5 valida e migra v1–v4, sem mudar a chave ou IDs anteriores. Nenhuma dependência nova. Simulações não fazem chamadas reais de rede nem executam shell/código do estudante. Persistência de ferramentas será separada por contexto de aula/exercício.

## Fases

1. Estrutura curricular/navegação: typecheck e três testes de inventário, migração e avanço passaram. Ainda sem validação de navegador nesta fase.

2. Explorador HTTP: três testes de modelo passaram; cinco aulas usam o componente. Dados fictícios, JSON validado, nenhuma requisição real. Sessão é estado do mock; não modifica cookies do dispositivo.

3. Visualizador de rede: dois testes passaram; duas aulas usam o percurso com anterior/avançar/reiniciar, seleção de falha e pergunta com feedback. Sem medir a rede do estudante.

4. Contratos: três testes passaram. Coleções array/items/data e IDs textuais/numéricos são aceitos. GET destrutivo, corpo em 204 e erro com stack são rejeitados. Cópia é rascunho JSON, não documento OpenAPI certificado.

5. Terminal: três testes passaram (operações virtuais, curl local, bloqueios/atomicidade). Gramática limitada, sem scripts/processos/rede/arquivos reais. less imprime conteúdo; chmod registra modo sem simular usuários; curl não implementa toda a ferramenta real.

6. Git: três testes passaram. Grafo mostra IDs didáticos, pais e referências; conflito requer edição/add/conclusão, rebase recria commits. Merge compara um arquivo como unidade e rebase aceita linha local sem merges; PR/remoto são modelos, não integrações externas.

7. Integração: dezesseis testes de progresso/UI passaram. Nove laboratórios preservam dicas, texto de evidência, reflexão, critérios e prompts. Ferramentas armazenam journals v1 por contexto `stacktrail:web:1:...`; imports globais não incluem esses rascunhos. Reabertura reproduz ações por modelos permitidos. Nenhum resultado externo foi automaticamente aprovado.


8. Validação final (15/10/2026): `npm run typecheck`, `npm run lint` e `npm run build` passaram. `npm test -- --maxWorkers=4`: 250 testes passaram em 25 arquivos. A execução padrão anterior apresentou timeout de 5 s no teste preexistente do editor visual; a repetição com quatro processos passou. Não foi ocultada falha de assertiva. O build emite aviso de pacote principal de 548,12 kB minificado (170,65 kB gzip); otimização adicional de carregamento permanece possível.

A navegação real no navegador revelou `{id}` em texto MDX interpretado como expressão na aula REST. O exemplo foi marcado como código e uma regressão agora renderiza todas as 12 aulas, além de conferir seu carregamento no navegador após novo build.

### Conferência no navegador

- Prévia do build servido estaticamente sob `/stacktrail/`, sem fallback de servidor: 12 aulas carregadas; assets do HTML, favicon com uma única base e `.nojekyll` conferidos. Não comprova deploy no domínio real.
- HTTP: POST retornou 201, Location e representação; DNS retornou falha sem status; recarregar recuperou ações. A bancada do exercício começou independente da aula.
- Rede: falha TLS interrompeu o percurso; pergunta de diagnóstico apresentou feedback coerente.
- Contratos: configuração inicial verificada somente após clique; feedback explicita seu escopo local.
- Terminal: criação de arquivo virtual, pipe com grep e resultado observado via Enter; evidência textual recuperada após recarregar.
- Git: branches divergentes, staging, commits, conflito, edição e commit final com dois pais; nenhum Git/GitHub real foi acionado.
- Modal de revisão mostrou solução e rubrica e fechou por Esc. Navegação entre 00/01/02 preservou listagens de 29/9/9 desafios. Abrir atividades não marcou conclusão.
- Bancada HTTP conferida na largura padrão e em 390 × 844, tema escuro/claro e fonte até 150%, sem overflow horizontal do documento. Controles por teclado e nomes acessíveis conferidos nos fluxos acima; não foi realizada certificação WCAG, medição automatizada de todo contraste ou teste com leitor de tela.

Capturas: `screenshots/etapa-02-http.jpg` e `screenshots/etapa-02-mobile.jpg`. Simulações são recortes didáticos: terminal tem gramática selecionada, Git usa um arquivo, rede usa percurso conceitual HTTPS/TCP. Evidências externas continuam declaradas e não verificadas. Não houve commit, push, publicação ou modificação no Notion.


## Revisão pedagógica posterior

A auditoria com a skill stacktrail-educator identificou profundidade insuficiente
e discrepâncias de semântica que os testes anteriores não cobriam. As correções,
a matriz curricular, as fontes e a revisão independente estão em
[etapa-02-auditoria-pedagogica.md](etapa-02-auditoria-pedagogica.md). Esse relatório
registra a verificação mais recente; a validação anterior acima é histórica.
