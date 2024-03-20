import React from "react";
import { Toggle } from "./ui/toggle";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "./ui/skeleton";

interface CBDataProps {
  enableWordWrap: boolean;
}

interface CodeBlockContextProps {
  data: CBDataProps;

  setData: React.Dispatch<React.SetStateAction<CBDataProps>>;
}

interface CodeBlockProps {
  content: string;
}

const Context = React.createContext<CodeBlockContextProps>(null!);

interface ICodeBlockProvider {
  children: React.ReactNode;
}

const CBProvider: React.FC<ICodeBlockProvider> = ({ children }) => {
  const [data, setData] = React.useState<CBDataProps>({
    enableWordWrap: false,
  });

  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};

const useCBContext = () => {
  return React.useContext(Context);
};

const CodeBlockToolKit = () => {
  const { data, setData } = useCBContext();

  return (
    <>
      <div className=" p-1 bg-[#f8fafc] dark:bg-[#161b22] flex items-center">
        <div className="flex-auto">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Toggle
          variant="outline"
          size="sm"
          pressed={data.enableWordWrap}
          onPressedChange={(pressed) => {
            setData({ ...data, enableWordWrap: pressed });
          }}
        >
          Wrap
        </Toggle>
      </div>
    </>
  );
};

const CodePreview = ({ content }: { content: string }) => {
  const { data } = useCBContext();
  const lines = content.split("\n").splice(0, 10);

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto break-words">
        <div>
          <table className="text-sm">
            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                  <td
                    data-line-number={index + 1}
                    className="mr-2 min-w-[25px] before:content-[attr(data-line-number)] text-right select-none align-top break-words p-0"
                  ></td>
                  <td
                    className={twMerge(
                      "font-mono p-0 px-3",
                      data.enableWordWrap
                        ? "whitespace-pre-wrap"
                        : "whitespace-pre"
                    )}
                  >
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
  return (
    <CBProvider>
      <div className="p-1 mx-auto max-w-3xl border">
        <CodeBlockToolKit />
        <CodePreview content={content} />
      </div>
    </CBProvider>
  );
};

export default CodeBlock;
