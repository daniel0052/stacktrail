export const methods = ['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'] as const;
export type Method = typeof methods[number];
export const scenarios = ['normal','401','403','404','409','429','500','502','503','redirect','dns','tls','timeout','cors'] as const;
export type HttpScenario = typeof scenarios[number];
export type Book = { id: number; title: string; author: string };
export type HttpState = { books: Book[]; nextId: number; revision: number; session: boolean };
export type HttpRequest = { method: Method; endpoint: string; headers: string; body: string; scenario: HttpScenario };
export type HttpResult = { kind: 'http' | 'network' | 'blocked'; status?: number; headers: Record<string,string>; body: unknown; trace: string[]; explanation: string };
export const initialHttpState = (): HttpState => ({ books:[{id:1,title:'Redes em prática',author:'Ana'},{id:2,title:'HTTP sem mistério',author:'Bia'}],nextId:3,revision:1,session:false });
export const initialRequest = (): HttpRequest => ({method:'GET',endpoint:'/books',headers:'Accept: application/json',body:'',scenario:'normal'});
export function readHeaders(raw: string): Record<string,string> {
  if(raw.length>10000) throw new Error('Use até 10 mil caracteres em headers.');
  return Object.fromEntries(raw.split('\n').filter(line=>line.trim()).map(line=>{
    const colon=line.indexOf(':');if(colon<1||!/^[A-Za-z0-9-]+$/.test(line.slice(0,colon)))throw new Error('Header inválido. Use Nome: valor, um por linha.');
    return [line.slice(0,colon).trim().toLowerCase(),line.slice(colon+1).trim()];
  }));
}
export function simulateHttp(state: HttpState, request: HttpRequest): { state: HttpState; result: HttpResult } {
  const next:HttpState={...state,books:state.books.map(b=>({...b}))};
  const trace:string[]=['Preparar URL, método, headers e corpo (modelo local).'];
  const fail=(kind:'network'|'blocked',explanation:string)=>({state:next,result:{kind,headers:{},body:null,trace:[...trace,explanation],explanation}});
  const respond=(status:number,body:unknown=null,headers:Record<string,string>={})=>({state:next,result:{kind:'http' as const,status,headers:{...(body!==null&&status!==204&&status!==304?{'Content-Type':'application/json'}:{}),...headers},body:request.method==='HEAD'||status===204||status===304?null:body,trace:[...trace,`Resposta HTTP ${status}.`],explanation:status===204?'Operação atendida sem corpo.':status===304?'Representação não mudou; reutilize o corpo em cache.':`Resposta HTTP recebida: ${status}. Não é uma falha de conexão.`}});
  let url:URL;let h:Record<string,string>;
  try{url=new URL(request.endpoint,'https://api.example');h=readHeaders(request.headers);}catch(e){return respond(400,{error:e instanceof Error?e.message:'URL inválida'});}
  if(!['http:','https:'].includes(url.protocol))return respond(400,{error:'Somente HTTP/HTTPS no modelo.'});
  trace.push(`Host ${url.hostname}; porta ${url.port|| (url.protocol==='https:'?'443':'80')}; path ${url.pathname}; query ${url.search||'(sem query)'}. Fragmento não é enviado.`);
  if(request.scenario==='dns')return fail('network','Falha DNS: não foi estabelecida conexão HTTP com o destino.');
  trace.push('Conexão estabelecida no modelo.');
  if(request.scenario==='tls')return fail('network','Falha TLS: identidade/certificado não validado; não há resposta HTTP da aplicação.');
  trace.push(url.protocol==='https:'?'Canal protegido validado no cenário HTTPS conceitual.':'HTTP sem TLS neste endereço; não há criptografia de transporte no modelo.');
  if(request.scenario==='timeout')return fail('network','Prazo excedido sem resposta disponível. A operação pode ter sido processada; não repita POST cegamente.');
  const mediaType=(h['content-type']??'').split(';')[0].trim().toLowerCase();
  const cross=!!h.origin&&h.origin!=='https://api.example';
  const preflight=cross&&(!['GET','HEAD','POST'].includes(request.method)||Object.keys(h).some(k=>!['origin','accept','accept-language','content-language','content-type'].includes(k))||!!h['content-type']&&!['text/plain','application/x-www-form-urlencoded','multipart/form-data'].includes(mediaType));
  if(preflight)trace.push(`Preflight OPTIONS: Access-Control-Request-Method ${request.method}; verificar origem e headers.`);
  if(request.scenario==='cors'||cross&&h.origin!=='https://academy.example')return fail('blocked',preflight?'Preflight não autorizou a chamada principal neste cenário. CORS não é autenticação.':'Resposta não disponível ao script por CORS; isso não garante que a requisição não chegou ao servidor.');
  if(preflight)trace.push('Preflight 204 autoriza origem, método e headers. Enviar chamada principal.');
  const cors:Record<string,string>=cross?{'Access-Control-Allow-Origin':h.origin,'Vary':'Origin','Access-Control-Allow-Credentials':'true'}:{};
  if(request.scenario==='redirect')return respond(302,null,{...cors,Location:'/books'});
  if(/^\d{3}$/.test(request.scenario)){
    const status=Number(request.scenario);return respond(status,{error:`Cenário didático ${status}`,requestId:'estudo-01'},{...cors,...(status===401?{'WWW-Authenticate':'Bearer realm="lab"'}:{}),...(status===429?{'Retry-After':'30'}:{})});
  }
  if(request.method==='OPTIONS')return respond(204,null,{...cors,Allow:methods.join(', '),'Access-Control-Allow-Methods':methods.join(', '),'Access-Control-Allow-Headers':'Content-Type, Authorization'});
  if(url.pathname==='/session'){
    if(request.method==='POST'){next.session=true;return respond(200,{message:'Sessão fictícia criada; informe Cookie: sid=local-session no modelo.'},{...cors,'Set-Cookie':'sid=local-session; HttpOnly; Secure; SameSite=Lax; Path=/'});}
    if(request.method==='DELETE'){next.session=false;return respond(204,null,{...cors,'Set-Cookie':'sid=; Max-Age=0; HttpOnly; Secure; SameSite=Lax; Path=/'});}
    return respond(405,{error:'Método não permitido'},{Allow:'POST, DELETE'});
  }
  if(url.pathname==='/private')return next.session&&h.cookie?.split(';').some(c=>c.trim()==='sid=local-session')?respond(200,{message:'Área de estudo autenticada'},cors):respond(401,{error:'Sessão fictícia ausente ou inválida'},{...cors,'WWW-Authenticate':'Session realm="lab"'});
  if(url.pathname==='/get'&&request.method==='GET')return respond(200,{args:Object.fromEntries(url.searchParams),headers:h},cors);
  if(url.pathname==='/post'&&request.method==='POST'){try{return respond(200,{json:request.body?JSON.parse(request.body):null,headers:h},cors);}catch{return respond(400,{error:'JSON inválido'},cors);}}
  const match=url.pathname.match(/^\/books(?:\/(\d+))?$/);
  if(!match)return respond(404,{error:'Recurso não encontrado'},cors);
  const id=match[1]?Number(match[1]):null;
  const book=next.books.find(b=>b.id===id);
  const etag=`"books-${next.revision}"`;
  if(['GET','HEAD'].includes(request.method)){
    if(id!==null&&!book)return respond(404,{error:'Livro não encontrado'},cors);
    const page=Number(url.searchParams.get('page')??1),limit=Number(url.searchParams.get('limit')??10);
    if(!Number.isInteger(page)||page<1||!Number.isInteger(limit)||limit<1||limit>100)return respond(400,{error:'page ≥ 1; limit entre 1 e 100, inteiros.'},cors);
    let filtered=next.books.filter(b=>b.title.toLowerCase().includes((url.searchParams.get('q')??'').toLowerCase()));
    const sort=url.searchParams.get('sort');if(sort&&!['title','-title','id'].includes(sort))return respond(400,{error:'Ordenação permitida: title, -title, id.'},cors);
    if(h['if-none-match']===etag)return respond(304,null,{...cors,ETag:etag,'Cache-Control':'no-cache'});
    if(sort==='title'||sort==='-title')filtered=[...filtered].sort((a,b)=>a.title.localeCompare(b.title)*(sort==='-title'?-1:1));
    return respond(200,id!==null?book:{items:filtered.slice((page-1)*limit,page*limit),page,limit,total:filtered.length},{...cors,ETag:etag,'Cache-Control':'no-cache'});
  }
  if(request.method==='DELETE'&&id!==null){if(!book)return respond(404,{error:'Livro não encontrado'},cors);next.books=next.books.filter(b=>b.id!==id);next.revision++;return respond(204,null,cors);}
  if(request.method==='POST'&&id!==null||['PATCH','PUT','DELETE'].includes(request.method)&&id===null)return respond(405,{error:'Método não permitido nesta rota'},{...cors,Allow:id===null?'GET, HEAD, POST, OPTIONS':'GET, HEAD, PUT, PATCH, DELETE, OPTIONS'});
  if(['POST','PATCH','PUT'].includes(request.method)){
    if(mediaType!=='application/json')return respond(415,{error:'Envie Content-Type: application/json'},cors);
    let data:unknown;try{if(request.body.length>10000)throw new Error();data=JSON.parse(request.body);}catch{return respond(400,{error:'Corpo JSON inválido ou maior que o limite didático.'},cors);}
    if(!data||typeof data!=='object'||Array.isArray(data))return respond(422,{error:'Envie um objeto JSON'},cors);
    const fields=data as Record<string,unknown>;
    const keys=Object.keys(fields);const partial=request.method==='PATCH';
    if(!keys.length||keys.some(k=>!['title','author'].includes(k))||(!partial&&(!keys.includes('title')||!keys.includes('author')))||keys.some(k=>typeof fields[k]!=='string'||!(fields[k] as string).trim()||(fields[k] as string).length>200))return respond(422,{error:'Campos title/author: texto não vazio de até 200 caracteres; ambos exigidos em POST/PUT.'},cors);
    if(request.method==='POST'){const created={id:next.nextId++,title:String(fields.title),author:String(fields.author)};next.books.push(created);next.revision++;return respond(201,created,{...cors,Location:`/books/${created.id}`});}
    if(!book)return respond(404,{error:'Livro não encontrado'},cors);
    if(typeof fields.title==='string')book.title=fields.title;if(typeof fields.author==='string')book.author=fields.author;next.revision++;return respond(200,book,cors);
  }
  return respond(405,{error:'Método não permitido'}, {...cors,Allow:methods.join(', ')});
}
