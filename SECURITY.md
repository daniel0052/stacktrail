# Segurança

Para relatar uma vulnerabilidade, use a opção privada “Report a vulnerability”
na aba Security do GitHub, caso esteja habilitada. Se não estiver disponível,
abra uma issue solicitando um canal privado, sem publicar detalhes exploráveis,
credenciais, dados pessoais ou provas de conceito sensíveis.

## Escopo do projeto

O StackTrail é uma aplicação estática. Não há autenticação, banco de dados ou API
própria de IA. Isso não elimina riscos na interface, dependências, importação de
progresso ou publicação.

Ao relatar um problema, indique a página e os passos para reproduzir, o comportamento
observado e o impacto esperado. Remova soluções pessoais e outros dados sensíveis
dos exemplos enviados.

Áreas que merecem atenção:

- Validação dos arquivos JSON de progresso e dos rascunhos importados.
- Parser e interpretador de fluxogramas: somente operações permitidas, com limites
  de execução; código JavaScript/TypeScript colado pelo aluno não deve ser executado.
- Exibição de textos e valores fornecidos pelo estudante, sem execução de HTML ou
  scripts vindos desses dados.
- Dependências, workflows de CI e permissões de publicação no GitHub Pages.

Casos adicionais do avaliador estão no código cliente e não são testes secretos.
Progresso e soluções ficam no armazenamento local do navegador e podem ser
exportados pelo estudante; não há promessa de sincronização ou armazenamento privado
em servidor.

## Cuidados ao contribuir

- Não versione credenciais, arquivos `.env`, chaves privadas ou backups pessoais.
- Todo conteúdo enviado ao navegador, inclusive variáveis `VITE_*`, é público.
- Se uma credencial vazar, revogue e substitua no serviço de origem; apagar o
  arquivo ou adicionar ao `.gitignore` não elimina o vazamento no histórico.
- Não cole segredos nas soluções dos exercícios ou nos arquivos de progresso.
- Atualizações do Dependabot precisam de revisão; não há merge automático.

## Proteções versionadas

- CI para pull requests: typecheck, lint, testes e build.
- Actions fixadas por SHA e checkout sem persistir credenciais.
- Token com leitura por padrão; publicação limitada ao job de deploy.
- Dependabot semanal para npm e GitHub Actions.

## Configurações administrativas a conferir no GitHub

Estes arquivos não ativam regras administrativas por conta própria:

- Proteger `main` contra force push e exclusão; exigir pull request e o check
  `Validate` após sua primeira execução bem-sucedida. Se houver apenas um
  mantenedor, não exigir aprovação de outra pessoa para evitar bloqueio.
- Habilitar Secret scanning, Push protection, Dependabot alerts e private
  vulnerability reporting, conforme disponibilidade na conta.
- Proteger a conta com autenticação de dois fatores e revisar colaboradores.

Nenhuma auditoria integral do histórico de segredos é declarada por este arquivo.
