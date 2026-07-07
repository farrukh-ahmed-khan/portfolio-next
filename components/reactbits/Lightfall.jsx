"use client";

import { memo, useEffect, useRef } from "react";

const PALETTE = [
  [37, 99, 235],   // blue-600
  [14, 165, 233],  // sky-500
  [6, 182, 212],   // cyan-500
];

function Lightfall({ count = 26, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let frameId;
    let streaks = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeStreak = (initial) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -Math.random() * height * 0.4,
      length: 90 + Math.random() * 150,
      speed: 1.2 + Math.random() * 2.2,
      lineWidth: 1 + Math.random() * 1.4,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: 0.22 + Math.random() * 0.3,
    });

    const spawn = () => {
      streaks = Array.from({ length: count }, () => makeStreak(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of streaks) {
        const [r, g, b] = s.color;
        const tailY = s.y - s.length;

        const gradient = ctx.createLinearGradient(s.x, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.lineWidth;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // bright head
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(s.alpha + 0.25, 0.75)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.lineWidth * 1.1, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        if (tailY > height) Object.assign(s, makeStreak(false));
      }

      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

    resize();
    spawn();
    draw();

    const handleResize = () => {
      resize();
      spawn();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 82%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 82%, transparent)",
      }}
      aria-hidden="true"
    />
  );
}

export default memo(Lightfall);
