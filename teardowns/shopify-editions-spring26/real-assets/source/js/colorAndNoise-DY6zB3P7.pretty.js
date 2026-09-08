var e = `
  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 applyHsl(vec3 col, vec3 hsl) {
    vec3 hsv = rgb2hsv(col);
    hsv.x = fract(hsv.x + hsl.x);
    hsv.y = clamp(hsv.y * (1.0 + hsl.y), 0.0, 1.0);
    hsv.z = clamp(hsv.z * (1.0 + hsl.z), 0.0, 2.0);
    return hsv2rgb(hsv);
  }
`,
    t = `
  float hashLattice(vec3 cell) {
    return fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }

  float cnoise(vec3 v) {
    vec3 cell = floor(v);
    vec3 frac = fract(v);
    vec3 weight = frac * frac * (3.0 - 2.0 * frac);

    float c000 = hashLattice(cell + vec3(0.0, 0.0, 0.0));
    float c100 = hashLattice(cell + vec3(1.0, 0.0, 0.0));
    float c010 = hashLattice(cell + vec3(0.0, 1.0, 0.0));
    float c110 = hashLattice(cell + vec3(1.0, 1.0, 0.0));
    float c001 = hashLattice(cell + vec3(0.0, 0.0, 1.0));
    float c101 = hashLattice(cell + vec3(1.0, 0.0, 1.0));
    float c011 = hashLattice(cell + vec3(0.0, 1.0, 1.0));
    float c111 = hashLattice(cell + vec3(1.0, 1.0, 1.0));

    float x00 = mix(c000, c100, weight.x);
    float x10 = mix(c010, c110, weight.x);
    float x01 = mix(c001, c101, weight.x);
    float x11 = mix(c011, c111, weight.x);
    float y0 = mix(x00, x10, weight.y);
    float y1 = mix(x01, x11, weight.y);
    return mix(y0, y1, weight.z) * 2.0 - 1.0;
  }
`;
export {
    t as n, e as t
};
//# sourceMappingURL=colorAndNoise-DY6zB3P7.js.map