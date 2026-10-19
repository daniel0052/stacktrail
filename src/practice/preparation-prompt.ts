import {activityForTrack,type Activity} from './curriculum';
import {preparationFor,starterEnvironment} from './preparation';

export function preparationPrompt(task:Activity,track:'php'|'javascript'):string{
 task=activityForTrack(task,track);
 const starter=preparationFor(task);if(!starter)throw Error('Esta atividade começa do zero.');
 const env=starterEnvironment(task,starter,track);
 return `StackTrail — IA PREPARADORA DE LABORATÓRIO
Atividade: ${task.id} — ${task.title}
Etapa: ${task.stageId} | Nível: ${task.level}
Stack do material: ${env.stack}
Cenário: ${task.context??task.problem??task.statement}
Objetivo pedagógico: ${task.objectives.join('; ')}
Contrato da atividade (contexto, não encomenda de solução):
${task.requirements.filter(r=>env.track==='php'?!/^(Na Trilha TypeScript|Trilha TypeScript):/.test(r):! /^(Na Trilha PHP\/Laravel|Trilha PHP):/.test(r)).map(r=>`- ${r}`).join('\n')}
Entradas/saídas: ${task.io.join('; ')}
Critérios a serem demonstrados pelo ESTUDANTE: ${task.acceptanceCriteria.join('; ')}
Restrições da atividade: ${task.constraints.join('; ')}
Tipo: ${starter.type==='previous-project'?'Continuação: alternativa ao meu projeto anterior':'Laboratório guiado'}

Gere SOMENTE o estado inicial descrito abaixo. O enunciado identifica o trabalho do estudante, não uma encomenda para resolvê-lo.
Material mínimo: ${starter.material}
Estado inicial: ${starter.initial}
Trabalho reservado ao estudante, NÃO implementar: ${starter.studentWork}
Reprodução/contrato inicial: ${starter.reproduction??'Fornecer fixture fixa e roteiro de estímulos que permita observar o comportamento inicial descrito. Não preencher os testes, a análise ou o entregável solicitado ao estudante.'}
Requisitos locais: ${env.local}
Dependências: escolher o menor conjunto necessário para esse material e versões mutuamente compatíveis; informar versões e pré-requisitos reais. Não inventar compatibilidade. ${env.database?'Banco PostgreSQL exclusivo de estudo/teste; reset limitado ao banco descartável explicitamente nomeado, nunca banco compartilhado.':''}
Estrutura: somente arquivos necessários, configuração mínima, dados sintéticos reiniciáveis e README operacional. Módulo isolado quando bastar; sem API ou frontend desnecessários. Mock de frontend deve ser configurado por ferramenta com interface, sem exigir que eu programe servidor.
Execução: fornecer comandos de instalação, inicialização, smoke test e reset apropriados ao sistema operacional informado; perguntar qual é se necessário. Documentar diretório, portas locais e resultado inicial esperado, separado do observado. Não criar histórico Git, ADR, relatório de investigação ou revisão que sejam entregáveis meus.

LIMITES DA PREPARAÇÃO
Não corrigir o defeito, entregar a refatoração, implementar a melhoria, revelar causa-raiz, arquivo/linha do problema, comentários como "BUG AQUI", gabarito, patch, relatório resolvido ou versão corrigida alternativa. Não gerar a suíte de testes que é objetivo da atividade.
Separar smoke tests básicos do roteiro/teste de reprodução e dos testes de regressão que EU criarei. Se um teste de reprodução vier pronto por necessidade do harness, identificá-lo como reprodução, não como regressão concluída. Problemas intencionais devem ser determinísticos; não adicionar erros acidentais de configuração.
${task.stageId<'05'?'Sem PostgreSQL ou persistência SQL nesta base.':''} ${task.stageId<'07'?'Sem autenticação nesta base.':'Autenticação somente quando constar explicitamente do estado inicial; nunca antecipar a segurança que eu devo implementar.'}
${(task.stageId==='08'||task.stageId==='09')?'Docker, Compose, workflow CI e manifests Kubernetes somente quando fizerem parte do ESTADO INICIAL; não entregar infraestrutura ou melhoria reservada ao estudante. Nenhum deploy externo automático. Provider KinD compatível, contexto descartável nomeado e recursos verificados; se inviável, gerar somente fixtures de análise claramente sintéticas, com manifests incompletos e logs coerentes, sem inventar execução. Portas publicadas no host/port-forward limitadas ao loopback (127.0.0.1); processos dentro dos containers/Pods devem escutar interface apropriada para tráfego interno.':'Sem Docker antes da Etapa08, CI/deploy. Vincular todos os servidores ao loopback (127.0.0.1); sem exposição à rede local.'} Sem microsserviços, frontend extra, serviços pagos, dados pessoais, credenciais reais ou chamadas a terceiros. Uma única stack basta. Não substituir por NestJS.
${starter.vulnerable||task.stageId==='07'?'Ambiente deliberadamente incompleto/inseguro, exclusivamente local, com dados sintéticos. Vincular servidores ao loopback, não publicar em produção nem explorar serviços públicos.':''}

VALIDAÇÃO HONESTA
Se tiver ferramentas, verificar dependências instaláveis, sintaxe, inicialização, smoke tests e reprodução do estado inicial; corrigir apenas falhas acidentais que impeçam o laboratório. Preservar o defeito intencional. Relatar comandos, versões, resultados realmente observados e limites, sem apontar causa/localização do defeito. Não afirmar que validou sem executar. Sem ferramentas, declarar explicitamente: "Ambiente não executado e não validado" e fornecer roteiro para eu verificar. A geração externa pode variar: manter este contrato comportamental e não presumir código idêntico ao de outro laboratório.
Entregar apenas os arquivos iniciais e instruções operacionais. A investigação, implementação, testes-alvo e solução são responsabilidade do estudante.`;
}
