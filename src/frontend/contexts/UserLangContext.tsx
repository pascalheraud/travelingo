import { createContext, useContext, useState, type ReactNode } from "react";
import type { SourceLangCode } from "@/models";

const DEFAULT_USER_LANG: SourceLangCode = "fr";

interface UserLangContextValue {
  userLang: SourceLangCode;
  setUserLang: (lang: SourceLangCode) => void;
}

const UserLangContext = createContext<UserLangContextValue>({
  userLang: DEFAULT_USER_LANG,
  setUserLang: () => undefined,
});

export function UserLangProvider({ children }: { children: ReactNode }) {
  const [userLang, setUserLangState] = useState<SourceLangCode>(() => {
    return (
      (localStorage.getItem("userLang") as SourceLangCode) ?? DEFAULT_USER_LANG
    );
  });

  function setUserLang(lang: SourceLangCode) {
    localStorage.setItem("userLang", lang);
    setUserLangState(lang);
  }

  return (
    <UserLangContext.Provider value={{ userLang, setUserLang }}>
      {children}
    </UserLangContext.Provider>
  );
}

export function useUserLang() {
  return useContext(UserLangContext);
}

export { UserLangContext };
