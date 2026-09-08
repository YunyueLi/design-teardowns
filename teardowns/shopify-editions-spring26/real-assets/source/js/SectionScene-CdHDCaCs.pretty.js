import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    t as n
} from "./jsx-runtime-DKdBMi_L.js";
import {
    t as r
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    t as i
} from "./reportError-D4E52G70.js";
import {
    a,
    c as o,
    i as s,
    l as c,
    o as l,
    s as u
} from "./sectionModels-CqSyktdl.js";
import {
    a as d,
    g as f,
    i as p,
    n as m,
    r as h,
    s as g,
    t as _
} from "./presets-BdwQB_Rb.js";
import {
    i as v
} from "./dpr-CfAtMFij.js";
import {
    t as y
} from "./useStickyMountGate-DmTxtK8v.js";
import {
    $a as b,
    $n as x,
    Dr as S,
    Gt as C,
    Hr as w,
    In as T,
    O as ee,
    Qa as E,
    Qi as D,
    Tr as O,
    U as k,
    Ua as te,
    V as A,
    Yi as j,
    Zi as M,
    Zr as ne,
    da as N,
    ft as re,
    ka as P,
    kr as F,
    nr as ie,
    qt as I,
    rr as L
} from "./three.core-DVcoLpfz.js";
import {
    T as R,
    b as z,
    g as ae,
    l as B
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    o as oe,
    t as se
} from "./FluidField-CPsolzcx.js";
import {
    a as ce,
    i as le,
    l as V,
    n as H,
    o as U,
    p as ue,
    r as W,
    s as de,
    t as fe,
    u as pe
} from "./cameraAnimations-dhQqw_sV.js";
import {
    t as me
} from "./Environment-EZo2pyVo.js";
import {
    n as he
} from "./reducedMotion-CT1n0ezQ.js";
import {
    n as G,
    t as ge
} from "./useCanvasPointer-CKM2sIQX.js";
import {
    a as _e,
    c as K,
    d as ve,
    i as q,
    l as ye,
    n as be,
    o as xe,
    r as Se,
    t as J,
    u as Ce
} from "./SdfRegistry-CLZaosgv.js";
import {
    t as we
} from "./sharedZeroTexture-C5JcVREk.js";
import {
    n as Te,
    t as Ee
} from "./ktx2-loader-7Y-IX7SR.js";
import {
    n as De,
    t as Oe
} from "./colorAndNoise-DY6zB3P7.js";
import {
    a as ke,
    c as Ae,
    d as Y,
    i as je,
    l as Me,
    n as Ne,
    o as Pe,
    p as X,
    s as Fe,
    u as Ie
} from "./renderScaleResolve-qdey1xp-.js";
import "./layers-Cvg6N2JU.js";
import {
    t as Le
} from "./SectionFluidVelocityContext-sekuEx_H.js";
var Z = e(t(), 1),
    Q = n(),
    Re = .064;

function ze() {
    let {
        isMobile: e,
        isLandscapeMobile: t,
        isTouchDevice: n
    } = r.getState();
    return e === !0 || t === !0 || n === !0
}

function Be(e, t, n, r = 10) {
    let i = 1 - Math.exp(-Math.max(0, Math.min(n, Re)) * r);
    return e + (t - e) * i
}
var Ve = {
        none: 0,
        linear: 1,
        reinhard: 2,
        cineon: 3,
        aces: 4,
        agx: 5,
        neutral: 6
    },
    He = {
        none: 0,
        solid: 1,
        linear: 2
    },
    Ue = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,
    We = `
  uniform sampler2D tMap;
  uniform sampler2D tOverlay;
  uniform sampler2D tDry;
  uniform float uHasMap;
  uniform float uHasOverlay;
  uniform float uHasDry;
  uniform float uDecodeSRGB;
  uniform int uBackgroundMode;
  uniform vec3 uBackgroundColor1;
  uniform vec3 uBackgroundColor2;
  uniform vec3 uBackgroundColor3;
  uniform float uBackgroundAngle;
  uniform float uBackgroundSmooth;
  uniform float uBackgroundAspect;
  uniform int uBackgroundPointCount;
  uniform float uBackgroundBias1;
  uniform float uBackgroundBias2;
  uniform float uBackgroundDarken;
  uniform float uBackgroundLoadFade;
  uniform float uBehindDarken;
  uniform float uBehindSaturation;
  uniform int uToneMapping;
  uniform float uIntroEnabled;
  uniform float uIntroProgress;
  uniform float uIntroGlowIntensity;
  uniform float uIntroBlendRange;
  uniform float uIntroWarpStrength;
  uniform float uIntroNoiseAmount;
  uniform float uIntroNoiseScale;
  uniform vec2 uIntroCenter;
  uniform vec3 uIntroGlowColor;
  uniform vec3 uIntroBgColor;
  uniform vec2 uIntroResolution;
  varying vec2 vUv;

  // three.js tone-mapping functions (also declares the toneMappingExposure uniform).
  ${R.tonemapping_pars_fragment}

  vec3 applyToneMapping(vec3 linearColor) {
    if (uToneMapping == 1) return LinearToneMapping(linearColor);
    if (uToneMapping == 2) return ReinhardToneMapping(linearColor);
    if (uToneMapping == 3) return CineonToneMapping(linearColor);
    if (uToneMapping == 4) return ACESFilmicToneMapping(linearColor);
    if (uToneMapping == 5) return AgXToneMapping(linearColor);
    if (uToneMapping == 6) return NeutralToneMapping(linearColor);
    return linearColor;
  }

  vec3 sRGBToLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  vec3 linearToSRGB(vec3 c) {
    c = max(c, vec3(0.0));
    return mix(
      c * 12.92,
      1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
      step(0.0031308, c)
    );
  }

  float gradientMix(float position, float bias) {
    float center = clamp(0.5 + bias, 0.0, 1.0);
    float halfSmooth = clamp(uBackgroundSmooth, 0.0, 100.0) / 200.0;
    float start = center - halfSmooth;
    float end = center + halfSmooth;
    if (halfSmooth <= 0.0001) return step(center, position);
    return smoothstep(start, end, position);
  }

  float linearGradientPosition(vec2 uv) {
    float radiansAngle = radians(uBackgroundAngle);
    vec2 direction = vec2(sin(radiansAngle), cos(radiansAngle));
    vec2 aspectUv = (uv - 0.5) * vec2(uBackgroundAspect, 1.0);
    float extent = abs(direction.x) * uBackgroundAspect + abs(direction.y);
    return dot(aspectUv, direction) / extent + 0.5;
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += valueNoise(p) * amp;
      p *= 2.03;
      amp *= 0.5;
    }
    return value;
  }

  float introRadialMask(vec2 uv) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return 1.0;

    float progress = clamp(uIntroProgress, 0.0, 1.0);
    if (progress <= 0.0) return 0.0;
    float aspect = uIntroResolution.x / max(uIntroResolution.y, 1.0);
    vec2 center = clamp(uIntroCenter, vec2(0.0), vec2(1.0));
    vec2 dv = (uv - center) * vec2(aspect, 1.0);
    float radial = length(dv);

    // Same center-out mask shape as the hero handoff radial transition: the
    // authored center lives in screen UV, while X is aspect-corrected so the
    // reveal stays circular in viewport space.
    vec2 farCorner = max(center, 1.0 - center) * vec2(aspect, 1.0);
    float maxRadius = length(farCorner);
    float feather = max(uIntroBlendRange / max(uIntroResolution.y, 1.0), 0.001);
    float noiseAmount = max(uIntroNoiseAmount, 0.0) / max(uIntroResolution.y, 1.0);
    float noise = fbm(dv * max(uIntroNoiseScale, 0.001) + progress * 0.65) * 2.0 - 1.0;
    float noisyRadial = radial + noise * noiseAmount;
    float radialEdge = progress * (maxRadius + feather * 2.0) - feather;
    return 1.0 - smoothstep(
      radialEdge - feather,
      radialEdge + feather,
      noisyRadial
    );
  }

  vec2 introWarpUv(vec2 uv, float mask) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return uv;

    float progress = clamp(uIntroProgress, 0.0, 1.0);
    float aspect = uIntroResolution.x / max(uIntroResolution.y, 1.0);
    vec2 center = clamp(uIntroCenter, vec2(0.0), vec2(1.0));
    vec2 dv = (uv - center) * vec2(aspect, 1.0);
    float radial = length(dv);
    vec2 radialDirection = radial > 0.0001
      ? normalize(vec2(dv.x / max(aspect, 0.001), dv.y))
      : vec2(0.0, 1.0);
    vec2 tangent = vec2(-radialDirection.y, radialDirection.x);

    float seam = 1.0 - abs(mask * 2.0 - 1.0);
    float life = sin(clamp(progress, 0.0, 1.0) * 3.14159265);
    float ripple = sin(radial * 42.0 - progress * 12.0) * seam;
    vec2 radialWarp = radialDirection * uIntroWarpStrength * seam * life * 0.12;
    vec2 tangentWarp = tangent * ripple * uIntroWarpStrength * life * 0.018;
    return uv + radialWarp + tangentWarp;
  }

  vec3 applyRadialIntroReveal(vec3 inputColor, float mask) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return inputColor;

    float edge = 1.0 - abs(mask * 2.0 - 1.0);
    vec3 finalColor = mix(uIntroBgColor, inputColor, mask);
    return mix(
      finalColor,
      uIntroGlowColor,
      edge * max(uIntroGlowIntensity, 0.0) * 0.35
    );
  }

  vec3 backgroundColor(vec2 uv) {
    if (uBackgroundMode == 1) return uBackgroundColor1; // solid uses color 1

    float position = linearGradientPosition(uv);
    if (uBackgroundPointCount < 3) {
      return mix(
        uBackgroundColor1,
        uBackgroundColor3,
        gradientMix(position, uBackgroundBias1)
      );
    }

    if (position < 0.5) {
      return mix(
        uBackgroundColor1,
        uBackgroundColor2,
        gradientMix(position * 2.0, uBackgroundBias1)
      );
    }

    return mix(
      uBackgroundColor2,
      uBackgroundColor3,
      gradientMix((position - 0.5) * 2.0, uBackgroundBias2)
    );
  }

  void main() {
    float introMask = introRadialMask(vUv);
    vec2 introUv = introWarpUv(vUv, introMask);
    vec4 color = uHasMap > 0.5 ? texture2D(tMap, introUv) : vec4(0.0);
    vec4 overlay = uHasOverlay > 0.5 ? texture2D(tOverlay, introUv) : vec4(0.0);
    vec4 dry = uHasDry > 0.5 ? texture2D(tDry, introUv) : vec4(0.0);
    // Composite the whole section in gamma/sRGB space — the LDR look designers
    // chose (the original direct-to-sRGB-canvas playground). The scene texture
    // is already display-referred, so it is used as-is; only the linear
    // gradient is encoded to sit in the same space before blending.
    if (uBackgroundMode > 0) {
      vec3 bg = linearToSRGB(backgroundColor(vUv));
      bg *= 1.0 - clamp(uBackgroundDarken, 0.0, 1.0);
      // Fade the gradient in alongside the section's video light volume:
      // until the volume is mounted the gradient sits at 5% so a
      // freshly-arrived (still-decoding) section never flashes the full
      // gradient on its own. 1 = fully shown.
      bg *= mix(0.05, 1.0, clamp(uBackgroundLoadFade, 0.0, 1.0));
      color.rgb = mix(bg, color.rgb, color.a);
      color.a = 1.0;
    }
    color.rgb += overlay.rgb;
    color.a = max(color.a, overlay.a);
    // "Behind page content" tune-down: desaturate then darken the whole
    // section output so it stops competing with the foreground.
    float luma = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    color.rgb = mix(vec3(luma), color.rgb, uBehindSaturation);
    color.rgb *= (1.0 - uBehindDarken);
    // Tone map in linear space. The composite above is in gamma/sRGB space, so
    // decode to linear, apply the three.js curve (which applies the
    // toneMappingExposure uniform internally), then re-encode to gamma before
    // the LDR clamp below.
    if (uToneMapping > 0) {
      vec3 lin = sRGBToLinear(color.rgb);
      lin = applyToneMapping(lin);
      color.rgb = linearToSRGB(lin);
    }
    // Composite the dry layer over the tone-mapped, tuned-down main layer. The
    // dry layer is post-exempt, so it lands after tone mapping — but still
    // inside the section image, so host transition + knockout passes shape and
    // clip it.
    color.rgb = dry.rgb + color.rgb * (1.0 - dry.a);
    color.a = dry.a + color.a * (1.0 - dry.a);
    color.rgb = applyRadialIntroReveal(color.rgb, introMask);
    // LDR clamp: a direct 8-bit sRGB write would clamp here; mirror that so
    // additive highlights don't blow past white.
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    // The HalfFloat composer re-encodes linear→sRGB on output, so decode the
    // gamma-domain result back to linear first — the round-trip reproduces
    // this composite pixel-for-pixel. A direct sRGB canvas target (uDecodeSRGB
    // == 0) isn't re-encoded, so it takes the value as-is.
    if (uDecodeSRGB > 0.5) color.rgb = sRGBToLinear(color.rgb);
    gl_FragColor = color;
  }
`,
    $ = {
        enabled: !1,
        progress: 1,
        glowIntensity: 2,
        feather: 48,
        warpStrength: .35,
        noiseAmount: 18,
        noiseScale: 4,
        center: {
            x: .5,
            y: .58
        },
        glowColor: {
            r: 1,
            g: .4,
            b: .1,
            a: 1
        },
        bgColor: {
            r: .012,
            g: .118,
            b: .114,
            a: 1
        }
    };

function Ge(e, t, n, r, i, a, o) {
    let c = t.current,
        l = new D({
            uniforms: {
                tMap: {
                    value: null
                },
                tOverlay: {
                    value: null
                },
                tDry: {
                    value: null
                },
                uHasMap: {
                    value: 0
                },
                uHasOverlay: {
                    value: 0
                },
                uHasDry: {
                    value: 0
                },
                uDecodeSRGB: {
                    value: 0
                },
                uBackgroundMode: {
                    value: He[c.mode]
                },
                uBackgroundColor1: {
                    value: new k(c.color1)
                },
                uBackgroundColor2: {
                    value: new k(c.color2)
                },
                uBackgroundColor3: {
                    value: new k(c.color3)
                },
                uBackgroundAngle: {
                    value: c.angle
                },
                uBackgroundSmooth: {
                    value: c.smooth
                },
                uBackgroundAspect: {
                    value: 1
                },
                uBackgroundPointCount: {
                    value: c.pointCount
                },
                uBackgroundBias1: {
                    value: c.bias1
                },
                uBackgroundBias2: {
                    value: c.bias2
                },
                uBackgroundDarken: {
                    value: c.darken
                },
                uBackgroundLoadFade: {
                    value: 1
                },
                uBehindDarken: {
                    value: 0
                },
                uBehindSaturation: {
                    value: 1
                },
                uToneMapping: {
                    value: Ve[c.toneMapping]
                },
                toneMappingExposure: {
                    value: c.toneMappingExposure
                },
                uIntroEnabled: {
                    value: +!!$.enabled
                },
                uIntroProgress: {
                    value: $.progress
                },
                uIntroGlowIntensity: {
                    value: $.glowIntensity
                },
                uIntroBlendRange: {
                    value: $.feather
                },
                uIntroWarpStrength: {
                    value: $.warpStrength
                },
                uIntroNoiseAmount: {
                    value: $.noiseAmount
                },
                uIntroNoiseScale: {
                    value: $.noiseScale
                },
                uIntroCenter: {
                    value: new E($.center.x, $.center.y)
                },
                uIntroGlowColor: {
                    value: new k($.glowColor.r, $.glowColor.g, $.glowColor.b)
                },
                uIntroBgColor: {
                    value: new k($.bgColor.r, $.bgColor.g, $.bgColor.b)
                },
                uIntroResolution: {
                    value: new E(1, 1)
                }
            },
            depthTest: !1,
            depthWrite: !1,
            vertexShader: Ue,
            fragmentShader: We
        }),
        u = new F(2, 2),
        d = new L(u, l),
        f = c.color1,
        p = c.color2,
        m = c.color3,
        h = new E(1, 1);
    return d.frustumCulled = !1, d.onBeforeRender = c => {
        let u = e.current,
            d = n?.current ?? null,
            g = r?.current ?? null,
            _ = t.current;
        l.uniforms.tMap.value = u, l.uniforms.tOverlay.value = d, l.uniforms.tDry.value = g, l.uniforms.uHasMap.value = +!!u, l.uniforms.uHasOverlay.value = +!!d, l.uniforms.uHasDry.value = +!!g, l.uniforms.uBackgroundMode.value = He[_.mode], _.color1 !== f && (l.uniforms.uBackgroundColor1.value.set(_.color1), f = _.color1), _.color2 !== p && (l.uniforms.uBackgroundColor2.value.set(_.color2), p = _.color2), _.color3 !== m && (l.uniforms.uBackgroundColor3.value.set(_.color3), m = _.color3), l.uniforms.uBackgroundAngle.value = _.angle, l.uniforms.uBackgroundSmooth.value = _.smooth, l.uniforms.uToneMapping.value = Ve[_.toneMapping], l.uniforms.toneMappingExposure.value = _.toneMappingExposure, c.getSize(h), l.uniforms.uBackgroundAspect.value = h.x / h.y, l.uniforms.uIntroResolution.value.copy(h);
        let v = a?.current ?? $;
        l.uniforms.uIntroEnabled.value = +!!v.enabled, l.uniforms.uIntroProgress.value = v.progress, l.uniforms.uIntroGlowIntensity.value = v.glowIntensity, l.uniforms.uIntroBlendRange.value = v.feather ?? $.feather, l.uniforms.uIntroWarpStrength.value = v.warpStrength ?? $.warpStrength, l.uniforms.uIntroNoiseAmount.value = v.noiseAmount ?? $.noiseAmount, l.uniforms.uIntroNoiseScale.value = v.noiseScale ?? $.noiseScale, l.uniforms.uIntroCenter.value.set(v.center.x, v.center.y), l.uniforms.uIntroGlowColor.value.setRGB(v.glowColor.r, v.glowColor.g, v.glowColor.b), l.uniforms.uIntroBgColor.value.setRGB(v.bgColor.r, v.bgColor.g, v.bgColor.b), l.uniforms.uBackgroundPointCount.value = _.pointCount, l.uniforms.uBackgroundBias1.value = _.bias1, l.uniforms.uBackgroundBias2.value = _.bias2, l.uniforms.uBackgroundDarken.value = _.darken, l.uniforms.uBackgroundLoadFade.value = o?.current ?? 1;
        let y = c.getRenderTarget();
        if (l.uniforms.uDecodeSRGB.value = y && y.texture.colorSpace !== `srgb` ? 1 : 0, i) {
            let e = s(i.motionRef.current?.screenOffset ?? 0),
                t = i.paramsRef.current;
            l.uniforms.uBehindDarken.value = e * (t?.darken ?? 0), l.uniforms.uBehindSaturation.value = 1 - e * (1 - (t?.saturation ?? 1))
        }
    }, {
        mesh: d,
        material: l,
        dispose() {
            u.dispose(), l.dispose()
        }
    }
}

function Ke(e) {
    return e <= -1 || e >= 1
}

function qe(e, t) {
    let n = e ?? t;
    return [Number.isFinite(n[0]) ? n[0] : t[0], Number.isFinite(n[1]) ? n[1] : t[1]]
}

function Je(e, t) {
    let [n, r] = qe(e, t), i = Math.min(n, r);
    return [i, Math.max(i + 1e-4, n, r)]
}
var Ye = 1.2;

function Xe() {
    let e = r.getState();
    return e.preferReducedMotion === !0 || e.isMobile !== !0
}
var Ze = .001,
    Qe = .04,
    $e = .025,
    et = 8 .toFixed(1),
    tt = 128 .toFixed(1),
    nt = `128`,
    rt = 5.208,
    it = 50,
    at = 1,
    ot = .035,
    st = new P,
    ct = 6,
    lt = {
        "https://cdn.shopify.com/videos/c/o/v/15de67fa52a247e9805165ba4417e3b7.mp4": {
            src: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/video1-50f-360p.ktx2?v=1780745973`,
            duration: 5.9388,
            width: 640,
            height: 360,
            layerCount: 50
        },
        "https://cdn.shopify.com/videos/c/o/v/c2ffb10c9eeb46a4a36b562d482d3988.mp4": {
            src: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/video2-50f-360p.ktx2?v=1780745997`,
            duration: 5.208,
            width: 476,
            height: 360,
            layerCount: 50
        },
        "https://cdn.shopify.com/videos/c/o/v/33de6200b962468fa7b58e50836eb729.mp4": {
            src: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/video3-50f-360p.ktx2?v=1780745996`,
            duration: 5.208,
            width: 200,
            height: 360,
            layerCount: 50
        },
        "https://cdn.shopify.com/videos/c/o/v/4396d38b5ba744f8aab63ed520071bd6.mp4": {
            src: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/video4-50f-360p.ktx2?v=1780745997`,
            duration: 5.208,
            width: 476,
            height: 360,
            layerCount: 50
        }
    },
    ut = new Set;

function dt(e, t, n) {
    let r = `${e}:${t instanceof Error?t.message:String(t)}`;
    if (ut.has(r)) return;
    ut.add(r);
    let a = ye(t);
    i(t, `VideoLightVolume.source`, {
        ...n,
        ...a,
        sourceUrl: e,
        ...Ce()
    })
}

function ft(e) {
    let t = e.search(/[?#]/);
    return t === -1 ? e : e.slice(0, t)
}

function pt(e, t) {
    try {
        let n = new URL(e, `https://example.com`).searchParams;
        for (let e of t) {
            let t = Number(n.get(e));
            if (Number.isFinite(t) && t > 0) return t
        }
    } catch {}
    return null
}

function mt(e) {
    let t = ft(e).match(/(?:^|[-_])(\d+)f(?:[-_.]|$)/i),
        n = t ? Number(t[1]) : NaN;
    return Number.isFinite(n) && n > 0 ? n : it
}

function ht(e) {
    return pt(e, [`duration`, `d`]) ?? rt
}

function gt(e) {
    return /\.ktx2$/i.test(ft(e)) ? {
        src: e,
        duration: ht(e),
        layerCount: mt(e)
    } : null
}

function _t(e, t) {
    if (t) {
        let e = gt(t);
        if (e) return e
    }
    let n = ft(e);
    return lt[e] || (n === e ? null : lt[n] ?? null) || gt(e)
}

function vt(e) {
    let t = e;
    return t.isCompressedArrayTexture === !0 || t.isDataArrayTexture === !0
}

function yt(e) {
    return e === `low` ? .5 : e === `medium` ? .7 : 1
}

function bt(e, t) {
    return Math.max(8, Math.min(128, Math.round((Number.isFinite(e) ? e : 100) * t)))
}

function xt({
    sourceUrl: e,
    ktx2Url: t,
    depthMapUrl: n,
    settings: i,
    groupRef: a,
    behindSpeed: o = 1,
    quality: c,
    motion: l,
    fluidVelocityRef: u,
    timeScale: d = 1,
    externalLoadFadeRef: f
}) {
    let p = z(e => e.gl),
        m = (0, Z.useRef)(null),
        h = (0, Z.useRef)(i),
        [g, _] = (0, Z.useState)(null);
    h.current = i;
    let v = yt(c),
        b = (0, Z.useRef)(v);
    b.current = v, (0, Z.useEffect)(() => {
        m.current?.apply(i, v)
    }, [i, v]);
    let x = (0, Z.useRef)(0),
        S = (0, Z.useRef)(null),
        C = (0, Z.useRef)(0),
        w = (0, Z.useRef)(null),
        T = (0, Z.useRef)(!1);
    ae(e => {
        let t = e.clock.elapsedTime,
            n = S.current === null ? 0 : Math.max(0, t - S.current);
        S.current = t;
        let i = Ke(l?.current?.transition ?? 0),
            a = m.current;
        if (a && (w.current !== a && (w.current = a, C.current = 0), !i && C.current < 1 && (C.current = _e(C.current, n, {
                durationSeconds: Ye,
                offscreen: i,
                reducedMotion: Xe()
            }), a.setLoadFade(xe(C.current)))), f && (f.current = T.current ? 1 : g ? xe(C.current) : 0), i) return;
        let c = 1 - s(l?.current?.screenOffset ?? 0) * (1 - o),
            p = r.getState().preferReducedMotion ? he : 1;
        x.current += n * c * p * d, m.current?.setTime(x.current, u?.current ?? null, l?.current?.scrollVelocity ?? 0)
    });
    let ee = y();
    return (0, Z.useEffect)(() => {
        if (!ee) return;
        n?.trim() || Ee(p);
        let r = new AbortController,
            i = null,
            o = performance.now(),
            s = n?.trim() ? null : _t(e, t);
        return m.current?.dispose(), m.current = null, T.current = !1, _(null), St(e, t, n, r.signal).then(e => {
            let t = Tt(e);
            if (r.signal.aborted) {
                t.dispose();
                return
            }
            i = t, m.current = t, t.apply(h.current, b.current), t.setLoadFade(+!!Xe()), a && (a.current = t.group), _(t.group)
        }).catch(i => {
            if (r.signal.aborted) return;
            T.current = !0, f && (f.current = 1);
            let a = n?.trim() || s?.src || t || e;
            dt(a, i, {
                originalSourceUrl: e,
                loadUrl: a,
                ktx2Url: s?.src ?? t,
                depthMapUrl: n,
                phase: n?.trim() ? `depth-map-load` : `ktx2-load`,
                elapsedMs: ve(o),
                width: s?.width,
                height: s?.height,
                layerCount: s?.layerCount
            })
        }), () => {
            r.abort(), a && a.current === i?.group && (a.current = null), i?.dispose(), m.current === i && (m.current = null)
        }
    }, [n, p, a, t, e, ee, f]), g ? (0, Q.jsx)(`primitive`, {
        object: g
    }) : null
}
async function St(e, t, n, r) {
    let i = n?.trim();
    if (i) return wt(e, i, r);
    let a = _t(e, t);
    if (!a) throw Error(`[VideoLightVolume] Missing KTX2 volume for ${e}. Pass ktx2Url or use a .ktx2 source URL.`);
    let o = await q(() => Te.loadAsync(a.src), {
        signal: r
    }).catch(t => {
        throw K(t instanceof Error ? t : Error(String(t)), {
            sourceUrl: e,
            loadUrl: a.src,
            ktx2Url: a.src,
            phase: `ktx2-load`,
            width: a.width,
            height: a.height,
            layerCount: a.layerCount
        })
    });
    try {
        if (r.aborted) throw new DOMException(`KTX2 load aborted`, `AbortError`);
        if (o.colorSpace = j, o.minFilter = T, o.magFilter = T, o.wrapS = A, o.wrapT = A, !vt(o)) throw Error(`[VideoLightVolume] Expected ${a.src} to load as a KTX2 array texture.`);
        let e = o.image,
            t = e.width ?? a.width,
            n = e.height ?? a.height;
        if (!t || !n) throw Error(`[VideoLightVolume] KTX2 texture dimensions missing for ${a.src}.`);
        return {
            texture: o,
            width: t,
            height: n,
            layerCount: e.depth ?? a.layerCount,
            aspect: t / Math.max(1, n),
            duration: Math.max(Ze, a.duration)
        }
    } catch (e) {
        throw o.dispose(), e
    }
}

function Ct(e) {
    let t = e.image,
        n = t?.width || t?.naturalWidth,
        r = t?.height || t?.naturalHeight;
    return n && r ? {
        width: n,
        height: r
    } : null
}
async function wt(e, t, n) {
    let r = q(() => st.loadAsync(e), {
            signal: n
        }).catch(n => {
            throw K(n instanceof Error ? n : Error(String(n)), {
                sourceUrl: e,
                loadUrl: e,
                depthMapUrl: t,
                phase: `depth-map-source-load`
            })
        }),
        i = q(() => st.loadAsync(t), {
            signal: n
        }).catch(n => {
            throw K(n instanceof Error ? n : Error(String(n)), {
                sourceUrl: e,
                loadUrl: t,
                depthMapUrl: t,
                phase: `depth-map-depth-load`
            })
        });
    r.catch(() => {
        i.then(e => e.dispose()).catch(() => {})
    }), i.catch(() => {
        r.then(e => e.dispose()).catch(() => {})
    });
    let [a, o] = await Promise.all([r, i]);
    try {
        if (n.aborted) throw new DOMException(`depth map load aborted`, `AbortError`);
        a.colorSpace = j, o.colorSpace = ``;
        for (let e of [a, o]) e.minFilter = T, e.magFilter = T, e.wrapS = A, e.wrapT = A, e.flipY = !1;
        let t = Ct(a);
        if (!t) throw Error(`[VideoLightVolume] Source image dimensions missing for ${e}.`);
        return {
            texture: a,
            depthTexture: o,
            width: t.width,
            height: t.height,
            layerCount: 1,
            aspect: t.width / Math.max(1, t.height),
            duration: at
        }
    } catch (e) {
        throw a.dispose(), o.dispose(), e
    }
}

function Tt(e) {
    let t = new I;
    t.name = `videoLightVolume`;
    let n = e.texture,
        r = e.depthTexture,
        i = e.aspect,
        a = r !== void 0,
        o = !a && vt(n),
        s = a ? `sampler2D` : o ? `sampler2DArray` : `sampler3D`,
        c = new ee(1, 1, 1),
        l = new D({
            glslVersion: C,
            vertexShader: `
      out vec3 vLocalPos;
      out vec3 vCameraLocal;
      out vec3 vWorldPos;
      void main() {
        vLocalPos = position;
        vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
            fragmentShader: `
      precision highp float;
      precision highp ${s};
      uniform ${s} uVolume;
      ${a?`uniform sampler2D uDepthMap;`:``}
      uniform float uOpacity;
      uniform float uBrightness;
      uniform float uThreshold;
      uniform float uSoftness;
      uniform float uEdgeFade;
      uniform float uLoopCount;
      uniform float uGridTimeOffset;
      uniform float uGridOpacity;
      uniform float uNearFade;
      uniform float uRaymarchSteps;
      uniform float uLayerCount;
      uniform float uScrubOffset;
      uniform vec3 uCenterFade;
      uniform vec3 uHsl;
      uniform float uTime;
      uniform vec3 uNoiseScale;
      uniform vec3 uNoiseMovement;
      uniform float uNoiseStrength;
      uniform float uLoadFade;
      in vec3 vLocalPos;
      in vec3 vCameraLocal;
      in vec3 vWorldPos;
      out vec4 outColor;

${Oe}
${De}

      vec3 animatedUvOffset(vec3 p) {
        if (abs(uNoiseStrength) <= 0.000001) return vec3(0.0);
        vec3 noisePos = p * uNoiseScale + uTime * uNoiseMovement;
        return vec3(
          cnoise(noisePos),
          cnoise(noisePos + vec3(19.19, 7.31, 3.77)),
          cnoise(noisePos + vec3(5.13, 23.17, 11.71))
        ) * uNoiseStrength;
      }

      vec4 sampleVolume(${s} tex, vec3 uvw) {
        ${a?`
        vec4 image = texture(tex, uvw.xy);
        float depthLimit = clamp(texture(uDepthMap, uvw.xy).r, 0.0, 1.0);
        float z = clamp(uvw.z, 0.0, 1.0);
        float thickness = max(${ot.toFixed(3)}, 1.0 / max(uRaymarchSteps, 1.0));
        float frontMask = smoothstep(0.0, thickness, z);
        float backMask = depthLimit >= 0.999 ? 1.0 : 1.0 - smoothstep(depthLimit, min(depthLimit + thickness, 1.0), z);
        image.a *= clamp(frontMask * backMask, 0.0, 1.0);
        return image;
        `:o?`
        float layerCount = max(1.0, uLayerCount);
        float layerPos = clamp(uvw.z, 0.0, 0.999999) * max(0.0, layerCount - 1.0);
        float layer0 = floor(layerPos);
        float layer1 = min(layer0 + 1.0, layerCount - 1.0);
        float mixLayer = fract(layerPos);
        return mix(
          texture(tex, vec3(uvw.xy, layer0)),
          texture(tex, vec3(uvw.xy, layer1)),
          mixLayer
        );
        `:`
        return texture(tex, uvw);
        `}
      }

      vec2 hitBox(vec3 orig, vec3 dir) {
        vec3 boxMin = vec3(-0.5);
        vec3 boxMax = vec3(0.5);
        vec3 invDir = 1.0 / dir;
        vec3 tMinTmp = (boxMin - orig) * invDir;
        vec3 tMaxTmp = (boxMax - orig) * invDir;
        vec3 tMin = min(tMinTmp, tMaxTmp);
        vec3 tMax = max(tMinTmp, tMaxTmp);
        float t0 = max(max(tMin.x, tMin.y), tMin.z);
        float t1 = min(min(tMax.x, tMax.y), tMax.z);
        return vec2(t0, t1);
      }

      void main() {
        vec3 rayDir = normalize(vLocalPos - vCameraLocal);
        vec2 bounds = hitBox(vCameraLocal, rayDir);
        if (bounds.x > bounds.y) discard;
        bounds.x = max(bounds.x, 0.0);
        // Defensive clamp mirrors the JS uniform clamp so malformed live edits
        // cannot exceed the shader's static loop bound.
        float steps = clamp(uRaymarchSteps, ${et}, ${tt});
        float dt = (bounds.y - bounds.x) / steps;
        float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        vec3 noiseSamplePos = vCameraLocal + rayDir * mix(bounds.x, bounds.y, 0.5);
        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec3 accum = vec3(0.0);
        float alpha = 0.0;
        for (int i = 0; i < ${nt}; i++) {
          if (float(i) >= steps) break;
          float t = bounds.x + (float(i) + jitter) * dt;
          vec3 p = vCameraLocal + rayDir * t;
          float rayDepth01 = clamp((t - bounds.x) / max(bounds.y - bounds.x, 0.0001), 0.0, 1.0);
          vec3 rawUvw = p + 0.5 + uvOffset;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
          float edgeFade = max(uEdgeFade, 0.0);
          float sideMask = edgeFade > 0.0001 ? smoothstep(0.0, edgeFade, sideDistance) : 1.0;
          float sideFeatherDepth = 1.0 - smoothstep(0.25, 0.85, rayDepth01);
          float sideFeather = mix(1.0, sideMask, sideFeatherDepth);
          vec3 uvw = clamp(rawUvw, vec3(0.001), vec3(0.999));
          float z = ${a?`uvw.z`:`fract(uvw.z * max(0.0, uLoopCount) + uScrubOffset + uGridTimeOffset)`};
          vec4 tex = sampleVolume(uVolume, vec3(uvw.x, 1.0 - uvw.y, z));
          float centerFade = smoothstep(uCenterFade.x, uCenterFade.y, abs(uvw.z - 0.5));
          centerFade = mix(1.0, centerFade, clamp(uCenterFade.z, 0.0, 1.0));
          float luma = max(max(tex.r, tex.g), tex.b);
          float density = smoothstep(uThreshold, uThreshold + max(0.0001, uSoftness), luma) * tex.a * centerFade * uOpacity * sideFeather * uGridOpacity;
          float a = density / steps;
          accum += applyHsl(tex.rgb, uHsl) * uBrightness * a * (1.0 - alpha);
          alpha += a * (1.0 - alpha);
          if (alpha > 0.96) break;
        }
        float nearFade = smoothstep(0.0, max(0.0001, uNearFade), length(vWorldPos - cameraPosition));
        outColor = vec4(accum * nearFade, alpha * nearFade) * uLoadFade;
      }
    `,
            uniforms: {
                uVolume: {
                    value: n
                },
                uDepthMap: {
                    value: r ?? n
                },
                uOpacity: {
                    value: 1.8
                },
                uBrightness: {
                    value: 1.25
                },
                uThreshold: {
                    value: .09
                },
                uSoftness: {
                    value: .001
                },
                uEdgeFade: {
                    value: .06
                },
                uLoopCount: {
                    value: 1
                },
                uGridTimeOffset: {
                    value: 0
                },
                uGridOpacity: {
                    value: 1
                },
                uNearFade: {
                    value: 0
                },
                uRaymarchSteps: {
                    value: 100
                },
                uLayerCount: {
                    value: e.layerCount
                },
                uScrubOffset: {
                    value: 0
                },
                uCenterFade: {
                    value: new b(...h)
                },
                uHsl: {
                    value: new b
                },
                uTime: {
                    value: 0
                },
                uNoiseScale: {
                    value: new b
                },
                uNoiseMovement: {
                    value: new b
                },
                uNoiseStrength: {
                    value: 0
                },
                uLoadFade: {
                    value: 1
                }
            },
            transparent: !0,
            depthWrite: !1,
            depthTest: !1,
            blending: 1,
            side: 1
        }),
        u = [l],
        f = [null],
        m = e => {
            for (let t of u) e(t);
            for (let t of f) t && e(t)
        },
        _ = e => {
            let t = new L(c, e);
            return t.name = `Raymarched videoLightVolume`, t.frustumCulled = !1, t
        },
        v = _(l),
        y = [v];
    t.add(v);
    let S = e => {
            for (; y.length < e;) {
                let e = l.clone();
                u.push(e), f.push(null);
                let n = _(e);
                y.push(n), t.add(n)
            }
            for (; y.length > e;) {
                y.pop()?.removeFromParent();
                let e = u.pop(),
                    t = f.pop();
                e?.dispose(), t?.dispose()
            }
        },
        w = e => (f[e] || (f[e] = Dt(u[e], n, s)), f[e]),
        T = new b(1, 1, 1),
        E = () => {
            t.updateWorldMatrix(!0, !1), t.getWorldScale(T);
            let e = Math.max(Math.abs(T.x), 1e-4),
                n = Math.max(Math.abs(T.y), 1e-4),
                r = Math.max(Math.abs(T.z), 1e-4);
            m(t => {
                t.uniforms.uFluidWorldScale && t.uniforms.uFluidWorldScale.value.set(e, n, r)
            })
        },
        O = Math.max(Ze, e.duration),
        k = g,
        te = 0,
        A = 100,
        j = null,
        M = 0;
    return {
        group: t,
        apply: (e, n = 1) => {
            t.name = `videoLightVolume:${e.source}`, t.userData.videoLightLayer = e.layer, t.visible = e.visible && e.opacity > 1e-4, t.position.fromArray(e.position), t.rotation.fromArray(e.rotation), t.scale.set(e.scale[0] * e.width, e.scale[1] * (e.width / Math.max(.001, i)), e.scale[2] * e.depth);
            let r = e.grid?.enabled === !0,
                a = r ? Math.max(1, Math.min(ct, Math.round(e.grid.columns || 1))) : 1,
                o = r ? Math.max(1, Math.min(ct, Math.round(e.grid.rows || 1))) : 1,
                s = Number.isFinite(e.grid?.spacing?.[0]) ? e.grid.spacing[0] : 1.1,
                c = Number.isFinite(e.grid?.spacing?.[1]) ? e.grid.spacing[1] : 1.1,
                l = r ? Math.max(0, e.grid.randomTimeOffset || 0) : 0,
                h = r ? Math.max(0, Math.min(1, e.grid.outerOpacity ?? 1)) : 1,
                _ = Math.floor((a - 1) * .5),
                v = Math.floor((o - 1) * .5),
                b = Math.max(_, a - 1 - _, v, o - 1 - v, 1);
            S(a * o);
            for (let t = 0; t < y.length; t++) {
                let n = t % a,
                    r = Math.floor(t / a),
                    i = Math.max(Math.abs(n - _), Math.abs(r - v)) / b,
                    u = n === _ && r === v,
                    d = Math.sin((t + 1) * 12.9898 + a * 78.233) * 43758.5453 % 1;
                y[t].position.set((n - (a - 1) * .5) * s, (r - (o - 1) * .5) * c, 0), y[t].userData.gridTimeOffset = u ? 0 : (d + 1) % 1 * l, y[t].userData.gridOpacity = 1 - Math.min(i, 1) * (1 - h), y[t].renderOrder = e.renderBehindPointCloud ? -5 : 35
            }
            let x = Number.isFinite(e.fluidStrength[0]) ? e.fluidStrength[0] : 0,
                C = Number.isFinite(e.fluidStrength[1]) ? e.fluidStrength[1] : 0,
                [T, ee] = qe(e.fluidDepthStrength, p),
                [D, O] = Je(e.fluidDistanceRange, d),
                j = Math.max(Math.abs(x), Math.abs(C)) > 1e-6;
            for (let e = 0; e < y.length; e++) {
                let t = j ? w(e) : u[e];
                y[e].material !== t && (y[e].material = t)
            }
            let M = e.blendMode === `additive` ? 2 : 1;
            A = bt(e.raymarchSteps, n), m(t => {
                t.blending = M, t.uniforms.uOpacity.value = e.opacity, t.uniforms.uBrightness.value = e.brightness, t.uniforms.uThreshold.value = Math.max(e.threshold, $e), t.uniforms.uSoftness.value = e.softness, t.uniforms.uEdgeFade.value = Math.max(e.edgeFade, 0), t.uniforms.uLoopCount.value = Number.isFinite(e.loopCount) ? Math.max(0, e.loopCount) : 1, t.uniforms.uNearFade.value = e.nearFade, t.uniforms.uRaymarchSteps.value = A, t.uniforms.uCenterFade.value.fromArray(e.centerFade), t.uniforms.uHsl.value.fromArray(e.hsl), t.uniforms.uNoiseScale.value.fromArray(e.noiseScale), t.uniforms.uNoiseMovement.value.fromArray(e.noiseMovement), t.uniforms.uNoiseStrength.value = e.noiseStrength, t.uniforms.uFluidStrength && t.uniforms.uFluidStrength.value.set(x, C), t.uniforms.uFluidDepthStrength && t.uniforms.uFluidDepthStrength.value.set(T, ee), t.uniforms.uFluidDistanceRange && t.uniforms.uFluidDistanceRange.value.set(D, O)
            }), E();
            for (let e = 0; e < y.length; e++)
                for (let t of [u[e], f[e]]) t && (t.uniforms.uGridTimeOffset.value = y[e].userData.gridTimeOffset, t.uniforms.uGridOpacity.value = y[e].userData.gridOpacity);
            k = typeof e.playbackSpeed == `number` && Number.isFinite(e.playbackSpeed) ? e.playbackSpeed : g, te = typeof e.scrollVelocityScrub == `number` && Number.isFinite(e.scrollVelocityScrub) ? e.scrollVelocityScrub : 0
        },
        setTime: (e, t, n) => {
            let r = t ?? we();
            m(t => {
                t.uniforms.uTime.value = e, t.uniforms.uFluidVelocity && (t.uniforms.uFluidVelocity.value = r)
            });
            let i = j === null ? 0 : e - j;
            j = e;
            let a = x.clamp(i, -.1, .1);
            M += a * k / O + a * x.clamp(n, -1, 1) * te;
            let o = (M % 1 + 1) % 1;
            m(e => {
                e.uniforms.uScrubOffset.value = o
            })
        },
        setLoadFade: e => {
            let t = x.clamp(e, 0, 1);
            m(e => {
                e.uniforms.uLoadFade.value = t
            })
        },
        dispose: () => {
            t.removeFromParent(), c.dispose(), m(e => {
                e.dispose()
            }), n.dispose(), r?.dispose()
        }
    }
}

function Et(e, t, n) {
    let r = e.replace(t, n);
    if (r === e) throw Error(`[VideoLightVolume] fluid shader patch target was not found`);
    return r
}

function Dt(e, t, n) {
    let r = e.fragmentShader,
        i = `uniform ${n} uVolume;\n`;
    return r = Et(r, i, `${i}      uniform sampler2D uFluidVelocity;\n`), r = Et(r, `uniform float uScrubOffset;
`, `uniform float uScrubOffset;
      uniform vec2 uFluidStrength;
      uniform vec2 uFluidDepthStrength;
      uniform vec2 uFluidDistanceRange;
      uniform vec3 uFluidWorldScale;
      uniform vec2 uFluidResolution;
`), r = Et(r, `        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec3 accum = vec3(0.0);
`, `        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec2 fluidUv = clamp(gl_FragCoord.xy / max(uFluidResolution, vec2(1.0)), 0.0, 1.0);
        vec2 fluidOffset = -texture(uFluidVelocity, fluidUv).xy * uFluidStrength * vec2(-1.0, 1.0) * ${Qe.toFixed(2)};
        vec3 accum = vec3(0.0);
`), r = Et(r, `          vec3 rawUvw = p + 0.5 + uvOffset;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
`, `          vec3 rawUvw = p + 0.5 + uvOffset;
          float fluidDepthMix = smoothstep(0.0, 1.0, rayDepth01);
          float fluidDepthStrength = mix(uFluidDepthStrength.x, uFluidDepthStrength.y, fluidDepthMix);
          float fluidDistance = length((p - vCameraLocal) * uFluidWorldScale);
          float fluidDistanceStrength = 1.0 - smoothstep(uFluidDistanceRange.x, uFluidDistanceRange.y, fluidDistance);
          rawUvw.xy += fluidOffset * fluidDepthStrength * fluidDistanceStrength;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
`), new D({
        glslVersion: C,
        vertexShader: e.vertexShader,
        fragmentShader: r,
        uniforms: {
            ...te.clone(e.uniforms),
            uVolume: {
                value: t
            },
            uFluidVelocity: {
                value: we()
            },
            uFluidStrength: {
                value: new E
            },
            uFluidDepthStrength: {
                value: new E(p[0], p[1])
            },
            uFluidDistanceRange: {
                value: new E(d[0], d[1])
            },
            uFluidWorldScale: {
                value: new b(1, 1, 1)
            },
            uFluidResolution: {
                value: new E(1, 1)
            }
        },
        transparent: !0,
        depthWrite: !1,
        depthTest: !1,
        blending: e.blending,
        side: e.side
    })
}
var Ot = Math.PI / 2,
    kt = [-m, m],
    At = 6,
    jt = 14,
    Mt = 5,
    Nt = new b(1, 1, 1);

function Pt({
    cameraObject: e,
    cameraRigObject: t,
    position: n,
    target: i,
    animation: a,
    positionOffset: o,
    mobilePositionOffset: c,
    rotationOffset: l,
    mobileRotationOffset: u,
    pointerInfluence: d,
    behindPointerInfluence: f = 1,
    scrollDrift: p = ue,
    motion: m,
    cameraDollyOffset: h = 0,
    cameraDollyTransitionOffset: g = 0
}) {
    let _ = z(e => e.camera),
        v = e ?? _,
        y = G(),
        S = r(e => e.isMobile),
        C = r(e => e.isLandscapeMobile),
        T = (0, Z.useRef)(null),
        ee = (0, Z.useRef)(null),
        E = (0, Z.useRef)(null),
        D = (0, Z.useRef)(null),
        O = (0, Z.useRef)(null),
        k = (0, Z.useRef)(null),
        te = (0, Z.useRef)(null),
        A = (0, Z.useRef)(null),
        j = (0, Z.useRef)(null),
        M = (0, Z.useRef)(null),
        ne = (0, Z.useRef)(null),
        re = T.current ??= new b,
        P = ee.current ??= new ie,
        F = E.current ??= {
            pitch: 0,
            yaw: 0
        },
        I = D.current ??= new b,
        L = O.current ??= new N,
        R = k.current ??= [0, 0, 0],
        B = te.current ??= new b,
        oe = A.current ??= new w,
        se = j.current ??= new ie,
        le = M.current ??= new ie,
        H = fe[a] ?? fe.none,
        me = (0, Z.useMemo)(() => V(o, c, S, C, [0, 0, 0]), [o, c, S, C]),
        he = (0, Z.useMemo)(() => V(l, u, S, C, [0, 0, 0]), [l, u, S, C]);
    return ae((e, a) => {
        let {
            transition: o,
            progress: c,
            screenOffset: l
        } = m.current;
        if (Ke(o)) return;
        let u = r.getState().preferReducedMotion,
            _ = H({
                position: n,
                target: i,
                transition: o,
                progress: c,
                screenOffset: u ? 0 : l,
                scrollDrift: p
            }),
            [b, S] = d?.[0] ?? kt,
            [C, w] = d?.[1] ?? kt,
            {
                x: T,
                y: ee,
                active: E
            } = y.current,
            D = E && !u,
            O = 1 - s(l) * (1 - f),
            k = D ? x.mapLinear(T, -1, 1, b, S) * Ot * O : 0,
            te = D ? x.mapLinear(-ee, -1, 1, C, w) * Ot * O : 0,
            A = D ? At : jt;
        F.pitch = x.damp(F.pitch, te, A, a), F.yaw = x.damp(F.yaw, k, A, a), I.set(_.position[0] - _.target[0], _.position[1] - _.target[1], _.position[2] - _.target[2]), L.setFromVector3(I), L.theta += F.yaw, L.phi += F.pitch, L.makeSafe(), I.setFromSpherical(L), R[0] = _.target[0] + I.x, R[1] = _.target[1] + I.y, R[2] = _.target[2] + I.z, ne.current === null || u ? ne.current = h : ne.current = x.damp(ne.current, h, Mt, a);
        let j = u ? 0 : g * x.clamp(-o, 0, 1),
            M = (_.localZOffset ?? 0) + ne.current + j;
        ce(v, me, he, t), de(v, R, _.target, re, P, M), U(v, t), pe(v);
        let N = t ?? v.parent;
        if (N?.userData.sectionSceneCameraRig) {
            let e = N.userData[W] ??= new ie;
            B.set(..._.position), re.set(..._.target), P.lookAt(B, re, v.up), oe.setFromRotationMatrix(P), se.compose(B, oe, Nt), M !== 0 && se.multiply(le.makeTranslation(0, 0, M)), e.multiplyMatrices(N.matrixWorld, se)
        }
    }, -1), null
}
var Ft = `uniform sampler2D tDiffuse;
uniform sampler2D tOld;
uniform sampler2D tFluidMask;
uniform sampler2D tAfterImageExclude;
uniform sampler2D tBloom;
uniform float uDamp;
uniform float uStrength;
uniform float uThreshold;
uniform float uFluidMaskStrength;
uniform float uFluidChromaticStrength;
uniform float uAfterImageExcludeStrength;
uniform vec3 uBloomColor;
uniform float uBloomOpacity;
uniform float uChromaticAmount;
uniform float uChromaticAngle;
uniform float uNoiseAmount;
uniform float uNoiseScale;
uniform float uNoiseTime;
uniform float uVignetteAmount;
uniform float uVignetteRadius;
uniform float uVignetteSoftness;
uniform float uVignetteAspect;

varying vec2 vUv;

float afterImageLuma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 fluid = vec3(0.0);
  float chromaticAmount = uChromaticAmount;
  if (uFluidMaskStrength > 0.0001) {
    fluid = texture2D(tFluidMask, vUv).rgb * uFluidMaskStrength;
    float fluidChromatic = clamp(
      length(fluid.xy) * uFluidChromaticStrength,
      0.0,
      2.0
    );
    chromaticAmount *= 1.0 + fluidChromatic;
  }

  vec4 current = texture2D(tDiffuse, vUv);
  if (chromaticAmount > 0.0001) {
    vec2 chromaticCenter = vUv - 0.5;
    float chromaticRadius = length(chromaticCenter);
    float chromaticAngleCos = cos(uChromaticAngle);
    float chromaticAngleSin = sin(uChromaticAngle);
    vec2 chromaticDir = chromaticRadius > 0.00001
      ? chromaticCenter / chromaticRadius
      : vec2(0.0);
    chromaticDir = vec2(
      chromaticDir.x * chromaticAngleCos - chromaticDir.y * chromaticAngleSin,
      chromaticDir.x * chromaticAngleSin + chromaticDir.y * chromaticAngleCos
    );
    vec2 chromaticOffset = chromaticDir *
      chromaticAmount *
      (chromaticRadius + 0.15) *
      smoothstep(0.0, 0.05, chromaticRadius);
    vec4 currentR = texture2D(
      tDiffuse,
      clamp(vUv + chromaticOffset, vec2(0.0), vec2(1.0))
    );
    vec4 currentB = texture2D(
      tDiffuse,
      clamp(vUv - chromaticOffset, vec2(0.0), vec2(1.0))
    );
    current = vec4(vec3(currentR.r, current.g, currentB.b), current.a);
  }
  if (uBloomOpacity > 0.0001) {
    vec3 bloom = texture2D(tBloom, vUv).rgb;
    current.rgb += bloom * uBloomColor * uBloomOpacity;
  }

  vec4 previous = texture2D(tOld, vUv);
  float keep = step(uThreshold, afterImageLuma(previous.rgb));
  vec3 decayed = previous.rgb * uDamp * keep;
  vec3 afterimage = max(current.rgb, decayed);

  float mixAfter = clamp(uStrength, 0.0, 1.0);
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.r));
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.g));
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.b));
  // The background light-volume FBO is already precomposited into tDiffuse. Its
  // alpha mask keeps the temporal trail on the pointcloud layer instead of
  // smearing the raymarched volume texture. (Foreground is composited after
  // this pass, so it is not masked here.)
  if (uAfterImageExcludeStrength > 0.5) {
    mixAfter *= 1.0 - clamp(texture2D(tAfterImageExclude, vUv).a, 0.0, 1.0);
  }

  vec3 color = mix(current.rgb, afterimage, mixAfter);

  if (uNoiseAmount > 0.0001) {
    float scale = clamp(uNoiseScale, 0.1, 8.0);
    vec2 noiseCell = floor(gl_FragCoord.xy / scale);
    float noise = rand(
      noiseCell + vec2(uNoiseTime * 59.0, uNoiseTime * 83.0)
    ) - 0.5;
    color += noise * uNoiseAmount;
  }

  vec2 centered = vUv - 0.5;
  centered.x *= uVignetteAspect;
  float softness = max(uVignetteSoftness, 0.0001);
  float edge = smoothstep(
    uVignetteRadius - softness,
    uVignetteRadius,
    length(centered)
  );
  float shade = mix(1.0, 1.0 - clamp(uVignetteAmount, 0.0, 1.0), edge);
  shade = mix(1.0, shade, smoothstep(0.5, 1.0, vUv.y));
  color *= shade;

  gl_FragColor = vec4(color, current.a);
}
`,
    It = `uniform sampler2D tDiffuse;
uniform float uAmount;
uniform float uWidth;
uniform float uHeight;
uniform float uRounded;
uniform float uBlur;
uniform vec3 uColor;

varying vec2 vUv;

float topRoundedRectSdf(vec2 point, vec2 size, float radius) {
  float x = abs(point.x);
  float y = point.y;
  float clampedRadius = min(radius, min(size.x, size.y));
  vec2 cornerCenter = size - vec2(clampedRadius);

  if (clampedRadius > 0.0 && x > cornerCenter.x && y > cornerCenter.y) {
    vec2 cornerDelta = vec2(x - cornerCenter.x, y - cornerCenter.y);
    return length(cornerDelta) - clampedRadius;
  }

  return max(x - size.x, y - size.y);
}

void main() {
  vec4 source = texture2D(tDiffuse, vUv);
  float amount = clamp(uAmount, 0.0, 1.0);
  float width = max(clamp(uWidth, 0.0, 1.0), 0.0001);
  float height = max(clamp(uHeight, 0.0, 1.0), 0.0001);
  float vertical = 1.0 - smoothstep(0.0, height, vUv.y);
  float radius = clamp(uRounded, 0.0, 1.0) * min(width, height);
  float blur = max(uBlur, 0.0001);
  vec2 shapePoint = vec2((vUv.x - 0.5) * 2.0, vUv.y);
  float sdf = topRoundedRectSdf(shapePoint, vec2(width, height), radius);
  float shapeMask = 1.0 - smoothstep(0.0, blur, sdf);
  float k = vertical * shapeMask * amount;
  // Force alpha so the downstream bg gradient doesn't bleed through gaps.
  source.a = mix(source.a, 1.0, k);
  source.rgb = mix(source.rgb, uColor, k);
  gl_FragColor = source;
}
`,
    Lt = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,
    Rt = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            tOld: {
                value: null
            },
            tFluidMask: {
                value: null
            },
            tAfterImageExclude: {
                value: null
            },
            tBloom: {
                value: null
            },
            uDamp: {
                value: .93
            },
            uStrength: {
                value: 0
            },
            uThreshold: {
                value: .04
            },
            uFluidMaskStrength: {
                value: 0
            },
            uFluidChromaticStrength: {
                value: 0
            },
            uAfterImageExcludeStrength: {
                value: 0
            },
            uBloomColor: {
                value: new k(1, 1, 1)
            },
            uBloomOpacity: {
                value: 0
            },
            uChromaticAmount: {
                value: 0
            },
            uChromaticAngle: {
                value: 0
            },
            uNoiseAmount: {
                value: 0
            },
            uNoiseScale: {
                value: 1
            },
            uNoiseTime: {
                value: 0
            },
            uVignetteAmount: {
                value: 0
            },
            uVignetteRadius: {
                value: .72
            },
            uVignetteSoftness: {
                value: .35
            },
            uVignetteAspect: {
                value: 1
            }
        },
        vertexShader: Lt,
        fragmentShader: Ft
    },
    zt = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            uAmount: {
                value: 0
            },
            uWidth: {
                value: 1
            },
            uHeight: {
                value: 1
            },
            uRounded: {
                value: 0
            },
            uBlur: {
                value: .08
            },
            uColor: {
                value: new k(0, 0, 0)
            }
        },
        vertexShader: Lt,
        fragmentShader: It
    },
    Bt = new k;

function Vt(e, t) {
    let n = new L(new F(2, 2), t);
    return e.add(n), n
}
var Ht = class {
        rawSceneTarget = null;
        options;
        preset;
        renderer = null;
        afterImageOldTarget = null;
        afterImageTarget = null;
        afterImageMaterial = null;
        afterImageScene = new M;
        afterImageCamera = new O(-1, 1, 1, -1, 0, 1);
        afterImageQuad = null;
        crossFadeTransitionTarget = null;
        crossFadeTransitionMaterial = null;
        crossFadeTransitionScene = new M;
        crossFadeTransitionCamera = new O(-1, 1, 1, -1, 0, 1);
        crossFadeTransitionQuad = null;
        fxWidth = 0;
        fxHeight = 0;
        sceneWidth = 1;
        sceneHeight = 1;
        initialized = !1;
        hasAfterImageFrame = !1;
        afterImageCameraFade = 1;
        afterImageScrollFade = 1;
        afterImageScrollFadeTime = 0;
        afterImageCameraSampleReady = !1;
        transientRtsCleared = !0;
        afterImageCameraPosition = new b;
        afterImagePreviousCameraPosition = new b;
        afterImageCameraQuaternion = new w;
        afterImagePreviousCameraQuaternion = new w;
        constructor(e) {
            this.options = e, this.preset = e.preset
        }
        init(e) {
            if (this.renderer = e, this.initialized) return;
            this.initialized = !0, this.afterImageMaterial = new D({
                uniforms: te.clone(Rt.uniforms),
                vertexShader: Rt.vertexShader,
                fragmentShader: Rt.fragmentShader,
                depthTest: !1,
                depthWrite: !1,
                toneMapped: !1
            }), this.afterImageQuad = Vt(this.afterImageScene, this.afterImageMaterial);
            let t = this.preset.tint;
            this.afterImageMaterial.uniforms.uBloomColor.value.setRGB(t[0], t[1], t[2])
        }
        resize(e, t, n, r, i, a) {
            if (this.sceneWidth = n, this.sceneHeight = r, this.rawSceneTarget) {
                this.rawSceneTarget.setSize(n, r);
                let e = this.rawSceneTarget.depthTexture;
                e && (e.image.width !== n || e.image.height !== r) && (e.image.width = n, e.image.height = r, e.needsUpdate = !0)
            }
            this.afterImageOldTarget?.setSize(i, a), this.afterImageTarget?.setSize(i, a), this.crossFadeTransitionTarget?.setSize(i, a), this.fxWidth = i, this.fxHeight = a, this.hasAfterImageFrame = !1, this.afterImageCameraSampleReady = !1, this.renderer && je(this.renderer).setSize(e, t), this.afterImageMaterial && (this.afterImageMaterial.uniforms.uVignetteAspect.value = e / Math.max(t, 1))
        }
        acquireSceneTarget(e) {
            this.rawSceneTarget ||= Y(e, `main`, this.sceneWidth, this.sceneHeight)
        }
        releaseSceneTarget(e) {
            this.rawSceneTarget &&= (X(e, `main`, this.rawSceneTarget), null)
        }
        acquireFxTargets(e) {
            this.afterImageOldTarget || (this.afterImageOldTarget = Y(e, `fx`, this.fxWidth, this.fxHeight), this.afterImageTarget = Y(e, `fx`, this.fxWidth, this.fxHeight), this.hasAfterImageFrame = !1)
        }
        releaseFxTargets(e) {
            this.afterImageOldTarget &&= (X(e, `fx`, this.afterImageOldTarget), null), this.afterImageTarget &&= (X(e, `fx`, this.afterImageTarget), null), this.crossFadeTransitionTarget &&= (X(e, `fx`, this.crossFadeTransitionTarget), null), this.hasAfterImageFrame = !1, this.transientRtsCleared = !0
        }
        resetTransientState(e) {
            if (this.hasAfterImageFrame = !1, this.afterImageCameraSampleReady = !1, this.afterImageCameraFade = 1, this.afterImageScrollFade = 1, this.afterImageScrollFadeTime = 0, e && !this.transientRtsCleared && this.afterImageOldTarget && this.afterImageTarget) {
                let t = e.getRenderTarget(),
                    n = e.getClearColor(Bt).clone(),
                    r = e.getClearAlpha();
                e.setClearColor(0, 0), e.setRenderTarget(this.afterImageOldTarget), e.clear(), e.setRenderTarget(this.afterImageTarget), e.clear(), e.setRenderTarget(t), e.setClearColor(n, r), this.transientRtsCleared = !0
            }
        }
        applyPreset(e) {
            if (this.preset = e, this.afterImageMaterial) {
                let t = e.tint;
                this.afterImageMaterial.uniforms.uBloomColor.value.setRGB(t[0], t[1], t[2])
            }
        }
        isBloomActive(e) {
            return this.getBloomOverlayOpacity(e) > 0
        }
        isAfterImageActive(e) {
            return e.cameraMotion.afterimageEnabled !== !1 && (e.cameraMotion.afterimageStrength ?? c.afterimageStrength) > 0
        }
        isVignetteActive(e) {
            return e.cameraMotion.vignetteEnabled !== !1 && (e.cameraMotion.vignetteAmount ?? 0) > 0
        }
        getBloomOverlayOpacity(e) {
            return !this.preset.enabled || e.cameraMotion.bloomEnabled === !1 ? 0 : this.preset.opacity
        }
        get hasPersistedAfterImageFrame() {
            return this.hasAfterImageFrame
        }
        get afterImageOldTexture() {
            return this.afterImageOldTarget?.texture ?? null
        }
        updateCameraFade(e) {
            if (e.updateMatrixWorld(!0), e.getWorldPosition(this.afterImageCameraPosition), e.getWorldQuaternion(this.afterImageCameraQuaternion), !this.afterImageCameraSampleReady) {
                this.afterImagePreviousCameraPosition.copy(this.afterImageCameraPosition), this.afterImagePreviousCameraQuaternion.copy(this.afterImageCameraQuaternion), this.afterImageCameraSampleReady = !0, this.afterImageCameraFade = 1;
                return
            }
            let t = this.afterImageCameraPosition.distanceTo(this.afterImagePreviousCameraPosition) + (1 - Math.abs(this.afterImageCameraQuaternion.dot(this.afterImagePreviousCameraQuaternion))) * 2;
            this.afterImageCameraFade = 1 - x.smoothstep(t, Pe, ke), this.afterImagePreviousCameraPosition.copy(this.afterImageCameraPosition), this.afterImagePreviousCameraQuaternion.copy(this.afterImageCameraQuaternion)
        }
        resetCameraFade() {
            this.afterImageCameraFade = 1
        }
        invalidateCameraBaseline() {
            this.afterImageCameraSampleReady = !1
        }
        renderBloom(e) {
            return this.rawSceneTarget ? je(e).render(e, this.rawSceneTarget.texture, this.preset.intensity, this.preset.radius, this.preset.threshold) : null
        }
        renderAfterImage(e, t) {
            if (!this.afterImageOldTarget || !this.afterImageTarget || !this.afterImageMaterial) return;
            let {
                ctx: n,
                source: r,
                bloomTexture: i,
                fluidMaskTexture: a,
                afterImageExcludeTexture: s
            } = t, l = n.cameraMotion, u = l.afterimageEnabled === !1 ? 0 : l.afterimageStrength ?? c.afterimageStrength, d = l.vignetteEnabled === !1 ? 0 : l.vignetteAmount ?? 0, f = i ? this.getBloomOverlayOpacity(n) : 0, p = l.chromaticEnabled === !1 ? 0 : l.chromaticAmount ?? 0, m = l.noiseEnabled === !1 ? 0 : l.noiseAmount ?? 0;
            if (u <= 0 && d <= 0 && f <= 0 && p <= 0 && m <= 0) {
                this.hasAfterImageFrame = !1;
                return
            }
            let h = x.clamp(1 - x.smoothstep(Math.abs(n.scrollVelocity), Me, Ae), 0, 1),
                g = performance.now(),
                _ = this.afterImageScrollFadeTime ? Math.min(Ie, (g - this.afterImageScrollFadeTime) / 1e3) : 1 / 60;
            this.afterImageScrollFadeTime = g;
            let v = x.clamp(l.afterimageScrollFadeLerp ?? c.afterimageScrollFadeLerp, o[0], o[1]);
            this.afterImageScrollFade = this.hasAfterImageFrame ? Be(this.afterImageScrollFade, h, _, v) : h;
            let y = this.afterImageScrollFade,
                b = this.afterImageMaterial.uniforms;
            b.tDiffuse.value = r, b.tOld.value = this.hasAfterImageFrame ? this.afterImageOldTarget.texture : r, b.tFluidMask.value = a ?? this.options.zeroTexture, b.tAfterImageExclude.value = s ?? this.options.zeroTexture, b.uAfterImageExcludeStrength.value = +!!s, b.tBloom.value = i ?? this.options.zeroTexture;
            let S = x.clamp(l.afterimageDamp ?? c.afterimageDamp, 0, .999),
                C = x.lerp(Fe, S, y);
            b.uDamp.value = this.hasAfterImageFrame ? C ** (_ * 60) : 0, b.uFluidMaskStrength.value = +!!a, b.uFluidChromaticStrength.value = a ? 4 : 0, b.uStrength.value = x.clamp(u * y * this.afterImageCameraFade, 0, 1), b.uThreshold.value = l.afterimageThreshold ?? .04, b.uBloomOpacity.value = f, b.uChromaticAmount.value = p, b.uChromaticAngle.value = l.chromaticAngle ?? this.preset.rgbAngle, b.uNoiseAmount.value = x.clamp(m, 0, 1), b.uNoiseScale.value = x.clamp(l.noiseScale ?? 1, .1, 8), b.uNoiseTime.value = performance.now() * .001 % 1e3, b.uVignetteAmount.value = x.clamp(d, 0, 1), b.uVignetteRadius.value = x.clamp(l.vignetteRadius ?? .72, 0, 1.5), b.uVignetteSoftness.value = x.clamp(l.vignetteSoftness ?? .35, .001, 1), e.setRenderTarget(this.afterImageTarget), e.clear(), e.render(this.afterImageScene, this.afterImageCamera);
            let w = this.afterImageOldTarget;
            this.afterImageOldTarget = this.afterImageTarget, this.afterImageTarget = w, this.hasAfterImageFrame = !0, this.transientRtsCleared = !1
        }
        renderCrossFadeTransition(e, t, n, r, i, a, o, s) {
            if (n <= 0 || (this.crossFadeTransitionTarget ??= Y(e, `fx`, this.fxWidth, this.fxHeight), this.crossFadeTransitionMaterial || (this.crossFadeTransitionMaterial = new D({
                    uniforms: te.clone(zt.uniforms),
                    vertexShader: zt.vertexShader,
                    fragmentShader: zt.fragmentShader,
                    depthTest: !1,
                    depthWrite: !1,
                    toneMapped: !1
                }), this.crossFadeTransitionQuad = Vt(this.crossFadeTransitionScene, this.crossFadeTransitionMaterial)), !this.crossFadeTransitionTarget)) return null;
            let c = this.crossFadeTransitionMaterial.uniforms;
            return c.tDiffuse.value = t, c.uAmount.value = x.clamp(n, 0, 1), c.uWidth.value = x.clamp(r, 0, 1), c.uHeight.value = x.clamp(i, 0, 1), c.uRounded.value = x.clamp(a, 0, 1), c.uBlur.value = x.clamp(o, 1e-4, 1), c.uColor.value.setRGB(s.r, s.g, s.b), e.setRenderTarget(this.crossFadeTransitionTarget), e.clear(), e.render(this.crossFadeTransitionScene, this.crossFadeTransitionCamera), this.crossFadeTransitionTarget.texture
        }
        dispose() {
            this.rawSceneTarget?.dispose(), this.afterImageOldTarget?.dispose(), this.afterImageTarget?.dispose(), this.rawSceneTarget = null, this.afterImageOldTarget = null, this.afterImageTarget = null, this.initialized = !1, this.afterImageQuad && this.afterImageScene.remove(this.afterImageQuad), this.afterImageQuad?.geometry.dispose(), this.afterImageMaterial?.dispose(), this.afterImageMaterial = null, this.afterImageQuad = null, this.crossFadeTransitionQuad && this.crossFadeTransitionScene.remove(this.crossFadeTransitionQuad), this.crossFadeTransitionQuad?.geometry.dispose(), this.crossFadeTransitionMaterial?.dispose(), this.crossFadeTransitionTarget?.dispose(), this.crossFadeTransitionMaterial = null, this.crossFadeTransitionQuad = null, this.crossFadeTransitionTarget = null
        }
    },
    Ut = 4,
    Wt = new WeakMap;

function Gt(e) {
    let t = Wt.get(e);
    return t || (t = [], Wt.set(e, t)), t
}

function Kt(e, t) {
    let n = Gt(e);
    return n.length > 0 ? n.pop() : new Ht(t)
}

function qt(e, t) {
    let n = Gt(e);
    if (n.length >= Ut) {
        t.dispose();
        return
    }
    n.push(t)
}
var Jt = null;

function Yt() {
    return Jt ||= Zt(), Jt
}
var Xt = (0, Z.forwardRef)(function(e, t) {
    let {
        bloom: n,
        zeroTexture: r,
        maxDpr: i,
        dpr: a
    } = e, o = z(e => e.gl), s = z(e => e.size), c = z(e => e.viewport.dpr), l = a == null ? i == null ? c : Math.min(c, i) : Math.min(Math.max(.05, a), i ?? 1 / 0), u = r ?? Yt(), d = (0, Z.useRef)(null), f = d.current ??= Kt(o, {
        preset: n,
        zeroTexture: u
    });
    return (0, Z.useImperativeHandle)(t, () => f, [f]), (0, Z.useEffect)(() => {
        f.init(o), f.resetTransientState(o), f.invalidateCameraBaseline()
    }, [f, o]), (0, Z.useEffect)(() => {
        f.applyPreset(n)
    }, [f, n]), (0, Z.useEffect)(() => {
        let e = Math.max(1, Math.round(s.width * l)),
            t = Math.max(1, Math.round(s.height * l));
        f.resize(s.width, s.height, e, t, e, t)
    }, [f, s.width, s.height, l]), (0, Z.useEffect)(() => () => {
        f.releaseSceneTarget(o), f.releaseFxTargets(o), qt(o, f)
    }, [o, f]), null
});

function Zt() {
    let e = new re(new Uint8Array([0, 0, 0, 255]), 1, 1, ne);
    return e.needsUpdate = !0, e
}
var Qt = 1.5,
    $t = 2,
    en = new k,
    tn = new k,
    nn = {
        r: 0,
        g: 0,
        b: 0
    },
    rn = 4;

function an(e) {
    let t = [];
    return e.traverse(e => {
        let n = e.material;
        n && (Array.isArray(n) ? t.push(...n) : t.push(n))
    }), t
}

function on(e) {
    let t = [],
        n = new Set;
    for (let r of e) !r || n.has(r) || (n.add(r), t.push({
        object: r,
        visible: r.visible
    }), r.visible = !1);
    return t
}

function sn(e) {
    for (let {
            object: t,
            visible: n
        }
        of e) t.visible = n
}

function cn(e, t) {
    let n = t;
    for (; n;) {
        if (n === e) return !0;
        n = n.parent
    }
    return !1
}

function ln() {
    let e = new M,
        t = new O(-1, 1, 1, -1, 0, 1),
        n = new F(2, 2),
        r = new D({
            uniforms: {
                tMap: {
                    value: null
                },
                tFluidMask: {
                    value: we()
                },
                uFluidMaskStrength: {
                    value: 0
                },
                uFluidChromaticStrength: {
                    value: rn
                },
                uChromaticAmount: {
                    value: 0
                },
                uChromaticAngle: {
                    value: 0
                }
            },
            vertexShader: Lt,
            fragmentShader: `
      uniform sampler2D tMap;
      uniform sampler2D tFluidMask;
      uniform float uFluidMaskStrength;
      uniform float uFluidChromaticStrength;
      uniform float uChromaticAmount;
      uniform float uChromaticAngle;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(tMap, vUv);
        if (color.a <= 0.0001) discard;

        vec3 fluid = texture2D(tFluidMask, vUv).rgb * uFluidMaskStrength;
        float fluidChromatic = clamp(
          length(fluid.xy) * uFluidChromaticStrength,
          0.0,
          2.0
        );
        float chromaticAmount = uChromaticAmount * (1.0 + fluidChromatic);

        if (chromaticAmount > 0.000001) {
          vec2 chromaticCenter = vUv - 0.5;
          float chromaticRadius = length(chromaticCenter);
          float chromaticAngleCos = cos(uChromaticAngle);
          float chromaticAngleSin = sin(uChromaticAngle);
          vec2 chromaticDir = chromaticRadius > 0.00001
            ? chromaticCenter / chromaticRadius
            : vec2(0.0);
          chromaticDir = vec2(
            chromaticDir.x * chromaticAngleCos - chromaticDir.y * chromaticAngleSin,
            chromaticDir.x * chromaticAngleSin + chromaticDir.y * chromaticAngleCos
          );
          vec2 chromaticOffset = chromaticDir *
            chromaticAmount *
            (chromaticRadius + 0.15) *
            smoothstep(0.0, 0.05, chromaticRadius);
          vec4 colorR = texture2D(
            tMap,
            clamp(vUv + chromaticOffset, vec2(0.0), vec2(1.0))
          );
          vec4 colorB = texture2D(
            tMap,
            clamp(vUv - chromaticOffset, vec2(0.0), vec2(1.0))
          );
          color.rgb = vec3(colorR.r, color.g, colorB.b);
        }

        gl_FragColor = color;
      }
    `,
            transparent: !0,
            depthTest: !1,
            depthWrite: !1,
            toneMapped: !1
        }),
        i = new L(n, r);
    i.frustumCulled = !1, e.add(i);
    let a = {},
        o = 1,
        s = 1,
        c = 1,
        l = 1,
        u = (e, t) => {
            let n = a[t];
            n && (X(e, `video`, n), delete a[t])
        },
        d = e => {
            u(e, `background`), u(e, `environment`), u(e, `foreground`)
        };
    return {
        scene: e,
        camera: t,
        material: r,
        quad: i,
        setSizes: (e, t, n, r) => {
            o = e, s = t, c = n, l = r, a.background?.setSize(e, t), a.environment?.setSize(e, t), a.foreground?.setSize(n, r)
        },
        acquire: (e, t) => (t.background ? a.background ??= Y(e, `video`, o, s) : u(e, `background`), t.environment ? a.environment ??= Y(e, `video`, o, s) : u(e, `environment`), t.foreground ? a.foreground ??= Y(e, `video`, c, l) : u(e, `foreground`), a),
        release: d,
        dispose: t => {
            e.remove(i), n.dispose(), r.dispose(), d(t)
        }
    }
}

function un(e, t, n) {
    for (let r of e)
        for (let e of an(r)) {
            let r = e.uniforms?.uFluidResolution?.value;
            r && typeof r.set == `function` && r.set(t, n)
        }
}

function dn(e, t, n, r, i, a = !1) {
    if (r.length === 0 && !a) return;
    let o = [];
    t.traverse(e => {
        if (e === t) return;
        let n = r.some(t => cn(e, t) || cn(t, e));
        o.push({
            object: e,
            visible: e.visible
        }), e.visible = n && e.visible
    });
    let s = e.getRenderTarget(),
        c = e.autoClear,
        l = t.background,
        u = e.getClearAlpha();
    e.getClearColor(tn), a || (t.background = null), e.autoClear = !1, e.setClearColor(0, 0), un(r, i.width, i.height), e.setRenderTarget(i), e.clear(), e.render(t, n), e.setRenderTarget(s), e.setClearColor(tn, u), e.autoClear = c, t.background = l, sn(o)
}

function fn(e) {
    return e.some(e => an(e).some(e => e.blending === 2))
}

function pn(e) {
    let t = !1;
    return e.traverseVisible(e => {
        t || !(e.layers.mask & 2) || (t = an(e).some(e => e.visible))
    }), t
}

function mn(e) {
    let t = !1;
    return e.traverseVisible(e => {
        t || !e.userData.dryLayerDrawOnTop || !(e.layers.mask & 2) || (t = an(e).some(e => e.visible))
    }), t
}

function hn(e) {
    return `blitFramebuffer` in e
}

function gn(e, t) {
    let n = e.properties.get(t).__webglFramebuffer;
    if (Array.isArray(n)) {
        let e = n[0];
        return (Array.isArray(e) ? e[0] : e) ?? null
    }
    return n ?? null
}

function _n(e, t, n, r = t.width, i = t.height) {
    let a = e.getContext();
    if (!hn(a)) return !1;
    let o = e.getRenderTarget();
    e.setRenderTarget(n), e.setRenderTarget(o);
    let s = gn(e, t),
        c = gn(e, n);
    return !s || !c ? !1 : (e.state.bindFramebuffer(a.READ_FRAMEBUFFER, s), e.state.bindFramebuffer(a.DRAW_FRAMEBUFFER, c), a.blitFramebuffer(0, 0, r, i, 0, 0, n.width, n.height, a.DEPTH_BUFFER_BIT, a.NEAREST), e.setRenderTarget(o), !0)
}

function vn(e, t, n, r, i = {}) {
    let a = Math.max(0, i.chromaticAmount ?? 0),
        o = i.fluidMaskTexture ?? null,
        s = e.autoClear;
    t.material.blending = fn(r) ? 2 : 1, t.material.uniforms.tMap.value = n, t.material.uniforms.tFluidMask.value = o ?? we(), t.material.uniforms.uFluidMaskStrength.value = a > 0 && o ? 1 : 0, t.material.uniforms.uChromaticAmount.value = a, t.material.uniforms.uChromaticAngle.value = i.chromaticAngle ?? 0, e.autoClear = !1, e.render(t.scene, t.camera), e.autoClear = s, t.material.uniforms.tMap.value = null, t.material.uniforms.tFluidMask.value = we()
}

function yn(e, t) {
    let n = [],
        r = t;
    for (; r.parent && r !== e;) {
        for (let e of r.parent.children) e !== r && (n.push({
            object: e,
            visible: e.visible
        }), e.visible = !1);
        r = r.parent
    }
    return n
}

function bn(e, t, n, r, i = []) {
    let a = on(i);
    if (!r?.visible) {
        e.render(t, n), sn(a);
        return
    }
    let o = e.autoClear,
        s = yn(t, r),
        c = an(r).map(e => ({
            material: e,
            colorWrite: e.colorWrite,
            depthWrite: e.depthWrite,
            depthTest: e.depthTest
        }));
    for (let {
            material: e
        }
        of c) e.colorWrite = !1, e.depthWrite = !0, e.depthTest = !0;
    e.autoClear = !1, e.render(t, n), sn(s);
    for (let {
            material: e,
            colorWrite: t,
            depthWrite: n,
            depthTest: r
        }
        of c) e.colorWrite = t, e.depthWrite = n, e.depthTest = r;
    e.render(t, n), e.autoClear = o, sn(a)
}

function xn(e, t, n, r, i = !1) {
    let a = e.getRenderTarget(),
        o = e.autoClear,
        s = t.background,
        c = e.getClearAlpha(),
        l = n.layers.mask;
    e.getClearColor(tn), t.background = null, n.layers.set(1), e.autoClear = !1, e.setClearColor(0, 0), e.setRenderTarget(r), e.clear(!0, i, !1), e.render(t, n), e.setRenderTarget(a), e.setClearColor(tn, c), e.autoClear = o, t.background = s, n.layers.mask = l
}

function Sn(e, t, n, r, i, a) {
    let o = e.getRenderTarget(),
        s = e.autoClear,
        c = t.background,
        l = e.getClearAlpha(),
        u = n.layers.mask,
        d = an(t).map(e => ({
            material: e,
            colorWrite: e.colorWrite
        }));
    e.getClearColor(tn);
    for (let {
            material: e
        }
        of d) e.colorWrite = !1;
    t.background = null, n.layers.set(0), e.autoClear = !1, e.setClearColor(0, 0), e.setRenderTarget(a), e.clear(!0, !0, !1), bn(e, t, n, r, i);
    for (let {
            material: e,
            colorWrite: t
        }
        of d) e.colorWrite = t;
    e.setRenderTarget(o), e.setClearColor(tn, l), e.autoClear = s, t.background = c, n.layers.mask = u
}

function Cn({
    bloom: e,
    bloomEnabled: t,
    chromaticEnabled: n,
    chromaticAmount: r,
    chromaticAngle: i,
    vignetteEnabled: o,
    vignetteAmount: s,
    vignetteRadius: c,
    vignetteSoftness: d,
    heroBottomGradient: f,
    afterimageEnabled: p,
    afterimageStrength: m,
    afterimageDamp: h,
    afterimageScrollFadeLerp: g,
    afterimageThreshold: _,
    noiseEnabled: v,
    noiseAmount: y,
    noiseScale: b,
    outputTextureRef: S,
    foregroundTextureRef: C,
    dryTextureRef: w,
    fboDpr: T,
    renderScale: ee = 1,
    reduceQualityBehind: E = !0,
    behindOffset: D = 0,
    dryLayerMsaa: O = !0,
    transparentBackground: k = !1,
    motion: te,
    fluidVelocityRef: A,
    pointCloudRef: j,
    foregroundVideoLightVolumeRef: M,
    videoLightVolumeRef: ne,
    renderScene: N,
    renderCamera: re
}) {
    let P = (0, Z.useRef)(null),
        F = z(e => e.gl),
        ie = z(e => e.scene),
        I = z(e => e.camera),
        L = z(e => e.size),
        R = N ?? ie,
        B = re ?? I,
        se = (0, Z.useRef)({
            scrollVelocity: 0,
            cameraMotion: {}
        }),
        ce = (0, Z.useRef)({
            ctx: se.current,
            source: null,
            bloomTexture: null,
            fluidMaskTexture: null,
            afterImageExcludeTexture: null
        }),
        le = (0, Z.useMemo)(() => ln(), []),
        V = O ? `dryMsaa` : `dry`,
        H = (0, Z.useRef)(null),
        U = (0, Z.useRef)(null),
        ue = (0, Z.useRef)({
            width: 1,
            height: 1
        }),
        W = (0, Z.useRef)(null);
    return (0, Z.useEffect)(() => () => le.dispose(F), [le, F]), (0, Z.useEffect)(() => () => {
        H.current &&= (X(F, V, H.current), null), U.current &&= (X(F, `dryDepth`, U.current), null), W.current &&= (X(F, `sceneCapture`, W.current), null)
    }, [F, V]), (0, Z.useEffect)(() => {
        le.setSizes(Math.max(1, Math.round(L.width * T.background)), Math.max(1, Math.round(L.height * T.background)), Math.max(1, Math.round(L.width * T.foreground)), Math.max(1, Math.round(L.height * T.foreground)));
        let e = Math.max(1, Math.round(L.width * $t)),
            t = Math.max(1, Math.round(L.height * $t));
        ue.current = {
            width: e,
            height: t
        }, H.current && (H.current.depthTexture = null, H.current.setSize(e, t))
    }, [T.background, T.foreground, L.height, L.width, le]), ae(() => {
        let {
            progress: e,
            transition: T
        } = te.current;
        if (Ke(T)) {
            P.current?.releaseSceneTarget(F), P.current?.releaseFxTargets(F), P.current?.resetTransientState(F), le.release(F), H.current &&= (X(F, V, H.current), null), U.current &&= (X(F, `dryDepth`, U.current), null), W.current &&= (X(F, `sceneCapture`, W.current), null), S.current = null, C && (C.current = null), w && (w.current = null);
            return
        }
        let O = P.current;
        if (!O) {
            S.current = null, C && (C.current = null), w && (w.current = null);
            return
        }
        if (O.acquireSceneTarget(F), O.acquireFxTargets(F), !O.rawSceneTarget) {
            S.current = null, C && (C.current = null), w && (w.current = null);
            return
        }
        let N = j?.current ?? null,
            re = ne?.current ?? null,
            ie = M?.current ?? null,
            I = [],
            L = [];
        for (let e of [re, ie]) e?.visible && (e.userData.videoLightLayer === `foreground` ? L.push(e) : I.push(e));
        let z = [...I, ...L],
            ae = R.background !== null,
            de = I.length > 0,
            fe = ae,
            pe = L.length > 0,
            me = de || fe,
            he = n && de ? r : 0,
            G = le.acquire(F, {
                background: de,
                environment: fe,
                foreground: pe
            });
        de && G.background && dn(F, R, B, I, G.background), fe && G.environment && dn(F, R, B, [], G.environment, !0), pe && G.foreground && dn(F, R, B, L, G.foreground), F.getClearColor(en);
        let ge = F.getClearAlpha();
        F.setClearColor(0, +!k);
        let _e = a(te.current.screenOffset, D),
            K = u(_e, ee, E),
            ve = K < 1,
            q = W.current;
        ve ? q ? (q.width !== O.rawSceneTarget.width || q.height !== O.rawSceneTarget.height) && q.setSize(O.rawSceneTarget.width, O.rawSceneTarget.height) : q = W.current = Y(F, `sceneCapture`, O.rawSceneTarget.width, O.rawSceneTarget.height) : q &&= (X(F, `sceneCapture`, q), W.current = null, null);
        let ye = q ?? O.rawSceneTarget;
        if (q) {
            let e = Math.max(1, Math.round(q.width * K)),
                t = Math.max(1, Math.round(q.height * K));
            q.viewport.set(0, 0, e, t), q.scissor.set(0, 0, e, t), q.scissorTest = !0
        }
        F.setRenderTarget(ye), F.clear();
        let be = R.background;
        if (me && (G.environment && vn(F, le, G.environment.texture, []), G.background && vn(F, le, G.background.texture, I, {
                chromaticAmount: he,
                chromaticAngle: i,
                fluidMaskTexture: A?.current ?? null
            }), R.background = null), N instanceof Se && N.applyBehindContentQuality(K, l(_e, E)), bn(F, R, B, N, z), R.background = be, q && (q.scissorTest = !1, q.viewport.set(0, 0, q.width, q.height), q.scissor.set(0, 0, q.width, q.height), Ne(F, q, O.rawSceneTarget, K)), w)
            if (!pn(R)) H.current &&= (X(F, V, H.current), null), U.current &&= (X(F, `dryDepth`, U.current), null), w.current = null;
            else {
                let e = H.current ??= Y(F, V, ue.current.width, ue.current.height),
                    t = mn(R);
                if (t || e.samples > 0) U.current &&= (X(F, `dryDepth`, U.current), null), t || Sn(F, R, B, N, z, e);
                else {
                    let t = U.current ??= Y(F, `dryDepth`, O.rawSceneTarget.width, O.rawSceneTarget.height);
                    (t.width !== O.rawSceneTarget.width || t.height !== O.rawSceneTarget.height) && (t.depthTexture = null, t.setSize(O.rawSceneTarget.width, O.rawSceneTarget.height));
                    let n = ve ? Math.max(1, Math.round(t.width * K)) : t.width,
                        r = ve ? Math.max(1, Math.round(t.height * K)) : t.height;
                    ve && (t.viewport.set(0, 0, n, r), t.scissor.set(0, 0, n, r), t.scissorTest = !0), Sn(F, R, B, N, z, t), ve && (t.scissorTest = !1, t.viewport.set(0, 0, t.width, t.height), t.scissor.set(0, 0, t.width, t.height)), _n(F, t, e, n, r) || Sn(F, R, B, N, z, e)
                }
                xn(F, R, B, e, t), w.current = e.texture
            } C && (C.current = G.foreground?.texture ?? null), F.setClearColor(en, ge);
        let xe = t ? O.renderBloom(F) : null;
        se.current.scrollVelocity = te.current.scrollVelocity || oe();
        let J = se.current.cameraMotion;
        J.bloomEnabled = t, J.afterimageEnabled = p, J.afterimageStrength = m, J.afterimageDamp = h, J.afterimageScrollFadeLerp = g, J.afterimageThreshold = _, J.vignetteEnabled = o, J.vignetteAmount = s, J.vignetteRadius = c, J.vignetteSoftness = d, J.chromaticEnabled = !1, J.chromaticAmount = 0, J.chromaticAngle = i, J.noiseEnabled = v, J.noiseAmount = y, J.noiseScale = b, O.updateCameraFade(B);
        let Ce = ce.current;
        Ce.source = O.rawSceneTarget.texture, Ce.bloomTexture = xe, Ce.fluidMaskTexture = null, Ce.afterImageExcludeTexture = G.background?.texture ?? null, O.renderAfterImage(F, Ce);
        let we = p && m > 0 || o && s > 0 || v && y > 0 || xe !== null && O.getBloomOverlayOpacity(se.current) > 0 ? O.afterImageOldTexture ?? O.rawSceneTarget.texture : O.rawSceneTarget.texture,
            Te = f ? f.opacity * (1 - x.smoothstep(e, f.fadeStartProgress, f.fadeEndProgress)) : 0;
        S.current = O.renderCrossFadeTransition(F, we, Te, f?.width ?? 1, f?.height ?? 1, f?.rounded ?? 0, f?.blur ?? .08, f?.color ?? nn) ?? we, F.setRenderTarget(null)
    }, 0), (0, Q.jsx)(Xt, {
        ref: P,
        bloom: e,
        maxDpr: Qt,
        dpr: T.main
    })
}
var wn = {
        visibility: 1,
        pointSizeScale: 1,
        introColorMix: 0,
        timeScale: 1,
        driveFluid: !0,
        scrollVelocity: 0
    },
    Tn = `#0a0a14`,
    En = {
        position: [0, 0, 0],
        rotation: [0, 0, 0]
    };

function Dn(e) {
    return {
        ...e.environment
    }
}

function On(e, t, n) {
    return !n || !t ? e : [(e?.[0] ?? 0) + t[0], (e?.[1] ?? 0) + t[1], (e?.[2] ?? 0) + t[2]]
}

function kn(e) {
    return {
        position: e.camera.position,
        target: e.camera.target,
        animation: e.camera.animation ?? `scrollDrift`,
        fov: e.camera.fov,
        mobileFov: e.camera.mobileFov,
        positionOffset: e.camera.positionOffset,
        mobilePositionOffset: e.camera.mobilePositionOffset,
        rotationOffset: e.camera.rotationOffset,
        mobileRotationOffset: e.camera.mobileRotationOffset,
        pointerInfluence: e.camera.pointerInfluence,
        scrollDrift: e.camera.scrollDrift
    }
}

function An(e) {
    return {
        ...wn,
        pointSizeScale: e.pointcloud.pointSizeScale ?? 1,
        position: e.pointcloud.position ? [e.pointcloud.position.x, e.pointcloud.position.y, e.pointcloud.position.z] : void 0,
        rotation: e.pointcloud.rotation ? [e.pointcloud.rotation.x, e.pointcloud.rotation.y, e.pointcloud.rotation.z] : void 0,
        scale: e.pointcloud.scale,
        mobile: e.pointcloud.mobile ? {
            position: e.pointcloud.mobile.position ? [e.pointcloud.mobile.position.x, e.pointcloud.mobile.position.y, e.pointcloud.mobile.position.z] : void 0,
            rotation: e.pointcloud.mobile.rotation ? [e.pointcloud.mobile.rotation.x, e.pointcloud.mobile.rotation.y, e.pointcloud.mobile.rotation.z] : void 0
        } : void 0,
        opacity: e.pointcloud.opacity,
        exposure: 0,
        transparent: e.pointcloud.transparent ?? !0,
        blendMode: e.pointcloud.blendMode,
        simplePoints: !e.pointcloud.fluid.enabled,
        randomize: e.pointcloud.randomize ? [e.pointcloud.randomize.x, e.pointcloud.randomize.y, e.pointcloud.randomize.z] : void 0,
        cameraFade: e.pointcloud.cameraFade
    }
}

function jn(e) {
    let {
        bloom: t,
        chromatic: n,
        vignette: r,
        afterimage: i,
        noise: a,
        toneMapping: o,
        toneMappingExposure: s
    } = e.postprocessing;
    return {
        bloom: t,
        bloomEnabled: t.enabled,
        chromaticEnabled: n.enabled,
        chromaticAmount: n.amount,
        chromaticAngle: n.angle,
        vignetteEnabled: r.enabled,
        vignetteAmount: r.amount,
        vignetteRadius: r.radius,
        vignetteSoftness: r.softness,
        afterimageEnabled: i.enabled,
        afterimageStrength: i.strength,
        afterimageDamp: i.damp,
        afterimageScrollFadeLerp: c.afterimageScrollFadeLerp,
        afterimageThreshold: i.threshold,
        noiseEnabled: a.enabled,
        noiseAmount: a.amount,
        noiseScale: a.scale,
        toneMapping: o,
        toneMappingExposure: s
    }
}

function Mn(e) {
    return e.videoLightVolume ?? null
}

function Nn(e) {
    return e.foregroundVideoLightVolume ?? null
}

function Pn({
    preset: e,
    camera: t = kn(e),
    cameraDollyOffset: n = 0,
    cameraDollyTransitionOffset: i = 0,
    postprocessing: a = jn(e),
    pointCloud: o = An(e),
    backgroundDarken: s = 0,
    sceneTransform: c = En,
    videoLightVolume: l = Mn(e),
    foregroundVideoLightVolume: u = Nn(e),
    sdfs: d = e.sdfs,
    sdfHelpers: p = !1,
    fboDpr: m,
    renderScale: h = 1,
    transition: g = 0,
    progress: y = 0,
    screenOffset: b = 0,
    behindContent: x = e.behindContent,
    dryLayerMsaa: C = !0,
    motion: w,
    loadingHandle: T,
    onPointCloudLoad: ee,
    onPointCloudError: E,
    mousePointerEnabled: D = !0,
    subSceneContent: O
}) {
    let k = Dn(e),
        te = r(e => e.isMobile),
        A = r(e => e.isLandscapeMobile),
        j = (0, Z.useMemo)(() => ({
            background: Math.max(.05, m?.background ?? _.background),
            main: Math.max(.05, m?.main ?? _.main),
            foreground: Math.max(.05, m?.foreground ?? _.foreground)
        }), [m?.background, m?.foreground, m?.main]),
        ne = Math.min(Math.max(h, .01), 1),
        N = Math.min(j.main, Qt),
        re = (0, Z.useRef)(null),
        P = (0, Z.useRef)(null),
        F = v(),
        ie = (0, Z.useRef)(null),
        L = (0, Z.useRef)(null),
        [R, ae] = (0, Z.useState)(0);
    (0, Z.useEffect)(() => {
        re.current = null, P.current = null, ae(e => e + 1)
    }, [e.id]);
    let oe = (0, Z.useCallback)(e => {
            re.current = e, ae(e => e + 1), ee?.(e)
        }, [ee]),
        ce = (0, Z.useRef)({
            transition: g,
            progress: y,
            scrollVelocity: o.scrollVelocity,
            screenOffset: b
        });
    w || (ce.current.transition = g, ce.current.progress = y, ce.current.scrollVelocity = o.scrollVelocity, ce.current.screenOffset = b);
    let V = w ?? ce,
        U = (0, Z.useMemo)(() => new M, []),
        ue = (0, Z.useMemo)(() => {
            let e = new I;
            return e.name = `SectionScene content transform`, e
        }, []),
        W = (0, Z.useMemo)(() => new S(50, 1, .1, 100), []),
        de = (0, Z.useMemo)(() => {
            let e = new I;
            return e.name = `SectionScene camera rig`, e.userData[le] = !0, e
        }, []);
    (0, Z.useEffect)(() => (W.removeFromParent(), () => {
        W.removeFromParent()
    }), [W]);
    let [fe, pe, he] = c.position, [G, _e, K] = c.rotation;
    (0, Z.useEffect)(() => {
        ue.position.set(fe, pe, he), ue.rotation.set(G, _e, K), ue.updateMatrixWorld(!0)
    }, [ue, fe, pe, he, G, _e, K]);
    let ve = z(e => e.size);
    (0, Z.useEffect)(() => {
        W.aspect = ve.width / ve.height, W.updateProjectionMatrix()
    }, [W, ve]);
    let q = (0, Z.useRef)(null),
        ye = (0, Z.useRef)(null),
        xe = (0, Z.useRef)(null),
        Se = k.bgMode,
        Ce = Se === `hdr` || Se === void 0 && k.background,
        we = Ce || Se === void 0 ? `none` : Se === `solid` ? `solid` : `linear`,
        Te = (0, Z.useMemo)(() => ({
            mode: we,
            color1: k.bgColor1 ?? Tn,
            color2: k.bgColor2 ?? Tn,
            color3: f({
                bgColor2: k.bgColor2,
                bgColor3: k.bgColor3,
                bgGradientPoints: k.bgGradientPoints
            }, Tn),
            angle: k.bgAngle ?? 0,
            smooth: k.bgSpread ?? 50,
            pointCount: k.bgGradientPoints ?? 2,
            bias1: k.bgBias1 ?? 0,
            bias2: k.bgBias2 ?? 0,
            toneMapping: a.toneMapping,
            toneMappingExposure: a.toneMappingExposure,
            darken: s
        }), [a.toneMapping, a.toneMappingExposure, we, k.bgColor1, k.bgColor2, k.bgColor3, k.bgAngle, k.bgSpread, k.bgGradientPoints, k.bgBias1, k.bgBias2, s]),
        Ee = (0, Z.useRef)(Te);
    Ee.current = Te;
    let De = (0, Z.useRef)(a.introTransition ?? null);
    De.current = a.introTransition ?? null;
    let Oe = (0, Z.useRef)({
        darken: x.darken,
        saturation: x.saturation
    });
    Oe.current.darken = x.darken, Oe.current.saturation = x.saturation;
    let ke = (0, Z.useRef)(+!l),
        Ae = (0, Z.useMemo)(() => Ge(q, Ee, ye, xe, {
            motionRef: V,
            paramsRef: Oe
        }, De, ke), [V]),
        Y = !!(te || A),
        je = (0, Z.useMemo)(() => On(o.position, o.mobile?.position, Y), [Y, o.mobile?.position, o.position]),
        Me = (0, Z.useMemo)(() => On(o.rotation, o.mobile?.rotation, Y), [Y, o.mobile?.rotation, o.rotation]);
    return (0, Z.useEffect)(() => () => Ae.dispose(), [Ae]), (0, Q.jsxs)(Q.Fragment, {
        children: [B((0, Q.jsxs)(ge, {
            mouseEnabled: D,
            children: [(0, Q.jsx)(`primitive`, {
                object: de
            }), (0, Q.jsx)(H, {
                cameraObject: W,
                cameraRigObject: de,
                position: t.position,
                target: t.target,
                fov: t.fov,
                mobileFov: t.mobileFov,
                mobileFovMultiplier: t.mobileFovMultiplier,
                positionOffset: t.positionOffset,
                mobilePositionOffset: t.mobilePositionOffset,
                rotationOffset: t.rotationOffset,
                mobileRotationOffset: t.mobileRotationOffset
            }), (0, Q.jsx)(Pt, {
                cameraObject: W,
                cameraRigObject: de,
                position: t.position,
                target: t.target,
                animation: t.animation,
                positionOffset: t.positionOffset,
                mobilePositionOffset: t.mobilePositionOffset,
                rotationOffset: t.rotationOffset,
                mobileRotationOffset: t.mobileRotationOffset,
                pointerInfluence: t.pointerInfluence,
                behindPointerInfluence: x.pointerInfluence,
                scrollDrift: t.scrollDrift,
                motion: V,
                cameraDollyOffset: n,
                cameraDollyTransitionOffset: i
            }), (0, Q.jsxs)(`primitive`, {
                object: ue,
                children: [(0, Q.jsx)(me, {
                    url: k.url,
                    background: Ce,
                    blur: k.blur,
                    darken: k.darken,
                    rotation: k.rotation
                }), (0, Q.jsx)(se, {
                    fluid: e.pointcloud.fluid,
                    fluidVelocityRef: P,
                    driveFluid: o.driveFluid,
                    scrollVelocity: o.scrollVelocity,
                    motion: V
                }), l && (0, Q.jsx)(Z.Suspense, {
                    fallback: null,
                    children: (0, Q.jsx)(xt, {
                        sourceUrl: l.videoUrl,
                        ktx2Url: l.ktx2Url,
                        depthMapUrl: l.depthMapUrl,
                        settings: l,
                        groupRef: ie,
                        behindSpeed: x.speed,
                        quality: F,
                        timeScale: l.timeScale ?? 1,
                        motion: V,
                        fluidVelocityRef: P,
                        externalLoadFadeRef: ke
                    })
                }), u && (0, Q.jsx)(Z.Suspense, {
                    fallback: null,
                    children: (0, Q.jsx)(xt, {
                        sourceUrl: u.videoUrl,
                        ktx2Url: u.ktx2Url,
                        depthMapUrl: u.depthMapUrl,
                        settings: u,
                        groupRef: L,
                        behindSpeed: x.speed,
                        quality: F,
                        timeScale: u.timeScale ?? 1,
                        motion: V,
                        fluidVelocityRef: P
                    })
                }), (0, Q.jsx)(Z.Suspense, {
                    fallback: null,
                    children: (0, Q.jsx)(be, {
                        pointcloud: e.pointcloud,
                        id: e.id,
                        motion: V,
                        fluidVelocityRef: P,
                        visibility: o.visibility,
                        pointSizeScale: o.pointSizeScale ?? 1,
                        position: je,
                        rotation: Me,
                        scale: o.scale,
                        opacity: o.opacity,
                        exposure: o.exposure,
                        transparent: o.transparent,
                        blendMode: o.blendMode,
                        simplePoints: o.simplePoints,
                        randomize: o.randomize,
                        cameraFade: o.cameraFade,
                        introColorMix: o.introColorMix,
                        timeScale: o.timeScale,
                        behindSpeed: x.speed,
                        reduceQualityBehind: x.reduceQuality,
                        behindOffset: x.offset,
                        renderDpr: N,
                        renderScale: ne,
                        parentObject: ue,
                        onLoad: oe,
                        onError: E,
                        loadingHandle: T,
                        children: (0, Q.jsx)(J, {
                            pointCloudRef: re,
                            pointCloudVersion: R,
                            sdfs: d,
                            showHelpers: p,
                            children: (0, Q.jsx)(Le, {
                                value: P,
                                children: O
                            })
                        })
                    })
                })]
            }), (0, Q.jsx)(Cn, {
                bloom: a.bloom,
                bloomEnabled: a.bloomEnabled,
                chromaticEnabled: a.chromaticEnabled,
                chromaticAmount: a.chromaticAmount,
                chromaticAngle: a.chromaticAngle,
                vignetteEnabled: a.vignetteEnabled,
                vignetteAmount: a.vignetteAmount,
                vignetteRadius: a.vignetteRadius,
                vignetteSoftness: a.vignetteSoftness,
                heroBottomGradient: a.heroBottomGradient,
                afterimageEnabled: a.afterimageEnabled,
                afterimageStrength: a.afterimageStrength,
                afterimageDamp: a.afterimageDamp,
                afterimageScrollFadeLerp: a.afterimageScrollFadeLerp,
                afterimageThreshold: a.afterimageThreshold,
                noiseEnabled: a.noiseEnabled,
                noiseAmount: a.noiseAmount,
                noiseScale: a.noiseScale,
                toneMapping: a.toneMapping,
                toneMappingExposure: a.toneMappingExposure,
                outputTextureRef: q,
                foregroundTextureRef: ye,
                dryTextureRef: O ? xe : void 0,
                fboDpr: j,
                renderScale: ne,
                reduceQualityBehind: x.reduceQuality,
                behindOffset: x.offset,
                dryLayerMsaa: C,
                transparentBackground: Te.mode !== `none`,
                motion: V,
                fluidVelocityRef: P,
                pointCloudRef: re,
                foregroundVideoLightVolumeRef: L,
                videoLightVolumeRef: ie,
                renderScene: U,
                renderCamera: W
            })]
        }), U, {
            scene: U,
            camera: W
        }), (0, Q.jsx)(`primitive`, {
            object: Ae.mesh
        })]
    })
}
export {
    Be as a, $ as i, An as n, ze as o, jn as r, Pn as t
};
//# sourceMappingURL=SectionScene-CdHDCaCs.js.map