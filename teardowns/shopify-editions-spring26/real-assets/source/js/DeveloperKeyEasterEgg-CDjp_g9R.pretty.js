const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/popupHandlerSingleton-Coaw9Etl.js", "assets/lenisManager-BuYlhEBR.js", "assets/useSectionStore-Sy0UOQiX.js", "assets/react-_Rk6hbya.js", "assets/rolldown-runtime-aKtaBQYM.js", "assets/react-Dvkprh6u.js", "assets/vanilla-DZJGj1NY.js", "assets/middleware-D_nWYfbo.js", "assets/useSectionRegistry-BcvkvUON.js", "assets/clamp-DM1hWUcE.js", "assets/useTierStore-edsQsT8s.js", "assets/PopupChannel-CKEOmnbs.js", "assets/popupWindow-BQxEzWgS.js"]))) => i.map(i => d[i]);
import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    t as n
} from "./preload-helper-OoqSwf-_.js";
import {
    t as r
} from "./jsx-runtime-DKdBMi_L.js";
import {
    t as i
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    n as a
} from "./useSectionStore-Sy0UOQiX.js";
import {
    t as o
} from "./useDriveActivation-bgDBaHtn.js";
import {
    n as s
} from "./SceneDataContext-BXyXjH22.js";
import {
    $a as c,
    Fi as l,
    Qa as u,
    Qi as d,
    U as f,
    eo as p
} from "./three.core-DVcoLpfz.js";
import {
    b as m,
    g as h
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as g
} from "./dist-4Ign8GoJ.js";
import {
    n as _
} from "./SheetContext-sekuEx_H.js";
import {
    n as v
} from "./ScenePresetsContext-CSn8bGed.js";
import {
    t as y
} from "./useTheatreObject-H4ZAcMv1.js";
import {
    a as b,
    i as x,
    n as S,
    t as C
} from "./PopupChannel-CKEOmnbs.js";
import {
    n as w,
    r as T,
    t as E
} from "./popupWindow-BQxEzWgS.js";
var D = e(t(), 1),
    O = g(),
    k = r(),
    A = {
        r: 173 / 255,
        g: 240 / 255,
        b: 1,
        a: 1
    };

function j(e, t) {
    return {
        ...Object.keys(e).length > 0 ? {
            targetScene: O.types.stringLiteral(t, e, {
                label: `Portal target`
            })
        } : {},
        visual: {
            color: O.types.rgba(A, {
                label: `color`
            }),
            borderWidth: O.types.number(.16, {
                range: [.02, .42],
                nudgeMultiplier: .005,
                label: `border width`
            }),
            borderBlur: O.types.number(.055, {
                range: [.005, .16],
                nudgeMultiplier: .002,
                label: `border softness`
            }),
            glowStrength: O.types.number(.08, {
                range: [0, .8],
                nudgeMultiplier: .01,
                label: `pulse glow`
            }),
            glowSize: O.types.number(.2, {
                range: [.04, .4],
                nudgeMultiplier: .005,
                label: `glow size`
            }),
            pulseSpeed: O.types.number(1.2, {
                range: [0, 6],
                nudgeMultiplier: .05,
                label: `pulse speed`
            }),
            bottomFadeMix: O.types.number(.55, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `bottom fade mix`
            }),
            noiseAmount: O.types.number(.18, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `noise amount`
            }),
            noiseScale: O.types.number(14, {
                range: [.1, 100],
                nudgeMultiplier: .5,
                label: `noise scale`
            }),
            noiseSpeed: O.types.number(.3, {
                range: [-8, 8],
                nudgeMultiplier: .01,
                label: `noise speed`
            })
        },
        popup: {
            openWithTheatre: O.types.boolean(!1, {
                label: `open with Theatre`
            }),
            theatreSheetSrc: O.types.string(``, {
                label: `Theatre sheet src`
            })
        }
    }
}

function M(e, t, n) {
    let r = t.getBoundingClientRect();
    n.x = (e.clientX - r.left) / r.width * 2 - 1, n.y = -((e.clientY - r.top) / r.height * 2 - 1)
}

function N(e, t, n) {
    let {
        camera: r,
        gl: i
    } = m(), o = (0, D.useRef)(!1), s = (0, D.useRef)(n);
    s.current = n, (0, D.useEffect)(() => {
        if (!e) return;
        let n = i.domElement,
            c = new l,
            d = new u,
            f = () => {
                let e = a.getState();
                return e.sectionHandles[e.interactiveSection] === t
            },
            p = t => (M(t, n, d), c.setFromCamera(d, r), c.intersectObject(e, !0).length > 0),
            m = e => {
                if (!f() || s.current.disabled?.()) {
                    o.current && (o.current = !1, s.current.onPointerLeave?.());
                    return
                }
                let t = p(e);
                t && !o.current ? (o.current = !0, s.current.onPointerEnter?.()) : !t && o.current && (o.current = !1, s.current.onPointerLeave?.())
            },
            h = e => {
                !f() || s.current.disabled?.() || p(e) && s.current.onClick?.(e)
            },
            g = () => {
                o.current && (o.current = !1, s.current.onPointerLeave?.())
            };
        return window.addEventListener(`pointermove`, m), window.addEventListener(`click`, h), window.addEventListener(`pointerleave`, g), () => {
            g(), window.removeEventListener(`pointermove`, m), window.removeEventListener(`click`, h), window.removeEventListener(`pointerleave`, g)
        }
    }, [r, i, t, e])
}

function P() {
    return typeof crypto < `u` && `randomUUID` in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function F() {
    return new d({
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        side: 2,
        blending: 2,
        toneMapped: !1,
        uniforms: {
            uColor: {
                value: new f(11399423)
            },
            uOpacity: {
                value: .65
            },
            uEdgeBlur: {
                value: .12
            },
            uMiddleFade: {
                value: .12
            },
            uSideFade: {
                value: new p
            },
            uBorderWidth: {
                value: .16
            },
            uBorderBlur: {
                value: .055
            },
            uGlowStrength: {
                value: .08
            },
            uGlowSize: {
                value: .2
            },
            uBottomFadeMix: {
                value: .55
            },
            uNoiseAmount: {
                value: .18
            },
            uNoiseScale: {
                value: 14
            },
            uNoiseSpeed: {
                value: .3
            },
            uHover: {
                value: 0
            },
            uPulse: {
                value: 0
            },
            uTime: {
                value: 0
            }
        },
        vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEdgeBlur;
      uniform float uMiddleFade;
      uniform vec4 uSideFade;
      uniform float uBorderWidth;
      uniform float uBorderBlur;
      uniform float uGlowStrength;
      uniform float uGlowSize;
      uniform float uBottomFadeMix;
      uniform float uNoiseAmount;
      uniform float uNoiseScale;
      uniform float uNoiseSpeed;
      uniform float uHover;
      uniform float uPulse;
      uniform float uTime;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        float centerDistance = length((vUv - 0.5) * 2.0) / 1.41421356;
        float middleFade = mix(1.0, smoothstep(0.0, 1.0, centerDistance), uMiddleFade);
        float noise = valueNoise(vUv * max(uNoiseScale, 0.0001) + vec2(uTime * uNoiseSpeed, -uTime * uNoiseSpeed * 0.37));
        float noiseMask = mix(1.0, smoothstep(0.12, 0.95, noise), clamp(uNoiseAmount, 0.0, 1.0));
        float pulseAmount = smoothstep(0.0, 0.24, clamp(uGlowStrength, 0.0, 1.0));
        float pulse = mix(1.0, 0.7 + uPulse * 0.45, pulseAmount);

        vec2 edgeUv = min(vUv, 1.0 - vUv);
        float edgeDistance = min(edgeUv.x, edgeUv.y);
        float bottomFadeMix = clamp(uBottomFadeMix, 0.0, 1.0);
        float noBottomFeatherDistance = min(edgeUv.x, 1.0 - vUv.y);
        float featherDistance = mix(edgeDistance, noBottomFeatherDistance, bottomFadeMix);
        float feather = smoothstep(0.0, max(uEdgeBlur, 0.0001), featherDistance);
        vec4 side = clamp(uSideFade, vec4(0.0), vec4(1.0));
        float sideFadeWithoutBottom = 1.0;
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, vUv.x), side.x);
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, 1.0 - vUv.x), side.y);
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, 1.0 - vUv.y), side.z);
        float sideFadeWithBottom = sideFadeWithoutBottom * mix(1.0, smoothstep(0.0, 1.0, vUv.y), side.w);
        float sideFade = mix(sideFadeWithBottom, sideFadeWithoutBottom, bottomFadeMix);

        float borderWidth = clamp(uBorderWidth, 0.001, 0.49);
        float borderBlur = max(uBorderBlur, 0.0001);
        float borderMask = 1.0 - smoothstep(borderWidth, borderWidth + borderBlur, edgeDistance);
        float glowMask = 1.0 - smoothstep(borderWidth, borderWidth + max(uGlowSize, 0.0001), edgeDistance);
        float pulseGlow = glowMask * clamp(uGlowStrength, 0.0, 1.0) * (0.25 + uPulse * 0.75);
        float fillAmount = clamp(uHover * 1.25, 0.0, 1.0);
        float shapeMask = mix(min(1.0, borderMask + pulseGlow), 1.0, fillAmount);

        float alpha = uOpacity * middleFade * noiseMask * pulse * shapeMask * (1.0 + uHover * 0.25);
        alpha *= feather * sideFade;
        gl_FragColor = vec4(uColor, alpha);
      }
    `
    })
}

function I({
    targetSceneHandle: e
}) {
    let t = _(),
        {
            camera: r,
            gl: a
        } = m(),
        {
            handle: l
        } = s(),
        u = v(),
        d = (0, D.useMemo)(() => {
            let e = u.filter(e => e.preset.pointcloud.sources.some(e => e.src.startsWith(`https://`)));
            return e.sort((e, t) => e.name.localeCompare(t.name)), Object.fromEntries(e.map(e => [e.name, e.name]))
        }, [u]),
        f = e?.trim(),
        p = (f && d[f] ? f : Object.keys(d)[0]) ?? ``,
        g = (0, D.useMemo)(() => j(d, p), [d, p]),
        O = (0, D.useRef)(null),
        M = (0, D.useRef)(null),
        I = (0, D.useRef)(null),
        L = (0, D.useMemo)(() => F(), []),
        [R, z] = (0, D.useState)(null),
        B = i(e => !!(e.isMobile || e.isLandscapeMobile || e.isTouchDevice)),
        V = (0, D.useRef)(B),
        H = (0, D.useRef)(!1),
        U = (0, D.useRef)(null),
        W = (0, D.useRef)(!1),
        G = (0, D.useRef)(``),
        K = (0, D.useRef)(1.2),
        q = (0, D.useRef)(e?.trim() || `race-track`),
        J = (0, D.useRef)(null),
        Y = (0, D.useRef)(new c),
        X = (0, D.useRef)(1),
        Z = (0, D.useRef)(0),
        Q = y(t, O, `key`, g);
    return (0, D.useEffect)(() => {
        if (!Q) return;
        let e = e => {
            let t = e.targetScene;
            T(l, t && d[t] ? t : q.current)
        };
        return e(Q.value), Q.onValuesChange(t => e(t))
    }, [Q, l, d]), (0, D.useEffect)(() => {
        let t = e?.trim();
        t && (q.current = t)
    }, [e]), (0, D.useEffect)(() => {
        V.current = B, B && (document.body.style.cursor = `auto`, Z.current = 0)
    }, [B]), (0, D.useEffect)(() => () => {
        L.dispose()
    }, [L]), (0, D.useEffect)(() => {
        z(I.current)
    }, []), (0, D.useEffect)(() => {
        if (!Q) return;
        let e = e => {
            W.current = e.popup?.openWithTheatre === !0, G.current = e.popup?.theatreSheetSrc?.trim() || ``;
            let t = e.visual?.color || A;
            L.uniforms.uColor.value.setRGB(t.r, t.g, t.b), L.uniforms.uOpacity.value = .65 * (t.a ?? 1), L.uniforms.uBorderWidth.value = e.visual?.borderWidth ?? .16, L.uniforms.uBorderBlur.value = e.visual?.borderBlur ?? .055, L.uniforms.uGlowStrength.value = e.visual?.glowStrength ?? .08, L.uniforms.uGlowSize.value = e.visual?.glowSize ?? .2, K.current = e.visual?.pulseSpeed ?? 1.2, L.uniforms.uBottomFadeMix.value = e.visual?.bottomFadeMix ?? .55, L.uniforms.uNoiseAmount.value = e.visual?.noiseAmount ?? .18, L.uniforms.uNoiseScale.value = e.visual?.noiseScale ?? 14, L.uniforms.uNoiseSpeed.value = e.visual?.noiseSpeed ?? .3
        };
        return e(Q.value), Q.onValuesChange(t => {
            e(t)
        })
    }, [Q, L]), (0, D.useEffect)(() => {
        let e = x.on(C.WEBRTC_READY, e => {
                !e.sessionId || e.sessionId !== U.current || (H.current = !0, x.send(C.KEY_ANIMATED_OUT, {
                    time: Date.now()
                }))
            }),
            t = x.on(C.POPUP_CLOSED, e => {
                !e.sessionId || e.sessionId !== U.current || (H.current = !1, U.current = null, S(e.sessionId))
            });
        return () => {
            e(), t()
        }
    }, []), N(R, l, {
        disabled: () => H.current || V.current,
        onClick: (0, D.useCallback)(e => {
            o.getState().activate();
            let t = w(l, q.current);
            q.current = t;
            let r = P(),
                i = {
                    clientX: J.current?.clientX ?? e.clientX,
                    clientY: J.current?.clientY ?? e.clientY,
                    openWithTheatre: W.current,
                    theatreSheetSrc: G.current,
                    targetSceneHandle: t,
                    sourceSectionHandle: l,
                    sessionId: r
                },
                a = E(i);
            a && (window.__easterEggPopupWindow = a, window.__easterEggPopupOptions = i, U.current = r, b(r), window.dispatchEvent(new CustomEvent(`developer-drive-scene-target`, {
                detail: {
                    handle: t,
                    sectionHandle: l,
                    sessionId: r
                }
            })), x.send(C.DRIVE_SCENE_REVEAL, {
                sessionId: r,
                handle: t,
                sectionHandle: l,
                progress: 0
            }), n(async () => {
                let {
                    initPopupHandler: e,
                    isPopupHandlerInitialized: t
                } = await import(`./popupHandlerSingleton-Coaw9Etl.js`);
                return {
                    initPopupHandler: e,
                    isPopupHandlerInitialized: t
                }
            }, __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).then(({
                initPopupHandler: e,
                isPopupHandlerInitialized: t
            }) => {
                let n = t();
                e(), n && window.dispatchEvent(new CustomEvent(`open-popup`, {
                    detail: i
                }))
            }).catch(() => {}))
        }, [l]),
        onPointerEnter: (0, D.useCallback)(() => {
            document.body.style.cursor = `pointer`, Z.current = 1
        }, []),
        onPointerLeave: (0, D.useCallback)(() => {
            document.body.style.cursor = `auto`, Z.current = 0
        }, [])
    }), h(({
        clock: e
    }, t) => {
        let n = M.current,
            i = O.current;
        if (!n || !i || V.current) return;
        i.getWorldPosition(Y.current), Y.current.project(r);
        let o = a.domElement.getBoundingClientRect();
        J.current = {
            clientX: o.left + (Y.current.x + 1) / 2 * o.width,
            clientY: o.top + (1 - Y.current.y) / 2 * o.height
        };
        let s = +!H.current;
        X.current += (s - X.current) * Math.min(1, t * 12), n.scale.setScalar(X.current), n.rotation.y += (0 - n.rotation.y) * Math.min(1, t * 6);
        let c = K.current <= 0 ? .5 : .5 + .5 * Math.sin(e.elapsedTime * K.current * Math.PI * 2);
        L.uniforms.uTime.value = e.elapsedTime, L.uniforms.uPulse.value = c, L.uniforms.uHover.value += (Z.current * .8 - L.uniforms.uHover.value) * Math.min(1, t * 8)
    }), B ? null : (0, k.jsx)(`group`, {
        ref: O,
        name: `key`,
        position: [.8, -.2, 1.2],
        rotation: [.2, -.5, .15],
        scale: [.7, .7, .7],
        children: (0, k.jsx)(`group`, {
            ref: M,
            children: (0, k.jsxs)(`mesh`, {
                ref: I,
                scale: [1.65, .92, 1],
                renderOrder: 10,
                children: [(0, k.jsx)(`planeGeometry`, {
                    args: [1, 1]
                }), (0, k.jsx)(`primitive`, {
                    attach: `material`,
                    object: L
                })]
            })
        })
    })
}
export {
    I as DeveloperKeyEasterEgg
};
//# sourceMappingURL=DeveloperKeyEasterEgg-CDjp_g9R.js.map