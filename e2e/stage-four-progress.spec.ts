import {test,expect} from '@playwright/test';
import {newProgress,updateExercise,STORAGE_KEY} from '../src/features/progress/model';
import {visibleLessons04,visibleExercise04} from '../src/content/stage-04/curriculum';
import {exercises} from '../src/content/stage-04/exercises';
import {selfAssessment} from '../src/content/stage-04';
for(const track of ['php','javascript'] as const)test(`gate04 independente ${track}`,async({page})=>{
 let data=newProgress();data.backendTrack03=track;data.lessons=visibleLessons04(track).map(l=>`04:${l.id}`);data.assessment04[track]=selfAssessment.map(()=>true);data.evidence04[track]=selfAssessment.map(()=>'Teste local e revisão declarados');data.scores04[track]=[8,8,8,8,8];data.blockers04[track]=false;
 for(const ex of exercises.filter(e=>!e.optional&&visibleExercise04(e.id,track))){data=updateExercise(data,ex.id,{solution:'Tentativa',reflection:'Comando e resultado'});data=updateExercise(data,ex.id,{checks:ex.acceptanceCriteria.map(()=>true),status:'concluido'});}
 await page.goto('./');await page.evaluate(({key,value})=>localStorage.setItem(key,value),{key:STORAGE_KEY,value:JSON.stringify(data)});await page.reload();await page.goto('./#/etapas/04/autoavaliacao');
 await expect(page.getByText(/Percurso concluído por autoavaliação/)).toBeVisible();
 await page.getByRole('button',{name:track==='php'?/^JavaScript\/TypeScript/:/^PHP \+ Laravel/}).click();await expect(page.getByText(/Uma trilha suficiente foi concluída/)).toBeVisible();await expect(page.getByText(/Há requisitos pendentes/)).toBeVisible();await page.reload();await expect(page.getByText(/Uma trilha suficiente foi concluída/)).toBeVisible();
 const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),STORAGE_KEY);expect(saved.evidence04[track]).toEqual(data.evidence04[track]);expect(exercises.filter(e=>e.optional).every(e=>!saved.exercises[e.id])).toBe(true);
});
