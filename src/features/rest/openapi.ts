import {parseDocument} from 'yaml';
import example from '../../content/stage-04/openapi.json';
export const openApiExample=JSON.stringify(example,null,2); // JSON is valid YAML1.2.
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export function inspectOpenApi(raw:string){
 const errors:string[]=[],endpoints:string[]=[];
 try{
  if(raw.length>200000)throw new Error('Limite local:200KB.');
  const parsed=parseDocument(raw,{uniqueKeys:true});if(parsed.errors.length)throw new Error(parsed.errors.map(e=>e.message).join('; '));
  const doc:unknown=parsed.toJS({maxAliasCount:0});
  if(!object(doc))throw new Error('Documento deve ser objeto.');
  if(doc.openapi!=='3.1.1')errors.push('Este inspetor didático usa OpenAPI3.1.1.');
  if(!object(doc.info)||typeof doc.info.title!=='string'||typeof doc.info.version!=='string')errors.push('info.title e info.version são necessários.');
  if(!object(doc.paths))errors.push('paths deve ser objeto.');
  else for(const [path,item] of Object.entries(doc.paths)){
   if(!path.startsWith('/')||!object(item)){errors.push(`Path inválido: ${path}`);continue;}
   for(const method of ['get','post','put','patch','delete','head','options','trace']){
    if(!(method in item))continue;endpoints.push(`${method.toUpperCase()} ${path}`);
    const op=item[method];if(!object(op)||!object(op.responses)||!Object.keys(op.responses).length){errors.push(`${method} ${path}: responses ausente.`);continue;}
    const params=[...(Array.isArray(item.parameters)?item.parameters:[]),...(Array.isArray(op.parameters)?op.parameters:[])];
    if(params.some(p=>object(p)&&'$ref'in p))errors.push(`${path}: referência de parâmetro não verificada pelo recorte local; use validador completo.`);
    for(const token of path.matchAll(/\{([^}]+)\}/g))if(!params.some(p=>object(p)&&'$ref'in p)&&!params.some(p=>object(p)&&p.in==='path'&&p.name===token[1]&&p.required===true))errors.push(`${path}: parâmetro ${token[1]} precisa in:path e required:true.`);
    for(const [status,response] of Object.entries(op.responses))if(!/^(default|[1-5](\d{2}|XX))$/.test(status)||(!object(response)||(!('$ref'in response)&&typeof response.description!=='string')))errors.push(`${path}: resposta ${status} inválida no recorte local.`);
   }
  }
  return {errors,endpoints};
 }catch(e){return {errors:[e instanceof Error?e.message:'Documento ilegível.'],endpoints};}
}
