export type Market='Brasil'|'Internacional';
export type Seniority='Júnior'|'Pleno'|'Sênior';
export type MarketTrack='PHP/Laravel'|'TypeScript/Express'|'Competências comuns';
export type Classification='Essencial'|'Diferencial'|'Aprofundamento';
export const marketCategories=['Linguagens','Backend','Banco de dados','Testes','Segurança','DevOps','Arquitetura','Cloud','IA','Inglês','Comunicação','Colaboração'] as const;
export type MarketCategory=typeof marketCategories[number];
export type MarketSource={id:string;title:string;organization:string;url:string;type:'Vaga';published:string;consulted:string;region:string;notes:string};
export const marketResearchDate='2026-10-19';
export const marketSources:MarketSource[]=[
 {id:'pabu',title:'Desenvolvedor PHP Laravel Júnior',organization:'Pabu',url:'https://pabu.gupy.io/job/eyJqb2JJZCI6MTIwODk4MjgsInNvdXJjZSI6ImxpbmtlZGluIn0%3D?jobBoardSource=linkedin',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Brasil',notes:'Anúncio encerrado. Evidência histórica acessível; não indica contratação aberta.'},
 {id:'mplan',title:'Desenvolvimento backend Pleno',organization:'MPlan',url:'https://mplan.gupy.io/jobs/12688768?jobBoardSource=gupy_public_page',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Brasil',notes:'Node.js/TypeScript OU Go. Não confirma Express. Disponibilidade pode mudar.'},
 {id:'funcional',title:'Desenvolvimento full stack Pleno',organization:'Funcional Health Tech',url:'https://funcionalhealthtech.gupy.io/jobs/12699530?jobBoardSource=gupy_public_page',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Brasil',notes:'Alternativas de frameworks PHP e Node (Express ou Nest); não representa demanda exclusiva por Laravel/Express.'},
 {id:'leega',title:'Desenvolvimento full stack Sênior',organization:'Leega',url:'https://leega.gupy.io/jobs/12745476?jobBoardSource=gupy_public_page',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Brasil',notes:'Pede Node, Laravel e React na mesma vaga; o StackTrail mantém uma stack suficiente. Não generalizar esse requisito.'},
 {id:'ravenna-j',title:'Junior Laravel Developer',organization:'Ravenna Interactive',url:'https://ravennainteractive.com/careers/junior-laravel-developer',type:'Vaga',published:'Não informada; início previsto em meados de 2025',consulted:marketResearchDate,region:'Seattle / fuso Pacífico, remoto',notes:'Status atual de contratação não confirmado. Requisitos de localização/fuso não equivalem a remoto mundial.'},
 {id:'ravenna-ms',title:'Mid-level Laravel Developer',organization:'Ravenna Interactive',url:'https://ravennainteractive.com/careers/mid-level-laravel-developer',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Seattle / fuso Pacífico, remoto',notes:'Um anúncio com perfil mid/senior; conta uma única vez na amostra, mesmo relacionado a dois filtros.'},
 {id:'breeze',title:'Junior Software Engineer',organization:'Breeze',url:'https://job-boards.greenhouse.io/breezecash/jobs/5412768008',type:'Vaga',published:'Não informada',consulted:marketResearchDate,region:'Nova York, híbrido',notes:'Título Júnior, mas pede 2+ anos; Node/TypeScript não confirma Express. Não inferir inglês formal do idioma do anúncio.'},
];
export type MarketSkill={id:string;skillKey:string;name:string;description:string;category:MarketCategory;market:Market;seniorities:Seniority[];track:MarketTrack;classification:Classification;justification:string;sourceIds:string[];requirement:'Obrigatório'|'Desejável';evidence:string;researched:string;stages:string[];limitations:string};
type Row=[string,string,MarketCategory,MarketTrack,string[],string[],string,boolean?];
const rows:Row[]=[
 ['php','PHP e Laravel','Backend','PHP/Laravel',['pabu','funcional','leega','ravenna-j','ravenna-ms'],['03','04'],'Laravel consta como requisito; a Funcional aceita também outros frameworks PHP.'],
 ['node','Node.js e TypeScript','Linguagens','TypeScript/Express',['mplan','funcional','breeze'],['03','04'],'Node/TypeScript consta nos recortes; MPlan também aceita Go. Express só está explícito como alternativa na Funcional.'],
 ['node-runtime','Node.js','Backend','TypeScript/Express',['leega'],['03','04'],'Node.js consta na vaga; TypeScript e Express não foram confirmados neste anúncio.'],
 ['express','Express como alternativa de backend','Backend','TypeScript/Express',['funcional'],['03','04'],'Express ou Nest aparece entre alternativas Node; não há exigência exclusiva por Express.'],
 ['sql','Dados relacionais e SQL','Banco de dados','Competências comuns',['pabu','mplan','funcional','leega','ravenna-j','ravenna-ms'],['05'],'Requisitos incluem MySQL ou dados relacionais; MPlan cita PostgreSQL. Não equivalem a exigir todos os bancos.'],
 ['git','Git e revisão de alterações','Colaboração','Competências comuns',['mplan','funcional','leega','ravenna-j','ravenna-ms'],['02','09'],'Git/controle de versões aparece nos requisitos; Leega também cita PR e integração contínua.'],
 ['api','APIs e contratos de integração','Backend','Competências comuns',['funcional','ravenna-j','ravenna-ms'],['02','04'],'Integrações HTTP/APIs e, na Ravenna mid/senior, JSON são competências descritas.'],
 ['tests','Testes automatizados','Testes','Competências comuns',['mplan','funcional'],['06'],'Testes constam nos requisitos destes anúncios Pleno.'],
 ['tests','Testes automatizados','Testes','Competências comuns',['leega'],['06'],'Leega apresenta testes automatizados como diferencial; isso não reduz sua importância curricular.',true],
 ['delivery','Docker e integração contínua','DevOps','Competências comuns',['mplan'],['08'],'MPlan cita Docker e integração contínua. A evidência de CI não implica Kubernetes.'],
 ['ci','Integração contínua','DevOps','Competências comuns',['leega'],['08'],'Leega cita integração contínua; Docker não foi confirmado.'],
 ['containers','Docker e Kubernetes','DevOps','Competências comuns',['funcional'],['08'],'Docker/Kubernetes aparecem como desejáveis neste anúncio.',true],
 ['cloud','AWS e serviços cloud','Cloud','Competências comuns',['mplan'],['08'],'AWS aparece como desejável; não pressupõe conta paga para estudar.',true],
 ['architecture','Microsserviços e observabilidade','Arquitetura','Competências comuns',['mplan'],['08'],'Microsserviços/observabilidade são desejáveis no recorte, dependentes do contexto.',true],
 ['security','OWASP e segurança de aplicação','Segurança','Competências comuns',['funcional'],['07'],'OWASP/segurança aparecem em seção de competências valorizadas.',true],
 ['ai','IA no trabalho de engenharia','IA','Competências comuns',['mplan','leega','breeze'],[],'Uso de IA consta nas expectativas destes anúncios. Não comprova substituição de fundamentos ou demanda por um produto específico.'],
 ['english','Inglês oral e escrito','Inglês','Competências comuns',['ravenna-j','ravenna-ms'],[],'Ravenna pede inglês fluente oral e escrito. Não inferir o mesmo requisito para todo anúncio internacional.'],
 ['communication','Comunicação e autonomia','Comunicação','Competências comuns',['leega','ravenna-j','breeze'],[],'Comunicação/autonomia integram requisitos ou expectativas descritas; remoto depende de colaboração.'],
 ['debug','Debugging e desempenho','Backend','PHP/Laravel',['ravenna-ms'],['06'],'Ravenna mid/senior inclui debugging e desempenho.'],
 ['frontend','JavaScript e ferramentas de frontend','Linguagens','Competências comuns',['ravenna-j'],['01','10'],'JS/npm/Tailwind/Bootstrap são bônus no anúncio Júnior Laravel.',true],
];
function marketOf(id:string):Market{return ['ravenna-j','ravenna-ms','breeze'].includes(id)?'Internacional':'Brasil';}
function levels(id:string):Seniority[]{return ['pabu','ravenna-j','breeze'].includes(id)?['Júnior']:['mplan','funcional'].includes(id)?['Pleno']:id==='ravenna-ms'?['Pleno','Sênior']:['Sênior'];}
export const marketSkills:MarketSkill[]=rows.flatMap(([key,name,category,track,sources,stages,evidence,optional],row)=>sources.map(sourceId=>({
 id:`market-${row}-${sourceId}`,skillKey:key,name,description:evidence,category,market:marketOf(sourceId),seniorities:levels(sourceId),track,
 classification:optional?(key==='architecture'?'Aprofundamento':'Diferencial'):'Essencial',
 justification:optional?(key==='architecture'?'Classificação editorial de aprofundamento: prática especializada desejável neste contexto.':'Classificação editorial de diferencial: o anúncio a coloca como desejável/bônus.'):'Classificação editorial de essencial para o perfil deste anúncio: consta como requisito ou expectativa central. Não mede recorrência no mercado.',
 sourceIds:[sourceId],requirement:optional?'Desejável':'Obrigatório',evidence,researched:marketResearchDate,stages,
 limitations:'Observação de um anúncio, sem representatividade estatística. Publicação não confirmada; consulte a situação da fonte. '+(track==='TypeScript/Express'&&key!=='express'?'Evidência de Node/TypeScript não confirma Express. ':'')+(key==='delivery'&&sourceId==='leega'?'Neste anúncio a evidência é de CI; Docker não foi confirmado.':''),
})));
export type MarketFilters={market:string;seniority:string;track:string;classification:string;category:string};
export function filterMarketSkills(filters:MarketFilters){return marketSkills.filter(s=>(filters.market==='todos'||s.market===filters.market)&&(filters.seniority==='todos'||s.seniorities.includes(filters.seniority as Seniority))&&(filters.track==='todos'||s.track===filters.track||s.track==='Competências comuns'&&filters.track!=='Competências comuns')&&(filters.classification==='todos'||s.classification===filters.classification)&&(filters.category==='todos'||s.category===filters.category));}
export function compareMarkets(filters:MarketFilters){const selected=filterMarketSkills({...filters,market:'todos'});return [...new Set(selected.map(s=>s.skillKey))].map(key=>({key,name:selected.find(s=>s.skillKey===key)!.name,Brasil:selected.filter(s=>s.skillKey===key&&s.market==='Brasil'),Internacional:selected.filter(s=>s.skillKey===key&&s.market==='Internacional')}));}
