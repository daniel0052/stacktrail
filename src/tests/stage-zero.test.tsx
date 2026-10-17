// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { exercises } from '../content/stage-00/exercises';
import { lessons, selfAssessment, lessonKey } from '../content/stage-00';
import { validateExercises } from '../content/stage-01/types';
import { newProgress, newExerciseProgress, newNotebook, parseProgress, STORAGE_KEY, stageSummary, updateExercise, validPath } from '../features/progress/model';
import { getStageStatus, journeySummary } from '../features/progress/roadmap';
import { ProgressProvider } from '../features/progress/ProgressProvider';
import { LabPage } from '../components/lab/Lab';
import { Assessment } from '../app/Assessment';
import { reviewPrompt } from '../components/lab/reviewPrompt';
import { flowChallenges } from '../content/stage-00/flow-challenges';
import { testAlgorithm } from '../features/flow/interpreter';
import { solutions } from './flow-fixtures';
import { installDialogStub } from './dialogStub';
function mount(slug: string) {
  return render(<MemoryRouter initialEntries={[`/etapas/00/laboratorio/${slug}`]}><ProgressProvider><Routes><Route path="/etapas/00/laboratorio/:slug" element={<LabPage stageId="00"/>}/></Routes></ProgressProvider></MemoryRouter>);
}
beforeEach(() => { localStorage.clear(); installDialogStub(); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('Etapa 00 e isolamento de progresso', () => {
  it('revela casos do laboratório visual somente após verificar a tentativa',()=>{
    mount('integrador');
    const idea=exercises.find(exercise=>exercise.slug==='integrador')!.testIdeas[0];
    expect(screen.queryByText(idea)).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Verificar solução'}));
    expect(screen.getByText(idea)).toBeTruthy();
  });
  it('valida inventário e contratos de entradas/saídas', () => {
    expect(lessons.length).toBeGreaterThanOrEqual(19);
    expect(exercises.filter(e => e.id !== '00-ex-01').length / exercises.length).toBeGreaterThan(.9);
    expect(validateExercises(exercises)).toBe(true);
    expect(exercises.filter(e => e.optional).every(e => e.level === 'avancado')).toBe(true);
    for (const level of ['inicial','intermediario','avancado']) expect(exercises.filter(e => e.level === level).length).toBeGreaterThanOrEqual(3);
    expect(validateExercises(exercises.map(e => ({ ...e, problem: undefined })))).toBe(false);
    expect(validateExercises(exercises.map(e => ({ ...e, problem: { ...e.problem!, examples: [] } })))).toBe(false);
  });
  it('migra v2 real preservando dados da Etapa 01 e criando caderno vazio', () => {
    const legacy = { version: 2, lessons: ['html'], exercises: { 'ex-01': { status: 'em-andamento', solution: 'antigo\n  indentado', reflection: 'dúvida', hints: 2, checks: [true,false,true,false] } }, assessment: Array(8).fill(false), lastPath: '/laboratorio/contato', theme: 'light', fontSize: 140 };
    const next = parseProgress(JSON.stringify(legacy));
    expect(next.version).toBe(5);
    expect(next.exercises['ex-01']).toEqual({ ...legacy.exercises['ex-01'], notebook: newNotebook() });
    expect(next.lessons).toEqual(['html']); expect(next.lastPath).toBe(legacy.lastPath); expect(next.fontSize).toBe(140); expect(next.theme).toBe('light');
    expect(next.assessment00.every(v => !v)).toBe(true); expect(next.evidence00.every(v => !v)).toBe(true);
  });
  it('não conclui por leitura/opcionais/checklist sem evidências; seis obrigatórios e evidências bastam', () => {
    let p = newProgress(); p.lessons = lessons.map(l => lessonKey(l.id)); p.assessment00.fill(true);
    for (const e of exercises.filter(e => e.optional)) p = updateExercise(p,e.id,{status:'concluido',checks:e.acceptanceCriteria.map(()=>true)});
    expect(stageSummary(p,'00').ready).toBe(false);
    for (const e of exercises.filter(e => !e.optional)) { const c=flowChallenges[e.id]; if(c) p=updateExercise(p,e.id,{flow:{algorithm:solutions[e.id],results:testAlgorithm(solutions[e.id],c)}}); p = updateExercise(p,e.id,{status:'concluido',checks:e.acceptanceCriteria.map(()=>true)}); }
    expect(stageSummary(p,'00').ready).toBe(false);
    p.evidence00 = selfAssessment.map((_,i)=>`Evidência ${i+1}: teste e explicação`);
    expect(stageSummary(p,'00')).toMatchObject({ready:true,percent:100}); expect(getStageStatus(p,'01')).toBe('novo'); expect(journeySummary(p).currentId).toBe('01');
    p.evidence00[0]='  '; expect(stageSummary(p,'00').ready).toBe(false);
  });
  it('caderno inicia só sua etapa e importação rejeita linhas/dados inválidos', () => {
    const p=updateExercise(newProgress(), exercises[0].id, {notebook:{...newNotebook(),inputs:'lista',trace:[{step:'1',values:'i=0',decision:'continuar'}]}});
    expect(getStageStatus(p,'00')).toBe('em-andamento'); expect(getStageStatus(p,'01')).toBe('novo'); expect(parseProgress(JSON.stringify(p))).toEqual(p);
    for (const trace of [[{step:1,values:'',decision:''}],Array(101).fill({step:'',values:'',decision:''})]) expect(()=>parseProgress(JSON.stringify({...p,exercises:{[exercises[0].id]:{...p.exercises[exercises[0].id],notebook:{...newNotebook(),trace}}}}))).toThrow(/Caderno/);
    expect(()=>parseProgress(JSON.stringify({...p,evidence00:['x']}))).toThrow();
    expect(validPath('/etapas/00/aulas/fluxogramas')).toBe(true); expect(validPath('/etapas/00/laboratorio/rotas')).toBe(true); expect(validPath('/etapas/00/aulas/falso')).toBe(false);
  });
});
describe('Nove laboratórios completos', () => {
  it.each(exercises.filter(e => e.id === '00-ex-01'))('$title: dicas, salvamento, recuperação, checklist e prompt', async exercise => {
    let view=mount(exercise.slug);
    expect(screen.getByRole('heading',{name:'Enunciado'})).toBeTruthy(); expect(screen.getByRole('heading',{name:'Critérios de aceitação'})).toBeTruthy();
    expect(screen.getAllByText(exercise.problem!.examples[0].output,{exact:false, selector:'.callout p'}).length).toBeGreaterThan(0);
    for(let i=0;i<3;i++) {
      expect(screen.queryByText(exercise.hints[i])).toBeNull();
      fireEvent.click(screen.getByRole('button',{name:`Mostrar dica ${i+1}`})); expect(screen.getByText(exercise.hints[i])).toBeTruthy();
    }
    fireEvent.change(screen.getByLabelText('Pseudocódigo e raciocínio da solução'),{target:{value:'INÍCIO\n  tentar\nFIM'}});
    fireEvent.change(screen.getByLabelText('Entradas da minha modelagem'),{target:{value:'minha entrada'}});
    fireEvent.change(screen.getByLabelText('Casos de teste: entrada, esperado, observado e método'),{target:{value:'vazio → resultado definido; manual'}});
    fireEvent.click(screen.getByRole('button',{name:'Adicionar passo ao teste de mesa'}));
    fireEvent.change(screen.getByLabelText('Valores da linha 1'),{target:{value:'total=0'}});
    view.unmount(); view=mount(exercise.slug);
    expect((screen.getByLabelText('Pseudocódigo e raciocínio da solução') as HTMLTextAreaElement).value).toBe('INÍCIO\n  tentar\nFIM');
    expect((screen.getByLabelText('Valores da linha 1') as HTMLTextAreaElement).value).toBe('total=0');
    expect(screen.queryByRole('button',{name:/Mostrar dica/})).toBeNull();
    const complete=screen.getByRole('button',{name:'Marcar como concluído'}) as HTMLButtonElement; expect(complete.disabled).toBe(true);
    for(const criterion of exercise.acceptanceCriteria) fireEvent.click(screen.getByRole('checkbox',{name:criterion}));
    fireEvent.click(complete); expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises[exercise.id].status).toBe('concluido');
    fireEvent.click(screen.getByRole('button',{name:'Avaliar com IA'}));
    const prompt=(screen.getByLabelText('Prompt de avaliação (editável)') as HTMLTextAreaElement).value;
    expect(prompt).toContain('Etapa 00'); expect(prompt).toContain(exercise.statement); expect(prompt).toContain('minha entrada'); expect(prompt).toContain('total=0'); expect(prompt).toContain('decomposição'); expect(prompt).toContain('Não entregue solução pronta');
    expect(prompt).toContain(exercise.problem!.constraints[0]); expect(prompt).not.toContain('30%');
    view.unmount();
  });
  it('copia solução e caderno sem enviar para IA; remove linhas manualmente', async () => {
    const writeText=vi.fn().mockResolvedValue(undefined); Object.defineProperty(navigator,'clipboard',{value:{writeText},configurable:true});
    mount(exercises[0].slug); fireEvent.change(screen.getByLabelText('Pseudocódigo e raciocínio da solução'),{target:{value:'minha tentativa'}});
    fireEvent.change(screen.getByLabelText('Restrições e hipóteses'),{target:{value:'sem duplicados'}});
    fireEvent.click(screen.getByRole('button',{name:'Adicionar passo ao teste de mesa'})); fireEvent.click(screen.getByRole('button',{name:'Remover linha 1'}));
    expect(screen.queryByLabelText('Passo da linha 1')).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Copiar solução e caderno'})); await screen.findByText('Copiado!');
    expect(writeText.mock.calls[0][0]).toContain('minha tentativa'); expect(writeText.mock.calls[0][0]).toContain('sem duplicados');
  });
  it('campos de evidência persistem na autoavaliação e não alteram a etapa 01', () => {
    render(<MemoryRouter><ProgressProvider><Assessment stageId="00"/></ProgressProvider></MemoryRouter>);
    fireEvent.click(screen.getByRole('checkbox',{name:selfAssessment[0]})); fireEvent.change(screen.getByLabelText('Evidência declarada para competência 1'),{target:{value:'Expliquei os pilares no exercício 1'}});
    const p=parseProgress(localStorage.getItem(STORAGE_KEY)!); expect(p.assessment00[0]).toBe(true); expect(p.evidence00[0]).toContain('pilares'); expect(p.assessment.every(v=>!v)).toBe(true);
  });
  it('o protocolo da etapa 00 não exige stack da etapa 01', () => {
    const prompt=reviewPrompt(exercises[0],'',''); expect(prompt).not.toContain('Confira HTML'); expect(prompt).toContain('não exija interface web');
    expect(newExerciseProgress(4).notebook.trace).toEqual([]);
  });
});
