# Project showcase

The projects section follows the split presentation requested from
[Hasnain Irfan's portfolio](https://www.hasnainirfan.com/): project summary and
actions on the left, a large framed website preview on the right, and horizontal
panels driven by normal vertical scrolling. The five selected projects match
Farrukh Ahmed Khan's supplied resume, in order: CueLogic, OutfitIQ, Zelos Foundation,
Texas Center Wellness, and Gofer Assistants. Descriptions, technology tags, and
destination URLs are sourced from its selected projects section. CueLogic includes
the companion iOS and Android app; OutfitIQ includes its Gemini integrations.

Desktop viewports at least 1024px wide and 680px tall use a sticky showcase.
Navigation arrows and labeled dots offer direct access to every project. Hidden
panels are inert and removed from the accessibility tree. Category filters remain
available in the section header. Mobile, short viewports and reduced-motion mode
use a normal vertical list. Case studies use a native modal dialog with Escape,
focus trapping, focus restoration, and the existing full project descriptions.

The decorative beaded globe uses instanced capsule geometry and eight orbiting
spheres which deform and illuminate its surface. It is lazy-loaded, capped at
30 fps on desktop / 20 fps on mobile, and pauses offscreen, in hidden tabs, and
for reduced motion. Desktop uses 2200 instances and DPR up to 1.5; mobile uses
1000 instances and DPR 1. A single fixed canvas travels between measured section
anchors from the hero through the footer, reversing naturally when scrolling up.
Its position, scale, and rotation ease with scroll; orbiting spheres animate on
their own. The globe stays behind section content and never intercepts clicks.
Mobile uses a smaller globe along the bottom edge. Reduced motion keeps it static.
Section resizing and project filtering recalculate the path. The hero nebula
continues its independent time-based animation. No planet was added back.

## Source and license

The globe shaders and capsule distribution are adapted from the MIT-licensed
[HasnainIrfan/3d-portfolio](https://github.com/HasnainIrfan/3d-portfolio), specifically
`lib/globe/globe-shaders.ts` and `helpers/globe-helpers.ts`. Copyright 2026 Hasnain
Irfan. The complete notice is retained in
`public/licenses/hasnain-portfolio-MIT.txt`. The layout is an implementation of the
requested reference composition using this project's existing Framer Motion and
React 18 / Fiber 8 stack. No reference project screenshots or personal content
were copied.

## Previews

Local JPEG screenshots were captured from the portfolio's existing public links
on October 1, 2026, at 1440 x 900 and JPEG quality 82. Runtime previews use these
local images rather than third-party iframes or placeholder image services.

- CueLogic and OutfitIQ: screenshots captured from the resume's public project
  links at the same resolution and quality.
- Zelos Foundation: public launch page; explicitly labeled "Public landing page". The full
  product is currently behind a preview password. No authentication was attempted.
- Texas Center Wellness and Gofer Assistants: screenshots from their linked
  public pages.

## Checks

The original showcase browser checks covered seven desktop scroll positions and viewport alignment,
navigation buttons, category filtering, dialogs, Escape and focus restoration,
mobile stacking, reduced motion, globe lazy loading/offscreen pause, and document
overflow at 320, 390, 768, 1024, 1440 and 1920px. No uncaught browser or shader errors
occurred. Desktop/mobile previews and the globe were visually reviewed. These are
desktop Chromium emulation checks, not physical phone GPU measurements.

After the resume update, Chromium checks passed for all five desktop navigation
positions at 1440 x 900, panel fit, loaded preview images, and case-study dialogs
with Escape dismissal. At 390 x 844, all four category filters displayed the
expected project lists, the healthcare case study included CharmHealth EHR and
QuickBooks Online, and there was no horizontal overflow. No uncaught browser
errors occurred. Production build and lint passed; lint retains the existing
`next/no-img-element` warning in `components/About.jsx`.

The full-page globe check passed for one persistent canvas, all six section
positions plus the footer, side-to-side travel, reverse scrolling, pointer
transparency, and project dialog interaction. Reduced-motion mode holds its
position and stops ongoing rendering after layout settles. Mobile sizing and
horizontal overflow checks passed at 320, 390, 768, 1024, 1440, and 1920px with
no browser or shader errors. The production build also passed.
