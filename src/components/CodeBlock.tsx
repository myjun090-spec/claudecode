"use client";

import { useState } from "react";

export default function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = children.replace(/^\$ /gm, "");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3">
      {title && (
        <div className="text-xs font-semibold text-gray-500 mb-1 px-1">
          {title}
        </div>
      )}
      <div className="code-block">
        <button onClick={handleCopy} className="copy-btn">
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="whitespace-pre-wrap">{children}</pre>
      </div>
    </div>
  );
}
