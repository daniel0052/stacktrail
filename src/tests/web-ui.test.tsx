// @vitest-environment jsdom
import {beforeEach,afterEach,it,expect} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {MemoryRouter,Route,Routes} from 'react-router-dom';
import {HttpExplorer} from '../components/web/HttpExplorer';
import {ContractLab} from '../components/web/ContractLab';
import {TeachingTerminal} from '../components/web/TeachingTerminal';
import {GitSimulator} from '../components/web/GitSimulator';
import {NetworkJourney} from '../components/web/NetworkJourney';
import {WebScope} from '../components/web/useWebJournal';
import {parseJournal} from '../features/web/journal';
import {isHttpAction} from '../features/web/workspaces';
import {LabPage} from '../components/lab/Lab';
import {ProgressProvider} from '../features/progress/ProgressProvider';
import {exercises} from '../content/stage-02/exercises';
import {reviewPrompt} from '../components/lab/reviewPrompt';
import {installDialogStub} from './dialogStub';
beforeEach(()=>{localStorage.clear();installDialogStub();});afterEach(cleanup);
it('HTTP envia, invalida feedback editado e restaura ações por contexto sem confiar em resultado salvo',()=>{
 let view=render(<WebScope id="exercise:HTTP"><HttpExplorer/></WebScope>);fireEvent.click(screen.getByRole('button',{name:'Enviar simulação'}));expect(screen.getByRole('heading',{name:'HTTP 200'})).toBeTruthy();
 fireEvent.change(screen.getByLabelText('Endpoint'),{target:{value:'/books/999'}});expect(screen.queryByRole('heading',{name:'HTTP 200'})).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Enviar simulação'}));expect(screen.getByRole('heading',{name:'HTTP 404'})).toBeTruthy();view.unmount();
 view=render(<WebScope id="exercise:HTTP"><HttpExplorer/></WebScope>);expect(screen.getByRole('heading',{name:'HTTP 404'})).toBeTruthy();view.unmount();render(<WebScope id="lesson:HTTP"><HttpExplorer/></WebScope>);expect((screen.getByLabelText('Endpoint') as HTMLInputElement).value).toBe('/books');expect(screen.queryByRole('heading',{name:'HTTP 404'})).toBeNull();
 expect(()=>parseJournal('{"version":1,"actions":[{"type":"patch","field":"method","value":"SCRIPT"}]}',isHttpAction)).toThrow();
});
it('contrato verifica só depois do clique e invalida resultado ao editar',()=>{
 render(<ContractLab/>);expect(screen.queryByText('Simulação local: contrato coerente nos critérios verificados')).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Verificar contrato'}));expect(screen.getByText('Simulação local: contrato coerente nos critérios verificados')).toBeTruthy();fireEvent.change(screen.getByLabelText('Status proposto'),{target:{value:'204'}});expect(screen.queryByText('Simulação local: contrato coerente nos critérios verificados')).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Verificar contrato'}));expect(screen.getByText('Revise o contrato')).toBeTruthy();
});
it('terminal simulado recupera arquivos e Git mantém staging/histórico ao remontar',()=>{
 let view=render(<TeachingTerminal/>);fireEvent.change(screen.getByLabelText('Comando simulado'),{target:{value:'echo HTTP > nota.txt'}});fireEvent.click(screen.getByRole('button',{name:'Executar comando local'}));view.unmount();view=render(<TeachingTerminal/>);fireEvent.change(screen.getByLabelText('Comando simulado'),{target:{value:'cat nota.txt'}});fireEvent.click(screen.getByRole('button',{name:'Executar comando local'}));expect(screen.getByRole('log').textContent).toContain('HTTP');view.unmount();
 view=render(<GitSimulator/>);fireEvent.change(screen.getByLabelText('Arquivo de trabalho'),{target:{value:'Guia atualizado'}});fireEvent.click(screen.getByRole('button',{name:'git add'}));fireEvent.change(screen.getByLabelText('Nome de branch, mensagem de commit ou descrição do PR'),{target:{value:'docs: guia'}});fireEvent.click(screen.getByRole('button',{name:'git commit'}));view.unmount();render(<GitSimulator/>);expect(screen.getByText(/docs: guia/)).toBeTruthy();
});
it('rede avança, reinicia e diferencia falha DNS de resposta 500',()=>{
 render(<NetworkJourney/>);fireEvent.change(screen.getByLabelText('Falha de rede/cenário'),{target:{value:'dns'}});fireEvent.click(screen.getByRole('button',{name:'Avançar na rede'}));expect(screen.getByRole('heading',{name:'DNS · percurso interrompido'})).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'Não há resposta disponível'}));expect(screen.getByRole('status').textContent).toContain('Coerente');fireEvent.change(screen.getByLabelText('Falha de rede/cenário'),{target:{value:'500'}});for(let i=0;i<6;i++)fireEvent.click(screen.getByRole('button',{name:'Avançar na rede'}));expect(screen.getByRole('heading',{name:'Resposta · HTTP 500'})).toBeTruthy();
});
it.each(exercises)('$title preserva três dicas, evidências e prompt sem aprovar ações externas',exercise=>{
 const mount=()=>render(<MemoryRouter initialEntries={[`/etapas/02/laboratorio/${exercise.slug}`]}><ProgressProvider><Routes><Route path="/etapas/02/laboratorio/:slug" element={<LabPage stageId="02"/>}/></Routes></ProgressProvider></MemoryRouter>);
 const view=mount();expect(screen.getByRole('heading',{name:'Enunciado'})).toBeTruthy();for(let i=0;i<3;i++){expect(screen.queryByText(exercise.hints[i])).toBeNull();fireEvent.click(screen.getByRole('button',{name:`Mostrar dica ${i+1}`}));expect(screen.getByText(exercise.hints[i])).toBeTruthy();}
 fireEvent.change(screen.getByLabelText('Comandos, resultados e evidências (locais ou externos)'),{target:{value:'curl externo: evidência ainda pendente; simulação local registrada'}});view.unmount();mount();expect((screen.getByLabelText('Comandos, resultados e evidências (locais ou externos)') as HTMLTextAreaElement).value).toContain('pendente');fireEvent.click(screen.getByRole('button',{name:'Avaliar com IA'}));expect((screen.getByLabelText('Prompt de avaliação (editável)') as HTMLTextAreaElement).value).toContain('35/20/25/20');const prompt=reviewPrompt(exercise,'tentativa','dúvida');expect(prompt).toContain(exercise.statement);expect(prompt).toContain('evidências externas não verificadas');expect(prompt).toContain('35%');
});
