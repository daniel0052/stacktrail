# Validação — 23/10/2026

- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm test -- --maxWorkers=2`: 57 arquivos, 559 testes passaram. Inclui estado13, compatibilidade esquema 2, isolamento por stack, invalidar avaliação/checklist/conclusão ao editar Audit, contratos/prompts e fontes existentes.
- `npm run build`: passou; aviso de chunk principal maior que 500 kB mantido. Nenhuma dependência adicionada. `node scripts/check-practice-build.mjs`: 82 arquivos; sem pacotes de estudo, ZIP, MDX ou entry legado; sentinelas adicionais passaram, sem alegar auditoria universal.
- `node scripts/check-practice-links.mjs --stage=13`: 39 URLs/39 sucessos GET. Adequação documental revisada separadamente; HTTP200 não prova conteúdo apropriado.
- `node scripts/audit-book-covers.mjs`: 53 imagens locais, nenhum arquivo ausente, hotlink ou divergência de espelho. Uma licença efetivamente registrada; ausência de licença não bloqueia identificação bibliográfica conforme política vigente.
- Navegador: cenários de lifecycle/filtros/prompts/cópia/foco/persistência/conclusão nas duas stacks passaram na reconferência. Audit, recarga, isolamento, pausa/reversão e preservação12/legado/Toolkit passaram. A primeira fixture “inexistente” encontrou texto válido; corrigida para token sem correspondência.

Suíte completa `npm run test:ui`:92 cenários executados,91 passaram na rodada integral (12,1 min). O único restante procurava o rótulo antigo “Começar atividade”; o seletor correto é “Iniciar atividade”. Reconferência isolada passou (1/1):os92 cenários únicos estão aprovados após essa correção. Logs em browser/full-suite.log e browser/audit-regression.log.

As 489 entradas do inventário de rotas passaram nos dois temas, sem erros JavaScript ou violações axe que falhassem as assertivas. A Etapa 13 passou em 11 destinos, larguras 320/375/768/1024/1440, fonte 150%, teclado/foco/modais, duas stacks, capas e estado. Zoom real 200/400 validado pela API do navegador, innerWidth, DPR, scrollWidth e modal; inclui overview, exercício, integrador e Audit. Capturas normais 375/1440 e módulo/Audit/livros inspecionados visualmente. As capturas fullPage em zoom 400 apresentam recorte do mecanismo Chromium/Playwright e não servem como prova visual integral do reflow; as assertivas reais de zoom/interação passaram. Resultados incompletos do axe não constituem aprovação manual universal; nenhuma certificação WCAG é feita.

A cópia do Audit vazio não cria tentativa. Editar pelo editor principal também apaga avaliação externa anterior/checklist/conclusão; reabrir a página dedicada preserva o texto. Etapa 12, legado e Toolkit permanecem preservados nas regressões executadas.

Sem pendências funcionais identificadas no recorte. Permanece o aviso de tamanho de bundle; nenhuma redução ou medição de performance do backend foi inventada. A primeira tentativa do teste de zoom tinha endereço de fixture incorreto; corrigido para loopback 127.0.0.1. Testes antigos de capas ainda esperavam placeholders; expectativas atualizadas à política vigente e fallback real preservado. Nenhum backend, k6, PostgreSQL, Redis ou código gerado externamente foi executado. Testes da plataforma não certificam capacidade, aprendizagem ou WCAG completa.
