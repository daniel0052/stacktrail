import { useId, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type StageHeroProps = {
  stageId: string;
  category: string;
  title: ReactNode;
  description: string;
  continueTo: string;
  continueLabel?: string;
  labTo: string;
  illustration: ReactNode;
};
/** Shared presentation for available stages; each stage supplies its own visual. */
export function StageHero({ stageId, category, title, description, continueTo, continueLabel = 'Continuar estudando', labTo, illustration }: StageHeroProps) {
  const id = useId();
  return <section className="hero stage-hero" aria-labelledby={id}>
    <div className="hero-copy"><span className="badge"><span aria-hidden="true">●</span> SUA ETAPA DE ESTUDO</span><p className="hero-kicker">{stageId} / {category}</p><h2 id={id}>{title}</h2><p>{description}</p><div className="hero-actions"><Link className="button primary" to={continueTo}>{continueLabel} <span aria-hidden="true">↗</span></Link><Link className="text-link" to={labTo}>Explorar laboratório <span aria-hidden="true">→</span></Link></div></div>
    {illustration}
  </section>;
}
