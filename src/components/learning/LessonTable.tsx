import { useId, type ComponentProps } from 'react';

export function LessonTable(props: ComponentProps<'table'>) {
 const id=useId();
 return <div className="lesson-table-scroll" role="region" tabIndex={0} aria-labelledby={id}><span id={id} className="sr-only">Tabela da aula; role horizontalmente quando necessário</span><table {...props}/></div>;
}
