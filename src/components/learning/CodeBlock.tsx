import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { useClipboard } from './useClipboard';

// Walk only authored MDX children: highlighted spans change presentation, not text.
export function codeText(node: ReactNode): string {
  return Children.toArray(node).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return codeText(child.props.children);
    return '';
  }).join('');
}
export function CopyIcon() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>;
}
export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const { copy, feedback, failed } = useClipboard();
  return <div className="code-block"><div className="code-toolbar"><span className="eyebrow" aria-hidden="true">EXEMPLO</span><button className="code-copy" aria-label="Copiar código do exemplo" onClick={() => void copy(codeText(children))}><CopyIcon/><span>{feedback === 'Copiado!' ? feedback : 'Copiar'}</span></button></div><pre {...props}>{children}</pre><p className={`copy-feedback ${failed ? 'error-text' : ''}`} role="status" aria-live="polite">{feedback}</p></div>;
}
