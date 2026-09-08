const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/RiveGLBAsset-Dbkth6gC.js", "assets/rolldown-runtime-aKtaBQYM.js", "assets/react-Dvkprh6u.js", "assets/jsx-runtime-DKdBMi_L.js", "assets/useSectionRegistry-BcvkvUON.js", "assets/react-_Rk6hbya.js", "assets/vanilla-DZJGj1NY.js", "assets/lenisManager-BuYlhEBR.js", "assets/middleware-D_nWYfbo.js", "assets/clamp-DM1hWUcE.js", "assets/useTierStore-edsQsT8s.js", "assets/useAssetLoadingStore-BjdwlLYn.js", "assets/SceneDataContext-BXyXjH22.js", "assets/useStickyMountGate-DmTxtK8v.js", "assets/three.core-DVcoLpfz.js", "assets/events-760a1017.esm-DCPtHAo6.js", "assets/scheduler-DqIm7aYh.js", "assets/dist-4Ign8GoJ.js", "assets/dist-D4DOwfAL.js", "assets/SheetContext-sekuEx_H.js", "assets/subscribeWithInitial-Ckw6yogw.js", "assets/useTheatreObject-H4ZAcMv1.js", "assets/GltfAsset-DDbFRGao.js", "assets/ktx2-loader-7Y-IX7SR.js", "assets/Gltf-yU3CSC93.js", "assets/riveHelpers-Bp-4xNrr.js", "assets/reportError-D4E52G70.js", "assets/chunk-T3U33ZZ5-BudId7g_.js", "assets/chunk-5MM2A4YW-DFO2Eo6J.js", "assets/shallow-D10MTZ8f.js"]))) => i.map(i => d[i]);
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
} from "./safeLazy-9BL36byX.js";
import {
    t as a
} from "./clamp-DM1hWUcE.js";
import {
    t as o
} from "./useStickyMountGate-DmTxtK8v.js";
import {
    $a as s,
    $n as c,
    E as l,
    Hr as u,
    jt as d,
    nr as f
} from "./three.core-DVcoLpfz.js";
import {
    b as p,
    g as m
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as h
} from "./dist-4Ign8GoJ.js";
import {
    n as g
} from "./useCanvasPointer-CKM2sIQX.js";
import {
    d as _,
    l as v,
    o as y,
    s as b,
    t as ee
} from "./AssetSdf-BrECqyB9.js";
import {
    n as te,
    t as x
} from "./layers-Cvg6N2JU.js";
import {
    a as S,
    c as C,
    d as w,
    f as T,
    g as E,
    h as D,
    i as O,
    l as k,
    m as ne,
    n as A,
    o as j,
    p as M,
    r as N,
    s as re,
    u as ie
} from "./POSConstants-DDVeyt7I.js";
import {
    t as ae
} from "./subscribeWithInitial-Ckw6yogw.js";
var P = h(),
    F = e(t(), 1),
    I = r(),
    oe = (0, F.createContext)(null),
    se = () => () => {},
    ce = () => 0;

function le(e = 0) {
    let t = e,
        n = new Set,
        r = {
            current: null
        };
    return {
        anchorRef: r,
        getActiveIndex: () => t,
        setActiveIndex: e => {
            t !== e && (t = e, n.forEach(e => e()))
        },
        setAnchorElement: e => {
            r.current = e
        },
        subscribe: e => (n.add(e), () => n.delete(e))
    }
}

function ue() {
    return (0, F.useMemo)(() => le(), [])
}

function de({
    controller: e,
    assets: t,
    sectionHandle: n,
    children: r
}) {
    let i = (0, F.useMemo)(() => ({
        controller: e,
        assets: t,
        sectionHandle: n
    }), [t, e, n]);
    return (0, I.jsx)(oe.Provider, {
        value: i,
        children: r
    })
}

function fe() {
    return (0, F.useContext)(oe)
}

function pe(e) {
    return (0, F.useSyncExternalStore)(e?.subscribe ?? se, e?.getActiveIndex ?? ce, ce)
}

function L(e) {
    return e?.length ? e.flatMap(e => e.type === `group` && e.children?.length ? L(e.children) : [e]) : []
}
var R = new Set([...D, ...Object.values(E)]);

function z(e) {
    return e.type === `riveGlb` && e.triggers?.some(e => R.has(e)) === !0
}

function me(e) {
    return L(e).find(z) ?? null
}

function B(e, t) {
    let n, r, i, a, o, s, c = !1,
        l, u = {},
        d = (e, t) => {
            t && (n = t, r = e.artboard, i = e.assetsMap, a = e.stateMachines, o = e.strings, s = e.viewModelName)
        };
    for (let t of L(e)) z(t) ? (c = !0, d(t, t.riveUrl)) : t.type === `rive` ? d(t, t.lods.lod0) : t.type === `image` && !l && (l = t.lods.lod0);
    return t?.featurefallbacks?.forEach((e, t) => {
        let n = D[t],
            r = e?.image?.url;
        n && r && (u[n] = r)
    }), {
        riveUrl: n,
        riveArtboard: r,
        riveAssetsMap: i,
        riveStateMachines: a,
        riveStrings: o,
        riveViewModelName: s,
        hasRiveGlbAsset: c,
        fallbackImageUrl: l,
        slideImages: u,
        hasSlideImages: D.every(e => u[e])
    }
}
var V = Array.from({
        length: 8
    }, () => new s),
    H = new s,
    U = new s,
    W = new s,
    he = new s,
    G = new s;

function ge(e, t) {
    let {
        min: n,
        max: r
    } = e;
    t[0].set(n.x, n.y, n.z), t[1].set(n.x, n.y, r.z), t[2].set(n.x, r.y, n.z), t[3].set(n.x, r.y, r.z), t[4].set(r.x, n.y, n.z), t[5].set(r.x, n.y, r.z), t[6].set(r.x, r.y, n.z), t[7].set(r.x, r.y, r.z)
}

function _e(e, t, n) {
    let r = 1 / 0,
        i = 1 / 0,
        a = -1 / 0,
        o = -1 / 0;
    ge(e, V);
    for (let e of V) {
        e.project(t);
        let s = (e.x * .5 + .5) * n.width,
            c = (-e.y * .5 + .5) * n.height;
        r = Math.min(r, s), i = Math.min(i, c), a = Math.max(a, s), o = Math.max(o, c)
    }
    return {
        minX: r,
        minY: i,
        maxX: a,
        maxY: o,
        width: a - r,
        height: o - i
    }
}

function ve(e, t, n, r, i) {
    let a = e / i.width * 2 - 1,
        o = -(t / i.height) * 2 + 1;
    H.setFromMatrixPosition(r.matrixWorld), r.getWorldDirection(U), W.set(a, o, .5).unproject(r).sub(H).normalize();
    let s = he.copy(n).sub(H).dot(U),
        c = W.dot(U);
    return !Number.isFinite(s) || Math.abs(c) < 1e-4 ? null : G.copy(H).add(W.multiplyScalar(s / c))
}
var K = .001,
    ye = 100,
    be = .16,
    q = new l,
    J = new s,
    xe = new f,
    Y = new f,
    Se = new f;

function Ce(e, t, n, r, i, a, o, s = {}) {
    if (!(i.width > 1 && i.height > 1 && o.width > 1 && o.height > 1) || (xe.copy(t).invert(), Y.multiplyMatrices(xe, n), r && (Se.copy(r).invert(), Y.premultiply(Se)), q.copy(e).applyMatrix4(Y), q.isEmpty())) return null;
    let c = _e(q, a, o);
    if (!(Number.isFinite(c.width) && Number.isFinite(c.height) && c.width > 1 && c.height > 1)) return null;
    q.getCenter(J);
    let l = ve(i.left + i.width / 2, i.top + i.height / 2, J, a, o);
    if (!l) return null;
    let u = typeof s.anchorWidthRatio == `number` && Number.isFinite(s.anchorWidthRatio) && s.anchorWidthRatio > 0 ? i.width * s.anchorWidthRatio : null,
        d = u ? u / c.width : Math.min(i.width / c.width, i.height / c.height),
        f = Math.min(ye, Math.max(K, d));
    return {
        scale: f,
        x: l.x - J.x * f,
        y: l.y - J.y * f,
        z: l.z - J.z * f,
        centerX: J.x,
        centerY: J.y,
        centerZ: J.z
    }
}

function we({
    anchorRef: e,
    targetMesh: t,
    offsetGroupRef: n,
    anchorWidthRatio: r,
    mouseDamping: i = 8,
    tiltAmountX: a = be,
    tiltAmountY: o = be,
    children: s
}) {
    let l = p(e => e.camera),
        f = p(e => e.size),
        h = g(),
        _ = (0, F.useRef)(null),
        v = (0, F.useRef)(null),
        y = (0, F.useRef)(null),
        b = (0, F.useRef)({
            x: 0,
            y: 0
        }),
        ee = (0, F.useRef)(new d),
        te = (0, F.useRef)(new u),
        x = (0, F.useRef)(null);
    return (0, F.useEffect)(() => {
        if (!t?.geometry) {
            x.current = null;
            return
        }
        t.geometry.computeBoundingBox(), x.current = t.geometry.boundingBox?.clone() ?? null
    }, [t]), m((s, u) => {
        let d = e?.current,
            p = _.current,
            m = v.current,
            g = y.current,
            S = t,
            C = x.current;
        if (!d || !p || !m || !g || !S || !C) return;
        let w = n?.current ?? null;
        w && (w.scale.setScalar(1), w.updateMatrix()), m.position.set(0, 0, 0), m.quaternion.identity(), g.position.set(0, 0, 0), p.updateWorldMatrix(!0, !0);
        let T = Ce(C, p.matrixWorld, S.matrixWorld, w?.matrix ?? null, d.getBoundingClientRect(), l, f, {
            anchorWidthRatio: r
        });
        if (!T) return;
        p.scale.setScalar(T.scale), p.position.set(T.x + T.centerX * T.scale, T.y + T.centerY * T.scale, T.z + T.centerZ * T.scale), g.position.set(-T.centerX, -T.centerY, -T.centerZ);
        let E = h.current,
            D = E.active ? E.x : 0,
            O = E.active ? E.y : 0,
            k = 1 - Math.exp(-Math.max(0, i) * u);
        b.current.x = c.lerp(b.current.x, D, k), b.current.y = c.lerp(b.current.y, O, k), ee.current.set(-b.current.y * o, b.current.x * a, 0), te.current.setFromEuler(ee.current), m.quaternion.copy(l.quaternion).multiply(te.current)
    }), (0, I.jsx)(`group`, {
        ref: _,
        children: (0, I.jsx)(`group`, {
            ref: v,
            children: (0, I.jsx)(`group`, {
                ref: y,
                children: s
            })
        })
    })
}
var Te = 1.08,
    Ee = 2,
    De = 3,
    Oe = e => Object.fromEntries(e.map(e => [e, e])),
    ke = (e, t = {}) => P.types.compound({
        x: P.types.number(e.x, t),
        y: P.types.number(e.y, t),
        z: P.types.number(e.z, t)
    }),
    X = {
        enabled: !0,
        showHelper: !1,
        shape: `cube`,
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
        },
        size: 1,
        strength: b,
        falloff: y,
        gradient: 1,
        invert: !1
    };

function Z(e, t) {
    return typeof e == `number` && Number.isFinite(e) ? e : t
}

function Q(e, t) {
    return Math.max(v, Z(e, t))
}

function Ae(e, t) {
    return {
        x: Z(e?.x, t.x),
        y: Z(e?.y, t.y),
        z: Z(e?.z, t.z)
    }
}

function je(e, t) {
    return {
        x: Q(e?.x, t.x),
        y: Q(e?.y, t.y),
        z: Q(e?.z, t.z)
    }
}

function Me(e) {
    return typeof e == `string` && _.includes(e)
}

function Ne(e) {
    let t = X;
    return {
        enabled: e?.enabled ?? t.enabled,
        showHelper: e?.showHelper ?? t.showHelper,
        shape: Me(e?.shape) ? e.shape : t.shape,
        position: Ae(e?.position, t.position),
        rotation: Ae(e?.rotation, t.rotation),
        scale: je(e?.scale, t.scale),
        size: Q(e?.size, t.size),
        strength: Math.max(0, Z(e?.strength, t.strength)),
        falloff: Q(e?.falloff, t.falloff),
        gradient: Q(e?.gradient, t.gradient),
        invert: e?.invert ?? t.invert
    }
}

function Pe(e, t) {
    if (!e || e.isEmpty()) return null;
    let n = Ne(t),
        r = e.getCenter(new s),
        i = e.getSize(new s);
    return {
        id: `pos-sdf`,
        type: n.shape,
        enabled: n.enabled,
        position: {
            x: r.x + n.position.x,
            y: r.y + n.position.y,
            z: r.z + n.position.z
        },
        rotation: n.rotation,
        scale: {
            x: Math.max(v, i.x * Te * n.scale.x),
            y: Math.max(v, i.y * Te * n.scale.y),
            z: Math.max(v, i.z * Te * n.scale.z)
        },
        size: n.size,
        strength: n.strength,
        falloff: n.falloff,
        gradient: n.gradient,
        invert: n.invert
    }
}

function Fe(e = X) {
    return P.types.compound({
        enabled: P.types.boolean(e.enabled),
        showHelper: P.types.boolean(e.showHelper, {
            label: `show helper`
        }),
        shape: P.types.stringLiteral(e.shape, Oe(_), {
            as: `menu`
        }),
        position: ke(e.position, {
            range: [-2, Ee],
            nudgeMultiplier: .01
        }),
        rotation: ke(e.rotation, {
            range: [-180, 180],
            nudgeMultiplier: 1
        }),
        scale: ke(e.scale, {
            range: [.05, De],
            nudgeMultiplier: .01
        }),
        size: P.types.number(e.size, {
            range: [.05, 4],
            nudgeMultiplier: .01
        }),
        strength: P.types.number(e.strength, {
            range: [0, 1],
            nudgeMultiplier: .01
        }),
        falloff: P.types.number(e.falloff, {
            range: [.01, 2],
            nudgeMultiplier: .01
        }),
        gradient: P.types.number(e.gradient, {
            range: [.1, 4],
            nudgeMultiplier: .01
        }),
        invert: P.types.boolean(e.invert)
    })
}
var Ie = i(() => n(() => import(`./RiveGLBAsset-Dbkth6gC.js`).then(e => e.n).then(e => ({
        default: e.RiveGLBAsset
    })), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]))),
    Le = {
        size: P.types.number(w, {
            range: [T, 2],
            nudgeMultiplier: .01,
            label: `Size`
        }),
        mouseDamping: P.types.number(6, {
            range: [1, 40],
            nudgeMultiplier: 1,
            label: `Mouse damping`
        }),
        tiltAmountX: P.types.number(M, {
            range: [0, 1],
            nudgeMultiplier: .01,
            label: `Tilt amount X`
        }),
        tiltAmountY: P.types.number(ne, {
            range: [0, 1],
            nudgeMultiplier: .01,
            label: `Tilt amount Y`
        }),
        envMapIntensity: P.types.number(A, {
            range: [0, 4],
            nudgeMultiplier: .05,
            label: `Env map intensity`
        }),
        envSoftness: P.types.number(k, {
            range: [0, 1],
            nudgeMultiplier: .01,
            label: `Reflection softness`
        }),
        metalness: P.types.number(C, {
            range: [0, 1],
            nudgeMultiplier: .01,
            label: `Metalness`
        }),
        envRotationX: P.types.number(S, {
            range: [O, N],
            nudgeMultiplier: .01,
            label: `Env rotation X`
        }),
        envRotationY: P.types.number(j, {
            range: [O, N],
            nudgeMultiplier: .01,
            label: `Env rotation Y`
        }),
        envRotationZ: P.types.number(re, {
            range: [O, N],
            nudgeMultiplier: .01,
            label: `Env rotation Z`
        }),
        sdf: Fe(X)
    };

function $(e, t, n, r) {
    return typeof e != `number` || !Number.isFinite(e) ? r : a(e, t, n)
}

function Re({
    assets: e,
    sheet: t,
    theatreId: n,
    activeIndex: r,
    activeTriggerName: i,
    anchorRef: a,
    controller: s,
    targetMaterialConfig: c = ie,
    sdf: l,
    sdfHelper: u,
    handle: d,
    position: f,
    rotation: p,
    scale: m
}) {
    let h = (0, F.useRef)(null),
        g = o(),
        _ = pe(s),
        v = r ?? _,
        y = (0, F.useMemo)(() => me(e), [e]),
        [b, E] = (0, F.useState)(null),
        [D, P] = (0, F.useState)(null),
        [oe, se] = (0, F.useState)(w),
        [ce, le] = (0, F.useState)(6),
        [ue, de] = (0, F.useState)(M),
        [fe, L] = (0, F.useState)(ne),
        [R, z] = (0, F.useState)(A),
        [B, V] = (0, F.useState)(k),
        [H, U] = (0, F.useState)(C),
        [W, he] = (0, F.useState)(S),
        [G, ge] = (0, F.useState)(j),
        [_e, ve] = (0, F.useState)(re),
        [K, ye] = (0, F.useState)(X),
        be = (0, F.useMemo)(() => c === null ? null : {
            ...c,
            roughness: B,
            metalness: H,
            envMapIntensity: R,
            envRotation: {
                x: W,
                y: G,
                z: _e
            }
        }, [c, B, H, R, W, G, _e]),
        q = (0, F.useMemo)(() => l === null ? null : l ?? Pe(b?.modelBox, K), [b?.modelBox, l, K]),
        J = u ?? K.showHelper;
    if ((0, F.useEffect)(() => {
            if (D) return ae(D, e => {
                let t = e;
                se($(t.size, T, 2, w)), le($(t.mouseDamping, 1, 40, 6)), de($(t.tiltAmountX, 0, 1, M)), L($(t.tiltAmountY, 0, 1, ne)), z($(t.envMapIntensity, 0, 4, A)), V($(t.envSoftness, 0, 1, k)), U($(t.metalness, 0, 1, C)), he($(t.envRotationX, O, N, S)), ge($(t.envRotationY, O, N, j)), ve($(t.envRotationZ, O, N, re)), ye(Ne(t.sdf))
            })
        }, [D]), (0, F.useEffect)(() => {
            let e = h.current;
            if (e) return e.userData[x] = !0, te(e, 1), () => {
                delete e.userData[x]
            }
        }, [b, q, J]), !y) return null;
    let xe = i ?? y.triggers?.[v],
        Y = a ?? s?.anchorRef,
        Se = n ?? (y.name || `POS / Transform`),
        Ce = g ? (0, I.jsx)(F.Suspense, {
            fallback: null,
            children: (0, I.jsx)(Ie, {
                asset: y,
                sheet: t,
                theatreId: Se,
                activeTriggerName: xe,
                targetMaterialConfig: be ?? void 0,
                handle: d,
                theatreExtraConfig: Le,
                onTheatreObject: P,
                onModelContext: E,
                children: q ? (0, I.jsx)(ee, {
                    sdf: q,
                    showHelper: J
                }) : null
            })
        }) : null;
    return (0, I.jsx)(`group`, {
        ref: h,
        position: f,
        rotation: p,
        scale: m,
        children: Y ? (0, I.jsx)(we, {
            anchorRef: Y,
            targetMesh: b?.targetMesh,
            offsetGroupRef: b?.offsetGroupRef,
            anchorWidthRatio: oe,
            mouseDamping: ce,
            tiltAmountX: ue,
            tiltAmountY: fe,
            children: Ce
        }) : Ce
    })
}
export {
    pe as a, de as i, B as n, fe as o, me as r, ue as s, Re as t
};
//# sourceMappingURL=POS-DjjnM_9Z.js.map