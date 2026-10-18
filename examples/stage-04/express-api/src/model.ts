/** Deterministic teaching model. Never executes PHP/Node or student code. */
export type Book={id:number;title:string;category:string;note:string|null};
export type Booking={id:number;name:string;slot:string;status:'active'|'cancelled'};
export type RestState={books:Book[];bookings:Booking[];nextBook:number;nextBooking:number};
export type RestReply={status:number;headers:Record<string,string>;body:unknown;explanation:string};
export const slots=['2030-06-10T10:00:00Z','2030-06-10T11:00:00Z','2030-06-10T12:00:00Z'];
export const modelNow='2030-06-01T00:00:00Z';
export const initialRestState=():RestState=>({books:[{id:1,title:'Redes abertas',category:'backend',note:null},{id:2,title:'Algoritmos acessíveis',category:'base',note:null},{id:3,title:'Laravel e contratos',category:'backend',note:null}],bookings:[],nextBook:4,nextBooking:1});
export class ContractError extends Error {constructor(public status:number,message:string){super(message);}}
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export function bookingInput(v:unknown,now=modelNow):{name:string;slot:string}{
 if(!object(v)||Object.keys(v).some(k=>!['name','slot'].includes(k))||typeof v.name!=='string'||!v.name.trim()||Array.from(v.name.trim()).length>80||typeof v.slot!=='string')throw new ContractError(422,'Envie somente name (1–80 caracteres) e slot UTC permitido.');
 if(!slots.includes(v.slot)||Date.parse(v.slot)<=Date.parse(now))throw new ContractError(422,'Horário deve ser futuro e pertencer à agenda publicada.');
 return {name:v.name.trim(),slot:v.slot};
}
export function bookInput(v:unknown,partial=false):Partial<Omit<Book,'id'>>{
 if(!object(v)||!Object.keys(v).length||Object.keys(v).some(k=>!['title','category','note'].includes(k)))throw new ContractError(422,'Campos permitidos: title, category e note.');
 for(const field of ['title','category'] as const)if((!partial||field in v)&&(typeof v[field]!=='string'||!(v[field] as string).trim()||Array.from((v[field] as string).trim()).length>120))throw new ContractError(422,`${field}: string de 1–120 caracteres.`);
 if('note'in v&&v.note!==null&&(typeof v.note!=='string'||Array.from(v.note).length>200))throw new ContractError(422,'note deve ser string até200 caracteres ou null.');
 return Object.fromEntries(Object.entries(v).map(([k,value])=>[k,typeof value==='string'?value.trim():value]));
}
export function collection<T extends {id:number}>(items:T[],query:URLSearchParams,sorts:(keyof T & string)[],search:(x:T,q:string)=>boolean,filter:(x:T,k:string,v:string)=>boolean){
 const allowed=['page','per_page','search','sort',sorts.includes('category' as keyof T & string)?'category':'status'];
 for(const key of query.keys())if(!allowed.includes(key)||query.getAll(key).length!==1)throw new ContractError(422,'Parâmetro desconhecido ou repetido.');
 const integer=(key:string,fallback:number,max:number)=>{const s=query.get(key)??String(fallback);if(!/^[1-9]\d*$/.test(s)||Number(s)>max)throw new ContractError(422,`${key}: inteiro entre1 e${max}.`);return Number(s);};
 const page=integer('page',1,10000),per_page=integer('per_page',10,100);
 const raw=query.get('sort')??sorts[0],descending=raw.startsWith('-'),key=(descending?raw.slice(1):raw) as keyof T & string;
 if(!sorts.includes(key))throw new ContractError(422,'Campo de ordenação não permitido.');
 const q=(query.get('search')??'').toLocaleLowerCase();
 const filtered=items.filter(x=>search(x,q)&&['category','status'].every(k=>!query.has(k)||filter(x,k,query.get(k)!)));
 const ordered=[...filtered].sort((a,b)=>{const av=a[key],bv=b[key];const c=typeof av==='number'&&typeof bv==='number'?av-bv:String(av).localeCompare(String(bv),'pt-BR');return (descending?-c:c)||a.id-b.id;});
 return {data:ordered.slice((page-1)*per_page,page*per_page),meta:{page,per_page,total:ordered.length}};
}
export function simulateRest(state:RestState,request:{method:string;path:string;headers:string;body:string}):{state:RestState;reply:RestReply}{
 const next=structuredClone(state);const method=request.method.toUpperCase();
 const reply=(status:number,body:unknown,explanation:string,headers:Record<string,string>={})=>({state:next,reply:{status,body,headers:{...(status===204?{}:{'Content-Type':'application/json'}),...headers},explanation}});
 try{
  const url=new URL(request.path,'https://simulation.invalid');if(url.origin!=='https://simulation.invalid')throw new ContractError(400,'Use caminho local /api/v1/...; não há chamada de rede.');
  const headerLines=request.headers.split('\n').filter(Boolean);const headers:Record<string,string>={};for(const line of headerLines){const pos=line.indexOf(':');if(pos<1)throw new ContractError(400,'Header deve ter nome: valor.');headers[line.slice(0,pos).trim().toLowerCase()]=line.slice(pos+1).trim();}
  let input:unknown;if(['POST','PUT','PATCH'].includes(method)){
   if((headers['content-type']??'').split(';')[0].trim().toLowerCase()!=='application/json')throw new ContractError(415,'Envie Content-Type: application/json.');
   try{input=JSON.parse(request.body);}catch{throw new ContractError(400,'JSON malformado.');}
  }
  const match=url.pathname.match(/^\/api\/v1\/(books|bookings|slots)(?:\/([1-9]\d*))?$/);if(!match)throw new ContractError(404,'Rota não encontrada.');
  const resource=match[1],id=match[2]?Number(match[2]):undefined;
  const allowed=resource==='slots'?['GET']:id===undefined?['GET','POST']:resource==='books'?['GET','PATCH','PUT','DELETE']:['GET','DELETE'];
  if(!allowed.includes(method))return reply(405,{message:'Método não permitido.'},'Método não suportado para esta URI.',{Allow:allowed.join(', ')});
  if(resource==='slots'&&id!==undefined)throw new ContractError(404,'Rota não encontrada.');
  if(resource==='slots')return reply(200,{data:slots.filter(slot=>!next.bookings.some(b=>b.slot===slot&&b.status==='active'))},'Agenda fixa do modelo; relógio de referência explícito.');
  if(resource==='books'){
   if(method==='GET'&&id===undefined)return reply(200,collection(next.books.map(b=>({id:b.id,title:b.title,category:b.category,note:b.note})),url.searchParams,['title','id','category'],(x,q)=>x.title.toLocaleLowerCase().includes(q),(x,k,v)=>k==='category'&&x.category===v),'Filtrar→ordenar com desempate→paginar; coleção vazia continua200.');
   if(method==='POST'){const value=bookInput(input);const book={id:next.nextBook++,...value,note:value.note??null} as Book;next.books.push(book);return reply(201,{data:{id:book.id,title:book.title,category:book.category,note:book.note}},'Recurso criado; Location identifica sua URI.',{Location:`/api/v1/books/${book.id}`});}
   const book=next.books.find(x=>x.id===id);if(!book)throw new ContractError(404,'Livro não encontrado.');
   if(method==='GET')return reply(200,{data:{id:book.id,title:book.title,category:book.category,note:book.note}},'Representação pública do recurso.');
   if(method==='DELETE'){next.books=next.books.filter(x=>x.id!==id);return reply(204,null,'Sem corpo; repetir pode retornar404 sem alterar o efeito final.');}
   const value=bookInput(input,method==='PATCH');Object.assign(book,value);if(method==='PUT'&&!('note'in value))book.note=null;return reply(200,{data:{id:book.id,title:book.title,category:book.category,note:book.note}},'Validação antes da mutação; PATCH preserva campos ausentes.');
  }
  if(method==='GET'&&id===undefined)return reply(200,collection(next.bookings,url.searchParams,['slot','id','name'],(x,q)=>x.name.toLocaleLowerCase().includes(q),(x,k,v)=>k==='status'&&x.status===v),'Reservas com paginação e filtro de estado.');
  if(method==='POST'){const value=bookingInput(input);if(next.bookings.some(b=>b.status==='active'&&b.slot===value.slot))throw new ContractError(409,'Horário já reservado.');const booking:Booking={id:next.nextBooking++,...value,status:'active'};next.bookings.push(booking);return reply(201,{data:booking},'Conflito sequencial no modelo; não coordena processos.',{Location:`/api/v1/bookings/${booking.id}`});}
  const booking=next.bookings.find(x=>x.id===id);if(!booking)throw new ContractError(404,'Agendamento não encontrado.');
  if(method==='GET')return reply(200,{data:booking},'Estado atual, incluindo cancelamento.');
  booking.status='cancelled';return reply(204,null,'Cancelamento preserva histórico e libera o horário; repetição tem mesmo efeito.');
 }catch(e){const error=e instanceof ContractError?e:new ContractError(500,'Falha interna.');return {state,reply:{status:error.status,headers:{'Content-Type':'application/problem+json'},body:{type:'about:blank',title:({400:'Bad Request',404:'Not Found',409:'Conflict',415:'Unsupported Media Type',422:'Unprocessable Content',500:'Internal Server Error'} as Record<number,string>)[error.status],status:error.status,detail:error.message},explanation:'Erro não altera estado. Este é um modelo didático local, não backend real.'}};}
}
