import express,{Router,type ErrorRequestHandler} from 'express';
import {z} from 'zod';
import {initialRestState,simulateRest,type RestState} from './model.js';
export const bookingSchema=z.strictObject({name:z.string().trim().min(1).refine(v=>Array.from(v).length<=80),slot:z.string()});
const bookSchema=z.strictObject({title:z.string().trim().min(1).refine(v=>Array.from(v).length<=120),category:z.string().trim().min(1).refine(v=>Array.from(v).length<=120),note:z.string().refine(v=>Array.from(v).length<=200).nullable().optional()});
export function makeApp(initial:RestState=initialRestState()){
 let state=structuredClone(initial);const app=express();const router=Router();
 app.disable('x-powered-by');app.use(express.json({limit:'32kb',strict:false}));
 router.use(async(req,res)=>{
  const input:unknown=req.body;
  const validatesInput=(req.method==='POST'&&['/books','/bookings'].includes(req.path))||(['PUT','PATCH'].includes(req.method)&&/^\/books\/[1-9]\d*$/.test(req.path));
  if(validatesInput){
   if(!req.is('application/json')){res.status(415).json({message:'Use application/json.'});return;}
   const isBook=req.path.startsWith('/books');const schema=isBook?(req.method==='PATCH'?bookSchema.partial().refine(v=>Object.keys(v).length>0):bookSchema):bookingSchema;
   const parsed=schema.safeParse(input);if(!parsed.success){res.status(422).json({message:'Entrada inválida.',errors:parsed.error.flatten()});return;}
  }
  const output=simulateRest(state,{method:req.method,path:req.originalUrl,headers:'Content-Type: application/json',body:JSON.stringify(input)??''});
  state=output.state;res.status(output.reply.status);for(const [key,value] of Object.entries(output.reply.headers))res.set(key,value);
  if(output.reply.status===204)res.end();else res.json(output.reply.body);
 });
 app.use('/api/v1',router);app.use((_req,res)=>res.status(404).json({message:'Não encontrado.'}));
 const errors:ErrorRequestHandler=(error,_req,res,next)=>{if(res.headersSent){next(error);return;}const candidate=error as {type?:string};const status=candidate.type==='entity.parse.failed'?400:candidate.type==='entity.too.large'?413:500;res.status(status).json({message:status===500?'Falha interna.':'Corpo inválido ou maior que32KB.'});};app.use(errors);return app;
}
