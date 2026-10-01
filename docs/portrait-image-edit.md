# Portrait background edit

The built-in imagegen tool removed the red backdrop from the original portrait.
The selected PNG is saved at `public/profile.png`, with genuine alpha transparency.
The About card supplies a navy (`#101628`) background with a subtle lavender glow
in `app/cosmic.css`. The original generated output is retained in the tool's
generated-images directory.

Desktop (1440 x 900) and mobile (390 x 844) browser previews were visually checked.
The image loads correctly, the themed background is applied, and mobile has no
horizontal overflow. Lint passes with the existing About image-element warning.

## Final prompt

Use case: background-extraction. Asset type: existing personal portrait photo for the About section of a dark navy portfolio website. Input image 1 is the edit target, the original photograph. Remove ONLY the red backdrop and export the subject as a clean PNG cutout with genuine transparent alpha. Preserve the photographed man exactly: same facial identity, natural skin texture, expression, head shape, hairstyle including fine flyaway strands, beard, transparent eyeglass lenses and frames, suit, white shirt, black tie, original square composition, head size, shoulder position and crop. Keep all original subject colors, lighting and photographic details. Clean red spill at the outer silhouette without changing the person. Do not retouch, beautify, redraw or restyle the face. Do not add any background, color fill, gradient, text, watermark or new object. The transparency will reveal the website's dark navy and subtle lavender CSS backdrop.
