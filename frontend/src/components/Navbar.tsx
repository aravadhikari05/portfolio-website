import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", to: "/home" },
  { label: "PROJECTS", to: "/projects" },
  { label: "BLOG", to: "/blog" },
] as const;

export default function Navbar() {
  const controls = useAnimation();
  const lastY = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } });
    setVisible(true);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (delta > 4 && currentY > 60) {
        controls.start({ y: "-200%", transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } });
        setVisible(false);
      } else if (delta < -4) {
        controls.start({ y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } });
        setVisible(true);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={controls}
      className="fixed top-0 inset-x-0 z-50 bg-neutral-950 py-2"
      style={{ willChange: "transform" }}
    >
      <nav className="w-full flex items-center justify-between">
        <ul className="flex items-center gap-8 pl-10">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <NavLink label={label} to={to} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 pr-8">
          <IconLink
            href="https://linkedin.com/in/arav-adhikari"
            aria-label="LinkedIn"
            icon={<Linkedin size={16} strokeWidth={1.5} />}
          />
          <IconLink
            href="https://github.com/aravadhikari05"
            aria-label="GitHub"
            icon={<Github size={16} strokeWidth={1.5} />}
          />
        </div>
      </nav>

      <motion.div
        className="absolute bottom-0 inset-x-0 h-px bg-neutral-800"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.header>
  );
}

function NavLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="relative py-1.5 text-sm font-thin tracking-widest text-neutral-500 transition-colors duration-200 hover:text-neutral-100"
    >
      {label}
    </Link>
  );
}

function IconLink({
  href,
  "aria-label": ariaLabel,
  icon,
}: {
  href: string;
  "aria-label": string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex items-center justify-center w-8 h-8 rounded-md text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
    >
      {icon}
    </motion.a>
  );
}
