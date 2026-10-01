"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProjectPanel from "./projects/ProjectPanel";
import ProjectDetails from "./projects/ProjectDetails";

function Projects({ projects }) {
  const [filter, setFilter] = useState("All");
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const track = useRef(null);
  const filters = useMemo(() => ["All", ...new Set(projects.map(p => p.category))], [projects]);
  const shown = useMemo(() => filter === "All" ? projects : projects.filter(p => p.category === filter), [filter, projects]);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(shown.length - 1) * 100 / shown.length}%`]);
  useMotionValueEvent(scrollYProgress, "change", value => {
    setActive(Math.max(0, Math.min(shown.length - 1, Math.round(value * (shown.length - 1)))));
  });
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1024px) and (min-height: 680px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener("change", update); reduced.addEventListener("change", update);
    return () => { desktop.removeEventListener("change", update); reduced.removeEventListener("change", update); };
  }, []);
  const close = useCallback(() => setSelected(null), []);
  const goTo = (index) => {
    const element = track.current;
    if (!element) return;
    const top = window.scrollY + element.getBoundingClientRect().top;
    const distance = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * index / Math.max(shown.length - 1, 1), behavior: "smooth" });
  };

  return <section id="projects" className="projects-showcase" aria-labelledby="projects-heading">
    <div className="section-shell projects-header">
      <div>
        <p className="section-label">{"// SELECTED WORK"}</p>
        <h2 id="projects-heading">Ideas turned into<br /><span>real-world products.</span></h2>
        <p className="projects-intro">A closer look at the platforms, experiences, and systems I&apos;ve helped build.</p>
      </div>
      <div className="projects-filters" role="group" aria-label="Filter projects">
        {filters.map(label => <button key={label} type="button" aria-pressed={filter === label}
          onClick={() => { setFilter(label); setActive(0); }}>{label}</button>)}
      </div>
    </div>
    <div ref={track} className={`project-scroll ${pinned ? "is-pinned" : "is-stacked"}`}
      style={{ height: pinned ? `${shown.length * 100}vh` : "auto" }}>
      <div className="project-stage">
        <motion.div className="project-track" style={{ x: pinned ? x : 0, width: pinned ? `${shown.length * 100}%` : "100%" }}>
          {shown.map((project, index) => <div className="project-slide" key={project.title}
            style={{ width: pinned ? `${100 / shown.length}%` : "100%" }}
            inert={pinned && index !== active ? "" : undefined}
            aria-hidden={pinned && index !== active ? true : undefined}>
            <ProjectPanel project={project} index={index} total={shown.length} interactive={pinned} onOpen={() => setSelected(project)} />
          </div>)}
        </motion.div>
        {pinned && <>
          <div className="project-navigation" aria-label="Project navigation">
            <button type="button" aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)}><FiArrowLeft /></button>
            <div className="project-dots">{shown.map((project, index) => <button key={project.title} type="button"
              aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={active === index ? "step" : undefined}
              onClick={() => goTo(index)} />)}</div>
            <button type="button" aria-label="Next project" disabled={active === shown.length - 1} onClick={() => goTo(active + 1)}><FiArrowRight /></button>
          </div>
          <motion.div className="project-progress" style={{ scaleX: scrollYProgress }} />
        </>}
      </div>
    </div>
    {selected && <ProjectDetails project={selected} onClose={close} />}
  </section>;
}

export default memo(Projects);
