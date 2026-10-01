"use client";

import { useEffect, useRef } from "react";

// Measure document anchors only on layout changes; scroll events use cached values.
export function useGlobeTravel(stage, { mobile, reduced }) {
  const travel = useRef({ spin: 0 });
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let anchors = [], frame = 0, measureFrame = 0, lastTime = 0;
    let current = null, target = null, hidden = document.hidden;
    const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
    const paint = () => {
      if (!current) return;
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${current.scale})`;
    };
    const animate = (now) => {
      frame = 0;
      if (hidden || !target) return;
      const delta = Math.min((now - (lastTime || now - 16)) / 1000, .06);
      lastTime = now;
      const ease = 1 - Math.exp(-7 * delta);
      let settled = true;
      for (const key of ["x", "y", "scale"]) {
        current[key] += (target[key] - current[key]) * ease;
        if (Math.abs(target[key] - current[key]) > (key === "scale" ? .001 : .1)) settled = false;
      }
      if (settled) current = { ...target };
      paint();
      if (!settled) frame = requestAnimationFrame(animate);
    };
    const resolve = (snap = false) => {
      if (!anchors.length) return;
      const scroll = window.scrollY;
      travel.current.spin = reduced ? 0 : scroll * .00012;
      let pose = { x: .08, y: 1.03, scale: .8 };
      if (!reduced) {
        let index = 0;
        while (index < anchors.length - 2 && scroll > anchors[index + 1].at) index++;
        const a = anchors[index], b = anchors[Math.min(index + 1, anchors.length - 1)];
        const fraction = clamp((scroll - a.at) / Math.max(1, b.at - a.at), 0, 1);
        const t = fraction * fraction * (3 - 2 * fraction);
        pose = Object.fromEntries(["x", "y", "scale"].map(key => [key, a[key] + (b[key] - a[key]) * t]));
      }
      target = {
        x: pose.x * window.innerWidth,
        y: (mobile ? Math.max(.92, pose.y) : pose.y) * window.innerHeight,
        scale: pose.scale,
      };
      if (!current || snap || reduced) { current = { ...target }; paint(); }
      else if (!hidden && !frame) { lastTime = 0; frame = requestAnimationFrame(animate); }
    };
    const measure = () => {
      measureFrame = 0;
      const vh = window.innerHeight;
      const max = Math.max(0, document.documentElement.scrollHeight - vh);
      const next = [];
      const add = (at, x, y, scale = 1) => next.push({ at: clamp(at, 0, max), x, y, scale });
      const box = (selector) => {
        const node = document.querySelector(selector);
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
      };
      add(0, .06, 1.0, .86);
      for (const [id, x, y] of [["about", .04, .83], ["skills", .96, .88]]) {
        const bounds = box(`#${id}`);
        if (bounds) add(bounds.top + bounds.height * .4 - vh * .5, x, y);
      }
      const projects = box(".project-scroll");
      if (projects) {
        const distance = Math.max(vh, projects.height - vh);
        add(projects.top, .23, 1.05, 1.08);
        add(projects.top + distance * .33, .88, 1.01, .94);
        add(projects.top + distance * .66, .12, 1.03, 1.06);
        add(projects.top + distance, .8, 1.04, .94);
      }
      const reviews = box("#testimonials");
      if (reviews) add(reviews.top + reviews.height * .4 - vh * .5, .97, .86, .94);
      const contact = box("#contact");
      if (contact) {
        add(contact.top, .05, .9, .94);
        add(contact.top + contact.height * .65 - vh * .5, .96, .94, .88);
      }
      add(max, .08, .98, .88);
      next.sort((a, b) => a.at - b.at);
      anchors = next.filter((anchor, index) => index === 0 || anchor.at > next[index - 1].at);
      resolve(true);
    };
    const queueMeasure = () => { if (!measureFrame) measureFrame = requestAnimationFrame(measure); };
    const scroll = () => resolve();
    const visibility = () => {
      hidden = document.hidden;
      if (hidden) { cancelAnimationFrame(frame); frame = 0; }
      else resolve(true);
    };
    measure();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", queueMeasure, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    const observer = new ResizeObserver(queueMeasure);
    observer.observe(document.body);
    document.querySelectorAll("main > section, .project-scroll").forEach(node => observer.observe(node));
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(measureFrame); observer.disconnect();
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", queueMeasure);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [stage, mobile, reduced]);
  return travel;
}
