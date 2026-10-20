import {parseJuniorExam,type JuniorExamState} from './exam-state';
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
export type ProfessionalBookStatus = 'pretendo-ler' | 'lendo' | 'concluido';
export type ProfessionalMilestoneStatus = 'nao-iniciado' | 'em-andamento' | 'concluido';
export type ProfessionalMilestoneRecord = {
    status: ProfessionalMilestoneStatus;
    completedAt?: string;
};
export type ProfessionalActivityRecord = {
    status: 'nao-iniciada' | 'em-andamento' | 'concluida';
    notes?: string;
    checks?: boolean[];
    completedAt?: string;
};
export type ProfessionalProgress = {
    books: Record<string, ProfessionalBookStatus>;
    milestones: Record<string, ProfessionalMilestoneRecord>;
    activities?: Record<string, ProfessionalActivityRecord>;
};
export type EnglishLevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type EnglishSkill = 'listening' | 'speaking' | 'reading' | 'writing' | 'vocabulary-grammar';
export type EnglishActivityStatus = 'nao-iniciado' | 'em-andamento' | 'interrompido' | 'concluido';

export type EnglishExerciseAttempt = {
    status: EnglishActivityStatus;
    selectedOption?: string | number;
    textAnswer?: string;
    matchedPairs?: Record<string, string>;
    orderedWords?: string[];
    isCorrect?: boolean;
    selfAssessedChecks?: boolean[];
    startedAt?: string;
    pausedAt?: string;
    completedAt?: string;
    markedForReview?: boolean;
};

export type EnglishDiagnosticResult = {
    completedAt: string;
    score: number;
    total: number;
    percentage: number;
    skillScores: Record<EnglishSkill, { score: number; total: number }>;
    recommendedReview: string[];
    suggestedLevel?: EnglishLevelId;
};

export type EnglishPlacementState = {
    status: EnglishActivityStatus;
    currentQuestionIndex: number;
    answers: Record<number, number>;
    suggestedLevel?: EnglishLevelId;
    score?: number;
    startedAt?: string;
    pausedAt?: string;
    completedAt?: string;
};

export type EnglishEvaluationDraft = {
    status: EnglishActivityStatus;
    answers: Record<string, number>;
    startedAt?: string;
    pausedAt?: string;
};

export type EnglishProgress = {
    selectedLevel: EnglishLevelId;
    studyingLevel: EnglishLevelId;
    completedMilestones: string[];
    exercises: Record<string, EnglishExerciseAttempt>;
    evaluations: Record<string, EnglishDiagnosticResult[]>;
    evaluationDrafts?: Record<string, EnglishEvaluationDraft>;
    initialPlacementDone?: boolean;
    initialPlacementLevel?: EnglishLevelId;
    initialPlacement?: EnglishPlacementState;
    reviewedItemIds?: string[];
    books: Record<string, 'pretendo-ler' | 'lendo' | 'concluido'>;
    studyDays: string[];
    xp: number;
    unlockedAchievements: string[];
    careerMilestonesDone: string[];
};

export const blankEnglishProgress = (): EnglishProgress => ({
    selectedLevel: 'A1',
    studyingLevel: 'A1',
    completedMilestones: [],
    exercises: {},
    evaluations: {},
    evaluationDrafts: {},
    initialPlacement: {
        status: 'nao-iniciado',
        currentQuestionIndex: 0,
        answers: {},
    },
    reviewedItemIds: [],
    books: {},
    studyDays: [],
    xp: 0,
    unlockedAchievements: [],
    careerMilestonesDone: [],
});

export type Pilot = {
    version: 2;
    stageEvidence: Record<'00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10',string>;
    stageTracking: Record<string, StageTracking>;
    currentStage: '00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10';
    catalogStage?: string;
    studied: string[];
    attempts: Record<string, Attempt>;
    juniorExam?: JuniorExamState;
    fullstackEvidence?: Partial<Record<'php'|'javascript',string>>;
    finalEvidence?: Partial<Record<'php'|'javascript',string>>;
    deliveryEvidence?: Partial<Record<'php'|'javascript',string>>;
    securityEvidence?: Partial<Record<'php'|'javascript',string>>;
    track: 'php' | 'javascript';
    theme: 'dark' | 'light';
    font: number;
    legacyArchive: string | null;
    professional?: ProfessionalProgress;
    english?: EnglishProgress;
};
export const blankAttempt = (id: string): Attempt => ({ status: 'novo', solution: '', reflection: '', evidence: '', checks: activityById(id)!.acceptanceCriteria.map(() => false), hints: 0 });
// A07 mantém IDs curriculares estáveis e tentativas independentes por stack.
export const attemptKey=(p:Pick<Pilot,'track'>,id:string)=>['07','08','09','10'].includes(activityById(id)?.stageId??'')?`${id}@${p.track}`:id;
export const attemptFor=(p:Pilot,id:string)=>p.attempts[attemptKey(p,id)];
export const withAttempt=(p:Pilot,id:string,patch:Partial<Attempt>):Pilot=>({...p,attempts:{...p.attempts,[attemptKey(p,id)]:updateAttempt(attemptFor(p,id)??blankAttempt(id),patch)}});
export const stageEvidenceFor=(p:Pilot,id:string)=>id==='10'?p.fullstackEvidence?.[p.track]??'':id==='09'?p.finalEvidence?.[p.track]??'':id==='08'?p.deliveryEvidence?.[p.track]??'':id==='07'?p.securityEvidence?.[p.track]??'':p.stageEvidence[id as keyof Pilot['stageEvidence']]??'';
export const withStageEvidence=(p:Pilot,id:string,value:string):Pilot=>id==='10'?{...p,fullstackEvidence:{...p.fullstackEvidence,[p.track]:value}}:id==='09'?{...p,finalEvidence:{...p.finalEvidence,[p.track]:value}}:id==='08'?{...p,deliveryEvidence:{...p.deliveryEvidence,[p.track]:value}}:id==='07'?{...p,securityEvidence:{...p.securityEvidence,[p.track]:value}}:{...p,stageEvidence:{...p.stageEvidence,[id]:value}};
export const blankPilot = (): Pilot => ({ version: 2, stageEvidence:{'00':'','01':'','02':'','03':'','04':'','05':'','06':'','07':'','08':'','09':'','10':''}, stageTracking:{}, currentStage:'00', studied: [], attempts: {}, track: 'php', theme: 'dark', font: 100, legacyArchive: null, professional: { books: {}, milestones: {} }, english: blankEnglishProgress() });
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
export function updateProfessionalMilestone(current: ProfessionalProgress | undefined, milestoneId: string, status: ProfessionalMilestoneStatus): ProfessionalProgress {
    const base = current ?? { books: {}, milestones: {} };
    const cur = base.milestones[milestoneId];
    if (cur?.status === status) return base;
    const nextMilestones = { ...base.milestones };
    if (status === 'nao-iniciado') {
        delete nextMilestones[milestoneId];
    } else {
        const today = new Date().toISOString().slice(0, 10);
        nextMilestones[milestoneId] = {
            status,
            completedAt: status === 'concluido' ? (cur?.completedAt ?? today) : undefined,
        };
    }
    return { ...base, milestones: nextMilestones };
}
export function updateProfessionalBook(current: ProfessionalProgress | undefined, bookId: string, status: ProfessionalBookStatus): ProfessionalProgress {
    const base = current ?? { books: {}, milestones: {} };
    const nextBooks = { ...base.books };
    if (nextBooks[bookId] === status) {
        delete nextBooks[bookId];
    } else {
        nextBooks[bookId] = status;
    }
    return { ...base, books: nextBooks };
}
export function updateEnglishExercise(
    current: EnglishProgress | undefined,
    exerciseId: string,
    patch: Partial<EnglishExerciseAttempt>,
    xpReward = 15
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.exercises[exerciseId] ?? { status: 'nao-iniciado' };
    const nextAttempt = { ...existing, ...patch };
    const today = new Date().toISOString().slice(0, 10);
    const isFirstCompletion = existing.status !== 'concluido' && patch.status === 'concluido';
    if (isFirstCompletion) {
        nextAttempt.completedAt = today;
        delete nextAttempt.pausedAt;
    } else if (patch.status === 'em-andamento' && !nextAttempt.startedAt) {
        nextAttempt.startedAt = today;
        delete nextAttempt.pausedAt;
    } else if (patch.status === 'interrompido') {
        nextAttempt.pausedAt = today;
    }
    const xpDelta = isFirstCompletion ? xpReward : 0;
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];
    return {
        ...base,
        studyDays,
        xp: base.xp + xpDelta,
        exercises: {
            ...base.exercises,
            [exerciseId]: nextAttempt,
        },
    };
}

export function setEnglishExerciseStatus(
    current: EnglishProgress | undefined,
    exerciseId: string,
    status: EnglishActivityStatus,
    xpReward = 15
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.exercises[exerciseId] ?? { status: 'nao-iniciado' };
    const today = new Date().toISOString().slice(0, 10);
    const nextAttempt: EnglishExerciseAttempt = {
        ...existing,
        status,
    };

    let xpDelta = 0;
    if (status === 'em-andamento') {
        if (!nextAttempt.startedAt) nextAttempt.startedAt = today;
        delete nextAttempt.pausedAt;
    } else if (status === 'interrompido') {
        nextAttempt.pausedAt = today;
    } else if (status === 'concluido') {
        if (existing.status !== 'concluido') {
            nextAttempt.completedAt = today;
            xpDelta = xpReward;
        }
        delete nextAttempt.pausedAt;
    } else if (status === 'nao-iniciado') {
        delete nextAttempt.completedAt;
        delete nextAttempt.pausedAt;
        delete nextAttempt.startedAt;
        delete nextAttempt.selectedOption;
        delete nextAttempt.textAnswer;
        delete nextAttempt.matchedPairs;
        delete nextAttempt.orderedWords;
        delete nextAttempt.isCorrect;
        delete nextAttempt.selfAssessedChecks;
    }

    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];

    return {
        ...base,
        studyDays,
        xp: Math.max(0, base.xp + xpDelta),
        exercises: {
            ...base.exercises,
            [exerciseId]: nextAttempt,
        },
    };
}

export function undoEnglishExerciseCompletion(
    current: EnglishProgress | undefined,
    exerciseId: string,
    xpReward = 15
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.exercises[exerciseId];
    if (!existing || existing.status !== 'concluido') return base;
    const nextAttempt: EnglishExerciseAttempt = {
        ...existing,
        status: 'em-andamento',
    };
    delete nextAttempt.completedAt;
    return {
        ...base,
        xp: Math.max(0, base.xp - xpReward),
        exercises: {
            ...base.exercises,
            [exerciseId]: nextAttempt,
        },
    };
}

export function updateEnglishPlacement(
    current: EnglishProgress | undefined,
    patch: Partial<EnglishPlacementState>
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.initialPlacement ?? {
        status: 'nao-iniciado',
        currentQuestionIndex: 0,
        answers: {},
    };
    const nextPlacement: EnglishPlacementState = {
        ...existing,
        ...patch,
    };
    const today = new Date().toISOString().slice(0, 10);
    if (patch.status === 'em-andamento') {
        if (!nextPlacement.startedAt) nextPlacement.startedAt = today;
        delete nextPlacement.pausedAt;
    } else if (patch.status === 'interrompido') {
        nextPlacement.pausedAt = today;
    } else if (patch.status === 'concluido') {
        nextPlacement.completedAt = today;
        delete nextPlacement.pausedAt;
    }

    const isFirstDone = existing.status !== 'concluido' && nextPlacement.status === 'concluido';
    const xpDelta = isFirstDone ? 50 : 0;
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];

    return {
        ...base,
        studyDays,
        xp: base.xp + xpDelta,
        initialPlacement: nextPlacement,
        initialPlacementDone: nextPlacement.status === 'concluido',
        initialPlacementLevel: nextPlacement.suggestedLevel ?? base.initialPlacementLevel,
    };
}

export function updateEnglishEvaluationDraft(
    current: EnglishProgress | undefined,
    levelId: string,
    patch: Partial<EnglishEvaluationDraft>
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const drafts = base.evaluationDrafts ?? {};
    const existing = drafts[levelId] ?? { status: 'nao-iniciado', answers: {} };
    const today = new Date().toISOString().slice(0, 10);
    const nextDraft: EnglishEvaluationDraft = {
        ...existing,
        ...patch,
    };
    if (patch.status === 'em-andamento' && !nextDraft.startedAt) {
        nextDraft.startedAt = today;
        delete nextDraft.pausedAt;
    } else if (patch.status === 'interrompido') {
        nextDraft.pausedAt = today;
    }
    return {
        ...base,
        evaluationDrafts: {
            ...drafts,
            [levelId]: nextDraft,
        },
    };
}

export function toggleEnglishSpacedReviewItem(
    current: EnglishProgress | undefined,
    itemId: string
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const reviewed = base.reviewedItemIds ?? [];
    const isDone = reviewed.includes(itemId);
    const nextReviewed = isDone ? reviewed.filter(id => id !== itemId) : [...reviewed, itemId];
    const today = new Date().toISOString().slice(0, 10);
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];
    const xpDelta = !isDone ? 10 : 0;
    return {
        ...base,
        studyDays,
        xp: base.xp + xpDelta,
        reviewedItemIds: nextReviewed,
    };
}
export function toggleEnglishMilestone(
    current: EnglishProgress | undefined,
    milestoneId: string
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const isDone = base.completedMilestones.includes(milestoneId);
    const completedMilestones = isDone
        ? base.completedMilestones.filter(m => m !== milestoneId)
        : [...base.completedMilestones, milestoneId];
    const today = new Date().toISOString().slice(0, 10);
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];
    const xpDelta = !isDone ? 50 : 0;
    return {
        ...base,
        completedMilestones,
        studyDays,
        xp: base.xp + xpDelta,
    };
}
export function toggleEnglishCareerMilestone(
    current: EnglishProgress | undefined,
    milestoneId: string
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const isDone = base.careerMilestonesDone.includes(milestoneId);
    const careerMilestonesDone = isDone
        ? base.careerMilestonesDone.filter(m => m !== milestoneId)
        : [...base.careerMilestonesDone, milestoneId];
    const today = new Date().toISOString().slice(0, 10);
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];
    const xpDelta = !isDone ? 40 : 0;
    return {
        ...base,
        careerMilestonesDone,
        studyDays,
        xp: base.xp + xpDelta,
    };
}
export function addEnglishEvaluation(
    current: EnglishProgress | undefined,
    levelId: string,
    result: EnglishDiagnosticResult
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.evaluations[levelId] ?? [];
    const isFirstEval = existing.length === 0;
    const today = new Date().toISOString().slice(0, 10);
    const studyDays = base.studyDays.includes(today) ? base.studyDays : [...base.studyDays, today];
    return {
        ...base,
        studyDays,
        xp: base.xp + (isFirstEval ? 100 : 25),
        evaluations: {
            ...base.evaluations,
            [levelId]: [result, ...existing].slice(0, 10),
        },
    };
}
export function updateEnglishBookStatus(
    current: EnglishProgress | undefined,
    bookId: string,
    status: 'pretendo-ler' | 'lendo' | 'concluido'
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const nextBooks = { ...base.books };
    if (nextBooks[bookId] === status) {
        delete nextBooks[bookId];
    } else {
        nextBooks[bookId] = status;
    }
    return { ...base, books: nextBooks };
}
export function recordEnglishStudySession(current: EnglishProgress | undefined): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const today = new Date().toISOString().slice(0, 10);
    if (base.studyDays.includes(today)) return base;
    return {
        ...base,
        studyDays: [...base.studyDays, today],
        xp: base.xp + 10,
    };
}
export function toggleEnglishExerciseReview(
    current: EnglishProgress | undefined,
    exerciseId: string
): EnglishProgress {
    const base = current ?? blankEnglishProgress();
    const existing = base.exercises[exerciseId] ?? { status: 'nao-iniciado' };
    const nextReview = !existing.markedForReview;
    return {
        ...base,
        exercises: {
            ...base.exercises,
            [exerciseId]: {
                ...existing,
                markedForReview: nextReview,
            },
        },
    };
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
        if(!record(value.stageEvidence)||!text(value.stageEvidence['00'],50000)||!text(value.stageEvidence['01'],50000)||(value.stageEvidence['02']!==undefined&&!text(value.stageEvidence['02'],50000))||(value.stageEvidence['03']!==undefined&&!text(value.stageEvidence['03'],50000))||(value.stageEvidence['04']!==undefined&&!text(value.stageEvidence['04'],50000))||(value.stageEvidence['05']!==undefined&&!text(value.stageEvidence['05'],50000))||(value.stageEvidence['06']!==undefined&&!text(value.stageEvidence['06'],50000))||(value.stageEvidence['10']!==undefined&&!text(value.stageEvidence['10'],50000))||(value.stageEvidence['09']!==undefined&&!text(value.stageEvidence['09'],50000))||(value.stageEvidence['08']!==undefined&&!text(value.stageEvidence['08'],50000))||(value.stageEvidence['07']!==undefined&&!text(value.stageEvidence['07'],50000))||!['00','01','02','03','04','05','06','07','08','09','10'].includes(String(value.currentStage))||(value.stageTracking!==undefined&&!record(value.stageTracking))||(value.catalogStage!==undefined&&!/^(?:0\d|1\d)$/.test(String(value.catalogStage))))throw Error('Dados de etapa inválidos.');
        next.stageEvidence={'10':typeof value.stageEvidence['10']==='string'?value.stageEvidence['10']:'','09':typeof value.stageEvidence['09']==='string'?value.stageEvidence['09']:'','00':value.stageEvidence['00'],'01':value.stageEvidence['01'],'02':typeof value.stageEvidence['02']==='string'?value.stageEvidence['02']:'','03':typeof value.stageEvidence['03']==='string'?value.stageEvidence['03']:'','04':typeof value.stageEvidence['04']==='string'?value.stageEvidence['04']:'','05':typeof value.stageEvidence['05']==='string'?value.stageEvidence['05']:'','06':typeof value.stageEvidence['06']==='string'?value.stageEvidence['06']:'','08':typeof value.stageEvidence['08']==='string'?value.stageEvidence['08']:'','07':typeof value.stageEvidence['07']==='string'?value.stageEvidence['07']:''};
        next.currentStage=value.currentStage as '00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10';
        if(typeof value.catalogStage==='string')next.catalogStage=value.catalogStage;
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
        const match=/^((?:07|08|09|10)-(?:ex-\d{2}|project-[a-z-]+))@(php|javascript)$/.exec(id);
        if(id.includes('@')&&!match)throw Error('Tentativa por trilha inválida: '+id);
        const baseId=match?.[1]??id;
        const key=['07','08','09','10'].includes(activityById(baseId)?.stageId??'')&&!match?attemptKey(next,baseId):id;
        next.attempts[key] = parseAttempt(a, baseId);
    }
    if(value.securityEvidence!==undefined){
        if(!record(value.securityEvidence)||Object.keys(value.securityEvidence).some(k=>!['php','javascript'].includes(k))||Object.values(value.securityEvidence).some(v=>!text(v,50000)))throw Error('Síntese por trilha inválida.');
        next.securityEvidence={...value.securityEvidence} as Pilot['securityEvidence'];
    }else if(next.stageEvidence['07'])next.securityEvidence={[next.track]:next.stageEvidence['07']};
    if(value.juniorExam!==undefined)next.juniorExam=parseJuniorExam(value.juniorExam);
    if(value.fullstackEvidence!==undefined){
      if(!record(value.fullstackEvidence)||Object.keys(value.fullstackEvidence).some(k=>!['php','javascript'].includes(k))||Object.values(value.fullstackEvidence).some(v=>!text(v,50000)))throw Error('Síntese full stack inválida.');
      next.fullstackEvidence={...value.fullstackEvidence} as Pilot['fullstackEvidence'];
    }
    if(value.finalEvidence!==undefined){
      if(!record(value.finalEvidence)||Object.keys(value.finalEvidence).some(k=>!['php','javascript'].includes(k))||Object.values(value.finalEvidence).some(v=>!text(v,50000)))throw Error('Síntese final inválida.');
      next.finalEvidence={...value.finalEvidence} as Pilot['finalEvidence'];
    }
    if(value.deliveryEvidence!==undefined){
        if(!record(value.deliveryEvidence)||Object.keys(value.deliveryEvidence).some(k=>!['php','javascript'].includes(k))||Object.values(value.deliveryEvidence).some(v=>!text(v,50000)))throw Error('Síntese por trilha inválida.');
        next.deliveryEvidence={...value.deliveryEvidence} as Pilot['deliveryEvidence'];
    }else if(next.stageEvidence['08'])next.deliveryEvidence={[next.track]:next.stageEvidence['08']};
    if (record(value.professional)) {
        const booksRecord: Record<string, ProfessionalBookStatus> = {};
        if (record(value.professional.books)) {
            for (const [k, v] of Object.entries(value.professional.books)) {
                if (['pretendo-ler', 'lendo', 'concluido'].includes(String(v))) {
                    booksRecord[k] = v as ProfessionalBookStatus;
                }
            }
        }
        const milestonesRecord: Record<string, ProfessionalMilestoneRecord> = {};
        if (record(value.professional.milestones)) {
            for (const [k, v] of Object.entries(value.professional.milestones)) {
                if (record(v) && ['nao-iniciado', 'em-andamento', 'concluido'].includes(String(v.status))) {
                    milestonesRecord[k] = {
                        status: v.status as ProfessionalMilestoneStatus,
                        ...(typeof v.completedAt === 'string' ? { completedAt: v.completedAt.slice(0, 32) } : {}),
                    };
                }
            }
        }
        const activitiesRecord: Record<string, ProfessionalActivityRecord> = {};
        if (record(value.professional.activities)) {
            for (const [k, v] of Object.entries(value.professional.activities)) {
                if (record(v) && ['nao-iniciada', 'em-andamento', 'concluida'].includes(String(v.status))) {
                    activitiesRecord[k] = {
                        status: v.status as ProfessionalActivityRecord['status'],
                        ...(typeof v.notes === 'string' ? { notes: v.notes.slice(0, 50000) } : {}),
                        ...(Array.isArray(v.checks) ? { checks: v.checks.map(c => Boolean(c)) } : {}),
                        ...(typeof v.completedAt === 'string' ? { completedAt: v.completedAt.slice(0, 32) } : {}),
                    };
                }
            }
        }
        next.professional = {
            books: booksRecord,
            milestones: milestonesRecord,
            ...(Object.keys(activitiesRecord).length > 0 ? { activities: activitiesRecord } : {}),
        };
    }
    if (record(value.english)) {
        const eng = value.english;
        const validLevels: EnglishLevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const selectedLevel = validLevels.includes(eng.selectedLevel as EnglishLevelId) ? (eng.selectedLevel as EnglishLevelId) : 'A1';
        const studyingLevel = validLevels.includes(eng.studyingLevel as EnglishLevelId) ? (eng.studyingLevel as EnglishLevelId) : 'A1';
        const completedMilestones = Array.isArray(eng.completedMilestones) ? eng.completedMilestones.filter(m => typeof m === 'string') : [];
        const exercisesRecord: Record<string, EnglishExerciseAttempt> = {};
        if (record(eng.exercises)) {
            for (const [id, ex] of Object.entries(eng.exercises)) {
                if (record(ex) && ['nao-iniciado', 'em-andamento', 'interrompido', 'concluido'].includes(String(ex.status))) {
                    exercisesRecord[id] = {
                        status: ex.status as EnglishExerciseAttempt['status'],
                        ...(ex.selectedOption !== undefined ? { selectedOption: ex.selectedOption as string | number } : {}),
                        ...(typeof ex.textAnswer === 'string' ? { textAnswer: ex.textAnswer.slice(0, 10000) } : {}),
                        ...(record(ex.matchedPairs) ? { matchedPairs: ex.matchedPairs as Record<string, string> } : {}),
                        ...(Array.isArray(ex.orderedWords) ? { orderedWords: ex.orderedWords.map(String) } : {}),
                        ...(typeof ex.isCorrect === 'boolean' ? { isCorrect: ex.isCorrect } : {}),
                        ...(Array.isArray(ex.selfAssessedChecks) ? { selfAssessedChecks: ex.selfAssessedChecks.map(Boolean) } : {}),
                        ...(typeof ex.startedAt === 'string' ? { startedAt: ex.startedAt.slice(0, 32) } : {}),
                        ...(typeof ex.pausedAt === 'string' ? { pausedAt: ex.pausedAt.slice(0, 32) } : {}),
                        ...(typeof ex.completedAt === 'string' ? { completedAt: ex.completedAt.slice(0, 32) } : {}),
                        ...(typeof ex.markedForReview === 'boolean' ? { markedForReview: ex.markedForReview } : {}),
                    };
                }
            }
        }
        const evaluationsRecord: Record<string, EnglishDiagnosticResult[]> = {};
        if (record(eng.evaluations)) {
            for (const [lvl, evals] of Object.entries(eng.evaluations)) {
                if (Array.isArray(evals)) {
                    evaluationsRecord[lvl] = evals.filter(record).map(e => ({
                        completedAt: typeof e.completedAt === 'string' ? e.completedAt.slice(0, 32) : new Date().toISOString(),
                        score: typeof e.score === 'number' ? e.score : 0,
                        total: typeof e.total === 'number' ? e.total : 0,
                        percentage: typeof e.percentage === 'number' ? e.percentage : 0,
                        skillScores: record(e.skillScores) ? (e.skillScores as Record<EnglishSkill, { score: number; total: number }>) : {
                            listening: { score: 0, total: 0 },
                            speaking: { score: 0, total: 0 },
                            reading: { score: 0, total: 0 },
                            writing: { score: 0, total: 0 },
                            'vocabulary-grammar': { score: 0, total: 0 },
                        },
                        recommendedReview: Array.isArray(e.recommendedReview) ? e.recommendedReview.map(String) : [],
                        ...(validLevels.includes(e.suggestedLevel as EnglishLevelId) ? { suggestedLevel: e.suggestedLevel as EnglishLevelId } : {}),
                    }));
                }
            }
        }
        const evaluationDraftsRecord: Record<string, EnglishEvaluationDraft> = {};
        if (record(eng.evaluationDrafts)) {
            for (const [lvl, draft] of Object.entries(eng.evaluationDrafts)) {
                if (record(draft) && ['nao-iniciado', 'em-andamento', 'interrompido', 'concluido'].includes(String(draft.status))) {
                    evaluationDraftsRecord[lvl] = {
                        status: draft.status as EnglishActivityStatus,
                        answers: record(draft.answers)
                            ? Object.fromEntries(
                                Object.entries(draft.answers)
                                    .filter(([k, v]) => typeof k === 'string' && typeof v === 'number')
                                    .map(([k, v]) => [k, v as number])
                            )
                            : {},
                        ...(typeof draft.startedAt === 'string' ? { startedAt: draft.startedAt.slice(0, 32) } : {}),
                        ...(typeof draft.pausedAt === 'string' ? { pausedAt: draft.pausedAt.slice(0, 32) } : {}),
                    };
                }
            }
        }
        const initialPlacement: EnglishPlacementState = record(eng.initialPlacement)
            ? {
                status: ['nao-iniciado', 'em-andamento', 'interrompido', 'concluido'].includes(String(eng.initialPlacement.status))
                    ? (eng.initialPlacement.status as EnglishActivityStatus)
                    : 'nao-iniciado',
                currentQuestionIndex: typeof eng.initialPlacement.currentQuestionIndex === 'number' ? Math.max(0, eng.initialPlacement.currentQuestionIndex) : 0,
                answers: record(eng.initialPlacement.answers)
                    ? Object.fromEntries(
                        Object.entries(eng.initialPlacement.answers)
                            .filter(([k, v]) => !Number.isNaN(Number(k)) && typeof v === 'number')
                            .map(([k, v]) => [Number(k), v as number])
                    )
                    : {},
                ...(validLevels.includes(eng.initialPlacement.suggestedLevel as EnglishLevelId) ? { suggestedLevel: eng.initialPlacement.suggestedLevel as EnglishLevelId } : {}),
                ...(typeof eng.initialPlacement.score === 'number' ? { score: eng.initialPlacement.score } : {}),
                ...(typeof eng.initialPlacement.startedAt === 'string' ? { startedAt: eng.initialPlacement.startedAt.slice(0, 32) } : {}),
                ...(typeof eng.initialPlacement.pausedAt === 'string' ? { pausedAt: eng.initialPlacement.pausedAt.slice(0, 32) } : {}),
                ...(typeof eng.initialPlacement.completedAt === 'string' ? { completedAt: eng.initialPlacement.completedAt.slice(0, 32) } : {}),
            }
            : {
                status: eng.initialPlacementDone ? 'concluido' : 'nao-iniciado',
                currentQuestionIndex: 0,
                answers: {},
                ...(validLevels.includes(eng.initialPlacementLevel as EnglishLevelId) ? { suggestedLevel: eng.initialPlacementLevel as EnglishLevelId } : {}),
            };
        const reviewedItemIds = Array.isArray(eng.reviewedItemIds) ? eng.reviewedItemIds.filter(id => typeof id === 'string') : [];
        const booksRecord: Record<string, 'pretendo-ler' | 'lendo' | 'concluido'> = {};
        if (record(eng.books)) {
            for (const [k, v] of Object.entries(eng.books)) {
                if (['pretendo-ler', 'lendo', 'concluido'].includes(String(v))) {
                    booksRecord[k] = v as 'pretendo-ler' | 'lendo' | 'concluido';
                }
            }
        }
        next.english = {
            selectedLevel,
            studyingLevel,
            completedMilestones,
            exercises: exercisesRecord,
            evaluations: evaluationsRecord,
            evaluationDrafts: evaluationDraftsRecord,
            initialPlacement,
            reviewedItemIds,
            books: booksRecord,
            studyDays: Array.isArray(eng.studyDays) ? eng.studyDays.filter(d => typeof d === 'string') : [],
            xp: typeof eng.xp === 'number' ? eng.xp : 0,
            unlockedAchievements: Array.isArray(eng.unlockedAchievements) ? eng.unlockedAchievements.filter(a => typeof a === 'string') : [],
            careerMilestonesDone: Array.isArray(eng.careerMilestonesDone) ? eng.careerMilestonesDone.filter(c => typeof c === 'string') : [],
            ...(initialPlacement.status === 'concluido' || eng.initialPlacementDone ? { initialPlacementDone: true } : {}),
            ...(initialPlacement.suggestedLevel ? { initialPlacementLevel: initialPlacement.suggestedLevel } : (validLevels.includes(eng.initialPlacementLevel as EnglishLevelId) ? { initialPlacementLevel: eng.initialPlacementLevel as EnglishLevelId } : {})),
        };
    } else {
        next.english = blankEnglishProgress();
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
