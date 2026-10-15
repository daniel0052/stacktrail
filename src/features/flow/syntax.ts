import { expression, literal, variable, safeIdentifier, type Operand, type Expression, type Operator } from './model';
const precedence: Record<string,number> = {or:1,'||':1,and:2,'&&':2,'==':3,'!=':3,'>':4,'>=':4,'<':4,'<=':4,'+':5,'-':5,'*':6,'/':6,'%':6};
const builtin: Record<string,{op:Operator; count:number}> = {empty:{op:'empty',count:1},vazio:{op:'empty',count:1},number:{op:'number',count:1},numero:{op:'number',count:1},text:{op:'text',count:1},texto:{op:'text',count:1},not:{op:'not',count:1},append:{op:'append',count:2},contains:{op:'contains',count:2},swap:{op:'swap',count:3},pisoDiv:{op:'floor/',count:2}};
export function parseOperand(source: string): Operand {
 if(source.length>2000) throw new Error('Use expressões com até 2000 caracteres.');
 const tokens: string[]=[];
 let rest=source.trim();
 while(rest) { const token=rest.match(/^(?:"(?:[^"\\]|\\.)*"|(?:\d+(?:\.\d*)?|\.\d+)|[a-zA-Z][a-zA-Z0-9_]*|>=|<=|==|!=|&&|\|\||[+*/%<>()!,[\]-])/); if(!token) throw new Error('Símbolo não permitido. Use valores, variáveis e operações do editor.'); tokens.push(token[0]); if(tokens.length>256) throw new Error('Expressão grande demais.');rest=rest.slice(token[0].length).trimStart(); }
 let index=0,depth=0;
 const nested=(e:Expression):Operand=>({kind:'expression',expression:e});
 const consume=(s:string)=>{if(tokens[index++]!==s) throw new Error(`Esperado: ${s}.`);};
 const parse=(minimum=0):Operand=>{
  if(++depth>24) throw new Error('Expressão profunda demais.');
  let a:Operand;const t=tokens[index++];
  if(!t) throw new Error('Informe um valor ou uma variável.');
  if(t==='('){a=parse();consume(')');}
  else if(t==='-'||t==='!'||t==='not') a=nested(t==='-'?expression('-',literal(0),parse(7)):expression('not',parse(7)));
  else if(t.startsWith('"')) { try {a=literal(JSON.parse(t) as string);} catch {throw new Error('Texto inválido; use aspas duplas e escapes JSON.');} }
  else if(/^\d|^\./.test(t)){const n=Number(t);if(!Number.isFinite(n)||Math.abs(n)>Number.MAX_SAFE_INTEGER)throw new Error('Número fora dos limites.');a=literal(n);}
  else if(['true','false','verdadeiro','falso'].includes(t)) a=literal(t==='true'||t==='verdadeiro');
  else {
   if(!safeIdentifier(t))throw new Error('Nome de variável inválido.');
   if(tokens[index]==='('){index++;const args:Operand[]=[];if(tokens[index]!==')'){do{args.push(parse());if(tokens[index]!==',')break;index++;}while(index<tokens.length);}consume(')');
    if(['tamanho','linhas','colunas'].includes(t)){if(args.length!==1||args[0].kind!=='variable')throw new Error('Informe o nome de uma coleção.');a={kind:t==='colunas'?'columns':'length',name:args[0].name};}
    else {const b=builtin[t];if(!b||args.length!==b.count)throw new Error('Operação desconhecida ou quantidade de argumentos incorreta. Para sua função, use um bloco Chamada.');a=nested({...expression(b.op,args[0],args[1]),...(args[2]?{c:args[2]}:{})});}
   } else { a=variable(t);if(tokens[index]==='['){index++;const first=parse();consume(']');if(tokens[index]==='['){index++;const second=parse();consume(']');a={kind:'cell',name:t,row:first,column:second};}else a={kind:'item',name:t,index:first};} }
  }
  while(tokens[index] in precedence && precedence[tokens[index]]>=minimum){const op=tokens[index++];const b=parse(precedence[op]+1);a=nested(expression(op==='&&'?'and':op==='||'?'or':op as Operator,a,b));}
  depth--;return a;
 };
 const value=parse();if(index!==tokens.length)throw new Error('Há conteúdo depois da expressão. Use um cálculo por bloco.');return value;
}
export function parseExpression(source:string):Expression {const o=parseOperand(source);return o.kind==='expression'?o.expression:expression('copy',o);}
export function parseAssignment(source:string):{target:string;expression:Expression} {
 const m=source.match(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*(?:←|=(?!=))\s*([\s\S]+)$/);
 if(!m||!safeIdentifier(m[1]))throw new Error('Escreva: minhaVariavel = expressão.');
 return {target:m[1],expression:parseExpression(m[2])};
}
export function parseCall(source:string):{target?:string;functionId:string;arguments:Operand[]} {
 const m=source.match(/^\s*(?:([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*)?([a-zA-Z][a-zA-Z0-9_]*)\s*\(([\s\S]*)\)\s*$/);
 if(!m||!safeIdentifier(m[2])||(m[1]&&!safeIdentifier(m[1])))throw new Error('Use: destino = minhaFuncao(argumentos), ou procedimento(argumentos).');
 // Split only at commas outside nested expressions and quoted strings.
 const args:string[]=[];let start=0,depth=0,quoted=false,escape=false;
 for(let i=0;i<m[3].length;i++){const c=m[3][i];if(escape){escape=false;continue;}if(c==='\\'&&quoted){escape=true;continue;}if(c==='"'){quoted=!quoted;continue;}if(quoted)continue;if(c==='('||c==='[')depth++;if(c===')'||c===']')depth--;if(c===','&&depth===0){args.push(m[3].slice(start,i));start=i+1;}}
 if(m[3].trim())args.push(m[3].slice(start));if(args.length>16)throw new Error('Máximo de 16 argumentos.');
 return {target:m[1],functionId:m[2],arguments:args.map(parseOperand)};
}
