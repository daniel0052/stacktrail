import {Link} from 'react-router-dom';
import {modules08,tasks08,kubernetesAlternative08} from './stage-eight';
import {usePilot} from './progress';
export function StageEightModules(){
 const {pilot}=usePilot();
 return <section className="pf-panel" aria-labelledby="modules08-title"><h2 id="modules08-title">Oito módulos, uma entrega progressiva</h2><p>Abra um módulo por vez para planejar seu estudo. Fontes externas ensinam; práticas e critérios orientam suas evidências.</p><div className="pf-modules08">{modules08.map(m=><details name="stage08-modules" key={m.id}><summary>{m.name}{pilot.studied.includes(m.id)?' · ✓ Estudo registrado':''}</summary><p>{m.goal}</p><p>{m.scope}</p><p><strong>Evidência:</strong> {m.criterion}</p><div className="pf-actions"><Link to={`/etapas/08/topicos/${m.id}`}>Objetivo e fontes</Link><Link to="/exercicios?etapa=08">Catálogo da etapa</Link>{m.id==='08-integracao'&&<Link to="/etapas/08/projeto">Projeto integrador</Link>}</div><ul>{m.exercises.map(n=>{const task=tasks08.find(t=>t.id===`08-ex-${n}`)!;return <li key={n}><Link to={`/etapas/08/exercicios/${task.slug}`}>{task.title}</Link></li>;})}</ul></details>)}</div><p className="pf-meta">{kubernetesAlternative08}</p><p><Link to={`/etapas/08/topicos/08-runtime-${pilot.track}`}>Runtime de produção da minha trilha →</Link></p></section>;
}
