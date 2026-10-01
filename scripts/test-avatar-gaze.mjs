import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Texture, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createAvatarGaze } from "../components/three/avatarGaze.js";
import { prepareAvatarPortrait } from "../components/three/avatarPortrait.js";
import { prepareAvatarMaterials } from "../components/three/avatarMaterials.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const bytes = await readFile(new URL("../public/models/farrukh.glb", import.meta.url));
const loader = new GLTFLoader();
// Rig tests need the actual geometry/skin, but do not need browser image decoding.
loader.register(() => ({ name: "test-texture-stub", loadTexture: () => Promise.resolve(new Texture()) }));
const { scene } = await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
scene.updateMatrixWorld(true);
const portrait = prepareAvatarPortrait(scene);
for (const name of ["LeftHand", "RightHand", "LeftFoot", "RightFoot"]) {
  const position = scene.getObjectByName(name).getWorldPosition(new Vector3());
  assert(position.y < portrait.center.y - portrait.size.y / 2, `${name} must stay below the portrait crop`);
}
const rest = new Map();
scene.traverse((node) => rest.set(node, {
  quaternion: node.quaternion.clone(), position: node.position.clone(), scale: node.scale.clone(),
}));
const gaze = createAvatarGaze(scene);
const names = ["Head", "LeftEye", "RightEye"];
const bones = names.map((name) => scene.getObjectByName(name));
assert(bones.every((bone) => bone?.isBone));
const forward = (bone) => new Vector3(0, 0, 1).applyQuaternion(bone.getWorldQuaternion(bone.quaternion.clone()));
const settle = (x, y) => {
  for (let frame = 0; frame < 180; frame++) gaze.update(x, y, 1 / 30);
  scene.updateMatrixWorld(true);
};

settle(1, 0);
assert(bones.every((bone) => forward(bone).x > 0.1), "Head and both eyes must look right");
const clamped = bones.map((bone) => bone.quaternion.clone());
settle(100, 0);
assert(bones.every((bone, index) => bone.quaternion.angleTo(clamped[index]) < 0.0001), "Far-away pointers must clamp");
settle(-1, 0);
assert(bones.every((bone) => forward(bone).x < -0.1), "Head and both eyes must look left");

settle(0, -1);
const up = bones.map((bone) => forward(bone).y);
settle(0, 1);
assert(bones.every((bone, index) => forward(bone).y < up[index]), "Downward cursor must lower gaze");
for (const [node, original] of rest) {
  assert(node.position.equals(original.position) && node.scale.equals(original.scale), "No proportions or joint positions may change");
  if (!names.includes(node.name)) assert(node.quaternion.equals(original.quaternion), `Unexpected rotation: ${node.name}`);
}

settle(0, 0);
assert(bones.every((bone) => bone.quaternion.angleTo(rest.get(bone).quaternion) < 0.0001), "Pointer leave must ease back to rest");
settle(1, 1);
gaze.reset();
assert(bones.every((bone) => bone.quaternion.equals(rest.get(bone).quaternion)), "Reduced motion must restore the exact bind pose");
console.log("Avatar portrait and gaze passed: hands/feet below crop, directional gaze, limits, neutral return, exact reset, and unchanged proportions/body pose.");

const sourceMeshes = [];
scene.traverse(node => { if (node.isMesh) sourceMeshes.push({ node, material: node.material, geometry: node.geometry }); });
const illustrated = clone(scene);
const presentation = prepareAvatarMaterials(illustrated);
assert.equal(presentation.outlined.length, 3, "Outline the head, body and outfit; keep alpha hair free of false seams");
for (const { node, material, geometry } of sourceMeshes) {
  const styled = illustrated.getObjectByName(node.name);
  assert.equal(node.material, material, "Source materials must not be modified");
  assert.equal(styled.geometry, geometry, "Styling must not replace or deform geometry");
  assert.equal(styled.material.map, material.map, "Use the original maps and UVs");
  if (material.name === "outfit") {
    assert.equal(styled.material.color.getHexString(), "555d85", "Grade only the clothing to the slate theme");
  } else {
    assert(styled.material.color.equals(material.color), "Preserve natural facial and hair colors");
  }
  assert.equal(styled.material.normalMap, material.normalMap, "Keep the original surface textures");
  assert.equal(styled.material.opacity, material.opacity, "Keep transparent corneas and lenses");
  assert(styled.skeleton !== node.skeleton, "The presentation must use its own rig");
}
presentation.dispose();
console.log("Portrait materials passed: original facial colors/maps and geometry, slate clothing tint, unchanged source materials, transparent lenses, isolated rig.");
