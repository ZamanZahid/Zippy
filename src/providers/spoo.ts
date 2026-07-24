import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";


const API_KEY = import.meta.env.VITE_SPOO_API_KEY;

export async function shorten(url: string): Promise<string> {
  const { data } = await axios.post(
    CORS_PROXY + encodeURIComponent("https://spoo.me/api/v1/shorten"),
    { long_url: url },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const shortUrl = data?.short_url;
  if (!shortUrl) throw new Error("spoo.me returned no short URL");
  return shortUrl as string;
}
