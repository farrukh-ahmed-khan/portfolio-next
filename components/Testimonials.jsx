"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import SpotlightCard from "./reactbits/SpotlightCard";

function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Testimonials({ testimonials }) {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75 }}
      className="py-24 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="section-shell">
        <p className="section-label">// TESTIMONIALS</p>
        <span className="hero-index mb-6 block">04</span>
        <h2 id="testimonials-heading" className="max-w-3xl text-3xl font-black tracking-[-0.05em] text-[var(--text)] sm:text-6xl">
          What clients say about working with me.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.12 }}
            >
              <SpotlightCard className="glass-panel flex h-full flex-col p-7">
                <div className="flex items-center gap-1.5 text-amber-400" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                    <FaStar key={starIndex} size={15} aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-base leading-8 text-[var(--text)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-7 flex items-center gap-4 border-t border-[rgba(37,99,235,0.14)] pt-5">
                  <span className="font-space inline-flex h-11 w-11 shrink-0 items-center justify-center bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-sm font-bold text-white">
                    {initialsOf(testimonial.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{testimonial.name}</p>
                    <p className="font-space mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{testimonial.role}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default memo(Testimonials);
