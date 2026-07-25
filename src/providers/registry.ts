import type { ProviderInfo, ProviderId } from "../pages/types";

export const PROVIDERS: Record<ProviderId, ProviderInfo> = {
  spoo: {
    id: "spoo",
    name: "spoo.me",
    description: "A privacy-respecting shortener with built-in click analytics and optional password protection.",
    website: "https://spoo.me",
    linkFormatExample: "spoo.me/aB3xZ9",
  },
  tinyurl: {
    id: "tinyurl",
    name: "TinyURL",
    description: "One of the oldest and most widely recognized link shorteners on the web, known for reliability.",
    website: "https://tinyurl.com",
    linkFormatExample: "tinyurl.com/2p8x9k3f",
  },
  lnkua: {
    id: "lnkua",
    name: "Lnk.ua",
    description: "A Ukrainian link shortener with public access for shortening links.",
    website: "https://lnk.ua",
    linkFormatExample: "lnk.ua/bMen0KNgd",
  },
  urlvanish: {
    id: "urlvanish",
    name: "URLVanish",
    description: "A privacy-focused URL shortener with optional API key authentication.",
    website: "https://urlvanish.com",
    linkFormatExample: "urlvanish.com/my-custom-link",
  },

};

export const PROVIDER_LIST: ProviderInfo[] = Object.values(PROVIDERS);
