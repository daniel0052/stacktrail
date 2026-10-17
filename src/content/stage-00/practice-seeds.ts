import type { Algorithm, Expression } from '../../features/flow/model';

type Seed = { node: string; scope?: string; op?: Expression['op']; value?: number; complete: string; debug: string };
// Deliberate defects belong to the concept being studied, never to the initial Start edge.
const seeds: Record<string, Seed> = {
 expressoes:{node:'multiplicar',op:'+',complete:'Recupere a passagem entre o resultado intermediário e a operação seguinte.',debug:'Compare a transformação do resultado intermediário com a expressão do contrato.'},
 condicionais:{node:'adulto',op:'>',complete:'Recupere um dos caminhos de classificação e explique sua condição.',debug:'Investigue se o limite entre as categorias pertence ao ramo correto.'},
 acumuladores:{node:'somar',op:'-',complete:'Recupere o percurso que processa um item antes do avanço.',debug:'Acompanhe como cada item altera o acumulador, incluindo sinais diferentes.'},
 contagem:{node:'positivo',op:'>=',complete:'Recupere um ramo da classificação dos itens.',debug:'Diferencie um item positivo de um item igual a zero.'},
 extremos:{node:'limite',value:0,complete:'Recupere a passagem da inicialização para o percurso.',debug:'Compare o valor inicial com uma coleção que contém apenas negativos e com o vazio.'},
 minimo:{node:'limite',value:0,complete:'Recupere a passagem da inicialização para o percurso.',debug:'Compare o valor inicial com uma coleção que contém apenas positivos e com o vazio.'},
 frequencia:{node:'igual',op:'!=',complete:'Recupere um ramo que decide se uma ocorrência é contada.',debug:'Acompanhe qual tipo de item faz o contador mudar: igual ou diferente do alvo.'},
 duplicados:{node:'existe',complete:'Recupere o caminho que decide inserir ou ignorar um valor.',debug:'Observe a primeira ocorrência e uma repetição; compare a política de inserção.'},
 matrizes:{node:'coluna',value:1,complete:'Recupere o percurso entre escolher uma linha e percorrer suas colunas.',debug:'Compare os índices visitados em duas linhas; procure células nunca visitadas.'},
 funcoes:{node:'retornar',scope:'calcularMedia',op:'*',complete:'Complete o percurso interno da função até seu retorno.',debug:'Compare a soma local com o valor entregue ao chamador.'},
 procedimentos:{node:'chamar',complete:'Recupere a continuação após a chamada sem valor de retorno.',debug:'A chamada foi configurada com um destino de retorno. Confira se isso combina com a assinatura.'},
 composicao:{node:'retornar',scope:'mediaAjustada',op:'-',complete:'Recupere a continuação entre delegar e devolver o valor ajustado.',debug:'Compare o valor devolvido pela função básica e o ajuste aplicado pela chamadora.'},
 recursao:{node:'reduzir',scope:'fatorial',op:'+',complete:'Complete o caminho recursivo sem perder o caso-base.',debug:'Observe os argumentos das chamadas sucessivas: aproximam-se do caso-base?'},
 linear:{node:'encontrou',op:'!=',complete:'Recupere o ramo que encerra a busca ou permite continuar.',debug:'Compare o índice informado com o valor que realmente está naquela posição.'},
 ordenacao:{node:'comparar',op:'<',complete:'Recupere o ramo que decide trocar os vizinhos.',debug:'Observe para qual direção os valores maiores se deslocam após uma passagem.'},
 integrado:{node:'retornar',scope:'dobrar',op:'+',complete:'Recupere o percurso da transformação dentro da função.',debug:'Separe o teste da transformação de um item do teste do acumulador.'},
 logica:{node:'combinar',op:'or',complete:'Recupere a continuação entre combinar permissões e apresentar o booleano.',debug:'Compare casos em que apenas uma das duas permissões é verdadeira.'},
 conversao:{node:'converter',complete:'Recupere a continuação após converter o tipo.',debug:'A tentativa ignora o texto recebido e converte uma constante. Use textos diferentes para localizar a perda de informação.'},
 'condicao-final':{node:'terminou',op:'>=',complete:'Recupere um dos caminhos da decisão após o corpo.',debug:'Rastreie o último valor incluído antes do teste final, especialmente para n pequeno.'},
 'media-vetor':{node:'vazio',op:'!=',complete:'Recupere um dos caminhos de proteção antes da divisão.',debug:'Compare o caminho de uma coleção vazia com o de uma coleção com itens.'},
};

export function practiceSeed(solution: Algorithm, challengeId: string, mode: 'completar'|'corrigir') {
 const algorithm=structuredClone(solution);
 const seed=seeds[challengeId.replace(/^00-/,'')];
 if(!seed)throw new Error(`Prática sem variante pedagógica: ${challengeId}`);
 const graph=seed.scope?algorithm.functions?.find(f=>f.id===seed.scope)?.algorithm:algorithm;
 const node=graph?.nodes.find(n=>n.id===seed.node);
 if(!graph||!node)throw new Error(`Bloco pedagógico ausente: ${challengeId}/${seed.node}`);
 if(mode==='completar'){
  const edge=graph.edges.findIndex(e=>e.from===node.id);
  if(edge<0){const incoming=graph.edges.findIndex(e=>e.to===node.id);graph.edges.splice(incoming,1);}
  else graph.edges.splice(edge,1);
 }else if(challengeId==='00-duplicados'){
  graph.edges=graph.edges.map(edge=>edge.from===node.id?{...edge,branch:edge.branch==='true'?'false':'true'}:edge);
 }else if(seed.op&&node.expression)node.expression.op=seed.op;
 else if(seed.value!==undefined&&node.expression)node.expression.a={kind:'literal',value:seed.value};
 else if(challengeId==='00-procedimentos')node.target='resultado';
 else if(challengeId==='00-conversao'&&node.expression)node.expression.a={kind:'literal',value:'12'};
 return {algorithm,instruction:mode==='completar'?seed.complete:seed.debug};
}

export function practiceInstruction(challengeId:string, mode:'completar'|'corrigir') {
 const seed=seeds[challengeId.replace(/^00-/,'')];
 return seed ? mode==='completar'?seed.complete:seed.debug : '';
}
