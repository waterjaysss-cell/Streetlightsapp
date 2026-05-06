"use client";

import { useState } from "react";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({
  value,
  label = "Copy",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* swallow */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy ${value}`}
      className={`inline-flex items-center justify-center px-7 sm:px-9 h-14 text-sm uppercase tracking-[0.22em] font-medium select-none border border-bone text-bone hover:bg-bone hover:text-night transition-colors duration-200 ${className}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
