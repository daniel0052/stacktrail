import {it,expect} from 'vitest';
import {networkJourney} from '../features/web/network';
it('interrompe no componente certo sem inventar um status HTTP',()=>{
 for(const [scenario,title] of [['dns','DNS'],['tls','TLS'],['timeout','Aplicação'],['conexao','Conexão']] as const){const journey=networkJourney(scenario);expect(journey.at(-1)).toMatchObject({title,failed:true});expect(journey.some(s=>s.status)).toBe(false);}
});
it('500 é resposta após todas as camadas, distinta de falha de transporte',()=>{expect(networkJourney('500').at(-1)).toMatchObject({title:'Resposta',status:500,failed:false});expect(networkJourney('sucesso').at(-1)?.status).toBe(200);});
