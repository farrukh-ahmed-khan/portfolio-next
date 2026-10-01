// Adjust only cloned presentation materials; preserve original maps and facial colors.
export function prepareAvatarMaterials(object) {
  const materials = [];
  const outlined = [];
  object.traverse((mesh) => {
    if (!mesh.isMesh) return;
    const original = mesh.material;
    if (original.name.includes("Cornea")) return;
    const material = original.clone();
    // Softer surface detail under portrait lighting, without flattening facial color.
    if (material.normalMap) material.normalScale.multiplyScalar(0.3);
    material.envMapIntensity = 0.4;
    // Grade the existing shirt to the site's slate palette, retaining its texture.
    if (original.name === "outfit") {
      material.color.set("#555d85");
      material.roughness = 1;
    }
    mesh.material = material;
    materials.push(material);
    // Hair uses alpha-cut strands: an opaque outline shell would draw false seams.
    // Its silhouette is picked out by the violet rim light instead.
    if (/Head|Body/.test(original.name) || original.name === "outfit") {
      outlined.push(mesh);
    }
  });
  return { outlined, dispose: () => materials.forEach((material) => material.dispose()) };
}
