import { it,expect } from 'vitest';
import { initialHttpState,initialRequest,simulateHttp,readHeaders,type HttpRequest } from '../features/web/http';
const run=(patch:Partial<HttpRequest>)=>simulateHttp(initialHttpState(),{...initialRequest(),...patch});
it('CRUD, semântica HEAD, PATCH e 204; não altera entrada original',()=>{
 const original=initialHttpState();const created=simulateHttp(original,{...initialRequest(),method:'POST',headers:'Content-Type: application/json',body:'{"title":"Novo","author":"Ana"}'});
 expect(created.result.status).toBe(201);expect(created.result.headers.Location).toBe('/books/3');expect(original.books).toHaveLength(2);
 const changed=simulateHttp(created.state,{...initialRequest(),method:'PATCH',endpoint:'/books/3',headers:'Content-Type: application/json',body:'{"title":"Alterado"}'});
 expect(changed.result.body).toMatchObject({author:'Ana',title:'Alterado'});expect(run({method:'HEAD'}).result.body).toBeNull();
 const deleted=simulateHttp(changed.state,{...initialRequest(),method:'DELETE',endpoint:'/books/3'});expect(deleted.result.status).toBe(204);expect(deleted.result.body).toBeNull();expect(simulateHttp(deleted.state,{...initialRequest(),method:'DELETE',endpoint:'/books/3'}).result.status).toBe(404);
});
it('ETag, filtros, validação e métodos incompatíveis',()=>{
 expect(run({headers:'If-None-Match: "books-1"'}).result).toMatchObject({status:304,body:null});expect(run({endpoint:'/books?q=redes&limit=1&page=1'}).result.body).toMatchObject({total:1});expect(run({endpoint:'/books?page=-1'}).result.status).toBe(400);
 expect(run({method:'POST',headers:'Content-Type: application/json',body:'{' }).result.status).toBe(400);expect(run({method:'POST',headers:'Content-Type: application/json',body:'{}'}).result.status).toBe(422);expect(run({method:'POST'}).result.status).toBe(415);expect(run({method:'DELETE'}).result.status).toBe(405);expect(()=>readHeaders('inválido')).toThrow();
});
it('separa rede, CORS, preflight e erro HTTP; sessão termina no logout',()=>{
 for(const scenario of ['dns','tls','timeout'] as const)expect(run({scenario}).result).toMatchObject({kind:'network',body:null});expect(run({scenario:'500'}).result).toMatchObject({kind:'http',status:500});expect(run({scenario:'cors'}).result.status).toBeUndefined();
 const preflight=run({method:'POST',headers:'Origin: https://academy.example\nContent-Type: application/json',body:'{"title":"A","author":"B"}'});expect(preflight.result.status).toBe(201);expect(preflight.result.trace.join()).toContain('Preflight 204');
 let state=run({method:'POST',endpoint:'/session'}).state;expect(simulateHttp(state,{...initialRequest(),endpoint:'/private',headers:'Cookie: sid=local-session'}).result.status).toBe(200);state=simulateHttp(state,{...initialRequest(),method:'DELETE',endpoint:'/session'}).state;expect(simulateHttp(state,{...initialRequest(),endpoint:'/private',headers:'Cookie: sid=local-session'}).result.status).toBe(401);
});
