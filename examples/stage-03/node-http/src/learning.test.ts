import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {first,titles,loadTitles} from './learning.js';
test('linguagem: fronteiras, generic e preservação da origem',()=>{
 const source=[{title:' Redes '}];assert.deepEqual(titles(source),['Redes']);assert.equal(source[0].title,' Redes ');
 assert.equal(first([]),undefined);assert.equal(first(['A']),'A');
 for(const value of [null,{},[{title:4}],[{title:' '}],[{title:'A'},null]])assert.throws(()=>titles(value));
});
test('async: aguarda leitura e preserva rejeições de arquivo e JSON',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'st03-learning-'));
 try{const file=join(dir,'books.json');await writeFile(file,'[{"title":" Redes "}]');assert.deepEqual(await loadTitles(file),['Redes']);await writeFile(file,'{');await assert.rejects(loadTitles(file),SyntaxError);await assert.rejects(loadTitles(join(dir,'missing.json')),{code:'ENOENT'});}
 finally{await rm(dir,{recursive:true,force:true});}
});
