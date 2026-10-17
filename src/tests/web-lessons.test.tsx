// @vitest-environment jsdom
import type {ComponentType} from 'react';
import {afterEach,it,expect} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {WebScope} from '../components/web/useWebJournal';

const lessons=import.meta.glob<{default:ComponentType}>('../content/stage-02/lessons/*.mdx',{eager:true});
afterEach(cleanup);
it.each(Object.entries(lessons))('renderiza a aula %s sem interpretar exemplos como JavaScript',(path,module)=>{
 const Lesson=module.default;
 render(<WebScope id={`test:${path}`}><Lesson/></WebScope>);
 expect(screen.getByRole('heading',{name:'Objetivo verificável'})).toBeTruthy();
 expect(screen.getByRole('heading',{name:'Referências'})).toBeTruthy();
 expect(document.querySelector('.web-tool')).toBeTruthy();
});
