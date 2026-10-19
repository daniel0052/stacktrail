// @ts-expect-error Node builtins are test-only; application has browser types.
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
// @ts-expect-error Node builtins are test-only.
import { tmpdir } from 'node:os';
// @ts-expect-error Node builtins are test-only.
import { join } from 'node:path';
// @ts-expect-error Node builtins are test-only.
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { it, expect } from 'vitest';

it('HTML e handler publicados rejeitam e-mail inválido/vazio e exibem confirmação apenas para formato válido', () => {
  const source = (readFileSync('src/content/stage-01/lessons/dom.mdx', 'utf8') as string).replace(/\r\n/g,'\n');
  const block = (language: string) => source.match(new RegExp('```' + language + '\\n([\\s\\S]*?)```'))![1];
  const directory = mkdtempSync(join(tmpdir(), 'stacktrail-dom-proof-'));
  try {
    writeFileSync(join(directory, 'lesson.mjs'), ts.transpileModule(block('ts'), {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    }).outputText);
    const jsdomPath = new URL('../../node_modules/jsdom/lib/api.js', import.meta.url).href;
    writeFileSync(join(directory, 'verify.mjs'), `
import {JSDOM} from ${JSON.stringify(jsdomPath)};
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const dom=new JSDOM(${JSON.stringify(block('html'))},{url:'https://study.invalid'});
for(const key of ['document','HTMLFormElement','HTMLInputElement','HTMLParagraphElement'])globalThis[key]=dom.window[key];
await import('./lesson.mjs');
const form=document.querySelector('form'); const email=document.querySelector('input');const output=document.querySelector('#retorno');
function submit(value){email.value=value;form.dispatchEvent(new dom.window.Event('submit',{cancelable:true}));}
submit('nao-e-email');assert.match(output.textContent,/Informe/);assert.equal(email.getAttribute('aria-invalid'),'true');assert.equal(document.activeElement,email);
submit('');assert.match(output.textContent,/Informe/);
submit('ana@example.test');assert.equal(output.textContent,'E-mail informado: ana@example.test');assert.equal(email.hasAttribute('aria-invalid'),false);
assert.equal(form.noValidate,true);assert.equal(document.querySelector('label').htmlFor,email.id);
dom.window.close();writeFileSync(new URL('./result.txt',import.meta.url),'DOM publicado conferido');
`);
    const result = spawnSync('node', [join(directory, 'verify.mjs')], { encoding: 'utf8' });
    expect(result.status, result.stdout + result.stderr).toBe(0);
    expect(readFileSync(join(directory, 'result.txt'), 'utf8')).toBe('DOM publicado conferido');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
