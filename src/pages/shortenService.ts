import type { ProviderId, ShortenResult } from "./types";

export async function shortenWithProvider(
  provider: ProviderId,
  originalUrl: string
): Promise<ShortenResult> {
  const start = performance.now();
  try {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, url: originalUrl }),
    });

    const body = await response.json();
    if (!response.ok) {
      throw new Error(body?.error || body?.message || response.statusText);
    }

    return {
      provider,
      originalUrl,
      shortUrl: body.shortUrl,
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
