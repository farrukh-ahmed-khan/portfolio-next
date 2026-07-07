"use client";

import { memo } from "react";

function StarBorder({
  as: Component = "div",
  className = "",
  innerClassName = "",
  color = "#2563eb",
  speed = "6s",
  children,
  ...rest
}) {
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={`star-border-inner ${innerClassName}`}>{children}</div>
    </Component>
  );
}

export default memo(StarBorder);
