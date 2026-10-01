"use client";

import dynamic from "next/dynamic";
import { Component, memo, useEffect, useRef, useState } from "react";

const AstronautScene = dynamic(() => import("./AstronautScene"), { ssr: false });

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Astronaut() {
  const container = useRef(null);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const proximity = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); proximity.disconnect(); }
    }, { rootMargin: "200px" });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const device = matchMedia("(max-width: 767px), (pointer: coarse)");
    const preferences = () => { setReduced(motion.matches); setMobile(device.matches); };
    const tab = () => setTabVisible(!document.hidden);
    preferences(); tab();
    proximity.observe(container.current); visibility.observe(container.current);
    motion.addEventListener("change", preferences); device.addEventListener("change", preferences);
    document.addEventListener("visibilitychange", tab);
    return () => {
      proximity.disconnect(); visibility.disconnect();
      motion.removeEventListener("change", preferences); device.removeEventListener("change", preferences);
      document.removeEventListener("visibilitychange", tab);
    };
  }, []);

  return (
    <div className="astronaut-stage" ref={container} role="img" aria-label="An astronaut floating in space">
      <div className="astronaut-orbit" aria-hidden="true" />
      <SceneBoundary>
        {nearby && <AstronautScene active={visible && tabVisible && !reduced} mobile={mobile} />}
      </SceneBoundary>
      <span className="astronaut-coordinate" aria-hidden="true">A little curiosity. Infinite possibilities.</span>
    </div>
  );
}

export default memo(Astronaut);
