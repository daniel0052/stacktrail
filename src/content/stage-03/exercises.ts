import type {Exercise} from '../stage-01/types';
export const exercises:Exercise[]=[
  {
    "id": "03-ex01",
    "stageId": "03",
    "slug": "php-livro",
    "title": "Livro tipado com Composer",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Criar Livro com title/author textuais não vazios até200caracteres e year nullable entre1450/2100.",
      "composer install e teste local executados com versões registradas."
    ],
    "prerequisites": [
      "PHP: tipos, arrays, objetos, JSON e Composer; conseguir executar um arquivo CLI."
    ],
    "statement": "Implemente uma biblioteca PHP de livros para importação de um catálogo local, preservando invariantes mesmo quando a CLI recebe dados inválidos.",
    "requirements": [
      "Criar Livro com title/author textuais não vazios até200caracteres e year nullable entre1450/2100.",
      "Normalizar espaços externos; preservar tipos e distinguir erro de estrutura de erro de domínio.",
      "Organizar namespace StackTrail e PSR-4; CLI lê listaJSON e falha com exit1 sem produzir catálogo parcial.",
      "Testar construção, serialização, fronteiras e raizJSON objeto versus lista."
    ],
    "acceptanceCriteria": [
      "composer install e teste local executados com versões registradas.",
      "Livro rejeita vazio/tipo inadequado e preserva invariantes após construção.",
      "CLI distingue listaJSON de objeto, trata erro e demonstra saída/exit.",
      "README mostra comandos e ao menos uma falha corrigida."
    ],
    "hints": [
      "Separe decodificação externa da construção de Livro; strict_types não valida campos JSON.",
      "Decodifique preservando objeto/lista e só depois converta os campos que conferiu.",
      "Teste os dois limites inclusivos e um ponto fora de cada um; não aceite qualquer Throwable como sucesso."
    ],
    "testIdeas": [
      "Construa livro com espaços, título vazio, limite200/201 e ano ausente/1449/1450/2100/2101.",
      "Execute composer test e explique um caso que falhava antes da sua correção.",
      "Compare JSON público com os campos permitidos; não inclua propriedades internas."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://getcomposer.org/doc/",
      "https://laravel.com/docs/13.x"
    ],
    "problem": {
      "inputs": [
        "Lista com {title:\" Redes \",author:\"Ana\",year:null}",
        "JSON {}"
      ],
      "outputs": [
        "Livro normalizado title=Redes e exit0",
        "Erro na CLI, exit1"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "Lista com {title:\" Redes \",author:\"Ana\",year:null}",
          "output": "Livro normalizado title=Redes e exit0",
          "explanation": "Normalização é uma política explícita."
        },
        {
          "input": "JSON {}",
          "output": "Erro na CLI, exit1",
          "explanation": "Objeto não é lista vazia."
        }
      ]
    },
    "commonErrors": [
      "Usar campos públicos mutáveis sem preservar as invariantes do construtor.",
      "Confundir string numérica com inteiro em chamada strict ou validar só tipo, sem domínio.",
      "Copiar autoload manual e esquecer composer install/namespace/case no caminho."
    ]
  },
  {
    "id": "03-ex02",
    "stageId": "03",
    "slug": "node-cli",
    "title": "Relatório CLI em Node e TypeScript",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Ler entrada por fs/promises com tamanho delimitado, validar lista e estrutura dos livros em runtime.",
      "CLI gerou relatório conforme contrato, com comando e arquivo observados."
    ],
    "prerequisites": [
      "TypeScript strict e leitura da aula Node I/O; saber distinguir arquivo e objeto em memória."
    ],
    "statement": "Produza relatório CLI de um catálogo JSON usando Node/TypeScript, sem servidor ou interface obrigatórios.",
    "requirements": [
      "Ler entrada por fs/promises com tamanho delimitado, validar lista e estrutura dos livros em runtime.",
      "Filtrar por termo no título e escrever {total,items} no arquivo de saída.",
      "Usar módulos ESM e extensão correta no import compilado; capturar erro assíncrono com exit diferente de zero.",
      "Não sobrescrever a entrada; testes usam diretório temporário e arquivos fictícios."
    ],
    "acceptanceCriteria": [
      "CLI gerou relatório conforme contrato, com comando e arquivo observados.",
      "JSON quebrado/tipo incorreto causam falha explícita, sem relatório de sucesso.",
      "Filtro vazio/ausente foi testado; TypeScript strict compila."
    ],
    "hints": [
      "Faça primeiro uma função que recebe unknown e valida o contrato.",
      "Confronte a leitura e a escrita separadamente; await não valida o retorno de JSON.parse.",
      "Confira o exitCode e use arquivos temporários para testar falhas sem apagar entradas."
    ],
    "testIdeas": [
      "Use lista vazia, dois títulos com/sem API e JSON que é objeto em vez de lista.",
      "Forneça arquivo inexistente e JSON malformado; confira exit1 e saída anterior preservada.",
      "Leia o relatório produzido e confira total versus quantidade filtrada."
    ],
    "referenceUrls": [
      "https://nodejs.org/docs/latest-v24.x/api/",
      "https://expressjs.com/en/guide/error-handling.html",
      "https://docs.nestjs.com/"
    ],
    "problem": {
      "inputs": [
        "Dois livros, termo PHP, um correspondente",
        "JSON malformado"
      ],
      "outputs": [
        "{total:1,items:[livro correspondente]}",
        "exit1 sem relatório de sucesso"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "Dois livros, termo PHP, um correspondente",
          "output": "{total:1,items:[livro correspondente]}",
          "explanation": "Total refere-se aos itens filtrados."
        },
        {
          "input": "JSON malformado",
          "output": "exit1 sem relatório de sucesso",
          "explanation": "Erro de parsing não vira coleção vazia."
        }
      ]
    },
    "commonErrors": [
      "Usar asserção as para aceitar dados externos sem validar valores reais.",
      "Ignorar rejeição de leitura/escrita ou anunciar sucesso antes de await.",
      "Confundir limite após readFile com limite de memória durante leitura."
    ]
  },
  {
    "id": "03-ex03",
    "stageId": "03",
    "slug": "laravel-rotas",
    "title": "Primeiras rotas Laravel",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Configurar routes/api.php conscientemente e documentar prefixo.",
      "Rotas reais respondem health e lista com status/JSON esperados."
    ],
    "prerequisites": [
      "Composer e biblioteca PHP; aulas Laravel início/rotas."
    ],
    "statement": "Comece uma API Laravel para o catálogo: health e listagem precisam existir no caminho registrado e ter testes.",
    "requirements": [
      "Configurar routes/api.php conscientemente e documentar prefixo.",
      "Implementar GET /health e GET /books, retornando JSON200; coleção vazia é [].",
      "Localizar middleware e controller; demonstrar Request/Response e route:list.",
      "Escrever testes de health, vazio e rota inexistente sem depender de um servidor público."
    ],
    "acceptanceCriteria": [
      "Rotas reais respondem health e lista com status/JSON esperados.",
      "route:list e prefixo batem com os exemplos do README.",
      "Testes de rota passaram localmente e erros foram explicados."
    ],
    "hints": [
      "Leia bootstrap/app.php antes de trocar o caminho no cURL.",
      "Para lista vazia, devolva array, não404 nem string de JSON manual.",
      "Um teste de rota usa cliente do framework; registre também o que ele não verifica."
    ],
    "testIdeas": [
      "Execute composer test -- --filter=FirstRoutesTest; CRUD completo será exigido nos exercícios5/7.",
      "Confira GET /health200, GET /books200[] e caminho inexistente404 no cliente de teste.",
      "Registre route:list e uma chamada cURL local com prefixo realmente configurado."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://getcomposer.org/doc/",
      "https://laravel.com/docs/13.x"
    ],
    "problem": {
      "inputs": [
        "GET /health",
        "GET /books sem livros"
      ],
      "outputs": [
        "200 {status:\"ok\"}",
        "200 []"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "GET /health",
          "output": "200 {status:\"ok\"}",
          "explanation": "Health só demonstra esse recorte de disponibilidade."
        },
        {
          "input": "GET /books sem livros",
          "output": "200 []",
          "explanation": "Coleção existente vazia não é livro ausente."
        }
      ]
    },
    "commonErrors": [
      "Pressupor prefixo /api sem conferir bootstrap/app.php e route:list.",
      "Retornar404 em vez de200 para uma coleção vazia.",
      "Executar a suíte CRUD completa antes de implementar criação/atualização/exclusão: use FirstRoutesTest neste exercício."
    ]
  },
  {
    "id": "03-ex04",
    "stageId": "03",
    "slug": "express-crud",
    "title": "CRUD Express em memória",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Oferecer GET /books, GET /books/:id, POST, PATCH e DELETE.",
      "CRUD e erros foram exercitados por testes de endpoints reais locais."
    ],
    "prerequisites": [
      "Node HTTP nativo e Express5; saber validar unknown."
    ],
    "statement": "Construa uma API Express de livros em memória para comparar explicitamente ordem de middleware e ciclo persistente.",
    "requirements": [
      "Oferecer GET /books, GET /books/:id, POST, PATCH e DELETE.",
      "Validar body/query/params; criar201/Location, atualizar parcialmente200, excluir204, ausente404.",
      "Organizar app separado de listen para testar por porta efêmera; middleware de erro depois das rotas.",
      "Delimitar JSON/corpo, configuração de porta, logs sem body e CORS sem abertura cega."
    ],
    "acceptanceCriteria": [
      "CRUD e erros foram exercitados por testes de endpoints reais locais.",
      "PATCH preserva campos não enviados e entrada inválida não altera estado.",
      "Estado reseta ao reiniciar; README não promete persistência."
    ],
    "hints": [
      "Separe criação da aplicação e do servidor para isolar dados entre testes.",
      "Primeiro valide a forma do body; um tipo TS não conhece o cliente.",
      "Confira qual Promise retorna ao Express5 e quais callbacks precisam encaminhar erro."
    ],
    "testIdeas": [
      "Exercite POST/GET/PATCH/DELETE e consulte novamente após PATCH inválido.",
      "Teste JSON quebrado400, mídia415, body grande413, dados inválidos422 e ID lexical inválido400.",
      "Confira origem CORS permitida/negada e preflight, sem confundir resposta com permissão de leitura do navegador."
    ],
    "referenceUrls": [
      "https://nodejs.org/docs/latest-v24.x/api/",
      "https://expressjs.com/en/guide/error-handling.html",
      "https://docs.nestjs.com/"
    ],
    "problem": {
      "inputs": [
        "PATCH /books/1 {title:\"Novo\"}",
        "DELETE de livro existente e GET depois"
      ],
      "outputs": [
        "200 preservando author",
        "204 sem corpo; depois404"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "PATCH /books/1 {title:\"Novo\"}",
          "output": "200 preservando author",
          "explanation": "Alteração parcial não exige reenviar todo o objeto."
        },
        {
          "input": "DELETE de livro existente e GET depois",
          "output": "204 sem corpo; depois404",
          "explanation": "Observe efeito, não só status."
        }
      ]
    },
    "commonErrors": [
      "Montar fallback404 antes do router ou parser JSON depois do POST.",
      "Validar body e esquecer parâmetros/query, aceitando ID em notação inesperada.",
      "Tratar CORS como autorização ou expor body/segredos nos logs."
    ]
  },
  {
    "id": "03-ex05",
    "stageId": "03",
    "slug": "laravel-crud",
    "title": "API Laravel com validação e testes",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Implementar listagem, detalhe, criação, PATCH e exclusão de livros.",
      "Sucesso CRUD, ausência e validação foram executados, com IDs reais."
    ],
    "prerequisites": [
      "Primeiras rotas concluídas; aulas validação, container e testes."
    ],
    "statement": "Entregue o catálogo Laravel completo com persistência simples, validação no servidor e testes que provem efeitos e não alterações.",
    "requirements": [
      "Implementar listagem, detalhe, criação, PATCH e exclusão de livros.",
      "Usar FormRequest e validated; documentar200/201/204/400/404/413/415/422 conforme o contrato.",
      "Utilizar arquivo JSON local de estudo e configuração do catálogo local mínimas; separar arquivos de teste e desenvolvimento.",
      "Organizar controller/presenter/catálogo sem camadas artificiais; tratar erros e logs sem stack pública."
    ],
    "acceptanceCriteria": [
      "Sucesso CRUD, ausência e validação foram executados, com IDs reais.",
      "Um teste prova que422 não criou/alterou livro e que204 realmente excluiu.",
      "Arquivo temporário de teste isolado; reiniciar servidor mantém o catálogo JSON local.",
      "README traz ambiente, instalação, testes e chamadas com respostas observadas."
    ],
    "hints": [
      "Comece por criar/consultar e um caso422 antes de acrescentar PATCH.",
      "Verifique os dados persistidos depois da falha; o status sozinho não prova a regra.",
      "Em testes mantenha catalog.path apontando para um arquivo temporário exclusivo e confira a origem da configuração antes de operações destrutivas."
    ],
    "testIdeas": [
      "Crie, consulte, altere só autor, preserve título e exclua com204 seguido de404.",
      "Rejeite corpo vazio, JSON quebrado, título vazio/201caracteres e mídia errada sem mutação.",
      "Execute suíte em arquivo temporário próprio e confira que catálogo de desenvolvimento continua separado."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://getcomposer.org/doc/",
      "https://laravel.com/docs/13.x"
    ],
    "problem": {
      "inputs": [
        "POST {title:\"Redes\",author:\"Ana\"}",
        "POST title numérico"
      ],
      "outputs": [
        "201, Location e livro com id",
        "422 e catálogo sem alteração"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "POST {title:\"Redes\",author:\"Ana\"}",
          "output": "201, Location e livro com id",
          "explanation": "Consulte o ID retornado."
        },
        {
          "input": "POST title numérico",
          "output": "422 e catálogo sem alteração",
          "explanation": "JSON sintaticamente válido pode violar contrato."
        }
      ]
    },
    "commonErrors": [
      "Confiar no catálogo como substituto da validação e autorização.",
      "Aceitar PATCH vazio ou apagar campos omitidos por preencher valores nulos.",
      "Checar só status de erro sem provar que o catálogo não foi alterado."
    ]
  },
  {
    "id": "03-ex06",
    "stageId": "03",
    "slug": "nest-livros",
    "title": "Módulo de livros NestJS",
    "level": "intermediario",
    "optional": true,
    "objectives": [
      "Usar BooksModule, controller e provider; registrar imports/exports coerentes.",
      "DI e módulo funcionam no processo real e testes registram comportamento."
    ],
    "prerequisites": [
      "Node/TypeScript e Express são a preparação recomendada; Nest módulos e DTOs."
    ],
    "statement": "Implemente um módulo NestJS pequeno para listar, consultar e criar livros com validação e DI observáveis.",
    "requirements": [
      "Usar BooksModule, controller e provider; registrar imports/exports coerentes.",
      "DTO como classe runtime e ValidationPipe; validar strings não vazias e limites.",
      "Tratar ID/ausência e responder201/Location na criação; preservar contrato público.",
      "Escrever testes do provider e de endpoints, sem fingir interface TS como validador."
    ],
    "acceptanceCriteria": [
      "DI e módulo funcionam no processo real e testes registram comportamento.",
      "Dados inválidos rejeitados antes da criação; detalhe ausente404.",
      "README fixa versão Nest/Node e distingue guards/interceptors conceituais de auth pronta."
    ],
    "hints": [
      "Confirme que a classe injetada está nos providers do módulo correto.",
      "DTO não pode desaparecer por import type; ative metadados e compile decorators.",
      "Valide usando requisições reais de teste, inclusive objeto com tipos errados."
    ],
    "testIdeas": [
      "Execute testes do provider e HTTP; só o segundo atravessa pipe/DTO/container.",
      "Teste criação com title numérico, campos extras, espaços e ID1e0 inválido na consulta; PATCH null/vazio é ampliação disponível na referência.",
      "Consulte a lista depois de criação rejeitada e confira ausência de efeito; DELETE é ampliação opcional da referência."
    ],
    "referenceUrls": [
      "https://nodejs.org/docs/latest-v24.x/api/",
      "https://expressjs.com/en/guide/error-handling.html",
      "https://docs.nestjs.com/"
    ],
    "problem": {
      "inputs": [
        "POST livro válido",
        "POST {title:123,author:\"Ana\"}"
      ],
      "outputs": [
        "201, livro e Location",
        "400 sem criar livro"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "POST livro válido",
          "output": "201, livro e Location",
          "explanation": "O provider mantém somente memória neste recorte."
        },
        {
          "input": "POST {title:123,author:\"Ana\"}",
          "output": "400 sem criar livro",
          "explanation": "O pipe precisa executar; tipo TS não basta."
        }
      ]
    },
    "commonErrors": [
      "Usar interface ou import type no lugar da classe DTO necessária aos metadados.",
      "Deixar transformação global converter ID antes do pipe de sintaxe.",
      "Supor que IsOptional rejeita null e permitir apagar campos existentes."
    ]
  },
  {
    "id": "03-ex07",
    "stageId": "03",
    "slug": "projeto-principal",
    "title": "Projeto backend principal",
    "level": "avancado",
    "optional": false,
    "objectives": [
      "Implementar rotas/controllers/validação/JSON/erros para o domínio escolhido.",
      "Uma API Laravel funcional e testada foi demonstrada com evidências próprias."
    ],
    "prerequisites": [
      "Biblioteca PHP e API Laravel testadas; não requer Node/Express/Nest."
    ],
    "statement": "Construa a entrega principal em Laravel: biblioteca ou agendamentos, escolhendo um único domínio e preservando contrato, configuração e evidência.",
    "requirements": [
      "Implementar rotas/controllers/validação/JSON/erros para o domínio escolhido.",
      "Configuração por ambiente e logs limitados; sem autenticação complexa ou banco avançado.",
      "Testes unitários e de rota para sucesso, inválido, ausência e efeitos; documentação de execução limpa.",
      "README, exemplos de requisições, .env.example fictício no projeto pessoal e registro de revisão."
    ],
    "acceptanceCriteria": [
      "Uma API Laravel funcional e testada foi demonstrada com evidências próprias.",
      "Colega ou revisor consegue reproduzir ambiente, comandos e resultados sem segredos.",
      "Decisões simples e limites estão justificados; nenhuma tecnologia opcional é exigida.",
      "Falhas bloqueantes identificadas na revisão foram corrigidas e retestadas."
    ],
    "hints": [
      "Escolha biblioteca se já conhece o contrato; outro domínio não elimina validação e testes.",
      "Implemente uma fatia completa antes de repetir endpoints.",
      "Faça uma instalação limpa em pasta nova e confira o README seguindo-o literalmente."
    ],
    "testIdeas": [
      "Reproduza instalação em pasta nova e execute testes com ambiente/versões registrados.",
      "Percorra CRUD completo e duas falhas com prova do estado antes/depois.",
      "Peça a outra pessoa para seguir README e registre o que precisou corrigir, se esse ensaio ocorreu."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://getcomposer.org/doc/",
      "https://laravel.com/docs/13.x"
    ],
    "problem": {
      "inputs": [
        "Novo usuário seguindo README",
        "Entrada inválida e depois consulta"
      ],
      "outputs": [
        "Instalação e testes reproduzíveis",
        "Erro útil e estado preservado"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "Novo usuário seguindo README",
          "output": "Instalação e testes reproduzíveis",
          "explanation": "Use dados fictícios e versões explícitas."
        },
        {
          "input": "Entrada inválida e depois consulta",
          "output": "Erro útil e estado preservado",
          "explanation": "Evidência precisa observar efeito."
        }
      ]
    },
    "commonErrors": [
      "Adicionar camadas de repasse sem uma responsabilidade justificável.",
      "Usar dados/configuração de desenvolvimento nos testes destrutivos.",
      "Copiar resultados da referência como se fossem execução da sua tentativa."
    ]
  },
  {
    "id": "03-ex08",
    "stageId": "03",
    "slug": "portabilidade",
    "title": "Portabilidade adicional: Laravel → Express ou Nest",
    "level": "avancado",
    "optional": true,
    "objectives": [
      "Copiar o contrato, não a arquitetura interna, para Express ou Nest.",
      "Duas implementações responderam ao mesmo conjunto de casos reais."
    ],
    "prerequisites": [
      "API Laravel concluída; escolha Express ou Nest como estudo adicional. Não é requisito de nenhuma trilha principal."
    ],
    "statement": "Como aprofundamento opcional após Laravel, reproduza GET/POST em Express ou Nest e compare contratos observáveis. Quem concluiu JS/TS pode estudar a API Laravel fornecida e registrar a comparação no ADR, sem precisar concluir este desafio.",
    "requirements": [
      "Copiar o contrato, não a arquitetura interna, para Express ou Nest.",
      "Preservar campos, status e critérios de erro acordados ou registrar diferença deliberada.",
      "Executar o mesmo conjunto de requisições nas duas implementações.",
      "Comparar instalação, validação, testes, organização e limites sem declarar vencedor universal."
    ],
    "acceptanceCriteria": [
      "Duas implementações responderam ao mesmo conjunto de casos reais.",
      "Diferenças observadas estão separadas de preferências pessoais.",
      "Sem exigir reconstruir três sistemas nem bloquear a Etapa04."
    ],
    "hints": [
      "Escreva primeiro a tabela de entradas/saídas compartilhadas.",
      "Adapte mensagens/políticas conscientemente; frameworks têm defaults diferentes.",
      "Conte arquivos e decisões apenas junto com contexto de manutenção e testes, não como métrica única."
    ],
    "testIdeas": [
      "Defina uma matriz comum de status, headers, JSON, erros e efeitos em ambas as stacks.",
      "Use POST com objeto vazio, título numérico e campos extras para revelar divergências de validação; PATCH é ampliação opcional, fora do contrato mínimo GET/POST.",
      "Registre diferenças deliberadas (Location,400/422,Unicode,persistência) antes de afirmar compatibilidade."
    ],
    "referenceUrls": [
      "https://nodejs.org/docs/latest-v24.x/api/",
      "https://expressjs.com/en/guide/error-handling.html",
      "https://docs.nestjs.com/"
    ],
    "problem": {
      "inputs": [
        "POST válido nas duas stacks",
        "Entrada inválida"
      ],
      "outputs": [
        "Mesmo contrato201/campos acordados",
        "Diferença de400/422 explicada ou harmonizada"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "POST válido nas duas stacks",
          "output": "Mesmo contrato201/campos acordados",
          "explanation": "Forma interna pode ser diferente."
        },
        {
          "input": "Entrada inválida",
          "output": "Diferença de400/422 explicada ou harmonizada",
          "explanation": "Default de framework não é norma universal."
        }
      ]
    },
    "commonErrors": [
      "Comparar apenas JSON de sucesso, ignorando headers/status e efeito após erro.",
      "Declarar melhor desempenho comparando Map com arquivo JSON local sem controlar persistência/carga.",
      "Exigir a mesma estrutura de arquivos em vez do mesmo contrato observável."
    ]
  },
  {
    "id": "03-ex09",
    "stageId": "03",
    "slug": "review-adr",
    "title": "Code review e decisão arquitetural",
    "level": "avancado",
    "optional": false,
    "objectives": [
      "ADR com contexto, decisão Laravel, alternativas, trade-offs e consequências.",
      "ADR relaciona decisão a requisitos e custos, sem superioridade universal."
    ],
    "prerequisites": [
      "Projeto principal com README e testes reais; sem dependência das trilhas opcionais."
    ],
    "statement": "Faça revisão técnica e escreva ADR curta sobre a API principal; demonstre uma correção baseada em evidência, não em autoridade da IA.",
    "requirements": [
      "ADR com contexto, decisão Laravel, alternativas, trade-offs e consequências.",
      "Revisar funcionamento/tipagem/HTTP/validação/erros/testes/documentação/segurança mínima.",
      "Separar bug demonstrado, hipótese e melhoria; executar uma reprodução antes de corrigir.",
      "Aplicar rubrica30/20/25/15/10 somente com evidência; revisão externa/IA permanece consultiva."
    ],
    "acceptanceCriteria": [
      "ADR relaciona decisão a requisitos e custos, sem superioridade universal.",
      "Reprodução, correção e reteste estão registrados, ou ausência de bug está limitada ao escopo observado.",
      "Revisão não inventa testes e registra pontos não verificados."
    ],
    "hints": [
      "Comece pelo requisito que orientou sua escolha, não pelo nome do framework.",
      "Peça ao revisor um contraexemplo e uma forma de reproduzir cada afirmação importante.",
      "Uma arquitetura menor pode ser suficiente; justifique abstrações usadas e rejeitadas."
    ],
    "testIdeas": [
      "Reproduza o caso do achado antes e depois da correção e registre comando/observado.",
      "Separe defeitos comprovados, hipóteses não testadas e escolhas de estilo.",
      "Se não houver achado, liste arquivos/casos efetivamente revisados e riscos que ficaram fora."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://getcomposer.org/doc/",
      "https://laravel.com/docs/13.x"
    ],
    "problem": {
      "inputs": [
        "Revisor afirma bug sem reprodução",
        "Decisão de persistência arquivo JSON local"
      ],
      "outputs": [
        "Hipótese pendente, sem nota de correção",
        "Trade-off de escopo e limite de produção documentado"
      ],
      "constraints": [
        "Dados fictícios; execução local; evidências externas declaradas.",
        "Soluções podem usar estruturas diferentes, preservando o contrato."
      ],
      "examples": [
        {
          "input": "Revisor afirma bug sem reprodução",
          "output": "Hipótese pendente, sem nota de correção",
          "explanation": "Solicite entrada, esperado e observado."
        },
        {
          "input": "Decisão de persistência arquivo JSON local",
          "output": "Trade-off de escopo e limite de produção documentado",
          "explanation": "Não antecipa banco avançado."
        }
      ]
    },
    "commonErrors": [
      "Confundir preferência arquitetural com defeito reproduzível.",
      "Afirmar segurança/correção universal porque testes finitos passaram.",
      "Inventar falha ou benchmark para preencher relatório em vez de delimitar o escopo."
    ]
  },
  {
    "id": "03-ex10",
    "stageId": "03",
    "slug": "php-funcoes",
    "title": "PHP: transformar sem alterar a origem",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Recusar itens não textuais e títulos vazios após trim; manter a ordem dos aceitos.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: php-colecoes, php-dados."
    ],
    "statement": "Implemente Report::titles para normalizar uma lista de títulos, filtrar por termo e preservar a entrada. Separe validação, transformação e apresentação.",
    "requirements": [
      "Recusar itens não textuais e títulos vazios após trim; manter a ordem dos aceitos.",
      "Filtrar por termo sem distinguir caixa com mb_stripos; termo vazio inclui todos.",
      "Não alterar o array de entrada; retornar lista de strings normalizadas."
    ],
    "acceptanceCriteria": [
      "Lista vazia e termo ausente retornam lista vazia sem falhar.",
      "Título numérico e espaços vazios geram InvalidArgumentException.",
      "Filtro encontra Redes com re e preserva a origem."
    ],
    "hints": [
      "Identifique o que é dado externo e o que é transformação pura.",
      "Valide todos os itens antes de montar a saída; cópia de array não exige mutação da origem.",
      "Use um caso inválido depois de um válido para detectar resultado parcial."
    ],
    "testIdeas": [
      "Lista vazia e termo ausente retornam lista vazia sem falhar.",
      "Título numérico e espaços vazios geram InvalidArgumentException.",
      "Filtro encontra Redes com re e preserva a origem."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://laravel.com/docs/13.x/http-tests"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex11",
    "stageId": "03",
    "slug": "php-autoload",
    "title": "Composer: módulos carregáveis",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Manter namespace StackTrail e mapa PSR-4 src/.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: composer, php-objetos."
    ],
    "statement": "Extraia o relatório e Livro em classes carregadas exclusivamente pelo autoload Composer. Execute em uma pasta independente, sem includes manuais de classes.",
    "requirements": [
      "Manter namespace StackTrail e mapa PSR-4 src/.",
      "Usar vendor/autoload.php na entrada de testes/CLI.",
      "Criar um método de relatório usado por código e teste sem inicializar HTTP."
    ],
    "acceptanceCriteria": [
      "composer install e composer test executados em cópia nova.",
      "Uma classe é resolvida pelo nome completo sem require do seu arquivo.",
      "Erro de case/caminho foi diagnosticado e corrigido sem classmap improvisado."
    ],
    "hints": [
      "Confira namespace, caminho e capitalização juntos.",
      "O arquivo de entrada carrega o autoload uma vez; ele não deve incluir cada classe.",
      "Execute de outro diretório com caminho explícito para provar que não depende do cwd."
    ],
    "testIdeas": [
      "composer install e composer test executados em cópia nova.",
      "Uma classe é resolvida pelo nome completo sem require do seu arquivo.",
      "Erro de case/caminho foi diagnosticado e corrigido sem classmap improvisado."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://laravel.com/docs/13.x/http-tests"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex12",
    "stageId": "03",
    "slug": "laravel-testes",
    "title": "Laravel: provar isolamento e recuperação",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "POST válido, PATCH inválido e GET preservando valores.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: laravel-testes."
    ],
    "statement": "Amplie os testes da API para demonstrar isolamento de arquivos e não mutação após falha. Use apenas caminhos temporários próprios.",
    "requirements": [
      "POST válido, PATCH inválido e GET preservando valores.",
      "Arquivo corrompido deve falhar sem ser apagado silenciosamente.",
      "Teste não pode ler nem alterar storage/app/books.json do desenvolvimento."
    ],
    "acceptanceCriteria": [
      "Suíte executada com exit0 e resultado real registrado.",
      "Contraprova detecta mutação antes da validação.",
      "Arquivo temporário isolado e limpeza demonstrados."
    ],
    "hints": [
      "Estado de desenvolvimento não é fixture de teste.",
      "Prepare um arquivo temporário e altere catalog.path antes da requisição.",
      "Confira conteúdo do arquivo depois da falha, além do status."
    ],
    "testIdeas": [
      "Suíte executada com exit0 e resultado real registrado.",
      "Contraprova detecta mutação antes da validação.",
      "Arquivo temporário isolado e limpeza demonstrados."
    ],
    "referenceUrls": [
      "https://www.php.net/manual/en/",
      "https://laravel.com/docs/13.x/http-tests"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex13",
    "stageId": "03",
    "slug": "js-linguagem",
    "title": "JS/TS: valores e contratos",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "titles recebe unknown, exige lista de objetos com título textual não vazio e normaliza trim.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: js-valores, js-funcoes, ts-contratos, ts-narrowing."
    ],
    "statement": "Implemente titles e first em learning.ts. Separe entrada unknown, transformação e tipo de retorno; explique por que generic não valida JSON.",
    "requirements": [
      "titles recebe unknown, exige lista de objetos com título textual não vazio e normaliza trim.",
      "first preserva o tipo dos itens e retorna undefined para coleção vazia.",
      "Rejeitar null, objeto no lugar de lista e campo numérico; não usar any/assertion para esconder validação."
    ],
    "acceptanceCriteria": [
      "Compilação strict executada sem erros.",
      "Casos válidos e inválidos de linguagem executados.",
      "Origem preservada e ausência representada explicitamente."
    ],
    "hints": [
      "Valide lista antes de percorrer; valide item antes de ler campo.",
      "Um generic relaciona entrada e saída; unknown exige inspeção.",
      "Tente um item inválido após outro válido e prove que não houve efeito parcial."
    ],
    "testIdeas": [
      "Compilação strict executada sem erros.",
      "Casos válidos e inválidos de linguagem executados.",
      "Origem preservada e ausência representada explicitamente."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex14",
    "stageId": "03",
    "slug": "js-modulos-async",
    "title": "Módulos e falhas assíncronas",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Separar leitura e função pura em módulos ESM.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: js-funcoes, ts-assincrono, node-io."
    ],
    "statement": "Implemente loadTitles com fs/promises e módulo de transformação. Aguarde a leitura, preserve rejeições e evite capturar falha como sucesso.",
    "requirements": [
      "Separar leitura e função pura em módulos ESM.",
      "JSON deve ser validado antes de usar campos.",
      "Arquivo ausente e JSON inválido rejeitam a Promise; teste usa assert.rejects."
    ],
    "acceptanceCriteria": [
      "Imports compilados para NodeNext e executados.",
      "Sucesso e duas rejeições observados em testes reais.",
      "Recursos temporários removidos e erro explicado."
    ],
    "hints": [
      "A função async devolve Promise mesmo ao retornar lista.",
      "try/catch só observa a rejeição que você aguarda ou retorna.",
      "Teste uma leitura ausente sem depender da ordem dos testes."
    ],
    "testIdeas": [
      "Imports compilados para NodeNext e executados.",
      "Sucesso e duas rejeições observados em testes reais.",
      "Recursos temporários removidos e erro explicado."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex15",
    "stageId": "03",
    "slug": "node-servidor",
    "title": "Node: servidor HTTP nativo",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "GET /health retorna JSON200; rota inexistente404.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: node-http."
    ],
    "statement": "Implemente health no módulo app.ts antes de usar Express. Cubra URL, método e fechamento do servidor.",
    "requirements": [
      "GET /health retorna JSON200; rota inexistente404.",
      "Método não permitido em health retorna405 e Allow conforme projeto.",
      "Testar com porta efêmera e fechar servidor em finally."
    ],
    "acceptanceCriteria": [
      "Teste HTTP nativo executado com porta local.",
      "Status, mídia e corpo conferidos.",
      "Processo encerra sem servidor pendurado."
    ],
    "hints": [
      "Não inicie listen ao importar o módulo de aplicação.",
      "Confira método e pathname separadamente.",
      "Aguarde evento listening e feche o servidor mesmo quando uma asserção falhar."
    ],
    "testIdeas": [
      "Teste HTTP nativo executado com porta local.",
      "Status, mídia e corpo conferidos.",
      "Processo encerra sem servidor pendurado."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex16",
    "stageId": "03",
    "slug": "express-rotas",
    "title": "Express: rotas e contexto HTTP",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Router montado em /books; req.params e query tratados como entradas.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: express-middleware."
    ],
    "statement": "Construa o Router de biblioteca com health, listagem e ausência antes das mutações. Preserve uma fábrica de aplicação por teste.",
    "requirements": [
      "Router montado em /books; req.params e query tratados como entradas.",
      "Listagem vazia200 e detalhe ausente404.",
      "Middlewares comuns antes das rotas e fallback404 depois."
    ],
    "acceptanceCriteria": [
      "Rotas iniciais verificadas em HTTP real local.",
      "Ordem de middleware explicada com um contraexemplo.",
      "Duas instâncias de aplicação não compartilham catálogo."
    ],
    "hints": [
      "Liste primeiro os caminhos públicos e resultados.",
      "Um middleware que encerra a resposta não chama next depois.",
      "Monte a aplicação de teste sem importar o arquivo que escuta uma porta fixa."
    ],
    "testIdeas": [
      "Rotas iniciais verificadas em HTTP real local.",
      "Ordem de middleware explicada com um contraexemplo.",
      "Duas instâncias de aplicação não compartilham catálogo."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex17",
    "stageId": "03",
    "slug": "express-schemas",
    "title": "Express: fronteiras e validação Zod",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Normalizar title/author, recusar vazio e mais de200 codepoints.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: express-validacao."
    ],
    "statement": "Implemente os schemas de criação e PATCH e conecte-os ao Router antes de alterar o catálogo. Tipos estáticos não substituem safeParse.",
    "requirements": [
      "Normalizar title/author, recusar vazio e mais de200 codepoints.",
      "PATCH aceita um campo mas recusa objeto sem campo reconhecido.",
      "ID decimal seguro: não aceitar 1e0/0x1; preservar original após PATCH inválido."
    ],
    "acceptanceCriteria": [
      "Schemas executados com limites e tipos adversários.",
      "Erro de domínio422 distinto de parser400.",
      "GET após falha comprova ausência de mutação."
    ],
    "hints": [
      "Defina a política para campos extras e unidade de tamanho.",
      "partial sozinho permite objeto vazio; acrescente regra de presença.",
      "Não converta parâmetro numérico antes de verificar sua representação decimal."
    ],
    "testIdeas": [
      "Schemas executados com limites e tipos adversários.",
      "Erro de domínio422 distinto de parser400.",
      "GET após falha comprova ausência de mutação."
    ],
    "referenceUrls": [
      "https://zod.dev/api",
      "https://expressjs.com/en/guide/error-handling.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex18",
    "stageId": "03",
    "slug": "express-testes",
    "title": "Express: testes que encontram defeitos",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "POST201/Location, PATCH422 sem mutação, DELETE204 e GET404.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: express-testes."
    ],
    "statement": "Amplie os testes de endpoints com ausência, exclusão e isolamento. Prove que uma implementação errada seria detectada.",
    "requirements": [
      "POST201/Location, PATCH422 sem mutação, DELETE204 e GET404.",
      "Testar JSON quebrado e mídia recusada sem afetar estado.",
      "Reproduzir defeito temporário, registrar teste que falha e restaurar implementação."
    ],
    "acceptanceCriteria": [
      "Suíte executada com exit0 após correção.",
      "Contraprova falha pela asserção certa, não por erro de setup.",
      "Servidor e arquivos temporários fechados em todos os caminhos."
    ],
    "hints": [
      "Teste efeito de estado além da mensagem.",
      "Use o ID retornado na criação em vez de presumir sequência global.",
      "Execute sozinho e com a suíte para detectar dependência da ordem."
    ],
    "testIdeas": [
      "Suíte executada com exit0 após correção.",
      "Contraprova falha pela asserção certa, não por erro de setup.",
      "Servidor e arquivos temporários fechados em todos os caminhos."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex19",
    "stageId": "03",
    "slug": "projeto-express",
    "title": "Projeto principal JS/TS: API Express",
    "level": "avancado",
    "optional": false,
    "objectives": [
      "CRUD completo e contratos documentados com exemplos reais.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: express-testes, projeto."
    ],
    "statement": "Entregue uma API Express de biblioteca funcional e reproduzível. Consolide linguagem, runtime, schemas, HTTP, configuração, logs e testes sem adicionar banco ou Docker.",
    "requirements": [
      "CRUD completo e contratos documentados com exemplos reais.",
      "Organização por funcionalidade, configuração validada e logs sem dados privados.",
      "README com npm ci, build, test, start, versões, limites e evidências."
    ],
    "acceptanceCriteria": [
      "Projeto instalado e testado em pasta independente.",
      "Sucesso, erro, ausência e recuperação demonstrados.",
      "API em memória e perda ao reiniciar declaradas, sem promessa de produção."
    ],
    "hints": [
      "Comece com o contrato e uma rota testada; depois amplie.",
      "Separe parser, schema e mutação; cada falha tem observação própria.",
      "Reproduza a instalação pelo README sem depender de arquivos externos da sua máquina."
    ],
    "testIdeas": [
      "Projeto instalado e testado em pasta independente.",
      "Sucesso, erro, ausência e recuperação demonstrados.",
      "API em memória e perda ao reiniciar declaradas, sem promessa de produção."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex20",
    "stageId": "03",
    "slug": "review-express",
    "title": "Revisão e ADR da trilha JS/TS",
    "level": "avancado",
    "optional": false,
    "objectives": [
      "ADR contém contexto, decisão, alternativa, evidência, consequências e condição de revisão.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: decisao, projeto."
    ],
    "statement": "Revise seu projeto Express com evidências e escreva uma decisão contextual. Não implemente PHP para demonstrar equivalência nem invente benchmark.",
    "requirements": [
      "ADR contém contexto, decisão, alternativa, evidência, consequências e condição de revisão.",
      "Relacionar rubrica30/20/25/15/10 a arquivos/testes reais.",
      "Registrar limitações e próximos estudos04/05/08 sem implementá-los."
    ],
    "acceptanceCriteria": [
      "ADR e README coerentes com o projeto executado.",
      "Uma crítica técnica foi testada ou marcada como não verificada.",
      "Revisão não contém segredos nem garantias de correção universal."
    ],
    "hints": [
      "Escolha uma decisão que realmente tomou.",
      "Uma alternativa pode ser Node nativo; não precisa dominar outra stack.",
      "Vincule uma consequência a um teste ou condição observável, sem números inventados."
    ],
    "testIdeas": [
      "ADR e README coerentes com o projeto executado.",
      "Uma crítica técnica foi testada ou marcada como não verificada.",
      "Revisão não contém segredos nem garantias de correção universal."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  },
  {
    "id": "03-ex21",
    "stageId": "03",
    "slug": "fundamentos-backend",
    "title": "Fundamentos comuns: explicar e diagnosticar",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Descrever cliente, runtime, middleware, rota, handler e resposta sem confundir responsabilidades.",
      "Demonstrar o contrato por execução local e explicar uma falha."
    ],
    "prerequisites": [
      "Aulas: linguagem-runtime, ciclo, configuracao, dependencias-testes."
    ],
    "statement": "Analise o percurso de POST /books na trilha escolhida. Registre como distinguir conexão recusada, JSON quebrado, campo inválido, ausência e falha interna.",
    "requirements": [
      "Descrever cliente, runtime, middleware, rota, handler e resposta sem confundir responsabilidades.",
      "Executar health e ao menos uma entrada inválida no projeto escolhido; registrar comando/observado.",
      "Explicar ambiente, lockfile, limites de log e um teste de não mutação."
    ],
    "acceptanceCriteria": [
      "Percurso e responsabilidades explicados com dados fictícios.",
      "Um ensaio local real registrado, sem tratar simulação como execução.",
      "Hipóteses não verificadas e limites declarados."
    ],
    "hints": [
      "Comece pelo método, URL e tipo do corpo.",
      "Diferencie falha antes de HTTP de resposta HTTP com erro.",
      "Conecte cada observação a uma camada e proponha uma mudança isolada para testar sua hipótese."
    ],
    "testIdeas": [
      "Percurso e responsabilidades explicados com dados fictícios.",
      "Um ensaio local real registrado, sem tratar simulação como execução.",
      "Hipóteses não verificadas e limites declarados."
    ],
    "referenceUrls": [
      "https://nodejs.org/api/test.html",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
    ],
    "commonErrors": [
      "Registrar resultado esperado como se tivesse sido executado.",
      "Alterar os testes para esconder defeito em vez de confrontar o contrato.",
      "Concluir sem explicar causa, efeito e limite da solução."
    ]
  }
];
