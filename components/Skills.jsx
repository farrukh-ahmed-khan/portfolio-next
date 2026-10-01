"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { iconMap, skillCategories } from "../data/portfolioData";

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
            <p className="section-label">{"// SKILLS"}</p>
            <span className="hero-index mb-6 block">02</span>
            <h2 id="skills-heading" className="max-w-xl text-3xl font-black tracking-[-0.05em] text-[var(--text)] sm:text-6xl">
              Full-stack skills for web, mobile, and AI.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-[var(--muted)]">
              From React and Next.js interfaces to React Native apps, APIs, data modelling, and AI integrations, these are the technologies I use to build and ship production products.
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
                    <div className="skills-category-icon">
                      <CategoryIcon size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="skills-category-title">{category.label}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{category.description}</p>
                    </div>
                  </div>

                  <div className="skills-band-grid">
                    {skills[category.key].map((skill) => {
                      const SkillIcon = iconMap[skill.icon];

                      return (
                        <div key={skill.name} className="skills-item">
                          <SkillIcon size={16} aria-hidden="true" />
                          <span>{skill.name}</span>
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
