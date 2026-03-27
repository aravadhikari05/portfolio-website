import { useEffect, useState } from "react";

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.aravadhikari.com/visits", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fixed bottom-6 right-10 z-30 flex items-center gap-2 text-sm tabular-nums font-extralight tracking-widest text-neutral-600 uppercase">
      <span>{count ?? "—"}</span>
      <span>Visits</span>
    </div>
  );
}
