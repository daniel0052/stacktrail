import type { Exercise } from '../../content/stage-01/types';
import { stageContent } from '../../content/stages';
import { roadmap } from '../../content/roadmap';
const levels = { inicial: 'Inicial', intermediario: 'Intermediário', avancado: 'Avançado' };
export function reviewPrompt(exercise: Exercise, solution: string, reflection: string) {
  const { rubric } = stageContent(exercise.stageId);
  const stage = roadmap.find(s => s.id === exercise.stageId)!;
  return `Atue como revisor pedagógico e técnico ${exercise.stageId === '00' ? 'de pensamento computacional' : 'de desenvolvimento web'} no StackTrail.
Etapa ${exercise.stageId} — ${stage.title}
Exercício ${Number(exercise.id.slice(-2))} — ${exercise.title}
Nível de dificuldade: ${levels[exercise.level]}

Enunciado completo:
${exercise.statement}

Requisitos funcionais e técnicos:
${exercise.requirements.map(s => '- ' + s).join('\n')}

${exercise.problem ? 'Entradas: ' + exercise.problem.inputs.join('; ') + '\nSaídas: ' + exercise.problem.outputs.join('; ') + '\nRestrições: ' + exercise.problem.constraints.join('; ') + '\nExemplos: ' + exercise.problem.examples.map(e => e.input + ' → ' + e.output + ' (' + e.explanation + ')').join('\n') : ''}

Critérios de aceitação:
${exercise.acceptanceCriteria.map(s => '- ' + s).join('\n')}

Rubrica da Etapa ${exercise.stageId}${exercise.stageId === '00' ? ' (elaborada didaticamente; pesos não definidos pelo currículo)' : ''}:
${rubric.map(([criterion, weight]) => '- ' + criterion + ': ' + weight + '%').join('\n')}
${exercise.stageId === '01' ? 'A sugestão original é nota ponderada ≥ 8/10, sem bloqueantes e com demonstração real.' : 'Os pesos são orientadores, sem nota automática nem limiar curricular inventado.'} Não atribua nota sem evidência observável; a revisão da IA é consultiva.

Protocolo de revisão:
- Não aprove uma solução sem evidências. Peça código, instruções de execução, casos testados e resultados realmente observados.
- Não invente resultados de testes ou execução. Informe claramente tudo o que permanece “não verificado”.
- Confira os requisitos deste exercício e revise funcionamento, casos-limite, legibilidade e organização.${exercise.stageId === '01' ? ' Confira HTML e acessibilidade, CSS e responsividade, TypeScript strict, any, narrowing e validação de dados externos.' : ''}
${exercise.stageId === '00' ? '- Avalie compreensão, decomposição, reconhecimento de padrões, abstração, correção e término do algoritmo, casos-limite, clareza do pseudocódigo e qualidade dos testes de mesa. Confira entradas, saídas, restrições, exemplos e justificativa de tempo/memória. Não confunda tabela preenchida com execução real.\n- Para esta etapa, não exija interface web, TypeScript ou HTTP quando não forem requisitos do exercício.' : ''}
${exercise.stageId === '01' ? '- Quando aplicável, confira HTTP, loading/erro/vazio/sucesso, segurança, limites frontend/backend e testes.' : ''}
- Classifique achados em bloqueante, importante ou melhoria. Explique como reproduzir o problema e qual evidência sustenta o achado.
- Não entregue solução pronta nem reescreva o projeto. Faça até 3 perguntas de diagnóstico, ofereça apenas a próxima pista gradual e espere minha tentativa.
- Conclua com “apto para conclusão”, “precisa de correções” ou “não há evidências suficientes”, justificando. Não confunda checklist marcado com comportamento tecnicamente verificado.

Solução (texto fornecido pelo aluno):
${solution || '[Cole sua solução junto com este prompt]'}

O que aprendi / onde travei:
${reflection || '[Ainda não informado]'}

Evidências e passos de execução:
[Acrescentar estrutura de arquivos, trechos relevantes, testes realmente executados e seus resultados. Nunca incluir .env, senhas, tokens ou dados pessoais.]`;
}
