"use client";
import { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js";

export function Pre({ children, ...props }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  useEffect(() => {
    if (preRef.current) {
      // Find the inner <code> block and highlight it
      const codeBlock = preRef.current.querySelector("code");
      if (codeBlock && !codeBlock.dataset.highlighted) {
        hljs.highlightElement(codeBlock);
      }
    }
  }, [children]);

  const handleCopy = () => {
    if (preRef.current) {
      const code = preRef.current.innerText;
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="docs-pre-wrapper relative group mt-3">
      <button 
        className="docs-copy-btn" 
        onClick={handleCopy} 
        aria-label="Copy code"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        {copied ? <span className="ml-1 text-xs">Copied</span> : <span className="ml-1 text-xs">Copy</span>}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
