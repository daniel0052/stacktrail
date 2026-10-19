# Desenvolvimento e operação

Guia atual de manutenção. Extraído e reorganizado do README em 19/10/2026; os detalhes curriculares e as evidências continuam nos relatórios específicos, sem duplicar suas contagens aqui. As instruções para agentes e as regras de contribuição permanecem em [AGENTS.md](../AGENTS.md).

## Ambiente e comandos

Node.js >=24.15.0 e npm, conforme `package.json`. Instalar com `npm ci`; iniciar com `npm run dev`. O caminho-base é `/stacktrail/`.

```bash
npm run typecheck
npm run lint
npm test -- --maxWorkers=2
npm run build
npm run test:ui
node scripts/check-practice-build.mjs
node scripts/check-practice-links.mjs
```

Playwright requer Chromium instalado e usa o build estático. O verificador de links registra GET/acesso, não adequação pedagógica. Resultados datados e limitações estão em [QUALITY_AUDIT.md](QUALITY_AUDIT.md) e [CONTENT_VERIFICATION.md](CONTENT_VERIFICATION.md); automação não certifica WCAG nem aprendizagem.

`npm run build` gera `dist/`; `npm run preview` permite inspecioná-lo. O build usa `public-roadmap/`, `HashRouter` e base `/stacktrail/`, conforme `vite.config.ts`. O workflow `.github/workflows/deploy.yml` publica no GitHub Pages. Repositório: https://github.com/daniel0052/stacktrail; endereço público configurado para o projeto: https://daniel0052.github.io/stacktrail/.

## Organização e legado

`src/practice/` separa conteúdo/catálogos, interface, progresso e conquistas. `public-roadmap/` contém os assets públicos atuais, incluindo capas locais. O [índice documental](README.md) distingue referências atuais de evidências históricas.

`npm run dev:legacy` e `npm run build:legacy` são explícitos, têm entrada/configuração separadas e geram os antigos pacotes de estudo. Código e assets legados são preservados e não integram o build principal. Não usar esses comandos para validar ou publicar a aplicação atual.

## Dados e limitações

O progresso é persistido automaticamente em `localStorage`, por origem, navegador e dispositivo. A plataforma não possui backend, autenticação, upload ou sincronização. Evite navegação privada para registros duradouros e não cole segredos ou projetos inteiros.

A chave `stacktrail:roadmap:1` usa esquema 2 e migra o piloto esquema 1 preservando preferências e rascunhos. A chave legada `backend-academy:progress` não é sobrescrita. Aulas antigas não equivalem a tópicos estudados; desafios antigos da 00 não são equiparados aos novos contratos. Falha de gravação preserva o estado em memória na sessão. Editar uma solução invalida seu checklist e revisão.

A navegação interna após carregar pode funcionar sem rede, mas não há service worker, instalação offline nem garantia de recarga sem conexão. Referências externas exigem rede. Prompts são editáveis e copiados por decisão do estudante, sem API ou envio automático; a plataforma não executa código do estudante, avalia automaticamente nem certifica domínio.

## Currículo e referências

O conteúdo e os critérios vigentes devem ser consultados na interface e nos catálogos `src/practice/stage-*.ts`, não em tabelas copiadas no README. Os relatórios de migração, incluindo [Etapa 05](STAGE_05_IMPLEMENTATION.md), registram decisões datadas e suas limitações. Catálogo de editora não equivale à leitura integral de uma obra. Fontes e atribuições de capas permanecem em CONTENT_VERIFICATION.md e nos inventários de qualidade.

Após integrar origin/main em 19/10/2026, Desenvolvimento Profissional e English Journey estão disponíveis em `/desenvolvimento-profissional` e `/ingles`. Os ícones em `docs/icons/` foram preservados com sua [licença](icons/LICENSE.md), e são reutilizados na tabela de tecnologias do README. Consulte também [SECURITY.md](../SECURITY.md).
