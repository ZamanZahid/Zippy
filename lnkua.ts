import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";
const API_KEY = import.meta.env.VITE_LNKUA_API_KEY;

export async function shorten(url: string): Promise<string> {
  const lnkUaUrl = "https://lnk.ua/api/v1/link/create";

  const { data } = await axios.post(
    CORS_PROXY + encodeURIComponent(lnkUaUrl),
    { link: url },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!data?.result?.lnk) throw new Error("lnk.ua returned no short URL");
  return data.result.lnk as string;
}
