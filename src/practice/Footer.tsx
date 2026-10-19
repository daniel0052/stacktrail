import {Link} from 'react-router-dom';

export function Footer(){
 return <footer className="pf-footer">
  <div className="pf-footer-top">
   <div className="pf-footer-identity">
    <Link className="pf-footer-brand" to="/">StackTrail</Link>
    <p className="pf-footer-tagline">Sua jornada de evolução na tecnologia.</p>
    <p>Aprenda, pratique e desenvolva habilidades para o mercado.</p>
   </div>
   <nav aria-label="Navegação do rodapé">
    <Link to="/">Roadmap Backend</Link>
    <Link to="/desenvolvimento-profissional">Desenvolvimento Profissional</Link>
    <Link to="/ingles">Inglês</Link>
    <a href="https://github.com/daniel0052/stacktrail">GitHub</a>
   </nav>
  </div>
  <p className="pf-footer-bottom">© {new Date().getFullYear()} StackTrail · Projeto educacional</p>
 </footer>;
}
