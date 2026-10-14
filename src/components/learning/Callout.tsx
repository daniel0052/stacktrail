import type { ReactNode } from 'react';

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="callout"><strong>{title}</strong><div>{children}</div></aside>;
}

export function Checkpoint({ question, answer }: { question: string; answer: string }) {
  return <div className="checkpoint"><span className="eyebrow">RECUPERAÇÃO ATIVA</span><p>{question}</p><details><summary>Conferir raciocínio depois de tentar</summary><p>{answer}</p></details></div>;
}
