import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '@/src/i18n';
import type { SupportedLocale } from '@/src/types/content';
import { CURRICULUM_VERSION, migrateLearningState } from './curriculum-migration';
import { sanitizeLearningState, serializeLearningState } from './learning-persistence';

const STORAGE_KEY = 'sleep_education_state_v3';
const LEGACY_STORAGE_KEY = 'sleep_education_state_v2';

export interface AnswerAttempt {
  answers: string[];
  correct?: boolean;
  submittedAt: string;
}

export interface SavedReflection { text: string; savedAt: string }

export interface LearningState {
  curriculumVersion: number;
  completedScreenIds: string[];
  completedModuleIds: string[];
  currentModuleId?: string;
  lastScreenByModule: Record<string, string>;
  answers: Record<string, string[]>;
  answerAttempts: Record<string, AnswerAttempt[]>;
  reflectionDrafts: Record<string, string>;
  savedReflections: Record<string, SavedReflection>;
  language: SupportedLocale;
  narrationEnabled: boolean;
  narrationRate: number;
  narrationPitch: number;
  voiceByLocale: Partial<Record<SupportedLocale, string>>;
  reduceMotion: boolean;
}

const defaults: LearningState = {
  curriculumVersion: CURRICULUM_VERSION,
  completedScreenIds: [], completedModuleIds: [], lastScreenByModule: {}, answers: {}, answerAttempts: {}, reflectionDrafts: {}, savedReflections: {},
  language: 'en', narrationEnabled: false, narrationRate: 0.95, narrationPitch: 1, voiceByLocale: {},
  reduceMotion: false,
};

interface AppContextValue {
  state: LearningState;
  loaded: boolean;
  completeScreen: (screenId: string, moduleId: string, nextScreenId?: string, isLast?: boolean) => void;
  saveAnswer: (screenId: string, answers: string[]) => void;
  submitAnswer: (screenId: string, answers: string[], correct?: boolean) => void;
  saveReflectionDraft: (screenId: string, text: string) => void;
  saveReflection: (screenId: string, text: string) => Promise<void>;
  setLanguage: (language: SupportedLocale) => void;
  setNarrationEnabled: (enabled: boolean) => void;
  setNarrationRate: (rate: number) => void;
  setNarrationPitch: (pitch: number) => void;
  setVoice: (locale: SupportedLocale, voice?: string) => void;
  setReduceMotion: (enabled: boolean) => void;
  saveNow: () => Promise<void>;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);
const persistLearningState = (state: LearningState) => AsyncStorage.setItem(STORAGE_KEY, serializeLearningState(state));

export function AppProvider({ children }: React.PropsWithChildren) {
  const [state, setState] = useState(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(LEGACY_STORAGE_KEY)])
      .then(([current, legacy]) => current ?? legacy)
      .then((value) => {
        if (value) {
          const migrated = migrateLearningState(JSON.parse(value) as Partial<LearningState>);
          const hydrated = sanitizeLearningState(migrated) as Partial<LearningState>;
          setState({ ...defaults, ...hydrated });
          void AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    void i18n.changeLanguage(state.language);
    void persistLearningState(state).catch(() => undefined);
  }, [loaded, state]);

  const completeScreen = useCallback((screenId: string, moduleId: string, nextScreenId?: string, isLast?: boolean) => {
    setState((current) => ({
      ...current,
      completedScreenIds: current.completedScreenIds.includes(screenId)
        ? current.completedScreenIds : [...current.completedScreenIds, screenId],
      completedModuleIds: isLast && !current.completedModuleIds.includes(moduleId)
        ? [...current.completedModuleIds, moduleId] : current.completedModuleIds,
      currentModuleId: moduleId,
      lastScreenByModule: { ...current.lastScreenByModule, [moduleId]: nextScreenId ?? screenId },
    }));
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    state, loaded, completeScreen,
    saveAnswer: (screenId, answers) => setState((current) => ({ ...current, answers: { ...current.answers, [screenId]: answers } })),
    saveReflectionDraft: (screenId, text) => setState((current) => ({ ...current, reflectionDrafts: { ...current.reflectionDrafts, [screenId]: text } })),
    saveReflection: async (screenId, text) => {
      const next: LearningState = {
        ...state,
        reflectionDrafts: { ...state.reflectionDrafts, [screenId]: text },
        savedReflections: { ...state.savedReflections, [screenId]: { text, savedAt: new Date().toISOString() } },
      };
      setState(next);
      await persistLearningState(next);
    },
    submitAnswer: (screenId, answers, correct) => setState((current) => ({
      ...current,
      answers: { ...current.answers, [screenId]: answers },
      answerAttempts: {
        ...current.answerAttempts,
        [screenId]: [...(current.answerAttempts[screenId] ?? []), { answers, correct, submittedAt: new Date().toISOString() }],
      },
    })),
    setLanguage: (language) => setState((current) => {
      const next = { ...current, language };
      void persistLearningState(next);
      void i18n.changeLanguage(language);
      return next;
    }),
    setNarrationEnabled: (narrationEnabled) => setState((current) => ({ ...current, narrationEnabled })),
    setNarrationRate: (narrationRate) => setState((current) => ({ ...current, narrationRate })),
    setNarrationPitch: (narrationPitch) => setState((current) => ({ ...current, narrationPitch })),
    setVoice: (locale, voice) => setState((current) => ({ ...current, voiceByLocale: { ...current.voiceByLocale, [locale]: voice } })),
    setReduceMotion: (reduceMotion) => setState((current) => ({ ...current, reduceMotion })),
    saveNow: () => persistLearningState(state),
    resetProgress: () => {
      setState((current) => ({
        ...defaults,
        language: current.language,
        narrationEnabled: current.narrationEnabled,
        narrationRate: current.narrationRate,
        narrationPitch: current.narrationPitch,
        voiceByLocale: current.voiceByLocale,
      }));
    },
  }), [completeScreen, loaded, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
};
