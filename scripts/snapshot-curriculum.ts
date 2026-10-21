// Serializes the learner-facing curriculum (modules, screens, questions, feedback,
// image mappings, and rich-presentation output) so a UI-only change can be proven
// content-neutral by comparing hashes before and after.
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import Module from 'node:module';

// Bundled media are resolved by Metro in the app; here each require returns the
// project-relative asset path so image mappings are part of the snapshot.
for (const extension of ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4']) {
  (Module as unknown as { _extensions: Record<string, (module: { exports: unknown }, filename: string) => void> })._extensions[extension] = (module, filename) => { module.exports = filename.split('/assets/')[1]; };
}

async function main() {
  const { englishModules } = await import('../src/content/en');
  const { spanishModules } = await import('../src/content/es');
  const { imagesForLesson } = await import('../src/content/image-registry');
  const { richPresentation } = await import('../src/content/rich-presentation');
  const out = process.argv[2];
  const locales = { en: englishModules, es: spanishModules } as const;
  const snapshot = Object.fromEntries(Object.entries(locales).map(([locale, modules]) => [locale, modules.map((module) => ({
    ...module,
    screens: module.screens.map((screen) => ({
      screen,
      images: imagesForLesson(screen.id).map((asset) => ({ id: asset.id, source: asset.source, altText: asset.altText })),
      presentation: screen.type === 'content' ? richPresentation(screen, locale as 'en' | 'es') : undefined,
    })),
  }))]));
  const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
  const summary = {
    sha256: hash(snapshot),
    en: { sha256: hash(snapshot.en), screens: englishModules.reduce((total, m) => total + m.screens.length, 0), modules: englishModules.map((m) => `${m.order}:${m.id}:${m.title}:${m.screens.length}`) },
    es: { sha256: hash(snapshot.es), screens: spanishModules.reduce((total, m) => total + m.screens.length, 0), modules: spanishModules.map((m) => `${m.order}:${m.id}:${m.title}:${m.screens.length}`) },
  };
  if (out) writeFileSync(out, JSON.stringify(snapshot, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

void main();
