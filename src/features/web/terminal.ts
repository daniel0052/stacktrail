import { initialHttpState,initialRequest,simulateHttp,type HttpState,type Method } from './http';
export type TerminalState={cwd:string;files:Record<string,string>;dirs:string[];env:Record<string,string>;modes:Record<string,string>;api:HttpState;lastExit:number};
export const newTerminal=():TerminalState=>({cwd:'/lab',files:{'/lab/README.md':'Laboratório HTTP\nGET consulta; POST processa.\nUse dados fictícios.','/lab/requests.txt':'GET /books\nPOST /books'},dirs:['/lab'],env:{PATH:'/usr/bin',API_URL:'https://api.example'},modes:{},api:initialHttpState(),lastExit:0});
type TerminalToken={value:string;operator:boolean};
function lex(command:string,env?:Record<string,string>):TerminalToken[]{
 if(command.length>10000||/[`;\n\r]|\$\(|&&|\|\|/.test(command))throw new Error('Sintaxe não suportada. Sem scripts, substituição de comandos ou execução de shell.');
 const tokens:TerminalToken[]=[];let current='',quote='',started=false;
 const word=()=>{if(started){tokens.push({value:current,operator:false});current='';started=false;}};
 for(let i=0;i<command.length;i++){
  const c=command[i];
  if(c==='$'&&quote!=="'"&&env){const variable=command.slice(i).match(/^\$([A-Za-z_][A-Za-z0-9_]*)/);if(variable){current+=env[variable[1]]??'';i+=variable[0].length-1;started=true;continue;}}
  if(quote){if(c===quote)quote='';else current+=c;started=true;continue;}
  if(c==='"'||c==="'"){quote=c;started=true;}
  else if(/\s/.test(c))word();
  else if(c==='|'||c==='>'){word();if(c==='>'&&command[i+1]==='>'){tokens.push({value:'>>',operator:true});i++;}else tokens.push({value:c,operator:true});}
  else{current+=c;started=true;}
 }
 if(quote)throw new Error('Aspas não fechadas.');word();return tokens;
}
export function tokenize(command:string,env?:Record<string,string>):string[]{return lex(command,env).map(token=>token.value);}

function virtualPath(state:TerminalState,path:string){
 const parts=(path.startsWith('/')?path:state.cwd+'/'+path).split('/');const normalized:string[]=[];for(const part of parts){if(!part||part==='.')continue;if(part==='..')normalized.pop();else normalized.push(part);}
 const result='/'+normalized.join('/');if(result!=='/lab'&&!result.startsWith('/lab/'))throw new Error('Este terminal só navega pelo diretório virtual /lab.');return result;
}
export function runTerminal(original:TerminalState,command:string):{state:TerminalState;output:string;explanation:string}{
 const state={...original,files:{...original.files},dirs:[...original.dirs],env:{...original.env},modes:{...original.modes},lastExit:0};
 try{
  const tokens=lex(command,state.env);if(!tokens.length)return {state,output:'',explanation:'Nenhuma operação.'};
  const redirect=tokens.findIndex(t=>t.operator&&(t.value==='>'||t.value==='>>'));let destination:string|undefined,append=false;
  if(redirect>=0){if(redirect!==tokens.length-2)throw new Error('Use um único destino após > ou >>.');destination=virtualPath(state,tokens[redirect+1].value);append=tokens[redirect].value==='>>';tokens.splice(redirect);}
  const groups:string[][]=[[]];for(const token of tokens){if(token.operator&&token.value==='|')groups.push([]);else groups.at(-1)!.push(token.value);}
  let output='';const effects:string[]=[];
  const read=(name:string)=>{const file=virtualPath(state,name);if(!(file in state.files))throw new Error('Arquivo virtual não encontrado: '+name);return state.files[file];};
  const write=(file:string,value:string)=>{const parent=file.slice(0,file.lastIndexOf('/'));if(!state.dirs.includes(parent))throw new Error('Diretório virtual de destino não existe.');if(state.dirs.includes(file))throw new Error('O destino é diretório.');state.files[file]=value;};
  for(const [position,group] of groups.entries()){
   const [cmd,...raw]=group;if(!cmd)throw new Error('Falta um comando no pipe.');const args=raw;const stdin=output;output='';
   switch(cmd){
    case 'help':output='Comandos locais: pwd, ls [-l], cd DIR, mkdir DIR, cp ORIG DEST, mv ORIG DEST, rm ARQUIVO, cat/less ARQUIVO, grep TEXTO [ARQUIVO], find [DIR], head/tail [-n N] ARQUIVO, echo TEXTO, export NOME=valor, printenv [NOME], chmod 644 ARQUIVO, curl. Pipes e > / >> são virtuais. curl: -i -I -X -H -d --json -v --fail-with-body -o -w. Reiniciar restaura tudo.';break;
    case 'pwd':output=state.cwd;break;
    case 'ls':{const target=args.find(a=>a!=='-l');const dir=target?virtualPath(state,target):state.cwd;if(!state.dirs.includes(dir))throw new Error('Diretório virtual não existe.');output=[...new Set([...Object.keys(state.files),...state.dirs].filter(p=>p.startsWith(dir+'/')).map(p=>p.slice(dir.length+1).split('/')[0]))].map(name=>args.includes('-l')?`${state.modes[dir+'/'+name]??'644'} ${name}`:name).join('\n');break;}
    case 'cd':{const dir=virtualPath(state,args[0]??'/lab');if(!state.dirs.includes(dir))throw new Error('Diretório virtual não existe.');state.cwd=dir;break;}
    case 'mkdir':{if(args.length!==1)throw new Error('Use mkdir DIR, sem opções nesta simulação.');const dir=virtualPath(state,args[0]);if(state.dirs.includes(dir)||dir in state.files)throw new Error('Caminho já existe.');if(!state.dirs.includes(dir.slice(0,dir.lastIndexOf('/'))))throw new Error('Diretório pai não existe.');state.dirs.push(dir);break;}
    case 'cp':case 'mv':{if(args.length!==2)throw new Error('Use origem e destino de arquivo virtual.');const from=virtualPath(state,args[0]),to=virtualPath(state,args[1]);write(to,read(from));if(cmd==='mv'&&from!==to)delete state.files[from];break;}
    case 'rm':{if(args.length!==1||args[0].startsWith('-'))throw new Error('Somente rm ARQUIVO virtual; remoção recursiva não é suportada.');const file=virtualPath(state,args[0]);read(file);delete state.files[file];break;}
    case 'cat':case 'less':if(args.length!==1)throw new Error('Informe um arquivo virtual.');output=read(args[0]);break;
    case 'head':case 'tail':{let n=10;let name=args[0];if(args[0]==='-n'){n=Number(args[1]);name=args[2];}if(!Number.isInteger(n)||n<0||n>1000||!name)throw new Error('Use head/tail -n N ARQUIVO; N entre 0 e 1000.');const contents=read(name);const lines=contents.split('\n');if(contents.endsWith('\n'))lines.pop();output=(cmd==='head'?lines.slice(0,n):n?lines.slice(-n):[]).join('\n');break;}
    case 'grep':{if(args.length<1||args.length>2)throw new Error('Use grep TEXTO [ARQUIVO], sem regex/opções neste recorte.');output=(args[1]?read(args[1]):position>0?stdin:'').split('\n').filter(line=>line.includes(args[0])).join('\n');state.lastExit=output?0:1;break;}
    case 'find':{const dir=virtualPath(state,args[0]??state.cwd);if(!state.dirs.includes(dir))throw new Error('Diretório não existe.');output=[...state.dirs,...Object.keys(state.files)].filter(p=>p===dir||p.startsWith(dir+'/')).join('\n');break;}
    case 'echo':output=args.join(' ');break;
    case 'export':{const match=args.join(' ').match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);if(!match)throw new Error('Use export NOME=valor fictício.');state.env[match[1]]=match[2];break;}
    case 'printenv':output=args[0]?state.env[args[0]]??'':Object.entries(state.env).map(([k,v])=>`${k}=${v}`).join('\n');break;
    case 'chmod':{if(args.length!==2||!/^([0-7]){3}$/.test(args[0]))throw new Error('Use chmod 644 ARQUIVO (três dígitos octais).');const file=virtualPath(state,args[1]);read(file);state.modes[file]=args[0];break;}
    case 'curl':{
     const headers:string[]=[];let method:Method='GET',explicitMethod:Method|undefined,body='',url='',include=false,verbose=false,fail=false,outfile='',format='';
     for(let i=0;i<args.length;i++){
      const arg=args[i];const value=()=>{const v=args[++i];if(v===undefined)throw new Error('Falta valor para '+arg);return v;};
      if(arg==='-i')include=true;else if(arg==='-I')method='HEAD';else if(arg==='-v')verbose=true;else if(arg==='--fail-with-body')fail=true;else if(arg==='-X'){const m=value();if(!['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'].includes(m))throw new Error('Método não suportado.');explicitMethod=m as Method;}else if(arg==='-H')headers.push(value());else if(arg==='-d'||arg==='--json'){body=value();if(method==='GET')method='POST';if(arg==='--json')headers.push('Content-Type: application/json','Accept: application/json');}else if(arg==='-o')outfile=value();else if(arg==='-w')format=value();else if(arg.startsWith('-'))throw new Error('Opção curl não suportada: '+arg);else if(url)throw new Error('Use somente uma URL.');else url=arg;
     }
     if(!url)throw new Error('Informe URL. Nenhuma conexão real será feita.');
     const response=simulateHttp(state.api,{...initialRequest(),method:explicitMethod??method,endpoint:url,headers:headers.join('\n'),body});state.api=response.state;
     const result=response.result;const content=result.body===null?'':JSON.stringify(result.body,null,2);
     if(outfile)write(virtualPath(state,outfile),content);
     output=(verbose?'[verbose simulado] '+result.trace.join('\n')+'\n':'')+(include||method==='HEAD'?`HTTP ${result.status??'sem status'}\n${Object.entries(result.headers).map(([k,v])=>`${k}: ${v}`).join('\n')}\n\n`:'')+(outfile?'':content)+(format?format.replaceAll('%{http_code}',String(result.status??'000')):'');
     if(fail&&(result.status??0)>=400)state.lastExit=22;else if(result.kind!=='http')state.lastExit=7;
     effects.push('curl simulado usa o mock local; não acessou a URL externa.');break;
    }
    default:throw new Error(`Comando não suportado: ${cmd}. Digite help. Nenhum processo foi iniciado.`);
   }
   effects.push(`${cmd}: operação aplicada apenas ao ambiente virtual.`);
  }
  if(destination){write(destination,(append?(state.files[destination]??''):'')+output+'\n');output='';effects.push(append?'Conteúdo acrescentado no arquivo virtual.':'Arquivo virtual substituído/criado; em shell real confira o destino.');}
  return {state,output,explanation:effects.join(' ')};
 }catch(error){return {state:{...original,lastExit:2},output:error instanceof Error?error.message:'Comando inválido',explanation:'Comando rejeitado; ambiente virtual anterior preservado. Nenhum comando real foi executado.'};}
}
