"use client";

import { memo } from "react";

function GradientText({
  children,
  className = "",
  colors = ["#2563eb", "#0891b2", "#0ea5e9", "#2563eb"],
}) {
  return (
    <span className={`animated-gradient-text ${className}`}>
      <span
        className="text-content"
        style={{ backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})` }}
      >
        {children}
      </span>
    </span>
  );
}

export default memo(GradientText);
