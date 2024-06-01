import supabase from "@/supabase-client";
import { Session } from "@supabase/supabase-js";
import React from "react";

interface IAppContext {
  email: string;
  session: Session | null;
  signedIn: boolean;
}

interface IAppContextProvider {
  children: React.ReactNode;
}

const AppContext = React.createContext({} as IAppContext);

const AppContextProvider: React.FC<IAppContextProvider> = ({ children }) => {
  const [signedIn, setSignedIn] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [email, _setEmail] = React.useState<string>("");

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (session) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [session]);

  const value = { email, session, signedIn };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => React.useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
