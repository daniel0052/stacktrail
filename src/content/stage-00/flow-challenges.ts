import { additionalCases } from './additional-cases';
import { curriculumChallenges } from './deep-curriculum';
import { blankAlgorithm, expression as ex, literal as lit, variable as v, type Algorithm, type FlowChallenge, type Variable, type TestCase } from '../../features/flow/model';

export const approval: FlowChallenge = {
  id: '00-ex-02',
  variables: [
    { name: 'nota', type: 'numero', input: true, min: 0, max: 10, description: 'Entrada: número de 0 a 10, inclusive; decimais permitidos.' },
    { name: 'resultado', type: 'texto', description: 'Saída: Aprovado ou Reprovado (grafia exata).' },
  ], outputs: ['resultado'],
  rules: ['Leia nota. Se nota ≥ 7, atribua Aprovado a resultado; caso contrário, atribua Reprovado.', 'Informe resultado e termine. O limite 7 está no caminho de aprovação.'],
  tests: [
    { name: 'Acima do limite', input: { nota: 8 }, expected: { resultado: 'Aprovado' } },
    { name: 'Abaixo do limite', input: { nota: 5 }, expected: { resultado: 'Reprovado' } },
    { name: 'No limite', input: { nota: 7 }, expected: { resultado: 'Aprovado' } },
    { name: 'Menor nota', input: { nota: 0 }, expected: { resultado: 'Reprovado' } },
    { name: 'Maior nota', input: { nota: 10 }, expected: { resultado: 'Aprovado' } },
    { name: 'Decimal abaixo do limite', input: { nota: 6.9 }, expected: { resultado: 'Reprovado' } },
  ], additionalTests: [
    { name: 'Fronteira inferior próxima', input: { nota: 6.999 }, expected: { resultado: 'Reprovado' } },
    { name: 'Fronteira superior próxima', input: { nota: 7.001 }, expected: { resultado: 'Aprovado' } },
    { name: 'Decimal intermediário', input: { nota: 4.25 }, expected: { resultado: 'Reprovado' } },
  ], starter: blankAlgorithm(),
};
// Demonstração nas aulas; o laboratório inicia sem solução pronta.
export const approvalExample: Algorithm = {
  version: 1,
  nodes: [
    { id: 'inicio', kind: 'start', x: 240, y: 20 },
    { id: 'ler', kind: 'input', x: 240, y: 120, target: 'nota' },
    { id: 'decidir', kind: 'decision', x: 240, y: 240, expression: ex('>=', v('nota'), lit(7)) },
    { id: 'aprovar', kind: 'process', x: 40, y: 390, target: 'resultado', expression: ex('copy', lit('Aprovado')) },
    { id: 'reprovar', kind: 'process', x: 440, y: 390, target: 'resultado', expression: ex('copy', lit('Reprovado')) },
    { id: 'informar', kind: 'output', x: 240, y: 510, target: 'resultado' },
    { id: 'fim', kind: 'end', x: 240, y: 620 },
  ], edges: [
    { from: 'inicio', to: 'ler', branch: 'next' }, { from: 'ler', to: 'decidir', branch: 'next' },
    { from: 'decidir', to: 'aprovar', branch: 'true' }, { from: 'decidir', to: 'reprovar', branch: 'false' },
    { from: 'aprovar', to: 'informar', branch: 'next' }, { from: 'reprovar', to: 'informar', branch: 'next' },
    { from: 'informar', to: 'fim', branch: 'next' },
  ],
};
const num = (name: string, description: string, input = false, min?: number, max?: number): Variable => ({ name, type: 'numero', description, ...(input ? { input: true, min, max, integer: true } : {}) });
const nums = (name: string, description: string, min = -1000, max = 1000): Variable => ({ name, type: 'numeros', input: true, min, max, integer: true, description });
const text = (name: string, description: string): Variable => ({ name, type: 'texto', description });
const challenge = (id: string, variables: Variable[], outputs: string[], rules: string[], tests: TestCase[], sortedInputs?: string[]): FlowChallenge => ({ id, variables, outputs, rules, tests, starter: blankAlgorithm(), ...(sortedInputs ? { sortedInputs } : {}) });
const contracts: Record<string, FlowChallenge> = {
  ...curriculumChallenges,
  [approval.id]: approval,
  '00-ex-03': challenge('00-ex-03', [num('preco', 'Entrada: preço unitário em centavos, de 0 a 100000.', true, 0, 100000), num('quantidade', 'Entrada: quantidade inteira de 1 a 100.', true, 1, 100), { name: 'cupom', type: 'booleano', input: true, description: 'Entrada: verdadeiro para cupom ativo; falso para inativo.' }, num('subtotal', 'Preço × quantidade, em centavos.'), num('desconto', 'Desconto em centavos; zero se não elegível.'), num('total', 'Saída: subtotal − desconto.')], ['subtotal', 'desconto', 'total'], ['Esta versão começa com um único produto para praticar sequência e decisões antes dos laços.', 'Calcule subtotal = preco × quantidade. Com cupom ativo e subtotal ≥ 10000, desconto = piso(subtotal / 10); caso contrário, zero.', 'Informe subtotal, desconto e total em centavos. Não altere as entradas.'], [
    { name: 'Abaixo do limite', input: { preco: 9999, quantidade: 1, cupom: true }, expected: { subtotal: 9999, desconto: 0, total: 9999 } },
    { name: 'Limite inclusivo', input: { preco: 2500, quantidade: 4, cupom: true }, expected: { subtotal: 10000, desconto: 1000, total: 9000 } },
    { name: 'Sem cupom', input: { preco: 10000, quantidade: 2, cupom: false }, expected: { subtotal: 20000, desconto: 0, total: 20000 } },
    { name: 'Arredondamento', input: { preco: 10009, quantidade: 1, cupom: true }, expected: { subtotal: 10009, desconto: 1000, total: 9009 } },
    { name: 'Preço zero', input: { preco: 0, quantidade: 1, cupom: true }, expected: { subtotal: 0, desconto: 0, total: 0 } },
  ]),
  '00-ex-04': challenge('00-ex-04', [num('inicial', 'Entrada: estoque inicial inteiro de 0 a 1000.', true, 0, 1000), nums('movimentos', 'Entrada: até 100 inteiros de -1000 a 1000. Positivo repõe, negativo retira, zero é rejeitado.'), num('saldo', 'Saldo atual; nunca pode ficar negativo.'), num('i', 'Índice do movimento atual, começando em zero.'), num('proximo', 'Saldo hipotético antes de aceitar um movimento.'), num('aceitos', 'Contador de movimentos aceitos.'), num('rejeitados', 'Contador de movimentos rejeitados.')], ['saldo', 'aceitos', 'rejeitados'], ['Leia inicial e movimentos. Inicialize saldo com inicial e os contadores e índice em zero.', 'Percorra em ordem. Aceite movimento diferente de zero apenas se saldo + movimento ≥ 0; atualize saldo uma vez.', 'Rejeição preserva o saldo e não interrompe o laço. Avance i em ambos os caminhos. Informe saldo e os dois contadores.'], [
    { name: 'Rejeição não interrompe', input: { inicial: 5, movimentos: [-7, 3, -8] }, expected: { saldo: 0, aceitos: 2, rejeitados: 1 } },
    { name: 'Vazio', input: { inicial: 4, movimentos: [] }, expected: { saldo: 4, aceitos: 0, rejeitados: 0 } },
    { name: 'Retirada exata', input: { inicial: 5, movimentos: [-5] }, expected: { saldo: 0, aceitos: 1, rejeitados: 0 } },
    { name: 'Zero e estoque vazio', input: { inicial: 0, movimentos: [0, -1, 2, -1] }, expected: { saldo: 1, aceitos: 2, rejeitados: 2 } },
  ]),
  '00-ex-05': challenge('00-ex-05', [nums('valores', 'Entrada: até 100 inteiros entre -100 e 100.', -100, 100), num('i', 'Índice iniciado em zero.'), num('soma', 'Acumulador de todos os valores.'), num('positivos', 'Contador de valores estritamente maiores que zero.'), { name: 'crescente', type: 'booleano', description: 'Saída: verdadeiro se cada valor após o primeiro for maior que o anterior.' }, num('anterior', 'Valor anterior, usado somente quando i > 0.')], ['soma', 'positivos', 'crescente'], ['Percorra a coleção para acumular soma, contar positivos e comparar vizinhos.', 'Inicialize soma e positivos com zero e crescente com verdadeiro. Zero não é positivo.', 'Valores iguais quebram o crescimento estrito. Vazio e lista unitária são crescentes. Não acesse o anterior na primeira posição.', 'Não preveja valores futuros: descreva somente os dados recebidos.'], [
    { name: 'Crescente', input: { valores: [-1, 0, 3] }, expected: { soma: 2, positivos: 1, crescente: true } },
    { name: 'Repetição', input: { valores: [2, 2, 1] }, expected: { soma: 5, positivos: 3, crescente: false } },
    { name: 'Vazio', input: { valores: [] }, expected: { soma: 0, positivos: 0, crescente: true } },
    { name: 'Unitário', input: { valores: [-3] }, expected: { soma: -3, positivos: 0, crescente: true } },
    { name: 'Quebra no começo', input: { valores: [3, 1, 5] }, expected: { soma: 9, positivos: 3, crescente: false } },
  ]),
  '00-ex-06': challenge('00-ex-06', [num('inicio', 'Entrada: início da nova reserva em minutos; inteiro de 540 a 960.', true, 540, 960), nums('reservas', 'Entrada: inícios de reservas existentes, inteiros entre 540 e 960. Todas duram 60 minutos.', 540, 960), num('fim', 'Fim da nova reserva = inicio + 60.'), num('fimExistente', 'Fim do intervalo existente que está sendo analisado.'), num('i', 'Índice na coleção reservas.'), text('resultado', 'Saída: aceita ou conflito, exatamente.')], ['resultado'], ['Modelo simplificado: todas as reservas duram 60 minutos na mesma sala e dia, dentro de 09:00–17:00.', 'Dois intervalos se sobrepõem se inicio < fimExistente E reservas[i] < fim. Use duas decisões sucessivas se preferir.', 'O fim é exclusivo: encostar não é conflitar. Resultado começa como aceita e passa a conflito se qualquer reserva sobrepuser.', 'Vazio aceita. Não há reserva real nem controle de concorrência.'], [
    { name: 'Encosta no fim', input: { inicio: 660, reservas: [600] }, expected: { resultado: 'aceita' } },
    { name: 'Sobreposição', input: { inicio: 630, reservas: [600] }, expected: { resultado: 'conflito' } },
    { name: 'Encosta no início', input: { inicio: 540, reservas: [600] }, expected: { resultado: 'aceita' } },
    { name: 'Lista vazia', input: { inicio: 960, reservas: [] }, expected: { resultado: 'aceita' } },
    { name: 'Conflito depois de outro intervalo', input: { inicio: 660, reservas: [540, 660] }, expected: { resultado: 'conflito' } },
  ]),
  '00-ex-07': challenge('00-ex-07', [{ ...nums('valores', 'Entrada: até 64 inteiros distintos em ordem crescente, entre -1000 e 1000.'), maxItems: 64 }, num('alvo', 'Entrada: inteiro entre -1000 e 1000.', true, -1000, 1000), num('esquerda', 'Primeiro índice candidato.'), num('direita', 'Último índice candidato.'), num('meio', 'Piso de (esquerda + direita) / 2.'), num('auxiliar', 'Variável auxiliar para calcular o meio em dois blocos.'), num('indice', 'Saída: índice base zero do alvo; -1 quando ausente.')], ['indice'], ['A entrada deve ter no máximo 64 itens; o ambiente verifica ordem estritamente crescente antes de executar.', 'Construa busca binária com meio inferior. Comece em esquerda = 0 e direita = tamanho(valores) − 1.', 'Compare valores[meio] com alvo e elimine o meio já examinado ao reduzir o intervalo. Quando encontrar, informe indice; quando acabar, informe -1.', 'Compare o número de passos no rastreamento com uma busca linear; validar ordem também tem custo. Testes observam comportamento, sem exigir um desenho único.'], [
    { name: 'Meio à direita', input: { valores: [2, 4, 6, 8, 10], alvo: 8 }, expected: { indice: 3 } },
    { name: 'Primeiro', input: { valores: [2, 4, 6], alvo: 2 }, expected: { indice: 0 } },
    { name: 'Último', input: { valores: [2, 4, 6], alvo: 6 }, expected: { indice: 2 } },
    { name: 'Ausente', input: { valores: [2, 4, 6], alvo: 3 }, expected: { indice: -1 } },
    { name: 'Vazio', input: { valores: [], alvo: 2 }, expected: { indice: -1 } },
    { name: 'Unitário', input: { valores: [4], alvo: 4 }, expected: { indice: 0 } },
  ], ['valores']),
  '00-ex-08': challenge('00-ex-08', [
    ...['ab', 'ac', 'cb', 'bd', 'cd'].map(name => ({ name, type: 'booleano' as const, input: true, description: `Entrada: verdadeiro se a conexão ${name.toUpperCase().split('').join('→')} está bloqueada.` })),
    num('custo', 'Saída: custo mínimo em minutos; -1 quando não houver rota.'), text('rota', 'Saída: A-C-B-D, A-B-D, A-C-D ou sem rota.'), { name: 'bloqueio', type: 'booleano', description: 'Auxiliar para combinar bloqueios com OU.' },
  ], ['rota', 'custo'], ['Mapa dirigido: A→B (4), A→C (2), C→B (1), B→D (3), C→D (8). Não existem outras conexões.', 'Compare os caminhos A-C-B-D (6), A-B-D (7) e A-C-D (10). Uma rota só existe se todas as suas conexões estiverem livres.', 'Escolha o menor custo disponível. Sem rota: rota = sem rota e custo = -1. Não é necessário algoritmo geral de grafos.'], [
    { name: 'Sem bloqueios', input: { ab: false, ac: false, cb: false, bd: false, cd: false }, expected: { rota: 'A-C-B-D', custo: 6 } },
    { name: 'Desvio por B', input: { ab: false, ac: true, cb: false, bd: false, cd: false }, expected: { rota: 'A-B-D', custo: 7 } },
    { name: 'Desvio por C', input: { ab: false, ac: false, cb: false, bd: true, cd: false }, expected: { rota: 'A-C-D', custo: 10 } },
    { name: 'Sem chegada a D', input: { ab: false, ac: false, cb: false, bd: true, cd: true }, expected: { rota: 'sem rota', custo: -1 } },
    { name: 'Trecho CB bloqueado', input: { ab: false, ac: false, cb: true, bd: false, cd: false }, expected: { rota: 'A-B-D', custo: 7 } },
    { name: 'Sem saída de A', input: { ab: true, ac: true, cb: false, bd: false, cd: false }, expected: { rota: 'sem rota', custo: -1 } },
  ]),
  '00-ex-09': challenge('00-ex-09', [num('capacidade', 'Entrada: lugares disponíveis, inteiro de 1 a 100.', true, 1, 100), nums('pedidos', 'Entrada: até 100 tamanhos de grupos, inteiros de -100 a 100; valores ≤ 0 devem ser rejeitados.', -100, 100), num('i', 'Índice do grupo na ordem de chegada.'), num('restantes', 'Lugares ainda disponíveis.'), num('aceitos', 'Quantidade de grupos aceitos.'), num('ocupados', 'Quantidade total de lugares ocupados.'), { name: 'resultados', type: 'textos', description: 'Saída em ordem: aceito, sem vagas ou invalido para cada grupo.' }], ['resultados', 'restantes', 'aceitos', 'ocupados'], ['Oficina com sala única: processe pedidos na ordem de chegada. Não reordene para maximizar atendimentos.', 'Grupo com quantidade ≤ 0 recebe invalido. Grupo positivo recebe aceito se couber, ou sem vagas se não couber.', 'Somente aceitos reduzem restantes e aumentam aceitos (um grupo) e ocupados (quantidade de pessoas). Continue após rejeições.', 'Inicialize resultados como coleção vazia e acrescente uma situação por grupo. Informe as quatro saídas, inclusive na lista vazia.', 'Explique na reflexão um invariante e por que ordenar grupos mudaria o contrato.'], [
    { name: 'Rejeitar e continuar', input: { capacidade: 5, pedidos: [3, 4, 2] }, expected: { resultados: ['aceito', 'sem vagas', 'aceito'], restantes: 0, aceitos: 2, ocupados: 5 } },
    { name: 'Vazio', input: { capacidade: 6, pedidos: [] }, expected: { resultados: [], restantes: 6, aceitos: 0, ocupados: 0 } },
    { name: 'Inválidos e limite', input: { capacidade: 4, pedidos: [0, -1, 4, 1] }, expected: { resultados: ['invalido', 'invalido', 'aceito', 'sem vagas'], restantes: 0, aceitos: 1, ocupados: 4 } },
    { name: 'Todos cabem', input: { capacidade: 10, pedidos: [1, 2, 3] }, expected: { resultados: ['aceito', 'aceito', 'aceito'], restantes: 4, aceitos: 3, ocupados: 6 } },
  ]),
};

export const flowChallenges: Record<string, FlowChallenge> = Object.fromEntries(Object.entries(contracts).map(([id,c]) => [id,{...c,additionalTests:c.additionalTests??additionalCases[id]??[]} ]));
