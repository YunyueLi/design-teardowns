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
    o as i
} from "./constants-B_dPN1Ep.js";
import {
    n as a
} from "./useAssetLoadingStore-BjdwlLYn.js";
import {
    $a as o,
    $n as s,
    A as c,
    Dt as l,
    E as u,
    Gt as d,
    Ja as f,
    Mi as p,
    Ni as m,
    Rt as h,
    U as g,
    Zr as _,
    ft as v,
    hr as y,
    in as b,
    la as x,
    qt as S,
    rn as C,
    rr as w
} from "./three.core-DVcoLpfz.js";
import {
    g as ee
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as T
} from "./dist-4Ign8GoJ.js";
import {
    n as te
} from "./useCanvasPointer-CKM2sIQX.js";
import {
    t as ne
} from "./sharedZeroTexture-C5JcVREk.js";
import {
    n as E
} from "./layers-Cvg6N2JU.js";
import {
    n as re
} from "./SectionFluidVelocityContext-sekuEx_H.js";
var D = e(t(), 1),
    O = T(),
    k = .35,
    A = 5400,
    j = -.08,
    M = -295,
    N = 4500,
    P = 15e4,
    ie = [.2, .9, .3, .986],
    ae = [0, 0, .58, 1],
    oe = 2e3,
    se = `#ffffff`,
    F = [{
        char: `E`,
        trackingEm: j
    }, {
        char: `v`,
        trackingEm: j
    }, {
        char: `e`,
        trackingEm: j
    }, {
        char: `r`,
        trackingEm: -.03
    }, {
        char: `y`,
        trackingEm: -.04
    }, {
        char: `w`,
        trackingEm: j
    }, {
        char: `h`,
        trackingEm: j
    }, {
        char: `e`,
        trackingEm: j
    }, {
        char: `r`,
        trackingEm: j
    }, {
        char: `e`,
        trackingEm: j
    }],
    I = [F, F, F],
    L = I.flatMap((e, t) => e.map((e, n) => ({
        ...e,
        wordIndex: t,
        letterIndex: n
    })));

function R(e) {
    let t = (360 - e.reduce((e, t) => e + t, 0)) / I.length,
        n = [],
        r = t / 2,
        i = 0;
    for (let a of I) {
        for (let t = 0; t < a.length; t++) n[i] = r + e[i] / 2, r += e[i], i += 1;
        r += t
    }
    return n
}

function ce(e, t) {
    return 2 * Math.atan(e / 2 / t) * (180 / Math.PI)
}

function z(e, t, n, r) {
    let i = 3 * e,
        a = 3 * (n - e) - i,
        o = 1 - i - a,
        s = 3 * t,
        c = 3 * (r - t) - s,
        l = 1 - s - c,
        u = e => ((o * e + a) * e + i) * e,
        d = e => ((l * e + c) * e + s) * e,
        f = e => (3 * o * e + 2 * a) * e + i,
        p = e => {
            let t = e;
            for (let n = 0; n < 8; n++) {
                let n = u(t) - e;
                if (Math.abs(n) < 1e-6) return t;
                let r = f(t);
                if (Math.abs(r) < 1e-6) break;
                t -= n / r
            }
            return t
        };
    return e => e <= 0 ? 0 : e >= 1 ? 1 : d(p(e))
}

function le(e, t, n, r) {
    let i = (0, D.useRef)(r);
    i.current = r, (0, D.useEffect)(() => {
        if (!e || !t) return;
        let r = e.object(t, n, {
            reconfigure: !0
        });
        i.current(r.value);
        let a = r.onValuesChange(e => {
            i.current(e)
        });
        return () => {
            a(), e.detachObject(t)
        }
    }, [e, t])
}
var B = 4096;

function ue({
    entries: e,
    curvesData: t,
    bandHeaders: n,
    bandRefs: r,
    ascender: i,
    descender: a,
    unitsPerEm: o
}) {
    let s = new Map;
    e.forEach(e => s.set(e.codePoint, e));
    let c = Math.max(1, Math.ceil(t.length / 4)),
        l = Math.ceil(c / B),
        u = new Float32Array(B * l * 4).fill(-1);
    u.set(t);
    let d = new v(u, B, l, _, h);
    d.minFilter = d.magFilter = y, d.needsUpdate = !0;
    let m = Math.floor(n.length / 2) + Math.floor(r.length / 2),
        g = Math.max(1, Math.ceil(m / B)),
        b = new Uint32Array(B * g * 2);
    b.set(n, 0), b.set(r, n.length);
    let x = new v(b, B, g, p, f);
    return x.minFilter = x.magFilter = y, x.needsUpdate = !0, {
        codePoints: s,
        curvesTex: d,
        bandsTex: x,
        ascender: i,
        descender: a,
        unitsPerEm: o
    }
}
var de = class extends b {
        constructor(e = 1024) {
            super();
            let t = new Float32Array([-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]),
                n = new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]),
                r = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
                i = new Uint16Array([0, 2, 1, 0, 3, 2]);
            this.setIndex(new c(i, 1)), this.setAttribute(`position`, new c(t, 3)), this.setAttribute(`uv`, new c(n, 2)), this.setAttribute(`normal`, new c(r, 3)), this.maxGlyphs = e, this.glyphCount = 0, this.aScaleBias = new Float32Array(e * 4), this.aGlyphBandScale = new Float32Array(e * 4), this.aBandMaxTexCoords = new Float32Array(e * 4);
            let a = new C(this.aScaleBias, 4);
            a.setUsage(l), this.setAttribute(`aScaleBias`, a);
            let o = new C(this.aGlyphBandScale, 4);
            o.setUsage(l), this.setAttribute(`aGlyphBandScale`, o);
            let s = new C(this.aBandMaxTexCoords, 4);
            s.setUsage(l), this.setAttribute(`aBandMaxTexCoords`, s), this.instanceCount = 0, this.boundingBox = new u, this.boundingSphere = new x
        }
        computeBoundingSphere() {
            !this.boundingBox || this.boundingBox.isEmpty() ? this.boundingSphere.set(new o, 0) : this.boundingBox.getBoundingSphere(this.boundingSphere)
        }
        addGlyph(e, t, n, r, i, a, s) {
            if (this.glyphCount >= this.maxGlyphs) return !1;
            let c = this.glyphCount,
                l = r / 2,
                u = i / 2,
                d = t + l,
                f = n + u;
            return this.aScaleBias[c * 4 + 0] = l, this.aScaleBias[c * 4 + 1] = u, this.aScaleBias[c * 4 + 2] = d, this.aScaleBias[c * 4 + 3] = f, this.boundingBox.expandByPoint(new o(d - l, f - u, 0)), this.boundingBox.expandByPoint(new o(d + l, f + u, 0)), this.aGlyphBandScale[c * 4 + 0] = e.width, this.aGlyphBandScale[c * 4 + 1] = e.height, this.aGlyphBandScale[c * 4 + 2] = e.width / e.bandDimX, this.aGlyphBandScale[c * 4 + 3] = e.height / e.bandDimY, this.aBandMaxTexCoords[c * 4 + 0] = e.bandCount - 1, this.aBandMaxTexCoords[c * 4 + 1] = e.bandCount - 1, this.aBandMaxTexCoords[c * 4 + 2] = e.bandsTexCoordX, this.aBandMaxTexCoords[c * 4 + 3] = e.bandsTexCoordY, this.glyphCount++, this.instanceCount = this.glyphCount, !0
        }
        updateBuffers() {
            this.attributes.aScaleBias.needsUpdate = !0, this.attributes.aGlyphBandScale.needsUpdate = !0, this.attributes.aBandMaxTexCoords.needsUpdate = !0, this.computeBoundingSphere()
        }
    },
    V = `
precision highp int;
precision highp usampler2D;

in vec2 vTexCoords;
flat in vec4 vGlyphBandScale;
flat in uvec4 vBandMaxTexCoords;

uniform sampler2D curvesTex;
uniform usampler2D bandsTex;

const float epsilon = 0.0001;

#define glyphScale     vGlyphBandScale.xy
#define bandScale      vGlyphBandScale.zw
#define bandMax        vBandMaxTexCoords.xy
#define bandsTexCoords vBandMaxTexCoords.zw

float TraceRayCurveH(vec2 p1, vec2 p2, vec2 p3, float pixelsPerEm)
{
    if(max(max(p1.x, p2.x), p3.x) * pixelsPerEm < -0.5)
    {
        return 0.0;
    }

    uint code = (0x2E74U >> (((p1.y > 0.0) ? 2U : 0U) + ((p2.y > 0.0) ? 4U : 0U) + ((p3.y > 0.0) ? 8U : 0U))) & 3U;
    if(code == 0U)
    {
        return 0.0;
    }

    vec2 a = p1 - p2 * 2.0 + p3;
    vec2 b = p1 - p2;
    float c = p1.y;
    float ayr = 1.0 / a.y;
    float d = sqrt(max(b.y * b.y - a.y * c, 0.0));
    float t1 = (b.y - d) * ayr;
    float t2 = (b.y + d) * ayr;

    if(abs(a.y) < epsilon)
    {
        t1 = t2 = c / (2.0 * b.y);
    }

    float coverage = 0.0;

    if((code & 1U) != 0U)
    {
        float x1 = (a.x * t1 - b.x * 2.0) * t1 + p1.x;
        float cov_c = clamp(x1 * pixelsPerEm + 0.5, 0.0, 1.0);
        coverage += cov_c;
    }

    if(code > 1U)
    {
        float x2 = (a.x * t2 - b.x * 2.0) * t2 + p1.x;
        float cov_c = clamp(x2 * pixelsPerEm + 0.5, 0.0, 1.0);
        coverage -= cov_c;
    }

    return coverage;
}

float TraceRayBandH(uvec2 bandData, float pixelsPerEm)
{
    float coverage = 0.0;
    for(uint curve = 0U; curve < bandData.x; ++curve)
    {
        uint curveOffset = bandData.y + curve;
        ivec2 curveLoc = ivec2(texelFetch(bandsTex, ivec2(curveOffset & 0xFFFU, curveOffset >> 12U), 0).xy);
        vec4 p12 = texelFetch(curvesTex, curveLoc, 0) / vec4(glyphScale, glyphScale) - vec4(vTexCoords, vTexCoords);
        vec2 p3 = texelFetch(curvesTex, ivec2(curveLoc.x + 1, curveLoc.y), 0).xy / glyphScale - vTexCoords;
        coverage += TraceRayCurveH(p12.xy, p12.zw, p3.xy, pixelsPerEm);
    }
    return coverage;
}

float TraceRayBandV(uvec2 bandData, float pixelsPerEm)
{
    float coverage = 0.0;
    for(uint curve = 0U; curve < bandData.x; ++curve)
    {
        uint curveOffset = bandData.y + curve;
        ivec2 curveLoc = ivec2(texelFetch(bandsTex, ivec2(curveOffset & 0xFFFU, curveOffset >> 12U), 0).xy);
        vec4 p12 = texelFetch(curvesTex, curveLoc, 0) / vec4(glyphScale, glyphScale) - vec4(vTexCoords, vTexCoords);
        vec2 p3 = texelFetch(curvesTex, ivec2(curveLoc.x + 1, curveLoc.y), 0).xy / glyphScale - vTexCoords;
        coverage += TraceRayCurveH(p12.yx, p12.wz, p3.yx, pixelsPerEm);
    }
    return coverage;
}
`,
    H = `
    vec2 fdx = dFdx(vTexCoords);
    vec2 fdy = dFdy(vTexCoords);
    // Modern WebGL GPUs legally return 0.0 for fragment derivatives inside colorless Depth-Only passes!
    // A strict mechanical floor guarantees we never divide-by-zero -> Infinity.
    vec2 fw = max(max(abs(fdx), abs(fdy)), vec2(0.000001));
    vec2 pixelsPerEm = vec2(1.0 / fw.x, 1.0 / fw.y);

    // Shadow cameras evaluate text at a sub-pixel size and the algorithm aggressively culls it into alpha 0.0.
    // Clamping to a high resolution floor forces solid strokes when drawn locally into a shadow mapping buffer!
    pixelsPerEm = clamp(pixelsPerEm, vec2(1.0), vec2(200.0));

    uvec2 bandIndex = uvec2(clamp(uvec2(vTexCoords * bandScale), uvec2(0U, 0U), bandMax));

    uint hBandOffset = bandsTexCoords.y * 4096U + bandsTexCoords.x + bandIndex.y;
    uvec2 hBandData = texelFetch(bandsTex, ivec2(hBandOffset & 0xFFFU, hBandOffset >> 12U), 0).xy;

    uint vBandOffset = bandsTexCoords.y * 4096U + bandsTexCoords.x + bandMax.y + 1U + bandIndex.x;
    uvec2 vBandData = texelFetch(bandsTex, ivec2(vBandOffset & 0xFFFU, vBandOffset >> 12U), 0).xy;

    float coverageX = TraceRayBandH(hBandData, pixelsPerEm.x);
    float coverageY = TraceRayBandV(vBandData, pixelsPerEm.y);

    coverageX = min(abs(coverageX), 1.0);
    coverageY = min(abs(coverageY), 1.0);
    float slugAlpha = (coverageX + coverageY) * 0.5;
`,
    fe = `
in vec4 aScaleBias;
in vec4 aGlyphBandScale;
in vec4 aBandMaxTexCoords;

out vec2 vTexCoords;
flat out vec4 vGlyphBandScale;
flat out uvec4 vBandMaxTexCoords;
`,
    pe = `
    vec3 transformed = vec3( position.xy * aScaleBias.xy + aScaleBias.zw, 0.0 );
    vTexCoords = position.xy * 0.5 + 0.5;
    
    #ifdef SLUG_MODELSPACE_UV
    #ifdef USE_UV
    vUv = transformed.xy;
    #endif
    #ifdef USE_MAP
    
    
    vMapUv = ( mapTransform * vec3( vec2(length(modelMatrix[0].xyz)*transformed.x,length(modelMatrix[2].xyz)*transformed.y), 1.0 ) ).xy;
    #endif
    #endif

    vGlyphBandScale = aGlyphBandScale;
    vBandMaxTexCoords = uvec4(aBandMaxTexCoords);
`,
    me = `
precision highp float;
${V}
uniform vec3 uColor;
// Left-to-right reveal in glyph-local space (0 = hidden, 1 = fully shown).
// vTexCoords.x runs 0→1 across the glyph quad, so this matches a CSS
// clip-path inset(0 right% 0 0) wipe and rotates with the glyph for free.
uniform float uReveal;
// Global fade multiplier, driven by the host's Theatre opacity.
uniform float uOpacity;

out vec4 fragColor;

void main() {
    if (vTexCoords.x > uReveal) discard;
${H}
    if (slugAlpha < 0.001) discard;
    fragColor = vec4(uColor, slugAlpha * uOpacity);
}
`,
    he = `
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D uFluidVelocity;
uniform float uFluidInfluence;
in vec2 position;
${fe}
void main() {
${pe}
    vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
    vec4 clip = projectionMatrix * mv;
    if (uFluidInfluence > 0.0001 && clip.w > 0.0001) {
      vec2 screenUv = clamp(clip.xy / clip.w * 0.5 + 0.5, 0.0, 1.0);
      vec2 fluidVel = texture(uFluidVelocity, screenUv).xy;
      float depthAtten = 1.0 / (1.0 + max(-mv.z, 0.0) * 0.3);
      mv.xy += fluidVel * uFluidInfluence * 0.02 * depthAtten;
      clip = projectionMatrix * mv;
    }
    gl_Position = clip;
}
`,
    ge = class extends m {
        constructor(e = {}) {
            super({
                vertexShader: he,
                fragmentShader: me,
                uniforms: {
                    curvesTex: {
                        value: null
                    },
                    bandsTex: {
                        value: null
                    },
                    uColor: {
                        value: new g(1, 1, 1)
                    },
                    uReveal: {
                        value: 1
                    },
                    uOpacity: {
                        value: 1
                    },
                    uFluidVelocity: {
                        value: null
                    },
                    uFluidInfluence: {
                        value: 0
                    }
                },
                transparent: !0,
                depthWrite: !1,
                blending: 1,
                side: 2,
                glslVersion: d
            }), e.curvesTex && (this.uniforms.curvesTex.value = e.curvesTex), e.bandsTex && (this.uniforms.bandsTex.value = e.bandsTex), e.color && (this.uniforms.uColor.value = new g(e.color))
        }
    },
    _e = {
        entries: [{
            codePoint: -1,
            width: 0,
            height: 0,
            advanceWidth: 658,
            bearingX: 0,
            bearingY: 0,
            bandCount: 0,
            bandDimX: 0,
            bandDimY: 0,
            bandsTexCoordX: 0,
            bandsTexCoordY: 0
        }, {
            codePoint: 69,
            width: 420,
            height: 668,
            advanceWidth: 577,
            bearingX: 93,
            bearingY: 0,
            bandCount: 16,
            bandDimX: 27,
            bandDimY: 42,
            bandsTexCoordX: 0,
            bandsTexCoordY: 0
        }, {
            codePoint: 118,
            width: 450,
            height: 500,
            advanceWidth: 504,
            bearingX: 27,
            bearingY: 0,
            bandCount: 16,
            bandDimX: 29,
            bandDimY: 32,
            bandsTexCoordX: 32,
            bandsTexCoordY: 0
        }, {
            codePoint: 101,
            width: 417,
            height: 524,
            advanceWidth: 520,
            bearingX: 52,
            bearingY: -12,
            bandCount: 16,
            bandDimX: 27,
            bandDimY: 33,
            bandsTexCoordX: 64,
            bandsTexCoordY: 0
        }, {
            codePoint: 114,
            width: 264,
            height: 512,
            advanceWidth: 375,
            bearingX: 88,
            bearingY: 0,
            bandCount: 16,
            bandDimX: 17,
            bandDimY: 33,
            bandsTexCoordX: 96,
            bandsTexCoordY: 0
        }, {
            codePoint: 121,
            width: 450,
            height: 710,
            advanceWidth: 504,
            bearingX: 27,
            bearingY: -210,
            bandCount: 16,
            bandDimX: 29,
            bandDimY: 45,
            bandsTexCoordX: 128,
            bandsTexCoordY: 0
        }, {
            codePoint: 119,
            width: 654,
            height: 500,
            advanceWidth: 708,
            bearingX: 27,
            bearingY: 0,
            bandCount: 16,
            bandDimX: 41,
            bandDimY: 32,
            bandsTexCoordX: 160,
            bandsTexCoordY: 0
        }, {
            codePoint: 104,
            width: 393,
            height: 722,
            advanceWidth: 564,
            bearingX: 88,
            bearingY: 0,
            bandCount: 16,
            bandDimX: 25,
            bandDimY: 46,
            bandsTexCoordX: 192,
            bandsTexCoordY: 0
        }],
        curvesData: [82, 303, 82, 188.5, 82, 74, 251, 74, 420, 74, 420, 37, 420, 0, 210, 0, 0, 0, 0, 334, 0, 668, 210, 668, 420, 668, 420, 631, 420, 594, 251, 594, 82, 594, 82, 485.5, 82, 377, 232.5, 377, 383, 377, 383, 340, 383, 303, 232.5, 303, 82, 303, -1, -1, 0, 500, 43.5, 500, 87, 500, 156.5, 293.5, 226, 87, 227, 87, 228, 87, 298, 293.5, 368, 500, 409, 500, 450, 500, 358.5, 250, 267, 0, 225, 0, 183, 0, 91.5, 250, 0, 500, -1, -1, 223, 65, 270, 65, 300, 88, 330, 111, 341, 156, 376.5, 146, 412, 136, 396, 70, 347, 35, 298, 0, 223, 0, 118, 0, 59, 68, 0, 136, 0, 260, 0, 381, 60, 452, 121, 524, 223, 524, 312, 524, 364, 466, 417, 409, 417, 314, 417, 295, 414, 277, 411, 259, 407, 247, 243, 247, 79, 247, 82, 160, 119, 112, 157, 65, 223, 65, -1, -1, 221, 461, 162, 461, 125, 421, 89, 381, 81, 307, 208, 307, 335, 307, 336, 312, 336, 317, 336, 323, 336, 333, 336, 390, 304, 425, 273, 461, 221, 461, -1, -1, 82, 0, 41, 0, 0, 0, 0, 250, 0, 500, 32.5, 500, 65, 500, 70.5, 436, 76, 372, 90, 435, 134, 473, 178, 512, 235, 512, 242, 512, 249, 511, 257, 510, 264, 509, 261.5, 466, 259, 423, 253, 424, 242, 425, 231, 426, 219, 426, 157, 426, 119, 379, 82, 332, 82, 253, 82, 126.5, 82, 0, -1, -1, 87, 710, 156, 499, 225, 288, 226, 288, 227, 288, 297.5, 499, 368, 710, 409, 710, 450, 710, 355, 446.5, 260, 183, 224, 84, 184, 42, 144, 0, 83, 0, 65, 0, 47, 5, 29, 10, 13, 19, 19, 53, 25, 87, 45, 75, 56, 72, 68, 68, 81, 68, 118, 68, 139, 92, 160, 116, 186, 189, 93, 449.5, 0, 710, 43.5, 710, 87, 710, -1, -1, 185, 98, 186, 98, 187, 98, 239, 299, 291, 500, 328, 500, 365, 500, 417, 299, 469, 98, 470, 98, 471, 98, 523, 299, 575, 500, 614.5, 500, 654, 500, 583, 250, 512, 0, 472, 0, 432, 0, 380, 197, 328, 394, 327, 394, 326, 394, 274, 197, 222, 0, 182, 0, 142, 0, 71, 250, 0, 500, 40.5, 500, 81, 500, 133, 299, 185, 98, -1, -1, 0, 0, 0, 361, 0, 722, 41, 722, 82, 722, 82, 571.5, 82, 421, 105, 465, 145, 488, 186, 512, 239, 512, 309, 512, 351, 468, 393, 425, 393, 351, 393, 175.5, 393, 0, 352, 0, 311, 0, 311, 167, 311, 334, 311, 385, 285, 412, 260, 440, 213, 440, 151, 440, 116, 401, 82, 362, 82, 290, 82, 145, 82, 0, 41, 0, 0, 0],
        bandHeaders: [2, 224, 3, 226, 2, 229, 2, 231, 2, 233, 2, 235, 2, 237, 3, 239, 3, 242, 2, 245, 2, 247, 2, 249, 2, 251, 2, 253, 3, 255, 2, 258, 2, 260, 2, 262, 2, 264, 6, 266, 6, 272, 6, 278, 6, 284, 6, 290, 6, 296, 6, 302, 6, 308, 6, 314, 6, 320, 6, 326, 6, 332, 4, 338, 2, 342, 2, 344, 4, 346, 4, 350, 4, 354, 4, 358, 4, 362, 4, 366, 4, 370, 4, 374, 4, 378, 4, 382, 4, 386, 4, 390, 4, 394, 4, 398, 2, 402, 2, 404, 3, 406, 3, 409, 2, 412, 2, 414, 3, 416, 4, 419, 2, 423, 3, 425, 2, 428, 2, 430, 3, 432, 2, 435, 2, 437, 2, 439, 2, 441, 5, 443, 6, 448, 5, 454, 5, 459, 2, 464, 2, 466, 4, 468, 3, 472, 6, 475, 5, 481, 4, 486, 6, 490, 5, 496, 3, 501, 2, 504, 2, 506, 2, 508, 8, 510, 6, 518, 8, 524, 6, 532, 6, 538, 6, 544, 10, 550, 6, 560, 6, 566, 8, 572, 9, 580, 5, 589, 4, 594, 6, 598, 2, 604, 2, 606, 2, 608, 2, 610, 2, 612, 2, 614, 2, 616, 3, 618, 2, 621, 2, 623, 2, 625, 5, 627, 7, 632, 4, 639, 5, 643, 6, 648, 2, 654, 2, 656, 2, 658, 3, 660, 4, 663, 2, 667, 3, 669, 4, 672, 2, 676, 2, 678, 2, 680, 2, 682, 3, 684, 3, 687, 4, 690, 3, 694, 5, 697, 5, 702, 3, 707, 2, 710, 4, 712, 2, 716, 4, 718, 4, 722, 4, 726, 4, 730, 4, 734, 4, 738, 4, 742, 4, 746, 4, 750, 4, 754, 5, 758, 6, 763, 7, 769, 5, 776, 5, 781, 4, 786, 5, 790, 4, 795, 3, 799, 2, 802, 2, 804, 2, 806, 3, 808, 2, 811, 2, 813, 2, 815, 4, 817, 4, 821, 4, 825, 8, 829, 8, 837, 8, 845, 8, 853, 8, 861, 8, 869, 8, 877, 8, 885, 8, 893, 8, 901, 6, 909, 6, 915, 6, 921, 2, 927, 3, 929, 2, 932, 3, 934, 4, 937, 3, 941, 2, 944, 5, 946, 4, 951, 2, 955, 3, 957, 4, 960, 3, 964, 2, 967, 3, 969, 2, 972, 4, 974, 4, 978, 4, 982, 4, 986, 4, 990, 4, 994, 5, 998, 6, 1003, 6, 1009, 6, 1015, 6, 1021, 4, 1027, 2, 1031, 2, 1033, 2, 1035, 2, 1037, 2, 1039, 2, 1041, 2, 1043, 4, 1045, 3, 1049, 3, 1052, 2, 1055, 2, 1057, 3, 1059, 3, 1062, 2, 1065, 3, 1067, 3, 1070, 2, 1073, 3, 1075, 2, 1078],
        bandRefs: [2, 0, 4, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 10, 0, 0, 0, 4, 0, 10, 0, 8, 0, 4, 0, 8, 0, 4, 0, 8, 0, 4, 0, 8, 0, 4, 0, 8, 0, 4, 0, 8, 0, 4, 0, 6, 0, 8, 0, 4, 0, 6, 0, 4, 0, 5, 0, 3, 0, 5, 0, 3, 0, 5, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 9, 0, 11, 0, 1, 0, 3, 0, 5, 0, 7, 0, 1, 0, 3, 0, 18, 0, 20, 0, 18, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 18, 0, 16, 0, 14, 0, 20, 0, 13, 0, 20, 0, 13, 0, 20, 0, 13, 0, 14, 0, 20, 0, 13, 0, 14, 0, 20, 0, 14, 0, 20, 0, 14, 0, 20, 0, 14, 0, 20, 0, 19, 0, 14, 0, 16, 0, 15, 0, 19, 0, 16, 0, 19, 0, 16, 0, 18, 0, 19, 0, 16, 0, 18, 0, 16, 0, 18, 0, 16, 0, 17, 0, 18, 0, 17, 0, 18, 0, 17, 0, 18, 0, 17, 0, 18, 0, 26, 0, 27, 0, 25, 0, 26, 0, 22, 0, 27, 0, 37, 0, 25, 0, 23, 0, 22, 0, 27, 0, 37, 0, 28, 0, 25, 0, 23, 0, 37, 0, 36, 0, 28, 0, 24, 0, 25, 0, 23, 0, 36, 0, 28, 0, 36, 0, 28, 0, 36, 0, 28, 0, 34, 0, 36, 0, 29, 0, 28, 0, 33, 0, 34, 0, 29, 0, 32, 0, 33, 0, 42, 0, 43, 0, 40, 0, 29, 0, 32, 0, 43, 0, 44, 0, 40, 0, 29, 0, 32, 0, 44, 0, 40, 0, 29, 0, 32, 0, 44, 0, 45, 0, 39, 0, 40, 0, 29, 0, 32, 0, 45, 0, 30, 0, 39, 0, 29, 0, 32, 0, 31, 0, 30, 0, 31, 0, 30, 0, 29, 0, 28, 0, 29, 0, 28, 0, 30, 0, 29, 0, 40, 0, 41, 0, 28, 0, 35, 0, 36, 0, 27, 0, 30, 0, 40, 0, 41, 0, 35, 0, 36, 0, 27, 0, 30, 0, 39, 0, 40, 0, 41, 0, 35, 0, 36, 0, 37, 0, 27, 0, 30, 0, 39, 0, 41, 0, 35, 0, 37, 0, 27, 0, 30, 0, 39, 0, 41, 0, 35, 0, 37, 0, 27, 0, 30, 0, 39, 0, 41, 0, 35, 0, 37, 0, 27, 0, 30, 0, 31, 0, 39, 0, 45, 0, 41, 0, 35, 0, 37, 0, 22, 0, 27, 0, 26, 0, 31, 0, 45, 0, 41, 0, 35, 0, 22, 0, 26, 0, 31, 0, 45, 0, 41, 0, 35, 0, 22, 0, 26, 0, 31, 0, 45, 0, 44, 0, 41, 0, 35, 0, 23, 0, 22, 0, 26, 0, 31, 0, 44, 0, 42, 0, 41, 0, 35, 0, 23, 0, 24, 0, 25, 0, 26, 0, 31, 0, 32, 0, 35, 0, 24, 0, 25, 0, 32, 0, 35, 0, 24, 0, 25, 0, 32, 0, 33, 0, 34, 0, 35, 0, 24, 0, 25, 0, 60, 0, 48, 0, 60, 0, 48, 0, 60, 0, 48, 0, 60, 0, 48, 0, 60, 0, 48, 0, 60, 0, 48, 0, 60, 0, 48, 0, 59, 0, 60, 0, 48, 0, 59, 0, 48, 0, 59, 0, 48, 0, 59, 0, 48, 0, 58, 0, 51, 0, 59, 0, 50, 0, 48, 0, 55, 0, 56, 0, 57, 0, 58, 0, 51, 0, 50, 0, 48, 0, 55, 0, 51, 0, 50, 0, 48, 0, 55, 0, 52, 0, 51, 0, 50, 0, 48, 0, 54, 0, 55, 0, 53, 0, 52, 0, 50, 0, 48, 0, 49, 0, 47, 0, 49, 0, 47, 0, 49, 0, 47, 0, 49, 0, 50, 0, 47, 0, 50, 0, 51, 0, 59, 0, 47, 0, 51, 0, 59, 0, 51, 0, 58, 0, 59, 0, 52, 0, 51, 0, 58, 0, 59, 0, 52, 0, 58, 0, 52, 0, 58, 0, 52, 0, 58, 0, 52, 0, 58, 0, 52, 0, 57, 0, 58, 0, 52, 0, 53, 0, 57, 0, 53, 0, 54, 0, 57, 0, 56, 0, 54, 0, 55, 0, 56, 0, 67, 0, 68, 0, 69, 0, 70, 0, 71, 0, 67, 0, 74, 0, 73, 0, 72, 0, 71, 0, 67, 0, 75, 0, 74, 0, 67, 0, 75, 0, 66, 0, 67, 0, 75, 0, 76, 0, 66, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 66, 0, 64, 0, 62, 0, 76, 0, 76, 0, 77, 0, 71, 0, 72, 0, 70, 0, 76, 0, 77, 0, 72, 0, 73, 0, 70, 0, 69, 0, 62, 0, 76, 0, 77, 0, 74, 0, 73, 0, 68, 0, 69, 0, 62, 0, 76, 0, 77, 0, 74, 0, 68, 0, 62, 0, 76, 0, 75, 0, 74, 0, 68, 0, 62, 0, 76, 0, 75, 0, 68, 0, 62, 0, 76, 0, 75, 0, 67, 0, 68, 0, 62, 0, 64, 0, 63, 0, 67, 0, 64, 0, 66, 0, 67, 0, 64, 0, 66, 0, 64, 0, 66, 0, 64, 0, 66, 0, 64, 0, 65, 0, 66, 0, 65, 0, 66, 0, 65, 0, 66, 0, 65, 0, 66, 0, 86, 0, 88, 0, 90, 0, 92, 0, 86, 0, 88, 0, 90, 0, 92, 0, 86, 0, 88, 0, 90, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 88, 0, 90, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 80, 0, 94, 0, 92, 0, 86, 0, 84, 0, 82, 0, 80, 0, 94, 0, 92, 0, 92, 0, 93, 0, 92, 0, 93, 0, 94, 0, 92, 0, 94, 0, 92, 0, 94, 0, 91, 0, 80, 0, 94, 0, 79, 0, 91, 0, 80, 0, 90, 0, 91, 0, 80, 0, 90, 0, 80, 0, 81, 0, 88, 0, 89, 0, 90, 0, 81, 0, 82, 0, 88, 0, 89, 0, 82, 0, 88, 0, 82, 0, 88, 0, 87, 0, 82, 0, 84, 0, 83, 0, 87, 0, 84, 0, 86, 0, 87, 0, 84, 0, 86, 0, 84, 0, 85, 0, 86, 0, 85, 0, 86, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 110, 0, 96, 0, 103, 0, 105, 0, 109, 0, 110, 0, 96, 0, 102, 0, 103, 0, 105, 0, 106, 0, 109, 0, 96, 0, 102, 0, 106, 0, 107, 0, 108, 0, 109, 0, 96, 0, 102, 0, 107, 0, 108, 0, 99, 0, 98, 0, 96, 0, 102, 0, 101, 0, 100, 0, 99, 0, 98, 0, 96, 0, 101, 0, 100, 0, 98, 0, 96, 0, 98, 0, 96, 0, 98, 0, 96, 0, 98, 0, 96, 0, 98, 0, 96, 0, 97, 0, 111, 0, 97, 0, 111, 0, 97, 0, 111, 0, 97, 0, 99, 0, 109, 0, 111, 0, 99, 0, 108, 0, 109, 0, 100, 0, 99, 0, 108, 0, 100, 0, 108, 0, 100, 0, 108, 0, 100, 0, 107, 0, 108, 0, 100, 0, 101, 0, 107, 0, 101, 0, 107, 0, 101, 0, 107, 0, 106, 0, 101, 0, 106, 0, 104, 0, 101, 0, 104, 0, 101, 0, 102, 0, 104, 0, 102, 0, 104, 0],
        ascender: 983,
        descender: -263,
        unitsPerEm: 1e3
    };

function ve(e, t, n) {
    return e || !t ? 0 : Math.max(n, 0)
}

function ye() {
    return {
        scrollSpinDeg: 0,
        scrollYOffset: 0,
        scrollOriginY: null,
        lastScrollY: null
    }
}

function be(e, t) {
    e.lastScrollY = t, e.scrollOriginY = t, e.scrollYOffset = 0
}

function U(e, t, n) {
    return e.scrollOriginY !== null && e.scrollOriginY > n && t <= 2 ? (e.scrollOriginY = 0, e.lastScrollY = t, !0) : !1
}

function xe(e, t, n) {
    let r = e.lastScrollY,
        i = e.scrollOriginY ?? t;
    if (e.scrollOriginY = i, e.lastScrollY = t, e.scrollYOffset = Math.max(0, (t - i) * n.scrollYPerPx), r !== null) {
        let i = Math.max(-180, Math.min(180, t - r));
        e.scrollSpinDeg -= i * n.scrollSpinDegPerPx
    }
    return {
        scrollSpin: e.scrollSpinDeg,
        scrollY: e.scrollYOffset
    }
}
var W = n(),
    G = Math.PI / 180,
    Se = .1,
    Ce = 600,
    we = .12,
    Te = .01,
    Ee = 45 * .02,
    De = 2.5,
    Oe = 18,
    ke = 8,
    K = z(...ae),
    q = {
        ringFromDeg: 102,
        ringToDeg: M,
        introDurationMs: N,
        introBezier: ie,
        ambientDurationMs: P,
        scrollSpinDegPerPx: we,
        scrollYPerPx: Te,
        pointerRepulseEnabled: !0,
        pointerRepulseStrength: De,
        pointerXRotationDeg: Oe,
        pointerXRotationDamping: ke,
        wordStaggerMs: 600,
        letterStaggerMs: 55,
        slideDurationMs: 650,
        wipeDurationMs: 300,
        revealSweepDeg: 14,
        ringTiltDeg: 18,
        reverseSpin: !1,
        radiusVmin: 45,
        letterSizeRatio: k,
        perspectivePx: A,
        letterColor: se
    };

function Ae(e) {
    let t = e?.parent;
    for (; t;) {
        let e = t.userData.theatreOpacity;
        if (typeof e == `number`) return e;
        t = t.parent
    }
    return 1
}

function je(e, t, n) {
    let r = e - i;
    if (r <= 0) return t.ringFromDeg;
    if (r < t.introDurationMs) return t.ringFromDeg + (t.ringToDeg - t.ringFromDeg) * n(r / t.introDurationMs);
    let a = r - t.introDurationMs;
    return t.ringToDeg - 360 * (a / t.ambientDurationMs)
}

function Me(e, t, n, r, i) {
    let a = new de(1),
        o = e.codePoints.get(t.codePointAt(0) ?? 0);
    o && (a.addGlyph(o, -o.advanceWidth / 2 + o.bearingX, o.bearingY, o.width, o.height, 0, 0), a.updateBuffers());
    let s = new ge({
        curvesTex: e.curvesTex,
        bandsTex: e.bandsTex,
        color: i
    });
    s.uniforms.uReveal.value = 0;
    let c = new w(a, s);
    c.frustumCulled = !1, c.scale.setScalar(n);
    let l = (e.ascender + e.descender) / 2;
    c.position.set(0, -l * n, r);
    let u = new S;
    return u.add(c), E(u, 1), {
        group: u,
        material: s,
        resting: 0
    }
}

function Ne({
    controls: e,
    controlsRef: t,
    scrubMs: n = null,
    waitForLoading: o = !0,
    debug: c = !1,
    width: l,
    children: u
}) {
    let d = e ?? t?.current ?? q,
        f = l === void 0 ? 1 : l / 90,
        p = (0, D.useRef)(null),
        m = (0, D.useRef)(null),
        h = (0, D.useRef)([]),
        g = (0, D.useRef)(!1),
        _ = (0, D.useRef)(null),
        v = (0, D.useRef)(ye()),
        y = re(),
        b = (0, D.useMemo)(() => ue(_e), []);
    (0, D.useEffect)(() => () => {
        b.curvesTex.dispose(), b.bandsTex.dispose()
    }, [b]);
    let x = (0, D.useRef)(d);
    x.current = d;
    let S = t ?? x,
        C = (0, D.useRef)(z(...d.introBezier)),
        T = (0, D.useRef)(d.introBezier),
        E = e => {
            let t = T.current,
                n = e.introBezier;
            return n !== t && (n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3]) && (T.current = n, C.current = z(...n)), C.current
        };
    (0, D.useEffect)(() => {
        n === null && (_.current = null)
    }, [n]), (0, D.useEffect)(() => {
        let e = m.current;
        if (!b || !e) return;
        let {
            unitsPerEm: t
        } = b, n = R(L.map(({
            char: e,
            trackingEm: n
        }) => ((b.codePoints.get(e.codePointAt(0) ?? 0)?.advanceWidth ?? 0) / t + n) * d.letterSizeRatio * (180 / Math.PI))), r = d.radiusVmin * d.letterSizeRatio / t;
        return h.current = L.map(({
            char: t
        }, i) => {
            let a = Me(b, t, r, d.radiusVmin, d.letterColor);
            return a.resting = n[i], a.group.rotation.y = (n[i] - S.current.revealSweepDeg) * G, e.add(a.group), a
        }), g.current = !0, () => {
            g.current = !1, h.current.forEach(({
                group: e
            }) => {
                e.parent?.remove(e), e.traverse(e => {
                    e instanceof w && (e.geometry.dispose(), e.material.dispose())
                })
            }), h.current = []
        }
    }, [b, d.radiusVmin, d.letterSizeRatio, d.letterColor, S]);
    let O = (e, t, n = 0, a = 0, o = 0) => {
            let c = r.getState().preferReducedMotion,
                l = c ? K(s.clamp((e - i) / Ce, 0, 1)) : 1;
            if (p.current) {
                let e = c ? -Ee * (1 - l) : 0;
                p.current.position.y = a + e, p.current.rotation.x = t.ringTiltDeg * G
            }
            if (m.current) {
                let r = t.reverseSpin ? -1 : 1;
                if (c) m.current.rotation.y = r * (t.ringToDeg + n * Se) * G;
                else {
                    let i = r * (je(e, t, E(t)) + n);
                    m.current.rotation.y = (i + o) * G
                }
            }
            if (!g.current) return;
            let u = Ae(p.current);
            if (c) {
                for (let {
                        group: e,
                        material: t,
                        resting: n
                    }
                    of h.current) t.uniforms.uOpacity.value = u * l, t.uniforms.uReveal.value = 1, e.rotation.y = n * G;
                return
            }
            for (let n = 0; n < h.current.length; n++) {
                let {
                    group: r,
                    material: a,
                    resting: o
                } = h.current[n], {
                    wordIndex: s,
                    letterIndex: c
                } = L[n];
                a.uniforms.uOpacity.value = u;
                let l = i + s * t.wordStaggerMs,
                    d = e - l,
                    f = d <= 0 ? -t.revealSweepDeg : d < t.slideDurationMs ? -t.revealSweepDeg * (1 - K(d / t.slideDurationMs)) : 0;
                r.rotation.y = (o + f) * G;
                let p = e - (l + c * t.letterStaggerMs);
                a.uniforms.uReveal.value = p <= 0 ? 0 : p < t.wipeDurationMs ? K(p / t.wipeDurationMs) : 1
            }
        },
        k = () => {
            typeof window > `u` || be(v.current, window.scrollY)
        },
        A = () => {
            if (typeof window > `u`) return {
                scrollSpin: v.current.scrollSpinDeg,
                scrollY: v.current.scrollYOffset
            };
            let e = v.current;
            return U(e, window.scrollY, window.innerHeight), xe(e, window.scrollY, S.current)
        },
        j = te(),
        M = (0, D.useRef)(0),
        N = (e, t, n) => {
            let i = t.active && !r.getState().preferReducedMotion ? t.x * e.pointerXRotationDeg : 0,
                a = 1 - Math.exp(-Math.max(0, e.pointerXRotationDamping) * n);
            return M.current = s.lerp(M.current, i, a), M.current
        },
        P = e => {
            if (!g.current) return;
            let t = r.getState().preferReducedMotion,
                n = y?.current ?? ne(),
                i = ve(t, e.pointerRepulseEnabled, e.pointerRepulseStrength);
            for (let {
                    material: e
                }
                of h.current) e.uniforms.uFluidVelocity.value = n, e.uniforms.uFluidInfluence.value = i
        };
    return ee((e, t) => {
        let r = S.current,
            i = e.clock.getElapsedTime() * 1e3,
            s = N(r, j.current, t);
        if (n !== null) {
            k(), O(n, r, 0, 0, s), P(r);
            return
        }
        if (_.current === null) {
            if (!(g.current && (!o || a.getState().isLoadingComplete))) {
                k(), O(0, r, 0, 0, s), P(r);
                return
            }
            _.current = i, k()
        }
        let c = A();
        O(i - _.current, r, c.scrollSpin, c.scrollY, s), P(r)
    }), (0, W.jsxs)(`group`, {
        ref: p,
        "rotation-x": d.ringTiltDeg * G,
        scale: [f, f, f],
        children: [(0, W.jsx)(`group`, {
            ref: m
        }), u, c && (0, W.jsxs)(W.Fragment, {
            children: [(0, W.jsxs)(`mesh`, {
                "rotation-x": -Math.PI / 2,
                children: [(0, W.jsx)(`ringGeometry`, {
                    args: [d.radiusVmin * .99, d.radiusVmin, 128]
                }), (0, W.jsx)(`meshBasicMaterial`, {
                    color: `#ff2d78`,
                    side: 2,
                    transparent: !0,
                    opacity: .7
                })]
            }), (0, W.jsx)(`axesHelper`, {
                args: [d.radiusVmin]
            })]
        })]
    })
}
var J = {
        spin: {
            fromDeg: q.ringFromDeg,
            toDeg: q.ringToDeg,
            ambientMs: q.ambientDurationMs,
            tiltDeg: q.ringTiltDeg,
            reverse: q.reverseSpin,
            pointerXDeg: q.pointerXRotationDeg,
            pointerXDamping: q.pointerXRotationDamping
        },
        intro: {
            durationMs: q.introDurationMs,
            ease: q.introBezier.join(`, `)
        },
        scroll: {
            spinDegPerPx: q.scrollSpinDegPerPx,
            yPerPx: q.scrollYPerPx
        },
        pointerRepulse: {
            enabled: q.pointerRepulseEnabled,
            strength: q.pointerRepulseStrength
        },
        reveal: {
            wordStaggerMs: q.wordStaggerMs,
            letterStaggerMs: q.letterStaggerMs,
            slideDurationMs: q.slideDurationMs,
            wipeDurationMs: q.wipeDurationMs,
            sweepDeg: q.revealSweepDeg
        }
    },
    Y = {
        fromDeg: O.types.number(J.spin.fromDeg, {
            range: [-360, 360],
            nudgeMultiplier: 1
        }),
        toDeg: O.types.number(J.spin.toDeg, {
            range: [-720, 360],
            nudgeMultiplier: 1
        }),
        ambientMs: O.types.number(J.spin.ambientMs, {
            range: [2e3, 3e5],
            nudgeMultiplier: 1e3
        }),
        tiltDeg: O.types.number(J.spin.tiltDeg, {
            range: [-90, 90],
            nudgeMultiplier: 1
        }),
        reverse: O.types.boolean(J.spin.reverse),
        pointerXDeg: O.types.number(J.spin.pointerXDeg, {
            range: [-90, 90],
            nudgeMultiplier: 1
        }),
        pointerXDamping: O.types.number(J.spin.pointerXDamping, {
            range: [1, 40],
            nudgeMultiplier: 1
        })
    },
    X = {
        durationMs: O.types.number(J.intro.durationMs, {
            range: [0, 1e4],
            nudgeMultiplier: 50
        }),
        ease: O.types.string(J.intro.ease)
    },
    Z = {
        spinDegPerPx: O.types.number(J.scroll.spinDegPerPx, {
            range: [-1, 1],
            nudgeMultiplier: .01
        }),
        yPerPx: O.types.number(J.scroll.yPerPx, {
            range: [0, .1],
            nudgeMultiplier: .001
        })
    },
    Q = {
        enabled: O.types.boolean(J.pointerRepulse.enabled),
        strength: O.types.number(J.pointerRepulse.strength, {
            range: [0, 20],
            nudgeMultiplier: .1
        })
    },
    $ = {
        wordStaggerMs: O.types.number(J.reveal.wordStaggerMs, {
            range: [0, 2e3],
            nudgeMultiplier: 10
        }),
        letterStaggerMs: O.types.number(J.reveal.letterStaggerMs, {
            range: [0, 500],
            nudgeMultiplier: 5
        }),
        slideDurationMs: O.types.number(J.reveal.slideDurationMs, {
            range: [0, 3e3],
            nudgeMultiplier: 10
        }),
        wipeDurationMs: O.types.number(J.reveal.wipeDurationMs, {
            range: [0, 2e3],
            nudgeMultiplier: 10
        }),
        sweepDeg: O.types.number(J.reveal.sweepDeg, {
            range: [0, 90],
            nudgeMultiplier: 1
        })
    },
    Pe = {
        spin: O.types.compound(Y, {
            label: `spin`
        }),
        intro: O.types.compound(X, {
            label: `intro`
        }),
        scroll: O.types.compound(Z, {
            label: `scroll`
        }),
        pointerRepulse: O.types.compound(Q, {
            label: `pointer repulse`
        }),
        reveal: O.types.compound($, {
            label: `reveal`
        })
    };

function Fe(e) {
    let t = e.split(`,`).map(e => parseFloat(e.trim()));
    return t.length === 4 && t.every(Number.isFinite) ? [t[0], t[1], t[2], t[3]] : [...q.introBezier]
}

function Ie() {
    return {
        spin: {
            ...J.spin
        },
        intro: {
            ...J.intro
        },
        scroll: {
            ...J.scroll
        },
        pointerRepulse: {
            ...J.pointerRepulse
        },
        reveal: {
            ...J.reveal
        }
    }
}

function Le(e) {
    let t = e.spin,
        n = e.intro,
        r = e.scroll,
        i = e.pointerRepulse,
        a = e.reveal;
    return {
        ...q,
        ringFromDeg: t?.fromDeg ?? q.ringFromDeg,
        ringToDeg: t?.toDeg ?? q.ringToDeg,
        introDurationMs: n?.durationMs ?? q.introDurationMs,
        introBezier: Fe(n?.ease ?? q.introBezier.join(`, `)),
        ambientDurationMs: t?.ambientMs ?? q.ambientDurationMs,
        scrollSpinDegPerPx: r?.spinDegPerPx ?? q.scrollSpinDegPerPx,
        scrollYPerPx: r?.yPerPx ?? q.scrollYPerPx,
        pointerRepulseEnabled: i?.enabled ?? q.pointerRepulseEnabled,
        pointerRepulseStrength: i?.strength ?? q.pointerRepulseStrength,
        pointerXRotationDeg: t?.pointerXDeg ?? q.pointerXRotationDeg,
        pointerXRotationDamping: t?.pointerXDamping ?? q.pointerXRotationDamping,
        ringTiltDeg: t?.tiltDeg ?? q.ringTiltDeg,
        reverseSpin: t?.reverse ?? q.reverseSpin,
        wordStaggerMs: a?.wordStaggerMs ?? q.wordStaggerMs,
        letterStaggerMs: a?.letterStaggerMs ?? q.letterStaggerMs,
        slideDurationMs: a?.slideDurationMs ?? q.slideDurationMs,
        wipeDurationMs: a?.wipeDurationMs ?? q.wipeDurationMs,
        revealSweepDeg: a?.sweepDeg ?? q.revealSweepDeg
    }
}
export {
    ce as _, $ as a, Ie as c, Ne as d, le as f, A as g, k as h, Q as i, Le as l, L as m, J as n, Z as o, oe as p, X as r, Y as s, Pe as t, q as u, R as v
};
//# sourceMappingURL=heroRingTheatreControls-Cya-WCRd.js.map