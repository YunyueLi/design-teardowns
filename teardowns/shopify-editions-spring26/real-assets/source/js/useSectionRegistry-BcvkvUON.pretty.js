import {
    t as e
} from "./react-_Rk6hbya.js";
import {
    t
} from "./lenisManager-BuYlhEBR.js";
import {
    t as n
} from "./middleware-D_nWYfbo.js";
import {
    t as r
} from "./clamp-DM1hWUcE.js";
import {
    n as i
} from "./useTierStore-edsQsT8s.js";
var a = new Map,
    o = new Map;

function s(e) {
    if (typeof window > `u`) return;
    let t = e.getBoundingClientRect();
    a.set(e, {
        docTop: t.top + window.scrollY,
        docLeft: t.left + window.scrollX,
        width: t.width,
        height: t.height
    })
}
var c = 0;

function l() {
    c === 0 && (c = requestAnimationFrame(() => {
        c = 0;
        for (let e of a.keys()) s(e)
    }))
}
var u = typeof ResizeObserver < `u` ? new ResizeObserver(e => {
        for (let t of e) s(t.target)
    }) : null,
    d = null,
    f = 0;

function ee() {
    typeof window > `u` || (f === 0 && (typeof ResizeObserver < `u` && (d = new ResizeObserver(l), d.observe(document.documentElement)), window.addEventListener(`resize`, l, {
        passive: !0
    }), window.addEventListener(`orientationchange`, l, {
        passive: !0
    }), window.visualViewport?.addEventListener(`resize`, l, {
        passive: !0
    })), f++)
}

function p() {
    f--, f === 0 && (d?.disconnect(), d = null, typeof window < `u` && (window.removeEventListener(`resize`, l), window.removeEventListener(`orientationchange`, l), window.visualViewport?.removeEventListener(`resize`, l)))
}

function m(e) {
    let t = o.get(e) ?? 0;
    return o.set(e, t + 1), t === 0 && (s(e), u?.observe(e), ee()), () => {
        let t = o.get(e);
        t !== void 0 && (t <= 1 ? (o.delete(e), a.delete(e), u?.unobserve(e), p()) : o.set(e, t - 1))
    }
}

function h(e) {
    return a.get(e) ?? null
}

function te(e, t, n) {
    let r = a.get(e);
    return r ? {
        top: r.docTop - t,
        left: r.docLeft - n,
        width: r.width,
        height: r.height
    } : null
}
var g = {
        covers: new Map,
        cutouts: new Map
    },
    _ = new WeakMap,
    v = typeof IntersectionObserver < `u` ? new IntersectionObserver(e => {
        for (let t of e) {
            let e = t.target,
                n = _.get(e);
            n && (t.isIntersecting ? n.kind === `cutout` ? g.cutouts.set(e, n.options) : g.covers.set(e, n.options) : n.kind === `cutout` ? g.cutouts.delete(e) : g.covers.delete(e))
        }
    }, {
        rootMargin: `50% 0px`
    }) : null;

function ne(e, t = {}) {
    _.set(e, {
        kind: `cutout`,
        options: t
    }), v?.observe(e);
    let n = m(e);
    return () => {
        v?.unobserve(e), _.delete(e), g.cutouts.delete(e), n()
    }
}

function re(e, t) {
    _.set(e, {
        kind: `cover`,
        options: t
    }), v?.observe(e);
    let n = m(e);
    return () => {
        v?.unobserve(e), _.delete(e), g.covers.delete(e), n()
    }
}
var ie = .32,
    y = 3,
    ae = 44 * y,
    b = 14,
    x = 10,
    S = 8,
    C = 80,
    w = 1 / 30,
    T = .01,
    E = 0,
    D = 0,
    O = 0,
    k = 0,
    A = 0;

function j() {
    let e = t();
    return e ? e.scroll : typeof window < `u` ? window.scrollY : 0
}

function oe() {
    return typeof window < `u` ? window.scrollX : 0
}

function se() {
    let e = performance.now(),
        t = j();
    if (O === 0) {
        O = e, k = e, A = t;
        return
    }
    let n = Math.min((e - O) / 1e3, w);
    O = e;
    let i = t - A,
        a = r(e - k, S, C);
    k = e, A = t, E = Math.abs(i) < T ? 0 : r(i / a * ie, -1, 1);
    let o = 1 - Math.exp(-n * b),
        s = Math.exp(-n * x);
    D += (E - D) * o, E *= s
}
var ce = {
    3: !0,
    2: !1,
    1: !1,
    0: !1
};

function M() {
    return ce[i.getState().tier] ? D * 44 : 0
}

function le(e = M()) {
    return Math.abs(e) * y
}

function N() {
    E = 0, D = 0, O = 0, k = 0, A = 0
}
var P = Math.ceil(ae);

function F(e) {
    let t = h(e);
    if (t) {
        let e = t.docTop - window.scrollY;
        return {
            top: e,
            height: t.height,
            bottom: e + t.height
        }
    }
    let n = e.getBoundingClientRect();
    return {
        top: n.top,
        height: n.height,
        bottom: n.bottom
    }
}
var I = 1e3,
    L = 1;

function R(e) {
    return Math.round(e * I) / I
}

function z(e, t, n) {
    return -Math.max(0, e - (n - t)) / t
}
var B = `[data-section-anchor]`,
    V = `sectionTransitionExitScale`,
    H = `sectionScreenOffsetCenterProgress`,
    U = new WeakMap,
    W = new WeakMap,
    G = new WeakMap,
    K = 0;

function ue() {
    K ||= window.requestAnimationFrame(() => {
        G = new WeakMap, K = 0
    })
}

function q(e, t) {
    return U.get(e)?.release(), t ? (U.set(e, {
        anchor: t,
        release: m(t)
    }), t) : (U.delete(e), null)
}

function de(e) {
    let t = U.get(e)?.anchor;
    return t?.isConnected && e.contains(t) ? t : q(e, e.querySelector(B))
}

function J(e) {
    q(e, null)
}

function fe(e) {
    let t = Number(e.dataset[V]);
    return Number.isFinite(t) && t > 0 ? t : L
}

function pe(e) {
    let t = e.dataset[H];
    if (t === void 0 || t === ``) return null;
    let n = Number(t);
    return Number.isFinite(n) ? r(n, 0, 1) : null
}

function me(e) {
    let t = F(e),
        n = window.innerHeight;
    if (t.top > n + P) return null;
    let i = Math.min(t.height, n);
    if (i <= 0) return null;
    let a = z(t.top - P, i, n);
    return Math.round(r(Math.max(a, -.999), -1, 0) * 1e3) / 1e3
}

function he(e, t) {
    return t > -1 ? t : me(e) ?? t
}

function ge(e, t) {
    W.set(e, t)
}

function _e(e) {
    W.delete(e)
}

function Y(e) {
    let t = W.get(e)?.();
    return typeof t == `number` && Number.isFinite(t) ? r(t, -1, 1) : null
}

function ve(e, t, n) {
    if (n <= 0) return 0;
    let r = pe(e);
    if (r !== null) return R(-t.top / n - (r * (n + t.height) - n) / n);
    let i = de(e);
    if (!i) return R(-t.top / n);
    let a = h(i),
        o, s;
    if (a) o = a.docTop - window.scrollY, s = a.height;
    else {
        let e = i.getBoundingClientRect();
        o = e.top, s = e.height
    }
    let c = o + s * .5;
    return R((n * .5 - c) / n)
}

function X(e) {
    ue();
    let t = G.get(e);
    if (t) return t;
    let n = F(e),
        i = window.innerHeight,
        a = ve(e, n, i),
        o = Y(e),
        s = Math.min(n.height, i),
        c = Math.min(n.height, i * fe(e));
    if (s <= 0 || c <= 0) {
        let t = {
            progress: 0,
            transition: o ?? -1,
            screenOffset: a
        };
        return G.set(e, t), t
    }
    let l = Math.round(r((i - n.top) / (i + n.height), 0, 1) * 1e3) / 1e3,
        u = z(n.top, s, i),
        d = 1 - r(n.bottom / c, 0, 1),
        f = {
            progress: l,
            transition: o ?? Math.round(r(u + d, -1, 1) * 1e3) / 1e3,
            screenOffset: a
        };
    return G.set(e, f), f
}
var ye = 3e3,
    Z = null,
    be = 120,
    Q = null,
    $ = null,
    xe = e()(n((e, t) => ({
        sections: new Map,
        isInitialized: !1,
        hoveredElement: null,
        targetElement: null,
        isProgrammaticScroll: !1,
        exclusiveOverlayElement: null,
        exclusiveCoverActive: !1,
        register: (n, r, i) => {
            let a = t().sections.get(n),
                o = a ? null : X(n);
            e(e => {
                let t = new Map(e.sections);
                return t.set(n, {
                    content: r,
                    stateUrl: i,
                    progress: a?.progress ?? o?.progress ?? 0,
                    transition: a?.transition ?? o?.transition ?? -1,
                    screenOffset: a?.screenOffset ?? o?.screenOffset ?? 0
                }), {
                    sections: t
                }
            })
        },
        unregister: t => e(e => {
            J(t);
            let n = new Map(e.sections);
            n.delete(t);
            let r = {
                sections: n
            };
            return e.hoveredElement === t && (r.hoveredElement = null), e.targetElement === t && (r.targetElement = null), r
        }),
        updateVisibility: t => e(e => {
            let n;
            for (let [r, {
                    progress: i,
                    transition: a,
                    screenOffset: o
                }] of t) {
                let t = (n ?? e.sections).get(r);
                t && (t.progress !== i || t.transition !== a || t.screenOffset !== o) && (n ||= new Map(e.sections), n.set(r, {
                    ...t,
                    progress: i,
                    transition: a,
                    screenOffset: o
                }))
            }
            return n ? {
                sections: n
            } : e
        }),
        setInitialized: t => e({
            isInitialized: t
        }),
        setHoveredElement: n => {
            Z &&= (clearTimeout(Z), null), e({
                hoveredElement: n
            }), n !== null && (Z = setTimeout(() => {
                Z = null, t().hoveredElement === n && e({
                    hoveredElement: null
                })
            }, ye))
        },
        setTargetElement: t => {
            Q !== null && (clearTimeout(Q), Q = null), $ = null, e({
                targetElement: t
            })
        },
        setProgrammaticScroll: t => e(e => e.isProgrammaticScroll === t ? e : {
            isProgrammaticScroll: t
        }),
        setExclusiveOverlay: t => e(e => e.exclusiveOverlayElement === t ? e : {
            exclusiveOverlayElement: t,
            ...t === null ? {
                exclusiveCoverActive: !1
            } : {}
        }),
        setExclusiveCoverActive: t => e(e => e.exclusiveCoverActive === t ? e : {
            exclusiveCoverActive: t
        }),
        setTargetElementDebounced: t => {
            Q !== null && clearTimeout(Q), $ = t, Q = setTimeout(() => {
                Q = null, $ = null, e({
                    targetElement: t
                })
            }, be)
        },
        cancelTargetDebounce: e => {
            Q !== null && $ === e && (clearTimeout(Q), Q = null, $ = null)
        }
    })));
export {
    te as _, J as a, le as c, oe as d, j as f, se as g, N as h, X as i, M as l, ne as m, P as n, he as o, re as p, _e as r, ge as s, xe as t, g as u, m as v
};
//# sourceMappingURL=useSectionRegistry-BcvkvUON.js.map