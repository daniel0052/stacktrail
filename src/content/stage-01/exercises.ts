import { validateExercises, type Exercise } from './types';

export const exercises: Exercise[] = [
  {
    "id": "ex-01",
    "stageId": "01",
    "slug": "contato",
    "title": "Cadastro de contato com validação",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Formulário com nome, e-mail, telefone opcional e mensagem.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM e eventos"
    ],
    "statement": "Construir um formulário semântico de contato, em HTML, CSS puro e TypeScript. Receba nome, e-mail, telefone opcional e mensagem. A confirmação deve resumir os dados com segurança, sem enviar informações a um serviço real.",
    "requirements": [
      "Formulário com nome, e-mail, telefone opcional e mensagem.",
      "CSS puro responsivo, labels explícitas, foco visível e mensagens acessíveis.",
      "Tipar campos e eventos; validar dados e impedir envio inválido.",
      "Exibir resumo seguro usando textContent.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Todos os controles e a submissão funcionam pelo teclado.",
      "Campos vazios e e-mail inválido recebem feedback compreensível.",
      "Não há erros no console durante os casos testados.",
      "O resumo usa textContent, e o layout funciona em celular e desktop."
    ],
    "hints": [
      "Separe o que é estrutura, apresentação e regra de validação. Qual informação é obrigatória?",
      "Ouça o submit do formulário. Quais verificações devem ocorrer antes da confirmação?",
      "Confira o tipo e a existência de cada elemento; trate o telefone vazio como opcional e associe a mensagem de erro ao campo."
    ],
    "testIdeas": [
      "Enviar vazio e com e-mail inválido.",
      "Preencher apenas campos obrigatórios usando Tab e Enter.",
      "Inserir texto parecido com HTML e verificar que aparece como texto."
    ],
    "referenceUrls": [
      "https://www.w3.org/WAI/tutorials/forms/",
      "https://www.typescriptlang.org/docs/handbook/intro.html"
    ]
  },
  {
    "id": "ex-02",
    "stageId": "01",
    "slug": "tarefas",
    "title": "Lista de tarefas persistente",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Interface responsiva para adicionar, concluir, filtrar e excluir.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM e eventos"
    ],
    "statement": "Criar uma lista de tarefas que permita adicionar, concluir, filtrar e excluir itens. Ao atualizar a página, a lista deve ser recuperada do armazenamento local com validação dos dados.",
    "requirements": [
      "Interface responsiva para adicionar, concluir, filtrar e excluir.",
      "Tipos para tarefas, arrays e objetos; eventos e renderização do DOM.",
      "Persistência em localStorage com validação dos dados recuperados.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Alterações continuam presentes após recarregar a página.",
      "Lista vazia mostra uma mensagem útil.",
      "Dados do usuário não são inseridos via innerHTML inseguro.",
      "Adicionar, concluir, filtrar e excluir funcionam em layout responsivo."
    ],
    "hints": [
      "Defina o modelo de tarefa antes de pensar em botões. Qual é a fonte de verdade da lista?",
      "Após cada alteração, sincronize estado, interface e armazenamento. O filtro deve alterar os dados originais?",
      "Trate JSON inválido e confira cada propriedade recuperada. Use um identificador estável para localizar a tarefa ao excluir."
    ],
    "testIdeas": [
      "Recarregar depois de concluir e excluir.",
      "Testar lista vazia e filtros sem resultados.",
      "Salvar JSON malformado no armazenamento de teste e observar recuperação."
    ],
    "referenceUrls": [
      "https://www.typescriptlang.org/docs/handbook/intro.html",
      "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
    ]
  },
  {
    "id": "ex-03",
    "stageId": "01",
    "slug": "catalogo",
    "title": "Busca de catálogo local",
    "level": "inicial",
    "optional": false,
    "objectives": [
      "Array tipado com nome, preço e categoria.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM e eventos"
    ],
    "statement": "Exibir cartões de produtos a partir de um array tipado, com nome, preço e categoria. Combine busca, filtro por categoria e ordenação, mantendo um estado explícito para ausência de resultados.",
    "requirements": [
      "Array tipado com nome, preço e categoria.",
      "Busca, filtro, ordenação e mensagem sem resultados.",
      "Separar lógica de filtragem da renderização.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Busca e categoria funcionam em combinação.",
      "Os controles são operáveis por teclado.",
      "Cartões e controles se adaptam a celular e desktop.",
      "A lógica de filtro está separada da atualização do DOM."
    ],
    "hints": [
      "Descreva quais condições um produto precisa satisfazer para aparecer.",
      "Combine as condições antes de ordenar. Normalize o termo de busca sem modificar o catálogo.",
      "Crie uma função que recebe produtos e critérios e devolve outra lista; cuidado com sort, que modifica o array original."
    ],
    "testIdeas": [
      "Combinar um termo existente com categoria incompatível.",
      "Ordenar preços numericamente, inclusive 2 e 10.",
      "Limpar todos os filtros e conferir o catálogo completo."
    ],
    "referenceUrls": [
      "https://www.typescriptlang.org/docs/handbook/intro.html",
      "https://developer.mozilla.org/en-US/docs/Web/CSS"
    ]
  },
  {
    "id": "ex-04",
    "stageId": "01",
    "slug": "usuarios",
    "title": "Buscador de usuários com API",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Buscar via fetch e renderizar lista e detalhes.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM, async/await, HTTP, JSON e fetch"
    ],
    "statement": "Consultar uma API pública ou um mock local via fetch e exibir lista e detalhes de usuários. O resultado deve vir da resposta recebida. Ofereça busca, tentativa novamente e estados de carregamento, falha e vazio.",
    "requirements": [
      "Buscar via fetch e renderizar lista e detalhes.",
      "Campo de busca e estados loading, erro e vazio.",
      "Ação retry; AbortController é opcional.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "response.ok é verificado antes de tratar a resposta como sucesso.",
      "Status e payload foram conferidos no Network, com evidência registrada.",
      "O resultado não substitui a resposta por dados de exemplo hardcoded.",
      "Busca, detalhes, loading, erros, vazio e retry são demonstráveis."
    ],
    "hints": [
      "Desenhe os estados possíveis antes de escrever a requisição.",
      "Uma Promise resolvida significa necessariamente status de sucesso? Separe erro de rede e erro HTTP.",
      "Leia JSON como unknown e valide a estrutura antes de renderizar; reaproveite a função de busca no retry."
    ],
    "testIdeas": [
      "Simular resposta HTTP de erro, JSON inválido e rede indisponível.",
      "Buscar um termo sem resultados.",
      "Inspecionar método, status e corpo no Network."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      "https://www.typescriptlang.org/docs/handbook/intro.html"
    ]
  },
  {
    "id": "ex-05",
    "stageId": "01",
    "slug": "agendamento",
    "title": "Agendamento frontend com mock de API",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Validar nome, data, horário e serviço no cliente.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM, async/await, HTTP, JSON e fetch"
    ],
    "statement": "Criar formulário de agendamento com nome, data, horário e serviço. Envie JSON por POST a um mock server e liste os registros por GET. Simule conflito de horário com status 409, sem usar credenciais reais.",
    "requirements": [
      "Validar nome, data, horário e serviço no cliente.",
      "Enviar JSON por POST e listar registros por GET em mock server.",
      "Estados de envio e falha; impedir clique duplo.",
      "Tratar status 409 para conflito simulado.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Não há credenciais ou segredos no frontend.",
      "POST envia JSON e GET atualiza a listagem.",
      "Envio duplicado é impedido e o conflito 409 recebe mensagem útil.",
      "O README explica por que o backend deve revalidar o horário."
    ],
    "hints": [
      "Quais regras podem ser checadas antes da rede e quais dependem da disponibilidade no servidor?",
      "Mantenha um estado de envio único. Qual status distingue conflito de falha inesperada?",
      "Defina o contrato do mock e controle a liberação do botão em finally; atualize a lista somente após uma resposta de sucesso."
    ],
    "testIdeas": [
      "Enviar duas vezes rapidamente.",
      "Simular conflito 409 e falha de rede.",
      "Conferir Content-Type e JSON do POST no Network."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      "https://www.w3.org/WAI/tutorials/forms/"
    ]
  },
  {
    "id": "ex-06",
    "stageId": "01",
    "slug": "livros",
    "title": "Dashboard de livros",
    "level": "intermediario",
    "optional": false,
    "objectives": [
      "Busca por título, categoria e paginação simples.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM, async/await, HTTP, JSON e fetch"
    ],
    "statement": "Construir uma interface mobile-first de livros com busca por título, filtro por categoria, paginação simples e favoritos locais. A origem deve ser uma API pública ou um mock com resposta assíncrona.",
    "requirements": [
      "Busca por título, categoria e paginação simples.",
      "Favoritos persistidos localmente.",
      "API pública ou dados de mock com resposta assíncrona.",
      "Funções reutilizáveis em TypeScript sem framework.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Há estados claros de erro e loading.",
      "O layout é mobile-first.",
      "Busca, filtros, paginação e favoritos funcionam juntos.",
      "A lógica reutilizável está organizada em funções TypeScript sem framework."
    ],
    "hints": [
      "Separe dados recebidos, critérios de consulta e favoritos.",
      "Em que ordem você filtra e pagina? O que ocorre com a página atual quando a busca muda?",
      "Guarde identificadores de favoritos e derive a página visível dos filtros; revise os limites da última página."
    ],
    "testIdeas": [
      "Filtrar quando estiver na última página.",
      "Recarregar e verificar favoritos.",
      "Simular demora, falha e resposta vazia."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      "https://www.typescriptlang.org/docs/handbook/intro.html",
      "https://developer.mozilla.org/en-US/docs/Web/CSS"
    ]
  },
  {
    "id": "ex-07",
    "stageId": "01",
    "slug": "administracao",
    "title": "Painel de administração de agendamentos",
    "level": "avancado",
    "optional": true,
    "objectives": [
      "HTML semântico, CSS responsivo e TypeScript modular e tipado.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM, async/await, HTTP, JSON e fetch"
    ],
    "statement": "Consolidar a etapa em um painel com formulário e tabela ou lista de agendamentos. Use API própria ou mock para GET, POST, PATCH e DELETE, com filtros, paginação e feedback. Este aprofundamento é opcional para avançar.",
    "requirements": [
      "HTML semântico, CSS responsivo e TypeScript modular e tipado.",
      "Formulário e tabela/lista; GET, POST, PATCH e DELETE.",
      "Filtros, paginação e feedback de erro.",
      "Estados loading, erro, vazio e sucesso; prevenir submissão duplicada.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Os quatro métodos e os estados de interface são demonstráveis.",
      "O painel possui filtros e paginação funcionais.",
      "Autorização real é atribuída ao backend.",
      "Ocultar botões não é apresentado como proteção de acesso."
    ],
    "hints": [
      "Mapeie cada ação da interface para o método HTTP e a transição de estado.",
      "O que acontece se uma edição falha? Não confirme uma alteração que a API rejeitou.",
      "Separe acesso à API de renderização e regras; preserve dados da tentativa malsucedida e confirme exclusões no seu projeto."
    ],
    "testIdeas": [
      "Simular falha ao editar e excluir.",
      "Tentar operações sem autorização no backend, quando existir.",
      "Conferir filtros, paginação e envio duplicado."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      "https://www.w3.org/WAI/tutorials/forms/",
      "https://www.typescriptlang.org/docs/handbook/intro.html"
    ]
  },
  {
    "id": "ex-08",
    "stageId": "01",
    "slug": "carrinho",
    "title": "Carrinho e checkout simulado",
    "level": "avancado",
    "optional": true,
    "objectives": [
      "Catálogo com busca e filtro.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM, async/await, HTTP, JSON e fetch"
    ],
    "statement": "Criar catálogo com busca e filtro, carrinho persistente e checkout simulado sem pagamento real. Trabalhe quantidade, totais e validação, consumindo endpoints de catálogo. Este aprofundamento é opcional para avançar.",
    "requirements": [
      "Catálogo com busca e filtro.",
      "Carrinho persistente, quantidade, totais e validação.",
      "Consumir endpoints de catálogo e simular checkout sem pagamento real.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Carrinho persiste e quantidades e totais são atualizados corretamente.",
      "Catálogo é obtido dos endpoints e checkout é apenas simulado.",
      "Quando houver backend, preço final é calculado e validado no servidor.",
      "O projeto explica por que frontend não é fonte confiável para preço e estoque."
    ],
    "hints": [
      "Modele itens do carrinho e diferencie quantidade de preço unitário.",
      "Como impedir quantidade inválida? Como evitar erro de arredondamento monetário?",
      "Considere unidades monetárias inteiras e derive totais; no contrato de checkout, o servidor precisa conferir preço e estoque."
    ],
    "testIdeas": [
      "Recarregar com carrinho preenchido.",
      "Testar quantidade zero, negativa e valores inválidos.",
      "Alterar um preço no navegador e explicar a verificação necessária no servidor."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      "https://www.typescriptlang.org/docs/handbook/intro.html"
    ]
  },
  {
    "id": "ex-09",
    "stageId": "01",
    "slug": "css-tailwind",
    "title": "Comparativo CSS puro vs Tailwind",
    "level": "avancado",
    "optional": true,
    "objectives": [
      "Recriar uma interface anterior com Tailwind.",
      "Explicar decisões e demonstrar os critérios com evidências."
    ],
    "prerequisites": [
      "HTML semântico e CSS puro",
      "TypeScript com strict",
      "DOM e eventos da interface escolhida; async/await, HTTP, JSON e fetch apenas se ela consumir API"
    ],
    "statement": "Recriar uma interface dos exercícios anteriores usando Tailwind após construir a versão em CSS puro. Preserve semântica e funcionalidades e documente os efeitos da mudança. O desafio é opcional.",
    "requirements": [
      "Recriar uma interface anterior com Tailwind.",
      "Manter HTML semântico e funcionalidades.",
      "Documentar manutenção, responsividade, acessibilidade e tamanho/complexidade do código.",
      "Usar TypeScript com strict, evitar any desnecessário e validar dados externos.",
      "Fazer commits e escrever README explicando decisões."
    ],
    "acceptanceCriteria": [
      "Acessibilidade é preservada ao usar utilitários.",
      "Funcionalidades da versão CSS puro continuam disponíveis.",
      "A comparação documenta as quatro dimensões solicitadas."
    ],
    "hints": [
      "Escolha uma interface pequena e registre o comportamento da versão original.",
      "Mapeie propriedades CSS para utilitários, mantendo os mesmos estados de foco e breakpoints.",
      "Compare as versões com o mesmo roteiro de teclado e larguras; justifique diferenças sem assumir que menos linhas significa melhor manutenção."
    ],
    "testIdeas": [
      "Executar o mesmo fluxo de teclado nas duas versões.",
      "Comparar em celular e desktop.",
      "Revisar foco, contraste e CSS gerado."
    ],
    "referenceUrls": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS",
      "https://tailwindcss.com/docs"
    ]
  }
];

if (!validateExercises(exercises)) throw new Error('Inventário de exercícios inválido.');
