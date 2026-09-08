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
} from "./useAssetLoadingStore-BjdwlLYn.js";
import {
    s as i,
    t as a,
    u as o
} from "./useSceneReveal-DVRqdvj3.js";
import {
    f as s
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    a as c,
    i as l,
    n as u,
    r as d,
    t as f
} from "./PopupChannel-CKEOmnbs.js";
var p = e(t(), 1),
    m = n(),
    h = `developer-drive-portal`,
    g = 700,
    _ = 760,
    v = 10,
    y = 10,
    b = {
        positionOffset: [0, 0, 0],
        rotationOffset: [0, 0, 0]
    };

function x(e, t = 3) {
    return [e.positionOffset, e.rotationOffset].flat().map(e => e.toFixed(t)).join(`,`)
}

function S(e, t, n) {
    return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n, e[2] + (t[2] - e[2]) * n]
}

function C(e, t, n) {
    return {
        positionOffset: S(e.positionOffset, t.positionOffset, n),
        rotationOffset: S(e.rotationOffset, t.rotationOffset, n)
    }
}

function w(e, t, n) {
    let r = Math.min(1, Math.max(0, (n - e) / (t - e)));
    return r * r * (3 - 2 * r)
}

function T({
    stateUrl: e,
    sectionHandle: t,
    targetSceneHandle: n
}) {
    let [S, T] = (0, p.useState)(null), [E, D] = (0, p.useState)(b), [O, k] = (0, p.useState)(!1), A = (0, p.useRef)(!1), j = (0, p.useRef)(0), M = (0, p.useRef)(0), N = (0, p.useRef)(null), P = (0, p.useRef)(b), F = (0, p.useRef)(b), I = (0, p.useRef)(`0,0,0,0,0,0`), L = (0, p.useRef)(`0,0,0,0,0,0`), R = (0, p.useRef)(null), z = n?.trim() || null, B = t ? `${h}-${t}` : h, {
        sceneRef: V,
        revealOut: H,
        setRevealProgress: U,
        element: W
    } = a({
        durationMs: g,
        exclusive: !0
    });
    (0, p.useEffect)(() => {
        A.current = O
    }, [O]), (0, p.useEffect)(() => {
        let e = () => {
                R.current !== null && (window.clearTimeout(R.current), R.current = null)
            },
            n = e => !t || e === t,
            i = () => {
                e(), M.current = 0, H(), R.current = window.setTimeout(() => {
                    A.current = !1, k(!1), T(null), N.current = null, j.current = 0, P.current = b, F.current = b, I.current = `0,0,0,0,0,0`, L.current = `0,0,0,0,0,0`, D(b), R.current = null
                }, _)
            },
            a = window.matchMedia?.(`(prefers-reduced-motion: reduce)`),
            o = e => a?.matches ? 1 : e,
            p = e => d(e),
            m = (t, n = 0, i) => {
                e();
                let a = o(n);
                (N.current ?? z) !== t && (j.current = a, r.getState().clearHandle(B)), N.current = t, i && c(i), M.current = a, a <= .001 && (j.current = 0, U(0)), T(t), A.current = !0, k(!0), s()
            },
            h = e => {
                let t = e.detail;
                if (!n(t?.sectionHandle)) {
                    A.current && i();
                    return
                }
                let r = t?.handle?.trim();
                r && (t?.sessionId && c(t.sessionId), m(r, 0, t?.sessionId))
            };
        window.addEventListener(`developer-drive-scene-target`, h);
        let g = l.on(f.DRIVE_SCENE_REVEAL, e => {
                if (!p(e.sessionId)) return;
                if (!n(e.sectionHandle)) {
                    A.current && i();
                    return
                }
                let t = e.handle?.trim(),
                    r = Math.min(1, Math.max(0, e.progress || 0));
                if (!t) {
                    i();
                    return
                }
                m(t, r, e.sessionId)
            }),
            v = l.on(f.DRIVE_STATE, e => {
                if (!p(e.sessionId)) return;
                let t = e.cameraOffset;
                if (t) {
                    let e = t.positionOffset,
                        n = t.rotationOffset,
                        r = {
                            positionOffset: [e?.x ?? 0, e?.y ?? 0, e?.z ?? 0],
                            rotationOffset: [n?.x ?? 0, n?.y ?? 0, n?.z ?? 0]
                        },
                        i = x(r);
                    I.current !== i && (I.current = i, P.current = r)
                }
                let n = typeof e.revealProgress == `number` ? e.revealProgress : null;
                if (n !== null) {
                    M.current = o(Math.min(1, Math.max(0, n))), s();
                    return
                }
                let r = Math.max(.001, e.maxSpeed || 1),
                    i = Math.min(Math.abs(e.speed) / r, 1);
                M.current = o(w(0, .35, i)), s()
            }),
            y = () => {
                a?.matches && A.current && (j.current = 1, M.current = 1, U(1), s())
            },
            S = l.on(f.POPUP_CLOSED, e => {
                p(e.sessionId) && (u(e.sessionId), i())
            });
        return a?.addEventListener(`change`, y), () => {
            window.removeEventListener(`developer-drive-scene-target`, h), g(), v(), S(), a?.removeEventListener(`change`, y), e()
        }
    }, [B, H, t, U, z]), (0, p.useEffect)(() => {
        if (!W || !O) return;
        let e = 0,
            t = performance.now(),
            n = r => {
                let i = Math.min(.05, Math.max(0, (r - t) / 1e3));
                t = r;
                let a = j.current,
                    o = M.current,
                    c = a + (o - a) * (1 - Math.exp(-i * v));
                j.current = Math.abs(c - o) < .001 ? o : c, U(j.current), s();
                let l = 1 - Math.exp(-i * y),
                    u = C(F.current, P.current, l);
                F.current = u;
                let d = x(u);
                L.current !== d && (L.current = d, D(u)), e = requestAnimationFrame(n)
            };
        return U(j.current), s(), e = requestAnimationFrame(n), () => cancelAnimationFrame(e)
    }, [W, U, O]);
    let G = S ?? z;
    return !O || !G ? null : (0, m.jsx)(`div`, {
        ref: V,
        "data-section-key": B,
        "data-state-driven-scene-overlay": `true`,
        className: `absolute inset-0 pointer-events-none`,
        "aria-hidden": `true`,
        children: (0, m.jsx)(o, {
            stateUrl: e,
            dynamicContent: !0,
            children: (0, m.jsx)(i, {
                handle: B,
                defaultPresetName: G,
                overridePresetName: G,
                defaultTransition: `hero`,
                cameraOffsetOverride: E,
                mousePointerEnabled: !1
            })
        }, G)
    })
}
export {
    T as DeveloperDriveSceneReveal
};
//# sourceMappingURL=DeveloperDriveSceneReveal-B7IUXXuj.js.map