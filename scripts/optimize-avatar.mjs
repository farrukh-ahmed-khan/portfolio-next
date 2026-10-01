import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { NodeIO } from "@gltf-transform/core";
import { EXTMeshoptCompression } from "@gltf-transform/extensions";
import { MeshoptEncoder, MeshoptDecoder } from "meshoptimizer";

// Generate a delivery asset; never overwrite the user's original GLB.
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
const io = new NodeIO().registerExtensions([EXTMeshoptCompression]).registerDependencies({
  "meshopt.encoder": MeshoptEncoder, "meshopt.decoder": MeshoptDecoder,
});
const source = await readFile(new URL("../public/models/farrukh.glb", import.meta.url));
const original = await io.readBinary(source);
const document = await io.readBinary(source);
const root = document.getRoot();
assert.equal(root.listAnimations().length, 0, "Revisit optimization if animation clips are added.");
for (const node of root.listNodes()) {
  assert(node.getWeights().every(weight => weight === 0), "Cannot remove an active expression.");
}
const unused = new Set();
for (const mesh of root.listMeshes()) {
  assert(mesh.getWeights().every(weight => weight === 0), "Cannot remove an active expression.");
  mesh.setWeights([]);
  for (const primitive of mesh.listPrimitives()) {
    for (const target of primitive.listTargets()) {
      target.listAttributes().forEach(attribute => unused.add(attribute));
      primitive.removeTarget(target);
      target.dispose();
    }
  }
}
for (const accessor of unused) {
  if (accessor.listParents().every(parent => parent === root)) accessor.dispose();
}
// No quantize(), simplify(), texture conversion, or lossy encoder filters.
document.createExtension(EXTMeshoptCompression).setRequired(true)
  .setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
const bytes = await io.writeBinary(document);
const decoded = (await io.readBinary(bytes)).getRoot();
const originalRoot = original.getRoot();
const digest = data => createHash("sha256").update(data).digest("hex");
assert.deepEqual(decoded.listTextures().map(t => digest(t.getImage())), originalRoot.listTextures().map(t => digest(t.getImage())), "Original texture bytes must remain identical.");
assert.deepEqual(decoded.listNodes().map(n => [n.getName(), n.getMatrix()]), originalRoot.listNodes().map(n => [n.getName(), n.getMatrix()]), "Rig transforms must remain identical.");
assert.equal(decoded.listSkins().length, originalRoot.listSkins().length);
for (const [index, skin] of decoded.listSkins().entries()) {
  const before = originalRoot.listSkins()[index];
  assert.deepEqual(skin.listJoints().map(n => n.getName()), before.listJoints().map(n => n.getName()));
  assert.deepEqual(skin.getInverseBindMatrices().getArray(), before.getInverseBindMatrices().getArray());
}
for (const [index, mesh] of decoded.listMeshes().entries()) {
  for (const [p, primitive] of mesh.listPrimitives().entries()) {
    const before = originalRoot.listMeshes()[index].listPrimitives()[p];
    for (const semantic of before.listSemantics()) {
      assert.deepEqual(primitive.getAttribute(semantic).getArray(), before.getAttribute(semantic).getArray(), `Lossless ${semantic}`);
    }
    // Meshopt may rotate a triangle's three indices without changing its winding.
    const a = before.getIndices().getArray(), b = primitive.getIndices().getArray();
    assert.equal(a.length, b.length);
    for (let i = 0; i < a.length; i += 3) {
      assert([0, 1, 2].some(offset => [0, 1, 2].every(k => a[i + k] === b[i + (k + offset) % 3])), "Triangle topology must remain identical.");
    }
  }
}
const hash = digest(bytes).slice(0, 12);
const url = `/models/farrukh-hero.${hash}.glb`;
await writeFile(new URL(`../public${url}`, import.meta.url), bytes);
await writeFile(new URL("../data/avatarAsset.json", import.meta.url), JSON.stringify({ url, bytes: bytes.length, sourceBytes: source.length }, null, 2) + "\n");
console.log(`${source.length.toLocaleString()} → ${bytes.length.toLocaleString()} bytes (${(100 - bytes.length / source.length * 100).toFixed(1)}% smaller). Textures, vertex attributes, topology, and rig verified.`);
