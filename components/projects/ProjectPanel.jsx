"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import ProjectAppLinks from "./ProjectAppLinks";

export default function ProjectPanel({ project, index, total, interactive, onOpen }) {
  const [failed, setFailed] = useState(false);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 25 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 25 });
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const preview = project.image && !project.image.includes("placehold.co") && !failed;
  const summary = project.description.split(/(?<=\.)\s+/)[0];
  const move = (event) => {
    if (!interactive || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rx.set(-((event.clientY - rect.top) / rect.height - .5) * 5);
    ry.set(((event.clientX - rect.left) / rect.width - .5) * 5);
  };
  return <article className="project-feature section-shell">
    <div className="project-summary">
      <p className="project-counter">{counter}<span>·</span>{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{summary}</p>
      <div className="project-technologies">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-actions">
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="cosmic-button cosmic-button-primary">Visit Live <FiArrowUpRight /></a>
        <button type="button" className="cosmic-button cosmic-button-secondary" onClick={onOpen}>Case study</button>
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-source" aria-label={`View ${project.title} source code`}><FiGithub /></a>}
      </div>
      <ProjectAppLinks links={project.appLinks} />
    </div>
    <div className="project-preview-perspective">
      <motion.div className="project-preview" style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0 }}
        onPointerMove={move} onPointerLeave={() => { rx.set(0); ry.set(0); }}>
        {preview ? <Image src={project.image} alt={`${project.title} website preview`} fill unoptimized
          sizes="(min-width: 1024px) 55vw, 100vw" onError={() => setFailed(true)} className="project-preview-image" /> :
          <div className="project-preview-unavailable"><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong><p>Website preview unavailable</p></div>}
        <div className="project-preview-shade" />
        <div className="project-preview-top"><span className="preview-badge">{project.previewLabel || "Preview"}</span><span className="preview-badge">{counter}</span></div>
        <div className="project-preview-bottom"><span className="preview-badge preview-title">{project.title}</span>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="preview-open" aria-label={`Open ${project.title} website`}>Open Site <FiArrowUpRight /></a></div>
      </motion.div>
    </div>
  </article>;
}
