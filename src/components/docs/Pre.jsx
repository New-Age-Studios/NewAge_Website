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
        className="absolute top-3 right-3 flex flex-row items-center justify-center gap-1.5 px-2.5 py-1.5 bg-[#27272a]/80 backdrop-blur-sm hover:bg-[#3f3f46] text-[#a1a1aa] hover:text-white rounded-md border border-white/5 transition-all opacity-0 group-hover:opacity-100 z-10 shadow-sm" 
        onClick={handleCopy} 
        aria-label="Copy code"
      >
        {copied ? <Check size={14} className="text-[#ff5100]" /> : <Copy size={14} />}
        <span className="text-[11px] font-bold uppercase tracking-wider mt-[1px]">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
