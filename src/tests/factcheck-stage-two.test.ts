import { describe, expect, it } from 'vitest';
import { newContract, validateContract } from '../features/web/contracts';
import { initialHttpState, initialRequest, simulateHttp } from '../features/web/http';
import { newTerminal, runTerminal } from '../features/web/terminal';
import { actGit, newGit } from '../features/web/git';

describe('contraexemplos técnicos independentes da Etapa 02', () => {
 it('não aprova tipo de mídia que apenas começa com application/json', () => {
  expect(validateContract({...newContract(), headers:'Content-Type: application/jsonp'}).passed).toBe(false);
 });
 it('criação identificável não aprova Location com segmento de id vazio', () => {
  expect(validateContract({...newContract(), operation:'create', method:'POST', path:'/books', status:201, headers:'Content-Type: application/json\nLocation: /books/', response:'{"id":"b-7","title":"Web","author":"Lia"}'}).passed).toBe(false);
 });
 it('tipo e subtipo de mídia não distinguem maiúsculas de minúsculas', () => {
  expect(simulateHttp(initialHttpState(), {...initialRequest(), method:'POST', headers:'Content-Type: Application/JSON', body:'{"title":"Web","author":"Lia"}'}).result.status).toBe(201);
 });
 it('aspas tornam operadores de shell texto literal no recorte ensinado', () => {
  expect(runTerminal(newTerminal(), "echo '|'").output).toBe('|');
  expect(runTerminal(newTerminal(), "echo '>'").output).toBe('>');
 });
 it('snapshot preparado não acompanha edição posterior e restore preserva staging', () => {
  let s=actGit(newGit(),'edit','A').state;
  s=actGit(s,'add').state; s=actGit(s,'edit','B').state;
  const restored=actGit(s,'restore').state;
  expect(restored.work).toBe('A'); expect(restored.staged).toBe('A');
  const committed=actGit(s,'commit','Versão A').state;
  expect(committed.commits.at(-1)?.content).toBe('A'); expect(committed.work).toBe('B');
 });
 it('HEAD e DELETE não fabricam JSON e repetir DELETE preserva o efeito', () => {
  const first=simulateHttp(initialHttpState(), {...initialRequest(), method:'DELETE', endpoint:'/books/1'});
  const repeated=simulateHttp(first.state, {...initialRequest(), method:'DELETE', endpoint:'/books/1'});
  expect(first.result).toMatchObject({status:204,body:null});
  expect(repeated.result.status).toBe(404); expect(repeated.state.books).toEqual(first.state.books);
  expect(simulateHttp(initialHttpState(), {...initialRequest(), method:'HEAD'}).result.body).toBeNull();
 });
});

it('valida entradas antes de revalidar cache e mantém 304 nas consultas válidas', () => {
 for(const endpoint of ['/books?page=-1','/books?limit=0','/books?sort=inventado']) {
  expect(simulateHttp(initialHttpState(), {...initialRequest(), endpoint, headers:'If-None-Match: "books-1"'}).result.status).toBe(400);
 }
 expect(simulateHttp(initialHttpState(), {...initialRequest(), headers:'If-None-Match: "books-1"'}).result.status).toBe(304);
});
it('tipos JSON válidos e tipos de prefixo falso têm decisões distintas', () => {
 for(const media of ['application/json; charset=utf-8','Application/JSON','application/problem+json','application/vnd.stacktrail+json']) {
  expect(validateContract({...newContract(),headers:`Content-Type: ${media}`}).passed,media).toBe(true);
 }
 for(const media of ['application/jsonp','application/json-malformado','text/plain; nota=+json']) {
  expect(validateContract({...newContract(),headers:`Content-Type: ${media}`}).passed,media).toBe(false);
 }
 expect(simulateHttp(initialHttpState(),{...initialRequest(),method:'POST',headers:'Content-Type: Application/JSON ; charset=utf-8',body:'{"title":"Web","author":"Lia"}'}).result.status).toBe(201);
});
it('Location pode usar URI absoluta externa quando identifica o recurso deste contrato', () => {
 expect(validateContract({...newContract(),operation:'create',method:'POST',path:'/books',status:201,headers:'Content-Type: application/json\nLocation: https://outro.example/books/b-7',response:'{"id":"b-7"}'}).passed).toBe(true);
});
it('operador entre aspas e expansão literal convivem com pipe/redirecionamento real', () => {
 let state=runTerminal(newTerminal(),"echo '|' > simbolo.txt").state;
 expect(state.files['/lab/simbolo.txt']).toBe('|\n');
 expect(runTerminal(state,"cat simbolo.txt | grep '|'").output).toBe('|');
 state=runTerminal(state,"export SINAL='>'").state;
 expect(runTerminal(state,'echo "$SINAL"').output).toBe('>');
});
it('preflight usa essência do media type sem distinguir caixa ou espaço antes de parâmetro', () => {
 for(const media of ['text/plain','Text/Plain','text/plain ; charset=utf-8']) {
  const result=simulateHttp(initialHttpState(), {...initialRequest(),endpoint:'/get',headers:`Origin: https://academy.example\nContent-Type: ${media}`}).result;
  expect(result.trace.join('\n'),media).not.toContain('Preflight');
 }
});
