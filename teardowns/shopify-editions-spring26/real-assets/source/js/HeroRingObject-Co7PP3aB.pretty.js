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
    nr as i
} from "./three.core-DVcoLpfz.js";
import {
    b as a,
    g as o
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as s
} from "./dist-4Ign8GoJ.js";
import {
    n as c
} from "./SheetContext-sekuEx_H.js";
import {
    r as l
} from "./cameraAnimations-dhQqw_sV.js";
import {
    d as u,
    o as d,
    p as f,
    s as p,
    t as m
} from "./AssetSdf-BrECqyB9.js";
import {
    t as h
} from "./subscribeWithInitial-Ckw6yogw.js";
import {
    t as g
} from "./useTheatreObject-H4ZAcMv1.js";
import {
    a as _,
    c as v,
    d as y,
    f as b,
    i as x,
    l as S,
    o as C,
    r as w,
    s as T,
    u as E
} from "./heroRingTheatreControls-Cya-WCRd.js";
var D = e(t(), 1),
    O = s(),
    k = e => Object.fromEntries(e.map(e => [e, e])),
    A = (e, t = {}) => O.types.compound({
        x: O.types.number(e.x, t),
        y: O.types.number(e.y, t),
        z: O.types.number(e.z, t)
    }),
    j = Math.round(45 / f),
    M = {
        enabled: !0,
        showHelper: !1,
        shape: `torus`,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: {
            x: j,
            y: j,
            z: j
        },
        size: 1,
        strength: p,
        falloff: d,
        gradient: 1,
        invert: !1
    };

function N(e = M) {
    return {
        id: `hero-ring-sdf`,
        type: e.shape,
        enabled: e.enabled,
        position: e.position,
        rotation: e.rotation,
        scale: e.scale,
        size: e.size,
        strength: e.strength,
        falloff: e.falloff,
        gradient: e.gradient,
        invert: e.invert
    }
}
var P = N();

function F(e = M) {
    return O.types.compound({
        enabled: O.types.boolean(e.enabled),
        showHelper: O.types.boolean(e.showHelper, {
            label: `show helper`
        }),
        shape: O.types.stringLiteral(e.shape, k(u), {
            as: `menu`
        }),
        position: A(e.position, {
            range: [-45, 45],
            nudgeMultiplier: .5
        }),
        rotation: A(e.rotation, {
            range: [-180, 180],
            nudgeMultiplier: 1
        }),
        scale: A(e.scale, {
            range: [.05, j * 2],
            nudgeMultiplier: .5
        }),
        size: O.types.number(e.size, {
            range: [.05, 4],
            nudgeMultiplier: .01
        }),
        strength: O.types.number(e.strength, {
            range: [0, 1],
            nudgeMultiplier: .01
        }),
        falloff: O.types.number(e.falloff, {
            range: [.01, 2],
            nudgeMultiplier: .01
        }),
        gradient: O.types.number(e.gradient, {
            range: [.1, 4],
            nudgeMultiplier: .01
        }),
        invert: O.types.boolean(e.invert)
    })
}
var I = n(),
    L = .04,
    R = 1e-4,
    z = {
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: {
            x: 1,
            y: 1,
            z: 1
        }
    },
    B = () => O.types.number(L, {
        range: [R, 4],
        nudgeMultiplier: .001
    }),
    V = {
        scale: {
            x: B(),
            y: B(),
            z: B()
        },
        sdf: F(M)
    },
    H = {
        position: {
            x: O.types.number(z.position.x, {
                nudgeMultiplier: .01
            }),
            y: O.types.number(z.position.y, {
                nudgeMultiplier: .01
            }),
            z: O.types.number(z.position.z, {
                nudgeMultiplier: .01
            })
        },
        rotation: {
            x: O.types.number(z.rotation.x, {
                nudgeMultiplier: .01
            }),
            y: O.types.number(z.rotation.y, {
                nudgeMultiplier: .01
            }),
            z: O.types.number(z.rotation.z, {
                nudgeMultiplier: .01
            })
        },
        scale: {
            x: O.types.number(z.scale.x, {
                nudgeMultiplier: .01
            }),
            y: O.types.number(z.scale.y, {
                nudgeMultiplier: .01
            }),
            z: O.types.number(z.scale.z, {
                nudgeMultiplier: .01
            })
        }
    };

function U(e, t, n) {
    if (e) {
        if (!n) {
            e.position.set(0, 0, 0), e.rotation.set(0, 0, 0), e.scale.set(1, 1, 1);
            return
        }
        e.position.set(t.position.x, t.position.y, t.position.z), e.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z), e.scale.set(t.scale.x, t.scale.y, t.scale.z)
    }
}

function W({
    lockToRestCamera: e = !0
} = {}) {
    let t = (0, D.useRef)(null),
        n = (0, D.useRef)(null),
        s = (0, D.useRef)(null),
        u = (0, D.useRef)(null),
        d = u.current ??= new i,
        f = a(e => e.camera),
        p = c(),
        O = r(e => e.isMobile === !0),
        k = (0, D.useRef)(z),
        A = (0, D.useRef)(v()),
        j = (0, D.useRef)(E),
        [F, R] = (0, D.useState)(() => ({
            sdf: P,
            showHelper: M.showHelper
        })),
        B = g(p, n, `Ring / Transform`, V),
        W = (e, t) => {
            A.current = {
                ...A.current,
                [e]: t
            }, j.current = S(A.current)
        };
    return b(p, `Ring / Animation / Spin`, T, e => W(`spin`, e)), b(p, `Ring / Animation / Intro`, w, e => W(`intro`, e)), b(p, `Ring / Animation / Scroll`, C, e => W(`scroll`, e)), b(p, `Ring / Animation / Pointer Repulse`, x, e => W(`pointerRepulse`, e)), b(p, `Ring / Animation / Reveal`, _, e => W(`reveal`, e)), b(p, `Ring / Mobile`, H, e => {
        k.current = e, U(s.current, e, O)
    }), (0, D.useEffect)(() => {
        let e = s.current;
        return U(e, k.current, O), () => {
            U(e, k.current, !1)
        }
    }, [O]), (0, D.useEffect)(() => {
        if (B) return h(B, e => {
            let t = e.sdf ?? M;
            R({
                sdf: N(t),
                showHelper: t.showHelper
            })
        })
    }, [B]), o(() => {
        let n = t.current;
        if (!n) return;
        let r = f.parent?.userData[l];
        n.matrixAutoUpdate = !1, e && r ? (d.copy(r).invert(), n.matrix.multiplyMatrices(f.matrixWorld, d)) : n.matrix.identity(), n.matrixWorldNeedsUpdate = !0
    }), (0, I.jsx)(`group`, {
        ref: t,
        children: (0, I.jsx)(`group`, {
            ref: n,
            scale: L,
            children: (0, I.jsx)(`group`, {
                ref: s,
                children: (0, I.jsx)(y, {
                    controlsRef: j,
                    children: (0, I.jsx)(m, {
                        sdf: F.sdf,
                        showHelper: F.showHelper
                    })
                })
            })
        })
    })
}
export {
    M as n, F as r, W as t
};
//# sourceMappingURL=HeroRingObject-Co7PP3aB.js.map