"use client";

// Globe geometry/shaders adapted from Hasnain Irfan's MIT-licensed portfolio.
// See public/licenses/hasnain-portfolio-MIT.txt for the original license.
import { memo, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CapsuleGeometry, Color, InstancedBufferAttribute, InstancedBufferGeometry, Quaternion, Vector3 } from "three";
import { spikeVertexShader, spikeFragmentShader, orbVertexShader, orbFragmentShader } from "./projectGlobeShaders";

function createBeads(count) {
  const reference = new CapsuleGeometry(1, 4, 3, 8);
  const geometry = new InstancedBufferGeometry();
  for (const key in reference.attributes) geometry.setAttribute(key, reference.attributes[key]);
  geometry.setIndex(reference.index);
  const positions = new Float32Array(count * 3), quaternions = new Float32Array(count * 4), randoms = new Float32Array(count);
  const up = new Vector3(0, 1, 0), direction = new Vector3(), quaternion = new Quaternion();
  const angle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - i / (count - 1) * 2, ring = Math.sqrt(1 - y * y);
    const x = Math.cos(angle * i) * ring * 1.5, z = Math.sin(angle * i) * ring * 1.5;
    positions.set([x, y * 1.5, z], i * 3);
    direction.set(-x, -y * 1.5, -z).normalize(); quaternion.setFromUnitVectors(up, direction);
    quaternion.toArray(quaternions, i * 4);
    randoms[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1 * .5 + .5;
  }
  geometry.setAttribute("a_instancePos", new InstancedBufferAttribute(positions, 3));
  geometry.setAttribute("a_instanceQuat", new InstancedBufferAttribute(quaternions, 4));
  geometry.setAttribute("a_instanceRand", new InstancedBufferAttribute(randoms, 1));
  geometry.instanceCount = count;
  reference.dispose();
  return geometry;
}

const colors = ["#c89be9", "#94d9ec", "#a398fa", "#b9c6f6", "#d5b0ef", "#9ee6e1", "#b6a4ff", "#a6c9ef"];
const axes = [[.2, 1, .15], [1, .25, -.4], [-.35, .5, 1], [.7, -.6, .5],
  [-.6, 1, .4], [.4, -.2, 1], [1, .7, .2], [-.8, -.3, 1]];

function BeadedGlobe({ active, mobile, travel, onFailure }) {
  const group = useRef(null), orbs = useRef([]), time = useRef(0);
  const invalidate = useThree(state => state.invalidate), gl = useThree(state => state.gl);
  const geometry = useMemo(() => createBeads(mobile ? 1000 : 2200), [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const motion = useMemo(() => axes.map((axis, index) => {
    const n = new Vector3(...axis).normalize();
    const u = new Vector3().crossVectors(n, Math.abs(n.y) > .9 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0)).normalize();
    return { u, v: new Vector3().crossVectors(n, u).normalize(), phase: index * 1.7 + .5, speed: .3 + (index % 4) * .06 };
  }), []);
  const uniforms = useMemo(() => ({
    u_scale: { value: .07 }, u_breath: { value: 1 }, u_push: { value: .48 }, u_falloff: { value: 4 },
    u_glow: { value: .65 }, u_lightPosition: { value: new Vector3(-3, 4, 5) },
    u_colorDeep: { value: new Color("#313154") }, u_colorBase: { value: new Color("#8785b7") },
    u_colorHot: { value: new Color("#c98bea") }, u_colorSpark: { value: new Color("#94d9ec") }, u_colorRim: { value: new Color("#bbb0ff") },
    u_orbs: { value: motion.map(({ u, v, phase }) => u.clone().multiplyScalar(Math.cos(phase)).addScaledVector(v, Math.sin(phase)).multiplyScalar(1.93)) },
    u_cursor: { value: new Vector3(0, 0, 999) }, u_hover: { value: 0 }, u_hoverRadius: { value: 1 }, u_hoverBulge: { value: 0 },
  }), [motion]);
  const orbUniforms = useMemo(() => colors.map(color => ({ u_color: { value: new Color(color) }, u_lightPosition: uniforms.u_lightPosition, u_intensity: { value: .85 } })), [uniforms]);
  useEffect(() => { uniforms.u_scale.value = mobile ? .105 : .075; invalidate(); }, [mobile, uniforms, invalidate]);
  useEffect(() => {
    const lost = event => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const timer = setInterval(invalidate, 1000 / (mobile ? 20 : 30));
    return () => clearInterval(timer);
  }, [active, mobile, invalidate]);
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, .06);
    const t = time.current;
    const yaw = t * .065 + travel.current.spin;
    group.current.rotation.y += (yaw - group.current.rotation.y) * (1 - Math.exp(-4 * Math.min(delta, .06)));
    uniforms.u_breath.value = 1 + Math.sin(t * .65) * .018;
    motion.forEach(({ u, v, phase, speed }, index) => {
      const a = phase + t * speed;
      const position = uniforms.u_orbs.value[index];
      position.copy(u).multiplyScalar(Math.cos(a)).addScaledVector(v, Math.sin(a)).multiplyScalar(1.93);
      orbs.current[index]?.position.copy(position);
    });
  });
  return <group ref={group} rotation={[-.22, 0, .08]}>
    <mesh><sphereGeometry args={[1.5, 24, 24]} /><meshBasicMaterial color="#17182c" /></mesh>
    <mesh geometry={geometry} frustumCulled={false}><shaderMaterial uniforms={uniforms} vertexShader={spikeVertexShader} fragmentShader={spikeFragmentShader} /></mesh>
    {colors.map((color, index) => <mesh key={color} ref={node => { orbs.current[index] = node; }} position={uniforms.u_orbs.value[index]}>
      <sphereGeometry args={[.23, mobile ? 16 : 24, 16]} />
      <shaderMaterial uniforms={orbUniforms[index]} vertexShader={orbVertexShader} fragmentShader={orbFragmentShader} />
    </mesh>)}
  </group>;
}

function ProjectGlobeScene(props) {
  return <Canvas frameloop="demand" dpr={props.mobile ? 1 : [1, 1.5]} camera={{ position: [0, 0, 8.3], fov: 36, near: .1, far: 30 }}
    gl={{ alpha: true, antialias: !props.mobile, powerPreference: "low-power" }} fallback={null}>
    <BeadedGlobe {...props} />
  </Canvas>;
}
export default memo(ProjectGlobeScene);
