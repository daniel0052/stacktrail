import { type FlowChallenge } from '../../features/flow/model';
export function FlowContract({challenge}:{challenge:FlowChallenge}){
 return <section className="flow-lesson-contract" aria-label="Enunciado da prática"><h4>Objetivo da prática</h4><ul>{challenge.rules.map(rule=><li key={rule}>{rule}</li>)}</ul><p className="small muted">Escolha suas variáveis e organize sua solução. Use a execução para experimentar valores e conferir o resultado.</p></section>;
}
