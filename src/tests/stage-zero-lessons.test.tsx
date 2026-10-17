// @vitest-environment jsdom
import type {ComponentType} from 'react';
import {afterEach,it,expect} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {LessonPracticeScope} from '../components/learning/LessonPracticeScope';
const lessons=import.meta.glob<{default:ComponentType}>('../content/stage-00/lessons/*.mdx',{eager:true});
afterEach(cleanup);
it.each(Object.entries(lessons))('renderiza conteúdo e atividades de %s',(path,module)=>{
 const Lesson=module.default;
 render(<MemoryRouter><LessonPracticeScope lessonId={`test:${path}`}><Lesson/></LessonPracticeScope></MemoryRouter>);
 expect(screen.getByRole('heading',{name:'Antes de começar'})).toBeTruthy();
 expect(document.querySelector('.flow-editor')).not.toBeNull();
 expect(document.querySelectorAll('.flow-canvas').length).toBeGreaterThan(0);
});
