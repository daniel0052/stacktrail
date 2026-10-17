export const networkScenarios = ['sucesso','dns','conexao','tls','timeout','500'] as const;
export type NetworkScenario=typeof networkScenarios[number];
export function networkJourney(scenario:NetworkScenario){
 const steps=[
  {title:'Navegador',owner:'Cliente',detail:'Interpretar URL e decidir o recurso solicitado.'},
  {title:'DNS',owner:'Resolvedor e servidores DNS',detail:'Resolver nome em A/AAAA, seguindo aliases CNAME quando necessário. Caches podem evitar consultas.'},
  {title:'Conexão',owner:'Transporte',detail:'Alcançar IP e porta; estabelecer TCP no percurso HTTPS/HTTP2 conceitual. UDP não fornece sozinho as mesmas garantias.'},
  {title:'TLS',owner:'Cliente e terminador TLS',detail:'Verificar nome, validade e cadeia do certificado; negociar proteção em trânsito. Não autentica usuário da aplicação.'},
  {title:'Proxy / balanceador / CDN',owner:'Infraestrutura',detail:'Encaminhar/distribuir chamadas; uma CDN pode responder a conteúdo cacheado sem alcançar a aplicação. Este caminho mostra cache miss.'},
  {title:'Aplicação',owner:'Servidor',detail:'Validar requisição, aplicar regras e produzir resposta. Timeout não garante que a operação deixou de ocorrer.'},
  {title:'Resposta',owner:'Servidor → cliente',detail:'Cliente recebe status, headers e corpo quando permitido. Processar HTTP não significa necessariamente sucesso de negócio.'},
 ];
 const failureIndex:Partial<Record<NetworkScenario,number>>={dns:1,conexao:2,tls:3,timeout:5};
 const messages:Partial<Record<NetworkScenario,string>>={dns:'Nome não resolvido: sem conexão com o destino e sem status HTTP.',conexao:'IP resolvido, mas porta/conexão indisponível: não há resposta HTTP.',tls:'Certificado não corresponde ao nome esperado. Pare e investigue; não ignore avisos.',timeout:'Prazo esgotado: sem resposta disponível; efeito da operação pode ter ocorrido.'};
 const stop=failureIndex[scenario];
 return steps.slice(0,stop===undefined?steps.length:stop+1).map((step,i)=>({...step,failed:i===stop,detail:i===stop?messages[scenario]!:step.detail,...(i===6?{status:scenario==='500'?500:200}:{} )}));
}
