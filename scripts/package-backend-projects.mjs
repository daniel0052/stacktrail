// Packages only repository-authored, local study sources; never .env, runtime data or dependencies.
import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {projectZip} from '../src/features/backend/archive.ts';
const projects={ 'php-basics':['Biblioteca PHP',['composer install','composer test','composer demo']], 'laravel-api':['API Laravel',['composer install','composer test','php artisan serve --host=127.0.0.1 --port=8000']], 'node-http':['Node/TypeScript',['npm ci','npm test','npm run cli -- exemplos.json relatorio.json','npm start']], 'express-api':['API Express',['npm ci','npm test','npm start']], 'nestjs-api':['Módulo NestJS',['npm ci','npm test','npm start']] };
const destination='public/study/stage-03';await mkdir(destination,{recursive:true});
async function walk(dir,prefix=''){
 const result={};for(const entry of await readdir(dir,{withFileTypes:true})){if(['vendor','node_modules','dist','.git','.phpunit.cache','bootstrap-cache'].includes(entry.name)||entry.name.startsWith('.env')||entry.name.endsWith('.sqlite')||entry.name.endsWith('.log'))continue;
 const relative=prefix+entry.name;if(entry.isDirectory()){if(['bootstrap/cache','storage'].includes(relative))continue;Object.assign(result,await walk(join(dir,entry.name),relative+'/'));}else if(entry.isFile())result[relative]=await readFile(join(dir,entry.name),'utf8');}
 return result;
}
for(const [id,[title,commands]] of Object.entries(projects)){
 const root=join('examples/stage-03',id);await readdir(root);
 const files=await walk(root);
 // Runtime directories survive ZIP extraction with harmless tracked placeholders.
 if(id==='laravel-api')for(const path of ['bootstrap/cache/.gitkeep','storage/app/.gitkeep','storage/framework/cache/data/.gitkeep','storage/framework/sessions/.gitkeep','storage/framework/views/.gitkeep','storage/logs/.gitkeep'])files[path]='';
 await writeFile(join(destination,id+'.json'),JSON.stringify({id,title,commands,files}));
 await writeFile(join(destination,id+'.zip'),new Uint8Array(projectZip(files)));
}
