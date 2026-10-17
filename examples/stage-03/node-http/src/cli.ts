import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {booksFrom} from './books.js';
// Apenas JSON; o arquivo nunca é importado como código.
try{
 const [input,output,term='']=process.argv.slice(2);
 if(!input||!output)throw new Error('Uso: npm run cli -- entrada.json saida.json');
 if(resolve(input)===resolve(output))throw new Error('Entrada e saída devem ser arquivos distintos');
 const source=await readFile(input,'utf8');
 if(Buffer.byteLength(source)>100_000)throw new Error('Arquivo excede 100 kB');
 const books=booksFrom(JSON.parse(source));
 const items=books.filter(book=>book.title.toLocaleLowerCase('pt-BR').includes(term.toLocaleLowerCase('pt-BR')));
 const report={total:items.length,items};
 await writeFile(output,JSON.stringify(report,null,2)+'\n','utf8');
 console.log(`Relatório gravado: ${report.total} itens filtrados`);
}catch(error:unknown){console.error(error instanceof Error?error.message:'Falha desconhecida');process.exitCode=1;}
