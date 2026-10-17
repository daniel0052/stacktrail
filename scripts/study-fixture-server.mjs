// Test fixture only: executes trusted, repository-authored lesson snippets in a temporary folder.
// This is never imported by the application or started by npm run dev/build.
import {URL} from 'node:url';
import process from 'node:process';
import console from 'node:console';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {createServer} from 'vite';
const folder=await mkdtemp(join(tmpdir(),'stacktrail-study-'));
const source=await readFile(new URL('../src/content/stage-01/lessons/http.mdx',import.meta.url),'utf8');
const blocks=language=>[...source.matchAll(new RegExp('```'+language+'\\n([\\s\\S]*?)```','g'))].map(match=>match[1]);
const ts=blocks('ts');
await writeFile(join(folder,'main.ts'),ts[0]+'\n'+ts.find(code=>code.includes('// exemplo: http-ui')));
await writeFile(join(folder,'index.html'),'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Exemplo HTTP</title><main><h1>Exemplo HTTP</h1>'+blocks('html')[0]+'</main><script type="module" src="/main.ts"></script></html>');
await writeFile(join(folder,'formdata.ts'),ts.find(code=>code.includes('const campos = new FormData')));
await writeFile(join(folder,'formdata.html'),'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>FormData</title><main>'+blocks('html')[1]+'</main><script type="module" src="/formdata.ts"></script></html>');
// 5174 avoids conflicting with the common Vite port; the lesson explicitly teaches adjusting origins.
await writeFile(join(folder,'mock.mjs'),blocks('js').find(code=>code.includes('createServer')).replaceAll('127.0.0.1:5173','127.0.0.1:5174'));
const mock=spawn(process.execPath,[join(folder,'mock.mjs')],{stdio:'inherit'});
const vite=await createServer({configFile:false,root:folder,server:{host:'127.0.0.1',port:5174,strictPort:true}});
await vite.listen();
console.log('Exemplo de estudo isolado: http://127.0.0.1:5174');
const close=async()=>{mock.kill();await vite.close();await rm(folder,{recursive:true,force:true});process.exit();};
process.on('SIGINT',close);process.on('SIGTERM',close);
mock.on('exit',code=>{if(code)void close();});
