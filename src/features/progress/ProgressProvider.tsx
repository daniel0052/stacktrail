import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fontSizes, newProgress, parseProgress, STORAGE_KEY, updateExercise, type ExerciseProgress, type Progress, type FontSize } from './model';

type Context = { progress: Progress; message: string; error: string; patchExercise: (id: string, patch: Partial<ExerciseProgress>) => void; setLesson: (id: string, done: boolean) => void; setAssessment: (index: number, done: boolean) => void; setAssessment00: (index: number, done: boolean) => void; setEvidence00: (index: number, text: string) => void; setLastPath: (path: string) => void; toggleTheme: () => void; setFontSize: (size: FontSize) => void; importProgress: (raw: string) => boolean };
const ProgressContext = createContext<Context | null>(null);
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { progress: raw ? parseProgress(raw) : newProgress(), error: '' };
  } catch (error) {
    return { progress: newProgress(), error: `Não foi possível carregar o progresso: ${error instanceof Error ? error.message : 'armazenamento indisponível'}. O conteúdo salvo foi preservado; exporte seus rascunhos desta sessão.` };
  }
}
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(load);
  const [progress, setProgress] = useState(loaded.progress);
  const [error, setError] = useState(loaded.error);
  const [message, setMessage] = useState('Progresso e rascunhos são armazenados neste dispositivo.');
  const [canPersist, setCanPersist] = useState(!loaded.error);
  useEffect(() => {
    document.documentElement.dataset.theme = progress.theme;
    document.documentElement.style.fontSize = `${progress.fontSize}%`;
    if (!canPersist) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setMessage('Salvo neste dispositivo. Não sincroniza entre dispositivos.');
    } catch {
      setError('Não foi possível salvar no dispositivo. Suas alterações estão apenas nesta sessão; exporte o progresso antes de sair.');
    }
  }, [progress, canPersist]);
  const value: Context = {
    progress, message, error,
    patchExercise: (id, patch) => setProgress(p => updateExercise(p, id, patch)),
    setLesson: (id, done) => setProgress(p => ({ ...p, lessons: done ? [...new Set([...p.lessons, id])] : p.lessons.filter(l => l !== id) })),
    setAssessment: (index, done) => setProgress(p => ({ ...p, assessment: p.assessment.map((v, i) => i === index ? done : v) })),
    setAssessment00: (index, done) => setProgress(p => ({ ...p, assessment00: p.assessment00.map((v, i) => i === index ? done : v) })),
    setEvidence00: (index, text) => setProgress(p => ({ ...p, evidence00: p.evidence00.map((v, i) => i === index ? text : v) })),
    setLastPath: path => setProgress(p => p.lastPath === path ? p : { ...p, lastPath: path }),
    toggleTheme: () => setProgress(p => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' })),
    setFontSize: size => { if (fontSizes.includes(size)) setProgress(p => ({ ...p, fontSize: size })); },
    importProgress: raw => {
      try { const next = parseProgress(raw); setProgress(next); setError(''); setCanPersist(true); setMessage('Progresso importado.'); return true; }
      catch (e) { setError(e instanceof Error ? e.message : 'Arquivo inválido.'); return false; }
    },
  };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('ProgressProvider ausente.');
  return context;
}
