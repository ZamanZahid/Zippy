import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";
const API_KEY = import.meta.env.VITE_TINYURL_API_KEY?.trim() ?? "";

export async function shorten(url: string): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers.Authorization = `Bearer ${API_KEY}`;
  }

  const { data } = await axios.post(
    CORS_PROXY + encodeURIComponent("https://api.tinyurl.com/create"),
    { url },
    { headers }
  );
  const shortUrl = data?.data?.tiny_url;
  if (!shortUrl) throw new Error("TinyURL returned no short URL");
  return shortUrl as string;
}
