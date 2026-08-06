import type { LearningState } from './AppProvider';

export const CURRICULUM_VERSION = 3;

const oldToNew: Record<string,string> = {
  'm1-s01':'m1-01','m1-s02':'m1-02','m1-s03':'m1-03','m1-s04':'m1-q1','m1-s05':'m1-05','m1-s06':'m1-r1',
  'm2-s01':'m2-01','m2-s02':'m2-02','m2-s03':'m2-r1','m2-s04':'m2-03','m2-s05':'m2-q1','m2-s06':'m2-q2',
  'm2-s07':'m2-recap',
  'm3-s01':'m3-01','m3-s02':'m3-q1','m3-s03':'m3-02','m3-s04':'m3-03',
  'm3-s05':'m3-q2','m3-s06':'m3-recap',
  'm4-s01':'m4-01','m4-s02':'m4-02','m4-s03':'m4-q1','m4-s04':'m4-03','m4-s05':'m4-04','m4-s06':'m4-q2','m4-s07':'m4-05',
  'm4-s08':'m4-q3','m4-s09':'m4-recap',
  'm5-s01':'m5-01','m5-s02':'m5-02','m5-s03':'m5-03','m5-s04':'m5-04','m5-s05':'m5-05','m5-s06':'m5-06',
  'm5-s07':'m5-07','m5-s08':'m5-08','m5-s09':'m5-09','m5-s10':'m5-10','m5-s11':'m5-11',
  'm5-s12':'m5-q1','m5-s13':'m5-q2','m5-s14':'m5-q3','m5-s15':'m5-q4','m5-s16':'m5-ai1',
  'm5-s17':'m5-ai3','m5-s18':'m5-ai2','m5-s19':'m5-recap','m5-s20':'m5-recap','m5-s21':'m5-recap','m5-s22':'m5-recap','m5-s23':'m5-recap','m5-s24':'m5-recap','m5-s25':'m5-recap','m5-s26':'m5-recap','m5-s27':'m5-recap','m5-s28':'m5-recap','m5-s29':'m5-recap','m5-s30':'m5-recap','m5-s31':'m5-recap','m5-s32':'m5-recap',
  'm6-s01':'m6-01','m6-s02':'m6-02','m6-s03':'m6-q1','m6-s04':'m6-03','m6-s05':'m6-04','m6-s06':'m6-q2','m6-s07':'m6-05',
  'm6-s08':'m6-q3','m6-s09':'m6-ai2','m6-s10':'m6-recap',
  'm7-s01':'m7-01','m7-s02':'m7-02','m7-s03':'m7-03','m7-s04':'m7-q1','m7-s05':'m7-04','m7-s06':'m7-q2','m7-s07':'m7-r1',
};

export const migrateLearningState = (input: Partial<LearningState> & { curriculumVersion?: number }): Partial<LearningState> & { curriculumVersion: number } => {
  if((input.curriculumVersion??2)>=CURRICULUM_VERSION) return {...input,curriculumVersion:CURRICULUM_VERSION};
  const mapId=(id:string)=>oldToNew[id]??id;
  const mapRecord=<T>(record:Record<string,T>|undefined)=>Object.fromEntries(Object.entries(record??{}).map(([id,value])=>[mapId(id),value]));
  return {
    ...input,
    curriculumVersion:CURRICULUM_VERSION,
    completedScreenIds:[...new Set((input.completedScreenIds??[]).map(mapId))],
    lastScreenByModule:Object.fromEntries(Object.entries(input.lastScreenByModule??{}).map(([moduleId,id])=>[moduleId,mapId(id)])),
    answers:mapRecord(input.answers),
    answerAttempts:mapRecord(input.answerAttempts),
  };
};

export const curriculumMigrationMap = oldToNew;
