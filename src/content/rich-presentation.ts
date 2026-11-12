import type { ContentLesson, RichContentBlock, RichTextSegment, SupportedLocale } from '../types/content';

const boldPhrases: Record<SupportedLocale, Record<string, string[]>> = {
  en: {
    'm1-04': ['Apnea', 'Hypopnea', 'typical breathing', 'obstructive sleep apnea'],
    'm4-06': ['organ damage', 'severely high blood pressure and kidney damage', 'fetal growth restriction'],
    'm5-04': ['establishing a relaxing bedtime routine about an hour before going to bed'],
    'm6-01': ['Nasal congestion', 'GERD', 'Anxiety'],
    'm6-07': ['diet changes and bed adjustments', 'consult your doctor'],
    'm7-03': ['PAP treatment', 'treatment adherence'],
    'm7-05': ['intimacy with sleep apnea'],
    'm7-06': ['sleep apnea can reduce sexual desire', 'improving sleep quality'],
  },
  es: {
    'm1-04': ['Apnea', 'Hipopnea', 'respiración típica', 'apnea obstructiva del sueño'],
    'm4-06': ['daño orgánico', 'presión arterial muy alta y daño renal', 'restricción del crecimiento fetal'],
    'm5-04': ['establecer una rutina relajante aproximadamente una hora antes de acostarse'],
    'm6-01': ['Congestión nasal', 'ERGE', 'Ansiedad'],
    'm6-07': ['cambios en la alimentación y ajustes de la cama', 'consulte a su médico'],
    'm7-03': ['tratamiento con PAP', 'adherencia al tratamiento'],
    'm7-05': ['intimidad con apnea del sueño'],
    'm7-06': ['La apnea del sueño puede reducir el deseo sexual', 'mejora de la calidad del sueño'],
  },
};

// Where the m5-04 paragraph continues after the bedtime list, per locale (content-specific, not UI logic).
const bedtimeRemainderStart: Record<SupportedLocale, string> = { en: 'Simply having a bedtime routine', es: 'Tener una rutina' };

const bedtimeItems: Record<SupportedLocale, string[]> = {
  en: ['light (relatively boring) reading', 'stretching', 'taking a warm bath', 'listening to calming music', 'dimming the lights'],
  es: ['leer algo ligero y relativamente aburrido', 'estirarse', 'tomar un baño tibio', 'escuchar música tranquila', 'bajar las luces'],
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
