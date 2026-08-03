const providers = {
  spoo: async (url) => {
    const apiKey = process.env.VITE_SPOO_API_KEY || "";
    const response = await fetch("https://spoo.me/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ long_url: url }),
    });
    const data = await response.json();
    const shortUrl = data?.short_url;
    if (!shortUrl) throw new Error(data?.message || "spoo.me returned no short URL");
    return shortUrl;
  },
  tinyurl: async (url) => {
    const apiKey = process.env.VITE_TINYURL_API_KEY || "";
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    const shortUrl = data?.data?.tiny_url;
    if (!shortUrl) throw new Error(data?.errors?.[0]?.message || "TinyURL returned no short URL");
    return shortUrl;
  },
  lnkua: async (url) => {
    const apiKey = process.env.VITE_LNKUA_API_KEY || "";
    const response = await fetch("https://lnk.ua/api/v1/link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ link: url }),
    });
    const data = await response.json();
    const shortUrl = data?.result?.lnk;
    if (!shortUrl) throw new Error(data?.message || "lnk.ua returned no short URL");
    return shortUrl;
  },
  urlvanish: async (url) => {
    const apiKey = process.env.VITE_URLVANISH_API_KEY || "";
    const response = await fetch("https://urlvanish.com/create_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await response.json();
    if (data?.status === "error") throw new Error(data.message || "URLVanish returned an error");
    const shortUrl = data?.alias;
    if (!shortUrl) throw new Error("urlvanish.com returned no short URL");
    return shortUrl;
  },
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      request.on("data", (chunk) => { data += chunk; });
      request.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
      request.on("error", reject);
    });

    const { provider, url } = body;
    if (!provider || typeof provider !== "string") {
      throw new Error("Missing provider");
    }
    if (!url || typeof url !== "string") {
      throw new Error("Missing url");
    }
    if (!providers[provider]) {
      throw new Error("Unsupported provider");
    }

    const shortUrl = await providers[provider](url);
    response.status(200).json({ shortUrl });
  } catch (error) {
    response.status(500).json({ error: error?.message || "Internal server error" });
  }
}
