import {test,expect} from '@playwright/test';
import {inventory,openRoute,font,audit} from './helpers';
const routes=[...inventory.filter(entry=>entry.stage==='03'),...['/etapas/00','/aulas/http','/etapas/02/laboratorio'].map(route=>({route,stage:'legacy'}))];
for(const {route} of routes)for(const theme of ['dark','light'] as const)test(`build ${theme} ${route}`,async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setViewportSize({width:375,height:1000});await openRoute(page,route,theme);await font(page,150);
 if(route.includes('/laboratorio/')&&route.includes('/03/')&&!route.endsWith('/fundamentos-backend'))await expect(page.getByRole('textbox',{name:/^Código de /})).toBeVisible();
 await audit(page,info);expect(errors).toEqual([]);
});
test('pacotes estáticos e locks disponíveis sob base GitHub Pages',async({request})=>{
 for(const project of ['php-basics','laravel-api','node-http','express-api','nestjs-api']){
  const manifest=await request.get(`study/stage-03/${project}.json`);expect(manifest.ok()).toBe(true);const data=await manifest.json();expect(data.id).toBe(project);expect(Object.keys(data.files)).toContain(project.startsWith('php')||project==='laravel-api'?'composer.lock':'package-lock.json');
  expect(Object.keys(data.files).filter(path=>path.split('/').some((part:string)=>part.startsWith('.env')||part==='vendor'||part==='node_modules')||path.endsWith('.sqlite')||path.endsWith('.log'))).toEqual([]);
  const zip=await request.get(`study/stage-03/${project}.zip`);expect(zip.ok()).toBe(true);expect((await zip.body()).subarray(0,4)).toEqual(Buffer.from([0x50,0x4b,0x03,0x04]));
 }
 const html=await(await request.get('./')).text();expect(html).not.toContain('/stacktrail/stacktrail/');const favicon=await request.get('favicon.svg');expect(favicon.ok()).toBe(true);
});
test('ciclo conceitual invalida passos e mostra sucesso, domínio, parsing e falha',async({page})=>{
 await openRoute(page,'/etapas/03/aulas/ciclo');const model=page.getByRole('region',{name:'Visualizador do ciclo de requisição'});
 const last=()=>model.getByRole('button',{name:/^\d+\. /}).last().click();const result=model.getByRole('status');
 await last();await expect(result).toContainText('HTTP 201 no modelo');
 await model.getByLabel('Corpo JSON do modelo').fill('{');await expect(model.getByRole('button',{name:'Passo anterior',exact:true})).toBeDisabled();await last();await expect(result).toContainText('HTTP 400');
 await model.getByLabel('Corpo JSON do modelo').fill('{}');await last();await expect(result).toContainText('HTTP 422');
 await model.getByRole('button',{name:'Reiniciar ciclo',exact:true}).click();await model.getByRole('checkbox').check();await last();await expect(result).toContainText('HTTP 500');await expect(result).not.toContainText('stack');
});
test('falha de arquivos permite repetir sem inventar execução',async({page})=>{
 await page.route('**/study/stage-03/php-basics.json',route=>route.fulfill({status:503,body:'indisponível'}));
 await openRoute(page,'/etapas/03/laboratorio/php-livro');await expect(page.getByRole('alert').filter({hasText:'Não foi possível carregar'})).toBeVisible();
 await page.unroute('**/study/stage-03/php-basics.json');await page.getByRole('button',{name:'Tentar carregar novamente',exact:true}).click();await expect(page.getByRole('textbox',{name:'Código de src/Livro.php',exact:true})).toBeVisible();await expect(page.getByText('Nenhum código é executado aqui.',{exact:true})).toBeVisible();
});
