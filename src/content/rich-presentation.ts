import type { ContentLesson, RichContentBlock, RichTextSegment, SupportedLocale } from '../types/content';

const boldPhrases: Record<SupportedLocale, Record<string, string[]>> = {
  en: {
    'm1-04': ['Apnea', 'Hypopnea', 'typical breathing', 'obstructive sleep apnea'],
    'm4-06': ['organ damage', 'severely high blood pressure and kidney damage', 'fetal growth restriction'],
    'm5-04': ['establishing a relaxing bedtime routine about an hour before going to bed'],
    'm6-01': ['Nasal congestion', 'GERD', 'Anxiety'],
    'm6-07': ['dietary changes and bed adjustments', 'consult with your doctor'],
    'm7-03': ['PAP treatment', 'treatment adherence'],
    'm7-05': ['intimacy with sleep apnea'],
    'm7-06': ['sleep apnea can reduce sexual desire', 'improving sleep quality'],
  },
  es: {
    'm1-04': ['Apnea', 'Hipopnea', 'respiración típica', 'apnea obstructiva del sueño'],
    'm4-06': ['daño a órganos', 'presión arterial muy alta y daño renal', 'restricción del crecimiento fetal'],
    'm5-04': ['establecer una rutina relajante aproximadamente una hora antes de acostarse'],
    'm6-01': ['Congestión nasal', 'ERGE', 'Ansiedad'],
    'm6-07': ['cambios en la alimentación y ajustes de la cama', 'consulte a su médico'],
    'm7-03': ['tratamiento con PAP', 'adherencia al tratamiento'],
    'm7-05': ['intimidad con apnea del sueño'],
    'm7-06': ['La apnea del sueño puede reducir el deseo sexual', 'mejora de la calidad del sueño'],
  },
  'pt-BR': {
    'm1-04': ['Apneia', 'Hipopneia', 'respiração típica', 'apneia obstrutiva do sono'],
    'm4-06': ['danos a órgãos', 'pressão muito alta e danos aos rins', 'restrição de crescimento fetal'],
    'm5-04': ['criar uma rotina relaxante antes de dormir, cerca de uma hora antes de ir para a cama'],
    'm6-01': ['Congestão nasal', 'DRGE', 'Ansiedade'],
    'm6-07': ['mudanças na alimentação e ajustes na cama', 'consulte o seu médico'],
    'm7-03': ['terapia com PAP'],
    'm7-05': ['intimidade quando se tem apneia do sono'],
    'm7-06': ['apneia do sono pode reduzir seu desejo sexual', 'melhora da qualidade do sono'],
  },
  ht: {
    'm1-04': ['Apne', 'Ipopne', 'respirasyon nòmal', 'apne obstriktif nan dòmi'],
    'm4-06': ['domaj nan lòt ògàn', 'tansyon ki wo anpil ak domaj nan ren', 'reta kwasans fetis'],
    'm5-04': ['mete yon woutin anvan dòmi ki detann ou, anviwon inèdtan anvan w al kouche'],
    'm6-01': ['Nen bouche', 'GERD', 'Anksyete'],
    'm6-07': ['chanjman nan manje ak ajisteman kabann', 'konsilte doktè ou'],
    'm7-03': ['Terapi PAP'],
    'm7-05': ['entimite lè w gen apne nan dòmi'],
    'm7-06': ['Apne nan dòmi limenm ka diminye anvi fè sèks', 'amelyore kalite dòmi'],
  }
};

// Where the m5-04 paragraph continues after the bedtime list, per locale (content-specific, not UI logic).
const bedtimeRemainderStart: Record<SupportedLocale, string> = { en: 'Simply having a bedtime routine', es: 'Tener una rutina', 'pt-BR': 'Simplesmente ter uma rotina', ht: 'Senpleman genyen yon woutin' };

const bedtimeItems: Record<SupportedLocale, string[]> = {
  en: ['light (relatively boring) reading', 'stretching', 'taking a warm bath', 'listening to calming music', 'dimming the lights'],
  es: ['leer algo ligero y relativamente aburrido', 'estirarse', 'tomar un baño tibio', 'escuchar música tranquila', 'bajar las luces'],
  'pt-BR': ['uma leitura leve (relativamente entediante)', 'alongamentos', 'um banho morno', 'ouvir música calma', 'diminuir as luzes'],
  ht: ['yon bagay ki lejè (yon ti jan raz)', 'fè detire', 'pran yon beny tyèd', 'koute mizik ki kalme w', 'bese limyè yo']
};

function segments(text: string, phrases: string[]): RichTextSegment[] {
  const matches = phrases.flatMap((phrase) => {
    const index = text.toLocaleLowerCase().indexOf(phrase.toLocaleLowerCase());
    return index < 0 ? [] : [{ index, phrase: text.slice(index, index + phrase.length) }];
  }).sort((a, b) => a.index - b.index);
  const result: RichTextSegment[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.index < cursor) continue;
    if (match.index > cursor) result.push({ text: text.slice(cursor, match.index) });
    result.push({ text: match.phrase, bold: true });
    cursor = match.index + match.phrase.length;
  }
  if (cursor < text.length) result.push({ text: text.slice(cursor) });
  return result.length ? result : [{ text }];
}

export function richPresentation(screen: ContentLesson, locale: SupportedLocale): RichContentBlock[] {
  if (screen.presentation) return screen.presentation;
  const phrases = boldPhrases[locale][screen.id] ?? [];
  const blocks: RichContentBlock[] = [];
  for (let index = 0; index < screen.paragraphs.length;) {
    const paragraph = screen.paragraphs[index];
    if (screen.id === 'm5-04' && index === 2) {
      const remainderStart = paragraph.indexOf(bedtimeRemainderStart[locale]);
      blocks.push({ type: 'unorderedList', items: bedtimeItems[locale].map((item) => [{ text: item }]) });
      if (remainderStart >= 0) blocks.push({ type: 'paragraph', segments: segments(paragraph.slice(remainderStart), phrases) });
      index += 1;
      continue;
    }
    if (paragraph.trimStart().startsWith('•')) {
      const items: RichTextSegment[][] = [];
      while (index < screen.paragraphs.length && screen.paragraphs[index].trimStart().startsWith('•')) {
        items.push(...screen.paragraphs[index].split(/\n(?=•)/).map((item) => segments(item.trimStart().replace(/^•\s*/, ''), phrases)));
        index += 1;
      }
      blocks.push({ type: 'unorderedList', items });
      continue;
    }
    blocks.push({ type: 'paragraph', segments: segments(paragraph, phrases) });
    index += 1;
  }
  return blocks;
}
