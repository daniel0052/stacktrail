export type Exercise = {
  id: string;
  stageId: '00' | '01' | '02' | '03' | '04';
  slug: string;
  title: string;
  subject?: string;
  level: 'inicial' | 'intermediario' | 'avancado';
  optional: boolean;
  objectives: string[];
  prerequisites: string[];
  statement: string;
  requirements: string[];
  acceptanceCriteria: string[];
  hints: string[];
  testIdeas: string[];
  commonErrors?: string[];
  referenceUrls: string[];
  problem?: { inputs: string[]; outputs: string[]; constraints: string[]; examples: { input: string; output: string; explanation: string }[] };
};

export function validateExercises(value: unknown): value is Exercise[] {
  if (!Array.isArray(value) || value.length === 0 || (value.some(e => e?.stageId === '01') && value.length !== 9)) return false;
  const ids = new Set<string>();
  return value.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false;
    const e = item as Record<string, unknown>;
    if (typeof e.id !== 'string' || ids.has(e.id)) return false;
    ids.add(e.id);
    if (e.stageId === '00') {
      const p = e.problem as Exercise['problem'];
      if (!p || typeof p !== 'object' || !['inputs', 'outputs', 'constraints'].every(k => Array.isArray(p[k as 'inputs']) && p[k as 'inputs'].length > 0 && p[k as 'inputs'].every(v => typeof v === 'string' && v.length > 0))
        || !Array.isArray(p.examples) || p.examples.length === 0 || !p.examples.every(v => v && ['input', 'output', 'explanation'].every(k => typeof v[k as 'input'] === 'string' && v[k as 'input'].length > 0))) return false;
    }
    return (e.commonErrors === undefined || (Array.isArray(e.commonErrors) && e.commonErrors.length > 0 && e.commonErrors.every(v => typeof v === 'string' && v.length > 0))) && ['00', '01', '02', '03', '04'].includes(String(e.stageId)) && typeof e.optional === 'boolean'
      && ['inicial', 'intermediario', 'avancado'].includes(String(e.level))
      && ['slug', 'title', 'statement'].every(k => typeof e[k] === 'string' && e[k].length > 0)
      && ['objectives', 'prerequisites', 'requirements', 'acceptanceCriteria', 'hints', 'testIdeas', 'referenceUrls']
        .every(k => Array.isArray(e[k]) && e[k].length > 0 && e[k].every(v => typeof v === 'string' && v.length > 0))
      && Array.isArray(e.hints) && e.hints.length >= 3
      && Array.isArray(e.referenceUrls) && e.referenceUrls.every(u => typeof u === 'string' && u.startsWith('https://'));
  });
}
