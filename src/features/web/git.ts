export type Commit={id:string;parents:string[];message:string;content:string};
export type GitState={commits:Commit[];branches:Record<string,string>;current:string;work:string;staged:string|null;remote:string;tracking:string;counter:number;conflict:null|{target:string;mode:'merge'|'rebase';replay:string[]};pr:string};
export const newGit=():GitState=>({commits:[{id:'c1',parents:[],message:'Início do laboratório',content:'Guia HTTP'}],branches:{main:'c1'},current:'main',work:'Guia HTTP',staged:null,remote:'c1',tracking:'c1',counter:2,conflict:null,pr:''});
export function ancestors(state:GitState,id:string):Set<string>{const seen=new Set<string>();const pending=[id];while(pending.length){const next=pending.pop()!;if(seen.has(next))continue;seen.add(next);pending.push(...(state.commits.find(c=>c.id===next)?.parents??[]));}return seen;}
export function actGit(original:GitState,action:string,argument=''):{state:GitState;message:string}{
 const state:GitState={...original,commits:original.commits.map(c=>({...c,parents:[...c.parents]})),branches:{...original.branches},conflict:original.conflict?{...original.conflict,replay:[...original.conflict.replay]}:null};
 const head=()=>state.commits.find(c=>c.id===state.branches[state.current])!;
 const commit=(content:string,message:string,parents:string[])=>{if(state.commits.length>=100)throw new Error('Limite didático de 100 commits; reinicie para novo ensaio.');const id=`c${state.counter++}`;state.commits.push({id,content,message,parents});return id;};
 const clean=()=>{if(state.work!==head().content||state.staged!==null||state.conflict)throw new Error('Há alterações/staging/conflito. Resolva ou restaure antes de trocar/integrar.');};
 const finishRebase=(remaining:string[],base:string)=>{
  let current=base;
  for(let i=0;i<remaining.length;i++){
   const old=state.commits.find(c=>c.id===remaining[i])!;const oldParent=state.commits.find(c=>c.id===old.parents[0]);const target=state.commits.find(c=>c.id===current)!;
   if(target.content!==(oldParent?.content??'')&&old.content!==target.content){state.branches[state.current]=current;state.work=`<<<<<<< HEAD\n${target.content}\n=======\n${old.content}\n>>>>>>> commit reaplicado`;state.conflict={mode:'rebase',target:current,replay:remaining.slice(i)};state.staged=null;return false;}
   current=commit(old.content,old.message+' (reaplicado)',[current]);
  }
  state.branches[state.current]=current;state.work=state.commits.find(c=>c.id===current)!.content;state.staged=null;state.conflict=null;return true;
 };
 try{
  let message='';
  switch(action){
   case 'edit':state.work=argument.slice(0,10000);message='Working tree alterada; nada foi adicionado ao staging automaticamente.';break;
   case 'status':message=`Branch ${state.current}; working tree ${state.work===head().content?'igual ao HEAD':'modificada'}; staging ${state.staged===null?'vazio':'preparado'}${state.conflict?'; conflito pendente':''}.`;break;
   case 'diff':message=`HEAD:\n${head().content}\nWorking tree:\n${state.work}\nStaging:\n${state.staged??'(vazio)'}`;break;
   case 'add':state.staged=state.work;message='Snapshot do arquivo colocado no staging. Edições posteriores não alteram esse snapshot.';break;
   case 'commit':{
    if(state.staged===null)throw new Error('Faça add antes de commit.');if(!argument.trim())throw new Error('Escreva uma mensagem explicativa.');if(/^(<<<<<<<|=======|>>>>>>>)/m.test(state.staged))throw new Error('Remova os marcadores e revise a resolução antes do commit.');
    if(state.conflict?.mode==='rebase')throw new Error('Use Continuar rebase depois de resolver e fazer add.');
    const parents=state.conflict?[head().id,state.conflict.target]:[head().id];const id=commit(state.staged,argument.slice(0,200),parents);state.branches[state.current]=id;state.staged=null;state.conflict=null;message='Commit local simulado criado. Não houve push.';break;
   }
   case 'branch':if(!/^[A-Za-z0-9][A-Za-z0-9/_-]{0,59}$/.test(argument)||Object.hasOwn(state.branches,argument))throw new Error('Escolha um nome novo de branch com letras, números, /, _ ou -.');state.branches[argument]=head().id;message='Branch criada apontando para o commit atual; você continua na branch anterior.';break;
   case 'switch':clean();if(!Object.hasOwn(state.branches,argument))throw new Error('Branch não existe.');state.current=argument;state.work=head().content;message='Contexto trocado para '+argument+'.';break;
   case 'restore':if(state.conflict)throw new Error('Resolva o conflito antes de restaurar neste recorte.');state.work=state.staged??head().content;message='Working tree restaurada a partir do staging (ou HEAD sem mudanças preparadas); staging preservado no modelo local.';break;
   case 'merge':case 'pull':case 'rebase':{
    clean();if(action==='pull')state.tracking=state.remote;
    const targetId=action==='pull'?state.tracking:state.branches[argument];const target=state.commits.find(c=>c.id===targetId);if(!target)throw new Error('Escolha uma branch existente para integrar.');
    const ours=head(),oursAnc=ancestors(state,ours.id),theirsAnc=ancestors(state,target.id);
    if(oursAnc.has(target.id)){message='Já contém esse histórico; nenhuma integração necessária.';break;}
    if(theirsAnc.has(ours.id)){state.branches[state.current]=target.id;state.work=target.content;message='Fast-forward: referência avançou, sem commit de merge.';break;}
    const base=[...state.commits].reverse().find(c=>oursAnc.has(c.id)&&theirsAnc.has(c.id))!;
    if(action==='rebase'){
     const replay:string[]=[];let cursor=ours;while(cursor.id!==base.id){if(cursor.parents.length!==1)throw new Error('Este rebase introdutório aceita histórico linear local; merge commits exigem estudo adicional.');replay.unshift(cursor.id);cursor=state.commits.find(c=>c.id===cursor.parents[0])!;}
     message=finishRebase(replay,target.id)?'Commits locais reaplicados com novas identidades. Não reescreva histórico compartilhado sem coordenação.':'Rebase pausado em conflito: resolva, faça add e continue.';break;
    }
    if(ours.content!==base.content&&target.content!==base.content&&ours.content!==target.content){state.conflict={target:target.id,mode:'merge',replay:[]};state.work=`<<<<<<< HEAD\n${ours.content}\n=======\n${target.content}\n>>>>>>> ${argument||'remoto'}`;message='Conflito no arquivo didático: edite as duas intenções, remova marcadores, teste, faça add e commit.';break;}
    const content=ours.content===base.content?target.content:ours.content;state.branches[state.current]=commit(content,'Merge '+(argument||'remoto'),[ours.id,target.id]);state.work=content;message='Merge criado com dois pais.';break;
   }
   case 'continue-rebase':{
    if(state.conflict?.mode!=='rebase'||state.staged===null)throw new Error('Rebase pausado e resolução adicionada são necessários.');if(/^(<<<<<<<|=======|>>>>>>>)/m.test(state.staged))throw new Error('Ainda há marcadores.');
    const [first,...remaining]=state.conflict.replay;const old=state.commits.find(c=>c.id===first)!;const current=commit(state.staged,old.message+' (resolvido/reaplicado)',[head().id]);state.branches[state.current]=current;state.work=state.staged;state.staged=null;state.conflict=null;message=finishRebase(remaining,current)?'Rebase concluído no modelo; identidades antigas permanecem no desenho para comparação.':'Próximo commit tem conflito; revise novamente.';break;
   }
   case 'remote-change':state.remote=commit(argument||'Guia HTTP: alteração da equipe','Equipe alterou o remoto fictício',[state.remote]);message='Uma alteração apareceu no remoto fictício; tracking e branch local ainda não mudaram.';break;
   case 'fetch':state.tracking=state.remote;message='origin/main atualizado no modelo, sem integrar sua branch.';break;
   case 'push':if(!ancestors(state,head().id).has(state.remote))throw new Error('Push fictício recusado: remoto não é ancestral. Faça fetch e integre; não há force-push neste simulador.');state.remote=head().id;state.tracking=state.remote;message='Referência enviada ao remoto fictício. Nenhuma publicação GitHub/deploy ocorreu.';break;
   case 'pr':state.pr=argument.trim()||'Contexto e testes ainda não descritos.';message='Rascunho local de PR criado. Abrir, revisar e publicar PR real continua pendente fora da plataforma.';break;
   default:throw new Error('Operação Git não suportada neste recorte.');
  }
  return {state,message};
 }catch(e){return {state:original,message:e instanceof Error?e.message:'Operação inválida'};}
}
