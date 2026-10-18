/* global fetch, AbortSignal, Buffer, console */
// Explicit network audit, separate from unit tests. A status/title is not proof of adequacy.
import fs from 'node:fs/promises';
import ts from 'typescript';
const sourceFiles=['catalog.ts','curriculum.ts','stage-zero.ts'];
const sources=await Promise.all(sourceFiles.map(async name=>ts.createSourceFile(name,await fs.readFile('src/practice/'+name,'utf8'),ts.ScriptTarget.Latest,true)));
const urls=new Set();function visit(node){if(ts.isStringLiteral(node)&&node.text.startsWith('https://'))urls.add(node.text);ts.forEachChild(node,visit);}sources.forEach(visit);
const results=await Promise.all([...urls].map(async url=>{try{const response=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'StackTrail-reference-audit/1.0'}});const html=await response.text();return {url,finalUrl:response.url,status:response.status,title:html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()??null,htmlLanguage:html.match(/<html[^>]*lang=["']([^"']+)/i)?.[1]??null,bytes:Buffer.byteLength(html),access:response.ok?'HTTP acessível':'Falha HTTP',adequacy:'Ver revisão humana no relatório; status/título não validam conteúdo.'};}catch(error){return {url,access:'Não verificado por este cliente',error:error.message,adequacy:'Não inferir inexistência ou adequação.'};}}));
await fs.writeFile('docs/REFERENCE_LINK_CHECK.json',JSON.stringify({checkedAt:new Date().toISOString(),method:'GET com redirecionamentos; consulta de adequação realizada separadamente por revisão web',results},null,2)+'\n');
console.log(JSON.stringify({total:results.length,ok:results.filter(r=>r.status===200).length,failures:results.filter(r=>r.status!==200)},null,2));
