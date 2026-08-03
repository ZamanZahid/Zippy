import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface QRCodeModalProps {
  url: string | null;
  onClose: () => void;
}

export function QRCodeModal({ url, onClose }: QRCodeModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "zippy-qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="QR code for shortened link"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-2xl border border-line bg-surface p-6 text-center shadow-lift dark:border-line-dark dark:bg-surface-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">Scan to open</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper dark:text-ink-soft-dark dark:hover:bg-paper-dark"
              >
                <FiX size={16} />
              </button>
            </div>
            <div ref={wrapperRef} className="mx-auto flex w-fit items-center justify-center rounded-xl bg-white p-4">
              <QRCodeCanvas value={url} size={180} level="M" />
            </div>
            <p className="mt-3 truncate font-mono text-xs text-ink-soft dark:text-ink-soft-dark">{url}</p>
            <button
              onClick={handleDownload}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zip-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <FiDownload size={15} /> Download PNG
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
