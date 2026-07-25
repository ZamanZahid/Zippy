import type { ProviderId, ShortenResult } from "./types";
import { shorten as spoo } from "../providers/spoo";
import { shorten as tinyurl } from "../providers/tinyurl";
import { shorten as lnkua } from "../providers/lnkua";
import { shorten as urlvanish } from "../providers/urlvanish";


const SHORTENERS: Record<ProviderId, (url: string) => Promise<string>> = {
  spoo,
  tinyurl,
  lnkua,
  urlvanish,

};

export async function shortenWithProvider(
  provider: ProviderId,
  originalUrl: string
): Promise<ShortenResult> {
  const start = performance.now();
  try {
    const shortUrl = await SHORTENERS[provider](originalUrl);
    return {
      provider,
      originalUrl,
      shortUrl,
      responseTimeMs: Math.round(performance.now() - start),
      status: "success",
    };
  } catch (err) {
    return {
      provider,
      originalUrl,
      shortUrl: "",
      responseTimeMs: Math.round(performance.now() - start),
      status: "error",
      error: err instanceof Error ? err.message : "Request failed",
    };
  }
}

export async function shortenWithAllProviders(
  originalUrl: string,
  providers: ProviderId[]
): Promise<ShortenResult[]> {
  return Promise.all(providers.map((p) => shortenWithProvider(p, originalUrl)));
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
