import { useWebJournal } from './useWebJournal';
import {seedHttp,reduceHttp,isHttpAction} from '../../features/web/workspaces';
import { methods,scenarios,type HttpRequest } from '../../features/web/http';
export function HttpExplorer() {
  const journal=useWebJournal('http',seedHttp,reduceHttp,isHttpAction,(a,b)=>a.type==='patch'&&b.type==='patch'&&a.field===b.field);
  const {request,result}=journal.value;
  const patch=(key:keyof HttpRequest,value:string)=>{journal.dispatch({type:'patch',field:key,value});};
  function send(){journal.dispatch({type:'send'});}
  return <section className="web-tool" aria-label="Explorador HTTP"><header className="web-tool-heading"><div><span className="eyebrow">SIMULAÇÃO LOCAL · SEM CHAMADAS REAIS</span><h2>Explorador HTTP</h2></div><button className="button secondary" onClick={journal.reset}>Reiniciar API</button></header>
    <div className="web-toolbar"><label>Método<select value={request.method} onChange={e=>patch('method',e.target.value)}>{methods.map(m=><option key={m}>{m}</option>)}</select></label><label className="web-grow">Endpoint<input value={request.endpoint} onChange={e=>patch('endpoint',e.target.value)}/></label><button className="button primary" onClick={send}>Enviar simulação</button></div>
    <div className="web-columns"><label>Headers (Nome: valor)<textarea rows={4} value={request.headers} onChange={e=>patch('headers',e.target.value)} spellCheck={false}/></label><label>Body JSON<textarea rows={4} value={request.body} onChange={e=>patch('body',e.target.value)} spellCheck={false} placeholder={'{"title":"Livro","author":"Ana"}'}/></label></div>
    <label>Cenário HTTP/rede<select value={request.scenario} onChange={e=>patch('scenario',e.target.value)}>{scenarios.map(s=><option key={s}>{s}</option>)}</select></label>
    <p className="small muted">Rotas locais: /books, /books/1, /session (POST/DELETE), /private, /get e /post. Para preflight permitido, use Origin: https://academy.example. Cookies são dados fictícios do modelo, nunca cookies do navegador.</p>
    {journal.error&&<p role="alert">{journal.error}</p>}{result&&<div className="web-output" aria-live="polite"><h3>{result.kind==='http'?`HTTP ${result.status}`:result.kind==='blocked'?'Leitura bloqueada por CORS':'Falha de rede · sem status HTTP'}</h3><p>{result.explanation}</p><div className="web-columns"><div><h4>Headers da resposta</h4><pre>{Object.entries(result.headers).map(([k,v])=>`${k}: ${v}`).join('\n')||'Nenhum header disponível.'}</pre></div><div><h4>Corpo da resposta</h4><pre>{result.body===null?'(sem corpo disponível)':JSON.stringify(result.body,null,2)}</pre></div></div><ol>{result.trace.map((line,i)=><li key={i}>{line}</li>)}</ol></div>}
  </section>;
}
