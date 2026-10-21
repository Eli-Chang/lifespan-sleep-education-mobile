import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
for (const locale of ['en', 'es'] as const) {
  const knowledgePath = resolve(root, `cloudflare-worker/knowledge/module-content.${locale}.json`);
  const knowledge = JSON.parse(readFileSync(knowledgePath, 'utf8')) as { entries: Array<{ module_id: string; source_hash: string }> };
  const hashes = new Map<string, string>();
  for (let order = 1; order <= 7; order += 1) {
    const sourcePath = resolve(root, `src/content/${locale}/modules/module-${String(order).padStart(2, '0')}.ts`);
    hashes.set(`m${order}`, createHash('sha256').update(readFileSync(sourcePath)).digest('hex'));
  }
  for (const entry of knowledge.entries) entry.source_hash = hashes.get(entry.module_id)!;
  writeFileSync(knowledgePath, `${JSON.stringify(knowledge, null, 2)}\n`);
}
