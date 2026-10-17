import {Controller,Res,Get,Post,Patch,Delete,Body,Param,ParseIntPipe,BadRequestException,HttpCode,Header} from '@nestjs/common';
import {BooksService} from './books.service.js';
import {CreateBookDto,UpdateBookDto} from './books.dto.js';
@Controller('books')
export class BooksController {
 constructor(private readonly books:BooksService){}
 private checkedId(value:unknown):number{if(typeof value!=='number'||!Number.isSafeInteger(value)||value<1)throw new BadRequestException('ID inteiro positivo obrigatório');return value;}

 @Get() all(){return this.books.all();}
 @Get(':id') find(@Param('id',ParseIntPipe) id:unknown){return this.books.find(this.checkedId(id));}
 @Post() create(@Body() data:CreateBookDto,@Res({passthrough:true}) response:{location:(path:string)=>void}){const book=this.books.create(data);response.location(`/books/${book.id}`);return book;}
 @Patch(':id') update(@Param('id',ParseIntPipe) id:unknown,@Body() data:UpdateBookDto){return this.books.update(this.checkedId(id),data);}
 @Delete(':id') @HttpCode(204) @Header('Cache-Control','no-store') remove(@Param('id',ParseIntPipe) id:unknown){this.books.remove(this.checkedId(id));}
}
