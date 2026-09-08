import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    t as n
} from "./jsx-runtime-DKdBMi_L.js";
var r = e(t(), 1),
    i = [`sphere`, `cube`, `torus`, `cylinder`, `octahedron`, `dodeca`],
    a = {
        x: 0,
        y: 0,
        z: 0
    },
    o = {
        x: 1,
        y: 1,
        z: 1
    },
    s = .35,
    c = .35,
    l = .001,
    u = .5,
    d = .5,
    f = .34,
    p = .14,
    m = .5,
    h = .5,
    g = .55,
    _ = .42,
    v = _ * 5 * Math.sqrt(3) * (1 + Math.sqrt(5)) / Math.sqrt(250 + 110 * Math.sqrt(5)),
    y = Math.PI / 180,
    b = [Math.PI / 2, 0, 0];

function x(e) {
    return e === `torus` ? .48000000000000004 : e === `cylinder` ? Math.hypot(m, h) : e === `octahedron` ? g : e === `dodeca` ? v : e === `sphere` ? u : Math.hypot(d, d, d)
}

function S(e) {
    return [e.x, e.y, e.z]
}

function C(e) {
    return [e.x * y, e.y * y, e.z * y]
}

function w(e, t) {
    let n = Math.max(l, t);
    return [Math.max(l, e.x) * n, Math.max(l, e.y) * n, Math.max(l, e.z) * n]
}
var T = n(),
    E = [u, 32, 16],
    D = [f, p, 18, 72],
    O = [m, m, h * 2, 40, 1],
    k = [g, 0],
    A = [v, 0],
    j = [d * 2, d * 2, d * 2];

function M({
    type: e,
    invert: t
}) {
    return (0, T.jsxs)(`mesh`, {
        frustumCulled: !1,
        rotation: e === `torus` ? b : void 0,
        children: [(0, T.jsx)(N, {
            type: e
        }), (0, T.jsx)(`meshBasicMaterial`, {
            color: t ? `#ff9d9d` : `#9db7ff`,
            depthWrite: !1,
            opacity: .28,
            transparent: !0,
            wireframe: !0
        })]
    })
}

function N({
    type: e
}) {
    return e === `sphere` ? (0, T.jsx)(`sphereGeometry`, {
        args: E
    }) : e === `torus` ? (0, T.jsx)(`torusGeometry`, {
        args: D
    }) : e === `cylinder` ? (0, T.jsx)(`cylinderGeometry`, {
        args: O
    }) : e === `octahedron` ? (0, T.jsx)(`octahedronGeometry`, {
        args: k
    }) : e === `dodeca` ? (0, T.jsx)(`dodecahedronGeometry`, {
        args: A
    }) : (0, T.jsx)(`boxGeometry`, {
        args: j
    })
}
var P = (0, r.createContext)(null);

function F(e, t) {
    let n = (0, r.useContext)(P),
        i = (0, r.useRef)(t);
    i.current = t;
    let {
        enabled: a
    } = t;
    return (0, r.useEffect)(() => {
        if (!(!n || a === !1)) return n.registerSdf({
            objectRef: e,
            sdfRef: i
        })
    }, [e, n, a]), n !== null
}

function I({
    sdf: e,
    showHelper: t = !1
}) {
    let n = (0, r.useRef)(null),
        i = F(n, e);
    return e.enabled === !1 || !i ? null : (0, T.jsx)(`group`, {
        ref: n,
        name: e.id ?? `AssetSdf`,
        position: S(e.position ?? a),
        rotation: C(e.rotation ?? a),
        scale: w(e.scale ?? o, e.size ?? 1),
        children: t && (0, T.jsx)(M, {
            type: e.type,
            invert: e.invert ?? !1
        })
    })
}
export {
    m as a, _ as c, i as d, u as f, x as h, h as i, l, p as m, P as n, c as o, f as p, d as r, s, I as t, g as u
};
//# sourceMappingURL=AssetSdf-BrECqyB9.js.map