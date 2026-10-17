import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {booksFrom} from './books.js';
import {makeServer} from './app.js';
test('Validação em runtime e normalização',()=>{
 assert.deepEqual(booksFrom([{title:' API ',author:' Ana ',extra:true}]),[{title:'API',author:'Ana'}]);
 for(const bad of [{},null,[{title:'',author:'Ana'}],[{title:1,author:'Ana'}]])assert.throws(()=>booksFrom(bad));
});
test('CLI escreve relatório e falha antes de substituir saída inválida',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'stacktrail-node-'));
 try{const input=join(dir,'input.json'),output=join(dir,'output.json');
 await writeFile(input,JSON.stringify([{title:'API',author:'Ana'},{title:'Redes',author:'Bia'}]));
 const run=()=>spawnSync(process.execPath,['dist/cli.js',input,output,'API'],{encoding:'utf8'});
 assert.equal(run().status,0);assert.equal(spawnSync(process.execPath,['dist/cli.js',input,input],{encoding:'utf8'}).status,1);const all=spawnSync(process.execPath,['dist/cli.js',input,output],{encoding:'utf8'});assert.equal(all.status,0);assert.equal(JSON.parse(await readFile(output,'utf8')).total,2);assert.equal(run().status,0);const text=await readFile(output,'utf8');assert.equal(JSON.parse(text).items.length,1);
 await writeFile(input,'{}');assert.equal(run().status,1);assert.equal(await readFile(output,'utf8'),text);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('HTTP real loopback: saúde, ausência e método',async()=>{
 const server=makeServer();server.listen(0,'127.0.0.1');await once(server,'listening');
 try{const address=server.address();assert.ok(address&&typeof address==='object');const base=`http://127.0.0.1:${address.port}`;
 const ok=await fetch(base+'/health');assert.equal(ok.status,200);assert.deepEqual(await ok.json(),{status:'ok'});
 assert.equal((await fetch(base+'/ausente')).status,404);const method=await fetch(base+'/health',{method:'POST'});assert.equal(method.status,405);assert.equal(method.headers.get('allow'),'GET');
 }finally{server.closeAllConnections();await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));}
});
