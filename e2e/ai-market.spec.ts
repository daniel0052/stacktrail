import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {aiModules} from '../src/practice/ai-engineering';
const key='stacktrail:ai-engineering:1';
test('IA: selecionar módulo mostra o conteúdo e move o foco, inclusive na mesma seleção',async({page})=>{
 for(const width of [375,1440]){
  await page.setViewportSize({width,height:900});await page.goto('./#/engenharia-com-ia');
  const selected=page.getByRole('button',{name:'Debugging assistido',exact:true});
  await selected.click();const heading=page.getByRole('heading',{name:'Debugging assistido',exact:true});
  await expect(heading).toBeFocused();expect(await heading.evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;})).toBe(true);
  await selected.scrollIntoViewIfNeeded();await selected.focus();await page.keyboard.press('Enter');
  await expect(heading).toBeFocused();expect(await heading.evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;})).toBe(true);
  await page.getByRole('button',{name:'Próximo →',exact:true}).click();await expect(page.locator('#ai-module-title')).toBeFocused();await expect(page.locator('#ai-module-title')).toHaveText('Revisão de código gerado por IA');
 }
});
async function open(page:import('@playwright/test').Page,path:string){await page.goto('./#'+path);await expect(page.locator('main h1')).toBeVisible();}
test('IA: três percursos, prompts, persistência, isolamento e reversão',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await open(page,'/engenharia-com-ia');await page.evaluate(()=>localStorage.setItem('backend-academy:progress','sentinela'));
 await page.getByRole('button',{name:'Iniciar percurso',exact:true}).click();await page.getByRole('button',{name:'Pausar percurso',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Retomar percurso',exact:true})).toBeVisible();await page.getByRole('button',{name:'Retomar percurso',exact:true}).click();
 for(const path of ['junior','pleno','senior']){await open(page,`/engenharia-com-ia?percurso=${path}`);await expect(page.getByRole('heading',{name:'Módulos e desafio final',exact:true})).toBeVisible();}
 await open(page,'/engenharia-com-ia?percurso=junior&modulo=ai-j3');
 for(const [button,title] of [['Gerar projeto-base com IA','Gerar projeto-base'],['Pedir ajuda à IA','Pedir uma pista'],['Avaliar com IA','Revisar evidências']]){
  await page.getByRole('button',{name:button,exact:true}).click();const dialog=page.getByRole('dialog',{name:title,exact:true});await expect(dialog).toBeVisible();await dialog.getByLabel('Prompt editável').fill('Prompt revisto sem dados privados');await dialog.getByRole('button',{name:'Copiar prompt',exact:true}).click();await expect(dialog.getByRole('status')).toContainText('Prompt copiado');expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('Prompt revisto sem dados privados');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:button,exact:true})).toBeFocused();
 }
 await page.getByRole('button',{name:'Iniciar módulo',exact:true}).click();await page.getByLabel('Minha tentativa e evidências').fill('Fixture de estado: hipóteses e resultados sintéticos.');for(const c of await page.locator('.pf-check input').all())await c.check();await page.getByRole('button',{name:'Concluir por autoavaliação',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Desfazer conclusão do módulo',exact:true})).toBeVisible();await page.getByLabel('Stack da prática').selectOption('javascript');await expect(page.getByLabel('Minha tentativa e evidências')).toHaveValue('');await page.getByLabel('Stack da prática').selectOption('php');await page.getByLabel('Minha tentativa e evidências').fill('Evidência revista');await expect(page.locator('.pf-check input:checked')).toHaveCount(0);await page.getByRole('button',{name:'Pausar módulo',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Retomar módulo',exact:true})).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('backend-academy:progress'))).toBe('sentinela');
 const raw=await page.evaluate(key=>localStorage.getItem(key),key);expect(raw).toContain('ai-j3@php');
});
test('IA: conclusão do percurso e reversão após recarga, sem transferir stack',async({page})=>{
 await open(page,'/engenharia-com-ia');await page.evaluate(({key,modules})=>{const attempts=Object.fromEntries(modules.map(m=>[m.id+'@php',{status:'done',evidence:'Fixture de conclusão declarada, não avaliação.',checks:m.criteria.map(()=>true)}]));localStorage.setItem(key,JSON.stringify({schema:1,paths:{'junior@php':'active'},attempts,last:'ai-j-final@php'}));},{key,modules:aiModules.filter(m=>m.path==='junior')});await page.reload();await page.getByRole('button',{name:'Concluir percurso',exact:true}).click();await page.reload();await expect(page.getByRole('button',{name:'Desfazer conclusão do percurso',exact:true})).toBeVisible();await page.getByLabel('Stack da prática').selectOption('javascript');await expect(page.getByRole('button',{name:'Iniciar percurso',exact:true})).toBeVisible();await page.getByLabel('Stack da prática').selectOption('php');await page.getByRole('button',{name:'Desfazer conclusão do módulo',exact:true}).click();await expect(page.getByRole('button',{name:'Concluir percurso',exact:true})).toBeDisabled();await page.reload();await expect(page.getByRole('button',{name:'Concluir percurso',exact:true})).toBeDisabled();
});
test('Mercado: filtros, fontes sem quebrar rota, comparação e vazios',async({page})=>{
 await open(page,'/competencias-do-mercado');await page.getByRole('combobox',{name:'Senioridade',exact:true}).selectOption('Pleno');await page.getByRole('combobox',{name:'Trilha',exact:true}).selectOption('PHP/Laravel');await page.getByRole('combobox',{name:'Classificação',exact:true}).selectOption('Diferencial');await page.getByRole('combobox',{name:'Categoria',exact:true}).selectOption('DevOps');await expect(page.locator('main .pf-card')).toHaveCount(1);await page.locator('.pf-card').getByRole('button',{name:'Funcional Health Tech',exact:true}).click();await expect(page).toHaveURL(/#\/competencias-do-mercado$/);await expect(page.locator('#market-source-funcional')).toBeFocused();await page.getByRole('combobox',{name:'Senioridade',exact:true}).selectOption('Júnior');await expect(page.getByRole('heading',{name:'Sem evidências para esta combinação'})).toBeVisible();await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await page.getByRole('button',{name:'Comparar Brasil e internacional',exact:true}).click();await expect(page.getByRole('heading',{name:'Brasil × internacional'})).toBeVisible();await expect(page.locator('main')).toContainText('Comparação indisponível por lacuna');
});
test('Novas áreas: temas, reflow, fonte, teclado, axe e regressão de rotas existentes',async({page},info)=>{
 test.setTimeout(240000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const theme of ['dark','light']){
  await open(page,'/engenharia-com-ia');if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='dark'?'Tema escuro':'Tema claro',exact:true}).click();
  for(const path of ['/engenharia-com-ia?percurso=junior&modulo=ai-j-final','/engenharia-com-ia?percurso=pleno&modulo=ai-p6','/engenharia-com-ia?percurso=senior&modulo=ai-s-final','/competencias-do-mercado']){
   await open(page,path);for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await page.getByLabel('Tamanho da fonte').selectOption('150');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path}/${theme}/${width}`).toBe(true);}
   await page.getByLabel('Tamanho da fonte').selectOption('100');expect((await new AxeBuilder({page}).analyze()).violations,`${theme}/${path}`).toEqual([]);await page.screenshot({path:info.outputPath(`${theme}-${path.includes('mercado')?'market':path.includes('pleno')?'pleno':path.includes('senior')?'senior':'junior'}.png`)});
  }
 }
 await open(page,'/engenharia-com-ia');await page.getByRole('button',{name:'Pedir ajuda à IA',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.getByLabel('Prompt editável')).toBeFocused();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Pedir ajuda à IA',exact:true})).toBeFocused();
 for(const path of ['/','/exercicios?etapa=00','/projetos?etapa=01','/referencias?etapa=05','/ingles','/desenvolvimento-profissional','/progresso']){await open(page,path);await expect(page.locator('main')).not.toContainText('Página não encontrada');}
 expect(errors).toEqual([]);
});
test('Capas: imagem autorizada local, fallback e nenhuma requisição remota de capa',async({page})=>{
 const remote:string[]=[];page.on('request',r=>{if(r.resourceType()==='image'&&!r.url().startsWith('http://127.0.0.1:4181/'))remote.push(r.url());});await open(page,'/referencias?etapa=05');await page.getByLabel(/^Tipo de material/).selectOption('Livros');await expect(page.locator('.pf-book-cover img')).toHaveCount(3);const image=page.locator('.pf-book-cover img[src$="/assets/books/database-design-2ed.webp"]');await expect(image).toHaveCount(1);await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate((i:HTMLImageElement)=>i.naturalWidth)).toBeGreaterThan(0);expect(await image.getAttribute('src')).toBe('/stacktrail/assets/books/database-design-2ed.webp');await page.route('**/assets/books/database-design-2ed.webp',r=>r.abort());await page.reload();await expect(page.locator('.pf-book-cover img')).toHaveCount(2);await expect(page.locator('.pf-book-placeholder')).toHaveCount(1);expect(remote).toEqual([]);
});
