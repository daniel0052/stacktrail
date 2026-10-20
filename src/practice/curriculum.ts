import {topics11,tasks11,projects11,project11Reservations,references11,books11} from './stage-eleven';
import {topics10,tasks10,projects10,project10Panel,references10,books10} from './stage-ten';
import {topics09,tasks09,projects09,project09Portfolio,references09,books09,type Simulation09} from './stage-nine';
import {topics08,tasks08,projects08,project08Delivery,references08,books08} from './stage-eight';
import {topics07,tasks07,projects07,project07Booking,references07,books07} from './stage-seven';
import {topics as topics01, tasks as tasks01, project as priorProject, references as refs01, books as books01, type Topic, type Task, type Reference} from './catalog';
import {topics00, tasks00, project00, references00, books00} from './stage-zero';
import {topics02, tasks02, projects02, project02DiagnosticLab, references02, books02} from './stage-two';
import {topics03, tasks03, projects03, project03FoundationsLab, references03, books03} from './stage-three';
import {topics04, tasks04, projects04, project04BookingApi, references04, books04} from './stage-four';
import {topics05, tasks05, projects05, project05Billing, references05, books05} from './stage-five';
import {topics06, tasks06, projects06, project06BugHunt, references06, books06} from './stage-six';
export type StageId='00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11';
export type TrackTag='comum'|'php'|'javascript'|'ambas';
export type StudyTopic=Topic&{stageId:StageId;competencies:string[];practiceCriteria:string[];track?:TrackTag};
export type Activity=Task&{stageId:StageId;kind:'exercise'|'project';competencies:string[];track?:TrackTag;sector?:string;context?:string;problem?:string;nonfunctional?:string[];milestones?:string[];extras?:string[];portfolio?:string[];simulation?:Simulation09};
export const matchesTrack=(itemTrack:TrackTag|undefined,selected:'php'|'javascript'|'comum'|'todos')=>{
 if(!itemTrack||selected==='todos')return true;
 if(selected==='comum')return itemTrack==='comum'||itemTrack==='ambas';
 if(itemTrack==='comum'||itemTrack==='ambas')return true;
 return itemTrack===selected;
};
export const portfolioGuide=['Organizar diagramas ou fontes, testes de mesa/casos e decisões em pastas identificáveis.','README: problema, objetivo, etapa/nível, competências e requisitos atendidos.','Incluir instruções de reprodução/execução quando aplicável; anotar ferramenta e versão.','Acrescentar capturas ou demonstração do fluxo, sem dados pessoais ou segredos.','Registrar decisões, limitações, casos testados com resultados reais e próximos passos.','Publicar no GitHub é escolha do estudante; o StackTrail não cria repositórios nem envia arquivos.'];
const extraReferences:Reference[]=[
 {id:'files',title:'MDN · Lidando com arquivos',url:'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files',language:'PT-BR',type:'Guia oficial',cost:'Gratuito',section:'Estrutura e caminhos relativos',version:'Web; recorte de arquivos',note:'Consultados estrutura/caminhos; sugestões antigas sobre sistemas/nomes não são normas universais.',checked:'2026-10-17',adequacy:'2026-10-17'},
 {id:'json',title:'MDN · Working with JSON',url:'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON',language:'Inglês',type:'Guia oficial',cost:'Gratuito',section:'Dados JSON, parsing e serialização',version:'JavaScript/Web',note:'Fonte EN confirmada; conferir dados em runtime também em TS.',checked:'2026-10-17',adequacy:'2026-10-17'},
 {id:'generics',title:'TypeScript · Generics',url:'https://www.typescriptlang.org/docs/handbook/2/generics.html',language:'Inglês',type:'Documentação oficial',cost:'Gratuito',section:'Funções e restrições genéricas básicas',version:'Handbook corrente',note:'Selecionar o introdutório; recursos avançados não bloqueiam a01.',checked:'2026-10-17',adequacy:'2026-10-17'},
 {id:'utilities',title:'TypeScript · Utility Types',url:'https://www.typescriptlang.org/docs/handbook/utility-types.html',language:'Inglês',type:'Documentação oficial',cost:'Gratuito',section:'Partial, Pick, Omit e Record',version:'Handbook corrente',note:'Consultar compatibilidade da versão do compilador usada.',checked:'2026-10-17',adequacy:'2026-10-17'},
];
const sourceTopic=(id:string,name:string,goal:string,before:string[],refs:string[],exerciseIds:string[]):Topic=>({id,name,goal,before,refs,exerciseIds,optional:false});
const files=sourceTopic('arquivos','Arquivos e organização frontend','Preparar uma estrutura de arquivos com caminhos e instruções reproduzíveis.',['Criar e localizar arquivos no computador.'],['files','setup','compiler','git-setup'],['ex-01','ex-03']);
const modules=sourceTopic('modulos','Módulos e organização','Separar funções de domínio, acesso a dados e apresentação em módulos.',['ts-tipos'],['modules','files'],['ex-03','ex-06']);
const json=sourceTopic('json','JSON e contratos de dados','Serializar dados e validar conteúdo recebido antes de usar no programa.',['ts-tipos'],['json','narrow','formdata'],['ex-02','ex-04']);
const expanded01=[files,...topics01.slice(0,4),modules,json,...topics01.slice(4)].map(t=>({...t,before:t.id==='html'?['arquivos']:t.before,refs:t.id==='ts-tipos'?[...t.refs,'generics','utilities']:t.refs}));
export const activities:Activity[]=[...tasks00,...tasks01.map(t=>({...t,stageId:'01' as const,kind:'exercise' as const,competencies:t.objectives})),...tasks02,...tasks03,...tasks04,...tasks05,...tasks06,...tasks07,...tasks08,...tasks09,...tasks10,...tasks11];
const criteria01:Record<string,string[]>={"arquivos": ["Reproduzir a estrutura e abrir a interface seguindo o README; conferir caminhos relativos sem arquivos ausentes."], "html": ["Usar elementos semânticos, rótulos associados e validação compreensível; demonstrar envio por teclado."], "css": ["Demonstrar cascata e modelo de caixa em um ajuste justificado.", "Conferir formulário e lista em telas estreitas/amplas e texto ampliado, sem perda de controles."], "ts-base": ["Representar regras com condições, funções, arrays e objetos tipados; testar fronteiras e entrada vazia."], "ts-tipos": ["Compilar com strict e validar unknown antes de acessar dados; demonstrar rejeição de formato inesperado."], "modulos": ["Separar domínio, acesso a dados e apresentação com imports/exports explícitos; reproduzir a compilação e explicar dependências."], "json": ["Serializar e interpretar JSON distinguindo texto e objeto.", "Demonstrar tratamento de JSON malformado e de JSON válido com formato inesperado."], "dom": ["Associar eventos sem duplicar manipuladores; atualizar conteúdo e feedback acessível e testar teclado."], "async": ["Demonstrar estados de espera, sucesso e falha de uma operação assíncrona; impedir feedback antigo contraditório."], "http": ["Inspecionar método, URL codificada, headers e corpo no Network; distinguir erro HTTP, rede e restrição CORS."], "seguranca": ["Restaurar preferências com validação e recuperação de dados inválidos; explicar limites de cookies/storage e validação no cliente sem guardar segredos."], "tailwind": ["Comparar a mesma interface em CSS puro e Tailwind, preservando teclado, foco e reflow."], "react": ["Demonstrar componentes e estado com o mesmo roteiro de sucesso e erro da interface anterior."], "next": ["Identificar fronteiras cliente/servidor e testar a extensão com a versão documentada, sem exigir backend próprio."]};
export const topics:StudyTopic[]=[...topics00,...expanded01.map(t=>({...t,stageId:'01' as const,competencies:[t.goal],practiceCriteria:criteria01[t.id]})),...topics02,...topics03,...topics04,...topics05,...topics06,...topics07,...topics08,...topics09,...topics10,...topics11];
export const references=[...refs01,...extraReferences,...references00,...references02,...references03,...references04,...references05,...references06,...references07,...references08,...references09,...references10,...references11];
export type Book={id:string;cost?:'Gratuito'|'Pago';checked?:string;title:string;author:string;edition:string;year:string;language:string;level:string;topics:string[];url:string;note:string;alternatives:string[];stages:StageId[];track?:TrackTag;reason:string;community:string;communitySources?:string[];cover:{kind:'image'|'placeholder';src?:string;alt?:string;width?:number;height?:number;origin:string;usage:string;licenseUrl?:string;attributionUrl?:string}};
export const books:Book[]=[...books01.map(b=>({...b,stages:(b.id==='book-ts'?['01','03','04']:['01']) as StageId[],...(b.id==='book-ts'?{track:'javascript' as const,topics:[...b.topics,'03-ts-fundamentos-backend','03-ts-assincrono','03-ts-configuracao','04-express-recursos-crud','04-express-zod-serializacao']}:{}),reason:b.id==='book-ts'?'Apoio à tipagem estática e à modelagem de contratos tanto no frontend (Etapa 01) quanto na trilha TypeScript + Node.js + Express (Etapas 03 e 04).':'Apoio selecionado à lógica, funções e DOM, sem antecipar backend.',community:'Seleção por adequação ao currículo; não alegamos consenso da comunidade.',cover:b.id==='book-ts'?{kind:'image' as const,src:'covers/aprendendo-typescript.webp',alt:'Capa do livro Aprendendo TypeScript, de Josh Goldberg (Novatec Editora)',width:292,height:398,origin:'Catálogo oficial da Novatec Editora (ISBN 978-65-86057-99-7, capa ampliada s3.novatec.com.br).',usage:'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra.'}:{kind:'image' as const,src:'covers/logica-programacao-javascript-2ed.webp',alt:'Capa do livro Lógica de Programação e Algoritmos com JavaScript — 2ª Edição, de Edécio Fernando Iepsen (Novatec Editora)',width:292,height:419,origin:'Catálogo oficial da Novatec Editora (ISBN 978-65-86057-90-4, capa ampliada s3.novatec.com.br).',usage:'Asset estático otimizado em WebP para identificação bibliográfica da 2ª edição, sem links de compra.'}})),...books00,...books02,...books03,...books04,...books05,...books06,...books07,...books08,...books09,...books10,...books11];
export const project01:Activity={
 id:'01-project-books',slug:'catalogo-livros',title:'Catálogo de livros responsivo',level:'intermediario',optional:true,stageId:'01',kind:'project',topicIds:expanded01.filter(t=>!t.optional).map(t=>t.id),competencies:['Organização de arquivos e módulos','HTML semântico e navegação por teclado','CSS responsivo','TypeScript, DOM e eventos','Consumo de JSON/HTTP e estados'],
 context:'Uma biblioteca comunitária precisa apresentar seu acervo e ajudar leitores a encontrar títulos.',problem:'A consulta em planilhas não oferece busca acessível, filtros ou indicação clara de indisponibilidade do serviço.',
 statement:'Construa um catálogo web de livros com busca combinada a filtros. Entregue primeiro uma interface pequena completa e depois integre uma API pública autorizada ou mock externo. Documente os marcos, decisões e limites; não construa um backend nesta etapa.',
 objectives:['Demonstrar uma interface acessível e responsiva que consome e valida dados recebidos.'],prerequisites:['Formulário, layout CSS, tipos e módulos, DOM/eventos, JSON e fetch.','Pelo menos um exercício intermediário integrado ou evidências equivalentes.'],
 requirements:['Exibir livros com identificador, título, autor e categoria obtidos da resposta HTTP.','Combinar busca por título/autor e filtro por categoria, com resultado vazio compreensível.','Tratar carregamento, sucesso, erro HTTP, falha de rede, JSON inválido e nova tentativa.','Permitir favoritos locais com validação dos dados recuperados.','Organizar arquivos e módulos e publicar instruções reproduzíveis no README.'],
 nonfunctional:['Operação por teclado com foco visível, rótulos e feedback acessível.','Layout verificável de320 a1440px e texto ampliado.','Dados fictícios/públicos autorizados; nenhum segredo no cliente.'],
 constraints:['HTML, CSS puro e TypeScript strict no núcleo. React, Next e Tailwind são extensões opcionais.','API autorizada ou mock externo configurado por interface; sem backend próprio, autenticação, banco ou Docker obrigatórios.','Não usar dados fixos para encobrir falha da API. O marco local inicial não substitui a integração final.'],
 io:['Entrada: consulta, categoria e resposta JSON com id/título/autor/categoria, em formato documentado pelo estudante.','Saída: catálogo filtrado ou feedback de estado; favoritos restaurados após recarga.'],
 acceptanceCriteria:['Catálogo vem da resposta recebida e valida seu formato antes de renderizar.','Busca e categoria funcionam juntas, inclusive sem resultados.','Loading, erro HTTP, rede indisponível, JSON inválido e retry têm evidências reais separadas.','Teclado e reflow são demonstrados, sem perda de controles.','Favoritos persistem e armazenamento inválido tem recuperação.','README documenta contrato, ambiente, execução, decisões, testes e limitações.'],
 hints:['Defina o menor percurso de consulta que resolva o problema da biblioteca.','Consulte MDN de arquivos, WAI, JSON e Fetch; identifique o contrato da origem escolhida.','Separe critérios de consulta dos dados recebidos e compare o fluxo bem-sucedido aos cenários de falha.'],
 testIdeas:['Termo existente com categoria incompatível.','Resposta vazia, demora,404/500, JSON malformado e formato válido inesperado.','Recarga com favoritos e dados locais corrompidos.','Tab/Enter e larguras320/1440px.'],
 refs:['files','modules','html','wai','grid','ts','narrow','json','fetch','network','local','mock','mock-responses','git-setup','git'],rubric:priorProject.rubric,deliverables:['Repositório/código com README e contrato da origem.','Capturas da interface e Network sem dados sensíveis.','Roteiro com resultados reais de testes, decisões e limitações.'],
 milestones:['Definir o contrato e preparar arquivos/README.','Concluir um catálogo local acessível com busca/filtros.','Integrar dados HTTP, validar respostas e recuperar falhas.','Adicionar favoritos e reunir evidências de teclado/reflow/testes.'],extras:['Adicionar paginação e conferir mudança de busca na última página.','Comparar versão CSS puro com Tailwind.','Revisitar componentes com React depois de concluir o núcleo.'],portfolio:portfolioGuide,
};
export const priorPortfolio:Activity={...priorProject,stageId:'01',kind:'project',level:'avancado',optional:true,competencies:priorProject.objectives,context:'Associação com salas e equipamentos compartilhados.',problem:'Solicitações de reserva precisam de feedback consistente.',nonfunctional:['Teclado, reflow e recuperação de falhas.'],milestones:['Definir contrato.','Integrar consulta/reserva.','Testar falhas e documentar.'],extras:['Cancelamento com confirmação.'],portfolio:portfolioGuide};
export const projects:Activity[]=[{...project00,portfolio:portfolioGuide},project01,priorPortfolio,...projects02.map(p=>({...p,portfolio:portfolioGuide})),...projects03.map(p=>({...p,portfolio:portfolioGuide})),...projects04.map(p=>({...p,portfolio:portfolioGuide})),...projects05.map(p=>({...p,portfolio:portfolioGuide})),...projects06.map(p=>({...p,portfolio:portfolioGuide})),...projects07.map(p=>({...p,portfolio:portfolioGuide})),...projects08.map(p=>({...p,portfolio:portfolioGuide})),...projects09,...projects10,...projects11];
export const allActivities=[...activities,...projects];
export const activityById=(id:string)=>allActivities.find(a=>a.id===id);
export const topicName=(id:string)=>topics.find(t=>t.id===id)?.name??id;
export const getStage=(id:string,track?:'php'|'javascript'|'comum'|'todos')=>{
 if(id!=='00'&&id!=='01'&&id!=='02'&&id!=='03'&&id!=='04'&&id!=='05'&&id!=='06'&&id!=='07'&&id!=='08'&&id!=='09'&&id!=='10'&&id!=='11')return undefined;
 const stageId=id as StageId;
 const stageTopics=topics.filter(t=>t.stageId===id&&(!track||matchesTrack(t.track,track)));
 const stageExercises=activities.filter(a=>a.stageId===id&&(!track||matchesTrack(a.track,track)));
 const stageTitles: Record<StageId, string> = {
 '11':'Arquitetura Backend e Design de Software',
 '10':'Frontend Moderno e Integração Full Stack',
  '09': 'Consolidação profissional e avaliação final Júnior',
  '00': 'Pensamento computacional',
  '01': 'Fundamentos de Frontend',
  '02': 'Web, HTTP, redes, Git e ferramentas',
  '03': 'Fundamentos de Backend: PHP/Laravel ou TypeScript/Node.js/Express',
  '04': 'APIs REST e Regras de Negócio',
  '05': 'SQL, PostgreSQL e persistência',
  '06': 'Testes automatizados e depuração',
  '08': 'Docker, CI/CD, deploy e fundamentos de Kubernetes',
  '07': 'Segurança, autenticação e autorização',
 };
 const stageGoals: Record<StageId, string> = {
 '11':'Projetar, organizar, evoluir e refatorar backend com responsabilidades claras, regras protegidas, testes e decisões justificadas.',
 '10':'Construir interfaces React/TypeScript integradas à única API escolhida e aplicar Next.js em um recorte, iniciando a formação Pleno.',
 '09':'Demonstrar autonomia com simulações originais, projeto profissional e uma prova final integrada, em uma única stack.',
  '08': 'Preparar, containerizar, verificar e entregar uma API, operando Kubernetes local com KinD na única trilha escolhida.',
  '07': 'Autenticar usuários, controlar acesso a recursos e demonstrar proteções por testes na única stack escolhida, sem declarar segurança universal.',
  '00': 'Planejar, representar e testar algoritmos sem depender de uma linguagem.',
  '01': 'Construir uma interface acessível e responsiva que se comunica com uma API.',
  '02': 'Compreender o percurso completo de uma requisição web, inspecionar e especificar contratos HTTP com ferramentas reais e colaborar com Git e GitHub.',
  '03': 'Construir, organizar, validar e testar sua primeira API HTTP funcional na trilha escolhida (PHP + Laravel ou TypeScript + Node.js + Express).',
  '04': 'Projetar e implementar APIs RESTful com regras de negócio reais, paginação/filtros seguros, erros padronizados (RFC 9457), idempotência e especificação OpenAPI 3.1 na trilha escolhida.',
  '05': 'Modelar dados, escrever SQL e integrar PostgreSQL à API com integridade, transações e evidências na única trilha escolhida.',
  '06': 'Dominar testes unitários, testes HTTP de contratos, testes de integração com PostgreSQL, mocks e stubs para falhas externas, depuração sistemática com stack traces e testes de regressão na trilha escolhida.',
 };
 const stagePrereqs: Record<StageId, string[]> = {
 '11':['OO, APIs REST, Laravel ou Express, SQL/PostgreSQL, autorização, testes, Git e Docker básico recomendados.','Pré-requisitos orientam revisão; não bloqueiam acesso.'],
 '10':['Competências00–09: HTML/CSS/TS,HTTP,API,PostgreSQL,testes,segurança e entrega.','API Laravel ou Express própria, ou base mínima alternativa; React anterior não é pré-requisito obrigatório.'],
 '09':['Evidências das competências00–08: lógica, HTTP/Git, API, SQL, testes, segurança e entrega.','Escolher Laravel ou Express e revisar lacunas antes das simulações.'],
  '08': ['Etapas02–07: terminal/Git, API funcional, PostgreSQL, testes e segurança básica.', 'Demonstrar execução da API e testes em uma stack; SO/provider e recursos locais verificados, com alternativa de análise quando necessário.'],
  '07': ['Etapa02: HTTP, cookies, headers e ferramentas.', 'Etapas03–04: framework, API e regras de negócio na stack escolhida.', 'Etapa05: PostgreSQL e persistência; Etapa06: testes automatizados isolados.'],
  '00': ['Ler um enunciado e registrar ideias em texto ou desenho.'],
  '01': ['Decompor um problema, reconhecer condições e repetições; criar/localizar arquivos.'],
  '02': ['Pensamento computacional básico e organização de arquivos.', 'Fundamentos de HTML, JavaScript e familiaridade introdutória com JSON.'],
  '03': ['Etapa 00: pensamento computacional.', 'Etapa 01: fundamentos de frontend e JSON.', 'Etapa 02: HTTP, redes, Git e ferramentas de inspeção.'],
  '04': ['Etapa 02: semântica HTTP, métodos, status e contratos REST.', 'Etapa 03: servidor HTTP, rotas, validação e testes na trilha escolhida (PHP/Laravel ou TS/Node/Express).'],
  '05': ['Etapas 02–04: HTTP, Git, APIs, validação, regras de negócio e testes básicos.', 'Demonstrar API funcional na trilha PHP/Laravel ou TypeScript/Node/Express.'],
  '06': ['Etapa 02: métodos, status HTTP e cURL.', 'Etapa 03: servidores HTTP, rotas, validação e tratamento de erros.', 'Etapa 04: contratos REST, regras de negócio e validação vs conflito (422 vs 409).', 'Etapa 05: modelagem relacional, constraints e transações no PostgreSQL.'],
 };
 const stageMainProjects: Record<StageId, Activity> = {
 '11':project11Reservations,
 '10':project10Panel,
 '09':project09Portfolio,
  '08': {...project08Delivery,portfolio:portfolioGuide},
  '00': projects[0],
  '01': project01,
  '02': {...project02DiagnosticLab, portfolio: portfolioGuide},
  '03': {...project03FoundationsLab, portfolio: portfolioGuide},
  '04': {...project04BookingApi, portfolio: portfolioGuide},
  '05': {...project05Billing, portfolio: portfolioGuide},
  '06': {...project06BugHunt, portfolio: portfolioGuide},
  '07': {...project07Booking, portfolio: portfolioGuide},
 };
 return {
  id:stageId,
  title:stageTitles[stageId],
  goal:stageGoals[stageId],
  prerequisites:stagePrereqs[stageId],
  topics:stageTopics,
  exercises:stageExercises,
  project:stageMainProjects[stageId],
 };
};

export const topicIdsForTrack=(task:Activity,track:'php'|'javascript')=>task.stageId==='05'||task.stageId==='06'||task.stageId==='07'||task.stageId==='08'||task.stageId==='10'||task.stageId==='11'?task.topicIds.filter(id=>matchesTrack(topics.find(t=>t.id===id)?.track,track)):task.topicIds;

// Stable criterion indexes; resolve only the runtime prose for the chosen stack.
export function activityForTrack(task:Activity,track:'php'|'javascript'):Activity{
 if(task.stageId==='11'){
 const architecture=track==='php'?'Laravel nativo: Controllers,Form Requests,Models,Policies,container e Actions/Jobs/Events quando houver responsabilidade real,sem Repository obrigatório':'Express/TypeScript: Router,controllers,validação,middleware e funções/classes de casos de uso,domínio e persistência explícita,sem copiar Laravel';
 const transaction=track==='php'?'Laravel DB::transaction com todas as escritas na mesma conexão;retries de deadlock não podem repetir efeitos externos inadvertidamente':'Knex+pg com trx em todas as escritas ou mesmo client pg da base;Express não fornece transação própria e pool.query não compõe transação multicomando';
 const resolve=(items:string[])=>items.map(x=>x.replaceAll('[architecture11]',architecture).replaceAll('[transaction11]',transaction));
 return {...task,requirements:resolve(task.requirements),acceptanceCriteria:resolve(task.acceptanceCriteria),competencies:resolve(task.competencies),refs:task.refs.filter(id=>track==='php'?!['11-express','11-knex','11-pg'].includes(id):!id.startsWith('11-laravel-'))};
 }
 if(task.stageId==='10'){
 const backend=track==='php'?'PHP + Laravel':'TypeScript + Node.js + Express';
 const security=track==='php'?'sessão first-party Laravel; Sanctum SPA apenas sob mesmo domínio raiz, com bootstrapCSRF e cabeçalho X-XSRF-TOKEN adequados ao Fetch, credenciais e domínios/origens explicitamente configurados':'sessão Express com cookie de ID, store apropriado ao ambiente (MemoryStore só desenvolvimento), defesaCSRF e origem explícita para credenciais';
 const resolve=(items:string[])=>items.map(x=>x.replaceAll('[backend10]',backend).replaceAll('[security10]',security));
 return {...task,requirements:resolve(task.requirements),acceptanceCriteria:resolve(task.acceptanceCriteria),competencies:resolve(task.competencies),refs:task.refs.filter(id=>track==='php'?id!=='10-session':id!=='10-sanctum')};
 }
 if(task.stageId!=='08')return task;
 const runtime=track==='php'?'Laravel com runtime suportado de produção (ex.: Nginx + PHP-FPM), document root public e permissões mínimas; não usar artisan serve como produção':'TypeScript compilado por tsc; Node executa artefatos JavaScript de produção, sem watcher, com término gracioso e scripts documentados';
 const resolve=(items:string[])=>items.map(x=>x.replaceAll('[runtime08]',runtime));
 return {...task,requirements:resolve(task.requirements),acceptanceCriteria:resolve(task.acceptanceCriteria),competencies:resolve(task.competencies)};
}
