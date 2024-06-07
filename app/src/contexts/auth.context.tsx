import React from "react";
import { useAppContext } from "./app.context";
import supabase from "@/supabase-client";
import useDebouncedCallback from "@/hooks/use-debounce-callback";

interface IUser {
  id: string;
  username: string;
  dp_url?: string;
  name: string;
}

interface IAuthContext {
  user: IUser | null;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

const AuthContext = React.createContext({} as IAuthContext);

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const { session } = useAppContext();

  const fetchUser = async () => {
    const { error, data } = await supabase.auth.getUser();

    if (error) {
      setUser(null);
      return;
    } else {
      const query = await supabase
        .from("users")
        .select()
        .eq("auth_user_id", data.user.id);
      if (query.error || query.data.length == 0) {
        setUser(null);
      } else {
        setUser(query.data[0]);
      }
    }
  };

  const debounceFetchUser = useDebouncedCallback(fetchUser, 500);

  React.useEffect(() => {
    if (session) {
      debounceFetchUser();
    } else {
      setUser(null);
    }
  }, [session]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => React.useContext(AuthContext);

export { AuthContext as default, AuthContextProvider, useAuthContext };
