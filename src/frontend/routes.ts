import type { TargetLangCode, LessonId } from '@/models';

export const ROUTES = {
  dashboard:   '/',
  addLang:     '/add-lang',
  packManager: '/packs',
  about:       '/about',
} as const;

/** Static (parameter-free) route paths */
export type StaticRoute = typeof ROUTES[keyof typeof ROUTES];

/** Route patterns that need a literal in <Route path> (React Router needs the pattern, not a value) */
export const ROUTE_PATTERNS = {
  langHome: '/lang/:code',
  lesson:   '/lang/:code/lesson/:lessonId',
} as const;

export const buildRoute = {
  langHome: (code: TargetLangCode): `/lang/${string}` => `/lang/${code}`,
  lesson: (code: TargetLangCode, lessonId: LessonId): `/lang/${string}/lesson/${string}` => `/lang/${code}/lesson/${lessonId}`,
} as const;

type BuiltRoute = ReturnType<typeof buildRoute[keyof typeof buildRoute]>;

/** Every path the app can navigate to — static or built */
export type AppRoute = StaticRoute | BuiltRoute;
