"use client";

import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SpotlightCard from "./reactbits/SpotlightCard";
import DotField from "./reactbits/DotField";

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75 }}
      className="relative overflow-hidden py-24 sm:py-28"
      aria-labelledby="projects-heading"
    >
      <DotField />
      <div className="section-shell relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">// PROJECTS</p>
            <span className="hero-index mb-6 block">03</span>
            <h2 id="projects-heading" className="max-w-4xl text-3xl font-black tracking-[-0.05em] text-[var(--text)] sm:text-6xl">
              Production projects across education, wellness, marketplaces, real estate, ecommerce, and aviation.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`font-space px-4 py-3 text-xs uppercase tracking-[0.22em] transition duration-300 ${
                  activeFilter === filter
                    ? "bg-[var(--primary)] text-[var(--bg)]"
                    : "border border-[rgba(37,99,235,0.24)] bg-[rgba(255,255,255,0.42)] text-[var(--text)] hover:border-[var(--primary)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-6 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const sizeClass =
                index === 0
                  ? "lg:col-span-7"
                  : index === 1
                    ? "lg:col-span-5"
                    : index % 3 === 0
                      ? "lg:col-span-4"
                      : "lg:col-span-4";

              return (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`project-slab group ${sizeClass}`}
                >
                  <SpotlightCard className="h-full">
                  <div className="project-slab-media">
                    <img src={project.image} alt={`${project.title} preview`} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? "h-[26rem]" : "h-72"}`} />
                    <div className="project-slab-overlay" />
                  </div>

                  <div className="project-slab-body">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-space text-[11px] uppercase tracking-[0.26em] text-[var(--primary)]">
                          {String(index + 1).padStart(2, "0")} / {project.category}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-[var(--text)] md:text-3xl">{project.title}</h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${project.title} source code on GitHub`}
                            className="project-icon-btn"
                          >
                            <FiGithub size={18} />
                          </a>
                        ) : null}
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open live demo for ${project.title}`}
                          className="project-icon-btn"
                        >
                          <FiArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">{project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(Projects);
