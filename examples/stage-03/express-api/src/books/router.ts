import {Router} from 'express';
import {payload} from './schemas.js';
import {MemoryCatalog} from './catalog.js';
export function booksRouter(){
 const router=Router();const catalog=new MemoryCatalog();
 router.param('id',(_req,res,next,value)=>{if(!/^\d+$/.test(value)||!Number.isSafeInteger(Number(value))||Number(value)<1){res.status(400).json({error:'ID inteiro positivo obrigatório'});return;}next();});
 router.get('/',(req,res)=>{const q=req.query.q;
  if(Object.keys(req.query).some(key=>key!=='q')||(q!==undefined&&(typeof q!=='string'||q.length>100))){res.status(422).json({error:'q deve ser texto de até 100 caracteres'});return;}
  res.json(catalog.all().filter(book=>!q||book.title.toLocaleLowerCase('pt-BR').includes(q.toLocaleLowerCase('pt-BR'))));
 });
 router.get('/:id',(req,res)=>{const book=catalog.find(Number(req.params.id));if(!book){res.status(404).json({error:'Livro ausente'});return;}res.json(book);});
 router.post('/',(req,res)=>{
  if(!req.is('application/json')){res.status(415).json({error:'Use application/json'});return;}
  const data=payload(req.body);if(!data||!data.title||!data.author){res.status(422).json({error:'Título e autor obrigatórios, até 200 caracteres'});return;}
  const book=catalog.create({title:data.title,author:data.author});res.location(`/books/${book.id}`).status(201).json(book);
 });
 router.patch('/:id',(req,res)=>{
  const id=Number(req.params.id),book=catalog.find(id);if(!book){res.status(404).json({error:'Livro ausente'});return;}
  if(!req.is('application/json')){res.status(415).json({error:'Use application/json'});return;}
  const data=payload(req.body,true);if(!data){res.status(422).json({error:'Informe título ou autor válido'});return;}
  const updated={...book,...data};catalog.replace(id,updated);res.json(updated);
 });
 router.delete('/:id',(req,res)=>{if(!catalog.delete(Number(req.params.id))){res.status(404).json({error:'Livro ausente'});return;}res.status(204).end();});
 return router;
}
