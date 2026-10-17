export type CycleInput={method:'GET'|'POST';path:string;body:string;fail:boolean};
export type CycleStep={name:string;detail:string;status?:number;body?:unknown};
export const initialCycle:CycleInput={method:'POST',path:'/books',body:'{"title":"Redes","author":"Ana"}',fail:false};
/** Authored conceptual model: never evaluates a student's source code or sends HTTP. */
export function requestCycle(input:CycleInput):CycleStep[]{
 const steps:CycleStep[]=[{name:'Servidor e entrada',detail:`Mensagem ${input.method} ${input.path} recebida no modelo. Um runtime real ainda não foi iniciado.`},{name:'Middleware de entrada',detail:'Verificar limite do corpo e atribuir identificador de requisição.'}];
 const end=(status:number,body:unknown,detail:string)=>[...steps,{name:'Resposta e middleware de saída',detail,status,body}];
 if(new TextEncoder().encode(input.body).length>1024)return end(413,{error:'Corpo acima do limite didático'},'Middleware encerrou antes do controller.');
 steps.push({name:'Roteador',detail:'Resolver método e caminho. Parâmetros pertencem à rota; query não é parte do nome da rota.'});
 const path=input.path.split('?')[0];
 if(!['/health','/books'].includes(path))return end(404,{error:'Rota ausente'},'O handler de livros não foi chamado.');
 if(input.method==='POST'&&path==='/health')return end(405,{error:'Método não permitido'},'Nesta rota somente GET. Um servidor real também informa Allow.');
 if(input.method==='POST'){
  steps.push({name:'Parsing e validação',detail:'Decodificar JSON e conferir campos antes de alterar o catálogo.'});
  let data:unknown;try{data=JSON.parse(input.body);}catch{return end(400,{error:'JSON malformado'},'A sintaxe falhou antes da regra de domínio.');}
  if(!data||typeof data!=='object'||Array.isArray(data)||!('title'in data)||!('author'in data)||typeof data.title!=='string'||typeof data.author!=='string'||!data.title.trim()||!data.author.trim())return end(422,{error:'Título e autor são obrigatórios'},'JSON válido não garante dados válidos.');
 }
 steps.push({name:'Controller e regra de aplicação',detail:'Coordena o caso de uso; não precisa criar Repository/Service que apenas repassem a mesma chamada.'});
 if(input.fail){steps.push({name:'Tratador de exceção e log',detail:'Registrar falha com identificador fictício; ocultar stack e dados privados na resposta pública.'});return end(500,{error:'Falha interna',requestId:'estudo-03'},'Exceção inesperada virou erro público genérico.');}
 return end(input.method==='POST'?201:200,input.method==='POST'?{id:1,title:JSON.parse(input.body).title,author:JSON.parse(input.body).author}:path==='/health'?{status:'ok'}:[], 'Serializar JSON; retornar pela cadeia de middleware. O modelo não mantém banco nem executa PHP.');
}
