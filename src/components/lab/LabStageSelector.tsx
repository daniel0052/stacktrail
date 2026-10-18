import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { labPath, stageContent, type StageId } from '../../content/stages';

export function LabStageSelector({ stageId }: { stageId: StageId }) {
  const id = useId();
  const navigate = useNavigate();
  return <div className="lab-stage-selector"><label htmlFor={id}>Etapa do laboratório</label><select id={id} value={stageId} onChange={event => {
    const next = event.target.value;
    if (next === '00' || next === '01' || next === '02' || next === '03' || next === '04') navigate(labPath(next));
  }}>{(['00', '01', '02', '03', '04'] as const).map(stage => <option key={stage} value={stage}>Etapa {stage} — {stageContent(stage).title}</option>)}</select></div>;
}
