import { useId } from 'react';
export function FlowDiagram({ kind }: { kind: 'decision' | 'loop' }) {
  const id = useId().replaceAll(':', '');
  const loop = kind === 'loop';
  const title = loop ? 'Somar uma lista válida' : 'Verificar disponibilidade';
  return <figure className="flow-figure" tabIndex={0} aria-label={`${title}: diagrama com rolagem horizontal em telas pequenas`}><svg viewBox="0 0 600 660" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{loop ? 'Inicialize índice e total em zero. Enquanto índice for menor que o tamanho, some o elemento, incremente índice e volte à decisão. Quando não houver elemento, informe total e termine.' : 'Início, ler quantidade válida, perguntar se quantidade é maior que zero. Sim informa disponível; não informa indisponível. Ambos seguem para fim.'}</desc>
    <defs><marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="currentColor"/></marker></defs>
    <g fill="none" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${id}-arrow)`}>
      <path d="M300 70 V105 M300 175 V225"/>
      {loop ? <><path d="M300 345 V390"/><path d="M430 430 H530 V285 H400"/><path d="M200 285 H70 V535 H205"/></> : <><path d="M200 285 H135 V390"/><path d="M400 285 H465 V390"/><path d="M135 450 V520 H300 V580 M465 450 V520 H300"/></>}
      {loop && <path d="M300 565 V600"/>}
    </g>
    <g fill="var(--panel)" stroke="currentColor" strokeWidth="2">
      <ellipse cx="300" cy="40" rx="85" ry="30"/>
      {loop ? <rect x="165" y="105" width="270" height="70" rx="4"/> : <polygon points="190,105 435,105 410,175 165,175"/>}
      <polygon points="300,225 400,285 300,345 200,285"/>
      {loop ? <><rect x="170" y="390" width="260" height="80" rx="4"/><polygon points="225,505 415,505 395,565 205,565"/></> : <><polygon points="50,390 235,390 215,450 30,450"/><polygon points="380,390 565,390 545,450 360,450"/></>}
      <ellipse cx="300" cy={loop ? 630 : 610} rx="85" ry="30"/>
    </g>
    <g fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="inherit">
      <text x="300" y="47">Início</text>
      <text x="300" y="145">{loop ? 'índice ← 0; total ← 0' : 'Ler quantidade válida'}</text>
      <text x="300" y="282">{loop ? 'índice < tamanho?' : 'quantidade > 0?'}</text>
      {loop ? <><text x="332" y="370">sim</text><text x="130" y="275">não</text><text x="300" y="420">somar lista[índice] ao total</text><text x="300" y="450">índice ← índice + 1</text><text x="300" y="542">Informar total</text></> : <><text x="150" y="275">sim</text><text x="450" y="275">não</text><text x="135" y="425">Disponível</text><text x="465" y="425">Indisponível</text></>}
      <text x="300" y={loop ? 637 : 617}>Fim</text>
    </g>
  </svg><figcaption><strong>{title}.</strong> {loop ? 'A lista e seus valores já foram validados. O índice avança a cada passagem; lista vazia informa total zero.' : 'Quantidade já validada: a saída sim é disponível; não é indisponível.'}</figcaption></figure>;
}
