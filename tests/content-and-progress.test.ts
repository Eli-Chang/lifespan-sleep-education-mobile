import assert from 'node:assert/strict';
import test from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import { sourceManifest } from '../src/content/source-manifest';
import { equalSets, moduleProgress, overallProgress, percent } from '../src/utils/progress';
import { validateContent } from '../src/utils/validate-content';
import { evaluateQuestion, questionChoiceState } from '../src/utils/questions';
import { CURRICULUM_VERSION, curriculumMigrationMap, migrateLearningState } from '../src/state/curriculum-migration';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const screens=englishModules.flatMap(module=>module.screens);
test('curriculum has seven modules and 82 unique screens',()=>{
  assert.equal(englishModules.length,7);assert.equal(screens.length,82);assert.equal(new Set(screens.map(s=>s.id)).size,82);
  assert.deepEqual(validateContent(englishModules,spanishModules),[]);assert.equal(sourceManifest.length,77);
});
test('English and machine-drafted Spanish have exact structural parity',()=>{
  assert.deepEqual(englishModules.map(m=>m.id),spanishModules.map(m=>m.id));
  assert.deepEqual(screens.map(s=>[s.id,s.type]),spanishModules.flatMap(m=>m.screens.map(s=>[s.id,s.type])));
  spanishModules.flatMap(m=>m.screens).forEach(s=>{assert.equal(s.translationStatus,'machine_drafted');assert.equal(s.bilingualReviewStatus,'not_reviewed');});
});
test('every objective question has valid answers and complete feedback',()=>{
  screens.forEach(s=>{
    if((s.type!=='singleChoice'&&s.type!=='multiSelect')||s.questionKind!=='objective') return;
    const ids=new Set(s.choices.map(c=>c.id));
    if(s.type==='singleChoice') assert.ok(s.correctChoiceId&&ids.has(s.correctChoiceId));
    else assert.ok(s.correctChoiceIds?.length&&s.correctChoiceIds.every(id=>ids.has(id)));
    assert.ok(s.questionFeedback?.correctSummary);assert.ok(s.questionFeedback?.incorrectSummary);assert.ok(s.questionFeedback?.generalExplanation);
  });
});
test('reflections are unscored and include a privacy choice when sensitive',()=>{
  screens.forEach(s=>{if((s.type==='singleChoice'||s.type==='multiSelect')&&s.questionKind==='reflection') assert.equal(evaluateQuestion(s,['c1']),undefined);});
  for(const id of ['m2-r1','m7-r1']){const s=screens.find(x=>x.id===id);assert.ok(s?.type==='multiSelect');assert.ok(s.choices.some(c=>/prefer/i.test(c.label)));}
});
test('multi-select comparison ignores order and exposes accessible result states',()=>{
  assert.equal(equalSets(['c3','c1'],['c1','c3']),true);
  const s=screens.find(x=>x.id==='m1-q2');assert.ok(s?.type==='multiSelect');
  assert.equal(evaluateQuestion(s,['c5','c2','c3']),true);assert.equal(evaluateQuestion(s,['c1','c2']),false);
  assert.deepEqual(questionChoiceState(s,['c1','c2'],'c1'),{active:true,correctSelected:false,incorrectSelected:true,missed:false});
});
test('progress counts participation and new module totals',()=>{
  assert.equal(percent(3,10),30);const first=englishModules[0];assert.equal(first.screens.length,12);
  const completed=first.screens.slice(0,2).map(s=>s.id);assert.equal(moduleProgress(first,completed).completed,2);assert.equal(overallProgress(englishModules,completed).total,82);
});
test('v2 progress migration is idempotent and does not mark new lessons viewed',()=>{
  const legacy={curriculumVersion:2,completedScreenIds:['m1-s01','m1-s04'],completedModuleIds:['m1'],lastScreenByModule:{m1:'m1-s05'},answers:{'m1-s04':['c2']},answerAttempts:{'m1-s04':[{answers:['c2'],correct:true,submittedAt:'test'}]}};
  const migrated=migrateLearningState(legacy);assert.equal(migrated.curriculumVersion,CURRICULUM_VERSION);
  assert.deepEqual(migrated.completedScreenIds,['m1-01','m1-q1']);assert.equal(migrated.lastScreenByModule?.m1,'m1-05');assert.deepEqual(migrated.answers?.['m1-q1'],['c2']);
  assert.deepEqual(migrateLearningState(migrated),migrated);assert.equal(migrated.completedScreenIds?.includes('m1-02'),false);
});
test('every historical screenshot ID migrates to a valid version 3 screen',()=>{
  const audit=readFileSync(resolve(process.cwd(),'docs/SCREENSHOT_AUDIT.md'),'utf8');
  const legacyIds=[...audit.matchAll(/m[1-7]-s\d{2}/g)].map(match=>match[0]);
  assert.equal(new Set(legacyIds).size,77);
  const validIds=new Set(screens.map(screen=>screen.id));
  const mapped=legacyIds.map(id=>[id, curriculumMigrationMap[id as keyof typeof curriculumMigrationMap]] as const);
  assert.equal(mapped.filter(([,value])=>!value||!validIds.has(value)).length,0);
  const lastScreenByModule: Record<string,string>=Object.fromEntries([...new Set(legacyIds.map(id=>id.slice(0,2)))].map(moduleId=>[moduleId,legacyIds.filter(id=>id.startsWith(`${moduleId}-`)).at(-1)!]));
  const migrated=migrateLearningState({curriculumVersion:2,completedScreenIds:legacyIds,lastScreenByModule,answers:Object.fromEntries(legacyIds.map(id=>[id,['c1']])),answerAttempts:Object.fromEntries(legacyIds.map(id=>[id,[]]))});
  assert.equal(migrated.completedScreenIds?.some(id=>id.includes('-s')),false);
  assert.equal(Object.keys(migrated.answers??{}).some(id=>id.includes('-s')),false);
  assert.equal(Object.keys(migrated.answerAttempts??{}).some(id=>id.includes('-s')),false);
  assert.equal(Object.values(migrated.lastScreenByModule??{}).some(id=>id?.includes('-s')),false);
});
test('all curriculum AI activities have stable unique IDs',()=>{
  const activities=screens.filter(s=>s.type==='aiActivity');assert.equal(activities.length,12);assert.equal(new Set(activities.map(a=>a.activityId)).size,12);
});
