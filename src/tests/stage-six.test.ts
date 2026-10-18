import {describe,it,expect} from 'vitest';
import {getStage,activities,projects,books} from '../practice/curriculum';
import {blankPilot,blankAttempt,parsePilot,updateAttempt,updateStageStatus,type Pilot} from '../practice/progress';
import {stageProgress,dashboard} from '../practice/achievements';
import {promptFor} from '../practice/prompts';

const finish=(p:Pilot,id:string)=>{
  const a=blankAttempt(id);
  p.attempts[id]={
    ...a,
    status:'concluido',
    solution:'Evidência sintética de teste automatizado e depuração',
    checks:a.checks.map(()=>true)
  };
};

function prepared(track:Pilot['track']){
  const p=blankPilot();
  p.track=track;
  const s=getStage('06',track)!;
  p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);
  for(const a of s.exercises.filter(e=>!e.optional))finish(p,a.id);
  p.stageEvidence['06']='Síntese declarada de testes automatizados, depuração e evidências de regressão';
  return p;
}

describe('Etapa06: testes automatizados, depuração e invariantes de progresso',()=>{
  it('mantém fundamentos comuns, 9 setores e isolamento estrito entre trilhas PHP e TypeScript',()=>{
    for(const track of ['php','javascript'] as const){
      const s=getStage('06',track)!;
      // 10 tópicos obrigatórios (7 comuns + 3 da stack)
      expect(s.topics.filter(t=>!t.optional)).toHaveLength(10);
      expect(s.exercises).toHaveLength(9);
      expect(s.topics.filter(t=>t.track===track)).toHaveLength(3);
      expect(s.topics.some(t=>t.track===(track==='php'?'javascript':'php'))).toBe(false);
    }
    const list=activities.filter(a=>a.stageId==='06');
    expect(list).toHaveLength(9);
    expect(new Set(list.map(a=>a.sector)).size).toBe(9);
    for(const level of ['inicial','intermediario','avancado']){
      expect(list.filter(a=>a.level===level)).toHaveLength(3);
    }
    expect(projects.filter(a=>a.stageId==='06')).toHaveLength(3);
  });

  it.each(['php','javascript'] as const)('conclui a etapa com Bug Hunt (%s) e reverte ao editar tentativa',track=>{
    const p=prepared(track);
    // Sem o projeto principal concluído, a etapa não está concluída
    expect(stageProgress(p,'06').done).toBe(false);
    
    // Conclui o projeto principal Bug Hunt & Regression Portfolio
    finish(p,'06-project-bug-hunt');
    expect(stageProgress(p,'06')).toMatchObject({done:true,percent:100,total:20});

    // Salva e recarrega via parsePilot
    const loaded=parsePilot(JSON.parse(JSON.stringify(p)));
    expect(stageProgress(loaded,'06').done).toBe(true);

    // Editar solução invalida checks e reverte conclusão
    loaded.attempts['06-project-bug-hunt']=updateAttempt(loaded.attempts['06-project-bug-hunt'],{solution:'código alterado'});
    expect(stageProgress(loaded,'06').done).toBe(false);
    expect(dashboard(loaded).achievements.find(a=>a.id==='first-stage')?.earned).toBe(false);
  });

  it('projetos opcionais (Testing Kata e API Quality Lab) não substituem Bug Hunt; pausar e trocar trilha preservam estado',()=>{
    const p=prepared('php');
    finish(p,'06-project-testing-kata');
    finish(p,'06-project-api-quality-lab');
    expect(stageProgress(p,'06').done).toBe(false);

    p.stageTracking['06']=updateStageStatus(undefined,'em-andamento');
    p.stageTracking['06']=updateStageStatus(p.stageTracking['06'],'pausada');
    const serialized=JSON.stringify(p.attempts);
    expect(stageProgress(p,'06').paused).toBe(true);

    p.track='javascript';
    expect(JSON.stringify(p.attempts)).toBe(serialized);
    expect(stageProgress(p,'06').coreTopics).toBe(10);
    // Tópicos comuns estudados permanecem contados (7 comuns)
    expect(stageProgress(p,'06').topics).toBe(7);

    p.track='php';
    p.stageTracking['06']=updateStageStatus(p.stageTracking['06'],'em-andamento');
    expect(stageProgress(p,'06').topics).toBe(10);
  });

  it('valida persistência do pilot com Etapa 06 e rejeita etapas futuras inexistentes',()=>{
    const old=blankPilot();
    const raw=JSON.parse(JSON.stringify(old));
    delete raw.stageEvidence['06'];
    raw.attempts['06-ex-01']={...blankAttempt('06-ex-01'),solution:'anotações do teste de desconto'};

    const parsed=parsePilot(raw);
    expect(parsed.stageEvidence['06']).toBe('');
    expect(parsed.attempts['06-ex-01'].solution).toBe('anotações do teste de desconto');

    expect(()=>parsePilot({...parsed,stageEvidence:{...parsed.stageEvidence,'06':true}})).toThrow();
    expect(()=>parsePilot({...parsed,currentStage:'19'})).toThrow();
    expect(stageProgress(parsed,'19').available).toBe(false);
  });

  it('prompts incluem stack correta, setor, dicas graduais e rubricas objetivas',()=>{
    const task=activities.find(a=>a.id==='06-ex-05')!; // Marketplace PostgreSQL
    for(const track of ['php','javascript'] as const){
      const a={...blankAttempt(task.id),hints:1};
      const help=promptFor('help',task,a,track);
      expect(help).toContain('Etapa: 06');
      expect(help).toContain('Setor: Marketplace');
      expect(help).toContain(task.hints[0]);
      expect(help).not.toContain(task.hints[1]);
      expect(help).toContain(track==='php'?'PHP + Laravel':'TypeScript + Node.js + Express');
      
      const review=promptFor('review',task,a,track);
      expect(review).toContain('PostgreSQL');
      expect(review).toContain('Não invente execução');
      expect(review).toContain('Não verificado');
    }
  });

  it('livros de testes são opcionais com alternativas gratuitas e metadados honestos de capa',()=>{
    const list=books.filter(b=>b.stages.includes('06'));
    expect(list).toHaveLength(3);
    expect(list.every(b=>b.alternatives.length>0)).toBe(true);
    
    // Fowler: capa WebP verificada do catálogo Novatec
    const fowler=list.find(b=>b.id==='book-06-refatoracao');
    expect(fowler).toBeDefined();
    expect(fowler?.cover.kind).toBe('image');
    expect(fowler?.cover.src).toBe('covers/refatoracao-2ed.webp');

    // Todas as capas agora são assets locais; não introduzir hotlinks.
    expect(list.every(b=>b.cover.kind==='image' && /^covers\/[a-z0-9-]+\.webp$/.test(b.cover.src??''))).toBe(true);
  });
});
