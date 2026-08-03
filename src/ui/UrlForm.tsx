import { useState, type FormEvent, type KeyboardEvent } from "react";
import { FiLink, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import type { ProviderId } from "../pages/types";
import { ProviderSelector } from "./ProviderSelector";
import { isValidUrl } from "../pages/shortenService";

interface UrlFormProps {
  provider: ProviderId;
  onProviderChange: (id: ProviderId) => void;
  loading: boolean;
  onSubmit: (urls: string[], shortenAll: boolean) => void;
}

export function UrlForm({
  provider,
  onProviderChange,
  loading,
  onSubmit,
}: UrlFormProps) {
  const [singleValue, setSingleValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = singleValue.trim();

    if (!url) {
      toast.error("Paste a URL to get started.");
      return;
    }
    if (!isValidUrl(url)) {
      toast.error("That doesn't look like a valid URL.");
      return;
    }
    onSubmit([url], false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div
        className="rounded-2xl border bg-surface p-2 shadow-soft transition border-line"
      >
          <div className="flex items-center gap-2 px-2">
            <FiLink className="ml-1 shrink-0 text-ink-soft" size={18} />
            <input
              type="text"
              inputMode="url"
              value={singleValue}
              onChange={(e) => setSingleValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste a long URL — e.g. https://example.com/very/long/path"
              className="h-12 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-soft"
            />
          </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-2 pt-2 pb-2">
          <div className="flex items-center gap-2">
            <ProviderSelector value={provider} onChange={onProviderChange} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-zip-blue px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <><FiLoader className="animate-spin" size={15} /> Shortening...</>
              ) : (
                "Shorten it"
              )}
            </button>
            <button
              type="button"
              onClick={() => onSubmit([singleValue], true)}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border-2 border-zip-blue bg-transparent px-5 py-2.5 text-sm font-semibold text-zip-blue shadow-soft transition hover:bg-zip-blue/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiLink size={15} /> All at once
            </button>

          </div>
        </div>


      </div>
    </form>
  );
}


