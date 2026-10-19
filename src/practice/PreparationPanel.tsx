import {useState} from 'react';
import type {Activity} from './curriculum';
import {preparationFor,starterEnvironment} from './preparation';

export function PreparationPanel({task,track,generate,selectTrack}:{task:Activity;track:'php'|'javascript';generate:()=>void;selectTrack:(track:'php'|'javascript')=>void}){
 const starter=preparationFor(task);const [own,setOwn]=useState(false);
 if(!starter)return null;const env=starterEnvironment(task,starter,track);
 return <section className="pf-panel pf-preparation" aria-labelledby="preparation-title">
  <p className="pf-kicker">{starter.type==='previous-project'?'CONTINUAÇÃO':'LABORATÓRIO GUIADO'}</p>
  <h2 id="preparation-title">Preparar ambiente de prática</h2>
  {task.track==='ambas'&&['backend','module','database'].includes(starter.environment)&&<label className="pf-field">Stack do laboratório<select value={track} onChange={e=>selectTrack(e.target.value as 'php'|'javascript')}><option value="php">{starter.environment==='module'?'PHP + Composer':'PHP + Laravel'}</option><option value="javascript">{starter.environment==='module'?'TypeScript + Node.js':'TypeScript + Node.js + Express'}</option></select></label>}
  <p>{starter.material}</p>
  <p className="pf-meta"><strong>Stack:</strong> {env.stack}. <strong>Requisitos locais:</strong> {env.local}</p>
  {starter.type==='previous-project'&&<p>Use seu repositório ou gere uma base anterior à atividade. Ter feito o projeto anterior não é uma condição para começar.</p>}
  <div className="pf-actions">{starter.type==='previous-project'&&<button className="pf-button" aria-expanded={own} aria-controls="own-project-guidance" onClick={()=>setOwn(v=>!v)}>Usar meu projeto</button>}<button className="pf-button" onClick={generate}>Gerar projeto-base com IA</button></div>
  {own&&<div id="own-project-guidance"><p><strong>Confira o ponto de partida:</strong> {starter.initial}</p><p>Trabalho desta atividade: {starter.studentWork} Faça uma cópia local de estudo. Se faltarem esses recursos, a base gerada é uma alternativa.</p></div>}
  <p className="pf-meta">Revise e copie o prompt para uma IA externa. Execute localmente seguindo o README gerado e confira o estado inicial antes de resolver. Preparar a base não inicia nem conclui a atividade.</p>
  {(starter.reproduction||starter.vulnerable||task.stageId==='07')&&<p className="pf-meta">A base contém limitações ou problemas intencionais para investigar. Use somente dados sintéticos e ambiente local; não publique uma base vulnerável em produção.</p>}
 </section>;
}
