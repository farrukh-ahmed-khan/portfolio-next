"use client";

import { memo, useRef } from "react";

function SpotlightCard({ children, className = "", spotlightColor = "rgba(37, 99, 235, 0.18)" }) {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      style={{ "--spotlight-color": spotlightColor }}
    >
      {children}
    </div>
  );
}

export default memo(SpotlightCard);
