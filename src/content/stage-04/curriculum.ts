import {lessons} from './index';
import type {BackendTrack} from '../stage-03/curriculum';
export const visibleLessons04=(track:BackendTrack)=>lessons.filter(l=>l.area==='common'||l.area===track);
export const exerciseTrack04=(id:string):BackendTrack|'common'=>id.includes('-php-')?'php':id.includes('-js-')?'javascript':'common';
export const visibleExercise04=(id:string,track:BackendTrack)=>['common',track].includes(exerciseTrack04(id));
export const requirement04=(number:number):'Obrigatório'|'Recomendado'|'Opcional'=>number===9?'Recomendado':number===11?'Opcional':'Obrigatório';
export function contextTrack04(id:string,fallback:BackendTrack):BackendTrack{const area=lessons.find(l=>l.id===id)?.area;return area==='php'||area==='javascript'?area:fallback;}
