# Farrukh hero avatar

The supplied `model.glb` is copied byte-for-byte to `public/models/farrukh.glb`.
The hero loads a compressed derivative of that same model, with identical vertex
attributes, texture bytes, and rig transforms. No replacement character, texture
substitution, or structural skeleton edits are applied. Cursor-driven gaze rotates the existing head and eye
bones at runtime, following the requested face/eye interaction. A static relaxed
arm pose and a head-and-shoulders camera crop hide the hands and lower body.

## Inspection

| Property | Result |
| --- | --- |
| Format / size | glTF 2 binary; 15,713,308 bytes (14.99 MiB) |
| SHA-256 | `ABDC51DD13D5472B32F6DE57A0C028FE304ECC5029117B676B74AEE0DC8A42BC` |
| Dimensions (X / Y / Z) | 1.760175 / 1.826559 / 0.311610 model units |
| Minimum XYZ | -0.880087 / 0 / -0.138986 |
| Maximum XYZ | 0.880088 / 1.826559 / 0.172623 |
| Orientation | Y up, face toward +Z; no axis correction needed |
| Original origin | Ground level, approximately between the feet; root has identity transform |
| Geometric center | 0.000001 / 0.913279 / 0.016818 |
| Rig | 73 bones; all 12 meshes are skinned |
| Geometry | 72,640 vertices; 109,968 triangles |
| Animation clips | None |
| Morph targets | Head: 51; eyelashes: 29; lower teeth: 4; left untouched |
| Materials | 12 original PBR materials |
| Embedded textures | 21 images: 19 JPEG and 2 PNG; 16 at 1024², 3 at 512², 2 at 256² |
| External asset dependencies | None; no compression extensions required |

Bounds were checked using Three.js GLTFLoader and the loaded skinned geometry.
The approximately 1.83-unit height is consistent with glTF's meter convention.
The source contains an arms-out pose and no idle clip. The displayed clone lowers
the upper arms by about 72 degrees once, using their existing joints, to produce
a relaxed shoulder line for the portrait. There is no limb animation.

Materials cover the body, eyelashes, head, left/right corneas and eyeballs, lower
and upper teeth, glasses, hair, and outfit. Maps include base color,
metallic/roughness, normals, and hair occlusion. Original alpha blending for
corneas, glasses, and hair is preserved.

## Integration

- `components/three/AvatarHero.jsx`: immediate client scene loading,
  visibility and input tracking, reduced-motion preference, and error boundary.
- `components/three/AvatarScene.jsx`: React Three Fiber Canvas, warm key,
  cool fill, lavender rim, and a small local softbox environment.
- `components/three/FarrukhModel.jsx`: rig-safe clone, bounds-based camera
  fitting, centering, subtle object-level idle, and cursor gaze.
- `components/three/avatarGaze.js`: bounded head and eye rotations relative to
  their original local quaternions, with faster eye response than head response.
- `components/three/avatarPortrait.js`: static relaxed arm pose on the clone and
  the camera's head-and-shoulders framing region.
- `components/three/avatarMaterials.js`: cloned original PBR materials with
  softer normal-map strength, preserving facial colors and all original maps.

The model remains at scale 1. Its center is translated to the presentation pivot;
the original bone hierarchy, joint positions, mesh transforms, and textures remain intact.
The displayed clone uses the original natural skin and hair colors. The existing
shirt material is tinted slate (#555d85) to match the surrounding theme; its
texture is retained. Normal strength is 30% for softer detail under portrait lighting. The source
PBR materials remain untouched in the cached GLB. A thin muted-violet contour
shares the existing geometry and skeleton; no replacement character is used.
The perspective camera fits a 0.66-unit wide, 0.64-unit tall portrait region with
padding on resize. The presentation center is 0.27 units below the original top
of the head, with a Z offset of 0.02. Hands and feet remain below the crop.
The canvas has a crisp elliptical bust crop. The chest remains fully opaque,
with a soft violet glow and a fine tilted orbit line behind the portrait.
A small starting yaw faces the portrait slightly toward the hero text. The head
follows the cursor within ±0.35 radians yaw (20°) and ±0.18 radians pitch (10°).
Each eye adds at most ±0.16 radians yaw (9°) and ±0.10 radians pitch (6°), relative
to the head. Both corneas and eyeballs follow their existing eye bones. The target
is relative to the projected face position, so the character looks toward the
pointer even though it sits on the right of the hero. The gaze eases to neutral
on pointer leave/window blur, and resets immediately for reduced motion or touch.
Body idle yaw remains ±0.012 radians, vertical idle ±0.003 units, and scroll offset
0.012 units. Mobile idle is halved and gaze is disabled on coarse pointers.

The hero uses a separate right column from 1024px upward and stacks on smaller
screens. Its transparent background, subtle orbit outline, lavender rim lighting,
and muted caption match the cosmic theme described in `docs/cosmic-theme.md`.
The portrait has no separate opaque panel.

## Performance and failures

The original asset remains untouched. `npm run optimize:avatar` creates a
content-hashed delivery GLB (6,199,540 bytes versus 15,713,308, a 60.5% reduction).
It removes 84 unused, zero-weight morph target accessors and applies lossless
Meshopt compression without quantization, simplification, or texture conversion.
The script verifies decoded vertex attributes, triangle topology, texture bytes,
joint transforms, and inverse bind matrices against the source. It refuses models
with animation clips or active morph weights. Regenerate if the source changes.

`data/avatarAsset.json` shares the generated URL between the server preload and
client loader. The HTML preloads the binary before scene JavaScript arrives;
`useGLTF.preload` starts decoding while the Canvas initializes. The content-hashed
asset receives a one-year immutable cache header. The decoder ships with drei;
no decoder CDN or extra texture requests are needed. The generation dependencies
are development-only. Mobile uses DPR 1, no antialiasing,
and a 24 fps rendering cap; desktop uses DPR at most 1.5 and a 30 fps cap.
A local 128px environment is generated once; there is no remote HDR download.
There are no
postprocessing effects, shadow passes, orbit controls, or skeletal idle clips.
Only three existing bones receive cursor-driven gaze; unused morph targets are
omitted from the delivery file and retained in the original GLB.
Frames pause outside the viewport and in hidden tabs. Reduced motion renders a
static pose; resize still refits the camera. WebGL, context-loss, or asset-loading
failures display a short status message rather than substitute a character.

Dependency versions use Fiber 8 and drei 9 for the project's React 18 runtime.
The project is JavaScript/JSX and has no standalone TypeScript check configured.

## Validation

- Production build passed, including Next.js lint and type-validity stages.
- Standalone lint passed; existing `no-img-element` warnings remain in About and
  Projects. Existing section-label and apostrophe lint errors were fixed without
  changing their displayed content.
- Chromium viewport checks passed at 1920, 1440, 1280, 1024, 768, 430, 390,
  and 320px. No document overflow or desktop portrait/text overlap was detected.
- Desktop and mobile screenshots were visually checked for portrait framing,
  outlined appearance, and lighting.
- Instrumented WebGL drawing confirmed animation when visible and zero draws
  after settling offscreen or switching reduced motion on at runtime.
- Browser checks confirmed DPR 1 on mobile and at most 1.5 on desktop.
- Simulated missing GLB and disabled WebGL both showed the status message.
- No uncaught page errors occurred during normal browser checks.
- Source and project GLB hashes match exactly.
- `node scripts/test-avatar-gaze.mjs --optimized` checks the delivery asset using
  the same Meshopt decoder as drei; gaze, framing, materials and proportions pass.
- Production Chromium checks confirmed one HTML-preloaded model request, immutable
  cache headers, zero transferred model bytes on reload, and desktop/mobile
  rendering without browser or shader errors. Both portrait screenshots were
  visually reviewed after optimization. Local timing is not a mobile-network benchmark.
- `node scripts/test-avatar-gaze.mjs` verifies left/right and up/down gaze,
  angle clamping, neutral return, exact reduced-motion reset, and unchanged
  proportions and static body pose using the actual GLB rig. It also verifies
  that both hands and both feet are below the portrait region.
- Browser screenshots confirm distinct left/right head and eye poses, with no
  uncaught errors. Responsive, offscreen-pause, reduced-motion, and fallback
  checks were rerun after adding gaze and passed.

These are desktop Chromium emulation checks, not physical mobile GPU benchmarks.

The current development preview uses port 3000. During
setup, the C: drive was full; the disposable `.next/cache` was preserved at
`D:\codex-project-cache\portfolio-website-next-avatar` with a directory junction
at its original location. This local cache is git-ignored and is not a deployment
dependency.
