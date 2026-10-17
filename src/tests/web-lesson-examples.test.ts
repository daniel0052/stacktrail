import {it,expect,vi} from 'vitest';
const {readFileSync}=await vi.importActual<{readFileSync:(path:URL,encoding:string)=>string}>('node:fs');
import {initialHttpState,initialRequest,simulateHttp,type HttpState,type HttpRequest} from '../features/web/http';
import {newTerminal,runTerminal} from '../features/web/terminal';
import {newContract,validateContract} from '../features/web/contracts';

it('ensaio da aula separa página vazia, recurso ausente, sintaxe e validação',()=>{
 let state=initialHttpState();
 const send=(patch:Partial<HttpRequest>)=>{const outcome=simulateHttp(state,{...initialRequest(),...patch});state=outcome.state;return outcome.result;};
 expect(send({endpoint:'/books?q=redes&page=1&limit=1#lista'}).body).toMatchObject({total:1,items:[{id:1}]});
 expect(send({endpoint:'/books?q=redes&page=2&limit=1'})).toMatchObject({status:200,body:{items:[]}});
 expect(send({endpoint:'/books/999'}).status).toBe(404);
 const create={method:'POST' as const,headers:'Content-Type: application/json'};
 expect(send({...create,body:'{"title":'}).status).toBe(400);
 expect(send({...create,body:'{"title":"HTTP"}'}).status).toBe(422);
 const created=send({...create,body:'{"title":"HTTP","author":"Ana"}'});
 expect(created).toMatchObject({status:201,headers:{Location:'/books/3'},body:{id:3}});
});
it('ensaio da aula recupera sessão e revalida após mudança sem atribuir corpo ao 304',()=>{
 let state:HttpState=initialHttpState();
 const send=(patch:Partial<HttpRequest>)=>{const outcome=simulateHttp(state,{...initialRequest(),...patch});state=outcome.state;return outcome.result;};
 expect(send({endpoint:'/private'}).status).toBe(401);
 send({endpoint:'/session',method:'POST'});
 expect(send({endpoint:'/private',headers:'Cookie: sid=local-session'}).status).toBe(200);
 send({endpoint:'/session',method:'DELETE'});
 expect(send({endpoint:'/private',headers:'Cookie: sid=local-session'}).status).toBe(401);
 const etag=send({}).headers.ETag;
 expect(send({headers:`If-None-Match: ${etag}`})).toMatchObject({status:304,body:null});
 send({method:'PATCH',endpoint:'/books/1',headers:'Content-Type: application/json',body:'{"title":"Outro"}'});
 expect(send({headers:`If-None-Match: ${etag}`})).toMatchObject({status:200,body:{items:expect.any(Array)}});
});
it('sequência de comandos publicada na aula produz arquivos e saída no terminal permitido',()=>{
 const lesson=readFileSync(new URL('../content/stage-02/lessons/shell.mdx',import.meta.url),'utf8');
 const commands=[...lesson.matchAll(/```bash\n([\s\S]*?)```/g)].map(m=>m[1]).find(block=>block.startsWith('pwd\nmkdir notas'));
 expect(commands).toBeDefined();let state=newTerminal();const observed:Record<string,string>={};
 for(const command of commands!.trim().split('\n')){const result=runTerminal(state,command);state=result.state;expect(state.lastExit,command).toBe(0);observed[command]=result.output;}
 expect(observed['cat resumo.txt | grep GET']).toBe('GET');
 expect(observed['head -n 1 revisao.txt']).toBe('HTTP');
 expect(observed['tail -n 1 revisao.txt']).toBe('GET');
 expect(state.files['/lab/notas/original.txt']).toBe(newTerminal().files['/lab/README.md']);
});
it('contrato trabalhado aceita ID textual e rejeita corpo em 204',()=>{
 const contract={...newContract(),operation:'create' as const,method:'POST' as const,path:'/books',status:201,headers:'Content-Type: application/json\nLocation: /books/b-7',response:'{"id":"b-7","title":"Web","author":"Lia"}'};
 expect(validateContract(contract).passed).toBe(true);
 expect(validateContract({...contract,status:204}).passed).toBe(false);
});
