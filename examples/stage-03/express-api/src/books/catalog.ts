export type Book={id:number;title:string;author:string};
export class MemoryCatalog {
 private books=new Map<number,Book>(); private nextId=1;
 all():Book[]{return [...this.books.values()].map(book=>({...book}));}
 find(id:number):Book|undefined{const book=this.books.get(id);return book?{...book}:undefined;}
 create(data:Omit<Book,'id'>):Book{const book={id:this.nextId++,title:data.title,author:data.author};this.books.set(book.id,book);return {...book};}
 replace(id:number,book:Book):void{this.books.set(id,{...book,id});}
 delete(id:number):boolean{return this.books.delete(id);}
}
