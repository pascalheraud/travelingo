import type { Language, LangCode, SourceLangCode, TargetLangCode } from '@/models';

type SourceLanguage = Omit<Language, 'code'> & { code: SourceLangCode };
type TargetLanguage = Omit<Language, 'code'> & { code: TargetLangCode };

const USER_LANGS: SourceLanguage[] = [
  { code: 'fr', flag: '🇫🇷', names: { fr: 'Français',  en: 'French',   es: 'Francés',   de: 'Französisch', it: 'Francese',  ro: 'Franceză',  pt: 'Francês' } },
  { code: 'en', flag: '🇬🇧', names: { fr: 'Anglais',   en: 'English',  es: 'Inglés',    de: 'Englisch',    it: 'Inglese',   ro: 'Engleză',   pt: 'Inglês' } },
  { code: 'es', flag: '🇪🇸', names: { fr: 'Espagnol',  en: 'Spanish',  es: 'Español',   de: 'Spanisch',    it: 'Spagnolo',  ro: 'Spaniolă',  pt: 'Espanhol' } },
  { code: 'de', flag: '🇩🇪', names: { fr: 'Allemand',  en: 'German',   es: 'Alemán',    de: 'Deutsch',     it: 'Tedesco',   ro: 'Germană',   pt: 'Alemão' } },
  { code: 'it', flag: '🇮🇹', names: { fr: 'Italien',   en: 'Italian',  es: 'Italiano',  de: 'Italienisch', it: 'Italiano',  ro: 'Italiană',  pt: 'Italiano' } },
  { code: 'ro', flag: '🇷🇴', names: { fr: 'Roumain',   en: 'Romanian', es: 'Rumano',    de: 'Rumänisch',   it: 'Rumeno',    ro: 'Română',    pt: 'Romeno' } },
  { code: 'pt', flag: '🇵🇹', names: { fr: 'Portugais', en: 'Portuguese', es: 'Portugués', de: 'Portugiesisch', it: 'Portoghese', ro: 'Portugheză', pt: 'Português' } },
];

const LANGUAGES: TargetLanguage[] = [
  { code: 'en', flag: '🇬🇧', names: { fr: 'Anglais',  en: 'English', es: 'Inglés',  de: 'Englisch', it: 'Inglese',  ro: 'Engleză',  pt: 'Inglês' } },
  { code: 'es', flag: '🇪🇸', names: { fr: 'Espagnol', en: 'Spanish', es: 'Español', de: 'Spanisch', it: 'Spagnolo', ro: 'Spaniolă', pt: 'Espanhol' } },
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
    return LANGUAGES.filter((l) => l.code !== userLang).map((l) => l.code);
  }

  listSourceLanguages(): SourceLangCode[] {
    return USER_LANGS.map((l) => l.code);
  }

  listActiveLanguages(activeCodes: TargetLangCode[], userLang: SourceLangCode): TargetLangCode[] {
    return this.listTargetLanguages(userLang).filter((code) => activeCodes.includes(code));
  }
}
