import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {topics,activities as tasks,projects} from '../src/practice/curriculum';
test.describe.configure({mode:'parallel'});
async function open(page:import('@playwright/test').Page,path:string){await page.goto('./#'+path);await expect(page.locator('main h1')).toBeVisible();}
const routes=['/desenvolvimento-profissional','/ingles','/engenharia-com-ia','/competencias-do-mercado','/ai-development-toolkit','/ai-development-toolkit/project-planning','/ai-development-toolkit/agent-security','/security','/etapas/13/performance-audit','/etapas/09/prova-final','/','/exercicios','/projetos','/referencias','/progresso',...Array.from({length:20},(_,i)=>'/etapas/'+String(i).padStart(2,'0')),...['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15'].flatMap(id=>[`/etapas/${id}/topicos`,`/etapas/${id}/referencias`,`/etapas/${id}/exercicios`,`/etapas/${id}/projeto`]),...topics.map(t=>`/etapas/${t.stageId}/topicos/${t.id}`),...tasks.map(t=>`/etapas/${t.stageId}/exercicios/${t.slug}`),...projects.map(t=>`/projetos/${t.slug}`)];
const size=60;
for(const theme of ['dark','light'] as const)for(let offset=0;offset<routes.length;offset+=size){const batch=routes.slice(offset,offset+size);test(`published routes, reflow and axe: ${theme} ${offset+1}–${offset+batch.length}`,async({page},info)=>{
 test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:1440,height:1000});await open(page,'/');if(theme==='light')await page.getByRole('button',{name:'Tema claro',exact:true}).click();
 for(const route of batch){await open(page,route);expect(await page.locator('html').getAttribute('data-theme')).toBe(theme);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect.soft(result.violations,route).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);if(result.incomplete.length)await info.attach(`incomplete-${route.replaceAll('/','_')}`,{body:JSON.stringify(result.incomplete),contentType:'application/json'});}
 expect(errors).toEqual([]);await info.attach('routes',{body:JSON.stringify({theme,routes:batch}),contentType:'application/json'});
});}
