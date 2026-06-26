import { createContext, useContext, type ReactNode } from 'react';
import type { AppManifest } from '@/models';
import { LEARNING_LANGUAGES, USER_LANGUAGES } from '@/languages';

const STUB_MANIFEST: AppManifest = {
  appVersion: 'a1',
  uiPackRefs: USER_LANGUAGES,
  learningPacks: LEARNING_LANGUAGES,
};

interface ManifestContextValue {
  manifest: AppManifest;
}

const ManifestContext = createContext<ManifestContextValue>({ manifest: STUB_MANIFEST });

export function ManifestProvider({ children }: { children: ReactNode }) {
  return (
    <ManifestContext.Provider value={{ manifest: STUB_MANIFEST }}>
      {children}
    </ManifestContext.Provider>
  );
}

export function useManifestContext() {
  return useContext(ManifestContext);
}

export { ManifestContext };
