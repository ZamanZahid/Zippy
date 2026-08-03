import { useState } from "react";
import { FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import toast from "react-hot-toast";

interface LinkActionsProps {
  shortUrl: string;
  onShowQr?: (url: string) => void;
  size?: "sm" | "md";
}

export function LinkActions({ shortUrl, onShowQr, size = "md" }: LinkActionsProps) {
  const [copied, setCopied] = useState(false);
  const iconSize = size === "sm" ? 14 : 15;
  const btnClass =
    size === "sm"
      ? "flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:border-zip-blue hover:text-zip-blue"
      : "flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:border-zip-blue hover:text-zip-blue";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy — copy it manually.");
    }
  };


  return (
    <div className="flex items-center gap-1.5">
      <button onClick={handleCopy} aria-label="Copy short URL" className={btnClass}>
        {copied ? <FiCheck size={iconSize} className="text-zip-green" /> : <FiCopy size={iconSize} />}
      </button>
      <a href={shortUrl} target="_blank" rel="noreferrer" aria-label="Open short URL" className={btnClass}>
        <FiExternalLink size={iconSize} />
      </a>
      {onShowQr && (
        <button onClick={() => onShowQr(shortUrl)} aria-label="Show QR code" className={btnClass}>
          <BsQrCode size={iconSize} />
        </button>
      )}

    </div>
  );
}
