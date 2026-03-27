import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-10 py-24">
      <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 mb-4">
        Error
      </span>
      <h1 className="text-[clamp(4rem,12vw,9rem)] font-thin tracking-tight text-neutral-100 leading-none">
        404
      </h1>
      <p className="mt-5 text-sm font-extralight text-neutral-500 max-w-xs text-center leading-relaxed">
        This page doesn’t exist. The link may be broken or the URL was mistyped.
      </p>
      <Link
        to="/home"
        className="mt-10 inline-block px-4 py-2 text-[11px] font-extralight tracking-[0.2em] uppercase text-neutral-500 border border-neutral-700 rounded hover:text-neutral-100 hover:border-neutral-500 transition-colors duration-200"
      >
        Back home
      </Link>
    </main>
  );
}
