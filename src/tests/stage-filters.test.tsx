/** @vitest-environment jsdom */
import {describe,it,expect} from 'vitest';
import {render,screen,fireEvent} from '@testing-library/react';
import {activities,projects,matchesTrack} from '../practice/curriculum';
import {blankPilot,blankAttempt,type Pilot} from '../practice/progress';
import {resolveInitialStage,StageSelect} from '../practice/Shared';

describe('stage-filters and auto-selection priority',()=>{
 it('resolves stage by priority: URL > catalogStage > in-progress > first available',()=>{
  const basePilot=blankPilot();

  // Priority 1: valid URL stage
  expect(resolveInitialStage(undefined,'04',basePilot)).toBe('04');
  expect(resolveInitialStage('02',undefined,basePilot)).toBe('02');
  expect(resolveInitialStage('03','04',basePilot)).toBe('03');

  // Fallback when URL stage is invalid
  expect(resolveInitialStage(undefined,'99',basePilot)).toBe('00');
  expect(resolveInitialStage('invalida',undefined,basePilot)).toBe('00');

  // Priority 2: last selected stage by student (catalogStage)
  const pilotWithSaved:Pilot={...basePilot,catalogStage:'03'};
  expect(resolveInitialStage(undefined,undefined,pilotWithSaved)).toBe('03');
  // URL still overrides saved
  expect(resolveInitialStage(undefined,'01',pilotWithSaved)).toBe('01');
  // Invalid URL falls back to saved
  expect(resolveInitialStage(undefined,'invalido',pilotWithSaved)).toBe('03');

  // Priority 3: in-progress stage
  const pilotWithProgress:Pilot={
   ...basePilot,
   stageTracking:{'02':{status:'em-andamento',startedAt:'2026-10-18'}}
  };
  expect(resolveInitialStage(undefined,undefined,pilotWithProgress)).toBe('02');

  // Priority 4: first available stage ('00')
  expect(resolveInitialStage(undefined,undefined,basePilot)).toBe('00');
 });

 it('StageSelect renders all 20 roadmap stages without "Todas as etapas"',()=>{
  let selected='01';
  const {container}=render(<StageSelect value={selected} onChange={s=>selected=s}/>);
  const select=screen.getByRole('combobox',{name:/^Etapa selecionada/});
  expect(select).toBeDefined();

  const options=container.querySelectorAll('option');
  expect(options).toHaveLength(20);
  expect(container.querySelector('option[value="todos"]')).toBeNull();

  // Migrated stages 00-04 don't have (em preparação)
  expect(options[0].textContent).toContain('Etapa 00 — Pensamento computacional');
  expect(options[0].textContent).not.toContain('(em preparação)');
  expect(options[4].textContent).toContain('Etapa 04 — APIs REST');
  expect(options[4].textContent).not.toContain('(em preparação)');

  // Stage05 is published; stage06 remains in preparation
  expect(options[5].textContent).toContain('Etapa 05 — SQL, PostgreSQL');
  expect(options[5].textContent).not.toContain('(em preparação)');
  expect(options[19].textContent).toContain('(em preparação)');

  // Stage 19 exists
  expect(options[19].textContent).toContain('Etapa 19');
  expect(options[19].textContent).toContain('(em preparação)');

  // Change fires callback
  fireEvent.change(select,{target:{value:'03'}});
  expect(selected).toBe('03');
 });

 it('filtering activities by stage only shows activities of that stage',()=>{
  for(const stageId of ['00','01','02','03','04'] as const){
   const stageExercises=activities.filter(a=>a.stageId===stageId);
   expect(stageExercises.length).toBeGreaterThan(0);
   // None have different stageId
   expect(stageExercises.every(a=>a.stageId===stageId)).toBe(true);

   const stageProjects=projects.filter(p=>p.stageId===stageId);
   expect(stageProjects.length).toBeGreaterThan(0);
   expect(stageProjects.every(p=>p.stageId===stageId)).toBe(true);
  }
 });

 it('combines track, difficulty and status filters on Stage 03 and Stage 04',()=>{
  const stage04Exercises=activities.filter(a=>a.stageId==='04');
  expect(stage04Exercises).toHaveLength(9);

  // Common activities available for both tracks
  const phpMatches=stage04Exercises.filter(a=>matchesTrack(a.track,'php'));
  const tsMatches=stage04Exercises.filter(a=>matchesTrack(a.track,'javascript'));
  const common=stage04Exercises.filter(a=>!a.track||a.track==='comum'||a.track==='ambas');

  expect(common.length).toBeGreaterThan(0);
  for(const c of common){
   expect(phpMatches).toContain(c);
   expect(tsMatches).toContain(c);
  }

  // Intermediário exercises
  const interExercises=stage04Exercises.filter(a=>a.level==='intermediario');
  expect(interExercises.length).toBeGreaterThan(0);

  // Status simulation
  const p=blankPilot();
  p.attempts['04-ex-04']={...blankAttempt('04-ex-04'),status:'em-andamento'};
  p.attempts['04-ex-05']={...blankAttempt('04-ex-05'),status:'concluido'};

  const inProgress=stage04Exercises.filter(a=>p.attempts[a.id]?.status==='em-andamento');
  expect(inProgress).toHaveLength(1);
  expect(inProgress[0].id).toBe('04-ex-04');

  const completed=stage04Exercises.filter(a=>p.attempts[a.id]?.status==='concluido');
  expect(completed).toHaveLength(1);
  expect(completed[0].id).toBe('04-ex-05');

  const notStarted=stage04Exercises.filter(a=>(p.attempts[a.id]?.status??'novo')==='novo');
  expect(notStarted).toHaveLength(7);
 });
});
