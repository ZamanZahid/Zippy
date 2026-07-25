export type ProviderId =
  | "spoo"
  | "tinyurl"
  | "lnkua"
  | "urlvanish"


export interface ProviderInfo {
  id: ProviderId;
  name: string;
  description: string;
  website: string;
  linkFormatExample: string;
}

export interface ShortenResult {
  provider: ProviderId;
  originalUrl: string;
  shortUrl: string;
  responseTimeMs: number;
  status: "success" | "error";
  error?: string;
}
