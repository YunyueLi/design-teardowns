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
    p as r
} from "./chunk-5MM2A4YW-DFO2Eo6J.js";
import {
    t as i
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    _ as a,
    c as o,
    d as s,
    f as c,
    i as l,
    l as u,
    o as ee,
    t as te,
    u as d
} from "./useSectionRegistry-BcvkvUON.js";
import {
    n as ne
} from "./useTierStore-edsQsT8s.js";
import {
    n as re
} from "./useAssetLoadingStore-BjdwlLYn.js";
import "./sectionModels-CqSyktdl.js";
import {
    t as ie
} from "./SceneDataContext-BXyXjH22.js";
import {
    $a as f,
    $n as p,
    Dr as m,
    Hr as h,
    In as g,
    Ja as _,
    Jt as v,
    Oa as y,
    Qa as b,
    Qi as x,
    Tr as S,
    Zi as C,
    bt as w,
    kr as T,
    rr as E,
    so as D
} from "./three.core-DVcoLpfz.js";
import {
    b as O,
    f as k,
    g as A,
    l as ae
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    a as oe,
    o as se,
    s as ce
} from "./useTheatreSectionHeight-BiKzbPmf.js";
import {
    t as j
} from "./ScenePresetsContext-CSn8bGed.js";
import {
    n as le
} from "./EnvironmentObject-BcDw_ZFE.js";
import {
    t as ue
} from "./componentTelemetry-BHGR3cLK.js";
import {
    f as M,
    r as de,
    t as N
} from "./renderScaleResolve-qdey1xp-.js";
import "./GltfAsset-DDbFRGao.js";
import {
    a as P,
    i as fe,
    o as pe,
    r as me
} from "./build-BrX_XJXO.js";
import {
    r as he,
    t as F
} from "./postEffectRegistry-BOLQjc4E.js";
var I = e(t(), 1),
    ge = class {
        #e = null;
        #t = null;
        #n = 1;
        #r = 1;
        current() {
            return this.#e ??= this.#a(), this.#e
        }
        incoming() {
            return this.#t ??= this.#a(), this.#t
        }
        setSize(e, t) {
            this.#n = e, this.#r = t, this.#e && this.#i(this.#e, e, t), this.#t && this.#i(this.#t, e, t)
        }
        #i(e, t, n) {
            e.setSize(t, n);
            let r = e.depthTexture;
            r && (r.image.width !== t || r.image.height !== n) && (r.image.width = t, r.image.height = n, r.needsUpdate = !0)
        }
        dispose() {
            this.#e?.dispose(), this.#t?.dispose(), this.#e = null, this.#t = null
        }
        #a() {
            let e = new D(this.#n, this.#r, {
                type: v,
                depthBuffer: !0,
                stencilBuffer: !1,
                minFilter: g,
                magFilter: g
            });
            return e.depthTexture = new w(this.#n, this.#r), e.depthTexture.type = _, e
        }
    },
    L = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,
    R = {
        vertexShader: L,
        depthTest: !1,
        depthWrite: !1
    },
    z = `
  bool currentCloser = false;
  if (uFullyEntered > 0.5) {
    float depthCurrent = texture2D(tCurrentDepth, vUv).r;
    float depthIncoming = texture2D(tIncomingDepth, vUv).r;
    currentCloser = depthCurrent < depthIncoming;
  }
`;

function _e() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            tCurrentDepth: {
                value: null
            },
            tIncomingDepth: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uDirection: {
                value: new b(0, -1)
            },
            uFullyEntered: {
                value: 0
            },
            uViewportBottomVUv: {
                value: 0
            },
            uScrollBendVUv: {
                value: 0
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform vec2 uDirection;
      uniform float uFullyEntered;
      uniform float uViewportBottomVUv;
      uniform float uScrollBendVUv;
      varying vec2 vUv;

      // Match knockoutShader's scrollBendY exactly: same arch shape, same
      // detuned-π pair, so the cut edge tracks the knockout cover edges.
      float scrollBendY(float x) {
        float t = clamp(x, 0.0, 1.0);
        float arch = sin(t * 3.14159265);
        return (arch + sin(t * 3.1431853) * 2.0) * uScrollBendVUv;
      }

      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${z}
        // Guard normalize(vec2(0,0)) — undefined in GLSL.
        vec2 dir = length(uDirection) > 0.0001
          ? normalize(uDirection)
          : vec2(0.0, -1.0);
        float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
        // Remap vUv.y into the visible viewport span so the cut tracks
        // window.innerHeight, not the taller canvas (window.outerHeight).
        vec2 visibleVUv = vec2(
          vUv.x,
          (vUv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
        );
        vec2 bentVisibleVUv = vec2(
          visibleVUv.x,
          visibleVUv.y - scrollBendY(visibleVUv.x)
        );
        float norm = dot(bentVisibleVUv - 0.5, dir) / scale;
        // Cut traverses the viewport linearly with progress so it tracks the
        // knockout cover bottom edge (which moves linearly with scroll). A
        // bend-amplitude factor on edgeTravel would speed the cut up vs the
        // cover at non-midpoint progress and they only align where the
        // formula collapses (progress=0.5). Any bleed near viewport corners
        // at peak velocity is hidden by the knockout cover drawn on top.
        float edge = 1.0 - 2.0 * uProgress;
        // Narrow smoothstep band (~1 fragment at innerHeight = 800) so
        // diagonal directions or arched cuts don't stair-step inside any
        // cover-free region. Fixed band keeps this portable without the
        // derivative extension.
        float mask = smoothstep(edge - 0.003, edge + 0.003, norm);
        vec4 mixed = mix(current, incoming, mask);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `
    })
}

function B() {
    return new x({
        ...R,
        uniforms: {
            tInput: {
                value: null
            }
        },
        fragmentShader: `
      uniform sampler2D tInput;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(tInput, vUv);
      }
    `
    })
}

function V() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            tCurrentDepth: {
                value: null
            },
            tIncomingDepth: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uFullyEntered: {
                value: 0
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform float uFullyEntered;
      varying vec2 vUv;
      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${z}
        vec4 mixed = mix(current, incoming, uProgress);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `
    })
}

function H() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            tCurrentDepth: {
                value: null
            },
            tIncomingDepth: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uFullyEntered: {
                value: 0
            },
            uReducedMotion: {
                value: 0
            },
            uTime: {
                value: 0
            },
            uScrollProgress: {
                value: 0
            },
            uScrollBendVUv: {
                value: 0
            },
            uAspect: {
                value: 1
            },
            uCenter: {
                value: new b(.5, .5)
            },
            uNoiseStrength: {
                value: .2
            },
            uMudStrength: {
                value: .35
            },
            uEdgeStrength: {
                value: 1
            },
            uGlowStrength: {
                value: 1
            },
            uZoomStrength: {
                value: .1
            },
            uTextureScale: {
                value: 1
            },
            uDistance: {
                value: 1
            },
            uMode: {
                value: 0
            },
            uAngle: {
                value: 0
            },
            uSpread: {
                value: 1.2
            },
            uBend: {
                value: 0
            },
            uWipeSharpness: {
                value: 2
            },
            uWipeWaveAmp: {
                value: .4
            },
            uWipeWaveFreq: {
                value: 0
            },
            uWipeWaveSpeed: {
                value: 2
            },
            uWipeWaveScroll: {
                value: 1
            },
            uWipeScrollBend: {
                value: 0
            },
            uWipeDistort: {
                value: new b(.5, 1)
            },
            uWipeTranslate: {
                value: new b(-.2, .5)
            },
            uWipeSwayAmp: {
                value: .2
            },
            uWipeSwayFreq: {
                value: -.5
            },
            uWipeSwaySpeed: {
                value: 1
            },
            uWipeSwayWhole: {
                value: .5
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform float uFullyEntered;
      uniform float uReducedMotion;
      uniform float uTime;
      uniform float uScrollProgress;
      uniform float uScrollBendVUv;
      uniform float uAspect;
      uniform vec2 uCenter;
      uniform float uNoiseStrength;
      uniform float uMudStrength;
      uniform float uEdgeStrength;
      uniform float uGlowStrength;
      uniform float uZoomStrength;
      uniform float uTextureScale;
      uniform float uDistance;
      uniform float uMode;
      uniform float uAngle;
      uniform float uSpread;
      uniform float uBend;
      uniform float uWipeSharpness;
      uniform float uWipeWaveAmp;
      uniform float uWipeWaveFreq;
      uniform float uWipeWaveSpeed;
      uniform float uWipeWaveScroll;
      uniform float uWipeScrollBend;
      uniform vec2 uWipeDistort;
      uniform vec2 uWipeTranslate;
      uniform float uWipeSwayAmp;
      uniform float uWipeSwayFreq;
      uniform float uWipeSwaySpeed;
      uniform float uWipeSwayWhole;
      varying vec2 vUv;

      const float PI = 3.14159265;
      const float TWO_PI = 6.28318530;

      float tri(float t) {
        return 1.0 - abs(2.0 * t - 1.0);
      }

      float sineInOut(float t) {
        return -0.5 * (cos(PI * t) - 1.0);
      }

      vec2 rotate2d(vec2 v, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
      }

      float scrollBendYUv(float x) {
        float t = clamp(x, 0.0, 1.0);
        return sin(t * PI) * 3.0 * uScrollBendVUv * uWipeScrollBend;
      }

      void main() {
        float progress = clamp(uProgress, 0.0, 1.0);
        ${z}

        if (progress <= 0.0) {
          gl_FragColor = texture2D(tCurrent, vUv);
          return;
        }
        if (progress >= 1.0 && uDistance >= 0.999) {
          gl_FragColor = currentCloser
            ? texture2D(tCurrent, vUv)
            : texture2D(tIncoming, vUv);
          return;
        }

        float time2pi = uTime * TWO_PI;
        vec2 center = clamp(uCenter, vec2(0.0), vec2(1.0));
        vec2 dv = (vUv - center) * vec2(uAspect, 1.0);
        float radial = length(dv);
        vec2 farCorner = max(center, 1.0 - center) * vec2(uAspect, 1.0);
        float maxDist = length(farCorner);
        float feather = max(0.02, 0.08 * uSpread);
        float radialDistance = max(uDistance, 0.0);
        float radialEdge = progress * (maxDist * radialDistance + feather * 2.0) - feather;
        float radialTransition = 1.0 - smoothstep(
          radialEdge - feather,
          radialEdge + feather,
          radial
        );

        vec2 direction = vec2(cos(uAngle), sin(uAngle));
        vec2 tangent = vec2(-direction.y, direction.x);
        vec2 radialDirection = radial > 0.0001
          ? normalize(vec2(dv.x / max(uAspect, 0.001), dv.y))
          : direction;

        float pixelTransition = radialTransition;
        vec2 uv1 = vUv;
        vec2 uv2 = vUv;

        if (uMode > 0.5) {
          // y11i study-005 preset 1 values are exposed in Theatre under
          // Wipe settings: https://y11i-3d.github.io/study-005/
          // Sharpness/frequencies use y11i's 2 ** value scale.
          float wipeSharpness = pow(2.0, uWipeSharpness);
          vec2 wipeDirection = normalize(vec2(sin(uAngle), cos(uAngle)));
          vec2 wipeUv = rotate2d(vUv * vec2(uAspect, 1.0), uAngle);
          float wipeWave = sin(
            wipeUv.x / max(uAspect, 0.001) * TWO_PI * pow(2.0, uWipeWaveFreq) +
            time2pi * uWipeWaveSpeed +
            uScrollProgress * TWO_PI * uWipeWaveScroll
          ) * uWipeWaveAmp * tri(progress);
          float wipeExtent = abs(wipeDirection.x) * 0.5 + abs(wipeDirection.y) * 0.5;
          // Subtract in UV space to match knockout's top-left pixel bend convention.
          vec2 bentWipeUv = vec2(vUv.x, vUv.y - scrollBendYUv(vUv.x));
          float wipePosition = dot(bentWipeUv - 0.5, wipeDirection) / max(wipeExtent * 2.0, 0.001) + 0.5;
          float wipeFeather = 0.5 / max(wipeSharpness, 0.001);
          float wipeEdge = mix(-wipeFeather, 1.0 + wipeFeather, progress) + wipeWave;
          pixelTransition = 1.0 - smoothstep(
            wipeEdge - wipeFeather,
            wipeEdge + wipeFeather,
            wipePosition
          );

          vec2 translate = uWipeTranslate;
          vec2 distort = uWipeDistort;
          vec2 translate1 = translate * progress;
          vec2 translate2 = translate * (progress - 1.0);
          vec2 distort1 = translate * pixelTransition * distort;
          vec2 distort2 = translate * (pixelTransition - 1.0) * distort;
          float sway = sin(
            time2pi * uWipeSwaySpeed +
            vUv.x * TWO_PI * pow(2.0, uWipeSwayFreq)
          ) * uWipeSwayAmp;
          float swayBlend = mix(
            tri(pixelTransition),
            tri(progress),
            uWipeSwayWhole
          );
          sway *= sineInOut(swayBlend);
          vec2 bend = radialDirection * uBend * tri(pixelTransition) * sineInOut(tri(progress)) * 0.18;
          vec2 displacement1 = translate1 + distort1 + vec2(0.0, sway) + bend;
          vec2 displacement2 = translate2 + distort2 + vec2(0.0, sway) + bend;
          float topFade = 1.0 - smoothstep(0.72, 0.98, vUv.y);
          displacement1 *= mix(1.0, topFade, step(0.0, displacement1.y));
          displacement2 *= mix(1.0, topFade, step(0.0, displacement2.y));
          uv1 = vUv + displacement1;
          uv2 = vUv + displacement2;
        } else {
          float seamMask = tri(pixelTransition);
          vec2 translate = direction * clamp(uZoomStrength * 4.0, 0.0, 2.0) * 0.25;
          vec2 distort = vec2(1.0, 2.5) * max(uMudStrength, 0.0);

          vec2 translate1 = translate * progress * seamMask;
          vec2 translate2 = translate * (progress - 1.0) * seamMask;
          vec2 distort1 = translate * (pixelTransition * distort) * seamMask;
          vec2 distort2 = translate * ((pixelTransition - 1.0) * distort) * seamMask;

          float angleNoise = dot(vUv - center, tangent) * TWO_PI * max(uTextureScale, 0.001);
          float swayBase = sin(time2pi + angleNoise) * uNoiseStrength;
          float swayBlend = mix(tri(pixelTransition), tri(progress), 0.5);
          vec2 sway = tangent * swayBase * sineInOut(swayBlend) * seamMask;
          vec2 bend = radialDirection * uBend * seamMask * sineInOut(tri(progress)) * 0.18;
          uv1 = vUv + translate1 + distort1 + sway + bend;
          uv2 = vUv + translate2 + distort2 + sway + bend;
        }
        // Reduced motion: skip the scene-texture displacement (translate /
        // distort / sway / bend) so neither scene slides up or sideways as the
        // swipe passes — only the wipe boundary reveals. (Zoom enters via
        // translate/uZoomStrength, so resetting the UVs neutralizes it too.)
        if (uReducedMotion > 0.5) {
          uv1 = vUv;
          uv2 = vUv;
        }
        vec4 current = texture2D(tCurrent, uv1);
        vec4 incoming = texture2D(tIncoming, uv2);
        vec4 mixed = mix(current, incoming, pixelTransition);

        float edge = tri(pixelTransition);
        mixed = mix(mixed, vec4(vec3(1.0), 1.0), edge * uEdgeStrength * 0.18);
        mixed = mix(mixed, mixed * mix(1.0, 2.5, edge), edge * uGlowStrength * 0.35);

        gl_FragColor = currentCloser ? texture2D(tCurrent, vUv) : mixed;
      }
    `
    })
}

function U() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uOrigin: {
                value: new b(.5, .5)
            },
            uSoftness: {
                value: .25
            },
            uEdgeGlow: {
                value: .4
            },
            uZoom: {
                value: .08
            },
            uAspect: {
                value: 1
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform float uProgress;
      uniform vec2 uOrigin;
      uniform float uSoftness;
      uniform float uEdgeGlow;
      uniform float uZoom;
      uniform float uAspect;
      varying vec2 vUv;

      // Aspect-correct distance so the iris is circular on non-square canvases.
      float aspectDist(vec2 uv) {
        return length((uv - uOrigin) * vec2(uAspect, 1.0));
      }

      void main() {
        // Normalise distance so the farthest corner from the origin maps to 1,
        // guaranteeing the iris fully clears the screen at progress 1.
        float maxDist = max(
          max(aspectDist(vec2(0.0, 0.0)), aspectDist(vec2(1.0, 0.0))),
          max(aspectDist(vec2(0.0, 1.0)), aspectDist(vec2(1.0, 1.0)))
        );
        float nd = aspectDist(vUv) / max(maxDist, 0.0001);

        float softness = max(uSoftness, 0.0001);
        // Travel the front past 1 by softness on each end so the feather
        // band fully clears at progress 0 and 1 (no residual ring).
        float radius = uProgress * (1.0 + 2.0 * softness) - softness;
        float mask = 1.0 - smoothstep(radius - softness, radius + softness, nd);

        // Incoming zooms from (1 - uZoom) toward 1 as it reveals, scaling about
        // the origin so the reveal feels like it pushes forward.
        float scale = mix(1.0 - uZoom, 1.0, uProgress);
        vec2 zoomUv = uOrigin + (vUv - uOrigin) / max(scale, 0.0001);
        vec4 incoming = texture2D(tIncoming, zoomUv);
        vec4 current = texture2D(tCurrent, vUv);
        vec4 mixed = mix(current, incoming, mask);

        // Luminous leading edge on the reveal front; naturally vanishes at the
        // extremes where the front sits off-screen.
        float edge = 1.0 - smoothstep(0.0, softness, abs(nd - radius));
        mixed.rgb += edge * uEdgeGlow * mask;

        gl_FragColor = mixed;
      }
    `
    })
}

function W() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            tCurrentDepth: {
                value: null
            },
            tIncomingDepth: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uDirection: {
                value: new b(1, 0)
            },
            uFeather: {
                value: 0
            },
            uFullyEntered: {
                value: 0
            },
            uViewportBottomVUv: {
                value: 0
            },
            uNoiseAmount: {
                value: 0
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform vec2 uDirection;
      uniform float uFeather;
      uniform float uFullyEntered;
      uniform float uViewportBottomVUv;
      uniform float uNoiseAmount;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += noise(p) * amplitude;
          p = p * 2.03 + 17.13;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${z}
        // Guard normalize(vec2(0,0)) — undefined in GLSL.
        vec2 dir = length(uDirection) > 0.0001
          ? normalize(uDirection)
          : vec2(1.0, 0.0);
        float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
        // Remap vUv.y into the visible viewport span so the wipe edge tracks
        // window.innerHeight, not the taller canvas (window.outerHeight).
        vec2 visibleVUv = vec2(
          vUv.x,
          (vUv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
        );
        float norm = dot(visibleVUv - 0.5, dir) / scale;
        // Extend edge travel by feather on each side so the feather band
        // clears [-1, 1] at both extremes — otherwise a non-zero feather
        // leaves a seam of the opposite scene at progress 0 and 1.
        float feather = max(uFeather, 0.0001);
        // Skip the 16-hash fbm walk when the dissolve is disabled.
        float transitionNoise = uNoiseAmount > 0.0
          ? (fbm(visibleVUv * vec2(3.5, 5.5) + uProgress * 1.7) - 0.5) * uNoiseAmount
          : 0.0;
        // Include uNoiseAmount in edgeTravel so transitionNoise can't pull the
        // wipe back on-screen at progress 0/1 (where the noise is signed and
        // the mask would otherwise reveal a sliver of the wrong scene).
        float edgeTravel = 1.0 + feather + uNoiseAmount;
        float edge = edgeTravel * (1.0 - 2.0 * uProgress) + transitionNoise;
        float mask = smoothstep(edge - feather, edge + feather, norm);
        vec4 mixed = mix(current, incoming, mask);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `
    })
}

function ve() {
    return new x({
        ...R,
        uniforms: {
            tCurrent: {
                value: null
            },
            tIncoming: {
                value: null
            },
            uProgress: {
                value: 0
            },
            uStrength: {
                value: 1
            }
        },
        fragmentShader: `
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform float uProgress;
      uniform float uStrength;
      varying vec2 vUv;

      vec4 softSample(sampler2D tex, vec2 uv) {
        vec4 c = texture2D(tex, clamp(uv, 0.0, 1.0));
        vec2 outside = max(vec2(0.0), max(vec2(0.0) - uv, uv - vec2(1.0)));
        float d = length(outside);
        float mask = 1.0 - smoothstep(0.0, 0.03, d);
        c.rgb *= mask;
        c.a *= mask;
        return c;
      }

      float random(vec3 scale, float seed) {
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
      }

      vec4 zoomSample(sampler2D tex, vec2 uv, vec2 center, float scale, float blur) {
        vec2 scaledUv = (uv - center) / scale + center;
        if (blur < 0.001) {
          return softSample(tex, scaledUv);
        }
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 toCenter = center - scaledUv;
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        const float SAMPLES = 15.0;
        for (float t = 0.0; t < SAMPLES; t++) {
          float percent = (t + offset) / SAMPLES;
          float weight = 4.0 * (percent - percent * percent);
          vec2 sampleUv = scaledUv + toCenter * percent * blur;
          color += softSample(tex, sampleUv) * weight;
          total += weight;
        }
        return color / total;
      }

      void main() {
        float p = uProgress;
        vec2 center = vec2(0.5, 0.5);

        float currentScale = mix(1.0, 1.0 + 2.0 * uStrength, p);
        float currentBlur = mix(0.0, 0.6 * uStrength, p);
        float nextBlur = mix(0.3 * uStrength, 0.0, p);

        vec4 currentCol = zoomSample(tCurrent, vUv, center, currentScale, currentBlur);
        vec4 nextCol = zoomSample(tIncoming, vUv, center, 1.0, nextBlur);

        float fade = smoothstep(0.55, 1.0, p);
        gl_FragColor = mix(currentCol, nextCol, fade);
      }
    `
    })
}
var ye = class extends pe {
        mainScenes = [];
        transitioningSection = null;
        transitioningCamera = null;
        #e;
        #t = 0;
        #n = 0;
        #r = 0;
        #i = 0;
        #a;
        #o = new S(-1, 1, 1, -1, 0, 1);
        #s = B();
        #c = V();
        #l = H();
        #u = W();
        #d = _e();
        #f = ve();
        #p = U();
        #m = new E(new T(2, 2), this.#s);
        #h = null;
        #g = null;
        constructor(e, t) {
            let n = new C;
            super(n, e), this.#a = n, this.#e = t, this.#a.add(this.#m)
        }
        setSize(e, t) {
            super.setSize(e, t), this.#e.setSize(e, t)
        }
        knockoutLayerTargets() {
            return {
                current: this.#h,
                incoming: this.#g
            }
        }
        render(e, t) {
            let {
                mainScenes: n,
                transitioningSection: r
            } = this;
            r?.mode !== `hero` && this.#v();
            let a = e.autoClear;
            e.autoClear = !1;
            let o = this.#e.current();
            this.#h = o, this.#g = null, e.setRenderTarget(o), e.setClearColor(8421504, 1), e.clear();
            for (let t of n) e.render(t, this.camera);
            let s;
            if (r) {
                let t = this.#e.incoming();
                if (this.#g = t, e.setRenderTarget(t), e.setClearColor(8421504, 1), e.clear(), e.render(r.scene, this.transitioningCamera ?? this.camera), r.mode === `zoomBlur`) s = this.#f, s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.uProgress.value = r.progress, s.uniforms.uStrength.value = r.zoomBlurStrength;
                else if (r.mode === `crossfade`) s = this.#c, s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.tCurrentDepth.value = o.depthTexture, s.uniforms.tIncomingDepth.value = t.depthTexture, s.uniforms.uProgress.value = r.progress, s.uniforms.uFullyEntered.value = +(!r.disableDepthMerge && r.progress >= 1);
                else if (r.mode === `hero`) {
                    let n = r.hero;
                    s = this.#l, s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.tCurrentDepth.value = o.depthTexture, s.uniforms.tIncomingDepth.value = t.depthTexture, s.uniforms.uProgress.value = r.progress, s.uniforms.uFullyEntered.value = +(!r.disableDepthMerge && r.progress >= 1), s.uniforms.uTime.value = performance.now() / 1e3 % 1e3;
                    let a = i.getState().preferReducedMotion;
                    s.uniforms.uReducedMotion.value = +!!a, s.uniforms.uScrollProgress.value = a ? 0 : this.#y(r.scrollProgress, n.wipe.waveScrollLerp), s.uniforms.uScrollBendVUv.value = a ? 0 : this.#b(this.#x(), n.wipe.scrollBendLerp), s.uniforms.uAspect.value = e.domElement.clientWidth / Math.max(e.domElement.clientHeight, 1), s.uniforms.uCenter.value.set(n.center.x, n.center.y), s.uniforms.uNoiseStrength.value = n.noiseStrength, s.uniforms.uMudStrength.value = n.textureStrength, s.uniforms.uEdgeStrength.value = n.outlineStrength, s.uniforms.uGlowStrength.value = n.glowStrength, s.uniforms.uZoomStrength.value = n.zoomStrength, s.uniforms.uTextureScale.value = n.textureScale, s.uniforms.uDistance.value = n.distance, s.uniforms.uMode.value = +(n.mode === `wipe`), s.uniforms.uAngle.value = n.angleDeg * Math.PI / 180, s.uniforms.uSpread.value = n.spread, s.uniforms.uBend.value = n.bend, s.uniforms.uWipeSharpness.value = n.wipe.sharpness, s.uniforms.uWipeWaveAmp.value = n.wipe.waveAmp, s.uniforms.uWipeWaveFreq.value = n.wipe.waveFreq, s.uniforms.uWipeWaveSpeed.value = n.wipe.waveSpeed, s.uniforms.uWipeWaveScroll.value = n.wipe.waveScroll, s.uniforms.uWipeScrollBend.value = n.wipe.scrollBend, s.uniforms.uWipeDistort.value.set(n.wipe.distort.x, n.wipe.distort.y), s.uniforms.uWipeTranslate.value.set(n.wipe.translate.x, n.wipe.translate.y), s.uniforms.uWipeSwayAmp.value = n.wipe.swayAmp, s.uniforms.uWipeSwayFreq.value = n.wipe.swayFreq, s.uniforms.uWipeSwaySpeed.value = n.wipe.swaySpeed, s.uniforms.uWipeSwayWhole.value = n.wipe.swayWhole
                } else if (r.mode === `reveal`) {
                    let n = r.reveal;
                    s = this.#p, s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.uProgress.value = r.progress, s.uniforms.uOrigin.value.set(n.origin.x, n.origin.y), s.uniforms.uSoftness.value = n.softness, s.uniforms.uEdgeGlow.value = n.edgeGlow, s.uniforms.uZoom.value = n.zoom, s.uniforms.uAspect.value = e.domElement.clientWidth / Math.max(e.domElement.clientHeight, 1)
                } else r.mode === `bend` ? (s = this.#d, s.uniforms.uDirection.value.set(r.bendDirection.x, r.bendDirection.y), s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.tCurrentDepth.value = o.depthTexture, s.uniforms.tIncomingDepth.value = t.depthTexture, s.uniforms.uProgress.value = r.progress, s.uniforms.uFullyEntered.value = +(!r.disableDepthMerge && r.progress >= 1), s.uniforms.uViewportBottomVUv.value = this.#_(e, o.height), s.uniforms.uScrollBendVUv.value = i.getState().preferReducedMotion ? 0 : this.#x()) : (s = this.#u, s.uniforms.uDirection.value.set(r.swipeDirection.x, r.swipeDirection.y), s.uniforms.uFeather.value = r.swipeFeather, s.uniforms.uNoiseAmount.value = r.swipeNoiseAmount, s.uniforms.tCurrent.value = o.texture, s.uniforms.tIncoming.value = t.texture, s.uniforms.tCurrentDepth.value = o.depthTexture, s.uniforms.tIncomingDepth.value = t.depthTexture, s.uniforms.uProgress.value = r.progress, s.uniforms.uFullyEntered.value = +(!r.disableDepthMerge && r.progress >= 1), s.uniforms.uViewportBottomVUv.value = this.#_(e, o.height))
            } else s = this.#s, s.uniforms.tInput.value = o.texture;
            this.#m.material = s, e.setRenderTarget(this.renderToScreen ? null : t), e.render(this.#a, this.#o), e.autoClear = a
        }
        #_(e, t) {
            return Math.max(0, 1 - window.innerHeight * e.getPixelRatio() / t)
        }
        #v() {
            this.#t = 0, this.#n = 0, this.#r = 0, this.#i = 0
        }
        #y(e, t) {
            let n = performance.now();
            if (this.#i === 0) return this.#i = n, this.#r = e, this.#r;
            let r = Math.min((n - this.#i) / 1e3, 1 / 30);
            this.#i = n;
            let i = 1 - Math.exp(-r * Math.max(t, .001));
            return this.#r += (e - this.#r) * i, this.#r
        }
        #b(e, t) {
            let n = performance.now();
            if (this.#n === 0) return this.#n = n, this.#t = 0, this.#t;
            let r = Math.min((n - this.#n) / 1e3, 1 / 30);
            this.#n = n;
            let i = 1 - Math.exp(-r * Math.max(t, .001));
            return this.#t += (e - this.#t) * i, this.#t
        }
        #x() {
            let e = window.innerHeight;
            return e > 0 ? u() / e : 0
        }
        dispose() {
            this.#s.uniforms.tInput.value = null, this.#c.uniforms.tCurrent.value = null, this.#c.uniforms.tIncoming.value = null, this.#c.uniforms.tCurrentDepth.value = null, this.#c.uniforms.tIncomingDepth.value = null, this.#l.uniforms.tCurrent.value = null, this.#l.uniforms.tIncoming.value = null, this.#l.uniforms.tCurrentDepth.value = null, this.#l.uniforms.tIncomingDepth.value = null, this.#u.uniforms.tCurrent.value = null, this.#u.uniforms.tIncoming.value = null, this.#u.uniforms.tCurrentDepth.value = null, this.#u.uniforms.tIncomingDepth.value = null, this.#d.uniforms.tCurrent.value = null, this.#d.uniforms.tIncoming.value = null, this.#d.uniforms.tCurrentDepth.value = null, this.#d.uniforms.tIncomingDepth.value = null, this.#f.uniforms.tCurrent.value = null, this.#f.uniforms.tIncoming.value = null, this.#p.uniforms.tCurrent.value = null, this.#p.uniforms.tIncoming.value = null, this.#s.dispose(), this.#c.dispose(), this.#l.dispose(), this.#u.dispose(), this.#d.dispose(), this.#f.dispose(), this.#p.dispose(), this.#m.geometry.dispose(), super.dispose()
        }
    },
    be = {
        w100: `#ffffff`,
        w90: `rgba(255, 255, 255, 0.90)`,
        w80: `rgba(255, 255, 255, 0.80)`,
        w70: `rgba(255, 255, 255, 0.70)`,
        w60: `rgba(255, 255, 255, 0.60)`,
        w40: `rgba(255, 255, 255, 0.40)`,
        w20: `rgba(255, 255, 255, 0.20)`,
        w10: `rgba(255, 255, 255, 0.10)`,
        w5: `rgba(255, 255, 255, 0.05)`,
        b100: `#090909`,
        b90: `rgba(9, 9, 9, 0.90)`,
        b80: `rgba(9, 9, 9, 0.80)`,
        b70: `rgba(9, 9, 9, 0.70)`,
        b60: `rgba(9, 9, 9, 0.60)`,
        b40: `rgba(9, 9, 9, 0.40)`,
        b20: `rgba(9, 9, 9, 0.20)`,
        b10: `rgba(9, 9, 9, 0.10)`,
        b5: `rgba(9, 9, 9, 0.05)`,
        "theme-heading": `var(--color-theme-heading)`,
        "theme-body": `var(--color-theme-body)`,
        "theme-link": `var(--color-theme-link)`,
        "theme-link-hover": `var(--color-theme-link-hover)`,
        "theme-focus-ring": `var(--color-theme-focus-ring)`,
        "theme-cta-bg": `var(--color-theme-cta-bg)`,
        "theme-cta-text": `var(--color-theme-cta-text)`,
        "theme-cta-bg-hover": `var(--color-theme-cta-bg-hover)`,
        "theme-cta-bg-pressed": `var(--color-theme-cta-bg-pressed)`,
        "theme-cta-bg-disabled": `var(--color-theme-cta-bg-disabled)`,
        "theme-cta-text-disabled": `var(--color-theme-cta-text-disabled)`,
        "theme-cta-focus-ring": `var(--color-theme-cta-focus-ring)`,
        "theme-error": `var(--color-theme-error)`
    },
    G = 1,
    K = 4,
    xe = `
  precision highp float;

  uniform sampler2D tInput;
  uniform vec2 uViewport;
  uniform float uUseBaseLayer;
  uniform float uUseCutouts;
  uniform int uCoverCount;
  uniform vec4 uCovers[8];
  uniform float uCoverPinBottom[8];
  uniform float uCoverPinTop[8];
  uniform int uCutoutCount;
  uniform vec4 uCutouts[32];
  uniform float uUseTransition;
  uniform float uInvertTransition;
  uniform float uTransitionProgress;
  uniform vec2 uTransitionDirection;
  uniform float uViewportBottomVUv;
  uniform float uScrollBendPx;
  uniform float uScrollBendVUv;
  varying vec2 vUv;

  float roundedRectSdf(vec2 p, vec4 rect, float radius) {
    vec2 halfSize = rect.zw * 0.5;
    vec2 center = rect.xy + halfSize;
    float r = min(radius, min(halfSize.x, halfSize.y));
    vec2 q = abs(p - center) - halfSize + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  // Negative inside / positive outside SDF → feathered [0,1] coverage with a
  // ~2px anti-aliased band (matches the legacy overlay's smoothstep edge).
  float sdfMask(float sd) {
    return 1.0 - smoothstep(-1.0, 1.0, sd);
  }

  float scrollBendArch(float t) {
    float arch = sin(t * 3.14159265);
    return arch + sin(t * 3.1431853) * 2.0;
  }

  float scrollBendUv(float x) {
    return scrollBendArch(clamp(x, 0.0, 1.0)) * uScrollBendVUv;
  }

  float scrollBendPx(float px) {
    float t = clamp(px / max(uViewport.x, 1.0), 0.0, 1.0);
    return scrollBendArch(t) * uScrollBendPx;
  }

  float pinBottomRectSdf(vec2 p, vec4 rect) {
    float topD = (rect.y - scrollBendPx(p.x)) - p.y;
    float bottomD = p.y - (rect.y + rect.w);
    float leftD = rect.x - p.x;
    float rightD = p.x - (rect.x + rect.z);
    return max(max(topD, bottomD), max(leftD, rightD));
  }

  float pinTopRectMask(vec2 p, vec4 rect) {
    // Retail POS hides the leading bend; keep that top edge un-feathered so
    // the unused AA fringe cannot show as a full-width hairline.
    float bottomD = (p.y + scrollBendPx(p.x)) - (rect.y + rect.w);
    float leftD = rect.x - p.x;
    float rightD = p.x - (rect.x + rect.z);
    return step(rect.y, p.y) * sdfMask(max(bottomD, max(leftD, rightD)));
  }

  float coverMask(vec2 p, vec4 rect, float pinBottom, float pinTop) {
    vec2 bentP = vec2(p.x, p.y + scrollBendPx(p.x));
    return pinBottom > 0.5
      ? sdfMask(pinBottomRectSdf(p, rect))
      : pinTop > 0.5
        ? pinTopRectMask(p, rect)
        : sdfMask(roundedRectSdf(bentP, rect, 0.0));
  }

  // Feathered [0,1] coverage for the incoming side of a bend (1 on the
  // revealed side, 0 on the other). fwidth gives a resolution-correct ~1px
  // edge so the bend seam is anti-aliased too.
  float incomingTransitionCoverage(vec2 uv) {
    vec2 dir = length(uTransitionDirection) > 0.0001
      ? normalize(uTransitionDirection)
      : vec2(0.0, -1.0);
    float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
    vec2 visibleVUv = vec2(
      uv.x,
      (uv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
    );
    vec2 bentVisibleVUv = vec2(
      visibleVUv.x,
      visibleVUv.y - scrollBendUv(visibleVUv.x)
    );
    float norm = dot(bentVisibleVUv - 0.5, dir) / scale;
    float edge = 1.0 - 2.0 * uTransitionProgress;
    float feather = max(fwidth(norm), 1e-4);
    return smoothstep(edge - feather, edge + feather, norm);
  }

  void main() {
    vec2 p = vec2(vUv.x * uViewport.x, (1.0 - vUv.y) * uViewport.y);

    float coverage = 0.0;
    if (uUseBaseLayer > 0.5) {
      float covered = 0.0;
      for (int i = 0; i < 8; i++) {
        if (i >= uCoverCount) break;
        covered = max(
          covered,
          coverMask(p, uCovers[i], uCoverPinBottom[i], uCoverPinTop[i])
        );
      }
      coverage = 1.0 - covered;
    }

    if (uUseCutouts > 0.5) {
      float cut = 0.0;
      for (int i = 0; i < 32; i++) {
        if (i >= uCutoutCount) break;
        cut = max(cut, sdfMask(roundedRectSdf(p, uCutouts[i], 0.0)));
      }
      coverage = max(coverage, cut);
    }

    if (uUseTransition > 0.5) {
      float t = incomingTransitionCoverage(vUv);
      coverage *= uInvertTransition > 0.5 ? 1.0 - t : t;
    }

    if (coverage <= 0.0) discard;

    gl_FragColor = vec4(texture2D(tInput, vUv).rgb, coverage);
    #include <colorspace_fragment>
  }
`;

function Se() {
    return new x({
        vertexShader: L,
        fragmentShader: xe,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
        uniforms: {
            tInput: {
                value: null
            },
            uViewport: {
                value: new b(1, 1)
            },
            uUseBaseLayer: {
                value: 1
            },
            uUseCutouts: {
                value: 0
            },
            uCoverCount: {
                value: 0
            },
            uCovers: {
                value: new Float32Array(32)
            },
            uCoverPinBottom: {
                value: new Float32Array(8)
            },
            uCoverPinTop: {
                value: new Float32Array(8)
            },
            uCutoutCount: {
                value: 0
            },
            uCutouts: {
                value: new Float32Array(128)
            },
            uUseTransition: {
                value: 0
            },
            uInvertTransition: {
                value: 0
            },
            uTransitionProgress: {
                value: 1
            },
            uTransitionDirection: {
                value: new b(0, -1)
            },
            uViewportBottomVUv: {
                value: 0
            },
            uScrollBendPx: {
                value: 0
            },
            uScrollBendVUv: {
                value: 0
            }
        }
    })
}
var Ce = class extends P {
        #e = new C;
        #t = new S(-1, 1, 1, -1, 0, 1);
        #n = Se();
        #r = new E(new T(2, 2), this.#n);
        #i = null;
        #a = null;
        #o = 1;
        #s = 1;
        constructor() {
            super(`LayerKnockoutPass`), this.needsSwap = !1, this.#e.add(this.#r)
        }
        setTransitionState(e) {
            this.#i = e
        }
        setLayerSourceProvider(e) {
            this.#a = e
        }
        setViewportSize(e, t) {
            this.#o = Math.max(1, e), this.#s = Math.max(1, t), this.#n.uniforms.uViewport.value.set(this.#o, this.#s)
        }
        setSize() {}
        render(e, t) {
            e.setRenderTarget(this.renderToScreen ? null : t), e.setClearColor(be.b100, 1), e.clear(!0, !0, !1);
            let n = this.#l(),
                r = this.#c(n);
            if (r.length === 0) return;
            let i = u();
            this.#d(this.#u(i)), this.#f(n), this.#n.uniforms.uViewportBottomVUv.value = this.#h(e), this.#n.uniforms.uScrollBendPx.value = i, this.#n.uniforms.uScrollBendVUv.value = this.#g(i);
            let a = this.#a?.() ?? null;
            for (let n of r) {
                let r = this.#m(n.sourceLayer, t, a);
                r && (this.#p(n), this.#n.uniforms.tInput.value = r.texture, e.render(this.#e, this.#t))
            }
        }
        #c(e) {
            let t = this.#i;
            if (!t) return [];
            let n = e.length > 0,
                r = [],
                i = t.incomingIndex !== null && t.mode === `bend`,
                a = ({
                    sourceLayer: e,
                    useTransition: i,
                    invertTransition: a,
                    includeBaseLayer: o = !0
                }) => {
                    !o && !n || r.push({
                        sourceLayer: e,
                        transitionDirection: t.direction,
                        transitionProgress: t.progress,
                        useBaseLayer: o,
                        useCutouts: n,
                        useTransition: i,
                        invertTransition: a
                    })
                };
            return i && t.incomingIndex !== null ? (a({
                sourceLayer: `current`,
                useTransition: !1,
                invertTransition: !1,
                includeBaseLayer: !1
            }), a({
                sourceLayer: `incoming`,
                useTransition: !0,
                invertTransition: !1
            })) : a({
                sourceLayer: `composite`,
                useTransition: !1,
                invertTransition: !1
            }), r
        }
        #l() {
            let e = [],
                t = c(),
                n = s(),
                r = 0;
            for (let [i] of d.cutouts) {
                if (r >= 32) break;
                let o = a(i, t, n) ?? i.getBoundingClientRect();
                if (o.width <= 0 || o.height <= 0) continue;
                let s = o.left + o.width,
                    c = o.top + o.height;
                s < -1 || c < -1 || o.left > this.#o + G || o.top > this.#s + G || (e.push(o), r++)
            }
            return e
        }
        #u(e) {
            let t = [],
                n = c(),
                r = s(),
                i = o(e) + G;
            for (let [e, o] of d.covers) {
                if (t.length >= 8) break;
                if (o.full) {
                    t.push({
                        left: -1,
                        top: -1,
                        width: this.#o + G * 2,
                        height: this.#s + G * 2,
                        pinBottom: !!o.pinBottom,
                        pinTop: !!o.pinTop
                    });
                    continue
                }
                let s = a(e, n, r) ?? e.getBoundingClientRect();
                if (s.width <= 0 || s.height <= 0) continue;
                let c = Math.max(0, s.top - i);
                Math.min(this.#s, s.top + s.height + i) - c < K || t.push({
                    left: -1,
                    top: s.top,
                    width: this.#o + G * 2,
                    height: s.height,
                    pinBottom: !!o.pinBottom,
                    pinTop: !!o.pinTop
                })
            }
            return t
        }
        #d(e) {
            let t = this.#n.uniforms.uCovers.value,
                n = this.#n.uniforms.uCoverPinBottom.value,
                r = this.#n.uniforms.uCoverPinTop.value;
            t.fill(0), n.fill(0), r.fill(0), e.forEach((e, i) => {
                let a = i * 4;
                t[a] = e.left, t[a + 1] = e.top, t[a + 2] = e.width, t[a + 3] = e.height, n[i] = +!!e.pinBottom, r[i] = +!!e.pinTop
            }), this.#n.uniforms.uCoverCount.value = e.length
        }
        #f(e) {
            let t = this.#n.uniforms.uCutouts.value;
            t.fill(0), e.forEach((e, n) => {
                let r = n * 4;
                t[r] = e.left, t[r + 1] = e.top, t[r + 2] = e.width, t[r + 3] = e.height
            }), this.#n.uniforms.uCutoutCount.value = e.length
        }
        #p(e) {
            this.#n.uniforms.uUseBaseLayer.value = +!!e.useBaseLayer, this.#n.uniforms.uUseCutouts.value = +!!e.useCutouts, this.#n.uniforms.uTransitionDirection.value.set(e.transitionDirection.x, e.transitionDirection.y), this.#n.uniforms.uTransitionProgress.value = e.transitionProgress, this.#n.uniforms.uUseTransition.value = +!!e.useTransition, this.#n.uniforms.uInvertTransition.value = +!!e.invertTransition
        }
        #m(e, t, n) {
            return e === `current` ? n?.current ?? t : e === `incoming` ? n?.incoming ?? t ?? n?.current ?? null : t ?? n?.current ?? n?.incoming ?? null
        }
        #h(e) {
            let t = Math.max(1, this.#s * e.getPixelRatio());
            return Math.max(0, 1 - window.innerHeight * e.getPixelRatio() / t)
        }
        #g(e) {
            let t = window.innerHeight;
            return t > 0 ? e / t : 0
        }
        dispose() {
            this.#n.uniforms.tInput.value = null, this.#n.dispose(), this.#r.geometry.dispose(), super.dispose()
        }
    },
    q = n(),
    we = new Set([`bend`, `swipe`, `reveal`]),
    Te = .9999,
    Ee = [],
    De = `sectionRevealDirection`,
    Oe = `stateDrivenSceneOverlay`,
    ke = -.998;

function Ae(e, t) {
    e.setEffects(t), e.recompile()
}

function J(e, t = 0, n = 1, r = 1) {
    let i = p.clamp(1 + e, 0, 1),
        a = p.clamp(t, 0, .9999),
        o = p.clamp(Math.max(n, a + 1e-4), 1e-4, 1);
    return p.clamp((i - a) / (o - a), 0, 1) ** +Math.max(r, 1e-4)
}

function je({
    sections: e,
    onRendererReady: t,
    contentMountedElements: n,
    quality: i,
    onQualityDowngrade: a,
    enableKnockout: o = !0,
    domKnockout: s = !1,
    scenePresets: c = [],
    fpsTrackingEnabled: u = !1
}) {
    let d = i === `low` ? 1 / 30 : 1 / 60,
        g = (0, I.useRef)(0),
        {
            gl: _,
            camera: y,
            size: x
        } = O(),
        S = (0, I.useRef)(null),
        w = (0, I.useRef)(!1);
    (0, I.useEffect)(() => {
        _.setClearColor(8421504, 1)
    }, [_]);
    let T = (0, I.useRef)(performance.now()),
        E = (0, I.useRef)(60),
        D = (0, I.useRef)(!1),
        P = (0, I.useRef)(typeof document < `u` ? document.hasFocus() : !0),
        pe = i === `low` ? 25 : 45;
    (0, I.useEffect)(() => {
        let e = () => {
                P.current = !0, T.current = performance.now()
            },
            t = () => {
                P.current = !1
            };
        return window.addEventListener(`focus`, e), window.addEventListener(`blur`, t), () => {
            window.removeEventListener(`focus`, e), window.removeEventListener(`blur`, t)
        }
    }, []);
    let L = (0, I.useRef)(new Map),
        R = (0, I.useMemo)(() => new Set(e.map(e => e.element)), [e]);
    for (let e of R) L.current.has(e) || L.current.set(e, new C);
    let z = (0, I.useRef)([]),
        _e = (0, I.useMemo)(() => new Map(e.map(e => [e.element, e])), [e]);
    (0, I.useEffect)(() => {
        for (let [e, t] of L.current) R.has(e) || (Be(t), L.current.delete(e));
        z.current = e.map(e => {
            let t = L.current.get(e.element);
            return t ? [e.element, t] : null
        }).filter(e => e !== null)
    }, [e, R]), (0, I.useEffect)(() => {
        let e = L.current;
        return () => {
            for (let t of e.values()) Be(t);
            e.clear()
        }
    }, []);
    let B = (0, I.useRef)(null),
        V = (0, I.useRef)(null),
        H = (0, I.useRef)(null),
        U = (0, I.useRef)(null),
        W = (0, I.useRef)(null),
        ve = he(),
        be = (0, I.useRef)(new b);
    (0, I.useEffect)(() => {
        let e = new me(_, {
                frameBufferType: v
            }),
            t = new ge,
            n = new ye(y, t),
            r = new fe(y, ...F().map(e => e.effect)),
            i = null;
        return e.addPass(n), e.addPass(r), o ? (i = new Ce, i.renderToScreen = !0, i.setViewportSize(x.width, x.height), i.setLayerSourceProvider(() => n.knockoutLayerTargets()), e.addPass(i)) : r.renderToScreen = !0, e.setSize(x.width, x.height), W.current = t, V.current = n, H.current = i, U.current = r, B.current = e, e.render(0), () => {
            B.current?.dispose(), W.current?.dispose(), M(_), de(_), N(_), Ne(), B.current = null, V.current = null, H.current = null, U.current = null, W.current = null
        }
    }, [_, y, o]), (0, I.useEffect)(() => {
        if (ve === 0) return;
        let e = U.current;
        if (!e) return;
        Ae(e, F().map(e => e.effect));
        let t = _.getDrawingBufferSize(be.current);
        e.setSize(t.width, t.height), k()
    }, [_, ve]), (0, I.useEffect)(() => () => le(_), [_]), (0, I.useEffect)(() => {
        B.current && (B.current.setSize(x.width, x.height), H.current?.setViewportSize(x.width, x.height), k())
    }, [x.width, x.height]), (0, I.useEffect)(() => {
        D.current = !1, E.current = 60
    }, [i]);
    let G = (0, I.useRef)(!1),
        K = (0, I.useRef)(new Map),
        xe = (0, I.useRef)(new f),
        Se = (0, I.useRef)(new f),
        je = (0, I.useRef)(new h),
        Y = (0, I.useRef)(new h),
        Me = (0, I.useRef)(new f),
        X = (0, I.useRef)(new m);
    (0, I.useRef)(``), (0, I.useEffect)(() => {
        for (let e of K.current.keys()) R.has(e) || K.current.delete(e)
    }, [R]), (0, I.useEffect)(() => {
        let e = x.width / x.height;
        for (let t of K.current.values()) t.aspect = e, t.updateProjectionMatrix()
    }, [x.width, x.height]);
    let Z = e => {
            let t = L.current.get(e);
            if (!t) return;
            let n = K.current.get(e);
            if (n && n.parent) return n;
            let r = t.getObjectByProperty(`type`, `PerspectiveCamera`);
            return r && (r.aspect = x.width / x.height, r.updateProjectionMatrix(), K.current.set(e, r)), r
        },
        Q = (e, t) => {
            e.updateMatrixWorld();
            let n = Me.current;
            return n.set(t.x, t.y, t.z), e.localToWorld(n), {
                x: n.x,
                y: n.y,
                z: n.z
            }
        },
        $ = (e, t) => {
            if (!e || !t) return {
                x: .5,
                y: .5
            };
            e.updateMatrixWorld();
            let n = Me.current;
            return n.set(t.x, t.y, t.z).project(e), {
                x: p.clamp(n.x * .5 + .5, 0, 1),
                y: p.clamp(n.y * .5 + .5, 0, 1)
            }
        };
    A((n, o) => {
        if (!B.current) return;
        for (let e of F()) e.update?.(n, o);
        if (k(), g.current += o, g.current < d - 1 / 1e3) return;
        g.current = Math.max(0, g.current - d);
        let c = performance.now();
        if (P.current) {
            let e = 1e3 / (c - T.current);
            if (E.current += (e - E.current) * .01, !D.current && i !== `low` && a && E.current < pe && (D.current = !0, a()), re.getState().isLoaded && S.current === null && (S.current = c), u && !w.current && S.current !== null && c - S.current >= 5e3) {
                let {
                    trackers: e,
                    pageViewToken: t
                } = r.getState();
                if (e?.dux) {
                    w.current = !0;
                    let {
                        tier: n
                    } = ne.getState();
                    ue({
                        trackers: e,
                        pageViewToken: t,
                        enabled: u,
                        targetName: `fps_measurement`,
                        parentName: `renderer_pipeline`,
                        width: x.width,
                        height: x.height,
                        duration: Math.round(c - S.current),
                        metadata: {
                            measuredFps: Math.round(E.current * 100) / 100,
                            effectiveTier: n,
                            targetFps: d === 1 / 30 ? 30 : 60
                        }
                    })
                }
            }
        }
        T.current = c;
        let ie = _e,
            f = [];
        for (let [e, t] of z.current) {
            let n = ie.get(e);
            if (!n) continue;
            let r = l(e),
                i = (n.offsets?.transition ?? `bend`) === `bend` ? ee(e, r.transition) : r.transition;
            f.push({
                element: e,
                scene: t,
                section: n,
                progress: r.progress,
                transition: i
            })
        }
        let m = [],
            h = [],
            _ = null,
            v = e => {
                m.push(e), h.push(e.scene)
            };
        for (let e = 0; e < f.length; e++) {
            let t = f[e],
                n = t.section.offsets;
            if (t.element.dataset[Oe] === `true` && t.transition <= ke) continue;
            let r = t.transition > -1 && t.transition < 1;
            if (!r && t.transition < 0 && e > 0 && (r = f[e - 1].progress >= (n?.sceneEnterAt ?? 1)), !r && t.transition >= 1 && e < f.length - 1 && (r = f[e + 1].progress < (n?.sceneExitAt ?? 0)), !r) continue;
            let i = e > 0 ? f[e - 1] : void 0,
                a = i?.section.handle === `hero` && t.section.handle !== `hero` && t.transition < 0,
                o = a ? `hero` : n?.transition ?? `none`,
                c = s && we.has(o) ? `crossfade` : o;
            if (c !== `none`) {
                _ && v(_);
                let e = (a ? i?.section.offsets?.hero : n?.hero) ?? se,
                    r = c === `hero` && t.element.dataset[De] === `out`,
                    o = r ? `crossfade` : c,
                    s = o === `hero` && i ? Q(i.scene, e.center) : void 0,
                    l = {
                        center: {
                            x: .5,
                            y: .5
                        },
                        noiseStrength: e.noiseStrength,
                        textureStrength: e.textureStrength,
                        outlineStrength: e.outlineStrength,
                        glowStrength: e.glowStrength,
                        zoomStrength: e.zoomStrength,
                        textureScale: e.textureScale,
                        distance: e.distance,
                        mode: e.mode,
                        angleDeg: e.angleDeg,
                        spread: e.spread,
                        bend: e.bend,
                        wipe: e.wipe
                    },
                    u = n?.reveal ?? oe,
                    ee = {
                        origin: u.origin,
                        softness: u.softness,
                        edgeGlow: u.edgeGlow,
                        zoom: u.zoom
                    };
                _ = {
                    ...t,
                    mode: o,
                    transitionT: r ? J(t.transition) : o === `crossfade` ? J(t.transition, n?.crossfadeStartAt ?? 0) : o === `hero` ? J(t.transition, e.startAt, e.endAt, e.curve) : o === `reveal` ? J(t.transition, u.startAt, u.endAt, u.curve) : J(t.transition),
                    scrollProgress: i?.progress ?? t.progress,
                    swipeDirection: n?.swipeDirection ?? {
                        x: 1,
                        y: 0
                    },
                    swipeFeather: n?.swipeFeather ?? 0,
                    swipeNoiseAmount: n?.swipeNoiseAmount ?? 0,
                    hero: l,
                    heroCenterWorld: s,
                    fadeOutReveal: r,
                    reveal: ee,
                    bendDirection: n?.bendDirection ?? {
                        x: 0,
                        y: -1
                    },
                    zoomBlurStrength: n?.zoomBlurStrength ?? 1,
                    lerpCameraWithPrevious: a || (n?.lerpCameraWithPrevious ?? !1)
                };
                continue
            }
            v(t)
        }
        _ && m.length === 0 && (v(_), _ = null);
        let y, b, C = e => {
            e.transition > 0 ? (!y || e.transition < y.transition) && (y = e) : (!b || e.transition > b.transition) && (b = e)
        };
        for (let e of m) C(e);
        _?.lerpCameraWithPrevious && C(_);
        for (let e = 1; e < f.length; e++) {
            let t = f[e];
            if (t.transition >= 0) continue;
            let n = t.section.offsets;
            !n?.lerpCameraWithPrevious || n.transition !== `none` || (C(f[e - 1]), C(t))
        }
        let O = f[f.length - 1]?.element,
            A;
        if (y && b && y.element !== O && b.element !== O) {
            let e = Z(y.element),
                t = Z(b.element);
            if (e && t) {
                let n = _?.lerpCameraWithPrevious && b.element === _.element ? p.smoothstep(_.transitionT, 0, .5) : J(b.transition);
                e.getWorldPosition(xe.current), t.getWorldPosition(Se.current), e.getWorldQuaternion(je.current), t.getWorldQuaternion(Y.current);
                let r = X.current;
                r.position.lerpVectors(xe.current, Se.current, n), r.quaternion.slerpQuaternions(je.current, Y.current, n), r.fov = p.lerp(e.fov, t.fov, n), r.aspect = x.width / x.height, r.near = p.lerp(e.near, t.near, n), r.far = p.lerp(e.far, t.far, n), r.updateProjectionMatrix(), A = r
            } else A = t ?? e
        } else {
            let e = y ?? b;
            e && (A = Z(e.element))
        }
        let ae = _ !== null && (_.fadeOutReveal || _.mode === `hero` && _.hero.mode === `radial` && _.hero.distance < .999),
            ce = _ ? {
                scene: _.scene,
                mode: _.mode,
                progress: _.transitionT,
                scrollProgress: _.scrollProgress,
                swipeDirection: _.swipeDirection,
                swipeFeather: _.swipeFeather,
                swipeNoiseAmount: _.swipeNoiseAmount,
                disableDepthMerge: ae,
                hero: {
                    ..._.hero,
                    center: _.mode === `hero` ? $(A ?? Z(_.element), _.heroCenterWorld) : _.hero.center
                },
                reveal: _.reveal,
                bendDirection: _.bendDirection,
                zoomBlurStrength: _.zoomBlurStrength
            } : null,
            j = V.current,
            le = _ && !_.lerpCameraWithPrevious ? Z(_.element) ?? null : null,
            M = te.getState(),
            de = _ !== null && !ae,
            N = M.exclusiveOverlayElement !== null && _?.element === M.exclusiveOverlayElement && _.transitionT >= Te && de;
        M.exclusiveCoverActive !== N && M.setExclusiveCoverActive(N), j && (j.mainScenes = N ? Ee : h, j.transitioningSection = ce, j.transitioningCamera = le), A && (j && (j.mainCamera = A), U.current && (U.current.mainCamera = A));
        let fe = (() => {
            let t = t => e.findIndex(e => e.element === t);
            if (_) {
                let e = t(_.element);
                return e < 0 ? null : {
                    incomingIndex: e,
                    progress: _.transitionT,
                    direction: _.bendDirection,
                    mode: _.mode
                }
            }
            let n = m[m.length - 1];
            return !n || t(n.element) < 0 ? null : {
                incomingIndex: null,
                progress: 1,
                direction: n.section.offsets?.bendDirection ?? {
                    x: 0,
                    y: -1
                },
                mode: n.section.offsets?.transition ?? `bend`
            }
        })();
        H.current?.setTransitionState(fe), B.current.render(o), G.current || (G.current = !0, t())
    }, 1);
    let Pe = ce(e => e.ready);
    return (0, q.jsx)(q.Fragment, {
        children: e.map(e => {
            let t = L.current.get(e.element);
            if (!t) return null;
            let r = n === void 0 || n.has(e.element),
                i = Pe[e.handle] ?? !1;
            return (0, q.jsx)(I.Fragment, {
                children: ae((0, q.jsx)(j, {
                    value: c,
                    children: (0, q.jsxs)(ie, {
                        value: {
                            element: e.element,
                            handle: e.handle,
                            progress: e.progress,
                            transition: e.transition,
                            screenOffset: e.screenOffset,
                            stateUrl: e.stateUrl,
                            isContentMounted: r,
                            isPresetResolved: i
                        },
                        children: [(0, q.jsx)(ze, {
                            transform: e.transform,
                            scene: t
                        }), (0, q.jsxs)(I.Suspense, {
                            fallback: null,
                            children: [e.content, (0, q.jsx)(Re, {
                                scene: t
                            })]
                        })]
                    })
                }), t)
            }, `scene-${e.handle}`)
        })
    })
}
var Y = new m,
    Me = 1,
    X = 0,
    Z = 0;

function Ne() {
    Z += 1, X = 0, Q.clear(), $.length = 0
}
var Q = new Map,
    $ = [];

function Pe(e) {
    if (Q.has(e.scene)) {
        Q.set(e.scene, e);
        return
    }
    Q.set(e.scene, e), $.push(e.scene), Ie()
}

function Fe(e) {
    if (!Q.delete(e)) return;
    let t = $.indexOf(e);
    t !== -1 && $.splice(t, 1)
}

function Ie() {
    for (; X < Me && $.length > 0;) {
        let e = $.shift(),
            t = Q.get(e);
        if (!t) continue;
        Q.delete(e), X++;
        let n = Z;
        t.gl.compileAsync(t.scene, t.camera).then(t.onDone).catch(() => {}).finally(() => {
            n === Z && (X--, Ie())
        })
    }
}
var Le = 100;

function Re({
    scene: e
}) {
    let {
        gl: t
    } = O();
    return (0, I.useEffect)(() => {
        let n = !1,
            r = 0,
            i = new Set,
            a = () => {
                n || Pe({
                    scene: e,
                    camera: e.getObjectByProperty(`type`, `PerspectiveCamera`) ?? Y,
                    gl: t,
                    onDone: () => {
                        n || k()
                    }
                })
            },
            o = () => {
                n || (clearTimeout(r), r = setTimeout(a, Le))
            },
            s = e => {
                l(e.child), o()
            },
            c = e => {
                u(e.child)
            },
            l = e => {
                if (!i.has(e)) {
                    i.add(e), e.addEventListener(`childadded`, s), e.addEventListener(`childremoved`, c);
                    for (let t of e.children) l(t)
                }
            },
            u = e => {
                if (i.has(e)) {
                    i.delete(e), e.removeEventListener(`childadded`, s), e.removeEventListener(`childremoved`, c);
                    for (let t of e.children) u(t)
                }
            };
        return l(e), o(), () => {
            n = !0, clearTimeout(r), Fe(e);
            for (let e of i) e.removeEventListener(`childadded`, s), e.removeEventListener(`childremoved`, c);
            i.clear()
        }
    }, [t, e]), null
}

function ze({
    transform: e,
    scene: t
}) {
    return (0, I.useEffect)(() => {
        e ? (t.position.set(e.position.x, e.position.y, e.position.z), t.rotation.set(e.rotation.x, e.rotation.y, e.rotation.z), t.scale.set(e.scale.x, e.scale.y, e.scale.z)) : (t.position.set(0, 0, 0), t.rotation.set(0, 0, 0), t.scale.set(1, 1, 1))
    }, [t, e]), null
}

function Be(e) {
    e.traverse(e => {
        if (!e.userData.skipDispose && e instanceof E && (e.geometry && e.geometry.dispose(), e.material)) {
            let t = Array.isArray(e.material) ? e.material : [e.material];
            for (let e of t) {
                for (let t of Object.values(e)) t instanceof y && t.dispose();
                e.dispose()
            }
        }
    }), e.clear()
}
export {
    je as t
};
//# sourceMappingURL=RendererPipeline-DbLnqP4D.js.map