import {z} from 'zod';
// Explicit code-point limit, independent of the library string length unit.
const text=z.string().trim().min(1).refine(value=>[...value].length<=200,'Até 200 codepoints');
export const createBook=z.object({title:text,author:text});
export const patchBook=createBook.partial().refine(value=>value.title!==undefined||value.author!==undefined,'Informe título ou autor');
export function payload(value:unknown,partial=false):{title?:string;author?:string}|null{
 const parsed=(partial?patchBook:createBook).safeParse(value);
 return parsed.success?parsed.data:null;
}
