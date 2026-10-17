import {test,expect} from '@playwright/test';
test('exemplo publicado: fetch real, vazio, HTTP, JSON, CORS e conflito',async({page,request})=>{
 await page.goto('http://127.0.0.1:5174');
 const button=page.getByRole('button',{name:'Consultar livros',exact:true});
 await page.route('**/api/livros**',async route=>{await new Promise(resolve=>setTimeout(resolve,250));await route.continue();});
 await button.click();await expect(button).toBeDisabled();await expect(page.getByRole('status')).toHaveText('Carregando…');await expect(page.getByRole('status')).toHaveText('2 livros encontrados');
 await page.getByLabel('Título',{exact:true}).fill('inexistente');await button.click();await expect(page.getByRole('status')).toHaveText('Nenhum livro encontrado');
 for(const scenario of ['500','json','cors']){
  await page.getByLabel('Resposta do mock').selectOption(scenario);await button.click();
  await expect(page.getByRole('status')).not.toHaveText(/Carregando|encontrado/);await expect(button).toBeEnabled();
  if(scenario==='500')await expect(page.getByRole('status')).toHaveText('Falha HTTP 500');
 }
 const body={nome:'Pessoa fictícia',data:'2099-01-01',horario:'10:00',servico:'leitura'};
 const first=await request.post('http://127.0.0.1:4179/api/agendamentos',{data:body});expect(first.status()).toBe(201);
 const duplicate=await request.post('http://127.0.0.1:4179/api/agendamentos',{data:body});expect(duplicate.status()).toBe(409);
 const list=await request.get('http://127.0.0.1:4179/api/agendamentos');expect(await list.json()).toHaveLength(1);
});

test('FormData publicado: strings, JSON numérico e boundary automático',async({page})=>{
 const output:string[]=[];page.on('console',message=>{if(message.type()==='log')output.push(message.text());});
 await page.goto('http://127.0.0.1:5174/formdata.html');
 await expect.poll(()=>output.join(' ')).toContain('string');
 expect(output.join(' ')).toContain('"quantidade":2');
 expect(output.join(' ')).toContain('multipart/form-data; boundary=');
 expect(output.join(' ')).toContain('application/json');
});
