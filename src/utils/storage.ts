import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageKey } from './i18n';

const CHECKLIST_KEY = 'smartIntegration.checklist';
const LANGUAGE_KEY = 'smartIntegration.language';
const PROFILE_KEY = 'smartIntegration.profile';

export const persistChecklist = async (state: Record<string, boolean>) => {
  await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
};

export const loadChecklist = async (): Promise<Record<string, boolean>> => {
  const stored = await AsyncStorage.getItem(CHECKLIST_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const persistLanguage = async (language: LanguageKey) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
};

export const loadLanguage = async (): Promise<LanguageKey | null> => {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
  return stored as LanguageKey | null;
};

export const persistProfile = async (profile: Record<string, string>) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const loadProfile = async (): Promise<Record<string, string> | null> => {
  const stored = await AsyncStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : null;
};
