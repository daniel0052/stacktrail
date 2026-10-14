# Remoção de referências públicas e README

Validação em 14/10/2026.

## Alterações

- Roadmap: removidos `sourceUrl` e links externos dos 20 registros/cards. Apenas a Etapa 01 oferece acesso interno; as outras 19 permanecem em preparação.
- Aulas e autoavaliação: links de origem substituídos pelo plano interno da Etapa 01.
- Exercícios: removida a referência curricular externa dos nove registros; preservada a documentação oficial. Rótulos de referências ajustados.
- Aula HTML: atribuição textual ajustada, sem alteração do conteúdo didático.
- README: apresentação, funcionalidades reais, stack, estrutura, execução, publicação, organização curricular, IA, status e licença.
- Teste do roadmap: ajustado ao contrato sem URL externa.
- AGENTS.md e registros internos de proveniência preservados.

## Verificações efetivamente executadas

- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm run test`: 36 testes passaram em quatro arquivos.
- `npm run build`: passou, incluindo as 11 aulas MDX.
- Varredura de `src`, `public`, `dist`, README, HTML e configuração Vite: nenhuma referência pública ao Notion.
- Assets de `dist/index.html` resolvem para arquivos existentes sob `/stacktrail/`; `dist/.nojekyll` presente.
- Build servida em servidor estático local, sem fallback de SPA, sob `/stacktrail/`: HTTP 200.
- Navegador: 26 rotas internas abriram com título válido, incluindo 11 aulas, nove exercícios e páginas principais; nenhuma delas exibiu link ao Notion.
- Clicados os novos links internos da aula HTML e da autoavaliação: ambos abriram a Etapa 01.
- Cards: um link interno na Etapa 01 e nenhum link nas 19 etapas futuras.
- Referências oficiais observadas na aula HTML e no exercício de contato.
- README conferido com scripts, dependências, arquivos e configuração reais. Não existe LICENSE nem workflow de deploy.

## Limites

Compatibilidade local com a estrutura do GitHub Pages verificada. Não houve publicação, push ou verificação do domínio real. Os destinos externos da documentação não foram revalidados nesta tarefa. Não houve mudança de design ou nova auditoria completa de acessibilidade.

Captura: [roadmap](screenshots/roadmap-sem-links-externos.jpg).
