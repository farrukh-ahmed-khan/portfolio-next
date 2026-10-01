"use client";

import { useEffect, useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import ProjectAppLinks from "./ProjectAppLinks";

export default function ProjectDetails({ project, onClose }) {
  const ref = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!opener.current) opener.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
      queueMicrotask(() => {
        if (!dialog.isConnected && opener.current?.isConnected) opener.current.focus({ preventScroll: true });
      });
    };
  }, []);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title"
    onCancel={onClose} onClose={event => { if (!event.currentTarget.open) onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="project-dialog-content">
      <button type="button" className="project-dialog-close" aria-label="Close case study" onClick={onClose}><FiX /></button>
      <p className="section-label">{project.category} · Project overview</p>
      <h2 id="project-dialog-title">{project.title}</h2>
      <p>{project.description}</p>
      <h3>Technology stack</h3>
      <div className="project-technologies">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="cosmic-button cosmic-button-primary">Visit Live <FiArrowUpRight /></a>
      <ProjectAppLinks links={project.appLinks} />
    </div>
  </dialog>;
}
