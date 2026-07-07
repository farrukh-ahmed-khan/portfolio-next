"use client";

import { memo, useEffect, useRef } from "react";

function DotField({ spacing = 30, baseRadius = 1.1, color = "37, 99, 235", className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let frameId;
    let width = 0;
    let height = 0;
    let time = 0;

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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // A slow diagonal wave travels through the grid, scaling dots up as it passes.
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const wave = Math.sin((x + y) * 0.012 - time * 0.9);
          const pulse = (wave + 1) / 2;
          const radius = baseRadius * (0.6 + pulse * 1.1);
          const alpha = 0.08 + pulse * 0.2;

          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += 0.016;
      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [spacing, baseRadius, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 55%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 90%)",
      }}
      aria-hidden="true"
    />
  );
}

export default memo(DotField);
