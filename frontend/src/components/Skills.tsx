import { motion } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

const LANGUAGES = [
  "Python", "TypeScript", "JavaScript", "C / C++",
  "Java", "SQL", "Redux", "GraphQL", "WebSockets",
  "Git / GitHub", "Linux",
];

const TOOLS = [
  "React", "Node.js", "Next.js",
  "FastAPI", "PostgreSQL", "Docker",
  "AWS", "Terraform", "Redis", "PyTorch",
  "OpenGL", "Playwright", "Github Actions",
];

function SkillTag({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      {...fadeUp(delay)}
      className="px-3 py-1.5 text-xs font-extralight tracking-wide border border-neutral-700 text-neutral-400 rounded whitespace-nowrap"
    >
      {label}
    </motion.span>
  );
}

function SkillRow({
  title,
  items,
  baseDelay,
}: {
  title: string;
  items: string[];
  baseDelay: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <motion.span
        {...fadeUp(baseDelay)}
        className="text-md font-extralight tracking-widest text-neutral-500 uppercase"
      >
        {title}
      </motion.span>
      <div className="flex flex-row flex-wrap gap-2">
        {items.map((item, i) => (
          <SkillTag key={item} label={item} delay={baseDelay + 0.04 * i} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="flex flex-col gap-8">
      <SkillRow title="Languages" items={LANGUAGES} baseDelay={0.1} />
      <SkillRow title="Tools" items={TOOLS} baseDelay={0.2} />
    </div>
  );
}
