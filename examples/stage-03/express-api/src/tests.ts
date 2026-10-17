import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {makeApp} from './app.js';
test('CRUD, query, validação, parsing, CORS e correlação em HTTP real',async()=>{
 const logs:string[]=[];const server=makeApp({origin:'http://localhost:5173',log:line=>logs.push(line)}).listen(0,'127.0.0.1');await once(server,'listening');
 try{const address=server.address();assert.ok(address&&typeof address==='object');const base=`http://127.0.0.1:${address.port}`;
 const send=(path:string,method='GET',body?:string,extra:Record<string,string>={})=>fetch(base+path,{method,headers:{'Content-Type':'application/json',...extra},body});
 assert.deepEqual(await(await send('/books')).json(),[]);
 const created=await send('/books','POST',JSON.stringify({title:' API ',author:'Ana',admin:true}));assert.equal(created.status,201);assert.equal(created.headers.get('location'),'/books/1');assert.ok(created.headers.get('x-request-id'));assert.deepEqual(await created.json(),{id:1,title:'API',author:'Ana'});
 assert.equal((await send('/books/1')).status,200);for(const id of ['no','1e0','1.0','0x1','0','-1','9007199254740992'])assert.equal((await send('/books/'+id)).status,400);
 assert.equal((await send('/books','POST','{')).status,400);assert.equal((await send('/books','POST','{}')).status,422);assert.equal((await send('/books','POST','[]')).status,422);assert.equal((await send('/books','POST',JSON.stringify({title:'x'.repeat(17000),author:'A'}))).status,413);
 assert.equal((await send('/books','POST','title=API',{'Content-Type':'text/plain'})).status,415);
 const patch=await send('/books/1','PATCH',JSON.stringify({author:'Bia'}));assert.deepEqual(await patch.json(),{id:1,title:'API',author:'Bia'});assert.equal((await send('/books/1','PATCH','{}')).status,422);assert.deepEqual(await(await send('/books/1')).json(),{id:1,title:'API',author:'Bia'});
 assert.deepEqual(await(await send('/books?q=nada')).json(),[]);assert.equal((await send('/books?q[a]=x')).status,422);
 const allowed=await send('/books','GET',undefined,{Origin:'http://localhost:5173'});assert.equal(allowed.headers.get('access-control-allow-origin'),'http://localhost:5173');const denied=await send('/books','GET',undefined,{Origin:'http://other.test'});assert.equal(denied.headers.get('access-control-allow-origin'),null);assert.equal(denied.status,200);
 const preflight=await send('/books','OPTIONS',undefined,{Origin:'http://localhost:5173','Access-Control-Request-Method':'POST'});assert.equal(preflight.status,204);assert.equal(preflight.headers.get('access-control-allow-methods'),'GET,POST,PATCH,DELETE,OPTIONS');
 const deleted=await send('/books/1','DELETE');assert.equal(deleted.status,204);assert.equal(await deleted.text(),'');assert.equal((await send('/books/1')).status,404);assert.equal((await send('/absent')).status,404);
 assert.ok(logs.length>=15);assert.ok(logs.every(line=>!line.includes('Bia')&&!line.includes('admin')));
 }finally{server.closeAllConnections();await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));}
});
