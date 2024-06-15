import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MDRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MDRendererProps> = ({
  content,
  className = "",
}) => {
  return (
    <Markdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-xl font-bold mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-lg font-semibold mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className=" text-base font-medium mb-2" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-medium mb-2" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-sm font-medium mb-2" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-sm font-medium mb-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 text-sm leading-7 font-normal" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4 mx-auto max-w-[80%] max-md:max-w-full"
            {...props}
          />
        ),
        pre: ({ node, ...props }) => (
          <pre className="dark:bg-gray-700/20 bg-black/10 p-3 text-base font-mono rounded-md mb-4 mx-auto max-w-[80%] max-md:max-w-full overflow-auto">
            <code {...props} className="font-normal" />
          </pre>
        ),
        table: ({ node, ...props }) => (
          <table className="table-auto w-full mb-4" {...props} />
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-200" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="bg-white" {...props} />
        ),
        tr: ({ node, ...props }) => <tr className="border-b" {...props} />,
        th: ({ node, ...props }) => <th className="px-4 py-2" {...props} />,
        td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
