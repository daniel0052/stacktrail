import express,{type ErrorRequestHandler} from 'express';
import {randomUUID} from 'node:crypto';
import {booksRouter} from './books/router.js';
export function makeApp(options:{origin?:string;log?:(line:string)=>void}={}){
 const app=express();
 app.disable('x-powered-by');
 app.use((req,res,next)=>{const id=randomUUID();res.setHeader('X-Request-Id',id);
  res.on('finish',()=>options.log?.(`${id} ${req.method} ${res.statusCode}`));
  if(options.origin){res.setHeader('Vary','Origin');if(req.headers.origin===options.origin){res.setHeader('Access-Control-Allow-Origin',options.origin);res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');}}
  if(req.method==='OPTIONS'){res.sendStatus(204);return;}next();
 });
 app.use(express.json({limit:'16kb',strict:false}));
 app.get('/health',(_req,res)=>{res.json({status:'ok'});});
 app.use('/books',booksRouter());
 app.use((_req,res)=>{res.status(404).json({error:'Rota ausente'});});
 const errors:ErrorRequestHandler=(error,_req,res,next)=>{
  if(res.headersSent){next(error);return;}
  const status=error?.type==='entity.too.large'?413:error?.type==='entity.parse.failed'?400:500;
  res.status(status).json({error:status===500?'Falha interna':status===413?'Corpo acima de 16 kB':'JSON malformado'});
 };
 app.use(errors);return app;
}
