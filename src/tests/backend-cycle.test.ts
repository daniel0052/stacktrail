import {it,expect} from 'vitest';
import {initialCycle,requestCycle} from '../features/backend/cycle';
it('percorre sucesso e falhas nas responsabilidades corretas, sem alterar entrada',()=>{
 expect(requestCycle(initialCycle).at(-1)).toMatchObject({status:201,body:{title:'Redes'}});
 for(const [patch,status] of [[{body:'{'},400],[{body:'{}'},422],[{path:'/ausente'},404],[{path:'/health'},405],[{fail:true},500],[{body:'a'.repeat(1025)},413]] as const){const steps=requestCycle({...initialCycle,...patch});expect(steps.at(-1)?.status).toBe(status);if(status<500)expect(steps.some(s=>s.name==='Controller e regra de aplicação')).toBe(false);}
 expect(requestCycle({...initialCycle,method:'GET',path:'/health?q=1'}).at(-1)).toMatchObject({status:200,body:{status:'ok'}});expect(initialCycle.fail).toBe(false);
});
