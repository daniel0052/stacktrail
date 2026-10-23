/** @vitest-environment jsdom */
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {agentPlatforms,configurationExamples,platformById,platformTree,toolkitReferences} from '../practice/agent-platforms';
import {conceptualTree,planningConceptGroups,planningCriteria,planningDocuments} from '../practice/project-planning-content';
import {projectPlanningPrompt} from '../practice/project-planning-prompts';
import {blankPlanningAttempt,blankToolkitProgress,canCompletePlanning,parseToolkitProgress,planningCheckIds,TOOLKIT_STORAGE_KEY,updatePlanningAttempt} from '../practice/toolkit-progress';
import {ProjectPlanningPage} from '../practice/ProjectPlanningPage';
import {toolkitTools} from '../practice/AIDevelopmentToolkitPage';
beforeEach(()=>{localStorage.clear();HTMLElement.prototype.scrollIntoView=vi.fn();});
afterEach(()=>{cleanup();vi.restoreAllMocks();});
describe('Project Planning: conteúdo, fontes e plataformas',()=>{
 it('publica ferramentas reais, sem senioridade ou ferramentas futuras vazias',()=>{expect(toolkitTools).toHaveLength(2);expect(toolkitTools[0].route).toBe('/ai-development-toolkit/project-planning');expect(platformById('unknown').id).toBe('codex');});
 it('cobre32 conceitos completos e documentos condicionais, sem solução de projeto',()=>{
  const all=planningConceptGroups.flatMap(g=>g.concepts);expect(all).toHaveLength(32);expect(new Set(all.map(c=>c.id)).size).toBe(32);for(const c of all){for(const field of ['definition','explanation','example','when','limitations','mistake'] as const)expect(c[field].length).toBeGreaterThan(10);expect(toolkitReferences.some(r=>r.id===c.source)).toBe(true);}
  expect(planningDocuments).toHaveLength(12);expect(planningDocuments.every(d=>d.purpose&&d.contents&&d.condition)).toBe(true);expect(conceptualTree).toContain('[agent-platform-configuration]');expect(planningCriteria).toHaveLength(planningCheckIds.length);
 });
 it('árvores usam caminhos reconhecidos e não criam categorias universais',()=>{
  const rulePaths=['AGENTS.md','CLAUDE.md','.cursor/rules/project.mdc','.github/copilot-instructions.md','GEMINI.md'];
  agentPlatforms.forEach((p,i)=>{const tree=platformTree(p,['rules','skills','workflows','commands','mcp']);expect(tree).toContain(rulePaths[i]);expect(tree).not.toContain('[agent-platform-configuration]');const skill=p.capabilities.find(c=>c.mechanism==='skills')!.path;expect(tree.split(skill)).toHaveLength(2);for(const c of p.capabilities)expect(toolkitReferences.some(r=>r.id===c.source)).toBe(true);});
  expect(agentPlatforms[3].name).toContain('Local harness');expect(agentPlatforms[3].capabilities.find(c=>c.mechanism==='hooks')!.example).toBe('');
  const antigravity=platformById('antigravity');expect(antigravity.name).toBe('Google Antigravity (Gemini)');expect(platformTree(antigravity,['rules','agents'])).toContain('.agents/agents/planning-reviewer.md');expect(antigravity.capabilities.find(c=>c.mechanism==='agents')!.example).toContain('tools: [view_file, grep_search]');
 });
 it('exemplos JSON são parseáveis; MCP de VS Code usa servers, outros mcpServers/config.toml',()=>{
  for(const p of agentPlatforms)for(const c of p.capabilities.filter(c=>c.path.endsWith('.json')&&c.example))expect(()=>JSON.parse(c.example)).not.toThrow();
  const vscode=agentPlatforms[3].capabilities.find(c=>c.mechanism==='mcp')!;expect(JSON.parse(vscode.example)).toHaveProperty('servers');expect(vscode.limitation).toContain('deprecated');
  const antigravity=agentPlatforms.find(p=>p.id==='antigravity')!;const samples=configurationExamples(antigravity,['rules','hooks','mcp']);const mcp=samples.find(c=>c.path==='.agents/mcp_config.json')!;expect(JSON.parse(mcp.example)).toHaveProperty('mcpServers.openaiDocs.serverUrl');expect(JSON.parse(mcp.example).mcpServers.openaiDocs.httpUrl).toBeUndefined();const hook=samples.find(c=>c.path==='.agents/hooks.json')!;expect(JSON.parse(hook.example)).toHaveProperty('planning-reminder.enabled',false);expect(JSON.parse(hook.example)).not.toHaveProperty('hooks');
 });
 it('prompts têm entrevista, aprovação, árvores e revisão por evidência para cada plataforma',()=>{
  for(const p of agentPlatforms){const planning=projectPlanningPrompt('planning',p,['rules','skills']);expect(planning).toContain('Comece APENAS perguntando');expect(planning).toContain('no máximo três perguntas');expect(planning).toContain('SOMENTE APÓS APROVAÇÃO');expect(planning).toContain('ASSUMPTION');expect(planning).toContain(conceptualTree);expect(planning).toContain(platformTree(p,['rules','skills']));expect(planning).toContain('não gere arquivos agora');
   const review=projectPlanningPrompt('review',p,['rules']);for(const term of ['arquivo e trecho','impacto','severidade','recomendação','decisão pendente','Não verificado','somente leitura'])expect(review).toContain(term);expect(review).toContain('Não altere Business Rules');
  }
 });
});
describe('Toolkit: persistência independente e critérios reais de estado',()=>{
 it('rejeita conclusão vazia, conclui com critérios e reabre ao editar, sem transferir plataforma',()=>{
  let p=blankToolkitProgress();p=updatePlanningAttempt(p,'codex',{status:'completed'});expect(p.plans.codex!.status).toBe('in-progress');p=updatePlanningAttempt(p,'codex',{evidence:'Síntese e evidência da revisão externa.'});p=updatePlanningAttempt(p,'codex',{checks:Object.fromEntries(planningCheckIds.map(id=>[id,true])),status:'completed'});expect(canCompletePlanning(p.plans.codex!)).toBe(true);expect(parseToolkitProgress(JSON.stringify(p))).toEqual(p);expect(p.plans.cursor).toBeUndefined();p=updatePlanningAttempt(p,'cursor',{status:'paused'});expect(p.plans.codex!.status).toBe('completed');p=updatePlanningAttempt(p,'codex',{evidence:'Revisão alterada'});expect(p.plans.codex!.checks).toEqual({});expect(p.plans.codex!.status).toBe('in-progress');
 });
 it('mudar mecanismos invalida autoavaliação e mantém evidência',()=>{let p=updatePlanningAttempt(blankToolkitProgress(),'codex',{evidence:'Minhas decisões',checks:{'problem-mvp':true}});p=updatePlanningAttempt(p,'codex',{mechanisms:['rules','skills']});expect(p.plans.codex!.evidence).toBe('Minhas decisões');expect(p.plans.codex!.checks).toEqual({});});
 it('filtra tipos/IDs/formatos inválidos e não aceita status array ou aprovação importada vazia',()=>{
  expect(()=>parseToolkitProgress('{"schema":99}')).toThrow();expect(()=>parseToolkitProgress('[]')).toThrow();const value={schema:1,selectedPlatform:'evil',plans:{evil:blankPlanningAttempt(),codex:{...blankPlanningAttempt(),status:'completed',checks:{unknown:true}},cursor:{...blankPlanningAttempt(),status:['completed']}}};const p=parseToolkitProgress(JSON.stringify(value));expect(p.selectedPlatform).toBe('codex');expect(p.plans.codex!.status).toBe('in-progress');expect(p.plans.cursor).toBeUndefined();expect(Object.keys(p.plans)).toEqual(['codex']);
 });
 it('pausa, retoma e recarrega sem alterar chaves existentes',()=>{
  for(const key of ['stacktrail:roadmap:1','stacktrail:ai-engineering:1','backend-academy:progress'])localStorage.setItem(key,'sentinela');
  const tree=()=> <MemoryRouter initialEntries={['/ai-development-toolkit/project-planning?view=practice']}><ProjectPlanningPage/></MemoryRouter>;
  const first=render(tree());fireEvent.click(screen.getByRole('button',{name:'Iniciar planejamento'}));fireEvent.change(screen.getByLabelText('Evidências e decisões do planejamento'),{target:{value:'Síntese autoral'}});fireEvent.click(screen.getByRole('button',{name:'Pausar planejamento'}));first.unmount();render(tree());expect(screen.getByLabelText('Evidências e decisões do planejamento')).toHaveProperty('value','Síntese autoral');fireEvent.click(screen.getByRole('button',{name:'Retomar planejamento'}));expect(screen.getByRole('button',{name:'Pausar planejamento'})).toBeTruthy();for(const key of ['stacktrail:roadmap:1','stacktrail:ai-engineering:1','backend-academy:progress'])expect(localStorage.getItem(key)).toBe('sentinela');
 });
 it('preserva esquema incompatível e mantém trabalho em memória com alerta',()=>{localStorage.setItem(TOOLKIT_STORAGE_KEY,'{"schema":99}');render(<MemoryRouter initialEntries={['/?view=practice']}><ProjectPlanningPage/></MemoryRouter>);fireEvent.change(screen.getByLabelText('Evidências e decisões do planejamento'),{target:{value:'Em memória'}});expect(screen.getByRole('alert').textContent).toContain('preservados');expect(localStorage.getItem(TOOLKIT_STORAGE_KEY)).toBe('{"schema":99}');});
 it('falha de escrita não perde a evidência',()=>{vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw Error('quota');});render(<MemoryRouter initialEntries={['/?view=practice']}><ProjectPlanningPage/></MemoryRouter>);fireEvent.change(screen.getByLabelText('Evidências e decisões do planejamento'),{target:{value:'Preservar'}});expect(screen.getByRole('alert').textContent).toContain('memória');expect(screen.getByLabelText('Evidências e decisões do planejamento')).toHaveProperty('value','Preservar');});
});
