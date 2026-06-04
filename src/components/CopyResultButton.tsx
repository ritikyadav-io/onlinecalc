import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface Props {
  text: string;
  shareTitle?: string;
}

const CopyResultButton = ({ text, shareTitle = "My result" }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* noop */ }
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareTitle, text }); } catch { /* noop */ }
    } else {
      copy();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/40 text-xs font-medium text-foreground transition"
        aria-label="Copy result"
      >
        {copied ? <Check size={14} className="text-safe" /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/40 text-xs font-medium text-foreground transition"
        aria-label="Share result"
      >
        <Share2 size={14} />
        Share
      </button>
    </div>
  );
};

export default CopyResultButton;
