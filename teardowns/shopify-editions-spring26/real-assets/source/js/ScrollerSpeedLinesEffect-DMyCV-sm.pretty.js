import {
    $a as e,
    Qa as t,
    Va as n
} from "./three.core-DVcoLpfz.js";
import {
    n as r,
    t as i
} from "./build-BrX_XJXO.js";
import {
    n as a,
    r as o,
    t as s
} from "./ScrollerSpeedLinesSettings-BRNWmK7Y.js";
var c = `
  uniform vec2 resolution;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uScrollDirection;
  uniform vec2 uGazeOffset;
  uniform float uStrength;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uBendStrength;
  uniform float uCenterFollow;
  uniform float uLineWidth;
  uniform float uLineColorShift;
  uniform float uRgbShift;
  uniform vec3 uRgbStrength;
  uniform vec3 uTintColor;
  uniform float uTintMix;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float hash11(float value) {
    return fract(sin(value * 127.1) * 43758.5453123);
  }

  float speedLineSeed(vec2 uv, float density) {
    return hash11(floor(uv.x * 128.0 * density));
  }

  float vDrop(vec2 uv, float t, float density, float lineWidth) {
    uv.x = uv.x * 128.0 * density;
    float dx = fract(uv.x);
    uv.x = floor(uv.x);
    uv.y *= 0.05;
    float o = sin(uv.x * 215.4);
    float s = cos(uv.x * 33.1) * 0.3 + 0.7;
    float trail = mix(95.0, 35.0, s);
    float yv = fract(uv.y + t * s + o) * trail;
    yv = 1.0 / yv;
    yv = smoothstep(0.0, 1.0, yv * yv);
    yv = sin(yv * 3.14159) * (s * 5.0);
    float d2 = sin(dx * 3.14159);
    float width = clamp(lineWidth, 0.01, 1.0);
    float line = width >= 0.999 ? d2 : smoothstep(1.0 - width, 1.0, d2);
    return yv * (line * line);
  }

  vec2 bendTunnelPoint(vec2 p, float steer, float strength) {
    // Bend the tunnel walls around the vanishing point. The vanishing point
    // itself is shifted separately by uCenterFollow so the tunnel endpoint
    // can follow the popup/car movement without smearing the whole image.
    float baseRadius = length(p);
    float wallBend = smoothstep(0.04, 0.75, baseRadius);
    float edgeRelease = 1.0 - smoothstep(1.0, 1.45, baseRadius);
    p.x -= steer * p.y * p.y * wallBend * edgeRelease * 0.36 * strength;
    return p;
  }

  vec2 tunnelCenter(float steer, float centerFollow) {
    return 0.5 * resolution.xy + vec2(-steer * centerFollow * resolution.y * 0.35, 0.0);
  }

  vec2 bendSceneUv(vec2 uv, float steer, float strength, float centerFollow) {
    vec2 center = tunnelCenter(steer, centerFollow);
    vec2 p = (uv * resolution.xy - center) / resolution.y;
    p = bendTunnelPoint(p, steer, strength * 0.5);
    return (p * resolution.y + center) / resolution.xy;
  }

  vec3 getTunnelEffect(
    vec2 fragCoord,
    float time,
    float direction,
    vec2 gazeOffset,
    float density,
    float bendStrength,
    float centerFollow,
    float lineWidth,
    float lineColorShift,
    float rgbShift,
    vec3 rgbStrength,
    vec3 tintColor,
    float tintMix
  ) {
    float steer = clamp(gazeOffset.x, -1.0, 1.0);
    vec2 center = tunnelCenter(steer, centerFollow);
    vec2 p = (fragCoord.xy - center) / resolution.y;
    p = bendTunnelPoint(p, steer, bendStrength);

    float d = length(p) + 0.1;
    float angle = atan(p.x, p.y) / 3.14159;
    float depth = 2.0 / d;
    float baseRadius = length((fragCoord.xy - center) / resolution.y);
    float wallBend = smoothstep(0.04, 0.75, baseRadius);
    float edgeRelease = 1.0 - smoothstep(1.0, 1.45, baseRadius);
    float laneCurve = -steer * wallBend * edgeRelease * baseRadius * 0.12 * bendStrength;

    vec2 tunnelUv = vec2(angle + laneCurve, depth);
    float t = time * 0.72 * direction;
    float fringeOffset = mix(0.008, 0.026, smoothstep(0.15, 1.1, d)) * rgbShift;

    vec2 fringeUvA = tunnelUv + vec2(fringeOffset, 0.026 * rgbShift);
    vec2 fringeUvB = tunnelUv - vec2(fringeOffset, 0.022 * rgbShift);
    float core = vDrop(tunnelUv, t, density, lineWidth);
    float fringeA = vDrop(fringeUvA, t * 1.015, density, lineWidth);
    float fringeB = vDrop(fringeUvB, t * 0.985, density, lineWidth);
    float mask = max(core, max(fringeA, fringeB) * 0.82);

    float lineWeight = core + (fringeA + fringeB) * 0.82 + 0.0001;
    float lineSeed = (
      speedLineSeed(tunnelUv, density) * core +
      speedLineSeed(fringeUvA, density) * fringeA * 0.82 +
      speedLineSeed(fringeUvB, density) * fringeB * 0.82
    ) / lineWeight;
    float lineShift = clamp(lineColorShift, 0.0, 2.0);
    float lineShiftMix = clamp(lineColorShift, 0.0, 1.0);
    float lineHueShift = (lineSeed - 0.5) * 0.42 * lineShift;
    float lineDrift = sin(lineSeed * 6.28318 + time * 0.45 * direction) * 0.035 * lineShift;
    float hue = fract((angle + laneCurve) * 0.72 + depth * 0.018 + time * 0.55 * direction + lineHueShift + lineDrift);
    float saturation = mix(0.82, mix(0.68, 0.96, hash11(lineSeed * 53.17 + 4.0)), lineShiftMix);
    float value = mix(1.0, mix(0.78, 1.16, hash11(lineSeed * 37.73 + 9.0)), lineShiftMix);
    vec3 coreColor = hsv2rgb(vec3(hue, saturation, value));
    vec3 warmFringe = hsv2rgb(vec3(hue + 0.055, min(1.0, saturation + 0.08), value));
    vec3 coolFringe = hsv2rgb(vec3(hue - 0.07, min(1.0, saturation + 0.08), value));

    vec3 color = coreColor * core;
    color += warmFringe * fringeA * 0.35;
    color += coolFringe * fringeB * 0.35;
    color *= rgbStrength;
    color += vec3(mask) * 0.08;
    color = color / (color + vec3(1.15));
    color = mix(color, tintColor * mask, tintMix);

    return color * mask * min(d * d, 1.8);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float baseIntensity = smoothstep(0.1, 1.2, uScrollVelocity);
    float tunnelIntensity = baseIntensity * uStrength;
    if (tunnelIntensity <= 0.001) {
      outputColor = inputColor;
      return;
    }

    float steer = clamp(uGazeOffset.x, -1.0, 1.0);
    vec2 sceneUv = bendSceneUv(
      uv,
      steer,
      baseIntensity * uBendStrength,
      baseIntensity * uCenterFollow
    );
    vec4 sceneColor = texture2D(inputBuffer, clamp(sceneUv, vec2(0.0), vec2(1.0)));

    vec2 fragCoord = uv * resolution;
    vec3 tunnelColor = getTunnelEffect(
      fragCoord,
      uTime * uSpeed,
      -uScrollDirection * 2.0,
      uGazeOffset,
      uDensity,
      uBendStrength,
      baseIntensity * uCenterFollow,
      uLineWidth,
      uLineColorShift,
      uRgbShift,
      uRgbStrength,
      uTintColor,
      uTintMix
    );

    vec3 color = sceneColor.rgb + tunnelColor * tunnelIntensity * 0.55;
    outputColor = vec4(clamp(color, 0.0, 1.0), inputColor.a);
  }
`,
    l = class extends r {
        resolution;
        timeUniform;
        velocityUniform;
        directionUniform;
        gazeUniform;
        strengthUniform;
        speedUniform;
        densityUniform;
        bendStrengthUniform;
        centerFollowUniform;
        lineWidthUniform;
        lineColorShiftUniform;
        rgbShiftUniform;
        rgbStrengthUniform;
        tintColorUniform;
        tintMixUniform;
        constructor() {
            let r = new t(1, 1),
                a = new n(0),
                o = new n(0),
                l = new n(1),
                u = new n(new t(0, 0)),
                d = new n(s.strength),
                f = new n(s.speed),
                p = new n(s.dpr),
                m = new n(s.bendStrength),
                h = new n(s.centerFollow),
                g = new n(s.lineWidth),
                _ = new n(s.lineColorShift),
                v = new n(s.rgbShift),
                y = new n(new e(s.rgb.r, s.rgb.g, s.rgb.b)),
                b = new n(new e(s.color.r, s.color.g, s.color.b)),
                x = new n(s.colorMix);
            super(`ScrollerSpeedLinesEffect`, c, {
                blendFunction: i.NORMAL,
                uniforms: new Map([
                    [`resolution`, new n(r)],
                    [`uTime`, a],
                    [`uScrollVelocity`, o],
                    [`uScrollDirection`, l],
                    [`uGazeOffset`, u],
                    [`uStrength`, d],
                    [`uSpeed`, f],
                    [`uDensity`, p],
                    [`uBendStrength`, m],
                    [`uCenterFollow`, h],
                    [`uLineWidth`, g],
                    [`uLineColorShift`, _],
                    [`uRgbShift`, v],
                    [`uRgbStrength`, y],
                    [`uTintColor`, b],
                    [`uTintMix`, x]
                ])
            }), this.resolution = r, this.timeUniform = a, this.velocityUniform = o, this.directionUniform = l, this.gazeUniform = u, this.strengthUniform = d, this.speedUniform = f, this.densityUniform = p, this.bendStrengthUniform = m, this.centerFollowUniform = h, this.lineWidthUniform = g, this.lineColorShiftUniform = _, this.rgbShiftUniform = v, this.rgbStrengthUniform = y, this.tintColorUniform = b, this.tintMixUniform = x
        }
        setSize(e, t) {
            this.resolution.set(e, t)
        }
        setSettings(e) {
            let t = o(e);
            this.strengthUniform.value = t.enabled ? Math.max(0, t.strength) : 0, this.speedUniform.value = Math.max(0, t.speed), this.densityUniform.value = a(t.dpr, .1, 4), this.bendStrengthUniform.value = Math.max(0, t.bendStrength), this.centerFollowUniform.value = a(t.centerFollow, -2, 2), this.lineWidthUniform.value = a(t.lineWidth, .01, 1), this.lineColorShiftUniform.value = a(t.lineColorShift, 0, 2), this.rgbShiftUniform.value = a(t.rgbShift, 0, 4), this.rgbStrengthUniform.value.set(Math.max(0, t.rgb.r), Math.max(0, t.rgb.g), Math.max(0, t.rgb.b)), this.tintColorUniform.value.set(a(t.color.r, 0, 1), a(t.color.g, 0, 1), a(t.color.b, 0, 1)), this.tintMixUniform.value = a(t.colorMix, 0, 1)
        }
        setDriveState({
            time: e,
            velocity: t,
            direction: n,
            gazeX: r
        }) {
            this.timeUniform.value = e, this.velocityUniform.value = t, this.directionUniform.value = n, this.gazeUniform.value.set(r, 0)
        }
    };
export {
    l as ScrollerSpeedLinesEffect
};
//# sourceMappingURL=ScrollerSpeedLinesEffect-DMyCV-sm.js.map