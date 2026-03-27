import { motion } from "motion/react";
import ProjectCard from "../components/ProjectCard";

const PROJECTS = [
  {
    title: "Milio",
    description:
      "A full-stack e-commerce platform for buying, selling, and trading collectibles. Features real-time inventory management, secure checkout with Stripe, and a personalized recommendation engine that surfaces items based on browsing history.",
    technologies: ["Next.js", "React", "Supabase (PostgreSQL)", "Stripe", "Shippo", "Vercel" ],
    image: "/milio.png",
  },
  {
    title: "Lexter",
    description:
      "An orchestrated LLM stack for creating and verifying Bluebook-ready legal citations. Rules are RAG’d, structured fields are extracted from natural-language input, and missing details are filled in by looking up authoritative sources without LLM hallucination. Hosted on a DigitalOcean VPS.",
    technologies: ["React", "FastAPI (Python)", "OpenRouter", "DigitalOcean Droplets"],
    image: "/lexter.png",
  },
  {
    title: "Causal Key-Value Store",
    description:
      "A distributed, sharded key-value store built from scratch to demonstrate causal consistency using vector clocks and gossip-based replication. Supports dynamic resharding, node failures, and key migration, with an interactive CLI simulator for visualizing how the system behaves in real time.",
    technologies: ["Python", "Distributed Systems"],
    image: "/causal-kv-store.png",
  }
];

export default function Projects() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center px-40 pt-36 pb-24">
      <div className="w-full max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.05 }}
          className="text-7xl font-thin tracking-tight text-neutral-100 leading-none mb-8"
        >
          PROJECTS
        </motion.h1>

        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
