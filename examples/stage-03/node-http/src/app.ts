import {createServer} from 'node:http';
export function makeServer(){return createServer((request,response)=>{
 response.setHeader('Content-Type','application/json; charset=utf-8');
 if(request.method==='GET'&&request.url==='/health'){response.end(JSON.stringify({status:'ok'}));return;}
 response.statusCode=request.url==='/health'?405:404;
 if(response.statusCode===405)response.setHeader('Allow','GET');
 response.end(JSON.stringify({error:response.statusCode===405?'Método não permitido':'Rota não encontrada'}));
});}
