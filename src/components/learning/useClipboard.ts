import { useEffect, useRef, useState } from 'react';

export function useClipboard() {
  const [feedback, setFeedback] = useState('');
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(timer.current); }; }, []);
  async function copy(text: string) {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(text);
      if (!mounted.current) return;
      setFailed(false); setFeedback('Copiado!');
      timer.current = setTimeout(() => setFeedback(''), 2500);
    } catch {
      if (!mounted.current) return;
      setFailed(true); setFeedback('Não foi possível copiar. Selecione o texto e use a cópia do navegador.');
    }
  }
  return { copy, feedback, failed };
}
