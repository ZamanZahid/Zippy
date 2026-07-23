<div align="center">
  <h1>Zippy</h1>
</div>

I'm tired of these url shortner's that havent changed in soooo long, So I made a, "**Universal URL Shortener**". Paste a long URL and Zippy will shorten them using free shortening services, with no signup and no API key required.

## Features
- **Multiple Providers:** 4 different free URL shortening services.
- **Performance Tracking:** See the response time for each shortening request.
- **QR Code Generation:** Generate a QR code for any shortened link as a PNG.
- And much more

## Supported providers

| Provider | Signup required | API key required |
| [spoo.me](https://spoo.me) | No | No |
| [TinyURL](https://tinyurl.com) | No | No |
| [Lnk.ua](https://lnk.ua) | No | No |
| [URLVanish](https://urlvanish.com) | No | No |

Every provider is in its own file under `src/providers/`, so adding another service is a matter of dropping in a new file and registering it in `src/providers/registry.ts` and `src/services/shortenService.ts`.

## Installation

```bash
git clone https://github.com/zamanzahid/zippy.git
cd zippy
npm install
```

## Running locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build a production bundle:

```bash
npm run build
npm run preview
```


## Screenshots

<div align="center">
  <img src="/Zippy_Home_Page.png" alt="Zippy Home Page" style="width: 100%; max-width: 700px;"/>
</div>

## Author

Made by Zaman.