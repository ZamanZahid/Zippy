

import { FiGithub } from "react-icons/fi";

export function Footer() {
  return (
    <>
      <footer className="-mt-3">
        <div className="mx-auto max-w-6xl px-5 py-0">
          <div className="zip-stitch mb-4" />
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-2 font-display text-base font-semibold mt-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-white"></span>
                Zippy - <span className="font-sans text-sm text-ink-soft">Made with ❤️ by Zaman Zahid</span>
                <a
                  href="https://github.com/ZamanZahid"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 inline-flex items-center text-ink-soft hover:text-zip-blue transition"
                  aria-label="GitHub repository"
                >
                  <FiGithub size={16} />
                </a>
              </div>
            </div>
            <p className="mt-0 mb-4 max-w-sm text-sm text-ink-soft">
              Zippy is completely free, no account needed. Paste a URL, run it through one or multiple shortener providers at once, and pick whichever result you like best.
            </p>

          </div>
        </div>
      </footer>
      
    </>
  );
}