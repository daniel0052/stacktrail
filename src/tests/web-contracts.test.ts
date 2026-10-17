import {it,expect} from 'vitest';
import {newContract,validateContract} from '../features/web/contracts';
it('aceita coleções equivalentes e identificadores diferentes sem comparar texto',()=>{
 for(const response of ['[]','{"items":[]}','{"data":[],"total":0}'])expect(validateContract({...newContract(),response}).passed).toBe(true);
 expect(validateContract({...newContract(),operation:'create',method:'POST',path:'/books',status:201,headers:'Content-Type: application/json\nLocation: /books/abc',response:'{"title":"X","id":"abc"}'}).passed).toBe(true);
});
it('rejeita GET destrutivo, 204 com corpo, Location errado e vazamento de erro',()=>{
 expect(validateContract({...newContract(),operation:'delete',path:'/books/2',status:204,response:'{}'}).issues.length).toBeGreaterThan(1);
 expect(validateContract({...newContract(),operation:'create',method:'POST',status:201,headers:'Location: /books'}).passed).toBe(false);
 expect(validateContract({...newContract(),scenario:'invalid',status:422,response:'{"stack":"segredo"}'}).passed).toBe(false);
});
it('não exige um único formato de erro; diferencia lista vazia e recurso ausente',()=>{
 expect(validateContract({...newContract(),scenario:'invalid',status:400,response:'{"message":"Dados inválidos"}'}).passed).toBe(true);
 expect(validateContract({...newContract(),operation:'get',path:'/books/:bookId',scenario:'missing',status:404,response:'{"error":"Ausente"}'}).passed).toBe(true);
 expect(validateContract({...newContract(),status:404}).passed).toBe(false);
});
