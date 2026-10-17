import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {parseJournal} from '../../features/web/journal';
import {useLessonPracticeScope} from '../learning/LessonPracticeScope';
const Scope=createContext('');
export function WebScope({id,children}:{id:string;children:ReactNode}){return <Scope.Provider value={id}>{children}</Scope.Provider>;}
export function useWebJournal<A,T>(tool:string,seed:()=>T,reduce:(state:T,action:A)=>T,validate:(value:unknown)=>value is A,coalesce?:(a:A,b:A)=>boolean){
 const contextScope=useContext(Scope);const lessonScope=useLessonPracticeScope();const scope=contextScope||lessonScope||'standalone';const key=`stacktrail:web:1:${scope}:${tool}`;
 const [loaded]=useState(()=>{try{const raw=localStorage.getItem(key);return {actions:raw?parseJournal(raw,validate):[],error:''};}catch{return {actions:[] as A[],error:'Não foi possível carregar este rascunho; original preservado. Use reiniciar para substituí-lo conscientemente.'};}});
 const [actions,setActions]=useState<A[]>(loaded.actions);const [error,setError]=useState(loaded.error);const [preserve,setPreserve]=useState(!!loaded.error);
 const value=useMemo(()=>actions.reduce(reduce,seed()),[actions,reduce,seed]);
 useEffect(()=>{if(preserve)return;try{localStorage.setItem(key,JSON.stringify({version:1,actions}));}catch{setError('Armazenamento indisponível; esta simulação está apenas na sessão. Copie evidências antes de sair.');}},[actions,key,preserve]);
 function dispatch(action:A){if(!validate(action)){setError('Ação inválida.');return;}setActions(previous=>{if(previous.length&&coalesce?.(previous.at(-1)!,action))return [...previous.slice(0,-1),action];if(previous.length>=200){setError('Limite de 200 ações por simulação atingido; registre evidências e reinicie.');return previous;}return [...previous,action];});}
 function reset(){setActions([]);setPreserve(false);setError('');}
 return {value,dispatch,reset,error};
}
