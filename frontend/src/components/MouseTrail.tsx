import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;
const CURSOR_RADIUS = 2;

interface Point {
  x: number;
  y: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<Point[]>([]);
  const mouse = useRef<Point>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.push({ ...mouse.current });
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift();

      const len = trail.current.length;

      if (len > 1) {
        for (let i = 1; i < len; i++) {
          const t = i / len; // 0 = tail, 1 = head
          const prev = trail.current[i - 1];
          const curr = trail.current[i];

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(200, 200, 200, ${t * 0.18})`;
          ctx.lineWidth = t * 1.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }

      // head dot
      const { x, y } = mouse.current;
      ctx.beginPath();
      ctx.arc(x, y, CURSOR_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200, 200, 200, 0.9)";
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-9999 pointer-events-none"
    />
  );
}
