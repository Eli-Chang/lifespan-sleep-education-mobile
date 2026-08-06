import type { SourceManifestEntry } from '@/src/types/content';

const groups: [string, string[]][] = [
  ['m1', ['171352', '171405', '171413', '171424', '171430', '171451']],
  ['m2', ['171506', '171516', '171527', '171532', '171536', '171541', '171552']],
  ['m3', ['171600', '171605', '171611', '171621', '171628', '171731']],
  ['m4', ['171636', '171641', '171649', '171655', '171701', '171709', '171714', '171719', '171727']],
  ['m5', ['171826', '171830', '171834', '171839', '171845', '171851', '171855', '171900', '171904', '171914', '171918', '171925', '171931', '171939', '171943', '171949', '171954', '172001', '172007', '172012', '172018', '172023', '172031', '172035', '172040', '172047', '172053', '172057', '172102', '172107', '172112', '172121']],
  ['m6', ['172134', '172138', '172142', '172146', '172151', '172156', '172203', '172208', '172214', '172218']],
  ['m7', ['172231', '172235', '172239', '172244', '172250', '172254', '172258']],
];

const questionTimestamps = new Set([
  '171424', '171451', '171516', '171541', '171552', '171605', '171611', '171621',
  '171641', '171655', '171701', '171719', '171839', '171845', '171904', '171918',
  '171931', '172001', '172012', '172023', '172035', '172047', '172107', '172112',
  '172151', '172208', '172218', '172244', '172258',
]);

export const sourceManifest: SourceManifestEntry[] = groups.flatMap(([moduleId, timestamps]) =>
  timestamps.map((timestamp, index) => {
    const screenId = `${moduleId}-s${String(index + 1).padStart(2, '0')}`;
    return {
      id: `src-${timestamp}`,
      filePath: `screenshots/Screenshot 2026-07-29 ${timestamp}.png`,
      assignedModuleId: moduleId,
      relatedLessonScreenIds: [screenId],
      interactionGroupId: questionTimestamps.has(timestamp) ? `interaction-${screenId}` : undefined,
      auditStatus: 'assigned-to-module' as const,
      reviewStatus: ['171413', '171430', '171451', '171731', '171727', '172107', '172121', '172142'].includes(timestamp)
        ? 'needs-review' as const
        : 'reviewed' as const,
    };
  }),
);
