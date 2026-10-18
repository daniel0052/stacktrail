import {it,expect} from 'vitest';
import {initialRestState,simulateRest,bookingInput} from '../features/rest/model';
import {inspectOpenApi,openApiExample} from '../features/rest/openapi';
import {lessons} from '../content/stage-04';
import {visibleLessons04,visibleExercise04} from '../content/stage-04/curriculum';
import {exercises} from '../content/stage-04/exercises';
import {newProgress,parseProgress,restTrackSummary,stageSummary,updateExercise,validPath} from '../features/progress/model';
import {selfAssessment} from '../content/stage-04';
import SwaggerParser from '@apidevtools/swagger-parser';
const request=(method:string,path:string,value:unknown)=>({method,path,headers:'Content-Type: application/json',body:JSON.stringify(value)});
it('modelo protege regras, cancelamento e estado após rejeição',()=>{
 let state=initialRestState();const value={name:'Ana',slot:'2030-06-10T10:00:00Z'};
 let out=simulateRest(state,request('POST','/api/v1/bookings',value));expect(out.reply.status).toBe(201);state=out.state;
 out=simulateRest(state,request('POST','/api/v1/bookings',value));expect(out.reply.status).toBe(409);expect(out.state).toEqual(state);
 expect(simulateRest(state,request('POST','/api/v1/bookings',{...value,status:'cancelled'})).reply.status).toBe(422);
 out=simulateRest(state,request('DELETE','/api/v1/bookings/1',null));expect(out.reply.status).toBe(204);state=out.state;
 expect(simulateRest(state,request('POST','/api/v1/bookings',value)).reply.status).toBe(201);
 expect(()=>bookingInput(value,'2031-01-01T00:00:00Z')).toThrow();
});
it('consultas validadas, unicode e rotas não previstas não alteram estado',()=>{
 const state=initialRestState();for(const path of ['/api/v1/slots/1','/api/v1/books?status=active','/api/v1/bookings?category=backend','/api/v1/books?page=1&page=2','/api/v1/books?sort=internal'])expect(simulateRest(state,request('GET',path,null)).reply.status).toBe(path.includes('slots')?404:422);
 expect(simulateRest(state,request('POST','/api/v1/books',{title:'😀'.repeat(61),category:'base'})).reply.status).toBe(201);
 expect(simulateRest(state,request('PATCH','/api/v1/books/1',{title:42})).state).toEqual(state);
 const list=simulateRest(state,request('GET','/api/v1/books?category=backend&sort=-id&page=2&per_page=1',null));expect(list.reply.body).toEqual({data:[state.books[0]],meta:{page:2,per_page:1,total:2}});
});
it('parser real e análise parcial não certificam documento ou resolvem refs externas',async()=>{
 expect(inspectOpenApi(openApiExample).errors).toEqual([]);expect(inspectOpenApi('openapi: [quebrado').errors.length).toBeGreaterThan(0);
 await SwaggerParser.validate(JSON.parse(openApiExample));
 const data=JSON.parse(openApiExample);data.paths['/api/v1/books/{id}'].parameters[0].required=false;expect(inspectOpenApi(JSON.stringify(data)).errors.length).toBeGreaterThan(0);
});
it.each(['php','javascript'] as const)('conclusão04 por %s dispensa outra stack e opcionais',track=>{
 let p=newProgress();p.backendTrack03=track;p.lessons=visibleLessons04(track).map(l=>`04:${l.id}`);p.assessment04[track]=selfAssessment.map(()=>true);p.evidence04[track]=selfAssessment.map(()=>'Comando, resultado e revisão declarados');p.scores04[track]=[8,8,8,8,8];p.blockers04[track]=false;
 for(const e of exercises.filter(e=>!e.optional&&visibleExercise04(e.id,track))){p=updateExercise(p,e.id,{solution:'tentativa',reflection:'resultado'});p=updateExercise(p,e.id,{checks:e.acceptanceCriteria.map(()=>true),status:'concluido'});}
 expect(restTrackSummary(p,track).ready).toBe(true);expect(stageSummary({...p,backendTrack03:track==='php'?'javascript':'php'},'04').ready).toBe(true);expect(parseProgress(JSON.stringify(p))).toEqual(p);
 const changed=updateExercise(p,exercises[0].id,{solution:'mudança'});expect(stageSummary(changed,'04').ready).toBe(false);
 expect(restTrackSummary({...p,scores04:{...p.scores04,[track]:[7,7,7,7,7]}},track).ready).toBe(false);
});
it('migra v7 preservando preferência e rascunhos sem fabricar evidências04',()=>{
 const p=newProgress();p.backendTrack03='javascript';const old={...p,version:7,assessment04:undefined,evidence04:undefined,scores04:undefined,blockers04:undefined,lessons:['03:nest-modulos']};const result=parseProgress(JSON.stringify(old));expect(result.version).toBe(8);expect(result.backendTrack03).toBe('javascript');expect(result.lessons).toEqual(old.lessons);expect(result.evidence04.php.every(v=>v==='')).toBe(true);
 for(const l of lessons)expect(validPath(`/etapas/04/aulas/${l.id}`)).toBe(true);
 expect(()=>parseProgress(JSON.stringify({...p,scores04:{php:[NaN],javascript:[0,0,0,0,0]}}))).toThrow();
});
