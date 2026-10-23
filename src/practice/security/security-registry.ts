import {securityTopics} from './security-topics';
import {securityStandards} from './security-standards';
import {securityLabs,securityChecklists} from './security-practice';
export const securityItems=[...securityTopics.map(t=>({id:t.id,name:t.name,kind:'topic' as const})),...securityStandards.flatMap(s=>[{id:'security-standard-'+s.id,name:s.name,kind:'standard' as const},...s.risks.map(r=>({id:r.id,name:r.code+' — '+r.name,kind:'risk' as const}))]),...securityLabs.map(l=>({id:l.id,name:l.title,kind:'lab' as const})),...securityChecklists.map(c=>({id:c.id,name:c.name,kind:'checklist' as const}))];
export const securityItem=(id:string)=>securityItems.find(x=>x.id===id);
export function securityCriteria(id:string):string[]{
 const lab=securityLabs.find(x=>x.id===id);if(lab)return lab.criteria;
 const t=securityTopics.find(x=>x.id===id);if(t)return [`Distinguir ${t.name} no cenário descrito,relacionando ativo,fronteira e causa sem severidade universal.`,`Justificar o controle: ${t.secureImplementation}`,`Relacionar casos de verificação (${t.tests.join('; ')}),evidências e limites,sem alegar execução ausente.`];
 const risk=securityStandards.flatMap(s=>s.risks).find(x=>x.id===id);if(risk)return [`Distinguir ${risk.code} e o risco de outras listas e versões.`,`Defender controles e teste do cenário: ${risk.test}`,`Registrar observações,monitoramento e limites: ${risk.limitation}`];
 if(securityChecklists.some(c=>c.id===id))return ['Decisões de todos os controles têm procedimento,evidência e aplicabilidade justificada.','Controles aplicáveis atendidos e não aplicáveis justificados; lacunas/restrições documentadas.','Revisão e risco residual explícitos,sem afirmar conformidade ou sistema seguro por marcação.'];
 return ['Identificar edição,maturidade,escopo e limitações nas fontes oficiais.','Selecionar requisito/procedimento aplicável e ligar controle a teste e evidência,sem confundir guidance e norma.','Documentar resultado observado ou não execução,incerteza e risco residual,sem afirmar conformidade integral.'];
}
export function securityItemRoute(id:string){const item=securityItem(id);return item?'/security/'+({topic:'topics',standard:'standards',risk:'risks',lab:'labs',checklist:'checklists'}[item.kind])+'/'+id:'/security';}
