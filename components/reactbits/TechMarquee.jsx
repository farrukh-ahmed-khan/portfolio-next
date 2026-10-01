"use client";

import { memo } from "react";

function TechMarquee({ items }) {
  // The track is rendered twice so translateX(-50%) loops seamlessly.
  const doubled = [...items, ...items];

  return (
    <div className="tech-marquee" aria-label="Technology stack">
      <div className="tech-marquee-track">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="tech-marquee-item" aria-hidden={index >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(TechMarquee);
