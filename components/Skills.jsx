"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { iconMap, skillCategories } from "../data/portfolioData";

function ProgressBar({ level }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-2 overflow-hidden bg-[rgba(37,99,235,0.08)]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: visible ? `${level}%` : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] shadow-[0_0_18px_rgba(37,99,235,0.3)]"
      />
    </div>
  );
}

function Skills({ skills }) {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75 }}
      className="py-24 sm:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="section-shell">
        <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <p className="section-label">// SKILLS</p>
            <span className="hero-index mb-6 block">02</span>
            <h2 id="skills-heading" className="max-w-xl text-3xl font-black tracking-[-0.05em] text-[var(--text)] sm:text-6xl">
              Practical full stack capability for modern web products.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-[var(--muted)]">
              A focused overview of the frontend, backend, database, integration, and workflow skills Farrukh uses across production client projects.
            </p>
          </div>

          <div className="grid gap-6">
            {skillCategories.map((category, index) => {
              const CategoryIcon = iconMap[category.icon];

              return (
                <motion.article
                  key={category.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="skills-band"
                >
                  <div className="skills-band-head">
                    <span className="font-space text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">0{index + 1}</span>
                    <div className="inline-flex h-14 w-14 items-center justify-center border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.08)] text-[var(--primary)]">
                      <CategoryIcon size={24} />
                    </div>
                    <div>
                      <h3 className="font-space text-lg uppercase tracking-[0.18em] text-[var(--text)]">{category.label}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{category.description}</p>
                    </div>
                  </div>

                  <div className="skills-band-grid">
                    {skills[category.key].map((skill) => {
                      const SkillIcon = iconMap[skill.icon];

                      return (
                        <div key={skill.name} className="skills-item">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-[var(--secondary)]">
                                <SkillIcon size={18} />
                              </span>
                              <span className="text-sm font-medium text-[var(--text)]">{skill.name}</span>
                            </div>
                            <span className="font-space text-xs text-[var(--muted)]">{skill.level}%</span>
                          </div>
                          <ProgressBar level={skill.level} />
                        </div>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(Skills);
