import type { EducationModule, LessonScreen } from '@/src/types/content';

export interface SpanishScreenDraft {
  title: string;
  body: string[];
}

export function draftSpanishModule(
  base: EducationModule,
  meta: Pick<EducationModule, 'title' | 'shortTitle' | 'description'>,
  drafts: Record<string, SpanishScreenDraft>,
): EducationModule {
  const screens = base.screens.map((screen): LessonScreen => {
    const draft = drafts[screen.id];
    if (!draft) throw new Error(`Missing Spanish draft for ${screen.id}`);
    const review = { translationStatus: 'machine_drafted' as const, bilingualReviewStatus: 'not_reviewed' as const };
    if (screen.type === 'content') return { ...screen, ...review, title:draft.title, narrationText:draft.body.join(' '), paragraphs: draft.body, orderedList: screen.id === 'm1-03' ? ['Los músculos alrededor de la garganta se relajan.', 'La vía respiratoria superior se bloquea parcial o completamente.', 'El flujo de aire disminuye o se detiene brevemente.', 'El cerebro y el cuerpo responden para que la respiración pueda reiniciarse.', 'El sueño puede interrumpirse, aunque no recuerde haberse despertado.'] : undefined, keyPoints: undefined };
    if (screen.type === 'summary') return { ...screen, ...review, title:draft.title, narrationText:draft.body.join(' '), keyPoints: draft.body };
    if (screen.type === 'aiActivity') return { ...screen, ...review, title:draft.title, narrationText:draft.body.join(' '), prompt: draft.body[0] };
    if (screen.type === 'scenario') return { ...screen, ...review, title:draft.title, narrationText:draft.body.join(' '), scenario: draft.body[0], prompt: draft.body[1] ?? screen.prompt };
    return {
      ...screen, ...review, title:draft.title, narrationText:draft.body.join(' '),
      prompt: draft.body[0],
      choices: screen.choices.map((choice, index) => ({ ...choice, label: draft.body[index + 1] ?? choice.label })),
      questionFeedback: {
        ...screen.questionFeedback,
        correctSummary: 'Correcto.',
        incorrectSummary: 'Aún no.',
        generalExplanation: draft.body[screen.choices.length + 1] ?? 'Revise la explicación educativa y vuelva a intentarlo cuando quiera.',
      },
      feedback: screen.questionKind === 'reflection' ? draft.body[screen.choices.length + 1] : undefined,
    };
  });
  return {
    ...base, ...meta, screens, translationStatus: 'machine_drafted',
    bilingualReviewStatus: 'not_reviewed', clinicalReviewStatus: base.clinicalReviewStatus,
  };
}
