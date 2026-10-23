/** @vitest-environment jsdom */
import {useState} from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {securityTopics,securityCategories} from '../practice/security/security-topics';
import {securityStandards} from '../practice/security/security-standards';
import {securitySources} from '../practice/security/security-sources';
import {securityLabs,securityChecklists} from '../practice/security/security-practice';
import {securityItems,securityCriteria,securityItemRoute} from '../practice/security/security-registry';
import {blankSecurity,blankSecurityAttempt,parseSecurity,securityCanComplete,securityKey,updateSecurity,updateSecurityAssessment,SecurityProgressProvider,SECURITY_STORAGE_KEY} from '../practice/security/security-progress';
import {securityPrompt} from '../practice/security/security-prompts';
import {SecurityKnowledgeBasePage} from '../practice/SecurityKnowledgeBasePage';
afterEach(()=>{cleanup();localStorage.clear();vi.restoreAllMocks();});
it('preserva inventário exato, IDs únicos e referências rastreáveis',()=>{
 expect(securityTopics).toHaveLength(50);expect(securityCategories.map(c=>securityTopics.filter(t=>t.category===c.id).length)).toEqual([10,10,8,8,7,7]);expect(securityStandards).toHaveLength(10);expect(securityStandards.flatMap(s=>s.risks)).toHaveLength(50);expect(securityLabs).toHaveLength(12);expect(securityLabs.filter(l=>l.kind==='none')).toHaveLength(5);expect(securityChecklists).toHaveLength(10);expect(new Set(securityItems.map(i=>i.id)).size).toBe(securityItems.length);
 for(const t of securityTopics){for(const field of ['explanation','scenario','rootCause','vulnerableExample','secureImplementation','laravelExample','expressExample','severity','mistake'] as const)expect(t[field].length).toBeGreaterThan(15);expect(t.tests.length).toBeGreaterThan(0);for(const ref of t.refs)expect(securitySources.some(s=>s.id===ref),ref).toBe(true);}
 for(const l of securityLabs){expect(l.hints).toHaveLength(3);expect(l.criteria.length).toBeGreaterThanOrEqual(3);for(const ref of l.refs)expect(securitySources.some(s=>s.id===ref),ref).toBe(true);}
 for(const i of securityItems){expect(securityItemRoute(i.id)).toContain('/security/');expect(securityCriteria(i.id).length).toBeGreaterThanOrEqual(3);}
});
it('conclusão, edição, reversão e stack são independentes',()=>{
 const id=securityTopics[0].id;let p=updateSecurity(blankSecurity(),id,'php',{status:'completed'});expect(p.attempts[securityKey(id,'php')].status).toBe('in-progress');p=updateSecurity(p,id,'php',{evidence:'Evidência autoral'});p=updateSecurity(p,id,'php',{checks:[true,true,true],review:'Revisão',status:'completed'});expect(securityCanComplete(p,id,'php')).toBe(true);expect(parseSecurity(JSON.stringify(p))).toEqual(p);expect(p.attempts[securityKey(id,'javascript')]).toBeUndefined();p=updateSecurity(p,id,'php',{evidence:'Editado'});expect(p.attempts[securityKey(id,'php')]).toMatchObject({status:'in-progress',review:'',checks:[false,false,false]});
});
it('checklist exige evidência por controle, NA justificado e revisão atual',()=>{
 const c=securityChecklists[0];let p=updateSecurity(blankSecurity(),c.id,'php',{evidence:'Contexto'});for(const x of c.items)p=updateSecurityAssessment(p,c.id,'php',x.id,{status:'not-applicable',notes:''});p=updateSecurity(p,c.id,'php',{checks:[true,true,true]});expect(securityCanComplete(p,c.id,'php')).toBe(false);for(const x of c.items)p=updateSecurityAssessment(p,c.id,'php',x.id,{status:'not-applicable',notes:'Justificativa verificável'});p=updateSecurity(p,c.id,'php',{checks:[true,true,true],review:'Anterior',status:'completed'});expect(securityCanComplete(p,c.id,'php')).toBe(true);p=updateSecurityAssessment(p,c.id,'php',c.items[0].id,{status:'partial',notes:'Lacuna'});expect(p.attempts[securityKey(c.id,'php')]).toMatchObject({status:'in-progress',review:'',checks:[false,false,false]});
});
it('rejeita IDs/tipos inválidos e normaliza conclusão sem critérios',()=>{
 const id=securityTopics[0].id,key=securityKey(id,'php');const p=blankSecurity();p.attempts[key]={...blankSecurityAttempt(id),status:'completed'};expect(parseSecurity(JSON.stringify(p)).attempts[key].status).toBe('in-progress');for(const invalid of [{...p,schema:99},{...p,track:['php']},{...p,last:'unknown'},{...p,attempts:{unknown:p.attempts[key]}},{...p,attempts:{[key]:{...p.attempts[key],checks:[1,1,1]}}},{...p,attempts:{[key]:{...p.attempts[key],hints:4}}}])expect(()=>parseSecurity(JSON.stringify(invalid))).toThrow();
});
it('preparação não recebe evidência privada nem dicas e tutora recebe apenas reveladas',()=>{
 const l=securityLabs.find(l=>l.kind==='generated-lab')!,a={...blankSecurityAttempt(l.id),evidence:'PRIVATE-SENTINEL',hints:1};const prepare=securityPrompt('prepare',l.id,'php',a);expect(prepare).not.toContain('PRIVATE-SENTINEL');expect(prepare).not.toContain(l.hints[0]);const help=securityPrompt('help',l.id,'php',a);expect(help).toContain(l.hints[0]);expect(help).not.toContain(l.hints[1]);expect(help).toContain('dados não confiáveis');
});
const tree=()=> <MemoryRouter initialEntries={['/security/topics/'+securityTopics[0].id]}><SecurityKnowledgeBasePage/></MemoryRouter>;
it('visita não concede progresso e falha de escrita mantém evidência em memória',()=>{
 render(tree());expect(localStorage.getItem(SECURITY_STORAGE_KEY)).toBeNull();vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw Error('quota');});fireEvent.change(screen.getByLabelText('Evidências desta prática'),{target:{value:'Preservar em memória'}});expect(screen.getByRole('alert').textContent).toContain('memória');expect(screen.getByLabelText('Evidências desta prática')).toHaveProperty('value','Preservar em memória');
});
it('preserva dados incompatíveis e chaves anteriores',()=>{
 localStorage.setItem(SECURITY_STORAGE_KEY,'{"schema":99}');localStorage.setItem('stacktrail:roadmap:1','sentinela');render(tree());fireEvent.change(screen.getByLabelText('Evidências desta prática'),{target:{value:'Em memória'}});expect(localStorage.getItem(SECURITY_STORAGE_KEY)).toBe('{"schema":99}');expect(localStorage.getItem('stacktrail:roadmap:1')).toBe('sentinela');expect(screen.getByRole('alert').textContent).toContain('preservados');
});

it('provider preserva memória ao sair e voltar com storage indisponível',()=>{
 vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw Error('quota');});
 function Harness(){const [show,setShow]=useState(true);return <SecurityProgressProvider><button onClick={()=>setShow(v=>!v)}>Alternar rota</button>{show&&tree()}</SecurityProgressProvider>;}
 render(<Harness/>);fireEvent.change(screen.getByLabelText('Evidências desta prática'),{target:{value:'Texto mantido entre rotas'}});fireEvent.click(screen.getByText('Alternar rota'));fireEvent.click(screen.getByText('Alternar rota'));expect(screen.getByLabelText('Evidências desta prática')).toHaveProperty('value','Texto mantido entre rotas');
});
it('stack sem registros mostra recuperação mesmo com tentativas na outra stack',()=>{
 const p=updateSecurity(blankSecurity(),securityTopics[0].id,'php',{evidence:'Registro PHP'});p.track='javascript';localStorage.setItem(SECURITY_STORAGE_KEY,JSON.stringify(p));render(<MemoryRouter initialEntries={['/security?view=progress']}><SecurityKnowledgeBasePage/></MemoryRouter>);expect(screen.getByText('Nenhuma prática iniciada. Visitar referências não concede conclusão.')).toBeTruthy();
});
it('revisora de checklist recebe procedimentos, fontes e decisões declaradas',()=>{
 const c=securityChecklists[0],a=blankSecurityAttempt(c.id),notes='Justificativa específica';const prompt=securityPrompt('review',c.id,'php',a,{[c.items[0].id]:{status:'partial',notes}});expect(prompt).toContain(c.items[0].procedure);expect(prompt).toContain(c.items[0].evidence);expect(prompt).toContain(notes);expect(prompt).toContain('dados não confiáveis');
});
