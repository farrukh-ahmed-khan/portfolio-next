"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { CatmullRomCurve3, Vector3 } from "three";

const SUIT = "#e2e6f2";
const JOINT = "#28354f";
const ACCENT = "#a294ee";

function SoftPart({ position, scale, color = SUIT, ...props }) {
  return <mesh position={position} scale={scale} {...props}>
    <sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color={color} roughness={0.65} />
  </mesh>;
}

function Seal({ position, radius = 0.14, color = JOINT }) {
  return <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[radius, 0.035, 8, 24]} /><meshStandardMaterial color={color} roughness={0.5} />
  </mesh>;
}

function Arm({ side }) {
  return <group position={[side * 0.4, 0.37, 0]} rotation={[0.15, 0, side === 1 ? 1.85 : -0.5]}>
    <SoftPart position={[0, -0.17, 0]} scale={[0.17, 0.3, 0.17]} />
    <Seal position={[0, -0.38, 0]} />
    <group position={[0, -0.4, 0]} rotation={[-0.3, 0, side * 0.35]}>
      <SoftPart position={[0, -0.17, 0]} scale={[0.145, 0.25, 0.145]} />
      <Seal position={[0, -0.33, 0]} color={ACCENT} />
      <SoftPart position={[0, -0.47, 0.025]} scale={[0.15, 0.18, 0.12]} />
      <SoftPart position={[-side * 0.13, -0.42, 0.06]} scale={[0.065, 0.1, 0.065]} />
    </group>
  </group>;
}

function Leg({ side }) {
  return <group position={[side * 0.21, -0.33, 0]} rotation={[side === 1 ? -0.4 : 0.1, 0, side * -0.18]}>
    <SoftPart position={[0, -0.22, 0]} scale={[0.19, 0.35, 0.19]} />
    <Seal position={[0, -0.49, 0]} radius={0.17} />
    <group position={[0, -0.5, 0]} rotation={[0.65, 0, 0]}>
      <SoftPart position={[0, -0.2, 0]} scale={[0.17, 0.29, 0.17]} />
      <Seal position={[0, -0.37, 0]} radius={0.16} color={ACCENT} />
      <RoundedBox args={[0.35, 0.25, 0.5]} radius={0.08} smoothness={3} position={[0, -0.51, 0.09]}>
        <meshStandardMaterial color={SUIT} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.36, 0.065, 0.51]} radius={0.025} smoothness={2} position={[0, -0.62, 0.09]}>
        <meshStandardMaterial color={JOINT} roughness={0.8} />
      </RoundedBox>
    </group>
  </group>;
}

function Explorer({ active }) {
  const group = useRef(null);
  const time = useRef(0);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const tether = useMemo(() => new CatmullRomCurve3([
    new Vector3(0.35, 0, -0.35), new Vector3(0.9, -0.4, -0.5),
    new Vector3(1.15, -1.2, -0.3), new Vector3(0.5, -1.9, 0),
    new Vector3(-0.5, -2.05, 0), new Vector3(-1.2, -1.7, -0.1),
  ]), []);
  useLayoutEffect(() => {
    camera.zoom = Math.min(size.width / 3.8, size.height / 4.2);
    camera.updateProjectionMatrix(); invalidate();
  }, [camera, size.width, size.height, invalidate]);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const timer = setInterval(invalidate, 1000 / 24);
    return () => clearInterval(timer);
  }, [active, invalidate]);
  useFrame((_, delta) => {
    if (!active || !group.current) return;
    time.current += Math.min(delta, 0.06);
    group.current.position.y = 0.15 + Math.sin(time.current * 0.6) * 0.07;
    group.current.rotation.z = -0.24 + Math.sin(time.current * 0.35) * 0.035;
  });
  return <group ref={group} position={[0, 0.15, 0]} rotation={[0.08, -0.28, -0.24]}>
    <mesh><tubeGeometry args={[tether, 40, 0.015, 6, false]} /><meshStandardMaterial color="#6f8ca6" /></mesh>
    <RoundedBox args={[0.68, 0.85, 0.34]} radius={0.12} smoothness={3} position={[0, 0.1, -0.34]}>
      <meshStandardMaterial color="#b9c1d8" roughness={0.6} />
    </RoundedBox>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 0.23, 0.1, -0.56]}>
      <capsuleGeometry args={[0.12, 0.48, 6, 12]} /><meshStandardMaterial color={ACCENT} metalness={0.25} roughness={0.45} />
    </mesh>)}
    <SoftPart position={[0, 0.12, 0]} scale={[0.44, 0.58, 0.3]} />
    <Seal position={[0, 0.59, 0]} radius={0.27} />
    <SoftPart position={[0, 0.99, 0]} scale={[0.46, 0.46, 0.43]} />
    <mesh position={[0, 1.01, 0.28]} scale={[0.365, 0.31, 0.245]}>
      <sphereGeometry args={[1, 32, 24]} /><meshStandardMaterial color="#0c1835" metalness={0.88} roughness={0.16} />
    </mesh>
    <SoftPart position={[0.31, 1.1, 0.45]} scale={[0.02, 0.085, 0.015]} color="#a5dff5" />
    <RoundedBox args={[0.4, 0.32, 0.08]} radius={0.035} smoothness={3} position={[0, 0.22, 0.29]}>
      <meshStandardMaterial color={JOINT} roughness={0.5} />
    </RoundedBox>
    <mesh position={[0, 0.27, 0.336]}><planeGeometry args={[0.26, 0.085]} /><meshBasicMaterial color="#9bd5ec" /></mesh>
    {[-0.1, 0, 0.1].map((x) => <SoftPart key={x} position={[x, 0.14, 0.34]} scale={[0.022, 0.022, 0.012]} color={x === 0 ? "#f6bc95" : ACCENT} />)}
    <Arm side={-1} /><Arm side={1} /><Leg side={-1} /><Leg side={1} />
  </group>;
}

function AstronautScene({ active, mobile }) {
  return <Canvas orthographic frameloop="demand" dpr={mobile ? 1 : [1, 1.5]}
    camera={{ position: [0, 0, 8], zoom: 120 }}
    gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }} fallback={null}>
    <hemisphereLight args={["#d4e3ff", "#14132b", 1.4]} />
    <directionalLight position={[-3, 4, 5]} intensity={2.4} color="#f2eafa" />
    <directionalLight position={[3, 1, -2]} intensity={3} color="#8f7aff" />
    <Environment resolution={64} frames={1}>
      <Lightformer position={[-3, 3, 4]} scale={[4, 3, 1]} intensity={3} color="#d8f4ff" />
      <Lightformer position={[3, 0, 2]} rotation={[0, -Math.PI / 3, 0]} scale={[2, 4, 1]} intensity={2} color="#aa91ff" />
    </Environment>
    <Explorer active={active} />
  </Canvas>;
}

export default memo(AstronautScene);
