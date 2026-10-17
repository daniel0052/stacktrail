import {it,expect} from 'vitest';
import {newGit,actGit,type GitState} from '../features/web/git';
const act=(s:GitState,a:string,b='')=>actGit(s,a,b).state;
function divergent(){let s=newGit();s=act(s,'branch','equipe');s=act(s,'edit','Guia local');s=act(s,'add');s=act(s,'commit','local');s=act(s,'switch','equipe');s=act(s,'edit','Guia da equipe');s=act(s,'add');s=act(s,'commit','equipe');return act(s,'switch','main');}
it('stage é snapshot, branch só aponta e merge conflitante exige resolução',()=>{
 let s=newGit();s=act(s,'edit','A');s=act(s,'add');s=act(s,'edit','B');s=act(s,'commit','snapshot');expect(s.commits.at(-1)?.content).toBe('A');expect(s.work).toBe('B');
 s=divergent();s=act(s,'merge','equipe');expect(s.conflict?.mode).toBe('merge');expect(actGit(s,'commit','sem add').state).toEqual(s);s=act(s,'edit','Guia local e equipe');s=act(s,'add');s=act(s,'commit','resolve');expect(s.commits.at(-1)?.parents).toHaveLength(2);expect(s.conflict).toBeNull();
});
it('rebase reaplica com nova identidade e permite resolver conflito',()=>{
 let s=divergent();const old=s.branches.main;s=act(s,'rebase','equipe');expect(s.conflict?.mode).toBe('rebase');s=act(s,'edit','Guia reconciliado');s=act(s,'add');s=act(s,'continue-rebase');expect(s.conflict).toBeNull();expect(s.branches.main).not.toBe(old);expect(s.commits.find(c=>c.id===s.branches.main)?.parents).toEqual([s.branches.equipe]);
});
it('fetch não integra, pull integra e push recusa divergência',()=>{
 let s=newGit();s=act(s,'remote-change','Equipe');const before=s.branches.main;expect(actGit(s,'push').message).toContain('recusado');s=act(s,'fetch');expect(s.tracking).toBe(s.remote);expect(s.branches.main).toBe(before);s=act(s,'pull');expect(s.branches.main).toBe(s.remote);s=act(s,'pr','Testes externos pendentes');expect(s.pr).toContain('pendentes');expect(newGit().pr).toBe('');
});

it('restore recupera o snapshot preparado sem apagar staging nem modificar HEAD',()=>{
 let state=newGit();const head=state.branches.main;
 state=act(state,'edit','Versão A');state=act(state,'add');state=act(state,'edit','Versão B');state=act(state,'restore');
 expect(state.work).toBe('Versão A');expect(state.staged).toBe('Versão A');expect(state.branches.main).toBe(head);
 state=act(state,'commit','A preparada');expect(state.commits.at(-1)?.content).toBe('Versão A');
 state=act(state,'edit','Não preparada');state=act(state,'restore');expect(state.work).toBe('Versão A');expect(state.staged).toBeNull();
});
