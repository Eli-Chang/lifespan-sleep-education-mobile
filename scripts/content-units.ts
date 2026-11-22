// Collects every piece of learner-visible static text in the app, keyed so the
// same unit can be compared across locales and across git revisions. Used by
// scripts/content-quality-gate.ts. Run directly with `--json` to print a snapshot.
import Module from 'node:module';

// Bundled media are resolved by Metro in the app; under tsx each require returns
// the project-relative asset path so the image registry can load.
for (const extension of ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4']) {
  (Module as unknown as { _extensions: Record<string, (module: { exports: unknown }, filename: string) => void> })._extensions[extension] = (module, filename) => {
    module.exports = filename.replace(/\\/g, '/').split('/assets/')[1];
  };
}

export type ContentUnit = { key: string; locale: string; text: string; sourceBacked: boolean };
export type AnswerRecord = { type: string; choiceIds: string[]; correct: string[] | null; questionKind: string | null };
export type ContentSnapshot = { units: ContentUnit[]; answers: Record<string, AnswerRecord>; screenIds: string[] };

const CIAS_SOURCE_IDS = ['cias-screenshot-recovery', 'cias-ez-pap-document'];

export async function collectSnapshot(): Promise<ContentSnapshot> {
  const { modulesByLocale } = await import('../src/content');
  const { learnerVisibleText } = await import('../src/content/locale-completeness');
  const { UI_STRINGS } = await import('../src/i18n/strings');
  const { SUPPORTED_LOCALES } = await import('../src/i18n/locales');
  const units: ContentUnit[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const modules = modulesByLocale[locale] ?? [];
    for (const module of modules) {
      for (const field of ['title', 'shortTitle', 'description'] as const) {
        const text = module[field];
        if (typeof text === 'string' && text.trim()) units.push({ key: `${module.id}::module.${field}`, locale, text, sourceBacked: false });
      }
      for (const screen of module.screens) {
        const sourceBacked = screen.sourceIds?.some((id) => CIAS_SOURCE_IDS.includes(id)) ?? false;
        for (const [path, text] of Object.entries(learnerVisibleText(screen))) units.push({ key: `${screen.id}::${path}`, locale, text, sourceBacked });
      }
    }
    for (const [key, text] of Object.entries(UI_STRINGS[locale] ?? {})) {
      if (typeof text === 'string' && text.trim()) units.push({ key: `ui::${key}`, locale, text, sourceBacked: false });
    }
  }
  try {
    const { curriculumImages } = await import('../src/content/image-registry');
    for (const image of curriculumImages) {
      for (const [locale, text] of Object.entries(image.altText ?? {})) {
        if (typeof text === 'string' && text.trim()) units.push({ key: `image::${image.id}::altText`, locale, text, sourceBacked: false });
      }
    }
  } catch {
    // An older revision without a loadable image registry simply contributes no alt text.
  }
  const answers: Record<string, AnswerRecord> = {};
  const screenIds: string[] = [];
  for (const module of modulesByLocale.en ?? []) {
    for (const screen of module.screens) {
      screenIds.push(screen.id);
      if (screen.type === 'singleChoice' || screen.type === 'multiSelect' || screen.type === 'scenario') {
        const correct = screen.type === 'singleChoice' ? (screen.correctChoiceId ? [screen.correctChoiceId] : null)
          : screen.type === 'multiSelect' ? (screen.correctChoiceIds?.length ? [...screen.correctChoiceIds] : null) : null;
        answers[screen.id] = { type: screen.type, choiceIds: screen.choices.map((choice) => choice.id), correct, questionKind: (screen as { questionKind?: string }).questionKind ?? null };
      }
    }
  }
  return { units, answers, screenIds };
}

if (process.argv[1] && /scripts[\\/]content-units\.ts$/.test(process.argv[1]) && process.argv.includes('--json')) {
  void collectSnapshot().then((snapshot) => process.stdout.write(JSON.stringify(snapshot)));
}
