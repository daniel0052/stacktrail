export function parseJournal<A>(raw:string,validate:(value:unknown)=>value is A):A[]{
 const parsed:unknown=JSON.parse(raw);
 if(!parsed||typeof parsed!=='object'||!('version' in parsed)||parsed.version!==1||!('actions' in parsed)||!Array.isArray(parsed.actions)||parsed.actions.length>200||!parsed.actions.every(validate))throw new Error('Rascunho de simulação inválido; original preservado.');
 return parsed.actions;
}
export const isRecord=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export const isText=(v:unknown):v is string=>typeof v==='string'&&v.length<=10000;
