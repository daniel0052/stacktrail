import { readHeaders,type Method } from './http';
export const operations=['list','get','create','patch','delete'] as const;
export type Operation=typeof operations[number];
export type Contract = { operation:Operation; method:Method; path:string; status:number; headers:string; response:string; scenario:'success'|'missing'|'invalid' };
export type ContractReport={passed:boolean;issues:string[];warnings:string[]};
export const newContract=():Contract=>({operation:'list',method:'GET',path:'/books?page=1&limit=10&sort=title',status:200,headers:'Content-Type: application/json',response:'{"items": [], "page": 1, "limit": 10}',scenario:'success'});
export function validateContract(contract:Contract):ContractReport{
 const issues:string[]=[],warnings:string[]=[];
 const expected:Record<Operation,Method>={list:'GET',get:'GET',create:'POST',patch:'PATCH',delete:'DELETE'};
 if(contract.method!==expected[contract.operation])issues.push(`A operação ${contract.operation} deste contrato usa ${expected[contract.operation]}, não ${contract.method}. GET não deve solicitar remoção.`);
 let url:URL;try{url=new URL(contract.path,'https://api.example');}catch{return {passed:false,issues:['URL inválida.'],warnings};}
 const detail=['get','patch','delete'].includes(contract.operation);
 if(!/^\/books(?:\/(?:[^/]+))?$/.test(url.pathname)||detail!== (url.pathname.split('/').filter(Boolean).length===2))issues.push('Use a coleção /books ou um recurso /books/{identificador} conforme a operação. O nome do identificador pode variar.');
 let headers:Record<string,string>={};try{headers=readHeaders(contract.headers);}catch(e){issues.push(e instanceof Error?e.message:'Headers inválidos');}
 let response:unknown=null;if(contract.response.trim()){try{response=JSON.parse(contract.response);}catch{issues.push('Representação inválida: neste laboratório o corpo configurado é JSON.');}}
 if([204,304].includes(contract.status)&&contract.response.trim())issues.push(`${contract.status} não deve carregar corpo.`);
 if(contract.status===201&&!headers.location)issues.push('Para a criação identificável deste laboratório, informe Location do novo recurso.');
 if(headers.location){try{const location=new URL(headers.location,'https://api.example');if(!/^\/books\/[^/]+$/.test(location.pathname))issues.push('Location precisa identificar o livro criado, não apenas a coleção.');}catch{issues.push('Location inválido.');}}
 const object=response&&typeof response==='object'&&!Array.isArray(response)?response as Record<string,unknown>:null;
 if(contract.scenario==='missing'){
  if(!detail)issues.push('Recurso ausente é cenário de uma operação com identificador; coleção vazia pode ser 200.');
  if(contract.status!==404)issues.push('Neste cenário o recurso identificado não existe: represente 404.');
 }else if(contract.scenario==='invalid'){
  if(![400,422].includes(contract.status))issues.push('Diferencie entrada malformada (400) e validação de conteúdo (422) neste cenário.');
 }else{
  const allowed:Record<Operation,number[]>={list:[200],get:[200],create:[200,201],patch:[200,204],delete:[200,202,204]};
  if(!allowed[contract.operation].includes(contract.status))issues.push('Status não descreve o resultado de sucesso configurado para esta operação.');
  if(contract.operation==='create'&&contract.status===200)warnings.push('200 pode descrever processamento; para criação síncrona identificável prefira 201 com Location e explique a escolha.');
  if(contract.operation==='delete'&&contract.status===202)warnings.push('202 apenas aceita processamento; documente como acompanhar a remoção, sem afirmar que já terminou.');
  if(contract.operation==='list'){
   if(!Array.isArray(response)&&!Array.isArray(object?.items)&&!Array.isArray(object?.data))issues.push('A listagem precisa de uma coleção JSON: array, items ou data.');
   if(!url.searchParams.size)warnings.push('Documente filtros, ordenação e paginação. A rota simples não mostra esses parâmetros.');
   for(const name of ['page','limit']){const value=url.searchParams.get(name);if(value!==null&&(!Number.isInteger(Number(value))||Number(value)<1))issues.push(`${name} deve ser inteiro positivo quando utilizado.`);}
  }else if(['get','create'].includes(contract.operation)&&(!object|| !['string','number'].includes(typeof object.id)||String(object.id).trim()===''))issues.push('Represente um livro identificável; id pode ser número ou texto não vazio.');
 }
 if(contract.status>=400&&(!object||Object.keys(object).length===0))issues.push('Defina erro JSON previsível e útil, sem detalhes internos.');
 if(object&&Object.keys(object).some(k=>['stack','stacktrace','sql'].includes(k.toLowerCase())))issues.push('Não exponha stack trace ou detalhes SQL no erro público.');
 const mediaType=headers['content-type']?.split(';')[0].trim().toLowerCase()??'';
 if(response!==null&&!/^application\/(?:json|[a-z0-9!#$&^_.+-]+\+json)$/.test(mediaType))issues.push('Descreva a representação com Content-Type JSON apropriado.');
 return {passed:issues.length===0,issues,warnings};
}
