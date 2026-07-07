"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function BlurText({ text = "", delay = 0, stagger = 0.08, className = "" }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: "blur(12px)", y: 18 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: delay + index * stagger, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-block will-change-transform"
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

export default memo(BlurText);
