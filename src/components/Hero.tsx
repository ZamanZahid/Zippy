import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl flex-col justify-center px-5 py-10 text-center md:py-16">


      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
      >
        Zip your links <br /> <span className="text-zip-blue">down to size.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="mx-auto mt-4 max-w-lg text-balance text-base text-ink-soft dark:text-ink-soft-dark"
      >
        Paste one long URL, run it through every provider at once, and keep whichever
        result is shortest, fastest, or just your favorite.
      </motion.p>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-5"
      >
        <ZipCompressAnimation />
      </motion.div>

    </section>
  );
}

/** Signature moment: a long URL visually zips shut into a short pill. */
function ZipCompressAnimation() {
  return (
    <div className="relative mx-auto flex h-12 max-w-md items-center justify-center">
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.55, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="whitespace-nowrap rounded-xl border border-line bg-surface px-4 py-2 font-mono text-[11px] text-ink-soft dark:border-line-dark dark:bg-surface-dark dark:text-ink-soft-dark sm:text-xs">
            https://example.com/products/summer-collection?ref=newsletter&id=48213
          </span>
        </motion.div>
  );
}
