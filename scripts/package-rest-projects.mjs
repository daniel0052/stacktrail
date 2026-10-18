import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {projectZip} from '../src/features/backend/archive.ts';
async function walk(dir,prefix=''){
 const files={};for(const item of await readdir(dir,{withFileTypes:true})){
  if(['vendor','node_modules','dist','.git','.phpunit.cache','storage'].includes(item.name)||item.name.startsWith('.env')||item.name.endsWith('.log'))continue;
  const relative=prefix+item.name;if(relative.startsWith('bootstrap/cache/'))continue;
  if(item.isDirectory())Object.assign(files,await walk(join(dir,item.name),relative+'/'));else if(item.isFile())files[relative]=await readFile(join(dir,item.name),'utf8');
 }return files;
}
await mkdir('public/study/stage-04',{recursive:true});
for(const id of ['laravel-api','express-api']){
 const files=await walk(`examples/stage-04/${id}`);
 if(id==='laravel-api')for(const path of ['bootstrap/cache/.gitkeep','storage/app/.gitkeep','storage/framework/cache/data/.gitkeep','storage/framework/sessions/.gitkeep','storage/framework/views/.gitkeep','storage/logs/.gitkeep'])files[path]='';
 await writeFile(`public/study/stage-04/${id}.zip`,new Uint8Array(projectZip(files)));
}
