import type { Book } from './curriculum';
import type { Reference } from './catalog';
import type { EnglishLevelId, EnglishSkill, EnglishProgress } from './progress';
export type { EnglishLevelId, EnglishSkill, EnglishProgress } from './progress';

export interface EnglishLevel {
  id: EnglishLevelId;
  name: string;
  cefrTitle: string;
  summaryGoal: string;
  officialDescriptor: string; // Conselho da Europa - CEFR Companion Volume
  skillsDescriptors: Record<EnglishSkill, string>;
  themes: string[];
  recommendedHours: string;
  milestoneIds: string[];
}

export interface EnglishMilestone {
  id: string;
  levelId: EnglishLevelId;
  title: string;
  goal: string;
  practicalGuidance: string;
  examplePhrases: string[];
  suggestedActivity: string;
}

export type EnglishExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'word-order'
  | 'matching'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'roleplay';

export interface EnglishExercise {
  id: string;
  level: EnglishLevelId;
  skill: EnglishSkill;
  theme: string;
  type: EnglishExerciseType;
  title: string;
  statement: string;
  passage?: string; // Text for reading / context
  options?: string[]; // Multiple choice options
  expectedAnswer?: string | number | Record<string, string> | string[]; // Answer for auto-grading
  matchingPairs?: { left: string; right: string }[]; // For matching type
  wordsToOrder?: string[]; // For word-order type
  explanation: string;
  referenceId: string;
  audioUrl?: string; // Real external audio link
  audioSource?: string; // External audio attribution
  scenario?: string; // For speaking / roleplay
  usefulPhrases?: string[]; // For speaking / writing
  selfAssessmentChecks?: string[]; // Rubric criteria
  aiPrompt?: string; // Copyable prompt for external LLM feedback
}

export interface DiagnosticQuestion {
  id: string;
  level: EnglishLevelId;
  skill: EnglishSkill;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LevelDiagnosticEvaluation {
  levelId: EnglishLevelId;
  title: string;
  description: string;
  disclaimer: string;
  objectiveQuestions: DiagnosticQuestion[];
  speakingTask: {
    title: string;
    scenario: string;
    guidingQuestions: string[];
    usefulVocabulary: string[];
    rubric: string[];
    aiPrompt: string;
  };
  writingTask: {
    title: string;
    prompt: string;
    minWords: number;
    rubric: string[];
    aiPrompt: string;
  };
}

export interface PlacementQuestion {
  id: string;
  levelTested: EnglishLevelId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CareerMilestone {
  id: string;
  title: string;
  area: string;
  summary: string;
  keyStrategies: string[];
  usefulPhrases: string[];
  scenario: string;
  practiceTask: string;
  aiPrompt: string;
}

export interface OfficialExamInfo {
  id: string;
  name: string;
  provider: string;
  targetAudience: string;
  formatSummary: string;
  scaleDescription: string;
  validity: string;
  officialUrl: string;
  importantNotes: string[];
}

export interface EnglishAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: (p: EnglishProgress) => boolean;
}

export interface ReviewItem {
  id: string;
  phrase: string;
  meaningPt: string;
  contextEn: string;
  level: EnglishLevelId;
  skill: EnglishSkill;
  category: string;
}

// ==========================================
// 1. NÍVEIS CEFR (A1–C2) COM DESCRITORES OFICIAIS
// ==========================================

export const englishLevels: EnglishLevel[] = [
  {
    id: 'A1',
    name: 'A1 — Beginner (Iniciante)',
    cefrTitle: 'Basic User · Breakthrough',
    summaryGoal: 'Compreender e utilizar expressões familiares do dia a dia e enunciados muito simples para satisfazer necessidades concretas.',
    officialDescriptor: 'Pode compreender e utilizar expressões familiares do dia a dia e enunciados muito simples orientados para a satisfação de necessidades concretas. Pode apresentar-se e apresentar outros e responder a perguntas sobre pormenores pessoais (onde vive, pessoas que conhece e coisas que tem). Pode comunicar de forma simples se o interlocutor falar clara e pausadamente e estiver disposto a ajudar.',
    skillsDescriptors: {
      listening: 'Reconhece palavras familiares e frases muito básicas sobre si, a família e o meio circundante imediato, quando se fala de forma pausada e clara.',
      speaking: 'Pode comunicar de forma simples mediante perguntas e respostas sobre necessidades imediatas ou temas muito familiares.',
      reading: 'Compreende nomes conhecidos, palavras e frases muito simples em avisos, cartazes, catálogos e mensagens curtas.',
      writing: 'Escreve postais ou mensagens curtas e simples (por exemplo, cumprimentos de férias ou preenchimento de fichas com dados pessoais).',
      'vocabulary-grammar': 'Emprega um repertório elementar de palavras e estruturas simples com verb to be, pronomes, artigos e presente simples introdutório.',
    },
    themes: [
      'Cumprimentos e despedidas',
      'Apresentação pessoal e família',
      'Alfabeto, números e soletração',
      'Horários, datas e dias da semana',
      'Profissões e locais de trabalho',
      'Rotina diária simples',
      'Comida, bebidas e café',
      'Compras e preços básicos',
      'Perguntas de sim/não e Wh-questions',
      'Verb to be e pronomes pessoais/possessivos',
      'Present Simple introdutório',
    ],
    recommendedHours: '~80–100 horas guiadas',
    milestoneIds: ['eng-m-a1-1', 'eng-m-a1-2', 'eng-m-a1-3', 'eng-m-a1-4'],
  },
  {
    id: 'A2',
    name: 'A2 — Elementary (Básico)',
    cefrTitle: 'Basic User · Waystage',
    summaryGoal: 'Comunicar-se em tarefas rotineiras que exigem troca direta de informações sobre assuntos cotidianos e previsíveis.',
    officialDescriptor: 'Pode compreender frases e expressões de uso frequente relacionadas com áreas de relevância imediata (informações pessoais e familiares, compras, geografia local, emprego). Pode comunicar em tarefas simples e de rotina que exigem apenas uma troca direta de informação sobre assuntos familiares. Pode descrever de modo simples aspectos do seu passado, o meio circundante e necessidades imediatas.',
    skillsDescriptors: {
      listening: 'Compreende frases e vocabulário frequente sobre temas cotidianos (família, compras, trabalho local, transporte) e o essencial de anúncios claros.',
      speaking: 'Comunica em tarefas simples que exigem troca direta de informação e descreve em termos básicos o meio ambiente e planos próximos.',
      reading: 'Lê textos curtos e simples. Localiza informações específicas e previsíveis em cardápios, horários, anúncios e e-mails pessoais.',
      writing: 'Escreve notas e mensagens curtas e simples relacionadas com necessidades imediatas, ou e-mails elementares de agradecimento ou pedido.',
      'vocabulary-grammar': 'Domina o Past Simple (regular e irregular), comparativos, modais básicos (can/could/should) e formas de futuro imediato (going to).',
    },
    themes: [
      'Viagens e transporte público',
      'Restaurantes e pedidos',
      'Compras e devoluções simples',
      'Saúde cotidiana e farmácia',
      'Moradia e descrição de espaços',
      'Direções e localização na cidade',
      'Experiências passadas (Past Simple)',
      'Planos e intenções (Going to vs Will)',
      'Comparações e preferências (Comparatives & Superlatives)',
      'Verbos modais de capacidade e permissão',
    ],
    recommendedHours: '~100–120 horas adicionais',
    milestoneIds: ['eng-m-a2-1', 'eng-m-a2-2', 'eng-m-a2-3', 'eng-m-a2-4'],
  },
  {
    id: 'B1',
    name: 'B1 — Intermediate (Intermediário)',
    cefrTitle: 'Independent User · Threshold',
    summaryGoal: 'Compreender os pontos principais de assuntos familiares e expressar experiências, opiniões, planos e relatos com relativa autonomia.',
    officialDescriptor: 'Pode compreender os pontos essenciais de uma mensagem clara em língua padrão sobre temas familiares do trabalho, estudo, lazer, etc. Pode lidar com a maioria das situações encontradas na região onde se fala a língua. Pode produzir um discurso simples e coerente sobre tópicos familiares ou de interesse pessoal. Pode descrever experiências, acontecimentos, sonhos, esperanças e ambições, e justificar brevemente opiniões e planos.',
    skillsDescriptors: {
      listening: 'Compreende os pontos principais de programas de rádio, podcasts acessíveis e conversas quando a fala é relativamente articulada.',
      speaking: 'Enfrenta com desenvoltura a maioria das situações de viagem e conversa, expressa sentimentos pessoais e fundamenta opiniões com conectivos.',
      reading: 'Compreende textos com vocabulário de uso frequente relacionados ao trabalho ou interesses pessoais, e descrições de sentimentos e intenções em cartas.',
      writing: 'Redige textos articulados e coerentes sobre temas de interesse, narrando histórias ou defendendo pontos de vista com justificativas breves.',
      'vocabulary-grammar': 'Integra Present Perfect vs Past Simple, First e Second Conditionals, voz passiva introdutória e conectivos de causa/contraste.',
    },
    themes: [
      'Conversas longas sobre interesses e lazer',
      'Viagens independentes e resolução de imprevistos',
      'Rotinas e desafios no trabalho e estudos',
      'Expressão de opiniões e justificativas (I believe... because...)',
      'Narrativas cronológicas de experiências passadas',
      'Planos de médio prazo e aspirações profissionais',
      'Entrevistas de trabalho introdutórias',
      'Present Perfect em contexto de experiências',
      'Condicionais real e hipotética (1st and 2nd conditionals)',
      'Conectivos discursivos (however, although, so, because of)',
    ],
    recommendedHours: '~150–200 horas adicionais',
    milestoneIds: ['eng-m-b1-1', 'eng-m-b1-2', 'eng-m-b1-3', 'eng-m-b1-4'],
  },
  {
    id: 'B2',
    name: 'B2 — Upper Intermediate (Independente)',
    cefrTitle: 'Independent User · Vantage',
    summaryGoal: 'Comunicar-se com grau de fluência e espontaneidade, debater assuntos abstratos e concretos, e atuar no ambiente profissional.',
    officialDescriptor: 'Pode compreender as ideias principais de textos complexos sobre tópicos concretos e abstratos, incluindo discussões técnicas na sua área de especialidade. Pode comunicar com suficiente fluência e espontaneidade para que a interação com falantes nativos ocorra sem tensão. Pode produzir um discurso claro e detalhado sobre uma vasta gama de temas e defender um ponto de vista com vantagens e desvantagens.',
    skillsDescriptors: {
      listening: 'Compreende palestras, reuniões de equipe, apresentações técnicas e noticiários sem esforço excessivo, mesmo com termos especializados.',
      speaking: 'Participa ativamente de discussões em contextos formais e informais, defendendo pontos de vista, propondo alternativas e negociando soluções.',
      reading: 'Lê artigos e relatórios contemporâneos nos quais os autores adotam posições particulares, bem como documentação técnica e correspondência de negócios.',
      writing: 'Escreve textos detalhados sobre ampla variedade de assuntos, relatórios de projeto, ensaios argumentativos e e-mails profissionais com tom adequado.',
      'vocabulary-grammar': 'Maneja Third Conditional, voz passiva avançada, modais de dedução no passado (must have, might have) e phrasal verbs idiomáticos.',
    },
    themes: [
      'Debates e argumentação estruturada (pros and cons)',
      'Reuniões de equipe e facilitação de alinhamentos',
      'Entrevistas profissionais e contratação internacional',
      'Apresentação de projetos e propostas de valor',
      'Negociação e concessões educadas',
      'Dar e receber feedback construtivo',
      'Comunicação intercultural e diversidade de sotaques',
      'Leitura de artigos de opinião e documentação técnica',
      'Voz passiva em relatórios e documentação',
      'Condicionais avançadas e modais de dedução',
    ],
    recommendedHours: '~200–250 horas adicionais',
    milestoneIds: ['eng-m-b2-1', 'eng-m-b2-2', 'eng-m-b2-3', 'eng-m-b2-4'],
  },
  {
    id: 'C1',
    name: 'C1 — Advanced (Avançado)',
    cefrTitle: 'Proficient User · Effective Operational Proficiency',
    summaryGoal: 'Compreender textos exigentes e longos com reconhecimento de sentidos implícitos, expressando-se com fluência, precisão e flexibilidade.',
    officialDescriptor: 'Pode compreender uma ampla variedade de textos longos e exigentes, reconhecendo sentidos implícitos. Pode exprimir-se de forma fluente e espontânea sem demonstrar com frequência esforço na procura das palavras. Pode utilizar a língua de modo flexível e eficaz para fins sociais, acadêmicos e profissionais. Pode produzir textos claros, bem estruturados e detalhados sobre temas complexos.',
    skillsDescriptors: {
      listening: 'Compreende discursos extensos, mesmo que não estejam claramente estruturados e quando as relações fiquem apenas implícitas.',
      speaking: 'Expressa-se com fluência e precisão quase sem hesitações, adaptando o estilo ao auditório em reuniões executivas e negociações delicadas.',
      reading: 'Compreende textos factuais e literários longos e complexos, apreciando diferenças de estilo e artigos especializados fora da sua área.',
      writing: 'Redige correspondência executiva, propostas de projetos estratégicos e relatórios minuciosos com estrutura coesa e clareza estilística.',
      'vocabulary-grammar': 'Emprega inversão enfática, collocations avançadas, estruturas de ênfase (cleft sentences) e distinções sutis de formalidade.',
    },
    themes: [
      'Discussões conceituais e temas abstratos',
      'Identificação de nuances e subtextos implícitos',
      'Registro formal, informal e diplomático',
      'Argumentação persuasiva de alto nível',
      'Apresentações executivas para liderança internacional',
      'Mediação de impasses e negociação complexa',
      'Escrita de relatórios, whitepapers e propostas formais',
      'Entrevistas de liderança e posições sênior',
      'Collocations avançadas e vocabulário polissêmico',
      'Inversões estilísticas e cleft sentences',
    ],
    recommendedHours: '~250–300 horas adicionais',
    milestoneIds: ['eng-m-c1-1', 'eng-m-c1-2', 'eng-m-c1-3', 'eng-m-c1-4'],
  },
  {
    id: 'C2',
    name: 'C2 — Proficient (Domínio Pleno)',
    cefrTitle: 'Proficient User · Mastery',
    summaryGoal: 'Compreender sem esforço praticamente tudo o que ouve ou lê, e reconstituir fatos e argumentos com precisão e nuances finíssimas.',
    officialDescriptor: 'Pode compreender sem esforço praticamente tudo o que ouve ou lê. Pode reconstituir fatos e argumentos de diferentes fontes orais e escritas, apresentando-os de forma coerente num resumo bem articulado. Pode exprimir-se espontaneamente, de modo muito fluente e preciso, diferenciando tons finos de significado, mesmo em situações de maior complexidade.',
    skillsDescriptors: {
      listening: 'Compreende qualquer tipo de linguagem falada, ao vivo ou gravada, mesmo em ritmo nativo rápido com dialetos, gírias e trocadilhos.',
      speaking: 'Participa com naturalidade em qualquer discussão complexa, usando linguagem idiomática e coloquialismos apropriados com precisão cirúrgica.',
      reading: 'Lê criticamente qualquer texto escrito, incluindo obras literárias complexas, tratados jurídicos, ensaios filosóficos e sátira cultural.',
      writing: 'Produz sínteses críticas sofisticadas, ensaios elegantes e artigos de análise com rigor formal, ritmo discursivo e apuro estético.',
      'vocabulary-grammar': 'Domínio profundo de modismos, eufemismos, metáforas estendidas, ironia sutil e adaptação camaleônica de registro linguístico.',
    },
    themes: [
      'Linguagem idiomática refinada e metáforas conceituais',
      'Nuances culturais profundas, humor sutil e ironia',
      'Textos densos de ensaios, filosofia e editorialismo',
      'Debates sob forte pressão com improvisação elegante',
      'Síntese crítica e reestruturação de múltiplas fontes divergentes',
      'Discursos públicos de alto impacto e comunicação pública',
      'Adaptação estilística instantânea para diferentes públicos globais',
      'Expressões eufemísticas corporativas e diplomacia linguística',
      'Análise de subtextos em negociações transculturais',
      'Precisão vocabular minuciosa (denotação vs conotação)',
    ],
    recommendedHours: '~300+ horas de imersão e prática contínua',
    milestoneIds: ['eng-m-c2-1', 'eng-m-c2-2', 'eng-m-c2-3', 'eng-m-c2-4'],
  },
];

// ==========================================
// 2. MARCOS COMUNICATIVOS POR NÍVEL (CEFR)
// ==========================================

export const englishMilestones: EnglishMilestone[] = [
  // A1 Milestones
  {
    id: 'eng-m-a1-1',
    levelId: 'A1',
    title: 'Apresentação pessoal e rotina básica',
    goal: 'Apresentar-se com clareza (nome, origem, ocupação simples) e descrever sua rotina em frases curtas.',
    practicalGuidance: 'Concentre-se em dominar o Present Simple com "I" e "You" e o verb to be sem pressa de falar rápido.',
    examplePhrases: [
      'Hello, my name is Alex. I am from Brazil and I live in São Paulo.',
      'I work in an office and I wake up at 7 AM every day.',
      'In my free time, I like to read books and drink coffee.',
    ],
    suggestedActivity: 'Grave um áudio de 30 segundos no seu gravador de celular apresentando-se em inglês e ouça seu ritmo.',
  },
  {
    id: 'eng-m-a1-2',
    levelId: 'A1',
    title: 'Perguntas e respostas do dia a dia',
    goal: 'Fazer perguntas simples com Wh-words (What, Where, When, Who) e responder sobre dados pessoais.',
    practicalGuidance: 'Treine a ordem da pergunta em inglês: Wh-word + do/does/is/are + sujeito + verbo principal.',
    examplePhrases: [
      'Where do you live? — I live in Curitiba.',
      'What time is the meeting? — It is at 2 PM.',
      'Do you speak English? — Yes, a little bit.',
    ],
    suggestedActivity: 'Escreva cinco perguntas simples que você faria a alguém que acabou de conhecer.',
  },
  {
    id: 'eng-m-a1-3',
    levelId: 'A1',
    title: 'Números, horários e compras elementares',
    goal: 'Reconhecer e falar números até 100, preços, dias da semana e horários em conversas simples.',
    practicalGuidance: 'Atenção aos pares numéricos confusos como thirteen (13) e thirty (30), fourteen (14) e forty (40).',
    examplePhrases: [
      'How much is this coffee? — It is four dollars and fifty cents.',
      'The train leaves at half past eight on Tuesday.',
      'Can I pay by card, please?',
    ],
    suggestedActivity: 'Pratique falar em voz alta os horários dos seus compromissos de hoje e os preços de itens da sua mesa.',
  },
  {
    id: 'eng-m-a1-4',
    levelId: 'A1',
    title: 'Compreensão de mensagens e placas curtas',
    goal: 'Identificar informações essenciais em avisos, cardápios, placas públicas e mensagens breves de texto.',
    practicalGuidance: 'Não tente traduzir palavra por palavra; foque nas palavras-chave (nomes, horários, direções).',
    examplePhrases: [
      'Open from Monday to Friday: 9:00 AM – 6:00 PM.',
      'Exit on the left side. No smoking allowed.',
      'Please leave your message after the tone.',
    ],
    suggestedActivity: 'Leia um cardápio em inglês na internet e identifique prato principal, bebida e valor.',
  },

  // A2 Milestones
  {
    id: 'eng-m-a2-1',
    levelId: 'A2',
    title: 'Viagens, reservas e direções na cidade',
    goal: 'Fazer uma reserva de hotel/restaurante, pedir direções e entender orientações de transporte.',
    practicalGuidance: 'Use expressões de cortesia como "Could you please...", "I would like to...", e conectivos de direção (turn right, straight ahead).',
    examplePhrases: [
      'I would like to reserve a double room for three nights, please.',
      'Excuse me, how do I get to the central station from here?',
      'Go straight for two blocks, then turn left at the traffic light.',
    ],
    suggestedActivity: 'Simule verbalmente pedir uma mesa para duas pessoas em um restaurante movimentado.',
  },
  {
    id: 'eng-m-a2-2',
    levelId: 'A2',
    title: 'Narrando o passado com Past Simple',
    goal: 'Descrever acontecimentos passados, viagens de férias e o que aconteceu ontem com verbos regulares e irregulares.',
    practicalGuidance: 'Aprenda os verbos irregulares mais comuns em pequenos grupos (go/went, have/had, buy/bought, see/saw).',
    examplePhrases: [
      'Last weekend I went to the beach with my family.',
      'I bought a new computer yesterday because my old one broke down.',
      'We had lunch at an Italian restaurant and then we visited a museum.',
    ],
    suggestedActivity: 'Escreva um parágrafo de 4 linhas contando o que você fez no seu último fim de semana.',
  },
  {
    id: 'eng-m-a2-3',
    levelId: 'A2',
    title: 'Planos futuros e comparações',
    goal: 'Falar de intenções para o futuro (be going to) e comparar produtos, lugares ou experiências.',
    practicalGuidance: 'Diferencie "be going to" para planos pré-decididos e "will" para decisões espontâneas.',
    examplePhrases: [
      'I am going to travel to Canada next July.',
      'This laptop is faster and lighter than my previous one.',
      'It is going to rain this afternoon, so take an umbrella.',
    ],
    suggestedActivity: 'Compare dois celulares ou duas cidades conhecidas usando 3 comparativos diferentes.',
  },
  {
    id: 'eng-m-a2-4',
    levelId: 'A2',
    title: 'E-mails e recados curtos de rotina',
    goal: 'Escrever mensagens e e-mails breves com saudação, pedido direto e encerramento polido.',
    practicalGuidance: 'Adote saudações adequadas: "Dear Mr./Ms...", "Hello [Name]", "Best regards", "Thank you for your help".',
    examplePhrases: [
      'Dear Sarah, I am writing to confirm our appointment for tomorrow at 10 AM.',
      'Please let me know if this time works for you.',
      'Best regards, Felipe.',
    ],
    suggestedActivity: 'Redija um e-mail de 5 linhas solicitando a alteração da data de um agendamento.',
  },

  // B1 Milestones
  {
    id: 'eng-m-b1-1',
    levelId: 'B1',
    title: 'Defesa de opiniões com justificativas',
    goal: 'Expressar seu ponto de vista sobre um assunto contemporâneo e sustentar o argumento com "because", "although" e "however".',
    practicalGuidance: 'Evite responder apenas "yes" ou "no". Sempre adicione uma justificativa e um exemplo.',
    examplePhrases: [
      'In my opinion, working remotely is more productive, although it requires strong discipline.',
      'I believe technology has improved education because it gives access to global knowledge.',
      'However, we must be careful with excessive screen time.',
    ],
    suggestedActivity: 'Escolha um tema cotidiano (trabalho presencial vs remoto) e grave 1 minuto defendendo seu ponto.',
  },
  {
    id: 'eng-m-b1-2',
    levelId: 'B1',
    title: 'Present Perfect para experiências e tempo indeterminado',
    goal: 'Usar o Present Perfect com "already", "yet", "ever", "never", "since" e "for" para falar de vivências acumuladas.',
    practicalGuidance: 'Lembre-se: use Past Simple quando a data for dita (in 2022, yesterday); use Present Perfect quando o foco for o fato.',
    examplePhrases: [
      'I have worked as a developer for three years.',
      'Have you ever traveled to an English-speaking country?',
      'She has already finished the documentation, but he has not reviewed it yet.',
    ],
    suggestedActivity: 'Liste 3 coisas que você já fez na vida e 2 coisas que você ainda não fez mas planeja fazer.',
  },
  {
    id: 'eng-m-b1-3',
    levelId: 'B1',
    title: 'Compreensão de podcasts acessíveis e notícias',
    goal: 'Acompanhar episódios de podcasts educacionais ou notícias gerais em ritmo moderado captando as ideias centrais.',
    practicalGuidance: 'Pratique escuta global na primeira vez sem pausar; leia a transcrição apenas na segunda vez para tirar dúvidas.',
    examplePhrases: [
      'The speaker explains the effects of sleep deprivation on memory.',
      'According to the report, urban population has grown significantly over the last decade.',
      'The host suggests taking short walks to reduce daily stress.',
    ],
    suggestedActivity: 'Ouça um episódio de 6 minutos do BBC 6 Minute English e anote 3 fatos principais mencionados.',
  },
  {
    id: 'eng-m-b1-4',
    levelId: 'B1',
    title: 'Simulação de entrevista de emprego inicial',
    goal: 'Responder com naturalidade a perguntas clássicas de entrevista sobre histórico profissional e metas.',
    practicalGuidance: 'Estruture respostas com início claro, desenvolvimento sucinto e conclusão orientada ao aprendizado.',
    examplePhrases: [
      'Can you tell me about yourself? — Sure. I have a background in technology and...',
      'What are your main strengths? — I am organized, curious, and enjoy solving problems.',
      'Where do you see yourself in three years? — I hope to lead projects and collaborate internationally.',
    ],
    suggestedActivity: 'Treine responder em voz alta: "Why do you want to improve your English?" em 1 minuto.',
  },

  // B2 Milestones
  {
    id: 'eng-m-b2-1',
    levelId: 'B2',
    title: 'Participação ativa em reuniões profissionais',
    goal: 'Intervir em reuniões, solicitar a palavra com educação, pedir esclarecimentos e construir sobre a fala do colega.',
    practicalGuidance: 'Aprenda expressões de facilitação: "If I may add to that...", "Could you clarify what you mean by...", "I see your point, but...".',
    examplePhrases: [
      'If I may jump in here, I think we should consider the deadline before committing.',
      'Could you elaborate on how this change impacts our current architecture?',
      'Building on what Maria said, we could run an A/B test first.',
    ],
    suggestedActivity: 'Simule verbalmente como você discordaria polidamente de uma estimativa irrealista em uma reunião.',
  },
  {
    id: 'eng-m-b2-2',
    levelId: 'B2',
    title: 'Apresentação de projeto e defesa de decisões',
    goal: 'Apresentar um projeto estruturado (problema, solução, trade-offs, resultados) com recursos visuais e responder a perguntas.',
    practicalGuidance: 'Use conectivos de sinalização: "First, let us look at...", "Moving on to...", "To summarize...".',
    examplePhrases: [
      'The main goal of this initiative was to reduce page load time by thirty percent.',
      'We evaluated two approaches: building an in-house tool versus using a third-party service.',
      'As a result, we managed to improve customer satisfaction and lower operational costs.',
    ],
    suggestedActivity: 'Monte uma apresentação de 3 minutos sobre um projeto que você desenvolveu e fale em voz alta.',
  },
  {
    id: 'eng-m-b2-3',
    levelId: 'B2',
    title: 'Comunicação escrita assíncrona formal e polida',
    goal: 'Escrever e-mails de negócios, revisões de código (PRs) e relatórios de incidentes com tom profissional e cortês.',
    practicalGuidance: 'Suavize críticas diretas com modais ("Could we consider...", "It might be worth checking...").',
    examplePhrases: [
      'Thank you for submitting this pull request. Could you please add unit tests for this edge case?',
      'I wanted to follow up on the proposal sent last Wednesday.',
      'Please let me know your thoughts so we can align our next steps.',
    ],
    suggestedActivity: 'Escreva um comentário construtivo em inglês para a revisão de um código fictício com um bug.',
  },
  {
    id: 'eng-m-b2-4',
    levelId: 'B2',
    title: 'Entrevistas comportamentais pelo método STAR',
    goal: 'Responder a perguntas situacionais de entrevista usando a metodologia STAR (Situation, Task, Action, Result).',
    practicalGuidance: 'Mantenha a proporção: 20% Situação e Tarefa, 50% Ação concreta que VOCÊ tomou, 30% Resultado mensurável.',
    examplePhrases: [
      'Tell me about a time you faced a tight deadline. — Situation: In my previous role...',
      'Task: I was responsible for delivering the checkout module in two weeks.',
      'Action: I prioritized core features, communicated blockers early, and paired with a colleague.',
      'Result: We deployed on time with zero critical defects.',
    ],
    suggestedActivity: 'Escreva uma história STAR real da sua carreira e pratique contá-la em 2 minutos cronometrados.',
  },

  // C1 Milestones
  {
    id: 'eng-m-c1-1',
    levelId: 'C1',
    title: 'Negociação avançada e diplomacia linguística',
    goal: 'Negociar prazos, orçamentos e acordos em ambientes multiculturais utilizando linguagem diplomática e concessões estratégicas.',
    practicalGuidance: 'Use conditional phrasing e framing positivo: "Provided that we align on X, we could accommodate Y".',
    examplePhrases: [
      'Provided that the scope remains fixed, we could potentially deliver by the end of Q3.',
      'While we understand your urgency, compromising quality would pose significant risks.',
      'Would you be open to an incremental release strategy?',
    ],
    suggestedActivity: 'Escreva um diálogo de 8 falas negociando a extensão do prazo de entrega de um contrato.',
  },
  {
    id: 'eng-m-c1-2',
    levelId: 'C1',
    title: 'Síntese de fontes divergentes e pensamento crítico',
    goal: 'Ler dois relatórios ou ensaios com visões opostas e sintetizar os argumentos centrais com neutralidade e rigor analítico.',
    practicalGuidance: 'Destaque pontos em comum antes de contrastar as premissas fundamentais de cada autor.',
    examplePhrases: [
      'While Author A asserts that strict regulations foster innovation, Author B contends they stifle growth.',
      'Synthesizing both viewpoints, the optimal approach appears to be adaptive governance.',
      'The underlying disagreement stems from divergent assumptions regarding market velocity.',
    ],
    suggestedActivity: 'Resuma em um texto de 150 palavras duas perspectivas opostas sobre o uso de IA no ambiente corporativo.',
  },
  {
    id: 'eng-m-c1-3',
    levelId: 'C1',
    title: 'Apresentação executiva sob questionamento crítico',
    goal: 'Apresentar estratégias de alto escalão e responder com compostura e dados precisos a perguntas difíceis de stakeholders.',
    practicalGuidance: 'Reconheça a pertinência da pergunta antes de responder: "That is an astute observation; allow me to address that...".',
    examplePhrases: [
      'That is an insightful question; our data indicates that the risk can be mitigated through automated rollbacks.',
      'To put that into perspective, the trade-off represents less than two percent of our projected budget.',
      'I appreciate your concern regarding scalability, which is precisely why we adopted this architecture.',
    ],
    suggestedActivity: 'Prepare 3 objeções duras que um cliente faria à sua proposta e grave sua resposta espontânea.',
  },
  {
    id: 'eng-m-c1-4',
    levelId: 'C1',
    title: 'Redação de relatórios analíticos de alta complexidade',
    goal: 'Redigir documentos executivos, memorandos de decisão ou post-mortems com precisão vocabular e estilo formal coeso.',
    practicalGuidance: 'Incorpore estruturas de inversão e nominalização para conferir densidade e formalidade aos argumentos.',
    examplePhrases: [
      'Not only did the outage impact transactional services, but it also highlighted vulnerabilities in our failover protocols.',
      'Rarely has an architectural decision yielded such immediate performance gains.',
      'The mitigation plan outlined below aims to eliminate single points of failure across all availability zones.',
    ],
    suggestedActivity: 'Escreva um resumo executivo de 1 página simulando a análise de uma falha de sistema ocorrida em produção.',
  },

  // C2 Milestones
  {
    id: 'eng-m-c2-1',
    levelId: 'C2',
    title: 'Compreensão de subtextos, ironia e humor cultural',
    goal: 'Captar nuances implícitas, duplos sentidos, sarcasmo corporativo e referências socioculturais em discursos e conversas.',
    practicalGuidance: 'Observe entonação, pausas, eufemismos ingleses ("That is quite interesting" muitas vezes significa "Discordo totalmente").',
    examplePhrases: [
      'When the client remarked that our proposal was "courageous", they were subtly indicating it was too risky.',
      'The editorial relies heavily on understatement to critique the government economic strategy.',
      'Detecting cultural satire requires sensitivity to wordplay and conversational cadence.',
    ],
    suggestedActivity: 'Analise um artigo de opinião do The Economist ou The Guardian identificando onde o autor usa ironia.',
  },
  {
    id: 'eng-m-c2-2',
    levelId: 'C2',
    title: 'Discurso espontâneo com flexibilidade estilística',
    goal: 'Transitar fluidamente entre o registro acadêmico, o corporativo e o coloquial de acordo com o público presente.',
    practicalGuidance: 'A maestria C2 reside em saber quando simplificar e quando sofisticar o vocabulário.',
    examplePhrases: [
      'Whether addressing an academic symposium or chatting informally with teammates over coffee, nuance is paramount.',
      'He effortlessly demystified quantum concepts without sounding condescending.',
      'Adapting one tone to the boardroom while maintaining authenticity is an essential executive asset.',
    ],
    suggestedActivity: 'Explique o mesmo conceito técnico de duas formas: primeiro para um conselho de diretores, depois para um adolescente.',
  },
  {
    id: 'eng-m-c2-3',
    levelId: 'C2',
    title: 'Debate de alto nível e desconstrução retórica',
    goal: 'Desconstruir falácias lógicas, contra-argumentar sob pressão e sustentar teses refinadas sem perder a compostura.',
    practicalGuidance: 'Aponte inconsistências estruturais no argumento do oponente em vez de atacar afirmações isoladas.',
    examplePhrases: [
      'The premise that correlation implies causality in this dataset overlooks several confounding variables.',
      'While the rhetoric is compelling, the empirical evidence underpinning the claim remains tenuous at best.',
      'Let us dissect the underlying assumption that higher throughput inevitably degrades system resilience.',
    ],
    suggestedActivity: 'Grave um contra-argumento de 2 minutos rebatendo uma tese polêmica com argumentos lógicos estruturados.',
  },
  {
    id: 'eng-m-c2-4',
    levelId: 'C2',
    title: 'Síntese crítica e produção ensaística avançada',
    goal: 'Redigir análises de fôlego com estilo elegante, ritmo oratório e precisão conceitual equiparada à escrita de publicações renomadas.',
    practicalGuidance: 'Preste atenção ao ritmo das frases: alterne frases longas e subordinadas com frases curtas de impacto.',
    examplePhrases: [
      'To navigate the complexities of global commerce is not merely to reconcile numbers, but to harmonize cultural mindsets.',
      'The paradox of modern productivity lies in our propensity to mistake frantic velocity for genuine direction.',
      'A meticulous examination of the post-pandemic labor paradigm reveals profound shifts in existential priorities.',
    ],
    suggestedActivity: 'Redija um ensaio curto de 250 palavras refletindo sobre a evolução do trabalho remoto e seu impacto cultural.',
  },
];

// ==========================================
// 3. EXERCÍCIOS ORIGINAIS, VARIADOS E PROGRESSIVOS
// ==========================================

export const englishExercises: EnglishExercise[] = [
  // --- A1 EXERCISES ---
  {
    id: 'eng-a1-ex-01',
    level: 'A1',
    skill: 'vocabulary-grammar',
    theme: 'Cumprimentos e Verb to be',
    type: 'multiple-choice',
    title: 'Personal Pronouns and the Verb To Be',
    statement: 'Complete the sentence with the correct form of the verb "to be":\n\n"Hello! My name is Lucas and I _____ a software student from Recife."',
    options: ['is', 'am', 'are', 'be'],
    expectedAnswer: 1, // index for 'am'
    explanation: 'Em inglês, o pronome de primeira pessoa "I" concorda exclusivamente com "am" no Present Simple: "I am". Usamos "is" para he/she/it e "are" para you/we/they.',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-a1-ex-02',
    level: 'A1',
    skill: 'reading',
    theme: 'Leitura de Mensagem Pessoal',
    type: 'reading',
    title: 'Reading a Colleague Introduction Note',
    passage: 'Hi everyone! My name is Emily. I am 26 years old and I live in London. I work as a graphic designer. In my free time, I love cooking pasta, playing the guitar, and walking in the park with my dog, Bruno. I work from home on Mondays and Fridays.',
    statement: 'Read Emily note above and answer:\nWhere does Emily work on Mondays?',
    options: [
      'In a restaurant kitchen',
      'From home',
      'In a park in London',
      'At a music school',
    ],
    expectedAnswer: 1, // 'From home'
    explanation: 'O texto afirma explicitamente na última frase: "I work from home on Mondays and Fridays" (Eu trabalho de casa às segundas e sextas-feiras).',
    referenceId: 'ref-eng-bc-skills',
  },
  {
    id: 'eng-a1-ex-03',
    level: 'A1',
    skill: 'listening',
    theme: 'Horários e Informações em Áudio',
    type: 'multiple-choice',
    title: 'Listening for Key Information: Timetables',
    audioUrl: 'https://learnenglish.britishcouncil.org/skills/listening/a1-listening/booking-a-table',
    audioSource: 'British Council LearnEnglish · A1 Listening: Booking a Table',
    statement: 'Acesse o recurso de áudio legítimo do British Council no link acima. Ouça a conversa entre o cliente e o recepcionista do restaurante.\n\nPara que dia e horário o cliente solicita a reserva?',
    options: [
      'Tuesday at 7:00 PM for 4 people',
      'Friday at 8:30 PM for 2 people',
      'Tonight at 8:00 PM for 4 people',
      'Sunday at 1:00 PM for 3 people',
    ],
    expectedAnswer: 2, // 'Tonight at 8:00 PM for 4 people'
    explanation: 'No áudio do British Council, o cliente diz: "A table for four, please, for tonight... eight o clock."',
    referenceId: 'ref-eng-bc-skills',
  },
  {
    id: 'eng-a1-ex-04',
    level: 'A1',
    skill: 'speaking',
    theme: 'Apresentação Oral de 30 Segundos',
    type: 'speaking',
    title: '30-Second Elevator Self-Introduction',
    statement: 'Pratique falar em voz alta uma apresentação pessoal de 30 segundos em inglês seguindo o roteiro e os critérios abaixo. Não é necessário microfone ou gravação no site; pratique verbalmente.',
    scenario: 'Você está no primeiro dia de um evento de tecnologia internacional e alguém lhe pergunta: "Hi! Who are you and what do you do?"',
    usefulPhrases: [
      'Hi! Nice to meet you. My name is [Your Name].',
      'I am from Brazil and I currently live in [City].',
      'I am a [profession / student] and I am passionate about technology.',
      'In my free time, I enjoy [hobby / sport].',
    ],
    selfAssessmentChecks: [
      'Falei meu nome, cidade e ocupação sem pausas excessivas.',
      'Pronunciei "I am" e "I live in" claramente.',
      'Concluí a fala em cerca de 25 a 35 segundos.',
      'Comuniquei-me com tranquilidade, sem me preocupar com sotaque.',
    ],
    aiPrompt: 'Avalie minha transcrição de apresentação pessoal em nível A1. Indique pontos positivos de clareza e 2 sugestões de vocabulário básico sem reescrever todo o texto:\n\n[Insira aqui o que você falou]',
    explanation: 'Em nível A1, a meta principal de fala é inteligibilidade e confiança básica para dizer quem você é, de onde vem e o que faz.',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-a1-ex-05',
    level: 'A1',
    skill: 'writing',
    theme: 'Mensagem de Apresentação Escrita',
    type: 'writing',
    title: 'Writing Your First Short Bio',
    statement: 'Escreva uma apresentação pessoal de 3 a 5 frases em inglês para o canal de boas-vindas de uma comunidade internacional. Mencione: seu nome, onde mora, seu trabalho ou estudo e um passatempo.',
    usefulPhrases: [
      'Hello everyone! / Hi team!',
      'My name is... and I live in...',
      'I work as a... / I am studying...',
      'In my free time, I like to...',
      'Nice to be here!',
    ],
    selfAssessmentChecks: [
      'Usei letras maiúsculas no início das frases e no pronome "I".',
      'Inclui as 4 informações solicitadas (nome, local, ocupação, passatempo).',
      'As frases têm sujeito e verbo (ex: "I live in...", "I like...").',
      'Finalizei com uma saudação amistosa (ex: "Nice to meet you all").',
    ],
    aiPrompt: 'Revise este texto introdutório de nível A1 em inglês. Verifique o uso de pontuação, letras maiúsculas e concordância com verb to be:\n\n[Insira seu texto aqui]',
    explanation: 'A escrita em A1 treina o uso correto de pontuação básica, o pronome pessoal "I" sempre em maiúscula e estruturas declarativas simples.',
    referenceId: 'ref-eng-cam-learning',
  },

  // --- A2 EXERCISES ---
  {
    id: 'eng-a2-ex-01',
    level: 'A2',
    skill: 'vocabulary-grammar',
    theme: 'Past Simple: Verbos Regulares e Irregulares',
    type: 'fill-blank',
    title: 'Narrating Past Weekend Events',
    statement: 'Complete the sentence with the correct Past Simple form of the verb in parentheses (buy):\n\n"Last Saturday, my brother _____ a new backpack for our upcoming camping trip."',
    expectedAnswer: 'bought',
    explanation: 'O verbo "to buy" é irregular; sua forma no Past Simple é "bought". Verbos regulares recebem -ed (ex: play -> played), mas verbos frequentes como buy, go, have e see têm formas próprias no passado.',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-a2-ex-02',
    level: 'A2',
    skill: 'reading',
    theme: 'E-mail de Confirmação de Reserva',
    type: 'reading',
    title: 'Understanding a Hotel Reservation Confirmation',
    passage: 'Dear Mr. Santos,\nThank you for choosing Grand Horizon Hotel. We are pleased to confirm your reservation for a Superior Double Room from October 12 to October 15 (3 nights). Check-in starts at 3:00 PM, and check-out is before 11:00 AM. Breakfast is included and served daily from 6:30 AM to 10:00 AM in the main dining hall. If you need airport transfer, please notify us at least 24 hours in advance.\nBest regards,\nReservations Team.',
    statement: 'According to the confirmation email, what must the guest do to request airport transfer?',
    options: [
      'Pay an extra fee at check-in',
      'Notify the hotel at least 24 hours in advance',
      'Request it directly at the breakfast dining hall',
      'Call the airport terminal on the day of arrival',
    ],
    expectedAnswer: 1, // 'Notify the hotel at least 24 hours in advance'
    explanation: 'O e-mail estabelece expressamente a condição: "If you need airport transfer, please notify us at least 24 hours in advance."',
    referenceId: 'ref-eng-bc-skills',
  },
  {
    id: 'eng-a2-ex-03',
    level: 'A2',
    skill: 'speaking',
    theme: 'Simulação em Restaurante / Pedido de Refeição',
    type: 'roleplay',
    title: 'Ordering Food and Drinks at a Cafe',
    statement: 'Simule verbalmente pedir uma refeição em um restaurante ou cafeteria em inglês. Siga as orientações do cenário.',
    scenario: 'Você entra em um café e o garçom pergunta: "Good afternoon! Are you ready to order, or do you need a few more minutes?"',
    usefulPhrases: [
      'I am ready, thank you. Could I have the grilled chicken sandwich, please?',
      'Does that come with a salad or french fries?',
      'And to drink, just a sparkling water with lemon, please.',
      'Could we also get the check when you have a moment?',
    ],
    selfAssessmentChecks: [
      'Usei "Could I have..." ou "I would like..." em vez de "I want" de forma rude.',
      'Perguntei sobre acompanhamento ou bebida.',
      'Pedi a conta de maneira polida ("Could I get the check/bill, please?").',
      'Consegui manter a fala fluida sem parar para traduzir mentalmente cada palavra.',
    ],
    aiPrompt: 'Atue como garçom em um restaurante internacional em Londres. Inicie a conversa de forma amigável para eu praticar meu pedido de almoço em inglês A2.',
    explanation: 'O uso de fórmulas de cortesia ("Could I have...", "Would you mind...", "Please") é uma das principais marcas de transição de A1 para A2.',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-a2-ex-04',
    level: 'A2',
    skill: 'writing',
    theme: 'E-mail Curto de Solicitação de Informações',
    type: 'writing',
    title: 'Writing an Inquiry Email to a Language School',
    statement: 'Escreva um e-mail de 40 a 60 palavras para uma escola de idiomas no exterior perguntando sobre horários de turmas noturnas, valor do material didático e data de início do próximo semestre.',
    usefulPhrases: [
      'Dear Admissions Office, / Dear Sir or Madam,',
      'I am writing to inquire about your evening English courses.',
      'Could you please inform me when the next term begins?',
      'In addition, how much does the course material cost?',
      'Thank you in advance for your assistance. Best regards, [Your Name]',
    ],
    selfAssessmentChecks: [
      'Inclui saudação inicial formal e encerramento polido.',
      'Fiz as 3 perguntas solicitadas (turmas noturnas, material e data de início).',
      'Usei conectivos simples ("and", "also", "in addition").',
      'Manejei a extensão adequada (cerca de 40 a 60 palavras).',
    ],
    aiPrompt: 'Avalie este e-mail formal A2 em inglês. Aponte se o tom foi adequado e aponte eventuais erros de preposição ou pontuação:\n\n[Insira seu e-mail aqui]',
    explanation: 'A2 exige capacidade de redigir correspondência simples e clara com objetivo definido e polidez formal.',
    referenceId: 'ref-eng-cam-prep',
  },

  // --- B1 EXERCISES ---
  {
    id: 'eng-b1-ex-01',
    level: 'B1',
    skill: 'vocabulary-grammar',
    theme: 'Present Perfect vs Past Simple',
    type: 'multiple-choice',
    title: 'Distinguishing Past Simple and Present Perfect',
    statement: 'Choose the correct verb forms to complete the conversation:\n\n"A: Have you ever visited San Francisco?\nB: Yes, I __________ there two years ago for a tech conference, and I __________ three new projects since then."',
    options: [
      'have gone / completed',
      'went / have completed',
      'was going / complete',
      'had gone / am completing',
    ],
    expectedAnswer: 1, // 'went / have completed'
    explanation: 'Usamos o Past Simple ("went") quando o momento no passado é especificado ("two years ago"). Usamos o Present Perfect ("have completed") para ações que começaram no passado e têm relevância ou contagem contínua no presente ("since then").',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-b1-ex-02',
    level: 'B1',
    skill: 'reading',
    theme: 'Artigo sobre Hábitos Produtivos e Saúde Mental',
    type: 'reading',
    title: 'Balancing Deep Work and Digital Rest',
    passage: 'Modern professionals frequently report feeling overwhelmed by constant notifications and asynchronous communication. Recent cognitive studies suggest that taking structured 15-minute breaks without screens significantly accelerates memory consolidation and lowers cortisol levels. While many believe that multitasking saves time, researchers emphasize that switching contexts repeatedly can reduce overall productivity by up to 40%. The key takeaway is not working longer hours, but protecting uninterrupted blocks of deep focus.',
    statement: 'What is the main conclusion of the researchers highlighted in the passage?',
    options: [
      'Multitasking is essential for managing asynchronous work.',
      'Working longer hours directly guarantees higher productivity.',
      'Uninterrupted focus blocks are more effective than switching tasks repeatedly.',
      'Screens should be completely eliminated during the entire work day.',
    ],
    expectedAnswer: 2, // 'Uninterrupted focus blocks are more effective...'
    explanation: 'O texto conclui: "The key takeaway is not working longer hours, but protecting uninterrupted blocks of deep focus" e aponta que trocar de tarefas reduz produtividade em até 40%.',
    referenceId: 'ref-eng-bc-skills',
  },
  {
    id: 'eng-b1-ex-03',
    level: 'B1',
    skill: 'speaking',
    theme: 'Contando uma Experiência Pessoal Marcante',
    type: 'speaking',
    title: 'Sharing a Memorable Learning Experience',
    statement: 'Conte em voz alta, em 1 a 2 minutos, a história de uma vez em que você teve que aprender algo novo e desafiador (um esporte, uma ferramenta técnica, um instrumento ou idioma).',
    scenario: 'Em uma conversa informal com colegas internacionais, o assunto é: "What was the hardest skill you ever learned, and how did you do it?"',
    usefulPhrases: [
      'A few years ago, I decided to learn...',
      'At first, it was quite overwhelming because...',
      'To overcome that challenge, I started practicing every morning.',
      'Looking back, that experience taught me the value of persistence.',
    ],
    selfAssessmentChecks: [
      'Estruturei a história com começo (contexto), meio (o desafio) e fim (o aprendizado).',
      'Utilizei conectivos temporais ("at first", "then", "eventually", "looking back").',
      'Falei durante pelo menos 1 minuto contínuo.',
      'Expressei sentimentos e reflexões pessoais além de apenas listar fatos.',
    ],
    aiPrompt: 'Avalie minha resposta oral B1 onde conto uma experiência pessoal de aprendizado. Indique se usei bem os tempos verbais do passado (Past Simple e Past Continuous) e sugira conectivos melhores:\n\n[Insira a transcrição da sua fala]',
    explanation: 'No nível B1, o estudante é capaz de narrar acontecimentos com sequência lógica e exprimir justificativas para suas decisões.',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-b1-ex-04',
    level: 'B1',
    skill: 'listening',
    theme: 'Compreensão de Podcasts Culturais e Noticiosos',
    type: 'multiple-choice',
    title: 'Listening: BBC 6 Minute English',
    audioUrl: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
    audioSource: 'BBC Learning English · 6 Minute English',
    statement: 'Acesse o portal oficial do BBC 6 Minute English no link acima e selecione qualquer episódio recente. Ouça os primeiros 3 minutos com atenção.\n\nQual é a estratégia pedagógica central adotada pelos apresentadores ao longo de cada episódio?',
    options: [
      'Falar apenas em português e traduzir frases soltas',
      'Apresentar um tema real com pergunta-desafio, debate e explicação de 6 itens de vocabulário no final',
      'Ler um dicionário em ordem alfabética sem contexto',
      'Exigir que o ouvinte repita frases militares mecanicamente',
    ],
    expectedAnswer: 1, // 'Apresentar um tema real...'
    explanation: 'O formato clássico do BBC 6 Minute English baseia-se em uma pergunta inicial de quiz, debate descontraído de fatos reais e recapitulação contextualizada de seis palavras e expressões-chave.',
    referenceId: 'ref-eng-bbc-6min',
  },

  // --- B2 EXERCISES ---
  {
    id: 'eng-b2-ex-01',
    level: 'B2',
    skill: 'vocabulary-grammar',
    theme: 'Third Conditional & Past Modals of Deduction',
    type: 'multiple-choice',
    title: 'Hypothetical Past Situations (Third Conditional)',
    statement: 'Select the sentence that correctly expresses a hypothetical past regret:\n\n"If we __________ the database backup yesterday, we __________ hours of downtime during the outage."',
    options: [
      'had tested / would have avoided',
      'tested / will avoid',
      'would test / had avoided',
      'have tested / would avoid',
    ],
    expectedAnswer: 0, // 'had tested / would have avoided'
    explanation: 'A Third Conditional descreve situações hipotéticas no passado e seus resultados imaginados: If + Past Perfect (had tested), would have + past participle (would have avoided).',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-b2-ex-02',
    level: 'B2',
    skill: 'speaking',
    theme: 'Simulação de Reunião: Discordando com Diplomacia',
    type: 'roleplay',
    title: 'Professional Meeting: Polite Disagreement',
    statement: 'Simule sua participação em uma reunião de trabalho onde um colega propõe antecipar o lançamento de um produto em 3 semanas cortando a fase de testes. Discorde de maneira polida e profissional.',
    scenario: 'Seu colega diz: "I think we should skip the regression testing cycle so we can launch three weeks early and beat our competitors."',
    usefulPhrases: [
      'I appreciate the desire to launch quickly, but skipping tests introduces substantial operational risk.',
      'Could we explore a phased rollout instead of cutting the testing cycle entirely?',
      'If we deploy prematurely and face critical bugs, the reputational cost will outweigh the early launch benefit.',
      'What if we prioritize the top three user flows and automate the essential checks?',
    ],
    selfAssessmentChecks: [
      'Reconheci a intenção do colega antes de contra-argumentar (diplomacia).',
      'Apresentei razões objetivas (risco operacional, custo reputacional) em vez de opiniões emotivas.',
      'Propus uma solução alternativa construtiva (rollout gradual ou priorização).',
      'Mantive um tom calmo, profissional e assertivo.',
    ],
    aiPrompt: 'Atue como um gerente de produto que sugeriu cortar testes para lançar mais cedo. Eu vou apresentar minha discordância polida. Responda com um questionamento sobre custo para continuarmos o debate:\n\n[Insira seu argumento aqui]',
    explanation: 'No B2, a comunicação profissional exige suavizar discordâncias e orientar a conversa para soluções colaborativas.',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-b2-ex-03',
    level: 'B2',
    skill: 'writing',
    theme: 'E-mail Formal de Alinhamento de Projeto',
    type: 'writing',
    title: 'Writing a Professional Project Update to Stakeholders',
    statement: 'Escreva um e-mail de 80 a 120 palavras atualizando a diretoria sobre o andamento de uma iniciativa. Relate: 1 marco concluído no prazo, 1 imprevisto enfrentado e a respectiva medida de mitigação adotada.',
    usefulPhrases: [
      'Dear Stakeholders, / Dear Project Board,',
      'I am pleased to provide an update on our progress regarding [Project Name].',
      'We have successfully completed [milestone], which keeps us on track for our quarterly objectives.',
      'However, we encountered an unforeseen challenge with [issue].',
      'To mitigate this, our team has [action taken], ensuring minimal impact on the final delivery date.',
      'Please let me know if you have any questions or require additional details.',
    ],
    selfAssessmentChecks: [
      'Apresentei o marco concluído de forma clara e orientada a resultados.',
      'Comuniquei o imprevisto com transparência e postura resolutiva.',
      'Apresentei a ação mitigadora concreta com prazo.',
      'O vocabulário e a formalidade são condizentes com o ambiente executivo.',
    ],
    aiPrompt: 'Avalie este e-mail corporativo B2 de atualização de projeto. Aponte se o tom foi assertivo e se os conectivos de causa e efeito foram bem empregados:\n\n[Insira seu e-mail aqui]',
    explanation: 'Profissionais B2 dominam a arte de relatar problemas acompanhados de suas respectivas soluções mitigadoras.',
    referenceId: 'ref-eng-cam-learning',
  },

  // --- C1 EXERCISES ---
  {
    id: 'eng-c1-ex-01',
    level: 'C1',
    skill: 'vocabulary-grammar',
    theme: 'Inversão Enfática e Registro Sofisticado',
    type: 'multiple-choice',
    title: 'Inversion for Emphasis in Formal Contexts',
    statement: 'Identify the grammatically correct inverted sentence used for formal rhetorical emphasis:\n\n"Em nenhuma circunstância os dados confidenciais dos clientes devem ser expostos."',
    options: [
      'Under no circumstances customer data should be exposed.',
      'Under no circumstances should customer confidential data be exposed.',
      'In no circumstances customer confidential data ought to be exposed.',
      'Not under circumstances should be customer confidential data exposed.',
    ],
    expectedAnswer: 1, // 'Under no circumstances should customer confidential data be exposed.'
    explanation: 'Quando iniciamos uma frase formal com uma locução adverbial negativa ou restritiva como "Under no circumstances", "Seldom", "Rarely" ou "Hardly", ocorre inversão do verbo auxiliar com o sujeito: "Under no circumstances should [sujeito] be exposed".',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-c1-ex-02',
    level: 'C1',
    skill: 'reading',
    theme: 'Interpretação de Ensaio Crítico sobre Tecnologia',
    type: 'reading',
    title: 'The Epistemic Consequences of Algorithmic Curation',
    passage: 'The pervasive adoption of predictive content distribution has fundamentally altered civic discourse. By optimizing almost exclusively for affective engagement—which empirical research repeatedly links to indignity and moral polarization—recommendation engines inadvertently fragment public consensus. Crucially, this epistemic balkanization is not an incidental flaw of engineering, but rather the inexorable corollary of an attention-monetization architecture. Consequently, treating societal discord purely as a moderation dilemma misdiagnoses a systemic economic incentive as an isolated operational failure.',
    statement: 'According to the author, why is addressing social polarization merely through content moderation insufficient?',
    options: [
      'Because moderation algorithms are too slow to detect harmful content.',
      'Because the polarization is an inherent outcome of the core attention-monetization economic model, not just an operational error.',
      'Because users deliberately choose polarized feeds over educational articles.',
      'Because civic discourse has always been fragmented regardless of technology.',
    ],
    expectedAnswer: 1, // 'Because the polarization is an inherent outcome...'
    explanation: 'O autor argumenta expressamente que a fragmentação epistêmica "is not an incidental flaw of engineering, but rather the inexorable corollary of an attention-monetization architecture" e que tratar o problema como moderação "misdiagnoses a systemic economic incentive as an isolated operational failure".',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-c1-ex-03',
    level: 'C1',
    skill: 'speaking',
    theme: 'Apresentação Executiva de Proposta Estratégica',
    type: 'speaking',
    title: 'Pitching a High-Stakes Proposal Under Scrutiny',
    statement: 'Apresente verbalmente em 2 a 3 minutos uma proposta de reestruturação estratégica ou mudança metodológica em uma organização internacional, respondendo a objeções de custo e resistência cultural.',
    scenario: 'Você está diante do comitê executivo de uma corporação multinacional defendendo a transição para modelos de trabalho assíncronos e transparentes.',
    usefulPhrases: [
      'Allow me to contextualize why the status quo poses an existential risk to our talent retention.',
      'While the initial onboarding curve may seem formidable, empirical precedents demonstrate a 25% efficiency surge within two quarters.',
      'To address the legitimate concern regarding team cohesion, we are embedding synchronous bonding rituals.',
      'Ultimately, this transformation is not merely operational; it represents an alignment with contemporary global standards.',
    ],
    selfAssessmentChecks: [
      'Utilizei vocabulário preciso e sofisticado sem parecer artificial.',
      'Antecipei e desarmei objeções financeiras e culturais de forma convincente.',
      'Variação de entonação e pausas oratórias estratégicas.',
      'Articulação límpida com transições fluidas entre premissa, evidências e recomendação.',
    ],
    aiPrompt: 'Avalie minha fala argumentativa C1 em inglês sob a ótica de um executivo de empresa global. Destaque a sofisticação das collocations e se a estrutura retórica foi convincente:\n\n[Insira sua fala aqui]',
    explanation: 'Em C1, o falante expressa nuances e complexidade argumentativa com desembaraço, persuadindo públicos exigentes.',
    referenceId: 'ref-eng-coe-cefr',
  },

  // --- C2 EXERCISES ---
  {
    id: 'eng-c2-ex-01',
    level: 'C2',
    skill: 'vocabulary-grammar',
    theme: 'Linguagem Idiomática e Collocations de Alto Nível',
    type: 'multiple-choice',
    title: 'Idiomatic Nuances and Figurative Collocations',
    statement: 'Choose the idiom that best fits the formal context of a delicate diplomatic negotiation where an official refuses to reveal premature details:\n\n"The ambassador decided to __________, divulging neither concessions nor red lines until the plenary assembly convened."',
    options: [
      'play devil advocate',
      'keep her cards close to her chest',
      'throw caution to the wind',
      'bark up the wrong tree',
    ],
    expectedAnswer: 1, // 'keep her cards close to her chest'
    explanation: 'A expressão idiomática "keep one cards close to one chest" significa agir com cautela e discrição extrema, sem revelar intenções, planos ou estratégias antes da hora propícia.',
    referenceId: 'ref-eng-bc-grammar',
  },
  {
    id: 'eng-c2-ex-02',
    level: 'C2',
    skill: 'reading',
    theme: 'Análise de Ironia e Subtexto Editorial',
    type: 'reading',
    title: 'Deciphering Subtext and Irony in Satirical Prose',
    passage: 'The executive committee proclaimed, with customary humility, that their unprecedented package of severance bonuses was an agonizing sacrifice endured solely to preserve shareholder equanimity. One could hardly fail to admire the heroic stoicism with which the directors relieved the enterprise of its liquidity while counseling the remaining workforce on the noble virtue of fiscal frugality.',
    statement: 'What is the true underlying sentiment conveyed by the author in the passage above?',
    options: [
      'Genuine praise for the directors selflessness during difficult times.',
      'Sharp, scathing irony condemning the hypocrisy of executives rewarding themselves while preaching austerity to workers.',
      'A neutral accounting of financial severance calculations.',
      'Admiration for the fiscal prudence demonstrated by the remaining workforce.',
    ],
    expectedAnswer: 1, // 'Sharp, scathing irony...'
    explanation: 'O autor usa ironia clássica ("customary humility", "agonizing sacrifice", "heroic stoicism") para ridicularizar a hipocrisia de diretores que se autoatribuem bônus milionários enquanto exigem austeridade e cortes dos trabalhadores.',
    referenceId: 'ref-eng-coe-cefr',
  },
  {
    id: 'eng-c2-ex-03',
    level: 'C2',
    skill: 'speaking',
    theme: 'Debate de Alto Impacto com Nuances Culturais',
    type: 'speaking',
    title: 'Nuanced Discourse on Cultural and Ethical Dilemmas',
    statement: 'Discorra verbalmente em 2 a 3 minutos sobre a tensão ética entre vigilância biométrica corporativa e privacidade individual, incorporando eufemismos comumente usados no mundo corporativo e desconstruindo-os com elegância.',
    scenario: 'Você participa de um painel de debate transmitido globalmente com especialistas em ética tecnológica e líderes de multinacionais.',
    usefulPhrases: [
      'The euphemistic framing of perpetual monitoring as "workplace optimization" obscures its invasive essence.',
      'One must interrogate the implicit presumption that surveillance invariably correlates with heightened integrity.',
      'Striking a tenable equilibrium necessitates dismantling the false dichotomy between security and autonomy.',
      'Let us not conflate compliant acquiescence with genuine psychological safety.',
    ],
    selfAssessmentChecks: [
      'Transitei com facilidade entre abstrações conceituais e implicações pragmáticas.',
      'Desconstruí eufemismos corporativos com polidez cirúrgica.',
      'Não hesitei na escolha lexical mesmo em frases de alta densidade semântica.',
      'Demonstrei domínio de ritmo, entonação e clareza discursiva equiparada a falantes de proficiência plena.',
    ],
    aiPrompt: 'Avalie esta exposição oral de nível C2 em inglês. Analise a riqueza metafórica, o emprego de vocabulário acadêmico preciso e a sutileza na desconstrução de premissas:\n\n[Insira a transcrição de sua fala]',
    explanation: 'No nível C2, a fluência não é apenas falar sem erros, mas navegar por camadas sutis de significado, ironia e implicações éticas.',
    referenceId: 'ref-eng-coe-cefr',
  },
];

// ==========================================
// 4. AVALIAÇÕES DIAGNÓSTICAS POR NÍVEL (A1 A C2)
// ==========================================

export const levelDiagnosticEvaluations: Record<EnglishLevelId, LevelDiagnosticEvaluation> = {
  A1: {
    levelId: 'A1',
    title: 'Avaliação Diagnóstica A1 — Beginner',
    description: 'Diagnóstico das competências iniciais em inglês: verb to be, apresentações, horários, perguntas simples e vocabulário básico.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-a1-q1',
        level: 'A1',
        skill: 'vocabulary-grammar',
        question: 'Complete: "Where _____ your parents live?"',
        options: ['do', 'does', 'are', 'is'],
        correctIndex: 0,
        explanation: '"Parents" é um substantivo no plural (they), portanto a pergunta no Present Simple utiliza o verbo auxiliar "do": "Where do your parents live?".',
      },
      {
        id: 'diag-a1-q2',
        level: 'A1',
        skill: 'vocabulary-grammar',
        question: 'Qual frase está gramaticalmente correta?',
        options: [
          'She don’t have a car.',
          'She doesn’t has a car.',
          'She doesn’t have a car.',
          'She isn’t have a car.',
        ],
        correctIndex: 2,
        explanation: 'Na terceira pessoa do singular (he/she/it) no Present Simple negativo, usamos "doesn’t" acompanhado do verbo principal na forma base: "She doesn’t have a car".',
      },
      {
        id: 'diag-a1-q3',
        level: 'A1',
        skill: 'reading',
        question: 'Leia o anúncio: "Library Hours: Monday to Friday from 9 AM to 8 PM. Closed on Sundays and Holidays." Em qual dia a biblioteca NÃO abre?',
        options: ['Tuesday', 'Thursday', 'Sunday', 'Friday'],
        correctIndex: 2,
        explanation: 'O aviso afirma expressamente "Closed on Sundays and Holidays" (Fechada aos domingos e feriados).',
      },
      {
        id: 'diag-a1-q4',
        level: 'A1',
        skill: 'listening',
        question: 'Em uma gravação em um aeroporto, você ouve: "Flight BA 249 to London is now boarding at Gate 14". Para onde vai o voo e em qual portão?',
        options: [
          'Para Liverpool no portão 40',
          'Para Londres no portão 14',
          'Para Londres no portão 4',
          'Para Lisboa no portão 14',
        ],
        correctIndex: 1,
        explanation: '"London" e "Gate 14" (fourteen, não forty). Cuidado com a distinção entre fourteen (14) e forty (40).',
      },
    ],
    speakingTask: {
      title: 'Apresentação Pessoal Básica',
      scenario: 'Grave um áudio ou fale em voz alta durante 30 a 45 segundos dizendo: seu nome, cidade onde mora, o que faz profissionalmente ou nos estudos, e uma comida ou hobby favorito.',
      guidingQuestions: [
        'What is your name and where are you from?',
        'What do you do for work or study?',
        'What do you like to do on weekends?',
      ],
      usefulVocabulary: ['My name is...', 'I live in...', 'I work as...', 'In my free time, I like...'],
      rubric: [
        'Apresentei nome, cidade e atividade com clareza.',
        'Usei frases completas com sujeito e verbo.',
        'Pronúncia compreensível sem longas paradas de silêncio.',
      ],
      aiPrompt: 'Avalie minha resposta falada para a avaliação A1 de inglês. Verifique a correção gramatical básica e aponte se as informações pedidas foram transmitidas com clareza:\n\n[Insira aqui o que você falou]',
    },
    writingTask: {
      title: 'Mensagem de Contato Pessoal',
      prompt: 'Escreva uma mensagem de 25 a 40 palavras apresentando-se a um colega de estudos internacional. Diga quem você é, onde mora e por que deseja aprender inglês.',
      minWords: 25,
      rubric: [
        'Utilizou letras maiúsculas para "I" e início de frases.',
        'Frases com sujeito, verbo e complemento.',
        'Extensão mínima de 25 palavras respeitada.',
      ],
      aiPrompt: 'Analise este texto de escrita A1. Indique acertos e erros de ortografia ou concordância de verb to be:\n\n[Insira seu texto]',
    },
  },

  A2: {
    levelId: 'A2',
    title: 'Avaliação Diagnóstica A2 — Elementary',
    description: 'Diagnóstico de Past Simple, planos futuros com going to, modais básicos, situações de viagem e compras.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-a2-q1',
        level: 'A2',
        skill: 'vocabulary-grammar',
        question: 'Complete com a forma correta do passado: "We _____ to the cinema yesterday, but we _____ the movie."',
        options: [
          'went / didn’t enjoy',
          'goed / didn’t enjoyed',
          'went / haven’t enjoyed',
          'were / don’t enjoy',
        ],
        correctIndex: 0,
        explanation: '"Go" tem passado irregular "went". Na negativa no Past Simple, usamos "didn’t" + verbo na forma base: "didn’t enjoy".',
      },
      {
        id: 'diag-a2-q2',
        level: 'A2',
        skill: 'vocabulary-grammar',
        question: 'Qual frase contém a forma comparativa correta?',
        options: [
          'Traveling by train is more cheap than by airplane.',
          'Traveling by train is cheaper than by airplane.',
          'Traveling by train is more cheaper than by airplane.',
          'Traveling by train is as cheaper as by airplane.',
        ],
        correctIndex: 1,
        explanation: 'Adjetivos curtos de uma sílaba como "cheap" formam comparativo com o sufixo -er: "cheaper than".',
      },
      {
        id: 'diag-a2-q3',
        level: 'A2',
        skill: 'reading',
        question: 'Leia o bilhete: "Hi Leo, I took the car to the garage because the brakes were making a strange noise. The mechanic said it will be ready by 5 PM. Can you pick it up after your shift? Thanks, Carla." O que Carla pede a Leo?',
        options: [
          'Que ele conserte os freios do carro.',
          'Que ele busque o carro na oficina após o expediente de trabalho.',
          'Que ele leve o carro para a oficina antes das 17h.',
          'Que ele empreste o carro a um colega.',
        ],
        correctIndex: 1,
        explanation: '"Can you pick it up after your shift?" significa "Você pode pegá-lo/buscá-lo após o seu turno de trabalho?".',
      },
      {
        id: 'diag-a2-q4',
        level: 'A2',
        skill: 'vocabulary-grammar',
        question: 'Para expressar uma recomendação ou conselho de saúde amigável, qual modal é o mais adequado?',
        options: ['must', 'should', 'can', 'will'],
        correctIndex: 1,
        explanation: '"Should" é o verbo modal padrão para recomendações e conselhos: "You look tired; you should take a break".',
      },
    ],
    speakingTask: {
      title: 'Relato de Experiência Passada ou Viagem',
      scenario: 'Fale por 1 minuto descrevendo um passeio ou viagem memorável que você fez. Conte para onde foi, com quem, o que fez e por que foi agradável.',
      guidingQuestions: [
        'Where did you go and when was that?',
        'Who did you go with?',
        'What activities did you do there?',
        'How was the food and the weather?',
      ],
      usefulVocabulary: ['Last year, I traveled to...', 'We stayed in a...', 'We visited...', 'The weather was...'],
      rubric: [
        'Empreguei verbos no Past Simple com consistência.',
        'Descrevi pelo menos 3 ações ocorridas na viagem.',
        'Falei de forma contínua durante cerca de 1 minuto.',
      ],
      aiPrompt: 'Avalie minha resposta oral A2 em inglês. Aponte se os verbos no passado foram conjugados corretamente e sugira melhorias de pronúncia para os verbos regulares terminados em -ed:\n\n[Insira aqui a transcrição]',
    },
    writingTask: {
      title: 'E-mail de Agradecimento e Confirmação',
      prompt: 'Escreva um e-mail de 50 a 70 palavras agradecendo a um amigo ou colega por hospedar você durante um final de semana e confirmando seu retorno seguro para casa.',
      minWords: 50,
      rubric: [
        'Saudação e encerramento cordiais adequados.',
        'Menção a pelo menos um momento agradável do encontro.',
        'Uso correto de tempos verbais no passado e futuro imediato.',
      ],
      aiPrompt: 'Revise este e-mail A2. Verifique pontuação, parágrafos e o uso de preposições de tempo e lugar:\n\n[Insira seu e-mail]',
    },
  },

  B1: {
    levelId: 'B1',
    title: 'Avaliação Diagnóstica B1 — Intermediate',
    description: 'Diagnóstico de tempos verbais em contexto, condicionais introdutórias, expressão de opinião e compreensão de textos analíticos.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-b1-q1',
        level: 'B1',
        skill: 'vocabulary-grammar',
        question: 'Complete com a Second Conditional: "If I _____ more time, I _____ a new foreign language."',
        options: [
          'have / will study',
          'had / would study',
          'had had / studied',
          'would have / studied',
        ],
        correctIndex: 1,
        explanation: 'A Second Conditional (situações hipotéticas presentes/futuras) segue a estrutura: If + Past Simple (had), would + forma base (would study).',
      },
      {
        id: 'diag-b1-q2',
        level: 'B1',
        skill: 'vocabulary-grammar',
        question: 'Escolha a frase que usa corretamente o Present Perfect contínuo para expressar duração até o presente:',
        options: [
          'I am working here since five years.',
          'I have been working here for five years.',
          'I worked here since five years ago.',
          'I had been working here during five years.',
        ],
        correctIndex: 1,
        explanation: 'Para ações que começaram no passado e continuam no presente com indicação de período, usamos "have been working" com a preposição "for" ("for five years").',
      },
      {
        id: 'diag-b1-q3',
        level: 'B1',
        skill: 'reading',
        question: 'Leia o trecho: "While the company expanded its user base by 30%, operational costs skyrocketed due to unexpected cloud infrastructure demands, resulting in a net quarterly loss." Qual foi o resultado final do trimestre?',
        options: [
          'A empresa teve lucro recorde graças ao aumento de usuários.',
          'A empresa teve prejuízo líquido devido aos altos custos inesperados de infraestrutura.',
          'A empresa reduziu seus custos de nuvem pela metade.',
          'A base de usuários caiu 30% após os problemas operacionais.',
        ],
        correctIndex: 1,
        explanation: 'O texto afirma que, embora a base tenha crescido 30%, os custos dispararam ("skyrocketed"), resultando em um prejuízo líquido ("net quarterly loss").',
      },
      {
        id: 'diag-b1-q4',
        level: 'B1',
        skill: 'vocabulary-grammar',
        question: 'Qual conectivo expressa contraste com clareza na frase: "The team worked overtime; __________, the project was delivered on schedule."',
        options: ['consequently', 'furthermore', 'nevertheless', 'because'],
        correctIndex: 2,
        explanation: '"Nevertheless" significa "não obstante / mesmo assim / apesar disso", indicando contraste em relação à dificuldade do trabalho extra.',
      },
    ],
    speakingTask: {
      title: 'Defendendo um Ponto de Vista com Argumentos',
      scenario: 'Grave ou fale por 1 minuto e meio sobre o tema: "Should employees have the right to work remotely full-time?" Apresente sua opinião, duas razões e um contra-ponto.',
      guidingQuestions: [
        'What is your stance on remote vs hybrid work?',
        'What are the primary benefits for professionals and organizations?',
        'What challenges or drawbacks need to be addressed?',
      ],
      usefulVocabulary: ['In my view...', 'One major advantage is...', 'On the other hand...', 'To mitigate this...'],
      rubric: [
        'Apresentei tese clara no início.',
        'Justifiquei com duas razões fundamentadas.',
        'Reconheci um contra-argumento ou desafio.',
        'Usei conectivos discursivos adequados ("moreover", "however", "therefore").',
      ],
      aiPrompt: 'Avalie minha resposta oral argumentativa em nível B1. Aponte a variedade vocabular e a coesão entre as frases:\n\n[Insira aqui sua fala]',
    },
    writingTask: {
      title: 'Texto de Opinião Estruturado',
      prompt: 'Escreva um texto de 80 a 110 palavras explicando as vantagens e desvantagens de aprender um idioma pela internet em comparação com cursos presenciais tradicionais.',
      minWords: 80,
      rubric: [
        'Estruturado em parágrafos (introdução, prós/contras, conclusão).',
        'Emprego de conectivos de contraste ("while", "although", "in contrast").',
        'Vocabulário variado sem repetições excessivas.',
      ],
      aiPrompt: 'Avalie este texto opinativo B1 em inglês. Verifique a coesão textual e sugira melhorias estilísticas:\n\n[Insira seu texto]',
    },
  },

  B2: {
    levelId: 'B2',
    title: 'Avaliação Diagnóstica B2 — Upper Intermediate',
    description: 'Diagnóstico de comunicação profissional, Third Conditional, voz passiva em relatórios e argumentação persuasiva.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-b2-q1',
        level: 'B2',
        skill: 'vocabulary-grammar',
        question: 'Identify the sentence with correct modal deduction in the past:\n"Lucas didn’t answer the urgent phone call."',
        options: [
          'He must have been in a client meeting.',
          'He should have be in a client meeting.',
          'He can have been in a client meeting.',
          'He must to be in a client meeting.',
        ],
        correctIndex: 0,
        explanation: 'Para expressar forte dedução lógica no passado, usamos "must have + particípio passado": "He must have been in a client meeting".',
      },
      {
        id: 'diag-b2-q2',
        level: 'B2',
        skill: 'vocabulary-grammar',
        question: 'Complete the passive voice sentence suitable for a formal report: "All sensitive files __________ before transmission."',
        options: [
          'were being encrypted',
          'must be encrypted',
          'ought encrypt',
          'have encrypting',
        ],
        correctIndex: 1,
        explanation: '"Must be encrypted" é a forma passiva formal correta (modal + be + particípio passado) para expressar obrigatoriedade técnica.',
      },
      {
        id: 'diag-b2-q3',
        level: 'B2',
        skill: 'reading',
        question: 'Read the excerpt: "The startup pivot was widely praised by analysts, yet internal retention metrics revealed that engineering morale had plummeted following the abrupt cancellation of the foundational open-source initiative." What caused engineering morale to drop?',
        options: [
          'Negative reviews published by market analysts.',
          'The abrupt cancellation of their open-source initiative.',
          'The reduction of employee severance packages.',
          'An increase in remote work requirements.',
        ],
        correctIndex: 1,
        explanation: 'O texto afirma explicitamente que o ânimo desabou ("morale had plummeted") "following the abrupt cancellation of the foundational open-source initiative".',
      },
      {
        id: 'diag-b2-q4',
        level: 'B2',
        skill: 'vocabulary-grammar',
        question: 'Choose the most natural collocation in professional English: "Our primary objective is to __________ customer engagement across digital platforms."',
        options: ['raise up', 'foster', 'fabricate', 'provoke'],
        correctIndex: 1,
        explanation: '"To foster engagement" (promover/incentivar engajamento) é uma collocation natural e frequente no inglês corporativo contemporâneo.',
      },
    ],
    speakingTask: {
      title: 'Simulação de Entrevista: Desafio Profissional (STAR)',
      scenario: 'Responda oralmente em 2 minutos à clássica pergunta de entrevista de emprego: "Describe a significant challenge you faced in a project and how you resolved it." Siga o método STAR.',
      guidingQuestions: [
        'What was the context and the specific obstacle? (Situation & Task)',
        'What concrete actions did you take to tackle the problem? (Action)',
        'What was the quantifiable or qualitative outcome? (Result)',
      ],
      usefulVocabulary: ['The challenge arose when...', 'I took the initiative to...', 'Consequently, we achieved...', 'The key takeaway was...'],
      rubric: [
        'Respeitei a estrutura STAR com clareza.',
        'Destaquei minhas ações individuais com verbos de ação.',
        'Apresentei resultados mensuráveis ou aprendizados objetivos.',
        'Fluência sem pausas prolongadas ou hesitações que prejudiquem a mensagem.',
      ],
      aiPrompt: 'Avalie minha resposta comportamental STAR em inglês B2. Aponte se fui assertivo e se os verbos no passado demonstraram liderança e proatividade:\n\n[Insira aqui sua fala]',
    },
    writingTask: {
      title: 'Proposta Formal de Resolução de Problema',
      prompt: 'Escreva um memorando de 100 a 140 palavras para seu gestor explicando por que a equipe deve adotar uma nova ferramenta ou prática de trabalho, detalhando benefícios e cronograma sugerido.',
      minWords: 100,
      rubric: [
        'Tom profissional e persuasivo.',
        'Uso de dados ou estimativas para embasar o pedido.',
        'Estruturação com seções claras (Problem, Proposed Solution, Benefits, Next Steps).',
      ],
      aiPrompt: 'Avalie esta proposta profissional B2. Aponte se a linguagem foi convincente e diplomática:\n\n[Insira sua proposta]',
    },
  },

  C1: {
    levelId: 'C1',
    title: 'Avaliação Diagnóstica C1 — Advanced',
    description: 'Diagnóstico de inversão estilística, nuances de significado, síntese de fontes complexas e liderança comunicativa.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-c1-q1',
        level: 'C1',
        skill: 'vocabulary-grammar',
        question: 'Identify the sentence with correct cleft structure for rhetorical focus:',
        options: [
          'It was our lack of automated testing that caused the deployment failure.',
          'What caused the deployment failure were our lack of automated testing.',
          'It were our lack of automated testing what caused the deployment failure.',
          'That caused the deployment failure it was our lack of automated testing.',
        ],
        correctIndex: 0,
        explanation: 'A cleft sentence enfática com "It" segue o padrão: "It + was + elemento focalizado + that/who + oração restante". Como "lack" é singular, usa-se "It was our lack of automated testing that caused...".',
      },
      {
        id: 'diag-c1-q2',
        level: 'C1',
        skill: 'reading',
        question: 'In the sentence: "Far from being an innocuous clerical adjustment, the revised telemetry clause constitutes an egregious encroachment on user privacy," what does the author imply about the clause?',
        options: [
          'It is a minor, routine administrative update.',
          'It is a severe and unacceptable violation disguised as a simple update.',
          'It will improve clerical workflow efficiency.',
          'It has no significant bearing on user rights.',
        ],
        correctIndex: 1,
        explanation: '"Far from being innocuous" (longe de ser inofensiva) e "egregious encroachment" (grave violação/usurpação) revelam a denúncia enfática do autor contra o abuso de privacidade.',
      },
      {
        id: 'diag-c1-q3',
        level: 'C1',
        skill: 'vocabulary-grammar',
        question: 'Select the idiom meaning "to confront a difficult reality directly without evasion":',
        options: [
          'bite the bullet',
          'beat around the bush',
          'skate on thin ice',
          'burn the midnight oil',
        ],
        correctIndex: 0,
        explanation: '"To bite the bullet" significa encarar uma situação dura ou inevitável com coragem e determinação, sem rodeios.',
      },
      {
        id: 'diag-c1-q4',
        level: 'C1',
        skill: 'vocabulary-grammar',
        question: 'Complete with the formal subjunctive form: "The audit committee recommended that the lead architect __________ all security exceptions immediately."',
        options: ['revokes', 'revoke', 'will revoke', 'must revoke'],
        correctIndex: 1,
        explanation: 'No subjuntivo mandativo do inglês formal (após verbos como recommend, insist, require), usa-se a forma base do verbo sem -s: "recommended that the architect revoke...".',
      },
    ],
    speakingTask: {
      title: 'Discurso Executivo: Alinhamento Estratégico',
      scenario: 'Apresente verbalmente em 2 a 3 minutos um posicionamento para a diretoria de uma empresa defendendo a alocação de 20% do tempo de engenharia para pagamento de débito técnico.',
      guidingQuestions: [
        'How does technical debt impede strategic product velocity?',
        'What empirical metrics justify this 20% investment?',
        'How will progress and ROI be audited and demonstrated?',
      ],
      usefulVocabulary: ['Compounding interest of debt', 'Velocity degradation', 'Systemic resilience', 'Proactive remediation'],
      rubric: [
        'Emprego de collocations e jargão corporativo/estratégico de alto nível.',
        'Fluência contínua com pausas oratórias naturais.',
        'Estruturação retórica contundente e persuasiva.',
      ],
      aiPrompt: 'Avalie esta apresentação executiva C1 em inglês. Avalie a sofisticação vocabular, a elegância das transições e a firmeza dos argumentos:\n\n[Insira aqui sua fala]',
    },
    writingTask: {
      title: 'Executive Summary de Tomada de Decisão',
      prompt: 'Escreva um Executive Summary de 120 a 160 palavras recomendando a migração ou permanência de uma solução tecnológica de missão crítica, pesando riscos, custos e viabilidade a longo prazo.',
      minWords: 120,
      rubric: [
        'Estilo executivo conciso, sem divagações.',
        'Equilíbrio entre riscos imediatos e ganhos estratégicos futuros.',
        'Emprego de vocabulário formal avançado (e.g., mitigate, amortize, viable, imperative).',
      ],
      aiPrompt: 'Avalie este Executive Summary em nível C1. Aponte se o tom foi analítico e se a densidade de informação foi adequada para um leitor de nível diretivo:\n\n[Insira seu texto]',
    },
  },

  C2: {
    levelId: 'C2',
    title: 'Avaliação Diagnóstica C2 — Proficient',
    description: 'Diagnóstico de maestria, nuances finíssimas de sentido, ironia, adaptação estilística sofisticada e precisão cirúrgica.',
    disclaimer: 'Esta avaliação local é um instrumento pedagógico de autoavaliação e orientação de estudos. Ela não confere certificação oficial CEFR nem diploma de proficiência.',
    objectiveQuestions: [
      {
        id: 'diag-c2-q1',
        level: 'C2',
        skill: 'vocabulary-grammar',
        question: 'Identify the word that most precisely captures "unwillingness to make concessions, characterized by stubborn and uncompromising determination":',
        options: ['indolence', 'intransigence', 'pusillanimity', 'circumspection'],
        correctIndex: 1,
        explanation: '"Intransigence" (intransigência) denota especificamente a recusa inflexível em ceder ou negociar. "Indolence" é preguiça, "pusillanimity" é covardia e "circumspection" é cautela.',
      },
      {
        id: 'diag-c2-q2',
        level: 'C2',
        skill: 'reading',
        question: 'Consider the sentence: "The minister’s defense was a masterclass in obfuscation, draped in the baroque rhetoric of bureaucratic inevitability." What is the author’s appraisal of the minister’s defense?',
        options: [
          'A transparent and convincing explanation of inevitable policies.',
          'A deliberately convoluted and misleading attempt to conceal accountability behind ornate language.',
          'An artistic and poetic speech that delighted public servants.',
          'A brief and straightforward factual summary.',
        ],
        correctIndex: 1,
        explanation: '"Obfuscation" significa obscurecer a verdade intencionalmente, e "draped in baroque rhetoric" satiriza o floreio de palavras vazio para mascarar a falta de substância.',
      },
      {
        id: 'diag-c2-q3',
        level: 'C2',
        skill: 'vocabulary-grammar',
        question: 'Which literary device is exemplified in: "His silence was deafening"?',
        options: ['Litotes', 'Oxymoron', 'Synecdoche', 'Chiasmus'],
        correctIndex: 1,
        explanation: 'Um "Oxymoron" (oxímoro) reúne dois termos de sentidos aparentemente contraditórios em uma mesma expressão ("silence" + "deafening").',
      },
      {
        id: 'diag-c2-q4',
        level: 'C2',
        skill: 'vocabulary-grammar',
        question: 'In high-register diplomatic discourse, what is the meaning of the phrase "sine qua non"?',
        options: [
          'A temporary suspension of diplomatic protocol.',
          'An indispensable and essential condition without which an agreement cannot exist.',
          'A unanimous vote by secret ballot.',
          'A minor clause that can be omitted without consequence.',
        ],
        correctIndex: 1,
        explanation: '"Sine qua non" é uma locução latina amplamente incorporada ao inglês culto significando uma condição essencial e indispensável.',
      },
    ],
    speakingTask: {
      title: 'Debate Crítico sobre Paradigmas Culturais e Éticos',
      scenario: 'Apresente um discurso analítico de 3 minutos dissecando as contradições entre a retórica corporativa de inovação aberta e as práticas contemporâneas de consolidação monopolista e proteção de propriedade intelectual.',
      guidingQuestions: [
        'How do market incumbents weaponize regulatory compliance to stifle emergent competitors?',
        'What subtle linguistic euphemisms normalize this consolidation in media discourse?',
        'What structural remedies are feasible without causing systemic volatility?',
      ],
      usefulVocabulary: ['Antitrust inertia', 'Asymmetric information', 'Moats and lock-in', 'Weaponized patent portfolios'],
      rubric: [
        'Eloquência espontânea sem hesitações de busca de vocabulário.',
        'Nuances conceituais ricas com distinções finas entre termos correlatos.',
        'Desenvolvimento retórico impecável com ritmo, ênfases e modulação de voz.',
      ],
      aiPrompt: 'Avalie este discurso de nível C2 em inglês. Examine o rigor das distinções conceituais, o apuro estilístico e a ausência de lugares-comuns ou clichês:\n\n[Insira aqui sua fala]',
    },
    writingTask: {
      title: 'Ensaio Crítico sobre Transformações Tecnológicas',
      prompt: 'Escreva um ensaio analítico de 150 a 200 palavras refletindo criticamente sobre as implicações epistêmicas da dependência humana em sistemas generativos de linguagem para a produção do conhecimento científico.',
      minWords: 150,
      rubric: [
        'Prosa elegante, densa e com ritmo estético apurado.',
        'Argumentação articulada com rigor e sem generalizações superficiais.',
        'Vocabulário erudito empregado com precisão absoluta de significado.',
      ],
      aiPrompt: 'Avalie este ensaio C2 em inglês sob a perspectiva de um parecerista de publicação acadêmica internacional. Analise a coerência das premissas, a fluidez das transições e o apuro vocabular:\n\n[Insira seu ensaio]',
    },
  },
};

// ==========================================
// 5. NIVELAMENTO INICIAL ("NÃO SEI MEU NÍVEL")
// ==========================================

export const initialPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'plc-q1',
    levelTested: 'A1',
    question: 'Complete the sentence:\n"Where _____ you from?"',
    options: ['is', 'are', 'am', 'do'],
    correctIndex: 1,
    explanation: 'Em inglês, o pronome "you" concorda com "are": "Where are you from?".',
  },
  {
    id: 'plc-q2',
    levelTested: 'A1',
    question: 'Qual é o plural correto de "child"?',
    options: ['childs', 'children', 'childrens', 'childes'],
    correctIndex: 1,
    explanation: '"Child" tem plural irregular: "children".',
  },
  {
    id: 'plc-q3',
    levelTested: 'A2',
    question: 'Complete com o passado correto:\n"She _____ home late last night because of the traffic jam."',
    options: ['arrive', 'arrived', 'was arrived', 'has arrived'],
    correctIndex: 1,
    explanation: 'Como o momento passado é especificado ("last night"), usamos o Past Simple: "arrived".',
  },
  {
    id: 'plc-q4',
    levelTested: 'A2',
    question: 'Complete the comparison:\n"Tokyo is _____ than my hometown."',
    options: ['more big', 'bigger', 'bigness', 'most big'],
    correctIndex: 1,
    explanation: 'O adjetivo "big" dobra a consoante e recebe -er para o comparativo: "bigger than".',
  },
  {
    id: 'plc-q5',
    levelTested: 'B1',
    question: 'Choose the correct form:\n"I have lived in this apartment _____ 2021."',
    options: ['for', 'since', 'during', 'from'],
    correctIndex: 1,
    explanation: 'Usamos "since" para indicar o ponto de partida temporal exato ("since 2021"). Usamos "for" para duração ("for three years").',
  },
  {
    id: 'plc-q6',
    levelTested: 'B1',
    question: 'Complete the conditional:\n"If I won the lottery, I _____ around the world."',
    options: ['will travel', 'would travel', 'travel', 'traveled'],
    correctIndex: 1,
    explanation: 'Na Second Conditional (hipótese presente/futura), usamos "would + verbo base": "If I won... I would travel".',
  },
  {
    id: 'plc-q7',
    levelTested: 'B2',
    question: 'Identify the sentence with correct modal deduction in the past:\n"The ground is wet. It _____ during the night."',
    options: ['must rain', 'must have rained', 'should rain', 'ought have rained'],
    correctIndex: 1,
    explanation: 'Dedução lógica forte sobre fato ocorrido no passado: "must have + particípio" (must have rained).',
  },
  {
    id: 'plc-q8',
    levelTested: 'C1',
    question: 'Complete with formal inversion:\n"Seldom _____ such remarkable dedication in a young researcher."',
    options: ['we have seen', 'have we seen', 'we saw', 'did seen we'],
    correctIndex: 1,
    explanation: 'Advérbios negativos no início exigem inversão sujeito-auxiliar: "Seldom have we seen...".',
  },
];

export function calculateSuggestedPlacement(correctCount: number): EnglishLevelId {
  if (correctCount <= 2) return 'A1';
  if (correctCount <= 4) return 'A2';
  if (correctCount <= 6) return 'B1';
  if (correctCount <= 7) return 'B2';
  return 'C1';
}

// ==========================================
// 6. TRILHA: INGLÊS PARA CARREIRA INTERNACIONAL
// ==========================================

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'eng-car-01',
    title: 'Elevator Pitch & Apresentação Profissional',
    area: 'Apresentação e Presença',
    summary: 'Apresentar sua trajetória e proposta de valor em 30 e 60 segundos com assertividade em entrevistas e eventos.',
    keyStrategies: [
      'Estruture em 3 partes: Quem sou + O que construo/resolvo + O que busco agora.',
      'Foque no impacto concreto gerado, não apenas em ferramentas.',
      'Evite termos genéricos como "I am a hard worker"; mostre resultados.',
    ],
    usefulPhrases: [
      'I specialize in designing and scaling resilient backend systems.',
      'Over the past four years, I have helped organizations optimize database queries and cut latency by 35%.',
      'I am currently looking to contribute to distributed international teams facing high-throughput challenges.',
    ],
    scenario: 'Você entra em uma sala de breakout de uma conferência internacional e alguém diz: "Tell us a bit about your background!"',
    practiceTask: 'Grave um elevator pitch de 45 segundos cronometrados e compartilhe com um colega para obter feedback sobre clareza.',
    aiPrompt: 'Avalie meu Elevator Pitch profissional de 45 segundos para o mercado internacional. Aponte se transmiti autoridade técnica e se o fechamento foi assertivo:\n\n[Insira seu pitch aqui]',
  },
  {
    id: 'eng-car-02',
    title: 'Currículo em Inglês & Action Verbs',
    area: 'Candidaturas Globais',
    summary: 'Elaborar um currículo conciso no padrão internacional (1 a 2 páginas), estruturando cada conquista com verbos de ação e a fórmula X-Y-Z do Google.',
    keyStrategies: [
      'Fórmula Google X-Y-Z: "Accomplished [X], as measured by [Y], by doing [Z]".',
      'Elimine foto, data de nascimento e endereço residencial completo (padrão US/UK/UE).',
      'Substitua descrições passivas por verbos de ação vigorosos: Architected, Spearheaded, Automated, Refactored.',
    ],
    usefulPhrases: [
      'Architected an event-driven notification service, reducing message loss to 0.01% using Kafka.',
      'Spearheaded the migration of legacy monolith endpoints to RESTful microservices.',
      'Collaborated cross-functionally with product managers and UX designers to accelerate release cycles by 20%.',
    ],
    scenario: 'Você precisa reescrever uma experiência profissional do seu currículo que dizia apenas: "Trabalhei com banco de dados e apis".',
    practiceTask: 'Reescreva 3 tópicos da sua última experiência de trabalho usando a fórmula X-Y-Z e verbos de ação em inglês.',
    aiPrompt: 'Revise estes 3 bullet points de currículo em inglês para vagas de tecnologia internacionais. Transforme-os na fórmula Google X-Y-Z com métricas fictícias plausíveis:\n\n[Insira seus bullet points]',
  },
  {
    id: 'eng-car-03',
    title: 'Perfil Global no LinkedIn & Headline Estratégico',
    area: 'Presença Digital',
    summary: 'Construir um headline e uma seção "About" magnéticos em inglês, otimizados para buscas de recrutadores globais.',
    keyStrategies: [
      'Headline deve unir: Cargo + Especialidade + Impacto + Palavras-chave relevantes.',
      'Seção About deve contar sua história com voz humana, entusiasmo e chamada clara para contato.',
      'Alterne para o perfil secundário em inglês nativo na plataforma do LinkedIn.',
    ],
    usefulPhrases: [
      'Backend Engineer | TypeScript, Node.js, Go | Designing scalable microservices & cloud architectures',
      'Passionate about distributed systems, clean code, and developer experience.',
      'Feel free to connect or reach out via email at [your email].',
    ],
    scenario: 'Seu headline no LinkedIn atualmente é apenas "Software Developer". Como torná-lo atraente para recrutadores da Europa e América do Norte?',
    practiceTask: 'Escreva um novo headline de até 120 caracteres e um parágrafo "About" de 6 linhas em inglês.',
    aiPrompt: 'Avalie este headline e resumo "About" para meu LinkedIn em inglês. Otimize com palavras-chave relevantes para contratação internacional:\n\n[Insira seu texto]',
  },
  {
    id: 'eng-car-04',
    title: 'Entrevistas Comportamentais (Método STAR)',
    area: 'Processos Seletivos',
    summary: 'Dominar o framework STAR (Situation, Task, Action, Result) para responder a perguntas comportamentais com precisão e segurança.',
    keyStrategies: [
      'Situation (15%): Contextualize o problema de forma concisa.',
      'Task (15%): Explique qual era sua responsabilidade específica.',
      'Action (50%): Foque no que VOCÊ fez, liderou ou implementou.',
      'Result (20%): Apresente o impacto final com métricas ou lições aprendidas.',
    ],
    usefulPhrases: [
      'Tell me about a conflict in your team: "Situation: Our team was divided on database choices..."',
      'Action: "I organized a comparative benchmark spike and facilitated an objective trade-off review."',
      'Result: "We reached a unanimous decision within two days, avoiding three weeks of deliberation."',
    ],
    scenario: 'O recrutador pergunta: "Can you describe a situation where a production deployment went wrong, and how you handled it?"',
    practiceTask: 'Redija e ensaie em voz alta 1 resposta completa pelo método STAR para essa pergunta.',
    aiPrompt: 'Simule ser um engenheiro de contratação sênior internacional. Eu fornecerei minha resposta STAR e você fará 2 perguntas de aprofundamento (follow-up questions) duras em inglês:\n\n[Insira sua resposta STAR]',
  },
  {
    id: 'eng-car-05',
    title: 'Cerimônias Ágeis & Daily Standups em Inglês',
    area: 'Dia a Dia Corporativo',
    summary: 'Expressar com rapidez o que fez ontem, o que fará hoje e impedimentos reais durante daily meetings e sprint plannings.',
    keyStrategies: [
      'Seja direto: Yesterday I worked on X, today I am tackling Y, and I have a blocker regarding Z.',
      'Não transforme a daily em uma explicação técnica exaustiva de 10 minutos.',
      'Peça alinhamento fora da reunião: "Can we sync offline after the standup about this?"',
    ],
    usefulPhrases: [
      'Yesterday, I wrapped up the authentication endpoint tests.',
      'Today, I am focusing on the rate-limiting middleware.',
      'I am currently blocked by missing API credentials for the third-party gateway.',
      'Maria, do you have five minutes after the call to take a quick look at this PR?',
    ],
    scenario: 'Sua vez de falar na daily de uma equipe distribuída entre Berlim, Nova York e São Paulo.',
    practiceTask: 'Fale em voz alta a sua atualização de daily em menos de 45 segundos.',
    aiPrompt: 'Revise esta fala de daily standup em inglês. Verifique se o vocabulário é direto e natural para times ágeis:\n\n[Insira seu texto]',
  },
  {
    id: 'eng-car-06',
    title: 'Comunicação Escrita Assíncrona (PRs, Slack e E-mails)',
    area: 'Trabalho Remoto',
    summary: 'Redigir descrições de pull requests, mensagens no Slack e e-mails com clareza cristalina, contexto e consideração pelo fuso horário do colega.',
    keyStrategies: [
      'Em PRs, inclua: Contexto + O que mudou + Como testar + Screenshots/Logs.',
      'No Slack, evite mensagens "Oi, tudo bem?" sem o conteúdo da dúvida (no "hello" messages).',
      'Deixe links de contexto mastigados para quem for ler horas depois em outro continente.',
    ],
    usefulPhrases: [
      '## Context: This PR resolves issue #142 by adding idempotent retries to payment webhooks.',
      '## How to test: Run `npm test -- payment.spec.ts` or trigger a failed invoice via Postman.',
      'No rush on this—whenever you get online tomorrow, please take a look at the attached log snippet.',
    ],
    scenario: 'Você precisa abrir um Pull Request crítico que altera o fluxo de autenticação e será revisado por um desenvolvedor em Singapura.',
    practiceTask: 'Escreva a descrição em inglês de um PR fictício contendo resumo, decisões técnicas e passos de teste.',
    aiPrompt: 'Avalie esta descrição de Pull Request em inglês para um repositório open-source internacional. O formato e os tópicos estão claros?:\n\n[Insira a descrição]',
  },
  {
    id: 'eng-car-07',
    title: 'Feedback Construtivo & Desacordo Polido',
    area: 'Colaboração e Liderança',
    summary: 'Dar e receber feedbacks, sugerir melhorias em código de colegas e expressar divergências técnicas de modo construtivo e empático.',
    keyStrategies: [
      'Separe a pessoa do código: critique a implementação, não a capacidade do profissional.',
      'Use perguntas em vez de ordens: "What do you think about..." em vez de "Change this".',
      'Reconheça pontos fortes antes de apontar melhorias.',
    ],
    usefulPhrases: [
      'Great catch on handling the edge case! One small thought: could we extract this helper function to improve testability?',
      'I see the rationale behind this approach, but I am slightly concerned about memory consumption under high load.',
      'Thank you for the detailed feedback. I agree with your observation and will refactor this module accordingly.',
    ],
    scenario: 'Em uma revisão de código, você notou que uma consulta SQL foi escrita sem paginação e pode derrubar o banco de dados em produção.',
    practiceTask: 'Escreva um comentário de code review em inglês apontando o problema e sugerindo paginação de forma cordial.',
    aiPrompt: 'Avalie este comentário de code review em inglês. Ele é firme quanto à segurança sem soar agressivo ou ríspido?:\n\n[Insira seu comentário]',
  },
  {
    id: 'eng-car-08',
    title: 'Explicando Decisões Técnicas & Trade-offs',
    area: 'Arquitetura e Negociação',
    summary: 'Explicar arquitetura, compensações (trade-offs) entre velocidade, custo e complexidade para públicos técnicos e não técnicos.',
    keyStrategies: [
      'Destaque que toda decisão de engenharia envolve abrir mão de algo (trade-off).',
      'Use analogias para explicar conceitos abstratos para gerentes de produto ou clientes.',
      'Traga métricas e dados de apoio sempre que possível.',
    ],
    usefulPhrases: [
      'Every architectural choice involves a trade-off between immediate delivery speed and long-term maintainability.',
      'While building a custom search index gives us ultimate control, utilizing an existing managed service saves three months of developer effort.',
      'To put that into business perspective, this caching layer reduces database load by 60%, directly lowering our monthly cloud bill.',
    ],
    scenario: 'Um gerente de produto pergunta: "Why can’t we just use microservices for our MVP starting tomorrow?"',
    practiceTask: 'Fale por 2 minutos explicando em inglês os trade-offs entre um monólito modular e microsserviços para um produto inicial.',
    aiPrompt: 'Avalie minha explicação técnica de trade-offs em inglês. O vocabulário é adequado para dialogar tanto com desenvolvedores quanto com gerentes de produto?:\n\n[Insira aqui sua explicação]',
  },
];

// ==========================================
// 7. GUIA DE EXAMES OFICIAIS (CAMBRIDGE, IELTS, TOEFL iBT)
// ==========================================

export const officialExamsInfo: OfficialExamInfo[] = [
  {
    id: 'cambridge-qualifications',
    name: 'Cambridge English Qualifications (B2 First, C1 Advanced, C2 Proficiency)',
    provider: 'Cambridge Assessment English (Universidade de Cambridge)',
    targetAudience: 'Estudantes e profissionais buscando comprovação de proficiência duradoura para universidades, imigração e multinacionais.',
    formatSummary: 'Composto por 4 provas: Reading and Use of English, Writing, Listening e Speaking (realizado em dupla com dois examinadores presenciais ou virtuais credenciados).',
    scaleDescription: 'Utiliza a Cambridge English Scale (de 80 a 230 pontos). B2 First exige tipicamente 160–179 pontos; C1 Advanced exige 180–199 pontos; C2 Proficiency exige 200+ pontos.',
    validity: 'Vitalícia (sem prazo de expiração formal pelo órgão emissor, embora instituições individuais possam solicitar exames realizados nos últimos 2 a 3 anos).',
    officialUrl: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202838496-Preparing-for-a-Cambridge-English-exam',
    importantNotes: [
      'Os exames de Cambridge são conhecidos pela avaliação aprofundada da gramática em contexto (seção de Use of English).',
      'A prova oral em dupla avalia interação real, tempo de fala compartilhado e respeito à vez do interlocutor.',
      'Diferentemente de exames multinível como TOEFL/IELTS, em Cambridge você se inscreve para um exame específico (ex: presta diretamente a prova do C1 Advanced).',
    ],
  },
  {
    id: 'ielts',
    name: 'IELTS (International English Language Testing System)',
    provider: 'British Council, IDP: IELTS Australia e Cambridge English',
    targetAudience: 'Imigração (IELTS General Training) para países como Canadá, Austrália, Reino Unido e Nova Zelândia; Admissão acadêmica (IELTS Academic) para universidades globais.',
    formatSummary: 'Avalia as 4 habilidades fundamentais: Listening (30 min), Reading (60 min), Writing (60 min) e Speaking (11 a 14 min, entrevista individual gravada com um examinador).',
    scaleDescription: 'Escala em faixas (Bands) de 0 a 9 em incrementos de 0.5. Faixas aproximadas de referência: Band 5.5–6.5 = B2; Band 7.0–8.0 = C1; Band 8.5–9.0 = C2.',
    validity: '2 anos a contar da data de realização da prova.',
    officialUrl: 'https://learnenglish.britishcouncil.org/level',
    importantNotes: [
      'O IELTS está disponível tanto em formato digital (Computer-delivered) quanto tradicional em papel (Paper-based).',
      'No Speaking do IELTS, você conversa individualmente com um examinador humano em uma sala dedicada.',
      'O módulo Academic exige redação de análise de dados e gráficos (Task 1), enquanto o General Training exige redação de uma carta situacional.',
    ],
  },
  {
    id: 'toefl-ibt',
    name: 'TOEFL iBT (Test of English as a Foreign Language)',
    provider: 'Educational Testing Service (ETS)',
    targetAudience: 'Estudantes e acadêmicos buscando graduação, mestrado, doutorado e vistos profissionais prioritariamente nos Estados Unidos, Canadá e mais de 160 países.',
    formatSummary: 'Avaliação 100% computadorizada das 4 habilidades: Reading, Listening, Speaking (gravação em microfone) e Writing (tarefas integradas de leitura/áudio e redação acadêmica). Duração reduzida para menos de 2 horas desde julho de 2023.',
    scaleDescription: 'ATUALIZAÇÃO FACTUAL IMPORTANTE (2026): Conforme anúncio oficial da ETS com vigência a partir de 21 de janeiro de 2026, o TOEFL iBT adotou uma escala de pontuação de 1 a 6 para as 4 habilidades e para a nota composta (Overall Score), alinhando a comunicação dos resultados a faixas descritivas de proficiência e simplificando a interpretação por universidades.',
    validity: '2 anos a contar da data de realização da prova.',
    officialUrl: 'https://www.ets.org/toefl/institutions/ibt/score-scale-update.html',
    importantNotes: [
      'A partir de 21 de janeiro de 2026, o TOEFL iBT passou a utilizar escala de pontuação de 1 a 6 para o resultado global e por seção.',
      'A prova de Speaking é realizada falando diante de um headset com cronômetro na tela, sem examinador humano ao vivo na sala.',
      'Tarefas integradas (Integrated Tasks) exigem ler um texto acadêmico, ouvir uma palestra correlata e redigir/falar uma resposta combinando ambas as fontes.',
    ],
  },
];

// ==========================================
// 8. CONQUISTAS E GAMIFICAÇÃO
// ==========================================

export const englishAchievements: EnglishAchievement[] = [
  {
    id: 'first-words',
    title: 'First Words',
    description: 'Concluiu o primeiro exercício prático de inglês no StackTrail.',
    icon: '🌱',
    isUnlocked: p => Object.values(p.exercises).some(ex => ex.status === 'concluido'),
  },
  {
    id: 'daily-learner',
    title: 'Daily Learner',
    description: 'Registrou pelo menos uma sessão de estudo em dia de prática.',
    icon: '📅',
    isUnlocked: p => p.studyDays.length >= 1,
  },
  {
    id: 'good-listener',
    title: 'Good Listener',
    description: 'Concluiu 2 ou mais exercícios de Listening com fontes legítimas.',
    icon: '🎧',
    isUnlocked: p => {
      const listeningExercises = englishExercises.filter(e => e.skill === 'listening').map(e => e.id);
      return listeningExercises.filter(id => p.exercises[id]?.status === 'concluido').length >= 2;
    },
  },
  {
    id: 'brave-speaker',
    title: 'Brave Speaker',
    description: 'Registrou a prática oral em pelo menos 2 exercícios de Speaking.',
    icon: '🎙️',
    isUnlocked: p => {
      const speakingExercises = englishExercises.filter(e => e.skill === 'speaking').map(e => e.id);
      return speakingExercises.filter(id => p.exercises[id]?.status === 'concluido').length >= 2;
    },
  },
  {
    id: 'sharp-writer',
    title: 'Sharp Writer',
    description: 'Completou a redação e autoavaliação de 2 tarefas de Writing.',
    icon: '✍️',
    isUnlocked: p => {
      const writingExercises = englishExercises.filter(e => e.skill === 'writing').map(e => e.id);
      return writingExercises.filter(id => p.exercises[id]?.status === 'concluido').length >= 2;
    },
  },
  {
    id: 'grammar-detective',
    title: 'Grammar Detective',
    description: 'Concluiu com sucesso 3 exercícios de Vocabulary & Grammar.',
    icon: '🔍',
    isUnlocked: p => {
      const grammarExercises = englishExercises.filter(e => e.skill === 'vocabulary-grammar').map(e => e.id);
      return grammarExercises.filter(id => p.exercises[id]?.status === 'concluido').length >= 3;
    },
  },
  {
    id: 'bookworm',
    title: 'English Reader',
    description: 'Registrou um livro de inglês como lendo ou concluído na biblioteca.',
    icon: '📚',
    isUnlocked: p => Object.values(p.books).some(status => status === 'lendo' || status === 'concluido'),
  },
  {
    id: 'a1-explorer',
    title: 'A1 Explorer',
    description: 'Concluiu todos os 4 marcos comunicativos do nível A1.',
    icon: '🧭',
    isUnlocked: p => {
      const a1Milestones = englishMilestones.filter(m => m.levelId === 'A1').map(m => m.id);
      return a1Milestones.every(id => p.completedMilestones.includes(id));
    },
  },
  {
    id: 'b1-milestone',
    title: 'B1 Milestone',
    description: 'Concluiu todos os 4 marcos comunicativos do nível B1.',
    icon: '🚀',
    isUnlocked: p => {
      const b1Milestones = englishMilestones.filter(m => m.levelId === 'B1').map(m => m.id);
      return b1Milestones.every(id => p.completedMilestones.includes(id));
    },
  },
  {
    id: 'international-ready',
    title: 'International Ready',
    description: 'Concluiu pelo menos 4 tópicos da trilha de Carreira Internacional.',
    icon: '🌐',
    isUnlocked: p => p.careerMilestonesDone.length >= 4,
  },
  {
    id: 'diagnostic-master',
    title: 'Diagnostic Taker',
    description: 'Realizou a avaliação diagnóstica de pelo menos um nível CEFR.',
    icon: '🎯',
    isUnlocked: p => Object.values(p.evaluations).some(arr => arr.length > 0),
  },
];

// ==========================================
// 9. ITENS DE REVISÃO ESPAÇADA
// ==========================================

export const englishReviewItems: ReviewItem[] = [
  {
    id: 'rev-01',
    phrase: 'Could you please elaborate on that?',
    meaningPt: 'Você poderia detalhar/elaborar mais sobre isso?',
    contextEn: 'Used in meetings to politely ask for more details without sounding confrontational.',
    level: 'B2',
    skill: 'speaking',
    category: 'Reuniões e Alinhamentos',
  },
  {
    id: 'rev-02',
    phrase: 'Under no circumstances should we...',
    meaningPt: 'Sob nenhuma circunstância devemos...',
    contextEn: 'Formal inverted expression used for categorical emphasis in executive communication.',
    level: 'C1',
    skill: 'vocabulary-grammar',
    category: 'Estruturas Formais',
  },
  {
    id: 'rev-03',
    phrase: 'Looking back on that experience...',
    meaningPt: 'Olhando para trás / Relembrando aquela experiência...',
    contextEn: 'Natural transition for sharing reflections and narratives about past events.',
    level: 'B1',
    skill: 'speaking',
    category: 'Narrativas e Histórias',
  },
  {
    id: 'rev-04',
    phrase: 'I would like to make a reservation for...',
    meaningPt: 'Eu gostaria de fazer uma reserva para...',
    contextEn: 'Essential polite phrase for hotels, restaurants, and transport services.',
    level: 'A2',
    skill: 'speaking',
    category: 'Viagens e Serviços',
  },
  {
    id: 'rev-05',
    phrase: 'To bite the bullet',
    meaningPt: 'Encarar uma situação inevitável com coragem',
    contextEn: 'Idiomatic expression used when accepting a difficult but necessary step.',
    level: 'C1',
    skill: 'vocabulary-grammar',
    category: 'Expressões Idiomáticas',
  },
  {
    id: 'rev-06',
    phrase: 'How much does this cost?',
    meaningPt: 'Quanto custa isso?',
    contextEn: 'Direct foundational question for shopping and prices.',
    level: 'A1',
    skill: 'vocabulary-grammar',
    category: 'Compras Básicas',
  },
  {
    id: 'rev-07',
    phrase: 'Every architectural choice involves a trade-off.',
    meaningPt: 'Toda escolha arquitetural envolve uma compensação / concessão mútua.',
    contextEn: 'Key professional sentence when explaining technical decisions to peers or clients.',
    level: 'B2',
    skill: 'speaking',
    category: 'Decisões Técnicas',
  },
  {
    id: 'rev-08',
    phrase: 'Far from being an isolated incident...',
    meaningPt: 'Longe de ser um incidente isolado...',
    contextEn: 'High-register phrase used in analytical essays and post-mortem reports.',
    level: 'C2',
    skill: 'writing',
    category: 'Ensaios e Relatórios',
  },
];

// ==========================================
// 10. REFERÊNCIAS CURADAS E VERIFICADAS
// ==========================================

export const englishReferences: Reference[] = [
  {
    id: 'ref-eng-coe-cefr',
    title: 'Council of Europe · Common European Framework of Reference for Languages (CEFR Companion Volume)',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions',
    language: 'Inglês',
    type: 'Padrão internacional',
    cost: 'Gratuito',
    section: 'Descritores oficiais ilustrativos por nível (A1–C2) e escalas de mediação e interação',
    version: 'Companion Volume (2020)',
    note: 'Documento normativo de referência global do Conselho da Europa para competências comunicativas em línguas.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-bc-level',
    title: 'British Council · LearnEnglish Online English Level Test',
    url: 'https://learnenglish.britishcouncil.org/level',
    language: 'Inglês',
    type: 'Diagnóstico gratuito',
    cost: 'Gratuito',
    section: 'Teste orientativo de nivelamento em gramática e vocabulário com 30 questões',
    version: 'Plataforma oficial British Council LearnEnglish',
    note: 'O British Council descreve seu teste aberto como uma indicação aproximada de nível para direcionar estudos.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-bc-grammar',
    title: 'British Council · English Grammar Reference & Practice',
    url: 'https://learnenglish.britishcouncil.org/grammar',
    language: 'Inglês',
    type: 'Guia de gramática',
    cost: 'Gratuito',
    section: 'Explicações em contexto, tempos verbais, condicionais, modais e exercícios interativos do A1 ao C1',
    version: 'LearnEnglish Grammar',
    note: 'Excelente referência aberta com explicações claras e situações cotidianas da língua inglesa.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-bc-skills',
    title: 'British Council · Skills: Listening, Reading, Speaking & Writing',
    url: 'https://learnenglish.britishcouncil.org/skills',
    language: 'Inglês',
    type: 'Portal de práticas',
    cost: 'Gratuito',
    section: 'Atividades divididas por nível CEFR (A1 a C1) com áudios, transcrições e tarefas',
    version: 'LearnEnglish Skills',
    note: 'Material oficial com diálogos reais gravados por atores e exercícios contextualizados de compreensão.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-cam-learning',
    title: 'Cambridge English · Learning English Free Activities',
    url: 'https://www.cambridgeenglish.org/learning-english/',
    language: 'Inglês',
    type: 'Atividades práticas',
    cost: 'Gratuito',
    section: 'Banco com mais de 175 atividades gratuitas filtráveis por nível (Basic, Independent, Proficient)',
    version: 'Portal Cambridge English',
    note: 'Atividades curtas de 5 a 10 minutos produzidas pelos examinadores da Universidade de Cambridge.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-cam-prep',
    title: 'Cambridge Assessment English · Preparing for a Cambridge English Exam',
    url: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202838496-Preparing-for-a-Cambridge-English-exam',
    language: 'Inglês',
    type: 'Guia de exames',
    cost: 'Gratuito',
    section: 'Orientações oficiais de preparação para B2 First, C1 Advanced e C2 Proficiency',
    version: 'Suporte oficial Cambridge',
    note: 'Instruções para candidatos, simulados de exemplo em PDF e critérios de avaliação do Speaking.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-ets-toefl',
    title: 'ETS · TOEFL iBT Score Scale Update (Escala 1–6)',
    url: 'https://www.ets.org/toefl/institutions/ibt/score-scale-update.html',
    language: 'Inglês',
    type: 'Comunicado oficial',
    cost: 'Gratuito',
    section: 'Transição oficial para a escala de pontuação de 1 a 6 a partir de 21 de janeiro de 2026',
    version: 'ETS Official Update (Vigência 2026)',
    note: 'Informa a nova régua de avaliação do TOEFL iBT com foco em faixas descritivas de proficiência.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-bbc-6min',
    title: 'BBC Learning English · 6 Minute English',
    url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
    language: 'Inglês',
    type: 'Podcast e áudio',
    cost: 'Gratuito',
    section: 'Episódios semanais em ritmo intermediário com transcrição e lista de vocabulário',
    version: 'BBC World Service',
    note: 'Um dos recursos sonoros mais conceituados e acessíveis do mundo para estudantes de nível B1 e B2.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-oxford-dict',
    title: 'Oxford Learner’s Dictionaries · Pronunciation & Usage Guides',
    url: 'https://www.oxfordlearnersdictionaries.com/',
    language: 'Inglês',
    type: 'Dicionário e pronúncia',
    cost: 'Gratuito',
    section: 'Pronúncia em áudio (britânica e americana), símbolos fonéticos IPA e exemplos reais de uso',
    version: 'Oxford University Press',
    note: 'Dicionário pedagógico de referência com áudios em alta fidelidade e classificação CEFR por verbete.',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
  {
    id: 'ref-eng-forvo',
    title: 'Forvo · The Pronunciation Dictionary',
    url: 'https://forvo.com/',
    language: 'Multilíngue',
    type: 'Guia de pronúncia comunitário',
    cost: 'Gratuito',
    section: 'Pronúncias autênticas gravadas por nativos de diferentes países e dialetos',
    version: 'Base Forvo aberta',
    note: 'Excelente para ouvir diferentes sotaques regionais legítimos (britânico, americano, australiano, etc.).',
    checked: '2026-10-18',
    adequacy: '2026-10-18',
  },
];

// ==========================================
// 11. LIVROS RECONHECIDOS (COM CAPAS LOCAIS E PLACEHOLDER SEGURO)
// ==========================================

export const englishBooks: Book[] = [
  {
    id: 'book-eng-grammar-in-use',
    title: 'English Grammar in Use (5th Edition)',
    author: 'Raymond Murphy',
    edition: '5ª edição',
    year: '2019',
    stages: ['01'],
    topics: ['01-html-semantico'],
    language: 'Inglês',
    cost: 'Pago',
    level: 'A2 a B2 (Elementary to Intermediate)',
    track: 'comum',
    reason: 'Considerada a gramática de autoestudo de língua inglesa mais famosa e utilizada do mundo, com formato clássico de página dupla (explicação à esquerda, exercícios à direita).',
    note: 'Indicada como referência de consulta para esclarecer dúvidas de estruturas do A2 ao B2. Não é necessário ler de ponta a ponta; consulte pelas unidades temáticas.',
    community: 'Recomendação unânime entre educadores internacionais de língua inglesa para estudantes de nível intermediário.',
    url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/english-grammar-use-5th-edition',
    cover: {
      kind: 'image',
      src: 'assets/books/english/english-grammar-in-use.jpg',
      alt: 'Capa do livro English Grammar in Use (5ª Edição), de Raymond Murphy (Cambridge University Press)',
      width: 300,
      height: 420,
      origin: 'Catálogo oficial da Cambridge University Press (ISBN 978-1-108-45765-1).',
      usage: 'Asset estático local da 5ª edição para identificação bibliográfica, sem links de compra.',
    },
    alternatives: ['ref-eng-bc-grammar', 'ref-eng-cam-learning'],
    checked: '2026-10-18',
  },
  {
    id: 'book-eng-practical-usage',
    title: 'Practical English Usage (4th Edition)',
    author: 'Michael Swan',
    edition: '4ª edição',
    year: '2016',
    stages: ['01'],
    topics: ['01-html-semantico'],
    language: 'Inglês',
    cost: 'Pago',
    level: 'B1 a C2 (Intermediate to Advanced)',
    track: 'comum',
    reason: 'Guia definitivo e aclamado para solucionar dúvidas complexas de uso, preposições confusas, pontuação e distinções sutis de significado.',
    note: 'Obra de consulta em estilo dicionário temático de dúvidas, extremamente valiosa a partir do nível B2 para refinar a precisão escrita e oral.',
    community: 'Utilizado por tradutores, professores e estudantes avançados como autoridade em desvios recorrentes de falantes não nativos.',
    url: 'https://elt.oup.com/catalogue/items/global/grammar_vocabulary/practical_english_usage_4th_edition/',
    cover: {
      kind: 'image',
      src: 'assets/books/english/practical-english-usage.jpg',
      alt: 'Capa do livro Practical English Usage (4ª Edição), de Michael Swan (Oxford University Press)',
      width: 300,
      height: 440,
      origin: 'Catálogo oficial da Oxford University Press (ISBN 978-0-19-420246-6).',
      usage: 'Asset estático local da 4ª edição para identificação bibliográfica, sem links de compra.',
    },
    alternatives: ['ref-eng-oxford-dict', 'ref-eng-bc-grammar'],
    checked: '2026-10-18',
  },
  {
    id: 'book-eng-vocabulary-in-use',
    title: 'English Vocabulary in Use (Upper-intermediate)',
    author: 'Michael McCarthy e Felicity O’Dell',
    edition: '4ª edição',
    year: '2017',
    stages: ['01'],
    topics: ['01-html-semantico'],
    language: 'Inglês',
    cost: 'Pago',
    level: 'B2 (Upper-intermediate)',
    track: 'comum',
    reason: 'Ensina vocabulário agrupado por temas comunicativos concretos (trabalho, viagens, tecnologia, sentimentos) e collocations reais.',
    note: 'Ajuda a superar a limitação de usar sempre as mesmas palavras, enriquecendo o repertório com sinônimos e expressões idiomáticas naturais.',
    community: 'Série amplamente recomendada por escolas de idiomas da Universidade de Cambridge.',
    url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/english-vocabulary-use-upper-intermediate-4th-edition',
    cover: {
      kind: 'image',
      src: 'assets/books/english/english-vocabulary-in-use.jpg',
      alt: 'Capa do livro English Vocabulary in Use (Upper-intermediate - 4ª Edição), de Michael McCarthy e Felicity O’Dell',
      width: 300,
      height: 420,
      origin: 'Catálogo oficial da Cambridge University Press (ISBN 978-1-316-63175-1).',
      usage: 'Asset estático local da 4ª edição para identificação bibliográfica, sem links de compra.',
    },
    alternatives: ['ref-eng-bc-skills', 'ref-eng-bbc-6min'],
    checked: '2026-10-18',
  },
  {
    id: 'book-eng-ship-or-sheep',
    title: 'Ship or Sheep? An Intermediate Pronunciation Course (3rd Edition)',
    author: 'Ann Baker',
    edition: '3ª edição',
    year: '2006',
    stages: ['01'],
    topics: ['01-html-semantico'],
    language: 'Inglês',
    cost: 'Pago',
    level: 'A2 a B2 (Elementary to Intermediate)',
    track: 'comum',
    reason: 'Focado nos pares mínimos de sons do inglês que mais geram confusão em falantes de outras línguas (como as vogais de ship vs sheep, bit vs beat).',
    note: 'Excelente para quem deseja aprimorar a discriminação auditiva e a clareza de articulação sem preconceito contra sotaques regionais.',
    community: 'Clássico mundial da Cambridge University Press em treinamento de fonética e fonologia prática.',
    url: 'https://www.cambridge.org/us/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/ship-or-sheep-3rd-edition',
    cover: {
      kind: 'image',
      src: 'assets/books/english/ship-or-sheep.jpg',
      alt: 'Capa do livro Ship or Sheep? (3ª Edição), de Ann Baker (Cambridge University Press)',
      width: 300,
      height: 420,
      origin: 'Catálogo oficial da Cambridge University Press (ISBN 978-0-521-60671-4).',
      usage: 'Asset estático local da 3ª edição para identificação bibliográfica, sem links de compra.',
    },
    alternatives: ['ref-eng-forvo', 'ref-eng-oxford-dict'],
    checked: '2026-10-18',
  },
  {
    id: 'book-eng-communicating-in-business',
    title: 'Communicating in Business (2nd Edition)',
    author: 'Simon Sweeney',
    edition: '2ª edição',
    year: '2004',
    stages: ['01'],
    topics: ['01-html-semantico'],
    language: 'Inglês',
    cost: 'Pago',
    level: 'B1 a C1 (Business English)',
    track: 'comum',
    reason: 'Aborda diretamente reuniões, apresentações, negociações comerciais e correspondência profissional em ambientes internacionais.',
    note: 'Focado em situações práticas e simulações do mundo do trabalho, muito alinhado com a trilha de Carreira Internacional.',
    community: 'Utilizado em cursos executivos de Business English por sua abordagem pragmática.',
    url: 'https://www.cambridge.org/us/cambridgeenglish/catalog/business-professional-and-vocational/communicating-business-2nd-edition',
    cover: {
      kind: 'image',
      src: 'assets/books/english/communicating-in-business.jpg',
      alt: 'Capa do livro Communicating in Business (2ª Edição), de Simon Sweeney (Cambridge University Press)',
      width: 300,
      height: 420,
      origin: 'Catálogo oficial da Cambridge University Press (ISBN 978-0-521-54912-7).',
      usage: 'Asset estático local da 2ª edição para identificação bibliográfica, sem links de compra.',
    },
    alternatives: ['ref-eng-cam-learning', 'ref-eng-bc-skills'],
    checked: '2026-10-18',
  },
];
