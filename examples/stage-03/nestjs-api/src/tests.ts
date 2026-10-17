import 'reflect-metadata';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BooksService} from './books.service.js';
import {makeApp} from './app.js';
test('Provider isola estado, preserva campos e não vaza objeto interno',()=>{
 const service=new BooksService();const book=service.create({title:'API',author:'Ana'});book.title='Fora';assert.equal(service.find(1).title,'API');
 assert.equal(service.update(1,{author:'Bia'}).title,'API');assert.throws(()=>service.update(1,{}));assert.throws(()=>service.update(1,{author:null} as unknown as {author:string}));service.remove(1);assert.throws(()=>service.find(1));assert.deepEqual(new BooksService().all(),[]);
});
test('HTTP real: DTO, whitelist, parâmetro, CRUD e fechamento',async()=>{
 const app=await makeApp();await app.listen(0,'127.0.0.1');
 try{const base=await app.getUrl();const send=(path:string,method='GET',data?:unknown)=>fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});
 assert.deepEqual(await(await send('/books')).json(),[]);
 const created=await send('/books','POST',{title:' API ',author:'Ana'});assert.equal(created.status,201);assert.equal(created.headers.get('location'),'/books/1');assert.deepEqual(await created.json(),{id:1,title:'API',author:'Ana'});
 assert.equal((await send('/books','POST',{title:'x',author:'Ana',admin:true})).status,400);assert.equal((await send('/books','POST',{title:' ',author:'Ana'})).status,400);assert.equal((await send('/books','POST',{title:2,author:'Ana'})).status,400);
 for(const id of ['no','1e0','1.0','0','-1','9007199254740992'])assert.equal((await send('/books/'+id)).status,400);assert.equal((await send('/books/999')).status,404);
 assert.equal((await send('/books/1','PATCH',{author:null})).status,400);assert.equal((await send('/books/1','PATCH',{})).status,400);assert.deepEqual(await(await send('/books/1')).json(),{id:1,title:'API',author:'Ana'});
 assert.deepEqual(await(await send('/books/1','PATCH',{author:'Bia'})).json(),{id:1,title:'API',author:'Bia'});
 const deleted=await send('/books/1','DELETE');assert.equal(deleted.status,204);assert.equal(await deleted.text(),'');assert.equal((await send('/books/1')).status,404);
 }finally{await app.close();}
});
