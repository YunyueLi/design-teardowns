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
    $a as r,
    Dr as i,
    Hr as a,
    nr as o
} from "./three.core-DVcoLpfz.js";
import {
    b as s
} from "./events-760a1017.esm-DCPtHAo6.js";
var c = [`scrollDrift`, `none`],
    l = {
        up: .2,
        back: .2
    },
    u = `scrollDrift`,
    d = e(t(), 1),
    f = 1.5,
    p = [0, 0, 0],
    m = new a,
    h = `sectionSceneCameraRig`,
    g = `sectionSceneCameraRestMatrix`;

function _(e, t) {
    let n = t ?? e.parent;
    return n?.userData.sectionSceneCameraRig ? n : null
}

function v(e, t, n, r) {
    let i = _(e, r);
    if (!i) return;
    let a = t ?? p,
        o = n ?? p;
    i.position.set(...a), i.rotation.set(...o)
}

function y(e, t, n, r, i) {
    let a = n || r ? t : void 0;
    return i[0] = (e?.[0] ?? 0) + (a?.[0] ?? 0), i[1] = (e?.[1] ?? 0) + (a?.[1] ?? 0), i[2] = (e?.[2] ?? 0) + (a?.[2] ?? 0), i
}

function b(e) {
    let t = (e ?? 50) * f;
    return Math.max(10, Math.min(t, 120))
}

function x(e, t, n, r, i, a = 0) {
    e.position.set(...t), r.set(...n), i.lookAt(e.position, r, e.up), e.quaternion.setFromRotationMatrix(i), a !== 0 && e.translateZ(a)
}

function S(e, t, n, r, i = f) {
    let a = e ?? 50,
        o = n || r ? t ?? a * i : a;
    return Math.max(10, Math.min(o, 120))
}

function C(e, t) {
    let n = _(e, t);
    n && (n.updateMatrixWorld(!0), e.position.applyMatrix4(n.matrixWorld), e.quaternion.premultiply(n.getWorldQuaternion(m)))
}

function w(e) {
    e.updateMatrixWorld(!0), e.matrixWorldInverse.copy(e.matrixWorld).invert()
}

function T({
    cameraObject: e,
    position: t,
    target: a,
    fov: c,
    mobileFov: l,
    mobileFovMultiplier: u,
    positionOffset: f,
    mobilePositionOffset: p,
    rotationOffset: m,
    mobileRotationOffset: h,
    cameraRigObject: g
}) {
    let _ = s(e => e.camera),
        b = e ?? _,
        T = n(e => e.isMobile),
        E = n(e => e.isLandscapeMobile),
        D = (0, d.useRef)(null),
        O = (0, d.useRef)(null),
        k = (0, d.useRef)([0, 0, 0]),
        A = (0, d.useRef)([0, 0, 0]),
        j = D.current ??= new r,
        M = O.current ??= new o;
    return (0, d.useEffect)(() => {
        let e = y(f, p, T, E, k.current),
            n = y(m, h, T, E, A.current);
        v(b, e, n, g), x(b, t, a, j, M, 0), C(b, g), w(b)
    }, [b, g, t, a, f, p, m, h, T, E]), (0, d.useEffect)(() => {
        b instanceof i && (b.fov = S(c, l, T, E, u), b.updateProjectionMatrix())
    }, [b, c, E, T, l, u]), null
}
var E = new r,
    D = new r,
    O = new a,
    k = new o,
    A = new r,
    j = new r,
    M = new r,
    N = new r(0, 1, 0),
    P = Math.tan(.2),
    F = .8;

function I(e, t, n) {
    let r = P * P,
        i = n.x * n.x + n.z * n.z - r * n.y * n.y,
        a = 2 * (t.x * n.x + t.z * n.z - r * t.y * n.y),
        o = t.x * t.x + t.z * t.z - r * t.y * t.y;
    if (o <= 0) return 0;
    let s = Math.sign(e) || 1,
        c = 1 / 0;
    if (Math.abs(i) < 1e-9) Math.abs(a) > 1e-12 && (c = -o / a);
    else {
        let e = a * a - 4 * i * o;
        if (e > 0) {
            let t = Math.sqrt(e),
                n = (-a + t) / (2 * i),
                r = (-a - t) / (2 * i);
            n * s > 0 && (c = n), r * s > 0 && Math.abs(r) < Math.abs(c) && (c = r)
        }
    }
    if (!Number.isFinite(c)) return e;
    let l = Math.abs(c),
        u = Math.abs(e),
        d = F * l;
    if (u <= d) return e;
    let f = l - d;
    return s * (d + f * (1 - Math.exp(-(u - d) / f)))
}
var L = {
    scrollDrift: ({
        position: e,
        target: t,
        screenOffset: n,
        scrollDrift: r
    }) => {
        E.set(...e), D.set(...t), k.lookAt(E, D, N), O.setFromRotationMatrix(k), A.set(0, 1, 0).applyQuaternion(O), j.copy(A).multiplyScalar(r.up), M.copy(E).sub(D);
        let i = I(-n, M, j);
        return E.addScaledVector(j, i), {
            position: [E.x, E.y, E.z],
            target: t,
            localZOffset: -n * r.back
        }
    },
    none: ({
        position: e,
        target: t
    }) => ({
        position: e,
        target: t
    })
};
export {
    v as a, b as c, c as d, u as f, h as i, y as l, T as n, C as o, l as p, g as r, x as s, L as t, w as u
};
//# sourceMappingURL=cameraAnimations-dhQqw_sV.js.map