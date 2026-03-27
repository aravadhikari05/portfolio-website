import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Skills from "./Skills";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen w-full flex items-start justify-between gap-32 px-40 pt-32 pb-16"
    >
      <div className="flex flex-col gap-10 pt-6 min-w-10 flex-1">
        <div className="flex flex-col leading-none">
          <motion.span
            {...fadeUp(0.15)}
            className="text-8xl font-thin tracking-tight text-neutral-100"
          >
            ARAV
          </motion.span>
          <motion.span
            {...fadeUp(0.25)}
            className="text-8xl font-thin tracking-tight text-neutral-100"
          >
            ADHIKARI
          </motion.span>
        </div>

        <Skills />
      </div>

      <motion.div
        {...fadeUp(0.35)}
        className="max-w-md shrink-0 flex flex-col gap-4 pt-6"
      >
        <div className="flex flex-col gap-2">
          <span className="text-lg tracking-widest font-extralight text-neutral-300 uppercase whitespace-nowrap">
            About me
          </span>
          <div className="w-full h-px bg-neutral-800" />
        </div>

        <div className="text-md font-extralight leading-relaxed text-neutral-400 flex flex-col gap-4">
          <p>Hey! I'm a Computer Science student at UC Santa Cruz who loves building things that I can use.</p>
          <p>I built and launched a full e-commerce platform for collectibles, contributed to neuromorphic computing research at a UCSC lab, and spent time exploring everything from low-level graphics programming in C and OpenGL to AI-powered augmented reality.</p>
          <p>Outside of coding, you'll probably find me playing the bass, watching movies, or basking in the Santa Cruz sun.</p>
        </div>

        <Link
          to="/projects"
          className="mt-8 self-center px-4 py-2 text-sm font-extralight tracking-widest text-neutral-400 border border-neutral-700 rounded hover:text-neutral-100 hover:border-neutral-500 transition-colors duration-200 uppercase"
        >
          Projects →
        </Link>
      </motion.div>
    </section>
  );
}
