export type PlanningConcept={id:string;name:string;definition:string;explanation:string;example:string;when:string;limitations:string;mistake:string;source:string};
export type ConceptGroup={id:string;name:string;concepts:PlanningConcept[]};
type ConceptSpec=[string,string,string,string,string,string,string,string];
const conceptSources:Record<string,string>={'software-architecture':'c4','tech-stack':'adr','database-design':'data','data-modeling':'data','api-contracts':'api','architecture-decision-records':'adr','non-functional-requirements':'architecture','security-requirements':'security','testing-strategy':'testing','deployment-strategy':'deployment','rules':'codex-rules','hooks':'codex-hooks','agents':'codex-agents','subagents':'codex-agents','commands':'codex-skills','workflows':'codex-skills','mcp':'mcp'};
function concepts(source:string,items:ConceptSpec[]):PlanningConcept[]{return items.map(([id,name,definition,explanation,example,when,limitations,mistake])=>({id,name,definition,explanation,example,when,limitations,mistake,source:conceptSources[id]??source}));}
export const planningConceptGroups:ConceptGroup[]=[
 {id:'discovery',name:'Project Planning',concepts:concepts('ireb',[
  ['project-discovery','Project Discovery','Investigação do problema antes de decidir a solução.','Converse com quem vive o problema e registre o que ainda precisa conferir.','Uma oficina perde horários de manutenção; descubra como agenda hoje.','Antes de escolher funcionalidades e ferramentas.','Uma entrevista não representa todos os usuários.','Começar pela tecnologia sem entender o problema.'],
  ['requirements-engineering','Requirements Engineering','Trabalho de descobrir, registrar e validar necessidades.','Confronte necessidades com restrições e exemplos observáveis.','Confirmar se duas reservas podem ocupar o mesmo horário.','Ao transformar uma ideia em um contrato verificável.','Requisitos mudam e precisam de revisão.','Tratar a primeira conversa como contrato definitivo.'],
  ['stakeholders','Stakeholders','Pessoas ou grupos afetados pelas decisões do projeto.','Inclua quem usa, opera, financia e mantém o sistema.','Cliente agenda; atendente reorganiza; gestor acompanha capacidade.','Na descoberta e na validação de conflitos.','Uma pessoa pode representar interesses diferentes.','Ouvir somente quem paga pelo sistema.'],
  ['product-goals','Product Goals','Resultados que o produto pretende alcançar.','Defina resultado e como observar se houve melhora.','Reduzir faltas registradas pela oficina, com período e referência acordados.','Para priorizar o que merece entrar no projeto.','Meta ainda sem medição é uma hipótese.','Confundir uma tela pronta com resultado de negócio.'],
  ['mvp','MVP','Recorte mínimo para testar valor com usuários.','Escolha um fluxo útil completo e declare o que fica para depois.','Criar, consultar e cancelar agendamento; campanhas ficam fora.','Quando orçamento e incerteza pedem aprendizagem gradual.','Mínimo não dispensa segurança ou integridade.','Chamar qualquer protótipo incompleto de MVP.'],
  ['project-scope','Project Scope','Limites do trabalho incluído e excluído.','Registre entregas e exclusões para avaliar novos pedidos.','Agenda de uma unidade, sem pagamentos ou franquias.','Ao negociar entregas e mudanças.','Escopo aprovado pode mudar com nova decisão registrada.','Aceitar uma integração sem rever prazo e dependências.'],
  ['constraints','Constraints','Limites que restringem opções do projeto.','Separe restrição confirmada de preferência negociável.','Equipe conhece PHP; orçamento não permite serviço pago.','Antes de propor stack e arquitetura.','Uma restrição presumida precisa de confirmação.','Apresentar preferência pessoal como obrigação.'],
  ['assumptions','Assumptions','Premissas provisórias ainda sem confirmação.','Registre evidência necessária, responsável e efeito se forem falsas.','ASSUMPTION: conexão da oficina é estável; conferir no local.','Quando uma decisão depende de informação ausente.','Assumir não torna algo verdadeiro.','Esconder uma hipótese dentro de requisito obrigatório.'],
 ])},
 {id:'requirements',name:'Requirements',concepts:concepts('ireb',[
  ['functional-requirements','Functional Requirements','Comportamentos que o sistema deve oferecer.','Descreva ação, condições e resultado observável.','Atendente cancela reserva confirmada e libera o horário.','Para especificar fluxos do MVP.','Texto sozinho pode deixar casos ambíguos.','Escrever apenas “ter cadastro” sem contrato.'],
  ['non-functional-requirements','Non-Functional Requirements','Qualidades e restrições de funcionamento.','Defina metas mensuráveis e condições de avaliação.','Acordar tempo de resposta para consulta sob uma carga declarada.','Ao discutir segurança, operação e capacidade.','Meta sem carga ou ambiente não permite comparar resultados.','Pedir “rápido e seguro” sem evidência esperada.'],
  ['business-rules','Business Rules','Regras do domínio que restringem comportamentos.','Explicite invariantes, estados e exceções aprovadas.','Cancelamento é permitido até o limite definido pela oficina.','Ao descobrir limites, aprovações e transições.','A equipe precisa confirmar a regra com o domínio.','Inventar prazo de cancelamento porque parece comum.'],
  ['user-roles','User Roles','Perfis com responsabilidades no sistema.','Modele a finalidade do perfil antes das permissões.','Cliente gerencia suas reservas; atendente gerencia a agenda local.','Na descoberta de usuários e responsabilidades.','Perfil não substitui verificação de propriedade do recurso.','Criar um perfil diferente para cada pessoa.'],
  ['permissions','Permissions','Ações permitidas sobre recursos em determinado contexto.','Relacione perfil, ação, recurso e condição de acesso.','Cliente só consulta reservas que lhe pertencem.','Para especificar autorização e testes negativos.','Esconder botão não protege o recurso no servidor.','Conferir apenas se o usuário fez login.'],
  ['user-stories','User Stories','Necessidades descritas pela perspectiva de quem usa.','Relacione pessoa, intenção e valor; acrescente critérios.','Como atendente, quero ver horários livres para oferecer uma nova reserva.','Para conversar e priorizar fluxos de uso.','O formato da frase não garante entendimento.','Tratar uma história como especificação técnica completa.'],
  ['acceptance-criteria','Acceptance Criteria','Condições observáveis para aceitar uma entrega.','Inclua sucesso, rejeição e limites relevantes.','Reserva cancelada deixa de ocupar horário; repetir cancelamento não altera capacidade.','Antes de implementar e ao revisar a entrega.','Critérios mal escolhidos podem deixar risco sem cobertura.','Medir só quantidade de arquivos ou testes.'],
 ])},
 {id:'technical-planning',name:'Technical Planning',concepts:concepts('architecture',[
  ['tech-stack','Tech Stack','Conjunto de tecnologias escolhido para o projeto.','Compare adequação, experiência, manutenção, custo e hospedagem.','Laravel ou Express pode atender à mesma API; escolha uma alternativa justificada.','Após conhecer contexto, equipe e restrições.','Popularidade não comprova adequação ao problema.','Exigir duas stacks para uma única necessidade.'],
  ['software-architecture','Software Architecture','Organização das partes e de suas relações.','Descreva limites, responsabilidades e consequências das escolhas.','Separar regras de reserva da integração com notificações.','Quando decisões afetam manutenção e evolução.','Diagrama não comprova funcionamento ou escala.','Escolher microsserviços sem necessidade ou capacidade operacional.'],
  ['database-design','Database Design','Planejamento da persistência e da integridade dos dados.','Confronte regras do domínio com chaves, restrições e transações.','Impedir reservas incompatíveis, definindo o contrato para concorrência.','Quando o projeto precisa persistir estado.','Pode não ser necessário num protótipo documental ou ferramenta estática.','Criar tabelas antes de entender as regras.'],
  ['data-modeling','Data Modeling','Representação de entidades, atributos e relacionamentos.','Use linguagem do domínio e identifique cardinalidade e obrigatoriedade.','Uma unidade tem horários; cada reserva associa cliente e horário.','Ao esclarecer dados e invariantes.','O modelo inicial não determina sozinho o esquema físico.','Confundir uma tela com uma entidade obrigatória.'],
  ['api-contracts','API Contracts','Acordos sobre entradas, saídas e erros de interfaces.','Declare método, recurso, autorização, validação e resposta.','Cancelar reserva exige identidade autorizada e define resposta para repetição.','Quando partes ou integrações trocam dados.','Contrato não garante que a implementação o cumpra.','Documentar somente a resposta de sucesso.'],
  ['security-requirements','Security Requirements','Condições de proteção de dados e operações.','Parta dos riscos e defina verificações de acesso e uso de dados.','Negar acesso à reserva de outro cliente e não registrar credenciais.','Desde a descoberta e em mudanças sensíveis.','Rules de IA não substituem controles técnicos.','Adiar autorização até depois da interface.'],
  ['testing-strategy','Testing Strategy','Escolha de como obter evidências de qualidade.','Ligue riscos e critérios a testes e evidências de revisão.','Verificar cancelamento, repetição, acesso alheio e concorrência conforme o escopo.','Antes de implementar e ao planejar validação.','Plano de testes não é teste executado.','Afirmar que passou sem registrar execução.'],
  ['deployment-strategy','Deployment Strategy','Plano de entrega e operação no ambiente escolhido.','Considere configuração, migração, observabilidade, backup e reversão quando aplicáveis.','Publicar em ambiente controlado após ensaio local e aprovação.','Quando o produto será disponibilizado a usuários.','Ambiente gratuito pode limitar dados e disponibilidade.','Confundir planejamento com autorização para publicar.'],
  ['architecture-decision-records','Architecture Decision Records','Registros curtos de decisões arquiteturais significativas.','Documente contexto, alternativas, decisão e consequências.','Registrar por que uma aplicação modular atende melhor à equipe atual.','Quando há uma decisão real com consequências duradouras.','Não é necessário criar um ADR para cada detalhe.','Inventar uma decisão aceita para preencher uma pasta.'],
 ])},
 {id:'agent-configuration',name:'AI Agent Configuration',concepts:concepts('skills',[
  ['rules','Rules','Instruções persistentes para orientar o agente.','Registre contexto, padrões, limites de mudança e decisões que exigem aprovação.','Pedir revisão antes de sobrescrever documentos aprovados.','Quando há acordos recorrentes no projeto.','São instruções; não uma barreira de segurança.','Acreditar que uma regra impede acesso a segredos por si só.'],
  ['skills','Skills','Procedimentos reutilizáveis para tarefas delimitadas.','Uma Skill combina instruções e recursos com condição clara de uso.','Documentation Review confronta requisitos e decisões sem alterar arquivos.','Quando o procedimento se repete e a plataforma o reconhece.','Caminhos e descoberta dependem da plataforma.','Criar várias Skills equivalentes sem motivo.'],
  ['workflows','Workflows','Sequências de etapas com entradas e saídas.','Defina descoberta → requisitos → arquitetura → revisão → aprovação.','Somente gerar arquivos após a pessoa confirmar o plano.','Para organizar trabalho e checkpoints.','Nem toda plataforma tem diretório próprio de Workflows.','Criar workflows/ esperando que qualquer agente o carregue.'],
  ['hooks','Hooks','Ações ligadas a eventos do agente.','Podem auxiliar validações, mas executam comandos com permissões do ambiente.','Após edição, um Hook revisado pode solicitar ou executar uma checagem local aprovada.','Se houver repetição, suporte confirmado e benefício concreto.','Eventos e execução variam; não provam correção do conteúdo.','Instalar comando desconhecido como proteção automática.'],
  ['agents','Agents','Assistentes capazes de trabalhar com ferramentas.','Defina responsabilidade, acesso, entrega e critério de parada.','Requirements Analyst investiga contradições sem escrever código.','Quando delegar uma tarefa tem objetivo e limites claros.','Autonomia não remove responsabilidade humana.','Autorizar mudança ampla sem revisão.'],
  ['subagents','Subagents','Agentes especializados usados dentro de um fluxo maior.','Podem separar investigação e revisão quando a ferramenta permite.','QA Reviewer confronta critérios; não aprova o próprio trabalho de implementação.','Quando uma revisão independente justifica coordenação adicional.','Têm custos e limites; suporte depende da superfície.','Criar um agente para cada documento por padrão.'],
  ['commands','Commands','Atalhos para executar procedimentos reconhecidos.','Use o formato de comando ou equivalente documentado pelo cliente.','Invocar uma Skill de revisão ou um prompt file, conforme a plataforma.','Quando o usuário precisa iniciar uma tarefa repetida.','Comando do agente não é necessariamente um comando de terminal.','Inventar uma pasta commands/ universal.'],
  ['mcp','MCP','Protocolo para integrar agentes a ferramentas e recursos.','Defina servidor, escopo e permissões; credenciais ficam fora do projeto.','Consultar documentação por um servidor de leitura previamente aprovado.','Só quando a integração atende uma necessidade real.','Servidor conectado pode expor dados ou oferecer ações sensíveis.','Copiar tokens reais para um arquivo versionado.'],
 ])},
];

export type PlanningDocument={path:string;purpose:string;contents:string;condition:string};
export const planningDocuments:PlanningDocument[]=[
 {path:'README.md',purpose:'Apresentação e entrada do projeto.',contents:'Problema, público, escopo, estado do planejamento e links.',condition:'Base recomendada; não inventar comandos de instalação antes de existir aplicação.'},
 {path:'docs/PRD.md',purpose:'Objetivos e recorte do produto.',contents:'Stakeholders, Product Goals, MVP, exclusões, Constraints e Assumptions.',condition:'Consolidar com README em projetos pequenos se isso reduzir duplicação.'},
 {path:'docs/BUSINESS_RULES.md',purpose:'Contrato do domínio.',contents:'Invariantes, estados, transições, exceções e responsáveis por confirmar.',condition:'Somente regras confirmadas ou premissas identificadas.'},
 {path:'docs/FUNCTIONAL_REQUIREMENTS.md',purpose:'Comportamentos observáveis.',contents:'IDs, fluxo, validação, erros, perfis e rastreabilidade.',condition:'Agrupar com histórias em projetos pequenos quando não perder clareza.'},
 {path:'docs/NON_FUNCTIONAL_REQUIREMENTS.md',purpose:'Qualidade e limites mensuráveis.',contents:'Segurança, desempenho, disponibilidade, privacidade e backup conforme necessidade.',condition:'Metas ainda desconhecidas ficam OPEN, nunca garantidas.'},
 {path:'docs/USER_STORIES.md',purpose:'Valor para cada perfil.',contents:'Pessoa, necessidade, benefício e Acceptance Criteria.',condition:'Incluir fluxos relevantes; não repetir requisitos sem agregar valor.'},
 {path:'docs/ARCHITECTURE.md',purpose:'Limites e relações do sistema.',contents:'Tech Stack, alternativas, trade-offs, dependências e Deployment Strategy.',condition:'Proposta proporcional; não alegar escala ou disponibilidade sem evidência.'},
 {path:'docs/DATA_MODEL.md',purpose:'Modelo e integridade dos dados.',contents:'Entidades, atributos, relacionamentos, unicidade e transações.',condition:'Somente se houver dados a modelar; justificar quando não se aplica.'},
 {path:'docs/API_CONTRACTS.md',purpose:'Contratos entre partes.',contents:'Operações, entradas, saídas, autorização, erros e repetição.',condition:'Somente com interfaces/APIs no escopo; não criar integração fictícia.'},
 {path:'docs/TEST_STRATEGY.md',purpose:'Plano de evidências de qualidade.',contents:'Riscos, critérios, cenários negativos, tipos de teste e limites de execução.',condition:'Planejado é diferente de executado.'},
 {path:'docs/OPEN_DECISIONS.md',purpose:'Incertezas rastreáveis.',contents:'CONFIRMED, ASSUMPTION, OPEN, evidência, responsável e próximo passo.',condition:'Não transformar hipóteses em fatos nem bloquear tudo por informação opcional.'},
 {path:'docs/adr/0001-initial-architecture.md',purpose:'Primeira decisão arquitetural significativa.',contents:'Contexto, alternativas, status, decisão aprovada e consequências.',condition:'Exemplo de nome: criar somente quando houver decisão real, nunca ADR vazio/fictício.'},
];
export const conceptualTree=`my-project/
├── README.md
├── docs/
│   ├── PRD.md
│   ├── BUSINESS_RULES.md
│   ├── FUNCTIONAL_REQUIREMENTS.md
│   ├── NON_FUNCTIONAL_REQUIREMENTS.md
│   ├── USER_STORIES.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── API_CONTRACTS.md
│   ├── TEST_STRATEGY.md
│   ├── OPEN_DECISIONS.md
│   └── adr/0001-initial-architecture.md  (somente decisão real)
└── [agent-platform-configuration]/     (representação, não criar)
    ├── rules/       (categoria conceitual)
    ├── skills/      (categoria conceitual)
    ├── workflows/   (categoria conceitual)
    ├── hooks/       (categoria conceitual)
    ├── agents/      (categoria conceitual)
    ├── commands/    (categoria conceitual)
    └── mcp/         (categoria conceitual)`;
export const planningCriteria=[
 'Problema, público e objetivo confirmados; MVP delimita fluxo útil e exclusões.',
 'Functional/Non-Functional Requirements têm IDs, condições verificáveis e critérios de falha proporcionais.',
 'Business Rules, estados, transições, User Roles e Permissions são consistentes, incluindo acesso negado.',
 'Tech Stack é justificada por restrições, experiência, orçamento e hospedagem; uma stack basta.',
 'Data Model e API Contracts correspondem às regras; ausência desses artefatos está justificada quando não se aplica.',
 'Agent Configuration e Directory Tree usam somente caminhos/mecanismos reconhecidos para a plataforma e superfície escolhidas.',
 'OPEN e ASSUMPTION estão registradas como tal, com validação necessária; não foram convertidas em fatos.',
 'Documentação e configurações foram revisadas; inconsistências corrigidas ou pendências com impacto explicitado; consigo explicar decisões.',
];
export const planningInterview=[
 {title:'Project Discovery',questions:['Qual é a ideia e que problema você deseja resolver?','Quem utilizará o sistema e quem decide sobre ele?','Qual resultado importa, qual o MVP e quais funcionalidades são indispensáveis?','O que fica fora do escopo? Há restrições ou premissas a confirmar?']},
 {title:'User Roles e Permissions',questions:['Quais perfis existirão e o que cada perfil poderá fazer?','Quais ações exigem autenticação e quais recursos pertencem a cada usuário?','O que deve ser recusado, inclusive para usuários autenticados?']},
 {title:'Business Rules',questions:['Quais regras não podem ser violadas?','Quais estados e transições existem?','Existem restrições de cancelamento, limites, aprovações ou operações repetidas?']},
 {title:'Non-Functional Requirements',questions:['Quais riscos de segurança e dados sensíveis existem? Use categorias, não dados reais.','Quais metas de desempenho e disponibilidade, sob quais condições?','Há requisitos de backup, restauração, retenção ou privacidade? Como verificar?']},
 {title:'Tech Stack e Architecture',questions:['Qual linguagem e framework você conhece ou prefere? Qual experiência da equipe?','Qual orçamento, hospedagem e restrições operacionais?','Quais integrações são necessárias? Há APIs ou sistemas existentes?','Quais alternativas de arquitetura são proporcionais ao MVP e como comparar seus trade-offs?']},
 {title:'Data Model e API Contracts',questions:['Quais entidades existem, como se relacionam e quais dados são obrigatórios?','Há unicidade, estados concorrentes e operações que precisam de transações?','Quais entradas, saídas, erros, autorizações e regras de repetição das interfaces?']},
 {title:'Quality e Delivery',questions:['Como verificar as funcionalidades e quais são os Acceptance Criteria?','Quais cenários de falha, acesso indevido e limites precisam de testes?','Como entregar, observar, restaurar ou reverter quando aplicável?','Quais decisões permanecem OPEN e quem deve confirmá-las?']},
];
