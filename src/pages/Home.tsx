import { useState } from "react";
import toast from "react-hot-toast";
import { Hero } from "../ui/Hero";
import { UrlForm } from "../ui/UrlForm";
import { UrlCard } from "../ui/UrlCard";
import { ResultSkeleton } from "../ui/ResultSkeleton";
import { QRCodeModal } from "../ui/QRCodeModal";
import type { ProviderId, ShortenResult } from "../pages/types";
import { PROVIDERS } from "../providers/registry";
import { shortenWithProvider } from "../pages/shortenService";

export function Home() {
  const [provider, setProvider] = useState<ProviderId>("spoo");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ShortenResult[]>([]);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const handleSubmit = async (urls: string[], shortenAll: boolean) => {
    setLoading(true);
    setResults([]);
    try {
      let all: ShortenResult[];
      if (shortenAll) {
        const providerIds = Object.keys(PROVIDERS) as ProviderId[];
        all = (await Promise.all(
          urls.flatMap((url) =>
            providerIds.map((pid) => shortenWithProvider(pid, url))
          )
        )).flat();
      } else {
        all = await Promise.all(urls.map((u) => shortenWithProvider(provider, u)));
      }
      setResults(all);
      const successes = all.filter((r) => r.status === "success").length;
      const failures = all.length - successes;
      if (!successes) toast.error("Couldn't shorten that link.");
      else if (failures) toast.success(`Shortened ${successes}/${all.length} links.`);
      else toast.success("Shortened!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-5 pt-10 pb-8">
      <div className="w-full max-w-4xl space-y-2">
        <Hero />

        <div className="mx-auto w-full max-w-2xl space-y-4">
          <UrlForm
            provider={provider}
            onProviderChange={setProvider}
            loading={loading}
            onSubmit={handleSubmit}
          />

          <p className="mx-auto mt-1 max-w-lg text-balance text-base text-ink-soft text-center">
            No sign-up · No rate limits · 4 providers supported
          </p>
          {loading && <ResultSkeleton />}
          {!loading && results.map((r, i) => (
            <UrlCard key={`${r.provider}-${i}`} result={r} onShowQr={setQrUrl} />
          ))}
        </div>
      </div>
      <QRCodeModal url={qrUrl} onClose={() => setQrUrl(null)} />
    </div>
  );
}
