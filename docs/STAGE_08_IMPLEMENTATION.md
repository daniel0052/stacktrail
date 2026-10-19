# Etapa 08 — Docker, CI/CD, deploy e Kubernetes

Implementação em19/10/2026. Currículo: anexo integral do usuário, “StackTrail2.0 — Implementação completa da Etapa08”. O anexo autoriza esta migração e dispensa descoberta de outra fonte curricular no Notion. Referências técnicas foram consultadas separadamente; currículo não é prova técnica. Nenhum commit, push, conta, infraestrutura ou deploy do StackTrail realizado.

## Escopo e progressão

A etapa prepara a entrega e operação inicial de uma API na stack PHP/Laravel **ou** TypeScript/Node.js/Express. Kubernetes/KinD fazem parte do núcleo, não são adiados. Sem microsserviços, Helm, ingress gerenciado, nuvem paga ou administração avançada obrigatórios. A09 conserva seus metadados de projeto final e continua pendente: consolida domínio/portfólio, enquanto08 concentra as seis entregas operacionais sem exigir reimplementar o negócio.

| Módulo | Tópico estável | Exercícios | Evidência principal |
| --- | --- | --- | --- |
|01 Preparação produção|08-producao|01–02|Configuração reproduzível, saúde e logs sanitizados|
|02 Docker|08-docker|03–05|Imagem, contexto/cache, execução e diagnóstico|
|03 Compose|08-compose|06–07|Dois serviços, readiness, comunicação e persistência|
|04 CI/CD|08-ci|08–09|Lint/testes/build, falha bloqueante e permissões mínimas|
|05 Deploy|08-deploy|10–11|Destino controlado, saúde, versão e retorno|
|06 Kubernetes|08-kubernetes|12–13|Recursos/estado desejado, configuração e probes|
|07 KinD|08-kind|14–16|Imagem local, acesso, réplicas, atualização e falha|
|08 Integrador|08-integracao|Projeto e retomada10/14/15/16|Seis entregas documentadas|

Oito tópicos comuns + um runtime da stack escolhida = **9 tópicos base por trilha**. Os IDs de runtime são08-runtime-php/08-runtime-javascript. São16 exercícios:5iniciais (01/02/03/04/12),6intermediários (05/06/07/08/10/13) e5avançados (09/11/14/15/16), distribuídos por e-commerce, logística e agendamentos fictícios. Um integrador08-project-delivery, nível avançado, seis entregas. Não há projetos artificiais adicionais para preencher dificuldades.

Critério autoral de conclusão:9 tópicos registrados,16 exercícios por autoavaliação, integrador e síntese na única stack escolhida. Todas as atividades08 são obrigatórias; extensões do projeto são opcionais. Percentual e conquistas são declarações locais reversíveis, não aprendizagem certificada. Módulos com details exclusivos começam fechados; links levam a objetivos, fontes e exercícios específicos. Listas de atividades mantêm lote12, filtros combinados e contexto08.

## Cobertura dos objetivos curriculares

| Objetivos do anexo | Prática/evidência |
| --- | --- |
|1–3 Ambientes/variáveis/segredos|01, módulo01 e entrega1|
|4–7 Imagens/Dockerfile/ignore/build-run|03–05 e entrega2|
|8–11 Redes/volumes/Compose/API+PostgreSQL|06–07 e entrega3|
|12–14 CI lint/test/build e distinçãoCD|08–09 e entrega4|
|15–17 Deploy/falha/logs/saúde|10–11 e entrega5|
|18–20 Orquestração/Compose/recursos|12–13, módulo06|
|21–23 kubectl/KinD/API|14 e entrega6|
|24–26 Réplicas/atualização/diagnóstico|15–16 e entrega6|
|27 Documentação|README técnico, decisões e evidências do integrador|

Exercícios agrupam operações relacionadas do currículo em contratos verticais; não são quizzes nem uma atividade rasa por comando. As fontes externas fornecem explicações e exemplos; o catálogo oferece objetivos, requisitos, casos adversos e três pistas sem solução.

## Equivalência e limites de execução

- Laravel: runtime suportado de produção, por exemplo Nginx/PHP-FPM, document root public, permissões específicas e migrations controladas. `artisan serve` não é proposto como produção.
- Express: `tsc` gera JavaScript; Node executa artefatos sem watcher, com configuração e encerramento documentados. Fonte Node específica de transpilação e Express shutdown conferidas.
- `activityForTrack` resolve a prosa de runtime com índices de checklist estáveis; UI e três prompts usam o mesmo contrato. Referências visuais e de prompts excluem a outra stack quando específicas.
- Deploy pode ser demonstrado integralmente em ambiente próprio controlado; não recomenda fornecedor “gratuito” nem exige conta/cartão. HTTPS/domínio são planejamento para exposição pública; demonstração local identifica seus limites.
- KinD exige provider compatível, SO, virtualização, memória/disco disponíveis e imagens compatíveis. Não há mínimo universal de hardware inventado. Se execução inviável, análise de manifests anotados e logs/eventos-fixture identificados cobre as decisões sem fingir cluster/rollout executados. A conclusão declara esse percurso, não comprova a competência de operação real; a lacuna prática permanece explícita até execução em ambiente compatível.
- Apenas portas publicadas no host e port-forward ficam no loopback. Bind interno do container/Pod deve permitir o tráfego interno necessário. A plataforma não executa comandos do estudante.

## Laboratórios e prompts

Todos17 IDs (16 exercícios + integrador) têm classificação explícita B ou C em preparation.ts:9laboratórios gerados e8continuações, sempre com alternativa a projeto próprio. Estados iniciais não incluem melhoria, causa, patch, suíte-alvo ou relatório que o estudante deve produzir.01/02/03/06/08/10/13/14/integrador não recebem infraestrutura final que lhes cabe criar; os demais recebem somente o mínimo anterior e/ou sintoma necessário à investigação.

Preparadora gera base mínima e exige validação honesta, tutora solicita tentativa e dá a próxima pista, revisora pede artefatos/logs/configuração/testes/evidências e usa quatro estados sem nota automática. Prompts editáveis e cópia explícita; nenhuma API/envio automático. Documentos bastam nas atividades de interpretação/revisão, sem exigir backend adicional.

## Persistência e compatibilidade

Esquema2 e chave atual preservados.08 aceita tentativas com08-ex-NN@php/@javascript e08-project-delivery@stack, sem compartilhar solução, dicas, revisão ou conclusão entre stacks. `deliveryEvidence` opcional mantém sínteses por stack. Dados esquema2 anteriores sem08 são aceitos; IDs/tipos desconhecidos são rejeitados.07 e áreas complementares preservadas. Parar mantém texto/checklist; editar solução invalida verificação; reabrir reduz percentual.09–19 continuam indisponíveis para conclusão.

## Fontes e livros

25 referências gratuitas em inglês/português, distribuídas por Docker, GitHub Actions, Kubernetes, KinD, Laravel, Node/Express, PostgreSQL e DevOps1. Fontes, recortes, versões/idiomas, acesso e limitações em [source-review.md](quality/stage08/source-review.md). DevOps1: Hermano Pereira/UTFPR Guarapuava, atualização declarada agosto2026; consulta de módulos específicos, não leitura integral. Uso complementar com ressalvas a requests/limits e KinD/produção; não copiar soluções externas.

Dois livros opcionais PT-BR, catálogos oficiais conferidos: **Kubernetes**, Lucas Santos (Casa do Código2019, ISBN9788572540247), e **DevOps nativo de nuvem com Kubernetes**, John Arundel/Justin Domingus (Novatec2019, ISBN9788575227787). Edição não confirmada é explicitada, ano/atualidade e disponibilidade possuem ressalvas. Não alegada leitura integral nem consenso comunitário. Alternativas gratuitas por assunto presentes.

**Capas:** após lembrete expresso do usuário para buscar e salvar as imagens, duas capas reais dos catálogos oficiais foram baixadas, conferidas visualmente e otimizadas em WebP. Cópias solicitadas em `public/assets/books/stage08/`; cópias servidas pelo build em `public-roadmap/assets/books/stage08/`. Cards usam `assets/books/stage08/...webp`, sem hotlink e com fallback em erro. Origens, dimensões e direitos registrados em `quality/stage08/book-covers.json`. Os direitos editoriais permanecem dos titulares; não foi comprovada nem atribuída licença livre. São imagens de identificação bibliográfica solicitadas, sem links de compra ou reprodução da obra integral. Não declarar autorização geral da editora a partir do catálogo.

## Auditorias, evidências e pendências

- [Revisão educacional independente](quality/stage08/educator-review.md): achados iniciais e reconferência após correções.
- [Revisão técnica independente](quality/stage08/source-review.md): fontes e contraexemplos, incluindo ajustes de URL/idioma/stack.
- [Revisão UI independente](quality/stage08/ui-review.md): matriz de rotas/larguras, teclado, filtros, isolamento e reconferência de nomes acessíveis.
- `src/tests/stage-eight.test.ts`: catálogo, compatibilidade, conclusão/reversão, stacks e prompts; `e2e/stage-eight.spec.ts`: fluxos reais e inventário08.

Resultados finais e limitações de testes devem ser lidos junto ao registro datado em QUALITY_AUDIT.md. Nenhuma execução real de Docker, Compose, KinD, API do estudante ou workflow externo foi realizada por esta implementação. A auditoria valida contratos e a interface, não futuros ambientes gerados por IA externa. Sem licença geral/capas livres inventadas; sem certificação WCAG completa por resultado axe.

### Resultados finais

Typecheck, lint, build, isolamento e diff-check passaram;488 testes em50 arquivos passaram. No navegador:40 regressões anteriores passaram na rodada global, além do inventário08; após corrigir3 falhas do harness, rodada única dos4 testes08 passou no build final com capas. São44 casos distintos com resultado mais recente passado, conciliados em `quality/stage08/validation-summary.json`; o relatório não apresenta a primeira rodada como44/44 verde. Zoom real200/400 nos dois temas passou separadamente, incluindo4 rotas08, com `chrome.tabs.setZoom/getZoom`.40 arquivos no build, sem legado distribuído; chunk >500kB permanece como alerta de otimização.

As duas capas reais agora estão locais e carregam com o prefixo `/stacktrail/`; cópias public/public-roadmap conferidas por SHA256. Pendências/limites reais: licença livre não comprovada, nenhuma infraestrutura de laboratório do estudante executada, nenhuma garantia de futuros códigos gerados por IA externa. Sem commit/push/deploy.
