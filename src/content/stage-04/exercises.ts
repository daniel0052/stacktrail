import type {Exercise} from '../stage-01/types';
export const exercises: (Exercise & {requirement:string})[] = [
  {
    "id": "04-common-01",
    "stageId": "04",
    "slug": "common-01",
    "title": "Métodos e status · Fundamentos comuns",
    "subject": "Fundamentos comuns · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Justifique métodos e status em uma coleção de livros."
    ],
    "statement": "Compare consulta, criação, substituição, alteração parcial e exclusão. Para cada decisão descreva efeito, representação e uma falha plausível.",
    "prerequisites": [
      "Leia recursos e desenhe a tabela de cinco endpoints."
    ],
    "requirements": [
      "Justifique métodos e status em uma coleção de livros.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "JustifiqueiGET/POST/PUT/PATCH/DELETE com estado antes/depois, sem GET com efeito destrutivo.",
      "Expliquei201/Location,204semcorpo eDELETErepetido sem exigir resposta idêntica.",
      "Diferenciei400/404/409/415/422 com um contraexemplo do contrato."
    ],
    "hints": [
      "Uma segunda exclusão retorna404: o efeito final mudou?",
      "Desenhe estado antes/depois sem olhar o status.",
      "Confronte seu contrato com os métodos seguros e idempotentes da RFC9110."
    ],
    "testIdeas": [
      "GET preserva estado; POST cria com 201 e Location; DELETE pode repetir com status diferente.",
      "Diferencie 400 de JSON malformado, 404 de recurso ausente e 422 de entrada semanticamente inválida."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://spec.openapis.org/oas/v3.1.1.html"
    ]
  },
  {
    "id": "04-common-02",
    "stageId": "04",
    "slug": "common-02",
    "title": "Contrato de cinco endpoints · Fundamentos comuns",
    "subject": "Fundamentos comuns · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Especifique cinco endpoints antes de implementar."
    ],
    "statement": "Desenhe listagem, consulta, criação, atualização e exclusão de livros com entradas, headers, corpos e erros. Resolva ausência e null explicitamente.",
    "prerequisites": [
      "Leia métodos; justifique201/204 e a diferença entre PUT/PATCH."
    ],
    "requirements": [
      "Especifique cinco endpoints antes de implementar.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Documentei cinco endpoints com métodos, URIs, entradas, saídas e erros.",
      "Defini tipo de conteúdo, identidade versus filtro e ausência versus null.",
      "Outro leitor consegue prever criação→consulta sem ler implementação."
    ],
    "hints": [
      "Separe identidade de filtro.",
      "Descreva estado após cada operação.",
      "Verifique se um cliente consegue implementar sem conhecer o controller."
    ],
    "testIdeas": [
      "GET coleção vazia200; GET ID ausente404.",
      "POST correto201 com URI; PATCH inválido não muda recurso."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://spec.openapis.org/oas/v3.1.1.html"
    ]
  },
  {
    "id": "04-php-03",
    "stageId": "04",
    "slug": "php-03",
    "title": "CRUD de catálogo · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Implemente um catálogo na stack escolhida."
    ],
    "statement": "Construa as cinco operações do contrato em armazenamento temporário. Separe início do servidor da aplicação testável e descreva reinicialização. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Fundamentos comuns04 e Laravel03: crie rotas/FormRequest e execute composer test. Não depende de Express."
    ],
    "requirements": [
      "Implemente um catálogo na stack escolhida.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Executei criar→consultar→alterar→excluir com corpos/status/Location coerentes.",
      "Demonstrei404ausente,204semcorpo e reinicialização do estado conforme README.",
      "Separei aplicação testável de início do servidor e documentei armazenamento temporário."
    ],
    "hints": [
      "Comece por GET e representação de saída.",
      "Passe a dependência de armazenamento explicitamente.",
      "Teste a sequência inteira e depois a ausência."
    ],
    "testIdeas": [
      "Criar→consultar→alterar→excluir funciona.",
      "ID ausente404; método não suportado documentado."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-03",
    "stageId": "04",
    "slug": "js-03",
    "title": "CRUD de catálogo · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Implemente um catálogo na stack escolhida."
    ],
    "statement": "Construa as cinco operações do contrato em armazenamento temporário. Separe início do servidor da aplicação testável e descreva reinicialização. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Fundamentos comuns04 e Express03: crieRouter, valideunknown e execute npm test. Não depende deLaravel."
    ],
    "requirements": [
      "Implemente um catálogo na stack escolhida.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Executei criar→consultar→alterar→excluir com corpos/status/Location coerentes.",
      "Demonstrei404ausente,204semcorpo e reinicialização do estado conforme README.",
      "Separei aplicação testável de início do servidor e documentei armazenamento temporário."
    ],
    "hints": [
      "Comece por GET e representação de saída.",
      "Passe a dependência de armazenamento explicitamente.",
      "Teste a sequência inteira e depois a ausência."
    ],
    "testIdeas": [
      "Criar→consultar→alterar→excluir funciona.",
      "ID ausente404; método não suportado documentado."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-04",
    "stageId": "04",
    "slug": "php-04",
    "title": "Validação de entrada · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Rejeite payloads inválidos antes de mutar."
    ],
    "statement": "Aceite somente title, category e note conforme seu contrato. Defina limites e diferença entre note ausente e null. Teste campos desconhecidos, booleanos e números em lugar de strings. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia invariantes e laravel-api; siga uma entrada até a representação."
    ],
    "requirements": [
      "Rejeite payloads inválidos antes de mutar.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Rejeitei campos ausentes, tipos incorretos, excesso de comprimento e chaves não permitidas.",
      "Diferenciei JSONmalformado400 de tipo415 e input422 no contrato.",
      "PATCHinválido seguido deGET mantém valores anteriores; ausência/null têm política explícita."
    ],
    "hints": [
      "Não confunda compilação com fronteira HTTP.",
      "Crie allowlist e valide o objeto inteiro.",
      "Compare estado antes/depois de uma tentativa inválida."
    ],
    "testIdeas": [
      "Título vazio/tipo incorreto422; JSON quebrado400.",
      "Payload inválido não altera a coleção."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-04",
    "stageId": "04",
    "slug": "js-04",
    "title": "Validação de entrada · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "inicial",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Rejeite payloads inválidos antes de mutar."
    ],
    "statement": "Aceite somente title, category e note conforme seu contrato. Defina limites e diferença entre note ausente e null. Teste campos desconhecidos, booleanos e números em lugar de strings. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia invariantes e express-api; distinga schema e regra dependente de estado."
    ],
    "requirements": [
      "Rejeite payloads inválidos antes de mutar.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Rejeitei campos ausentes, tipos incorretos, excesso de comprimento e chaves não permitidas.",
      "Diferenciei JSONmalformado400 de tipo415 e input422 no contrato.",
      "PATCHinválido seguido deGET mantém valores anteriores; ausência/null têm política explícita."
    ],
    "hints": [
      "Não confunda compilação com fronteira HTTP.",
      "Crie allowlist e valide o objeto inteiro.",
      "Compare estado antes/depois de uma tentativa inválida."
    ],
    "testIdeas": [
      "Título vazio/tipo incorreto422; JSON quebrado400.",
      "Payload inválido não altera a coleção."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-05",
    "stageId": "04",
    "slug": "php-05",
    "title": "Representações públicas · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Controle o que sai da aplicação."
    ],
    "statement": "Inclua um campo interno de teste no armazenamento e construa uma representação pública estável, sem serializar o objeto inteiro. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Fundamentos comuns04 e Laravel03: crie rotas/FormRequest e execute composer test. Não depende de Express."
    ],
    "requirements": [
      "Controle o que sai da aplicação.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "GET/POST produzem representação pública com campos e tipos consistentes.",
      "Campo interno introduzido no fake não aparece na resposta.",
      "Um teste verifica saída positiva e ausência de propriedade sensível."
    ],
    "hints": [
      "Compare dado armazenado e resposta.",
      "Defina transformação de saída explícita.",
      "Altere o campo interno e prove que o contrato não mudou."
    ],
    "testIdeas": [
      "Campo interno nunca aparece no JSON.",
      "GET e POST usam representação consistente."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-05",
    "stageId": "04",
    "slug": "js-05",
    "title": "Representações públicas · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Controle o que sai da aplicação."
    ],
    "statement": "Inclua um campo interno de teste no armazenamento e construa uma representação pública estável, sem serializar o objeto inteiro. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Fundamentos comuns04 e Express03: crieRouter, valideunknown e execute npm test. Não depende deLaravel."
    ],
    "requirements": [
      "Controle o que sai da aplicação.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "GET/POST produzem representação pública com campos e tipos consistentes.",
      "Campo interno introduzido no fake não aparece na resposta.",
      "Um teste verifica saída positiva e ausência de propriedade sensível."
    ],
    "hints": [
      "Compare dado armazenado e resposta.",
      "Defina transformação de saída explícita.",
      "Altere o campo interno e prove que o contrato não mudou."
    ],
    "testIdeas": [
      "Campo interno nunca aparece no JSON.",
      "GET e POST usam representação consistente."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-06",
    "stageId": "04",
    "slug": "php-06",
    "title": "Consulta configurável · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Combine paginação, filtros, busca e ordenação."
    ],
    "statement": "Implemente search, category, sort, page e per_page. Estabeleça padrão, limite máximo, whitelist e desempate por ID. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia recursos/contratos; filtre uma coleção sem alterar seus itens."
    ],
    "requirements": [
      "Combine paginação, filtros, busca e ordenação.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Filtrei antes de ordenar/paginar; total conta itens filtrados antes do recorte.",
      "Apliquei defaults1/10, teto100, campos permitidos e desempateID sem mutar armazenamento.",
      "Testei página0, parâmetro repetido/desconhecido, sortinválido e coleção vazia200."
    ],
    "hints": [
      "Filtre antes de paginar.",
      "Ordene cópia, com desempate previsível.",
      "Teste páginas vizinhas e parâmetros repetidos."
    ],
    "testIdeas": [
      "page=0, per_page=101 e sort desconhecido422.",
      "Busca sem resultado200 com data=[] e total=0."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-06",
    "stageId": "04",
    "slug": "js-06",
    "title": "Consulta configurável · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Combine paginação, filtros, busca e ordenação."
    ],
    "statement": "Implemente search, category, sort, page e per_page. Estabeleça padrão, limite máximo, whitelist e desempate por ID. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia recursos/contratos; filtre uma coleção sem alterar seus itens."
    ],
    "requirements": [
      "Combine paginação, filtros, busca e ordenação.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Filtrei antes de ordenar/paginar; total conta itens filtrados antes do recorte.",
      "Apliquei defaults1/10, teto100, campos permitidos e desempateID sem mutar armazenamento.",
      "Testei página0, parâmetro repetido/desconhecido, sortinválido e coleção vazia200."
    ],
    "hints": [
      "Filtre antes de paginar.",
      "Ordene cópia, com desempate previsível.",
      "Teste páginas vizinhas e parâmetros repetidos."
    ],
    "testIdeas": [
      "page=0, per_page=101 e sort desconhecido422.",
      "Busca sem resultado200 com data=[] e total=0."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-07",
    "stageId": "04",
    "slug": "php-07",
    "title": "Regras de agendamento · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Preserve disponibilidade e conflitos sequenciais."
    ],
    "statement": "Crie horários fictícios e regras de reserva futura. Implemente consulta e cancelamento. Não receba status ou identificador interno diretamente do cliente. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia contratos; diferencie ausência, null e input inválido."
    ],
    "requirements": [
      "Preserve disponibilidade e conflitos sequenciais.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Validei agenda e relógio: passado ou horário não publicado422.",
      "Reserva válida201 seguida da mesma reserva409 não cria novo registro.",
      "Cancelamento libera horário, preserva histórico e repetição não duplica efeitos; limite multiprocesso explícito."
    ],
    "hints": [
      "Separe formato de data de disponibilidade.",
      "Passe relógio fixo nos testes.",
      "Teste fronteira de horário e reserva cancelada antes de nova tentativa."
    ],
    "testIdeas": [
      "Reserva válida201; duplicada409; passado422.",
      "Cancelar libera horário; repetir cancelamento mantém estado final."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-07",
    "stageId": "04",
    "slug": "js-07",
    "title": "Regras de agendamento · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Preserve disponibilidade e conflitos sequenciais."
    ],
    "statement": "Crie horários fictícios e regras de reserva futura. Implemente consulta e cancelamento. Não receba status ou identificador interno diretamente do cliente. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia contratos; diferencie ausência, null e input inválido."
    ],
    "requirements": [
      "Preserve disponibilidade e conflitos sequenciais.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Validei agenda e relógio: passado ou horário não publicado422.",
      "Reserva válida201 seguida da mesma reserva409 não cria novo registro.",
      "Cancelamento libera horário, preserva histórico e repetição não duplica efeitos; limite multiprocesso explícito."
    ],
    "hints": [
      "Separe formato de data de disponibilidade.",
      "Passe relógio fixo nos testes.",
      "Teste fronteira de horário e reserva cancelada antes de nova tentativa."
    ],
    "testIdeas": [
      "Reserva válida201; duplicada409; passado422.",
      "Cancelar libera horário; repetir cancelamento mantém estado final."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-08",
    "stageId": "04",
    "slug": "php-08",
    "title": "Testes de respostas e estado · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Escreva regressões que revelem bugs reais."
    ],
    "statement": "Execute testes de contrato HTTP e regras. Inclua uma falha deliberada, confirme o teste falhar e reverta. Evite asserções apenas de status. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia coleções e laravel-regras; execute um testeHTTP e confira estado posterior."
    ],
    "requirements": [
      "Escreva regressões que revelem bugs reais.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "TestesHTTP verificam corpo e estado, além de status.",
      "Demonstrei PATCHinválido sem mutação, conflito sem duplicação e isolamento entre testes.",
      "Introduzi defeito plausível, observei teste falhar, reverti e registrei comandos/resultados reais."
    ],
    "hints": [
      "Escolha um bug plausível.",
      "Confira corpo e estado além de status.",
      "Registre comando e saída real; não invente execução."
    ],
    "testIdeas": [
      "PATCH inválido seguido de GET mantém valores.",
      "Conflito não cria nova reserva; saída não expõe dados internos."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-08",
    "stageId": "04",
    "slug": "js-08",
    "title": "Testes de respostas e estado · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "intermediario",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Escreva regressões que revelem bugs reais."
    ],
    "statement": "Execute testes de contrato HTTP e regras. Inclua uma falha deliberada, confirme o teste falhar e reverta. Evite asserções apenas de status. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia coleções e express-regras; faça um testeHTTP e encerre o servidor."
    ],
    "requirements": [
      "Escreva regressões que revelem bugs reais.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "TestesHTTP verificam corpo e estado, além de status.",
      "Demonstrei PATCHinválido sem mutação, conflito sem duplicação e isolamento entre testes.",
      "Introduzi defeito plausível, observei teste falhar, reverti e registrei comandos/resultados reais."
    ],
    "hints": [
      "Escolha um bug plausível.",
      "Confira corpo e estado além de status.",
      "Registre comando e saída real; não invente execução."
    ],
    "testIdeas": [
      "PATCH inválido seguido de GET mantém valores.",
      "Conflito não cria nova reserva; saída não expõe dados internos."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-09",
    "stageId": "04",
    "slug": "php-09",
    "title": "Erros Problem Details · PHP/Laravel",
    "subject": "PHP/Laravel · Recomendado",
    "level": "avancado",
    "optional": true,
    "requirement": "Recomendado",
    "objectives": [
      "Adapte erros esperados à RFC9457."
    ],
    "statement": "Aprofundamento recomendado: implemente 404/409/422 com media type adequado e status coerente. Não exponha exceção interna. Compreender o padrão é obrigatório; esta implementação completa não bloqueia avanço. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia métodos e invariantes; diferencie404/409/422 por causa."
    ],
    "requirements": [
      "Adapte erros esperados à RFC9457.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "404/409/422 usam application/problem+json e status coincidente comHTTP.",
      "Expliqueitype/title/detail/instance e documentei extensão sem declará-la universalmente obrigatória.",
      "Falha interna não expõe stack/segredos; registrei esse exercício como recomendado fora do gate."
    ],
    "hints": [
      "Separe tipo de ocorrência.",
      "Compare formato nativo e seu contrato.",
      "Consulte§3.1 antes de declarar todos os membros obrigatórios."
    ],
    "testIdeas": [
      "status no corpo coincide com HTTP.",
      "errors é extensão documentada; stack ausente."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-09",
    "stageId": "04",
    "slug": "js-09",
    "title": "Erros Problem Details · TypeScript/Express",
    "subject": "TypeScript/Express · Recomendado",
    "level": "avancado",
    "optional": true,
    "requirement": "Recomendado",
    "objectives": [
      "Adapte erros esperados à RFC9457."
    ],
    "statement": "Aprofundamento recomendado: implemente 404/409/422 com media type adequado e status coerente. Não exponha exceção interna. Compreender o padrão é obrigatório; esta implementação completa não bloqueia avanço. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia métodos e invariantes; diferencie404/409/422 por causa."
    ],
    "requirements": [
      "Adapte erros esperados à RFC9457.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "404/409/422 usam application/problem+json e status coincidente comHTTP.",
      "Expliqueitype/title/detail/instance e documentei extensão sem declará-la universalmente obrigatória.",
      "Falha interna não expõe stack/segredos; registrei esse exercício como recomendado fora do gate."
    ],
    "hints": [
      "Separe tipo de ocorrência.",
      "Compare formato nativo e seu contrato.",
      "Consulte§3.1 antes de declarar todos os membros obrigatórios."
    ],
    "testIdeas": [
      "status no corpo coincide com HTTP.",
      "errors é extensão documentada; stack ausente."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-10",
    "stageId": "04",
    "slug": "php-10",
    "title": "OpenAPI e revisão do contrato · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Documente a API implementada."
    ],
    "statement": "Crie openapi.yaml com métodos, parâmetros, schema de entrada/saída, erros e exemplos. Use uma versão suportada pelo validador escolhido e registre limites da validação. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia contratos, coleções e problemas; tenha a tabela de endpoints e exemplos de entrada/saída."
    ],
    "requirements": [
      "Documente a API implementada.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "OpenAPI versionado contém paths/operações, entradas/saídas, parameters e responses de sucesso/erro.",
      "Documentei paginação/filtros/ordenação, null e obrigatoriedade; parâmetros de caminho têm required:true.",
      "Executei validador compatível quando disponível e comparei umHTTP real ao documento; limite/indisponibilidade registrado."
    ],
    "hints": [
      "Comece por uma operação verificável.",
      "Separe schema da entrada da representação com ID.",
      "Compare um request real com o documento; validação estrutural não detecta toda divergência."
    ],
    "testIdeas": [
      "Parâmetro de caminho obrigatório descrito.",
      "201/409/422, paginação e filtros coerentes com HTTP real."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-10",
    "stageId": "04",
    "slug": "js-10",
    "title": "OpenAPI e revisão do contrato · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Documente a API implementada."
    ],
    "statement": "Crie openapi.yaml com métodos, parâmetros, schema de entrada/saída, erros e exemplos. Use uma versão suportada pelo validador escolhido e registre limites da validação. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia contratos, coleções e problemas; tenha a tabela de endpoints e exemplos de entrada/saída."
    ],
    "requirements": [
      "Documente a API implementada.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "OpenAPI versionado contém paths/operações, entradas/saídas, parameters e responses de sucesso/erro.",
      "Documentei paginação/filtros/ordenação, null e obrigatoriedade; parâmetros de caminho têm required:true.",
      "Executei validador compatível quando disponível e comparei umHTTP real ao documento; limite/indisponibilidade registrado."
    ],
    "hints": [
      "Comece por uma operação verificável.",
      "Separe schema da entrada da representação com ID.",
      "Compare um request real com o documento; validação estrutural não detecta toda divergência."
    ],
    "testIdeas": [
      "Parâmetro de caminho obrigatório descrito.",
      "201/409/422, paginação e filtros coerentes com HTTP real."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-11",
    "stageId": "04",
    "slug": "php-11",
    "title": "Falha externa e retries · PHP/Laravel",
    "subject": "PHP/Laravel · Opcional",
    "level": "avancado",
    "optional": true,
    "requirement": "Opcional",
    "objectives": [
      "Analise resultado ambíguo sem duplicar operações."
    ],
    "statement": "Opcional: use fake determinístico com sucesso, timeout e falha HTTP. Registre se a reserva já foi aceita antes da falha de notificação e se repetir POST seria seguro. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Leia métodos e invariantes; explique umPOST aceito cujo cliente não recebe resposta."
    ],
    "requirements": [
      "Analise resultado ambíguo sem duplicar operações.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Fake distingue sucesso, timeout e erroHTTP, sem chamar terceiros.",
      "Registrei estado da reserva após falha e não declarei notificação entregue.",
      "Expliquei repetição dePOST e limites da chave/memória sem prometer consistência distribuída."
    ],
    "hints": [
      "Desenhe ordem de efeitos.",
      "Defina orçamento e limite de tentativas.",
      "Explique a durabilidade e escopo da chave; memória não coordena processos."
    ],
    "testIdeas": [
      "Timeout não significa que o servidor não recebeu.",
      "Não afirmar entrega de notificação após falha."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-11",
    "stageId": "04",
    "slug": "js-11",
    "title": "Falha externa e retries · TypeScript/Express",
    "subject": "TypeScript/Express · Opcional",
    "level": "avancado",
    "optional": true,
    "requirement": "Opcional",
    "objectives": [
      "Analise resultado ambíguo sem duplicar operações."
    ],
    "statement": "Opcional: use fake determinístico com sucesso, timeout e falha HTTP. Registre se a reserva já foi aceita antes da falha de notificação e se repetir POST seria seguro. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Leia métodos e invariantes; explique umPOST aceito cujo cliente não recebe resposta."
    ],
    "requirements": [
      "Analise resultado ambíguo sem duplicar operações.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Fake distingue sucesso, timeout e erroHTTP, sem chamar terceiros.",
      "Registrei estado da reserva após falha e não declarei notificação entregue.",
      "Expliquei repetição dePOST e limites da chave/memória sem prometer consistência distribuída."
    ],
    "hints": [
      "Desenhe ordem de efeitos.",
      "Defina orçamento e limite de tentativas.",
      "Explique a durabilidade e escopo da chave; memória não coordena processos."
    ],
    "testIdeas": [
      "Timeout não significa que o servidor não recebeu.",
      "Não afirmar entrega de notificação após falha."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-12",
    "stageId": "04",
    "slug": "php-12",
    "title": "Revisão arquitetural e segurança · PHP/Laravel",
    "subject": "PHP/Laravel · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Revise o projeto com evidências."
    ],
    "statement": "Procure mass assignment, vazamento de campos, inconsistência de datas e dependências desnecessárias. Escreva ADR curto; peça revisão consultiva sem enviar segredos. Use Form Requests/Resources e testes HTTP do Laravel13.",
    "prerequisites": [
      "Complete comuns e as três aulas da stack escolhida; demonstreCRUD, consulta, reserva e testes."
    ],
    "requirements": [
      "Revise o projeto com evidências.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Achados possuem entrada e reprodução ou são classificados como hipótese não verificada.",
      "Revisei massassignment, saídas, datas e dependências, justificando decisões emADR.",
      "Correção importante tem regressão; revisão não exige outra stack, Nest, banco ou Docker."
    ],
    "hints": [
      "Siga um dado externo até a resposta.",
      "Altere um campo não permitido.",
      "Justifique uma camada removida ou mantida pelo comportamento."
    ],
    "testIdeas": [
      "Cada achado possui reprodução ou é hipótese identificada.",
      "Correção importante tem teste; nenhuma segunda stack exigida."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://laravel.com/docs/13.x/validation"
    ]
  },
  {
    "id": "04-js-12",
    "stageId": "04",
    "slug": "js-12",
    "title": "Revisão arquitetural e segurança · TypeScript/Express",
    "subject": "TypeScript/Express · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Revise o projeto com evidências."
    ],
    "statement": "Procure mass assignment, vazamento de campos, inconsistência de datas e dependências desnecessárias. Escreva ADR curto; peça revisão consultiva sem enviar segredos. Use Router, Zod e testes HTTP reais em Express5.",
    "prerequisites": [
      "Complete comuns e as três aulas da stack escolhida; demonstreCRUD, consulta, reserva e testes."
    ],
    "requirements": [
      "Revise o projeto com evidências.",
      "Use uma única stack e documente limites do armazenamento temporário."
    ],
    "acceptanceCriteria": [
      "Achados possuem entrada e reprodução ou são classificados como hipótese não verificada.",
      "Revisei massassignment, saídas, datas e dependências, justificando decisões emADR.",
      "Correção importante tem regressão; revisão não exige outra stack, Nest, banco ou Docker."
    ],
    "hints": [
      "Siga um dado externo até a resposta.",
      "Altere um campo não permitido.",
      "Justifique uma camada removida ou mantida pelo comportamento."
    ],
    "testIdeas": [
      "Cada achado possui reprodução ou é hipótese identificada.",
      "Correção importante tem teste; nenhuma segunda stack exigida."
    ],
    "commonErrors": [
      "Validar só o caminho feliz ou status sem conferir corpo/estado.",
      "Confundir tipagem ou simulação local com execução do backend real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://expressjs.com/en/guide/error-handling.html"
    ]
  },
  {
    "id": "04-php-projeto",
    "stageId": "04",
    "slug": "php-projeto",
    "title": "Projeto integrador · API de agendamentos · PHP/Laravel",
    "subject": "Integração · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Entregar API, testes, OpenAPI, README e decisões na stack escolhida."
    ],
    "prerequisites": [
      "Fundamentos comuns e atividades obrigatórias da trilha."
    ],
    "statement": "Implemente horários disponíveis e agendamentos: criar, consultar, cancelar, validar passado e conflito sequencial, paginar/filtrar/ordenar listagens. Entregue código, README com instalação/execução/cURL, environment.example sem segredos quando pertinente, openapi.yaml, testes e ADR. Sem banco, Docker, autenticação ou segunda stack. Use fake temporário e declare reinicialização e limite entre processos.",
    "requirements": [
      "Listar slots, criar/consultar/cancelar reservas e impedir conflito sequencial.",
      "Listagens com paginação/filtros/ordenação, representações e erros documentados.",
      "Testes executáveis e revisão ponderada ≥8/10 sem bloqueantes, com evidências declaradas."
    ],
    "acceptanceCriteria": [
      "Demonstrei fluxo completo e contraexemplos sem dados pessoais.",
      "Entreguei arquivos, comandos, OpenAPI, README, testes e ADR.",
      "Revisei a rubrica; implementação completa de RFC9457/integração externa não é bloqueante."
    ],
    "hints": [
      "Faça uma fatia criar→consultar antes de listar todas as funcionalidades.",
      "Controle o relógio nos testes e injete o armazenamento fake.",
      "Peça a outra pessoa para reproduzir pelo README e registre o que permanece não verificado."
    ],
    "testIdeas": [
      "Reserva duplicada409; passado422; ausente404.",
      "Cancelar→reservar novamente; página vazia200; campo extra rejeitado."
    ],
    "commonErrors": [
      "Prometer consistência entre processos a partir de um Map ou fake.",
      "Marcar revisão ou teste como executado sem saída real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://spec.openapis.org/oas/v3.1.1.html"
    ]
  },
  {
    "id": "04-js-projeto",
    "stageId": "04",
    "slug": "js-projeto",
    "title": "Projeto integrador · API de agendamentos · TypeScript/Express",
    "subject": "Integração · Obrigatório",
    "level": "avancado",
    "optional": false,
    "requirement": "Obrigatório",
    "objectives": [
      "Entregar API, testes, OpenAPI, README e decisões na stack escolhida."
    ],
    "prerequisites": [
      "Fundamentos comuns e atividades obrigatórias da trilha."
    ],
    "statement": "Implemente horários disponíveis e agendamentos: criar, consultar, cancelar, validar passado e conflito sequencial, paginar/filtrar/ordenar listagens. Entregue código, README com instalação/execução/cURL, environment.example sem segredos quando pertinente, openapi.yaml, testes e ADR. Sem banco, Docker, autenticação ou segunda stack. Use fake temporário e declare reinicialização e limite entre processos.",
    "requirements": [
      "Listar slots, criar/consultar/cancelar reservas e impedir conflito sequencial.",
      "Listagens com paginação/filtros/ordenação, representações e erros documentados.",
      "Testes executáveis e revisão ponderada ≥8/10 sem bloqueantes, com evidências declaradas."
    ],
    "acceptanceCriteria": [
      "Demonstrei fluxo completo e contraexemplos sem dados pessoais.",
      "Entreguei arquivos, comandos, OpenAPI, README, testes e ADR.",
      "Revisei a rubrica; implementação completa de RFC9457/integração externa não é bloqueante."
    ],
    "hints": [
      "Faça uma fatia criar→consultar antes de listar todas as funcionalidades.",
      "Controle o relógio nos testes e injete o armazenamento fake.",
      "Peça a outra pessoa para reproduzir pelo README e registre o que permanece não verificado."
    ],
    "testIdeas": [
      "Reserva duplicada409; passado422; ausente404.",
      "Cancelar→reservar novamente; página vazia200; campo extra rejeitado."
    ],
    "commonErrors": [
      "Prometer consistência entre processos a partir de um Map ou fake.",
      "Marcar revisão ou teste como executado sem saída real."
    ],
    "referenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc9110",
      "https://spec.openapis.org/oas/v3.1.1.html"
    ]
  }
];
