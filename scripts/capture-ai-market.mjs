/* global document, innerWidth */
import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync} from 'node:fs';
const dir='docs/quality/ai-market/screenshots';mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();const results=[];
try{
 for(const theme of ['dark','light'])for(const width of [320,375,768,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4181/stacktrail/#/engenharia-com-ia?percurso=junior&modulo=ai-j3');
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();
  const section=page.locator('main>section').last();await section.scrollIntoViewIfNeeded();
  await page.screenshot({path:`${dir}/ai-module-${theme}-${width}.png`});
  results.push({route:'ai-j3',theme,width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
  await page.goto('http://127.0.0.1:4181/stacktrail/#/competencias-do-mercado');await page.getByRole('combobox',{name:'Senioridade',exact:true}).selectOption('Pleno');await page.getByRole('combobox',{name:'Categoria',exact:true}).selectOption('Testes');
  await page.getByRole('heading',{name:'Competências observadas',exact:true}).scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/market-cards-${theme}-${width}.png`});
  results.push({route:'market-tests',theme,width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
 }
 writeFileSync('docs/quality/ai-market/rendered-layout.json',JSON.stringify({date:'2026-10-19',engine:'Playwright Chromium headless',zoom:'100%; browser zoom 200/400 not tested',results},null,2)+'\n');
}finally{await browser.close();}
