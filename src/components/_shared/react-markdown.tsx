import React from "react";
import ReactMarkdown from "react-markdown";
interface ReactMarkdownProps {
  children: string;
}

export default function MarkdownPage({ children }: ReactMarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,

        a: (props) => (
          <a className="text-green-500 underline" {...props} target="_blank" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
