import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {makeApp} from './app.js';
test('rotas iniciais: health, lista vazia e ausência sem exigir CRUD',async()=>{
 const server=makeApp().listen(0,'127.0.0.1');await once(server,'listening');
 try{const address=server.address();assert.ok(address&&typeof address==='object');const base=`http://127.0.0.1:${address.port}`;
 assert.deepEqual(await(await fetch(base+'/health')).json(),{status:'ok'});
 const books=await fetch(base+'/books');assert.equal(books.status,200);assert.deepEqual(await books.json(),[]);
 assert.equal((await fetch(base+'/books/99')).status,404);
 }finally{server.closeAllConnections();await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));}
});
