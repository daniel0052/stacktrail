import { useEffect, useRef, useState } from 'react';
import type { Exercise } from '../../content/stage-01/types';
import { useClipboard } from '../learning/useClipboard';
import { CopyIcon } from '../learning/CodeBlock';
import { reviewPrompt } from './reviewPrompt';

export function ReviewDialog({ exercise, solution, reflection, onClose }: { exercise: Exercise; solution: string; reflection: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [prompt, setPrompt] = useState(() => reviewPrompt(exercise, solution, reflection));
  const { copy, feedback, failed } = useClipboard();
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    element?.showModal();
    element?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      if (element?.open) element.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);
  return <dialog ref={dialog} className="review-dialog" aria-labelledby="review-title" aria-describedby="review-help" onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), textarea')];
    const first = controls[0]; const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <header className="dialog-heading"><div><p className="eyebrow">EXERCÍCIO {exercise.id.slice(-2)} / REVISÃO ASSISTIDA</p><h2 id="review-title">Avaliar com IA</h2></div><button className="dialog-close" aria-label="Fechar avaliação com IA" onClick={onClose}>×</button></header>
    <p id="review-help">O prompt de <strong>{exercise.title}</strong> já inclui sua resposta salva e sua reflexão. Nos desafios visuais, inclui também o fluxograma salvo e os resultados das verificações disponíveis. Se ainda não registrou uma resposta, preencha o espaço indicado. Confira o conteúdo, acrescente as evidências que faltarem e copie para a IA escolhida. Nenhum dado é enviado automaticamente.</p>
    <label htmlFor="review-prompt">Prompt de avaliação (editável)</label><textarea id="review-prompt" value={prompt} onChange={e => setPrompt(e.target.value)} spellCheck={false}/>
    <div className="form-actions"><button className="button primary" onClick={() => void copy(prompt)}><CopyIcon/>Copiar prompt</button><button className="button secondary" onClick={onClose}>Fechar</button></div><p role="status" aria-live="polite" className={`copy-feedback ${failed ? 'error-text' : ''}`}>{feedback}</p>
  </dialog>;
}
