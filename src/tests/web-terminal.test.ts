import {it,expect} from 'vitest';
import {newTerminal,runTerminal,tokenize} from '../features/web/terminal';
it('navega arquivos virtuais, pipes, redirecionamento e permissões',()=>{
 let state=newTerminal();state=runTerminal(state,'mkdir notas').state;state=runTerminal(state,'cd notas').state;state=runTerminal(state,'echo HTTP > a.txt').state;state=runTerminal(state,'echo GET >> a.txt').state;expect(runTerminal(state,'cat a.txt | grep GET').output).toBe('GET');state=runTerminal(state,'cp a.txt b.txt').state;state=runTerminal(state,'mv b.txt c.txt').state;state=runTerminal(state,'chmod 640 c.txt').state;expect(state.modes['/lab/notas/c.txt']).toBe('640');expect(runTerminal(state,'head -n 1 a.txt').output).toBe('HTTP');expect(runTerminal(state,'find .').output).toContain('c.txt');state=runTerminal(state,'rm c.txt').state;expect(state.files['/lab/notas/c.txt']).toBeUndefined();
});
it('interpreta curl como dados locais incluindo POST, headers e códigos de saída',()=>{
 expect(runTerminal(newTerminal(),'curl -i https://httpbin.org/get?tema=http').output).toContain('HTTP 200');expect(runTerminal(newTerminal(),`curl -i https://httpbin.org/post --json '{"nome":"Ana"}'`).output).toContain('Ana');expect(runTerminal(newTerminal(),'curl --fail-with-body https://api.example/ausente').state.lastExit).toBe(22);
 const out=runTerminal(newTerminal(),"curl -o resposta.json -w '%{http_code}' https://api.example/books");expect(out.output).toBe('200');expect(out.state.files['/lab/resposta.json']).toContain('items');
});
it('rejeita shell e caminhos externos sem alteração parcial',()=>{
 const state=newTerminal();for(const command of ['node x.js','echo $(pwd)','echo ok; rm a','cat /etc/passwd','cd ../../','rm -rf /lab','echo "sem fim']){const next=runTerminal(state,command);expect(next.state.lastExit).toBe(2);expect(next.state.files).toEqual(state.files);}expect(()=>tokenize('echo `pwd`')).toThrow();
});

it('curl preserva método explícito independentemente da ordem dos dados',()=>{
 for(const command of [
  `curl -X GET https://api.example/get -d '{"nome":"Ana"}'`,
  `curl -d '{"nome":"Ana"}' https://api.example/get -X GET`,
  `curl -X GET https://api.example/get --json '{"nome":"Ana"}'`,
 ]){
  const result=runTerminal(newTerminal(),command);
  expect(result.state.lastExit).toBe(0);expect(JSON.parse(result.output)).toHaveProperty('args');
 }
 expect(JSON.parse(runTerminal(newTerminal(),`curl https://api.example/post --json '{"nome":"Ana"}'`).output)).toHaveProperty('json.nome','Ana');
});

it('aspas simples preservam dólares no JSON e aspas duplas expandem variável fictícia',()=>{
 const state=runTerminal(newTerminal(),'export TEMA=HTTP').state;
 expect(runTerminal(state,"echo '$TEMA'").output).toBe('$TEMA');
 expect(runTerminal(state,'echo "$TEMA"').output).toBe('HTTP');
 const result=runTerminal(state,`curl /post --json '{"nome":"$TEMA"}'`);
 expect(JSON.parse(result.output)).toHaveProperty('json.nome','$TEMA');
});
