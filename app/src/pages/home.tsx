import CodeBlock from "@/components/code-block";
import { CubeIcon } from "@radix-ui/react-icons";

const GistDetailIntro = () => {
  return (
    <>
      <div className="text-center px-3">
        <p className="text-xl leading-9">
          Share and Collaborate on small pieces of information effortlessly.
        </p>
      </div>
    </>
  );
};

const GistHead = () => {
  return (
    <>
      <div className="pt-2 mb-3">
        <div className="px-3">
          <div className="mb-3">
            <h1 className="text-2xl align-middles">
              <CubeIcon className="inline mr-2 w-6 h-6" />
              Discover gists
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

const content = `const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
  return (
    <CBProvider>
      <div className="p-1 mx-auto max-w-3xl">
        <CodeBlockToolKit />
        <CodePreview content={content} />
      </div>
    </CBProvider>
  );
};
`;

const GistBody = () => {
  return (
    <div className="space-y-2">
      <CodeBlock content={content} />
    </div>
  );
};

const Home = () => {
  return (
    <main className="container min-h-screen dark:text-white">
      <div className="pt-6 pb-4">
        <GistDetailIntro />
        <GistHead />
        <GistBody />
      </div>
    </main>
  );
};

export default Home;
