export type Book={title:string;author:string};
export function booksFrom(value:unknown):Book[]{
 if(!Array.isArray(value))throw new Error('Esperava uma lista de livros');
 return value.map((item:unknown)=>{
  if(!item||typeof item!=='object'||!('title'in item)||!('author'in item)||typeof item.title!=='string'||typeof item.author!=='string'||!item.title.trim()||!item.author.trim())throw new Error('Livro inválido');
  return {title:item.title.trim(),author:item.author.trim()};
 });
}
