import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface AppContextData {
  emailLogin: string;
  emailSingUp: string;
  setEmailSingUp: (val: string) => void;
  setEmailLogin: (val: string) => void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function AppProvider({ children }: PropsWithChildren) {
  const [emailLogin, setEmailLogin] = useState("");
  const [emailSingUp, setEmailSingUp] = useState("");

  return (
    <AppContext.Provider
      value={{ emailSingUp, emailLogin, setEmailSingUp, setEmailLogin }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};

export { AppProvider, useAppContext };
