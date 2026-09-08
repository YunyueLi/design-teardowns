const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/humanSignal-Z6CKM37D-DFT4SSvE.js", "assets/preload-helper-OoqSwf-_.js", "assets/chunk-T3U33ZZ5-BudId7g_.js", "assets/deviceSignal-4BHST67P-Cq7dtCSQ.js", "assets/ActiveConsentCompact-Z2BWK77P-CoobvcBf.js", "assets/rolldown-runtime-aKtaBQYM.js", "assets/react-Dvkprh6u.js", "assets/chunk-5MM2A4YW-DFO2Eo6J.js", "assets/react-_Rk6hbya.js", "assets/vanilla-DZJGj1NY.js", "assets/shallow-D10MTZ8f.js", "assets/ErrorPage-CVLmS95m.js", "assets/chunk-62JRHF6Z--_Rw5Cj0.js", "assets/jsx-runtime-DKdBMi_L.js", "assets/constants-CQcMVZ2M.js", "assets/Button-CJ5sb1K9.js", "assets/tailwind-config-Df-ObWL6.js", "assets/TheatreContext-BNWtaD1m.js", "assets/dist-4Ign8GoJ.js", "assets/dist-D4DOwfAL.js", "assets/deploy-urls-C_mnVA4y.js", "assets/dist-DJQtccsE.js", "assets/extension-B64hPBES.js"]))) => i.map(i => d[i]);
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
    A as r,
    I as i,
    L as a,
    N as o,
    P as s,
    S as c,
    a as l,
    d as u,
    j as d,
    r as f,
    s as p,
    u as m
} from "./chunk-62JRHF6Z--_Rw5Cj0.js";
import {
    t as h
} from "./jsx-runtime-DKdBMi_L.js";
import {
    n as g
} from "./production-CKrtFAQi.js";
import {
    a as _,
    i as ee,
    n as v,
    r as y,
    t as b
} from "./chunk-T3U33ZZ5-BudId7g_.js";
import {
    A as x,
    C as S,
    D as te,
    E as C,
    F as w,
    M as T,
    O as E,
    S as ne,
    T as re,
    _ as D,
    a as ie,
    b as O,
    d as k,
    f as A,
    g as j,
    i as M,
    j as ae,
    l as N,
    n as oe,
    o as P,
    p as F,
    s as se,
    t as I,
    u as L,
    v as ce,
    w as le,
    x as ue,
    y as R
} from "./chunk-5MM2A4YW-DFO2Eo6J.js";
import {
    t as de
} from "./BrowserSpecsListener-ZikkqexF.js";
import {
    t as z
} from "./useIsShopifyMerchantStore-DbJsgDUs.js";
import {
    i as fe,
    n as pe,
    r as me
} from "./reportError-D4E52G70.js";
import {
    t as he
} from "./safeLazy-9BL36byX.js";
import {
    a as ge,
    n as _e
} from "./constants-B_dPN1Ep.js";
var B = e(t(), 1),
    ve = -1,
    V = e => {
        addEventListener(`pageshow`, t => {
            t.persisted && (ve = t.timeStamp, e(t))
        }, !0)
    },
    H = (e, t, n, r) => {
        let i, a;
        return o => {
            t.value >= 0 && (o || r) && (a = t.value - (i ?? 0), (a || i === void 0) && (i = t.value, t.delta = a, t.rating = ((e, t) => e > t[1] ? `poor` : e > t[0] ? `needs-improvement` : `good`)(t.value, n), e(t)))
        }
    },
    ye = e => {
        requestAnimationFrame(() => requestAnimationFrame(e))
    },
    be = () => {
        let e = performance.getEntriesByType(`navigation`)[0];
        if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e
    },
    xe = () => be()?.activationStart ?? 0,
    U = (e, t = -1) => {
        let n = be(),
            r = `navigate`;
        return ve >= 0 ? r = `back-forward-cache` : n && (document.prerendering || xe() > 0 ? r = `prerender` : document.wasDiscarded ? r = `restore` : n.type && (r = n.type.replace(/_/g, `-`))), {
            name: e,
            value: t,
            rating: `good`,
            delta: 0,
            entries: [],
            id: `v5-${Date.now()}-${Math.floor(8999999999999*Math.random())+0xe8d4a51000}`,
            navigationType: r
        }
    },
    Se = new WeakMap;

function Ce(e, t) {
    return Se.get(e) || Se.set(e, new t), Se.get(e)
}
var we = class {
        t;
        i = 0;
        o = [];
        h(e) {
            if (e.hadRecentInput) return;
            let t = this.o[0],
                n = this.o.at(-1);
            this.i && t && n && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (this.i += e.value, this.o.push(e)) : (this.i = e.value, this.o = [e]), this.t?.(e)
        }
    },
    Te = (e, t, n = {}) => {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                let r = new PerformanceObserver(e => {
                    queueMicrotask(() => {
                        t(e.getEntries())
                    })
                });
                return r.observe({
                    type: e,
                    buffered: !0,
                    ...n
                }), r
            }
        } catch {}
    },
    Ee = e => {
        let t = !1;
        return () => {
            t ||= (e(), !0)
        }
    },
    W = -1,
    De = new Set,
    Oe = () => document.visibilityState !== `hidden` || document.prerendering ? 1 / 0 : 0,
    ke = e => {
        if (document.visibilityState === `hidden`) {
            if (e.type === `visibilitychange`)
                for (let e of De) e();
            isFinite(W) || (W = e.type === `visibilitychange` ? e.timeStamp : 0, removeEventListener(`prerenderingchange`, ke, !0))
        }
    },
    Ae = () => {
        if (W < 0) {
            let e = xe();
            W = (document.prerendering ? void 0 : globalThis.performance.getEntriesByType(`visibility-state`).find(t => t.name === `hidden` && t.startTime >= e)?.startTime) ?? Oe(), addEventListener(`visibilitychange`, ke, !0), addEventListener(`prerenderingchange`, ke, !0), V(() => {
                setTimeout(() => {
                    W = Oe()
                })
            })
        }
        return {
            get firstHiddenTime() {
                return W
            },
            onHidden(e) {
                De.add(e)
            }
        }
    },
    je = e => {
        document.prerendering ? addEventListener(`prerenderingchange`, e, !0) : e()
    },
    Me = [1800, 3e3],
    Ne = (e, t = {}) => {
        je(() => {
            let n = Ae(),
                r, i = U(`FCP`),
                a = Te(`paint`, e => {
                    for (let t of e) t.name === `first-contentful-paint` && (a.disconnect(), t.startTime < n.firstHiddenTime && (i.value = Math.max(t.startTime - xe(), 0), i.entries.push(t), r(!0)))
                });
            a && (r = H(e, i, Me, t.reportAllChanges), V(n => {
                i = U(`FCP`), r = H(e, i, Me, t.reportAllChanges), ye(() => {
                    i.value = performance.now() - n.timeStamp, r(!0)
                })
            }))
        })
    },
    Pe = [.1, .25],
    Fe = (e, t = {}) => {
        let n = Ae();
        Ne(Ee(() => {
            let r, i = U(`CLS`, 0),
                a = Ce(t, we),
                o = e => {
                    for (let t of e) a.h(t);
                    a.i > i.value && (i.value = a.i, i.entries = a.o, r())
                },
                s = Te(`layout-shift`, o);
            s && (r = H(e, i, Pe, t.reportAllChanges), n.onHidden(() => {
                o(s.takeRecords()), r(!0)
            }), V(() => {
                a.i = 0, i = U(`CLS`, 0), r = H(e, i, Pe, t.reportAllChanges), ye(r)
            }), setTimeout(r))
        }))
    },
    Ie = 0,
    Le = 1 / 0,
    Re = 0,
    ze = e => {
        for (let t of e) t.interactionId && (Le = Math.min(Le, t.interactionId), Re = Math.max(Re, t.interactionId), Ie = Re ? (Re - Le) / 7 + 1 : 0)
    },
    Be, Ve = () => Be ? Ie : performance.interactionCount ?? 0,
    He = () => {
        `interactionCount` in performance || Be || (Be = Te(`event`, ze, {
            durationThreshold: 0
        }))
    },
    Ue = 0,
    We = class {
        l = [];
        u = new Map;
        m;
        p;
        v() {
            Ue = Ve(), this.l.length = 0, this.u.clear()
        }
        T() {
            let e = Math.min(this.l.length - 1, Math.floor((Ve() - Ue) / 50));
            return this.l[e]
        }
        h(e) {
            if (this.m?.(e), !e.interactionId && e.entryType !== `first-input`) return;
            let t = this.l.at(-1),
                n = this.u.get(e.interactionId);
            if (n || this.l.length < 10 || e.duration > t.L) {
                if (n ? e.duration > n.L ? (n.entries = [e], n.L = e.duration) : e.duration === n.L && e.startTime === n.entries[0].startTime && n.entries.push(e) : (n = {
                        id: e.interactionId,
                        entries: [e],
                        L: e.duration
                    }, this.u.set(n.id, n), this.l.push(n)), this.l.sort((e, t) => t.L - e.L), this.l.length > 10) {
                    let e = this.l.splice(10);
                    for (let t of e) this.u.delete(t.id)
                }
                this.p?.(n)
            }
        }
    },
    Ge = e => {
        let t = globalThis.requestIdleCallback || setTimeout,
            n = globalThis.cancelIdleCallback || clearTimeout;
        if (document.visibilityState === `hidden`) e();
        else {
            let r = Ee(e),
                i = -1,
                a = () => {
                    n(i), r()
                };
            addEventListener(`visibilitychange`, a, {
                once: !0,
                capture: !0
            }), i = t(() => {
                removeEventListener(`visibilitychange`, a, {
                    capture: !0
                }), r()
            })
        }
    },
    Ke = [200, 500],
    qe = (e, t = {}) => {
        if (!globalThis.PerformanceEventTiming || !(`interactionId` in PerformanceEventTiming.prototype)) return;
        let n = Ae();
        je(() => {
            He();
            let r, i = U(`INP`),
                a = Ce(t, We),
                o = e => {
                    Ge(() => {
                        for (let t of e) a.h(t);
                        let t = a.T();
                        t && t.L !== i.value && (i.value = t.L, i.entries = t.entries, r())
                    })
                },
                s = Te(`event`, o, {
                    durationThreshold: t.durationThreshold ?? 40
                });
            r = H(e, i, Ke, t.reportAllChanges), s && (s.observe({
                type: `first-input`,
                buffered: !0
            }), n.onHidden(() => {
                o(s.takeRecords()), r(!0)
            }), V(() => {
                a.v(), i = U(`INP`), r = H(e, i, Ke, t.reportAllChanges)
            }))
        })
    },
    Je = class {
        m;
        h(e) {
            this.m?.(e)
        }
    },
    Ye = [2500, 4e3],
    Xe = (e, t = {}) => {
        je(() => {
            let n = Ae(),
                r, i = U(`LCP`),
                a = Ce(t, Je),
                o = e => {
                    t.reportAllChanges || (e = e.slice(-1));
                    for (let t of e) a.h(t), t.startTime < n.firstHiddenTime && (i.value = Math.max(t.startTime - xe(), 0), i.entries = [t], r())
                },
                s = Te(`largest-contentful-paint`, o);
            if (s) {
                r = H(e, i, Ye, t.reportAllChanges);
                let n = Ee(() => {
                        o(s.takeRecords()), s.disconnect(), r(!0)
                    }),
                    a = e => {
                        e.isTrusted && (Ge(n), removeEventListener(e.type, a, {
                            capture: !0
                        }))
                    };
                for (let e of [`keydown`, `click`, `visibilitychange`]) addEventListener(e, a, {
                    capture: !0
                });
                V(n => {
                    i = U(`LCP`), r = H(e, i, Ye, t.reportAllChanges), ye(() => {
                        i.value = performance.now() - n.timeStamp, r(!0)
                    })
                })
            }
        })
    },
    Ze = [800, 1800],
    Qe = e => {
        document.prerendering ? je(() => Qe(e)) : document.readyState === `complete` ? setTimeout(e) : addEventListener(`load`, () => Qe(e), !0)
    },
    $e = (e, t = {}) => {
        let n = U(`TTFB`),
            r = H(e, n, Ze, t.reportAllChanges);
        Qe(() => {
            let i = be();
            i && (n.value = Math.max(i.responseStart - xe(), 0), n.entries = [i], r(!0), V(() => {
                n = U(`TTFB`, 0), r = H(e, n, Ze, t.reportAllChanges), r(!0)
            }))
        })
    };

function et(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r
}

function tt(e) {
    if (Array.isArray(e)) return e
}

function nt(e) {
    if (Array.isArray(e)) return et(e)
}

function rt(e) {
    if (e === void 0) throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
    return e
}

function it(e, t, n, r, i, a, o) {
    try {
        var s = e[a](o),
            c = s.value
    } catch (e) {
        n(e);
        return
    }
    s.done ? t(c) : Promise.resolve(c).then(r, i)
}

function G(e) {
    return function() {
        var t = this,
            n = arguments;
        return new Promise(function(r, i) {
            var a = e.apply(t, n);

            function o(e) {
                it(a, r, i, o, s, `next`, e)
            }

            function s(e) {
                it(a, r, i, o, s, `throw`, e)
            }
            o(void 0)
        })
    }
}

function at(e, t, n) {
    return t = J(t), vt(e, wt() ? Reflect.construct(t, n || [], J(e).constructor) : t.apply(e, n))
}

function K(e, t) {
    if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`)
}

function ot(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, `value` in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
}

function q(e, t, n) {
    return t && ot(e.prototype, t), n && ot(e, n), e
}

function st(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function ct(e, t, n) {
    return ct = typeof Reflect < `u` && Reflect.get ? Reflect.get : function(e, t, n) {
        var r = xt(e, t);
        if (r) {
            var i = Object.getOwnPropertyDescriptor(r, t);
            return i.get ? i.get.call(n || e) : i.value
        }
    }, ct(e, t, n || e)
}

function J(e) {
    return J = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
    }, J(e)
}

function lt(e, t) {
    if (typeof t != `function` && t !== null) throw TypeError(`Super expression must either be null or a function`);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }), t && yt(e, t)
}

function ut(e, t) {
    return t != null && typeof Symbol < `u` && t[Symbol.hasInstance] ? !!t[Symbol.hasInstance](e) : e instanceof t
}

function dt(e) {
    if (typeof Symbol < `u` && e[Symbol.iterator] != null || e[`@@iterator`] != null) return Array.from(e)
}

function ft(e, t) {
    var n = e == null ? null : typeof Symbol < `u` && e[Symbol.iterator] || e[`@@iterator`];
    if (n != null) {
        var r = [],
            i = !0,
            a = !1,
            o, s;
        try {
            for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
        } catch (e) {
            a = !0, s = e
        } finally {
            try {
                !i && n.return != null && n.return()
            } finally {
                if (a) throw s
            }
        }
        return r
    }
}

function pt() {
    throw TypeError(`Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function mt() {
    throw TypeError(`Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Y(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] == null ? {} : arguments[t],
            r = Object.keys(n);
        typeof Object.getOwnPropertySymbols == `function` && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable
        }))), r.forEach(function(t) {
            st(e, t, n[t])
        })
    }
    return e
}

function ht(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function X(e, t) {
    return t ??= {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ht(Object(t)).forEach(function(n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
    }), e
}

function gt(e, t) {
    if (e == null) return {};
    var n = {},
        r, i, a;
    if (typeof Reflect < `u` && Reflect.ownKeys) {
        for (r = Reflect.ownKeys(e), a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
        return n
    }
    if (n = _t(e, t), Object.getOwnPropertySymbols)
        for (r = Object.getOwnPropertySymbols(e), a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
    return n
}

function _t(e, t) {
    if (e == null) return {};
    var n = {},
        r = Object.getOwnPropertyNames(e),
        i, a;
    for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
    return n
}

function vt(e, t) {
    return t && (Z(t) === `object` || typeof t == `function`) ? t : rt(e)
}

function yt(e, t) {
    return yt = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t, e
    }, yt(e, t)
}

function bt(e, t) {
    return tt(e) || ft(e, t) || Ct(e, t) || pt()
}

function xt(e, t) {
    for (; !Object.prototype.hasOwnProperty.call(e, t) && (e = J(e), e !== null););
    return e
}

function St(e) {
    return nt(e) || dt(e) || Ct(e) || mt()
}

function Z(e) {
    "@swc/helpers - typeof";
    return e && typeof Symbol < `u` && e.constructor === Symbol ? `symbol` : typeof e
}

function Ct(e, t) {
    if (e) {
        if (typeof e == `string`) return et(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if (n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`) return Array.from(n);
        if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return et(e, t)
    }
}

function wt() {
    try {
        var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
    } catch {}
    return (wt = function() {
        return !!e
    })()
}

function Q(e, t) {
    var n, r, i, a = {
            label: 0,
            sent: function() {
                if (i[0] & 1) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        },
        o = Object.create((typeof Iterator == `function` ? Iterator : Object).prototype),
        s = Object.defineProperty;
    return s(o, `next`, {
        value: c(0)
    }), s(o, `throw`, {
        value: c(1)
    }), s(o, `return`, {
        value: c(2)
    }), typeof Symbol == `function` && s(o, Symbol.iterator, {
        value: function() {
            return this
        }
    }), o;

    function c(e) {
        return function(t) {
            return l([e, t])
        }
    }

    function l(s) {
        if (n) throw TypeError(`Generator is already executing.`);
        for (; o && (o = 0, s[0] && (a = 0)), a;) try {
            if (n = 1, r && (i = s[0] & 2 ? r.return : s[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, s[1])).done) return i;
            switch (r = 0, i && (s = [s[0] & 2, i.value]), s[0]) {
                case 0:
                case 1:
                    i = s;
                    break;
                case 4:
                    return a.label++, {
                        value: s[1],
                        done: !1
                    };
                case 5:
                    a.label++, r = s[1], s = [0];
                    continue;
                case 7:
                    s = a.ops.pop(), a.trys.pop();
                    continue;
                default:
                    if ((i = a.trys, !(i = i.length > 0 && i[i.length - 1])) && (s[0] === 6 || s[0] === 2)) {
                        a = 0;
                        continue
                    }
                    if (s[0] === 3 && (!i || s[1] > i[0] && s[1] < i[3])) {
                        a.label = s[1];
                        break
                    }
                    if (s[0] === 6 && a.label < i[1]) {
                        a.label = i[1], i = s;
                        break
                    }
                    if (i && a.label < i[2]) {
                        a.label = i[2], a.ops.push(s);
                        break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
            }
            s = t.call(e, a)
        } catch (e) {
            s = [6, e], r = 0
        } finally {
            n = i = 0
        }
        if (s[0] & 5) throw s[1];
        return {
            value: s[0] ? s[1] : void 0,
            done: !0
        }
    }
}
var Tt = function(e) {
        var t = N[e.hostname] || N.default;
        if (typeof t == `string`) return t;
        var n = bt(e.pathname.toLowerCase().split(`/`), 2)[1];
        return t[n === void 0 ? `` : n] || t.default || `en`
    },
    Et = function(e) {
        var t = e.getBoundingClientRect(),
            n = !S(e);
        return {
            left: Math.round(t.left + (n ? window.scrollX - e.clientLeft : 0)),
            top: Math.round(t.top + (n ? window.scrollY - e.clientTop : 0))
        }
    },
    Dt = function(e) {
        var t = e.element,
            n = e.clientMessageId,
            r = n === void 0 ? w() : n,
            i = e.eventType,
            a = e.track,
            o = e.store,
            s = e.options,
            c = s === void 0 ? {
                extraMetadata: {}
            } : s,
            l = t.closest(ie);
        if (!(!l || l.matches(`[data-click-disabled], [data-click-enabled="false"]`))) {
            var u = Et(l),
                d = u.left,
                f = u.top,
                p = x(l),
                m = p.elementName,
                h = p.elementType,
                g = p.sectionName,
                _ = p.sectionIndex,
                ee = p.componentTree,
                v = p.extraMetadata,
                y = Y({}, v, c?.extraMetadata),
                b = l.getAttribute(`href`) || ``,
                S = l.innerText || l.textContent || l.getAttribute(`aria-label`) || ``;
            if (S = St(S).slice(0, 50).join(``), !o.disableLegacyTracking) {
                var te = {
                    schemaId: `website_click_event/1.5`,
                    payload: {
                        pageViewToken: o.pageViewToken || ``,
                        componentTree: ee,
                        xCoord: d,
                        yCoord: f,
                        recirculation: b,
                        targetName: m,
                        parentName: g,
                        parentIndex: _,
                        clickType: h,
                        eventType: i,
                        innerText: S,
                        extraMetadata: JSON.stringify(y)
                    }
                };
                a.dux(te, {
                    clientMessageId: r
                })
            }
            if (o.enableDenormalization && o.pageViewToken && a.denormalizedDux) {
                var C = {
                    schemaId: `dux_website_events/1.7`,
                    payload: {
                        eventType: `click`,
                        pageViewToken: o.pageViewToken,
                        clickComponentTree: ee,
                        clickTargetName: m,
                        clickParentName: g,
                        clickParentIndex: _,
                        clickXCoord: d,
                        clickYCoord: f,
                        clickRecirculation: b,
                        clickInnerText: S,
                        clickTagType: h,
                        clickEventType: i,
                        clickExtraMetadata: JSON.stringify(y)
                    }
                };
                a.denormalizedDux(C, {
                    clientMessageId: r
                })
            }
            if (a.gtm) {
                var T = t.closest(M),
                    E = T ? T.dataset : {
                        eventCategory: _ ? `${g}-${_}` : g,
                        eventAction: h,
                        eventLabel: m
                    };
                Object.assign(E, {
                    event: h,
                    eventName: h,
                    eventType: m,
                    eventText: S,
                    eventLocation: _ ? `${g}-${_}` : g,
                    eventUrl: b,
                    extraMetadata: JSON.stringify(j(y))
                }), a.gtm(E)
            }
        }
    },
    Ot, kt = function(e) {
        Ot && e?.forEach(function(e) {
            v(`click`, Ot, e, !0), v(`contextmenu`, Ot, e, !0), v(`auxclick`, Ot, e, !0)
        })
    },
    At = function(e, t, n) {
        Ot = function(n) {
            var r = ne(n),
                i = re(n) ? `shadow_dom` : `global_listener`;
            Dt({
                element: r,
                eventType: n.type,
                track: e,
                store: t,
                options: {
                    extraMetadata: {
                        triggeredBy: i
                    }
                }
            })
        }, kt(n)
    },
    jt = function(e) {
        return e === void 0 ? void 0 : parseInt(e, 10)
    },
    Mt = function(e) {
        if (typeof e != `string`) return {};
        var t = e?.replace(/[^\w\s\n():/.$-]/g, ``),
            n = t?.match(/(https?:\/\/[^\s:\n]+|\/[^\s:\n]+)/) || [],
            r = t?.match(/:\d+:\d+/)?.[0].split(`:`);
        return {
            filename: n[1],
            lineNumber: jt(r?.[1]),
            columnNumber: jt(r?.[2])
        }
    },
    Nt = function(e, t) {
        b(`error`, function(n) {
            var r = Mt(n?.error?.stack || n?.error?.message || n?.message) || {},
                i = r.filename,
                a = r.lineNumber,
                o = r.columnNumber,
                s = n.error?.message || n.message || `Unknown error`,
                c = n.filename || i,
                l = n.error?.stack,
                u = n.lineno || a,
                d = {
                    url: location.href
                };
            o && (d.columnNumber = n.colno || o);
            var f = JSON.stringify(d);
            if (!t.disableLegacyTracking) {
                var p = {
                    schemaId: `website_error_event/1.1`,
                    payload: {
                        pageViewToken: t.pageViewToken || ``,
                        message: s,
                        fileName: c,
                        stack: l,
                        lineNumber: u,
                        extraMetadata: f
                    }
                };
                e.dux(p)
            }
            if (t.enableDenormalization && t.pageViewToken && e.denormalizedDux) {
                var m = {
                    schemaId: `dux_website_events/1.7`,
                    payload: {
                        eventType: `error`,
                        pageViewToken: t.pageViewToken,
                        errorMessage: s,
                        errorFileName: c,
                        errorStack: l,
                        errorLineNumber: u,
                        errorExtraMetadata: f
                    }
                };
                e.denormalizedDux(m)
            }
        }, window)
    },
    Pt = function(e) {
        var t = ut(e?.currentTarget, HTMLFormElement) ? e?.currentTarget : e?.target,
            n = e?.submitter || e?.target,
            r = t.action,
            i = e.defaultPrevented,
            a = ``,
            o;
        i && (o = Array.from(t.elements).find(function(e) {
            return ut(e, HTMLInputElement) && e.validationMessage
        }), o && (a = `${o.name||o.id}: ${o?.validationMessage}`));
        var s = x(t, !1).componentTree,
            c = s === void 0 ? `` : s,
            l = x(n, !0).componentTree;
        return {
            formEl: t,
            submitterEl: n,
            errorEl: o,
            hasError: i,
            action: r,
            message: a,
            componentTree: c,
            submitterComponentTree: l === void 0 ? `` : l
        }
    },
    Ft = function(e, t) {
        v(`submit`, function(n) {
            if (n) {
                var r = Pt(n),
                    i = r.hasError,
                    a = r.message,
                    o = r.action,
                    s = r.componentTree,
                    c = r.submitterComponentTree,
                    l = i ? `error` : `success`;
                if (!t.disableLegacyTracking) {
                    var u = {
                        schemaId: `website_form_event/2.0`,
                        payload: {
                            pageViewToken: t.pageViewToken || ``,
                            action: o,
                            state: l,
                            componentTree: s,
                            submitterComponentTree: c,
                            message: a
                        }
                    };
                    e.dux(u)
                }
                if (t.enableDenormalization && t.pageViewToken && e.denormalizedDux) {
                    var d = {
                        schemaId: `dux_website_events/1.7`,
                        payload: {
                            eventType: `form`,
                            pageViewToken: t.pageViewToken,
                            formAction: o,
                            formState: l,
                            formComponentTree: s,
                            formSubmitterComponentTree: c,
                            formMessage: a
                        }
                    };
                    e.denormalizedDux(d)
                }
            }
        }, document?.body, !0)
    },
    It = [],
    Lt = null,
    Rt = function(e, t) {
        var n = 0,
            r = 0,
            i = !1,
            a = t.pageViewToken;
        It.forEach(function(e) {
            return _(e)
        }), It = [], Lt && _(Lt), Lt = null;
        var o = function() {
                var e = (document?.documentElement?.scrollHeight || document?.body?.scrollHeight) - document?.documentElement?.clientHeight,
                    t = document?.documentElement?.scrollTop || document?.body?.scrollTop,
                    i = t ? Math.round(t / e * 100) : 0;
                return i > n && (n = i, r = n < 25 ? 0 : n < 50 ? 25 : n < 75 ? 50 : n < 95 ? 75 : 100), r
            },
            s = function(e) {
                c(o())
            },
            c = function(n) {
                if (!i) {
                    if (i = !0, !t.disableLegacyTracking) {
                        var r = {
                            schemaId: `website_scroll_event/1.0`,
                            payload: {
                                pageViewToken: a,
                                quadrant: n
                            }
                        };
                        e.dux(r, {
                            flush: !0
                        })
                    }
                    if (t.enableDenormalization && a) {
                        var o, s = {
                            schemaId: `dux_website_events/1.7`,
                            payload: {
                                eventType: `scroll`,
                                pageViewToken: a,
                                scrollMaxScrollQuadrant: n
                            }
                        };
                        (o = e.denormalizedDux) == null || o.call(e, s, {
                            flush: !0
                        })
                    }
                    e.gtm && e.gtm({
                        event: `scroll`,
                        scrollDepth: n
                    }), It.forEach(function(e) {
                        return _(e)
                    })
                }
            },
            l = O(function() {
                var e = o();
                e === 100 && c(e)
            });
        It.push(v(`scroll`, l, document), v(`beforeunload`, s, window), v(`unload`, s, window), v(`pagehide`, s, window), v(`visibilitychange`, s, document)), Lt = b(`website_client_page_view/2.14`, function(n) {
            c(r), Rt(e, t)
        }, document), l()
    },
    zt = `hidden`,
    Bt = `visible`,
    Vt = function(e, t) {
        var n = new Date().getTime(),
            r = function(r) {
                return function() {
                    var a = new Date().getTime(),
                        o = Math.round(a - n);
                    if (!t.disableLegacyTracking) {
                        var s = {
                            schemaId: `website_visibility_change_event/1.0`,
                            payload: {
                                pageViewToken: t.pageViewToken || ``,
                                state: r,
                                duration: o
                            }
                        };
                        e.dux(s, {
                            flush: !0
                        })
                    }
                    if (t.enableDenormalization && t.pageViewToken && e.denormalizedDux) {
                        var c = {
                            schemaId: `dux_website_events/1.7`,
                            payload: {
                                eventType: `visibility_change`,
                                pageViewToken: t.pageViewToken,
                                visibilityState: r,
                                visibilityDuration: o
                            }
                        };
                        e.denormalizedDux(c, {
                            flush: !0
                        })
                    }
                    n = a, i(r === Bt ? zt : Bt)
                }
            },
            i = function(e) {
                y([
                    [`visibilitychange`, r(e), document],
                    [e === Bt ? `pageshow` : `pagehide`, r(e), window, !0]
                ])
            };
        i(zt)
    },
    Ht = {
        CLS: `cumulativeLayoutShift`,
        CLS_ENTRIES: `cumulativeLayoutShiftEntries`,
        FCP: `firstContentfulPaint`,
        LCP: `largestContentfulPaint`,
        TTFB: `timeToFirstByte`,
        INP: `interactionToNextPaint`,
        FPS: `framesPerSecond`
    },
    Ut = function(e, t) {
        return G(function() {
            var n, r, i, a, o;
            return Q(this, function(s) {
                return n = !1, r = function(r) {
                    var a, o;
                    if (!n) {
                        var s = (o = performance) == null || (a = o.getEntriesByType) == null ? void 0 : a.call(o, `navigation`)?.[0],
                            c = s?.domContentLoadedEventEnd ? Math.round(s.domContentLoadedEventEnd - s.startTime) : 0;
                        if (!t.disableLegacyTracking) {
                            var l = {
                                schemaId: `website_web_vitals_event/2.1`,
                                payload: Y({
                                    pageViewToken: i
                                }, {}, r.CLS ? {
                                    cumulativeLayoutShift: Math.round(r.CLS.value),
                                    cumulativeLayoutShiftEntries: r.CLS.entries.length
                                } : {}, r.FCP ? {
                                    firstContentfulPaint: Math.round(r.FCP.value)
                                } : {}, r.LCP ? {
                                    largestContentfulPaint: Math.round(r.LCP.value)
                                } : {}, r.TTFB ? {
                                    timeToFirstByte: Math.round(r.TTFB.value)
                                } : {}, r.INP ? {
                                    interactionToNextPaint: Math.round(r.INP.value)
                                } : {})
                            };
                            e.dux(l, {
                                flush: !0
                            })
                        }
                        if (t.enableDenormalization && t.pageViewToken && e.denormalizedDux) {
                            var u = {
                                schemaId: `dux_website_events/1.7`,
                                payload: Y({
                                    eventType: `web_vitals`,
                                    pageViewToken: t.pageViewToken
                                }, {}, c ? {
                                    webVitalsDomContentLoaded: c
                                } : {}, r.CLS ? {
                                    webVitalsCumulativeLayoutShift: Math.round(r.CLS.value),
                                    webVitalsCumulativeLayoutShiftEntries: r.CLS.entries.length
                                } : {}, r.FCP ? {
                                    webVitalsFirstContentfulPaint: Math.round(r.FCP.value)
                                } : {}, r.LCP ? {
                                    webVitalsLargestContentfulPaint: Math.round(r.LCP.value)
                                } : {}, r.TTFB ? {
                                    webVitalsTimeToFirstByte: Math.round(r.TTFB.value)
                                } : {}, r.INP ? {
                                    webVitalsInteractionToNextPaint: Math.round(r.INP.value)
                                } : {})
                            };
                            e.denormalizedDux(u, {
                                flush: !0
                            })
                        }
                        n = !0
                    }
                }, i = t.pageViewToken, a = {}, o = function(e) {
                    e.name in Ht && (a[e.name] = e)
                }, Fe(o, {
                    reportAllChanges: !0
                }), qe(o, {
                    reportAllChanges: !0
                }), Xe(o, {
                    reportAllChanges: !0
                }), $e(o, {
                    reportAllChanges: !0
                }), Ne(o, {
                    reportAllChanges: !0
                }), y([
                    [`beforeunload`, function() {
                        return r(a)
                    }, window, !0],
                    [`unload`, function() {
                        return r(a)
                    }, window, !0],
                    [`pagehide`, function() {
                        return r(a)
                    }, window, !0],
                    [`visibilitychange`, function() {
                        return r(a)
                    }, document, !0]
                ]), [2]
            })
        })()
    },
    Wt = function(e) {
        return e.schemaId !== void 0
    },
    Gt = `dux_website_events/`,
    Kt = function(e) {
        return e !== null && (e === void 0 ? `undefined` : Z(e)) == `object` && typeof e.schemaId == `string` && e.schemaId.startsWith(Gt)
    },
    qt = function(e) {
        return (document.querySelector(`link[rel="canonical"]`)?.getAttribute(`href`) || e).split(/[?#]/)[0]
    },
    Jt = function(e) {
        if (e) try {
            return (new URL(e).pathname.split(`/`).filter(Boolean).join(`/`) || `home`).toLowerCase()
        } catch (e) {
            console.error(`malformed href`, e)
        }
        return ``
    },
    Yt = function(e, t) {
        var n = Jt(document.querySelector(`link[rel="alternate"][hreflang="en"]`)?.getAttribute(`href`));
        return n ||= Jt(qt(e)), t && n === t.toLowerCase() && (n = `home`), n
    },
    Xt = new Map;

function Zt() {
    try {
        var e = `__dux_storage_test__`;
        return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
    } catch {
        return !1
    }
}
var Qt = Zt(),
    $t = {
        getItem: function(e) {
            if (Qt) try {
                return sessionStorage.getItem(e)
            } catch {
                return Xt.get(e) ?? null
            }
            return Xt.get(e) ?? null
        },
        setItem: function(e, t) {
            if (Qt) try {
                sessionStorage.setItem(e, t);
                return
            } catch {}
            Xt.set(e, t)
        },
        removeItem: function(e) {
            if (Qt) try {
                sessionStorage.removeItem(e);
                return
            } catch {}
            Xt.delete(e)
        }
    },
    en = 10,
    tn = 1024,
    nn = function() {
        function e(t) {
            K(this, e), this.store = t, this.sessionStorageKey = L, this.inMemoryBuffer = this.createEmptyBuffer(), this.track = this.track.bind(this), this.flush = this.flush.bind(this), this.debounceFlush = O(this.flush.bind(this), 250), v(`beforeunload`, this.flush, window), v(`unload`, this.flush, window), v(`pagehide`, this.flush, window)
        }
        return q(e, [{
            key: `track`,
            value: function(e, t) {
                var n = t || {},
                    r = n.flush,
                    i = r !== void 0 && r,
                    a = n.clientMessageId,
                    o = a === void 0 ? w() : a,
                    s = n.isEssential;
                this.refreshLegacySessionToken();
                var c;
                if (c = Wt(e) ? X(Y({}, e), {
                        metadata: {
                            eventCreatedAtMs: Date.now(),
                            clientMessageId: o
                        }
                    }) : e, this.store.enableActiveConsent && this.store.isConsentRequired && !s && this.store.consentState?.consentedAnalytics !== `1`) {
                    var l = this.getSessionStorageBuffer();
                    this.store.consentState?.consentedAnalytics !== `-1` && l.events.length < tn && (this.addEventToBuffer(l, c), this.persistToSessionStorage(l))
                } else this.addEventToBuffer(this.inMemoryBuffer, c), i || this.inMemoryBuffer.events.length >= en ? this.flush() : this.debounceFlush()
            }
        }, {
            key: `flush`,
            value: function() {
                if (!((typeof window > `u` ? `undefined` : Z(window)) > `u`)) {
                    var e = this.createEmptyBuffer();
                    this.store.consentState?.consentedAnalytics === `1` && (e = this.getSessionStorageBuffer(), $t.removeItem(this.sessionStorageKey));
                    var t = this.mergeBuffers(this.inMemoryBuffer, e);
                    this.inMemoryBuffer = this.createEmptyBuffer(), t.events.length && this.send(t.events, t)
                }
            }
        }, {
            key: `createEmptyBuffer`,
            value: function() {
                return {
                    events: []
                }
            }
        }, {
            key: `getSessionStorageBuffer`,
            value: function() {
                var e = this.createEmptyBuffer(),
                    t = $t.getItem(this.sessionStorageKey);
                if (t) try {
                    var n = JSON.parse(t);
                    Array.isArray(n) ? e = X(Y({}, e), {
                        events: n
                    }) : n && Array.isArray(n.events) && (e = Y({}, this.createEmptyBuffer(), n))
                } catch {}
                return e
            }
        }, {
            key: `addEventToBuffer`,
            value: function(e, t) {
                e.events.push(t)
            }
        }, {
            key: `mergeBuffers`,
            value: function(e, t) {
                return X(Y({}, t, e), {
                    events: St(e.events).concat(St(t.events))
                })
            }
        }, {
            key: `persistToSessionStorage`,
            value: function(e) {
                $t.setItem(this.sessionStorageKey, JSON.stringify(e))
            }
        }, {
            key: `createEventMessage`,
            value: function(e, t) {
                var n = {
                    enableActiveConsent: this.store.enableActiveConsent || !1,
                    consentZones: this.store.consentZones,
                    enableProtoEventForwarding: !!this.store.protoEventSource || this.store.enableProtoEventForwarding || !1,
                    protoEventSource: this.store.protoEventSource,
                    enableOptOutSaleOfData: this.store.enableOptOutSaleOfData || !1,
                    disableLegacyCookies: this.store.disableLegacyCookies || !1,
                    protoSessionAppType: this.store.protoSessionAppType,
                    enableSessionWrites: this.store.enableSessionWrites,
                    events: e
                };
                return this.store.isStateless && (n.essentialToken = this.store.essentialToken, n.multiTrackToken = this.store.multiTrackToken, n.sessionToken = this.store.sessionToken), n
            }
        }, {
            key: `getEndpoint`,
            value: function() {
                return this.store.eventHandlerEndpoint || `/__dux`
            }
        }, {
            key: `send`,
            value: function(e, t) {
                return G(function() {
                    var n, r, i, a;
                    return Q(this, function(o) {
                        n = this.createEventMessage(e, t), r = JSON.stringify(n), i = this.getEndpoint();
                        try {
                            if (this.isSendBeaconAndBlobSupported() && (a = new window.Blob([r], {
                                    type: `application/json`
                                }), window.navigator.sendBeacon.bind(window.navigator)(i, a))) return [2, Promise.resolve({
                                status: 200
                            })]
                        } catch {}
                        return [2, fetch(i, {
                            method: `POST`,
                            headers: {
                                "cache-control": `no-store`,
                                "content-type": `application/json`
                            },
                            credentials: `include`,
                            body: r,
                            keepalive: !0
                        }).then(function(e) {
                            return {
                                response: e,
                                message: n,
                                status: e.status || 0
                            }
                        }).catch(function(e) {
                            return {
                                message: n,
                                status: 0,
                                error: e
                            }
                        })]
                    })
                }).call(this)
            }
        }, {
            key: `isSendBeaconAndBlobSupported`,
            value: function() {
                return window && window.navigator && typeof window.navigator.sendBeacon == `function` && typeof window.Blob == `function`
            }
        }, {
            key: `canLoadAnalytics`,
            value: function() {
                return !this.store.enableActiveConsent || !this.store.isConsentRequired || this.store.consentState?.consentedAnalytics === `1`
            }
        }, {
            key: `refreshLegacySessionToken`,
            value: function() {
                if (!(!this.canLoadAnalytics() || this.store.isStateless && this.store.sessionToken || this.store.disableLegacyCookies)) {
                    var e = R(`_shopify_s`);
                    if (e) {
                        this.store.sessionToken = e;
                        return
                    }
                    var t = w();
                    this.store.sessionToken = t, D(`_shopify_s`, t, {
                        maxage: 1800 * 1e3,
                        path: `/`,
                        secure: !0,
                        samesite: `lax`,
                        domain: E(window.location.href)
                    })
                }
            }
        }]), e
    }(),
    rn = function(e) {
        lt(t, e);

        function t() {
            K(this, t);
            var e = at(this, t, arguments);
            return e.sessionStorageKey = L, e
        }
        return t
    }(nn),
    an = function() {
        function e(t) {
            var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
            K(this, e), this.store = t, this.queue = n, this.queueInterval = null, this.track = this.track.bind(this)
        }
        return q(e, [{
            key: `track`,
            value: function(e) {
                var t = this,
                    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                    r = Y({
                        project: `brochure`,
                        service: this.store.service,
                        user_token: this.store.multiTrackToken || ``,
                        event: `event`,
                        event_non_interaction: `false`,
                        event_context: n,
                        experiment_variation_id: this.store.experimentVariationId || ``
                    }, j(e));
                window.dataLayer ? window.dataLayer.push(r) : (this.queue.push(r), this.queueInterval ||= setInterval(function() {
                    if (window.dataLayer)
                        for (t.queueInterval && clearInterval(t.queueInterval); t.queue.length;) {
                            var e = t.queue.shift();
                            window.dataLayer.push(e)
                        }
                }, 100))
            }
        }]), e
    }(),
    on = function(e) {
        lt(t, e);

        function t() {
            K(this, t);
            var e = at(this, t, arguments);
            return e.sessionStorageKey = T, e
        }
        return q(t, [{
            key: `track`,
            value: function(e, n) {
                if (Kt(e)) {
                    var r = e.payload?.pageViewToken;
                    r && this.capturePageViewContext(r)
                }
                ct(J(t.prototype), `track`, this).call(this, e, n)
            }
        }, {
            key: `capturePageViewContext`,
            value: function(e) {
                if (!((typeof window > `u` ? `undefined` : Z(window)) > `u`)) {
                    var t = e || this.store.pageViewToken;
                    !t || this.inMemoryBuffer.pageContext[t] || (this.inMemoryBuffer.pageContext[t] = this.createPageContext())
                }
            }
        }, {
            key: `createEmptyBuffer`,
            value: function() {
                return {
                    events: [],
                    pageContext: {}
                }
            }
        }, {
            key: `addEventToBuffer`,
            value: function(e, t) {
                if (Kt(t)) {
                    var n = t.payload?.pageViewToken;
                    n && !e.pageContext[n] && (e.pageContext[n] = this.createPageContext())
                }
                e.events.push(t)
            }
        }, {
            key: `mergeBuffers`,
            value: function(e, t) {
                return {
                    events: St(e.events).concat(St(t.events)),
                    pageContext: Y({}, t.pageContext, e.pageContext)
                }
            }
        }, {
            key: `createEventMessage`,
            value: function(e, t) {
                var n = {
                    enableActiveConsent: this.store.enableActiveConsent || !1,
                    consentZones: this.store.consentZones,
                    enableProtoEventForwarding: !!this.store.protoEventSource || this.store.enableProtoEventForwarding || !1,
                    protoEventSource: this.store.protoEventSource,
                    enableOptOutSaleOfData: this.store.enableOptOutSaleOfData || !1,
                    disableLegacyCookies: this.store.disableLegacyCookies || !1,
                    protoSessionAppType: this.store.protoSessionAppType,
                    enableSessionWrites: this.store.enableSessionWrites,
                    enableDenormalization: this.store.enableDenormalization || !1,
                    eventsV2: {
                        events: e,
                        pageContext: t.pageContext
                    }
                };
                return this.store.isStateless && (n.essentialToken = this.store.essentialToken, n.multiTrackToken = this.store.multiTrackToken, n.sessionToken = this.store.sessionToken), n
            }
        }, {
            key: `createPageContext`,
            value: function() {
                var e = new URL(window.location.href),
                    t;
                try {
                    t = this.store.extraMetadata ? JSON.stringify(j(this.store.extraMetadata)) : void 0
                } catch {}
                return {
                    pageviewUrl: window.location.href,
                    canonicalUrl: qt(e.href),
                    referrerUrl: document.referrer || void 0,
                    documentTitle: document.title || void 0,
                    viewportWidth: Math.round(window.innerWidth) || 0,
                    viewportHeight: Math.round(window.innerHeight) || 0,
                    screenWidth: screen?.width,
                    screenHeight: screen?.height,
                    devicePixelRatio: window.devicePixelRatio,
                    canvasWidth: Math.round(document.body?.clientWidth) || 0,
                    canvasHeight: Math.round(document.body?.clientHeight) || 0,
                    userLocale: navigator?.language || ``,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    beaconBlocked: !this.isSendBeaconAndBlobSupported(),
                    cookiesEnabled: navigator.cookieEnabled,
                    pageId: this.store.metadata?.pageId,
                    application: this.store.service || this.store.metadata?.page?.environment,
                    handle: this.store.handle,
                    experimentVariationId: this.store.metadata?.page?.experimentVariationId || this.store.experimentVariationId,
                    softNavigation: this.store.softNavigation,
                    manifestRouteId: this.store.manifestRouteId,
                    siteEnvironment: this.store.mode || `production`,
                    httpStatusCode: this.store.httpStatusCode,
                    pageviewExtraMetadata: t,
                    version: `7.7.0`,
                    pageViewEdgeEventCreatedAtMs: Date.now(),
                    sessionId: this.store.sessionId,
                    identityUuid: this.store.identityUuid,
                    userId: this.store.userId,
                    shopifyEmployee: this.store.shopifyEmployee,
                    shopifyEmployeeId: this.store.shopifyEmployeeId,
                    shopId: this.store.shopId,
                    organizationId: this.store.organizationId,
                    tabToken: this.store.tabToken
                }
            }
        }]), t
    }(nn),
    sn = function(e) {
        lt(t, e);

        function t() {
            K(this, t);
            var e = at(this, t, arguments);
            return e.sessionStorageKey = C, e
        }
        return q(t, [{
            key: `getEndpoint`,
            value: function() {
                return this.store.deviceSignalEndpoint || `/.well-known/collect`
            }
        }]), t
    }(on);

function cn() {
    if (!((typeof window > `u` ? `undefined` : Z(window)) > `u`)) {
        var e = {},
            t = (typeof document > `u` ? `undefined` : Z(document)) < `u`,
            n = window.location?.href;
        n && (e.href = n);
        var r = t ? document.referrer : void 0;
        r && (e.referrer = r);
        var i = t ? document.title : void 0;
        i && (e.documentTitle = i), typeof window.innerWidth == `number` && (e.windowInnerWidth = Math.round(window.innerWidth)), typeof window.innerHeight == `number` && (e.windowInnerHeight = Math.round(window.innerHeight));
        var a = t ? document.body : null;
        return a && typeof a.clientWidth == `number` && (e.documentBodyWidth = Math.round(a.clientWidth)), a && typeof a.clientHeight == `number` && (e.documentBodyHeight = Math.round(a.clientHeight)), e
    }
}
var ln = function(e) {
    lt(t, e);

    function t() {
        K(this, t);
        var e = at(this, t, arguments);
        return e.sessionStorageKey = te, e
    }
    return q(t, [{
        key: `track`,
        value: function(e, n, r) {
            var i = cn(),
                a = this.store.pageViewToken,
                o = Y({
                    kind: `protojson`,
                    event: e
                }, i ? {
                    view: i
                } : {}, r ? {
                    hints: r
                } : {}, a ? {
                    pageViewToken: a
                } : {});
            ct(J(t.prototype), `track`, this).call(this, o, n)
        }
    }]), t
}(nn);

function un(e) {
    var t = e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`).replace(/%/g, `.*`);
    return RegExp(`^${t}\$`)
}
var dn = {
        privacy_signal: `essential`,
        _shopify_test: `essential`,
        _shopify_y: `analytics`,
        _shopify_s: `analytics`
    },
    fn = function(e, t) {
        var n = [],
            r = t.approvedCookiesList,
            i = t.cookieBlockerDryRunOnly,
            a = Y({}, dn, r || {}),
            o = t.countryCode,
            s = t.regionCode,
            c = t.consentZones;
        if (P(I(o, s), {
                consentZones: c
            })) {
            var l = Object.keys(a).filter(function(e) {
                    return e.includes(`%`)
                }).map(function(e) {
                    return {
                        glob: e,
                        regex: un(e)
                    }
                }),
                u = Object.getOwnPropertyDescriptor(Document.prototype, `cookie`) || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, `cookie`);
            if (u && u.configurable) {
                var d = function(e, t) {
                    if (!e) return `Missing cookie`;
                    if (!t) return `Cookie not in allow list`;
                    if (t !== `essential`) {
                        var n = ce() || {},
                            r = n.consentedAnalytics,
                            i = n.consentedFunctional,
                            a = n.consentedMarketing,
                            o = function(e) {
                                return `Missing ${e} consent`
                            };
                        if (t === `analytics` && r !== `1` || t === `functional` && i !== `1` || t === `marketing` && a !== `1`) return o(t)
                    }
                };
                Object.defineProperty(Document.prototype || HTMLDocument.prototype, "cookie", {
                    get: function() {
                        return u?.get?.call(this)
                    },
                    set: function(r) {
                        var o, s = bt(/(.+?)=/g.exec(r) || [], 2)[1];
                        if (s) {
                            var c = a[s];
                            if (!c && l.length) {
                                var f = l.find(function(e) {
                                    return e.regex.test(s)
                                });
                                f && (c = a[f.glob])
                            }
                            var p = d(s, c);
                            if (p) {
                                if (n.includes(s) || n.length > 20) return;
                                if (n.push(s), i) {
                                    var m = JSON.stringify(Y({
                                            cookieName: s,
                                            reason: p
                                        }, i ? {
                                            isDryRun: !0
                                        } : {})),
                                        h = `[Client Consent Error] cookie blocked`;
                                    if (!t.disableLegacyTracking) {
                                        var g = {
                                            schemaId: `website_error_event/1.1`,
                                            payload: {
                                                pageViewToken: t.pageViewToken || ``,
                                                message: h,
                                                extraMetadata: m
                                            }
                                        };
                                        e.dux(g)
                                    }
                                    if (t.enableDenormalization && t.pageViewToken && e.denormalizedDux) {
                                        var _ = {
                                            schemaId: `dux_website_events/1.7`,
                                            payload: {
                                                eventType: `error`,
                                                pageViewToken: t.pageViewToken,
                                                errorMessage: h,
                                                errorExtraMetadata: m
                                            }
                                        };
                                        e.denormalizedDux(_, {
                                            flush: !0
                                        })
                                    }
                                }
                            }(!p || i) && (u == null || (o = u.set) == null || o.call(this, r))
                        }
                    },
                    configurable: !0
                })
            }
        }
    },
    pn = function(e) {
        return e.HandshakeRequest = `DUX_HANDSHAKE_REQUEST`, e.HandshakeResponse = `DUX_HANDSHAKE_RESPONSE`, e.ContextUpdate = `DUX_CONTEXT_UPDATE`, e
    }(pn || {}),
    mn = new(function() {
        function e() {
            K(this, e), this.connections = [], this.isChild = !1, this.parentWindow = null, this.parentOrigin = null, this.isInitialized = !1, this.messageSequence = 0, this.receivedNonces = new Set, this.MAX_MESSAGE_AGE_MS = 5e3, this.MAX_NONCE_CACHE_SIZE = 100, this.lastDiscoveryTime = 0, this.DISCOVERY_DEBOUNCE_MS = 500, this.DISCOVERY_RATE_LIMIT_MS = 2e3, this.isChild = this.isWindowAvailable() && window.self !== window.top, this.setupMessageListener()
        }
        return q(e, [{
            key: `initAsParent`,
            value: function(e) {
                var t = this;
                this.isChild || this.isInitialized || (this.isInitialized = !0, this.discoverIframes(), this.connections.forEach(function(e) {
                    t.sendMessage(e.window, {
                        type: `DUX_HANDSHAKE_REQUEST`,
                        source: `dux`
                    }, e.origin)
                }), this.broadcastContext(e), this.watchForNewIframes(e))
            }
        }, {
            key: `initAsChild`,
            value: function(e) {
                !this.isChild || this.isInitialized || !this.isWindowAvailable() || (this.isInitialized = !0, this.onContextUpdateCallback = e, window.parent && window.parent !== window.self && (this.parentWindow = window.parent, this.parentOrigin = this.getParentOrigin(), this.sendMessage(this.parentWindow, {
                    type: `DUX_HANDSHAKE_RESPONSE`,
                    source: `dux`
                }, this.parentOrigin)))
            }
        }, {
            key: `broadcastContext`,
            value: function(e) {
                var t = this;
                this.isChild || this.connections.forEach(function(n) {
                    n.ready ? t.sendMessage(n.window, {
                        type: `DUX_CONTEXT_UPDATE`,
                        payload: t.serializeContext(e),
                        source: `dux`
                    }, n.origin) : (n.pendingUpdates ||= [], n.pendingUpdates.push(e))
                })
            }
        }, {
            key: `hasIframes`,
            value: function() {
                return !this.isChild && this.connections.length > 0
            }
        }, {
            key: `isRunningInIframe`,
            value: function() {
                return this.isChild
            }
        }, {
            key: `cleanup`,
            value: function() {
                this.mutationObserver &&= (this.mutationObserver.disconnect(), void 0), this.messageListener && this.isWindowAvailable() && (window.removeEventListener(`message`, this.messageListener), this.messageListener = void 0), this.iframeDiscoveryTimeout &&= (clearTimeout(this.iframeDiscoveryTimeout), void 0), this.connections = [], this.receivedNonces.clear(), this.onContextUpdateCallback = void 0, this.isInitialized = !1, this.messageSequence = 0
            }
        }, {
            key: `isWindowAvailable`,
            value: function() {
                return (typeof window > `u` ? `undefined` : Z(window)) < `u`
            }
        }, {
            key: `discoverIframes`,
            value: function() {
                var e = this;
                !this.isWindowAvailable() || (typeof document > `u` ? `undefined` : Z(document)) > `u` || document.querySelectorAll(`iframe`).forEach(function(t) {
                    if (!e.connections.some(function(e) {
                            return e.iframe === t
                        }) && t.contentWindow) {
                        var n = e.getIframeOrigin(t);
                        e.connections.push({
                            iframe: t,
                            window: t.contentWindow,
                            ready: !1,
                            origin: n
                        })
                    }
                })
            }
        }, {
            key: `getIframeOrigin`,
            value: function(e) {
                if (!this.isWindowAvailable()) return ``;
                try {
                    var t = e.src;
                    if (t) return new URL(t, window.location.href).origin
                } catch {}
                return window.location.origin
            }
        }, {
            key: `getParentOrigin`,
            value: function() {
                if (!this.isWindowAvailable() || (typeof document > `u` ? `undefined` : Z(document)) > `u`) return ``;
                try {
                    if (document.referrer) return new URL(document.referrer).origin
                } catch {}
                return window.location.origin
            }
        }, {
            key: `isValidOrigin`,
            value: function(e) {
                if (!this.isWindowAvailable() || !e || e === `null` || e.startsWith(`data:`) || e.startsWith(`javascript:`)) return !1;
                try {
                    if (!new URL(e).protocol) return !1
                } catch {
                    return !1
                }
                return e === window.location.origin ? !0 : this.isChild ? e === this.parentOrigin : this.connections.some(function(t) {
                    return t.origin === e
                })
            }
        }, {
            key: `watchForNewIframes`,
            value: function(e) {
                var t = this;
                (typeof MutationObserver > `u` ? `undefined` : Z(MutationObserver)) > `u` || (typeof document > `u` ? `undefined` : Z(document)) > `u` || (this.mutationObserver = new MutationObserver(function(n) {
                    var r = !1;
                    if (n.forEach(function(e) {
                            e.addedNodes.forEach(function(e) {
                                e.nodeName === `IFRAME` && (r = !0)
                            })
                        }), r) {
                        t.iframeDiscoveryTimeout && clearTimeout(t.iframeDiscoveryTimeout);
                        var i = Date.now() - t.lastDiscoveryTime;
                        if (i < t.DISCOVERY_RATE_LIMIT_MS) {
                            `${i}`;
                            return
                        }
                        t.iframeDiscoveryTimeout = setTimeout(function() {
                            t.lastDiscoveryTime = Date.now(), t.discoverIframes(), t.connections.forEach(function(e) {
                                e.ready || t.sendMessage(e.window, {
                                    type: `DUX_HANDSHAKE_REQUEST`,
                                    source: `dux`
                                }, e.origin)
                            }), t.broadcastContext(e)
                        }, t.DISCOVERY_DEBOUNCE_MS)
                    }
                }), this.mutationObserver.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }))
            }
        }, {
            key: `setupMessageListener`,
            value: function() {
                var e = this;
                this.isWindowAvailable() && window.addEventListener(`message`, function(t) {
                    try {
                        var n = t.data;
                        if (!n || n.source !== `dux`) return;
                        if (!e.isValidOrigin(t.origin)) {
                            `${t.origin}`;
                            return
                        }
                        if (!e.validateMessage(n) || !t.source || Z(t.source) != `object`) return;
                        e.handleMessage(n, t.source)
                    } catch {}
                })
            }
        }, {
            key: `handleMessage`,
            value: function(e, t) {
                var n = this;
                switch (e.type) {
                    case `DUX_HANDSHAKE_REQUEST`:
                        this.isChild && this.parentWindow === t && this.sendMessage(t, {
                            type: `DUX_HANDSHAKE_RESPONSE`,
                            source: `dux`
                        }, this.parentOrigin || void 0);
                        break;
                    case `DUX_HANDSHAKE_RESPONSE`:
                        if (!this.isChild) {
                            var r = this.connections.find(function(e) {
                                return e.window === t
                            });
                            r && (r.ready = !0, r.pendingUpdates && r.pendingUpdates.length > 0 && (r.pendingUpdates.forEach(function(e) {
                                n.sendMessage(r.window, {
                                    type: `DUX_CONTEXT_UPDATE`,
                                    payload: n.serializeContext(e),
                                    source: `dux`
                                }, r.origin)
                            }), r.pendingUpdates = []))
                        }
                        break;
                    case `DUX_CONTEXT_UPDATE`:
                        this.isChild && e.payload && this.onContextUpdateCallback && this.onContextUpdateCallback(e.payload);
                        break
                }
            }
        }, {
            key: `sendMessage`,
            value: function(e, t, n) {
                if (this.isWindowAvailable()) try {
                    var r = X(Y({}, t), {
                            timestamp: Date.now(),
                            nonce: this.generateNonce(),
                            sequence: this.messageSequence++
                        }),
                        i = n || window.location.origin;
                    e.postMessage(r, i)
                } catch {}
            }
        }, {
            key: `serializeContext`,
            value: function(e) {
                var t = Object.create(null);
                return Object.keys(e).forEach(function(n) {
                    if (n === `__proto__` || n === `constructor` || n === `prototype`) {
                        `${n}`;
                        return
                    }
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = e[n];
                        typeof r != `function` && (r === void 0 ? `undefined` : Z(r)) != `symbol` && (r === void 0 ? `undefined` : Z(r)) < `u` && (t[n] = r)
                    }
                }), t
            }
        }, {
            key: `generateNonce`,
            value: function() {
                return `${Date.now()}-${Math.random().toString(36).substring(2,11)}`
            }
        }, {
            key: `validateMessage`,
            value: function(e) {
                var t = Date.now() - e.timestamp;
                if (t > this.MAX_MESSAGE_AGE_MS || t < 0) return `${t}`, !1;
                if (this.receivedNonces.has(e.nonce)) return !1;
                if (this.receivedNonces.add(e.nonce), this.receivedNonces.size > this.MAX_NONCE_CACHE_SIZE) {
                    var n = this.receivedNonces.values().next().value;
                    n && this.receivedNonces.delete(n)
                }
                return !0
            }
        }]), e
    }()),
    hn = function() {
        var e = 0;
        if (window && window.performance && typeof window.performance.getEntriesByType == `function`) {
            var t = window.performance.getEntriesByType(`navigation`);
            Array.isArray(t) && t[0] && Z(t[0]) == `object` && (e = t[0].responseStatus || 0)
        }
        return !e && document.title.match(/(^|\s)404($|\b)/i) && (e = 404), e
    },
    gn, _n = 0,
    vn, yn = function(e) {
        return G(function() {
            var t, n, r, i, a, o, s, c, l, u, d, f, p;
            return Q(this, function(m) {
                switch (m.label) {
                    case 0:
                        return t = e.eventHandlerEndpoint, n = t === void 0 ? le : t, r = e.protoSessionAppType, i = e.enableSessionWrites, a = e.enableSecGpc, o = e.enableOptOutSaleOfData, s = e.disableLegacyCookies, c = e.essentialToken, l = e.multiTrackToken, u = e.sessionToken, d = e.isStateless, f = Y({
                            pb: `geo`,
                            enableActiveConsent: !0,
                            protoSessionAppType: r,
                            enableSessionWrites: i,
                            enableOptOutSaleOfData: o,
                            enableSecGpc: a,
                            disableLegacyCookies: s
                        }, d ? {
                            essentialToken: c,
                            multiTrackToken: l,
                            sessionToken: u
                        } : {}), p = JSON.stringify(f), [4, fetch(n, {
                            method: `POST`,
                            headers: {
                                "cache-control": `no-store`,
                                "content-type": `application/json`
                            },
                            credentials: `include`,
                            body: p
                        })];
                    case 1:
                        return [2, m.sent().json()]
                }
            })
        })()
    },
    bn = function(e) {
        if (e.isStateless) return !0;
        try {
            if (window.self !== window.top) try {
                if (typeof document.cookie != `string`) return !0
            } catch {
                return !0
            }
        } catch {
            return !0
        }
        var t = e.eventHandlerEndpoint || `/__dux`;
        if (t.startsWith(`http`)) try {
            if (new URL(t).origin !== window.location.origin) return !0
        } catch {}
        try {
            D(`_shopify_test`, `1`, {
                maxage: 5e3,
                path: `/`
            });
            var n = R(`_shopify_test`) === `1`;
            if (D(`_shopify_test`, ``, {
                    maxage: -1,
                    path: `/`
                }), !n) return !0
        } catch {
            return !0
        }
        return !1
    },
    xn = function() {
        return new Promise(function(e) {
            document.body ? e() : b(`domcontentloaded`, e)
        })
    },
    Sn = function(e, t, n, r, i) {
        return G(function() {
            var a;
            return Q(this, function(o) {
                return gn ? [2, gn] : (a = _n, [2, (gn = function() {
                    return G(function() {
                        var o, s, c, l, u, d, f, p, m;
                        return Q(this, function(h) {
                            switch (h.label) {
                                case 0:
                                    if ((typeof window > `u` ? `undefined` : Z(window)) > `u`) throw Error(`window is undefined`);
                                    if (e.isStateless = bn(e), e.enableOptOutSaleOfData = e.enableOptOutSaleOfData ?? !0, o = e.enableActiveConsent && !e.countryCode, s = (e.countryCode === void 0 || e.countryCode === `US`) && e.enableSecGpc === void 0, c = e.countryCode ? I(e.countryCode, e.regionCode) : void 0, l = ce()?.consentedAnalytics === `1`, u = e.enableActiveConsent && P(c, {
                                            consentZones: e.consentZones
                                        }) && !l, d = !!e.protoSessionAppType && !u && (!e.multiTrackToken || !e.sessionToken || !e.essentialToken), !(o || s || d)) return [3, 4];
                                    h.label = 1;
                                case 1:
                                    return h.trys.push([1, 3, , 4]), f = X(Y({}, e), {
                                        enableSecGpc: e.enableSecGpc === !0 || void 0
                                    }), [4, yn(f)];
                                case 2:
                                    return p = h.sent(), a === _n ? (Object.assign(e, p), [3, 4]) : [2];
                                case 3:
                                    return h.sent(), [3, 4];
                                case 4:
                                    return m = a === _n, m ? [4, xn()] : [3, 6];
                                case 5:
                                    m = (h.sent(), a === _n && Cn(e, t, n, r, i)), h.label = 6;
                                case 6:
                                    return [2]
                            }
                        })
                    })()
                }(), gn)])
            })
        })()
    },
    Cn = function(e, t, r, i, a) {
        vn = document.body, vn.setAttribute(se, `1`);
        var o = I(e.countryCode, e.regionCode),
            s = Number(e.httpStatusCode || hn()) || void 0,
            c = {
                essentialToken: e.essentialToken,
                multiTrackToken: e.multiTrackToken,
                sessionToken: e.sessionToken
            },
            l = Object.assign(i || k, X(Y({}, e, Tn(e), wn(e.enableActiveConsent, o, e.enableSecGpc, c, e.disableLegacyCookies, e.consentZones)), {
                complianceZone: o,
                isReady: !0,
                softNavigation: !1,
                httpStatusCode: s
            }));
        t && t(l);
        var u = a || {
            dux: new rn(l).track,
            denormalizedDux: l.enableDenormalization ? new on(l).track : void 0,
            deviceSignal: l.enableDenormalization && e != null && e.enableLogger?.deviceSignal ? new sn(l).track : void 0,
            gtm: e?.enableGtm ? new an(l).track : void 0,
            duxProto: e != null && e.enableLogger?.duxProto ? new ln(l).track : void 0
        };
        r && u && r(u);
        var d = function() {
                var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                t ? t(e, l) : Object.assign(l, e), mn.broadcastContext(l)
            },
            f = e.disableLogger,
            p = e.enableLogger;
        p != null && p.cookieBlocker && fn(u, l), p != null && p.humanSignal && (l.enableDenormalization ? n(() => import(`./humanSignal-Z6CKM37D-DFT4SSvE.js`).then(function(e) {
            var t = e.initHumanSignalTracking;
            t(u, l)
        }), __vite__mapDeps([0, 1, 2])).catch(function(e) {}) : l.debug), p != null && p.deviceSignal && (l.enableDenormalization ? n(() => import(`./deviceSignal-4BHST67P-Cq7dtCSQ.js`).then(function(e) {
            var t = e.initDeviceSignalTracking;
            t(u, l)
        }), __vite__mapDeps([3, 2])).catch(function(e) {}) : l.debug), mn.isRunningInIframe() ? mn.initAsChild(function(e) {
            d(e)
        }) : mn.initAsParent(l), f != null && f.page || A(u, l, function() {
            var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                t = l.enableActiveConsent,
                n = l.complianceZone,
                r = l.enableSecGpc,
                i = l.disableLegacyCookies,
                a = l.consentZones;
            l.essentialToken;
            var o = {
                multiTrackToken: l.multiTrackToken,
                sessionToken: l.sessionToken
            };
            d(Y({
                softNavigation: !0
            }, e, Tn(e), wn(t, n, r, o, i, a)))
        }), f != null && f.click || At(u, l, [document.body]), f != null && f.componentViewability || ue(u, l), f != null && f.error || Nt(u, l), f != null && f.visibility || Vt(u, l), f != null && f.webVitals || Ut(u, l), f != null && f.scroll || Rt(u, l), f != null && f.form || Ft(u, l);
        var m = function(e) {
            document.dispatchEvent(new CustomEvent(e, {
                detail: X(Y({}, l.consentState), {
                    isConsentRequired: l.isConsentRequired,
                    complianceZone: l.complianceZone,
                    countryCode: l.countryCode,
                    regionCode: l.regionCode,
                    canLoadAnalytics: l.canLoadAnalytics,
                    canLoadFunctional: l.canLoadFunctional,
                    canLoadMarketing: l.canLoadMarketing,
                    optOutSaleOfData: l.optOutSaleOfData,
                    enableSecGpc: l.enableSecGpc
                })
            }))
        };
        v(`dux_opt_out_sale_of_data`, function(t) {
            return G(function() {
                var n, r, i, a, o, s, c, u, f;
                return Q(this, function(p) {
                    switch (p.label) {
                        case 0:
                            n = t.detail, r = n || {}, i = r.optOutSaleOfData, a = l.enableActiveConsent, o = l.complianceZone, s = l.disableLegacyCookies, c = l.consentZones, p.label = 1;
                        case 1:
                            return p.trys.push([1, 3, , 4]), [4, yn(X(Y({}, e), {
                                enableSecGpc: i,
                                enableSessionWrites: !0
                            }))];
                        case 2:
                            return u = p.sent(), f = {
                                essentialToken: u.essentialToken,
                                multiTrackToken: u.multiTrackToken,
                                sessionToken: u.sessionToken
                            }, d(Y({}, u, wn(a, o, i, f, s, c))), [3, 4];
                        case 3:
                            return p.sent(), [3, 4];
                        case 4:
                            return m(`dux_consent_changed`), [2]
                    }
                })
            })()
        }, document), v(`dux_consent_change_request`, function(t) {
            return G(function() {
                var t, n, r, i, a, o, s;
                return Q(this, function(c) {
                    switch (c.label) {
                        case 0:
                            t = l.enableActiveConsent, n = l.complianceZone, r = l.enableSecGpc, i = l.disableLegacyCookies, a = l.consentZones, c.label = 1;
                        case 1:
                            return c.trys.push([1, 3, , 4]), [4, yn(X(Y({}, e), {
                                enableSecGpc: r,
                                enableSessionWrites: !0
                            }))];
                        case 2:
                            return o = c.sent(), s = {
                                essentialToken: o.essentialToken,
                                multiTrackToken: o.multiTrackToken,
                                sessionToken: o.sessionToken
                            }, d(Y({}, o, wn(t, n, r, s, i, a))), [3, 4];
                        case 3:
                            return c.sent(), [3, 4];
                        case 4:
                            return m(`dux_consent_changed`), [2]
                    }
                })
            })()
        }, document), m(`dux_consent_ready`)
    },
    wn = function(e, t, n, r, i, a) {
        var o = P(t, {
                consentZones: a
            }),
            s = ce(),
            c = (s || {}).consentedAnalytics,
            l = function(t) {
                return e === !1 || o === !1 || o === !0 && t === `1`
            },
            u = r?.multiTrackToken || R(`_shopify_y`),
            d = r?.sessionToken || R(`_shopify_s`),
            f = ``,
            p = ``;
        if (!e || !o || c === `1`) {
            f = u || w(), p = d || w();
            var m = E(window.location.href);
            i || (!r?.multiTrackToken && f !== u && D(`_shopify_y`, f, {
                maxage: 365 * 24 * 60 * 60 * 1e3,
                path: `/`,
                secure: !0,
                samesite: `lax`,
                domain: m
            }), p !== d && D(`_shopify_s`, p, {
                maxage: 1800 * 1e3,
                path: `/`,
                secure: !0,
                samesite: `lax`,
                domain: m
            }))
        }
        var h = !oe({
            complianceZone: t,
            enableActiveConsent: e,
            enableSecGpc: n,
            consentedSaleOfData: s?.consentedSaleOfData
        });
        return {
            consentState: s,
            isConsentRequired: o,
            multiTrackToken: f,
            sessionToken: p,
            isNewUser: !u,
            canLoadAnalytics: l(s?.consentedAnalytics),
            canLoadFunctional: l(s?.consentedFunctional),
            canLoadMarketing: l(s?.consentedMarketing),
            optOutSaleOfData: h
        }
    },
    Tn = function(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window.location.href,
            n = e.pageViewToken || w(),
            r = e.metadata,
            i = e.extraMetadata,
            a = new URL(t),
            o = e.canonicalUrl || qt(t),
            s = e.pathPrefix || Tt(a) || ``,
            c = r?.handle || Yt(t, s),
            l = r?.page?.experimentVariationId || ``,
            u = X(Y({}, r?.page), {
                affiliate: r?.page?.affiliate || a.searchParams.get(`partner`) || R(`source`) || ``,
                experimentVariationId: l
            });
        return {
            pageViewToken: n,
            url: t,
            pageLanguageCode: s?.substring(0, s.indexOf(`-`)) || `en`,
            lastShopDomain: R(`last_shop`),
            canonicalUrl: o,
            experimentVariationId: l,
            pathPrefix: s,
            handle: c,
            extraMetadata: i,
            metadata: X(Y({}, r), {
                title: r?.title || document.title,
                language: r?.page?.language || navigator.language || ``,
                page: u
            })
        }
    },
    En = {};

function Dn(e) {
    var t = e.src,
        n = e.module,
        r = e.element,
        i = En[t];
    if (i) return i;
    var a = new Promise(function(e, i) {
        var a = document.createElement(`script`);
        n && (a.type = `module`), a.src = t, a.onload = function() {
            e(!0)
        }, a.onerror = function(e) {
            i(e)
        }, r === `head` ? document.head.appendChild(a) : document.body.appendChild(a)
    });
    return En[t] = a, a
}

function On(e) {
    var t = bt((0, B.useState)(`loading`), 2),
        n = t[0],
        r = t[1];
    return (0, B.useEffect)(function() {
        e && e.src && function(e) {
            return G(function() {
                return Q(this, function(t) {
                    switch (t.label) {
                        case 0:
                            return t.trys.push([0, 2, , 3]), r(`loading`), [4, Dn(e)];
                        case 1:
                            return t.sent(), r(`done`), [3, 3];
                        case 2:
                            return t.sent(), r(`error`), [3, 3];
                        case 3:
                            return [2]
                    }
                })
            })()
        }(e)
    }, [e]), n
}

function kn(e) {
    var t = e;
    return !e && (typeof window > `u` ? `undefined` : Z(window)) < `u` && (t = window.navigator.userAgent), /(android|iphone|ipad|mobile|phone|mobi|blackberry)/i.test(t) ? `mobile` : `desktop`
}
var An = `GTM-TZ26LP8`,
    jn = function(e) {
        return `https://www.googletagmanager.com/gtm.js?id=${e}&dl=dataLayer`
    },
    Mn = function(e) {
        var t = e.gtmAccountId,
            n = t === void 0 ? An : t,
            r = e.gtmUrlTemplate,
            i = r === void 0 ? jn : r,
            a = e.onPageView,
            o = bt((0, B.useState)(), 2),
            s = o[0],
            c = o[1],
            l = F(),
            u = l.consentState,
            d = l.isConsentRequired,
            f = l.optOutSaleOfData,
            p = F().store,
            m = p || {},
            h = m.isReady,
            g = m.enableActiveConsent,
            _ = h === !0 && !f && (g === !1 || d === !1 || d === !0 && u?.consentedAnalytics === `1`);
        return On(s), (0, B.useEffect)(function() {
            _ && c({
                src: i(n),
                module: !0
            })
        }, [_, n, i]), (0, B.useEffect)(function() {
            if (_ && p) {
                var e = p.metadata,
                    t = e?.page,
                    n = new URL(window.location.href),
                    r = a ? a(p) : {},
                    i = Y({
                        canonical_url: p.canonicalUrl || ``,
                        experiment_variation_id: p.experimentVariationId,
                        is_new_user: p.isNewUser,
                        currency_code: `USD`,
                        last_shop_id: ``,
                        opt_in: ``,
                        blog_id: t?.blogId,
                        blog_category: t?.blogCategory,
                        continent_code: t?.continentCode || ``,
                        environment: t?.environment || p.mode,
                        http_code: t?.httpCode,
                        page_category: t?.pageCategory,
                        page_group: t?.pageGroup,
                        page_subtopic: t?.pageSubtopic,
                        page_topic: t?.pageTopic,
                        site_domain: n.hostname,
                        site_display_format: kn(navigator.userAgent),
                        project: `Shopify`,
                        event: `page_view`,
                        service: p.service,
                        country_code: p.countryCode,
                        display_cookies_notice: p.complianceZone,
                        last_shop_domain: p.lastShopDomain,
                        user_token: p.multiTrackToken,
                        page_name: n.pathname,
                        path_prefix: p.pathPrefix,
                        language: t?.language,
                        user_language: navigator.language,
                        page_language: p.pageLanguageCode,
                        site_country_code: p.countryCode,
                        page_title: e?.title || document.title,
                        itcat: n.searchParams.get(`itcat`),
                        itterm: n.searchParams.get(`itterm`),
                        utm_campaign: n.searchParams.get(`utm_campaign`),
                        utm_content: n.searchParams.get(`utm_content`),
                        utm_medium: n.searchParams.get(`utm_medium`),
                        utm_source: n.searchParams.get(`utm_source`),
                        utm_term: n.searchParams.get(`utm_term`),
                        page_url: n.toString(),
                        page_variation: n.searchParams.get(`dest`),
                        affiliate: t?.affiliate
                    }, r);
                window.dataLayer = window.dataLayer || [], window.dataLayer.push(i), window.dataLayer.push({
                    "gtm.start": new Date().getTime(),
                    event: `gtm.js`
                })
            }
        }, [_]), null
    },
    Nn = function(e) {
        lt(t, e);

        function t() {
            K(this, t);
            var e = at(this, t, arguments);
            return e.state = {
                hasError: !1
            }, e
        }
        return q(t, [{
            key: `componentDidCatch`,
            value: function(e) {
                console.error(`[Dux: ActiveConsent] Failed to render consent UI`, e)
            }
        }, {
            key: `render`,
            value: function() {
                return this.state.hasError ? null : this.props.children
            }
        }], [{
            key: `getDerivedStateFromError`,
            value: function() {
                return {
                    hasError: !0
                }
            }
        }]), t
    }(B.Component);

function Pn(e) {
    return (0, B.lazy)(function() {
        return e().catch(function() {
            return e()
        })
    })
}
var Fn = Pn(function() {
        return n(() => import(`./ActiveConsentCompact-Z2BWK77P-CoobvcBf.js`).then(function(e) {
            return {
                default: e.ActiveConsentCompact
            }
        }), __vite__mapDeps([4, 5, 6, 1, 2, 7, 8, 9, 10]))
    }),
    In = function(e) {
        var t = e.metadata,
            n = e.enableActiveConsent,
            r = e.children,
            i = e.onPageView,
            a = e.enableGtmLoader,
            o = e.gtmAccountId,
            s = e.gtmUrlTemplate,
            c = gt(e, [`metadata`, `enableActiveConsent`, `children`, `onPageView`, `enableGtmLoader`, `gtmAccountId`, `gtmUrlTemplate`]),
            l = F(),
            u = l.updateTrackers,
            d = l.updateStore,
            f = l.isReady;
        (0, B.useEffect)(function() {
            Sn(Y({
                enableActiveConsent: n,
                enableGtmLoader: a,
                gtmAccountId: o,
                metadata: Y({
                    page: {}
                }, t)
            }, c), d, u)
        }, []);
        var p = n && n !== `headless`;
        return B.createElement(B.Fragment, null, p && (n === !0 || n === `active`) && B.createElement(ae, {
            locale: c.locale,
            countryCode: c.countryCode,
            regionCode: c.regionCode
        }), p && f && n === `granularCompact` && B.createElement(Nn, null, B.createElement(B.Suspense, {
            fallback: null
        }, B.createElement(Fn, null))), a && B.createElement(Mn, {
            gtmAccountId: o,
            gtmUrlTemplate: s,
            onPageView: i
        }), r)
    };

function Ln() {
    let e = z(e => e.setIsShopifyMerchant);
    return (0, B.useEffect)(() => {
        async function t() {
            let t = window.location.hostname === `www.shopify.com`,
                n = window.location.hostname.includes(`brochure`),
                r = t || n,
                i = new URLSearchParams(window.location.search).get(`debug_shopify_merchant`);
            if (!t && (i === `true` || i === `false`)) {
                e(i === `true`);
                return
            }
            if (r) try {
                let t = new URL(`/services/auth/session`, window.location.origin),
                    n = await fetch(t.toString(), {
                        credentials: `same-origin`
                    });
                if (n.ok) {
                    let t = await n.json();
                    e(!!t.isShopifyMerchant)
                }
            } catch {
                return
            }
        }
        t()
    }, [e]), null
}
var Rn = [/Unable to preload CSS for/, /Importing a module script failed/, /Failed to fetch dynamically imported module:/, /error loading dynamically imported module:/],
    zn = [/webkit-masked-url:\/\/hidden\//, /undefined is not an object \(evaluating 'window\.webkit\.messageHandlers'\)/, /chrome-extension/, /^Uncaught undefined/, /undefined is not an object \(evaluating 'a\.L'\)/],
    Bn = [/Network error: cancel/, /connection appears to be offline/, /connection was lost/, /The user aborted a request/, /NetworkError when attempting to fetch resource/],
    Vn = [/unhandledrejection handler received a non-error/, /AbortError: Fetch is aborted/, /The user aborted a request/, /The operation was aborted/, /signal is aborted without reason/, /Minified React error #418/, /Minified React error #422/, /Minified React error #423/, /Minified React error #425/],
    Hn = [/^No target$/, /^Worker terminate$/],
    Un = [...Rn, ...zn, ...Bn, ...Vn, ...Hn],
    Wn = e => Un.some(t => t.test(e)),
    Gn = e => {
        let {
            logError: t,
            isLoggingReady: n
        } = fe();
        (0, B.useEffect)(() => {
            let r = r => {
                let i = r.target;
                if (i instanceof HTMLSourceElement && i.parentElement instanceof HTMLVideoElement && i.parentElement.currentSrc) return;
                if (!r.error && !r.message && !r.filename) {
                    console.info(`[Error ignored - no useful information (likely cross-origin)]`);
                    return
                }
                if (r.error?.name === `AbortError`) {
                    console.info(`[Error ignored - AbortError (expected)]`);
                    return
                }
                if (me(r)) return;
                let a = r.error?.message || r.message || (r.error ? String(r.error) : `Unknown error`);
                if (Wn(a)) return;
                let o = {
                        message: a,
                        stack: r.error?.stack || `No stack trace available`,
                        fileName: r.filename,
                        lineNumber: r.lineno
                    },
                    s = {
                        errorType: `unhandled_error`,
                        colno: r.colno
                    };
                if (e && (s.bugsnagApiKey = e, s.appVersion = window.__APP_VERSION__ || ``), !n) {
                    console.error(`[Error - Dux not ready]`, a, r.error || r);
                    return
                }
                r.preventDefault(), t(o, s)
            };
            return window.addEventListener(`error`, r, !0), () => {
                window.removeEventListener(`error`, r, !0)
            }
        }, [t, n, e])
    };

function Kn(e, t) {
    for (let n of e)
        if (t >= n.top - 2 && t <= n.bottom + 2) return n;
    return e[0]
}

function qn({
    line: e,
    pointerX: t,
    tipWidth: n,
    tipHeight: r,
    viewportWidth: i,
    edge: a,
    offset: o,
    headerHeight: s
}) {
    let c = n / 2,
        l = Math.min(Math.max(t, e.left), e.right);
    l = Math.min(Math.max(l, a + c), i - a - c);
    let u = e.top - r - o,
        d = u < s;
    return d && (u = e.bottom + o), {
        centerX: l,
        top: u,
        below: d
    }
}
var $ = h();

function Jn() {
    let e = (0, B.useRef)(null),
        t = (0, B.useRef)(null),
        n = (0, B.useRef)(null),
        r = (0, B.useRef)(null),
        i = (0, B.useRef)(null);
    return (0, B.useEffect)(() => {
        let a = e.current,
            o = t.current,
            s = n.current,
            c = r.current,
            l = i.current;
        if (!a || !o || !s || !c || !l) return;
        let u = getComputedStyle(a),
            d = (e, t) => {
                let n = parseFloat(u.getPropertyValue(e));
                return Number.isFinite(n) ? n : t
            },
            f = 400,
            p = 300,
            m = 300,
            h = 90,
            g = 10,
            _ = .5,
            ee = 8,
            v = 8,
            y = 0,
            b = 0,
            x = () => {
                f = d(`--tt-grace`, 400), p = d(`--tt-fade`, 300), m = d(`--tt-content`, 300), h = d(`--tt-tilt-settle`, 90), g = d(`--tt-tilt`, 10), _ = d(`--tt-tilt-factor`, .5), ee = d(`--tt-offset`, 8), v = d(`--tt-edge`, 8), y = parseFloat(u.paddingLeft || `0`) + parseFloat(u.paddingRight || `0`), b = document.documentElement.clientWidth
            };
        x();
        let S = null,
            te = ``,
            C = 0,
            w = 0,
            T = 0,
            E = 0,
            ne = 0,
            re = [],
            D = null,
            ie = null,
            O = null,
            k = null,
            A = null,
            j = null,
            M = null,
            ae = !1,
            N = null,
            oe = () => {
                ie !== null && window.clearTimeout(ie), ie = null
            },
            P = () => {
                O !== null && window.clearTimeout(O), O = null
            },
            F = () => {
                M !== null && cancelAnimationFrame(M), M = null
            },
            se = (e, t) => {
                te = e, l.textContent = e;
                let n = l.offsetWidth,
                    r = `${n}px`;
                if (E = n + y, A !== null && cancelAnimationFrame(A), j !== null && window.clearTimeout(j), !t) {
                    s.textContent = e, s.style.opacity = `1`, c.style.opacity = `0`, c.textContent = ``, o.style.transition = `none`, o.style.gridTemplateColumns = r, o.offsetWidth, o.style.transition = ``, ne = a.offsetHeight;
                    return
                }
                c.textContent = e, c.style.opacity = `0`, ne = a.offsetHeight, A = window.requestAnimationFrame(() => {
                    o.style.gridTemplateColumns = r, s.style.opacity = `0`, c.style.opacity = `1`
                }), j = window.setTimeout(() => {
                    s.textContent = e, s.style.opacity = `1`, c.style.opacity = `0`
                }, m)
            },
            I = (e, t, n, r) => {
                w = t, T = n, r !== `follow` && (re = Array.from(e.getClientRects()));
                let {
                    centerX: i,
                    top: o,
                    below: s
                } = qn({
                    line: Kn(re, n) ?? e.getBoundingClientRect(),
                    pointerX: t,
                    tipWidth: E,
                    tipHeight: ne,
                    viewportWidth: b,
                    edge: v,
                    offset: ee,
                    headerHeight: 60
                });
                a.dataset.motion = r, a.dataset.placement = s ? `below` : `above`, a.style.setProperty(`--tt-x`, `${i}px`), a.style.setProperty(`--tt-y`, `${o}px`), a.style.setProperty(`--tt-angle`, `${r===`follow`?C:0}deg`)
            },
            L = () => {
                D !== null && window.clearTimeout(D), D = null
            },
            ce = (e, t, n) => {
                L(), oe(), P();
                let r = e.getAttribute(`data-tooltip`) ?? ``,
                    i = S !== null,
                    o = i && S !== e;
                if (S = e, !i) {
                    ye(), se(r, !1), k !== null && cancelAnimationFrame(k), k = window.requestAnimationFrame(() => {
                        k = null, S === e && (I(e, t, n, `snap`), a.dataset.visible = `true`)
                    });
                    return
                }
                a.dataset.visible = `true`, o ? (r !== te && se(r, !0), I(e, t, n, `morph`)) : I(e, t, n, `follow`)
            },
            le = () => {
                S = null, C = 0, ae = !1, F(), be()
            },
            ue = () => {
                S !== null && (a.dataset.visible = `false`, P(), O = window.setTimeout(() => {
                    O = null, le()
                }, p))
            },
            R = () => {
                P(), a.dataset.visible = `false`, le()
            },
            de = () => {
                L(), D = window.setTimeout(ue, f)
            },
            z = e => e?.closest?.(`[data-tooltip]`) ?? null,
            fe = e => {
                if (e.pointerType === `touch`) return;
                let t = z(e.target);
                t && (ae = !1, ce(t, e.clientX, e.clientY))
            },
            pe = e => {
                if (e.pointerType === `touch` || !S) return;
                if (!S.isConnected) {
                    R();
                    return
                }
                if (z(e.target) !== S) return;
                let t = e.clientX - w;
                C = Math.max(-g, Math.min(g, t * _)), I(S, e.clientX, e.clientY, `follow`), oe(), ie = window.setTimeout(() => {
                    C = 0, S && I(S, w, T, `follow`)
                }, h)
            },
            me = e => {
                S && z(e.target) && R()
            },
            he = e => {
                let t = z(e.target);
                if (!t) return;
                let n = e.relatedTarget;
                n && t.contains(n) || de()
            },
            ge = e => {
                let t = z(e.target);
                if (!t || !t.matches(`:focus-visible`)) return;
                ae = !0;
                let n = t.getBoundingClientRect();
                ce(t, n.left + n.width / 2, n.top + n.height / 2)
            },
            _e = e => {
                z(e.target) && de()
            },
            B = () => {
                if (S !== null) {
                    if (!ae) {
                        R();
                        return
                    }
                    M === null && (M = window.requestAnimationFrame(() => {
                        if (M = null, S === null) return;
                        if (!S.isConnected) {
                            R();
                            return
                        }
                        x();
                        let e = S.getBoundingClientRect();
                        I(S, e.left + e.width / 2, e.top + e.height / 2, `snap`)
                    }))
                }
            },
            ve = () => {
                if (S !== null) {
                    if (!S.isConnected) {
                        R();
                        return
                    }
                    x(), I(S, w, T, `snap`)
                }
            },
            V = new AbortController,
            H = e => ({
                passive: !0,
                signal: e
            });
        document.addEventListener(`pointerover`, fe, H(V.signal)), document.addEventListener(`focusin`, ge, H(V.signal));

        function ye() {
            if (x(), N) return;
            N = new AbortController;
            let {
                signal: e
            } = N;
            document.addEventListener(`pointermove`, pe, H(e)), document.addEventListener(`pointerdown`, me, H(e)), document.addEventListener(`pointerout`, he, H(e)), document.addEventListener(`focusout`, _e, H(e)), window.addEventListener(`scroll`, B, {
                capture: !0,
                ...H(e)
            }), window.addEventListener(`resize`, ve, H(e))
        }

        function be() {
            N?.abort(), N = null
        }
        return () => {
            V.abort(), be(), L(), oe(), P(), F(), k !== null && cancelAnimationFrame(k), A !== null && cancelAnimationFrame(A), j !== null && window.clearTimeout(j)
        }
    }, []), (0, $.jsxs)(`div`, {
        ref: e,
        "aria-hidden": !0,
        "data-visible": `false`,
        className: `shared-tooltip`,
        children: [(0, $.jsx)(`span`, {
            ref: t,
            className: `shared-tooltip__track grid overflow-hidden`,
            children: (0, $.jsxs)(`span`, {
                className: `relative block min-w-0 whitespace-nowrap`,
                children: [(0, $.jsx)(`span`, {
                    ref: n,
                    className: `shared-tooltip__text block whitespace-nowrap`
                }), (0, $.jsx)(`span`, {
                    ref: r,
                    className: `shared-tooltip__text absolute inset-0 block whitespace-nowrap opacity-0`
                })]
            })
        }), (0, $.jsx)(`span`, {
            ref: i,
            "aria-hidden": !0,
            className: `invisible absolute left-0 top-0 whitespace-nowrap`
        }), (0, $.jsx)(`span`, {
            "aria-hidden": !0,
            className: `shared-tooltip__arrow pointer-events-none absolute left-1/2 z-20 block size-14 -translate-x-1/2 bg-white`
        })]
    })
}
var Yn = `https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4379242/assets/tailwind-vOc3OfBK.css`,
    Xn = `https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4379242/assets/fonts-latin-Hwnc9bw-.css`,
    Zn = `https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4379242/assets/fonts-japanese-CboPpAJH.css`,
    Qn = he(() => n(() => import(`./ErrorPage-CVLmS95m.js`), __vite__mapDeps([11, 12, 5, 6, 1, 13, 14, 15, 16])));
typeof window < `u` && (window.__APP_VERSION__ = `7c5b692b2012195a7c94314bc847c4be4375c816`);
var $n = e => ({
        project: `Shopify/editions`,
        compliance_zone: e.complianceZone,
        region_code: e.regionCode
    }),
    er = ({
        formMethod: e,
        currentUrl: t,
        nextUrl: n
    }) => !!(e && e !== `GET` || t.toString() === n.toString()),
    tr = ({
        error: e
    }) => e ? [{
        title: `Error loading Spring ’26 Edition`
    }] : [];

function nr() {
    return [{
        rel: `preconnect`,
        href: `https://cdn.shopify.com`
    }, {
        rel: `icon`,
        type: `image/png`,
        sizes: `16x16`,
        href: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/fav-16_a5618e5f-bd5c-468b-8420-6da0076976b5.png?v=1780498479`
    }, {
        rel: `icon`,
        type: `image/png`,
        sizes: `32x32`,
        href: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/fav-32_6a6f91e7-131c-49e1-9d44-adfb98fb9797.png?v=1780498479`
    }, {
        rel: `apple-touch-icon`,
        type: `image/png`,
        sizes: `180x180`,
        href: `https://cdn.shopify.com/s/files/1/0647/5176/3550/files/fav-180.png?v=1780498479`
    }]
}

function rr({
    children: e
}) {
    let t = g(),
        n = s(`root`),
        r = n?.locale ?? `en`,
        i = r === `jp`,
        a = n?.theatreEnabled === !0 && (n.releaseStage !== `production` || !1);
    return (0, $.jsxs)(`html`, {
        lang: r,
        "data-color-mode": `dark`,
        children: [(0, $.jsxs)(`head`, {
            children: [(0, $.jsx)(`meta`, {
                charSet: `utf-8`
            }), (0, $.jsx)(`meta`, {
                name: `viewport`,
                content: `width=device-width,initial-scale=1,viewport-fit=cover`
            }), (0, $.jsx)(`style`, {
                nonce: t,
                dangerouslySetInnerHTML: {
                    __html: `html{color-scheme:dark}html,body{margin:0;padding:0;background-color:#090909;color:#fff}img{max-width:100%}`
                }
            }), (0, $.jsx)(`script`, {
                nonce: t,
                dangerouslySetInnerHTML: {
                    __html: `window.__S26_THEATRE_CLIENT_ENABLED__=${JSON.stringify(a)}`
                }
            }), (0, $.jsx)(`link`, {
                rel: `preload`,
                as: `style`,
                href: Yn
            }), (0, $.jsx)(`link`, {
                rel: `stylesheet`,
                href: Yn,
                media: `print`,
                "data-async-css": ``,
                "data-tw-primary": ``,
                suppressHydrationWarning: !0
            }), (0, $.jsx)(`noscript`, {
                children: (0, $.jsx)(`link`, {
                    rel: `stylesheet`,
                    href: Yn
                })
            }), (0, $.jsx)(l, {}), (0, $.jsx)(f, {}), i ? (0, $.jsxs)($.Fragment, {
                children: [(0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `style`,
                    href: Zn
                }), (0, $.jsx)(`link`, {
                    rel: `stylesheet`,
                    href: Zn,
                    media: `print`,
                    "data-async-css": ``,
                    suppressHydrationWarning: !0
                }), (0, $.jsx)(`noscript`, {
                    children: (0, $.jsx)(`link`, {
                        rel: `stylesheet`,
                        href: Zn
                    })
                }), (0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `font`,
                    crossOrigin: `anonymous`,
                    type: `font/woff2`,
                    href: `https://cdn.shopify.com/b/shopify-brochure2-assets/50a6bd4279c1aacdbf3a952c15c3ef92.woff2`
                })]
            }) : (0, $.jsxs)($.Fragment, {
                children: [(0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `style`,
                    href: Xn
                }), (0, $.jsx)(`link`, {
                    rel: `stylesheet`,
                    href: Xn,
                    media: `print`,
                    "data-async-css": ``,
                    suppressHydrationWarning: !0
                }), (0, $.jsx)(`noscript`, {
                    children: (0, $.jsx)(`link`, {
                        rel: `stylesheet`,
                        href: Xn
                    })
                }), (0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `font`,
                    crossOrigin: `anonymous`,
                    type: `font/woff2`,
                    href: `https://cdn.shopify.com/b/shopify-brochure2-assets/9cfbc7721dcccb956b85f632f175962a.woff2`
                }), (0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `font`,
                    crossOrigin: `anonymous`,
                    type: `font/woff2`,
                    href: `https://cdn.shopify.com/b/shopify-brochure2-assets/b0f3be75aaf69a9c184619c9091d33b1.woff2`
                }), (0, $.jsx)(`link`, {
                    rel: `preload`,
                    as: `font`,
                    crossOrigin: `anonymous`,
                    type: `font/woff2`,
                    href: `https://cdn.shopify.com/s/files/1/0711/3431/4719/files/5949cd393a8375a896fd0a9b74307666.woff2?v=1738959228`
                })]
            }), (0, $.jsx)(`script`, {
                nonce: t,
                dangerouslySetInnerHTML: {
                    __html: `(function(){var T=${_e},O=${JSON.stringify(ge)};var a=0,s=document.visibilityState==='visible'?performance.now():null,t=null,f=false;function el(){return a+(s===null?0:performance.now()-s);}function fire(){if(f)return;f=true;if(window.__S26_LOAD_COMPLETE__)return;if(!document.getElementById(O))return;window.__S26_FORCE_TIER_0__=true;try{window.dispatchEvent(new Event('s26:force-tier-0'));}catch(e){}}function sch(){if(t){clearTimeout(t);t=null;}if(f||document.visibilityState!=='visible')return;t=setTimeout(fire,Math.max(0,T-el()));}document.addEventListener('visibilitychange',function(){if(window.__S26_LOAD_COMPLETE__){f=true;if(t){clearTimeout(t);t=null;}return;}var n=performance.now();if(document.visibilityState==='visible'){s=n;}else{if(s!==null){a+=n-s;s=null;}if(t){clearTimeout(t);t=null;}}sch();});sch();})();`
                }
            }), (0, $.jsx)(`script`, {
                nonce: t,
                dangerouslySetInnerHTML: {
                    __html: `(function(){var c=document.createElement('div');c.id='ssr-paint-cover';c.setAttribute('aria-hidden','true');c.style.cssText='position:fixed;inset:0;z-index:100000;background-color:#090909;pointer-events:none';(document.body||document.documentElement).appendChild(c);var twReady=false,domReady=false,dropped=false;function dropCover(){if(dropped)return;dropped=true;if(c&&c.parentNode)c.parentNode.removeChild(c);}function maybeDrop(){if(twReady&&domReady)requestAnimationFrame(dropCover);}function reveal(l){var primary=l.hasAttribute('data-tw-primary');var swapped=false;var t;function swap(loaded){if(!swapped){swapped=true;if(t)clearTimeout(t);l.media='all';}if(primary&&loaded){twReady=true;maybeDrop();}}if(l.sheet){swap(true);}else{l.addEventListener('load',function(){swap(true);});l.addEventListener('error',function(){swap(true);});t=setTimeout(function(){swap(false);},1500);}}var links=document.querySelectorAll('link[data-async-css]');for(var i=0;i<links.length;i++)reveal(links[i]);if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){domReady=true;maybeDrop();});}else{domReady=true;maybeDrop();}setTimeout(dropCover,8000);})();`
                }
            })]
        }), (0, $.jsxs)(`body`, {
            children: [e, (0, $.jsx)(u, {
                nonce: t
            }), (0, $.jsx)(m, {
                nonce: t
            })]
        })]
    })
}
var ir = i(function() {
        let {
            locale: e,
            bugsnagApiKey: t,
            releaseStage: i,
            isLive: a,
            theatreEnabled: o
        } = r(), {
            key: s
        } = d(), c = (0, B.useRef)(s), l = F(e => e.emitPageView);
        return Gn(t), (0, B.useEffect)(() => {
            pe(t)
        }, [t]), (0, B.useEffect)(() => {
            c.current !== s && (c.current = s, l())
        }, [s, l]), (0, B.useEffect)(() => {
            a && o && i !== `production` && new URL(window.location.href).searchParams.has(`theatre`) && n(async () => {
                let {
                    initTheatre: e
                } = await import(`./TheatreContext-BNWtaD1m.js`);
                return {
                    initTheatre: e
                }
            }, __vite__mapDeps([17, 5, 6, 13, 18, 19, 20, 21, 22])).then(({
                initTheatre: e
            }) => e()).catch(() => {})
        }, [a, i, o]), (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(de, {
                mobileBreakpoint: 767
            }), (0, $.jsx)(Ln, {}), (0, $.jsx)(Jn, {}), (0, $.jsx)(p, {}), (0, $.jsx)(In, {
                service: `editions-spring-2026`,
                mode: `production`,
                eventHandlerEndpoint: `https://www.shopify.com/.well-known/dux?v2`,
                protoEventSource: `EVENT_APP_EDITIONS`,
                enableGtm: !0,
                enableGtmLoader: !0,
                disableLogger: {
                    error: !0
                },
                gtmAccountId: `GTM-KW6FGBL7`,
                onPageView: $n,
                locale: e,
                enableActiveConsent: ee.GranularCompact,
                enableDenormalization: !0,
                disableLegacyTracking: !0
            })]
        })
    }),
    ar = a(function() {
        let e = o(),
            t = c(e) ? e.status : 500;
        return (0, $.jsx)(B.Suspense, {
            fallback: (0, $.jsx)(`div`, {
                className: `fixed inset-0 bg-b100`
            }),
            children: (0, $.jsx)(Qn, {
                status: t
            })
        })
    });
export {
    ar as ErrorBoundary, rr as Layout, ir as
    default, nr as links, tr as meta, er as shouldRevalidate
};
//# sourceMappingURL=root-Bqs1FIk6.js.map