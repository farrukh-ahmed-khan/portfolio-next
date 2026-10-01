"use client";

import dynamic from "next/dynamic";
import { Component, memo, useCallback, useEffect, useRef, useState } from "react";
import { useGlobeTravel } from "./useGlobeTravel";

const GlobeScene = dynamic(() => import("./ProjectGlobeScene"), { ssr: false });
class GlobeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function ProjectGlobe() {
  const ref = useRef(null);
  const [nearby, setNearby] = useState(false);
  const [active, setActive] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  const travel = useGlobeTravel(ref, { mobile, reduced });
  useEffect(() => {
    let visible = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const device = matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => {
      setActive(visible && !document.hidden && !motion.matches);
      setMobile(device.matches); setReduced(motion.matches);
    };
    const proximity = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); proximity.disconnect(); }
    }, { rootMargin: "200px" });
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    proximity.observe(ref.current); visibility.observe(ref.current); update();
    motion.addEventListener("change", update); device.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      proximity.disconnect(); visibility.disconnect();
      motion.removeEventListener("change", update); device.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <div className="travelling-globe" aria-hidden="true">
    <div ref={ref} className="project-globe-stage">
      <GlobeBoundary>{nearby && !failed && <GlobeScene active={active} mobile={mobile} travel={travel} onFailure={fail} />}</GlobeBoundary>
    </div>
  </div>;
}
export default memo(ProjectGlobe);
