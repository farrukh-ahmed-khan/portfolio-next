"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { Outlines, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { createAvatarGaze } from "./avatarGaze";
import { prepareAvatarPortrait } from "./avatarPortrait";
import { prepareAvatarMaterials } from "./avatarMaterials";

export default function FarrukhModel({ input, active, mobile, reducedMotion, onReady }) {
  const { scene } = useGLTF("/models/farrukh.glb");
  const group = useRef(null);
  const time = useRef(0);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const model = useMemo(() => {
    // Style only this cloned rig; the cached source and its materials remain untouched.
    const object = clone(scene);
    const portrait = prepareAvatarPortrait(object);
    const box = new Box3().setFromObject(object, true);
    const face = object.getObjectByName("Head");
    const facePosition = face ? face.getWorldPosition(new Vector3()).add(new Vector3(0, 0.07, 0)) : box.getCenter(new Vector3());
    return {
      object, center: portrait.center, size: portrait.size,
      facePosition, projectedFace: new Vector3(), gaze: createAvatarGaze(object),
      presentation: prepareAvatarMaterials(object),
    };
  }, [scene]);

  useLayoutEffect(() => {
    // Fit the portrait crop, with room for head turns and subtle idle movement.
    // Camera moves to fit; the model stays at its original uniform scale of 1.
    const aspect = size.width / Math.max(size.height, 1);
    const tangent = Math.tan(MathUtils.degToRad(camera.fov / 2));
    const distance = Math.max(model.size.y / (2 * tangent), model.size.x / (2 * tangent * aspect)) * 1.04 + model.size.z / 2;
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, model, invalidate]);

  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => () => model.presentation.dispose(), [model]);
  useEffect(() => {
    if (reducedMotion || mobile) model.gaze.reset();
    if (reducedMotion && group.current) {
      group.current.rotation.set(0, -0.08, 0);
      group.current.position.set(0, 0, 0);
      invalidate();
    }
    invalidate();
  }, [reducedMotion, mobile, model, invalidate]);

  useFrame((_, delta) => {
    if (!active || reducedMotion || !group.current) return;
    const step = Math.min(delta, 0.06);
    time.current += step;
    const t = time.current;
    const amount = mobile ? 0.5 : 1;
    const target = input.current;
    // Idle remains object-level. Cursor gaze uses only the existing head/eye bones.
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.08 + Math.sin(t * 0.45) * 0.012, 4, step);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, 0, 4, step);
    group.current.position.y = MathUtils.damp(group.current.position.y, Math.sin(t * 0.8) * 0.003 * amount + target.scroll * 0.012 * amount, 4, step);
    group.current.updateWorldMatrix(true, false);
    model.projectedFace.copy(model.facePosition).sub(model.center).applyMatrix4(group.current.matrixWorld).project(camera);
    const following = target.tracking && !mobile;
    model.gaze.update(
      following ? (target.x - model.projectedFace.x) * 0.65 : 0,
      following ? -(target.y - model.projectedFace.y) * 0.7 : 0,
      step,
    );
  });

  return (
    <group ref={group} rotation={[0, -0.08, 0]} dispose={null}>
      <primitive object={model.object} position={[-model.center.x, -model.center.y, -model.center.z]} />
      {model.presentation.outlined.map((mesh) => createPortal(
        <Outlines angle={0} thickness={0.55} color="#38334e" toneMapped={false} />,
        mesh,
      ))}
    </group>
  );
}
