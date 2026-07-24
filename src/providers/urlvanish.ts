import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";
const API_KEY = import.meta.env.VITE_URLVANISH_API_KEY;

export async function shorten(url: string): Promise<string> {
  const urlVanishApiUrl = "https://urlvanish.com/create_api.php";

  const { data } = await axios.post(
    CORS_PROXY + encodeURIComponent(urlVanishApiUrl),
    { originalUrl: url },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (data?.status === "error") throw new Error(data.message);
  if (!data?.alias) throw new Error("urlvanish.com returned no short URL");
  return data.alias as string;
}
