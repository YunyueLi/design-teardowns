const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/TheatreContext-BNWtaD1m.js", "assets/rolldown-runtime-aKtaBQYM.js", "assets/react-Dvkprh6u.js", "assets/jsx-runtime-DKdBMi_L.js", "assets/dist-4Ign8GoJ.js", "assets/dist-D4DOwfAL.js", "assets/deploy-urls-C_mnVA4y.js", "assets/dist-DJQtccsE.js", "assets/extension-B64hPBES.js"]))) => i.map(i => d[i]);
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
} from "./react-_Rk6hbya.js";
import {
    t as a
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    i as o,
    o as s,
    r as c,
    s as l,
    t as u
} from "./useSectionRegistry-BcvkvUON.js";
import {
    n as d,
    t as f
} from "./useAssetLoadingStore-BjdwlLYn.js";
import {
    c as p,
    l as m,
    n as h,
    t as g
} from "./sectionModels-CqSyktdl.js";
import {
    l as _,
    m as v,
    p as y,
    t as b
} from "./presets-BdwQB_Rb.js";
import {
    i as x
} from "./dpr-CfAtMFij.js";
import {
    n as S
} from "./useSectionStore-Sy0UOQiX.js";
import {
    n as C
} from "./SceneDataContext-BXyXjH22.js";
import {
    g as w
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as T
} from "./dist-4Ign8GoJ.js";
import {
    t as ee
} from "./SheetContext-sekuEx_H.js";
import {
    a as E,
    n as D,
    o as O,
    s as k
} from "./deploy-urls-C_mnVA4y.js";
import {
    t as A
} from "./useTheatreDebugStore-wm7Y6xYi.js";
import {
    s as j,
    t as te
} from "./useTheatreSectionHeight-BiKzbPmf.js";
import {
    a as M,
    i as N,
    n as ne,
    o as re,
    r as ie,
    t as ae
} from "./SectionScene-CdHDCaCs.js";
import {
    o as oe
} from "./FluidField-CPsolzcx.js";
import {
    n as se
} from "./sceneTimeScale-DgHP24AK.js";
import {
    c as ce,
    d as le,
    p as ue
} from "./cameraAnimations-dhQqw_sV.js";
import {
    n as P
} from "./ScenePresetsContext-CSn8bGed.js";
var F = e(t(), 1),
    I = (0, F.createContext)(null),
    L = r();

function de({
    children: e,
    stateUrl: t,
    dynamicContent: n = !1
}) {
    let r = (0, F.useRef)(null),
        i = (0, F.useRef)(e);
    i.current = e;
    let a = (0, F.useContext)(I);
    return (0, F.useEffect)(() => {
        let e = r.current?.parentElement;
        if (!e) return;
        u.getState().register(e, i.current, t);
        let n = a?.(e);
        return () => {
            u.getState().unregister(e), n?.()
        }
    }, [t, a]), (0, F.useEffect)(() => {
        if (!n) return;
        let i = r.current?.parentElement;
        i && u.getState().register(i, e, t)
    }, [n, e, t]), (0, L.jsx)(`span`, {
        ref: r,
        hidden: !0
    })
}
var R = T();

function fe() {
    return typeof window > `u` ? !1 : new URL(window.location.href).searchParams.has(`theatre`)
}
var z = {
        definitionVersion: O,
        revisionHistory: [],
        sheetsById: {}
    },
    pe = null;

function me() {
    return pe ||= (0, R.getProject)(k, {
        state: z
    }), pe
}

function he(e) {
    let t = me();
    return {
        sheet: t.sheet(e),
        project: t
    }
}
var B = new Map;

function ge(e) {
    let t = B.get(e);
    if (t) return t;
    let n = (async () => {
        let t = await fetch(e);
        if (!t.ok) throw Error(`Failed to load Theatre state from ${e}`);
        return await t.json()
    })();
    return n.catch(() => {
        B.get(e) === n && B.delete(e)
    }), B.set(e, n), n
}
async function _e(e, t, r = fe()) {
    if (r) {
        let {
            initTheatre: t
        } = await n(async () => {
            let {
                initTheatre: e
            } = await import(`./TheatreContext-BNWtaD1m.js`);
            return {
                initTheatre: e
            }
        }, __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8])), {
            project: r
        } = await t();
        return {
            sheet: r.sheet(e),
            project: r
        }
    }
    let i = await ge(t),
        a = i.sheetsById,
        o = {
            ...i,
            ...a ? {
                sheetsById: {
                    ...a
                }
            } : {}
        };
    if (a && !a[e]) {
        let t = Object.keys(a);
        t.length === 1 && (o.sheetsById = {
            [e]: a[t[0]]
        })
    }
    let s = (0, R.getProject)(e, {
        state: o
    });
    return {
        sheet: s.sheet(e),
        project: s
    }
}
var V = !1;

function ve(e, t) {
    typeof window > `u` || t && (V || (V = !0, n(async () => {
        let {
            initVersionControlExtension: e
        } = await import(`./extension-B64hPBES.js`);
        return {
            initVersionControlExtension: e
        }
    }, __vite__mapDeps([8, 1, 6, 7, 5])).then(({
        initVersionControlExtension: t
    }) => {
        t(e)
    })))
}
var ye = .5,
    be = `__S26_THEATRE_CLIENT_ENABLED__`;

function xe() {
    if (typeof window > `u` || window[be] !== !0) return {
        edit: !1,
        debug: !1
    };
    let e = new URL(window.location.href).searchParams;
    return {
        edit: e.has(`theatre`),
        debug: e.has(`theatre-debug`)
    }
}

function Se({
    name: e,
    stateUrl: t,
    sectionIndex: n,
    sequenceLength: r = 10,
    syncSequence: i = !0,
    playIntroTimeline: o = !1
}) {
    t && D(e, t);
    let s = (0, F.useCallback)(e => Math.max(0, e * r), [r]),
        [c, l] = (0, F.useState)(n),
        u = (0, F.useRef)(e);
    u.current = e, (0, F.useEffect)(() => {
        if (n !== void 0) {
            l(n);
            return
        }
        let e = e => {
            let t = e.indexOf(u.current);
            l(t >= 0 ? t : void 0)
        };
        return e(S.getState().sectionHandles), S.subscribe(e => e.sectionHandles, e)
    }, [e, n]);
    let f = (0, F.useMemo)(xe, []),
        p = f.edit || f.debug,
        m = (0, F.useRef)(null),
        h = (0, F.useMemo)(() => p ? null : he(e), [e, p]);
    (0, F.useEffect)(() => {
        h && (p && c !== void 0 && A.getState().setSheet(c, {
            name: e,
            sectionIndex: c,
            loaded: !0,
            sequencePosition: 0
        }), ve(h.project, f.edit), !p && !t && j.getState().markReady(e))
    }, [h, c, e, p, t, f.edit]);
    let [g, _] = (0, F.useState)(null);
    (0, F.useEffect)(() => {
        if (!p && !t) return;
        let n = !0,
            r = null;
        return p && c !== void 0 && A.getState().setSheet(c, {
            name: e,
            sectionIndex: c,
            loaded: !1,
            sequencePosition: 0
        }), _e(e, t ?? ``, f.edit).then(({
            sheet: t,
            project: i
        }) => {
            n && (p && c !== void 0 && A.getState().setSheet(c, {
                name: e,
                sectionIndex: c,
                loaded: !0,
                sequencePosition: t.sequence?.position ?? 0
            }), ve(i, f.edit), _(t), r = requestAnimationFrame(() => {
                r = null, n && j.getState().markReady(e)
            }))
        }).catch(t => {
            console.error(`[useTheatre] sheet "${e}":`, t), n && j.getState().markReady(e)
        }), () => {
            n = !1, r !== null && cancelAnimationFrame(r)
        }
    }, [e, t, c, p, f.edit]);
    let v = g ?? h?.sheet ?? null;
    return (0, F.useEffect)(() => {
        if (!(!p || c === void 0)) return S.getState().activeSection === c && E(e), S.subscribe(e => e.activeSection, t => {
            t === c && E(e)
        })
    }, [p, c, e]), (0, F.useEffect)(() => {
        if (!i || !v?.sequence || c === void 0) return;
        let t = c,
            n = null,
            r = null,
            l = null,
            u = null,
            f = performance.now();
        (m.current?.name !== e || m.current.playIntroTimeline !== o) && (m.current = {
            name: e,
            playIntroTimeline: o,
            shouldPlay: o && (typeof window > `u` || window.scrollY < window.innerHeight)
        });
        let p = m.current.shouldPlay,
            h = !p && Number.isFinite(v.sequence.position) ? v.sequence.position : 0,
            g = h,
            _ = !1,
            y = !p,
            b = d.getState().isLoadingComplete,
            x = e => {
                h = e, v.sequence.position = e
            },
            C = () => {
                n !== null && (cancelAnimationFrame(n), n = null)
            },
            w = () => {
                r !== null && (cancelAnimationFrame(r), r = null)
            },
            T = e => {
                if (n = null, !re()) {
                    x(g);
                    return
                }
                let t = (e - f) / 1e3;
                f = e, h = M(h, g, t), Math.abs(g - h) < .001 && (h = g), v.sequence.position = h, h !== g && (n = requestAnimationFrame(T))
            },
            ee = () => {
                n === null && (f = performance.now(), n = requestAnimationFrame(T))
            },
            E = () => a.getState().preferReducedMotion === !0,
            D = e => {
                y = !0, _ = !0, x(e), A(S.getState().sectionProgress[t])
            },
            O = e => {
                if (r = null, y) return;
                if (!b) {
                    x(0);
                    return
                }
                if (E()) {
                    D(g);
                    return
                }
                l ??= e - h * 1e3, u ??= g;
                let t = Math.min(u, (e - l) / 1e3);
                if (x(t), t < u - .001) {
                    r = requestAnimationFrame(O);
                    return
                }
                D(u)
            },
            k = () => {
                r !== null || y || (C(), r = requestAnimationFrame(O))
            };
        p && (v.sequence.position = 0);
        let A = e => {
                if (e === void 0) return;
                let t = E() && !o ? ye : e;
                if (g = s(t), !y) {
                    if (!b) {
                        x(0);
                        return
                    }
                    k();
                    return
                }
                if (!_) {
                    _ = !0, x(g);
                    return
                }
                if (!re()) {
                    C(), x(g);
                    return
                }
                ee()
            },
            j = e => {
                b = e, A(S.getState().sectionProgress[t])
            };
        A(S.getState().sectionProgress[t]);
        let te = S.subscribe(e => e.sectionProgress[t], A),
            N = p ? d.subscribe(e => e.isLoadingComplete, j) : void 0;
        return () => {
            te(), N?.(), C(), w()
        }
    }, [v, c, s, i, o, e]), v
}

function Ce(e) {
    return JSON.parse(JSON.stringify(e))
}

function H(e, t, n) {
    let [r, i] = (0, F.useState)(null);
    return (0, F.useEffect)(() => {
        if (!e || !t) return;
        let r = e.object(t, n, {
            reconfigure: !0
        });
        i(Ce(r.value));
        let a = r.onValuesChange(e => {
            i(Ce(e))
        });
        return () => {
            a(), e.detachObject(t)
        }
    }, [e, t, n]), r
}
var we = `pointcloud`,
    Te = `Camera`,
    Ee = `Scene`,
    De = `Postprocessing`,
    Oe = `Backdrop`,
    ke = `Intro Transition`,
    Ae = {},
    U = i(() => ({
        byHandle: {}
    }));

function je(e, t) {
    let n = U.getState().byHandle[e] ?? {},
        r = {
            ...n,
            ...t
        };
    n.cameraDollyOffset !== r.cameraDollyOffset && U.setState(t => ({
        byHandle: {
            ...t.byHandle,
            [e]: r
        }
    }))
}

function Me(e) {
    return U(t => t.byHandle[e] ?? Ae)
}
var Ne = .56,
    Pe = {
        opacity: R.types.number(0, {
            nudgeMultiplier: .01,
            range: [0, 1]
        })
    },
    W = {
        opacity: 0,
        fadeStartProgress: .39,
        fadeEndProgress: .54,
        width: 1,
        height: 1,
        rounded: 0,
        blur: .08,
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }
    },
    Fe = {
        heroBottomGradient: R.types.compound({
            fadeStartProgress: R.types.number(W.fadeStartProgress, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Gradient fade start`
            }),
            fadeEndProgress: R.types.number(W.fadeEndProgress, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Gradient fade end`
            }),
            width: R.types.number(W.width, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Gradient width`
            }),
            height: R.types.number(W.height, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Gradient height`
            }),
            rounded: R.types.number(W.rounded, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Gradient rounded`
            }),
            blur: R.types.number(W.blur, {
                range: [0, 1],
                nudgeMultiplier: .001,
                label: `Gradient blur`
            }),
            color: R.types.rgba(W.color, {
                label: `Gradient color`
            })
        })
    },
    Ie = {},
    G = {
        ...N,
        enabled: !0
    },
    Le = {
        enabled: R.types.boolean(G.enabled),
        progress: R.types.number(G.progress, {
            range: [0, 1],
            nudgeMultiplier: .01,
            label: `Progress`
        }),
        glowIntensity: R.types.number(G.glowIntensity, {
            range: [0, 5],
            nudgeMultiplier: .1,
            label: `Glow intensity`
        }),
        feather: R.types.number(G.feather, {
            range: [1, 160],
            nudgeMultiplier: 1,
            label: `Feather`
        }),
        warpStrength: R.types.number(G.warpStrength, {
            range: [-1, 1],
            nudgeMultiplier: .01,
            label: `Warp strength`
        }),
        noiseAmount: R.types.number(G.noiseAmount, {
            range: [0, 120],
            nudgeMultiplier: 1,
            label: `Noise amount`
        }),
        noiseScale: R.types.number(G.noiseScale, {
            range: [.25, 12],
            nudgeMultiplier: .1,
            label: `Noise scale`
        }),
        center: R.types.compound({
            x: R.types.number(G.center.x, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Center X`
            }),
            y: R.types.number(G.center.y, {
                range: [0, 1],
                nudgeMultiplier: .01,
                label: `Center Y`
            })
        }),
        glowColor: R.types.rgba(G.glowColor, {
            label: `Glow color`
        }),
        bgColor: R.types.rgba(G.bgColor, {
            label: `Background color`
        })
    };

function K(e, t) {
    return t ? [(e?.[0] ?? 0) + t[0], (e?.[1] ?? 0) + t[1], (e?.[2] ?? 0) + t[2]] : e
}

function Re({
    handle: e,
    defaultPresetName: t,
    defaultTransition: n,
    overridePresetName: r,
    cameraOffsetOverride: i,
    cameraDollyTransitionOffset: a,
    defaultCameraDollyDistance: o,
    defaultCameraDollyTransitionDistance: s,
    mousePointerEnabled: c,
    children: l
}) {
    return (0, L.jsx)(ze, {
        handle: e,
        scenePresets: P(),
        defaultPresetName: t,
        defaultTransition: n,
        overridePresetName: r,
        cameraOffsetOverride: i,
        cameraDollyTransitionOffset: a,
        defaultCameraDollyDistance: o,
        defaultCameraDollyTransitionDistance: s,
        mousePointerEnabled: c,
        children: l
    })
}

function ze({
    handle: e,
    scenePresets: t,
    defaultPresetName: n,
    defaultTransition: r,
    overridePresetName: i,
    cameraOffsetOverride: a,
    cameraDollyTransitionOffset: c,
    defaultCameraDollyDistance: l,
    defaultCameraDollyTransitionDistance: d,
    mousePointerEnabled: S,
    children: T
}) {
    let E = e === h,
        D = C(),
        O = Me(e),
        k = se(),
        A = Se({
            name: e,
            stateUrl: D.stateUrl,
            playIntroTimeline: E
        }),
        j = (0, F.useMemo)(() => {
            let e = t.filter(e => e.preset.pointcloud.sources.some(e => e.src.startsWith(`https://`)));
            return e.sort((e, t) => e.name.localeCompare(t.name)), Object.fromEntries(e.map(e => [e.name, e.name]))
        }, [t]),
        N = n && j[n] ? n : ``,
        P = H(A, Ee, (0, F.useMemo)(() => ({
            preset: R.types.stringLiteral(N, j, {
                label: `Preset`
            }),
            sceneTransform: R.types.compound({
                position: R.types.compound({
                    x: R.types.number(0, {
                        nudgeMultiplier: .01
                    }),
                    y: R.types.number(0, {
                        nudgeMultiplier: .01
                    }),
                    z: R.types.number(0, {
                        nudgeMultiplier: .01
                    })
                }),
                rotation: R.types.compound({
                    x: R.types.number(0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    }),
                    y: R.types.number(0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    }),
                    z: R.types.number(0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    })
                })
            }, {
                label: `Transform`
            }),
            particle: R.types.compound({
                exposure: R.types.number(0, {
                    range: [-2, 2],
                    nudgeMultiplier: .05,
                    label: `Exposure`
                }),
                sizeScale: R.types.number(1, {
                    range: [.1, 4],
                    nudgeMultiplier: .05,
                    label: `Size`
                }),
                randomize: R.types.compound({
                    x: R.types.number(0, {
                        range: [0, 2],
                        nudgeMultiplier: .01,
                        label: `X`
                    }),
                    y: R.types.number(0, {
                        range: [0, 2],
                        nudgeMultiplier: .01,
                        label: `Y`
                    }),
                    z: R.types.number(0, {
                        range: [0, 2],
                        nudgeMultiplier: .01,
                        label: `Z`
                    })
                }, {
                    label: `Random`
                })
            }, {
                label: `Particle`
            }),
            background: R.types.compound({
                darken: R.types.number(0, {
                    range: [0, 1],
                    nudgeMultiplier: .01,
                    label: `Bg dark`
                })
            }, {
                label: `Background`
            }),
            lightVolumes: R.types.compound({
                backgroundOpacity: R.types.number(1, {
                    range: [0, 3],
                    nudgeMultiplier: .01,
                    label: `BG op`
                }),
                foregroundOpacity: R.types.number(1, {
                    range: [0, 3],
                    nudgeMultiplier: .01,
                    label: `FG op`
                })
            }, {
                label: `Light vols`
            }),
            afterimage: R.types.compound({
                scrollFadeLerp: R.types.number(m.afterimageScrollFadeLerp, {
                    range: p,
                    nudgeMultiplier: .1,
                    label: `Scroll fade lerp`
                })
            }, {
                label: `After-image`
            }),
            fboDpr: R.types.compound({
                background: R.types.number(b.background, {
                    range: [.05, 2],
                    nudgeMultiplier: .05
                }),
                main: R.types.number(b.main, {
                    range: [.05, 2],
                    nudgeMultiplier: .05
                }),
                foreground: R.types.number(b.foreground, {
                    range: [.05, 2],
                    nudgeMultiplier: .05
                })
            }, {
                label: `FBO DPR`
            })
        }), [N, j])),
        I = i ?? P?.preset ?? N,
        de = (0, F.useMemo)(() => {
            let e = new Map;
            for (let n of t) e.set(n.name, n.preset);
            return e
        }, [t]).get(I) ?? g,
        fe = x(),
        z = (0, F.useMemo)(() => {
            let e = fe === `low`,
                t = y(de, e);
            return e ? v(t, _) : t
        }, [de, fe]),
        pe = H(A, E ? De : void 0, E ? Fe : Ie),
        me = H(A, E ? Oe : void 0, Pe),
        he = H(A, E ? ke : void 0, Le),
        B = pe?.heroBottomGradient,
        ge = (0, F.useMemo)(() => {
            if (E) return {
                opacity: me?.opacity ?? W.opacity,
                fadeStartProgress: B?.fadeStartProgress ?? W.fadeStartProgress,
                fadeEndProgress: B?.fadeEndProgress ?? W.fadeEndProgress,
                width: B?.width ?? W.width,
                height: B?.height ?? W.height,
                rounded: B?.rounded ?? W.rounded,
                blur: B?.blur ?? W.blur,
                color: B?.color ?? W.color
            }
        }, [E, me?.opacity, B?.fadeStartProgress, B?.fadeEndProgress, B?.width, B?.height, B?.rounded, B?.blur, B?.color]),
        _e = (0, F.useMemo)(() => ({
            ...ie(z),
            afterimageScrollFadeLerp: P?.afterimage?.scrollFadeLerp ?? m.afterimageScrollFadeLerp,
            heroBottomGradient: ge,
            introTransition: E ? he ?? G : void 0
        }), [ge, he, E, z, P?.afterimage?.scrollFadeLerp]),
        V = H(A, Te, (0, F.useMemo)(() => ({
            animation: R.types.stringLiteral(z.camera.animation ?? `scrollDrift`, Object.fromEntries(le.map(e => [e, e])), {
                label: `Animation`
            }),
            positionOffset: R.types.compound({
                x: R.types.number(z.camera.positionOffset?.[0] ?? 0, {
                    nudgeMultiplier: .01
                }),
                y: R.types.number(z.camera.positionOffset?.[1] ?? 0, {
                    nudgeMultiplier: .01
                }),
                z: R.types.number(z.camera.positionOffset?.[2] ?? 0, {
                    nudgeMultiplier: .01
                })
            }, {
                label: `position offset`
            }),
            rotationOffset: R.types.compound({
                x: R.types.number(z.camera.rotationOffset?.[0] ?? 0, {
                    range: [-Math.PI, Math.PI],
                    nudgeMultiplier: .01
                }),
                y: R.types.number(z.camera.rotationOffset?.[1] ?? 0, {
                    range: [-Math.PI, Math.PI],
                    nudgeMultiplier: .01
                }),
                z: R.types.number(z.camera.rotationOffset?.[2] ?? 0, {
                    range: [-Math.PI, Math.PI],
                    nudgeMultiplier: .01
                })
            }, {
                label: `rotation offset`
            }),
            scrollDrift: R.types.compound({
                up: R.types.number(z.camera.scrollDrift?.up ?? ue.up, {
                    range: [-1, 1],
                    nudgeMultiplier: .01
                }),
                back: R.types.number(z.camera.scrollDrift?.back ?? ue.back, {
                    range: [-1, 1],
                    nudgeMultiplier: .01
                }),
                backgroundVolumeScrollScrub: R.types.number(0, {
                    range: [-12, 12],
                    nudgeMultiplier: .05,
                    label: `BG volume scrub`
                }),
                foregroundVolumeScrollScrub: R.types.number(0, {
                    range: [-12, 12],
                    nudgeMultiplier: .05,
                    label: `FG volume scrub`
                })
            }, {
                label: `scroll drift`
            }),
            fov: R.types.number(z.camera.fov ?? 50, {
                range: [10, 120],
                nudgeMultiplier: 1
            }),
            mobile: R.types.compound({
                fov: R.types.number(z.camera.mobileFov ?? ce(z.camera.fov), {
                    range: [10, 120],
                    nudgeMultiplier: 1,
                    label: `FOV`
                }),
                position: R.types.compound({
                    x: R.types.number(z.camera.mobilePositionOffset?.[0] ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    y: R.types.number(z.camera.mobilePositionOffset?.[1] ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    z: R.types.number(z.camera.mobilePositionOffset?.[2] ?? 0, {
                        nudgeMultiplier: .01
                    })
                }),
                rotation: R.types.compound({
                    x: R.types.number(z.camera.mobileRotationOffset?.[0] ?? 0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    }),
                    y: R.types.number(z.camera.mobileRotationOffset?.[1] ?? 0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    }),
                    z: R.types.number(z.camera.mobileRotationOffset?.[2] ?? 0, {
                        range: [-Math.PI, Math.PI],
                        nudgeMultiplier: .01
                    })
                })
            }, {
                label: `mobile`
            }),
            clickDollyDistance: R.types.number(l ?? 0, {
                range: [0, 10],
                nudgeMultiplier: .05,
                label: `Dolly distance`
            }),
            revealDollyDistance: R.types.number(d ?? 0, {
                range: [0, 10],
                nudgeMultiplier: .05,
                label: `Reveal dolly distance`
            })
        }), [l, d, z])),
        ve = (0, F.useMemo)(() => {
            let e = V ? [V.positionOffset.x, V.positionOffset.y, V.positionOffset.z] : z.camera.positionOffset,
                t = V ? [V.rotationOffset.x, V.rotationOffset.y, V.rotationOffset.z] : z.camera.rotationOffset;
            return V ? {
                position: z.camera.position,
                target: z.camera.target,
                animation: V.animation,
                fov: V.fov,
                mobileFov: V.mobile.fov,
                positionOffset: K(e, a?.positionOffset),
                mobilePositionOffset: K([V.mobile.position.x, V.mobile.position.y, V.mobile.position.z], a?.positionOffset),
                rotationOffset: K(t, a?.rotationOffset),
                mobileRotationOffset: K([V.mobile.rotation.x, V.mobile.rotation.y, V.mobile.rotation.z], a?.rotationOffset),
                pointerInfluence: z.camera.pointerInfluence,
                scrollDrift: V.scrollDrift
            } : {
                position: z.camera.position,
                target: z.camera.target,
                animation: z.camera.animation ?? `scrollDrift`,
                fov: z.camera.fov,
                mobileFov: z.camera.mobileFov,
                positionOffset: K(e, a?.positionOffset),
                mobilePositionOffset: K(z.camera.mobilePositionOffset, a?.positionOffset),
                rotationOffset: K(t, a?.rotationOffset),
                mobileRotationOffset: K(z.camera.mobileRotationOffset, a?.rotationOffset),
                pointerInfluence: z.camera.pointerInfluence,
                scrollDrift: z.camera.scrollDrift
            }
        }, [a, V, z]),
        ye = O.cameraDollyOffset,
        be = c,
        xe = Math.sign(ye ?? 0) * (V?.clickDollyDistance ?? l ?? Math.abs(ye ?? 0)),
        Ce = Math.sign(be ?? 0) * (V?.revealDollyDistance ?? d ?? Math.abs(be ?? 0)),
        [Ae] = (0, F.useState)(() => {
            let e = u.getState().sections.get(D.element);
            return {
                transition: e?.transition ?? -1,
                progress: e?.progress ?? 0,
                scrollVelocity: 0,
                screenOffset: e?.screenOffset ?? 0
            }
        }),
        U = (0, F.useRef)(Ae),
        je = (0, F.useRef)(!0);
    (0, F.useEffect)(() => {
        let e = D.element,
            t = new IntersectionObserver(e => {
                for (let t of e) {
                    if (je.current = t.isIntersecting, t.isIntersecting) continue;
                    let e = U.current,
                        n = o(D.element);
                    e.transition = n.transition, e.progress = n.progress, e.screenOffset = n.screenOffset, e.scrollVelocity = 0
                }
            }, {
                rootMargin: `100% 0px`
            });
        return t.observe(e), () => t.disconnect()
    }, [D.element]), w((e, t) => {
        if (!je.current) return;
        let n = u.getState();
        if (n.exclusiveCoverActive && n.exclusiveOverlayElement !== D.element) {
            U.current.transition = 1, U.current.scrollVelocity = 0;
            return
        }
        let r = o(D.element),
            i = U.current;
        i.scrollVelocity = oe();
        let a = s(D.element, r.transition);
        re() ? (i.transition = M(i.transition, a, t), i.progress = M(i.progress, r.progress, t), i.screenOffset = M(i.screenOffset, r.screenOffset, t)) : (i.transition = a, i.progress = r.progress, i.screenOffset = r.screenOffset)
    }, -2), (0, F.useEffect)(() => (f.getState().declareExpectedAssets(e, [we]), () => f.getState().clearHandle(e)), [e]);
    let Re = (0, F.useCallback)(() => {
            f.getState().markAssetLoaded(e, we)
        }, [e]),
        ze = (0, F.useCallback)(() => {
            f.getState().markAssetLoaded(e, we)
        }, [e]),
        q = P?.sceneTransform?.position.x,
        J = P?.sceneTransform?.position.y,
        Y = P?.sceneTransform?.position.z,
        X = P?.sceneTransform?.rotation.x,
        Z = P?.sceneTransform?.rotation.y,
        Q = P?.sceneTransform?.rotation.z,
        Be = (0, F.useMemo)(() => {
            if (!(q === void 0 || J === void 0 || Y === void 0 || X === void 0 || Z === void 0 || Q === void 0)) return {
                position: [q, J, Y],
                rotation: [X, Z, Q]
            }
        }, [q, J, Y, X, Z, Q]),
        Ve = (0, F.useMemo)(() => {
            let e = ne(z),
                t = P?.particle,
                n = e.randomize ?? [0, 0, 0];
            return {
                ...e,
                timeScale: e.timeScale * k,
                exposure: t?.exposure ?? e.exposure,
                pointSizeScale: (e.pointSizeScale ?? 1) * (t?.sizeScale ?? 1),
                randomize: [n[0] + (t?.randomize?.x ?? 0), n[1] + (t?.randomize?.y ?? 0), n[2] + (t?.randomize?.z ?? 0)]
            }
        }, [k, z, P?.particle]),
        $ = V?.scrollDrift.backgroundVolumeScrollScrub ?? 0,
        He = V?.scrollDrift.foregroundVolumeScrollScrub ?? 0,
        Ue = (0, F.useMemo)(() => z.videoLightVolume ? {
            ...z.videoLightVolume,
            opacity: z.videoLightVolume.opacity * (P?.lightVolumes?.backgroundOpacity ?? 1),
            scrollVelocityScrub: $,
            timeScale: (z.videoLightVolume.timeScale ?? 1) * k
        } : null, [$, k, z.videoLightVolume, P?.lightVolumes?.backgroundOpacity]),
        We = (0, F.useMemo)(() => z.foregroundVideoLightVolume ? {
            ...z.foregroundVideoLightVolume,
            opacity: z.foregroundVideoLightVolume.opacity * (P?.lightVolumes?.foregroundOpacity ?? 1),
            scrollVelocityScrub: He,
            timeScale: (z.foregroundVideoLightVolume.timeScale ?? 1) * k
        } : null, [k, He, z.foregroundVideoLightVolume, P?.lightVolumes?.foregroundOpacity]);
    return (0, L.jsxs)(L.Fragment, {
        children: [(0, L.jsx)(te, {
            sheet: A,
            handle: e,
            defaultSwipeFeather: E ? Ne : void 0,
            defaultTransition: r
        }), (0, L.jsx)(ae, {
            preset: z,
            camera: ve,
            sceneTransform: Be,
            postprocessing: _e,
            pointCloud: Ve,
            cameraDollyOffset: xe,
            cameraDollyTransitionOffset: Ce,
            backgroundDarken: P?.background?.darken ?? 0,
            dryLayerMsaa: !E,
            videoLightVolume: Ue,
            foregroundVideoLightVolume: We,
            motion: U,
            fboDpr: P?.fboDpr ?? b,
            loadingHandle: e,
            onPointCloudLoad: Re,
            onPointCloudError: ze,
            mousePointerEnabled: S,
            subSceneContent: T ? (0, L.jsx)(ee.Provider, {
                value: A,
                children: T
            }) : void 0
        })]
    })
}
var q = -1,
    J = 0,
    Y = -.999,
    X = `sectionRevealDirection`,
    Z = {
        x1: .33,
        y1: 1,
        x2: .68,
        y2: 1
    };

function Q(e, t, n) {
    let r = 1 - e;
    return 3 * r * r * e * t + 3 * r * e * e * n + e * e * e
}

function Be(e, t, n) {
    let r = 1 - e;
    return 3 * r * r * t + 6 * r * e * (n - t) + 3 * e * e * (1 - n)
}

function Ve(e = Z) {
    let t = Math.min(1, Math.max(0, e.x1)),
        n = Math.min(1, Math.max(0, e.x2)),
        {
            y1: r,
            y2: i
        } = e;
    return e => {
        let a = Math.min(1, Math.max(0, e)),
            o = a;
        for (let e = 0; e < 5; e++) {
            let e = Q(o, t, n) - a,
                r = Be(o, t, n);
            if (Math.abs(r) < 1e-4) break;
            o = Math.min(1, Math.max(0, o - e / r))
        }
        return Math.min(1, Math.max(0, Q(o, r, i)))
    }
}

function $({
    durationMs: e = 700,
    easing: t = Z,
    onRevealed: n,
    onHidden: r,
    exclusive: i = !1
} = {}) {
    let s = (0, F.useRef)(q),
        d = (0, F.useRef)(null),
        [f, p] = (0, F.useState)(null),
        m = (0, F.useRef)(null),
        h = (0, F.useRef)(null),
        g = (0, F.useRef)(null),
        _ = (0, F.useRef)(n),
        v = (0, F.useRef)(r),
        y = (0, F.useRef)(`out`);
    _.current = n, v.current = r;
    let b = (0, F.useMemo)(() => Ve(t), [t]),
        x = (0, F.useCallback)(e => {
            if (y.current === e) return;
            y.current = e;
            let t = d.current;
            t && (t.dataset[X] = e)
        }, []),
        S = (0, F.useCallback)(e => {
            let t = d.current;
            t && t !== e && (c(t), delete t.dataset[X], i && u.getState().exclusiveOverlayElement === t && u.getState().setExclusiveOverlay(null)), d.current = e, e && (e.dataset[X] = y.current, l(e, () => s.current), i && u.getState().setExclusiveOverlay(e)), p(e)
        }, [i]),
        C = (0, F.useCallback)(() => {
            m.current !== null && (cancelAnimationFrame(m.current), m.current = null), h.current !== null && (cancelAnimationFrame(h.current), h.current = null), g.current !== null && (window.clearTimeout(g.current), g.current = null)
        }, []),
        w = (0, F.useCallback)(() => {
            let e = d.current;
            if (!e) return;
            let t = {
                    ...o(e),
                    transition: s.current
                },
                n = new Map([
                    [e, t]
                ]);
            u.getState().updateVisibility(n)
        }, []),
        T = (0, F.useCallback)((t, n) => {
            C();
            let r = s.current;
            if (r === t) {
                n?.();
                return
            }
            if (a.getState().preferReducedMotion) {
                s.current = t, n?.();
                return
            }
            let i = performance.now(),
                o = () => {
                    C(), s.current = t, w(), n?.()
                },
                c = n => {
                    let a = Math.min(1, (n - i) / e);
                    s.current = r + (t - r) * b(a), w(), a < 1 ? m.current = requestAnimationFrame(c) : o()
                };
            m.current = requestAnimationFrame(c), g.current = window.setTimeout(o, e + 100)
        }, [C, e, b, w]),
        ee = (0, F.useCallback)(e => {
            C();
            let t = Math.min(1, Math.max(0, e));
            x(t > 0 ? `in` : `out`), s.current = q + (J - q) * t, w()
        }, [C, w, x]),
        E = (0, F.useCallback)(() => {
            s.current !== q || m.current !== null || (x(`in`), s.current = Y, h.current = requestAnimationFrame(() => {
                h.current = requestAnimationFrame(() => {
                    h.current = null, s.current === Y && (s.current = q)
                })
            }))
        }, [x]),
        D = (0, F.useCallback)(() => {
            x(`in`), T(J, () => _.current?.())
        }, [x, T]),
        O = (0, F.useCallback)(() => {
            x(`out`), T(q, () => v.current?.())
        }, [x, T]);
    return (0, F.useEffect)(() => C, [C]), {
        revealIn: D,
        revealOut: O,
        setRevealProgress: ee,
        prewarm: E,
        sceneRef: S,
        element: f
    }
}
export {
    Fe as a, je as c, I as d, W as i, Se as l, Oe as n, De as o, Pe as r, Re as s, $ as t, de as u
};
//# sourceMappingURL=useSceneReveal-DVRqdvj3.js.map