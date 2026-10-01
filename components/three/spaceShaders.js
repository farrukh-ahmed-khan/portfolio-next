// Procedural color and geometry only: no photographs, textures or input uniforms.
const noise = `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
               mix(hash(i + vec2(0., 1.)), hash(i + vec2(1.)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.; float weight = .5;
    for (int i = 0; i < 4; i++) {
      value += weight * noise(p);
      p = mat2(.8, -.6, .6, .8) * p * 2.03 + 7.1;
      weight *= .5;
    }
    return value;
  }
`;

export const nebulaVertex = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, .999, 1.); }
`;
export const nebulaFragment = `
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;
  ${noise}
  void main() {
    vec2 p = (vUv - .5) * vec2(uAspect, 1.);
    float t = uTime * .018;
    float warp = fbm(p * 2.3 + vec2(t, -t * .6));
    float clouds = fbm(p * 4. + vec2(warp * 2.1, t));
    float ribbon = exp(-pow((p.y - p.x * .35 + .08 + (warp - .5) * .65) * 3.5, 2.));
    float dust = smoothstep(.25, .78, clouds) * ribbon;
    vec3 color = vec3(.018, .025, .059);
    color += vec3(.19, .075, .32) * dust * 1.1;
    color += vec3(.035, .19, .24) * ribbon * pow(clouds, 3.) * 2.;
    color += vec3(.10, .07, .20) * exp(-length(p - vec2(.4, .1)) * 2.5);
    color *= .7 + .3 * smoothstep(.0, .65, vUv.x);
    gl_FragColor = vec4(color, 1.);
  }
`;

export const starVertex = `
  uniform float uTime;
  uniform float uDpr;
  attribute float aSize;
  attribute float aPhase;
  varying float vGlow;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uDpr * 17. / -mv.z, 1., 4.);
    vGlow = .45 + .25 * sin(uTime * .65 + aPhase);
  }
`;
export const starFragment = `
  varying float vGlow;
  void main() {
    float r = length(gl_PointCoord - .5) * 2.;
    if (r > 1.) discard;
    gl_FragColor = vec4(.73, .79, 1., pow(1. - r, 1.5) * vGlow);
  }
`;
