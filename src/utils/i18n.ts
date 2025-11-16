import * as Localization from 'expo-localization';
import en from '../locales/en.json';
import de from '../locales/de.json';
import ru from '../locales/ru.json';
import uk from '../locales/uk.json';

export type LanguageKey = 'en' | 'de' | 'ru' | 'uk';

export const translations: Record<LanguageKey, Record<string, any>> = {
  en,
  de,
  ru,
  uk,
};

export const availableLanguages: { code: LanguageKey; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
];

export const getDefaultLanguage = (): LanguageKey => {
  const locale = Localization.locale?.split('-')[0];
  if (locale && Object.keys(translations).includes(locale)) {
    return locale as LanguageKey;
  }
  return 'en';
};

export const translate = (
  key: string,
  language: LanguageKey,
  variables?: Record<string, string | number>
): string => {
  const keys = key.split('.');
  let result: any = translations[language];
  for (const path of keys) {
    result = result?.[path];
  }
  if (typeof result !== 'string') {
    return key;
  }

  if (variables) {
    return Object.keys(variables).reduce((acc, variableKey) => {
      const value = variables[variableKey];
      return acc.replace(`{{${variableKey}}}`, String(value));
    }, result);
  }

  return result;
};
