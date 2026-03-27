import { motion } from "motion/react";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  index,
}: ProjectCardProps) {
  const imageRight = index % 2 === 0;
  const ease = [0.25, 0.1, 0.25, 1] as const;
  const viewportOpts = { once: true, margin: "-80px" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      viewport={viewportOpts}
      className={`flex gap-12 py-14 border-b border-neutral-800 last:border-b-0 ${
        imageRight ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: imageRight ? -28 : 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        viewport={viewportOpts}
        className="flex-1 flex flex-col gap-4 justify-center"
      >
        <h3 className="text-2xl font-thin tracking-tight text-neutral-100">
          {title}
        </h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          viewport={viewportOpts}
          className="text-sm font-extralight leading-relaxed text-neutral-400"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          viewport={viewportOpts}
          className="flex flex-wrap gap-2 mt-1"
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-extralight tracking-wide border border-neutral-700 text-neutral-500 rounded"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: imageRight ? 28 : -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        viewport={viewportOpts}
        className="w-[420px] shrink-0"
      >
        <img
          src={image}
          alt={title}
          className="w-full rounded border border-neutral-800 object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
