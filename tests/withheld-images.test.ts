import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import Module from 'node:module';
import { it } from 'node:test';

// Bundled media resolve through Metro in the app; in Node each require returns the asset path.
for (const extension of ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4']) {
  (Module as unknown as { _extensions: Record<string, (module: { exports: unknown }, filename: string) => void> })._extensions[extension] = (module, filename) => { module.exports = filename; };
}

it('withholds unverified images from learners without deleting them', async () => {
  const { WITHHELD_IMAGES, curriculumImages, imagesForLesson, imageForLesson } = await import('../src/content/image-registry');
  assert.deepEqual(Object.keys(WITHHELD_IMAGES).sort(), ['m8-10-settings-chart', 'm9-05-skin-irritation']);
  for (const [id, entry] of Object.entries(WITHHELD_IMAGES)) {
    const asset = curriculumImages.find((candidate) => candidate.id === id);
    assert.ok(asset, `${id} stays in the registry`);
    assert.ok(entry.reason.trim().length > 20 && existsSync(entry.reference), `${id} has a recorded reason`);
    for (const lessonId of asset.lessonIds) {
      assert.equal(imagesForLesson(lessonId).some((candidate) => candidate.id === id), false, `${id} hidden on ${lessonId}`);
      assert.notEqual(imageForLesson(lessonId)?.id, id);
    }
  }
  // Images that are not withheld are unaffected.
  assert.ok(imagesForLesson('m1-01').some((asset) => asset.id === 'cpap-open-airway'));
});
