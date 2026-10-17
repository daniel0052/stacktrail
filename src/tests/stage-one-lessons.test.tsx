// @vitest-environment jsdom
import type {ComponentType} from 'react';
import {afterEach,it,expect} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
const lessons=import.meta.glob<{default:ComponentType}>('../content/stage-01/lessons/*.mdx',{eager:true});
afterEach(cleanup);
it.each(Object.entries(lessons))('renderiza a aula %s e sua recuperação ativa',(_path,module)=>{
 const Lesson=module.default;render(<Lesson/>);
 expect(screen.getByRole('heading',{name:'Antes de começar'})).toBeTruthy();
 expect(screen.getByRole('heading',{name:'Referências'})).toBeTruthy();
 expect(document.querySelector('.checkpoint')).not.toBeNull();
});
