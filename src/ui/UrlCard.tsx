import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import type { ShortenResult } from "../pages/types";
import { PROVIDERS } from "../providers/registry";
import { PROVIDER_ACCENT } from "../pages/providerStyle";
import { LinkActions } from "./LinkActions";
import { truncateMiddle } from "../pages/format";

interface UrlCardProps {
  result: ShortenResult;
  onShowQr: (url: string) => void;
}

export function UrlCard({ result, onShowQr }: UrlCardProps) {
  const provider = PROVIDERS[result.provider];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-6 max-w-2xl rounded-2xl border border-line bg-surface p-5 shadow-soft"
    >
      {result.status === "error" ? (
        <div className="flex items-start gap-3 text-zip-red">
          <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="text-sm font-medium">{provider.name} couldn't shorten that link.</p>
            <p className="mt-0.5 text-xs text-ink-soft">{result.error}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: PROVIDER_ACCENT[result.provider] }}
              />
              <span className="text-xs font-medium text-ink-soft">
                {provider.name} · {result.responseTimeMs}ms
              </span>
            </div>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate font-mono text-lg font-semibold text-zip-blue hover:underline"
            >
              {result.shortUrl}
            </a>
            <p className="mt-0.5 truncate text-xs text-ink-soft">
              {truncateMiddle(result.originalUrl, 60)}
            </p>
          </div>
          <LinkActions shortUrl={result.shortUrl} onShowQr={onShowQr} />
        </div>
      )}
    </motion.div>
  );
}
