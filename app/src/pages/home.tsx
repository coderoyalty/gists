import GistForm from "@/components/gists/gist-form";
import { useAppContext } from "@/contexts/app.context";

const GistBody = () => {
  return (
    <div className="space-y-2">
      <GistForm />
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <section className="relative min-h-screen grid place-content-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="max-w-3xl bg-gradient-to-br dark:from-white from-black to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            Effortlessly Share Ideas, Notes and Snippets
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            similar to a forum, but more informal.
          </p>
        </div>
      </section>
    </>
  );
};

const Home = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <main className="container min-h-screen dark:text-white">
      <div className="pt-6 pb-4">
        {isAuthenticated === false ? <LandingPage /> : <GistBody />}
      </div>
    </main>
  );
};

export { Home as default };
