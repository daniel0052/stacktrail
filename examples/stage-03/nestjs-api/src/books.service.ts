import {Injectable,NotFoundException,BadRequestException} from '@nestjs/common';
import type {CreateBookDto,UpdateBookDto} from './books.dto.js';
export type Book={id:number;title:string;author:string};
@Injectable()
export class BooksService {
 private readonly books=new Map<number,Book>();private nextId=1;
 all(){return [...this.books.values()].map(book=>({...book}));}
 find(id:number):Book{const book=this.books.get(id);if(!book)throw new NotFoundException('Livro ausente');return {...book};}
 create(data:CreateBookDto):Book{const book={id:this.nextId++,title:data.title,author:data.author};this.books.set(book.id,book);return {...book};}
 update(id:number,data:UpdateBookDto):Book{
  const book=this.find(id);if(data.title==null&&data.author==null)throw new BadRequestException('Informe título ou autor');
  // IsOptional ignora null; rejeite explicitamente para não apagar campos existentes.
  if(data.title===null||data.author===null)throw new BadRequestException('Campos não aceitam null');
  const updated={...book,...(data.title!==undefined?{title:data.title}:{}),...(data.author!==undefined?{author:data.author}:{})};
  this.books.set(id,updated);return {...updated};
 }
 remove(id:number){this.find(id);this.books.delete(id);}
}
