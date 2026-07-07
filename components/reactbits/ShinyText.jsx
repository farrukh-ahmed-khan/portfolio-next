"use client";

import { memo } from "react";

function ShinyText({ text, speed = 5, className = "" }) {
  return (
    <span className={`shiny-text ${className}`} style={{ animationDuration: `${speed}s` }}>
      {text}
    </span>
  );
}

export default memo(ShinyText);
