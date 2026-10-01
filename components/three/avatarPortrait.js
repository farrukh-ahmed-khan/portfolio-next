import { Box3, Quaternion, Vector3 } from "three";

// A static presentation pose on the cloned rig. The source GLB stays untouched.
// Lower the outstretched arms so only a natural shoulder line enters the crop.
export function prepareAvatarPortrait(object) {
  object.updateMatrixWorld(true);
  const originalBounds = new Box3().setFromObject(object, true);
  const axis = new Vector3(0, 0, 1);
  for (const [name, angle] of [["LeftArm", -1.25], ["RightArm", 1.25]]) {
    const arm = object.getObjectByName(name);
    if (!arm?.isBone) continue;
    const worldRotation = arm.getWorldQuaternion(new Quaternion());
    const parentRotation = arm.parent.getWorldQuaternion(new Quaternion());
    const lowered = new Quaternion().setFromAxisAngle(axis, angle).multiply(worldRotation);
    arm.quaternion.copy(parentRotation.invert().multiply(lowered));
    object.updateMatrixWorld(true);
  }

  const top = originalBounds.max.y;
  return {
    center: new Vector3(0, top - 0.27, 0.02),
    // Frame the head, shoulders and upper chest, rather than the full-body bounds.
    size: new Vector3(0.66, 0.64, 0.28),
  };
}
