"use client";

import dynamic from "next/dynamic";
import { Component, memo, useCallback, useEffect, useRef, useState } from "react";

const AvatarScene = dynamic(() => import("./AvatarScene"), { ssr: false });

function Unavailable() {
  return <p className="avatar-status" role="status">The 3D portrait is unavailable on this device.</p>;
}

class AvatarBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Unavailable /> : this.props.children; }
}

function AvatarHero({ name, title }) {
  const container = useRef(null);
  const input = useRef({ x: 0, y: 0, scroll: 0, tracking: false });
  const [reducedMotion, setReducedMotion] = useState(true);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const element = container.current;
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); preload.disconnect(); }
    }, { rootMargin: "200px" });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateDevice = () => setMobile(media.matches);
    const updateMotion = () => setReducedMotion(motionPreference.matches);
    const updateTab = () => setTabVisible(!document.hidden);
    updateDevice();
    updateMotion();
    updateTab();
    preload.observe(element);
    visibility.observe(element);
    media.addEventListener("change", updateDevice);
    motionPreference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateTab);
    return () => {
      preload.disconnect();
      visibility.disconnect();
      media.removeEventListener("change", updateDevice);
      motionPreference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateTab);
    };
  }, []);

  const active = visible && tabVisible && !reducedMotion;
  useEffect(() => {
    input.current = { x: 0, y: 0, scroll: 0, tracking: false };
    if (!active) return;
    const hero = container.current.closest("section");
    const pointer = (event) => {
      if (event.pointerType === "touch") return;
      const rect = container.current.getBoundingClientRect();
      // Canvas coordinates let the model look toward the cursor relative to its face.
      input.current.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      input.current.y = -((event.clientY - rect.top) / rect.height * 2 - 1);
      input.current.tracking = true;
    };
    const reset = () => { input.current.tracking = false; };
    const scroll = () => {
      const rect = hero.getBoundingClientRect();
      input.current.scroll = Math.max(0, Math.min(1, -rect.top / rect.height));
    };
    scroll();
    if (!mobile) window.addEventListener("pointermove", pointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", scroll);
    };
  }, [active, mobile]);

  return (
    <div ref={container} className="avatar-stage" role="img" aria-label={`3D portrait of ${name}`}>
      <div className="avatar-backdrop" aria-hidden="true" />
      <AvatarBoundary>
        {failed ? <Unavailable /> : <>
          {!ready && <p className="avatar-status" role="status">Loading portrait…</p>}
          {nearby && <AvatarScene input={input} active={active} mobile={mobile}
            reducedMotion={Boolean(reducedMotion)} onReady={handleReady} onFailure={handleFailure} />}
        </>}
      </AvatarBoundary>
      <div className="avatar-caption" aria-hidden="true">
        <span>{name}</span><span>{title}</span>
      </div>
    </div>
  );
}

// The hero's typewriter updates frequently; they must not wake the WebGL scene.
export default memo(AvatarHero);
