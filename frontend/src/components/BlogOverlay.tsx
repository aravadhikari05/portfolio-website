import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BlogOverlay({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="blog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-950"
        >
          <div className="flex flex-col items-center gap-6 select-none">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(3rem,10vw,8rem)] font-thin tracking-tight text-neutral-100 leading-none"
            >
              COMING
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(3rem,10vw,8rem)] font-thin tracking-tight text-neutral-100 leading-none"
            >
              SOON
            </motion.span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="text-xs tracking-widest text-neutral-600 uppercase mt-4"
            >
              click anywhere to close
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
