import { useLessonPracticeScope } from './LessonPracticeScope';
import { FlowContract } from './FlowContract';
import { useState } from 'react';
import { FlowEditor } from '../flow/FlowEditor';
import { ExecutionPanel } from '../flow/ExecutionPanel';
import { parseFlowDraft } from '../../features/flow/persistence';
import { blankAlgorithm, type FlowChallenge, type Algorithm, type FlowDraft } from '../../features/flow/model';
import { practiceSeed, practiceInstruction } from '../../content/stage-00/practice-seeds';
import { curriculumTasks } from '../../content/stage-00/deep-curriculum';

type Mode = 'completar' | 'corrigir' | 'construir';
export function PracticeEditor({ challenge, solution, mode }: { challenge: FlowChallenge; solution: Algorithm; mode: Mode }) {
  const scope=useLessonPracticeScope();
  const storageKey=`stacktrail:practice:1:${scope?`${scope}:`:''}${challenge.id}:${mode}`;
  return <PracticeEditorState key={storageKey} challenge={challenge} solution={solution} mode={mode} storageKey={storageKey}/>;
}
function PracticeEditorState({challenge,solution,mode,storageKey:key}:{challenge:FlowChallenge;solution:Algorithm;mode:Mode;storageKey:string}){
  const initial = (): FlowDraft => {
    const a = structuredClone(solution);
    if(mode!=='construir') return {algorithm:practiceSeed(solution,challenge.id,mode).algorithm,results:[]};
    if (mode === 'construir') { const blank = blankAlgorithm(); blank.functions = a.functions?.map(f => ({ ...f, algorithm: { version: 1, nodes: [{id:'inicio',kind:'start',x:140,y:20},{id:'retornar',kind:'return',x:140,y:180,...(f.returnType ? { expression: {op:'copy' as const,a:{kind:'literal' as const,value:0}} } : {})}],edges:[] } })); return { algorithm:blank,results:[] }; }
    return {algorithm:a,results:[]};
  };
  const [storageMessage,setStorageMessage] = useState('Rascunho salvo somente neste dispositivo; não sincroniza.');
  const [draft,setDraft] = useState<FlowDraft>(() => { try { const saved = localStorage.getItem(key); return saved ? parseFlowDraft(JSON.parse(saved),challenge) : initial(); } catch { return initial(); } });
  return <section className="lesson-visual"><h3>{mode === 'completar' ? '1 · Completar conexões' : mode === 'corrigir' ? '2 · Corrigir uma tentativa' : '3 · Construir sem blocos prontos'}</h3><p>{mode !== 'construir' ? practiceInstruction(challenge.id,mode) : 'Use o objetivo da prática para construir seu algoritmo. Nas funções, as assinaturas permanecem, mas o corpo deve ser construído.'}</p><p className="small muted">Um rascunho recuperado pode ser anterior à variante didática atual. Ele será preservado até você decidir recomeçar.</p><details><summary>Recomeçar esta prática</summary><p>Substitui apenas o rascunho desta aula e deste modo pela proposta atual. Copie suas anotações antes de continuar.</p><button type="button" onClick={()=>{const next=initial();setDraft(next);try{localStorage.setItem(key,JSON.stringify(next));setStorageMessage('Prática reiniciada e salva neste dispositivo.');}catch{setStorageMessage('Prática reiniciada, mas não foi possível salvar.');}}}>Substituir rascunho pela proposta atual</button></details><FlowContract challenge={challenge}/><h4>Critérios de aceitação</h4><ul><li>Conexões completas e resultados que atendam ao objetivo da prática.</li><li>Explique o estado antes e depois de uma decisão e teste o caso-limite.</li>{solution.functions?.length&&<li>Nas chamadas, confira argumentos, escopo e retorno na pilha.</li>}</ul><FlowEditor challenge={challenge} value={draft} storageMessage={storageMessage} onChange={next => { setDraft(next); try { localStorage.setItem(key,JSON.stringify(next)); setStorageMessage('Rascunho salvo neste dispositivo.'); } catch { setStorageMessage('Não foi possível salvar: mantenha esta aba aberta.'); } }}/></section>;
}
export function FlowPractice({ slug, phase = 'all' }: { slug: string; phase?: 'demo' | Mode | 'all' }) {
  const task = curriculumTasks.find(t => t.slug === slug);
  if (!task) return <p role="alert">Atividade não encontrada.</p>;
  return <>{(phase === 'all' || phase === 'demo') && <section className="lesson-visual"><p className="eyebrow">DEMONSTRAÇÃO · ELABORAÇÃO DIDÁTICA</p><h3>Exemplo resolvido: {task.title}</h3><p>{task.explanation}</p><p><strong>Invariante:</strong> {task.invariant}</p><p>Antes de avançar um bloco, preveja quais valores mudarão. Compare sua previsão com as variáveis exibidas.</p><FlowContract challenge={task.challenge}/><ExecutionPanel key={slug} algorithm={task.solution} challenge={task.challenge}/></section>}{(['completar','corrigir','construir'] as const).filter(m => phase === 'all' || phase === m).map(mode => <PracticeEditor key={`${slug}:${mode}`} challenge={task.challenge} solution={task.solution} mode={mode}/>)}</>;
}
