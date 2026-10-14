export function ThinkingIllustration() {
  return <div className="thinking-illustration" role="img" aria-label="Quatro pilares conectados: decompor, reconhecer padrões, abstrair e descrever um algoritmo. Transformar o problema em uma solução, testar e explicar.">
    <div className="diagram-caption">DO PROBLEMA À SOLUÇÃO</div>
    <div className="thinking-board" aria-hidden="true">
      <div className="thinking-board-bar"><span className="thinking-dots">● ● ●</span><span>problem-solving.lab</span><span className="thinking-mode">00</span></div>
      <div className="thinking-pillars">{[
        { number: '01', symbol: '↳', title: 'Decompor', detail: 'partes menores' },
        { number: '02', symbol: '≋', title: 'Reconhecer', detail: 'padrões e regras' },
        { number: '03', symbol: '◇', title: 'Abstrair', detail: 'o que importa' },
        { number: '04', symbol: '→', title: 'Descrever', detail: 'passos verificáveis' },
      ].map(pillar => <div className="thinking-pillar" key={pillar.number}><div><span className="thinking-symbol">{pillar.symbol}</span><span className="thinking-number">{pillar.number}</span></div><strong>{pillar.title}</strong><small>{pillar.detail}</small></div>)}</div>
      <div className="thinking-trace"><span>ENTRADA</span><i>→</i><span>RACIOCÍNIO</span><i>→</i><span>SAÍDA</span></div>
      <div className="thinking-result"><span className="thinking-result-icon">✓</span><div><strong>Testar. Revisar. Explicar.</strong><small>Uma hipótese por vez.</small></div><span className="thinking-braces">{'{ }'}</span></div>
    </div>
    <p className="thinking-caption">Antes do código, um caminho que faz sentido.</p>
  </div>;
}
