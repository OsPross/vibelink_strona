import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  pl: () => import('../dictionaries/pl.json').then((module) => module.default),
};

export type ValidLocale = keyof typeof dictionaries;

export const getDictionary = async (locale: ValidLocale) => {
  // Fallback bezpieczeństwa, jeśli ktoś wpisze dziwny język w URL
  const loadDictionary = dictionaries[locale] ?? dictionaries.en;
  return loadDictionary();
};