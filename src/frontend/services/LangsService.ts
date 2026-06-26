import type { Language, LangCode, SourceLangCode, TargetLangCode } from '@/models';

type SourceLanguage = Omit<Language, 'code'> & { code: SourceLangCode };
type TargetLanguage = Omit<Language, 'code'> & { code: TargetLangCode };

const USER_LANGS: SourceLanguage[] = [
  { code: 'fr', flag: '🇫🇷', available: true, names: { fr: 'Français',  en: 'French',   es: 'Francés',   de: 'Französisch', it: 'Francese',  ro: 'Franceză',  pt: 'Francês' } },
  { code: 'en', flag: '🇬🇧', available: true, names: { fr: 'Anglais',   en: 'English',  es: 'Inglés',    de: 'Englisch',    it: 'Inglese',   ro: 'Engleză',   pt: 'Inglês' } },
  { code: 'es', flag: '🇪🇸', available: true, names: { fr: 'Espagnol',  en: 'Spanish',  es: 'Español',   de: 'Spanisch',    it: 'Spagnolo',  ro: 'Spaniolă',  pt: 'Espanhol' } },
  { code: 'de', flag: '🇩🇪', available: true, names: { fr: 'Allemand',  en: 'German',   es: 'Alemán',    de: 'Deutsch',     it: 'Tedesco',   ro: 'Germană',   pt: 'Alemão' } },
  { code: 'it', flag: '🇮🇹', available: true, names: { fr: 'Italien',   en: 'Italian',  es: 'Italiano',  de: 'Italienisch', it: 'Italiano',  ro: 'Italiană',  pt: 'Italiano' } },
  { code: 'ro', flag: '🇷🇴', available: true, names: { fr: 'Roumain',   en: 'Romanian', es: 'Rumano',    de: 'Rumänisch',   it: 'Rumeno',    ro: 'Română',    pt: 'Romeno' } },
  { code: 'pt', flag: '🇵🇹', available: true, names: { fr: 'Portugais', en: 'Portuguese', es: 'Portugués', de: 'Portugiesisch', it: 'Portoghese', ro: 'Portugheză', pt: 'Português' } },
];

const LANGUAGES: TargetLanguage[] = [
  { code: 'en', flag: '🇬🇧', available: true,  names: { fr: 'Anglais',  en: 'English',  es: 'Inglés',   de: 'Englisch',    it: 'Inglese',  ro: 'Engleză',  pt: 'Inglês' } },
  { code: 'es', flag: '🇪🇸', available: true,  names: { fr: 'Espagnol', en: 'Spanish',  es: 'Español',  de: 'Spanisch',    it: 'Spagnolo', ro: 'Spaniolă', pt: 'Espanhol' } },
  { code: 'it', flag: '🇮🇹', available: true,  names: { fr: 'Italien',  en: 'Italian',  es: 'Italiano', de: 'Italienisch', it: 'Italiano', ro: 'Italiană', pt: 'Italiano' } },
  { code: 'de', flag: '🇩🇪', available: true,  names: { fr: 'Allemand', en: 'German',   es: 'Alemán',   de: 'Deutsch',     it: 'Tedesco',  ro: 'Germană',  pt: 'Alemão' } },
  { code: 'ro', flag: '🇷🇴', available: true,  names: { fr: 'Roumain',  en: 'Romanian', es: 'Rumano',   de: 'Rumänisch',   it: 'Rumeno',   ro: 'Română',   pt: 'Romeno' } },
];

export class LangsService {
  getLangName(langCode: LangCode, userLang: SourceLangCode): string {
    const all = [...LANGUAGES, ...USER_LANGS];
    const lang = all.find((l) => l.code === langCode);
    return lang?.names[userLang] ?? lang?.names['fr'] ?? langCode;
  }

  getLangAutonym(langCode: SourceLangCode): string {
    const lang = USER_LANGS.find((l) => l.code === langCode);
    return lang?.names[langCode] ?? langCode;
  }

  listTargetLanguages(userLang: SourceLangCode): TargetLangCode[] {
    return LANGUAGES.filter((l) => l.available && l.code !== userLang).map((l) => l.code);
  }

  listSourceLanguages(): SourceLangCode[] {
    return USER_LANGS.filter((l) => l.available).map((l) => l.code);
  }

  listActiveLanguages(activeCodes: TargetLangCode[], userLang: SourceLangCode): TargetLangCode[] {
    return this.listTargetLanguages(userLang).filter((code) => activeCodes.includes(code));
  }
}
