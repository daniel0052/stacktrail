import {readFile} from 'node:fs/promises';
export function first<T>(items:readonly T[]):T|undefined{return items[0];}
export function titles(value:unknown):string[]{
 if(!Array.isArray(value))throw new TypeError('Esperada lista');
 return value.map((item:unknown)=>{
  if(!item||typeof item!=='object'||Array.isArray(item)||!('title' in item)||typeof item.title!=='string')throw new TypeError('Título deve ser texto');
  const title=item.title.trim();if(!title)throw new RangeError('Título vazio');return title;
 });
}
export async function loadTitles(path:string):Promise<string[]>{
 const raw:unknown=JSON.parse(await readFile(path,'utf8'));return titles(raw);
}
