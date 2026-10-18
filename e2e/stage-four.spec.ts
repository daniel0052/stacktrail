import {test,expect} from '@playwright/test';
import {openRoute,audit,font,inventory} from './helpers';
import {lessons} from '../src/content/stage-04';
test('trilhas03/04, Nest isolado e preferência persistente',async({page},info)=>{
 await openRoute(page,'/etapas/03');await expect(page.locator('main a[href*="nest-"]')).toHaveCount(0);await expect(page.locator('main a[href*="express-"]')).toHaveCount(0);
 await page.getByRole('button',{name:/^JavaScript\/TypeScript/}).click();await expect(page.locator('main a[href$="nest-modulos"]')).toHaveCount(1);await expect(page.getByRole('heading',{name:'NestJS — Aprofundamento opcional'})).toBeVisible();
 await page.reload();await expect(page.getByRole('button',{name:/^JavaScript\/TypeScript/})).toHaveAttribute('aria-pressed','true');
 await openRoute(page,'/etapas/04');await expect(page.getByRole('button',{name:/^JavaScript\/TypeScript/})).toHaveAttribute('aria-pressed','true');await expect(page.locator('main a[href$="laravel-api"]')).toHaveCount(0);await expect(page.locator('main a[href$="express-api"]')).toHaveCount(1);
 await page.getByRole('button',{name:/^PHP \+ Laravel/}).click();await expect(page.locator('main a[href$="express-api"]')).toHaveCount(0);await expect(page.locator('main a[href$="laravel-api"]')).toHaveCount(1);await audit(page,info);
});
test('fluxo local completo dos laboratórios e rascunhos isolados',async({page},info)=>{
 await openRoute(page,'/etapas/04/laboratorio/php-07');await page.getByRole('button',{name:'Preparar reserva válida'}).click();await page.getByRole('button',{name:'Executar simulação',exact:true}).click();await expect(page.getByRole('heading',{name:/HTTP 201/})).toBeVisible();await page.getByRole('button',{name:'Executar simulação',exact:true}).click();await expect(page.getByRole('heading',{name:/HTTP 409/})).toBeVisible();
 await page.getByLabel('Método HTTP').selectOption('DELETE');await page.getByLabel('Recurso e rota').fill('/api/v1/bookings/1');await expect(page.getByRole('heading',{name:/HTTP 409/})).toHaveCount(0);await page.getByRole('button',{name:'Executar simulação',exact:true}).click();await expect(page.getByRole('heading',{name:/HTTP 204/})).toBeVisible();
 await page.getByRole('button',{name:'Explorar coleção'}).click();await page.getByRole('button',{name:'Executar simulação',exact:true}).click();await expect(page.getByRole('heading',{name:/HTTP 200/})).toBeVisible();
 await page.getByRole('button',{name:'D · OpenAPI',exact:true}).click();await page.getByLabel('Contrato YAML ou JSON').fill('openapi: [quebrado');await page.getByRole('button',{name:'Analisar contrato localmente'}).click();await expect(page.getByRole('heading',{name:'Inconsistências encontradas'})).toBeVisible();
 await page.getByRole('button',{name:'A · Contratos',exact:true}).click();await page.getByRole('button',{name:'D · OpenAPI',exact:true}).click();await expect(page.getByLabel('Contrato YAML ou JSON')).toHaveValue('openapi: [quebrado');
 await page.getByRole('button',{name:'Inspecionar exemplo original'}).click();await page.getByRole('button',{name:'Analisar contrato localmente'}).click();await expect(page.getByRole('heading',{name:/Nenhuma inconsistência no recorte/})).toBeVisible();
 await page.getByLabel('Código, raciocínio ou anotações da solução').fill('Minha tentativa local');await page.getByLabel('O que aprendi / onde travei').fill('Comandos e resultados declarados');await page.reload();await expect(page.getByLabel('Código, raciocínio ou anotações da solução')).toHaveValue('Minha tentativa local');await audit(page,info);
});
for(const theme of ['dark','light'] as const)for(const width of [320,375,768,1024,1440])test(`layout04 ${theme} ${width}`,async({page},info)=>{
 await page.setViewportSize({width,height:1000});await openRoute(page,'/etapas/04',theme);await font(page,150);await audit(page,info);await page.screenshot({path:info.outputPath('stage04.png'),fullPage:true});
 await openRoute(page,'/etapas/04/autoavaliacao',theme);await audit(page,info);
});
test('15 aulas renderizadas e consulta direta preserva contexto',async({page})=>{
 for(const l of lessons){await openRoute(page,`/etapas/04/aulas/${l.id}`);await expect(page.locator('.lesson-content h2').first()).toHaveText('Objetivo verificável');}
 await openRoute(page,'/etapas/04/aulas/express-api');await expect(page.locator('.lesson-meta')).toContainText('JavaScript/TypeScript');await expect(page.getByRole('link',{name:/Próxima aula/})).toHaveAttribute('href',/#\/etapas\/04\/aulas\/express-regras$/);
});
test('varredura de rotas publicadas nos dois temas sem erro de renderização',async({page})=>{
 test.setTimeout(240000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const theme of ['dark','light'] as const)for(const entry of inventory){await openRoute(page,entry.route,theme);await expect(page.locator('main')).not.toContainText('Página não encontrada');}
 expect(errors).toEqual([]);
});

test('teclado, rascunho e leitura em fonte mínima',async({page},info)=>{
 await page.setViewportSize({width:1440,height:1000});await openRoute(page,'/etapas/04/laboratorio/php-07','light');await font(page,90);
 const action=page.getByRole('button',{name:'Preparar reserva válida'});await action.focus();await page.keyboard.press('Enter');await expect(page.getByLabel('Método HTTP')).toHaveValue('POST');
 await page.getByLabel('Recurso e rota').fill('/api/v1/bookings');await page.reload();await expect(page.getByLabel('Método HTTP')).toHaveValue('POST');await expect(page.getByLabel('Recurso e rota')).toHaveValue('/api/v1/bookings');await audit(page,info);
 await page.screenshot({path:info.outputPath('viewport-light.png')});
 await page.setViewportSize({width:375,height:900});await page.getByRole('button',{name:'Ativar tema escuro'}).click();await font(page,150);await audit(page,info);await page.screenshot({path:info.outputPath('viewport-dark-mobile.png')});
});
