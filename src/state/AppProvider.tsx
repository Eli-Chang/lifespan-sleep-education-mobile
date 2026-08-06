import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '@/src/i18n';
import type { SupportedLocale } from '@/src/types/content';
import { CURRICULUM_VERSION, migrateLearningState } from './curriculum-migration';

const STORAGE_KEY = 'sleep_education_state_v3';
const LEGACY_STORAGE_KEY = 'sleep_education_state_v2';

export interface AnswerAttempt {
  answers: string[];
  correct?: boolean;
  submittedAt: string;
}

export interface SavedActionPlan {
  id: string;
  text: string;
  createdAt: string;
}
export interface LessonChatMessage { role: 'user' | 'assistant'; content: string }
export type ConversationState = 'awaiting_first_message' | 'awaiting_ai' | 'open' | 'complete' | 'error';
export interface LessonChatState { messages: LessonChatMessage[]; aiTurns: number; learnerTurns?: number; status?: ConversationState; conversationComplete?: boolean; shouldAllowLearnerReply?: boolean }

export interface LearningState {
  curriculumVersion: number;
  completedScreenIds: string[];
  completedModuleIds: string[];
  currentModuleId?: string;
  lastScreenByModule: Record<string, string>;
  answers: Record<string, string[]>;
  answerAttempts: Record<string, AnswerAttempt[]>;
  language: SupportedLocale;
  narrationEnabled: boolean;
  narrationRate: number;
  narrationPitch: number;
  voiceByLocale: Partial<Record<SupportedLocale, string>>;
  aiConsent: boolean;
  aiEnabled: boolean;
  actionPlans: SavedActionPlan[];
}

const defaults: LearningState = {
  curriculumVersion: CURRICULUM_VERSION,
  completedScreenIds: [], completedModuleIds: [], lastScreenByModule: {}, answers: {}, answerAttempts: {},
  language: 'en', narrationEnabled: false, narrationRate: 0.95, narrationPitch: 1, voiceByLocale: {},
  aiConsent: false, aiEnabled: true, actionPlans: [],
};

interface AppContextValue {
  state: LearningState;
  loaded: boolean;
  completeScreen: (screenId: string, moduleId: string, nextScreenId?: string, isLast?: boolean) => void;
  saveAnswer: (screenId: string, answers: string[]) => void;
  submitAnswer: (screenId: string, answers: string[], correct?: boolean) => void;
  setLanguage: (language: SupportedLocale) => void;
  setNarrationEnabled: (enabled: boolean) => void;
  setNarrationRate: (rate: number) => void;
  setNarrationPitch: (pitch: number) => void;
  setVoice: (locale: SupportedLocale, voice?: string) => void;
  setAiConsent: (consent: boolean) => void;
  setAiEnabled: (enabled: boolean) => void;
  saveActionPlan: (plan: SavedActionPlan) => void;
  deleteActionPlan: (id: string) => void;
  saveNow: () => Promise<void>;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [state, setState] = useState(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(LEGACY_STORAGE_KEY)])
      .then(([current, legacy]) => current ?? legacy)
      .then((value) => {
        if (value) {
          const parsed = migrateLearningState(JSON.parse(value) as Partial<LearningState>);
          setState({
            ...defaults,
            curriculumVersion: parsed.curriculumVersion ?? defaults.curriculumVersion,
            completedScreenIds: parsed.completedScreenIds ?? [],
            completedModuleIds: parsed.completedModuleIds ?? [],
            currentModuleId: parsed.currentModuleId,
            lastScreenByModule: parsed.lastScreenByModule ?? {},
            answers: parsed.answers ?? {},
            answerAttempts: parsed.answerAttempts ?? {},
            language: parsed.language ?? defaults.language,
            narrationEnabled: parsed.narrationEnabled ?? defaults.narrationEnabled,
            narrationRate: parsed.narrationRate ?? defaults.narrationRate,
            narrationPitch: parsed.narrationPitch ?? defaults.narrationPitch,
            voiceByLocale: parsed.voiceByLocale ?? {},
            aiConsent: parsed.aiConsent ?? false,
            aiEnabled: parsed.aiEnabled ?? true,
            actionPlans: parsed.actionPlans ?? [],
          });
          void AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    void i18n.changeLanguage(state.language);
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
    submitAnswer: (screenId, answers, correct) => setState((current) => ({
      ...current,
      answers: { ...current.answers, [screenId]: answers },
      answerAttempts: {
        ...current.answerAttempts,
        [screenId]: [...(current.answerAttempts[screenId] ?? []), { answers, correct, submittedAt: new Date().toISOString() }],
      },
    })),
    setLanguage: (language) => setState((current) => ({ ...current, language })),
    setNarrationEnabled: (narrationEnabled) => setState((current) => ({ ...current, narrationEnabled })),
    setNarrationRate: (narrationRate) => setState((current) => ({ ...current, narrationRate })),
    setNarrationPitch: (narrationPitch) => setState((current) => ({ ...current, narrationPitch })),
    setVoice: (locale, voice) => setState((current) => ({ ...current, voiceByLocale: { ...current.voiceByLocale, [locale]: voice } })),
    setAiConsent: (aiConsent) => setState((current) => ({ ...current, aiConsent })),
    setAiEnabled: (aiEnabled) => setState((current) => ({ ...current, aiEnabled })),
    saveActionPlan: (plan) => setState((current) => ({ ...current, actionPlans: [...current.actionPlans, plan] })),
    deleteActionPlan: (id) => setState((current) => ({ ...current, actionPlans: current.actionPlans.filter((plan) => plan.id !== id) })),
    saveNow: () => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
    resetProgress: () => setState((current) => ({
      ...defaults,
      language: current.language,
      narrationEnabled: current.narrationEnabled,
      narrationRate: current.narrationRate,
      narrationPitch: current.narrationPitch,
      voiceByLocale: current.voiceByLocale,
       aiConsent: false,
       aiEnabled: current.aiEnabled,
    })),
  }), [completeScreen, loaded, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
};
