import type { TargetLangCode } from '@/models';

const STORAGE_KEY = 'activeLangs';

export class ActiveLangsService {
  load(): TargetLangCode[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  add(langs: TargetLangCode[], lang: TargetLangCode): TargetLangCode[] {
    if (langs.includes(lang)) return langs;
    const next = [...langs, lang];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  remove(langs: TargetLangCode[], lang: TargetLangCode): TargetLangCode[] {
    const next = langs.filter((l) => l !== lang);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }
}
