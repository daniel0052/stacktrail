import { useProgress } from '../../features/progress/ProgressProvider';
import { fontSizes } from '../../features/progress/model';

export function FontControls() {
  const { progress, setFontSize } = useProgress();
  const index = fontSizes.indexOf(progress.fontSize);
  return <div className="font-controls" role="group" aria-label="Tamanho dos textos">
    <button aria-label="Diminuir tamanho do texto" disabled={index === 0} onClick={() => setFontSize(fontSizes[index - 1])}>A−</button>
    <button aria-label="Restaurar tamanho padrão do texto" onClick={() => setFontSize(100)} title="Restaurar tamanho padrão"><span aria-hidden="true">↺</span></button>
    <button aria-label="Aumentar tamanho do texto" disabled={index === fontSizes.length - 1} onClick={() => setFontSize(fontSizes[index + 1])}>A+</button>
    <span role="status" aria-live="polite">{progress.fontSize}%</span>
  </div>;
}
