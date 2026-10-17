import {useLocation,useNavigate} from 'react-router-dom';
import {useProgress} from '../../features/progress/ProgressProvider';
import {backendTrackSummary} from '../../features/progress/model';
import {trackTitles} from '../../content/stage-03/curriculum';
export function TrackSelector(){
 const {progress,setBackendTrack03}=useProgress();const location=useLocation(),navigate=useNavigate();
 return <fieldset className="panel backend-track-selector"><legend>Escolha sua trilha principal</legend><p>Fundamentos comuns + uma trilha bastam para concluir a Etapa 03. Trocar preserva leituras, arquivos e evidências das duas trilhas. NestJS é adicional opcional.</p><div className="form-actions">{(['php','javascript'] as const).map(track=>{const summary=backendTrackSummary(progress,track);return <button type="button" key={track} className={`button ${progress.backendTrack03===track?'primary':'secondary'}`} aria-pressed={progress.backendTrack03===track} onClick={()=>{setBackendTrack03(track);if(/\/etapas\/03\/(aulas|laboratorio)\/.+/.test(location.pathname))navigate(location.pathname.includes('/laboratorio/')?'/etapas/03/laboratorio':'/etapas/03/aulas');}}>{trackTitles[track]} · {summary.percent}%{summary.ready?' · Concluída':''}</button>;})}</div><p role="status">Selecionada: {trackTitles[progress.backendTrack03]}. Conteúdos da outra trilha permanecem disponíveis ao trocar ou acessar uma aula diretamente.</p></fieldset>;
}
