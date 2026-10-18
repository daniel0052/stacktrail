import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { activityById, topics, activities as tasks, priorPortfolio as project } from './curriculum';
export const PILOT_KEY = 'stacktrail:roadmap:1';
export const LEGACY_KEY = 'backend-academy:progress';
export type Attempt = {
    status: 'novo' | 'em-andamento' | 'concluido';
    solution: string;
    reflection: string;
    evidence: string;
    checks: boolean[];
    hints: number;
    startedAt?: string;
};
export type StageTrackingStatus = 'nao-iniciada' | 'em-andamento' | 'pausada';
export type StageTracking = {
    status: StageTrackingStatus;
    startedAt?: string;
    pausedAt?: string;
};
export type Pilot = {
    version: 2;
    stageEvidence: Record<'00'|'01'|'02'|'03',string>;
    stageTracking: Record<string, StageTracking>;
    currentStage: '00'|'01'|'02'|'03';
    studied: string[];
    attempts: Record<string, Attempt>;
    track: 'php' | 'javascript';
    theme: 'dark' | 'light';
    font: number;
    legacyArchive: string | null;
};
export const blankAttempt = (id: string): Attempt => ({ status: 'novo', solution: '', reflection: '', evidence: '', checks: activityById(id)!.acceptanceCriteria.map(() => false), hints: 0 });
export const blankPilot = (): Pilot => ({ version: 2, stageEvidence:{'00':'','01':'','02':'','03':''}, stageTracking:{}, currentStage:'00', studied: [], attempts: {}, track: 'php', theme: 'dark', font: 100, legacyArchive: null });
export function updateStageStatus(current: StageTracking | undefined, status: StageTrackingStatus): StageTracking {
    const today = new Date().toISOString().slice(0, 10);
    const base: StageTracking = current ? { ...current, status } : { status };
    if (status === 'em-andamento') {
        if (!base.startedAt) base.startedAt = today;
        delete base.pausedAt;
    } else if (status === 'pausada') {
        base.pausedAt = today;
    } else {
        delete base.startedAt;
        delete base.pausedAt;
    }
    return base;
}
export function resumeStageIfPaused(tracking: Record<string, StageTracking>, stageId: string): Record<string, StageTracking> {
    if (tracking[stageId]?.status !== 'pausada') return tracking;
    return { ...tracking, [stageId]: updateStageStatus(tracking[stageId], 'em-andamento') };
}
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown, max = 200000): v is string => typeof v === 'string' && v.length <= max;
export const canComplete = (a: Attempt) => !!a.solution.trim() && a.checks.length > 0 && a.checks.every(Boolean);
export function updateAttempt(current: Attempt, patch: Partial<Attempt>): Attempt {
    const revised = patch.solution !== undefined && patch.solution !== current.solution;
    const result = { ...current, ...patch };
    if (revised) {
        result.checks = current.checks.map(() => false);
        result.status = 'em-andamento';
        result.evidence = '';
    }
    if (result.status === 'concluido' && !canComplete(result))
        result.status = 'em-andamento';
    if (result.status === 'novo')
        delete result.startedAt;
    else if (result.status === 'em-andamento' && !result.startedAt && (current.status === 'novo' || patch.startedAt !== undefined))
        result.startedAt = patch.startedAt || new Date().toISOString().slice(0, 10);
    return result;
}
function parseAttempt(value: unknown, id: string): Attempt {
    if (!record(value) || !activityById(id) || !['novo', 'em-andamento', 'concluido'].includes(String(value.status)) || !text(value.solution) || !text(value.reflection, 50000) || !text(value.evidence, 50000) || !Array.isArray(value.checks) || value.checks.length !== activityById(id)!.acceptanceCriteria.length || !value.checks.every(v => typeof v === 'boolean') || !Number.isInteger(value.hints) || Number(value.hints) < 0 || Number(value.hints) > 3 || (value.startedAt !== undefined && !text(value.startedAt, 64)))
        throw Error('Tentativa inválida: ' + id);
    const a: Attempt = { status: value.status as Attempt['status'], solution: value.solution, reflection: value.reflection, evidence: value.evidence, checks: [...value.checks] as boolean[], hints: Number(value.hints), ...(typeof value.startedAt === 'string' && value.startedAt ? { startedAt: value.startedAt } : {}) };
    if (a.status === 'concluido' && !canComplete(a))
        a.status = 'em-andamento';
    return a;
}
function parseStageTracking(value: unknown, id: string): StageTracking {
    if (!record(value) || !/^(?:0\d|1\d)$/.test(id) || !['nao-iniciada', 'em-andamento', 'pausada'].includes(String(value.status)) || (value.startedAt !== undefined && !text(value.startedAt, 64)) || (value.pausedAt !== undefined && !text(value.pausedAt, 64)))
        throw Error('Estado de acompanhamento de etapa inválido: ' + id);
    return {
        status: value.status as StageTrackingStatus,
        ...(typeof value.startedAt === 'string' && value.startedAt ? { startedAt: value.startedAt } : {}),
        ...(typeof value.pausedAt === 'string' && value.pausedAt ? { pausedAt: value.pausedAt } : {}),
    };
}
export function parsePilot(value: unknown): Pilot {
    if (!record(value) || typeof value.version!=='number' || ![1,2].includes(value.version) || !Array.isArray(value.studied) || !value.studied.every(id => topics.some(t => t.id === id)) || new Set(value.studied).size !== value.studied.length || !record(value.attempts) || !['php', 'javascript'].includes(String(value.track)) || !['dark', 'light'].includes(String(value.theme)) || ![90, 100, 110, 120, 130, 140, 150].includes(Number(value.font)) || typeof value.font !== 'number' || !(value.legacyArchive === null || text(value.legacyArchive, 30000000)))
        throw Error('Backup do piloto inválido. Dados atuais preservados.');
    const next = blankPilot();
    if(value.version===2){
        if(!record(value.stageEvidence)||!text(value.stageEvidence['00'],50000)||!text(value.stageEvidence['01'],50000)||(value.stageEvidence['02']!==undefined&&!text(value.stageEvidence['02'],50000))||(value.stageEvidence['03']!==undefined&&!text(value.stageEvidence['03'],50000))||!['00','01','02','03'].includes(String(value.currentStage))||(value.stageTracking!==undefined&&!record(value.stageTracking)))throw Error('Dados de etapa inválidos.');
        next.stageEvidence={'00':value.stageEvidence['00'],'01':value.stageEvidence['01'],'02':typeof value.stageEvidence['02']==='string'?value.stageEvidence['02']:'','03':typeof value.stageEvidence['03']==='string'?value.stageEvidence['03']:''};
        next.currentStage=value.currentStage as '00'|'01'|'02'|'03';
        if(record(value.stageTracking)){
            for(const [id, st] of Object.entries(value.stageTracking)){
                next.stageTracking[id] = parseStageTracking(st, id);
            }
        }
    }else next.currentStage='01';
    next.studied = [...value.studied] as string[];
    next.track = value.track as Pilot['track'];
    next.theme = value.theme as Pilot['theme'];
    next.font = value.font;
    next.legacyArchive = value.legacyArchive as string | null;
    for (const [id, a] of Object.entries(value.attempts)) {
        next.attempts[id] = parseAttempt(a, id);
    }
    return next;
}
export function migrateLegacy(raw: string | null): {
    pilot: Pilot;
    notice: string;
} {
    const pilot = blankPilot();
    pilot.legacyArchive = raw;
    if (!raw)
        return { pilot, notice: 'Novo progresso. Registros ficam somente neste navegador; exporte um backup.' };
    try {
        const old: unknown = JSON.parse(raw);
        if (!record(old) || typeof old.version !== 'number' || ![1, 2, 3, 4, 5, 6, 7, 8].includes(old.version))
            throw Error('Versão desconhecida');
        if (old.theme === 'dark' || old.theme === 'light')
            pilot.theme = old.theme;
        if (typeof old.fontSize === 'number' && [90, 100, 110, 120, 130, 140, 150].includes(old.fontSize))
            pilot.font = old.fontSize;
        if (old.backendTrack03 === 'php' || old.backendTrack03 === 'javascript')
            pilot.track = old.backendTrack03;
        let count = 0;
        if (record(old.exercises))
            for (const t of tasks.filter(t => /^ex-0[1-9]$/.test(t.id))) {
                const a = old.exercises[t.id];
                if (!record(a))
                    continue;
                try {
                    const parsed = parseAttempt({ ...a, evidence: '' }, t.id);
                    // Only the current pre-pilot snapshot (v8) has an inventoried matching contract.
                    // Older drafts are useful, but old checklists are not evidence for today's criteria.
                    if (old.version < 8) { parsed.checks = parsed.checks.map(() => false); parsed.status = parsed.solution.trim() ? 'em-andamento' : 'novo'; }
                    pilot.attempts[t.id] = parsed;
                    count++;
                }
                catch { /* An invalid legacy record remains in the archive, not in the pilot totals. */ }
            }
        return { pilot, notice: `${count} exercício(s) com contrato correspondente recuperado(s). Conclusões são autoavaliações. Checklists anteriores à versão8 precisam ser reconferidos; originais ficam no arquivo legado. Aulas lidas não viraram tópicos estudados. O arquivo legado permanece intacto.` };
    }
    catch {
        return { pilot, notice: 'Legado não reconhecido: preservado integralmente no backup, sem converter registros nem declarar conclusões.' };
    }
}
export function importBackup(raw: string): Pilot {
    if (raw.length > 32000000)
        throw Error('Arquivo excede o limite de 32 MB.');
    const data: unknown = JSON.parse(raw);
    if (!record(data) || data.schema !== 'stacktrail-roadmap-backup' || ![1,2].includes(Number(data.version)) || !record(data.pilot) || data.version!==data.pilot.version)
        throw Error('Use um backup StackTrail Roadmap v1 ou v2. O progresso atual não foi alterado.');
    return parsePilot(data.pilot);
}
export const backup = (pilot: Pilot) => JSON.stringify({ schema: 'stacktrail-roadmap-backup', version: 2, pilot }, null, 2);
export function completion(pilot: Pilot) {
    const done = (id: string) => pilot.attempts[id]?.status === 'concluido';
    return { topics: topics.filter(t => t.stageId==='01' && !t.optional && pilot.studied.includes(t.id)).length, initial: tasks.filter(t => t.stageId==='01' && t.level === 'inicial' && done(t.id)).length, intermediate: tasks.filter(t => t.stageId==='01' && t.level === 'intermediario' && done(t.id)).length, project: done(project.id) };
}
export function stored(key: string): string | null { try {
    return localStorage.getItem(key);
}
catch {
    return null;
} }
type Store = {
    pilot: Pilot;
    notice: string;
    error: string;
    blocked: boolean;
    change: (fn: (p: Pilot) => Pilot) => void;
    load: (raw: string) => void;
};
const Context = createContext<Store | null>(null);
export function PilotProvider({ children }: {
    children: ReactNode;
}) {
    const [initial] = useState(() => {
        try {
            const raw = localStorage.getItem(PILOT_KEY);
            return raw ? { pilot: parsePilot(JSON.parse(raw)), notice: 'Progresso do piloto recuperado.', error: '' } : { ...migrateLegacy(localStorage.getItem(LEGACY_KEY)), error: '' };
        }
        catch {
            return { pilot: blankPilot(), notice: 'O registro existente não foi sobrescrito.', error: 'Não foi possível ler o progresso. Exporte o registro existente ou importe um backup válido antes de continuar.' };
        }
    });
    const [pilot, setPilot] = useState(initial.pilot);
    const [error, setError] = useState(initial.error);
    const [notice, setNotice] = useState(initial.notice);
    const [blocked, setBlocked] = useState(!!initial.error);
    useEffect(() => { document.documentElement.dataset.theme = pilot.theme; document.documentElement.style.fontSize = `${pilot.font}%`; }, [pilot.theme, pilot.font]);
    useEffect(() => { if (blocked)
        return; try {
        localStorage.setItem(PILOT_KEY, JSON.stringify(pilot));
    }
    catch {
        setError('Não foi possível salvar neste navegador. Exporte seu progresso para evitar perda.');
    } }, [pilot, blocked]);
    const change: Store['change'] = fn => { if (!blocked)
        setPilot(p => fn(p)); };
    const load = (raw: string) => { const next = importBackup(raw); localStorage.setItem(PILOT_KEY, JSON.stringify(next)); setPilot(next); setBlocked(false); setError(''); setNotice('Backup importado. O armazenamento legado original não foi substituído.'); };
    return <Context.Provider value={{ pilot, notice, error, blocked, change, load }}>{children}</Context.Provider>;
}
export function usePilot() { const value = useContext(Context); if (!value)
    throw Error('PilotProvider ausente'); return value; }
