import type {SecurityTopic} from './security-types';
export const securityCategories=[
  {
    "id": "authentication-authorization",
    "name": "Authentication & Authorization",
    "count": 10
  },
  {
    "id": "injection-validation",
    "name": "Injection & Input Validation",
    "count": 10
  },
  {
    "id": "data-cryptography",
    "name": "Data Protection & Cryptography",
    "count": 8
  },
  {
    "id": "api-business",
    "name": "API & Business Logic Security",
    "count": 8
  },
  {
    "id": "configuration-supply-chain",
    "name": "Configuration & Supply Chain",
    "count": 7
  },
  {
    "id": "monitoring-testing",
    "name": "Monitoring, Resilience & Testing",
    "count": 7
  }
] as const;
// Original StackTrail curation; ordinal identifies the topic, not frequency or severity.
export const securityTopics:SecurityTopic[]=[
  {
    "id": "bst50-01-broken-authentication",
    "number": 1,
    "name": "Broken Authentication",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Credenciais ou fatores não comprovam a identidade quando verificação, recuperação ou invalidação falham.",
    "scenario": "Uma conta de biblioteca fictícia permanece utilizável após a revogação da credencial.",
    "rootCause": "Fluxos de entrada e recuperação confiam em estados fornecidos pelo cliente.",
    "vulnerableExample": "login → confiar em userId recebido → criar sessão.",
    "secureImplementation": "login → verificar credencial no servidor → renovar sessão → aplicar revogação.",
    "laravelExample": "Usar mecanismos de autenticação Laravel e regenerar a sessão após login; não aceitar identidade do formulário.",
    "expressExample": "Express precisa de verificador de credenciais e sessão configurados; middleware que só lê userId não autentica.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma conta de biblioteca fictícia permanece utilizável após a revogação da credencial. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "login → verificar credencial no servidor → renovar sessão → aplicar revogação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Credencial inválida",
      "conta revogada",
      "login válido seguido de logout."
    ],
    "mistake": "Autenticar não concede acesso a todo recurso.",
    "refs": [
      "authentication"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-287"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-02-broken-access-control",
    "number": 2,
    "name": "Broken Access Control",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Uma identidade válida ainda pode executar ações fora da política do recurso e da organização.",
    "scenario": "Um atendente tenta encerrar uma solicitação reservada à supervisão.",
    "rootCause": "Decisões dependem da interface ou deixam de avaliar ação e contexto no servidor.",
    "vulnerableExample": "botão oculto → endpoint aceita a operação.",
    "secureImplementation": "endpoint → avaliar identidade, ação, recurso e tenant → negar antes da mutação.",
    "laravelExample": "Gate/Policy deve proteger o endpoint, inclusive quando chamado sem a interface.",
    "expressExample": "Middleware de política próprio deve negar por padrão e ficar antes do handler de escrita.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um atendente tenta encerrar uma solicitação reservada à supervisão. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "endpoint → avaliar identidade, ação, recurso e tenant → negar antes da mutação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Convidado",
      "atendente",
      "supervisor",
      "estado persistido após recusa."
    ],
    "mistake": "Ocultar uma ação não é autorização.",
    "refs": [
      "authorization"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API5:2023"
    ],
    "cwe": [
      "CWE-862"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-03-broken-object-level-authorization-bola-idor",
    "number": 3,
    "name": "Broken Object Level Authorization (BOLA/IDOR)",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Controlar a função não basta: cada objeto acessado precisa pertencer ao escopo autorizado.",
    "scenario": "Duas pessoas fictícias consultam fichas de equipamentos com identificadores trocados.",
    "rootCause": "Busca global por ID não aplica política de propriedade ou tenant.",
    "vulnerableExample": "buscar ficha por ID → devolver todos os campos.",
    "secureImplementation": "resolver recurso no escopo permitido → conferir ação → projetar resposta.",
    "laravelExample": "Combinar consulta delimitada e Policy; route model binding sozinho não prova posse.",
    "expressExample": "Combinar consulta delimitada no driver e política por objeto; validar ID só verifica formato.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, duas pessoas fictícias consultam fichas de equipamentos com identificadores trocados. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "resolver recurso no escopo permitido → conferir ação → projetar resposta.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Consulta própria/alheia",
      "listagem",
      "escrita alheia sem efeito."
    ],
    "mistake": "UUID não substitui controle de acesso.",
    "refs": [
      "authorization"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API1:2023"
    ],
    "cwe": [
      "CWE-639"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-04-broken-function-level-authorization",
    "number": 4,
    "name": "Broken Function Level Authorization",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "A permissão de ler uma coleção não implica permissão para administrar suas funções.",
    "scenario": "Uma pessoa com acesso ao catálogo tenta usar a operação de exportação administrativa.",
    "rootCause": "O servidor confunde acesso ao módulo com permissão para cada função.",
    "vulnerableExample": "qualquer sessão → exportação administrativa.",
    "secureImplementation": "sessão válida → política da função → escopo dos registros exportados.",
    "laravelExample": "Proteger a função com Gate/Policy e conferir também os registros selecionados.",
    "expressExample": "Aplicar autorização da função e escopo de dados em todos os métodos HTTP suportados.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma pessoa com acesso ao catálogo tenta usar a operação de exportação administrativa. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "sessão válida → política da função → escopo dos registros exportados.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Leitor/admin",
      "chamada direta",
      "método alternativo",
      "exportação vazia."
    ],
    "mistake": "Prefixo /admin não é uma fronteira de segurança.",
    "refs": [
      "authorization"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API5:2023"
    ],
    "cwe": [
      "CWE-862"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-05-privilege-escalation",
    "number": 5,
    "name": "Privilege Escalation",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Mudanças em papéis e atributos de identidade podem ampliar privilégios além da concessão permitida.",
    "scenario": "Um perfil de clube fictício tenta alterar seu próprio papel de leitor para gestor.",
    "rootCause": "Campos privilegiados e transições de papel não têm controle independente.",
    "vulnerableExample": "perfil recebido → salvar role sem política.",
    "secureImplementation": "atualização de perfil → campos permitidos; concessão de papel → política separada e auditoria.",
    "laravelExample": "Form Request e campos selecionados não dispensam Policy para promover outra conta.",
    "expressExample": "DTO validado e serviço de concessão separado; Express não oferece RBAC nativo.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um perfil de clube fictício tenta alterar seu próprio papel de leitor para gestor. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "atualização de perfil → campos permitidos; concessão de papel → política separada e auditoria.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Autoelevação",
      "concessão entre tenants",
      "revogação",
      "auditoria sem segredo."
    ],
    "mistake": "Aceitar role porque o token está assinado não valida a concessão atual.",
    "refs": [
      "authorization",
      "mass"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API3:2023"
    ],
    "cwe": [
      "CWE-269"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-06-session-management",
    "number": 6,
    "name": "Session Management",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Sessões precisam de criação, renovação, expiração e revogação coerentes entre navegador e servidor.",
    "scenario": "Uma sessão de oficina fictícia continua ativa em outro navegador depois de revogada.",
    "rootCause": "Identificadores reutilizados e expiração só no cliente deixam estado válido no servidor.",
    "vulnerableExample": "login conserva ID anterior; logout só remove a tela.",
    "secureImplementation": "login renova ID; servidor expira e revoga; cookie limita transporte e exposição.",
    "laravelExample": "Usar sessão Laravel, regeneração, logout/invalidação e CSRF no cenário web apropriado.",
    "expressExample": "Configurar express-session com store adequado, regeneração e destruição; MemoryStore não serve para produção.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma sessão de oficina fictícia continua ativa em outro navegador depois de revogada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "login renova ID; servidor expira e revoga; cookie limita transporte e exposição.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Fixação controlada",
      "inatividade",
      "logout",
      "duas sessões",
      "CSRF em mutação."
    ],
    "mistake": "SameSite e HttpOnly não corrigem toda falha de sessão.",
    "refs": [
      "session"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-384"
    ],
    "stages": [
      "07",
      "10"
    ]
  },
  {
    "id": "bst50-07-credential-stuffing-defenses",
    "number": 7,
    "name": "Credential Stuffing Defenses",
    "category": "authentication-authorization",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Reutilização de credenciais vazadas permite tentativas automatizadas sem adivinhar uma senha nova.",
    "scenario": "Um ensaio local usa contas e senhas totalmente fictícias repetidas contra login de demonstração.",
    "rootCause": "Defesa considera só uma dimensão e permite tentativas distribuídas ou bloqueio abusivo.",
    "vulnerableExample": "tentativas ilimitadas ou bloqueio permanente de uma conta escolhida.",
    "secureImplementation": "combinar limites por conta/origem, sinais de risco e recuperação segura.",
    "laravelExample": "Definir chaves e limites no RateLimiter, considerando proxy confiável e armazenamento compartilhado.",
    "expressExample": "Escolher limiter/store mantidos e configurar trust proxy conforme implantação; não confiar em header arbitrário.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um ensaio local usa contas e senhas totalmente fictícias repetidas contra login de demonstração. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "combinar limites por conta/origem, sinais de risco e recuperação segura.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Rajada limitada local",
      "recuperação",
      "pessoas distintas",
      "indisponibilidade do store."
    ],
    "mistake": "Rate limit apenas por IP não cobre todo abuso e pode prejudicar NAT.",
    "refs": [
      "credential",
      "authentication"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-307"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-08-multi-factor-authentication",
    "number": 8,
    "name": "Multi-Factor Authentication",
    "category": "authentication-authorization",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Um segundo fator reduz certos riscos de credenciais, mas cadastro, recuperação e reautenticação também precisam de proteção. Os fatores devem ser independentes: senha e PIN não são dois fatores.",
    "scenario": "Uma conta fictícia tenta trocar o fator usando somente uma sessão antiga.",
    "rootCause": "O fluxo alternativo ou a troca de fator contorna a verificação exigida.",
    "vulnerableExample": "ativar MFA no login; reset do fator aceita qualquer sessão.",
    "secureImplementation": "proteger cadastro/troca/recuperação; vincular fatores; limitar tentativas e reautenticar.",
    "laravelExample": "Integrar recurso ou biblioteca de MFA compatível, sem afirmar que auth middleware sozinho fornece segundo fator.",
    "expressExample": "Integrar verificador de fator/IdP documentado; Express não implementa MFA por padrão.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma conta fictícia tenta trocar o fator usando somente uma sessão antiga. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "proteger cadastro/troca/recuperação; vincular fatores; limitar tentativas e reautenticar.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Fator ausente/inválido",
      "repetição",
      "recuperação",
      "troca por sessão antiga."
    ],
    "mistake": "MFA não elimina phishing nem autoriza operações por recurso.",
    "refs": [
      "mfa",
      "authentication"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-09-token-security",
    "number": 9,
    "name": "Token Security",
    "category": "authentication-authorization",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "No cenário JWT, validar assinatura e claims exigidos pelo perfil de uso é diferente de apenas decodificar. Tokens opacos podem exigir consulta/introspecção e política no servidor; formato não define autorização.",
    "scenario": "Uma API fictícia recebe um token emitido para outro serviço.",
    "rootCause": "Aceitar um token decodificado ou válido para audiência diferente confunde identidade e autorização.",
    "vulnerableExample": "decodificar claims → confiar em todas as permissões recebidas.",
    "secureImplementation": "no cenário JWT → verificar assinatura/algoritmos e claims exigidos pelo perfil; no opaco → consultar estado/autorização no mecanismo adotado.",
    "laravelExample": "Escolher sessão ou mecanismo compatível com o cenário; Sanctum não torna JWT obrigatório.",
    "expressExample": "Usar biblioteca mantida e configuração explícita de issuer/audience/algoritmos; não criar verificador próprio.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma API fictícia recebe um token emitido para outro serviço. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "no cenário JWT → verificar assinatura/algoritmos e claims exigidos pelo perfil; no opaco → consultar estado/autorização no mecanismo adotado.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Token expirado",
      "audiência errada",
      "assinatura inválida",
      "papel revogado."
    ],
    "mistake": "JWT não é uma solução automática de autorização.",
    "refs": [
      "jwt",
      "authentication"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-345"
    ],
    "stages": [
      "07",
      "10"
    ]
  },
  {
    "id": "bst50-10-password-reset-security",
    "number": 10,
    "name": "Password Reset Security",
    "category": "authentication-authorization",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Recuperação é um fluxo de autenticação e precisa resistir a enumeração, reuso e troca de destinatário.",
    "scenario": "Um link de recuperação fictício já consumido é apresentado novamente.",
    "rootCause": "Token previsível, não expirado ou não vinculado à conta continua utilizável.",
    "vulnerableExample": "reset aceita token reutilizado e revela conta existente.",
    "secureImplementation": "resposta externa uniforme; token imprevisível, restrito, expirável e de uso único.",
    "laravelExample": "Usar Password Broker compatível e conferir limitação de tentativas e invalidação no cenário adotado.",
    "expressExample": "Implementar serviço de recuperação com armazenamento/verificação de token e consumo atômico; não enviar credenciais reais.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um link de recuperação fictício já consumido é apresentado novamente. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "resposta externa uniforme; token imprevisível, restrito, expirável e de uso único.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Conta inexistente",
      "token expirado",
      "reuso",
      "duas solicitações concorrentes."
    ],
    "mistake": "Mensagem genérica sozinha não evita discrepâncias de tempo ou abuso.",
    "refs": [
      "reset",
      "authentication"
    ],
    "web": [
      "A07:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-640"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-11-sql-injection",
    "number": 11,
    "name": "SQL Injection",
    "category": "injection-validation",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "postgresql",
      "http"
    ],
    "explanation": "Dados interpretados como estrutura SQL podem alterar a consulta pretendida.",
    "scenario": "Uma busca de acervo fictício recebe caracteres especiais que deveriam ser apenas dados.",
    "rootCause": "Valores ou identificadores entram na construção da consulta sem separação adequada.",
    "vulnerableExample": "texto recebido → concatenar na estrutura SQL.",
    "secureImplementation": "valores parametrizados; identificadores escolhidos em allowlist do servidor.",
    "laravelExample": "Query Builder faz binding de valores; expressões raw e nomes de coluna exigem revisão explícita.",
    "expressExample": "pg usa parâmetros para valores; Knex é query builder, e ordenação dinâmica ainda precisa de allowlist.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma busca de acervo fictício recebe caracteres especiais que deveriam ser apenas dados. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "valores parametrizados; identificadores escolhidos em allowlist do servidor.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Aspas como dado",
      "filtro legítimo",
      "ordenação desconhecida",
      "resultado e autorização preservados."
    ],
    "mistake": "Escapar strings não substitui parametrização e política.",
    "refs": [
      "sql"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-89"
    ],
    "stages": [
      "05",
      "07"
    ]
  },
  {
    "id": "bst50-12-cross-site-scripting-xss",
    "number": 12,
    "name": "Cross-Site Scripting (XSS)",
    "category": "injection-validation",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Conteúdo não confiável chega a um contexto executável no navegador sem defesa apropriada ao destino.",
    "scenario": "Uma descrição fictícia de anúncio atravessa a API e aparece em uma página de revisão.",
    "rootCause": "A aplicação trata dado como marcação ou script; o contexto da saída é ignorado.",
    "vulnerableExample": "descrição recebida → inserir como HTML confiável.",
    "secureImplementation": "texto renderizado como texto; HTML necessário passa por sanitização adequada ao contexto.",
    "laravelExample": "Blade escapa saída comum; saída raw exige análise; a API deve separar dados e conteúdo permitido.",
    "expressExample": "Express fornece dados; template/frontend precisa de encoding por contexto. Não atribuir sanitização automática ao JSON.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma descrição fictícia de anúncio atravessa a API e aparece em uma página de revisão. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "texto renderizado como texto; HTML necessário passa por sanitização adequada ao contexto.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Texto com marcação inerte",
      "atributo/URL",
      "conteúdo permitido",
      "CSP como defesa adicional."
    ],
    "mistake": "Input validation e CSP isoladamente não eliminam XSS.",
    "refs": [
      "xss"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-79"
    ],
    "stages": [
      "01",
      "07",
      "10"
    ]
  },
  {
    "id": "bst50-13-os-command-injection",
    "number": 13,
    "name": "OS Command Injection",
    "category": "injection-validation",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Argumentos externos podem virar comandos do sistema quando atravessam shell ou opções perigosas.",
    "scenario": "Um gerador local de etiquetas aceita um formato de saída escolhido pelo usuário.",
    "rootCause": "Concatenação com shell e interpretação de argumentos permitem mudar a operação.",
    "vulnerableExample": "formato recebido → montar linha de shell.",
    "secureImplementation": "preferir API de biblioteca; comando necessário usa argumentos separados e allowlist de operação/opções.",
    "laravelExample": "Usar API de biblioteca ou processo com lista de argumentos revisada; nunca interpolar entrada em shell.",
    "expressExample": "Usar API de biblioteca ou execFile/spawn sem shell, além de validar opções e destino.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um gerador local de etiquetas aceita um formato de saída escolhido pelo usuário. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "preferir API de biblioteca; comando necessário usa argumentos separados e allowlist de operação/opções.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Formato permitido",
      "opção não permitida",
      "erro",
      "limite de tempo e saída."
    ],
    "mistake": "Evitar shell não resolve toda injeção de argumentos.",
    "refs": [
      "command"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-78"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-14-server-side-request-forgery-ssrf",
    "number": 14,
    "name": "Server-Side Request Forgery (SSRF)",
    "category": "injection-validation",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Uma entrada pode fazer o servidor alcançar destinos ou serviços que o solicitante não deveria acessar.",
    "scenario": "Um importador fictício tenta sair da lista de fornecedores simulados.",
    "rootCause": "Validação de URL não acompanha DNS, redirecionamentos ou a conexão efetiva.",
    "vulnerableExample": "URL recebida → fetch com redirecionamentos livres.",
    "secureImplementation": "destinos permitidos por necessidade; validar resolução/conexão/redirecionamentos e limitar saída de rede.",
    "laravelExample": "HTTP Client precisa de política de destino e limites; validate url não prova segurança de rede.",
    "expressExample": "Fetch/cliente HTTP precisa de controle de destino e egress; parsing de URL não é autorização.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um importador fictício tenta sair da lista de fornecedores simulados. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "destinos permitidos por necessidade; validar resolução/conexão/redirecionamentos e limitar saída de rede.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Destino permitido simulado",
      "redirect recusado",
      "DNS controlado",
      "timeout e tamanho."
    ],
    "mistake": "Bloquear apenas uma string de host deixa outras rotas de acesso.",
    "refs": [
      "ssrf"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API7:2023"
    ],
    "cwe": [
      "CWE-918"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-15-path-traversal",
    "number": 15,
    "name": "Path Traversal",
    "category": "injection-validation",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Nomes de arquivo externos podem escapar do diretório lógico permitido.",
    "scenario": "Um serviço fictício de comprovantes recebe uma referência a arquivo fora do acervo autorizado.",
    "rootCause": "Caminho fornecido pelo cliente é usado como autoridade de localização.",
    "vulnerableExample": "caminho recebido → abrir arquivo diretamente.",
    "secureImplementation": "ID lógico → registro autorizado → caminho interno confinado, incluindo resolução e links simbólicos.",
    "laravelExample": "Storage e download continuam exigindo escopo e política; não confiar no nome recebido.",
    "expressExample": "Resolver um ID autorizado e usar diretório delimitado; join de strings não comprova confinamento.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um serviço fictício de comprovantes recebe uma referência a arquivo fora do acervo autorizado. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "ID lógico → registro autorizado → caminho interno confinado, incluindo resolução e links simbólicos.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "ID próprio/alheio",
      "separadores",
      "link simbólico em fixture local",
      "arquivo ausente."
    ],
    "mistake": "Remover uma sequência textual não prova que o caminho ficou confinado.",
    "refs": [
      "upload"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-22"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-16-unsafe-file-upload",
    "number": 16,
    "name": "Unsafe File Upload",
    "category": "injection-validation",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Arquivos enviados podem exceder limites, expor dados ou ser interpretados de modo perigoso.",
    "scenario": "Um formulário fictício recebe um arquivo que declara um tipo diferente do conteúdo.",
    "rootCause": "Extensão, nome e Content-Type controlados pelo cliente são tratados como prova.",
    "vulnerableExample": "nome original → diretório público executável.",
    "secureImplementation": "limitar tipo/tamanho/conteúdo, gerar nome interno, isolar armazenamento e autorizar download.",
    "laravelExample": "File validation e Storage com visibilidade definida; nome original não é confiável.",
    "expressExample": "Middleware de upload documentado com limites, inspeção adequada e diretório sem execução; Express não faz isso sozinho.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um formulário fictício recebe um arquivo que declara um tipo diferente do conteúdo. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "limitar tipo/tamanho/conteúdo, gerar nome interno, isolar armazenamento e autorizar download.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Tipo discordante",
      "tamanho máximo",
      "download alheio",
      "nomes repetidos",
      "quota."
    ],
    "mistake": "MIME fornecido pelo cliente não é validação suficiente.",
    "refs": [
      "upload"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-434"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-17-xml-external-entity-xxe",
    "number": 17,
    "name": "XML External Entity (XXE)",
    "category": "injection-validation",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Um parser XML pode resolver entidades externas e acessar recursos além do documento esperado.",
    "scenario": "Uma integração fictícia processa XML com referência externa inerte em fixture isolada.",
    "rootCause": "Parser ou configuração permite DTD/entidades externas sem necessidade de negócio.",
    "vulnerableExample": "XML não confiável → parser permite resolver entidades.",
    "secureImplementation": "desabilitar resoluções externas/DTD quando não necessárias e aplicar limites do parser e rede.",
    "laravelExample": "Inspecionar a biblioteca XML e a versão/configuração PHP; não atribuir proteção universal ao framework.",
    "expressExample": "Escolher parser mantido e configuração que proíba entidades externas; Express não fornece um parser XML seguro universal.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma integração fictícia processa XML com referência externa inerte em fixture isolada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "desabilitar resoluções externas/DTD quando não necessárias e aplicar limites do parser e rede.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Documento válido",
      "DTD recusado",
      "resolução externa desabilitada",
      "limite de expansão."
    ],
    "mistake": "Uma versão do parser não prova a configuração efetiva.",
    "refs": [
      "xxe"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-611"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-18-server-side-template-injection-ssti",
    "number": 18,
    "name": "Server-Side Template Injection (SSTI)",
    "category": "injection-validation",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Dados interpretados como código de template podem executar operações no servidor.",
    "scenario": "Um editor fictício de mensagens tenta converter texto recebido em um novo template.",
    "rootCause": "A aplicação compila conteúdo não confiável como linguagem de template.",
    "vulnerableExample": "texto externo → compilar template no servidor.",
    "secureImplementation": "usar templates definidos pela aplicação e passar dados separados; restringir funcionalidades necessárias.",
    "laravelExample": "Blade deve receber variáveis em templates controlados, não compilar strings do usuário como código.",
    "expressExample": "Manter templates controlados e variáveis separadas no engine escolhido; não gerar templates executáveis de texto externo.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um editor fictício de mensagens tenta converter texto recebido em um novo template. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "usar templates definidos pela aplicação e passar dados separados; restringir funcionalidades necessárias.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Texto com delimitadores inertes",
      "template permitido",
      "propriedade não permitida",
      "erro sanitizado."
    ],
    "mistake": "Escapar HTML não resolve execução de template no servidor.",
    "refs": [
      "ssti"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-1336"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-19-insecure-deserialization",
    "number": 19,
    "name": "Insecure Deserialization",
    "category": "injection-validation",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Reconstruir objetos a partir de dados externos pode acionar comportamentos não previstos.",
    "scenario": "Uma importação fictícia de preferências tenta reconstruir tipos arbitrários.",
    "rootCause": "Formato e tipos recebidos controlam a instanciação ou efeitos na desserialização.",
    "vulnerableExample": "objeto serializado externo → reconstruir classes arbitrárias.",
    "secureImplementation": "usar formato de dados simples com schema e limites; não instanciar tipos escolhidos pelo remetente.",
    "laravelExample": "Evitar unserialize de entrada não confiável; JSON também precisa de validação de estrutura e limites.",
    "expressExample": "JSON.parse produz dados, mas merge/uso posterior exige validação; evitar bibliotecas que reconstruam funções/tipos arbitrários.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma importação fictícia de preferências tenta reconstruir tipos arbitrários. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "usar formato de dados simples com schema e limites; não instanciar tipos escolhidos pelo remetente.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Schema inválido",
      "campos extras",
      "profundidade",
      "versão incompatível",
      "ausência de efeito."
    ],
    "mistake": "JSON não elimina todos os riscos de uso posterior dos dados.",
    "refs": [
      "deserialize"
    ],
    "web": [
      "A08:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-502"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-20-input-validation-and-output-encoding",
    "number": 20,
    "name": "Input Validation and Output Encoding",
    "category": "injection-validation",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql",
      "http"
    ],
    "explanation": "Entrada válida para o negócio e saída adequada ao contexto são controles distintos.",
    "scenario": "Uma API fictícia valida um identificador, mas aceita quantidade fora do intervalo permitido.",
    "rootCause": "Tipos/formato são confundidos com regra de domínio e com encoding da saída.",
    "vulnerableExample": "converter valor sem rejeitar ambiguidade → reutilizar em qualquer contexto.",
    "secureImplementation": "validar sintaxe, semântica e limites; codificar a saída conforme seu destino.",
    "laravelExample": "Form Request com regras e campos selecionados; invariantes de negócio e Policy continuam separados.",
    "expressExample": "Schema de validação mantido e DTO explícito; converter tipo não substitui rejeitar entrada inválida.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma API fictícia valida um identificador, mas aceita quantidade fora do intervalo permitido. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "validar sintaxe, semântica e limites; codificar a saída conforme seu destino.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Limites mínimo/máximo",
      "unicode",
      "campo desconhecido",
      "saída HTML/URL",
      "regra violada."
    ],
    "mistake": "Validar entrada não substitui autorização nem encoding.",
    "refs": [
      "validation",
      "xss"
    ],
    "web": [
      "A05:2025"
    ],
    "api": [],
    "cwe": [
      "CWE-20"
    ],
    "stages": [
      "04",
      "07"
    ]
  },
  {
    "id": "bst50-21-password-hashing",
    "number": 21,
    "name": "Password Hashing",
    "category": "data-cryptography",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Senhas precisam de derivação resistente a tentativas offline; criptografia reversível não é armazenamento de senha adequado.",
    "scenario": "Uma base fictícia de contas possui registros com algoritmos e custos diferentes.",
    "rootCause": "Hash rápido ou segredo reversível facilita recuperação após exposição da base.",
    "vulnerableExample": "senha → hash rápido genérico → comparar manualmente.",
    "secureImplementation": "função apropriada de senha, custo adequado, verificação de biblioteca e rehash quando necessário.",
    "laravelExample": "Hash::make/check/needsRehash com configuração compatível; proteger também fluxos e logs.",
    "expressExample": "Biblioteca mantida de Argon2id ou alternativa adequada e verificação própria da biblioteca; Express não oferece hashing nativo.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma base fictícia de contas possui registros com algoritmos e custos diferentes. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "função apropriada de senha, custo adequado, verificação de biblioteca e rehash quando necessário.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Senha correta/incorreta",
      "upgrade de custo",
      "ausência de senha em logs",
      "limites de entrada."
    ],
    "mistake": "Criptografar senha para descriptografá-la não substitui password hashing.",
    "refs": [
      "password"
    ],
    "web": [
      "A04:2025"
    ],
    "api": [
      "API2:2023"
    ],
    "cwe": [
      "CWE-916"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-22-sensitive-data-exposure",
    "number": 22,
    "name": "Sensitive Data Exposure",
    "category": "data-cryptography",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Dados sensíveis podem alcançar respostas, caches ou arquivos além da necessidade autorizada.",
    "scenario": "Um relatório fictício inclui campos internos que a pessoa não precisa consultar.",
    "rootCause": "Serialização e classificação de dados não delimitam o que cada destinatário recebe.",
    "vulnerableExample": "serializar objeto inteiro → responder ao cliente.",
    "secureImplementation": "classificar dados → selecionar campos por finalidade e autorização → limitar cache/retenção.",
    "laravelExample": "API Resources e campos explicitamente permitidos; hidden não substitui revisão de relações e política.",
    "expressExample": "Construir DTO de resposta explícito; não serializar automaticamente linha/objeto inteiro.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um relatório fictício inclui campos internos que a pessoa não precisa consultar. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "classificar dados → selecionar campos por finalidade e autorização → limitar cache/retenção.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Pessoa A/B",
      "campo interno ausente",
      "cache privado",
      "exportação e erro."
    ],
    "mistake": "TLS não corrige uma resposta que divulga dados ao destinatário errado.",
    "refs": [
      "privacy"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API3:2023"
    ],
    "cwe": [
      "CWE-200"
    ],
    "stages": [
      "04",
      "07"
    ]
  },
  {
    "id": "bst50-23-encryption-at-rest",
    "number": 23,
    "name": "Encryption at Rest",
    "category": "data-cryptography",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Criptografia em armazenamento protege contra ameaças específicas, sem corrigir acessos autorizados indevidos.",
    "scenario": "Um volume de documentos fictícios é copiado sem o serviço que controla a chave.",
    "rootCause": "Chaves ficam junto dos dados ou a ameaça considerada não é definida.",
    "vulnerableExample": "arquivo cifrado e chave no mesmo pacote de backup sem separação.",
    "secureImplementation": "definir ameaça; criptografia autenticada mantida; chaves separadas com acesso mínimo e recuperação testada.",
    "laravelExample": "Crypt pode proteger campos conforme o caso; APP_KEY e backups exigem ciclo de vida próprio.",
    "expressExample": "Usar biblioteca de criptografia mantida ou serviço de chaves; não inventar algoritmo ou derivação.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um volume de documentos fictícios é copiado sem o serviço que controla a chave. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir ameaça; criptografia autenticada mantida; chaves separadas com acesso mínimo e recuperação testada.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Chave ausente",
      "integridade do ciphertext",
      "restauração",
      "escopo de leitura."
    ],
    "mistake": "Criptografia de disco não limita o que a aplicação autenticada pode ler.",
    "refs": [
      "crypto",
      "key"
    ],
    "web": [
      "A04:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "11"
    ]
  },
  {
    "id": "bst50-24-encryption-in-transit",
    "number": 24,
    "name": "Encryption in Transit",
    "category": "data-cryptography",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Proteção de transporte depende de validação do par e de todos os trechos relevantes, não só do navegador.",
    "scenario": "Um cliente fictício ignora falhas de certificado ao conversar com serviço de teste.",
    "rootCause": "TLS é desativado ou termina antes de um trecho ainda exposto.",
    "vulnerableExample": "falha de certificado → desabilitar verificação permanentemente.",
    "secureImplementation": "validar certificados/nomes, configurar protocolos atuais e explicitar a fronteira de terminação.",
    "laravelExample": "Cliente HTTP mantém verificação TLS; proxy confiável e cookies seguros precisam de configuração coerente.",
    "expressExample": "Clientes Node mantêm validação TLS; não desabilitar verificação global para contornar erro.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um cliente fictício ignora falhas de certificado ao conversar com serviço de teste. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "validar certificados/nomes, configurar protocolos atuais e explicitar a fronteira de terminação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Certificado/nome inválidos em ambiente de teste",
      "renovação",
      "trecho interno definido."
    ],
    "mistake": "HTTPS no front não prova proteção de todos os saltos.",
    "refs": [
      "tls"
    ],
    "web": [
      "A04:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-25-secrets-management",
    "number": 25,
    "name": "Secrets Management",
    "category": "data-cryptography",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "ci-cd"
    ],
    "explanation": "Credenciais precisam de acesso restrito, inventário, rotação e revogação, inclusive em CI e backups.",
    "scenario": "Um token fictício aparece no histórico de um projeto de demonstração.",
    "rootCause": "Segredos tratados como texto comum se espalham entre artefatos e permissões.",
    "vulnerableExample": "token em arquivo versionado → build e logs replicam o valor.",
    "secureImplementation": "retirar uso, revogar/rotacionar, remover exposição e reduzir escopo de distribuição.",
    "laravelExample": "Configuração lê segredo fora do repositório; env.example contém só nomes e valores fictícios.",
    "expressExample": "Configuração lê variável/secret store com escopo; não colocar credenciais no bundle ou scripts versionados.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um token fictício aparece no histórico de um projeto de demonstração. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "retirar uso, revogar/rotacionar, remover exposição e reduzir escopo de distribuição.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Busca com sentinela fictícia",
      "log redigido",
      "rotação",
      "permissão mínima",
      "recuperação."
    ],
    "mistake": "Apagar a linha atual não revoga um segredo já exposto.",
    "refs": [
      "secrets"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-26-cryptographic-key-management",
    "number": 26,
    "name": "Cryptographic Key Management",
    "category": "data-cryptography",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Uma chave tem geração, acesso, versão, uso, rotação, revogação e recuperação próprios.",
    "scenario": "Uma restauração fictícia encontra dados cifrados com uma chave antiga que foi descartada.",
    "rootCause": "Rotação é confundida com substituição irreversível sem inventário ou janela de leitura.",
    "vulnerableExample": "substituir chave → perder acesso a versões anteriores sem plano.",
    "secureImplementation": "inventariar versões/finalidade; proteger material; separar funções e testar migração/recuperação.",
    "laravelExample": "Planejar rotação e compatibilidade do mecanismo Laravel adotado, sem publicar APP_KEY.",
    "expressExample": "Usar identificadores de versão e serviço/biblioteca adequada, sem armazenar chave com ciphertext.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma restauração fictícia encontra dados cifrados com uma chave antiga que foi descartada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "inventariar versões/finalidade; proteger material; separar funções e testar migração/recuperação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Chave antiga",
      "revogada",
      "uso errado",
      "backup",
      "recuperação com autorização."
    ],
    "mistake": "Rotacionar sem plano pode destruir disponibilidade dos dados.",
    "refs": [
      "key",
      "crypto"
    ],
    "web": [
      "A04:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "11"
    ]
  },
  {
    "id": "bst50-27-sensitive-data-logging",
    "number": 27,
    "name": "Sensitive Data Logging",
    "category": "data-cryptography",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Logs podem expor credenciais, identificadores de sessão e dados de pessoas.",
    "scenario": "Um log fictício de erro registra cabeçalhos completos de uma requisição.",
    "rootCause": "Registro indiscriminado captura conteúdo sensível e amplia seu acesso.",
    "vulnerableExample": "logar request completo, inclusive credenciais.",
    "secureImplementation": "registrar eventos/campos permitidos; redigir segredos antes da saída e limitar acesso/retenção.",
    "laravelExample": "Contexto de logs deve excluir senha/token/sessão; conferir handlers e relatórios de exceção.",
    "expressExample": "Logger estruturado com redaction de campos e serializadores revisados, antes de exportar logs.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um log fictício de erro registra cabeçalhos completos de uma requisição. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "registrar eventos/campos permitidos; redigir segredos antes da saída e limitar acesso/retenção.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Sentinelas fictícias ausentes",
      "erro",
      "headers",
      "logs de dependências",
      "truncamento."
    ],
    "mistake": "Mascarar só a interface de visualização não remove o segredo armazenado.",
    "refs": [
      "logging"
    ],
    "web": [
      "A09:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-28-data-retention-and-secure-deletion",
    "number": 28,
    "name": "Data Retention and Secure Deletion",
    "category": "data-cryptography",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Guardar menos e remover dados exige política para cópias, índices, logs e backups.",
    "scenario": "Uma pessoa fictícia solicita exclusão, mas o dado reaparece numa restauração.",
    "rootCause": "Política cobre só a tabela principal e não trata retenção e restauração.",
    "vulnerableExample": "apagar linha ativa → declarar eliminação de todas as cópias.",
    "secureImplementation": "inventariar cópias, retenção e base aplicável; automatizar expiração e conferir restauração.",
    "laravelExample": "Jobs de retenção e exclusão devem incluir relações/arquivos e limites de backup, conforme a política definida.",
    "expressExample": "Serviço de retenção cobre stores/objetos/logs; documentar cópias imutáveis e acesso residual.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma pessoa fictícia solicita exclusão, mas o dado reaparece numa restauração. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "inventariar cópias, retenção e base aplicável; automatizar expiração e conferir restauração.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Expiração",
      "cópia derivada",
      "restauração",
      "retenção excepcional justificada."
    ],
    "mistake": "Excluir arquivo não garante sobrescrita física em qualquer mídia ou nuvem.",
    "refs": [
      "privacy"
    ],
    "web": [],
    "api": [],
    "cwe": [],
    "stages": [
      "11"
    ]
  },
  {
    "id": "bst50-29-mass-assignment",
    "number": 29,
    "name": "Mass Assignment",
    "category": "api-business",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Propriedades recebidas podem alterar atributos que o cliente não tem permissão de controlar.",
    "scenario": "Uma API fictícia de assinaturas recebe um campo interno junto de uma atualização legítima.",
    "rootCause": "Objeto de entrada é passado integralmente à persistência.",
    "vulnerableExample": "salvar todos os campos recebidos em objeto de domínio.",
    "secureImplementation": "permitir campos por operação e perfil; validar; conferir invariantes e estado final.",
    "laravelExample": "Form Request validated/safe e fillable/guarded bem definidos; Policy para atributos sensíveis.",
    "expressExample": "DTO com campos permitidos antes de chamar Knex/pg; validação sem seleção explícita pode deixar extras.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma API fictícia de assinaturas recebe um campo interno junto de uma atualização legítima. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "permitir campos por operação e perfil; validar; conferir invariantes e estado final.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Campo interno",
      "perfil distinto",
      "campo legítimo",
      "estado persistido antes/depois."
    ],
    "mistake": "Allowlist de campos não resolve sozinha autorização por objeto.",
    "refs": [
      "mass",
      "validation"
    ],
    "web": [
      "A01:2025"
    ],
    "api": [
      "API3:2023"
    ],
    "cwe": [
      "CWE-915"
    ],
    "stages": [
      "04",
      "07"
    ]
  },
  {
    "id": "bst50-30-rate-limiting",
    "number": 30,
    "name": "Rate Limiting",
    "category": "api-business",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Limites devem representar identidade, operação, janela e armazenamento reais.",
    "scenario": "Uma API fictícia limita todos os clientes pela mesma chave ou aceita origem forjada.",
    "rootCause": "Chave/proxy/store não representam o sujeito ou a concorrência do serviço.",
    "vulnerableExample": "contador local por processo → supor limite global.",
    "secureImplementation": "definir chave, janela, custo, store e política de falha; testar concorrência e recuperação.",
    "laravelExample": "RateLimiter precisa de backend/chave/expiração adequados e proxy confiável configurado.",
    "expressExample": "Limiter mantido com store e versão compatíveis; trust proxy não deve aceitar qualquer origem.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma API fictícia limita todos os clientes pela mesma chave ou aceita origem forjada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir chave, janela, custo, store e política de falha; testar concorrência e recuperação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Identidades distintas",
      "concorrência",
      "expiração",
      "proxy",
      "store indisponível."
    ],
    "mistake": "Um limite não prova proteção contra todo abuso distribuído.",
    "refs": [
      "dos",
      "credential"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [
      "API4:2023"
    ],
    "cwe": [],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-31-resource-exhaustion",
    "number": 31,
    "name": "Resource Exhaustion",
    "category": "api-business",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Operações válidas podem consumir CPU, memória, conexões ou custos além dos limites previstos.",
    "scenario": "Uma consulta fictícia pede uma exportação ilimitada com execução concorrente.",
    "rootCause": "A aplicação limita quantidade de requests mas não tamanho, custo ou tempo do trabalho.",
    "vulnerableExample": "requisição válida → trabalho e resultado sem teto.",
    "secureImplementation": "limitar payload, paginação, tempo, concorrência e quotas; cancelar e liberar recursos.",
    "laravelExample": "Validar limites e controlar jobs/consultas/streaming segundo o custo do endpoint.",
    "expressExample": "Aplicar limites de corpo/tempo/conexões e backpressure; rate limit não substitui budget de trabalho.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma consulta fictícia pede uma exportação ilimitada com execução concorrente. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "limitar payload, paginação, tempo, concorrência e quotas; cancelar e liberar recursos.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Máximo permitido",
      "consumidor lento",
      "cancelamento",
      "fila limitada",
      "erro sem vazamento."
    ],
    "mistake": "Aumentar recursos não corrige trabalho sem limite.",
    "refs": [
      "dos"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [
      "API4:2023"
    ],
    "cwe": [
      "CWE-400"
    ],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-32-business-logic-abuse",
    "number": 32,
    "name": "Business Logic Abuse",
    "category": "api-business",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Uma sequência de operações permitidas pode violar uma regra econômica ou de uso.",
    "scenario": "Um fluxo fictício de créditos permite repetir uma promoção fora da condição prevista.",
    "rootCause": "Controles são feitos por endpoint, sem invariantes de estado e política de uso.",
    "vulnerableExample": "cada passo válido isoladamente → benefício repetido sem elegibilidade.",
    "secureImplementation": "modelar invariantes e transições; autorizar o efeito; limitar abuso e testar sequências.",
    "laravelExample": "Regras e transações no caso de uso, com constraints quando apropriadas; não apenas validação de formulário.",
    "expressExample": "Serviço de domínio e transação no driver/query builder; Express não impõe invariantes de negócio.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um fluxo fictício de créditos permite repetir uma promoção fora da condição prevista. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "modelar invariantes e transições; autorizar o efeito; limitar abuso e testar sequências.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Ordem invertida",
      "repetição",
      "limite de elegibilidade",
      "duas pessoas",
      "rollback."
    ],
    "mistake": "Uma resposta HTTP válida não prova que o negócio foi respeitado.",
    "refs": [
      "business"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [
      "API6:2023"
    ],
    "cwe": [],
    "stages": [
      "09",
      "11"
    ]
  },
  {
    "id": "bst50-33-race-conditions",
    "number": 33,
    "name": "Race Conditions",
    "category": "api-business",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Checagens separadas de uma alteração podem deixar decisões concorrentes incompatíveis.",
    "scenario": "Duas solicitações fictícias tentam obter a última unidade ao mesmo tempo.",
    "rootCause": "A invariável depende de um estado lido antes de outra transação alterá-lo.",
    "vulnerableExample": "ler disponibilidade → confirmar depois sem proteção atômica.",
    "secureImplementation": "proteger invariável na transação/constraint ou operação atômica apropriada; tratar conflito.",
    "laravelExample": "Transação Laravel não implica serialização automática; justificar lock/constraint e retentativa.",
    "expressExample": "Usar a mesma conexão na transação pg/Knex e justificar nível/constraint/lock.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, duas solicitações fictícias tentam obter a última unidade ao mesmo tempo. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "proteger invariável na transação/constraint ou operação atômica apropriada; tratar conflito.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Duas operações concorrentes",
      "conflito",
      "retry limitado",
      "integridade após rollback."
    ],
    "mistake": "Um teste sequencial não demonstra proteção concorrente.",
    "refs": [
      "business"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [
      "API6:2023"
    ],
    "cwe": [
      "CWE-362"
    ],
    "stages": [
      "11"
    ]
  },
  {
    "id": "bst50-34-replay-attacks",
    "number": 34,
    "name": "Replay Attacks",
    "category": "api-business",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Uma mensagem autêntica pode ser reutilizada fora do efeito ou intervalo autorizado.",
    "scenario": "Uma solicitação fictícia assinada é reapresentada depois de sua autorização ter mudado.",
    "rootCause": "Autenticidade é confundida com frescor, unicidade e autorização atual.",
    "vulnerableExample": "assinatura válida → repetir o efeito sem conferir estado atual.",
    "secureImplementation": "validar destinatário/frescor e política atual; deduplicar de modo atômico no escopo correto.",
    "laravelExample": "Revalidar Policy e estado no replay; chave de idempotência sozinha não autentica o solicitante.",
    "expressExample": "Revalidar identidade/escopo e deduplicação na mesma fronteira do efeito; não confundir retry com autorização.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma solicitação fictícia assinada é reapresentada depois de sua autorização ter mudado. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "validar destinatário/frescor e política atual; deduplicar de modo atômico no escopo correto.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Duplicata",
      "expiração",
      "corpo alterado",
      "autorização revogada",
      "concorrência."
    ],
    "mistake": "Exactly-once de transporte não é premissa segura para efeito externo.",
    "refs": [
      "webhook",
      "business"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [
      "API6:2023"
    ],
    "cwe": [],
    "stages": [
      "11",
      "12"
    ]
  },
  {
    "id": "bst50-35-insecure-webhooks",
    "number": 35,
    "name": "Insecure Webhooks",
    "category": "api-business",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Receptores precisam validar origem, integridade, frescor e aplicação idempotente dos eventos.",
    "scenario": "Um receptor fictício recebe duas notificações iguais e uma com corpo alterado.",
    "rootCause": "Requisição de entrada é aceita só porque conhece um endpoint ou header.",
    "vulnerableExample": "JSON recebido → confirmar efeito sem validar remetente/contrato.",
    "secureImplementation": "verificar assinatura conforme contrato e bytes exigidos, janela e deduplicação; revalidar regras do efeito.",
    "laravelExample": "Conservar raw body quando o esquema exigir; verificação específica do provedor e processamento transacional.",
    "expressExample": "Configurar raw body antes do parser quando necessário; biblioteca de assinatura e ledger de efeito.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um receptor fictício recebe duas notificações iguais e uma com corpo alterado. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "verificar assinatura conforme contrato e bytes exigidos, janela e deduplicação; revalidar regras do efeito.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Corpo alterado",
      "assinatura inválida",
      "repetição",
      "fora da janela",
      "falha entre commits."
    ],
    "mistake": "Idempotência e assinatura resolvem problemas diferentes.",
    "refs": [
      "webhook"
    ],
    "web": [
      "A08:2025"
    ],
    "api": [
      "API10:2023"
    ],
    "cwe": [
      "CWE-345"
    ],
    "stages": [
      "12"
    ]
  },
  {
    "id": "bst50-36-unsafe-third-party-api-consumption",
    "number": 36,
    "name": "Unsafe Third-Party API Consumption",
    "category": "api-business",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Respostas de serviços externos continuam não confiáveis, mesmo de um fornecedor conhecido.",
    "scenario": "Uma integração fictícia recebe campos extras, resposta gigante e redirect inesperado.",
    "rootCause": "A aplicação valida seus clientes, mas confia integralmente nos fornecedores.",
    "vulnerableExample": "resposta externa → repassar para persistência ou outra chamada.",
    "secureImplementation": "validar schema/tamanho/tempo/destino; limitar privilégios; mapear erros e campos explicitamente.",
    "laravelExample": "HTTP Client requer validação da resposta e limites; não usar dados externos como comandos.",
    "expressExample": "Cliente HTTP e schema explícitos; timeouts, limites e tratamento de falha próprios.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma integração fictícia recebe campos extras, resposta gigante e redirect inesperado. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "validar schema/tamanho/tempo/destino; limitar privilégios; mapear erros e campos explicitamente.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Schema diferente",
      "timeout",
      "campo privilegiado",
      "resposta limitada",
      "redirect."
    ],
    "mistake": "TLS autentica o par, não garante correção de seus dados.",
    "refs": [
      "rest",
      "ssrf"
    ],
    "web": [
      "A08:2025"
    ],
    "api": [
      "API10:2023"
    ],
    "cwe": [
      "CWE-20"
    ],
    "stages": [
      "12"
    ]
  },
  {
    "id": "bst50-37-security-misconfiguration",
    "number": 37,
    "name": "Security Misconfiguration",
    "category": "configuration-supply-chain",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "ci-cd",
      "containers"
    ],
    "explanation": "Opções inseguras, recursos desnecessários e ambientes divergentes podem expor comportamento não planejado.",
    "scenario": "Um ambiente fictício de revisão mantém debug e endpoints administrativos acessíveis.",
    "rootCause": "Configuração não é inventariada, revisada ou conferida no ambiente efetivo.",
    "vulnerableExample": "usar defaults e debug → supor configuração segura.",
    "secureImplementation": "definir baseline por ambiente, remover superfície desnecessária e testar configuração efetiva.",
    "laravelExample": "APP_DEBUG e rotas/ferramentas de diagnóstico precisam ser restritos; conferir config cache real.",
    "expressExample": "NODE_ENV não configura toda segurança; revisar middleware, proxy, exposição e erro.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um ambiente fictício de revisão mantém debug e endpoints administrativos acessíveis. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir baseline por ambiente, remover superfície desnecessária e testar configuração efetiva.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Debug desligado",
      "endpoint inexistente",
      "permissões",
      "artefato sem segredo",
      "configuração carregada."
    ],
    "mistake": "Copiar um arquivo recomendado não prova o estado de execução.",
    "refs": [
      "deployment"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [
      "API8:2023"
    ],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-38-security-headers",
    "number": 38,
    "name": "Security Headers",
    "category": "configuration-supply-chain",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "Headers reduzem riscos específicos do navegador quando correspondem ao conteúdo e à implantação.",
    "scenario": "Uma página fictícia de administração pode ser incorporada onde a política não pretendia.",
    "rootCause": "Política de navegador está ausente ou foi copiada sem avaliar origens e funcionalidades.",
    "vulnerableExample": "headers arbitrários → alegar prevenção total de ataques.",
    "secureImplementation": "configurar CSP e políticas aplicáveis, testar fluxos e evitar exceções amplas sem justificativa.",
    "laravelExample": "Configurar no servidor/middleware efetivo; não presumir que todo header é fornecido pelo framework.",
    "expressExample": "Helmet ajuda a configurar headers; revisar valores, nonce/CSP e compatibilidade da aplicação.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma página fictícia de administração pode ser incorporada onde a política não pretendia. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "configurar CSP e políticas aplicáveis, testar fluxos e evitar exceções amplas sem justificativa.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Headers efetivos",
      "origem permitida",
      "framing",
      "recurso bloqueado",
      "ausência de segredo."
    ],
    "mistake": "Header não substitui autorização ou encoding por contexto.",
    "refs": [
      "headers",
      "xss"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [
      "API8:2023"
    ],
    "cwe": [],
    "stages": [
      "07",
      "08"
    ]
  },
  {
    "id": "bst50-39-cors-misconfiguration",
    "number": 39,
    "name": "CORS Misconfiguration",
    "category": "configuration-supply-chain",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "http"
    ],
    "explanation": "CORS controla leitura pelo navegador entre origens; não é uma política de autorização do recurso.",
    "scenario": "Uma API fictícia reflete qualquer Origin enquanto permite credenciais.",
    "rootCause": "Origem não confiável é aceita sem política, ou CORS é tratado como autenticação.",
    "vulnerableExample": "refletir Origin → liberar leitura credenciada.",
    "secureImplementation": "allowlist de origens reais e configuração coerente de credenciais; servidor ainda autoriza cada ação.",
    "laravelExample": "Configurar origens e sessão/CSRF conforme domínio efetivo; CORS não corrige cookie bloqueado.",
    "expressExample": "Middleware cors configurado para origens necessárias; validar proxy e cookies sem liberar tudo.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma API fictícia reflete qualquer Origin enquanto permite credenciais. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "allowlist de origens reais e configuração coerente de credenciais; servidor ainda autoriza cada ação.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Origem permitida/negada",
      "preflight",
      "credenciais",
      "cliente sem navegador",
      "CSRF."
    ],
    "mistake": "Cliente HTTP pode chamar a API independentemente de CORS.",
    "refs": [
      "rest",
      "session"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [
      "API8:2023"
    ],
    "cwe": [],
    "stages": [
      "10"
    ]
  },
  {
    "id": "bst50-40-dependency-vulnerabilities",
    "number": 40,
    "name": "Dependency Vulnerabilities",
    "category": "configuration-supply-chain",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "ci-cd"
    ],
    "explanation": "Um advisory precisa ser confrontado com versão, caminho de uso, configuração e alcance.",
    "scenario": "Um manifesto fictício contém dependência com alerta em uma função não analisada.",
    "rootCause": "A equipe aceita todos os alertas como exploração comprovada ou ignora avisos sem triagem.",
    "vulnerableExample": "scanner verde/vermelho → decisão sem contexto.",
    "secureImplementation": "identificar versão/advisory, alcance, atualização/mitigação, teste e risco residual.",
    "laravelExample": "Composer lock/audit são insumos; revisar dependências transitivas e regressão na versão adotada.",
    "expressExample": "Lockfile e npm audit são insumos; confirmar advisory original e caminhos de execução.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um manifesto fictício contém dependência com alerta em uma função não analisada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "identificar versão/advisory, alcance, atualização/mitigação, teste e risco residual.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Versão afetada/não afetada",
      "transitive",
      "mitigação",
      "regressão",
      "advisory não confirmado."
    ],
    "mistake": "Ausência de alerta conhecido não prova ausência de vulnerabilidade.",
    "refs": [
      "dependency"
    ],
    "web": [
      "A03:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-41-software-supply-chain-attacks",
    "number": 41,
    "name": "Software Supply Chain Attacks",
    "category": "configuration-supply-chain",
    "level": "senior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "ci-cd"
    ],
    "explanation": "Código, artefatos e identidades de build podem ser comprometidos antes da execução da aplicação.",
    "scenario": "Uma atualização fictícia introduz pacote de origem diferente e script de instalação novo.",
    "rootCause": "A confiança se baseia só no nome ou na versão, sem origem e integridade rastreáveis.",
    "vulnerableExample": "atualizar dependência pelo nome parecido → executar scripts sem revisão.",
    "secureImplementation": "verificar origem, mantenedor, integridade e processo de build; reduzir privilégios e revisar mudanças.",
    "laravelExample": "Conferir pacotes/lock/plugins/scripts Composer e permissões do CI, sem instalar nada automaticamente.",
    "expressExample": "Conferir pacote/lock/lifecycle scripts e proveniência dos artefatos antes de executar.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma atualização fictícia introduz pacote de origem diferente e script de instalação novo. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "verificar origem, mantenedor, integridade e processo de build; reduzir privilégios e revisar mudanças.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Troca de origem",
      "integridade divergente",
      "script novo",
      "rollback",
      "privilégio do build."
    ],
    "mistake": "Lockfile não comprova confiabilidade do mantenedor.",
    "refs": [
      "supply"
    ],
    "web": [
      "A03:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-42-ci-cd-pipeline-security",
    "number": 42,
    "name": "CI/CD Pipeline Security",
    "category": "configuration-supply-chain",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "ci-cd"
    ],
    "explanation": "Pipelines processam código e eventos com diferentes níveis de confiança e acesso a segredos.",
    "scenario": "Um workflow fictício de contribuição externa tenta usar credenciais de publicação.",
    "rootCause": "Código não confiável recebe identidade, permissões ou artefatos privilegiados.",
    "vulnerableExample": "qualquer evento → job com token de escrita e segredos.",
    "secureImplementation": "separar contextos de confiança, permissões mínimas e aprovações de publicação; conferir dependências do workflow.",
    "laravelExample": "Aplicar controles no provedor de CI; Laravel não protege o runner ou o token do workflow.",
    "expressExample": "Aplicar controles no provedor de CI; Express não isola código de pull request no runner.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um workflow fictício de contribuição externa tenta usar credenciais de publicação. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "separar contextos de confiança, permissões mínimas e aprovações de publicação; conferir dependências do workflow.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Evento externo",
      "permissões do token",
      "dependência fixada",
      "artefato",
      "aprovação de deploy."
    ],
    "mistake": "Uma revisão do YAML não demonstra que o runner foi validado.",
    "refs": [
      "ci",
      "supply"
    ],
    "web": [
      "A03:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-43-container-and-deployment-security",
    "number": 43,
    "name": "Container and Deployment Security",
    "category": "configuration-supply-chain",
    "level": "mid",
    "area": "api",
    "technologies": [
      "laravel",
      "express",
      "ci-cd",
      "containers"
    ],
    "explanation": "A imagem e o runtime precisam de identidade, rede, arquivos e recursos compatíveis com a ameaça.",
    "scenario": "Um container fictício recebe escrita e acesso de host desnecessários.",
    "rootCause": "Privilégios e mounts são herdados sem analisar a operação necessária.",
    "vulnerableExample": "container com privilégios amplos → considerar isolamento absoluto.",
    "secureImplementation": "usuário e capabilities mínimos, filesystem/rede/mounts delimitados, imagem confiável e atualização planejada.",
    "laravelExample": "Conferir runtime PHP, document root e permissões; o container não elimina risco da aplicação.",
    "expressExample": "Conferir processo Node, usuário/mounts e sinais; o container não é uma fronteira perfeita.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um container fictício recebe escrita e acesso de host desnecessários. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "usuário e capabilities mínimos, filesystem/rede/mounts delimitados, imagem confiável e atualização planejada.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Usuário efetivo",
      "mount",
      "segredo ausente na imagem",
      "rede",
      "limite de recursos."
    ],
    "mistake": "Executar em Docker não prova hardening nem segurança de produção.",
    "refs": [
      "docker",
      "deployment"
    ],
    "web": [
      "A02:2025"
    ],
    "api": [
      "API8:2023"
    ],
    "cwe": [],
    "stages": [
      "08"
    ]
  },
  {
    "id": "bst50-44-security-logging",
    "number": 44,
    "name": "Security Logging",
    "category": "monitoring-testing",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Eventos relevantes precisam de contexto suficiente para investigação sem expor o conteúdo protegido.",
    "scenario": "Uma mudança fictícia de permissão não deixa trilha de quem decidiu e qual efeito ocorreu.",
    "rootCause": "Logs são só mensagens soltas ou registram dados excessivos em vez de eventos úteis.",
    "vulnerableExample": "log genérico sem ator/ação/resultado → investigação ambígua.",
    "secureImplementation": "registrar evento, ator pseudonimizado, ação, resultado, correlação e controle de acesso/retenção.",
    "laravelExample": "Contexto de logging e eventos devem distinguir recusas, sucesso e falha, sem senha/token.",
    "expressExample": "Logger estruturado com campos permitidos e correlação; revisão de serializadores e acesso ao store.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma mudança fictícia de permissão não deixa trilha de quem decidiu e qual efeito ocorreu. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "registrar evento, ator pseudonimizado, ação, resultado, correlação e controle de acesso/retenção.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Permissão concedida/negada",
      "falha de escrita",
      "correlação",
      "redaction",
      "retenção."
    ],
    "mistake": "Ter muitos logs não significa ter uma trilha de auditoria útil.",
    "refs": [
      "logging"
    ],
    "web": [
      "A09:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-45-security-monitoring",
    "number": 45,
    "name": "Security Monitoring",
    "category": "monitoring-testing",
    "level": "mid",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Telemetria precisa gerar investigação e resposta proporcionais, com hipóteses e limites conhecidos.",
    "scenario": "Um alerta fictício dispara em toda operação normal e deixa de sinalizar repetição anômala.",
    "rootCause": "Regras sem contexto, teste ou responsável criam ruído e pontos cegos.",
    "vulnerableExample": "coletar tudo → nenhum destino ou procedimento para alerta.",
    "secureImplementation": "definir sinais, limiares contextuais, encaminhamento, teste e responsabilidade de resposta.",
    "laravelExample": "Instrumentar eventos do backend e encaminhar conforme política; não impor SaaS ou dashboard específico.",
    "expressExample": "Instrumentar eventos e métricas com labels limitadas; disponibilidade do canal precisa de teste.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, um alerta fictício dispara em toda operação normal e deixa de sinalizar repetição anômala. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir sinais, limiares contextuais, encaminhamento, teste e responsabilidade de resposta.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Evento simulado",
      "atraso",
      "falso positivo",
      "indisponibilidade do coletor",
      "ação do responsável."
    ],
    "mistake": "Ausência de alerta não prova ausência de incidente.",
    "refs": [
      "logging"
    ],
    "web": [
      "A09:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "07"
    ]
  },
  {
    "id": "bst50-46-error-handling-and-information-disclosure",
    "number": 46,
    "name": "Error Handling and Information Disclosure",
    "category": "monitoring-testing",
    "level": "junior",
    "area": "api",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Respostas de falha podem divulgar dados ou deixar a aplicação continuar após uma condição inválida.",
    "scenario": "Uma operação fictícia falha entre duas gravações e responde com stack trace e estado parcial.",
    "rootCause": "Exceções não têm fronteira, rollback e resposta pública definidos.",
    "vulnerableExample": "capturar erro → expor trace ou continuar como sucesso.",
    "secureImplementation": "rollback/limpeza apropriados, erro público sanitizado e registro interno limitado, sem fail-open indevido.",
    "laravelExample": "Handler de exceções e transações precisam de resposta coerente; debug não pode expor a base.",
    "expressExample": "Middleware de erro e tratamento de promises conforme versão; não responder sucesso após falha.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma operação fictícia falha entre duas gravações e responde com stack trace e estado parcial. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "rollback/limpeza apropriados, erro público sanitizado e registro interno limitado, sem fail-open indevido.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Falha intermediária",
      "estado após rollback",
      "resposta sem trace",
      "correlação",
      "limpeza."
    ],
    "mistake": "Esconder a mensagem não corrige um efeito parcial já confirmado.",
    "refs": [
      "error"
    ],
    "web": [
      "A10:2025"
    ],
    "api": [
      "API8:2023"
    ],
    "cwe": [
      "CWE-209"
    ],
    "stages": [
      "04",
      "07",
      "11"
    ]
  },
  {
    "id": "bst50-47-security-testing",
    "number": 47,
    "name": "Security Testing",
    "category": "monitoring-testing",
    "level": "junior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "postgresql"
    ],
    "explanation": "Um teste de segurança deve verificar uma ameaça e observar tanto recusa quanto ausência de efeito indevido.",
    "scenario": "Uma suíte fictícia verifica apenas status HTTP, sem consultar o estado após uma operação negada.",
    "rootCause": "O teste não representa o adversário, escopo ou invariável que pretende proteger.",
    "vulnerableExample": "esperar 403 → ignorar mutação e divulgação posteriores.",
    "secureImplementation": "definir escopo e casos positivos/negativos; observar resposta, estado e logs, com evidência real.",
    "laravelExample": "Feature tests com atores e recursos distintos, banco local isolado e comparação de estado.",
    "expressExample": "Testes HTTP/integração com fixtures isoladas e verificações no store real quando necessário.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma suíte fictícia verifica apenas status HTTP, sem consultar o estado após uma operação negada. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir escopo e casos positivos/negativos; observar resposta, estado e logs, com evidência real.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Autorizado/negado",
      "fronteira",
      "concorrência pertinente",
      "regressão falha antes e passa após correção."
    ],
    "mistake": "Scanner ou revisão por IA não substitui evidência de execução.",
    "refs": [
      "testing",
      "wstg-object",
      "standard-wstg",
      "laravel-http-tests",
      "laravel-db-tests",
      "node-tests"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "06",
      "07"
    ]
  },
  {
    "id": "bst50-48-threat-modeling",
    "number": 48,
    "name": "Threat Modeling",
    "category": "monitoring-testing",
    "level": "senior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Modelar ameaças liga ativos, fluxos e fronteiras de confiança a decisões e testes.",
    "scenario": "Uma integração fictícia move um arquivo entre usuário, backend e serviço externo.",
    "rootCause": "O desenho omite quem controla cada dado e qual componente autoriza cada efeito.",
    "vulnerableExample": "diagrama só de caixas → nenhuma ameaça ou decisão rastreável.",
    "secureImplementation": "identificar ativos/atores/fluxos/fronteiras; priorizar cenários e ligar controle, teste, responsável e risco residual.",
    "laravelExample": "Rever fluxos Laravel e dependências reais, sem supor que um padrão arquitetural elimina ameaças.",
    "expressExample": "Rever middleware, serviços e integrações Express; desenho de camadas não é prova de controle.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma integração fictícia move um arquivo entre usuário, backend e serviço externo. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "identificar ativos/atores/fluxos/fronteiras; priorizar cenários e ligar controle, teste, responsável e risco residual.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Fronteira omitida",
      "hipótese rejeitada",
      "mudança de fluxo",
      "abuso",
      "controle verificado."
    ],
    "mistake": "STRIDE é técnica de descoberta, não uma lista universal de todos os riscos.",
    "refs": [
      "threat"
    ],
    "web": [
      "A06:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "11"
    ]
  },
  {
    "id": "bst50-49-incident-response-fundamentals",
    "number": 49,
    "name": "Incident Response Fundamentals",
    "category": "monitoring-testing",
    "level": "senior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express"
    ],
    "explanation": "Responder exige detectar, delimitar, conter, preservar evidência e recuperar com responsabilidade definida.",
    "scenario": "Uma organização fictícia investiga uso indevido de credencial sem alterar serviços reais.",
    "rootCause": "Não há papéis, canal, critérios de contenção ou registro das decisões.",
    "vulnerableExample": "apagar rastros e reiniciar → declarar incidente resolvido.",
    "secureImplementation": "preservar evidência sanitizada, limitar acesso, conter segundo plano e validar recuperação; registrar incerteza.",
    "laravelExample": "Inventariar tokens, jobs, logs e dependências reais do backend; exercício de mesa não é resposta executada.",
    "expressExample": "Inventariar credenciais, processos e logs; planejar revogação/rotação sem usar contas reais.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma organização fictícia investiga uso indevido de credencial sem alterar serviços reais. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "preservar evidência sanitizada, limitar acesso, conter segundo plano e validar recuperação; registrar incerteza.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Linha do tempo",
      "evidência ausente",
      "contenção",
      "rotação planejada",
      "critérios de recuperação."
    ],
    "mistake": "Reiniciar o serviço não demonstra remoção da causa ou do acesso.",
    "refs": [
      "incident",
      "logging"
    ],
    "web": [
      "A09:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "17"
    ]
  },
  {
    "id": "bst50-50-backup-and-recovery-security",
    "number": 50,
    "name": "Backup and Recovery Security",
    "category": "monitoring-testing",
    "level": "senior",
    "area": "backend",
    "technologies": [
      "laravel",
      "express",
      "postgresql",
      "containers"
    ],
    "explanation": "Backups precisam proteger confidencialidade, integridade, disponibilidade e capacidade de restauração autorizada.",
    "scenario": "Uma cópia fictícia existe, mas ninguém demonstra restauração sem o segredo perdido.",
    "rootCause": "Cópia é tratada como recuperação e sua identidade/acesso não são conferidos.",
    "vulnerableExample": "backup concluído → supor serviço recuperável.",
    "secureImplementation": "definir RPO/RTO contextuais, separar acessos/chaves, verificar integridade e restaurar em ambiente isolado.",
    "laravelExample": "Banco, uploads, configuração e chaves precisam de plano conjunto; não salvar segredos reais no relatório.",
    "expressExample": "Inventariar stores/objetos/configuração e testar restore isolado, com permissões e versões compatíveis.",
    "severity": "Prioridade contextual: avalie o ativo, pré-condições, alcance, efeito e controles existentes. No cenário descrito, uma cópia fictícia existe, mas ninguém demonstra restauração sem o segredo perdido. O potencial de impacto precisa de evidência; este tópico não recebe CVSS universal.",
    "prevention": [
      "definir RPO/RTO contextuais, separar acessos/chaves, verificar integridade e restaurar em ambiente isolado.",
      "Conferir a configuração efetiva e a fronteira de confiança neste cenário.",
      "Ligar cada decisão a teste e evidência; registrar risco residual."
    ],
    "tests": [
      "Restore local",
      "checksum",
      "chave",
      "perda parcial",
      "acesso negado",
      "tempo observado ou não executado."
    ],
    "mistake": "Sucesso no comando de cópia não prova recuperação do sistema.",
    "refs": [
      "backup",
      "crypto"
    ],
    "web": [
      "A04:2025"
    ],
    "api": [],
    "cwe": [],
    "stages": [
      "17"
    ]
  }
];
