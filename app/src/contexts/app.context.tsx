import supabase from "@/supabase-client";
import { Session } from "@supabase/supabase-js";
import React from "react";
import { AuthContextProvider } from "./auth.context";

interface IAppContext {
  email: string;
  session: Session | null;
  isAuthenticated: boolean;
}

interface IAppContextProvider {
  children: React.ReactNode;
}

const AppContext = React.createContext({} as IAppContext);

const AppContextProvider: React.FC<IAppContextProvider> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [email, _setEmail] = React.useState<string>("");

  React.useLayoutEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setAuthenticated(session ? true : false);
      })
      .catch(() => {
        setSession(null);
        setAuthenticated(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthenticated(session ? true : false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = { email, session, isAuthenticated };

  return (
    <AppContext.Provider value={value}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
