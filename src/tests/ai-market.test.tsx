/** @vitest-environment jsdom */
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {aiModules,aiPaths,aiPrompt} from '../practice/ai-engineering';
import {AI_STORAGE_KEY,aiPathStats,blankAIAttempt,emptyAIProgress,parseAIProgress,updateAIAttempt} from '../practice/ai-progress';
import {AIEngineeringPage} from '../practice/AIEngineeringPage';
import {MarketSkillsPage} from '../practice/MarketSkillsPage';
import {compareMarkets,filterMarketSkills,marketSkills,marketSources} from '../practice/market-skills';
import {BookCover,resolveAssetUrl} from '../practice/Shared';
import {books} from '../practice/curriculum';
import {licensedCoverSource} from '../practice/book-cover-policy';
afterEach(()=>{cleanup();vi.restoreAllMocks();localStorage.clear();});
describe('Engenharia com IA: estado declarado e isolado',()=>{
 it('exige evidência e critérios e reverte ao editar, preservando outra stack',()=>{
  let p=emptyAIProgress();p=updateAIAttempt(p,'ai-j1','php',{status:'done'});expect(p.attempts['ai-j1@php'].status).toBe('active');
  p=updateAIAttempt(p,'ai-j1','php',{evidence:'Fonte consultada, teste local e limite.'});p=updateAIAttempt(p,'ai-j1','php',{checks:[true,true],status:'done'});
  expect(aiPathStats(p,'junior','php').done).toBe(1);expect(aiPathStats(p,'junior','javascript').done).toBe(0);
  const copy=parseAIProgress(JSON.stringify(p));expect(copy).toEqual(p);
  p=updateAIAttempt(p,'ai-j1','php',{evidence:'Evidência alterada'});expect(p.attempts['ai-j1@php'].checks).toEqual([false,false]);expect(aiPathStats(p,'junior','php').done).toBe(0);
 });
 it('conclui módulos e desafio, recarrega e desfaz sem transferir stack',()=>{
  let p=emptyAIProgress();for(const m of aiModules.filter(m=>m.path==='pleno')){p=updateAIAttempt(p,m.id,'php',{evidence:'Fixture de estado, não execução de código do estudante.'});p=updateAIAttempt(p,m.id,'php',{checks:m.criteria.map(()=>true),status:'done'});}
  p.paths['pleno@php']='done';expect(aiPathStats(parseAIProgress(JSON.stringify(p)),'pleno','php').percent).toBe(100);
  expect(aiPathStats(p,'pleno','javascript').percent).toBe(0);p=updateAIAttempt(p,'ai-p-final','php',{status:'active'});expect(p.paths['pleno@php']).toBe('active');expect(aiPathStats(p,'pleno','php').percent).toBeLessThan(100);
 });
 it('rejeita dados incompatíveis e filtra IDs, tipos e conclusão inválida',()=>{
  expect(()=>parseAIProgress('{"schema":99}')).toThrow();const p=emptyAIProgress();p.attempts.unknown=blankAIAttempt('ai-j1');p.attempts['ai-j1@php']={...blankAIAttempt('ai-j1'),status:'done'};p.paths['junior@php']='done';
  const parsed=parseAIProgress(JSON.stringify(p));expect(parsed.attempts.unknown).toBeUndefined();expect(parsed.attempts['ai-j1@php'].status).toBe('active');expect(parsed.paths['junior@php']).toBe('active');
  expect(updateAIAttempt(p,'unknown','php',{})).toBe(p);
  const malformed=JSON.stringify({...emptyAIProgress(),paths:{'junior@php':['active']},attempts:{'ai-j1@php':{...blankAIAttempt('ai-j1'),status:['active']}}});expect(parseAIProgress(malformed).paths['junior@php']).toBeUndefined();expect(parseAIProgress(malformed).attempts['ai-j1@php']).toBeUndefined();
 });
 it('retoma, pausa e mantém chaves anteriores intactas',()=>{
  localStorage.setItem('stacktrail:roadmap:1','sentinela');localStorage.setItem('backend-academy:progress','legado');const v=render(<MemoryRouter><AIEngineeringPage/></MemoryRouter>);
  fireEvent.click(screen.getByRole('button',{name:'Iniciar módulo'}));fireEvent.change(screen.getByLabelText('Minha tentativa e evidências'),{target:{value:'Minha análise'}});fireEvent.click(screen.getByRole('button',{name:'Pausar módulo'}));v.unmount();render(<MemoryRouter><AIEngineeringPage/></MemoryRouter>);
  expect(screen.getByLabelText('Minha tentativa e evidências')).toHaveProperty('value','Minha análise');expect(screen.getByRole('button',{name:'Retomar módulo'})).toBeTruthy();expect(localStorage.getItem('stacktrail:roadmap:1')).toBe('sentinela');expect(localStorage.getItem('backend-academy:progress')).toBe('legado');
 });
 it('não sobrescreve esquema incompatível e permite trabalho em memória',()=>{
  localStorage.setItem(AI_STORAGE_KEY,'{"schema":88}');render(<MemoryRouter><AIEngineeringPage/></MemoryRouter>);fireEvent.change(screen.getByLabelText('Minha tentativa e evidências'),{target:{value:'Em memória'}});expect(screen.getByRole('alert').textContent).toContain('preservados');expect(localStorage.getItem(AI_STORAGE_KEY)).toBe('{"schema":88}');
 });
 it('mostra falha de escrita sem perder texto em memória',()=>{
  vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw Error('quota');});render(<MemoryRouter><AIEngineeringPage/></MemoryRouter>);fireEvent.change(screen.getByLabelText('Minha tentativa e evidências'),{target:{value:'Preservar'}});expect(screen.getByLabelText('Minha tentativa e evidências')).toHaveProperty('value','Preservar');expect(screen.getByRole('alert').textContent).toContain('memória');
 });
 it('cada percurso tem práticas completas e papéis de prompts separados',()=>{
  expect(aiModules).toHaveLength(22);for(const p of aiPaths){expect(aiModules.filter(m=>m.path===p.id&&m.id.endsWith('final'))).toHaveLength(1);}
  for(const m of aiModules){expect(m.criteria.length).toBeGreaterThan(1);expect(m.verification.length).toBeGreaterThan(0);expect(aiPrompt('help',m,'Laravel','tentativa')).toContain('uma próxima pista');expect(aiPrompt('review',m,'Express','evidência')).toContain('Não verificado');}
  const prompt=aiPrompt('prepare',aiModules.find(m=>m.id==='ai-j-final')!,'Express','não incluir');expect(prompt).toContain('sem revelar causa/localização');expect(prompt).toContain('declare não validado');expect(prompt).not.toContain('não incluir');
 });
});
describe('Mercado: evidência e filtros',()=>{
 const filters={market:'Brasil',seniority:'Pleno',track:'PHP/Laravel',classification:'Diferencial',category:'DevOps'};
 it('combina filtros e preserva comuns',()=>{const list=filterMarketSkills(filters);expect(list.length).toBeGreaterThan(0);expect(list.every(s=>s.sourceIds.includes('funcional')&&s.requirement==='Desejável')).toBe(true);expect(filterMarketSkills({...filters,seniority:'Júnior'})).toEqual([]);});
 it('não inventa comparação, deduplica anúncios e mantém referência para cada observação',()=>{
  expect(marketSources).toHaveLength(7);expect(new Set(marketSources.map(s=>s.url)).size).toBe(7);
  for(const s of marketSkills){expect(s.justification).toContain('editorial');expect(s.sourceIds.every(id=>marketSources.some(f=>f.id===id))).toBe(true);}
  const c=compareMarkets({market:'Brasil',seniority:'Júnior',track:'PHP/Laravel',classification:'todos',category:'Backend'}).find(c=>c.key==='php')!;expect(c.Brasil.length).toBe(1);expect(c.Internacional.length).toBe(1);
  expect(filterMarketSkills({market:'Internacional',seniority:'Sênior',track:'TypeScript/Express',classification:'todos',category:'Linguagens'})).toEqual([]);
 });
 it('mostra vazio recuperável e comparação na UI',()=>{
  render(<MemoryRouter><MarketSkillsPage/></MemoryRouter>);fireEvent.change(screen.getByLabelText('Categoria'),{target:{value:'Cloud'}});expect(screen.getByRole('heading',{name:'Sem evidências para esta combinação'})).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'Limpar filtros'}));fireEvent.click(screen.getByRole('button',{name:'Comparar Brasil e internacional'}));expect(screen.getByRole('heading',{name:'Brasil × internacional'})).toBeTruthy();
 });
});
describe('Capas: autorização, base e fallback',()=>{
 it('impede hotlink e imagem sem permissão e mostra fallback em erro',()=>{
  expect(licensedCoverSource('https://example.com/book.jpg')).toBeUndefined();expect(licensedCoverSource('assets/books/stage10/react-fluente.jpg')).toBeUndefined();const book=books.find(b=>b.cover.src==='covers/database-design-2ed.webp')!;
  const v=render(<BookCover b={book}/>);const image=screen.getByRole('img');expect(image.getAttribute('src')).toBe(resolveAssetUrl('assets/books/database-design-2ed.webp'));fireEvent.error(image);expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Capa indisponível');v.unmount();render(<BookCover b={{...book,cover:{...book.cover,src:'https://example.com/a.jpg'}}}/>);expect(screen.getByRole('img').tagName).toBe('DIV');
 });
});
