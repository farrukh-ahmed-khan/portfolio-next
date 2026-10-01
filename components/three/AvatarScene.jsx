"use client";

import { memo, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import FarrukhModel from "./FarrukhModel";

// Demand rendering pauses offscreen, in background tabs, and for reduced motion.
function FrameSchedule({ active, mobile, onFailure }) {
  const invalidate = useThree((state) => state.invalidate);
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const timer = window.setInterval(invalidate, 1000 / (mobile ? 24 : 30));
    return () => window.clearInterval(timer);
  }, [active, mobile, invalidate]);
  return null;
}

function AvatarScene({ input, active, mobile, reducedMotion, onReady, onFailure }) {
  return (
    <Canvas frameloop="demand" dpr={mobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 32, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
      fallback={<p className="avatar-status">The 3D portrait needs WebGL.</p>}
      style={{ position: "absolute", inset: 0 }}>
      <FrameSchedule active={active} mobile={mobile} onFailure={onFailure} />
      <hemisphereLight args={["#e8eafa", "#30334e", 1.7]} />
      <directionalLight position={[-3, 4, 6]} color="#fff4ef" intensity={2.4} />
      <directionalLight position={[3, 1, 4]} color="#adc7f4" intensity={1.1} />
      <directionalLight position={[2, 2, -3]} color="#ad8cf2" intensity={1.8} />
      <Suspense fallback={null}>
        <Environment resolution={128} frames={1}>
          <Lightformer position={[-3, 3, 4]} rotation={[0, Math.PI / 4, 0]} scale={[5, 6, 1]} intensity={1.4} color="#fff4ef" />
          <Lightformer position={[3, 1, 2]} rotation={[0, -Math.PI / 3, 0]} scale={[4, 5, 1]} intensity={1} color="#c4d6ff" />
        </Environment>
        <FarrukhModel input={input} active={active} mobile={mobile} reducedMotion={reducedMotion} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

export default memo(AvatarScene);
