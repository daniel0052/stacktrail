import {test,expect} from '@playwright/test';
import {openRoute,font} from './helpers';
import {contrastSample} from './contrast';
for(const theme of ['dark','light'] as const)test(`contrast states and SVG ${theme}`,async({page},info)=>{
 await openRoute(page,'/etapas/02/laboratorio/anatomia',theme);
 const button=page.getByRole('button',{name:'Enviar simulação',exact:true});
 for(const state of ['normal','hover','focus']){if(state==='hover')await button.hover();if(state==='focus'){await button.focus();await page.keyboard.press('Shift+Tab');await page.keyboard.press('Tab');await expect(button).toBeFocused();}const sample=await contrastSample(button);expect(sample.unresolved).toEqual([]);expect(sample.textRatio).toBeGreaterThanOrEqual(4.5);if(state==='focus')expect(sample.outlineRatio).toBeGreaterThanOrEqual(3);await info.attach(state,{body:JSON.stringify(sample),contentType:'application/json'});}
 const selected=page.getByRole('button',{name:'HTTP e sessão',exact:true});await expect(selected).toHaveAttribute('aria-pressed','true');expect((await contrastSample(selected)).textRatio).toBeGreaterThanOrEqual(4.5);
 await openRoute(page,'/etapas/00/aulas/variaveis',theme);await font(page,150);const editor=page.locator('.flow-editor').first();const disabled=await contrastSample(editor.getByRole('button',{name:'Refazer',exact:true}));expect(disabled.unresolved).toEqual([]);expect(disabled.textRatio).toBeGreaterThanOrEqual(4.5);
 const samples=await editor.locator('.flow-block text,.flow-edge text').evaluateAll(nodes=>{
  const rgb=(color:string)=>{const span=document.createElement('span');span.style.color=color;document.body.append(span);const values=getComputedStyle(span).color.match(/[\d.]+/g)!.slice(0,3).map(Number);span.remove();return values;};
  const lum=(color:string)=>rgb(color).map(value=>{const n=value/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
  const ratio=(a:string,b:string)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  return nodes.filter(node=>node.textContent?.trim()).map(node=>{const canvas=node.closest('.flow-scroll')!;const shape=node.closest('.flow-block')?.querySelector('g > rect,g > polygon');const outside=node.classList.contains('flow-id')||!shape;const bg=outside?getComputedStyle(canvas).backgroundColor:getComputedStyle(shape!).fill;const fg=getComputedStyle(node).fill;return{text:node.textContent,fg,bg,ratio:ratio(fg,bg),gridRatio:outside?ratio(fg,getComputedStyle(document.documentElement).getPropertyValue('--line')):null};});
 });
 await info.attach('SVG computed fill',{body:JSON.stringify(samples),contentType:'application/json'});for(const sample of samples){expect(sample.ratio,sample.text??'').toBeGreaterThanOrEqual(4.5);if(sample.gridRatio!==null)expect(sample.gridRatio,sample.text??'').toBeGreaterThanOrEqual(4.5);}
 expect(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);expect(await page.locator('.sidebar').evaluate(node=>getComputedStyle(node).transitionDuration)).toBe('0s');
});
