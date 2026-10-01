"use client";

import { Component, memo, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SpaceScene = dynamic(() => import("./three/SpaceScene"), { ssr: false });

class SpaceBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function SpaceBackdrop() {
  const container = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    let visible = false;
    const update = () => {
      setPlaying(visible && !document.hidden && !motion.matches);
      setMobile(device.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) setNearby(true);
      update();
    });
    observer.observe(container.current);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    device.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      device.removeEventListener("change", update);
    };
  }, []);
  return (
    <div ref={container} className="space-backdrop" data-playing={playing} aria-hidden="true">
      <SpaceBoundary>
        {nearby && !failed && <SpaceScene active={playing} mobile={mobile} onFailure={fail} />}
      </SpaceBoundary>
      <div className="space-backdrop-shade" />
    </div>
  );
}

export default memo(SpaceBackdrop);
