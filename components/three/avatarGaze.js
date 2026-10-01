import { Euler, MathUtils, Quaternion } from "three";

// Apply small offsets to the supplied bind pose, never accumulate rotations.
export function createAvatarGaze(object) {
  const joints = [
    { name: "Head", yaw: 0.35, pitch: 0.18, speed: 5 },
    { name: "LeftEye", yaw: 0.16, pitch: 0.10, speed: 10 },
    { name: "RightEye", yaw: 0.16, pitch: 0.10, speed: 10 },
  ].flatMap((settings) => {
    const bone = object.getObjectByName(settings.name);
    return bone?.isBone ? [{ ...settings, bone, rest: bone.quaternion.clone() }] : [];
  });
  const offset = new Quaternion();
  const desired = new Quaternion();
  const angles = new Euler(0, 0, 0, "YXZ");

  return {
    update(x, y, delta) {
      const horizontal = MathUtils.clamp(x, -1, 1);
      const vertical = MathUtils.clamp(y, -1, 1);
      for (const joint of joints) {
        angles.set(vertical * joint.pitch, horizontal * joint.yaw, 0, "YXZ");
        offset.setFromEuler(angles);
        desired.copy(joint.rest).multiply(offset);
        joint.bone.quaternion.slerp(desired, 1 - Math.exp(-joint.speed * delta));
      }
    },
    reset() {
      for (const joint of joints) joint.bone.quaternion.copy(joint.rest);
    },
  };
}
