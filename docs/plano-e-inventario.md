> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Plano e inventário — ETAPA 01

Consulta via MCP do Notion em 14/10/2026. Repositório inicial: somente README e AGENTS.md; não havia aplicação nem testes. AGENTS.md preservado.

## Fontes curriculares lidas

- [Roadmap pai](https://app.notion.com/p/3f53cadfab7781b68266d8e1eeceeb81)
- [Roadmap guiado](https://app.notion.com/p/3f53cadfab778127857ef57e2220f721)
- [ETAPA 01 completa](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a)

Ferramentas descobertas: `notion_get_tool_access` e `notion_fetch`. Fetch disponível; busca AI exige plano, mas não foi necessária para URLs conhecidas. As respostas incluíram o conteúdo até `</content></page>`, sem indicadores de truncamento ou blocos desconhecidos. As subseções e detalhes estavam expandidos no Markdown retornado. Não há páginas filhas na ETAPA 01 que forneçam enunciados adicionais. Não foi necessário consultar a biblioteca inteira nem outras etapas. Nenhuma escrita no Notion.

A página geral conserva um resumo antigo com JS/React/Vue; a ETAPA 01 específica, editada em 14/10/2026, determina TypeScript principal e exclui Vue. Usamos a página específica para escopo e obrigatoriedade. Checkbox já marcado no Notion não inicializa o progresso de quem usa a plataforma.

## Inventário integral da etapa

Objetivo: revisar HTML/CSS, aprender fundamentos JavaScript dentro de TypeScript e dominar navegador ↔ API. Diagnóstico inicial sem consulta de 30–45 minutos; revisar dificuldades; reproduzir exemplos próprios; testar manualmente; receber revisão consultiva e corrigir; publicar um integrado no GitHub.

| Bloco original | Conteúdos e atividade preservados | Destino |
| --- | --- | --- |
| 1. HTML | Documento, landmarks, headings, links, alt, listas, tabelas, form/label/inputs/name/type/required/minlength/pattern, teclado, foco, aria, GET/POST, cliente vs servidor. Agendamento sem CSS pelo teclado. | html.mdx |
| 2. CSS | Seletores, especificidade, cascata, herança, box model, display/position, espaçamento, unidades, Flexbox/Grid, mobile-first, media queries, imagens, tipografia, contraste, estados, variáveis, organização e DevTools. Agendamento responsivo sem framework. | css.mdx |
| 3. TS | strict/compilação, let/const, primitivos, inferência, igualdade/truthiness/null, funções/escopo/closures, arrays/objetos/desestruturação/spread/rest/map/filter/find/reduce, type/interface/readonly/union/narrowing, generics/Partial/Pick/Omit/Record, unknown, módulos, try/catch, DOM/eventos/delegação/renderização segura, Promise/async/await/all, JSON/runtime, Console/Network/Sources/breakpoints. Validar formulário sem reload. | fundamentos, tipos, dom, assincrono |
| 4. Browser ↔ Backend | Método/URL/path/query/headers/body/response/status; GET/POST/PUT/PATCH/DELETE; 200/201/204/400/401/403/404/409/422/500; fetch/ok/status/json/Content-Type/Authorization; erros rede/HTTP/JSON; loading/sucesso/erro/vazio e duplo envio; CORS/origem/OPTIONS/credenciais; cookies/local/sessionStorage/XSS/tokens; FormData/JSON/query/encodeURIComponent; validação no servidor e segredos. API ou mock tipado com runtime validation e Network. | http, seguranca |
| 5. Tailwind | Opcional após CSS puro; familiarização 2–4h, utilitários, breakpoints, estados e CSS gerado; comparar componente nas duas abordagens. | tailwind |
| 6. Laboratório | 9 desafios em 3 níveis; HTML + CSS + TS strict desde o início, README/commits/validação externa. Requisitos e critérios estruturados em exercises.ts. | /laboratorio |
| 7. IA/rubrica | Pedir evidências; não compartilhar segredos; não fornecer solução pronta; pistas graduais. Pesos 30/15/15/20/15/5; sugestão ≥8 sem bloqueantes e demonstração real; IA consultiva. | /autoavaliacao e prompt do laboratório |
| 8. Portfólio | frontend-for-backend-lab, README, pastas por exercício, commits, checklist manual, request/response/Network sem dados sensíveis; vídeo de avançado e postagem LinkedIn como recomendações de portfólio. | /autoavaliacao |
| 9. Avanço | 7 competências de autoavaliação; 3 iniciais + ≥1 intermediário integrado; fundamentos demonstrados, strict/testes/README; avançados opcionais. | progresso e /autoavaliacao |
| 10. React/Next | Ambos opcionais; React antes de Next. TSX/composição/props/estado/eventos/keys/effects/API/roteamento e limites backend. Next/App Router/layouts/server/client/use client/renderização/Route Handlers/BFF/segredos/cookies/cache. Exercícios opcionais e miniprojeto de reservas. Não priorizar estado/performance/edge/deploy avançados. | react, next |

## Nove desafios

1. Contato: nome, email, telefone opcional, mensagem; CSS puro, teclado/foco/erros, TS, resumo textContent.
2. Tarefas: adicionar/concluir/filtrar/excluir; localStorage validado, vazio e DOM seguro.
3. Catálogo local: array tipado, nome/preço/categoria; busca/filtro/ordem combinados, teclado e separação de lógica.
4. Usuários/API: lista/detalhes/busca, loading/erro/vazio/retry, ok e Network, sem resultados hardcoded; abort opcional.
5. Agendamento/mock: nome/data/horário/serviço, POST JSON/GET, falhas/duplo clique/409, sem credenciais e revalidação no backend.
6. Livros: busca/título/categoria/paginação/favoritos, API ou mock assíncrono, funções TS sem framework, loading/erro/mobile-first.
7. Administração (aprofundamento opcional): modular TS, form/lista, GET/POST/PATCH/DELETE, filtros/paginação/estados, autorização backend.
8. Carrinho (aprofundamento opcional): catálogo/endpoints, busca/filtro, persistência/quantidade/totais/validação, checkout sem pagamento; servidor confere preço/estoque.
9. CSS vs Tailwind (opcional): recriar interface, manter semântica/funcionalidade, comparar manutenção/responsividade/acessibilidade/tamanho.

Pré-requisitos pedagógicos das aulas e dicas são explicação elaborada: fundamentos da Etapa 00 são recomendados pelo roadmap geral, mas React/Next/Tailwind não são pré-requisitos. Dicas e ideias de teste são próprias, não citações do Notion.

## Plano de implementação

React/TS strict/Vite, Tailwind 4, Router e MDX. Rotas `/`, `/aulas/:slug`, `/laboratorio`, `/laboratorio/:slug`, `/autoavaliacao`. Conteúdo em `src/content/stage-01`, UI em componentes/app, estado em features/progress. Sequência vertical: shell → HTML → contato → persistência → expansão de aulas/desafios → auditoria.

Progresso v1: aulas lidas, rascunhos/reflexões, dicas reveladas, critérios marcados, status por exercício e competências. Validação em runtime, versões futuras rejeitadas sem sobrescrever, falha de storage visível, export/import manual. Sem sincronização e sem correção técnica. Avanço exige autoavaliação e 3 iniciais + 1 intermediário, nunca opcionais.

## Complementos técnicos consultados

Em 14/10/2026: Vite Guide (Node 20.19+/22.12+), Tailwind/Vite, MDX Rollup, React Router declarativo, TypeScript narrowing, MDN Fetch/CORS/Grid, WAI Forms, React Learn, Next Server/Client. Versões e peers consultados via npm antes da instalação; Node local 24.21.0. TS 5.9.3 escolhido por compatibilidade com typescript-eslint (<6.1), evitando latest TS 7. Syntax highlight: rehype-highlight, executado no build, sem injeção de código do aluno. Referências adicionais do roadmap são links para estudo, não alegação de auditoria completa de cada documentação.
