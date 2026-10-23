/* global fetch, AbortSignal, console */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const source=await readFile('src/practice/security/security-sources.ts','utf8');
const sources=JSON.parse(source.slice(source.indexOf('=')+1).trim().replace(/;$/,''));
const results=[];let index=0;
await Promise.all(Array.from({length:5},async()=>{while(index<sources.length){const s=sources[index++];try{const r=await fetch(s.url,{signal:AbortSignal.timeout(30000)});const body=await r.text();results.push({id:s.id,original:s.url,final:r.url,status:r.status,bytes:body.length,title:body.match(/<title[^>]*>([^<]*)/i)?.[1]??'',method:'GET',accessChecked:new Date().toISOString(),adequacy:'Separada: ver curadoria e revisão independente; HTTP não prova adequação.'});}catch(e){results.push({id:s.id,original:s.url,error:String(e),adequacy:'Acesso não verificado por este cliente; ver evidência de consulta independente.'});}}}));
await mkdir('docs/quality/security',{recursive:true});await writeFile('docs/quality/security/source-access.json',JSON.stringify(results,null,2));console.log(`${results.length} fontes; ${results.filter(r=>r.status>=200&&r.status<300).length} respostas 2xx; demais acessos registrados separadamente.`);
