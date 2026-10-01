"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import { nebulaVertex, nebulaFragment, starVertex, starFragment } from "./spaceShaders";

function Cosmos({ active, mobile, onFailure }) {
  const gl = useThree((state) => state.gl);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const invalidate = useThree((state) => state.invalidate);
  const stars = useRef();
  const elapsed = useRef(0);
  const nebula = useMemo(() => ({ uTime: { value: 0 }, uAspect: { value: 1 } }), []);
  const starlight = useMemo(() => ({ uTime: { value: 0 }, uDpr: { value: 1 } }), []);
  const particles = useMemo(() => {
    const count = mobile ? 240 : 720;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    // Deterministic layout survives viewport changes without random flashes.
    let seed = 34;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < count; i++) {
      positions.set([(random() - .5) * 38, (random() - .5) * 24, -random() * 12], i * 3);
      sizes[i] = .7 + random() * 2.3;
      phases[i] = random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, [mobile]);

  useEffect(() => {
    nebula.uAspect.value = width / Math.max(height, 1);
    starlight.uDpr.value = gl.getPixelRatio();
    invalidate();
  }, [gl, width, height, mobile, nebula, starlight, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const timer = window.setInterval(invalidate, 1000 / (mobile ? 20 : 24));
    return () => window.clearInterval(timer);
  }, [active, mobile, invalidate]);
  useFrame((_, delta) => {
    if (!active) return;
    elapsed.current += Math.min(delta, .08);
    const t = elapsed.current;
    nebula.uTime.value = t;
    starlight.uTime.value = t;
    stars.current.rotation.z = t * .004;
    stars.current.rotation.y = Math.sin(t * .04) * .045;
  });

  return <>
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial uniforms={nebula} vertexShader={nebulaVertex} fragmentShader={nebulaFragment} depthTest={false} depthWrite={false} toneMapped={false} />
    </mesh>
    <points ref={stars} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[particles.sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[particles.phases, 1]} />
      </bufferGeometry>
      <shaderMaterial uniforms={starlight} vertexShader={starVertex} fragmentShader={starFragment} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </points>
  </>;
}

function SpaceScene({ active, mobile, onFailure }) {
  return <Canvas frameloop="demand" dpr={mobile ? .75 : 1}
    camera={{ position: [0, 0, 14], fov: 48, near: .1, far: 60 }}
    gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
    fallback={null} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <Cosmos active={active} mobile={mobile} onFailure={onFailure} />
  </Canvas>;
}

export default memo(SpaceScene);
