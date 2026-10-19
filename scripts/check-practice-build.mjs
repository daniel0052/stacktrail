/* global console */
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
async function files(dir){return(await Promise.all((await fs.readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name).replaceAll('\\', '/')]))).flat();}
const published=await files('dist');
assert(published.includes('dist/index.html'));
assert(published.includes('dist/favicon.svg'));
assert(published.every(f=>!/(study|legacy|\.zip$|\.mdx$)/.test(f)),`Unexpected legacy asset: ${published}`);
const js=await Promise.all(published.filter(f=>f.endsWith('.js')).map(f=>fs.readFile(f,'utf8')));
assert(js.length>0);
for(const content of js){assert(!content.includes('/study/'));assert(!content.includes('lesson-content'));assert(!content.includes('Executar fluxograma'));assert(content.includes('Pedir ajuda à IA'));}
console.log(`Build principal: ${published.length} arquivos; nenhum pacote de estudo, ZIP, MDX ou entry legado. Conferência adicional de sentinelas do bundle passou (não é auditoria universal de código).`);
