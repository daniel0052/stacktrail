export type StudyProject={id:string;title:string;files:Record<string,string>;commands:string[]};
export const projectIds=['php-basics','laravel-api','node-http','express-api','nestjs-api'] as const;
export const exerciseProject:Record<string,typeof projectIds[number]>={'03-ex01':'php-basics','03-ex02':'node-http','03-ex03':'laravel-api','03-ex04':'express-api','03-ex05':'laravel-api','03-ex06':'nestjs-api','03-ex07':'laravel-api','03-ex08':'express-api','03-ex09':'laravel-api','03-ex10':'php-basics','03-ex11':'php-basics','03-ex12':'laravel-api','03-ex13':'node-http','03-ex14':'node-http','03-ex15':'node-http','03-ex16':'express-api','03-ex17':'express-api','03-ex18':'express-api','03-ex19':'express-api','03-ex20':'express-api'};
export function starterFiles(project:StudyProject,exerciseId:string):Record<string,string>{
 const files=Object.fromEntries(Object.entries(project.files).filter(([name])=>!name.endsWith('.lock')&&!name.endsWith('package-lock.json')&&!name.endsWith('/.gitkeep')));
 if(exerciseId==='03-ex01')files['src/Livro.php']=`<?php\ndeclare(strict_types=1);\nnamespace StackTrail;\n// Implemente o contrato e as invariantes antes de executar os testes.\nfinal readonly class Livro implements \\JsonSerializable {\n public string $title; public string $author;\n public function __construct(string $title,string $author,public ?int $year=null){throw new \\LogicException('Implemente a construção');}\n public function jsonSerialize():array {throw new \\LogicException('Implemente a representação');}\n}\n`;
 if(['03-ex03','03-ex05','03-ex07'].includes(exerciseId)){
  files['app/Http/Controllers/BookController.php']=`<?php\nnamespace App\\Http\\Controllers;\n// Implemente ações, validação e respostas; preserve os testes como contrato.\nfinal class BookController {\n public function index(){throw new \\LogicException('Implemente a listagem');}\n public function show(){throw new \\LogicException('Implemente a consulta');}\n public function store(){throw new \\LogicException('Implemente a criação');}\n public function update(){throw new \\LogicException('Implemente PATCH');}\n public function destroy(){throw new \\LogicException('Implemente a exclusão');}\n}\n`;
 }
 if(['03-ex09','03-ex20'].includes(exerciseId))files['ADR.md']='# Decisão arquitetural\n\n## Contexto\n\n## Decisão e alternativas\n\n## Evidências técnicas\n\n## Custos e limites\n\n## Próximos passos\n';
 if(['03-ex02','03-ex04','03-ex06','03-ex08'].includes(exerciseId)){
  const path=project.id==='node-http'?'src/cli.ts':project.id==='express-api'?'src/app.ts':'src/books.controller.ts';
  files[path]='// Sua tentativa: implemente o contrato descrito e execute os testes localmente.\nthrow new Error("Implementação pendente");\n';
 }
 if(['03-ex10','03-ex11'].includes(exerciseId))files['src/Report.php']="<?php\ndeclare(strict_types=1);\nnamespace StackTrail;\nfinal class Report { public static function titles(array $titles,string $term=''):array { throw new \\LogicException('Implemente a transformação'); } }\n";
 if(['03-ex13','03-ex14'].includes(exerciseId))files['src/learning.ts']="// Implemente o contrato de linguagem e leitura assíncrona.\nexport function first<T>(items:readonly T[]):T|undefined { throw new Error('Implemente'); }\nexport function titles(value:unknown):string[] { throw new Error('Implemente'); }\nexport async function loadTitles(path:string):Promise<string[]> { throw new Error('Implemente'); }\n";
 if(exerciseId==='03-ex15')files['src/app.ts']="// Implemente makeServer conforme testes HTTP nativos.\nexport function makeServer(){ throw new Error('Implemente'); }\n";
 if(['03-ex16','03-ex19'].includes(exerciseId))files['src/books/router.ts']="import {Router} from 'express';\nexport function booksRouter(){ const router=Router(); /* Implemente os contratos */ return router; }\n";
 if(exerciseId==='03-ex17')files['src/books/schemas.ts']="// Construa schemas e payload antes de alterar o catálogo.\nexport function payload(value:unknown,partial=false):{title?:string;author?:string}|null { throw new Error('Implemente'); }\n";
 if(['03-ex12','03-ex18'].includes(exerciseId))files['TEST_PLAN.md']='# Sua investigação\n\nAcrescente testes próprios; registre defeito reproduzido, asserção discriminante e recuperação.\n';
 return files;
}
export function readCodeDraft(raw:string,project:StudyProject):Record<string,string>|null{
 if(!raw.trim())return null;
 try{const data:unknown=JSON.parse(raw);if(!data||typeof data!=='object'||!('version'in data)||data.version!==1||!('project'in data)||data.project!==project.id||!('files'in data)||!data.files||typeof data.files!=='object'||Array.isArray(data.files))return null;
 const entries=Object.entries(data.files);if(entries.length>80||entries.some(([name,text])=>!validFileName(name)||typeof text!=='string'||text.length>200_000))return null;
 return Object.fromEntries(entries) as Record<string,string>;
 }catch{return null;}
}
export function validFileName(name:string){return name.length<180&&!name.startsWith('/')&&!name.split('/').some(p=>!p||p==='.'||p==='..')&&/^[a-zA-Z0-9_.\-/]+$/.test(name);}
export function serializeDraft(project:StudyProject,files:Record<string,string>){return JSON.stringify({version:1,project:project.id,files},null,2);}
