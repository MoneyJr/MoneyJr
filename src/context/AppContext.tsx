import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { availableLanguages, getDefaultLanguage, LanguageKey, translate } from '../utils/i18n';
import {
  loadChecklist,
  loadLanguage,
  loadProfile,
  persistChecklist,
  persistLanguage,
  persistProfile,
} from '../utils/storage';

export type ChecklistProgress = Record<string, boolean>;

export type Profile = {
  name: string;
  email: string;
  status: string;
  city: string;
};

interface AppContextValue {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
  checklistProgress: ChecklistProgress;
  toggleTask: (taskId: string) => void;
  profile: Profile;
  updateProfile: (profile: Partial<Profile>) => void;
  languages: typeof availableLanguages;
}

const defaultProfile: Profile = {
  name: 'Alex Integration',
  email: 'alex@example.com',
  status: 'newcomer',
  city: 'Freiburg im Breisgau',
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageKey>(getDefaultLanguage());
  const [checklistProgress, setChecklistProgress] = useState<ChecklistProgress>({});
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      const [savedChecklist, savedLanguage, savedProfile] = await Promise.all([
        loadChecklist(),
        loadLanguage(),
        loadProfile(),
      ]);
      if (savedChecklist) {
        setChecklistProgress(savedChecklist);
      }
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
      if (savedProfile) {
        setProfile({ ...defaultProfile, ...savedProfile });
      }
      setLoading(false);
    };

    hydrate();
  }, []);

  const setLanguage = async (lang: LanguageKey) => {
    setLanguageState(lang);
    await persistLanguage(lang);
  };

  const toggleTask = (taskId: string) => {
    setChecklistProgress((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      persistChecklist(updated);
      return updated;
    });
  };

  const updateProfile = (changes: Partial<Profile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...changes };
      persistProfile(updated);
      return updated;
    });
  };

  const translator = useMemo(() => {
    return (key: string, vars?: Record<string, string | number>) => translate(key, language, vars);
  }, [language]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translator,
        checklistProgress,
        toggleTask,
        profile,
        updateProfile,
        languages: availableLanguages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
