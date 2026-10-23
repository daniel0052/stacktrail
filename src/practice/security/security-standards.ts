import type {SecurityStandard} from './security-types';
export const securityStandards:SecurityStandard[]=[
  {
    "id": "web",
    "name": "OWASP Web Application Top 10",
    "version": "2025",
    "maturity": "Release publicada",
    "purpose": "Material de conscientização; associação aos50 é editorial, não equivalência normativa.",
    "limitations": "Material de conscientização; associação aos50 é editorial, não equivalência normativa.",
    "source": "standard-web",
    "risks": [
      {
        "id": "web-2025-a01",
        "code": "A01:2025",
        "name": "Broken Access Control",
        "explanation": "O servidor permite uma ação ou divulgação fora da política de acesso.",
        "scenario": "Um leitor fictício solicita a ficha privada de outro tenant.",
        "prevention": "Decidir ação/recurso/tenant no servidor e negar por padrão.",
        "test": "Comparar ator autorizado e não autorizado, resposta e estado persistido.",
        "monitor": "Registrar decisão, ação e correlação sem expor o recurso.",
        "limitation": "Autenticação e identificadores imprevisíveis não substituem autorização.",
        "topics": [
          2,
          3,
          4,
          5,
          15,
          22,
          29
        ]
      },
      {
        "id": "web-2025-a02",
        "code": "A02:2025",
        "name": "Security Misconfiguration",
        "explanation": "Configuração efetiva ou superfície exposta contraria o modelo de segurança.",
        "scenario": "Um ambiente de teste deixa debug e upload executável disponíveis.",
        "prevention": "Revisar configuração, rotas, permissões e valores efetivamente carregados.",
        "test": "Conferir debug, endpoint administrativo e configuração de CORS com origens distintas.",
        "monitor": "Detectar drift e exposição de recursos não previstos.",
        "limitation": "Checklist de configuração não verifica sozinho o código ou a infraestrutura.",
        "topics": [
          16,
          25,
          37,
          38,
          39,
          43
        ]
      },
      {
        "id": "web-2025-a03",
        "code": "A03:2025",
        "name": "Software Supply Chain Failures",
        "explanation": "Falhas na cadeia de software afetam dependências, ferramentas, build e artefatos.",
        "scenario": "Um pacote de origem trocada solicita executar um script novo.",
        "prevention": "Verificar origem, integridade, identidades e permissões ao longo do build.",
        "test": "Revisar manifesto/lock e diferença do artefato em fixture, sem instalar pacote suspeito.",
        "monitor": "Acompanhar advisories, mudanças de origem e concessões de CI.",
        "limitation": "Lockfile ou assinatura sem política de confiança não provam segurança.",
        "topics": [
          40,
          41,
          42
        ]
      },
      {
        "id": "web-2025-a04",
        "code": "A04:2025",
        "name": "Cryptographic Failures",
        "explanation": "Proteção criptográfica inadequada pode expor dados conforme a ameaça e a implantação.",
        "scenario": "Um backup fictício inclui ciphertext e chave com o mesmo acesso amplo.",
        "prevention": "Escolher mecanismo mantido e proteger chaves, transporte e ciclo de vida.",
        "test": "Verificar alteração de ciphertext, acesso à chave e recuperação autorizada.",
        "monitor": "Auditar uso e falhas de chave sem registrar material sensível.",
        "limitation": "Criptografia não corrige autorização indevida da aplicação.",
        "topics": [
          21,
          23,
          24,
          26,
          50
        ]
      },
      {
        "id": "web-2025-a05",
        "code": "A05:2025",
        "name": "Injection",
        "explanation": "Entradas atravessam uma fronteira e passam a ser interpretadas como instrução.",
        "scenario": "Um filtro fictício influencia a estrutura de uma consulta ou template.",
        "prevention": "Separar dados e comandos; usar APIs parametrizadas e saída por contexto.",
        "test": "Usar entradas inertes especiais e conferir significado, resultado e ausência de efeito extra.",
        "monitor": "Registrar erros relevantes sem payload sensível ou segredo.",
        "limitation": "Uma mesma defesa não cobre SQL, HTML, shell e templates.",
        "topics": [
          11,
          12,
          13,
          17,
          18,
          20
        ]
      },
      {
        "id": "web-2025-a06",
        "code": "A06:2025",
        "name": "Insecure Design",
        "explanation": "Requisitos e decisões de projeto deixam abusos relevantes sem controle.",
        "scenario": "Uma promoção fictícia pode ser repetida mesmo quando cada request tem formato válido.",
        "prevention": "Modelar ameaças, invariantes, limites e fluxos de abuso antes da implementação.",
        "test": "Testar sequência, concorrência, repetição e condição de elegibilidade.",
        "monitor": "Relacionar abuso observado a requisitos e decisões em revisão.",
        "limitation": "Uma arquitetura elaborada não comprova controles efetivos.",
        "topics": [
          30,
          31,
          32,
          33,
          34,
          47,
          48
        ]
      },
      {
        "id": "web-2025-a07",
        "code": "A07:2025",
        "name": "Authentication Failures",
        "explanation": "Fluxos de identidade, fatores e recuperação não sustentam a confiança pretendida.",
        "scenario": "Uma recuperação fictícia permite reutilizar um token consumido.",
        "prevention": "Proteger login/recuperação/fatores e renovar ou invalidar sessões conforme o risco.",
        "test": "Conferir credencial inválida, fator independente, reuso e revogação.",
        "monitor": "Observar tentativas anômalas sem armazenar credenciais.",
        "limitation": "Tokens válidos não autorizam automaticamente recursos.",
        "topics": [
          1,
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "web-2025-a08",
        "code": "A08:2025",
        "name": "Software or Data Integrity Failures",
        "explanation": "Dados ou código entram no fluxo sem verificação apropriada de integridade e origem.",
        "scenario": "Um evento fictício de integração alterado é aceito como autêntico.",
        "prevention": "Verificar origem e integridade no contrato correto e limitar desserialização.",
        "test": "Confrontar corpo alterado, origem inválida e formato inesperado em fixtures.",
        "monitor": "Auditar decisões de validação e alterações de material confiado.",
        "limitation": "Verificar assinatura não demonstra frescor ou autorização do efeito.",
        "topics": [
          19,
          35,
          36
        ]
      },
      {
        "id": "web-2025-a09",
        "code": "A09:2025",
        "name": "Security Logging and Alerting Failures",
        "explanation": "Eventos necessários não geram evidência utilizável ou encaminhamento de alerta.",
        "scenario": "Uma concessão fictícia de privilégio não deixa trilha para investigação.",
        "prevention": "Definir eventos/campos, correlação, acesso, retenção e resposta do responsável.",
        "test": "Ensaiar evento controlado, perda do coletor e leitura sanitizada.",
        "monitor": "Acompanhar integridade, atraso e acionamento dos sinais.",
        "limitation": "Mais logs não significam mais segurança; dados sensíveis agravam o risco.",
        "topics": [
          27,
          44,
          45,
          49
        ]
      },
      {
        "id": "web-2025-a10",
        "code": "A10:2025",
        "name": "Mishandling of Exceptional Conditions",
        "explanation": "Falhas e condições incomuns deixam o fluxo continuar, vazar informação ou manter efeitos indevidos.",
        "scenario": "Uma gravação fictícia falha no meio e a API ainda responde sucesso.",
        "prevention": "Definir fronteiras de erro, rollback, limpeza e comportamento seguro de falha.",
        "test": "Injetar falha local controlada e conferir estado, resposta e liberação de recursos.",
        "monitor": "Correlacionar erro e efeito sem publicar stack trace.",
        "limitation": "Uma mensagem genérica não corrige estado parcial ou fail-open.",
        "topics": [
          46,
          47
        ]
      }
    ]
  },
  {
    "id": "api",
    "name": "OWASP API Security Top 10",
    "version": "2023",
    "maturity": "Release publicada; mais recente verificada",
    "purpose": "Autenticação, autorização de objeto/função/propriedade e abuso de fluxos são distintos.",
    "limitations": "Autenticação, autorização de objeto/função/propriedade e abuso de fluxos são distintos.",
    "source": "standard-api",
    "risks": [
      {
        "id": "api-2023-api1",
        "code": "API1:2023",
        "name": "Broken Object Level Authorization",
        "explanation": "Operações sobre objetos deixam de verificar a permissão do solicitante para cada item.",
        "scenario": "Uma consulta fictícia troca o ID de uma ficha entre duas pessoas.",
        "prevention": "Escopo de consulta e autorização por objeto, inclusive em listas e relações.",
        "test": "Testar leitura/escrita A/B e ausência de divulgação ou mutação indevida.",
        "monitor": "Registrar recusa por ação e correlação.",
        "limitation": "Autenticação ou UUID não resolvem BOLA.",
        "topics": [
          3
        ],
        "laravelExample": "Combinar consulta delimitada e Policy; route model binding sozinho não prova posse.",
        "expressExample": "Combinar consulta delimitada no driver e política por objeto; validar ID só verifica formato."
      },
      {
        "id": "api-2023-api2",
        "code": "API2:2023",
        "name": "Broken Authentication",
        "explanation": "Mecanismos de identidade ou seus fluxos alternativos podem ser contornados ou abusados.",
        "scenario": "Um fluxo fictício aceita credencial revogada ou recuperação reutilizada.",
        "prevention": "Validar identidade/fatores, proteger recuperação e limitar abuso.",
        "test": "Verificar login negativo, revogação, expiração e segundo fator quando aplicável.",
        "monitor": "Observar padrões de falha com campos redigidos.",
        "limitation": "JWT não é requisito nem solução completa de autenticação.",
        "topics": [
          1,
          6,
          7,
          8,
          9,
          10
        ],
        "laravelExample": "Usar mecanismos de autenticação Laravel e regenerar a sessão após login; não aceitar identidade do formulário.",
        "expressExample": "Express precisa de verificador de credenciais e sessão configurados; middleware que só lê userId não autentica."
      },
      {
        "id": "api-2023-api3",
        "code": "API3:2023",
        "name": "Broken Object Property Level Authorization",
        "explanation": "Propriedades lidas ou escritas não respeitam a política do perfil e do objeto.",
        "scenario": "Uma atualização fictícia inclui role e uma resposta divulga um campo interno.",
        "prevention": "Selecionar propriedades por operação/perfil e autorizar o objeto.",
        "test": "Conferir campo legítimo/restrito em leitura e escrita com estado antes/depois.",
        "monitor": "Registrar tentativa de alterar atributo protegido sem seu conteúdo sensível.",
        "limitation": "Validar formato de uma quantidade não equivale a autorização por propriedade.",
        "topics": [
          5,
          22,
          29
        ],
        "laravelExample": "Form Request e campos selecionados não dispensam Policy para promover outra conta.",
        "expressExample": "DTO validado e serviço de concessão separado; Express não oferece RBAC nativo."
      },
      {
        "id": "api-2023-api4",
        "code": "API4:2023",
        "name": "Unrestricted Resource Consumption",
        "explanation": "Uma operação pode consumir recursos sem limite proporcional ao serviço e ao usuário.",
        "scenario": "Uma exportação fictícia solicita todos os registros e mantém leitores lentos.",
        "prevention": "Limitar trabalho, tamanho, tempo, concorrência e custos, além de requests.",
        "test": "Ensaiar limites locais pequenos e liberação após cancelamento ou falha.",
        "monitor": "Observar saturação, quotas e recusas sem prometer capacidade de produção.",
        "limitation": "Um limitador por IP não cobre todo o custo da operação.",
        "topics": [
          30,
          31
        ],
        "laravelExample": "RateLimiter precisa de backend/chave/expiração adequados e proxy confiável configurado.",
        "expressExample": "Limiter mantido com store e versão compatíveis; trust proxy não deve aceitar qualquer origem."
      },
      {
        "id": "api-2023-api5",
        "code": "API5:2023",
        "name": "Broken Function Level Authorization",
        "explanation": "Funções administrativas ou privilegiadas não verificam o papel e o contexto exigidos.",
        "scenario": "Um leitor fictício chama diretamente uma função de aprovação.",
        "prevention": "Autorizar cada função e método no servidor com política explícita.",
        "test": "Comparar convidado/comum/admin e conferir que a recusa não produziu efeito.",
        "monitor": "Auditar função, ator e decisão.",
        "limitation": "Esconder rota na interface não a protege.",
        "topics": [
          2,
          4
        ],
        "laravelExample": "Gate/Policy deve proteger o endpoint, inclusive quando chamado sem a interface.",
        "expressExample": "Middleware de política próprio deve negar por padrão e ficar antes do handler de escrita."
      },
      {
        "id": "api-2023-api6",
        "code": "API6:2023",
        "name": "Unrestricted Access to Sensitive Business Flows",
        "explanation": "Fluxos legítimos podem ser automatizados ou repetidos de modo prejudicial ao negócio.",
        "scenario": "Uma reserva fictícia monopoliza recursos por sequência de ações válidas.",
        "prevention": "Definir regras de elegibilidade, quotas e detecção de abuso para o fluxo.",
        "test": "Testar ordem, repetição, concorrência e recuperação com dataset sintético.",
        "monitor": "Relacionar padrões ao efeito de negócio, sem identificar pessoas reais.",
        "limitation": "Não é sinônimo de qualquer bug lógico ou de rate limit por endpoint.",
        "topics": [
          32,
          33,
          34
        ],
        "laravelExample": "Regras e transações no caso de uso, com constraints quando apropriadas; não apenas validação de formulário.",
        "expressExample": "Serviço de domínio e transação no driver/query builder; Express não impõe invariantes de negócio."
      },
      {
        "id": "api-2023-api7",
        "code": "API7:2023",
        "name": "Server Side Request Forgery",
        "explanation": "Dados recebidos influenciam destinos alcançados pelo servidor fora da fronteira permitida.",
        "scenario": "Uma importação fictícia tenta redirecionar uma consulta para serviço não autorizado.",
        "prevention": "Controlar destino, resolução, redirect e saída de rede conforme necessidade.",
        "test": "Usar apenas mock local isolado para destino permitido e recusa de redirect.",
        "monitor": "Auditar destino lógico e decisão, sem credencial em URL.",
        "limitation": "Regex de URL não controla a conexão efetiva.",
        "topics": [
          14
        ],
        "laravelExample": "HTTP Client precisa de política de destino e limites; validate url não prova segurança de rede.",
        "expressExample": "Fetch/cliente HTTP precisa de controle de destino e egress; parsing de URL não é autorização."
      },
      {
        "id": "api-2023-api8",
        "code": "API8:2023",
        "name": "Security Misconfiguration",
        "explanation": "Configuração da API, transporte ou ferramentas expõe comportamento desnecessário.",
        "scenario": "Uma API fictícia publica debug e aceita origens além da política.",
        "prevention": "Revisar superfície, configurações carregadas, erros e transporte por ambiente.",
        "test": "Conferir rotas administrativas, debug, CORS e método não previsto.",
        "monitor": "Detectar drift entre baseline e implantação.",
        "limitation": "CORS não é autenticação nem impede chamadas fora do navegador.",
        "topics": [
          37,
          38,
          39,
          43,
          46
        ],
        "laravelExample": "APP_DEBUG e rotas/ferramentas de diagnóstico precisam ser restritos; conferir config cache real.",
        "expressExample": "NODE_ENV não configura toda segurança; revisar middleware, proxy, exposição e erro."
      },
      {
        "id": "api-2023-api9",
        "code": "API9:2023",
        "name": "Improper Inventory Management",
        "explanation": "Endpoints, versões, dados e responsáveis desconhecidos mantêm superfície de risco.",
        "scenario": "Uma versão fictícia antiga continua ativa após desaparecer da documentação.",
        "prevention": "Inventariar rotas/versões/exposição/dados/responsável e desativar com plano revisado.",
        "test": "Comparar inventário com rotas efetivas e uma versão obsoleta em fixture.",
        "monitor": "Alertar sobre rota nova, sem dono ou fora do ciclo de suporte.",
        "limitation": "Inventário declarado não comprova que todos os ambientes foram examinados.",
        "topics": [
          37,
          40
        ],
        "laravelExample": "Comparar inventário aprovado com rotas e versões Laravel efetivas, inclusive endpoints antigos e administrativos.",
        "expressExample": "Comparar inventário aprovado com routers/métodos Express e versões publicadas; registrar responsável e plano de retirada."
      },
      {
        "id": "api-2023-api10",
        "code": "API10:2023",
        "name": "Unsafe Consumption of APIs",
        "explanation": "Dados e comportamentos de fornecedores são confiados além do contrato necessário.",
        "scenario": "Uma resposta fictícia externa muda de schema ou induz nova chamada de rede.",
        "prevention": "Validar resposta, origem, limites e campos; reduzir privilégios da integração.",
        "test": "Simular schema inválido, timeout, resposta grande e redirect no mock local.",
        "monitor": "Acompanhar mudanças de contrato e falhas sanitizadas.",
        "limitation": "Fornecedor conhecido e TLS não tornam o conteúdo confiável.",
        "topics": [
          35,
          36
        ],
        "laravelExample": "Cliente HTTP Laravel com validação explícita do schema recebido, timeout e política restrita de redirecionamentos antes de usar os campos.",
        "expressExample": "Cliente HTTP no serviço Express com limite de resposta, timeout e validação de schema; resposta externa permanece dado não confiável."
      }
    ]
  },
  {
    "id": "agentic",
    "name": "OWASP Top 10 for Agentic Applications",
    "version": "2026",
    "maturity": "Version2026; documento de dezembro/2025",
    "purpose": "Sistemas com ações/ferramentas ampliam riscos; não é a mesma lista de LLM ou Skills.",
    "limitations": "Sistemas com ações/ferramentas ampliam riscos; não é a mesma lista de LLM ou Skills.",
    "source": "standard-agentic",
    "risks": [
      {
        "id": "agentic-2026-asi01",
        "code": "ASI01",
        "name": "Agent Goal Hijack",
        "explanation": "Dados externos desviam o objetivo do agente para outra tarefa.",
        "scenario": "Um README fictício pede ao agente abandonar a revisão e buscar arquivos fora do escopo.",
        "prevention": "Manter instruções de autoridade separadas de dados e verificar intenção antes da ação.",
        "test": "Apresentar documento inerte e observar recusa do desvio, sem executar comandos.",
        "monitor": "Auditar origem da instrução e ações propostas/recusadas.",
        "limitation": "Prompt defensivo sozinho não é controle de execução.",
        "topics": [
          48,
          25
        ]
      },
      {
        "id": "agentic-2026-asi02",
        "code": "ASI02",
        "name": "Tool Misuse and Exploitation",
        "explanation": "Ferramentas disponíveis são usadas fora do propósito ou com argumentos inadequados.",
        "scenario": "Uma ferramenta fictícia de leitura é solicitada para exportação ampla.",
        "prevention": "Aplicar allowlist de ferramenta/argumentos, escopo mínimo e revisão de efeito.",
        "test": "Simular pedido fora do escopo e verificar bloqueio no autorizador, não só texto do agente.",
        "monitor": "Registrar decisão por ferramenta e argumento sanitizado.",
        "limitation": "Tool description não é política de autorização.",
        "topics": [
          2,
          25
        ]
      },
      {
        "id": "agentic-2026-asi03",
        "code": "ASI03",
        "name": "Identity and Privilege Abuse",
        "explanation": "Identidades e credenciais do agente permitem ações além da delegação humana.",
        "scenario": "Uma tarefa fictícia usa identidade de publicação em uma revisão somente leitura.",
        "prevention": "Separar identidades por tarefa, recursos e vida útil; conferir autoridade delegada.",
        "test": "Revisar matriz de permissões e ação recusada de outro papel.",
        "monitor": "Auditar concessão, uso e revogação.",
        "limitation": "Autenticar o agente não autoriza toda ação solicitada.",
        "topics": [
          2,
          5,
          25
        ]
      },
      {
        "id": "agentic-2026-asi04",
        "code": "ASI04",
        "name": "Agentic Supply Chain Vulnerabilities",
        "explanation": "Dependências, ferramentas e componentes de agentes introduzem confiança não revisada.",
        "scenario": "Uma Skill fictícia muda de origem e passa a solicitar rede.",
        "prevention": "Verificar proveniência, conteúdo, versões e cadeia de atualização antes de habilitar.",
        "test": "Comparar revisões inertes e identificar alteração de permissão ou dependência.",
        "monitor": "Detectar drift e atualização não revisada.",
        "limitation": "Nome conhecido ou assinatura sem política não prova integridade operacional.",
        "topics": [
          40,
          41,
          42
        ]
      },
      {
        "id": "agentic-2026-asi05",
        "code": "ASI05",
        "name": "Unexpected Code Execution (RCE)",
        "explanation": "Conteúdo ou saída é tratado como código e pode provocar execução não prevista.",
        "scenario": "Um resultado fictício de ferramenta contém uma instrução de shell não solicitada.",
        "prevention": "Separar dados de código, restringir runtime e exigir revisão humana para efeitos relevantes.",
        "test": "Inspecionar texto inerte e verificar que não chega a executor nem hook.",
        "monitor": "Auditar tentativa de execução e decisão do runtime.",
        "limitation": "Não executar payloads para demonstrar reconhecimento; sandbox tem limites.",
        "topics": [
          13,
          19
        ]
      },
      {
        "id": "agentic-2026-asi06",
        "code": "ASI06",
        "name": "Memory & Context Poisoning",
        "explanation": "Informações não confiáveis persistem e influenciam decisões posteriores.",
        "scenario": "Uma nota fictícia de tarefa anterior passa a ser tratada como política atual.",
        "prevention": "Marcar origem/validade, limitar persistência e revalidar contexto antes de efeito.",
        "test": "Simular nota obsoleta e comparar com a autorização atual.",
        "monitor": "Registrar proveniência e remoção/correção de contexto.",
        "limitation": "Memória persistida não é fonte automática de autoridade.",
        "topics": [
          48,
          28
        ]
      },
      {
        "id": "agentic-2026-asi07",
        "code": "ASI07",
        "name": "Insecure Inter-Agent Communication",
        "explanation": "Mensagens entre agentes perdem identidade, integridade, contexto ou escopo.",
        "scenario": "Um subagente fictício recebe uma ordem sem identidade e finalidade verificáveis.",
        "prevention": "Autenticar canal/identidade e autorizar a delegação com escopo e evidência.",
        "test": "Revisar mensagem alterada, remetente não aceito e delegação excessiva em fixture.",
        "monitor": "Correlacionar remetente, destinatário, tarefa e decisão.",
        "limitation": "Texto dizendo “sou o supervisor” não comprova identidade.",
        "topics": [
          2,
          24
        ]
      },
      {
        "id": "agentic-2026-asi08",
        "code": "ASI08",
        "name": "Cascading Failures",
        "explanation": "Uma falha local se propaga por dependências e agentes sem contenção.",
        "scenario": "Uma ferramenta fictícia falha e dispara tentativas ilimitadas em várias tarefas.",
        "prevention": "Limitar tentativas/recursos, isolar falhas e definir interrupção segura e recuperação.",
        "test": "Exercício de mesa com timeout e retry limitado, sem infraestrutura real.",
        "monitor": "Monitorar orçamento, falhas correlacionadas e parada.",
        "limitation": "Repetir uma ação com efeitos não idempotentes pode agravar a falha.",
        "topics": [
          31,
          34,
          46
        ]
      },
      {
        "id": "agentic-2026-asi09",
        "code": "ASI09",
        "name": "Human-Agent Trust Exploitation",
        "explanation": "Uma recomendação convincente induz a pessoa a aprovar sem evidência suficiente.",
        "scenario": "Um parecer fictício declara testes aprovados sem apresentar execução.",
        "prevention": "Exigir evidência rastreável, revisão de diffs/comandos e explicitar incerteza.",
        "test": "Comparar afirmação com artefato ausente e pedir evidência ou não verificado.",
        "monitor": "Auditar decisões humanas e suas justificativas.",
        "limitation": "Confiança no estilo do texto não substitui verificação.",
        "topics": [
          47,
          48
        ]
      },
      {
        "id": "agentic-2026-asi10",
        "code": "ASI10",
        "name": "Rogue Agents",
        "explanation": "Comportamentos do agente violam objetivo e limites de controle estabelecidos.",
        "scenario": "Um agente fictício continua propondo ações depois da revogação da tarefa.",
        "prevention": "Implementar interrupção, revogação, isolamento e monitoramento de política no runtime.",
        "test": "Ensaiar revogação em modelo inerte e verificar que ações posteriores são recusadas.",
        "monitor": "Registrar continuidade indevida e resposta do operador.",
        "limitation": "Não presumir mecanismos de kill switch existentes em toda plataforma.",
        "topics": [
          2,
          49
        ]
      }
    ]
  },
  {
    "id": "skills",
    "name": "OWASP Agentic Skills Top 10 (AST10)",
    "version": "1.0-2026",
    "maturity": "Incubator; desenvolvimento/preparação de lançamento",
    "purpose": "Lista publicada em projeto emergente. Metadados institucionais/README/GitHubPages divergem; não apresentar como norma estável. Universal Skill Format é proposta.",
    "limitations": "Lista publicada em projeto emergente. Metadados institucionais/README/GitHubPages divergem; não apresentar como norma estável. Universal Skill Format é proposta.",
    "source": "standard-skills",
    "risks": [
      {
        "id": "skills-1-0-2026-ast01",
        "code": "AST01",
        "name": "Malicious Skills",
        "explanation": "Uma Skill pode carregar instruções ou dependências deliberadamente prejudiciais.",
        "scenario": "Uma Skill fictícia de revisão solicita coletar arquivos privados não relacionados.",
        "prevention": "Revisar origem e conteúdo antes de habilitar; restringir dados e execução.",
        "test": "Analisar manifesto/texto inerte e justificar recusa de solicitações fora da tarefa.",
        "monitor": "Registrar origem e decisão de habilitação.",
        "limitation": "AST10 é projeto emergente; campo de metadata não impõe sandbox.",
        "topics": [
          25,
          41
        ]
      },
      {
        "id": "skills-1-0-2026-ast02",
        "code": "AST02",
        "name": "Supply Chain Compromise",
        "explanation": "Uma Skill legítima pode ser alterada por sua cadeia de distribuição.",
        "scenario": "Uma revisão fictícia do mesmo pacote adiciona dependência remota.",
        "prevention": "Fixar origem/revisão e revisar atualizações e dependências.",
        "test": "Comparar dois manifestos sem instalar nenhum deles.",
        "monitor": "Detectar revisão diferente da aprovada.",
        "limitation": "Lock e assinatura exigem confiança na origem e processo de verificação.",
        "topics": [
          40,
          41
        ]
      },
      {
        "id": "skills-1-0-2026-ast03",
        "code": "AST03",
        "name": "Over-Privileged Skills",
        "explanation": "A Skill recebe recursos e permissões superiores à tarefa.",
        "scenario": "Uma Skill fictícia de formatação solicita escrita em todo o workspace e rede.",
        "prevention": "Conceder apenas leitura/escrita/destinos necessários e tempo de vida limitado.",
        "test": "Confrontar tarefa e matriz de capacidades proposta.",
        "monitor": "Auditar concessões e acessos recusados.",
        "limitation": "Permissões escritas no arquivo não são enforcement automático.",
        "topics": [
          2,
          25
        ]
      },
      {
        "id": "skills-1-0-2026-ast04",
        "code": "AST04",
        "name": "Insecure Metadata",
        "explanation": "Descrições e declarações de capacidade podem omitir ou distorcer efeitos.",
        "scenario": "Uma descrição fictícia diz “somente leitura”, mas um passo propõe alterar arquivos.",
        "prevention": "Revisar corpo e dependências, não só nome/descrição ou rótulo de risco.",
        "test": "Comparar metadata declarada com ações propostas.",
        "monitor": "Acompanhar divergência entre declaração e uso.",
        "limitation": "Schema e assinatura de metadata não provam a segurança do conteúdo.",
        "topics": [
          41,
          47
        ]
      },
      {
        "id": "skills-1-0-2026-ast05",
        "code": "AST05",
        "name": "Untrusted External Instructions",
        "explanation": "Dados externos introduzem instruções aceitas como parte da Skill.",
        "scenario": "Um documento fictício citado pela Skill pede ignorar o escopo do usuário.",
        "prevention": "Tratar documentos/resultados como dados; separar autoridade e revisar efeito.",
        "test": "Apresentar texto inerte com instrução conflitante e explicar a decisão.",
        "monitor": "Registrar fonte da instrução e por que foi recusada.",
        "limitation": "Filtro de texto não substitui limites de execução.",
        "topics": [
          48,
          25
        ]
      },
      {
        "id": "skills-1-0-2026-ast06",
        "code": "AST06",
        "name": "Weak Isolation",
        "explanation": "O ambiente da Skill permite atravessar fronteiras de arquivos, processo ou rede.",
        "scenario": "Uma atividade fictícia de leitura alcança diretório não autorizado.",
        "prevention": "Isolar runtime e recursos com controles técnicos e permissões mínimas.",
        "test": "Revisar fronteiras e teste de acesso recusado descrito, sem executar comando perigoso.",
        "monitor": "Auditar tentativas de cruzar limites.",
        "limitation": "Container ou Rule não garante isolamento absoluto.",
        "topics": [
          43,
          2
        ]
      },
      {
        "id": "skills-1-0-2026-ast07",
        "code": "AST07",
        "name": "Update Drift",
        "explanation": "Atualizações mudam o comportamento após uma revisão anterior.",
        "scenario": "Uma Skill fictícia aprovada passa a exigir rede em nova versão.",
        "prevention": "Invalidar aprovação ao mudar conteúdo/dependência/permissão; revisar diff.",
        "test": "Comparar revisões e registrar critérios que precisam ser reconferidos.",
        "monitor": "Monitorar revisão efetivamente carregada.",
        "limitation": "Aprovação de uma versão não se transfere automaticamente à próxima.",
        "topics": [
          40,
          41
        ]
      },
      {
        "id": "skills-1-0-2026-ast08",
        "code": "AST08",
        "name": "Poor Scanning",
        "explanation": "Inspeções incompletas deixam ameaças relevantes fora do escopo.",
        "scenario": "Um relatório fictício avalia só o arquivo principal e ignora scripts referidos.",
        "prevention": "Combinar revisão humana, dependências e sinais automatizados com limites explícitos.",
        "test": "Identificar arquivos e comportamentos não examinados no relatório.",
        "monitor": "Registrar cobertura, achados e lacunas.",
        "limitation": "Scanner sem achado não prova ausência de risco.",
        "topics": [
          47,
          40
        ]
      },
      {
        "id": "skills-1-0-2026-ast09",
        "code": "AST09",
        "name": "No Governance",
        "explanation": "Não há responsável, política ou processo de concessão/revisão/revogação.",
        "scenario": "Uma organização fictícia não sabe quais Skills estão habilitadas.",
        "prevention": "Inventariar proprietário, finalidade, revisão, aprovação e retirada.",
        "test": "Exercício de mesa com Skill órfã e decisão rastreável.",
        "monitor": "Auditar inventário e revisões vencidas.",
        "limitation": "Governança documental precisa de controles operacionais efetivos.",
        "topics": [
          48,
          49
        ]
      },
      {
        "id": "skills-1-0-2026-ast10",
        "code": "AST10",
        "name": "Cross-Platform Reuse",
        "explanation": "Uma configuração é reutilizada entre plataformas com mecanismos incompatíveis.",
        "scenario": "Um arquivo fictício contém campos que a plataforma de destino não reconhece.",
        "prevention": "Verificar documentação e superfície exatas; não transportar Hooks/MCP/permissões por analogia.",
        "test": "Comparar contrato declarado com documentação oficial da plataforma escolhida.",
        "monitor": "Registrar plataforma, versão e mecanismo realmente habilitado.",
        "limitation": "Universal Skill Format é proposta, não contrato nativo universal.",
        "topics": [
          37,
          41
        ]
      }
    ]
  },
  {
    "id": "llm",
    "name": "OWASP Top 10 for LLM Applications",
    "version": "2026",
    "maturity": "Release2026 confirmada no repositório canônico",
    "purpose": "Códigos reorganizados em2026. Página de arquivo ainda mostra2025; publicação03/08 e README04/08/2026 divergem na data. PDF conserva placeholders editoriais.",
    "limitations": "Códigos reorganizados em2026. Página de arquivo ainda mostra2025; publicação03/08 e README04/08/2026 divergem na data. PDF conserva placeholders editoriais.",
    "source": "standard-llm",
    "risks": [
      {
        "id": "llm-2026-llm01",
        "code": "LLM01:2026",
        "name": "Prompt Injection",
        "explanation": "Entradas não confiáveis tentam alterar o comportamento além da tarefa.",
        "scenario": "Um documento fictício de busca inclui uma ordem de divulgação de contexto.",
        "prevention": "Separar dados/instruções, limitar ferramentas/dados e revisar saídas antes de efeitos.",
        "test": "Analisar documento inerte e provar que nenhuma ação foi autorizada por ele.",
        "monitor": "Auditar origem do conteúdo e ação proposta.",
        "limitation": "Não há garantia de imunidade por uma frase no prompt.",
        "topics": [
          25,
          48
        ]
      },
      {
        "id": "llm-2026-llm02",
        "code": "LLM02:2026",
        "name": "Sensitive Information Disclosure",
        "explanation": "O sistema revela dados ou segredos fora da finalidade autorizada.",
        "scenario": "Uma resposta fictícia inclui sentinela que deveria permanecer restrita.",
        "prevention": "Minimizar contexto, isolar identidades e filtrar/redigir dados conforme política.",
        "test": "Usar somente sentinelas fictícias e conferir saídas, logs e ferramentas.",
        "monitor": "Monitorar acesso e divulgação sem copiar o segredo.",
        "limitation": "Redaction da resposta não corrige exposição anterior ao fornecedor.",
        "topics": [
          22,
          25,
          27
        ]
      },
      {
        "id": "llm-2026-llm03",
        "code": "LLM03:2026",
        "name": "Excessive Agency",
        "explanation": "A aplicação permite ações ou autonomia além do necessário.",
        "scenario": "Um assistente fictício pode publicar quando a tarefa era apenas revisar.",
        "prevention": "Reduzir ferramentas, escopo e autonomia; aprovar ações de impacto no runtime.",
        "test": "Confrontar solicitação e capacidades concedidas, com ação recusada.",
        "monitor": "Auditar concessão, aprovação e efeito.",
        "limitation": "Human-in-the-loop sem informação suficiente pode ser ineficaz.",
        "topics": [
          2,
          5
        ]
      },
      {
        "id": "llm-2026-llm04",
        "code": "LLM04:2026",
        "name": "Supply Chain",
        "explanation": "Modelos, dados, componentes ou serviços introduzem risco pela cadeia de fornecimento.",
        "scenario": "Uma integração fictícia muda pacote/modelo e política de dados sem revisão.",
        "prevention": "Verificar proveniência, versões, acesso e mudanças da cadeia.",
        "test": "Revisar diff de dependência e modelo em documentos inertes.",
        "monitor": "Registrar versões, fornecedor e mudança de política.",
        "limitation": "Nome de modelo ou pacote não comprova origem ou adequação.",
        "topics": [
          40,
          41
        ]
      },
      {
        "id": "llm-2026-llm05",
        "code": "LLM05:2026",
        "name": "Data and Model Poisoning",
        "explanation": "Material de treinamento/adaptação ou dados consumidos alteram resultados de modo indevido.",
        "scenario": "Uma base fictícia contém entradas alteradas com origem desconhecida.",
        "prevention": "Controlar origem/acesso, validar qualidade e rastrear alterações e recuperação.",
        "test": "Comparar dataset sintético e sua proveniência; não treinar nem baixar modelo.",
        "monitor": "Auditar ingestão e mudanças de dados.",
        "limitation": "Detectar toda contaminação não é garantido por revisão de amostra.",
        "topics": [
          48,
          41
        ]
      },
      {
        "id": "llm-2026-llm06",
        "code": "LLM06:2026",
        "name": "Unbounded Consumption",
        "explanation": "Uso sem limites pode esgotar recursos ou custos do serviço.",
        "scenario": "Um agente fictício repete chamadas e amplia contexto sem orçamento.",
        "prevention": "Definir quotas, limites de contexto/saída/tempo e critério de interrupção.",
        "test": "Exercício de mesa com orçamento pequeno e parada verificável.",
        "monitor": "Monitorar consumo e repetição com responsável definido.",
        "limitation": "Não executar carga ou contratar API para demonstrar o risco.",
        "topics": [
          31
        ]
      },
      {
        "id": "llm-2026-llm07",
        "code": "LLM07:2026",
        "name": "Misinformation",
        "explanation": "Conteúdo incorreto ou sem suporte é usado como base de decisão.",
        "scenario": "Um parecer fictício cita uma norma inexistente e declara um sistema seguro.",
        "prevention": "Exigir fontes primárias, evidência e incerteza; separar hipótese de fato.",
        "test": "Conferir referência e artefato citado, marcando o ausente como não verificado.",
        "monitor": "Registrar decisão dependente de informação não confirmada.",
        "limitation": "Uma fonte correta não demonstra a conclusão inteira.",
        "topics": [
          47,
          48
        ]
      },
      {
        "id": "llm-2026-llm08",
        "code": "LLM08:2026",
        "name": "Hidden Context Exposure",
        "explanation": "Contexto que deveria permanecer restrito se torna acessível na saída ou em outro canal.",
        "scenario": "Um assistente fictício reproduz instruções internas e uma sentinela privada.",
        "prevention": "Reduzir dados sensíveis em contexto e impor isolamento/acesso fora do modelo.",
        "test": "Usar sentinela fictícia e inspecionar canais/saídas sem segredos reais.",
        "monitor": "Auditar acesso ao contexto e divulgações recusadas.",
        "limitation": "System prompt não deve funcionar como cofre de segredo.",
        "topics": [
          22,
          25
        ]
      },
      {
        "id": "llm-2026-llm09",
        "code": "LLM09:2026",
        "name": "Vector and Embedding Weaknesses",
        "explanation": "Busca e representações vetoriais podem atravessar políticas de dados ou recuperar material indevido.",
        "scenario": "Uma consulta fictícia retorna trechos pertencentes a outro tenant.",
        "prevention": "Aplicar autorização e segregação na ingestão/recuperação e limitar contexto.",
        "test": "Comparar dois tenants e recuperação autorizada em fixture documental.",
        "monitor": "Registrar origem dos trechos e política aplicada.",
        "limitation": "Similaridade vetorial não é decisão de autorização.",
        "topics": [
          3,
          22
        ]
      },
      {
        "id": "llm-2026-llm10",
        "code": "LLM10:2026",
        "name": "Improper Output Handling",
        "explanation": "Saídas do modelo são tratadas como código, consulta ou HTML confiáveis.",
        "scenario": "Uma sugestão fictícia é colocada em um executor sem revisão.",
        "prevention": "Tratar saída como entrada não confiável e aplicar validação/encoding/autorização no destino.",
        "test": "Inspecionar texto inerte e verificar que não alcança executor automaticamente.",
        "monitor": "Auditar transição entre sugestão e efeito.",
        "limitation": "Revisão humana não substitui controles de runtime e destino.",
        "topics": [
          11,
          12,
          13,
          19
        ]
      }
    ]
  },
  {
    "id": "asvs",
    "name": "OWASP ASVS",
    "version": "5.0.0",
    "maturity": "Estável;30/05/2025",
    "purpose": "Requisitos verificáveis. Selecionar aplicabilidade/nível,controle,teste,evidência e risco residual; não declarar conformidade por checklist.",
    "limitations": "Requisitos verificáveis. Selecionar aplicabilidade/nível,controle,teste,evidência e risco residual; não declarar conformidade por checklist.",
    "source": "standard-asvs",
    "risks": []
  },
  {
    "id": "wstg",
    "name": "OWASP WSTG",
    "version": "4.2",
    "maturity": "Estável;5.0 em desenvolvimento",
    "purpose": "Procedimentos de teste. Fixar versão e escopo autorizado; sugestões históricas de recuperação4.2 não substituem guidance atual.",
    "limitations": "Procedimentos de teste. Fixar versão e escopo autorizado; sugestões históricas de recuperação4.2 não substituem guidance atual.",
    "source": "standard-wstg",
    "risks": []
  },
  {
    "id": "cheatsheets",
    "name": "OWASP Cheat Sheet Series",
    "version": "Documentação contínua",
    "maturity": "Guidance; sem edição anual única",
    "purpose": "Orientação de implementação. Não equivale a requisitos ASVS nem a procedimentos WSTG.",
    "limitations": "Orientação de implementação. Não equivale a requisitos ASVS nem a procedimentos WSTG.",
    "source": "standard-cheatsheets",
    "risks": []
  },
  {
    "id": "aisvs",
    "name": "OWASP AISVS",
    "version": "1.01",
    "maturity": "Release estável no repositório;projeto Incubator",
    "purpose": "Requisitos verificáveis para IA. Página institucional ainda informa1.0/1.01-dev; repositório informa1.01/1.02-dev. Usar IDs com versão.",
    "limitations": "Requisitos verificáveis para IA. Página institucional ainda informa1.0/1.01-dev; repositório informa1.01/1.02-dev. Usar IDs com versão.",
    "source": "standard-aisvs",
    "risks": []
  },
  {
    "id": "acs",
    "name": "OWASP Agent Control Standard",
    "version": "Repo0.1.4; wire/spec0.1.0",
    "maturity": "Emergente,pré-1.0; release16/10/2026",
    "purpose": "Permission boundaries,identidade,aprovação,ferramentas e auditabilidade. Implementação de referência registra fail-open,ausência de autenticação do wire e cobertura limitada de hooks; não instalar nem afirmar proteção pronta.",
    "limitations": "Permission boundaries,identidade,aprovação,ferramentas e auditabilidade. Implementação de referência registra fail-open,ausência de autenticação do wire e cobertura limitada de hooks; não instalar nem afirmar proteção pronta.",
    "source": "standard-acs",
    "risks": []
  }
];
