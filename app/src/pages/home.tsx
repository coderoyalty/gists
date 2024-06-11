import GistForm from "@/components/gists/gist-form";
import { useAppContext } from "@/contexts/app.context";
import useDebounce from "@/hooks/use-debounce";
import React from "react";
import { useNavigate } from "react-router";

const GistBody = () => {
  return (
    <div className="space-y-2">
      <GistForm />
    </div>
  );
};

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const debounceLoggedIn = useDebounce(isAuthenticated, 1000);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!debounceLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <main className="container min-h-screen dark:text-white">
      <div className="pt-6 pb-4">
        <GistBody />
      </div>
    </main>
  );
};

export { Home as default };
