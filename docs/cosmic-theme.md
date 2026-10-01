# Midnight observatory theme

The portfolio now uses a midnight navy background, lavender accents, ice blue
details, and a procedural Three.js space background. The hero retains
Farrukh's exact GLB as a head-and-shoulders portrait with cursor-driven head and
eye tracking. A separate original floating astronaut accompanies the contact
section. All portfolio data, project links, contact handling, and SEO identity
remain sourced from the existing project.

## Files

- `app/cosmic.css`: theme, responsive layouts, backgrounds, and section styling.
- `components/SpaceBackdrop.jsx`: lazy background scene, visibility, device and
  reduced-motion handling, error boundary, and CSS gradient fallback.
- `components/three/SpaceScene.jsx`: animated 3D stars and nebula.
- `components/three/spaceShaders.js`: procedural nebula and star shaders;
  no image textures or input-position uniforms.
- `components/three/Astronaut.jsx`: lazy loading, visibility and motion settings.
- `components/three/AstronautScene.jsx`: original procedural astronaut geometry,
  studio lighting, visor, backpack, control panel, gloves, boots, and tether.

The astronaut is actual React Three Fiber geometry, not a downloaded character
or replacement for Farrukh's avatar. It has no remote assets or textures. Its
rendering is capped at 24 fps, pauses offscreen/in hidden tabs, and stops for
reduced motion. Mobile DPR is 1; desktop DPR is capped at 1.5.

The hero background animates from elapsed time only: slowly rotating stars and
flowing purple-blue nebula
light. There are no pointer, keyboard or scroll-driven animation inputs. Rendering
uses demand mode capped at 24 fps, with 720 stars and DPR 1 on desktop; mobile
uses 240 stars, 20 fps and DPR 0.75. Visibility pauses rendering offscreen and in
hidden tabs. Reduced motion displays a still scene and responds to live preference
changes. The nebula uses one fullscreen shader pass; there is no postprocessing,
external texture download, bloom, or real-time shadow pass. WebGL errors/context
loss leave a quiet CSS gradient. The landscape JPEG is no longer requested.

The portrait uses natural facial colors and original PBR textures from the exact
supplied GLB, with a slate clothing tint, subtle contour and violet rim light. A solid elliptical
bust crop replaces the chest fade. A soft glow and a fine tilted orbit line frame
the portrait without an opaque circular panel. It retains the original face, glasses, beard and
eye tracking. This presentation is separate from the autonomous background motion.

## Inspiration and original work

The supplied [reference site](https://www.hasnainirfan.com/) and its
[astronaut component](https://github.com/HasnainIrfan/3d-portfolio/blob/main/components/portfolio/astronaut.tsx)
were inspected for the composition and use of 3D. No personal content,
background artwork, astronaut asset, or source code was copied from that repo.
The palette, layout, landscape, and astronaut implementation here are original.

## Previous background artwork (unused)

Created with the built-in image generation tool through the imagegen skill.
The generated PNG remains at:

`C:/Users/Farrukh Khan/.codex/generated_images/01a0f3a1-4510-7b03-bb3b-0ca51911e7c2/exec-820dced0-f82a-4e8d-aec4-588bbe665f98.png`

Its JPEG copy remains at `public/images/cosmic-horizon.jpg` for provenance, but is
not used by the current site. The Three.js background has no image dependencies.

Final generation prompt:

> Use case: stylized-concept. Create an original premium cinematic space landscape background for a developer portfolio website. Wide landscape composition, 16:9. Alien basalt mountain valley surrounding a still reflective lake, a huge softly lit ringed planet far in the upper right sky, one small distant moon, sparse tiny stars, wispy cosmic dust and aurora. Deep midnight navy and indigo dominate, restrained lavender nebulae, icy teal reflections, a thin warm peach glow near the distant horizon. Sophisticated painterly sci-fi matte painting with convincing depth and fine details, atmospheric, quiet, beautiful. Compose mountains along bottom edge and right edge, keep left half and central upper sky low-detail and very dark so white headings can be laid over it. Keep bottom edge near-black for seamless blending into a dark page. No astronaut, no people, no text, no letters, no logos, no UI. This is a new artwork, do not copy any existing site's image. Save the generated image as a local project asset and report its local file path.

## Validation

Production build and lint pass with the two pre-existing Next/Image suggestions
in About and Projects. The avatar rig tests pass. Chromium checks cover widths
1920, 1440, 1280, 1024, 768, 430, 390, and 320px, mobile navigation, contact form
validation, lazy astronaut loading, and normal browsing without uncaught errors.
Contact testing uses invalid input only and sends no messages.

Instrumented WebGL checks confirmed that the astronaut animates while the hero
is paused, both scenes stop under reduced motion, and the astronaut stops drawing
offscreen. Mobile astronaut DPR 1 and project filtering were also verified.
The supplied Farrukh GLB still matches its original SHA-256. These browser tests
use desktop Chromium viewport emulation, not physical mobile GPU benchmarks.

The model test also verifies that natural material styling preserves source
materials, facial colors, shared geometry, maps, and lens transparency. Clothing
alone receives a slate tint on the displayed clone. The top-right planet and its
atmosphere were removed at the user's request; the background retains only the
animated nebula and stars.

The Three.js background was checked in Chromium at 320, 390, 768, 1024, 1440,
and 1920px. Instrumented WebGL confirmed autonomous drawing, no time-uniform
updates from mouse/keyboard/scroll input with the clock paused, and no continuous
drawing offscreen or under reduced motion. Mobile background DPR is 0.75. No old
landscape request, horizontal overflow, shader error or uncaught browser error
occurred. Desktop/mobile screenshots were reviewed with the natural-color avatar.

`NEXT_BUILD_DIR` supports a separate production validation directory while the
user's development server runs. The local `.next-verify` output is git-ignored;
normal development and production builds continue to use `.next` by default.
