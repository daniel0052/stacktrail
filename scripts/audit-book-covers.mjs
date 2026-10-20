import {createServer} from 'vite';
import {existsSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import console from 'node:console';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {books}=await server.ssrLoadModule('/src/practice/curriculum.ts');
 const {professionalBooks}=await server.ssrLoadModule('/src/practice/professional-development.ts');
 const {englishBooks}=await server.ssrLoadModule('/src/practice/english-journey.ts');
 const {licensedCoverSource,coverPermissions}=await server.ssrLoadModule('/src/practice/book-cover-policy.ts');
 const entries=[...books,...professionalBooks,...englishBooks].map(b=>{
  const src=b.cover.src,approved=licensedCoverSource(src),file=src?`public-roadmap/${src}`:undefined;
  return {id:b.id,title:b.title,declaredSource:src??null,origin:b.cover.origin,usage:b.cover.usage,
   fileExists:!!file&&existsSync(file),remote:!!src&&/^https?:/.test(src),approvedSource:approved??null,
   permission:approved?coverPermissions[approved]:null,render:approved?'local image with error fallback':'neutral fallback',
   sha256:file&&existsSync(file)?createHash('sha256').update(readFileSync(file)).digest('hex'):null};
 });
 const grouped=Map.groupBy(entries.filter(e=>e.sha256),e=>e.sha256);
 const report={date:'2026-10-19',scope:'Current practice catalogs, including professional and English; legacy preserved',total:entries.length,
  authorized:entries.filter(e=>e.approvedSource).length,fallback:entries.filter(e=>!e.approvedSource).length,
  missing:entries.filter(e=>e.declaredSource&&!e.fileExists&&!e.remote).map(e=>e.id),remote:entries.filter(e=>e.remote).map(e=>e.id),
  duplicates:[...grouped.values()].filter(g=>g.length>1).map(g=>g.map(e=>e.id)),entries};
 mkdirSync('docs/quality/ai-market',{recursive:true});writeFileSync('docs/quality/ai-market/book-covers.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({total:report.total,authorized:report.authorized,fallback:report.fallback,missing:report.missing,remote:report.remote,duplicateGroups:report.duplicates.length}));
}finally{await server.close();}
