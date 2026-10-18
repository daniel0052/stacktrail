import { exercises } from '../content/stage-01/exercises';
export const checkedOn = '2026-10-17';
export type Reference = {
    id: string;
    title: string;
    url: string;
    language: string;
    type: string;
    cost: 'Gratuito' | 'Pago';
    section: string;
    version: string;
    note: string;
    checked: string;
    adequacy: string;
};
const ref = (id: string, title: string, url: string, language: string, section: string, version = 'Documentação viva; versão não fixada', note = '', type = 'Documentação oficial', cost: Reference['cost'] = 'Gratuito'): Reference => ({ id, title, url, language, type, cost, section, version, note, checked: checkedOn, adequacy: checkedOn });
export const references: Reference[] = [
    ref('css-base', 'MDN · Primeiros passos com CSS', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics', 'PT-BR', 'Sintaxe e seletores; índice de estudo', 'Índice vivo', 'Verificado o índice; links filhos e exemplos de ferramentas antigas não foram todos validados.', 'Trilha gratuita de estudo'),
    ref('cascade', 'MDN · Cascata, especificidade e herança', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts', 'PT-BR', 'Prioridade e herança das regras'),
    ref('box', 'MDN · Modelo de caixas', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Box_model', 'PT-BR', 'Dimensões, padding, borda e margem', 'Tradução com títulos em inglês'),
    ref('units', 'MDN · CSS values and units', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units', 'Inglês', 'Unidades e valores CSS', 'Documentação viva', 'Página PT candidata inacessível na consulta; alternativa EN confirmada.'),
    ref('states', 'MDN · Pseudo-classes', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Reference/Selectors/Pseudo-classes', 'PT-BR', 'Estados de interação: foco, hover e checked', 'Recorte introdutório', 'Índice traduzido pode omitir seletores mais recentes; data de modificação exibida é inconsistente, não usada como prova de atualidade.'),
    ref('setup', 'TypeScript · Preparar ambiente', 'https://www.typescriptlang.org/download/', 'Inglês', 'Instalação por projeto e compilador', 'Documentação corrente', 'Usar versão compatível com o projeto e registrar no README.'),
    ref('compiler', 'TypeScript · The Basics', 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html', 'Inglês', 'tsc, emissão e strict', 'Handbook corrente'),
    ref('modules', 'TypeScript · Modules', 'https://www.typescriptlang.org/docs/handbook/2/modules.html', 'Inglês', 'import/export e configuração do ambiente', 'Handbook corrente', 'Selecionar o uso no navegador; não exige Node backend.'),
    ref('formdata', 'MDN · Using FormData Objects', 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects', 'Inglês', 'Construção e envio de FormData', 'Web APIs atuais', 'Alternativa EN após falha de acesso à candidata PT. Comparar o contrato do formulário com JSON na referência Fetch.'),
    ref('query', 'MDN · URLSearchParams', 'https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams', 'PT-BR', 'Métodos, parâmetros repetidos e serialização'),
    ref('encode', 'MDN · encodeURIComponent', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent', 'PT-BR', 'Codificação de componente de URI'),
    ref('network', 'Chrome DevTools · Inspecionar rede', 'https://developer.chrome.com/docs/devtools/network?hl=pt-br', 'PT-BR', 'Headers, status, payload, respostas e falhas', 'Chrome DevTools corrente', 'Conteúdo em português com tradução automática indicada pelo site. Rótulos e interface dependem da versão e do idioma do navegador.', 'Tutorial oficial'),
    ref('cookies', 'MDN · Using HTTP cookies', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies', 'Inglês', 'Atributos e restrições de segurança', 'HTTP / navegadores atuais', 'Recorte introdutório de segurança do cliente; implementação de autenticação pertence às etapas posteriores.'),
    ref('git-setup', 'Pro Git · Preparar o primeiro repositório', 'https://git-scm.com/book/pt-br/v2', 'PT-BR', 'Seções 1.5 (instalação), 1.6 (identidade) e 2.1 (repositório)', '2ª edição online', 'Scott Chacon e Ben Straub. Consultadas estas seções e 2.2; não o livro integral. Guia mínimo antes dos primeiros commits, sem exigir colaboração da02.', 'Livro online oficial'),
    ref('git', 'Pro Git · Gravando alterações', 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Gravando-Altera%C3%A7%C3%B5es-no-Reposit%C3%B3rio', 'PT-BR', 'status, staging e commit local', '2ª edição online', 'Ponte mínima para registrar o trabalho; branches e colaboração aprofundam na02.', 'Livro online oficial'),
    ref('mock', 'Mockoon · Rotas HTTP', 'https://mockoon.com/docs/latest/api-endpoints/http-routes/', 'Inglês', 'Configuração de método, caminho, status e resposta', 'Documentação latest; conferir versão local', 'Documentação gratuita. Ferramenta externa de mock local; não exige implementar um backend. Rotas HTTP simples não compartilham alterações.', 'Documentação oficial'),
    ref('mock-responses', 'Mockoon · Múltiplas respostas', 'https://mockoon.com/docs/latest/route-responses/multiple-responses/', 'Inglês', 'Alternar sucesso, conflito e falha', 'Documentação latest', 'Pode alternar respostas manualmente para testar estados; não equivale a regra real de concorrência.', 'Documentação oficial'),
    ref('mock-crud', 'Mockoon · Rotas CRUD', 'https://mockoon.com/docs/latest/api-endpoints/crud-routes/', 'Inglês', 'Coleção de estudo para GET, POST, PATCH e DELETE', 'Documentação latest', 'Opção para recuperar alterações entre chamadas; reiniciar o mock pode reiniciar os dados. Status CRUD são automáticos; consultar Overriding a CRUD route para cenários HTTP de erro. Não é API de produção.', 'Documentação oficial'),
    ref('html', 'MDN · HTML básico', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax', 'PT-BR', 'Estrutura e sintaxe HTML'),
    ref('forms', 'MDN · Formulários web', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms', 'PT-BR', 'Índice de estrutura, controles e validação', 'Índice vivo', 'Verificado o índice; idioma e atualidade dos artigos filhos podem variar.', 'Trilha gratuita de estudo'),
    ref('wai', 'W3C WAI · Formulários acessíveis', 'https://www.w3.org/WAI/tutorials/forms/', 'Inglês', 'Rótulos, instruções, validação e notificações', 'Atualizado em março de 2026', 'Complemento em inglês para acessibilidade.', 'Tutorial oficial'),
    ref('flex', 'MDN · Conceitos de Flexbox', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts', 'PT-BR', 'Eixos, quebra e alinhamento'),
    ref('grid', 'MDN · Conceitos de Grid', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Grid_layout/Basic_concepts', 'PT-BR', 'Trilhas, linhas, células e áreas'),
    ref('functions', 'MDN · Funções', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions', 'PT-BR', 'Declaração, parâmetros e retorno', 'JavaScript; adaptar a tipagem em TypeScript', 'Apoio para a base JavaScript pressuposta pelo Handbook; não é um curso de TypeScript.'),
    ref('control', 'MDN · Controle de fluxo e erros', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling', 'PT-BR', 'Condicionais e tratamento de exceções', 'JavaScript; adaptar a tipagem em TypeScript'),
    ref('ts', 'TypeScript · Everyday Types', 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', 'Inglês', 'Arrays, objetos, funções, uniões e anotações', 'Handbook corrente; navegação já inclui TS 6.0', 'Projeto usa TypeScript 5.9.3. Tradução PT candidata não pôde ser confirmada; não exigimos recursos exclusivos da versão mais recente.'),
    ref('narrow', 'TypeScript · Narrowing', 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', 'Inglês', 'Guardas e refinamento de tipos', 'Handbook corrente; conferir compilador instalado', 'Fonte específica em inglês; complementar a base de tipos.'),
    ref('strict', 'TypeScript · strict', 'https://www.typescriptlang.org/tsconfig/strict.html', 'Inglês', 'Opção strict e condições de versão', 'TSConfig corrente', 'O conjunto de verificações pode evoluir entre versões.'),
    ref('dom', 'MDN · DOM', 'https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model', 'PT-BR', 'Introdução e interfaces de documentos', 'Web APIs atuais', 'Selecionar o recorte introdutório, sem percorrer todas as interfaces.'),
    ref('promise', 'MDN · Using promises', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', 'Inglês', 'Encadeamento e propagação de erros', 'JavaScript atual', 'Traduções PT examinadas têm trechos enganosos; preferida a fonte em inglês para este recorte.'),
    ref('fetch', 'MDN · Using Fetch', 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', 'Inglês', 'Resposta, status, JSON, erros e credenciais', 'Web APIs atuais', 'Tradução PT consultada contém afirmações antigas sobre credenciais. Fonte EN selecionada por adequação técnica.'),
    ref('cors', 'MDN · CORS', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS', 'Inglês', 'Preflight e requisições com credenciais', 'HTTP / navegadores atuais', 'Tradução PT contém atribuição incorreta de quem envia a requisição após preflight; preferida a EN.'),
    ref('storage', 'MDN · Web Storage', 'https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API', 'PT-BR', 'APIs de armazenamento por chave', 'Web APIs atuais', 'Leitura introdutória; limites de sessão e particionamento devem ser consultados nas referências EN específicas.'),
    ref('local', 'MDN · localStorage', 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage', 'Inglês', 'Persistência, origem e exceções', 'Web APIs atuais'),
    ref('session', 'MDN · sessionStorage', 'https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage', 'Inglês', 'Origem, aba, recarga e restauração', 'Web APIs atuais'),
    ref('tailwind', 'Tailwind · Instalação com Vite', 'https://tailwindcss.com/docs/installation/using-vite', 'Inglês', 'Integração com Vite', 'Tailwind 4.3', 'Opcional após CSS. Não combinar instruções de instalação da versão 3.'),
    ref('react', 'React · Início rápido', 'https://pt-br.react.dev/learn', 'PT-BR', 'Componentes, eventos e estado', 'Documentação observada: React 19.2', 'Opcional; não é promessa de cobertura exata do React 19.3 instalado.', 'Guia oficial'),
    ref('next', 'Next.js · Server e Client Components', 'https://nextjs.org/docs/app/getting-started/server-and-client-components', 'Inglês', 'Fronteira servidor/cliente no App Router', 'App Router; número exato não identificado no corpo', 'Opcional após React. Verificar versão do projeto antes de aplicar.'),
];
export type Topic = {
    id: string;
    name: string;
    goal: string;
    before: string[];
    optional: boolean;
    refs: string[];
    exerciseIds: string[];
};
export const topics: Topic[] = [
    { id: 'html', name: 'HTML e formulários acessíveis', goal: 'Construir a estrutura semântica e os controles da interface.', before: ['Usar arquivos e navegador; decompor uma tarefa simples.'], optional: false, refs: ['html', 'forms', 'wai'], exerciseIds: ['ex-01'] },
    { id: 'css', name: 'CSS e layout responsivo', goal: 'Adaptar formulários e listas a telas diferentes com foco visível.', before: ['html'], optional: false, refs: ['css-base', 'cascade', 'box', 'units', 'states', 'flex', 'grid'], exerciseIds: ['ex-01', 'ex-03'] },
    { id: 'ts-base', name: 'Base JavaScript em TypeScript', goal: 'Praticar condições, funções, arrays e objetos com tipagem.', before: ['html'], optional: false, refs: ['setup', 'compiler', 'functions', 'control', 'ts', 'strict', 'modules', 'git-setup', 'git'], exerciseIds: ['ex-01', 'ex-03'] },
    { id: 'ts-tipos', name: 'Tipos e validação de dados', goal: 'Representar o domínio e conferir dados externos antes de utilizá-los.', before: ['ts-base'], optional: false, refs: ['ts', 'narrow', 'strict'], exerciseIds: ['ex-02', 'ex-04'] },
    { id: 'dom', name: 'DOM e eventos', goal: 'Ligar as ações do usuário aos estados e à apresentação da interface.', before: ['html', 'css', 'ts-tipos'], optional: false, refs: ['dom', 'formdata', 'wai'], exerciseIds: ['ex-01', 'ex-02', 'ex-03'] },
    { id: 'async', name: 'Assincronismo', goal: 'Tratar conclusão, falhas e atualização assíncrona da interface.', before: ['ts-tipos', 'dom'], optional: false, refs: ['promise', 'fetch'], exerciseIds: ['ex-04', 'ex-05', 'ex-06'] },
    { id: 'http', name: 'Navegador e API', goal: 'Consumir HTTP/JSON, preparar consultas codificadas e inspecionar estados e payloads no DevTools.', before: ['async'], optional: false, refs: ['fetch', 'query', 'encode', 'network', 'cors', 'mock', 'mock-responses', 'mock-crud'], exerciseIds: ['ex-04', 'ex-05', 'ex-06', 'ex-07'] },
    { id: 'seguranca', name: 'Armazenamento e limites do cliente', goal: 'Comparar FormData/JSON e armazenamento/cookies, persistir preferências sem segredos e documentar limites da validação no cliente.', before: ['dom', 'ts-tipos', 'http'], optional: false, refs: ['storage', 'local', 'session', 'cookies', 'cors', 'fetch'], exerciseIds: ['ex-02', 'ex-05', 'ex-08'] },
    { id: 'tailwind', name: 'Tailwind após CSS', goal: 'Comparar manutenção e acessibilidade preservando a interface em CSS puro.', before: ['css', 'dom'], optional: true, refs: ['tailwind'], exerciseIds: ['ex-09'] },
    { id: 'react', name: 'React', goal: 'Experimentar componentes e estado sobre uma interface já construída.', before: ['dom', 'async'], optional: true, refs: ['react'], exerciseIds: ['extra-react'] },
    { id: 'next', name: 'Next.js', goal: 'Investigar a fronteira cliente/servidor em uma extensão opcional.', before: ['react', 'http'], optional: true, refs: ['next'], exerciseIds: ['extra-next'] },
];
export type Task = {
    id: string;
    slug: string;
    title: string;
    level: string;
    optional: boolean;
    topicIds: string[];
    objectives: string[];
    prerequisites: string[];
    statement: string;
    requirements: string[];
    constraints: string[];
    io: string[];
    acceptanceCriteria: string[];
    hints: string[];
    testIdeas: string[];
    refs: string[];
    rubric: string[];
    deliverables: string[];
};
export const rubric = ['Avaliar somente os critérios aplicáveis ao desafio: ausência prevista de API não é falha. Adequado exige comportamento demonstrado e caso negativo; descrição sem evidência fica Não verificado. Nos extras, comparar os critérios originais antes/depois e justificar as fronteiras/estados alterados.', 'Funcionalidade: demonstrar os fluxos e estados exigidos.', 'HTML e acessibilidade: semântica, teclado, rótulos e feedback.', 'CSS: reflow e foco em celular e desktop.', 'TypeScript: strict, tipos de domínio e validação de dados externos.', 'HTTP e segurança: contrato observado, erros e ausência de segredos.', 'Testes e documentação: evidências reproduzíveis e limites explicitados.'];
const taskRefs = [['html', 'forms', 'wai', 'ts', 'strict', 'dom', 'git'], ['ts', 'narrow', 'local', 'dom'], ['ts', 'flex', 'grid', 'dom'], ['fetch', 'narrow', 'cors', 'query', 'encode', 'network', 'mock', 'mock-responses'], ['fetch', 'wai', 'cors', 'network', 'formdata', 'mock', 'mock-responses', 'mock-crud'], ['fetch', 'local', 'ts', 'grid', 'network', 'mock-crud'], ['fetch', 'wai', 'ts', 'mock-crud', 'mock-responses'], ['fetch', 'local', 'ts'], ['tailwind', 'flex', 'grid']];
const io = [
    ['Entradas: nome, e-mail, telefone opcional e mensagem.', 'Saídas: erros por campo ou resumo textual seguro; nenhum envio real.'],
    ['Entradas: descrição, ações e dados salvos (inclusive inválidos).', 'Saídas: lista filtrada e estado recuperável após recarga.'],
    ['Entradas: catálogo com nome/preço/categoria; termo, categoria e ordem.', 'Saídas: cartões na ordem escolhida ou estado vazio.'],
    ['Entradas: busca e respostas HTTP de lista/detalhes.', 'Saídas: dados recebidos ou loading, erro, vazio e retry.'],
    ['Entradas: nome/data/horário/serviço; respostas GET/POST do mock externo ao StackTrail.', 'Saídas: lista atualizada, confirmação ou conflito 409 sem perda dos dados.'],
    ['Entradas: catálogo assíncrono, busca, categoria, página e favoritos.', 'Saídas: página filtrada, favoritos recuperados e feedback de falhas.'],
    ['Entradas: ações de criação, edição, exclusão e filtros.', 'Saídas: dados confirmados pela API ou erro preservando a tentativa.'],
    ['Entradas: catálogo da API, itens e quantidades.', 'Saídas: totais, carrinho persistido e confirmação de checkout apenas simulado.'],
    ['Entrada: interface anterior já funcional em CSS puro.', 'Saída: versão Tailwind equivalente e comparação das quatro dimensões.'],
];
export const tasks: Task[] = exercises.map((e, i) => ({ ...e, prerequisites: [...e.prerequisites, 'Preparar Git local e inicializar um repositório (Pro Git 1.5, 1.6 e 2.1); não exige branches/colaboração da02.'], topicIds: topics.filter(t => t.exerciseIds.includes(e.id)).map(t => t.id), constraints: [...(i === 8 ? ['Manter disponível a versão original em CSS puro.'] : ['HTML, CSS e TypeScript strict; sem framework no núcleo.']), 'Executar no seu ambiente; a plataforma guarda texto e não executa código. Para commits locais, consultar a ponte Pro Git; colaboração será estudada na02.', ...(i >= 3 && i < 8 ? ['API pública autorizada ou mock local configurado por interface (por exemplo Mockoon); sem credenciais reais. Para manter alterações entre GET/POST, usar coleção CRUD de estudo. Para testar 409, usar um cenário HTTP de erro/sobrescrita separado da coleção CRUD; não presumir edição livre dos status automáticos da CRUD. Consultar as seções de múltiplas respostas e sobrescrita. Registrar configuração no README; não implementar backend nesta etapa.'] : [])], io: io[i], refs: [...new Set([...taskRefs[i], 'git-setup', 'git'])], hints: [e.hints[0], `Consulte ${taskRefs[i].map(id => references.find(r => r.id === id)!.title).join(' / ')}. Investigue: ${e.testIdeas[0]}`, e.hints[2]], rubric, deliverables: ['Código ou repositório, README com execução e decisões, registro dos casos testados.'] }));
const extra = (id: string, title: string, statement: string, topicIds: string[], req: string[], criteria: string[], refs: string[]): Task => ({ id, slug: id, title, statement, topicIds, level: 'extra', optional: true, objectives: [statement], prerequisites: topicIds.map(id => topics.find(t => t.id === id)!.goal), requirements: req, constraints: ['Opcional; não substitui nem bloqueia o núcleo sem framework.', 'Não implementar banco, autenticação ou deploy pago.'], io: ['Entrada: interface concluída pelo estudante.', 'Saída: extensão funcional com evidências e limites registrados.'], acceptanceCriteria: criteria, hints: ['Escolha um comportamento pequeno e registre a versão anterior.', 'Consulte as referências e identifique quais fronteiras ou estados mudam.', 'Compare o mesmo roteiro de uso nas duas versões antes de ampliar o escopo.'], testIdeas: ['Repetir o fluxo de teclado e os casos de erro da versão anterior.', 'Documentar o que foi executado e o que permaneceu sem verificar.'], refs, rubric, deliverables: ['Código, instruções, comparação e evidências.'] });
tasks.push(extra('extra-react', 'Revisitar uma interface com React', 'Reimplementar somente a lista ou formulário de um exercício anterior em React, preservando os critérios originais.', ['react'], ['Organizar componentes e estado sem duplicar a fonte de dados.', 'Preservar rótulos, teclado e estados já existentes.'], ['O fluxo original é demonstrável nas duas versões.', 'O README identifica o estado e as decisões dos componentes.'], ['react', 'wai']), extra('extra-next', 'Investigar uma fronteira no Next.js', 'Usar App Router em uma pequena extensão da interface React e registrar onde cada parte executa.', ['react', 'next'], ['Identificar no README o trecho servidor e a interação cliente.', 'Conferir a versão utilizada e não enviar segredos ao cliente.'], ['A interação funciona e a localização de execução tem evidência inspecionável.', 'O README registra limites e versão, sem prometer segurança por ocultação.'], ['next', 'react']));
export const project: Task = {
    id: '01-project', slug: 'central-reservas', title: 'Central de Reservas Comunitárias', level: 'integrador', optional: false, topicIds: topics.filter(t => !t.optional).map(t => t.id),
    objectives: ['Entregar um cliente web acessível que consulta recursos e solicita reservas por HTTP.'],
    prerequisites: ['HTML/CSS, TypeScript strict, DOM, assincronismo e consumo de API.', 'Três exercícios iniciais e ao menos um intermediário, ou evidências equivalentes já registradas.'],
    statement: 'Uma associação compartilha salas e equipamentos. As pessoas precisam consultar o catálogo e solicitar um horário sem depender de mensagens dispersas. Construa o cliente web; a API ou mock existe no seu ambiente de estudo. O problema desta entrega é a interação e a comunicação com o serviço, sem implementar backend. Este domínio poderá evoluir nas etapas futuras.',
    requirements: ['Listar recursos recebidos por GET, com busca e estado vazio.', 'Enviar nome fictício, recurso, data e horário por POST em JSON.', 'Exibir loading, sucesso, erro de rede, resposta HTTP inválida e conflito 409.', 'Validar campos e respostas; impedir submissão duplicada e permitir nova tentativa.', 'Guardar somente preferências ou favoritos locais; permitir recuperação de dados inválidos.'],
    constraints: ['HTML, CSS puro e TypeScript strict no núcleo; sem React/Next/Tailwind obrigatórios.', 'API pública autorizada ou mock local configurado por interface, como Mockoon, fora do StackTrail. Para coleções alteradas, consultar rotas CRUD; para conflitos, usar cenário HTTP configurável/sobrescrita separado da coleção CRUD, conforme documentação (os status da CRUD são automáticos). Não é preciso programar servidor. O README deve identificar origem, versão da ferramenta, rotas e formato dos dados.', 'Sem backend próprio obrigatório, SQL, ORM, Docker, autenticação, pagamentos ou segredos no cliente.', 'Requisitos não funcionais: teclado e foco visível; reflow de 320 a 1440 px; nenhuma perda silenciosa de dados ao falhar; erros úteis sem dados pessoais reais.'],
    io: ['Entradas: busca, recurso, nome fictício, data/horário e respostas de catálogo/reserva.', 'Saídas: catálogo recebido, confirmação somente após sucesso HTTP ou feedback recuperável.', 'Contrato mínimo a documentar: GET de recursos com id/nome e POST de reserva com recurso/nome/data/horário; sucesso 2xx com identificação, conflito 409 e falha inesperada. Caminhos e formato exato são escolhas declaradas do seu mock.'],
    acceptanceCriteria: ['Um usuário opera consulta e reserva somente com teclado.', 'A lista vem da resposta recebida e dados inválidos não são tratados como válidos.', 'Loading, vazio, falha HTTP, falha de rede, conflito e sucesso têm evidências separadas.', 'A reserva só é confirmada após resposta bem-sucedida; envio repetido é controlado.', 'Favoritos/preferências sobrevivem à recarga e armazenamento inválido tem recuperação.', 'Layout funciona em 320 e 1440 px, sem esconder controles.', 'README permite reproduzir a API/mock, executar o cliente e repetir os testes, explicitando o que depende do servidor.'],
    hints: ['Escolha o menor fluxo de consulta e reserva que resolva o problema.', 'Consulte WAI, Fetch e Narrowing. Registre primeiro as entradas e respostas do serviço escolhido.', 'Entregue uma fatia de interface e repita os cenários de erro antes de acrescentar favoritos. Não confirme estado que o serviço rejeitou.'],
    testIdeas: ['Catálogo vazio, payload inválido e rede indisponível.', 'Reserva válida, campos inválidos, duplo envio e conflito 409.', 'Recarga com preferências válidas e JSON corrompido.', 'Tab/Enter, foco, telas estreita/ampla e inspeção Network sem credenciais.'],
    refs: ['html', 'wai', 'grid', 'ts', 'strict', 'narrow', 'fetch', 'cors', 'local', 'network', 'mock', 'mock-responses', 'mock-crud', 'git-setup', 'git'], rubric,
    deliverables: ['Repositório ou código organizado e README de execução.', 'Contrato do serviço/mock e roteiro de testes com resultados reais.', 'Capturas ou anotações de teclado, responsividade, Network e falhas; limitações conhecidas.'],
};
export const milestones = ['1. Definir contrato e esboçar a interface acessível.', '2. Entregar catálogo, busca e estados com dados recebidos.', '3. Integrar reserva e recuperar falhas sem duplicar envio.', '4. Adicionar preferências, executar testes e documentar evidências.'];
export const projectExtras = ['Cancelar uma reserva com confirmação e falha recuperável.', 'Adicionar AbortController e demonstrar buscas concorrentes.', 'Revisitar a interface em React depois da versão em CSS/TypeScript.'];
export const books = [
    { id: 'book-ts', title: 'Aprendendo TypeScript', author: 'Josh Goldberg', edition: 'Número da edição não confirmado', year: '2022', language: 'Português (catálogo da edição brasileira)', level: 'Iniciante com base JavaScript', topics: ['ts-base', 'ts-tipos'], url: 'https://novatec.com.br/livros/aprendendo-typescript/', note: 'Apoio a tipos, funções, arrays e configuração. Publicação de 2022: conferir opções atuais na documentação. Catálogo e sumário consultados; texto integral não lido.', alternatives: ['ts', 'narrow', 'strict'] },
    { id: 'book-js', title: 'Lógica de Programação e Algoritmos com JavaScript', author: 'Edécio Fernando Iepsen', edition: '2ª edição', year: '2022', language: 'Português (catálogo da edição brasileira)', level: 'Iniciante', topics: ['ts-base', 'dom', 'seguranca'], url: 'https://novatec.com.br/livros/logica-programacao-algoritmos-com-javascript-2ed/', note: 'Selecionar funções, arrays, eventos, DOM e armazenamento. Não exigir leitura integral: capítulos de backend/banco ficam para depois. Catálogo/sumário consultados; não foi feita leitura integral.', alternatives: ['functions', 'dom', 'storage'] },
];
export const activityById = (id: string) => [...tasks, project].find(t => t.id === id);
export const topicName = (id: string) => topics.find(t => t.id === id)?.name ?? id;
