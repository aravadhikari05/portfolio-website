import { motion } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

export default function Blog() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center">
      <motion.span
        {...fadeUp(0.1)}
        className="text-[clamp(3rem,10vw,8rem)] font-thin tracking-tight text-neutral-100 leading-none"
      >
        COMING
      </motion.span>
      <motion.span
        {...fadeUp(0.2)}
        className="text-[clamp(3rem,10vw,8rem)] font-thin tracking-tight text-neutral-100 leading-none"
      >
        SOON
      </motion.span>
      <motion.p
        {...fadeUp(0.4)}
        className="text-xs tracking-widest text-neutral-600 uppercase mt-8"
      >
        check back later
      </motion.p>
    </section>
  );
}
