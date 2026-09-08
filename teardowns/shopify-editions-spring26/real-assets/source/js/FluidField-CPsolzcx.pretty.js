import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    t as n
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    t as r
} from "./reportError-D4E52G70.js";
import {
    n as i
} from "./lenisManager-BuYlhEBR.js";
import {
    t as a
} from "./useStickyMountGate-DmTxtK8v.js";
import {
    $a as o,
    $n as s,
    In as c,
    Jt as l,
    Qa as u,
    Qi as d,
    Tr as f,
    U as p,
    Zi as m,
    Zr as h,
    hr as g,
    kr as _,
    rr as v,
    so as y
} from "./three.core-DVcoLpfz.js";
import {
    b,
    g as x
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as S
} from "./reducedMotion-CT1n0ezQ.js";
import {
    n as ee
} from "./useCanvasPointer-CKM2sIQX.js";
var C = e(t(), 1),
    te = 14,
    ne = 10,
    re = .002,
    ie = .32,
    ae = 8,
    oe = 80,
    se = .01,
    ce = 1 / 30,
    le = !1,
    w = 0,
    T = 0,
    E = 0,
    D = 0,
    O = 0,
    k = new WeakMap;

function A(e, t) {
    let n = performance.now(),
        r = t - e,
        i = Math.max(ae, Math.min(oe, n - D));
    D = n, T = Math.abs(r) < se ? 0 : Math.max(-1, Math.min(1, r / i * ie))
}

function ue(e) {
    let t = e.target,
        n, r;
    if (t === document || t === window || t === null) r = window.scrollY, n = E, E = r;
    else if (t instanceof HTMLElement) r = t.scrollTop, n = k.get(t) ?? r, k.set(t, r);
    else return;
    A(n, r)
}

function de(e) {
    A(E, e.scroll), E = e.scroll
}

function fe(e) {
    let t = Math.max(0, Math.min(e, ce)),
        n = 1 - Math.exp(-t * te),
        r = Math.exp(-t * ne);
    w += (T - w) * n, T *= r, Math.abs(w) < re && (w = 0)
}

function j(e) {
    let t = (e - O) / 1e3;
    O = e, fe(t), requestAnimationFrame(j)
}

function pe() {
    le || typeof window > `u` || (le = !0, E = window.scrollY, D = performance.now(), O = D, document.addEventListener(`scroll`, ue, {
        passive: !0,
        capture: !0
    }), i(e => e.on(`scroll`, de)), requestAnimationFrame(j))
}

function M() {
    return pe(), w
}

function N() {
    return performance.now()
}

function me() {
    return typeof document > `u` ? `unknown` : document.visibilityState ?? `visible`
}

function P() {
    return typeof document > `u` || document.hidden !== !0
}

function F(e = N()) {
    let t = P();
    return {
        visibleElapsedMs: 0,
        hiddenElapsedMs: 0,
        segmentStartedAt: e,
        isVisible: t,
        everHidden: !t
    }
}

function I(e, t = N()) {
    let n = Math.max(0, t - e.segmentStartedAt);
    return e.isVisible ? e.visibleElapsedMs += n : e.hiddenElapsedMs += n, e.segmentStartedAt = t, e.isVisible = P(), e.everHidden ||= !e.isVisible, L(e, t)
}

function L(e, t = N()) {
    let n = Math.max(0, t - e.segmentStartedAt);
    return {
        visibilityState: me(),
        everHidden: e.everHidden || !e.isVisible,
        visibleElapsedMs: Math.round(e.visibleElapsedMs + (e.isVisible ? n : 0)),
        hiddenElapsedMs: Math.round(e.hiddenElapsedMs + (e.isVisible ? 0 : n))
    }
}

function R(e, t, n) {
    let r = null,
        i = !1,
        a = () => {
            r !== null && (window.clearTimeout(r), r = null)
        },
        o = () => {
            if (a(), i || !t.isVisible) return;
            let s = Math.max(0, e - t.visibleElapsedMs);
            r = window.setTimeout(() => {
                if (I(t), t.isVisible && t.visibleElapsedMs >= e) {
                    i = !0, c(), n(L(t));
                    return
                }
                o()
            }, s)
        },
        s = () => {
            I(t), o()
        },
        c = () => {
            typeof document > `u` || document.removeEventListener(`visibilitychange`, s)
        };
    return typeof document < `u` && document.addEventListener(`visibilitychange`, s), I(t), o(), {
        clear: () => {
            i || (i = !0, I(t), a(), c())
        }
    }
}

function z(e) {
    return e instanceof Error ? e.visibilityTelemetry ?? {} : {}
}

function he(e, t) {
    return Object.assign(e, {
        visibilityTelemetry: t
    }), e
}
var B = !1,
    V = [];

function H(e, {
    visibilityAwareWatchdog: t = !1
} = {}) {
    return new Promise((n, r) => {
        V.push({
            task: e,
            resolve: n,
            reject: r,
            visibilityAwareWatchdog: t
        }), W()
    })
}
var ge = 30,
    U = 15e3;

function W() {
    B || V.length !== 0 && window.setTimeout(_e, ge)
}

function _e() {
    if (B) return;
    let e = V.shift();
    if (!e) return;
    B = !0;
    let t = !1,
        n = () => {
            t || (t = !0, r.clear(), B = !1, W())
        },
        r;
    if (e.visibilityAwareWatchdog) r = R(U, F(), t => {
        e.reject(he(Error(`warmup watchdog timeout`), t)), n()
    });
    else {
        let t = window.setTimeout(() => {
            e.reject(Error(`warmup watchdog timeout`)), n()
        }, U);
        r = {
            clear: () => window.clearTimeout(t)
        }
    }
    e.task().then(e.resolve, e.reject).finally(n)
}
var ve = 1e3,
    G = new Map,
    K = null,
    q = 0;

function J() {
    if (K !== null) return K;
    if (typeof window > `u`) return K = !1, K;
    let e = new URLSearchParams(window.location.search),
        t = !1;
    try {
        t = window.localStorage.getItem(`scenePerf`) === `1`
    } catch {
        t = !1
    }
    return K = e.has(`scenePerf`) || t, K
}

function ye(e, t) {
    if (!J()) return t();
    let n = performance.now();
    try {
        return t()
    } finally {
        be(e, performance.now() - n)
    }
}

function be(e, t) {
    if (!J()) return;
    let n = G.get(e) ?? {
        total: 0,
        count: 0,
        max: 0
    };
    n.total += t, n.count++, n.max = Math.max(n.max, t), G.set(e, n);
    let r = performance.now();
    if (r - q < ve) return;
    q = r;
    let i = Array.from(G, ([e, t]) => ({
        name: e,
        avg: `${(t.total/Math.max(1,t.count)).toFixed(2)}ms`,
        max: `${t.max.toFixed(2)}ms`,
        count: t.count
    })).sort((e, t) => parseFloat(t.avg) - parseFloat(e.avg));
    console.table(i), G.clear()
}
var Y = class {
        #e;
        #t;
        uniform;
        constructor(e, t, n) {
            let r = {
                minFilter: n,
                magFilter: n,
                format: h,
                type: l,
                depthBuffer: !1,
                stencilBuffer: !1,
                generateMipmaps: !1
            };
            this.#e = new y(e, t, r), this.#t = new y(e, t, r), this.uniform = {
                value: this.#e.texture
            }
        }
        get read() {
            return this.#e.texture
        }
        get write() {
            return this.#t
        }
        swap() {
            let e = this.#e;
            this.#e = this.#t, this.#t = e, this.uniform.value = this.#e.texture
        }
        dispose() {
            this.#e.dispose(), this.#t.dispose()
        }
    },
    X = class {
        gl;
        uniforms;
        mesh;
        scene;
        camera;
        constructor(e, t, n, r) {
            this.gl = e, this.uniforms = r;
            let i = new _(2, 2),
                a = new d({
                    vertexShader: t,
                    fragmentShader: n,
                    uniforms: r,
                    depthWrite: !1,
                    depthTest: !1
                });
            this.mesh = new v(i, a), this.scene = new m, this.scene.add(this.mesh), this.camera = new f(-1, 1, 1, -1, 0, 1)
        }
        render(e) {
            this.gl.setRenderTarget(e ?? null), this.gl.render(this.scene, this.camera)
        }
        dispose() {
            this.mesh.geometry.dispose(), this.mesh.material.dispose()
        }
    };

function Z(e, t = 1 / 60) {
    let n = Math.max(0, Math.min(1, e));
    return n === 0 ? 0 : n ** (Math.max(0, t) * 60)
}
var Q = `varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main() {
  vUv = uv;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(position, 1.0);
}

`,
    xe = `varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;

void main() {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = dissipation * texture2D(uSource, coord);
  gl_FragColor.a = 1.0;
}

`,
    Se = `varying vec2 vUv;
uniform sampler2D uTexture;
uniform float value;

void main() {
  gl_FragColor = value * texture2D(uTexture, vUv);
}

`,
    Ce = `varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}

`,
    we = `// Display pass from Pavel Dobryakov's WebGL-Fluid-Simulation (MIT):
// straight passthrough of the dye texture.

varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}
`,
    Te = `varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}

`,
    Ee = `varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}

`,
    De = `varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}

`,
    Oe = `// Splat brush. Deposits \`color\` along the segment from \`prevPoint\` to \`point\`
// with a Gaussian falloff. Pavel Dobryakov's WebGL-Fluid-Simulation (MIT) uses
// the same additive exp(-d^2/radius) deposit; here the distance is measured to
// the stroke segment (standard point-to-segment SDF) so pointer motion paints a
// continuous round-tipped stroke instead of discrete dots. \`radius\` is the
// Gaussian variance (aspect-corrected on X).

varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform vec2 prevPoint;
uniform float radius;

// Point-to-segment distance: the canonical 2D SDF from Inigo Quilez
// (https://iquilezles.org/articles/distfunctions2d/ — \`sdSegment\`),
// aspect-corrected on X so the brush stays round on non-square viewports.
float segmentDistance(vec2 uv, vec2 a, vec2 b) {
  vec2 pa = uv - a;
  vec2 ba = b - a;
  pa.x *= aspectRatio;
  ba.x *= aspectRatio;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float d = segmentDistance(vUv, prevPoint, point);
  // Guard the divisor: a zero radius would divide by zero and write NaNs that
  // poison the velocity FBO.
  vec3 splat = exp(-(d * d) / max(radius, 1e-6)) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`,
    ke = `varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;

void main() {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture2D(uVelocity, vUv).xy;
  gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}

`,
    Ae = e => s.clamp(Math.floor(e), 16, 512),
    je = {
        simSize: 128,
        dyeSize: 256,
        densityDissipation: .97,
        velocityDissipation: .98,
        pressureDissipation: .8,
        pressureIterations: 10,
        curl: 30,
        splatRadius: .25
    },
    Me = class {
        gl;
        config;
        fbos;
        #e = [];
        passes;
        width = 0;
        height = 0;
        aspect = 1;
        simW = 0;
        simH = 0;
        dyeW = 0;
        dyeH = 0;
        #t = new u;
        #n = new u;
        #r = 0;
        #i = null;
        constructor(e, t = {}) {
            this.gl = e, this.config = {
                ...je,
                ...t
            }, this.#s(1), this.#c(), this.reset()
        }
        setTextureSizes(e, t) {
            if (!Number.isFinite(e) || !Number.isFinite(t)) return !1;
            let n = Ae(e),
                r = Ae(t);
            return n === this.config.simSize && r === this.config.dyeSize ? !1 : (this.config.simSize = n, this.config.dyeSize = r, this.#a(this.aspect), this.width > 0 && this.height > 0 && this.passes.display.uniforms.texelSize.value.set(1 / this.width, 1 / this.height), !0)
        }
        #a(e) {
            this.#e.push({
                fbos: this.fbos,
                armed: !1
            }), this.#s(e, !1), this.#l()
        }
        #o() {
            this.#e.length !== 0 && (this.#e = this.#e.filter(e => {
                if (!e.armed) return !0;
                for (let t of Object.values(e.fbos)) t.dispose();
                return !1
            }))
        }
        #s(e, t = !0) {
            if (this.fbos && t)
                for (let e of Object.values(this.fbos)) e.dispose();
            let {
                simSize: n,
                dyeSize: r
            } = this.config, i = n, a = n, o = r, s = r;
            e > 1 ? (a = Math.round(n / e), s = Math.round(r / e)) : (i = Math.round(n * e), o = Math.round(r * e)), this.fbos = {
                density: new Y(o, s, c),
                velocity: new Y(i, a, c),
                divergence: new Y(i, a, g),
                curl: new Y(i, a, g),
                pressure: new Y(i, a, g)
            }, this.simW = i, this.simH = a, this.dyeW = o, this.dyeH = s
        }
        #c() {
            let {
                simSize: e
            } = this.config, t = () => ({
                value: new u(1 / e, 1 / e)
            });
            this.passes = {
                curl: new X(this.gl, Q, Ce, {
                    texelSize: t(),
                    uVelocity: {
                        value: null
                    }
                }),
                vorticity: new X(this.gl, Q, ke, {
                    texelSize: t(),
                    uVelocity: {
                        value: null
                    },
                    uCurl: {
                        value: null
                    },
                    curl: {
                        value: this.config.curl
                    },
                    dt: {
                        value: 1 / 60
                    }
                }),
                divergence: new X(this.gl, Q, Te, {
                    texelSize: t(),
                    uVelocity: {
                        value: null
                    }
                }),
                clear: new X(this.gl, Q, Se, {
                    texelSize: t(),
                    uTexture: {
                        value: null
                    },
                    value: {
                        value: this.config.pressureDissipation
                    }
                }),
                pressure: new X(this.gl, Q, De, {
                    texelSize: t(),
                    uPressure: {
                        value: null
                    },
                    uDivergence: {
                        value: null
                    }
                }),
                gradientSubtract: new X(this.gl, Q, Ee, {
                    texelSize: t(),
                    uPressure: {
                        value: null
                    },
                    uVelocity: {
                        value: null
                    }
                }),
                advection: new X(this.gl, Q, xe, {
                    texelSize: t(),
                    uVelocity: {
                        value: null
                    },
                    uSource: {
                        value: null
                    },
                    dt: {
                        value: 1 / 60
                    },
                    dissipation: {
                        value: this.config.velocityDissipation
                    }
                }),
                display: new X(this.gl, Q, we, {
                    texelSize: {
                        value: new u
                    },
                    uTexture: {
                        value: null
                    }
                }),
                splat: new X(this.gl, Q, Oe, {
                    uTarget: {
                        value: null
                    },
                    aspectRatio: {
                        value: 1
                    },
                    point: {
                        value: new u
                    },
                    prevPoint: {
                        value: new u
                    },
                    color: {
                        value: new o
                    },
                    radius: {
                        value: (this.config.splatRadius / 200) ** 2
                    }
                })
            }
        }
        setSize(e, t) {
            this.width = e, this.height = t;
            let n = e / t;
            Math.abs(n - this.aspect) > .01 && (this.aspect = n, this.#a(n)), this.passes.display.uniforms.texelSize.value.set(1 / e, 1 / t)
        }
        #l() {
            let e = 1 / this.simW,
                t = 1 / this.simH,
                n = [this.passes.curl, this.passes.vorticity, this.passes.divergence, this.passes.clear, this.passes.pressure, this.passes.gradientSubtract];
            for (let r of n) r.uniforms.texelSize.value.set(e, t)
        }
        #u() {
            this.#r++ === 0 && (this.#i = this.gl.getRenderTarget())
        }
        #d() {
            this.#r = Math.max(0, this.#r - 1), this.#r === 0 && (this.gl.setRenderTarget(this.#i), this.#i = null)
        }
        async compileAsync() {
            await Promise.all(Object.values(this.passes).map(e => this.gl.compileAsync(e.scene, e.camera)))
        }
        update(e) {
            this.#o();
            let {
                fbos: t,
                passes: n,
                config: r
            } = this;
            this.#u();
            try {
                n.curl.uniforms.uVelocity.value = t.velocity.read, n.curl.render(t.curl.write), t.curl.swap(), n.vorticity.uniforms.uVelocity.value = t.velocity.read, n.vorticity.uniforms.uCurl.value = t.curl.read, n.vorticity.uniforms.curl.value = r.curl, n.vorticity.uniforms.dt.value = e, n.vorticity.render(t.velocity.write), t.velocity.swap(), n.divergence.uniforms.uVelocity.value = t.velocity.read, n.divergence.render(t.divergence.write), t.divergence.swap(), n.clear.uniforms.uTexture.value = t.pressure.read, n.clear.uniforms.value.value = Z(r.pressureDissipation, e), n.clear.render(t.pressure.write), t.pressure.swap(), n.pressure.uniforms.uDivergence.value = t.divergence.read;
                for (let e = 0; e < r.pressureIterations; e++) n.pressure.uniforms.uPressure.value = t.pressure.read, n.pressure.render(t.pressure.write), t.pressure.swap();
                n.gradientSubtract.uniforms.uPressure.value = t.pressure.read, n.gradientSubtract.uniforms.uVelocity.value = t.velocity.read, n.gradientSubtract.render(t.velocity.write), t.velocity.swap(), n.advection.uniforms.texelSize.value.set(1 / this.simW, 1 / this.simH), n.advection.uniforms.uVelocity.value = t.velocity.read, n.advection.uniforms.uSource.value = t.velocity.read, n.advection.uniforms.dissipation.value = Z(r.velocityDissipation, e), n.advection.uniforms.dt.value = e, n.advection.render(t.velocity.write), t.velocity.swap(), n.advection.uniforms.texelSize.value.set(1 / this.dyeW, 1 / this.dyeH), n.advection.uniforms.uVelocity.value = t.velocity.read, n.advection.uniforms.uSource.value = t.density.read, n.advection.uniforms.dissipation.value = Z(r.densityDissipation, e), n.advection.render(t.density.write), t.density.swap()
            } finally {
                this.#d()
            }
            for (let e of this.#e) e.armed = !0
        }
        render(e = null) {
            this.#u();
            try {
                this.passes.display.uniforms.uTexture.value = this.fbos.density.read, this.passes.display.render(e)
            } finally {
                this.#d()
            }
        }
        splat(e, t, n, r, i, a, o = e, s = t) {
            let c = this.#t.set(e / this.width, 1 - t / this.height),
                l = this.#n.set(o / this.width, 1 - s / this.height),
                u = a / 200;
            this.#u();
            try {
                let e = this.passes.splat;
                e.uniforms.uTarget.value = this.fbos.velocity.read, e.uniforms.radius.value = u * u, e.uniforms.aspectRatio.value = this.width / this.height, e.uniforms.point.value.copy(c), e.uniforms.prevPoint.value.copy(l), e.uniforms.color.value.set(n, -r, 0), e.render(this.fbos.velocity.write), this.fbos.velocity.swap(), e.uniforms.uTarget.value = this.fbos.density.read, e.uniforms.color.value.set(i.r, i.g, i.b), e.render(this.fbos.density.write), this.fbos.density.swap()
            } finally {
                this.#d()
            }
        }
        updateConfig(e, t) {
            this.config[e] = t
        }
        get velocityTexture() {
            return this.fbos.velocity.read
        }
        reset() {
            let e = this.gl.getRenderTarget(),
                t = new p;
            this.gl.getClearColor(t);
            let n = this.gl.getClearAlpha();
            this.gl.setClearColor(0, 0);
            for (let e of Object.values(this.fbos)) this.gl.setRenderTarget(e.write), this.gl.clear(), e.swap(), this.gl.setRenderTarget(e.write), this.gl.clear(), e.swap();
            this.gl.setRenderTarget(e), this.gl.setClearColor(t, n)
        }
        dispose() {
            for (let e of this.#e)
                for (let t of Object.values(e.fbos)) t.dispose();
            this.#e = [];
            for (let e of Object.values(this.fbos)) e.dispose();
            for (let e of Object.values(this.passes)) e.dispose()
        }
    },
    Ne = .72,
    Pe = .02,
    Fe = .3,
    Ie = .9,
    Le = 1e4,
    Re = class {
        fluid;
        color = new p;
        mouse = {
            x: 0,
            y: 0,
            px: 0,
            py: 0,
            inside: !1
        };
        handPointers = new Map;
        handPointerActiveIds = new Set;
        lastActiveAt = 0;
        lastStepTime = -1;
        lastScrollPaintStepTime = -1;
        scrollClear = 0;
        lastPointerProcessTime = -1;
        lastScrollClearTime = -1;
        activeCompile = null;
        disposeRequested = !1;
        disposed = !1;
        constructor(e, t) {
            this.fluid = new Me(e, t)
        }
        configure(e, t) {
            return this.disposeRequested || this.disposed ? !1 : this.fluid.setTextureSizes(e, t)
        }
        resize(e, t) {
            this.disposeRequested || this.disposed || (this.fluid.setSize(e, t), this.mouse.inside = !1, this.handPointers.clear())
        }
        compileAsync() {
            return this.disposeRequested || this.disposed ? Promise.resolve() : (this.activeCompile ||= this.fluid.compileAsync().finally(() => {
                this.activeCompile = null, this.disposeRequested && this.disposeNow()
            }), this.activeCompile)
        }
        reset() {
            this.disposeRequested || this.disposed || (this.fluid.reset(), this.mouse.x = 0, this.mouse.y = 0, this.mouse.px = 0, this.mouse.py = 0, this.mouse.inside = !1, this.handPointers.clear(), this.handPointerActiveIds.clear(), this.lastActiveAt = 0, this.lastStepTime = -1, this.lastScrollPaintStepTime = -1, this.lastPointerProcessTime = -1, this.lastScrollClearTime = -1, this.scrollClear = 0)
        }
        get densityTexture() {
            return this.fluid.fbos.density.read
        }
        get velocityTexture() {
            return this.fluid.fbos.velocity.read
        }
        update(e, t, n, r, i, a) {
            if (this.disposeRequested || this.disposed) return this.velocityTexture;
            if (this.fluid.updateConfig(`curl`, n.pointcloud.fluid.curl), a !== this.lastScrollClearTime) {
                this.lastScrollClearTime = a;
                let n = s.smoothstep(Math.abs(t.scrollVelocity), Pe, Fe);
                this.scrollClear = s.damp(this.scrollClear, n, 5, e)
            }
            let o = this.scrollClear,
                c = n.pointcloud.fluid.velocityDissipation;
            if (this.fluid.updateConfig(`velocityDissipation`, s.lerp(c, Math.min(c, Ie), o)), this.fluid.updateConfig(`densityDissipation`, n.pointcloud.fluid.densityDissipation), this.fluid.updateConfig(`pressureDissipation`, n.pointcloud.fluid.pressure), t.pointerActive || (this.mouse.inside = !1), t.pointerActive && n.pointcloud.fluid.enabled && r > 0 && i > 0 && a !== this.lastPointerProcessTime) {
                this.lastPointerProcessTime = a;
                let o = t.pointer,
                    c = (o.x * .5 + .5) * r,
                    l = (-o.y * .5 + .5) * i,
                    u = performance.now(),
                    d = this.mouse.inside && u - this.lastActiveAt < 80;
                this.mouse.px = d ? this.mouse.x : c, this.mouse.py = d ? this.mouse.y : l, this.mouse.x = c, this.mouse.y = l, this.mouse.inside = !0, this.lastActiveAt = u;
                let f = this.mouse.x - this.mouse.px,
                    p = this.mouse.y - this.mouse.py;
                if (f !== 0 || p !== 0) {
                    let t = Math.hypot(f, p) / Math.max(e, 1e-4),
                        r = 1 + 1 * s.smoothstep(t, 500, Le),
                        i = n.pointcloud.fluid.splatForce * r;
                    this.color.setHSL(a * .1 % 1, .8, .5), this.fluid.splat(this.mouse.x, this.mouse.y, f * i, p * i, this.color, n.pointcloud.fluid.splatRadius * 50, this.mouse.px, this.mouse.py)
                }
            }
            return this.paintHandFluidPointers(t, n, r, i, a), this.paintScrollFluidRects(t, n, r, i, a, e), t.transitionRole !== `warmup` && a !== this.lastStepTime && (this.lastStepTime = a, ye(`cloudTexture.sharedFluid`, () => this.fluid.update(Math.min(e, 1 / 30)))), this.fluid.fbos.velocity.read
        }
        paintHandFluidPointers(e, t, n, r, i) {
            let a = e.handFluidPointers;
            if (!a || a.length === 0 || e.transitionRole === `warmup` || !t.pointcloud.fluid.enabled || n <= 0 || r <= 0) {
                (!a || a.length === 0) && this.handPointers.clear();
                return
            }
            let o = this.handPointerActiveIds;
            o.clear();
            for (let e of a) {
                let a = s.clamp(e.x, 0, 1) * n,
                    c = s.clamp(e.y, 0, 1) * r,
                    l = this.handPointers.get(e.id);
                if (this.handPointers.set(e.id, {
                        x: a,
                        y: c
                    }), o.add(e.id), !l) continue;
                let u = a - l.x,
                    d = c - l.y;
                Math.hypot(u, d) <= .001 || (this.color.setHSL((i * .11 + e.id * .08) % 1, .74, .54), this.fluid.splat(a, c, u * t.pointcloud.fluid.splatForce * e.strength * 1.35, d * t.pointcloud.fluid.splatForce * e.strength * 1.35, this.color, t.pointcloud.fluid.splatRadius * 65, l.x, l.y))
            }
            for (let e of this.handPointers.keys()) o.has(e) || this.handPointers.delete(e)
        }
        paintScrollFluidRects(e, t, n, r, i, a) {
            let o = e.scrollFluidRects,
                c = e.scrollVelocity;
            if (!o || e.transitionRole === `warmup` || !t.pointcloud.fluid.enabled || n <= 0 || r <= 0 || i === this.lastScrollPaintStepTime || Math.abs(c) < .018) return;
            let l = Math.max(window.innerWidth, 1),
                u = Math.max(window.innerHeight, 1),
                d = e.scrollFluidRectInfluences,
                f = Math.min(8, o.length / 4),
                p = s.clamp(a * 60, .25, 2),
                m = s.clamp(c, -1, 1) * Ne * p;
            if (!(Math.abs(m) < 1e-4)) {
                this.lastScrollPaintStepTime = i, this.color.setHSL((i * .07 + .11) % 1, .55, .54);
                for (let e = 0; e < f; e++) {
                    let t = e * 4,
                        a = o[t],
                        c = o[t + 1],
                        f = o[t + 2],
                        p = o[t + 3];
                    if (f <= 0 || p <= 0) continue;
                    let h = Math.max(0, c),
                        g = Math.min(u, c + p),
                        _ = s.clamp((g - h) / Math.max(p, 1), 0, 1);
                    if (_ <= 0) continue;
                    let v = Math.max(0, d?.[e] ?? 1);
                    if (v <= 0) continue;
                    let y = (a + f * .5) / l * n,
                        b = (c + p * .5) / u * r,
                        x = m * v,
                        S = Math.sin(i * 1.7 + e * 1.91) * Math.abs(x) * .28,
                        ee = s.clamp(Math.min(f, p) * .045 * (n / l), 9, 23);
                    this.fluid.splat(y, b, S, -x * _, this.color, ee)
                }
            }
        }
        dispose() {
            this.disposed || this.disposeRequested || (this.disposeRequested = !0, this.activeCompile || this.disposeNow())
        }
        disposeNow() {
            this.disposed || (this.disposed = !0, this.fluid.dispose())
        }
    },
    $ = new WeakMap;

function ze(e, t) {
    let n = $.get(e);
    if (n) return n.refs++, n.fluid;
    let r = new Re(e, t);
    return $.set(e, {
        fluid: r,
        refs: 1
    }), r
}

function Be(e, t) {
    if (!e || !t) return;
    let n = $.get(e);
    !n || n.fluid !== t || (n.refs--, n.refs <= 0 && ($.delete(e), t.dispose()))
}

function Ve({
    fluid: e,
    fluidVelocityRef: t,
    driveFluid: i = !0,
    scrollVelocity: o = 0,
    motion: s
}) {
    let c = b(e => e.gl),
        l = b(e => e.size),
        u = ee(),
        d = e.simSize,
        f = e.dyeSize,
        p = (0, C.useMemo)(() => ze(c, {
            simSize: d,
            dyeSize: f
        }), [c]);
    (0, C.useEffect)(() => () => Be(c, p), [c, p]), (0, C.useEffect)(() => {
        e.enabled && p.resize(Math.max(1, l.width), Math.max(1, l.height))
    }, [e.enabled, p, l.height, l.width]);
    let m = a(),
        h = (0, C.useRef)(!1);
    (0, C.useEffect)(() => {
        if (!m || !e.enabled) return;
        let t = !1;
        return H(async () => {
            t || (await p.compileAsync(), !t && (p.update(1 / 60, {
                transitionRole: `solo`,
                pointer: {
                    x: 0,
                    y: 0
                },
                pointerActive: !1,
                scrollVelocity: 0
            }, {
                pointcloud: {
                    fluid: e
                }
            }, Math.max(1, l.width), Math.max(1, l.height), 0), t || (h.current = !0)))
        }, {
            visibilityAwareWatchdog: !0
        }).catch(e => {
            t || r(e, `FluidField.warmup`, {
                ...z(e)
            })
        }), () => {
            t = !0
        }
    }, [m, p]);
    let g = (0, C.useRef)(0),
        _ = (0, C.useRef)({
            transitionRole: `solo`,
            pointer: {
                x: 0,
                y: 0
            },
            pointerActive: !1,
            scrollVelocity: 0
        }),
        v = (0, C.useRef)(null);
    return x((r, a) => {
        if (!e.enabled) {
            t.current = null;
            return
        }
        let c = s?.current?.transition ?? 0;
        if (c <= -1 || c >= 1) {
            t.current = p.velocityTexture;
            return
        }
        let m = Math.min(a, 1 / 30);
        if (i && c >= 0 && c < 1 && h.current) {
            p.configure(d, f) && (p.reset(), g.current = 0), g.current += m;
            let r = _.current;
            r.pointer.x = u.current.x, r.pointer.y = u.current.y, r.pointerActive = u.current.active;
            let i = n.getState().preferReducedMotion;
            r.scrollVelocity = i ? 0 : s?.current?.scrollVelocity || o || M();
            let c = e;
            i && ((!v.current || v.current.src !== e) && (v.current = {
                src: e,
                out: {
                    ...e,
                    splatForce: e.splatForce * S
                }
            }), c = v.current.out), t.current = p.update(a, r, {
                pointcloud: {
                    fluid: c
                }
            }, Math.max(1, l.width), Math.max(1, l.height), g.current)
        } else t.current = p.velocityTexture
    }), null
}
export {
    R as a, z as i, H as n, M as o, F as r, Ve as t
};
//# sourceMappingURL=FluidField-CPsolzcx.js.map