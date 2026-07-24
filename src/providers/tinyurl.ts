import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";
const API_KEY = import.meta.env.VITE_TINYURL_API_KEY;

export async function shorten(url: string): Promise<string> {
  const { data } = await axios.post(
    CORS_PROXY + encodeURIComponent("https://api.tinyurl.com/create"),
    { url },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const shortUrl = data?.data?.tiny_url;
  if (!shortUrl) throw new Error("TinyURL returned no short URL");
  return shortUrl as string;
}
