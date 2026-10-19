// @ts-expect-error Node builtins are available to the test runner, not application browser types.
import {readFileSync} from 'node:fs';
// @ts-expect-error Node URL conversion is test-only; application has browser types.
import {fileURLToPath} from 'node:url';
import {it,expect} from 'vitest';
import ts from 'typescript';
const read=(lesson:string)=>(readFileSync(`src/content/stage-01/lessons/${lesson}.mdx`,'utf8') as string).replace(/\r\n/g,'\n');
const blocks=(source:string,language:string)=>[...source.matchAll(new RegExp('```'+language+'\\n([\\s\\S]*?)```','g'))].map(match=>match[1]);
it('exemplos completos publicados passam pelo compilador strict, incluindo React e a fronteira Next',()=>{
 const http=blocks(read('http'),'ts');const react=blocks(read('react'),'tsx');const next=blocks(read('next'),'tsx');
 const root=fileURLToPath(new URL('./__study__/',import.meta.url)).replaceAll('\\','/');
 const sources=new Map<string,string>([
  [root+'tipos.ts',blocks(read('tipos'),'ts').join('\n')],
  [root+'http.ts',http[0]+'\n'+http.find(code=>code.includes('// exemplo: http-ui'))+'\nexport {};'],
  [root+'formdata.ts',http.find(code=>code.includes('const campos = new FormData'))+'\nexport {};'],
  [root+'React.tsx',react.join('\n')],
  [root+'Filtro.tsx',next[0]],
  [root+'page.tsx',next.find(code=>code.includes('function PaginaReservas'))!],
  [root+'loading.tsx',next.find(code=>code.includes('function Loading'))!],
 ]);
 const options:ts.CompilerOptions={strict:true,noUnusedLocals:true,noUnusedParameters:true,noEmit:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,jsx:ts.JsxEmit.ReactJSX,skipLibCheck:true,types:[]};
 const host=ts.createCompilerHost(options);const originalRead=host.readFile,originalExists=host.fileExists,originalDirectory=host.directoryExists;
 host.readFile=path=>sources.get(path)??originalRead(path);host.fileExists=path=>sources.has(path)||originalExists(path);
 host.directoryExists=path=>path===root.slice(0,-1)||!!originalDirectory?.(path);
 const program=ts.createProgram([...sources.keys()],options,host);
 const diagnostics=ts.getPreEmitDiagnostics(program).map(item=>`${item.file?.fileName}:${item.start}: ${ts.flattenDiagnosticMessageText(item.messageText,' ')}`);
 expect(diagnostics).toEqual([]);
});
