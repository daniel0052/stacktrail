import {expect,type Page,type TestInfo} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {stageContent,lessonPath,labPath} from '../src/content/stages';

export const inventory=[{kind:'shared',stage:'global',route:'/'},{kind:'shared',stage:'global',route:'/etapas'},...(['00','01','02','03','04'] as const).flatMap(stage=>{
 const data=stageContent(stage);
 return [{kind:'dashboard',stage,route:`/etapas/${stage}`},{kind:'index',stage,route:`${data.base}/aulas`},{kind:'index',stage,route:labPath(stage)},{kind:'assessment',stage,route:`${data.base}/autoavaliacao`},...data.lessons.map(l=>({kind:'lesson',stage,route:lessonPath(stage,l.id)})),...data.exercises.map(e=>({kind:'exercise',stage,route:labPath(stage,e.slug)}))];
})];
export async function openRoute(page:Page,route:string,theme:'dark'|'light'='dark'){
 await page.goto(`./#${route}`);
 await expect(page.locator('main h1')).toBeVisible();
 if(route.includes('/aulas/'))await expect(page.locator('.lesson-content h2').first()).toBeVisible();
 await expect(page.locator('html')).toHaveAttribute('data-theme',/dark|light/);
 const current=await page.locator('html').getAttribute('data-theme');
 if(current!==theme)await page.getByRole('button',{name:theme==='light'?'Ativar tema claro':'Ativar tema escuro',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
}
export async function font(page:Page,value:90|100|150){
 await page.getByRole('button',{name:'Restaurar tamanho padrão do texto',exact:true}).click();
 if(value===90)await page.getByRole('button',{name:'Diminuir tamanho do texto',exact:true}).click();
 if(value===150)for(let i=0;i<5;i++)await page.getByRole('button',{name:'Aumentar tamanho do texto',exact:true}).click();
 await expect(page.getByRole('group',{name:'Tamanho dos textos'})).toContainText(`${value}%`);
}
export async function dimensions(page:Page){
 return page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,overflow:[...document.querySelectorAll<HTMLElement>('main *')].filter(e=>{
  const r=e.getBoundingClientRect();if(!r.width||!r.height||r.right<=innerWidth+1||e.closest('[aria-hidden="true"], [inert]'))return false;
  let ancestor=e.parentElement;while(ancestor&&ancestor!==document.body){const s=getComputedStyle(ancestor);if(['auto','scroll'].includes(s.overflowX))return false;ancestor=ancestor.parentElement;}return true;
 }).slice(0,12).map(e=>({tag:e.tagName,class:e.className,text:e.textContent?.slice(0,100)}))}));
}
export async function audit(page:Page,info:TestInfo,{axe=true}: {axe?:boolean}={}){
 const layout=await dimensions(page);
 const result=axe?await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze():null;
 const map=(items:NonNullable<typeof result>['violations'])=>items.map(v=>({id:v.id,impact:v.impact,description:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary,checks:n.any.map(c=>({id:c.id,data:c.data}))}))}));
 const record={url:page.url(),layout,violations:result?map(result.violations):[],incomplete:result?map(result.incomplete):[]};
 await info.attach('quality-audit',{body:JSON.stringify(record,null,2),contentType:'application/json'});
 expect.soft(layout.document,JSON.stringify(layout)).toBeLessThanOrEqual(layout.width);
 expect.soft(layout.overflow,'Conteúdo não contido em scroll local intencional').toEqual([]);
 if(result)expect.soft(record.violations,'axe violations: '+JSON.stringify(record.violations)).toEqual([]);
}
