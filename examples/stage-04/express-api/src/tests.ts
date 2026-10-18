import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {makeApp} from './app.js';
import {bookingInput,modelNow} from './model.js';
test('HTTP real: catálogo, queries, falhas e agendamentos sequenciais',async()=>{
 const server=makeApp().listen(0,'127.0.0.1');await once(server,'listening');const address=server.address();assert(address&&typeof address!=='string');const base=`http://127.0.0.1:${address.port}/api/v1`;
 const req=(path:string,method='GET',body?:unknown)=>fetch(base+path,{method,headers:{'Content-Type':'application/json'},...(body!==undefined?{body:JSON.stringify(body)}:{})});
 try{
  let response=await req('/books','POST',{title:'HTTP',category:'backend',note:null});assert.equal(response.status,201);assert.equal(response.headers.get('location'),'/api/v1/books/4');
  response=await req('/books/4','PATCH',{title:42});assert.equal(response.status,422);assert.equal((await (await req('/books/4')).json()).data.title,'HTTP');
  assert.equal((await req('/books/4','PATCH',{note:''})).status,200);assert.equal((await (await req('/books/4')).json()).data.note,'');
  assert.equal((await req('/books','POST',{title:'X',category:'Y',id:99})).status,422);
  response=await req('/books?search=inexistente');assert.deepEqual((await response.json()).meta,{page:1,per_page:10,total:0});
  for(const query of ['page=0','page=1&page=2','sort=secret','per_page=101'])assert.equal((await req('/books?'+query)).status,422);
  assert.equal((await fetch(base+'/books',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'})).status,400);
  assert.equal((await fetch(base+'/books',{method:'POST',headers:{'Content-Type':'text/plain'},body:'abc'})).status,415);
  assert.equal((await req('/books/999')).status,404);assert.equal((await req('/books/4','DELETE')).status,204);assert.equal((await req('/books/4','DELETE')).status,404);
  const value={name:'Ana',slot:'2030-06-10T10:00:00Z'};response=await req('/bookings','POST',value);assert.equal(response.status,201);assert.equal((await req('/bookings','POST',value)).status,409);
  assert.equal((await req('/bookings','POST',{...value,status:'cancelled'})).status,422);
  assert.equal((await req('/bookings','POST',{...value,slot:'2020-01-01T10:00:00Z'})).status,422);
  assert.equal((await req('/bookings/1','DELETE')).status,204);assert.equal((await req('/bookings/1','DELETE')).status,204);assert.equal((await req('/bookings/1')).status,200);assert.equal((await req('/bookings','POST',value)).status,201);
 }finally{server.closeAllConnections();await new Promise<void>((resolve,reject)=>server.close(e=>e?reject(e):resolve()));}
});
test('regra de relógio: slot publicado pode tornar-se passado',()=>{assert.throws(()=>bookingInput({name:'Ana',slot:'2030-06-10T10:00:00Z'},'2031-01-01T00:00:00Z'));assert.ok(modelNow);});
