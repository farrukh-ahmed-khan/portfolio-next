"use client";

import { memo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#06b6d4]"
      aria-hidden="true"
    />
  );
}

export default memo(ScrollProgress);
