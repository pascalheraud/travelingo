import type { LearningPackRef, UiPackRefs } from "@/models";

/** Learning languages: target language packs and their current version, per `doc/initial-spec.md` §5.4. */
export const LEARNING_LANGUAGES: LearningPackRef[] = [
  {
    targetLang: "en",
    version: "v1",
    uuid: "en-v1",
    lessons: 10,
    phrases: 100,
    translationPacks: {
      fr: "v1",
      es: "v1",
      de: "v1",
      it: "v1",
      ro: "v1",
      pt: "v1",
    },
  },
  {
    targetLang: "es",
    version: "v1",
    uuid: "es-v1",
    lessons: 10,
    phrases: 100,
    translationPacks: { fr: "v1", en: "v1", de: "v1", it: "v1", ro: "v1", pt: "v1" },
  },
];

/** User languages: current UI strings translation pack version per source language, per `doc/initial-spec.md` §5.4. */
export const USER_LANGUAGES: UiPackRefs = {
  fr: "v1",
  en: "v1",
  es: "v1",
  de: "v1",
  it: "v1",
  ro: "v1",
  pt: "v1",
};
