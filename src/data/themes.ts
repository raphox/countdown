import {themeFonts,type FontName} from './fonts';
export const categories = [
  { id: 'celebracoes', name: 'Celebrações', description: 'Datas para reunir pessoas queridas.' },
  { id: 'conquistas', name: 'Conquistas', description: 'Etapas que merecem ser lembradas.' },
  { id: 'encontros', name: 'Encontros e jornadas', description: 'Planos, partidas e momentos de estar junto.' },
  { id: 'eventos', name: 'Eventos', description: 'Ocasiões abertas a muitos formatos.' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export type Theme = {
  slug: string;
  name: string;
  category: CategoryId;
  aliases: readonly string[];
  description: string;
  colors: { background: string; accent: string; soft: string };
  ending: { message: string; confetti: boolean };
  font?: FontName;
  assets?: { gallery?: string; desktop?: string; mobile?: string; og?: string };
};

const themeDefinitions = [
  { slug: 'aniversario', name: 'Aniversário', category: 'celebracoes', aliases: ["niver", "festa de aniversário", "festa de anos"], description: 'Uma data para celebrar mais um ano de vida.', colors: { background: '#f6d7cf', accent: '#a43f46', soft: '#ead8ee' }, ending: { message: 'Parabéns! Chegou o grande dia!', confetti: true } },
  { slug: 'ano-novo', name: 'Ano-Novo', category: 'celebracoes', aliases: ["réveillon", "virada do ano", "fim de ano"], description: 'A expectativa pela virada e por um novo começo.', colors: { background: '#172b49', accent: '#dfbd70', soft: '#385071' }, ending: { message: 'Feliz Ano-Novo!', confetti: true } },
  { slug: 'natal', name: 'Natal', category: 'celebracoes', aliases: ["ceia natalina", "festa de natal", "confraternização natalina"], description: 'O encontro e as tradições do fim de ano.', colors: { background: '#e9e1d1', accent: '#8c3544', soft: '#9fae9a' }, ending: { message: 'Feliz Natal!', confetti: true } },
  { slug: 'familia', name: 'Encontro da família', category: 'encontros', aliases: ["encontro familiar", "reunião de família", "almoço em família"], description: 'Um momento para estar perto de quem faz parte da sua história.', colors: { background: '#eadbca', accent: '#a4513d', soft: '#b8c4a6' }, ending: { message: 'Chegou a hora de reunir a família!', confetti: true } },
  { slug: 'empresa', name: 'Encontro da empresa', category: 'encontros', aliases: ["confraternização", "confraternização da empresa", "reunião de equipe", "encontro corporativo", "team building"], description: 'Uma ocasião para reunir a equipe e compartilhar ideias.', colors: { background: '#dce9eb', accent: '#19546b', soft: '#a8c8ce' }, ending: { message: 'Nosso encontro começa agora.', confetti: false } },
  { slug: 'formatura-fundamental', name: 'Formatura do ensino fundamental', category: 'conquistas', aliases: ["formatura fundamental", "formatura do fundamental", "formatura escolar", "conclusão do ensino fundamental"], description: 'Uma etapa concluída e muitas descobertas pela frente.', colors: { background: '#dcebf5', accent: '#b55048', soft: '#f0dc8b' }, ending: { message: 'Uma etapa concluída. Vamos celebrar!', confetti: true } },
  { slug: 'formatura-ensino-medio', name: 'Formatura do ensino médio', category: 'conquistas', aliases: ["formatura colegial", "formatura ensino médio", "formatura segundo grau", "conclusão do ensino médio"], description: 'O fim de um ciclo e o início de novas escolhas.', colors: { background: '#e9dff0', accent: '#67417f', soft: '#f0dc8b' }, ending: { message: 'Chegou a hora de celebrar esta conquista!', confetti: true } },
  { slug: 'formatura-faculdade', name: 'Formatura da faculdade', category: 'conquistas', aliases: ["colação de grau", "formatura universitária", "graduação", "conclusão da faculdade"], description: 'Anos de dedicação chegam a uma conquista especial.', colors: { background: '#ded8ca', accent: '#554533', soft: '#c7ae82' }, ending: { message: 'Chegou o grande dia da formatura!', confetti: true } },
  { slug: 'casamento', name: 'Casamento', category: 'celebracoes', aliases: ["matrimônio", "cerimônia de casamento", "festa de casamento"], description: 'A contagem para celebrar uma história a dois.', colors: { background: '#f1ede3', accent: '#6c7654', soft: '#ded6c2' }, ending: { message: 'Chegou o grande dia!', confetti: true } },
  { slug: 'viagem', name: 'Viagem e férias', category: 'encontros', aliases: ["férias", "viagem de férias", "partida", "embarque"], description: 'A expectativa pela próxima partida e pelo descanso.', colors: { background: '#dcecf0', accent: '#1d6680', soft: '#e8d8b8' }, ending: { message: 'Boa viagem!', confetti: true } },
  { slug: 'cha-de-bebe', name: 'Chá de bebê', category: 'celebracoes', aliases: ["chá de fraldas", "baby shower", "chegada do bebê"], description: 'Um encontro para celebrar uma nova chegada.', colors: { background: '#f4eee0', accent: '#687e61', soft: '#e4d9ec' }, ending: { message: 'Chegou a hora de celebrar essa chegada!', confetti: true } },
  { slug: 'evento-tecnologia', name: 'Evento de tecnologia', category: 'eventos', aliases: ["tech", "TI", "informática", "programação", "conferência de tecnologia"], description: 'Ideias e pessoas conectadas em torno da tecnologia.', colors: { background: '#1d294e', accent: '#80d5de', soft: '#594f91' }, ending: { message: 'Nosso evento começa agora.', confetti: false } },
  { slug: 'evento-medicina', name: 'Evento de medicina e saúde', category: 'eventos', aliases: ["saúde", "congresso médico", "simpósio de medicina", "jornada médica"], description: 'Conhecimento e troca em medicina e saúde.', colors: { background: '#e2efed', accent: '#216b65', soft: '#b5dcd1' }, ending: { message: 'Nosso evento começa agora.', confetti: false } },
  { slug: 'evento-direito', name: 'Evento de direito e jurídico', category: 'eventos', aliases: ["jurídico", "advocacia", "congresso jurídico", "seminário de direito"], description: 'Debates e encontros sobre direito e justiça.', colors: { background: '#e6e1d7', accent: '#47494d', soft: '#c4ad86' }, ending: { message: 'Nosso evento começa agora.', confetti: false } },
  { slug: 'festa', name: 'Festa genérica', category: 'eventos', aliases: ["festa genérica", "balada", "comemoração", "carnaval"], description: 'Um espaço para celebrar do seu jeito.', colors: { background: '#eee1ec', accent: '#764a83', soft: '#e4ae9a' }, ending: { message: 'A festa vai começar!', confetti: true } },
  { slug: 'evento-politico', name: 'Evento político', category: 'eventos', aliases: ['política', 'posse', 'assumir cargo', 'cargo político', 'debate político', 'encontro político', 'convenção política', 'comício'], description: 'Posse, debates e encontros que marcam a vida política.', colors: { background: '#f6eddc', accent: '#216c75', soft: '#ebc29b' }, ending: { message: 'Chegou a hora do nosso evento!', confetti: true } },
  { slug: 'zoeira', name: 'Zoeira', category: 'encontros', aliases: ['zueira', 'zoar', 'brincadeira', 'resenha', 'humor', 'fazer graça', 'piada', 'meme', 'amigos'], description: 'Uma contagem para a resenha e as brincadeiras entre amigos.', colors: { background: '#fff0ce', accent: '#6542a6', soft: '#f5ba6a' }, ending: { message: 'Valendo! A zoeira começa agora!', confetti: true } },
  { slug: 'encontro-amigos', name: 'Encontro de amigos', category: 'encontros', aliases: ['amigos', 'encontro com amigos', 'reunião de amigos', 'turma', 'rever amigos', 'reencontro'], description: 'Uma pausa na rotina para colocar a conversa em dia.', colors: { background: '#eee4d5', accent: '#9b503b', soft: '#a3beb5' }, ending: { message: 'Chegou a hora de reunir os amigos!', confetti: true } },
  { slug: 'jantar', name: 'Jantar', category: 'encontros', aliases: ['jantar especial', 'jantar entre amigos', 'jantar em família', 'jantar de confraternização', 'noite à mesa'], description: 'Boa comida e boa companhia ao redor da mesa.', colors: { background: '#163d32', accent: '#dac28d', soft: '#8da79a' }, ending: { message: 'A mesa está pronta. Bom apetite!', confetti: true } },
] as const satisfies readonly Theme[];

export const themes = themeDefinitions.map(theme => ({ ...theme, assets: { gallery: `art/${theme.slug}-gallery.png`, desktop: `art/${theme.slug}-desktop.png`, mobile: `art/${theme.slug}-mobile.png`, og: `og/${theme.slug}.png` }, font: themeFonts[theme.slug]! }));

export function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}
