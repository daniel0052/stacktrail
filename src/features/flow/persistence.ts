import { parseAlgorithm, allTestCases, type FlowChallenge, type FlowDraft } from './model';
import { testAlgorithm } from './interpreter';

export function parseFlowDraft(raw: unknown, challenge: FlowChallenge): FlowDraft {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Tentativa visual inválida.');
  const data = raw as Record<string, unknown>;
  const algorithm = parseAlgorithm(data.algorithm);
  if (!Array.isArray(data.results) || data.results.length > allTestCases(challenge).length) throw new Error('Resultados do fluxograma inválidos.');
  let inputValues: Record<string,string>|undefined;
  if(data.inputValues!==undefined){
    if(!data.inputValues||typeof data.inputValues!=='object'||Array.isArray(data.inputValues))throw new Error('Entradas salvas inválidas.');
    const entries=Object.entries(data.inputValues);const keys=challenge.variables.filter(v=>v.input).map(v=>v.name);
    if(entries.length>keys.length||entries.some(([key,value])=>!keys.includes(key)||typeof value!=='string'||value.length>20000))throw new Error('Entradas salvas inválidas.');
    inputValues=Object.fromEntries(entries) as Record<string,string>;
  }
  // Imported pass flags are never trusted. Recompute published cases when results exist.
  return { algorithm, results: data.results.length ? testAlgorithm(algorithm, challenge) : [], ...(inputValues?{inputValues}:{}) };
}
export function passedAll(draft: FlowDraft | undefined, challenge: FlowChallenge): boolean {
  return !!draft && draft.results.length === allTestCases(challenge).length && draft.results.every(r => r.passed);
}
