import {lessons} from './index';
export type BackendTrack = 'php' | 'javascript';
export const trackTitles:Record<BackendTrack,string>={php:'PHP + Laravel',javascript:'JavaScript/TypeScript + Node.js + Express'};
export const commonLessons=['linguagem-runtime','ciclo','configuracao','dependencias-testes','decisao','projeto'];
export const jsLessons=['js-valores','js-funcoes','ts-contratos','ts-narrowing','ts-assincrono','node-runtime','node-io','node-http','express-middleware','express-crud','express-validacao','express-testes'];
export function lessonArea(id:string):BackendTrack|'common'|'extra'{return commonLessons.includes(id)?'common':id.startsWith('nest-')?'extra':jsLessons.includes(id)?'javascript':'php';}
export const exerciseAreas:Record<string,BackendTrack|'common'|'extra'>={
 '03-ex01':'php','03-ex02':'javascript','03-ex03':'php','03-ex04':'javascript','03-ex05':'php','03-ex06':'extra','03-ex07':'php','03-ex08':'extra','03-ex09':'php',
 '03-ex10':'php','03-ex11':'php','03-ex12':'php','03-ex13':'javascript','03-ex14':'javascript','03-ex15':'javascript','03-ex16':'javascript','03-ex17':'javascript','03-ex18':'javascript','03-ex19':'javascript','03-ex20':'javascript','03-ex21':'common'
};
export const assessmentJS=[
 'Distingo linguagem, runtime, framework e servidor HTTP, com exemplos.',
 'Executei módulos JS/TS, validei unknown e expliquei uma Promise rejeitada.',
 'Construí e testei uma API Express CRUD com schemas, validação e erros coerentes.',
 'Demonstrei configuração, logs sem segredos e organização por responsabilidade.',
 'Registrei testes de sucesso, entrada inválida, ausência e recuperação no README.',
 'Obtive revisão baseada em evidências e escrevi ADR com limites e próximos passos.'
];
export function trackLessons(track:BackendTrack){return lessons.filter(l=>['common',track].includes(lessonArea(l.id)));}
export function visibleLessons(track:BackendTrack){return lessons.filter(l=>['common','extra',track].includes(lessonArea(l.id)));}
export function contextTrack(id:string,fallback:BackendTrack):BackendTrack{if(!lessons.some(l=>l.id===id))return fallback;const area=lessonArea(id);return area==='php'||area==='javascript'?area:fallback;}
