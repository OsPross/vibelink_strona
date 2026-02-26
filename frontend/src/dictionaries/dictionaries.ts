import 'server-only';

const dictionaries = {
  pl: () => import('./pl.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'pl' | 'en') => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries['en']();
};