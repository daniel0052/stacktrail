import {lessons as inventory} from '../content/stage-03';
// @vitest-environment jsdom
import type {ComponentType} from 'react';
import {afterEach,it,expect} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
const lessons=import.meta.glob<{default:ComponentType}>('../content/stage-03/lessons/*.mdx',{eager:true});
afterEach(cleanup);
it.each(Object.entries(lessons))('renderiza sem exceção MDX: %s',(_path,module)=>{const Lesson=module.default;render(<Lesson/>);expect(screen.getByRole('heading',{name:'Objetivo verificável'})).toBeTruthy();});

it('cada aula publicada tem uma MDX incluída na regressão',()=>{expect(Object.keys(lessons)).toHaveLength(inventory.length);for(const lesson of inventory)expect(lessons[`../content/stage-03/lessons/${lesson.id}.mdx`]).toBeDefined();});
