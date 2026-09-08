var e = (e, t) => () => (t || (e((t = {
    exports: {}
}).exports, t), e = null), t.exports);
(function() {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`)) return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`, t
    }

    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
})();
var t = e((e => {
        var t = Symbol.for(`react.transitional.element`),
            n = Symbol.for(`react.portal`),
            r = Symbol.for(`react.fragment`),
            i = Symbol.for(`react.strict_mode`),
            a = Symbol.for(`react.profiler`),
            o = Symbol.for(`react.consumer`),
            s = Symbol.for(`react.context`),
            c = Symbol.for(`react.forward_ref`),
            l = Symbol.for(`react.suspense`),
            u = Symbol.for(`react.memo`),
            d = Symbol.for(`react.lazy`),
            f = Symbol.for(`react.activity`),
            p = Symbol.iterator;

        function m(e) {
            return typeof e != `object` || !e ? null : (e = p && e[p] || e[`@@iterator`], typeof e == `function` ? e : null)
        }
        var h = {
                isMounted: function() {
                    return !1
                },
                enqueueForceUpdate: function() {},
                enqueueReplaceState: function() {},
                enqueueSetState: function() {}
            },
            g = Object.assign,
            _ = {};

        function v(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || h
        }
        v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
            if (typeof e != `object` && typeof e != `function` && e != null) throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);
            this.updater.enqueueSetState(this, e, t, `setState`)
        }, v.prototype.forceUpdate = function(e) {
            this.updater.enqueueForceUpdate(this, e, `forceUpdate`)
        };

        function y() {}
        y.prototype = v.prototype;

        function b(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || h
        }
        var x = b.prototype = new y;
        x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
        var ee = Array.isArray;

        function S() {}
        var C = {
                H: null,
                A: null,
                T: null,
                S: null
            },
            te = Object.prototype.hasOwnProperty;

        function w(e, n, r) {
            var i = r.ref;
            return {
                $$typeof: t,
                type: e,
                key: n,
                ref: i === void 0 ? null : i,
                props: r
            }
        }

        function T(e, t) {
            return w(e.type, t, e.props)
        }

        function E(e) {
            return typeof e == `object` && !!e && e.$$typeof === t
        }

        function ne(e) {
            var t = {
                "=": `=0`,
                ":": `=2`
            };
            return `$` + e.replace(/[=:]/g, function(e) {
                return t[e]
            })
        }
        var re = /\/+/g;

        function ie(e, t) {
            return typeof e == `object` && e && e.key != null ? ne(`` + e.key) : t.toString(36)
        }

        function ae(e) {
            switch (e.status) {
                case `fulfilled`:
                    return e.value;
                case `rejected`:
                    throw e.reason;
                default:
                    switch (typeof e.status == `string` ? e.then(S, S) : (e.status = `pending`, e.then(function(t) {
                            e.status === `pending` && (e.status = `fulfilled`, e.value = t)
                        }, function(t) {
                            e.status === `pending` && (e.status = `rejected`, e.reason = t)
                        })), e.status) {
                        case `fulfilled`:
                            return e.value;
                        case `rejected`:
                            throw e.reason
                    }
            }
            throw e
        }

        function oe(e, r, i, a, o) {
            var s = typeof e;
            (s === `undefined` || s === `boolean`) && (e = null);
            var c = !1;
            if (e === null) c = !0;
            else switch (s) {
                case `bigint`:
                case `string`:
                case `number`:
                    c = !0;
                    break;
                case `object`:
                    switch (e.$$typeof) {
                        case t:
                        case n:
                            c = !0;
                            break;
                        case d:
                            return c = e._init, oe(c(e._payload), r, i, a, o)
                    }
            }
            if (c) return o = o(e), c = a === `` ? `.` + ie(e, 0) : a, ee(o) ? (i = ``, c != null && (i = c.replace(re, `$&/`) + `/`), oe(o, r, i, ``, function(e) {
                return e
            })) : o != null && (E(o) && (o = T(o, i + (o.key == null || e && e.key === o.key ? `` : (`` + o.key).replace(re, `$&/`) + `/`) + c)), r.push(o)), 1;
            c = 0;
            var l = a === `` ? `.` : a + `:`;
            if (ee(e))
                for (var u = 0; u < e.length; u++) a = e[u], s = l + ie(a, u), c += oe(a, r, i, s, o);
            else if (u = m(e), typeof u == `function`)
                for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ie(a, u++), c += oe(a, r, i, s, o);
            else if (s === `object`) {
                if (typeof e.then == `function`) return oe(ae(e), r, i, a, o);
                throw r = String(e), Error(`Objects are not valid as a React child (found: ` + (r === `[object Object]` ? `object with keys {` + Object.keys(e).join(`, `) + `}` : r) + `). If you meant to render a collection of children, use an array instead.`)
            }
            return c
        }

        function se(e, t, n) {
            if (e == null) return e;
            var r = [],
                i = 0;
            return oe(e, r, ``, ``, function(e) {
                return t.call(n, e, i++)
            }), r
        }

        function ce(e) {
            if (e._status === -1) {
                var t = e._result;
                t = t(), t.then(function(t) {
                    (e._status === 0 || e._status === -1) && (e._status = 1, e._result = t)
                }, function(t) {
                    (e._status === 0 || e._status === -1) && (e._status = 2, e._result = t)
                }), e._status === -1 && (e._status = 0, e._result = t)
            }
            if (e._status === 1) return e._result.default;
            throw e._result
        }
        var D = typeof reportError == `function` ? reportError : function(e) {
                if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                    var t = new window.ErrorEvent(`error`, {
                        bubbles: !0,
                        cancelable: !0,
                        message: typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
                        error: e
                    });
                    if (!window.dispatchEvent(t)) return
                } else if (typeof process == `object` && typeof process.emit == `function`) {
                    process.emit(`uncaughtException`, e);
                    return
                }
                console.error(e)
            },
            O = {
                map: se,
                forEach: function(e, t, n) {
                    se(e, function() {
                        t.apply(this, arguments)
                    }, n)
                },
                count: function(e) {
                    var t = 0;
                    return se(e, function() {
                        t++
                    }), t
                },
                toArray: function(e) {
                    return se(e, function(e) {
                        return e
                    }) || []
                },
                only: function(e) {
                    if (!E(e)) throw Error(`React.Children.only expected to receive a single React element child.`);
                    return e
                }
            };
        e.Activity = f, e.Children = O, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
            __proto__: null,
            c: function(e) {
                return C.H.useMemoCache(e)
            }
        }, e.cache = function(e) {
            return function() {
                return e.apply(null, arguments)
            }
        }, e.cacheSignal = function() {
            return null
        }, e.cloneElement = function(e, t, n) {
            if (e == null) throw Error(`The argument must be a React element, but you passed ` + e + `.`);
            var r = g({}, e.props),
                i = e.key;
            if (t != null)
                for (a in t.key !== void 0 && (i = `` + t.key), t) !te.call(t, a) || a === `key` || a === `__self` || a === `__source` || a === `ref` && t.ref === void 0 || (r[a] = t[a]);
            var a = arguments.length - 2;
            if (a === 1) r.children = n;
            else if (1 < a) {
                for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
                r.children = o
            }
            return w(e.type, i, r)
        }, e.createContext = function(e) {
            return e = {
                $$typeof: s,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null
            }, e.Provider = e, e.Consumer = {
                $$typeof: o,
                _context: e
            }, e
        }, e.createElement = function(e, t, n) {
            var r, i = {},
                a = null;
            if (t != null)
                for (r in t.key !== void 0 && (a = `` + t.key), t) te.call(t, r) && r !== `key` && r !== `__self` && r !== `__source` && (i[r] = t[r]);
            var o = arguments.length - 2;
            if (o === 1) i.children = n;
            else if (1 < o) {
                for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
                i.children = s
            }
            if (e && e.defaultProps)
                for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
            return w(e, a, i)
        }, e.createRef = function() {
            return {
                current: null
            }
        }, e.forwardRef = function(e) {
            return {
                $$typeof: c,
                render: e
            }
        }, e.isValidElement = E, e.lazy = function(e) {
            return {
                $$typeof: d,
                _payload: {
                    _status: -1,
                    _result: e
                },
                _init: ce
            }
        }, e.memo = function(e, t) {
            return {
                $$typeof: u,
                type: e,
                compare: t === void 0 ? null : t
            }
        }, e.startTransition = function(e) {
            var t = C.T,
                n = {};
            C.T = n;
            try {
                var r = e(),
                    i = C.S;
                i !== null && i(n, r), typeof r == `object` && r && typeof r.then == `function` && r.then(S, D)
            } catch (e) {
                D(e)
            } finally {
                t !== null && n.types !== null && (t.types = n.types), C.T = t
            }
        }, e.unstable_useCacheRefresh = function() {
            return C.H.useCacheRefresh()
        }, e.use = function(e) {
            return C.H.use(e)
        }, e.useActionState = function(e, t, n) {
            return C.H.useActionState(e, t, n)
        }, e.useCallback = function(e, t) {
            return C.H.useCallback(e, t)
        }, e.useContext = function(e) {
            return C.H.useContext(e)
        }, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
            return C.H.useDeferredValue(e, t)
        }, e.useEffect = function(e, t) {
            return C.H.useEffect(e, t)
        }, e.useEffectEvent = function(e) {
            return C.H.useEffectEvent(e)
        }, e.useId = function() {
            return C.H.useId()
        }, e.useImperativeHandle = function(e, t, n) {
            return C.H.useImperativeHandle(e, t, n)
        }, e.useInsertionEffect = function(e, t) {
            return C.H.useInsertionEffect(e, t)
        }, e.useLayoutEffect = function(e, t) {
            return C.H.useLayoutEffect(e, t)
        }, e.useMemo = function(e, t) {
            return C.H.useMemo(e, t)
        }, e.useOptimistic = function(e, t) {
            return C.H.useOptimistic(e, t)
        }, e.useReducer = function(e, t, n) {
            return C.H.useReducer(e, t, n)
        }, e.useRef = function(e) {
            return C.H.useRef(e)
        }, e.useState = function(e) {
            return C.H.useState(e)
        }, e.useSyncExternalStore = function(e, t, n) {
            return C.H.useSyncExternalStore(e, t, n)
        }, e.useTransition = function() {
            return C.H.useTransition()
        }, e.version = `19.2.8`
    })),
    n = e(((e, n) => {
        n.exports = t()
    })),
    r = e((e => {
        function t(e, t) {
            var n = e.length;
            e.push(t);
            a: for (; 0 < n;) {
                var r = n - 1 >>> 1,
                    a = e[r];
                if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
                else break a
            }
        }

        function n(e) {
            return e.length === 0 ? null : e[0]
        }

        function r(e) {
            if (e.length === 0) return null;
            var t = e[0],
                n = e.pop();
            if (n !== t) {
                e[0] = n;
                a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
                    var s = 2 * (r + 1) - 1,
                        c = e[s],
                        l = s + 1,
                        u = e[l];
                    if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
                    else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
                    else break a
                }
            }
            return t
        }

        function i(e, t) {
            var n = e.sortIndex - t.sortIndex;
            return n === 0 ? e.id - t.id : n
        }
        if (e.unstable_now = void 0, typeof performance == `object` && typeof performance.now == `function`) {
            var a = performance;
            e.unstable_now = function() {
                return a.now()
            }
        } else {
            var o = Date,
                s = o.now();
            e.unstable_now = function() {
                return o.now() - s
            }
        }
        var c = [],
            l = [],
            u = 1,
            d = null,
            f = 3,
            p = !1,
            m = !1,
            h = !1,
            g = !1,
            _ = typeof setTimeout == `function` ? setTimeout : null,
            v = typeof clearTimeout == `function` ? clearTimeout : null,
            y = typeof setImmediate < `u` ? setImmediate : null;

        function b(e) {
            for (var i = n(l); i !== null;) {
                if (i.callback === null) r(l);
                else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
                else break;
                i = n(l)
            }
        }

        function x(e) {
            if (h = !1, b(e), !m)
                if (n(c) !== null) m = !0, ee || (ee = !0, E());
                else {
                    var t = n(l);
                    t !== null && ie(x, t.startTime - e)
                }
        }
        var ee = !1,
            S = -1,
            C = 5,
            te = -1;

        function w() {
            return g ? !0 : !(e.unstable_now() - te < C)
        }

        function T() {
            if (g = !1, ee) {
                var t = e.unstable_now();
                te = t;
                var i = !0;
                try {
                    a: {
                        m = !1,
                        h && (h = !1, v(S), S = -1),
                        p = !0;
                        var a = f;
                        try {
                            b: {
                                for (b(t), d = n(c); d !== null && !(d.expirationTime > t && w());) {
                                    var o = d.callback;
                                    if (typeof o == `function`) {
                                        d.callback = null, f = d.priorityLevel;
                                        var s = o(d.expirationTime <= t);
                                        if (t = e.unstable_now(), typeof s == `function`) {
                                            d.callback = s, b(t), i = !0;
                                            break b
                                        }
                                        d === n(c) && r(c), b(t)
                                    } else r(c);
                                    d = n(c)
                                }
                                if (d !== null) i = !0;
                                else {
                                    var u = n(l);
                                    u !== null && ie(x, u.startTime - t), i = !1
                                }
                            }
                            break a
                        }
                        finally {
                            d = null, f = a, p = !1
                        }
                        i = void 0
                    }
                }
                finally {
                    i ? E() : ee = !1
                }
            }
        }
        var E;
        if (typeof y == `function`) E = function() {
            y(T)
        };
        else if (typeof MessageChannel < `u`) {
            var ne = new MessageChannel,
                re = ne.port2;
            ne.port1.onmessage = T, E = function() {
                re.postMessage(null)
            }
        } else E = function() {
            _(T, 0)
        };

        function ie(t, n) {
            S = _(function() {
                t(e.unstable_now())
            }, n)
        }
        e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
            e.callback = null
        }, e.unstable_forceFrameRate = function(e) {
            0 > e || 125 < e ? console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`) : C = 0 < e ? Math.floor(1e3 / e) : 5
        }, e.unstable_getCurrentPriorityLevel = function() {
            return f
        }, e.unstable_next = function(e) {
            switch (f) {
                case 1:
                case 2:
                case 3:
                    var t = 3;
                    break;
                default:
                    t = f
            }
            var n = f;
            f = t;
            try {
                return e()
            } finally {
                f = n
            }
        }, e.unstable_requestPaint = function() {
            g = !0
        }, e.unstable_runWithPriority = function(e, t) {
            switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    e = 3
            }
            var n = f;
            f = e;
            try {
                return t()
            } finally {
                f = n
            }
        }, e.unstable_scheduleCallback = function(r, i, a) {
            var o = e.unstable_now();
            switch (typeof a == `object` && a ? (a = a.delay, a = typeof a == `number` && 0 < a ? o + a : o) : a = o, r) {
                case 1:
                    var s = -1;
                    break;
                case 2:
                    s = 250;
                    break;
                case 5:
                    s = 1073741823;
                    break;
                case 4:
                    s = 1e4;
                    break;
                default:
                    s = 5e3
            }
            return s = a + s, r = {
                id: u++,
                callback: i,
                priorityLevel: r,
                startTime: a,
                expirationTime: s,
                sortIndex: -1
            }, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(S), S = -1) : h = !0, ie(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, E()))), r
        }, e.unstable_shouldYield = w, e.unstable_wrapCallback = function(e) {
            var t = f;
            return function() {
                var n = f;
                f = t;
                try {
                    return e.apply(this, arguments)
                } finally {
                    f = n
                }
            }
        }
    })),
    i = e(((e, t) => {
        t.exports = r()
    })),
    a = e((e => {
        var t = n();

        function r(e) {
            var t = `https://react.dev/errors/` + e;
            if (1 < arguments.length) {
                t += `?args[]=` + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n])
            }
            return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        }

        function i() {}
        var a = {
                d: {
                    f: i,
                    r: function() {
                        throw Error(r(522))
                    },
                    D: i,
                    C: i,
                    L: i,
                    m: i,
                    X: i,
                    S: i,
                    M: i
                },
                p: 0,
                findDOMNode: null
            },
            o = Symbol.for(`react.portal`);

        function s(e, t, n) {
            var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
            return {
                $$typeof: o,
                key: r == null ? null : `` + r,
                children: e,
                containerInfo: t,
                implementation: n
            }
        }
        var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

        function l(e, t) {
            if (e === `font`) return ``;
            if (typeof t == `string`) return t === `use-credentials` ? t : ``
        }
        e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
            var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
            if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(r(299));
            return s(e, t, null, n)
        }, e.flushSync = function(e) {
            var t = c.T,
                n = a.p;
            try {
                if (c.T = null, a.p = 2, e) return e()
            } finally {
                c.T = t, a.p = n, a.d.f()
            }
        }, e.preconnect = function(e, t) {
            typeof e == `string` && (t ? (t = t.crossOrigin, t = typeof t == `string` ? t === `use-credentials` ? t : `` : void 0) : t = null, a.d.C(e, t))
        }, e.prefetchDNS = function(e) {
            typeof e == `string` && a.d.D(e)
        }, e.preinit = function(e, t) {
            if (typeof e == `string` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = l(n, t.crossOrigin),
                    i = typeof t.integrity == `string` ? t.integrity : void 0,
                    o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
                n === `style` ? a.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                    crossOrigin: r,
                    integrity: i,
                    fetchPriority: o
                }) : n === `script` && a.d.X(e, {
                    crossOrigin: r,
                    integrity: i,
                    fetchPriority: o,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0
                })
            }
        }, e.preinitModule = function(e, t) {
            if (typeof e == `string`)
                if (typeof t == `object` && t) {
                    if (t.as == null || t.as === `script`) {
                        var n = l(t.as, t.crossOrigin);
                        a.d.M(e, {
                            crossOrigin: n,
                            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                            nonce: typeof t.nonce == `string` ? t.nonce : void 0
                        })
                    }
                } else t ?? a.d.M(e)
        }, e.preload = function(e, t) {
            if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = l(n, t.crossOrigin);
                a.d.L(e, n, {
                    crossOrigin: r,
                    integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                    type: typeof t.type == `string` ? t.type : void 0,
                    fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
                    referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
                    imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
                    imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
                    media: typeof t.media == `string` ? t.media : void 0
                })
            }
        }, e.preloadModule = function(e, t) {
            if (typeof e == `string`)
                if (t) {
                    var n = l(t.as, t.crossOrigin);
                    a.d.m(e, {
                        as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
                        crossOrigin: n,
                        integrity: typeof t.integrity == `string` ? t.integrity : void 0
                    })
                } else a.d.m(e)
        }, e.requestFormReset = function(e) {
            a.d.r(e)
        }, e.unstable_batchedUpdates = function(e, t) {
            return e(t)
        }, e.useFormState = function(e, t, n) {
            return c.H.useFormState(e, t, n)
        }, e.useFormStatus = function() {
            return c.H.useHostTransitionStatus()
        }, e.version = `19.2.8`
    })),
    o = e(((e, t) => {
        function n() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (e) {
                console.error(e)
            }
        }
        n(), t.exports = a()
    })),
    s = e((e => {
        var t = i(),
            r = n(),
            a = o();

        function s(e) {
            var t = `https://react.dev/errors/` + e;
            if (1 < arguments.length) {
                t += `?args[]=` + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n])
            }
            return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        }

        function c(e) {
            return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        }

        function l(e) {
            var t = e,
                n = e;
            if (e.alternate)
                for (; t.return;) t = t.return;
            else {
                e = t;
                do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
            }
            return t.tag === 3 ? n : null
        }

        function u(e) {
            if (e.tag === 13) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
            }
            return null
        }

        function d(e) {
            if (e.tag === 31) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
            }
            return null
        }

        function f(e) {
            if (l(e) !== e) throw Error(s(188))
        }

        function p(e) {
            var t = e.alternate;
            if (!t) {
                if (t = l(e), t === null) throw Error(s(188));
                return t === e ? e : null
            }
            for (var n = e, r = t;;) {
                var i = n.return;
                if (i === null) break;
                var a = i.alternate;
                if (a === null) {
                    if (r = i.return, r !== null) {
                        n = r;
                        continue
                    }
                    break
                }
                if (i.child === a.child) {
                    for (a = i.child; a;) {
                        if (a === n) return f(i), e;
                        if (a === r) return f(i), t;
                        a = a.sibling
                    }
                    throw Error(s(188))
                }
                if (n.return !== r.return) n = i, r = a;
                else {
                    for (var o = !1, c = i.child; c;) {
                        if (c === n) {
                            o = !0, n = i, r = a;
                            break
                        }
                        if (c === r) {
                            o = !0, r = i, n = a;
                            break
                        }
                        c = c.sibling
                    }
                    if (!o) {
                        for (c = a.child; c;) {
                            if (c === n) {
                                o = !0, n = a, r = i;
                                break
                            }
                            if (c === r) {
                                o = !0, r = a, n = i;
                                break
                            }
                            c = c.sibling
                        }
                        if (!o) throw Error(s(189))
                    }
                }
                if (n.alternate !== r) throw Error(s(190))
            }
            if (n.tag !== 3) throw Error(s(188));
            return n.stateNode.current === n ? e : t
        }

        function m(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e;
            for (e = e.child; e !== null;) {
                if (t = m(e), t !== null) return t;
                e = e.sibling
            }
            return null
        }
        var h = Object.assign,
            g = Symbol.for(`react.element`),
            _ = Symbol.for(`react.transitional.element`),
            v = Symbol.for(`react.portal`),
            y = Symbol.for(`react.fragment`),
            b = Symbol.for(`react.strict_mode`),
            x = Symbol.for(`react.profiler`),
            ee = Symbol.for(`react.consumer`),
            S = Symbol.for(`react.context`),
            C = Symbol.for(`react.forward_ref`),
            te = Symbol.for(`react.suspense`),
            w = Symbol.for(`react.suspense_list`),
            T = Symbol.for(`react.memo`),
            E = Symbol.for(`react.lazy`),
            ne = Symbol.for(`react.activity`),
            re = Symbol.for(`react.memo_cache_sentinel`),
            ie = Symbol.iterator;

        function ae(e) {
            return typeof e != `object` || !e ? null : (e = ie && e[ie] || e[`@@iterator`], typeof e == `function` ? e : null)
        }
        var oe = Symbol.for(`react.client.reference`);

        function se(e) {
            if (e == null) return null;
            if (typeof e == `function`) return e.$$typeof === oe ? null : e.displayName || e.name || null;
            if (typeof e == `string`) return e;
            switch (e) {
                case y:
                    return `Fragment`;
                case x:
                    return `Profiler`;
                case b:
                    return `StrictMode`;
                case te:
                    return `Suspense`;
                case w:
                    return `SuspenseList`;
                case ne:
                    return `Activity`
            }
            if (typeof e == `object`) switch (e.$$typeof) {
                case v:
                    return `Portal`;
                case S:
                    return e.displayName || `Context`;
                case ee:
                    return (e._context.displayName || `Context`) + `.Consumer`;
                case C:
                    var t = e.render;
                    return e = e.displayName, e ||= (e = t.displayName || t.name || ``, e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`), e;
                case T:
                    return t = e.displayName || null, t === null ? se(e.type) || `Memo` : t;
                case E:
                    t = e._payload, e = e._init;
                    try {
                        return se(e(t))
                    } catch {}
            }
            return null
        }
        var ce = Array.isArray,
            D = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            O = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            k = {
                pending: !1,
                data: null,
                method: null,
                action: null
            },
            A = [],
            le = -1;

        function ue(e) {
            return {
                current: e
            }
        }

        function j(e) {
            0 > le || (e.current = A[le], A[le] = null, le--)
        }

        function M(e, t) {
            le++, A[le] = e.current, e.current = t
        }
        var N = ue(null),
            de = ue(null),
            fe = ue(null),
            pe = ue(null);

        function me(e, t) {
            switch (M(fe, t), M(de, e), M(N, null), t.nodeType) {
                case 9:
                case 11:
                    e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
                    break;
                default:
                    if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
                    else switch (e) {
                        case `svg`:
                            e = 1;
                            break;
                        case `math`:
                            e = 2;
                            break;
                        default:
                            e = 0
                    }
            }
            j(N), M(N, e)
        }

        function he() {
            j(N), j(de), j(fe)
        }

        function ge(e) {
            e.memoizedState !== null && M(pe, e);
            var t = N.current,
                n = Hd(t, e.type);
            t !== n && (M(de, e), M(N, n))
        }

        function _e(e) {
            de.current === e && (j(N), j(de)), pe.current === e && (j(pe), Qf._currentValue = k)
        }
        var ve, ye;

        function be(e) {
            if (ve === void 0) try {
                throw Error()
            } catch (e) {
                var t = e.stack.trim().match(/\n( *(at )?)/);
                ve = t && t[1] || ``, ye = -1 < e.stack.indexOf(`
    at`) ? ` (<anonymous>)` : -1 < e.stack.indexOf(`@`) ? `@unknown:0:0` : ``
            }
            return `
` + ve + e + ye
        }
        var xe = !1;

        function Se(e, t) {
            if (!e || xe) return ``;
            xe = !0;
            var n = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
                var r = {
                    DetermineComponentFrameRoot: function() {
                        try {
                            if (t) {
                                var n = function() {
                                    throw Error()
                                };
                                if (Object.defineProperty(n.prototype, "props", {
                                        set: function() {
                                            throw Error()
                                        }
                                    }), typeof Reflect == `object` && Reflect.construct) {
                                    try {
                                        Reflect.construct(n, [])
                                    } catch (e) {
                                        var r = e
                                    }
                                    Reflect.construct(e, [], n)
                                } else {
                                    try {
                                        n.call()
                                    } catch (e) {
                                        r = e
                                    }
                                    e.call(n.prototype)
                                }
                            } else {
                                try {
                                    throw Error()
                                } catch (e) {
                                    r = e
                                }(n = e()) && typeof n.catch == `function` && n.catch(function() {})
                            }
                        } catch (e) {
                            if (e && r && typeof e.stack == `string`) return [e.stack, r.stack]
                        }
                        return [null, null]
                    }
                };
                r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
                var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, `name`);
                i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
                    value: `DetermineComponentFrameRoot`
                });
                var a = r.DetermineComponentFrameRoot(),
                    o = a[0],
                    s = a[1];
                if (o && s) {
                    var c = o.split(`
`),
                        l = s.split(`
`);
                    for (i = r = 0; r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);) r++;
                    for (; i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);) i++;
                    if (r === c.length || i === l.length)
                        for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
                    for (; 1 <= r && 0 <= i; r--, i--)
                        if (c[r] !== l[i]) {
                            if (r !== 1 || i !== 1)
                                do
                                    if (r--, i--, 0 > i || c[r] !== l[i]) {
                                        var u = `
` + c[r].replace(` at new `, ` at `);
                                        return e.displayName && u.includes(`<anonymous>`) && (u = u.replace(`<anonymous>`, e.displayName)), u
                                    } while (1 <= r && 0 <= i);
                            break
                        }
                }
            } finally {
                xe = !1, Error.prepareStackTrace = n
            }
            return (n = e ? e.displayName || e.name : ``) ? be(n) : ``
        }

        function P(e, t) {
            switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    return be(e.type);
                case 16:
                    return be(`Lazy`);
                case 13:
                    return e.child !== t && t !== null ? be(`Suspense Fallback`) : be(`Suspense`);
                case 19:
                    return be(`SuspenseList`);
                case 0:
                case 15:
                    return Se(e.type, !1);
                case 11:
                    return Se(e.type.render, !1);
                case 1:
                    return Se(e.type, !0);
                case 31:
                    return be(`Activity`);
                default:
                    return ``
            }
        }

        function Ce(e) {
            try {
                var t = ``,
                    n = null;
                do t += P(e, n), n = e, e = e.return; while (e);
                return t
            } catch (e) {
                return `
Error generating stack: ` + e.message + `
` + e.stack
            }
        }
        var we = Object.prototype.hasOwnProperty,
            F = t.unstable_scheduleCallback,
            Te = t.unstable_cancelCallback,
            Ee = t.unstable_shouldYield,
            De = t.unstable_requestPaint,
            I = t.unstable_now,
            Oe = t.unstable_getCurrentPriorityLevel,
            ke = t.unstable_ImmediatePriority,
            Ae = t.unstable_UserBlockingPriority,
            je = t.unstable_NormalPriority,
            Me = t.unstable_LowPriority,
            Ne = t.unstable_IdlePriority,
            Pe = t.log,
            Fe = t.unstable_setDisableYieldValue,
            Ie = null,
            Le = null;

        function Re(e) {
            if (typeof Pe == `function` && Fe(e), Le && typeof Le.setStrictMode == `function`) try {
                Le.setStrictMode(Ie, e)
            } catch {}
        }
        var ze = Math.clz32 ? Math.clz32 : He,
            Be = Math.log,
            Ve = Math.LN2;

        function He(e) {
            return e >>>= 0, e === 0 ? 32 : 31 - (Be(e) / Ve | 0) | 0
        }
        var Ue = 256,
            We = 262144,
            Ge = 4194304;

        function Ke(e) {
            var t = e & 42;
            if (t !== 0) return t;
            switch (e & -e) {
                case 1:
                    return 1;
                case 2:
                    return 2;
                case 4:
                    return 4;
                case 8:
                    return 8;
                case 16:
                    return 16;
                case 32:
                    return 32;
                case 64:
                    return 64;
                case 128:
                    return 128;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                    return e & 261888;
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return e & 3932160;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return e & 62914560;
                case 67108864:
                    return 67108864;
                case 134217728:
                    return 134217728;
                case 268435456:
                    return 268435456;
                case 536870912:
                    return 536870912;
                case 1073741824:
                    return 0;
                default:
                    return e
            }
        }

        function qe(e, t, n) {
            var r = e.pendingLanes;
            if (r === 0) return 0;
            var i = 0,
                a = e.suspendedLanes,
                o = e.pingedLanes;
            e = e.warmLanes;
            var s = r & 134217727;
            return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o) : i = Ke(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o)) : i = Ke(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i
        }

        function Je(e, t) {
            return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
        }

        function Ye(e, t) {
            switch (e) {
                case 1:
                case 2:
                case 4:
                case 8:
                case 64:
                    return t + 250;
                case 16:
                case 32:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return t + 5e3;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return -1;
                case 67108864:
                case 134217728:
                case 268435456:
                case 536870912:
                case 1073741824:
                    return -1;
                default:
                    return -1
            }
        }

        function Xe() {
            var e = Ge;
            return Ge <<= 1, !(Ge & 62914560) && (Ge = 4194304), e
        }

        function Ze(e) {
            for (var t = [], n = 0; 31 > n; n++) t.push(e);
            return t
        }

        function Qe(e, t) {
            e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
        }

        function $e(e, t, n, r, i, a) {
            var o = e.pendingLanes;
            e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
            var s = e.entanglements,
                c = e.expirationTimes,
                l = e.hiddenUpdates;
            for (n = o & ~n; 0 < n;) {
                var u = 31 - ze(n),
                    d = 1 << u;
                s[u] = 0, c[u] = -1;
                var f = l[u];
                if (f !== null)
                    for (l[u] = null, u = 0; u < f.length; u++) {
                        var p = f[u];
                        p !== null && (p.lane &= -536870913)
                    }
                n &= ~d
            }
            r !== 0 && et(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t))
        }

        function et(e, t, n) {
            e.pendingLanes |= t, e.suspendedLanes &= ~t;
            var r = 31 - ze(t);
            e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930
        }

        function tt(e, t) {
            var n = e.entangledLanes |= t;
            for (e = e.entanglements; n;) {
                var r = 31 - ze(n),
                    i = 1 << r;
                i & t | e[r] & t && (e[r] |= t), n &= ~i
            }
        }

        function nt(e, t) {
            var n = t & -t;
            return n = n & 42 ? 1 : rt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0
        }

        function rt(e) {
            switch (e) {
                case 2:
                    e = 1;
                    break;
                case 8:
                    e = 4;
                    break;
                case 32:
                    e = 16;
                    break;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    e = 128;
                    break;
                case 268435456:
                    e = 134217728;
                    break;
                default:
                    e = 0
            }
            return e
        }

        function it(e) {
            return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2
        }

        function at() {
            var e = O.p;
            return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e
        }

        function L(e, t) {
            var n = O.p;
            try {
                return O.p = e, t()
            } finally {
                O.p = n
            }
        }
        var ot = Math.random().toString(36).slice(2),
            st = `__reactFiber$` + ot,
            R = `__reactProps$` + ot,
            ct = `__reactContainer$` + ot,
            lt = `__reactEvents$` + ot,
            ut = `__reactListeners$` + ot,
            dt = `__reactHandles$` + ot,
            ft = `__reactResources$` + ot,
            pt = `__reactMarker$` + ot;

        function mt(e) {
            delete e[st], delete e[R], delete e[lt], delete e[ut], delete e[dt]
        }

        function ht(e) {
            var t = e[st];
            if (t) return t;
            for (var n = e.parentNode; n;) {
                if (t = n[ct] || n[st]) {
                    if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                        for (e = df(e); e !== null;) {
                            if (n = e[st]) return n;
                            e = df(e)
                        }
                    return t
                }
                e = n, n = e.parentNode
            }
            return null
        }

        function gt(e) {
            if (e = e[st] || e[ct]) {
                var t = e.tag;
                if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e
            }
            return null
        }

        function _t(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
            throw Error(s(33))
        }

        function vt(e) {
            var t = e[ft];
            return t ||= e[ft] = {
                hoistableStyles: new Map,
                hoistableScripts: new Map
            }, t
        }

        function yt(e) {
            e[pt] = !0
        }
        var bt = new Set,
            xt = {};

        function St(e, t) {
            Ct(e, t), Ct(e + `Capture`, t)
        }

        function Ct(e, t) {
            for (xt[e] = t, e = 0; e < t.length; e++) bt.add(t[e])
        }
        var wt = RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),
            Tt = {},
            Et = {};

        function Dt(e) {
            return we.call(Et, e) ? !0 : we.call(Tt, e) ? !1 : wt.test(e) ? Et[e] = !0 : (Tt[e] = !0, !1)
        }

        function Ot(e, t, n) {
            if (Dt(t))
                if (n === null) e.removeAttribute(t);
                else {
                    switch (typeof n) {
                        case `undefined`:
                        case `function`:
                        case `symbol`:
                            e.removeAttribute(t);
                            return;
                        case `boolean`:
                            var r = t.toLowerCase().slice(0, 5);
                            if (r !== `data-` && r !== `aria-`) {
                                e.removeAttribute(t);
                                return
                            }
                    }
                    e.setAttribute(t, `` + n)
                }
        }

        function kt(e, t, n) {
            if (n === null) e.removeAttribute(t);
            else {
                switch (typeof n) {
                    case `undefined`:
                    case `function`:
                    case `symbol`:
                    case `boolean`:
                        e.removeAttribute(t);
                        return
                }
                e.setAttribute(t, `` + n)
            }
        }

        function At(e, t, n, r) {
            if (r === null) e.removeAttribute(n);
            else {
                switch (typeof r) {
                    case `undefined`:
                    case `function`:
                    case `symbol`:
                    case `boolean`:
                        e.removeAttribute(n);
                        return
                }
                e.setAttributeNS(t, n, `` + r)
            }
        }

        function jt(e) {
            switch (typeof e) {
                case `bigint`:
                case `boolean`:
                case `number`:
                case `string`:
                case `undefined`:
                    return e;
                case `object`:
                    return e;
                default:
                    return ``
            }
        }

        function Mt(e) {
            var t = e.type;
            return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`)
        }

        function Nt(e, t, n) {
            var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
            if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == `function` && typeof r.set == `function`) {
                var i = r.get,
                    a = r.set;
                return Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function() {
                        return i.call(this)
                    },
                    set: function(e) {
                        n = `` + e, a.call(this, e)
                    }
                }), Object.defineProperty(e, t, {
                    enumerable: r.enumerable
                }), {
                    getValue: function() {
                        return n
                    },
                    setValue: function(e) {
                        n = `` + e
                    },
                    stopTracking: function() {
                        e._valueTracker = null, delete e[t]
                    }
                }
            }
        }

        function Pt(e) {
            if (!e._valueTracker) {
                var t = Mt(e) ? `checked` : `value`;
                e._valueTracker = Nt(e, t, `` + e[t])
            }
        }

        function Ft(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var n = t.getValue(),
                r = ``;
            return e && (r = Mt(e) ? e.checked ? `true` : `false` : e.value), e = r, e === n ? !1 : (t.setValue(e), !0)
        }

        function It(e) {
            if (e ||= typeof document < `u` ? document : void 0, e === void 0) return null;
            try {
                return e.activeElement || e.body
            } catch {
                return e.body
            }
        }
        var Lt = /[\n"\\]/g;

        function Rt(e) {
            return e.replace(Lt, function(e) {
                return `\\` + e.charCodeAt(0).toString(16) + ` `
            })
        }

        function zt(e, t, n, r, i, a, o, s) {
            e.name = ``, o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean` ? e.type = o : e.removeAttribute(`type`), t == null ? o !== `submit` && o !== `reset` || e.removeAttribute(`value`) : o === `number` ? (t === 0 && e.value === `` || e.value != t) && (e.value = `` + jt(t)) : e.value !== `` + jt(t) && (e.value = `` + jt(t)), t == null ? n == null ? r != null && e.removeAttribute(`value`) : Vt(e, o, jt(n)) : Vt(e, o, jt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != `function` && typeof i != `symbol`), s != null && typeof s != `function` && typeof s != `symbol` && typeof s != `boolean` ? e.name = `` + jt(s) : e.removeAttribute(`name`)
        }

        function Bt(e, t, n, r, i, a, o, s) {
            if (a != null && typeof a != `function` && typeof a != `symbol` && typeof a != `boolean` && (e.type = a), t != null || n != null) {
                if (!(a !== `submit` && a !== `reset` || t != null)) {
                    Pt(e);
                    return
                }
                n = n == null ? `` : `` + jt(n), t = t == null ? n : `` + jt(t), s || t === e.value || (e.value = t), e.defaultValue = t
            }
            r ??= i, r = typeof r != `function` && typeof r != `symbol` && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean` && (e.name = o), Pt(e)
        }

        function Vt(e, t, n) {
            t === `number` && It(e.ownerDocument) === e || e.defaultValue === `` + n || (e.defaultValue = `` + n)
        }

        function Ht(e, t, n, r) {
            if (e = e.options, t) {
                t = {};
                for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
                for (n = 0; n < e.length; n++) i = t.hasOwnProperty(`$` + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
            } else {
                for (n = `` + jt(n), t = null, i = 0; i < e.length; i++) {
                    if (e[i].value === n) {
                        e[i].selected = !0, r && (e[i].defaultSelected = !0);
                        return
                    }
                    t !== null || e[i].disabled || (t = e[i])
                }
                t !== null && (t.selected = !0)
            }
        }

        function Ut(e, t, n) {
            if (t != null && (t = `` + jt(t), t !== e.value && (e.value = t), n == null)) {
                e.defaultValue !== t && (e.defaultValue = t);
                return
            }
            e.defaultValue = n == null ? `` : `` + jt(n)
        }

        function Wt(e, t, n, r) {
            if (t == null) {
                if (r != null) {
                    if (n != null) throw Error(s(92));
                    if (ce(r)) {
                        if (1 < r.length) throw Error(s(93));
                        r = r[0]
                    }
                    n = r
                }
                n ??= ``, t = n
            }
            n = jt(t), e.defaultValue = n, r = e.textContent, r === n && r !== `` && r !== null && (e.value = r), Pt(e)
        }

        function Gt(e, t) {
            if (t) {
                var n = e.firstChild;
                if (n && n === e.lastChild && n.nodeType === 3) {
                    n.nodeValue = t;
                    return
                }
            }
            e.textContent = t
        }
        var Kt = new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));

        function qt(e, t, n) {
            var r = t.indexOf(`--`) === 0;
            n == null || typeof n == `boolean` || n === `` ? r ? e.setProperty(t, ``) : t === `float` ? e.cssFloat = `` : e[t] = `` : r ? e.setProperty(t, n) : typeof n != `number` || n === 0 || Kt.has(t) ? t === `float` ? e.cssFloat = n : e[t] = (`` + n).trim() : e[t] = n + `px`
        }

        function Jt(e, t, n) {
            if (t != null && typeof t != `object`) throw Error(s(62));
            if (e = e.style, n != null) {
                for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf(`--`) === 0 ? e.setProperty(r, ``) : r === `float` ? e.cssFloat = `` : e[r] = ``);
                for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && qt(e, i, r)
            } else
                for (var a in t) t.hasOwnProperty(a) && qt(e, a, t[a])
        }

        function Yt(e) {
            if (e.indexOf(`-`) === -1) return !1;
            switch (e) {
                case `annotation-xml`:
                case `color-profile`:
                case `font-face`:
                case `font-face-src`:
                case `font-face-uri`:
                case `font-face-format`:
                case `font-face-name`:
                case `missing-glyph`:
                    return !1;
                default:
                    return !0
            }
        }
        var Xt = new Map([
                [`acceptCharset`, `accept-charset`],
                [`htmlFor`, `for`],
                [`httpEquiv`, `http-equiv`],
                [`crossOrigin`, `crossorigin`],
                [`accentHeight`, `accent-height`],
                [`alignmentBaseline`, `alignment-baseline`],
                [`arabicForm`, `arabic-form`],
                [`baselineShift`, `baseline-shift`],
                [`capHeight`, `cap-height`],
                [`clipPath`, `clip-path`],
                [`clipRule`, `clip-rule`],
                [`colorInterpolation`, `color-interpolation`],
                [`colorInterpolationFilters`, `color-interpolation-filters`],
                [`colorProfile`, `color-profile`],
                [`colorRendering`, `color-rendering`],
                [`dominantBaseline`, `dominant-baseline`],
                [`enableBackground`, `enable-background`],
                [`fillOpacity`, `fill-opacity`],
                [`fillRule`, `fill-rule`],
                [`floodColor`, `flood-color`],
                [`floodOpacity`, `flood-opacity`],
                [`fontFamily`, `font-family`],
                [`fontSize`, `font-size`],
                [`fontSizeAdjust`, `font-size-adjust`],
                [`fontStretch`, `font-stretch`],
                [`fontStyle`, `font-style`],
                [`fontVariant`, `font-variant`],
                [`fontWeight`, `font-weight`],
                [`glyphName`, `glyph-name`],
                [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
                [`glyphOrientationVertical`, `glyph-orientation-vertical`],
                [`horizAdvX`, `horiz-adv-x`],
                [`horizOriginX`, `horiz-origin-x`],
                [`imageRendering`, `image-rendering`],
                [`letterSpacing`, `letter-spacing`],
                [`lightingColor`, `lighting-color`],
                [`markerEnd`, `marker-end`],
                [`markerMid`, `marker-mid`],
                [`markerStart`, `marker-start`],
                [`overlinePosition`, `overline-position`],
                [`overlineThickness`, `overline-thickness`],
                [`paintOrder`, `paint-order`],
                [`panose-1`, `panose-1`],
                [`pointerEvents`, `pointer-events`],
                [`renderingIntent`, `rendering-intent`],
                [`shapeRendering`, `shape-rendering`],
                [`stopColor`, `stop-color`],
                [`stopOpacity`, `stop-opacity`],
                [`strikethroughPosition`, `strikethrough-position`],
                [`strikethroughThickness`, `strikethrough-thickness`],
                [`strokeDasharray`, `stroke-dasharray`],
                [`strokeDashoffset`, `stroke-dashoffset`],
                [`strokeLinecap`, `stroke-linecap`],
                [`strokeLinejoin`, `stroke-linejoin`],
                [`strokeMiterlimit`, `stroke-miterlimit`],
                [`strokeOpacity`, `stroke-opacity`],
                [`strokeWidth`, `stroke-width`],
                [`textAnchor`, `text-anchor`],
                [`textDecoration`, `text-decoration`],
                [`textRendering`, `text-rendering`],
                [`transformOrigin`, `transform-origin`],
                [`underlinePosition`, `underline-position`],
                [`underlineThickness`, `underline-thickness`],
                [`unicodeBidi`, `unicode-bidi`],
                [`unicodeRange`, `unicode-range`],
                [`unitsPerEm`, `units-per-em`],
                [`vAlphabetic`, `v-alphabetic`],
                [`vHanging`, `v-hanging`],
                [`vIdeographic`, `v-ideographic`],
                [`vMathematical`, `v-mathematical`],
                [`vectorEffect`, `vector-effect`],
                [`vertAdvY`, `vert-adv-y`],
                [`vertOriginX`, `vert-origin-x`],
                [`vertOriginY`, `vert-origin-y`],
                [`wordSpacing`, `word-spacing`],
                [`writingMode`, `writing-mode`],
                [`xmlnsXlink`, `xmlns:xlink`],
                [`xHeight`, `x-height`]
            ]),
            Zt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

        function Qt(e) {
            return Zt.test(`` + e) ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')` : e
        }

        function $t() {}
        var en = null;

        function tn(e) {
            return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
        }
        var nn = null,
            rn = null;

        function an(e) {
            var t = gt(e);
            if (t && (e = t.stateNode)) {
                var n = e[R] || null;
                a: switch (e = t.stateNode, t.type) {
                    case `input`:
                        if (zt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === `radio` && t != null) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll(`input[name="` + Rt(`` + t) + `"][type="radio"]`), t = 0; t < n.length; t++) {
                                var r = n[t];
                                if (r !== e && r.form === e.form) {
                                    var i = r[R] || null;
                                    if (!i) throw Error(s(90));
                                    zt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name)
                                }
                            }
                            for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ft(r)
                        }
                        break a;
                    case `textarea`:
                        Ut(e, n.value, n.defaultValue);
                        break a;
                    case `select`:
                        t = n.value, t != null && Ht(e, !!n.multiple, t, !1)
                }
            }
        }
        var on = !1;

        function sn(e, t, n) {
            if (on) return e(t, n);
            on = !0;
            try {
                return e(t)
            } finally {
                if (on = !1, (nn !== null || rn !== null) && (bu(), nn && (t = nn, e = rn, rn = nn = null, an(t), e)))
                    for (t = 0; t < e.length; t++) an(e[t])
            }
        }

        function cn(e, t) {
            var n = e.stateNode;
            if (n === null) return null;
            var r = n[R] || null;
            if (r === null) return null;
            n = r[t];
            a: switch (t) {
                case `onClick`:
                case `onClickCapture`:
                case `onDoubleClick`:
                case `onDoubleClickCapture`:
                case `onMouseDown`:
                case `onMouseDownCapture`:
                case `onMouseMove`:
                case `onMouseMoveCapture`:
                case `onMouseUp`:
                case `onMouseUpCapture`:
                case `onMouseEnter`:
                    (r = !r.disabled) || (e = e.type, r = !(e === `button` || e === `input` || e === `select` || e === `textarea`)), e = !r;
                    break a;
                default:
                    e = !1
            }
            if (e) return null;
            if (n && typeof n != `function`) throw Error(s(231, t, typeof n));
            return n
        }
        var ln = !(typeof window > `u` || window.document === void 0 || window.document.createElement === void 0),
            un = !1;
        if (ln) try {
            var dn = {};
            Object.defineProperty(dn, "passive", {
                get: function() {
                    un = !0
                }
            }), window.addEventListener(`test`, dn, dn), window.removeEventListener(`test`, dn, dn)
        } catch {
            un = !1
        }
        var fn = null,
            pn = null,
            mn = null;

        function hn() {
            if (mn) return mn;
            var e, t = pn,
                n = t.length,
                r, i = `value` in fn ? fn.value : fn.textContent,
                a = i.length;
            for (e = 0; e < n && t[e] === i[e]; e++);
            var o = n - e;
            for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
            return mn = i.slice(e, 1 < r ? 1 - r : void 0)
        }

        function gn(e) {
            var t = e.keyCode;
            return `charCode` in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
        }

        function _n() {
            return !0
        }

        function vn() {
            return !1
        }

        function yn(e) {
            function t(t, n, r, i, a) {
                for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
                return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? _n : vn, this.isPropagationStopped = vn, this
            }
            return h(t.prototype, {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                    var e = this.nativeEvent;
                    e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != `unknown` && (e.returnValue = !1), this.isDefaultPrevented = _n)
                },
                stopPropagation: function() {
                    var e = this.nativeEvent;
                    e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0), this.isPropagationStopped = _n)
                },
                persist: function() {},
                isPersistent: _n
            }), t
        }
        var bn = {
                eventPhase: 0,
                bubbles: 0,
                cancelable: 0,
                timeStamp: function(e) {
                    return e.timeStamp || Date.now()
                },
                defaultPrevented: 0,
                isTrusted: 0
            },
            xn = yn(bn),
            Sn = h({}, bn, {
                view: 0,
                detail: 0
            }),
            Cn = yn(Sn),
            wn, Tn, En, Dn = h({}, Sn, {
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                getModifierState: Rn,
                button: 0,
                buttons: 0,
                relatedTarget: function(e) {
                    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                },
                movementX: function(e) {
                    return `movementX` in e ? e.movementX : (e !== En && (En && e.type === `mousemove` ? (wn = e.screenX - En.screenX, Tn = e.screenY - En.screenY) : Tn = wn = 0, En = e), wn)
                },
                movementY: function(e) {
                    return `movementY` in e ? e.movementY : Tn
                }
            }),
            On = yn(Dn),
            kn = yn(h({}, Dn, {
                dataTransfer: 0
            })),
            An = yn(h({}, Sn, {
                relatedTarget: 0
            })),
            jn = yn(h({}, bn, {
                animationName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })),
            Mn = yn(h({}, bn, {
                clipboardData: function(e) {
                    return `clipboardData` in e ? e.clipboardData : window.clipboardData
                }
            })),
            Nn = yn(h({}, bn, {
                data: 0
            })),
            Pn = {
                Esc: `Escape`,
                Spacebar: ` `,
                Left: `ArrowLeft`,
                Up: `ArrowUp`,
                Right: `ArrowRight`,
                Down: `ArrowDown`,
                Del: `Delete`,
                Win: `OS`,
                Menu: `ContextMenu`,
                Apps: `ContextMenu`,
                Scroll: `ScrollLock`,
                MozPrintableKey: `Unidentified`
            },
            Fn = {
                8: `Backspace`,
                9: `Tab`,
                12: `Clear`,
                13: `Enter`,
                16: `Shift`,
                17: `Control`,
                18: `Alt`,
                19: `Pause`,
                20: `CapsLock`,
                27: `Escape`,
                32: ` `,
                33: `PageUp`,
                34: `PageDown`,
                35: `End`,
                36: `Home`,
                37: `ArrowLeft`,
                38: `ArrowUp`,
                39: `ArrowRight`,
                40: `ArrowDown`,
                45: `Insert`,
                46: `Delete`,
                112: `F1`,
                113: `F2`,
                114: `F3`,
                115: `F4`,
                116: `F5`,
                117: `F6`,
                118: `F7`,
                119: `F8`,
                120: `F9`,
                121: `F10`,
                122: `F11`,
                123: `F12`,
                144: `NumLock`,
                145: `ScrollLock`,
                224: `Meta`
            },
            In = {
                Alt: `altKey`,
                Control: `ctrlKey`,
                Meta: `metaKey`,
                Shift: `shiftKey`
            };

        function Ln(e) {
            var t = this.nativeEvent;
            return t.getModifierState ? t.getModifierState(e) : (e = In[e]) ? !!t[e] : !1
        }

        function Rn() {
            return Ln
        }
        var zn = yn(h({}, Sn, {
                key: function(e) {
                    if (e.key) {
                        var t = Pn[e.key] || e.key;
                        if (t !== `Unidentified`) return t
                    }
                    return e.type === `keypress` ? (e = gn(e), e === 13 ? `Enter` : String.fromCharCode(e)) : e.type === `keydown` || e.type === `keyup` ? Fn[e.keyCode] || `Unidentified` : ``
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: Rn,
                charCode: function(e) {
                    return e.type === `keypress` ? gn(e) : 0
                },
                keyCode: function(e) {
                    return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0
                },
                which: function(e) {
                    return e.type === `keypress` ? gn(e) : e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0
                }
            })),
            Bn = yn(h({}, Dn, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            })),
            Vn = yn(h({}, Sn, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: Rn
            })),
            Hn = yn(h({}, bn, {
                propertyName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })),
            Un = yn(h({}, Dn, {
                deltaX: function(e) {
                    return `deltaX` in e ? e.deltaX : `wheelDeltaX` in e ? -e.wheelDeltaX : 0
                },
                deltaY: function(e) {
                    return `deltaY` in e ? e.deltaY : `wheelDeltaY` in e ? -e.wheelDeltaY : `wheelDelta` in e ? -e.wheelDelta : 0
                },
                deltaZ: 0,
                deltaMode: 0
            })),
            Wn = yn(h({}, bn, {
                newState: 0,
                oldState: 0
            })),
            Gn = [9, 13, 27, 32],
            Kn = ln && `CompositionEvent` in window,
            qn = null;
        ln && `documentMode` in document && (qn = document.documentMode);
        var Jn = ln && `TextEvent` in window && !qn,
            Yn = ln && (!Kn || qn && 8 < qn && 11 >= qn),
            Xn = ` `,
            Zn = !1;

        function Qn(e, t) {
            switch (e) {
                case `keyup`:
                    return Gn.indexOf(t.keyCode) !== -1;
                case `keydown`:
                    return t.keyCode !== 229;
                case `keypress`:
                case `mousedown`:
                case `focusout`:
                    return !0;
                default:
                    return !1
            }
        }

        function $n(e) {
            return e = e.detail, typeof e == `object` && `data` in e ? e.data : null
        }
        var er = !1;

        function tr(e, t) {
            switch (e) {
                case `compositionend`:
                    return $n(t);
                case `keypress`:
                    return t.which === 32 ? (Zn = !0, Xn) : null;
                case `textInput`:
                    return e = t.data, e === Xn && Zn ? null : e;
                default:
                    return null
            }
        }

        function nr(e, t) {
            if (er) return e === `compositionend` || !Kn && Qn(e, t) ? (e = hn(), mn = pn = fn = null, er = !1, e) : null;
            switch (e) {
                case `paste`:
                    return null;
                case `keypress`:
                    if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which)
                    }
                    return null;
                case `compositionend`:
                    return Yn && t.locale !== `ko` ? null : t.data;
                default:
                    return null
            }
        }
        var rr = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };

        function ir(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t === `input` ? !!rr[e.type] : t === `textarea`
        }

        function ar(e, t, n, r) {
            nn ? rn ? rn.push(r) : rn = [r] : nn = r, t = Ed(t, `onChange`), 0 < t.length && (n = new xn(`onChange`, `change`, null, n, r), e.push({
                event: n,
                listeners: t
            }))
        }
        var or = null,
            sr = null;

        function cr(e) {
            yd(e, 0)
        }

        function lr(e) {
            if (Ft(_t(e))) return e
        }

        function ur(e, t) {
            if (e === `change`) return t
        }
        var dr = !1;
        if (ln) {
            var fr;
            if (ln) {
                var pr = `oninput` in document;
                if (!pr) {
                    var mr = document.createElement(`div`);
                    mr.setAttribute(`oninput`, `return;`), pr = typeof mr.oninput == `function`
                }
                fr = pr
            } else fr = !1;
            dr = fr && (!document.documentMode || 9 < document.documentMode)
        }

        function hr() {
            or && (or.detachEvent(`onpropertychange`, gr), sr = or = null)
        }

        function gr(e) {
            if (e.propertyName === `value` && lr(sr)) {
                var t = [];
                ar(t, sr, e, tn(e)), sn(cr, t)
            }
        }

        function _r(e, t, n) {
            e === `focusin` ? (hr(), or = t, sr = n, or.attachEvent(`onpropertychange`, gr)) : e === `focusout` && hr()
        }

        function vr(e) {
            if (e === `selectionchange` || e === `keyup` || e === `keydown`) return lr(sr)
        }

        function yr(e, t) {
            if (e === `click`) return lr(t)
        }

        function br(e, t) {
            if (e === `input` || e === `change`) return lr(t)
        }

        function xr(e, t) {
            return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t
        }
        var Sr = typeof Object.is == `function` ? Object.is : xr;

        function Cr(e, t) {
            if (Sr(e, t)) return !0;
            if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
            var n = Object.keys(e),
                r = Object.keys(t);
            if (n.length !== r.length) return !1;
            for (r = 0; r < n.length; r++) {
                var i = n[r];
                if (!we.call(t, i) || !Sr(e[i], t[i])) return !1
            }
            return !0
        }

        function wr(e) {
            for (; e && e.firstChild;) e = e.firstChild;
            return e
        }

        function Tr(e, t) {
            var n = wr(e);
            e = 0;
            for (var r; n;) {
                if (n.nodeType === 3) {
                    if (r = e + n.textContent.length, e <= t && r >= t) return {
                        node: n,
                        offset: t - e
                    };
                    e = r
                }
                a: {
                    for (; n;) {
                        if (n.nextSibling) {
                            n = n.nextSibling;
                            break a
                        }
                        n = n.parentNode
                    }
                    n = void 0
                }
                n = wr(n)
            }
        }

        function Er(e, t) {
            return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Er(e, t.parentNode) : `contains` in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
        }

        function Dr(e) {
            e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
            for (var t = It(e.document); t instanceof e.HTMLIFrameElement;) {
                try {
                    var n = typeof t.contentWindow.location.href == `string`
                } catch {
                    n = !1
                }
                if (n) e = t.contentWindow;
                else break;
                t = It(e.document)
            }
            return t
        }

        function Or(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t && (t === `input` && (e.type === `text` || e.type === `search` || e.type === `tel` || e.type === `url` || e.type === `password`) || t === `textarea` || e.contentEditable === `true`)
        }
        var kr = ln && `documentMode` in document && 11 >= document.documentMode,
            Ar = null,
            jr = null,
            Mr = null,
            Nr = !1;

        function Pr(e, t, n) {
            var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
            Nr || Ar == null || Ar !== It(r) || (r = Ar, `selectionStart` in r && Or(r) ? r = {
                start: r.selectionStart,
                end: r.selectionEnd
            } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
                anchorNode: r.anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset
            }), Mr && Cr(Mr, r) || (Mr = r, r = Ed(jr, `onSelect`), 0 < r.length && (t = new xn(`onSelect`, `select`, null, t, n), e.push({
                event: t,
                listeners: r
            }), t.target = Ar)))
        }

        function Fr(e, t) {
            var n = {};
            return n[e.toLowerCase()] = t.toLowerCase(), n[`Webkit` + e] = `webkit` + t, n[`Moz` + e] = `moz` + t, n
        }
        var Ir = {
                animationend: Fr(`Animation`, `AnimationEnd`),
                animationiteration: Fr(`Animation`, `AnimationIteration`),
                animationstart: Fr(`Animation`, `AnimationStart`),
                transitionrun: Fr(`Transition`, `TransitionRun`),
                transitionstart: Fr(`Transition`, `TransitionStart`),
                transitioncancel: Fr(`Transition`, `TransitionCancel`),
                transitionend: Fr(`Transition`, `TransitionEnd`)
            },
            Lr = {},
            Rr = {};
        ln && (Rr = document.createElement(`div`).style, `AnimationEvent` in window || (delete Ir.animationend.animation, delete Ir.animationiteration.animation, delete Ir.animationstart.animation), `TransitionEvent` in window || delete Ir.transitionend.transition);

        function zr(e) {
            if (Lr[e]) return Lr[e];
            if (!Ir[e]) return e;
            var t = Ir[e],
                n;
            for (n in t)
                if (t.hasOwnProperty(n) && n in Rr) return Lr[e] = t[n];
            return e
        }
        var Br = zr(`animationend`),
            Vr = zr(`animationiteration`),
            Hr = zr(`animationstart`),
            Ur = zr(`transitionrun`),
            Wr = zr(`transitionstart`),
            Gr = zr(`transitioncancel`),
            Kr = zr(`transitionend`),
            qr = new Map,
            Jr = `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);
        Jr.push(`scrollEnd`);

        function Yr(e, t) {
            qr.set(e, t), St(t, [e])
        }
        var Xr = typeof reportError == `function` ? reportError : function(e) {
                if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                    var t = new window.ErrorEvent(`error`, {
                        bubbles: !0,
                        cancelable: !0,
                        message: typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
                        error: e
                    });
                    if (!window.dispatchEvent(t)) return
                } else if (typeof process == `object` && typeof process.emit == `function`) {
                    process.emit(`uncaughtException`, e);
                    return
                }
                console.error(e)
            },
            Zr = [],
            Qr = 0,
            $r = 0;

        function ei() {
            for (var e = Qr, t = $r = Qr = 0; t < e;) {
                var n = Zr[t];
                Zr[t++] = null;
                var r = Zr[t];
                Zr[t++] = null;
                var i = Zr[t];
                Zr[t++] = null;
                var a = Zr[t];
                if (Zr[t++] = null, r !== null && i !== null) {
                    var o = r.pending;
                    o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i
                }
                a !== 0 && ii(n, i, a)
            }
        }

        function ti(e, t, n, r) {
            Zr[Qr++] = e, Zr[Qr++] = t, Zr[Qr++] = n, Zr[Qr++] = r, $r |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r)
        }

        function ni(e, t, n, r) {
            return ti(e, t, n, r), ai(e)
        }

        function ri(e, t) {
            return ti(e, null, null, t), ai(e)
        }

        function ii(e, t, n) {
            e.lanes |= n;
            var r = e.alternate;
            r !== null && (r.lanes |= n);
            for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
            return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - ze(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null
        }

        function ai(e) {
            if (50 < du) throw du = 0, fu = null, Error(s(185));
            for (var t = e.return; t !== null;) e = t, t = e.return;
            return e.tag === 3 ? e.stateNode : null
        }
        var oi = {};

        function si(e, t, n, r) {
            this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
        }

        function ci(e, t, n, r) {
            return new si(e, t, n, r)
        }

        function li(e) {
            return e = e.prototype, !(!e || !e.isReactComponent)
        }

        function ui(e, t) {
            var n = e.alternate;
            return n === null ? (n = ci(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n
        }

        function di(e, t) {
            e.flags &= 65011714;
            var n = e.alternate;
            return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }), e
        }

        function fi(e, t, n, r, i, a) {
            var o = 0;
            if (r = e, typeof e == `function`) li(e) && (o = 1);
            else if (typeof e == `string`) o = Uf(e, n, N.current) ? 26 : e === `html` || e === `head` || e === `body` ? 27 : 5;
            else a: switch (e) {
                case ne:
                    return e = ci(31, n, t, i), e.elementType = ne, e.lanes = a, e;
                case y:
                    return pi(n.children, i, a, t);
                case b:
                    o = 8, i |= 24;
                    break;
                case x:
                    return e = ci(12, n, t, i | 2), e.elementType = x, e.lanes = a, e;
                case te:
                    return e = ci(13, n, t, i), e.elementType = te, e.lanes = a, e;
                case w:
                    return e = ci(19, n, t, i), e.elementType = w, e.lanes = a, e;
                default:
                    if (typeof e == `object` && e) switch (e.$$typeof) {
                        case S:
                            o = 10;
                            break a;
                        case ee:
                            o = 9;
                            break a;
                        case C:
                            o = 11;
                            break a;
                        case T:
                            o = 14;
                            break a;
                        case E:
                            o = 16, r = null;
                            break a
                    }
                    o = 29, n = Error(s(130, e === null ? `null` : typeof e, ``)), r = null
            }
            return t = ci(o, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t
        }

        function pi(e, t, n, r) {
            return e = ci(7, e, r, t), e.lanes = n, e
        }

        function mi(e, t, n) {
            return e = ci(6, e, null, t), e.lanes = n, e
        }

        function hi(e) {
            var t = ci(18, null, null, 0);
            return t.stateNode = e, t
        }

        function gi(e, t, n) {
            return t = ci(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation
            }, t
        }
        var _i = new WeakMap;

        function vi(e, t) {
            if (typeof e == `object` && e) {
                var n = _i.get(e);
                return n === void 0 ? (t = {
                    value: e,
                    source: t,
                    stack: Ce(t)
                }, _i.set(e, t), t) : n
            }
            return {
                value: e,
                source: t,
                stack: Ce(t)
            }
        }
        var yi = [],
            bi = 0,
            xi = null,
            Si = 0,
            Ci = [],
            wi = 0,
            Ti = null,
            Ei = 1,
            Di = ``;

        function Oi(e, t) {
            yi[bi++] = Si, yi[bi++] = xi, xi = e, Si = t
        }

        function ki(e, t, n) {
            Ci[wi++] = Ei, Ci[wi++] = Di, Ci[wi++] = Ti, Ti = e;
            var r = Ei;
            e = Di;
            var i = 32 - ze(r) - 1;
            r &= ~(1 << i), n += 1;
            var a = 32 - ze(t) + i;
            if (30 < a) {
                var o = i - i % 5;
                a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ei = 1 << 32 - ze(t) + i | n << i | r, Di = a + e
            } else Ei = 1 << a | n << i | r, Di = e
        }

        function Ai(e) {
            e.return !== null && (Oi(e, 1), ki(e, 1, 0))
        }

        function ji(e) {
            for (; e === xi;) xi = yi[--bi], yi[bi] = null, Si = yi[--bi], yi[bi] = null;
            for (; e === Ti;) Ti = Ci[--wi], Ci[wi] = null, Di = Ci[--wi], Ci[wi] = null, Ei = Ci[--wi], Ci[wi] = null
        }

        function Mi(e, t) {
            Ci[wi++] = Ei, Ci[wi++] = Di, Ci[wi++] = Ti, Ei = t.id, Di = t.overflow, Ti = e
        }
        var Ni = null,
            z = null,
            B = !1,
            Pi = null,
            Fi = !1,
            Ii = Error(s(519));

        function Li(e) {
            throw Ui(vi(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`, ``)), e)), Ii
        }

        function Ri(e) {
            var t = e.stateNode,
                n = e.type,
                r = e.memoizedProps;
            switch (t[st] = e, t[R] = r, n) {
                case `dialog`:
                    Q(`cancel`, t), Q(`close`, t);
                    break;
                case `iframe`:
                case `object`:
                case `embed`:
                    Q(`load`, t);
                    break;
                case `video`:
                case `audio`:
                    for (n = 0; n < _d.length; n++) Q(_d[n], t);
                    break;
                case `source`:
                    Q(`error`, t);
                    break;
                case `img`:
                case `image`:
                case `link`:
                    Q(`error`, t), Q(`load`, t);
                    break;
                case `details`:
                    Q(`toggle`, t);
                    break;
                case `input`:
                    Q(`invalid`, t), Bt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
                    break;
                case `select`:
                    Q(`invalid`, t);
                    break;
                case `textarea`:
                    Q(`invalid`, t), Wt(t, r.value, r.defaultValue, r.children)
            }
            n = r.children, typeof n != `string` && typeof n != `number` && typeof n != `bigint` || t.textContent === `` + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q(`beforetoggle`, t), Q(`toggle`, t)), r.onScroll != null && Q(`scroll`, t), r.onScrollEnd != null && Q(`scrollend`, t), r.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || Li(e, !0)
        }

        function zi(e) {
            for (Ni = e.return; Ni;) switch (Ni.tag) {
                case 5:
                case 31:
                case 13:
                    Fi = !1;
                    return;
                case 27:
                case 3:
                    Fi = !0;
                    return;
                default:
                    Ni = Ni.return
            }
        }

        function Bi(e) {
            if (e !== Ni) return !1;
            if (!B) return zi(e), B = !0, !1;
            var t = e.tag,
                n;
            if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== `form` && n !== `button`) || Ud(e.type, e.memoizedProps)), n = !n), n && z && Li(e), zi(e), t === 13) {
                if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
                z = uf(e)
            } else if (t === 31) {
                if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
                z = uf(e)
            } else t === 27 ? (t = z, Zd(e.type) ? (e = lf, lf = null, z = e) : z = t) : z = Ni ? cf(e.stateNode.nextSibling) : null;
            return !0
        }

        function Vi() {
            z = Ni = null, B = !1
        }

        function Hi() {
            var e = Pi;
            return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Pi = null), e
        }

        function Ui(e) {
            Pi === null ? Pi = [e] : Pi.push(e)
        }
        var Wi = ue(null),
            Gi = null,
            Ki = null;

        function V(e, t, n) {
            M(Wi, t._currentValue), t._currentValue = n
        }

        function qi(e) {
            e._currentValue = Wi.current, j(Wi)
        }

        function Ji(e, t, n) {
            for (; e !== null;) {
                var r = e.alternate;
                if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
                e = e.return
            }
        }

        function Yi(e, t, n, r) {
            var i = e.child;
            for (i !== null && (i.return = e); i !== null;) {
                var a = i.dependencies;
                if (a !== null) {
                    var o = i.child;
                    a = a.firstContext;
                    a: for (; a !== null;) {
                        var c = a;
                        a = i;
                        for (var l = 0; l < t.length; l++)
                            if (c.context === t[l]) {
                                a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), Ji(a.return, n, e), r || (o = null);
                                break a
                            } a = c.next
                    }
                } else if (i.tag === 18) {
                    if (o = i.return, o === null) throw Error(s(341));
                    o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Ji(o, n, e), o = null
                } else o = i.child;
                if (o !== null) o.return = i;
                else
                    for (o = i; o !== null;) {
                        if (o === e) {
                            o = null;
                            break
                        }
                        if (i = o.sibling, i !== null) {
                            i.return = o.return, o = i;
                            break
                        }
                        o = o.return
                    }
                i = o
            }
        }

        function Xi(e, t, n, r) {
            e = null;
            for (var i = t, a = !1; i !== null;) {
                if (!a) {
                    if (i.flags & 524288) a = !0;
                    else if (i.flags & 262144) break
                }
                if (i.tag === 10) {
                    var o = i.alternate;
                    if (o === null) throw Error(s(387));
                    if (o = o.memoizedProps, o !== null) {
                        var c = i.type;
                        Sr(i.pendingProps.value, o.value) || (e === null ? e = [c] : e.push(c))
                    }
                } else if (i === pe.current) {
                    if (o = i.alternate, o === null) throw Error(s(387));
                    o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf))
                }
                i = i.return
            }
            e !== null && Yi(t, e, n, r), t.flags |= 262144
        }

        function Zi(e) {
            for (e = e.firstContext; e !== null;) {
                if (!Sr(e.context._currentValue, e.memoizedValue)) return !0;
                e = e.next
            }
            return !1
        }

        function Qi(e) {
            Gi = e, Ki = null, e = e.dependencies, e !== null && (e.firstContext = null)
        }

        function $i(e) {
            return ta(Gi, e)
        }

        function ea(e, t) {
            return Gi === null && Qi(e), ta(e, t)
        }

        function ta(e, t) {
            var n = t._currentValue;
            if (t = {
                    context: t,
                    memoizedValue: n,
                    next: null
                }, Ki === null) {
                if (e === null) throw Error(s(308));
                Ki = t, e.dependencies = {
                    lanes: 0,
                    firstContext: t
                }, e.flags |= 524288
            } else Ki = Ki.next = t;
            return n
        }
        var na = typeof AbortController < `u` ? AbortController : function() {
                var e = [],
                    t = this.signal = {
                        aborted: !1,
                        addEventListener: function(t, n) {
                            e.push(n)
                        }
                    };
                this.abort = function() {
                    t.aborted = !0, e.forEach(function(e) {
                        return e()
                    })
                }
            },
            ra = t.unstable_scheduleCallback,
            ia = t.unstable_NormalPriority,
            aa = {
                $$typeof: S,
                Consumer: null,
                Provider: null,
                _currentValue: null,
                _currentValue2: null,
                _threadCount: 0
            };

        function oa() {
            return {
                controller: new na,
                data: new Map,
                refCount: 0
            }
        }

        function sa(e) {
            e.refCount--, e.refCount === 0 && ra(ia, function() {
                e.controller.abort()
            })
        }
        var ca = null,
            la = 0,
            ua = 0,
            da = null;

        function fa(e, t) {
            if (ca === null) {
                var n = ca = [];
                la = 0, ua = dd(), da = {
                    status: `pending`,
                    value: void 0,
                    then: function(e) {
                        n.push(e)
                    }
                }
            }
            return la++, t.then(pa, pa), t
        }

        function pa() {
            if (--la === 0 && ca !== null) {
                da !== null && (da.status = `fulfilled`);
                var e = ca;
                ca = null, ua = 0, da = null;
                for (var t = 0; t < e.length; t++)(0, e[t])()
            }
        }

        function ma(e, t) {
            var n = [],
                r = {
                    status: `pending`,
                    value: null,
                    reason: null,
                    then: function(e) {
                        n.push(e)
                    }
                };
            return e.then(function() {
                r.status = `fulfilled`, r.value = t;
                for (var e = 0; e < n.length; e++)(0, n[e])(t)
            }, function(e) {
                for (r.status = `rejected`, r.reason = e, e = 0; e < n.length; e++)(0, n[e])(void 0)
            }), r
        }
        var ha = D.S;
        D.S = function(e, t) {
            eu = I(), typeof t == `object` && t && typeof t.then == `function` && fa(e, t), ha !== null && ha(e, t)
        };
        var ga = ue(null);

        function _a() {
            var e = ga.current;
            return e === null ? q.pooledCache : e
        }

        function va(e, t) {
            t === null ? M(ga, ga.current) : M(ga, t.pool)
        }

        function ya() {
            var e = _a();
            return e === null ? null : {
                parent: aa._currentValue,
                pool: e
            }
        }
        var ba = Error(s(460)),
            xa = Error(s(474)),
            Sa = Error(s(542)),
            Ca = {
                then: function() {}
            };

        function wa(e) {
            return e = e.status, e === `fulfilled` || e === `rejected`
        }

        function Ta(e, t, n) {
            switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then($t, $t), t = n), t.status) {
                case `fulfilled`:
                    return t.value;
                case `rejected`:
                    throw e = t.reason, ka(e), e;
                default:
                    if (typeof t.status == `string`) t.then($t, $t);
                    else {
                        if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(s(482));
                        e = t, e.status = `pending`, e.then(function(e) {
                            if (t.status === `pending`) {
                                var n = t;
                                n.status = `fulfilled`, n.value = e
                            }
                        }, function(e) {
                            if (t.status === `pending`) {
                                var n = t;
                                n.status = `rejected`, n.reason = e
                            }
                        })
                    }
                    switch (t.status) {
                        case `fulfilled`:
                            return t.value;
                        case `rejected`:
                            throw e = t.reason, ka(e), e
                    }
                    throw Da = t, ba
            }
        }

        function Ea(e) {
            try {
                var t = e._init;
                return t(e._payload)
            } catch (e) {
                throw typeof e == `object` && e && typeof e.then == `function` ? (Da = e, ba) : e
            }
        }
        var Da = null;

        function Oa() {
            if (Da === null) throw Error(s(459));
            var e = Da;
            return Da = null, e
        }

        function ka(e) {
            if (e === ba || e === Sa) throw Error(s(483))
        }
        var Aa = null,
            ja = 0;

        function Ma(e) {
            var t = ja;
            return ja += 1, Aa === null && (Aa = []), Ta(Aa, e, t)
        }

        function Na(e, t) {
            t = t.props.ref, e.ref = t === void 0 ? null : t
        }

        function Pa(e, t) {
            throw t.$$typeof === g ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(s(31, e === `[object Object]` ? `object with keys {` + Object.keys(t).join(`, `) + `}` : e)))
        }

        function Fa(e) {
            function t(t, n) {
                if (e) {
                    var r = t.deletions;
                    r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n)
                }
            }

            function n(n, r) {
                if (!e) return null;
                for (; r !== null;) t(n, r), r = r.sibling;
                return null
            }

            function r(e) {
                for (var t = new Map; e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
                return t
            }

            function i(e, t) {
                return e = ui(e, t), e.index = 0, e.sibling = null, e
            }

            function a(t, n, r) {
                return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n)
            }

            function o(t) {
                return e && t.alternate === null && (t.flags |= 67108866), t
            }

            function c(e, t, n, r) {
                return t === null || t.tag !== 6 ? (t = mi(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t)
            }

            function l(e, t, n, r) {
                var a = n.type;
                return a === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == `object` && a && a.$$typeof === E && Ea(a) === t.type) ? (t = i(t, n.props), Na(t, n), t.return = e, t) : (t = fi(n.type, n.key, n.props, null, e.mode, r), Na(t, n), t.return = e, t)
            }

            function u(e, t, n, r) {
                return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = gi(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t)
            }

            function d(e, t, n, r, a) {
                return t === null || t.tag !== 7 ? (t = pi(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t)
            }

            function f(e, t, n) {
                if (typeof t == `string` && t !== `` || typeof t == `number` || typeof t == `bigint`) return t = mi(`` + t, e.mode, n), t.return = e, t;
                if (typeof t == `object` && t) {
                    switch (t.$$typeof) {
                        case _:
                            return n = fi(t.type, t.key, t.props, null, e.mode, n), Na(n, t), n.return = e, n;
                        case v:
                            return t = gi(t, e.mode, n), t.return = e, t;
                        case E:
                            return t = Ea(t), f(e, t, n)
                    }
                    if (ce(t) || ae(t)) return t = pi(t, e.mode, n, null), t.return = e, t;
                    if (typeof t.then == `function`) return f(e, Ma(t), n);
                    if (t.$$typeof === S) return f(e, ea(e, t), n);
                    Pa(e, t)
                }
                return null
            }

            function p(e, t, n, r) {
                var i = t === null ? null : t.key;
                if (typeof n == `string` && n !== `` || typeof n == `number` || typeof n == `bigint`) return i === null ? c(e, t, `` + n, r) : null;
                if (typeof n == `object` && n) {
                    switch (n.$$typeof) {
                        case _:
                            return n.key === i ? l(e, t, n, r) : null;
                        case v:
                            return n.key === i ? u(e, t, n, r) : null;
                        case E:
                            return n = Ea(n), p(e, t, n, r)
                    }
                    if (ce(n) || ae(n)) return i === null ? d(e, t, n, r, null) : null;
                    if (typeof n.then == `function`) return p(e, t, Ma(n), r);
                    if (n.$$typeof === S) return p(e, t, ea(e, n), r);
                    Pa(e, n)
                }
                return null
            }

            function m(e, t, n, r, i) {
                if (typeof r == `string` && r !== `` || typeof r == `number` || typeof r == `bigint`) return e = e.get(n) || null, c(t, e, `` + r, i);
                if (typeof r == `object` && r) {
                    switch (r.$$typeof) {
                        case _:
                            return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
                        case v:
                            return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
                        case E:
                            return r = Ea(r), m(e, t, n, r, i)
                    }
                    if (ce(r) || ae(r)) return e = e.get(n) || null, d(t, e, r, i, null);
                    if (typeof r.then == `function`) return m(e, t, n, Ma(r), i);
                    if (r.$$typeof === S) return m(e, t, n, ea(t, r), i);
                    Pa(t, r)
                }
                return null
            }

            function h(i, o, s, c) {
                for (var l = null, u = null, d = o, h = o = 0, g = null; d !== null && h < s.length; h++) {
                    d.index > h ? (g = d, d = null) : g = d.sibling;
                    var _ = p(i, d, s[h], c);
                    if (_ === null) {
                        d === null && (d = g);
                        break
                    }
                    e && d && _.alternate === null && t(i, d), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _, d = g
                }
                if (h === s.length) return n(i, d), B && Oi(i, h), l;
                if (d === null) {
                    for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
                    return B && Oi(i, h), l
                }
                for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
                return e && d.forEach(function(e) {
                    return t(i, e)
                }), B && Oi(i, h), l
            }

            function g(i, o, c, l) {
                if (c == null) throw Error(s(151));
                for (var u = null, d = null, h = o, g = o = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
                    h.index > g ? (_ = h, h = null) : _ = h.sibling;
                    var y = p(i, h, v.value, l);
                    if (y === null) {
                        h === null && (h = _);
                        break
                    }
                    e && h && y.alternate === null && t(i, h), o = a(y, o, g), d === null ? u = y : d.sibling = y, d = y, h = _
                }
                if (v.done) return n(i, h), B && Oi(i, g), u;
                if (h === null) {
                    for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
                    return B && Oi(i, g), u
                }
                for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
                return e && h.forEach(function(e) {
                    return t(i, e)
                }), B && Oi(i, g), u
            }

            function b(e, r, a, c) {
                if (typeof a == `object` && a && a.type === y && a.key === null && (a = a.props.children), typeof a == `object` && a) {
                    switch (a.$$typeof) {
                        case _:
                            a: {
                                for (var l = a.key; r !== null;) {
                                    if (r.key === l) {
                                        if (l = a.type, l === y) {
                                            if (r.tag === 7) {
                                                n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
                                                break a
                                            }
                                        } else if (r.elementType === l || typeof l == `object` && l && l.$$typeof === E && Ea(l) === r.type) {
                                            n(e, r.sibling), c = i(r, a.props), Na(c, a), c.return = e, e = c;
                                            break a
                                        }
                                        n(e, r);
                                        break
                                    } else t(e, r);
                                    r = r.sibling
                                }
                                a.type === y ? (c = pi(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = fi(a.type, a.key, a.props, null, e.mode, c), Na(c, a), c.return = e, e = c)
                            }
                            return o(e);
                        case v:
                            a: {
                                for (l = a.key; r !== null;) {
                                    if (r.key === l)
                                        if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
                                            n(e, r.sibling), c = i(r, a.children || []), c.return = e, e = c;
                                            break a
                                        } else {
                                            n(e, r);
                                            break
                                        }
                                    else t(e, r);
                                    r = r.sibling
                                }
                                c = gi(a, e.mode, c),
                                c.return = e,
                                e = c
                            }
                            return o(e);
                        case E:
                            return a = Ea(a), b(e, r, a, c)
                    }
                    if (ce(a)) return h(e, r, a, c);
                    if (ae(a)) {
                        if (l = ae(a), typeof l != `function`) throw Error(s(150));
                        return a = l.call(a), g(e, r, a, c)
                    }
                    if (typeof a.then == `function`) return b(e, r, Ma(a), c);
                    if (a.$$typeof === S) return b(e, r, ea(e, a), c);
                    Pa(e, a)
                }
                return typeof a == `string` && a !== `` || typeof a == `number` || typeof a == `bigint` ? (a = `` + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = mi(a, e.mode, c), c.return = e, e = c), o(e)) : n(e, r)
            }
            return function(e, t, n, r) {
                try {
                    ja = 0;
                    var i = b(e, t, n, r);
                    return Aa = null, i
                } catch (t) {
                    if (t === ba || t === Sa) throw t;
                    var a = ci(29, t, null, e.mode);
                    return a.lanes = r, a.return = e, a
                }
            }
        }
        var Ia = Fa(!0),
            La = Fa(!1),
            Ra = !1;

        function za(e) {
            e.updateQueue = {
                baseState: e.memoizedState,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: null,
                    lanes: 0,
                    hiddenCallbacks: null
                },
                callbacks: null
            }
        }

        function Ba(e, t) {
            e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                callbacks: null
            })
        }

        function Va(e) {
            return {
                lane: e,
                tag: 0,
                payload: null,
                callback: null,
                next: null
            }
        }

        function Ha(e, t, n) {
            var r = e.updateQueue;
            if (r === null) return null;
            if (r = r.shared, K & 2) {
                var i = r.pending;
                return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ai(e), ii(e, null, n), t
            }
            return ti(e, r, t, n), ai(e)
        }

        function Ua(e, t, n) {
            if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
                var r = t.lanes;
                r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n)
            }
        }

        function Wa(e, t) {
            var n = e.updateQueue,
                r = e.alternate;
            if (r !== null && (r = r.updateQueue, n === r)) {
                var i = null,
                    a = null;
                if (n = n.firstBaseUpdate, n !== null) {
                    do {
                        var o = {
                            lane: n.lane,
                            tag: n.tag,
                            payload: n.payload,
                            callback: null,
                            next: null
                        };
                        a === null ? i = a = o : a = a.next = o, n = n.next
                    } while (n !== null);
                    a === null ? i = a = t : a = a.next = t
                } else i = a = t;
                n = {
                    baseState: r.baseState,
                    firstBaseUpdate: i,
                    lastBaseUpdate: a,
                    shared: r.shared,
                    callbacks: r.callbacks
                }, e.updateQueue = n;
                return
            }
            e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
        }
        var Ga = !1;

        function Ka() {
            if (Ga) {
                var e = da;
                if (e !== null) throw e
            }
        }

        function qa(e, t, n, r) {
            Ga = !1;
            var i = e.updateQueue;
            Ra = !1;
            var a = i.firstBaseUpdate,
                o = i.lastBaseUpdate,
                s = i.shared.pending;
            if (s !== null) {
                i.shared.pending = null;
                var c = s,
                    l = c.next;
                c.next = null, o === null ? a = l : o.next = l, o = c;
                var u = e.alternate;
                u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c))
            }
            if (a !== null) {
                var d = i.baseState;
                o = 0, u = l = c = null, s = a;
                do {
                    var f = s.lane & -536870913,
                        p = f !== s.lane;
                    if (p ? (Y & f) === f : (r & f) === f) {
                        f !== 0 && f === ua && (Ga = !0), u !== null && (u = u.next = {
                            lane: 0,
                            tag: s.tag,
                            payload: s.payload,
                            callback: null,
                            next: null
                        });
                        a: {
                            var m = e,
                                g = s;f = t;
                            var _ = n;
                            switch (g.tag) {
                                case 1:
                                    if (m = g.payload, typeof m == `function`) {
                                        d = m.call(_, d, f);
                                        break a
                                    }
                                    d = m;
                                    break a;
                                case 3:
                                    m.flags = m.flags & -65537 | 128;
                                case 0:
                                    if (m = g.payload, f = typeof m == `function` ? m.call(_, d, f) : m, f == null) break a;
                                    d = h({}, d, f);
                                    break a;
                                case 2:
                                    Ra = !0
                            }
                        }
                        f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f))
                    } else p = {
                        lane: f,
                        tag: s.tag,
                        payload: s.payload,
                        callback: s.callback,
                        next: null
                    }, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
                    if (s = s.next, s === null) {
                        if (s = i.shared.pending, s === null) break;
                        p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null
                    }
                } while (1);
                u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d
            }
        }

        function Ja(e, t) {
            if (typeof e != `function`) throw Error(s(191, e));
            e.call(t)
        }

        function Ya(e, t) {
            var n = e.callbacks;
            if (n !== null)
                for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t)
        }
        var Xa = ue(null),
            Za = ue(0);

        function Qa(e, t) {
            e = Ul, M(Za, e), M(Xa, t), Ul = e | t.baseLanes
        }

        function $a() {
            M(Za, Ul), M(Xa, Xa.current)
        }

        function eo() {
            Ul = Za.current, j(Xa), j(Za)
        }
        var to = ue(null),
            no = null;

        function ro(e) {
            var t = e.alternate;
            M(co, co.current & 1), M(to, e), no === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (no = e)
        }

        function io(e) {
            M(co, co.current), M(to, e), no === null && (no = e)
        }

        function ao(e) {
            e.tag === 22 ? (M(co, co.current), M(to, e), no === null && (no = e)) : oo(e)
        }

        function oo() {
            M(co, co.current), M(to, to.current)
        }

        function so(e) {
            j(to), no === e && (no = null), j(co)
        }
        var co = ue(0);

        function lo(e) {
            for (var t = e; t !== null;) {
                if (t.tag === 13) {
                    var n = t.memoizedState;
                    if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t
                } else if (t.tag === 19 && (t.memoizedProps.revealOrder === `forwards` || t.memoizedProps.revealOrder === `backwards` || t.memoizedProps.revealOrder === `unstable_legacy-backwards` || t.memoizedProps.revealOrder === `together`)) {
                    if (t.flags & 128) return t
                } else if (t.child !== null) {
                    t.child.return = t, t = t.child;
                    continue
                }
                if (t === e) break;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e) return null;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
            return null
        }
        var uo = 0,
            H = null,
            U = null,
            fo = null,
            po = !1,
            mo = !1,
            ho = !1,
            go = 0,
            _o = 0,
            vo = null,
            yo = 0;

        function bo() {
            throw Error(s(321))
        }

        function xo(e, t) {
            if (t === null) return !1;
            for (var n = 0; n < t.length && n < e.length; n++)
                if (!Sr(e[n], t[n])) return !1;
            return !0
        }

        function So(e, t, n, r, i, a) {
            return uo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? zs : Bs, ho = !1, a = n(r, i), ho = !1, mo && (a = wo(t, n, r, i)), Co(e), a
        }

        function Co(e) {
            D.H = Rs;
            var t = U !== null && U.next !== null;
            if (uo = 0, fo = U = H = null, po = !1, _o = 0, vo = null, t) throw Error(s(300));
            e === null || rc || (e = e.dependencies, e !== null && Zi(e) && (rc = !0))
        }

        function wo(e, t, n, r) {
            H = e;
            var i = 0;
            do {
                if (mo && (vo = null), _o = 0, mo = !1, 25 <= i) throw Error(s(301));
                if (i += 1, fo = U = null, e.updateQueue != null) {
                    var a = e.updateQueue;
                    a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0)
                }
                D.H = Vs, a = t(n, r)
            } while (mo);
            return a
        }

        function To() {
            var e = D.H,
                t = e.useState()[0];
            return t = typeof t.then == `function` ? Mo(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t
        }

        function Eo() {
            var e = go !== 0;
            return go = 0, e
        }

        function Do(e, t, n) {
            t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n
        }

        function Oo(e) {
            if (po) {
                for (e = e.memoizedState; e !== null;) {
                    var t = e.queue;
                    t !== null && (t.pending = null), e = e.next
                }
                po = !1
            }
            uo = 0, fo = U = H = null, mo = !1, _o = go = 0, vo = null
        }

        function ko() {
            var e = {
                memoizedState: null,
                baseState: null,
                baseQueue: null,
                queue: null,
                next: null
            };
            return fo === null ? H.memoizedState = fo = e : fo = fo.next = e, fo
        }

        function Ao() {
            if (U === null) {
                var e = H.alternate;
                e = e === null ? null : e.memoizedState
            } else e = U.next;
            var t = fo === null ? H.memoizedState : fo.next;
            if (t !== null) fo = t, U = e;
            else {
                if (e === null) throw H.alternate === null ? Error(s(467)) : Error(s(310));
                U = e, e = {
                    memoizedState: U.memoizedState,
                    baseState: U.baseState,
                    baseQueue: U.baseQueue,
                    queue: U.queue,
                    next: null
                }, fo === null ? H.memoizedState = fo = e : fo = fo.next = e
            }
            return fo
        }

        function jo() {
            return {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null
            }
        }

        function Mo(e) {
            var t = _o;
            return _o += 1, vo === null && (vo = []), e = Ta(vo, e, t), t = H, (fo === null ? t.memoizedState : fo.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? zs : Bs), e
        }

        function No(e) {
            if (typeof e == `object` && e) {
                if (typeof e.then == `function`) return Mo(e);
                if (e.$$typeof === S) return $i(e)
            }
            throw Error(s(438, String(e)))
        }

        function Po(e) {
            var t = null,
                n = H.updateQueue;
            if (n !== null && (t = n.memoCache), t == null) {
                var r = H.alternate;
                r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
                    data: r.data.map(function(e) {
                        return e.slice()
                    }),
                    index: 0
                })))
            }
            if (t ??= {
                    data: [],
                    index: 0
                }, n === null && (n = jo(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
                for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = re;
            return t.index++, n
        }

        function Fo(e, t) {
            return typeof t == `function` ? t(e) : t
        }

        function Io(e) {
            return Lo(Ao(), U, e)
        }

        function Lo(e, t, n) {
            var r = e.queue;
            if (r === null) throw Error(s(311));
            r.lastRenderedReducer = n;
            var i = e.baseQueue,
                a = r.pending;
            if (a !== null) {
                if (i !== null) {
                    var o = i.next;
                    i.next = a.next, a.next = o
                }
                t.baseQueue = i = a, r.pending = null
            }
            if (a = e.baseState, i === null) e.memoizedState = a;
            else {
                t = i.next;
                var c = o = null,
                    l = null,
                    u = t,
                    d = !1;
                do {
                    var f = u.lane & -536870913;
                    if (f === u.lane ? (uo & f) === f : (Y & f) === f) {
                        var p = u.revertLane;
                        if (p === 0) l !== null && (l = l.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null
                        }), f === ua && (d = !0);
                        else if ((uo & p) === p) {
                            u = u.next, p === ua && (d = !0);
                            continue
                        } else f = {
                            lane: 0,
                            revertLane: u.revertLane,
                            gesture: null,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null
                        }, l === null ? (c = l = f, o = a) : l = l.next = f, H.lanes |= p, Gl |= p;
                        f = u.action, ho && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f)
                    } else p = {
                        lane: f,
                        revertLane: u.revertLane,
                        gesture: u.gesture,
                        action: u.action,
                        hasEagerState: u.hasEagerState,
                        eagerState: u.eagerState,
                        next: null
                    }, l === null ? (c = l = p, o = a) : l = l.next = p, H.lanes |= f, Gl |= f;
                    u = u.next
                } while (u !== null && u !== t);
                if (l === null ? o = a : l.next = c, !Sr(a, e.memoizedState) && (rc = !0, d && (n = da, n !== null))) throw n;
                e.memoizedState = a, e.baseState = o, e.baseQueue = l, r.lastRenderedState = a
            }
            return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch]
        }

        function Ro(e) {
            var t = Ao(),
                n = t.queue;
            if (n === null) throw Error(s(311));
            n.lastRenderedReducer = e;
            var r = n.dispatch,
                i = n.pending,
                a = t.memoizedState;
            if (i !== null) {
                n.pending = null;
                var o = i = i.next;
                do a = e(a, o.action), o = o.next; while (o !== i);
                Sr(a, t.memoizedState) || (rc = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a
            }
            return [a, r]
        }

        function zo(e, t, n) {
            var r = H,
                i = Ao(),
                a = B;
            if (a) {
                if (n === void 0) throw Error(s(407));
                n = n()
            } else n = t();
            var o = !Sr((U || i).memoizedState, n);
            if (o && (i.memoizedState = n, rc = !0), i = i.queue, us(Ho.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || fo !== null && fo.memoizedState.tag & 1) {
                if (r.flags |= 2048, as(9, {
                        destroy: void 0
                    }, Vo.bind(null, r, i, n, t), null), q === null) throw Error(s(349));
                a || uo & 127 || Bo(r, t, n)
            }
            return n
        }

        function Bo(e, t, n) {
            e.flags |= 16384, e = {
                getSnapshot: t,
                value: n
            }, t = H.updateQueue, t === null ? (t = jo(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
        }

        function Vo(e, t, n, r) {
            t.value = n, t.getSnapshot = r, Uo(t) && Wo(e)
        }

        function Ho(e, t, n) {
            return n(function() {
                Uo(t) && Wo(e)
            })
        }

        function Uo(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
                var n = t();
                return !Sr(e, n)
            } catch {
                return !0
            }
        }

        function Wo(e) {
            var t = ri(e, 2);
            t !== null && hu(t, e, 2)
        }

        function Go(e) {
            var t = ko();
            if (typeof e == `function`) {
                var n = e;
                if (e = n(), ho) {
                    Re(!0);
                    try {
                        n()
                    } finally {
                        Re(!1)
                    }
                }
            }
            return t.memoizedState = t.baseState = e, t.queue = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Fo,
                lastRenderedState: e
            }, t
        }

        function Ko(e, t, n, r) {
            return e.baseState = n, Lo(e, U, typeof r == `function` ? r : Fo)
        }

        function qo(e, t, n, r, i) {
            if (Fs(e)) throw Error(s(485));
            if (e = t.action, e !== null) {
                var a = {
                    payload: i,
                    action: e,
                    next: null,
                    isTransition: !0,
                    status: `pending`,
                    value: null,
                    reason: null,
                    listeners: [],
                    then: function(e) {
                        a.listeners.push(e)
                    }
                };
                D.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Jo(t, a)) : (a.next = n.next, t.pending = n.next = a)
            }
        }

        function Jo(e, t) {
            var n = t.action,
                r = t.payload,
                i = e.state;
            if (t.isTransition) {
                var a = D.T,
                    o = {};
                D.T = o;
                try {
                    var s = n(i, r),
                        c = D.S;
                    c !== null && c(o, s), Yo(e, t, s)
                } catch (n) {
                    Zo(e, t, n)
                } finally {
                    a !== null && o.types !== null && (a.types = o.types), D.T = a
                }
            } else try {
                a = n(i, r), Yo(e, t, a)
            } catch (n) {
                Zo(e, t, n)
            }
        }

        function Yo(e, t, n) {
            typeof n == `object` && n && typeof n.then == `function` ? n.then(function(n) {
                Xo(e, t, n)
            }, function(n) {
                return Zo(e, t, n)
            }) : Xo(e, t, n)
        }

        function Xo(e, t, n) {
            t.status = `fulfilled`, t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Jo(e, n)))
        }

        function Zo(e, t, n) {
            var r = e.pending;
            if (e.pending = null, r !== null) {
                r = r.next;
                do t.status = `rejected`, t.reason = n, Qo(t), t = t.next; while (t !== r)
            }
            e.action = null
        }

        function Qo(e) {
            e = e.listeners;
            for (var t = 0; t < e.length; t++)(0, e[t])()
        }

        function $o(e, t) {
            return t
        }

        function es(e, t) {
            if (B) {
                var n = q.formState;
                if (n !== null) {
                    a: {
                        var r = H;
                        if (B) {
                            if (z) {
                                b: {
                                    for (var i = z, a = Fi; i.nodeType !== 8;) {
                                        if (!a) {
                                            i = null;
                                            break b
                                        }
                                        if (i = cf(i.nextSibling), i === null) {
                                            i = null;
                                            break b
                                        }
                                    }
                                    a = i.data,
                                    i = a === `F!` || a === `F` ? i : null
                                }
                                if (i) {
                                    z = cf(i.nextSibling), r = i.data === `F!`;
                                    break a
                                }
                            }
                            Li(r)
                        }
                        r = !1
                    }
                    r && (t = n[0])
                }
            }
            return n = ko(), n.memoizedState = n.baseState = t, r = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: $o,
                lastRenderedState: t
            }, n.queue = r, n = Ms.bind(null, H, r), r.dispatch = n, r = Go(!1), a = Ps.bind(null, H, !1, r.queue), r = ko(), i = {
                state: t,
                dispatch: null,
                action: e,
                pending: null
            }, r.queue = i, n = qo.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [t, n, !1]
        }

        function ts(e) {
            return ns(Ao(), U, e)
        }

        function ns(e, t, n) {
            if (t = Lo(e, t, $o)[0], e = Io(Fo)[0], typeof t == `object` && t && typeof t.then == `function`) try {
                var r = Mo(t)
            } catch (e) {
                throw e === ba ? Sa : e
            } else r = t;
            t = Ao();
            var i = t.queue,
                a = i.dispatch;
            return n !== t.memoizedState && (H.flags |= 2048, as(9, {
                destroy: void 0
            }, rs.bind(null, i, n), null)), [r, a, e]
        }

        function rs(e, t) {
            e.action = t
        }

        function is(e) {
            var t = Ao(),
                n = U;
            if (n !== null) return ns(t, n, e);
            Ao(), t = t.memoizedState, n = Ao();
            var r = n.queue.dispatch;
            return n.memoizedState = e, [t, r, !1]
        }

        function as(e, t, n, r) {
            return e = {
                tag: e,
                create: n,
                deps: r,
                inst: t,
                next: null
            }, t = H.updateQueue, t === null && (t = jo(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
        }

        function os() {
            return Ao().memoizedState
        }

        function ss(e, t, n, r) {
            var i = ko();
            H.flags |= e, i.memoizedState = as(1 | t, {
                destroy: void 0
            }, n, r === void 0 ? null : r)
        }

        function cs(e, t, n, r) {
            var i = Ao();
            r = r === void 0 ? null : r;
            var a = i.memoizedState.inst;
            U !== null && r !== null && xo(r, U.memoizedState.deps) ? i.memoizedState = as(t, a, n, r) : (H.flags |= e, i.memoizedState = as(1 | t, a, n, r))
        }

        function ls(e, t) {
            ss(8390656, 8, e, t)
        }

        function us(e, t) {
            cs(2048, 8, e, t)
        }

        function ds(e) {
            H.flags |= 4;
            var t = H.updateQueue;
            if (t === null) t = jo(), H.updateQueue = t, t.events = [e];
            else {
                var n = t.events;
                n === null ? t.events = [e] : n.push(e)
            }
        }

        function fs(e) {
            var t = Ao().memoizedState;
            return ds({
                    ref: t,
                    nextImpl: e
                }),
                function() {
                    if (K & 2) throw Error(s(440));
                    return t.impl.apply(void 0, arguments)
                }
        }

        function ps(e, t) {
            return cs(4, 2, e, t)
        }

        function ms(e, t) {
            return cs(4, 4, e, t)
        }

        function hs(e, t) {
            if (typeof t == `function`) {
                e = e();
                var n = t(e);
                return function() {
                    typeof n == `function` ? n() : t(null)
                }
            }
            if (t != null) return e = e(), t.current = e,
                function() {
                    t.current = null
                }
        }

        function gs(e, t, n) {
            n = n == null ? null : n.concat([e]), cs(4, 4, hs.bind(null, t, e), n)
        }

        function _s() {}

        function vs(e, t) {
            var n = Ao();
            t = t === void 0 ? null : t;
            var r = n.memoizedState;
            return t !== null && xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
        }

        function ys(e, t) {
            var n = Ao();
            t = t === void 0 ? null : t;
            var r = n.memoizedState;
            if (t !== null && xo(t, r[1])) return r[0];
            if (r = e(), ho) {
                Re(!0);
                try {
                    e()
                } finally {
                    Re(!1)
                }
            }
            return n.memoizedState = [r, t], r
        }

        function bs(e, t, n) {
            return n === void 0 || uo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), H.lanes |= e, Gl |= e, n)
        }

        function xs(e, t, n, r) {
            return Sr(n, t) ? n : Xa.current === null ? !(uo & 42) || uo & 1073741824 && !(Y & 261930) ? (rc = !0, e.memoizedState = n) : (e = mu(), H.lanes |= e, Gl |= e, t) : (e = bs(e, n, r), Sr(e, t) || (rc = !0), e)
        }

        function Ss(e, t, n, r, i) {
            var a = O.p;
            O.p = a !== 0 && 8 > a ? a : 8;
            var o = D.T,
                s = {};
            D.T = s, Ps(e, !1, t, n);
            try {
                var c = i(),
                    l = D.S;
                l !== null && l(s, c), typeof c == `object` && c && typeof c.then == `function` ? Ns(e, t, ma(c, r), pu(e)) : Ns(e, t, r, pu(e))
            } catch (n) {
                Ns(e, t, {
                    then: function() {},
                    status: `rejected`,
                    reason: n
                }, pu())
            } finally {
                O.p = a, o !== null && s.types !== null && (o.types = s.types), D.T = o
            }
        }

        function Cs() {}

        function ws(e, t, n, r) {
            if (e.tag !== 5) throw Error(s(476));
            var i = Ts(e).queue;
            Ss(e, i, t, k, n === null ? Cs : function() {
                return Es(e), n(r)
            })
        }

        function Ts(e) {
            var t = e.memoizedState;
            if (t !== null) return t;
            t = {
                memoizedState: k,
                baseState: k,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Fo,
                    lastRenderedState: k
                },
                next: null
            };
            var n = {};
            return t.next = {
                memoizedState: n,
                baseState: n,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Fo,
                    lastRenderedState: n
                },
                next: null
            }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
        }

        function Es(e) {
            var t = Ts(e);
            t.next === null && (t = e.alternate.memoizedState), Ns(e, t.next.queue, {}, pu())
        }

        function Ds() {
            return $i(Qf)
        }

        function Os() {
            return Ao().memoizedState
        }

        function ks() {
            return Ao().memoizedState
        }

        function As(e) {
            for (var t = e.return; t !== null;) {
                switch (t.tag) {
                    case 24:
                    case 3:
                        var n = pu();
                        e = Va(n);
                        var r = Ha(t, e, n);
                        r !== null && (hu(r, t, n), Ua(r, t, n)), t = {
                            cache: oa()
                        }, e.payload = t;
                        return
                }
                t = t.return
            }
        }

        function js(e, t, n) {
            var r = pu();
            n = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, Fs(e) ? Is(t, n) : (n = ni(e, t, n, r), n !== null && (hu(n, e, r), Ls(n, t, r)))
        }

        function Ms(e, t, n) {
            Ns(e, t, n, pu())
        }

        function Ns(e, t, n, r) {
            var i = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            };
            if (Fs(e)) Is(t, i);
            else {
                var a = e.alternate;
                if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
                    var o = t.lastRenderedState,
                        s = a(o, n);
                    if (i.hasEagerState = !0, i.eagerState = s, Sr(s, o)) return ti(e, t, i, 0), q === null && ei(), !1
                } catch {}
                if (n = ni(e, t, i, r), n !== null) return hu(n, e, r), Ls(n, t, r), !0
            }
            return !1
        }

        function Ps(e, t, n, r) {
            if (r = {
                    lane: 2,
                    revertLane: dd(),
                    gesture: null,
                    action: r,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                }, Fs(e)) {
                if (t) throw Error(s(479))
            } else t = ni(e, n, r, 2), t !== null && hu(t, e, 2)
        }

        function Fs(e) {
            var t = e.alternate;
            return e === H || t !== null && t === H
        }

        function Is(e, t) {
            mo = po = !0;
            var n = e.pending;
            n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
        }

        function Ls(e, t, n) {
            if (n & 4194048) {
                var r = t.lanes;
                r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n)
            }
        }
        var Rs = {
            readContext: $i,
            use: No,
            useCallback: bo,
            useContext: bo,
            useEffect: bo,
            useImperativeHandle: bo,
            useLayoutEffect: bo,
            useInsertionEffect: bo,
            useMemo: bo,
            useReducer: bo,
            useRef: bo,
            useState: bo,
            useDebugValue: bo,
            useDeferredValue: bo,
            useTransition: bo,
            useSyncExternalStore: bo,
            useId: bo,
            useHostTransitionStatus: bo,
            useFormState: bo,
            useActionState: bo,
            useOptimistic: bo,
            useMemoCache: bo,
            useCacheRefresh: bo
        };
        Rs.useEffectEvent = bo;
        var zs = {
                readContext: $i,
                use: No,
                useCallback: function(e, t) {
                    return ko().memoizedState = [e, t === void 0 ? null : t], e
                },
                useContext: $i,
                useEffect: ls,
                useImperativeHandle: function(e, t, n) {
                    n = n == null ? null : n.concat([e]), ss(4194308, 4, hs.bind(null, t, e), n)
                },
                useLayoutEffect: function(e, t) {
                    return ss(4194308, 4, e, t)
                },
                useInsertionEffect: function(e, t) {
                    ss(4, 2, e, t)
                },
                useMemo: function(e, t) {
                    var n = ko();
                    t = t === void 0 ? null : t;
                    var r = e();
                    if (ho) {
                        Re(!0);
                        try {
                            e()
                        } finally {
                            Re(!1)
                        }
                    }
                    return n.memoizedState = [r, t], r
                },
                useReducer: function(e, t, n) {
                    var r = ko();
                    if (n !== void 0) {
                        var i = n(t);
                        if (ho) {
                            Re(!0);
                            try {
                                n(t)
                            } finally {
                                Re(!1)
                            }
                        }
                    } else i = t;
                    return r.memoizedState = r.baseState = i, e = {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: i
                    }, r.queue = e, e = e.dispatch = js.bind(null, H, e), [r.memoizedState, e]
                },
                useRef: function(e) {
                    var t = ko();
                    return e = {
                        current: e
                    }, t.memoizedState = e
                },
                useState: function(e) {
                    e = Go(e);
                    var t = e.queue,
                        n = Ms.bind(null, H, t);
                    return t.dispatch = n, [e.memoizedState, n]
                },
                useDebugValue: _s,
                useDeferredValue: function(e, t) {
                    return bs(ko(), e, t)
                },
                useTransition: function() {
                    var e = Go(!1);
                    return e = Ss.bind(null, H, e.queue, !0, !1), ko().memoizedState = e, [!1, e]
                },
                useSyncExternalStore: function(e, t, n) {
                    var r = H,
                        i = ko();
                    if (B) {
                        if (n === void 0) throw Error(s(407));
                        n = n()
                    } else {
                        if (n = t(), q === null) throw Error(s(349));
                        Y & 127 || Bo(r, t, n)
                    }
                    i.memoizedState = n;
                    var a = {
                        value: n,
                        getSnapshot: t
                    };
                    return i.queue = a, ls(Ho.bind(null, r, a, e), [e]), r.flags |= 2048, as(9, {
                        destroy: void 0
                    }, Vo.bind(null, r, a, n, t), null), n
                },
                useId: function() {
                    var e = ko(),
                        t = q.identifierPrefix;
                    if (B) {
                        var n = Di,
                            r = Ei;
                        n = (r & ~(1 << 32 - ze(r) - 1)).toString(32) + n, t = `_` + t + `R_` + n, n = go++, 0 < n && (t += `H` + n.toString(32)), t += `_`
                    } else n = yo++, t = `_` + t + `r_` + n.toString(32) + `_`;
                    return e.memoizedState = t
                },
                useHostTransitionStatus: Ds,
                useFormState: es,
                useActionState: es,
                useOptimistic: function(e) {
                    var t = ko();
                    t.memoizedState = t.baseState = e;
                    var n = {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: null,
                        lastRenderedState: null
                    };
                    return t.queue = n, t = Ps.bind(null, H, !0, n), n.dispatch = t, [e, t]
                },
                useMemoCache: Po,
                useCacheRefresh: function() {
                    return ko().memoizedState = As.bind(null, H)
                },
                useEffectEvent: function(e) {
                    var t = ko(),
                        n = {
                            impl: e
                        };
                    return t.memoizedState = n,
                        function() {
                            if (K & 2) throw Error(s(440));
                            return n.impl.apply(void 0, arguments)
                        }
                }
            },
            Bs = {
                readContext: $i,
                use: No,
                useCallback: vs,
                useContext: $i,
                useEffect: us,
                useImperativeHandle: gs,
                useInsertionEffect: ps,
                useLayoutEffect: ms,
                useMemo: ys,
                useReducer: Io,
                useRef: os,
                useState: function() {
                    return Io(Fo)
                },
                useDebugValue: _s,
                useDeferredValue: function(e, t) {
                    return xs(Ao(), U.memoizedState, e, t)
                },
                useTransition: function() {
                    var e = Io(Fo)[0],
                        t = Ao().memoizedState;
                    return [typeof e == `boolean` ? e : Mo(e), t]
                },
                useSyncExternalStore: zo,
                useId: Os,
                useHostTransitionStatus: Ds,
                useFormState: ts,
                useActionState: ts,
                useOptimistic: function(e, t) {
                    return Ko(Ao(), U, e, t)
                },
                useMemoCache: Po,
                useCacheRefresh: ks
            };
        Bs.useEffectEvent = fs;
        var Vs = {
            readContext: $i,
            use: No,
            useCallback: vs,
            useContext: $i,
            useEffect: us,
            useImperativeHandle: gs,
            useInsertionEffect: ps,
            useLayoutEffect: ms,
            useMemo: ys,
            useReducer: Ro,
            useRef: os,
            useState: function() {
                return Ro(Fo)
            },
            useDebugValue: _s,
            useDeferredValue: function(e, t) {
                var n = Ao();
                return U === null ? bs(n, e, t) : xs(n, U.memoizedState, e, t)
            },
            useTransition: function() {
                var e = Ro(Fo)[0],
                    t = Ao().memoizedState;
                return [typeof e == `boolean` ? e : Mo(e), t]
            },
            useSyncExternalStore: zo,
            useId: Os,
            useHostTransitionStatus: Ds,
            useFormState: is,
            useActionState: is,
            useOptimistic: function(e, t) {
                var n = Ao();
                return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ko(n, U, e, t)
            },
            useMemoCache: Po,
            useCacheRefresh: ks
        };
        Vs.useEffectEvent = fs;

        function Hs(e, t, n, r) {
            t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
        }
        var Us = {
            enqueueSetState: function(e, t, n) {
                e = e._reactInternals;
                var r = pu(),
                    i = Va(r);
                i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r))
            },
            enqueueReplaceState: function(e, t, n) {
                e = e._reactInternals;
                var r = pu(),
                    i = Va(r);
                i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r))
            },
            enqueueForceUpdate: function(e, t) {
                e = e._reactInternals;
                var n = pu(),
                    r = Va(n);
                r.tag = 2, t != null && (r.callback = t), t = Ha(e, r, n), t !== null && (hu(t, e, n), Ua(t, e, n))
            }
        };

        function Ws(e, t, n, r, i, a, o) {
            return e = e.stateNode, typeof e.shouldComponentUpdate == `function` ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Cr(n, r) || !Cr(i, a) : !0
        }

        function Gs(e, t, n, r) {
            e = t.state, typeof t.componentWillReceiveProps == `function` && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == `function` && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Us.enqueueReplaceState(t, t.state, null)
        }

        function Ks(e, t) {
            var n = t;
            if (`ref` in t)
                for (var r in n = {}, t) r !== `ref` && (n[r] = t[r]);
            if (e = e.defaultProps)
                for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
            return n
        }

        function qs(e) {
            Xr(e)
        }

        function Js(e) {
            console.error(e)
        }

        function Ys(e) {
            Xr(e)
        }

        function Xs(e, t) {
            try {
                var n = e.onUncaughtError;
                n(t.value, {
                    componentStack: t.stack
                })
            } catch (e) {
                setTimeout(function() {
                    throw e
                })
            }
        }

        function Zs(e, t, n) {
            try {
                var r = e.onCaughtError;
                r(n.value, {
                    componentStack: n.stack,
                    errorBoundary: t.tag === 1 ? t.stateNode : null
                })
            } catch (e) {
                setTimeout(function() {
                    throw e
                })
            }
        }

        function Qs(e, t, n) {
            return n = Va(n), n.tag = 3, n.payload = {
                element: null
            }, n.callback = function() {
                Xs(e, t)
            }, n
        }

        function $s(e) {
            return e = Va(e), e.tag = 3, e
        }

        function ec(e, t, n, r) {
            var i = n.type.getDerivedStateFromError;
            if (typeof i == `function`) {
                var a = r.value;
                e.payload = function() {
                    return i(a)
                }, e.callback = function() {
                    Zs(t, n, r)
                }
            }
            var o = n.stateNode;
            o !== null && typeof o.componentDidCatch == `function` && (e.callback = function() {
                Zs(t, n, r), typeof i != `function` && (ru === null ? ru = new Set([this]) : ru.add(this));
                var e = r.stack;
                this.componentDidCatch(r.value, {
                    componentStack: e === null ? `` : e
                })
            })
        }

        function tc(e, t, n, r, i) {
            if (n.flags |= 32768, typeof r == `object` && r && typeof r.then == `function`) {
                if (t = n.alternate, t !== null && Xi(t, n, i, !0), n = to.current, n !== null) {
                    switch (n.tag) {
                        case 31:
                        case 13:
                            return no === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, i)), !1;
                        case 22:
                            return n.flags |= 65536, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
                                transitions: null,
                                markerInstances: null,
                                retryQueue: new Set([r])
                            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, i)), !1
                    }
                    throw Error(s(435, n.tag))
                }
                return Gu(e, r, i), Du(), !1
            }
            if (B) return t = to.current, t === null ? (r !== Ii && (t = Error(s(423), {
                cause: r
            }), Ui(vi(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = vi(r, n), i = Qs(e.stateNode, r, i), Wa(e, i), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Ii && (e = Error(s(422), {
                cause: r
            }), Ui(vi(e, n)))), !1;
            var a = Error(s(520), {
                cause: r
            });
            if (a = vi(a, n), Xl === null ? Xl = [a] : Xl.push(a), Wl !== 4 && (Wl = 2), t === null) return !0;
            r = vi(r, n), n = t;
            do {
                switch (n.tag) {
                    case 3:
                        return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Qs(n.stateNode, r, e), Wa(n, e), !1;
                    case 1:
                        if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == `function` || a !== null && typeof a.componentDidCatch == `function` && (ru === null || !ru.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = $s(i), ec(i, e, n, r), Wa(n, i), !1
                }
                n = n.return
            } while (n !== null);
            return !1
        }
        var nc = Error(s(461)),
            rc = !1;

        function ic(e, t, n, r) {
            t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r)
        }

        function ac(e, t, n, r, i) {
            n = n.render;
            var a = t.ref;
            if (`ref` in r) {
                var o = {};
                for (var s in r) s !== `ref` && (o[s] = r[s])
            } else o = r;
            return Qi(t), r = So(e, t, n, o, a, i), s = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (B && s && Ai(t), t.flags |= 1, ic(e, t, r, i), t.child)
        }

        function oc(e, t, n, r, i) {
            if (e === null) {
                var a = n.type;
                return typeof a == `function` && !li(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = fi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
            }
            if (a = e.child, !Ac(e, i)) {
                var o = a.memoizedProps;
                if (n = n.compare, n = n === null ? Cr : n, n(o, r) && e.ref === t.ref) return kc(e, t, i)
            }
            return t.flags |= 1, e = ui(a, r), e.ref = t.ref, e.return = t, t.child = e
        }

        function sc(e, t, n, r, i) {
            if (e !== null) {
                var a = e.memoizedProps;
                if (Cr(a, r) && e.ref === t.ref)
                    if (rc = !1, t.pendingProps = r = a, Ac(e, i)) e.flags & 131072 && (rc = !0);
                    else return t.lanes = e.lanes, kc(e, t, i)
            }
            return hc(e, t, n, r, i)
        }

        function cc(e, t, n, r) {
            var i = r.children,
                a = e === null ? null : e.memoizedState;
            if (e === null && t.stateNode === null && (t.stateNode = {
                    _visibility: 1,
                    _pendingMarkers: null,
                    _retryCache: null,
                    _transitions: null
                }), r.mode === `hidden`) {
                if (t.flags & 128) {
                    if (a = a === null ? n : a.baseLanes | n, e !== null) {
                        for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
                        r = i & ~a
                    } else r = 0, t.child = null;
                    return uc(e, t, a, n, r)
                }
                if (n & 536870912) t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                }, e !== null && va(t, a === null ? null : a.cachePool), a === null ? $a() : Qa(t, a), ao(t);
                else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r)
            } else a === null ? (e !== null && va(t, null), $a(), oo(t)) : (va(t, a.cachePool), Qa(t, a), oo(t), t.memoizedState = null);
            return ic(e, t, i, n), t.child
        }

        function lc(e, t) {
            return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null
            }), t.sibling
        }

        function uc(e, t, n, r, i) {
            var a = _a();
            return a = a === null ? null : {
                parent: aa._currentValue,
                pool: a
            }, t.memoizedState = {
                baseLanes: n,
                cachePool: a
            }, e !== null && va(t, null), $a(), ao(t), e !== null && Xi(e, t, r, !0), t.childLanes = i, null
        }

        function dc(e, t) {
            return t = wc({
                mode: t.mode,
                children: t.children
            }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t
        }

        function fc(e, t, n) {
            return Ia(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, so(t), t.memoizedState = null, e
        }

        function pc(e, t, n) {
            var r = t.pendingProps,
                i = (t.flags & 128) != 0;
            if (t.flags &= -129, e === null) {
                if (B) {
                    if (r.mode === `hidden`) return e = dc(t, r), t.lanes = 536870912, lc(null, e);
                    if (io(t), (e = z) ? (e = rf(e, Fi), e = e !== null && e.data === `&` ? e : null, e !== null && (t.memoizedState = {
                            dehydrated: e,
                            treeContext: Ti === null ? null : {
                                id: Ei,
                                overflow: Di
                            },
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, n = hi(e), n.return = t, t.child = n, Ni = t, z = null)) : e = null, e === null) throw Li(t);
                    return t.lanes = 536870912, null
                }
                return dc(t, r)
            }
            var a = e.memoizedState;
            if (a !== null) {
                var o = a.dehydrated;
                if (io(t), i)
                    if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
                    else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
                else throw Error(s(558));
                else if (rc || Xi(e, t, n, !1), i = (n & e.childLanes) !== 0, rc || i) {
                    if (r = q, r !== null && (o = nt(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, ri(e, o), hu(r, e, o), nc;
                    Du(), t = fc(e, t, n)
                } else e = a.treeContext, z = cf(o.nextSibling), Ni = t, B = !0, Pi = null, Fi = !1, e !== null && Mi(t, e), t = dc(t, r), t.flags |= 4096;
                return t
            }
            return e = ui(e.child, {
                mode: r.mode,
                children: r.children
            }), e.ref = t.ref, t.child = e, e.return = t, e
        }

        function mc(e, t) {
            var n = t.ref;
            if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
            else {
                if (typeof n != `function` && typeof n != `object`) throw Error(s(284));
                (e === null || e.ref !== n) && (t.flags |= 4194816)
            }
        }

        function hc(e, t, n, r, i) {
            return Qi(t), n = So(e, t, n, r, void 0, i), r = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (B && r && Ai(t), t.flags |= 1, ic(e, t, n, i), t.child)
        }

        function gc(e, t, n, r, i, a) {
            return Qi(t), t.updateQueue = null, n = wo(t, r, n, i), Co(e), r = Eo(), e !== null && !rc ? (Do(e, t, a), kc(e, t, a)) : (B && r && Ai(t), t.flags |= 1, ic(e, t, n, a), t.child)
        }

        function _c(e, t, n, r, i) {
            if (Qi(t), t.stateNode === null) {
                var a = oi,
                    o = n.contextType;
                typeof o == `object` && o && (a = $i(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Us, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, za(t), o = n.contextType, a.context = typeof o == `object` && o ? $i(o) : oi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == `function` && (Hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == `function` || typeof a.getSnapshotBeforeUpdate == `function` || typeof a.UNSAFE_componentWillMount != `function` && typeof a.componentWillMount != `function` || (o = a.state, typeof a.componentWillMount == `function` && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount(), o !== a.state && Us.enqueueReplaceState(a, a.state, null), qa(t, r, a, i), Ka(), a.state = t.memoizedState), typeof a.componentDidMount == `function` && (t.flags |= 4194308), r = !0
            } else if (e === null) {
                a = t.stateNode;
                var s = t.memoizedProps,
                    c = Ks(n, s);
                a.props = c;
                var l = a.context,
                    u = n.contextType;
                o = oi, typeof u == `object` && u && (o = $i(u));
                var d = n.getDerivedStateFromProps;
                u = typeof d == `function` || typeof a.getSnapshotBeforeUpdate == `function`, s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != `function` && typeof a.componentWillReceiveProps != `function` || (s || l !== o) && Gs(t, a, r, o), Ra = !1;
                var f = t.memoizedState;
                a.state = f, qa(t, r, a, i), Ka(), l = t.memoizedState, s || f !== l || Ra ? (typeof d == `function` && (Hs(t, n, d, r), l = t.memoizedState), (c = Ra || Ws(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != `function` && typeof a.componentWillMount != `function` || (typeof a.componentWillMount == `function` && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == `function` && (t.flags |= 4194308)) : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), r = !1)
            } else {
                a = t.stateNode, Ba(e, t), o = t.memoizedProps, u = Ks(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = oi, typeof l == `object` && l && (c = $i(l)), s = n.getDerivedStateFromProps, (l = typeof s == `function` || typeof a.getSnapshotBeforeUpdate == `function`) || typeof a.UNSAFE_componentWillReceiveProps != `function` && typeof a.componentWillReceiveProps != `function` || (o !== d || f !== c) && Gs(t, a, r, c), Ra = !1, f = t.memoizedState, a.state = f, qa(t, r, a, i), Ka();
                var p = t.memoizedState;
                o !== d || f !== p || Ra || e !== null && e.dependencies !== null && Zi(e.dependencies) ? (typeof s == `function` && (Hs(t, n, s, r), p = t.memoizedState), (u = Ra || Ws(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Zi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != `function` && typeof a.componentWillUpdate != `function` || (typeof a.componentWillUpdate == `function` && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == `function` && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == `function` && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == `function` && (t.flags |= 1024)) : (typeof a.componentDidUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1)
            }
            return a = r, mc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != `function` ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ia(t, e.child, null, i), t.child = Ia(t, null, n, i)) : ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = kc(e, t, i), e
        }

        function vc(e, t, n, r) {
            return Vi(), t.flags |= 256, ic(e, t, n, r), t.child
        }
        var yc = {
            dehydrated: null,
            treeContext: null,
            retryLane: 0,
            hydrationErrors: null
        };

        function bc(e) {
            return {
                baseLanes: e,
                cachePool: ya()
            }
        }

        function xc(e, t, n) {
            return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e
        }

        function Sc(e, t, n) {
            var r = t.pendingProps,
                i = !1,
                a = (t.flags & 128) != 0,
                o;
            if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : (co.current & 2) != 0), o && (i = !0, t.flags &= -129), o = (t.flags & 32) != 0, t.flags &= -33, e === null) {
                if (B) {
                    if (i ? ro(t) : oo(t), (e = z) ? (e = rf(e, Fi), e = e !== null && e.data !== `&` ? e : null, e !== null && (t.memoizedState = {
                            dehydrated: e,
                            treeContext: Ti === null ? null : {
                                id: Ei,
                                overflow: Di
                            },
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, n = hi(e), n.return = t, t.child = n, Ni = t, z = null)) : e = null, e === null) throw Li(t);
                    return of(e) ? t.lanes = 32 : t.lanes = 536870912, null
                }
                var c = r.children;
                return r = r.fallback, i ? (oo(t), i = t.mode, c = wc({
                    mode: `hidden`,
                    children: c
                }, i), r = pi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, o, n), t.memoizedState = yc, lc(null, r)) : (ro(t), Cc(t, c))
            }
            var l = e.memoizedState;
            if (l !== null && (c = l.dehydrated, c !== null)) {
                if (a) t.flags & 256 ? (ro(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (oo(t), c = r.fallback, i = t.mode, r = wc({
                    mode: `visible`,
                    children: r.children
                }, i), c = pi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ia(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, o, n), t.memoizedState = yc, t = lc(null, r)) : (oo(t), t.child = e.child, t.flags |= 128, t = null);
                else if (ro(t), of(c)) {
                    if (o = c.nextSibling && c.nextSibling.dataset, o) var u = o.dgst;
                    o = u, r = Error(s(419)), r.stack = ``, r.digest = o, Ui({
                        value: r,
                        source: null,
                        stack: null
                    }), t = Tc(e, t, n)
                } else if (rc || Xi(e, t, n, !1), o = (n & e.childLanes) !== 0, rc || o) {
                    if (o = q, o !== null && (r = nt(o, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ri(e, r), hu(o, e, r), nc;
                    af(c) || Du(), t = Tc(e, t, n)
                } else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, z = cf(c.nextSibling), Ni = t, B = !0, Pi = null, Fi = !1, e !== null && Mi(t, e), t = Cc(t, r.children), t.flags |= 4096);
                return t
            }
            return i ? (oo(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = ui(l, {
                mode: `hidden`,
                children: r.children
            }), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = pi(c, i, n, null), c.flags |= 2) : c = ui(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (i = c.cachePool, i === null ? i = ya() : (l = aa._currentValue, i = i.parent === l ? i : {
                parent: l,
                pool: l
            }), c = {
                baseLanes: c.baseLanes | n,
                cachePool: i
            }), r.memoizedState = c, r.childLanes = xc(e, o, n), t.memoizedState = yc, lc(e.child, r)) : (ro(t), n = e.child, e = n.sibling, n = ui(n, {
                mode: `visible`,
                children: r.children
            }), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n)
        }

        function Cc(e, t) {
            return t = wc({
                mode: `visible`,
                children: t
            }, e.mode), t.return = e, e.child = t
        }

        function wc(e, t) {
            return e = ci(22, e, null, t), e.lanes = 0, e
        }

        function Tc(e, t, n) {
            return Ia(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
        }

        function Ec(e, t, n) {
            e.lanes |= t;
            var r = e.alternate;
            r !== null && (r.lanes |= t), Ji(e.return, t, n)
        }

        function Dc(e, t, n, r, i, a) {
            var o = e.memoizedState;
            o === null ? e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: i,
                treeForkCount: a
            } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a)
        }

        function Oc(e, t, n) {
            var r = t.pendingProps,
                i = r.revealOrder,
                a = r.tail;
            r = r.children;
            var o = co.current,
                s = (o & 2) != 0;
            if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, M(co, o), ic(e, t, r, n), r = B ? Si : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
                if (e.tag === 13) e.memoizedState !== null && Ec(e, n, t);
                else if (e.tag === 19) Ec(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue
                }
                if (e === t) break a;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t) break a;
                    e = e.return
                }
                e.sibling.return = e.return, e = e.sibling
            }
            switch (i) {
                case `forwards`:
                    for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && lo(e) === null && (i = n), n = n.sibling;
                    n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Dc(t, !1, i, n, a, r);
                    break;
                case `backwards`:
                case `unstable_legacy-backwards`:
                    for (n = null, i = t.child, t.child = null; i !== null;) {
                        if (e = i.alternate, e !== null && lo(e) === null) {
                            t.child = i;
                            break
                        }
                        e = i.sibling, i.sibling = n, n = i, i = e
                    }
                    Dc(t, !0, n, null, a, r);
                    break;
                case `together`:
                    Dc(t, !1, null, null, void 0, r);
                    break;
                default:
                    t.memoizedState = null
            }
            return t.child
        }

        function kc(e, t, n) {
            if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0)
                if (e !== null) {
                    if (Xi(e, t, n, !1), (n & t.childLanes) === 0) return null
                } else return null;
            if (e !== null && t.child !== e.child) throw Error(s(153));
            if (t.child !== null) {
                for (e = t.child, n = ui(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ui(e, e.pendingProps), n.return = t;
                n.sibling = null
            }
            return t.child
        }

        function Ac(e, t) {
            return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Zi(e))) : !0
        }

        function jc(e, t, n) {
            switch (t.tag) {
                case 3:
                    me(t, t.stateNode.containerInfo), V(t, aa, e.memoizedState.cache), Vi();
                    break;
                case 27:
                case 5:
                    ge(t);
                    break;
                case 4:
                    me(t, t.stateNode.containerInfo);
                    break;
                case 10:
                    V(t, t.type, t.memoizedProps.value);
                    break;
                case 31:
                    if (t.memoizedState !== null) return t.flags |= 128, io(t), null;
                    break;
                case 13:
                    var r = t.memoizedState;
                    if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ro(t), e = kc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (ro(t), t.flags |= 128, null);
                    ro(t);
                    break;
                case 19:
                    var i = (e.flags & 128) != 0;
                    if (r = (n & t.childLanes) !== 0, r ||= (Xi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
                        if (r) return Oc(e, t, n);
                        t.flags |= 128
                    }
                    if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), M(co, co.current), r) break;
                    return null;
                case 22:
                    return t.lanes = 0, cc(e, t, n, t.pendingProps);
                case 24:
                    V(t, aa, e.memoizedState.cache)
            }
            return kc(e, t, n)
        }

        function Mc(e, t, n) {
            if (e !== null)
                if (e.memoizedProps !== t.pendingProps) rc = !0;
                else {
                    if (!Ac(e, n) && !(t.flags & 128)) return rc = !1, jc(e, t, n);
                    rc = !!(e.flags & 131072)
                }
            else rc = !1, B && t.flags & 1048576 && ki(t, Si, t.index);
            switch (t.lanes = 0, t.tag) {
                case 16:
                    a: {
                        var r = t.pendingProps;
                        if (e = Ea(t.elementType), t.type = e, typeof e == `function`) li(e) ? (r = Ks(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
                        else {
                            if (e != null) {
                                var i = e.$$typeof;
                                if (i === C) {
                                    t.tag = 11, t = ac(null, t, e, r, n);
                                    break a
                                } else if (i === T) {
                                    t.tag = 14, t = oc(null, t, e, r, n);
                                    break a
                                }
                            }
                            throw t = se(e) || e, Error(s(306, t, ``))
                        }
                    }
                    return t;
                case 0:
                    return hc(e, t, t.type, t.pendingProps, n);
                case 1:
                    return r = t.type, i = Ks(r, t.pendingProps), _c(e, t, r, i, n);
                case 3:
                    a: {
                        if (me(t, t.stateNode.containerInfo), e === null) throw Error(s(387));r = t.pendingProps;
                        var a = t.memoizedState;i = a.element,
                        Ba(e, t),
                        qa(t, r, null, n);
                        var o = t.memoizedState;
                        if (r = o.cache, V(t, aa, r), r !== a.cache && Yi(t, [aa], n, !0), Ka(), r = o.element, a.isDehydrated)
                            if (a = {
                                    element: r,
                                    isDehydrated: !1,
                                    cache: o.cache
                                }, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
                                t = vc(e, t, r, n);
                                break a
                            } else if (r !== i) {
                            i = vi(Error(s(424)), t), Ui(i), t = vc(e, t, r, n);
                            break a
                        } else {
                            switch (e = t.stateNode.containerInfo, e.nodeType) {
                                case 9:
                                    e = e.body;
                                    break;
                                default:
                                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e
                            }
                            for (z = cf(e.firstChild), Ni = t, B = !0, Pi = null, Fi = !0, n = La(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling
                        } else {
                            if (Vi(), r === i) {
                                t = kc(e, t, n);
                                break a
                            }
                            ic(e, t, r, n)
                        }
                        t = t.child
                    }
                    return t;
                case 26:
                    return mc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : B || (n = t.type, e = t.pendingProps, r = Bd(fe.current).createElement(n), r[st] = t, r[R] = e, Pd(r, n, e), yt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
                case 27:
                    return ge(t), e === null && B && (r = t.stateNode = ff(t.type, t.pendingProps, fe.current), Ni = t, Fi = !0, i = z, Zd(t.type) ? (lf = i, z = cf(r.firstChild)) : z = i), ic(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
                case 5:
                    return e === null && B && ((i = r = z) && (r = tf(r, t.type, t.pendingProps, Fi), r === null ? i = !1 : (t.stateNode = r, Ni = t, z = cf(r.firstChild), Fi = !1, i = !0)), i || Li(t)), ge(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Ud(i, a) ? r = null : o !== null && Ud(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = So(e, t, To, null, null, n), Qf._currentValue = i), mc(e, t), ic(e, t, r, n), t.child;
                case 6:
                    return e === null && B && ((e = n = z) && (n = nf(n, t.pendingProps, Fi), n === null ? e = !1 : (t.stateNode = n, Ni = t, z = null, e = !0)), e || Li(t)), null;
                case 13:
                    return Sc(e, t, n);
                case 4:
                    return me(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ia(t, null, r, n) : ic(e, t, r, n), t.child;
                case 11:
                    return ac(e, t, t.type, t.pendingProps, n);
                case 7:
                    return ic(e, t, t.pendingProps, n), t.child;
                case 8:
                    return ic(e, t, t.pendingProps.children, n), t.child;
                case 12:
                    return ic(e, t, t.pendingProps.children, n), t.child;
                case 10:
                    return r = t.pendingProps, V(t, t.type, r.value), ic(e, t, r.children, n), t.child;
                case 9:
                    return i = t.type._context, r = t.pendingProps.children, Qi(t), i = $i(i), r = r(i), t.flags |= 1, ic(e, t, r, n), t.child;
                case 14:
                    return oc(e, t, t.type, t.pendingProps, n);
                case 15:
                    return sc(e, t, t.type, t.pendingProps, n);
                case 19:
                    return Oc(e, t, n);
                case 31:
                    return pc(e, t, n);
                case 22:
                    return cc(e, t, n, t.pendingProps);
                case 24:
                    return Qi(t), r = $i(aa), e === null ? (i = _a(), i === null && (i = q, a = oa(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
                        parent: r,
                        cache: i
                    }, za(t), V(t, aa, i)) : ((e.lanes & n) !== 0 && (Ba(e, t), qa(t, null, null, n), Ka()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, V(t, aa, r), r !== i.cache && Yi(t, [aa], n, !0)) : (i = {
                        parent: r,
                        cache: r
                    }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), V(t, aa, r))), ic(e, t, t.pendingProps.children, n), t.child;
                case 29:
                    throw t.pendingProps
            }
            throw Error(s(156, t.tag))
        }

        function Nc(e) {
            e.flags |= 4
        }

        function Pc(e, t, n, r, i) {
            if ((t = (e.mode & 32) != 0) && (t = !1), t) {
                if (e.flags |= 16777216, (i & 335544128) === i)
                    if (e.stateNode.complete) e.flags |= 8192;
                    else if (wu()) e.flags |= 8192;
                else throw Da = Ca, xa
            } else e.flags &= -16777217
        }

        function Fc(e, t) {
            if (t.type !== `stylesheet` || t.state.loading & 4) e.flags &= -16777217;
            else if (e.flags |= 16777216, !Wf(t))
                if (wu()) e.flags |= 8192;
                else throw Da = Ca, xa
        }

        function Ic(e, t) {
            t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Xe(), e.lanes |= t, Yl |= t)
        }

        function Lc(e, t) {
            if (!B) switch (e.tailMode) {
                case `hidden`:
                    t = e.tail;
                    for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
                    n === null ? e.tail = null : n.sibling = null;
                    break;
                case `collapsed`:
                    n = e.tail;
                    for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
                    r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
            }
        }

        function W(e) {
            var t = e.alternate !== null && e.alternate.child === e.child,
                n = 0,
                r = 0;
            if (t)
                for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
            else
                for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
            return e.subtreeFlags |= r, e.childLanes = n, t
        }

        function Rc(e, t, n) {
            var r = t.pendingProps;
            switch (ji(t), t.tag) {
                case 16:
                case 15:
                case 0:
                case 11:
                case 7:
                case 8:
                case 12:
                case 9:
                case 14:
                    return W(t), null;
                case 1:
                    return W(t), null;
                case 3:
                    return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), qi(aa), he(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Bi(t) ? Nc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Hi())), W(t), null;
                case 26:
                    var i = t.type,
                        a = t.memoizedState;
                    return e === null ? (Nc(t), a === null ? (W(t), Pc(t, i, null, r, n)) : (W(t), Fc(t, a))) : a ? a === e.memoizedState ? (W(t), t.flags &= -16777217) : (Nc(t), W(t), Fc(t, a)) : (e = e.memoizedProps, e !== r && Nc(t), W(t), Pc(t, i, e, r, n)), null;
                case 27:
                    if (_e(t), n = fe.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
                    else {
                        if (!r) {
                            if (t.stateNode === null) throw Error(s(166));
                            return W(t), null
                        }
                        e = N.current, Bi(t) ? Ri(t, e) : (e = ff(i, r, n), t.stateNode = e, Nc(t))
                    }
                    return W(t), null;
                case 5:
                    if (_e(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
                    else {
                        if (!r) {
                            if (t.stateNode === null) throw Error(s(166));
                            return W(t), null
                        }
                        if (a = N.current, Bi(t)) Ri(t, a);
                        else {
                            var o = Bd(fe.current);
                            switch (a) {
                                case 1:
                                    a = o.createElementNS(`http://www.w3.org/2000/svg`, i);
                                    break;
                                case 2:
                                    a = o.createElementNS(`http://www.w3.org/1998/Math/MathML`, i);
                                    break;
                                default:
                                    switch (i) {
                                        case `svg`:
                                            a = o.createElementNS(`http://www.w3.org/2000/svg`, i);
                                            break;
                                        case `math`:
                                            a = o.createElementNS(`http://www.w3.org/1998/Math/MathML`, i);
                                            break;
                                        case `script`:
                                            a = o.createElement(`div`), a.innerHTML = `<script><\/script>`, a = a.removeChild(a.firstChild);
                                            break;
                                        case `select`:
                                            a = typeof r.is == `string` ? o.createElement(`select`, {
                                                is: r.is
                                            }) : o.createElement(`select`), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
                                            break;
                                        default:
                                            a = typeof r.is == `string` ? o.createElement(i, {
                                                is: r.is
                                            }) : o.createElement(i)
                                    }
                            }
                            a[st] = t, a[R] = r;
                            a: for (o = t.child; o !== null;) {
                                if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
                                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                                    o.child.return = o, o = o.child;
                                    continue
                                }
                                if (o === t) break a;
                                for (; o.sibling === null;) {
                                    if (o.return === null || o.return === t) break a;
                                    o = o.return
                                }
                                o.sibling.return = o.return, o = o.sibling
                            }
                            t.stateNode = a;
                            a: switch (Pd(a, i, r), i) {
                                case `button`:
                                case `input`:
                                case `select`:
                                case `textarea`:
                                    r = !!r.autoFocus;
                                    break a;
                                case `img`:
                                    r = !0;
                                    break a;
                                default:
                                    r = !1
                            }
                            r && Nc(t)
                        }
                    }
                    return W(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
                case 6:
                    if (e && t.stateNode != null) e.memoizedProps !== r && Nc(t);
                    else {
                        if (typeof r != `string` && t.stateNode === null) throw Error(s(166));
                        if (e = fe.current, Bi(t)) {
                            if (e = t.stateNode, n = t.memoizedProps, r = null, i = Ni, i !== null) switch (i.tag) {
                                case 27:
                                case 5:
                                    r = i.memoizedProps
                            }
                            e[st] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Li(t, !0)
                        } else e = Bd(e).createTextNode(r), e[st] = t, t.stateNode = e
                    }
                    return W(t), null;
                case 31:
                    if (n = t.memoizedState, e === null || e.memoizedState !== null) {
                        if (r = Bi(t), n !== null) {
                            if (e === null) {
                                if (!r) throw Error(s(318));
                                if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(557));
                                e[st] = t
                            } else Vi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                            W(t), e = !1
                        } else n = Hi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
                        if (!e) return t.flags & 256 ? (so(t), t) : (so(t), null);
                        if (t.flags & 128) throw Error(s(558))
                    }
                    return W(t), null;
                case 13:
                    if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                        if (i = Bi(t), r !== null && r.dehydrated !== null) {
                            if (e === null) {
                                if (!i) throw Error(s(318));
                                if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(s(317));
                                i[st] = t
                            } else Vi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                            W(t), i = !1
                        } else i = Hi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
                        if (!i) return t.flags & 256 ? (so(t), t) : (so(t), null)
                    }
                    return so(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ic(t, t.updateQueue), W(t), null);
                case 4:
                    return he(), e === null && Sd(t.stateNode.containerInfo), W(t), null;
                case 10:
                    return qi(t.type), W(t), null;
                case 19:
                    if (j(co), r = t.memoizedState, r === null) return W(t), null;
                    if (i = (t.flags & 128) != 0, a = r.rendering, a === null)
                        if (i) Lc(r, !1);
                        else {
                            if (Wl !== 0 || e !== null && e.flags & 128)
                                for (e = t.child; e !== null;) {
                                    if (a = lo(e), a !== null) {
                                        for (t.flags |= 128, Lc(r, !1), e = a.updateQueue, t.updateQueue = e, Ic(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) di(n, e), n = n.sibling;
                                        return M(co, co.current & 1 | 2), B && Oi(t, r.treeForkCount), t.child
                                    }
                                    e = e.sibling
                                }
                            r.tail !== null && I() > tu && (t.flags |= 128, i = !0, Lc(r, !1), t.lanes = 4194304)
                        }
                    else {
                        if (!i)
                            if (e = lo(a), e !== null) {
                                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Ic(t, e), Lc(r, !0), r.tail === null && r.tailMode === `hidden` && !a.alternate && !B) return W(t), null
                            } else 2 * I() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, i = !0, Lc(r, !1), t.lanes = 4194304);
                        r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a)
                    }
                    return r.tail === null ? (W(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = I(), e.sibling = null, n = co.current, M(co, i ? n & 1 | 2 : n & 1), B && Oi(t, r.treeForkCount), e);
                case 22:
                case 23:
                    return so(t), eo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), n = t.updateQueue, n !== null && Ic(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && j(ga), null;
                case 24:
                    return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), qi(aa), W(t), null;
                case 25:
                    return null;
                case 30:
                    return null
            }
            throw Error(s(156, t.tag))
        }

        function zc(e, t) {
            switch (ji(t), t.tag) {
                case 1:
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 3:
                    return qi(aa), he(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
                case 26:
                case 27:
                case 5:
                    return _e(t), null;
                case 31:
                    if (t.memoizedState !== null) {
                        if (so(t), t.alternate === null) throw Error(s(340));
                        Vi()
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 13:
                    if (so(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                        if (t.alternate === null) throw Error(s(340));
                        Vi()
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 19:
                    return j(co), null;
                case 4:
                    return he(), null;
                case 10:
                    return qi(t.type), null;
                case 22:
                case 23:
                    return so(t), eo(), e !== null && j(ga), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 24:
                    return qi(aa), null;
                case 25:
                    return null;
                default:
                    return null
            }
        }

        function Bc(e, t) {
            switch (ji(t), t.tag) {
                case 3:
                    qi(aa), he();
                    break;
                case 26:
                case 27:
                case 5:
                    _e(t);
                    break;
                case 4:
                    he();
                    break;
                case 31:
                    t.memoizedState !== null && so(t);
                    break;
                case 13:
                    so(t);
                    break;
                case 19:
                    j(co);
                    break;
                case 10:
                    qi(t.type);
                    break;
                case 22:
                case 23:
                    so(t), eo(), e !== null && j(ga);
                    break;
                case 24:
                    qi(aa)
            }
        }

        function Vc(e, t) {
            try {
                var n = t.updateQueue,
                    r = n === null ? null : n.lastEffect;
                if (r !== null) {
                    var i = r.next;
                    n = i;
                    do {
                        if ((n.tag & e) === e) {
                            r = void 0;
                            var a = n.create,
                                o = n.inst;
                            r = a(), o.destroy = r
                        }
                        n = n.next
                    } while (n !== i)
                }
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function Hc(e, t, n) {
            try {
                var r = t.updateQueue,
                    i = r === null ? null : r.lastEffect;
                if (i !== null) {
                    var a = i.next;
                    r = a;
                    do {
                        if ((r.tag & e) === e) {
                            var o = r.inst,
                                s = o.destroy;
                            if (s !== void 0) {
                                o.destroy = void 0, i = t;
                                var c = n,
                                    l = s;
                                try {
                                    l()
                                } catch (e) {
                                    Z(i, c, e)
                                }
                            }
                        }
                        r = r.next
                    } while (r !== a)
                }
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function Uc(e) {
            var t = e.updateQueue;
            if (t !== null) {
                var n = e.stateNode;
                try {
                    Ya(t, n)
                } catch (t) {
                    Z(e, e.return, t)
                }
            }
        }

        function Wc(e, t, n) {
            n.props = Ks(e.type, e.memoizedProps), n.state = e.memoizedState;
            try {
                n.componentWillUnmount()
            } catch (n) {
                Z(e, t, n)
            }
        }

        function Gc(e, t) {
            try {
                var n = e.ref;
                if (n !== null) {
                    switch (e.tag) {
                        case 26:
                        case 27:
                        case 5:
                            var r = e.stateNode;
                            break;
                        case 30:
                            r = e.stateNode;
                            break;
                        default:
                            r = e.stateNode
                    }
                    typeof n == `function` ? e.refCleanup = n(r) : n.current = r
                }
            } catch (n) {
                Z(e, t, n)
            }
        }

        function Kc(e, t) {
            var n = e.ref,
                r = e.refCleanup;
            if (n !== null)
                if (typeof r == `function`) try {
                    r()
                } catch (n) {
                    Z(e, t, n)
                } finally {
                    e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
                } else if (typeof n == `function`) try {
                    n(null)
                } catch (n) {
                    Z(e, t, n)
                } else n.current = null
        }

        function qc(e) {
            var t = e.type,
                n = e.memoizedProps,
                r = e.stateNode;
            try {
                a: switch (t) {
                    case `button`:
                    case `input`:
                    case `select`:
                    case `textarea`:
                        n.autoFocus && r.focus();
                        break a;
                    case `img`:
                        n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet)
                }
            }
            catch (t) {
                Z(e, e.return, t)
            }
        }

        function Jc(e, t, n) {
            try {
                var r = e.stateNode;
                Fd(r, e.type, n, t), r[R] = t
            } catch (t) {
                Z(e, e.return, t)
            }
        }

        function Yc(e) {
            return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4
        }

        function Xc(e) {
            a: for (;;) {
                for (; e.sibling === null;) {
                    if (e.return === null || Yc(e.return)) return null;
                    e = e.return
                }
                for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
                    if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
                    e.child.return = e, e = e.child
                }
                if (!(e.flags & 2)) return e.stateNode
            }
        }

        function Zc(e, t, n) {
            var r = e.tag;
            if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = $t));
            else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
                for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling
        }

        function Qc(e, t, n) {
            var r = e.tag;
            if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
            else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null))
                for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling
        }

        function $c(e) {
            var t = e.stateNode,
                n = e.memoizedProps;
            try {
                for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
                Pd(t, r, n), t[st] = e, t[R] = n
            } catch (t) {
                Z(e, e.return, t)
            }
        }
        var el = !1,
            tl = !1,
            nl = !1,
            rl = typeof WeakSet == `function` ? WeakSet : Set,
            il = null;

        function al(e, t) {
            if (e = e.containerInfo, Rd = sp, e = Dr(e), Or(e)) {
                if (`selectionStart` in e) var n = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
                else a: {
                    n = (n = e.ownerDocument) && n.defaultView || window;
                    var r = n.getSelection && n.getSelection();
                    if (r && r.rangeCount !== 0) {
                        n = r.anchorNode;
                        var i = r.anchorOffset,
                            a = r.focusNode;
                        r = r.focusOffset;
                        try {
                            n.nodeType, a.nodeType
                        } catch {
                            n = null;
                            break a
                        }
                        var o = 0,
                            c = -1,
                            l = -1,
                            u = 0,
                            d = 0,
                            f = e,
                            p = null;
                        b: for (;;) {
                            for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = o + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
                            for (;;) {
                                if (f === e) break b;
                                if (p === n && ++u === i && (c = o), p === a && ++d === r && (l = o), (m = f.nextSibling) !== null) break;
                                f = p, p = f.parentNode
                            }
                            f = m
                        }
                        n = c === -1 || l === -1 ? null : {
                            start: c,
                            end: l
                        }
                    } else n = null
                }
                n ||= {
                    start: 0,
                    end: 0
                }
            } else n = null;
            for (zd = {
                    focusedElem: e,
                    selectionRange: n
                }, sp = !1, il = t; il !== null;)
                if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
                else
                    for (; il !== null;) {
                        switch (t = il, a = t.alternate, e = t.flags, t.tag) {
                            case 0:
                                if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null))
                                    for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
                                break;
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (e & 1024 && a !== null) {
                                    e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
                                    try {
                                        var h = Ks(n.type, i);
                                        e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e
                                    } catch (e) {
                                        Z(n, n.return, e)
                                    }
                                }
                                break;
                            case 3:
                                if (e & 1024) {
                                    if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
                                    else if (n === 1) switch (e.nodeName) {
                                        case `HEAD`:
                                        case `HTML`:
                                        case `BODY`:
                                            ef(e);
                                            break;
                                        default:
                                            e.textContent = ``
                                    }
                                }
                                break;
                            case 5:
                            case 26:
                            case 27:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                if (e & 1024) throw Error(s(163))
                        }
                        if (e = t.sibling, e !== null) {
                            e.return = t.return, il = e;
                            break
                        }
                        il = t.return
                    }
        }

        function ol(e, t, n) {
            var r = n.flags;
            switch (n.tag) {
                case 0:
                case 11:
                case 15:
                    bl(e, n), r & 4 && Vc(5, n);
                    break;
                case 1:
                    if (bl(e, n), r & 4)
                        if (e = n.stateNode, t === null) try {
                            e.componentDidMount()
                        } catch (e) {
                            Z(n, n.return, e)
                        } else {
                            var i = Ks(n.type, t.memoizedProps);
                            t = t.memoizedState;
                            try {
                                e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                            } catch (e) {
                                Z(n, n.return, e)
                            }
                        }
                    r & 64 && Uc(n), r & 512 && Gc(n, n.return);
                    break;
                case 3:
                    if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
                        if (t = null, n.child !== null) switch (n.child.tag) {
                            case 27:
                            case 5:
                                t = n.child.stateNode;
                                break;
                            case 1:
                                t = n.child.stateNode
                        }
                        try {
                            Ya(e, t)
                        } catch (e) {
                            Z(n, n.return, e)
                        }
                    }
                    break;
                case 27:
                    t === null && r & 4 && $c(n);
                case 26:
                case 5:
                    bl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
                    break;
                case 12:
                    bl(e, n);
                    break;
                case 31:
                    bl(e, n), r & 4 && dl(e, n);
                    break;
                case 13:
                    bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
                    break;
                case 22:
                    if (r = n.memoizedState !== null || el, !r) {
                        t = t !== null && t.memoizedState !== null || tl, i = el;
                        var a = tl;
                        el = r, (tl = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), el = i, tl = a
                    }
                    break;
                case 30:
                    break;
                default:
                    bl(e, n)
            }
        }

        function sl(e) {
            var t = e.alternate;
            t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && mt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
        }
        var G = null,
            cl = !1;

        function ll(e, t, n) {
            for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling
        }

        function ul(e, t, n) {
            if (Le && typeof Le.onCommitFiberUnmount == `function`) try {
                Le.onCommitFiberUnmount(Ie, n)
            } catch {}
            switch (n.tag) {
                case 26:
                    tl || Kc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
                    break;
                case 27:
                    tl || Kc(n, t);
                    var r = G,
                        i = cl;
                    Zd(n.type) && (G = n.stateNode, cl = !1), ll(e, t, n), pf(n.stateNode), G = r, cl = i;
                    break;
                case 5:
                    tl || Kc(n, t);
                case 6:
                    if (r = G, i = cl, G = null, ll(e, t, n), G = r, cl = i, G !== null)
                        if (cl) try {
                            (G.nodeType === 9 ? G.body : G.nodeName === `HTML` ? G.ownerDocument.body : G).removeChild(n.stateNode)
                        } catch (e) {
                            Z(n, t, e)
                        } else try {
                            G.removeChild(n.stateNode)
                        } catch (e) {
                            Z(n, t, e)
                        }
                    break;
                case 18:
                    G !== null && (cl ? (e = G, Qd(e.nodeType === 9 ? e.body : e.nodeName === `HTML` ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(G, n.stateNode));
                    break;
                case 4:
                    r = G, i = cl, G = n.stateNode.containerInfo, cl = !0, ll(e, t, n), G = r, cl = i;
                    break;
                case 0:
                case 11:
                case 14:
                case 15:
                    Hc(2, n, t), tl || Hc(4, n, t), ll(e, t, n);
                    break;
                case 1:
                    tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == `function` && Wc(n, t, r)), ll(e, t, n);
                    break;
                case 21:
                    ll(e, t, n);
                    break;
                case 22:
                    tl = (r = tl) || n.memoizedState !== null, ll(e, t, n), tl = r;
                    break;
                default:
                    ll(e, t, n)
            }
        }

        function dl(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
                e = e.dehydrated;
                try {
                    Np(e)
                } catch (e) {
                    Z(t, t.return, e)
                }
            }
        }

        function fl(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
                Np(e)
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function pl(e) {
            switch (e.tag) {
                case 31:
                case 13:
                case 19:
                    var t = e.stateNode;
                    return t === null && (t = e.stateNode = new rl), t;
                case 22:
                    return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl), t;
                default:
                    throw Error(s(435, e.tag))
            }
        }

        function ml(e, t) {
            var n = pl(e);
            t.forEach(function(t) {
                if (!n.has(t)) {
                    n.add(t);
                    var r = Yu.bind(null, e, t);
                    t.then(r, r)
                }
            })
        }

        function hl(e, t) {
            var n = t.deletions;
            if (n !== null)
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = e,
                        o = t,
                        c = o;
                    a: for (; c !== null;) {
                        switch (c.tag) {
                            case 27:
                                if (Zd(c.type)) {
                                    G = c.stateNode, cl = !1;
                                    break a
                                }
                                break;
                            case 5:
                                G = c.stateNode, cl = !1;
                                break a;
                            case 3:
                            case 4:
                                G = c.stateNode.containerInfo, cl = !0;
                                break a
                        }
                        c = c.return
                    }
                    if (G === null) throw Error(s(160));
                    ul(a, o, i), G = null, cl = !1, a = i.alternate, a !== null && (a.return = null), i.return = null
                }
            if (t.subtreeFlags & 13886)
                for (t = t.child; t !== null;) _l(t, e), t = t.sibling
        }
        var gl = null;

        function _l(e, t) {
            var n = e.alternate,
                r = e.flags;
            switch (e.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    hl(t, e), vl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
                    break;
                case 1:
                    hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
                    break;
                case 26:
                    var i = gl;
                    if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
                        var a = n === null ? null : n.memoizedState;
                        if (r = e.memoizedState, n === null)
                            if (r === null)
                                if (e.stateNode === null) {
                                    a: {
                                        r = e.type,
                                        n = e.memoizedProps,
                                        i = i.ownerDocument || i;b: switch (r) {
                                            case `title`:
                                                a = i.getElementsByTagName(`title`)[0], (!a || a[pt] || a[st] || a.namespaceURI === `http://www.w3.org/2000/svg` || a.hasAttribute(`itemprop`)) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector(`head > title`))), Pd(a, r, n), a[st] = e, yt(a), r = a;
                                                break a;
                                            case `link`:
                                                var o = Vf(`link`, `href`, i).get(r + (n.href || ``));
                                                if (o) {
                                                    for (var c = 0; c < o.length; c++)
                                                        if (a = o[c], a.getAttribute(`href`) === (n.href == null || n.href === `` ? null : n.href) && a.getAttribute(`rel`) === (n.rel == null ? null : n.rel) && a.getAttribute(`title`) === (n.title == null ? null : n.title) && a.getAttribute(`crossorigin`) === (n.crossOrigin == null ? null : n.crossOrigin)) {
                                                            o.splice(c, 1);
                                                            break b
                                                        }
                                                }
                                                a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
                                                break;
                                            case `meta`:
                                                if (o = Vf(`meta`, `content`, i).get(r + (n.content || ``))) {
                                                    for (c = 0; c < o.length; c++)
                                                        if (a = o[c], a.getAttribute(`content`) === (n.content == null ? null : `` + n.content) && a.getAttribute(`name`) === (n.name == null ? null : n.name) && a.getAttribute(`property`) === (n.property == null ? null : n.property) && a.getAttribute(`http-equiv`) === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute(`charset`) === (n.charSet == null ? null : n.charSet)) {
                                                            o.splice(c, 1);
                                                            break b
                                                        }
                                                }
                                                a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
                                                break;
                                            default:
                                                throw Error(s(468, r))
                                        }
                                        a[st] = e,
                                        yt(a),
                                        r = a
                                    }
                                    e.stateNode = r
                                }
                        else Hf(i, e.type, e.stateNode);
                        else e.stateNode = If(i, r, e.memoizedProps);
                        else a === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? Hf(i, e.type, e.stateNode) : If(i, r, e.memoizedProps))
                    }
                    break;
                case 27:
                    hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
                    break;
                case 5:
                    if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
                        i = e.stateNode;
                        try {
                            Gt(i, ``)
                        } catch (t) {
                            Z(e, e.return, t)
                        }
                    }
                    r & 4 && e.stateNode != null && (i = e.memoizedProps, Jc(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (nl = !0);
                    break;
                case 6:
                    if (hl(t, e), vl(e), r & 4) {
                        if (e.stateNode === null) throw Error(s(162));
                        r = e.memoizedProps, n = e.stateNode;
                        try {
                            n.nodeValue = r
                        } catch (t) {
                            Z(e, e.return, t)
                        }
                    }
                    break;
                case 3:
                    if (Bf = null, i = gl, gl = gf(t.containerInfo), hl(t, e), gl = i, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                        Np(t.containerInfo)
                    } catch (t) {
                        Z(e, e.return, t)
                    }
                    nl && (nl = !1, yl(e));
                    break;
                case 4:
                    r = gl, gl = gf(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
                    break;
                case 12:
                    hl(t, e), vl(e);
                    break;
                case 31:
                    hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
                    break;
                case 13:
                    hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = I()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
                    break;
                case 22:
                    i = e.memoizedState !== null;
                    var l = n !== null && n.memoizedState !== null,
                        u = el,
                        d = tl;
                    if (el = u || i, tl = d || l, hl(t, e), tl = d, el = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || el || tl || xl(e)), n = null, t = e;;) {
                        if (t.tag === 5 || t.tag === 26) {
                            if (n === null) {
                                l = n = t;
                                try {
                                    if (a = l.stateNode, i) o = a.style, typeof o.setProperty == `function` ? o.setProperty(`display`, `none`, `important`) : o.display = `none`;
                                    else {
                                        c = l.stateNode;
                                        var f = l.memoizedProps.style,
                                            p = f != null && f.hasOwnProperty(`display`) ? f.display : null;
                                        c.style.display = p == null || typeof p == `boolean` ? `` : (`` + p).trim()
                                    }
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if (t.tag === 6) {
                            if (n === null) {
                                l = t;
                                try {
                                    l.stateNode.nodeValue = i ? `` : l.memoizedProps
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if (t.tag === 18) {
                            if (n === null) {
                                l = t;
                                try {
                                    var m = l.stateNode;
                                    i ? $d(m, !0) : $d(l.stateNode, !1)
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                            t.child.return = t, t = t.child;
                            continue
                        }
                        if (t === e) break a;
                        for (; t.sibling === null;) {
                            if (t.return === null || t.return === e) break a;
                            n === t && (n = null), t = t.return
                        }
                        n === t && (n = null), t.sibling.return = t.return, t = t.sibling
                    }
                    r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
                    break;
                case 19:
                    hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
                    break;
                case 30:
                    break;
                case 21:
                    break;
                default:
                    hl(t, e), vl(e)
            }
        }

        function vl(e) {
            var t = e.flags;
            if (t & 2) {
                try {
                    for (var n, r = e.return; r !== null;) {
                        if (Yc(r)) {
                            n = r;
                            break
                        }
                        r = r.return
                    }
                    if (n == null) throw Error(s(160));
                    switch (n.tag) {
                        case 27:
                            var i = n.stateNode;
                            Qc(e, Xc(e), i);
                            break;
                        case 5:
                            var a = n.stateNode;
                            n.flags & 32 && (Gt(a, ``), n.flags &= -33), Qc(e, Xc(e), a);
                            break;
                        case 3:
                        case 4:
                            var o = n.stateNode.containerInfo;
                            Zc(e, Xc(e), o);
                            break;
                        default:
                            throw Error(s(161))
                    }
                } catch (t) {
                    Z(e, e.return, t)
                }
                e.flags &= -3
            }
            t & 4096 && (e.flags &= -4097)
        }

        function yl(e) {
            if (e.subtreeFlags & 1024)
                for (e = e.child; e !== null;) {
                    var t = e;
                    yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
                }
        }

        function bl(e, t) {
            if (t.subtreeFlags & 8772)
                for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling
        }

        function xl(e) {
            for (e = e.child; e !== null;) {
                var t = e;
                switch (t.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        Hc(4, t, t.return), xl(t);
                        break;
                    case 1:
                        Kc(t, t.return);
                        var n = t.stateNode;
                        typeof n.componentWillUnmount == `function` && Wc(t, t.return, n), xl(t);
                        break;
                    case 27:
                        pf(t.stateNode);
                    case 26:
                    case 5:
                        Kc(t, t.return), xl(t);
                        break;
                    case 22:
                        t.memoizedState === null && xl(t);
                        break;
                    case 30:
                        xl(t);
                        break;
                    default:
                        xl(t)
                }
                e = e.sibling
            }
        }

        function Sl(e, t, n) {
            for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
                var r = t.alternate,
                    i = e,
                    a = t,
                    o = a.flags;
                switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Sl(i, a, n), Vc(4, a);
                        break;
                    case 1:
                        if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == `function`) try {
                            i.componentDidMount()
                        } catch (e) {
                            Z(r, r.return, e)
                        }
                        if (r = a, i = r.updateQueue, i !== null) {
                            var s = r.stateNode;
                            try {
                                var c = i.shared.hiddenCallbacks;
                                if (c !== null)
                                    for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s)
                            } catch (e) {
                                Z(r, r.return, e)
                            }
                        }
                        n && o & 64 && Uc(a), Gc(a, a.return);
                        break;
                    case 27:
                        $c(a);
                    case 26:
                    case 5:
                        Sl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
                        break;
                    case 12:
                        Sl(i, a, n);
                        break;
                    case 31:
                        Sl(i, a, n), n && o & 4 && dl(i, a);
                        break;
                    case 13:
                        Sl(i, a, n), n && o & 4 && fl(i, a);
                        break;
                    case 22:
                        a.memoizedState === null && Sl(i, a, n), Gc(a, a.return);
                        break;
                    case 30:
                        break;
                    default:
                        Sl(i, a, n)
                }
                t = t.sibling
            }
        }

        function Cl(e, t) {
            var n = null;
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sa(n))
        }

        function wl(e, t) {
            e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e))
        }

        function Tl(e, t, n, r) {
            if (t.subtreeFlags & 10256)
                for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling
        }

        function El(e, t, n, r) {
            var i = t.flags;
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    Tl(e, t, n, r), i & 2048 && Vc(9, t);
                    break;
                case 1:
                    Tl(e, t, n, r);
                    break;
                case 3:
                    Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e)));
                    break;
                case 12:
                    if (i & 2048) {
                        Tl(e, t, n, r), e = t.stateNode;
                        try {
                            var a = t.memoizedProps,
                                o = a.id,
                                s = a.onPostCommit;
                            typeof s == `function` && s(o, t.alternate === null ? `mount` : `update`, e.passiveEffectDuration, -0)
                        } catch (e) {
                            Z(t, t.return, e)
                        }
                    } else Tl(e, t, n, r);
                    break;
                case 31:
                    Tl(e, t, n, r);
                    break;
                case 13:
                    Tl(e, t, n, r);
                    break;
                case 23:
                    break;
                case 22:
                    a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
                    break;
                case 24:
                    Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
                    break;
                default:
                    Tl(e, t, n, r)
            }
        }

        function Dl(e, t, n, r, i) {
            for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
                var a = e,
                    o = t,
                    s = n,
                    c = r,
                    l = o.flags;
                switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Dl(a, o, s, c, i), Vc(8, o);
                        break;
                    case 23:
                        break;
                    case 22:
                        var u = o.stateNode;
                        o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
                        break;
                    case 24:
                        Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
                        break;
                    default:
                        Dl(a, o, s, c, i)
                }
                t = t.sibling
            }
        }

        function Ol(e, t) {
            if (t.subtreeFlags & 10256)
                for (t = t.child; t !== null;) {
                    var n = e,
                        r = t,
                        i = r.flags;
                    switch (r.tag) {
                        case 22:
                            Ol(n, r), i & 2048 && Cl(r.alternate, r);
                            break;
                        case 24:
                            Ol(n, r), i & 2048 && wl(r.alternate, r);
                            break;
                        default:
                            Ol(n, r)
                    }
                    t = t.sibling
                }
        }
        var kl = 8192;

        function Al(e, t, n) {
            if (e.subtreeFlags & kl)
                for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling
        }

        function jl(e, t, n) {
            switch (e.tag) {
                case 26:
                    Al(e, t, n), e.flags & kl && e.memoizedState !== null && Gf(n, gl, e.memoizedState, e.memoizedProps);
                    break;
                case 5:
                    Al(e, t, n);
                    break;
                case 3:
                case 4:
                    var r = gl;
                    gl = gf(e.stateNode.containerInfo), Al(e, t, n), gl = r;
                    break;
                case 22:
                    e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
                    break;
                default:
                    Al(e, t, n)
            }
        }

        function Ml(e) {
            var t = e.alternate;
            if (t !== null && (e = t.child, e !== null)) {
                t.child = null;
                do t = e.sibling, e.sibling = null, e = t; while (e !== null)
            }
        }

        function Nl(e) {
            var t = e.deletions;
            if (e.flags & 16) {
                if (t !== null)
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        il = r, Il(r, e)
                    }
                Ml(e)
            }
            if (e.subtreeFlags & 10256)
                for (e = e.child; e !== null;) Pl(e), e = e.sibling
        }

        function Pl(e) {
            switch (e.tag) {
                case 0:
                case 11:
                case 15:
                    Nl(e), e.flags & 2048 && Hc(9, e, e.return);
                    break;
                case 3:
                    Nl(e);
                    break;
                case 12:
                    Nl(e);
                    break;
                case 22:
                    var t = e.stateNode;
                    e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
                    break;
                default:
                    Nl(e)
            }
        }

        function Fl(e) {
            var t = e.deletions;
            if (e.flags & 16) {
                if (t !== null)
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        il = r, Il(r, e)
                    }
                Ml(e)
            }
            for (e = e.child; e !== null;) {
                switch (t = e, t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Hc(8, t, t.return), Fl(t);
                        break;
                    case 22:
                        n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
                        break;
                    default:
                        Fl(t)
                }
                e = e.sibling
            }
        }

        function Il(e, t) {
            for (; il !== null;) {
                var n = il;
                switch (n.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Hc(8, n, t);
                        break;
                    case 23:
                    case 22:
                        if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
                            var r = n.memoizedState.cachePool.pool;
                            r != null && r.refCount++
                        }
                        break;
                    case 24:
                        sa(n.memoizedState.cache)
                }
                if (r = n.child, r !== null) r.return = n, il = r;
                else a: for (n = e; il !== null;) {
                    r = il;
                    var i = r.sibling,
                        a = r.return;
                    if (sl(r), r === n) {
                        il = null;
                        break a
                    }
                    if (i !== null) {
                        i.return = a, il = i;
                        break a
                    }
                    il = a
                }
            }
        }
        var Ll = {
                getCacheForType: function(e) {
                    var t = $i(aa),
                        n = t.data.get(e);
                    return n === void 0 && (n = e(), t.data.set(e, n)), n
                },
                cacheSignal: function() {
                    return $i(aa).controller.signal
                }
            },
            Rl = typeof WeakMap == `function` ? WeakMap : Map,
            K = 0,
            q = null,
            J = null,
            Y = 0,
            X = 0,
            zl = null,
            Bl = !1,
            Vl = !1,
            Hl = !1,
            Ul = 0,
            Wl = 0,
            Gl = 0,
            Kl = 0,
            ql = 0,
            Jl = 0,
            Yl = 0,
            Xl = null,
            Zl = null,
            Ql = !1,
            $l = 0,
            eu = 0,
            tu = 1 / 0,
            nu = null,
            ru = null,
            iu = 0,
            au = null,
            ou = null,
            su = 0,
            cu = 0,
            lu = null,
            uu = null,
            du = 0,
            fu = null;

        function pu() {
            return K & 2 && Y !== 0 ? Y & -Y : D.T === null ? at() : dd()
        }

        function mu() {
            if (Jl === 0)
                if (!(Y & 536870912) || B) {
                    var e = We;
                    We <<= 1, !(We & 3932160) && (We = 262144), Jl = e
                } else Jl = 536870912;
            return e = to.current, e !== null && (e.flags |= 32), Jl
        }

        function hu(e, t, n) {
            (e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), Qe(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e))
        }

        function gu(e, t, n) {
            if (K & 6) throw Error(s(327));
            var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Je(e, t),
                i = r ? Au(e, t) : Ou(e, t, !0),
                a = r;
            do {
                if (i === 0) {
                    Vl && !r && yu(e, t, 0, !1);
                    break
                } else {
                    if (n = e.current.alternate, a && !vu(n)) {
                        i = Ou(e, t, !1), a = !1;
                        continue
                    }
                    if (i === 2) {
                        if (a = t, e.errorRecoveryDisabledLanes & a) var o = 0;
                        else o = e.pendingLanes & -536870913, o = o === 0 ? o & 536870912 ? 536870912 : 0 : o;
                        if (o !== 0) {
                            t = o;
                            a: {
                                var c = e;i = Xl;
                                var l = c.current.memoizedState.isDehydrated;
                                if (l && (Su(c, o).flags |= 256), o = Ou(c, o, !1), o !== 2) {
                                    if (Hl && !l) {
                                        c.errorRecoveryDisabledLanes |= a, Kl |= a, i = 4;
                                        break a
                                    }
                                    a = Zl, Zl = i, a !== null && (Zl === null ? Zl = a : Zl.push.apply(Zl, a))
                                }
                                i = o
                            }
                            if (a = !1, i !== 2) continue
                        }
                    }
                    if (i === 1) {
                        Su(e, 0), yu(e, t, 0, !0);
                        break
                    }
                    a: {
                        switch (r = e, a = i, a) {
                            case 0:
                            case 1:
                                throw Error(s(345));
                            case 4:
                                if ((t & 4194048) !== t) break;
                            case 6:
                                yu(r, t, Jl, !Bl);
                                break a;
                            case 2:
                                Zl = null;
                                break;
                            case 3:
                            case 5:
                                break;
                            default:
                                throw Error(s(329))
                        }
                        if ((t & 62914560) === t && (i = $l + 300 - I(), 10 < i)) {
                            if (yu(r, t, Jl, !Bl), qe(r, 0, !0) !== 0) break a;
                            su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, a, `Throttled`, -0, 0), i);
                            break a
                        }
                        _u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, a, null, -0, 0)
                    }
                }
                break
            } while (1);
            rd(e)
        }

        function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
            if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
                d = {
                    stylesheets: null,
                    count: 0,
                    imgCount: 0,
                    imgBytes: 0,
                    suspenseyImages: [],
                    waitingForImages: !0,
                    waitingForViewTransition: !1,
                    unsuspend: $t
                }, jl(t, a, d);
                var m = (a & 62914560) === a ? $l - I() : (a & 4194048) === a ? eu - I() : 0;
                if (m = qf(d, m), m !== null) {
                    su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
                    return
                }
            }
            Lu(e, t, a, n, r, i, o, s, c)
        }

        function vu(e) {
            for (var t = e;;) {
                var n = t.tag;
                if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r],
                            a = i.getSnapshot;
                        i = i.value;
                        try {
                            if (!Sr(a(), i)) return !1
                        } catch {
                            return !1
                        }
                    }
                if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
                else {
                    if (t === e) break;
                    for (; t.sibling === null;) {
                        if (t.return === null || t.return === e) return !0;
                        t = t.return
                    }
                    t.sibling.return = t.return, t = t.sibling
                }
            }
            return !0
        }

        function yu(e, t, n, r) {
            t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
            for (var i = t; 0 < i;) {
                var a = 31 - ze(i),
                    o = 1 << a;
                r[a] = -1, i &= ~o
            }
            n !== 0 && et(e, n, t)
        }

        function bu() {
            return K & 6 ? !0 : (id(0, !1), !1)
        }

        function xu() {
            if (J !== null) {
                if (X === 0) var e = J.return;
                else e = J, Ki = Gi = null, Oo(e), Aa = null, ja = 0, e = J;
                for (; e !== null;) Bc(e.alternate, e), e = e.return;
                J = null
            }
        }

        function Su(e, t) {
            var n = e.timeoutHandle;
            n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), q = e, J = n = ui(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = Je(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
            var r = e.entangledLanes;
            if (r !== 0)
                for (e = e.entanglements, r &= t; 0 < r;) {
                    var i = 31 - ze(r),
                        a = 1 << i;
                    t |= e[i], r &= ~a
                }
            return Ul = t, ei(), n
        }

        function Cu(e, t) {
            H = null, D.H = Rs, t === ba || t === Sa ? (t = Oa(), X = 3) : t === xa ? (t = Oa(), X = 4) : X = t === nc ? 8 : typeof t == `object` && t && typeof t.then == `function` ? 6 : 1, zl = t, J === null && (Wl = 1, Xs(e, vi(t, e.current)))
        }

        function wu() {
            var e = to.current;
            return e === null ? !0 : (Y & 4194048) === Y ? no === null : (Y & 62914560) === Y || Y & 536870912 ? e === no : !1
        }

        function Tu() {
            var e = D.H;
            return D.H = Rs, e === null ? Rs : e
        }

        function Eu() {
            var e = D.A;
            return D.A = Ll, e
        }

        function Du() {
            Wl = 4, Bl || (Y & 4194048) !== Y && to.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || q === null || yu(q, Y, Jl, !1)
        }

        function Ou(e, t, n) {
            var r = K;
            K |= 2;
            var i = Tu(),
                a = Eu();
            (q !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
            var o = Wl;
            a: do try {
                    if (X !== 0 && J !== null) {
                        var s = J,
                            c = zl;
                        switch (X) {
                            case 8:
                                xu(), o = 6;
                                break a;
                            case 3:
                            case 2:
                            case 9:
                            case 6:
                                to.current === null && (t = !0);
                                var l = X;
                                if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
                                    o = 0;
                                    break a
                                }
                                break;
                            default:
                                l = X, X = 0, zl = null, Pu(e, s, c, l)
                        }
                    }
                    ku(), o = Wl;
                    break
                } catch (t) {
                    Cu(e, t)
                }
                while (1);
                return t && e.shellSuspendCounter++, Ki = Gi = null, K = r, D.H = i, D.A = a, J === null && (q = null, Y = 0, ei()), o
        }

        function ku() {
            for (; J !== null;) Mu(J)
        }

        function Au(e, t) {
            var n = K;
            K |= 2;
            var r = Tu(),
                i = Eu();
            q !== e || Y !== t ? (nu = null, tu = I() + 500, Su(e, t)) : Vl = Je(e, t);
            a: do try {
                    if (X !== 0 && J !== null) {
                        t = J;
                        var a = zl;
                        b: switch (X) {
                            case 1:
                                X = 0, zl = null, Pu(e, t, a, 1);
                                break;
                            case 2:
                            case 9:
                                if (wa(a)) {
                                    X = 0, zl = null, Nu(t);
                                    break
                                }
                                t = function() {
                                    X !== 2 && X !== 9 || q !== e || (X = 7), rd(e)
                                }, a.then(t, t);
                                break a;
                            case 3:
                                X = 7;
                                break a;
                            case 4:
                                X = 5;
                                break a;
                            case 7:
                                wa(a) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, a, 7));
                                break;
                            case 5:
                                var o = null;
                                switch (J.tag) {
                                    case 26:
                                        o = J.memoizedState;
                                    case 5:
                                    case 27:
                                        var c = J;
                                        if (o ? Wf(o) : c.stateNode.complete) {
                                            X = 0, zl = null;
                                            var l = c.sibling;
                                            if (l !== null) J = l;
                                            else {
                                                var u = c.return;
                                                u === null ? J = null : (J = u, Fu(u))
                                            }
                                            break b
                                        }
                                }
                                X = 0, zl = null, Pu(e, t, a, 5);
                                break;
                            case 6:
                                X = 0, zl = null, Pu(e, t, a, 6);
                                break;
                            case 8:
                                xu(), Wl = 6;
                                break a;
                            default:
                                throw Error(s(462))
                        }
                    }
                    ju();
                    break
                } catch (t) {
                    Cu(e, t)
                }
                while (1);
                return Ki = Gi = null, D.H = r, D.A = i, K = n, J === null ? (q = null, Y = 0, ei(), Wl) : 0
        }

        function ju() {
            for (; J !== null && !Ee();) Mu(J)
        }

        function Mu(e) {
            var t = Mc(e.alternate, e, Ul);
            e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t
        }

        function Nu(e) {
            var t = e,
                n = t.alternate;
            switch (t.tag) {
                case 15:
                case 0:
                    t = gc(n, t, t.pendingProps, t.type, void 0, Y);
                    break;
                case 11:
                    t = gc(n, t, t.pendingProps, t.type.render, t.ref, Y);
                    break;
                case 5:
                    Oo(t);
                default:
                    Bc(n, t), t = J = di(t, Ul), t = Mc(n, t, Ul)
            }
            e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t
        }

        function Pu(e, t, n, r) {
            Ki = Gi = null, Oo(t), Aa = null, ja = 0;
            var i = t.return;
            try {
                if (tc(e, i, t, n, Y)) {
                    Wl = 1, Xs(e, vi(n, e.current)), J = null;
                    return
                }
            } catch (t) {
                if (i !== null) throw J = i, t;
                Wl = 1, Xs(e, vi(n, e.current)), J = null;
                return
            }
            t.flags & 32768 ? (B || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = to.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t)
        }

        function Fu(e) {
            var t = e;
            do {
                if (t.flags & 32768) {
                    Iu(t, Bl);
                    return
                }
                e = t.return;
                var n = Rc(t.alternate, t, Ul);
                if (n !== null) {
                    J = n;
                    return
                }
                if (t = t.sibling, t !== null) {
                    J = t;
                    return
                }
                J = t = e
            } while (t !== null);
            Wl === 0 && (Wl = 5)
        }

        function Iu(e, t) {
            do {
                var n = zc(e.alternate, e);
                if (n !== null) {
                    n.flags &= 32767, J = n;
                    return
                }
                if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
                    J = e;
                    return
                }
                J = e = n
            } while (e !== null);
            Wl = 6, J = null
        }

        function Lu(e, t, n, r, i, a, o, c, l) {
            e.cancelPendingCommit = null;
            do Hu(); while (iu !== 0);
            if (K & 6) throw Error(s(327));
            if (t !== null) {
                if (t === e.current) throw Error(s(177));
                if (a = t.lanes | t.childLanes, a |= $r, $e(e, n, a, o, c, l), e === q && (J = q = null, Y = 0), ou = t, au = e, su = n, cu = a, lu = i, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(je, function() {
                        return Uu(), null
                    })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
                    r = D.T, D.T = null, i = O.p, O.p = 2, o = K, K |= 4;
                    try {
                        al(e, t, n)
                    } finally {
                        K = o, O.p = i, D.T = r
                    }
                }
                iu = 1, Ru(), zu(), Bu()
            }
        }

        function Ru() {
            if (iu === 1) {
                iu = 0;
                var e = au,
                    t = ou,
                    n = (t.flags & 13878) != 0;
                if (t.subtreeFlags & 13878 || n) {
                    n = D.T, D.T = null;
                    var r = O.p;
                    O.p = 2;
                    var i = K;
                    K |= 4;
                    try {
                        _l(t, e);
                        var a = zd,
                            o = Dr(e.containerInfo),
                            s = a.focusedElem,
                            c = a.selectionRange;
                        if (o !== s && s && s.ownerDocument && Er(s.ownerDocument.documentElement, s)) {
                            if (c !== null && Or(s)) {
                                var l = c.start,
                                    u = c.end;
                                if (u === void 0 && (u = l), `selectionStart` in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
                                else {
                                    var d = s.ownerDocument || document,
                                        f = d && d.defaultView || window;
                                    if (f.getSelection) {
                                        var p = f.getSelection(),
                                            m = s.textContent.length,
                                            h = Math.min(c.start, m),
                                            g = c.end === void 0 ? h : Math.min(c.end, m);
                                        !p.extend && h > g && (o = g, g = h, h = o);
                                        var _ = Tr(s, h),
                                            v = Tr(s, g);
                                        if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
                                            var y = d.createRange();
                                            y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y))
                                        }
                                    }
                                }
                            }
                            for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
                                element: p,
                                left: p.scrollLeft,
                                top: p.scrollTop
                            });
                            for (typeof s.focus == `function` && s.focus(), s = 0; s < d.length; s++) {
                                var b = d[s];
                                b.element.scrollLeft = b.left, b.element.scrollTop = b.top
                            }
                        }
                        sp = !!Rd, zd = Rd = null
                    } finally {
                        K = i, O.p = r, D.T = n
                    }
                }
                e.current = t, iu = 2
            }
        }

        function zu() {
            if (iu === 2) {
                iu = 0;
                var e = au,
                    t = ou,
                    n = (t.flags & 8772) != 0;
                if (t.subtreeFlags & 8772 || n) {
                    n = D.T, D.T = null;
                    var r = O.p;
                    O.p = 2;
                    var i = K;
                    K |= 4;
                    try {
                        ol(e, t.alternate, t)
                    } finally {
                        K = i, O.p = r, D.T = n
                    }
                }
                iu = 3
            }
        }

        function Bu() {
            if (iu === 4 || iu === 3) {
                iu = 0, De();
                var e = au,
                    t = ou,
                    n = su,
                    r = uu;
                t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
                var i = e.pendingLanes;
                if (i === 0 && (ru = null), it(n), t = t.stateNode, Le && typeof Le.onCommitFiberRoot == `function`) try {
                    Le.onCommitFiberRoot(Ie, t, void 0, (t.current.flags & 128) == 128)
                } catch {}
                if (r !== null) {
                    t = D.T, i = O.p, O.p = 2, D.T = null;
                    try {
                        for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
                            var s = r[o];
                            a(s.value, {
                                componentStack: s.stack
                            })
                        }
                    } finally {
                        D.T = t, O.p = i
                    }
                }
                su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1)
            }
        }

        function Vu(e, t) {
            (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sa(t)))
        }

        function Hu() {
            return Ru(), zu(), Bu(), Uu()
        }

        function Uu() {
            if (iu !== 5) return !1;
            var e = au,
                t = cu;
            cu = 0;
            var n = it(su),
                r = D.T,
                i = O.p;
            try {
                O.p = 32 > n ? 32 : n, D.T = null, n = lu, lu = null;
                var a = au,
                    o = su;
                if (iu = 0, ou = au = null, su = 0, K & 6) throw Error(s(331));
                var c = K;
                if (K |= 4, Pl(a.current), El(a, a.current, o, n), K = c, id(0, !1), Le && typeof Le.onPostCommitFiberRoot == `function`) try {
                    Le.onPostCommitFiberRoot(Ie, a)
                } catch {}
                return !0
            } finally {
                O.p = i, D.T = r, Vu(e, t)
            }
        }

        function Wu(e, t, n) {
            t = vi(n, t), t = Qs(e.stateNode, t, 2), e = Ha(e, t, 2), e !== null && (Qe(e, 2), rd(e))
        }

        function Z(e, t, n) {
            if (e.tag === 3) Wu(e, e, n);
            else
                for (; t !== null;) {
                    if (t.tag === 3) {
                        Wu(t, e, n);
                        break
                    } else if (t.tag === 1) {
                        var r = t.stateNode;
                        if (typeof t.type.getDerivedStateFromError == `function` || typeof r.componentDidCatch == `function` && (ru === null || !ru.has(r))) {
                            e = vi(n, e), n = $s(2), r = Ha(t, n, 2), r !== null && (ec(n, r, t, e), Qe(r, 2), rd(r));
                            break
                        }
                    }
                    t = t.return
                }
        }

        function Gu(e, t, n) {
            var r = e.pingCache;
            if (r === null) {
                r = e.pingCache = new Rl;
                var i = new Set;
                r.set(t, i)
            } else i = r.get(t), i === void 0 && (i = new Set, r.set(t, i));
            i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e))
        }

        function Ku(e, t, n) {
            var r = e.pingCache;
            r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > I() - $l ? !(K & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e)
        }

        function qu(e, t) {
            t === 0 && (t = Xe()), e = ri(e, t), e !== null && (Qe(e, t), rd(e))
        }

        function Ju(e) {
            var t = e.memoizedState,
                n = 0;
            t !== null && (n = t.retryLane), qu(e, n)
        }

        function Yu(e, t) {
            var n = 0;
            switch (e.tag) {
                case 31:
                case 13:
                    var r = e.stateNode,
                        i = e.memoizedState;
                    i !== null && (n = i.retryLane);
                    break;
                case 19:
                    r = e.stateNode;
                    break;
                case 22:
                    r = e.stateNode._retryCache;
                    break;
                default:
                    throw Error(s(314))
            }
            r !== null && r.delete(t), qu(e, n)
        }

        function Xu(e, t) {
            return F(e, t)
        }
        var Zu = null,
            Qu = null,
            $u = !1,
            ed = !1,
            td = !1,
            nd = 0;

        function rd(e) {
            e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud())
        }

        function id(e, t) {
            if (!td && ed) {
                td = !0;
                do
                    for (var n = !1, r = Zu; r !== null;) {
                        if (!t)
                            if (e !== 0) {
                                var i = r.pendingLanes;
                                if (i === 0) var a = 0;
                                else {
                                    var o = r.suspendedLanes,
                                        s = r.pingedLanes;
                                    a = (1 << 31 - ze(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0
                                }
                                a !== 0 && (n = !0, ld(r, a))
                            } else a = Y, a = qe(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Je(r, a) || (n = !0, ld(r, a));
                        r = r.next
                    }
                while (n);
                td = !1
            }
        }

        function ad() {
            od()
        }

        function od() {
            ed = $u = !1;
            var e = 0;
            nd !== 0 && Gd() && (e = nd);
            for (var t = I(), n = null, r = Zu; r !== null;) {
                var i = r.next,
                    a = sd(r, t);
                a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i
            }
            iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0)
        }

        function sd(e, t) {
            for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
                var o = 31 - ze(a),
                    s = 1 << o,
                    c = i[o];
                c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ye(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s
            }
            if (t = q, n = Y, n = qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Te(r), e.callbackNode = null, e.callbackPriority = 0;
            if (!(n & 3) || Je(e, n)) {
                if (t = n & -n, t === e.callbackPriority) return t;
                switch (r !== null && Te(r), it(n)) {
                    case 2:
                    case 8:
                        n = Ae;
                        break;
                    case 32:
                        n = je;
                        break;
                    case 268435456:
                        n = Ne;
                        break;
                    default:
                        n = je
                }
                return r = cd.bind(null, e), n = F(n, r), e.callbackPriority = t, e.callbackNode = n, t
            }
            return r !== null && r !== null && Te(r), e.callbackPriority = 2, e.callbackNode = null, 2
        }

        function cd(e, t) {
            if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
            var n = e.callbackNode;
            if (Hu() && e.callbackNode !== n) return null;
            var r = Y;
            return r = qe(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, I()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null)
        }

        function ld(e, t) {
            if (Hu()) return null;
            gu(e, t, !0)
        }

        function ud() {
            Yd(function() {
                K & 6 ? F(ke, ad) : od()
            })
        }

        function dd() {
            if (nd === 0) {
                var e = ua;
                e === 0 && (e = Ue, Ue <<= 1, !(Ue & 261888) && (Ue = 256)), nd = e
            }
            return nd
        }

        function fd(e) {
            return e == null || typeof e == `symbol` || typeof e == `boolean` ? null : typeof e == `function` ? e : Qt(`` + e)
        }

        function pd(e, t) {
            var n = t.ownerDocument.createElement(`input`);
            return n.name = t.name, n.value = t.value, e.id && n.setAttribute(`form`, e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e
        }

        function md(e, t, n, r, i) {
            if (t === `submit` && n && n.stateNode === i) {
                var a = fd((i[R] || null).action),
                    o = r.submitter;
                o && (t = (t = o[R] || null) ? fd(t.formAction) : o.getAttribute(`formAction`), t !== null && (a = t, o = null));
                var s = new xn(`action`, `action`, null, r, i);
                e.push({
                    event: s,
                    listeners: [{
                        instance: null,
                        listener: function() {
                            if (r.defaultPrevented) {
                                if (nd !== 0) {
                                    var e = o ? pd(i, o) : new FormData(i);
                                    ws(n, {
                                        pending: !0,
                                        data: e,
                                        method: i.method,
                                        action: a
                                    }, null, e)
                                }
                            } else typeof a == `function` && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), ws(n, {
                                pending: !0,
                                data: e,
                                method: i.method,
                                action: a
                            }, a, e))
                        },
                        currentTarget: i
                    }]
                })
            }
        }
        for (var hd = 0; hd < Jr.length; hd++) {
            var gd = Jr[hd];
            Yr(gd.toLowerCase(), `on` + (gd[0].toUpperCase() + gd.slice(1)))
        }
        Yr(Br, `onAnimationEnd`), Yr(Vr, `onAnimationIteration`), Yr(Hr, `onAnimationStart`), Yr(`dblclick`, `onDoubleClick`), Yr(`focusin`, `onFocus`), Yr(`focusout`, `onBlur`), Yr(Ur, `onTransitionRun`), Yr(Wr, `onTransitionStart`), Yr(Gr, `onTransitionCancel`), Yr(Kr, `onTransitionEnd`), Ct(`onMouseEnter`, [`mouseout`, `mouseover`]), Ct(`onMouseLeave`, [`mouseout`, `mouseover`]), Ct(`onPointerEnter`, [`pointerout`, `pointerover`]), Ct(`onPointerLeave`, [`pointerout`, `pointerover`]), St(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `)), St(`onSelect`, `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)), St(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]), St(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)), St(`onCompositionStart`, `compositionstart focusout keydown keypress keyup mousedown`.split(` `)), St(`onCompositionUpdate`, `compositionupdate focusout keydown keypress keyup mousedown`.split(` `));
        var _d = `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),
            vd = new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));

        function yd(e, t) {
            t = (t & 4) != 0;
            for (var n = 0; n < e.length; n++) {
                var r = e[n],
                    i = r.event;
                r = r.listeners;
                a: {
                    var a = void 0;
                    if (t)
                        for (var o = r.length - 1; 0 <= o; o--) {
                            var s = r[o],
                                c = s.instance,
                                l = s.currentTarget;
                            if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
                            a = s, i.currentTarget = l;
                            try {
                                a(i)
                            } catch (e) {
                                Xr(e)
                            }
                            i.currentTarget = null, a = c
                        } else
                            for (o = 0; o < r.length; o++) {
                                if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
                                a = s, i.currentTarget = l;
                                try {
                                    a(i)
                                } catch (e) {
                                    Xr(e)
                                }
                                i.currentTarget = null, a = c
                            }
                }
            }
        }

        function Q(e, t) {
            var n = t[lt];
            n === void 0 && (n = t[lt] = new Set);
            var r = e + `__bubble`;
            n.has(r) || (Cd(t, e, 2, !1), n.add(r))
        }

        function bd(e, t, n) {
            var r = 0;
            t && (r |= 4), Cd(n, e, r, t)
        }
        var xd = `_reactListening` + Math.random().toString(36).slice(2);

        function Sd(e) {
            if (!e[xd]) {
                e[xd] = !0, bt.forEach(function(t) {
                    t !== `selectionchange` && (vd.has(t) || bd(t, !1, e), bd(t, !0, e))
                });
                var t = e.nodeType === 9 ? e : e.ownerDocument;
                t === null || t[xd] || (t[xd] = !0, bd(`selectionchange`, !1, t))
            }
        }

        function Cd(e, t, n, r) {
            switch (mp(t)) {
                case 2:
                    var i = cp;
                    break;
                case 8:
                    i = lp;
                    break;
                default:
                    i = up
            }
            n = i.bind(null, t, n, e), i = void 0, !un || t !== `touchstart` && t !== `touchmove` && t !== `wheel` || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
                capture: !0,
                passive: i
            }) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, {
                passive: i
            })
        }

        function wd(e, t, n, r, i) {
            var a = r;
            if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
                if (r === null) return;
                var o = r.tag;
                if (o === 3 || o === 4) {
                    var s = r.stateNode.containerInfo;
                    if (s === i) break;
                    if (o === 4)
                        for (o = r.return; o !== null;) {
                            var c = o.tag;
                            if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
                            o = o.return
                        }
                    for (; s !== null;) {
                        if (o = ht(s), o === null) return;
                        if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
                            r = a = o;
                            continue a
                        }
                        s = s.parentNode
                    }
                }
                r = r.return
            }
            sn(function() {
                var r = a,
                    i = tn(n),
                    o = [];
                a: {
                    var s = qr.get(e);
                    if (s !== void 0) {
                        var c = xn,
                            u = e;
                        switch (e) {
                            case `keypress`:
                                if (gn(n) === 0) break a;
                            case `keydown`:
                            case `keyup`:
                                c = zn;
                                break;
                            case `focusin`:
                                u = `focus`, c = An;
                                break;
                            case `focusout`:
                                u = `blur`, c = An;
                                break;
                            case `beforeblur`:
                            case `afterblur`:
                                c = An;
                                break;
                            case `click`:
                                if (n.button === 2) break a;
                            case `auxclick`:
                            case `dblclick`:
                            case `mousedown`:
                            case `mousemove`:
                            case `mouseup`:
                            case `mouseout`:
                            case `mouseover`:
                            case `contextmenu`:
                                c = On;
                                break;
                            case `drag`:
                            case `dragend`:
                            case `dragenter`:
                            case `dragexit`:
                            case `dragleave`:
                            case `dragover`:
                            case `dragstart`:
                            case `drop`:
                                c = kn;
                                break;
                            case `touchcancel`:
                            case `touchend`:
                            case `touchmove`:
                            case `touchstart`:
                                c = Vn;
                                break;
                            case Br:
                            case Vr:
                            case Hr:
                                c = jn;
                                break;
                            case Kr:
                                c = Hn;
                                break;
                            case `scroll`:
                            case `scrollend`:
                                c = Cn;
                                break;
                            case `wheel`:
                                c = Un;
                                break;
                            case `copy`:
                            case `cut`:
                            case `paste`:
                                c = Mn;
                                break;
                            case `gotpointercapture`:
                            case `lostpointercapture`:
                            case `pointercancel`:
                            case `pointerdown`:
                            case `pointermove`:
                            case `pointerout`:
                            case `pointerover`:
                            case `pointerup`:
                                c = Bn;
                                break;
                            case `toggle`:
                            case `beforetoggle`:
                                c = Wn
                        }
                        var d = (t & 4) != 0,
                            f = !d && (e === `scroll` || e === `scrollend`),
                            p = d ? s === null ? null : s + `Capture` : s;
                        d = [];
                        for (var m = r, h; m !== null;) {
                            var g = m;
                            if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = cn(m, p), g != null && d.push(Td(m, g, h))), f) break;
                            m = m.return
                        }
                        0 < d.length && (s = new c(s, u, null, n, i), o.push({
                            event: s,
                            listeners: d
                        }))
                    }
                }
                if (!(t & 7)) {
                    a: {
                        if (s = e === `mouseover` || e === `pointerover`, c = e === `mouseout` || e === `pointerout`, s && n !== en && (u = n.relatedTarget || n.fromElement) && (ht(u) || u[ct])) break a;
                        if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (u = n.relatedTarget || n.toElement, c = r, u = u ? ht(u) : null, u !== null && (f = l(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (c = null, u = r), c !== u)) {
                            if (d = On, g = `onMouseLeave`, p = `onMouseEnter`, m = `mouse`, (e === `pointerout` || e === `pointerover`) && (d = Bn, g = `onPointerLeave`, p = `onPointerEnter`, m = `pointer`), f = c == null ? s : _t(c), h = u == null ? s : _t(u), s = new d(g, m + `leave`, c, n, i), s.target = f, s.relatedTarget = h, g = null, ht(i) === r && (d = new d(p, m + `enter`, u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, c && u) b: {
                                for (d = Dd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;g = 0;
                                for (var _ = m; _; _ = d(_)) g++;
                                for (; 0 < h - g;) p = d(p),
                                h--;
                                for (; 0 < g - h;) m = d(m),
                                g--;
                                for (; h--;) {
                                    if (p === m || m !== null && p === m.alternate) {
                                        d = p;
                                        break b
                                    }
                                    p = d(p), m = d(m)
                                }
                                d = null
                            }
                            else d = null;
                            c !== null && Od(o, s, c, d, !1), u !== null && f !== null && Od(o, f, u, d, !0)
                        }
                    }
                    a: {
                        if (s = r ? _t(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === `select` || c === `input` && s.type === `file`) var v = ur;
                        else if (ir(s))
                            if (dr) v = br;
                            else {
                                v = vr;
                                var y = _r
                            }
                        else c = s.nodeName,
                        !c || c.toLowerCase() !== `input` || s.type !== `checkbox` && s.type !== `radio` ? r && Yt(r.elementType) && (v = ur) : v = yr;
                        if (v &&= v(e, r)) {
                            ar(o, v, n, i);
                            break a
                        }
                        y && y(e, s, r),
                        e === `focusout` && r && s.type === `number` && r.memoizedProps.value != null && Vt(s, `number`, s.value)
                    }
                    switch (y = r ? _t(r) : window, e) {
                        case `focusin`:
                            (ir(y) || y.contentEditable === `true`) && (Ar = y, jr = r, Mr = null);
                            break;
                        case `focusout`:
                            Mr = jr = Ar = null;
                            break;
                        case `mousedown`:
                            Nr = !0;
                            break;
                        case `contextmenu`:
                        case `mouseup`:
                        case `dragend`:
                            Nr = !1, Pr(o, n, i);
                            break;
                        case `selectionchange`:
                            if (kr) break;
                        case `keydown`:
                        case `keyup`:
                            Pr(o, n, i)
                    }
                    var b;
                    if (Kn) b: {
                        switch (e) {
                            case `compositionstart`:
                                var x = `onCompositionStart`;
                                break b;
                            case `compositionend`:
                                x = `onCompositionEnd`;
                                break b;
                            case `compositionupdate`:
                                x = `onCompositionUpdate`;
                                break b
                        }
                        x = void 0
                    }
                    else er ? Qn(e, n) && (x = `onCompositionEnd`) : e === `keydown` && n.keyCode === 229 && (x = `onCompositionStart`);x && (Yn && n.locale !== `ko` && (er || x !== `onCompositionStart` ? x === `onCompositionEnd` && er && (b = hn()) : (fn = i, pn = `value` in fn ? fn.value : fn.textContent, er = !0)), y = Ed(r, x), 0 < y.length && (x = new Nn(x, e, null, n, i), o.push({
                        event: x,
                        listeners: y
                    }), b ? x.data = b : (b = $n(n), b !== null && (x.data = b)))),
                    (b = Jn ? tr(e, n) : nr(e, n)) && (x = Ed(r, `onBeforeInput`), 0 < x.length && (y = new Nn(`onBeforeInput`, `beforeinput`, null, n, i), o.push({
                        event: y,
                        listeners: x
                    }), y.data = b)),
                    md(o, e, r, n, i)
                }
                yd(o, t)
            })
        }

        function Td(e, t, n) {
            return {
                instance: e,
                listener: t,
                currentTarget: n
            }
        }

        function Ed(e, t) {
            for (var n = t + `Capture`, r = []; e !== null;) {
                var i = e,
                    a = i.stateNode;
                if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = cn(e, n), i != null && r.unshift(Td(e, i, a)), i = cn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
                e = e.return
            }
            return []
        }

        function Dd(e) {
            if (e === null) return null;
            do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
            return e || null
        }

        function Od(e, t, n, r, i) {
            for (var a = t._reactName, o = []; n !== null && n !== r;) {
                var s = n,
                    c = s.alternate,
                    l = s.stateNode;
                if (s = s.tag, c !== null && c === r) break;
                s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = cn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = cn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return
            }
            o.length !== 0 && e.push({
                event: t,
                listeners: o
            })
        }
        var kd = /\r\n?/g,
            Ad = /\u0000|\uFFFD/g;

        function jd(e) {
            return (typeof e == `string` ? e : `` + e).replace(kd, `
`).replace(Ad, ``)
        }

        function Md(e, t) {
            return t = jd(t), jd(e) === t
        }

        function $(e, t, n, r, i, a) {
            switch (n) {
                case `children`:
                    typeof r == `string` ? t === `body` || t === `textarea` && r === `` || Gt(e, r) : (typeof r == `number` || typeof r == `bigint`) && t !== `body` && Gt(e, `` + r);
                    break;
                case `className`:
                    kt(e, `class`, r);
                    break;
                case `tabIndex`:
                    kt(e, `tabindex`, r);
                    break;
                case `dir`:
                case `role`:
                case `viewBox`:
                case `width`:
                case `height`:
                    kt(e, n, r);
                    break;
                case `style`:
                    Jt(e, r, a);
                    break;
                case `data`:
                    if (t !== `object`) {
                        kt(e, `data`, r);
                        break
                    }
                case `src`:
                case `href`:
                    if (r === `` && (t !== `a` || n !== `href`)) {
                        e.removeAttribute(n);
                        break
                    }
                    if (r == null || typeof r == `function` || typeof r == `symbol` || typeof r == `boolean`) {
                        e.removeAttribute(n);
                        break
                    }
                    r = Qt(`` + r), e.setAttribute(n, r);
                    break;
                case `action`:
                case `formAction`:
                    if (typeof r == `function`) {
                        e.setAttribute(n, `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);
                        break
                    } else typeof a == `function` && (n === `formAction` ? (t !== `input` && $(e, t, `name`, i.name, i, null), $(e, t, `formEncType`, i.formEncType, i, null), $(e, t, `formMethod`, i.formMethod, i, null), $(e, t, `formTarget`, i.formTarget, i, null)) : ($(e, t, `encType`, i.encType, i, null), $(e, t, `method`, i.method, i, null), $(e, t, `target`, i.target, i, null)));
                    if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
                        e.removeAttribute(n);
                        break
                    }
                    r = Qt(`` + r), e.setAttribute(n, r);
                    break;
                case `onClick`:
                    r != null && (e.onclick = $t);
                    break;
                case `onScroll`:
                    r != null && Q(`scroll`, e);
                    break;
                case `onScrollEnd`:
                    r != null && Q(`scrollend`, e);
                    break;
                case `dangerouslySetInnerHTML`:
                    if (r != null) {
                        if (typeof r != `object` || !(`__html` in r)) throw Error(s(61));
                        if (n = r.__html, n != null) {
                            if (i.children != null) throw Error(s(60));
                            e.innerHTML = n
                        }
                    }
                    break;
                case `multiple`:
                    e.multiple = r && typeof r != `function` && typeof r != `symbol`;
                    break;
                case `muted`:
                    e.muted = r && typeof r != `function` && typeof r != `symbol`;
                    break;
                case `suppressContentEditableWarning`:
                case `suppressHydrationWarning`:
                case `defaultValue`:
                case `defaultChecked`:
                case `innerHTML`:
                case `ref`:
                    break;
                case `autoFocus`:
                    break;
                case `xlinkHref`:
                    if (r == null || typeof r == `function` || typeof r == `boolean` || typeof r == `symbol`) {
                        e.removeAttribute(`xlink:href`);
                        break
                    }
                    n = Qt(`` + r), e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n);
                    break;
                case `contentEditable`:
                case `spellCheck`:
                case `draggable`:
                case `value`:
                case `autoReverse`:
                case `externalResourcesRequired`:
                case `focusable`:
                case `preserveAlpha`:
                    r != null && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, `` + r) : e.removeAttribute(n);
                    break;
                case `inert`:
                case `allowFullScreen`:
                case `async`:
                case `autoPlay`:
                case `controls`:
                case `default`:
                case `defer`:
                case `disabled`:
                case `disablePictureInPicture`:
                case `disableRemotePlayback`:
                case `formNoValidate`:
                case `hidden`:
                case `loop`:
                case `noModule`:
                case `noValidate`:
                case `open`:
                case `playsInline`:
                case `readOnly`:
                case `required`:
                case `reversed`:
                case `scoped`:
                case `seamless`:
                case `itemScope`:
                    r && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, ``) : e.removeAttribute(n);
                    break;
                case `capture`:
                case `download`:
                    !0 === r ? e.setAttribute(n, ``) : !1 !== r && r != null && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, r) : e.removeAttribute(n);
                    break;
                case `cols`:
                case `rows`:
                case `size`:
                case `span`:
                    r != null && typeof r != `function` && typeof r != `symbol` && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
                    break;
                case `rowSpan`:
                case `start`:
                    r == null || typeof r == `function` || typeof r == `symbol` || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
                    break;
                case `popover`:
                    Q(`beforetoggle`, e), Q(`toggle`, e), Ot(e, `popover`, r);
                    break;
                case `xlinkActuate`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
                    break;
                case `xlinkArcrole`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
                    break;
                case `xlinkRole`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
                    break;
                case `xlinkShow`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
                    break;
                case `xlinkTitle`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
                    break;
                case `xlinkType`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
                    break;
                case `xmlBase`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
                    break;
                case `xmlLang`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
                    break;
                case `xmlSpace`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
                    break;
                case `is`:
                    Ot(e, `is`, r);
                    break;
                case `innerText`:
                case `textContent`:
                    break;
                default:
                    (!(2 < n.length) || n[0] !== `o` && n[0] !== `O` || n[1] !== `n` && n[1] !== `N`) && (n = Xt.get(n) || n, Ot(e, n, r))
            }
        }

        function Nd(e, t, n, r, i, a) {
            switch (n) {
                case `style`:
                    Jt(e, r, a);
                    break;
                case `dangerouslySetInnerHTML`:
                    if (r != null) {
                        if (typeof r != `object` || !(`__html` in r)) throw Error(s(61));
                        if (n = r.__html, n != null) {
                            if (i.children != null) throw Error(s(60));
                            e.innerHTML = n
                        }
                    }
                    break;
                case `children`:
                    typeof r == `string` ? Gt(e, r) : (typeof r == `number` || typeof r == `bigint`) && Gt(e, `` + r);
                    break;
                case `onScroll`:
                    r != null && Q(`scroll`, e);
                    break;
                case `onScrollEnd`:
                    r != null && Q(`scrollend`, e);
                    break;
                case `onClick`:
                    r != null && (e.onclick = $t);
                    break;
                case `suppressContentEditableWarning`:
                case `suppressHydrationWarning`:
                case `innerHTML`:
                case `ref`:
                    break;
                case `innerText`:
                case `textContent`:
                    break;
                default:
                    if (!xt.hasOwnProperty(n)) a: {
                        if (n[0] === `o` && n[1] === `n` && (i = n.endsWith(`Capture`), t = n.slice(2, i ? n.length - 7 : void 0), a = e[R] || null, a = a == null ? null : a[n], typeof a == `function` && e.removeEventListener(t, a, i), typeof r == `function`)) {
                            typeof a != `function` && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
                            break a
                        }
                        n in e ? e[n] = r : !0 === r ? e.setAttribute(n, ``) : Ot(e, n, r)
                    }
            }
        }

        function Pd(e, t, n) {
            switch (t) {
                case `div`:
                case `span`:
                case `svg`:
                case `path`:
                case `a`:
                case `g`:
                case `p`:
                case `li`:
                    break;
                case `img`:
                    Q(`error`, e), Q(`load`, e);
                    var r = !1,
                        i = !1,
                        a;
                    for (a in n)
                        if (n.hasOwnProperty(a)) {
                            var o = n[a];
                            if (o != null) switch (a) {
                                case `src`:
                                    r = !0;
                                    break;
                                case `srcSet`:
                                    i = !0;
                                    break;
                                case `children`:
                                case `dangerouslySetInnerHTML`:
                                    throw Error(s(137, t));
                                default:
                                    $(e, t, a, o, n, null)
                            }
                        } i && $(e, t, `srcSet`, n.srcSet, n, null), r && $(e, t, `src`, n.src, n, null);
                    return;
                case `input`:
                    Q(`invalid`, e);
                    var c = a = o = i = null,
                        l = null,
                        u = null;
                    for (r in n)
                        if (n.hasOwnProperty(r)) {
                            var d = n[r];
                            if (d != null) switch (r) {
                                case `name`:
                                    i = d;
                                    break;
                                case `type`:
                                    o = d;
                                    break;
                                case `checked`:
                                    l = d;
                                    break;
                                case `defaultChecked`:
                                    u = d;
                                    break;
                                case `value`:
                                    a = d;
                                    break;
                                case `defaultValue`:
                                    c = d;
                                    break;
                                case `children`:
                                case `dangerouslySetInnerHTML`:
                                    if (d != null) throw Error(s(137, t));
                                    break;
                                default:
                                    $(e, t, r, d, n, null)
                            }
                        } Bt(e, a, c, l, u, o, i, !1);
                    return;
                case `select`:
                    for (i in Q(`invalid`, e), r = o = a = null, n)
                        if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
                            case `value`:
                                a = c;
                                break;
                            case `defaultValue`:
                                o = c;
                                break;
                            case `multiple`:
                                r = c;
                            default:
                                $(e, t, i, c, n, null)
                        }
                    t = a, n = o, e.multiple = !!r, t == null ? n != null && Ht(e, !!r, n, !0) : Ht(e, !!r, t, !1);
                    return;
                case `textarea`:
                    for (o in Q(`invalid`, e), a = i = r = null, n)
                        if (n.hasOwnProperty(o) && (c = n[o], c != null)) switch (o) {
                            case `value`:
                                r = c;
                                break;
                            case `defaultValue`:
                                i = c;
                                break;
                            case `children`:
                                a = c;
                                break;
                            case `dangerouslySetInnerHTML`:
                                if (c != null) throw Error(s(91));
                                break;
                            default:
                                $(e, t, o, c, n, null)
                        }
                    Wt(e, r, i, a);
                    return;
                case `option`:
                    for (l in n)
                        if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
                            case `selected`:
                                e.selected = r && typeof r != `function` && typeof r != `symbol`;
                                break;
                            default:
                                $(e, t, l, r, n, null)
                        }
                    return;
                case `dialog`:
                    Q(`beforetoggle`, e), Q(`toggle`, e), Q(`cancel`, e), Q(`close`, e);
                    break;
                case `iframe`:
                case `object`:
                    Q(`load`, e);
                    break;
                case `video`:
                case `audio`:
                    for (r = 0; r < _d.length; r++) Q(_d[r], e);
                    break;
                case `image`:
                    Q(`error`, e), Q(`load`, e);
                    break;
                case `details`:
                    Q(`toggle`, e);
                    break;
                case `embed`:
                case `source`:
                case `link`:
                    Q(`error`, e), Q(`load`, e);
                case `area`:
                case `base`:
                case `br`:
                case `col`:
                case `hr`:
                case `keygen`:
                case `meta`:
                case `param`:
                case `track`:
                case `wbr`:
                case `menuitem`:
                    for (u in n)
                        if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                throw Error(s(137, t));
                            default:
                                $(e, t, u, r, n, null)
                        }
                    return;
                default:
                    if (Yt(t)) {
                        for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
                        return
                    }
            }
            for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null))
        }

        function Fd(e, t, n, r) {
            switch (t) {
                case `div`:
                case `span`:
                case `svg`:
                case `path`:
                case `a`:
                case `g`:
                case `p`:
                case `li`:
                    break;
                case `input`:
                    var i = null,
                        a = null,
                        o = null,
                        c = null,
                        l = null,
                        u = null,
                        d = null;
                    for (m in n) {
                        var f = n[m];
                        if (n.hasOwnProperty(m) && f != null) switch (m) {
                            case `checked`:
                                break;
                            case `value`:
                                break;
                            case `defaultValue`:
                                l = f;
                            default:
                                r.hasOwnProperty(m) || $(e, t, m, null, r, f)
                        }
                    }
                    for (var p in r) {
                        var m = r[p];
                        if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
                            case `type`:
                                a = m;
                                break;
                            case `name`:
                                i = m;
                                break;
                            case `checked`:
                                u = m;
                                break;
                            case `defaultChecked`:
                                d = m;
                                break;
                            case `value`:
                                o = m;
                                break;
                            case `defaultValue`:
                                c = m;
                                break;
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                if (m != null) throw Error(s(137, t));
                                break;
                            default:
                                m !== f && $(e, t, p, m, r, f)
                        }
                    }
                    zt(e, o, c, l, u, d, a, i);
                    return;
                case `select`:
                    for (a in m = o = c = p = null, n)
                        if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
                            case `value`:
                                break;
                            case `multiple`:
                                m = l;
                            default:
                                r.hasOwnProperty(a) || $(e, t, a, null, r, l)
                        }
                    for (i in r)
                        if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
                            case `value`:
                                p = a;
                                break;
                            case `defaultValue`:
                                c = a;
                                break;
                            case `multiple`:
                                o = a;
                            default:
                                a !== l && $(e, t, i, a, r, l)
                        }
                    t = c, n = o, r = m, p == null ? !!r != !!n && (t == null ? Ht(e, !!n, n ? [] : ``, !1) : Ht(e, !!n, t, !0)) : Ht(e, !!n, p, !1);
                    return;
                case `textarea`:
                    for (c in m = p = null, n)
                        if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
                            case `value`:
                                break;
                            case `children`:
                                break;
                            default:
                                $(e, t, c, null, r, i)
                        }
                    for (o in r)
                        if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
                            case `value`:
                                p = i;
                                break;
                            case `defaultValue`:
                                m = i;
                                break;
                            case `children`:
                                break;
                            case `dangerouslySetInnerHTML`:
                                if (i != null) throw Error(s(91));
                                break;
                            default:
                                i !== a && $(e, t, o, i, r, a)
                        }
                    Ut(e, p, m);
                    return;
                case `option`:
                    for (var h in n)
                        if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
                            case `selected`:
                                e.selected = !1;
                                break;
                            default:
                                $(e, t, h, null, r, p)
                        }
                    for (l in r)
                        if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
                            case `selected`:
                                e.selected = p && typeof p != `function` && typeof p != `symbol`;
                                break;
                            default:
                                $(e, t, l, p, r, m)
                        }
                    return;
                case `img`:
                case `link`:
                case `area`:
                case `base`:
                case `br`:
                case `col`:
                case `embed`:
                case `hr`:
                case `keygen`:
                case `meta`:
                case `param`:
                case `source`:
                case `track`:
                case `wbr`:
                case `menuitem`:
                    for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
                    for (u in r)
                        if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                if (p != null) throw Error(s(137, t));
                                break;
                            default:
                                $(e, t, u, p, r, m)
                        }
                    return;
                default:
                    if (Yt(t)) {
                        for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
                        for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
                        return
                    }
            }
            for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
            for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m)
        }

        function Id(e) {
            switch (e) {
                case `css`:
                case `script`:
                case `font`:
                case `img`:
                case `image`:
                case `input`:
                case `link`:
                    return !0;
                default:
                    return !1
            }
        }

        function Ld() {
            if (typeof performance.getEntriesByType == `function`) {
                for (var e = 0, t = 0, n = performance.getEntriesByType(`resource`), r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = i.transferSize,
                        o = i.initiatorType,
                        s = i.duration;
                    if (a && s && Id(o)) {
                        for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
                            var c = n[r],
                                l = c.startTime;
                            if (l > s) break;
                            var u = c.transferSize,
                                d = c.initiatorType;
                            u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)))
                        }
                        if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break
                    }
                }
                if (0 < e) return t / e / 1e6
            }
            return navigator.connection && (e = navigator.connection.downlink, typeof e == `number`) ? e : 5
        }
        var Rd = null,
            zd = null;

        function Bd(e) {
            return e.nodeType === 9 ? e : e.ownerDocument
        }

        function Vd(e) {
            switch (e) {
                case `http://www.w3.org/2000/svg`:
                    return 1;
                case `http://www.w3.org/1998/Math/MathML`:
                    return 2;
                default:
                    return 0
            }
        }

        function Hd(e, t) {
            if (e === 0) switch (t) {
                case `svg`:
                    return 1;
                case `math`:
                    return 2;
                default:
                    return 0
            }
            return e === 1 && t === `foreignObject` ? 0 : e
        }

        function Ud(e, t) {
            return e === `textarea` || e === `noscript` || typeof t.children == `string` || typeof t.children == `number` || typeof t.children == `bigint` || typeof t.dangerouslySetInnerHTML == `object` && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
        }
        var Wd = null;

        function Gd() {
            var e = window.event;
            return e && e.type === `popstate` ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1)
        }
        var Kd = typeof setTimeout == `function` ? setTimeout : void 0,
            qd = typeof clearTimeout == `function` ? clearTimeout : void 0,
            Jd = typeof Promise == `function` ? Promise : void 0,
            Yd = typeof queueMicrotask == `function` ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
                return Jd.resolve(null).then(e).catch(Xd)
            };

        function Xd(e) {
            setTimeout(function() {
                throw e
            })
        }

        function Zd(e) {
            return e === `head`
        }

        function Qd(e, t) {
            var n = t,
                r = 0;
            do {
                var i = n.nextSibling;
                if (e.removeChild(n), i && i.nodeType === 8)
                    if (n = i.data, n === `/$` || n === `/&`) {
                        if (r === 0) {
                            e.removeChild(i), Np(t);
                            return
                        }
                        r--
                    } else if (n === `$` || n === `$?` || n === `$~` || n === `$!` || n === `&`) r++;
                else if (n === `html`) pf(e.ownerDocument.documentElement);
                else if (n === `head`) {
                    n = e.ownerDocument.head, pf(n);
                    for (var a = n.firstChild; a;) {
                        var o = a.nextSibling,
                            s = a.nodeName;
                        a[pt] || s === `SCRIPT` || s === `STYLE` || s === `LINK` && a.rel.toLowerCase() === `stylesheet` || n.removeChild(a), a = o
                    }
                } else n === `body` && pf(e.ownerDocument.body);
                n = i
            } while (n);
            Np(t)
        }

        function $d(e, t) {
            var n = e;
            e = 0;
            do {
                var r = n.nextSibling;
                if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = `none`) : (n.style.display = n._stashedDisplay || ``, n.getAttribute(`style`) === `` && n.removeAttribute(`style`)) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = ``) : n.nodeValue = n._stashedText || ``), r && r.nodeType === 8)
                    if (n = r.data, n === `/$`) {
                        if (e === 0) break;
                        e--
                    } else n !== `$` && n !== `$?` && n !== `$~` && n !== `$!` || e++;
                n = r
            } while (n)
        }

        function ef(e) {
            var t = e.firstChild;
            for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
                var n = t;
                switch (t = t.nextSibling, n.nodeName) {
                    case `HTML`:
                    case `HEAD`:
                    case `BODY`:
                        ef(n), mt(n);
                        continue;
                    case `SCRIPT`:
                    case `STYLE`:
                        continue;
                    case `LINK`:
                        if (n.rel.toLowerCase() === `stylesheet`) continue
                }
                e.removeChild(n)
            }
        }

        function tf(e, t, n, r) {
            for (; e.nodeType === 1;) {
                var i = n;
                if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                    if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break
                } else if (!r)
                    if (t === `input` && e.type === `hidden`) {
                        var a = i.name == null ? null : `` + i.name;
                        if (i.type === `hidden` && e.getAttribute(`name`) === a) return e
                    } else return e;
                else if (!e[pt]) switch (t) {
                    case `meta`:
                        if (!e.hasAttribute(`itemprop`)) break;
                        return e;
                    case `link`:
                        if (a = e.getAttribute(`rel`), a === `stylesheet` && e.hasAttribute(`data-precedence`) || a !== i.rel || e.getAttribute(`href`) !== (i.href == null || i.href === `` ? null : i.href) || e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute(`title`) !== (i.title == null ? null : i.title)) break;
                        return e;
                    case `style`:
                        if (e.hasAttribute(`data-precedence`)) break;
                        return e;
                    case `script`:
                        if (a = e.getAttribute(`src`), (a !== (i.src == null ? null : i.src) || e.getAttribute(`type`) !== (i.type == null ? null : i.type) || e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute(`async`) && !e.hasAttribute(`itemprop`)) break;
                        return e;
                    default:
                        return e
                }
                if (e = cf(e.nextSibling), e === null) break
            }
            return null
        }

        function nf(e, t, n) {
            if (t === ``) return null;
            for (; e.nodeType !== 3;)
                if ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !n || (e = cf(e.nextSibling), e === null)) return null;
            return e
        }

        function rf(e, t) {
            for (; e.nodeType !== 8;)
                if ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !t || (e = cf(e.nextSibling), e === null)) return null;
            return e
        }

        function af(e) {
            return e.data === `$?` || e.data === `$~`
        }

        function of(e) {
            return e.data === `$!` || e.data === `$?` && e.ownerDocument.readyState !== `loading`
        }

        function sf(e, t) {
            var n = e.ownerDocument;
            if (e.data === `$~`) e._reactRetry = t;
            else if (e.data !== `$?` || n.readyState !== `loading`) t();
            else {
                var r = function() {
                    t(), n.removeEventListener(`DOMContentLoaded`, r)
                };
                n.addEventListener(`DOMContentLoaded`, r), e._reactRetry = r
            }
        }

        function cf(e) {
            for (; e != null; e = e.nextSibling) {
                var t = e.nodeType;
                if (t === 1 || t === 3) break;
                if (t === 8) {
                    if (t = e.data, t === `$` || t === `$!` || t === `$?` || t === `$~` || t === `&` || t === `F!` || t === `F`) break;
                    if (t === `/$` || t === `/&`) return null
                }
            }
            return e
        }
        var lf = null;

        function uf(e) {
            e = e.nextSibling;
            for (var t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === `/$` || n === `/&`) {
                        if (t === 0) return cf(e.nextSibling);
                        t--
                    } else n !== `$` && n !== `$!` && n !== `$?` && n !== `$~` && n !== `&` || t++
                }
                e = e.nextSibling
            }
            return null
        }

        function df(e) {
            e = e.previousSibling;
            for (var t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
                        if (t === 0) return e;
                        t--
                    } else n !== `/$` && n !== `/&` || t++
                }
                e = e.previousSibling
            }
            return null
        }

        function ff(e, t, n) {
            switch (t = Bd(n), e) {
                case `html`:
                    if (e = t.documentElement, !e) throw Error(s(452));
                    return e;
                case `head`:
                    if (e = t.head, !e) throw Error(s(453));
                    return e;
                case `body`:
                    if (e = t.body, !e) throw Error(s(454));
                    return e;
                default:
                    throw Error(s(451))
            }
        }

        function pf(e) {
            for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
            mt(e)
        }
        var mf = new Map,
            hf = new Set;

        function gf(e) {
            return typeof e.getRootNode == `function` ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
        }
        var _f = O.d;
        O.d = {
            f: vf,
            r: yf,
            D: Sf,
            C: Cf,
            L: wf,
            m: Tf,
            X: Df,
            S: Ef,
            M: Of
        };

        function vf() {
            var e = _f.f(),
                t = bu();
            return e || t
        }

        function yf(e) {
            var t = gt(e);
            t !== null && t.tag === 5 && t.type === `form` ? Es(t) : _f.r(e)
        }
        var bf = typeof document > `u` ? null : document;

        function xf(e, t, n) {
            var r = bf;
            if (r && typeof t == `string` && t) {
                var i = Rt(t);
                i = `link[rel="` + e + `"][href="` + i + `"]`, typeof n == `string` && (i += `[crossorigin="` + n + `"]`), hf.has(i) || (hf.add(i), e = {
                    rel: e,
                    crossOrigin: n,
                    href: t
                }, r.querySelector(i) === null && (t = r.createElement(`link`), Pd(t, `link`, e), yt(t), r.head.appendChild(t)))
            }
        }

        function Sf(e) {
            _f.D(e), xf(`dns-prefetch`, e, null)
        }

        function Cf(e, t) {
            _f.C(e, t), xf(`preconnect`, e, t)
        }

        function wf(e, t, n) {
            _f.L(e, t, n);
            var r = bf;
            if (r && e && t) {
                var i = `link[rel="preload"][as="` + Rt(t) + `"]`;
                t === `image` && n && n.imageSrcSet ? (i += `[imagesrcset="` + Rt(n.imageSrcSet) + `"]`, typeof n.imageSizes == `string` && (i += `[imagesizes="` + Rt(n.imageSizes) + `"]`)) : i += `[href="` + Rt(e) + `"]`;
                var a = i;
                switch (t) {
                    case `style`:
                        a = Af(e);
                        break;
                    case `script`:
                        a = Pf(e)
                }
                mf.has(a) || (e = h({
                    rel: `preload`,
                    href: t === `image` && n && n.imageSrcSet ? void 0 : e,
                    as: t
                }, n), mf.set(a, e), r.querySelector(i) !== null || t === `style` && r.querySelector(jf(a)) || t === `script` && r.querySelector(Ff(a)) || (t = r.createElement(`link`), Pd(t, `link`, e), yt(t), r.head.appendChild(t)))
            }
        }

        function Tf(e, t) {
            _f.m(e, t);
            var n = bf;
            if (n && e) {
                var r = t && typeof t.as == `string` ? t.as : `script`,
                    i = `link[rel="modulepreload"][as="` + Rt(r) + `"][href="` + Rt(e) + `"]`,
                    a = i;
                switch (r) {
                    case `audioworklet`:
                    case `paintworklet`:
                    case `serviceworker`:
                    case `sharedworker`:
                    case `worker`:
                    case `script`:
                        a = Pf(e)
                }
                if (!mf.has(a) && (e = h({
                        rel: `modulepreload`,
                        href: e
                    }, t), mf.set(a, e), n.querySelector(i) === null)) {
                    switch (r) {
                        case `audioworklet`:
                        case `paintworklet`:
                        case `serviceworker`:
                        case `sharedworker`:
                        case `worker`:
                        case `script`:
                            if (n.querySelector(Ff(a))) return
                    }
                    r = n.createElement(`link`), Pd(r, `link`, e), yt(r), n.head.appendChild(r)
                }
            }
        }

        function Ef(e, t, n) {
            _f.S(e, t, n);
            var r = bf;
            if (r && e) {
                var i = vt(r).hoistableStyles,
                    a = Af(e);
                t ||= `default`;
                var o = i.get(a);
                if (!o) {
                    var s = {
                        loading: 0,
                        preload: null
                    };
                    if (o = r.querySelector(jf(a))) s.loading = 5;
                    else {
                        e = h({
                            rel: `stylesheet`,
                            href: e,
                            "data-precedence": t
                        }, n), (n = mf.get(a)) && Rf(e, n);
                        var c = o = r.createElement(`link`);
                        yt(c), Pd(c, `link`, e), c._p = new Promise(function(e, t) {
                            c.onload = e, c.onerror = t
                        }), c.addEventListener(`load`, function() {
                            s.loading |= 1
                        }), c.addEventListener(`error`, function() {
                            s.loading |= 2
                        }), s.loading |= 4, Lf(o, t, r)
                    }
                    o = {
                        type: `stylesheet`,
                        instance: o,
                        count: 1,
                        state: s
                    }, i.set(a, o)
                }
            }
        }

        function Df(e, t) {
            _f.X(e, t);
            var n = bf;
            if (n && e) {
                var r = vt(n).hoistableScripts,
                    i = Pf(e),
                    a = r.get(i);
                a || (a = n.querySelector(Ff(i)), a || (e = h({
                    src: e,
                    async: !0
                }, t), (t = mf.get(i)) && zf(e, t), a = n.createElement(`script`), yt(a), Pd(a, `link`, e), n.head.appendChild(a)), a = {
                    type: `script`,
                    instance: a,
                    count: 1,
                    state: null
                }, r.set(i, a))
            }
        }

        function Of(e, t) {
            _f.M(e, t);
            var n = bf;
            if (n && e) {
                var r = vt(n).hoistableScripts,
                    i = Pf(e),
                    a = r.get(i);
                a || (a = n.querySelector(Ff(i)), a || (e = h({
                    src: e,
                    async: !0,
                    type: `module`
                }, t), (t = mf.get(i)) && zf(e, t), a = n.createElement(`script`), yt(a), Pd(a, `link`, e), n.head.appendChild(a)), a = {
                    type: `script`,
                    instance: a,
                    count: 1,
                    state: null
                }, r.set(i, a))
            }
        }

        function kf(e, t, n, r) {
            var i = (i = fe.current) ? gf(i) : null;
            if (!i) throw Error(s(446));
            switch (e) {
                case `meta`:
                case `title`:
                    return null;
                case `style`:
                    return typeof n.precedence == `string` && typeof n.href == `string` ? (t = Af(n.href), n = vt(i).hoistableStyles, r = n.get(t), r || (r = {
                        type: `style`,
                        instance: null,
                        count: 0,
                        state: null
                    }, n.set(t, r)), r) : {
                        type: `void`,
                        instance: null,
                        count: 0,
                        state: null
                    };
                case `link`:
                    if (n.rel === `stylesheet` && typeof n.href == `string` && typeof n.precedence == `string`) {
                        e = Af(n.href);
                        var a = vt(i).hoistableStyles,
                            o = a.get(e);
                        if (o || (i = i.ownerDocument || i, o = {
                                type: `stylesheet`,
                                instance: null,
                                count: 0,
                                state: {
                                    loading: 0,
                                    preload: null
                                }
                            }, a.set(e, o), (a = i.querySelector(jf(e))) && !a._p && (o.instance = a, o.state.loading = 5), mf.has(e) || (n = {
                                rel: `preload`,
                                as: `style`,
                                href: n.href,
                                crossOrigin: n.crossOrigin,
                                integrity: n.integrity,
                                media: n.media,
                                hrefLang: n.hrefLang,
                                referrerPolicy: n.referrerPolicy
                            }, mf.set(e, n), a || Nf(i, e, n, o.state))), t && r === null) throw Error(s(528, ``));
                        return o
                    }
                    if (t && r !== null) throw Error(s(529, ``));
                    return null;
                case `script`:
                    return t = n.async, n = n.src, typeof n == `string` && t && typeof t != `function` && typeof t != `symbol` ? (t = Pf(n), n = vt(i).hoistableScripts, r = n.get(t), r || (r = {
                        type: `script`,
                        instance: null,
                        count: 0,
                        state: null
                    }, n.set(t, r)), r) : {
                        type: `void`,
                        instance: null,
                        count: 0,
                        state: null
                    };
                default:
                    throw Error(s(444, e))
            }
        }

        function Af(e) {
            return `href="` + Rt(e) + `"`
        }

        function jf(e) {
            return `link[rel="stylesheet"][` + e + `]`
        }

        function Mf(e) {
            return h({}, e, {
                "data-precedence": e.precedence,
                precedence: null
            })
        }

        function Nf(e, t, n, r) {
            e.querySelector(`link[rel="preload"][as="style"][` + t + `]`) ? r.loading = 1 : (t = e.createElement(`link`), r.preload = t, t.addEventListener(`load`, function() {
                return r.loading |= 1
            }), t.addEventListener(`error`, function() {
                return r.loading |= 2
            }), Pd(t, `link`, n), yt(t), e.head.appendChild(t))
        }

        function Pf(e) {
            return `[src="` + Rt(e) + `"]`
        }

        function Ff(e) {
            return `script[async]` + e
        }

        function If(e, t, n) {
            if (t.count++, t.instance === null) switch (t.type) {
                case `style`:
                    var r = e.querySelector(`style[data-href~="` + Rt(n.href) + `"]`);
                    if (r) return t.instance = r, yt(r), r;
                    var i = h({}, n, {
                        "data-href": n.href,
                        "data-precedence": n.precedence,
                        href: null,
                        precedence: null
                    });
                    return r = (e.ownerDocument || e).createElement(`style`), yt(r), Pd(r, `style`, i), Lf(r, n.precedence, e), t.instance = r;
                case `stylesheet`:
                    i = Af(n.href);
                    var a = e.querySelector(jf(i));
                    if (a) return t.state.loading |= 4, t.instance = a, yt(a), a;
                    r = Mf(n), (i = mf.get(i)) && Rf(r, i), a = (e.ownerDocument || e).createElement(`link`), yt(a);
                    var o = a;
                    return o._p = new Promise(function(e, t) {
                        o.onload = e, o.onerror = t
                    }), Pd(a, `link`, r), t.state.loading |= 4, Lf(a, n.precedence, e), t.instance = a;
                case `script`:
                    return a = Pf(n.src), (i = e.querySelector(Ff(a))) ? (t.instance = i, yt(i), i) : (r = n, (i = mf.get(a)) && (r = h({}, n), zf(r, i)), e = e.ownerDocument || e, i = e.createElement(`script`), yt(i), Pd(i, `link`, r), e.head.appendChild(i), t.instance = i);
                case `void`:
                    return null;
                default:
                    throw Error(s(443, t.type))
            } else t.type === `stylesheet` && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
            return t.instance
        }

        function Lf(e, t, n) {
            for (var r = n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
                var s = r[o];
                if (s.dataset.precedence === t) a = s;
                else if (a !== i) break
            }
            a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild))
        }

        function Rf(e, t) {
            e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title
        }

        function zf(e, t) {
            e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity
        }
        var Bf = null;

        function Vf(e, t, n) {
            if (Bf === null) {
                var r = new Map,
                    i = Bf = new Map;
                i.set(n, r)
            } else i = Bf, r = i.get(n), r || (r = new Map, i.set(n, r));
            if (r.has(e)) return r;
            for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
                var a = n[i];
                if (!(a[pt] || a[st] || e === `link` && a.getAttribute(`rel`) === `stylesheet`) && a.namespaceURI !== `http://www.w3.org/2000/svg`) {
                    var o = a.getAttribute(t) || ``;
                    o = e + o;
                    var s = r.get(o);
                    s ? s.push(a) : r.set(o, [a])
                }
            }
            return r
        }

        function Hf(e, t, n) {
            e = e.ownerDocument || e, e.head.insertBefore(n, t === `title` ? e.querySelector(`head > title`) : null)
        }

        function Uf(e, t, n) {
            if (n === 1 || t.itemProp != null) return !1;
            switch (e) {
                case `meta`:
                case `title`:
                    return !0;
                case `style`:
                    if (typeof t.precedence != `string` || typeof t.href != `string` || t.href === ``) break;
                    return !0;
                case `link`:
                    if (typeof t.rel != `string` || typeof t.href != `string` || t.href === `` || t.onLoad || t.onError) break;
                    switch (t.rel) {
                        case `stylesheet`:
                            return e = t.disabled, typeof t.precedence == `string` && e == null;
                        default:
                            return !0
                    }
                case `script`:
                    if (t.async && typeof t.async != `function` && typeof t.async != `symbol` && !t.onLoad && !t.onError && t.src && typeof t.src == `string`) return !0
            }
            return !1
        }

        function Wf(e) {
            return !(e.type === `stylesheet` && !(e.state.loading & 3))
        }

        function Gf(e, t, n, r) {
            if (n.type === `stylesheet` && (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
                if (n.instance === null) {
                    var i = Af(r.href),
                        a = t.querySelector(jf(i));
                    if (a) {
                        t = a._p, typeof t == `object` && t && typeof t.then == `function` && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, yt(a);
                        return
                    }
                    a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement(`link`), yt(a);
                    var o = a;
                    o._p = new Promise(function(e, t) {
                        o.onload = e, o.onerror = t
                    }), Pd(a, `link`, r), n.instance = a
                }
                e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener(`load`, n), t.addEventListener(`error`, n))
            }
        }
        var Kf = 0;

        function qf(e, t) {
            return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
                var r = setTimeout(function() {
                    if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
                        var t = e.unsuspend;
                        e.unsuspend = null, t()
                    }
                }, 6e4 + t);
                0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
                var i = setTimeout(function() {
                    if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
                        var t = e.unsuspend;
                        e.unsuspend = null, t()
                    }
                }, (e.imgBytes > Kf ? 50 : 800) + t);
                return e.unsuspend = n,
                    function() {
                        e.unsuspend = null, clearTimeout(r), clearTimeout(i)
                    }
            } : null
        }

        function Jf() {
            if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
                if (this.stylesheets) Xf(this, this.stylesheets);
                else if (this.unsuspend) {
                    var e = this.unsuspend;
                    this.unsuspend = null, e()
                }
            }
        }
        var Yf = null;

        function Xf(e, t) {
            e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = new Map, t.forEach(Zf, e), Yf = null, Jf.call(e))
        }

        function Zf(e, t) {
            if (!(t.state.loading & 4)) {
                var n = Yf.get(e);
                if (n) var r = n.get(null);
                else {
                    n = new Map, Yf.set(e, n);
                    for (var i = e.querySelectorAll(`link[data-precedence],style[data-precedence]`), a = 0; a < i.length; a++) {
                        var o = i[a];
                        (o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) && (n.set(o.dataset.precedence, o), r = o)
                    }
                    r && n.set(null, r)
                }
                i = t.instance, o = i.getAttribute(`data-precedence`), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener(`load`, r), i.addEventListener(`error`, r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4
            }
        }
        var Qf = {
            $$typeof: S,
            Provider: null,
            Consumer: null,
            _currentValue: k,
            _currentValue2: k,
            _threadCount: 0
        };

        function $f(e, t, n, r, i, a, o, s, c) {
            this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = new Map
        }

        function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
            return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ci(3, null, null, t), e.current = a, a.stateNode = e, t = oa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
                element: r,
                isDehydrated: n,
                cache: t
            }, za(a), e
        }

        function tp(e) {
            return e ? (e = oi, e) : oi
        }

        function np(e, t, n, r, i, a) {
            i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Va(t), r.payload = {
                element: n
            }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ha(e, r, t), n !== null && (hu(n, e, t), Ua(n, e, t))
        }

        function rp(e, t) {
            if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
                var n = e.retryLane;
                e.retryLane = n !== 0 && n < t ? n : t
            }
        }

        function ip(e, t) {
            rp(e, t), (e = e.alternate) && rp(e, t)
        }

        function ap(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = ri(e, 67108864);
                t !== null && hu(t, e, 67108864), ip(e, 67108864)
            }
        }

        function op(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = pu();
                t = rt(t);
                var n = ri(e, t);
                n !== null && hu(n, e, t), ip(e, t)
            }
        }
        var sp = !0;

        function cp(e, t, n, r) {
            var i = D.T;
            D.T = null;
            var a = O.p;
            try {
                O.p = 2, up(e, t, n, r)
            } finally {
                O.p = a, D.T = i
            }
        }

        function lp(e, t, n, r) {
            var i = D.T;
            D.T = null;
            var a = O.p;
            try {
                O.p = 8, up(e, t, n, r)
            } finally {
                O.p = a, D.T = i
            }
        }

        function up(e, t, n, r) {
            if (sp) {
                var i = dp(r);
                if (i === null) wd(e, t, r, fp, n), Cp(e, r);
                else if (Tp(i, e, t, n, r)) r.stopPropagation();
                else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
                    for (; i !== null;) {
                        var a = gt(i);
                        if (a !== null) switch (a.tag) {
                            case 3:
                                if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
                                    var o = Ke(a.pendingLanes);
                                    if (o !== 0) {
                                        var s = a;
                                        for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
                                            var c = 1 << 31 - ze(o);
                                            s.entanglements[1] |= c, o &= ~c
                                        }
                                        rd(a), !(K & 6) && (tu = I() + 500, id(0, !1))
                                    }
                                }
                                break;
                            case 31:
                            case 13:
                                s = ri(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2)
                        }
                        if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
                        i = a
                    }
                    i !== null && r.stopPropagation()
                } else wd(e, t, r, null, n)
            }
        }

        function dp(e) {
            return e = tn(e), pp(e)
        }
        var fp = null;

        function pp(e) {
            if (fp = null, e = ht(e), e !== null) {
                var t = l(e);
                if (t === null) e = null;
                else {
                    var n = t.tag;
                    if (n === 13) {
                        if (e = u(t), e !== null) return e;
                        e = null
                    } else if (n === 31) {
                        if (e = d(t), e !== null) return e;
                        e = null
                    } else if (n === 3) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                        e = null
                    } else t !== e && (e = null)
                }
            }
            return fp = e, null
        }

        function mp(e) {
            switch (e) {
                case `beforetoggle`:
                case `cancel`:
                case `click`:
                case `close`:
                case `contextmenu`:
                case `copy`:
                case `cut`:
                case `auxclick`:
                case `dblclick`:
                case `dragend`:
                case `dragstart`:
                case `drop`:
                case `focusin`:
                case `focusout`:
                case `input`:
                case `invalid`:
                case `keydown`:
                case `keypress`:
                case `keyup`:
                case `mousedown`:
                case `mouseup`:
                case `paste`:
                case `pause`:
                case `play`:
                case `pointercancel`:
                case `pointerdown`:
                case `pointerup`:
                case `ratechange`:
                case `reset`:
                case `resize`:
                case `seeked`:
                case `submit`:
                case `toggle`:
                case `touchcancel`:
                case `touchend`:
                case `touchstart`:
                case `volumechange`:
                case `change`:
                case `selectionchange`:
                case `textInput`:
                case `compositionstart`:
                case `compositionend`:
                case `compositionupdate`:
                case `beforeblur`:
                case `afterblur`:
                case `beforeinput`:
                case `blur`:
                case `fullscreenchange`:
                case `focus`:
                case `hashchange`:
                case `popstate`:
                case `select`:
                case `selectstart`:
                    return 2;
                case `drag`:
                case `dragenter`:
                case `dragexit`:
                case `dragleave`:
                case `dragover`:
                case `mousemove`:
                case `mouseout`:
                case `mouseover`:
                case `pointermove`:
                case `pointerout`:
                case `pointerover`:
                case `scroll`:
                case `touchmove`:
                case `wheel`:
                case `mouseenter`:
                case `mouseleave`:
                case `pointerenter`:
                case `pointerleave`:
                    return 8;
                case `message`:
                    switch (Oe()) {
                        case ke:
                            return 2;
                        case Ae:
                            return 8;
                        case je:
                        case Me:
                            return 32;
                        case Ne:
                            return 268435456;
                        default:
                            return 32
                    }
                default:
                    return 32
            }
        }
        var hp = !1,
            gp = null,
            _p = null,
            vp = null,
            yp = new Map,
            bp = new Map,
            xp = [],
            Sp = `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);

        function Cp(e, t) {
            switch (e) {
                case `focusin`:
                case `focusout`:
                    gp = null;
                    break;
                case `dragenter`:
                case `dragleave`:
                    _p = null;
                    break;
                case `mouseover`:
                case `mouseout`:
                    vp = null;
                    break;
                case `pointerover`:
                case `pointerout`:
                    yp.delete(t.pointerId);
                    break;
                case `gotpointercapture`:
                case `lostpointercapture`:
                    bp.delete(t.pointerId)
            }
        }

        function wp(e, t, n, r, i, a) {
            return e === null || e.nativeEvent !== a ? (e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: a,
                targetContainers: [i]
            }, t !== null && (t = gt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
        }

        function Tp(e, t, n, r, i) {
            switch (t) {
                case `focusin`:
                    return gp = wp(gp, e, t, n, r, i), !0;
                case `dragenter`:
                    return _p = wp(_p, e, t, n, r, i), !0;
                case `mouseover`:
                    return vp = wp(vp, e, t, n, r, i), !0;
                case `pointerover`:
                    var a = i.pointerId;
                    return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
                case `gotpointercapture`:
                    return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0
            }
            return !1
        }

        function Ep(e) {
            var t = ht(e.target);
            if (t !== null) {
                var n = l(t);
                if (n !== null) {
                    if (t = n.tag, t === 13) {
                        if (t = u(n), t !== null) {
                            e.blockedOn = t, L(e.priority, function() {
                                op(n)
                            });
                            return
                        }
                    } else if (t === 31) {
                        if (t = d(n), t !== null) {
                            e.blockedOn = t, L(e.priority, function() {
                                op(n)
                            });
                            return
                        }
                    } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                        return
                    }
                }
            }
            e.blockedOn = null
        }

        function Dp(e) {
            if (e.blockedOn !== null) return !1;
            for (var t = e.targetContainers; 0 < t.length;) {
                var n = dp(e.nativeEvent);
                if (n === null) {
                    n = e.nativeEvent;
                    var r = new n.constructor(n.type, n);
                    en = r, n.target.dispatchEvent(r), en = null
                } else return t = gt(n), t !== null && ap(t), e.blockedOn = n, !1;
                t.shift()
            }
            return !0
        }

        function Op(e, t, n) {
            Dp(e) && n.delete(t)
        }

        function kp() {
            hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op)
        }

        function Ap(e, n) {
            e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)))
        }
        var jp = null;

        function Mp(e) {
            jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
                jp === e && (jp = null);
                for (var t = 0; t < e.length; t += 3) {
                    var n = e[t],
                        r = e[t + 1],
                        i = e[t + 2];
                    if (typeof r != `function`) {
                        if (pp(r || n) === null) continue;
                        break
                    }
                    var a = gt(n);
                    a !== null && (e.splice(t, 3), t -= 3, ws(a, {
                        pending: !0,
                        data: i,
                        method: n.method,
                        action: r
                    }, r, i))
                }
            }))
        }

        function Np(e) {
            function t(t) {
                return Ap(t, e)
            }
            gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
            for (var n = 0; n < xp.length; n++) {
                var r = xp[n];
                r.blockedOn === e && (r.blockedOn = null)
            }
            for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
            if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
                for (r = 0; r < n.length; r += 3) {
                    var i = n[r],
                        a = n[r + 1],
                        o = i[R] || null;
                    if (typeof a == `function`) o || Mp(n);
                    else if (o) {
                        var s = null;
                        if (a && a.hasAttribute(`formAction`)) {
                            if (i = a, o = a[R] || null) s = o.formAction;
                            else if (pp(i) !== null) continue
                        } else s = o.action;
                        typeof s == `function` ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n)
                    }
                }
        }

        function Pp() {
            function e(e) {
                e.canIntercept && e.info === `react-transition` && e.intercept({
                    handler: function() {
                        return new Promise(function(e) {
                            return i = e
                        })
                    },
                    focusReset: `manual`,
                    scroll: `manual`
                })
            }

            function t() {
                i !== null && (i(), i = null), r || setTimeout(n, 20)
            }

            function n() {
                if (!r && !navigation.transition) {
                    var e = navigation.currentEntry;
                    e && e.url != null && navigation.navigate(e.url, {
                        state: e.getState(),
                        info: `react-transition`,
                        history: `replace`
                    })
                }
            }
            if (typeof navigation == `object`) {
                var r = !1,
                    i = null;
                return navigation.addEventListener(`navigate`, e), navigation.addEventListener(`navigatesuccess`, t), navigation.addEventListener(`navigateerror`, t), setTimeout(n, 100),
                    function() {
                        r = !0, navigation.removeEventListener(`navigate`, e), navigation.removeEventListener(`navigatesuccess`, t), navigation.removeEventListener(`navigateerror`, t), i !== null && (i(), i = null)
                    }
            }
        }

        function Fp(e) {
            this._internalRoot = e
        }
        Ip.prototype.render = Fp.prototype.render = function(e) {
            var t = this._internalRoot;
            if (t === null) throw Error(s(409));
            var n = t.current;
            np(n, pu(), e, t, null, null)
        }, Ip.prototype.unmount = Fp.prototype.unmount = function() {
            var e = this._internalRoot;
            if (e !== null) {
                this._internalRoot = null;
                var t = e.containerInfo;
                np(e.current, 2, null, e, null, null), bu(), t[ct] = null
            }
        };

        function Ip(e) {
            this._internalRoot = e
        }
        Ip.prototype.unstable_scheduleHydration = function(e) {
            if (e) {
                var t = at();
                e = {
                    blockedOn: null,
                    target: e,
                    priority: t
                };
                for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
                xp.splice(n, 0, e), n === 0 && Ep(e)
            }
        };
        var Lp = r.version;
        if (Lp !== `19.2.8`) throw Error(s(527, Lp, `19.2.8`));
        O.findDOMNode = function(e) {
            var t = e._reactInternals;
            if (t === void 0) throw typeof e.render == `function` ? Error(s(188)) : (e = Object.keys(e).join(`,`), Error(s(268, e)));
            return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e
        };
        var Rp = {
            bundleType: 0,
            version: `19.2.8`,
            rendererPackageName: `react-dom`,
            currentDispatcherRef: D,
            reconcilerVersion: `19.2.8`
        };
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
            var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (!zp.isDisabled && zp.supportsFiber) try {
                Ie = zp.inject(Rp), Le = zp
            } catch {}
        }
        e.createRoot = function(e, t) {
            if (!c(e)) throw Error(s(299));
            var n = !1,
                r = ``,
                i = qs,
                a = Js,
                o = Ys;
            return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, i, a, o, Pp), e[ct] = t.current, Sd(e), new Fp(t)
        }
    })),
    c = e(((e, t) => {
        function n() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (e) {
                console.error(e)
            }
        }
        n(), t.exports = s()
    })),
    l = n(),
    u = c(),
    d = (e, t, n) => Math.min(Math.max(e, t), n),
    f = e => e * e * (3 - 2 * e),
    p = e => e * e * e * (e * (e * 6 - 15) + 10),
    m = e => 1 - (1 - e) ** 4,
    h = e => .5 - Math.sin(Math.asin(1 - 2 * d(e, 0, 1)) / 3),
    g = (e, t) => {
        if (t <= 1.001) return e;
        let n = e ** +t;
        return n / (n + (1 - e) ** t)
    },
    _ = [{
        n: `smooth`,
        f: e => e * e * (3 - 2 * e)
    }, {
        n: `smoother`,
        f: e => e * e * e * (e * (e * 6 - 15) + 10)
    }, {
        n: `out-quart`,
        f: e => 1 - (1 - e) ** 4
    }, {
        n: `out-expo`,
        f: e => e >= 1 ? 1 : 1 - 2 ** (-9 * e)
    }, {
        n: `out-back`,
        f: e => {
            let t = 1 - e;
            return 1 - t * t * t * (2.7 * t - 1.7)
        }
    }, {
        n: `in-out`,
        f: e => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2
    }, {
        n: `linear`,
        f: e => e
    }],
    v = {
        plan: 0,
        p: 0,
        g: 0,
        off: 0,
        lockEnd: 0,
        push: 0,
        burn: 0,
        coda: 0,
        end: 0,
        ink: 0,
        pan: 0
    };
window.__READOUT = v;
var y = {
        x: 0
    },
    b = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0
    };

function x() {
    addEventListener(`pointermove`, e => {
        b.tx = (e.clientX / innerWidth - .5) * 2, b.ty = (e.clientY / innerHeight - .5) * 2
    }, {
        passive: !0
    })
}
var ee = {
        lit: !1
    },
    S = {
        t0: -1
    },
    C = matchMedia(`(prefers-reduced-motion: reduce)`).matches,
    te = matchMedia(`(pointer: coarse)`).matches,
    w = [{
        id: `signal`,
        src: `/films/signal.mp4`,
        poster: `/films/signal-poster.jpg`,
        origin: [.707, .926],
        pos: [.72, .72, 1],
        bridge: `v28`
    }, {
        id: `colossus`,
        src: `/films/colossus.mp4`,
        poster: `/films/colossus-poster.jpg`,
        origin: [.732, .54],
        pos: [.72, .6, 1],
        bridge: `v51`
    }, {
        id: `reveal`,
        src: `/films/reveal.mp4`,
        poster: `/films/reveal-poster.jpg`,
        origin: [.84, .63],
        pos: [.72, .62, 1],
        bridge: `v61`
    }],
    T = 1200 / 5350,
    E = 600 / 5350,
    ne = 300 / 5350,
    re = 900 / 5350,
    ie = 300 / 5350,
    ae = 600 / 5350,
    oe = 500 / 5350,
    se = 250 / 5350,
    ce = 700 / 5350,
    D = .04,
    O = .76,
    k = {
        at: .775,
        len: .14,
        x: .48,
        y: .57,
        ax: 2.35,
        ay: 1.1,
        noise: .295,
        grain: .125,
        dither: .052,
        hash: .15,
        char: 0,
        charW: .31,
        glowW: .0104,
        glowH: 5,
        split: .4,
        e0: -.16,
        e1: 1.3,
        fx: 1,
        fxAt: 0,
        fxLen: .75,
        zoom: 0,
        zoomPan: .34,
        zoomAt: .25,
        shape: 1,
        dx: 20,
        dy: 75,
        seam: .85,
        seamW: .2,
        seamH: .62,
        seamSoft: .055,
        reelZ: .6,
        zAt: .8,
        zLin: .38
    },
    A = {
        over: .1,
        len: .105,
        w: 6.45,
        h: 15.7,
        hold: .45,
        fade: .55,
        ret: .26,
        retLen: .82,
        e: 0,
        auto: 0,
        lead: -.04,
        ease: 2.25
    },
    le = {
        x: .48,
        y: .57
    },
    ue = {
        driftX: .03,
        driftY: -.018,
        mblur: .012,
        edgeBl: .01,
        edgeAt: .55
    },
    j = {
        zoom: 2,
        at: .59,
        lin: .96,
        spin: .13,
        part: .05,
        lag: .58
    },
    M = () => {
        let e = A.w / 100 * k.ax,
            t = A.h / 100 * k.ay;
        return d(((k.shape === 2 ? e + t : k.shape === 0 ? Math.hypot(e, t) : k.shape === 3 ? (e ** 4 + t ** 4) ** .25 : Math.max(e, t)) - k.e0) / Math.max(1e-4, k.e1 - k.e0), 0, 1)
    },
    N = {
        speed: 2.6,
        drift: 1.65,
        jiggle: 2.25,
        scale: 2.6,
        depth: .085,
        breathe: 2.5,
        rake: .35,
        cycle: 1.85,
        pulp: .115,
        fibre: .055,
        tooth: .038,
        fleck: .55,
        lag: .055,
        lagD: .16,
        smear: .3,
        keyX: .255,
        keyY: .5,
        keyS: .46,
        zoom: 1,
        panX: 0,
        panY: 0,
        r: 226,
        g: 208,
        b: 177
    },
    de = {
        noise: .06,
        grain: .17,
        dither: .01,
        hash: .1,
        charW: .055,
        charBack: 1.5,
        char: .62,
        glowW: .01
    },
    fe = 420 / 5350,
    pe = 1.26,
    me = [.4, .3],
    he = .425,
    ge = .72,
    _e = 420 * 1 / 900,
    ve = .45,
    ye = .12,
    be = e => e < .45 ? e / ve * ye : ye + (e - ve) / (1 - ve) * (1 - ye),
    xe = .1,
    Se = .42,
    P = 1.62,
    Ce = .26,
    we = .24,
    F = .62,
    Te = [
        [`What does it cost to work with Pear?`, `The cost`, `Nothing upfront and nothing hourly. We fund the strategy, the software, the content and the link building ourselves. Our payment is an agreed percentage of the new revenue that work generates. If your revenue doesn’t grow, you owe us nothing.`],
        [`What share of the revenue do you take?`, `The share`, `It’s agreed per partnership before we start, and depends on how much building the opportunity needs. It applies only to growth above your existing baseline, never to the revenue you already had.`],
        [`Why revenue share instead of fees?`, `The model`, `Because hourly billing pays agencies for effort, not results. An agency on a retainer earns the same whether you grow or not. We removed the retainer, so the only way for us to get paid is to grow your revenue.`],
        [`How do you measure the revenue you create?`, `Measurement`, `Before we begin, we agree on a baseline from your existing numbers and on how new organic revenue is attributed: analytics, order data or bookings, depending on your business. Both sides see the same dashboard.`],
        [`How long before it pays off?`, `The timeline`, `Search compounds slowly, then quickly. Software and technical fixes land in weeks; rankings and revenue typically move within months. The model means the waiting costs you nothing: we’re the ones financing the ramp.`]
    ],
    Ee = [
        [.26, .534],
        [.709, .354],
        [.259, .907],
        [.718, .815],
        [.27, .236]
    ],
    De = [1920, 1080],
    I = {
        at: .69,
        span: .3,
        stagger: .18,
        each: .34,
        blur: 9.5,
        fill: .1,
        rim: .41,
        bev: 2.5,
        bev2: .35,
        spec: .4,
        sat: 1.1,
        px: -8,
        py: -128,
        scale: .95,
        hold: .35,
        run: .65,
        ease: 0,
        rx: 6,
        ry: 9,
        rz: 1.6,
        rxIn: 9,
        ryIn: 22,
        rzIn: 4,
        persp: 1700,
        ins: .475,
        insB: 6,
        insY: 1,
        pop: 64,
        push: 26,
        bgScale: 1,
        bgX: 0,
        bgY: 50
    },
    Oe = [
        [`name`, `Your name`, `text`, 452, 148, 236, 62, `M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20a7.5 7.5 0 0115 0`],
        [`email`, `Work email`, `email`, 712, 148, 236, 62, `M2.5 6.5h19v11h-19zM2.5 7l9.5 6.5L21.5 7`],
        [`grow`, `What do you want to grow?`, `area`, 452, 226, 496, 226, `M3 5.5h18v11H9l-5 4v-4H3z`]
    ],
    ke = [
        [.3802, .1662, 2],
        [.6047, .1131, 2],
        [.434, .4782, 1],
        [.3876, .3921, 1],
        [.3392, .5292, 1],
        [.2582, .256, 1],
        [.4235, .3413, 1],
        [.7883, .2255, 1],
        [.5515, .2254, 1],
        [.4043, .2556, 1],
        [.5566, .1053, 1],
        [.6594, .2556, 1],
        [.7957, .1049, 1],
        [.491, .3812, 1],
        [.8971, .2551, 1],
        [.7497, .5906, 1],
        [.5081, .5907, 1]
    ],
    Ae = [
        [.56, .36, .18, .105, -14],
        [.545, .395, .245, .15, 9],
        [.59, .345, .135, .195, -32]
    ],
    je = .62,
    Me = (() => {
        let e = fe * pe,
            t = [
                [D * T, D * T],
                [(O - D) * T, .19149532710280373],
                [(1 - O) * T, (1 - O) * T],
                [E, E],
                [ne, ne],
                [e, e - .008],
                [.12538317757009346, .11438317757009346],
                [ae, ae - .003],
                [oe, oe - .008],
                [se, se],
                [je * ce, je * ce]
            ],
            n = [
                [(.8 - je) * ce, .005],
                [.2 * ce, .012]
            ],
            r = .983 / t.reduce((e, t) => e + t[1], 0),
            i = [
                [0, 0]
            ],
            a = 0,
            o = 0;
        for (let [e, n] of t) o += e, a += n * r, i.push([a, o]);
        for (let [e, t] of n) o += e, a += t, i.push([a, o]);
        return i[i.length - 1] = [1, 1], i
    })();

function Ne(e, t) {
    if (!t) return e;
    for (let t = 1; t < Me.length; t++)
        if (e <= Me[t][0]) return Me[t - 1][1] + (e - Me[t - 1][0]) * (Me[t][1] - Me[t - 1][1]) / (Me[t][0] - Me[t - 1][0]);
    return 1
}

function Pe(e, t) {
    if (!t) return e;
    for (let t = 1; t < Me.length; t++)
        if (e <= Me[t][1]) return Me[t - 1][0] + (e - Me[t - 1][1]) * (Me[t][0] - Me[t - 1][0]) / (Me[t][1] - Me[t - 1][1]);
    return 1
}
var Fe = {
        mode: 1,
        at: .74,
        span: .18,
        noise: 74,
        scaleB: 1.018,
        radius: .9,
        width: .35
    },
    Ie = [0, 1, 4, 9, 10],
    Le = [.955, .757, .714, .533, .515],
    Re = [`At your service`, `Custom software`, `Search and links`, `Revenue share`],
    ze = 23.7,
    Be = 85.6,
    Ve = 1450,
    He = {
        v28: 100,
        v51: 85,
        v61: 90
    },
    Ue = {
        x: 0,
        from: 0,
        ramp: .12
    },
    We = {
        x: 0,
        y: 0,
        z: 1
    },
    Ge = {
        x: 5,
        y: -440,
        z: 2.5,
        at: 0,
        span: 1
    },
    Ke = {
        x: .5,
        y: .735,
        s: .78,
        join: .655
    },
    qe = 1.45,
    Je = .718,
    Ye = {
        x: 20,
        from: 0,
        span: 1
    },
    Xe = {
        at: .12,
        span: .6
    },
    Ze = {
        w: .905,
        x: 0,
        y: 0
    },
    Qe = {
        k: 3
    },
    $e = [0, .3, .6],
    et = 1328,
    tt = 3515,
    nt = [0, 1180, 2050],
    rt = tt / 34,
    it = (new URLSearchParams(location.search).get(`hero`) || ``).toLowerCase(),
    at = w.find(e => e.id === it) || w[Math.floor(Math.random() * w.length)],
    L = {
        target: scrollY,
        current: scrollY,
        velocity: 0,
        on: !C && !te
    },
    ot = -1,
    st = e => {
        ot = e
    },
    R = () => document.documentElement.scrollHeight - innerHeight;

function ct() {
    ut(), lt(), L.on && (addEventListener(`wheel`, e => {
        if (e.ctrlKey) return;
        e.preventDefault();
        let t = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
        L.target = d(L.target + e.deltaY * t, 0, R())
    }, {
        passive: !1
    }), addEventListener(`keydown`, e => {
        let t = e.target;
        if (t && (t.isContentEditable || t.tagName === `INPUT` || t.tagName === `TEXTAREA` || t.tagName === `SELECT`)) return;
        let n = {
            ArrowDown: 90,
            ArrowUp: -90,
            PageDown: innerHeight * .9,
            PageUp: -innerHeight * .9,
            " ": innerHeight * .9,
            Home: -1e7,
            End: 1e7
        } [e.key];
        n !== void 0 && (e.preventDefault(), L.target = d(L.target + n, 0, R()))
    }), addEventListener(`scroll`, () => {
        Math.abs(scrollY - ot) > 2 && (L.target = L.current = scrollY)
    }, {
        passive: !0
    }))
}

function lt() {
    for (let e of document.querySelectorAll(`.ov .apply, .ov .cta`)) e.addEventListener(`click`, e => {
        e.preventDefault();
        let t = d(Pe(1 - ce - se * .7, innerWidth <= 720) * R(), 0, R());
        st(t), scrollTo(0, t), L.target = L.current = t
    })
}

function ut() {
    let e = document.querySelector(`.ov .menu`),
        t = document.getElementById(`nvm`);
    if (!e || !t) return;
    let n = !1;

    function r(r) {
        n = r, document.body.classList.toggle(`nav-open`, r), t.setAttribute(`aria-hidden`, r ? `false` : `true`), e.setAttribute(`aria-expanded`, r ? `true` : `false`), e.setAttribute(`aria-label`, r ? `Close` : `Menu`), t.style.pointerEvents = r ? `auto` : `none`, document.documentElement.style.overflow = r ? `hidden` : ``, r && (L.target = L.current);
        let i = document.querySelector(`.nvs`),
            a = (e, t, n) => e && e.style.setProperty(t, n, `important`);
        a(i, `opacity`, r ? `1` : `0`), a(t, `opacity`, r ? `1` : `0`), a(t, `visibility`, r ? `visible` : `hidden`), t.querySelectorAll(`a`).forEach((e, t) => {
            e.style.transitionDelay = r ? (.05 + t * .07).toFixed(2) + `s` : `0s`, a(e, `opacity`, r ? `1` : `0`)
        })
    }
    r(!1), e.addEventListener(`click`, e => {
        e.preventDefault(), r(!n)
    }), addEventListener(`keydown`, e => {
        e.key === `Escape` && n ? r(!1) : n && /^(Arrow|Page|Home|End|Space| )/.test(e.key) && e.preventDefault()
    });
    let i = e => {
        n && (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), L.target = L.current)
    };
    addEventListener(`wheel`, i, {
        passive: !1,
        capture: !0
    }), addEventListener(`touchmove`, i, {
        passive: !1,
        capture: !0
    }), t.addEventListener(`click`, e => {
        e.target === t && r(!1)
    });
    for (let e of t.querySelectorAll(`a`)) e.addEventListener(`click`, t => {
        t.preventDefault(), L.target = d(parseFloat(e.dataset.at || `0`) * R(), 0, R()), L.on || (st(L.target), scrollTo(0, L.target), L.current = L.target), r(!1)
    })
}
var dt = 8,
    ft = [],
    pt = 0,
    mt = [];

function ht(e) {
    ft.push(e), gt()
}

function gt() {
    for (let e = 0; pt < dt && e < ft.length;) {
        let t = ft.shift(),
            n = t.hot && t.hot() ? 2 : 1,
            r = 0;
        for (let e = 0; e < n && pt < dt; e++) {
            let e = t();
            if (!e) break;
            r++, pt++, e(() => {
                pt--, gt()
            })
        }
        ft.push(t), r ? e = 0 : e++
    }
}
var _t = .1,
    vt = [];

function yt(e) {
    for (let t = vt.length - 1; t >= 0; t--) e >= vt[t].from && e <= vt[t].to && ht(vt.splice(t, 1)[0].feed)
}

function bt(e, t, n) {
    vt.push({
        from: Math.max(0, e - _t),
        to: Math.min(1, t) + _t,
        feed: n
    })
}
var xt = 24;

function St({
    order: e,
    count: t,
    url: n,
    land: r,
    want: i
}) {
    let a = new Uint8Array(t),
        o = new Uint8Array(t),
        s = 0;
    return () => {
        let c = -1,
            l = i();
        if (l >= 0) {
            scan: for (let e = 0; e <= xt && c < 0; e++)
                for (let n of e ? [l + e, l - e] : [l])
                    if (n >= 0 && n < t && !a[n]) {
                        c = n;
                        break scan
                    }
        }
        for (; c < 0 && s < e.length;) {
            let t = e[s++];
            a[t] || (c = t)
        }
        return c < 0 ? null : (a[c] = 1, t => {
            let i = new Image;
            i.decoding = `async`, i.onload = () => {
                r(c, i), t()
            }, i.onerror = i.onabort = () => {
                ++o[c] < 3 && (a[c] = 0, e.push(c)), t()
            }, i.src = n(c)
        })
    }
}

function Ct(e, t = 0) {
    let n = [],
        r = new Set;
    for (let i = 32; i >= 1; i >>= 1)
        for (let a = 0; a < e; a += i) {
            let e = t + a;
            r.has(e) || (r.add(e), n.push(e))
        }
    return n
}

function wt(e, t, n = 2, r = 0, i = 1) {
    let a = matchMedia(`(max-width: 820px)`).matches ? `/768` : ``,
        o = {
            imgs: [],
            ready: !1,
            loaded: 0
        },
        s = -1,
        c = 0;
    mt.push({
        name: e.replace(`/films/`, ``),
        seq: o,
        count: t
    });
    let l = St({
        order: Ct(t),
        count: t,
        url: t => `${e}${a}/f_${String(t+1).padStart(3,`0`)}.webp?r=13`,
        land: (e, t) => {
            o.imgs[e] = t, ++o.loaded > n && (o.ready = !0)
        },
        want: () => s
    });
    return l.hot = () => c && performance.now() - c < 500, bt(r, i, l), o.aim = e => {
        c = performance.now(), e !== s && (s = e, Et(o.imgs, e, t))
    }, o.near = e => {
        o.aim(e);
        for (let n = 0; n < t; n++) {
            let t = o.imgs[e - n],
                r = o.imgs[e + n];
            if (t && t.naturalWidth) return t;
            if (r && r.naturalWidth) return r
        }
        return null
    }, o
}
var Tt = new URLSearchParams(location.search).has(`nowarm`);

function Et(e, t, n) {
    if (!Tt)
        for (let r = 1; r <= 3; r++)
            for (let i of [t + r, t - r]) {
                let t = i >= 0 && i < n && e[i];
                t && t.decode && t.decode().catch(() => {})
            }
}

function Dt(e, t, n = 1) {
    let r = [{
            name: e,
            count: 121
        }, {
            name: `renaissance`,
            count: 362
        }],
        i = {
            N: r.reduce((e, t) => e + t.count, 0),
            frames: [],
            loaded: 0
        },
        a = -1,
        o = 0;
    mt.push({
        name: `reel`,
        seq: i,
        get count() {
            return i.N
        }
    });
    let s = e => {
        for (let n of r) {
            if (e < n.count) return `/films/model/${n.name}/${t}/f_${String(e+1).padStart(3,`0`)}.webp?r=13`;
            e -= n.count
        }
        return ``
    };

    function c() {
        i.N = r.reduce((e, t) => e + t.count, 0), i.frames = Array(i.N);
        let e = [],
            t = 0;
        for (let n of r) e = e.concat(Ct(n.count, t)), t += n.count;
        let c = St({
            order: e,
            count: i.N,
            url: s,
            land: (e, t) => {
                let n = () => {
                    i.frames[e] = t, i.loaded++
                };
                t.decode ? t.decode().then(n, n) : n()
            },
            want: () => a
        });
        c.hot = () => o && performance.now() - o < 500, bt(.10010000000000001, n, c)
    }
    return Promise.all(r.map(e => fetch(`/films/model/${e.name}/manifest.json?r=13`).then(e => e.json()).then(n => {
        e.count = n.tiers[t].count
    }).catch(() => {}))).then(c), i.aim = e => {
        o = performance.now(), e !== a && (a = e, Et(i.frames, e, i.N))
    }, i.frameNear = e => {
        i.aim(e);
        for (let t = 0; t < i.N; t++) {
            if (i.frames[e + t]) return i.frames[e + t];
            if (i.frames[e - t]) return i.frames[e - t]
        }
        return null
    }, i
}
var Ot = `attribute vec2 aPos; varying vec2 vUv;
    void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`,
    kt = (e, t) => (e ? `#extension GL_OES_standard_derivatives : enable
#define AAW(e) (fwidth(e) * 10.0)
` : `#define AAW(e) 0.006
`) + (t ? `#define PHONE 1
` : ``) + `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D uA, uB;          // the film, the reel
    uniform vec2  uRes, uResA, uResB;
    uniform float uPanPx;   // the hero framing: how far the film is slid
    uniform float uPanY;    // and up or down
    uniform float uZoom;    // and how hard it is pushed in
    uniform float uT;                  // transition progress, 0..1
    uniform float uTime;
    uniform int   uMode;
    uniform float uDot, uBlk, uScale, uAsc, uHeat;
    uniform int   uMode2;   // the treatment that follows the ring
    uniform float uT2;      // its own strength, 0..1, windowed on the CPU
    uniform sampler2D uC;   // the plate the reel finally burns into
    uniform sampler2D uE;   // and the film that closes it out
    /* The papyrus is 4:3 into a portrait frame, so cover() shows barely a
       third of its width and it lands far bigger than the pillar it cuts
       from. Its own zoom and centre, so the framing can be matched to the
       plate by eye. Phone only; 1 and 0 leave it exactly as it was. */
    uniform float uZoomE;
    uniform float uPanEY;   // and its vertical centre
    /* The plate's own framing, phone only: xy in screen px, z a scale about
       the centre. 0,0,1 is the width fit it has always had. */
    uniform vec3 uPlateFit;
    uniform float uPanE;
    uniform vec2  uResE;
    uniform float uCoda;    // how far the closing film has taken the frame
    uniform float uScrim;   // the renaissance scrim's presence, baked in
    uniform float uFlat;    // and how far flat colour has taken the film
    uniform sampler2D uG;   // what the closing burn opens onto
    uniform vec2  uResG;
    // the grafting film's own horizontal centre, on top of the page's pan.
    // It reaches this one sampler, so nothing before it can be shifted.
    uniform float uPanG;
    uniform vec3  uPaperC;  // the sheet's own colour
    uniform vec4  uRay1;    // speed, drift, jiggle, scale
    uniform vec4  uRay2;    // depth, breathe, rake, contrast swing
    uniform vec4  uPap;     // the sheet itself: pulp, fibre, tooth, flecks
    uniform sampler2D uP;   // the plate: the pear drawn in plan
    uniform vec2  uResP;
    uniform vec4  uPlan3;   // x zoom inside the cutout, yz pan inside it
    uniform vec4  uPlan;    // how far it has drawn back, and to where
    uniform vec4  uPlan2;   // and how far it has opened from the middle
    uniform vec3  uDrag;    // how far the world behind lags, over what
                            // depth, and how hard the sheet drags off
    uniform float uEnd;     // and how far the closing burn has eaten it
    uniform vec4  uEndF;    // its fields: torn lobes, fray, ordered, random
    uniform vec4  uEndC;    // char width, how far back it reaches, its
                            // strength, and the ember's width
    uniform vec2  uResC;
    uniform float uBurn;    // 0..1 across the last stretch of the stage
    uniform float uBurnX;   // the seam's axis — the pear's own split
    uniform float uPan;     // the plate is taller than the frame; this pans it
    uniform float uBurnY;   // where on that axis the halves part
    uniform vec2  uBurnAB;  // anisotropy: how fast the front crosses x, y
    uniform vec4  uBurnFld; // noise, grain, dither, hash
    uniform vec4  uBurnChr; // char amount, char width, glow width, glow heat
    uniform float uSplit;   // how far the two halves are drawn apart
    uniform float uReelZ;   // the outgoing frame pushes in as the tear opens
    uniform float uSeam;    // the beige mass that hides the mirrored join
    uniform float uSeamSoft;// how wide the parting ramps through zero
    uniform vec2  uDrift;   // where the push-in's point slides to
    uniform float uMBlur;   // smear along the escape
    uniform float uSpin;    // the roll the frame takes on the way in
    uniform float uEdgeBl;  // and the softening at the edges
    uniform vec2  uSeamWH;  // its reach across and up
    uniform vec3  uSeamCol; // and what colour it is
    uniform vec2  uBurnE;   // the opening's reach: edge at 0, edge at 1
    uniform float uPlateZ;  // the plate's own zoom — you arrive into it
    uniform int   uShape;   // how distance is measured, i.e. the tear's shape
    uniform vec2  uOrigin;             // the pear, in the film's own frame
    uniform float uGlow;               // how much light the ring's crest carries

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
    // the classic recursive Bayer trick: a 2x2 threshold nested into a 4x4
    float bayer2(vec2 a){ a = floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
    float bayer4(vec2 a){ return bayer2(0.5*a)*0.25 + bayer2(a); }
    float vnoise(vec2 p){
      vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
                 mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
    }
    float fbm(vec2 p){ float v=0.0, a=0.5;
      for(int i=0;i<4;i++){ v += a*vnoise(p); p *= 2.03; a *= 0.5; }
      return v / 0.9375; }
    /* The texture octaves, priced for the screen. The paper's pulp, the
       sheet's torn edges and the closing burn's lobes read at two octaves
       on a phone exactly as they do at four — the finer pair lives below
       one device pixel there — and the difference is half the noise cost
       of the page's heaviest chapters. Fields that shape MOTION (the ring,
       the tear) keep all four everywhere. */
    #ifdef PHONE
    float fbmQ(vec2 p){ float v=0.0, a=0.5;
      for(int i=0;i<2;i++){ v += a*vnoise(p); p *= 2.03; a *= 0.5; }
      return v / 0.75; }
    #else
    float fbmQ(vec2 p){ return fbm(p); }
    #endif

    /* A 5×5 bitmap font, drawn straight out of arithmetic — no atlas.
       Each glyph is five 5-bit rows (bit 0 = leftmost), so every constant
       stays tiny and exact even at mediump; a single 25-bit mask would
       not survive a float. Ordered lightest to heaviest:
       ' '  .  :  -  +  =  *  %  #  @                                   */
    void glyphRows(float i, out float r0, out float r1, out float r2, out float r3, out float r4){
      r0=0.0; r1=0.0; r2=0.0; r3=0.0; r4=0.0;
      if      (i < 0.5) { }
      else if (i < 1.5) {                     r3= 4.0;           }
      else if (i < 2.5) {           r1= 4.0;  r3= 4.0;           }
      else if (i < 3.5) {                     r2=14.0;           }
      else if (i < 4.5) {           r1= 4.0;  r2=14.0; r3= 4.0;  }
      else if (i < 5.5) {           r1=14.0;           r3=14.0;  }
      else if (i < 6.5) { r0= 4.0;  r1=21.0;  r2=14.0; r3=21.0; r4= 4.0; }
      else if (i < 7.5) { r0=19.0;  r1=11.0;  r2= 4.0; r3=26.0; r4=25.0; }
      else if (i < 8.5) { r0=10.0;  r1=31.0;  r2=10.0; r3=31.0; r4=10.0; }
      else              { r0=31.0;  r1=29.0;  r2=27.0; r3=23.0; r4=31.0; }
    }
    // p is the position inside one cell, -0.5..0.5; returns 1 where there is ink
    float glyph(float i, vec2 p){
      p = floor(p*vec2(5.0, -5.0) + 2.5);
      if (p.x < 0.0 || p.x > 4.0 || p.y < 0.0 || p.y > 4.0) return 0.0;
      float r0,r1,r2,r3,r4; glyphRows(i, r0,r1,r2,r3,r4);
      float r = p.y < 0.5 ? r0 : p.y < 1.5 ? r1 : p.y < 2.5 ? r2 : p.y < 3.5 ? r3 : r4;
      return mod(floor(r / exp2(p.x)), 2.0);
    }

    /* cover-fit, so a 16:9 source fills any viewport the same way. The pan
       is passed in rather than read off uPanPx, so one shot can be framed
       on its own — the grafting film wants a different centre from the
       hero, and nothing else may move when it is retuned. */
    vec2 coverFit(vec2 uv, vec2 tex, float panPx, float zoom){
      float ca = uRes.x/uRes.y, ia = tex.x/tex.y;
      if (ca > ia) {
        uv.y = (uv.y-0.5)*(ia/ca)/zoom+0.5;
        uv.x = (uv.x-0.5)/zoom+0.5;
        uv.x += panPx / uRes.x;
        uv.y += (uPanY / uRes.y) * (ia/ca);
      } else {
        /* The frame is taller than the film, so the fit is by height and
           the crop is off the sides — which is what a phone wants. The pan
           then chooses which part of that width to keep: the key action
           sits right of centre, so the picture is pushed left to bring it
           in. Zero on the desktop, so the fit there is untouched. */
        float k = (ca/ia)/zoom;
        uv.x = (uv.x-0.5)*k+0.5;
        uv.y = (uv.y-0.5)/zoom+0.5;
        /* Held inside the frame. The crop only has (1-k)/2 of slack either
           side; asking for more than that samples past the edge, which is
           where the black came from. */
        float slack = max(0.0, (1.0 - k) * 0.5);
        uv.x += clamp((panPx / uRes.x) * (ca/ia), -slack, slack);
        uv.y += uPanY / uRes.y;
      }
      return uv;
    }
    // every existing call site keeps the page-wide pan
    vec2 coverPan(vec2 uv, vec2 tex, float panPx){ return coverFit(uv, tex, panPx, uZoom); }
    vec2 cover(vec2 uv, vec2 tex){ return coverFit(uv, tex, uPanPx, uZoom); }
    // the other way round: a point in the film's frame → where it lands
    // on screen, so the ring can be pinned to the pear at any viewport.
    // The full inverse of cover(): the pan slides the picture across the
    // frame and the zoom pushes into it, so the point has to slide back
    // and spread out by the same amounts — without them the ring left
    // from where the pear would be on an untouched frame.
    vec2 uncover(vec2 t, vec2 tex){
      float ca = uRes.x/uRes.y, ia = tex.x/tex.y;
      if (ca > ia) {
        t.y = (t.y-0.5)*(ca/ia)*uZoom + 0.5;
        t.x = (t.x-0.5-uPanPx/uRes.x)*uZoom + 0.5;
      } else {
        t.x = (t.x-0.5-(uPanPx/uRes.x)*(ca/ia))*(ia/ca)*uZoom + 0.5;
        t.y = (t.y-0.5)*uZoom + 0.5;
      }
      return t;
    }
    vec3 A(vec2 uv){ return texture2D(uA, cover(uv, uResA)).rgb; }
    /* The reel shares the hero's framing outright — the pan itself is keyed
       to the reel's frames on the CPU (the grafting arrives on a different
       centre), so the two pictures always agree where the figure stands. */
    vec3 B(vec2 uv){ return texture2D(uB, cover(uv, uResB)).rgb; }

    void main(){
      vec2 uv = vUv;
      float t = uT;
      vec3 col = vec3(0.0);

      /* Dead road is not drawn. The shader carries the whole journey, but
         once the plate owns the frame (the burn saturated) the ring under
         it cannot reach a single pixel, and once the closing film owns it
         (the coda saturated) neither can the burn — their work is
         identical to doing nothing, and on a phone it was half the cost
         of the chapters that follow. The output is bit-for-bit the same;
         only the wasted arithmetic goes. */
      if (uCoda < 0.999 && uBurn < 0.999) {

      if (uMode == 0) {
        // --- breathe: a soft circle opens from the centre. Inside it the
        // reel expands out of a point; outside, the film is drawn inward.
        // One layer inhales as the other exhales.
        vec2  ar = vec2(uRes.x/uRes.y, 1.0);
        float dist = length((uv - 0.5)*ar) / length(ar*0.5);
        float lens = 1.0 - smoothstep(t*1.05 - 0.30, t*1.05, dist);
        vec2  cv = uv - 0.5;
        vec2  inUV  = uv + cv*(lens - 1.0);
        vec2  outUV = uv - cv*(lens*0.5 + t*0.2);
        col = mix(A(outUV), B(inUV), lens);

      } else if (uMode == 1) {
        // --- slabs: each layer shears in stepped bands while a
        // boundary sweeps across handing one layer to the other
        float vert = abs(t*0.3);
        float dx1 = t*0.8;
        dx1 -= step(0.2 - vert, uv.x)*0.3*t;
        dx1 -= step(0.4 - vert, uv.x)*0.3*t;
        dx1 += step(0.6 - vert, uv.x)*0.3*t;
        dx1 += step(0.8 - vert, uv.x)*0.3*t;

        float t1 = t - 1.0;
        float vert1 = abs(t1*0.3);
        float dx2 = t1*0.8;
        dx2 -= step(0.2 + vert1, uv.x)*0.3*t1;
        dx2 -= step(0.4 + vert1, uv.x)*0.3*t1;
        dx2 += step(0.6 + vert1, uv.x)*0.3*t1;
        dx2 += step(0.8 + vert1, uv.x)*0.3*t1;

        float bnd = step(0.0, 1.0 - (uv.x + t));
        col = A(uv + vec2(dx1, 0.0))*bnd + B(uv + vec2(dx2, 0.0))*(1.0 - bnd);

      } else if (uMode == 2) {
        // --- the reel prints itself over the film: a halftone screen
        // whose dots grow from nothing until they merge, arriving on a
        // cloud-shaped front rather than a straight edge
        vec2 cell = floor(uv*uRes/uDot);
        vec2 c    = (cell + 0.5)*uDot/uRes;
        float d   = length((uv - c)*uRes) / (uDot*0.72);
        float cov = clamp(t*1.6 - 0.3 + (fbm(uv*3.0 + uTime*0.02) - 0.5)*0.55, 0.0, 1.0);
        float r   = cov*1.55;
        float m   = 1.0 - smoothstep(r - 0.18, r + 0.06, d);
        col = mix(A(uv), B(uv), m);

      } else if (uMode == 3) {
        // --- both layers warp through one noise field and the wipe
        // rides the same field, so the join is never a straight line
        float n = fbm(uv*uScale);
        vec2 d  = vec2(n - 0.5, fbm(uv*uScale + 19.0) - 0.5);
        float m = smoothstep(n - 0.10, n + 0.10, t*1.25 - 0.12);
        col = mix(A(uv + d*0.22*t), B(uv - d*0.22*(1.0 - t)), m);

      } else if (uMode == 4) {
        /* --- static: a diagonal wave crosses the frame from the bottom
           right corner. Ahead of it the film is untouched; behind it the
           painting stands. The crest itself is where the signal fails —
           tear, mosaic, chroma split and an ASCII rubbing of the art.  */

        // distance from the bottom-right corner, aspect-corrected so the
        // front runs at a true 45° on screen; a slow noise keeps it from
        // reading as a ruled line
        float ar = uRes.x/uRes.y;
        float d  = ((1.0 - uv.x)*ar + uv.y) / (ar + 1.0);
        d += (fbm(uv*2.4 + vec2(uTime*0.03, 0.0)) - 0.5)*0.17;

        // the crest travels from off one corner to off the other, so the
        // frame is whole at t=0 and whole again at t=1
        float W     = 0.34;
        float ph    = d - (t*(1.0 + 2.0*W) - W);
        float pass  = smoothstep(W, -W, ph);            // 0 ahead, 1 behind
        float band  = clamp(1.0 - abs(ph)/W, 0.0, 1.0);
        band = band*band*(3.0 - 2.0*band)*uHeat;

        // within the crest, only patches actually break
        float fld = fbm(uv*3.4 + vec2(uTime*0.06, uTime*0.31));
        float brk = smoothstep(0.63 - band*0.26, 0.80 - band*0.18, fld) * band;

        // 1 · rows tear sideways on a fast clock, in quantised jumps
        float row = floor(uv.y*uRes.y/7.0);
        float rj  = (hash(vec2(row, floor(uTime*15.0))) - 0.5);
        rj = floor(rj*7.0)/7.0;
        vec2 tuv = uv + vec2(rj*0.22*brk, 0.0);

        // 2 · two block octaves, swapping on their own clock
        float fine = step(0.24, hash(floor(uv*15.0) + floor(uTime*5.0)));
        float cs   = mix(uBlk, uBlk*0.28, fine);
        vec2  blk = floor(tuv*uRes/cs);
        vec2  suv = (blk + 0.5)*cs/uRes;
        vec2  puv = mix(tuv, suv, brk);

        // 3 · each block hands over at its own point inside the crest,
        // so the wave has a ragged edge rather than a clean one
        float h = hash(blk);
        float m = smoothstep(h*0.55, h*0.55 + 0.45, pass);
        vec3 c = mix(A(puv), B(puv), m);

        // 4 · the channels come apart where it tears hardest
        float o = (11.0*brk)/uRes.x;
        c.r = mix(A(puv + vec2(o, 0.0)), B(puv + vec2(o, 0.0)), m).r;
        c.b = mix(A(puv - vec2(o, 0.0)), B(puv - vec2(o, 0.0)), m).b;

        // 5 · patches of the crest re-render as type: each cell reads the
        // art beneath it and prints the glyph of the right weight, so the
        // picture survives as an ASCII rubbing of itself
        vec2  gp  = floor(uv*uRes/uAsc);
        vec2  gc  = (gp + 0.5)*uAsc/uRes;
        float gm  = smoothstep(hash(gp)*0.55, hash(gp)*0.55 + 0.45, pass);
        vec3  gcol = mix(A(gc), B(gc), gm);
        float lum = dot(gcol, vec3(0.299, 0.587, 0.114));
        // a little per-cell jitter so the ramp never bands cleanly
        lum = clamp(lum + (hash(gp + floor(uTime*10.0)) - 0.5)*0.10, 0.0, 1.0);
        float ink = glyph(floor(lum*9.99), fract(uv*uRes/uAsc) - 0.5);
        vec3 ascii = mix(gcol*0.14 + 0.02, gcol*1.5 + 0.06, ink);

        // pure static, sprinkled through the worst of it
        float st = hash(floor(uv*uRes) + floor(uTime*26.0));
        ascii = mix(ascii, vec3(st), 0.10*brk);

        // only the hottest part of the break becomes type
        col = mix(c, ascii, smoothstep(0.55, 0.95, brk));
      }

      if (uMode == 5) {
        /* --- ring: the same failure, but it leaves from the pear in her
           raised hand and opens outward. The film already draws concentric
           signal rings from that point; this rides them.               */

        vec2  ar2 = vec2(uRes.x/uRes.y, 1.0);
        vec2  org = uncover(uOrigin, uResA);
        vec2  p   = (uv - org)*ar2;

        // normalise by the furthest corner, so the ring always clears the frame
        float reach = max(
          max(length((vec2(0.0,0.0) - org)*ar2), length((vec2(1.0,0.0) - org)*ar2)),
          max(length((vec2(0.0,1.0) - org)*ar2), length((vec2(1.0,1.0) - org)*ar2)));
        float r   = length(p) / max(reach, 1e-4);

        /* The treatment displaces where the ring samples from, so it reads
           as one pass rather than a filter laid over a finished frame.
           Computed ahead of the fast paths below, because the treatments
           displace the whole frame whether or not the ring is near. */
        vec2 duv = vec2(0.0);
        if (uT2 > 0.001) {
          if (uMode2 == 1) {                     // slabs shearing right
            float lane = floor(uv.y * 11.0);
            duv.x += (0.035 + hash(vec2(lane, 3.7)) * 0.13) * uT2;
          } else if (uMode2 == 3) {              // the frame warps and settles
            duv = vec2(fbm(uv * 3.2) - 0.5, fbm(uv * 3.2 + 19.0) - 0.5) * 0.18 * uT2;
          } else if (uMode2 == 4) {              // per-block tear
            vec2 bk = floor(uv * uRes / uBlk);
            duv.x += (hash(bk + floor(uTime * 12.0)) - 0.5) * 0.11 * uT2;
          } else if (uMode2 == 5) {              // the same, much finer
            vec2 bk = floor(uv * uRes / 3.0);
            duv.x += (hash(bk + floor(uTime * 26.0)) - 0.5) * 0.05 * uT2;
          } else if (uMode2 == 8) {              // columns slip vertically
            float lane = floor(uv.x * uRes.x / 15.0);
            duv.y += (hash(vec2(lane, floor(uTime * 9.0))) - 0.5) * 0.14 * uT2;
          }
        }
        /* Mosaic snaps the sampling to a grid that starts coarse and
           resolves as the treatment passes. */
        if ((uMode2 == 6 || uMode2 == 9) && uT2 > 0.001) {
          float cell = mix(2.0, 30.0, uT2);
          vec2 g = floor((uv + duv) * uRes / cell);
          duv = mix(duv, (g + 0.5) * cell / uRes - uv, uT2);
        }

        /* THE FAST PATHS. The lobes' reach is bounded: wob·0.30 can never
           leave ±0.24, so any pixel with r beyond t·1.6 + 0.26 is provably
           ahead of every possible front (pass, band, brk all exactly zero
           → the film, transformed), and any pixel with r inside t·1.6 −
           0.86 is provably behind it (pass exactly one, band zero → the
           reel, transformed). For those pixels — most of the frame at
           rest and through the ride — the harmonics, the field, the tear,
           the glyphs and the flare all evaluate to identity, so they are
           not evaluated. The annulus between the bounds, where the ring
           actually lives (including its resting breath at the pear),
           takes the full path bit-for-bit as before. */
        if (r > t*1.6 + 0.26 || r < t*1.6 - 0.86) {
          float m = step(r, t*1.6 - 0.86); // 0 ahead of the ring, 1 behind
          vec2 puv = uv + duv;
          if (uSplit > 0.0) {
            float side = smoothstep(-uSeamSoft, uSeamSoft, uv.x - uBurnX) * 2.0 - 1.0;
            puv.x -= side * uSplit;
          }
          vec2 zo = vec2(uBurnX, uBurnY) + uDrift;
          if (uReelZ > 1.0) {
            puv = (puv - zo) / uReelZ + zo;
          }
          if (abs(uSpin) > 0.0001) {
            float ca = cos(uSpin), sa = sin(uSpin);
            vec2  ars = vec2(uRes.x / uRes.y, 1.0);
            vec2  q  = (puv - zo) * ars;
            q = vec2(q.x * ca - q.y * sa, q.x * sa + q.y * ca);
            puv = q / ars + zo;
          }
          vec3 c;
          if (uMBlur > 0.0001) {
            float sgn = smoothstep(-uSeamSoft, uSeamSoft, uv.x - uBurnX) * 2.0 - 1.0;
            vec2  mb  = vec2(sgn * uMBlur, 0.0);
            c = vec3(0.0);
            for (int k = 0; k < 5; k++) {
              vec2 o2 = mb * ((float(k) - 2.0) * 0.25);
              c += mix(A(puv + o2), B(puv + o2), m);
            }
            c *= 0.2;
          } else {
            c = mix(A(puv), B(puv), m);
          }
          if (uEdgeBl > 0.0001) {
            vec2 rd = (uv - zo) * uEdgeBl;
            c = (c + mix(A(puv + rd), B(puv + rd), m)
                   + mix(A(puv - rd), B(puv - rd), m)) / 3.0;
          }
          col = c;
        } else {

        float ang = atan(p.y, p.x);

        // not a circle: two angular harmonics lobe the front and breathe,
        // so it opens as something chaotic rather than a ripple
        float wob = (fbm(vec2(ang*1.9 + 3.0, uTime*0.20)) - 0.5)
                  + (fbm(vec2(ang*5.3, uTime*0.38)) - 0.5)*0.55;

        float W    = 0.30;
        float R    = t*(1.0 + 2.0*W) - W + wob*0.30;
        float ph   = r - R;
        float pass = smoothstep(W, -W, ph);
        float band = clamp(1.0 - abs(ph)/W, 0.0, 1.0);
        band = band*band*(3.0 - 2.0*band)*uHeat;

        // the break-up carries the painting's own ring cadence
        float rings = 0.5 + 0.5*sin(r*46.0 - uTime*1.1);
        float fld = fbm(uv*3.4 + vec2(uTime*0.06, uTime*0.31))*0.72 + rings*0.28;
        float brk = smoothstep(0.62 - band*0.26, 0.80 - band*0.18, fld) * band;

        // 1 · the tear runs outward from the pear, with a row tear under it
        vec2  dir = (p / max(length(p), 1e-4)) / ar2;
        float rr  = hash(vec2(floor(r*90.0), floor(uTime*15.0))) - 0.5;
        rr = floor(rr*7.0)/7.0;
        float rowj = hash(vec2(floor(uv.y*uRes.y/7.0), floor(uTime*13.0))) - 0.5;
        vec2  tuv = uv + dir*(rr*0.17*brk) + vec2(rowj*0.09*brk, 0.0);

        // 2 · two block octaves, fine favoured
        float fine = step(0.24, hash(floor(uv*15.0) + floor(uTime*5.0)));
        float cs   = mix(uBlk, uBlk*0.28, fine);
        vec2  blk  = floor(tuv*uRes/cs);
        vec2  suv  = (blk + 0.5)*cs/uRes;
        vec2  puv  = mix(tuv, suv, brk);

        // 3 · each block hands over at its own point inside the ring
        float h = hash(blk);
        float m = smoothstep(h*0.55, h*0.55 + 0.45, pass);
        puv += duv;
        /* As the tear opens, the frame is drawn apart along the same seam:
           sampling moves toward the axis, so the content moves away from
           it — the two halves part with the gap. */
        if (uSplit > 0.0) {
          /* The beige only ever covered the join; the join was still a step.
             the sign used to flip from -1 to +1 across a single pixel, so the
             two halves sampled from places that had nothing to do with each
             other and met at a hard edge. Ramping it through zero instead
             means there is no discontinuity anywhere: at the centre the
             frame is not displaced at all, and the draw builds up over the
             band. The stretch that costs is a few percent, under the beige
             and the dither, and invisible. */
          float side = smoothstep(-uSeamSoft, uSeamSoft, uv.x - uBurnX) * 2.0 - 1.0;
          puv.x -= side * uSplit;
        }
        /* And the whole frame pushes in on the opening — about the tear's
           own point, not the frame centre, so it reads as falling forward
           into the gap rather than a flat scale. The point itself drifts as
           the push accelerates: a dolly straight down its own axis is the
           one move the eye reads as a zoom, and a few percent of sideways
           travel is what turns it back into a camera. */
        vec2 zo = vec2(uBurnX, uBurnY) + uDrift;
        if (uReelZ > 1.0) {
          puv = (puv - zo) / uReelZ + zo;
        }
        // and a slow roll about the same point, so it is a camera not a lens
        if (abs(uSpin) > 0.0001) {
          float ca = cos(uSpin), sa = sin(uSpin);
          vec2  ar = vec2(uRes.x / uRes.y, 1.0);
          vec2  q  = (puv - zo) * ar;
          q = vec2(q.x * ca - q.y * sa, q.x * sa + q.y * ca);
          puv = q / ar + zo;
        }
        /* Directional smear along the escape. The halves leave at speed but
           every pixel of them is perfectly sharp, which is the plainest
           tell that this is a wipe and not a thing moving. Five taps down
           the split axis, signed the same way the parting is, so each half
           smears the way it is actually going. */
        vec3 c;
        if (uMBlur > 0.0001) {
          float sgn = smoothstep(-uSeamSoft, uSeamSoft, uv.x - uBurnX) * 2.0 - 1.0;
          vec2  mb  = vec2(sgn * uMBlur, 0.0);
          c = vec3(0.0);
          for (int k = 0; k < 5; k++) {
            vec2 o2 = mb * ((float(k) - 2.0) * 0.25);
            c += mix(A(puv + o2), B(puv + o2), m);
          }
          c *= 0.2;
        } else {
          c = mix(A(puv), B(puv), m);
        }
        /* And it goes soft toward the edges as it arrives, the way something
           does when it gets close to the lens. Radial, from the tear's own
           point, and only in the last of the burn. */
        if (uEdgeBl > 0.0001) {
          vec2 rd = (uv - zo) * uEdgeBl;
          c = (c + mix(A(puv + rd), B(puv + rd), m)
                 + mix(A(puv - rd), B(puv - rd), m)) / 3.0;
        }

        // 4 · the channels come apart along the radius
        float o = 13.0*brk/uRes.x;
        c.r = mix(A(puv + dir*o), B(puv + dir*o), m).r;
        c.b = mix(A(puv - dir*o), B(puv - dir*o), m).b;

        // 5 · the crest re-renders as type
        vec2  gp   = floor(uv*uRes/uAsc);
        vec2  gc   = (gp + 0.5)*uAsc/uRes;
        float gm   = smoothstep(hash(gp)*0.55, hash(gp)*0.55 + 0.45, pass);
        vec3  gcol = mix(A(gc), B(gc), gm);
        float lum  = dot(gcol, vec3(0.299, 0.587, 0.114));
        lum = clamp(lum + (hash(gp + floor(uTime*10.0)) - 0.5)*0.10, 0.0, 1.0);
        float ink  = glyph(floor(lum*9.99), fract(uv*uRes/uAsc) - 0.5);
        // ground the type high and print the ink bright: the crest reads
        // as an overexposed plate rather than a hole burnt in the frame
        vec3 ascii = mix(gcol*0.58 + 0.30, gcol*1.10 + 0.48, ink);

        // the static in here is light too, not grey
        float st = hash(floor(uv*uRes) + floor(uTime*26.0));
        ascii = mix(ascii, vec3(1.0, 0.98, 0.93)*st, 0.16*brk);

        col = mix(c, ascii, smoothstep(0.50, 0.95, brk));

        // and the whole crest carries a flare, screen-blended toward the
        // gilt of the pear it left — light travelling out, not a tear
        vec3 flare = vec3(1.0, 0.94, 0.80) * (band*band) * uGlow;
        col = 1.0 - (1.0 - col)*(1.0 - flare);
        } // the fast paths rejoin: the treatments below serve both

        /* Ordered dither: posterise through the Bayer matrix, so the frame
           breaks into a print screen rather than flat bands. */
        if ((uMode2 == 7 || uMode2 == 9) && uT2 > 0.001) {
          float lv = mix(24.0, 3.0, uT2);
          vec3 d = floor(col * lv + bayer4(gl_FragCoord.xy)) / lv;
          col = mix(col, d, uT2);
        }

        // the halftone treatment is a colour pass, not a displacement
        if (uMode2 == 2 && uT2 > 0.001) {
          vec2 cell = floor(uv*uRes/uDot);
          vec2 cc   = (cell + 0.5)*uDot/uRes;
          float dd  = length((uv - cc)*uRes) / (uDot*0.72);
          float lum = dot(col, vec3(0.299, 0.587, 0.114));
          float dot1 = 1.0 - smoothstep(lum*1.5 - 0.18, lum*1.5 + 0.06, dd);
          col = mix(col, mix(col*0.25, col*1.25, dot1), uT2);
        }
      }

      /* ------------------------------------------------------------------
         THE SEAM — the halves part along a straight line, and a straight
         line down the middle of a painting reads as a mirror. A soft beige
         mass sits over the join: bitten by fbm so it is not an airbrush,
         anisotropic so it follows the gap rather than being a circle, and
         under the burn rather than over it, so the blue still opens through
         it exactly as before. */
      if (uSeam > 0.001) {
        float sx = (uv.x - uBurnX) * (uRes.x / uRes.y) / max(uSeamWH.x, 1e-3);
        float sy = (uv.y - uBurnY) / max(uSeamWH.y, 1e-3);
        float m  = exp(-(sx * sx)) * exp(-(sy * sy));
        // two octaves of bite, one drifting, so the edge is never a contour
        m *= 0.55 + 0.85 * fbm(uv * 4.2 + vec2(0.0, uTime * 0.04));
        m *= 0.70 + 0.60 * fbm(uv * 11.0 - vec2(uTime * 0.03, 0.0));
        col = mix(col, uSeamCol, clamp(m, 0.0, 1.0) * uSeam);
      }

      } // the film, the ring and the seam end here when covered

      /* ==================================================================
         THE BURN — the reel's last frame is eaten away and the plate is
         underneath it. The cut is a noise-bent wipe, not a line: two
         decorrelated fields tear it into lobes, ordered dither and a hash
         stipple its boundary, and the side about to go carbonises before
         it does. The scorch multiplies into the image rather than
         replacing it, so the picture keeps reading through the char.
         ================================================================== */
      if (uBurn > 0.0001 && uCoda < 0.999) {
        float asp = uRes.x / uRes.y;

        /* The plate is set to the frame's width and is taller than it, so
           it scrolls through its own height rather than being cropped. */
        float plateH = (uResC.y * uRes.x) / (uResC.x * uRes.y);   // in viewport heights
        /* You arrive into the plate rather than cutting to it: it opens
           held close, then eases back to its own scale, and keeps creeping
           in through the pan so the world never quite settles. */
        // the plate reads mirrored, so the scaffold runs the other way
        vec2 fv  = vec2(1.0 - vUv.x, vUv.y);
        vec2 z   = (fv - 0.5) / uPlateZ + 0.5;
        vec2 zf = (z - 0.5) / uPlateFit.z + 0.5;
        vec2 sUv = vec2(zf.x + uPlateFit.x / uRes.x,
                        zf.y / plateH + uPan + uPlateFit.y / uRes.y);
        vec3 nxt = texture2D(uC, sUv).rgb;

        /* Fully open, the cut is past every margin and every pixel is the
           plate: the torn fields, the char and the ember resolve to
           exactly this line. */
        if (uBurn >= 0.999) { col = nxt; } else {

        // the mask field snaps to a pixel grid; the images stay full-res
        vec2 pix = floor(gl_FragCoord.xy / 2.0);
        vec2 quv = (pix * 2.0 + 1.0) / uRes;

        vec2  nuv  = vec2(quv.x * asp, quv.y) + vec2(0.0, uTime * 0.02);
        float big  = fbm(nuv * 0.9 - uTime * 0.0087) * 2.0 - 1.0;   // torn lobes
        float fine = (vnoise(vec2(quv.x * asp, quv.y) * 90.0) - 0.5)
                   * mix(0.3, 0.6, 0.5 + 0.5 * sin(uTime - quv.x * 10.0));

        float ord = bayer4(pix) - 0.5;
        float rnd = hash(pix + 37.0) - 0.5;

        /* The cut is the cut in the picture. It opens where the halves
           part and grows out of that point — narrow in x and tall in y, so
           it reads as a vertical seam widening rather than a horizontal
           wipe. Anisotropic distance: the larger coefficient is the axis
           the front crosses more slowly. */
        /* The shape of the opening is just the metric the distance is
           measured in: L2 gives an oval, L∞ a rectangle, L1 a diamond, and
           a fourth power the superellipse between oval and box. */
        vec2  d  = vec2((quv.x - uBurnX) * uBurnAB.x, (quv.y - uBurnY) * uBurnAB.y);
        vec2  ad = abs(d);
        float th;
        if      (uShape == 1) th = max(ad.x, ad.y);                 // square
        else if (uShape == 2) th = ad.x + ad.y;                     // diamond
        else if (uShape == 3) th = pow(pow(ad.x, 4.0) + pow(ad.y, 4.0), 0.25);  // squircle
        else                  th = length(d);                       // oval
        th = th + big * uBurnFld.x + fine * uBurnFld.y
                + ord * uBurnFld.z + rnd * uBurnFld.w;

        // padded either side so 0 and 1 are fully clear of the frame
        float edge  = mix(uBurnE.x, uBurnE.y, uBurn) - th;
        float aa    = AAW(edge);
        float blend = smoothstep(-aa, aa, edge);

        // the char: depth into the band carbonises, grain mottles it, and
        // dither against coverage keeps the boundary stippled, not soft
        float charT   = clamp(-edge / uBurnChr.y, 0.0, 1.0);
        float mottle  = clamp(0.5 + fine * 2.2 + big * 0.35, 0.0, 1.0);
        float cov     = smoothstep(0.0, 1.0, charT) * mix(0.55, 1.15, mottle);
        float stipple = step(0.5 + ord * 1.6 + rnd * 0.9, cov * 1.25);
        float charAmt = mix(cov, stipple, 0.72) * step(edge, 0.0) * uBurnChr.x;

        vec3 tint   = mix(vec3(0.72, 0.55, 0.40), vec3(0.14, 0.10, 0.09),
                          charT * mix(0.65, 1.0, mottle));
        vec3 scorch = col * tint + col * (mottle - 0.5) * 0.30 * charT;
        col = mix(col, scorch, clamp(charAmt, 0.0, 1.0));

        col = mix(col, nxt, blend);

        // a thin band either side of the cut blows out to ember
        float glow = smoothstep(0.0, uBurnChr.z, abs(edge));
        float mult = mix(uBurnChr.w * 0.45, uBurnChr.w,
                         0.5 + 0.5 * big * sin(uTime * 1.4 + vUv.x * 10.0));
        vec3  hot  = col * mult + vec3(1.0, 0.62, 0.26) * (1.0 - glow) * 0.55;
        col = mix(col, hot, 1.0 - glow);
        }
      }

      /* The coda sits outside everything else: by the time it is showing,
         the burn and the plate have finished their work and it simply takes
         the frame. The flat paper then takes the film the same way, so the
         next section begins on a colour that was already on screen. */
      /* THE CLOSE's front, solved before the sheet: while the burn is
         crossing, every pixel it has fully revealed (past the cut, past
         the ember's reach) ends the frame as one sample of the film — so
         for those pixels the whole paper, plan and rays chain below is
         work thrown away. The field is solved here, once, and both the
         skip and the burn itself read it. Uniform-gated, so the branch
         never diverges where it matters for derivatives. */
      float eEdge = -1.0, eAa = 0.0, eBig = 0.0, eFine = 0.0,
            eOrd = 0.0, eRnd = 0.0;
      bool eLive = uEnd > 0.0001 && uEnd < 0.999;
      if (eLive) {
        float asp = uRes.x / uRes.y;
        vec2  pix = floor(gl_FragCoord.xy / 2.0);
        vec2  quv = (pix * 2.0 + 1.0) / uRes;
        vec2  nuv = vec2(quv.x * asp, quv.y);
        eBig  = fbmQ(nuv * 0.9 + vec2(0.0, uTime * 0.02)) - 0.5;
        eFine = (hash(floor(quv * uRes / 3.0)) - 0.5)
              * mix(0.30, 0.60, 0.5 + 0.5 * sin(uTime - quv.x * 10.0));
        eOrd  = bayer4(gl_FragCoord.xy) - 0.5;
        eRnd  = hash(pix + 37.0) - 0.5;
        float th = mix(quv.y, quv.x, smoothstep(0.6, -0.4, abs(quv.x - 0.45)) * 0.5);
        th = (th * 2.0 - 1.0) / 1.2 + eBig * uEndF.x + eFine * uEndF.y;
        th = th * 0.5 + 0.5 + eOrd * uEndF.z + eRnd * uEndF.w;
        eEdge = mix(-0.35, 1.35, uEnd) - th;
        eAa = AAW(eEdge);
      }
      bool eDone = eLive && eEdge >= max(eAa, uEndC.w);

      if (uCoda > 0.0001 && uEnd < 0.999 && !eDone) {
        /* The film under the sheet is dead pixels once the paper's tone
           has fully taken the frame — sampled only while it still shows. */
        if (uFlat < 0.999) {
          vec2 cu = coverFit(vUv, uResE, uPanE, uZoomE);
          cu.y += uPanEY / uRes.y;
          col = mix(col, texture2D(uE, cu).rgb, uCoda);
        }
        /* A flat fill, deliberately. The sheet had cloudiness, fibre, tooth
           and a vignette over it, and because all of that arrived with uFlat
           there was a moment where the texture could be seen switching on
           over what had been a clean film frame. Nothing here now changes
           except the colour, so there is no moment to catch. */
        /* Not a colour filling the screen — a sheet. Four things build it and
           all of them are in the pixels rather than in a fill: pulp, laid
           fibre running one way, the tooth of the surface, and the odd dark
           inclusion left in the stock. Thick pulp is warmer and thin pulp
           cooler, which is what stops it reading as tinted grey.

           All of it mixed by uFlat, so it arrives as the colour arrives and
           there is no second moment when a treatment appears. And when the
           burn comes it has something to eat: a front travelling over
           structure reads as paper going, where over a flat field it only
           ever reads as a wipe. */
        /* Everything from here to the rays arrives multiplied by uFlat —
           for the first stretch of the coda uFlat is exactly zero, and
           the pulp, the fibre and the plan window were being computed to
           contribute nothing. One gate, same epsilon as the rays'. */
        if (uFlat > 0.001) {
        vec2  pw = vec2(vUv.x * (uRes.x / uRes.y), vUv.y);
        float pulp  = fbmQ(pw * 1.7) - 0.5;
        float fibA  = fbmQ(vec2(pw.x * 24.0, pw.y * 2.1)) - 0.5;   // along
        float fibB  = fbmQ(vec2(pw.x * 2.8,  pw.y * 38.0)) - 0.5;  // across
        float tooth = hash(floor(gl_FragCoord.xy)) - 0.5;
        float fleck = smoothstep(0.981, 1.0, hash(floor(gl_FragCoord.xy / 3.0) + 11.0));

        vec3 paper = uPaperC;
        paper *= 1.0 + pulp * uPap.x
                     + fibA * uPap.y + fibB * uPap.y * 0.55
                     + tooth * uPap.z;
        paper.b *= 1.0 - pulp * uPap.x * 1.7;      // thick stock goes warm
        paper.r *= 1.0 + pulp * uPap.x * 0.30;
        paper = mix(paper, paper * 0.70, fleck * uPap.w);
        col = mix(col, paper, uFlat);

        /* It hangs in the margin the copy leaves, turning slowly and lit
           warm, so the empty right of the sheet is a place something is
           rather than a place nothing is. Marched only for the fragments
           that could possibly be inside it — everywhere else costs one
           length() and a branch. */
        /* THE PLATE. It arrives holding the whole frame — you are looking
           at the drawing, not at a picture of one — and then draws back to
           the margin the copy leaves, which is the moment the sheet it is
           lying on becomes visible underneath. One rect, interpolated: the
           full frame at the start, the panel at the end, and the sampling
           follows it, so there is no second copy of anything. */
        /* Gated on the arrival, not on the retreat. uPlan.x is how far the
           plate has drawn back toward the margin and is 0 for the whole of
           its arrival — so this branch was skipped for exactly the stretch
           the plate was supposed to be filling the screen, and all the
           reader saw was blank sheet. */
        if (uPlan2.x > 0.001) {
          float z = uPlan.x;                       // 0 full frame, 1 in the margin
          vec2  cN = mix(vec2(0.5, 0.5), vec2(uPlan.y, uPlan.z), z);
          float sN = mix(1.0, uPlan.w, z);
          /* The window is the viewport while the plate holds the frame, and
             only squares up as it retreats to the margin. Held square the
             whole way, its full-frame rect was as tall as the screen is wide
             — so on any wide screen you were reading the middle band of a
             cover-fit into that, which cropped the drawing twice over and is
             why the first frame sat closer in than the plate itself does. */
          vec2  hN = vec2(sN * 0.5, sN * 0.5 * mix(1.0, uRes.x / uRes.y, z));
          vec2  pu = (vUv - cN) / (hN * 2.0) + 0.5;
          /* It opens from the middle rather than cutting in. The same
             chaotic ring the film uses at the top of the page: an fbm-lobed
             front growing out of the centre, so the plate arrives the way
             everything else on this page arrives — through a torn edge that
             belongs to the same hand. */
          /* It soaks in from the middle. A clean ring cut the plate out of
             the sheet with a compass; a front that is a radius bitten by two
             scales of noise arrives in patches that spread and join, which is
             how ink takes to paper — and it is the same gesture the copy on
             this page arrives with. */
          float open = 1.0;
          if (uPlan2.x < 0.999) {
            vec2  rr  = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
            float rad = length(rr) / 1.30;
            float n   = fbm(vUv * 3.4 + 7.0) * 0.60
                      + fbm(vUv * 9.5 - 3.0) * 0.34;
            // biased so the middle is already open on the first frame of the
            // arrival: unbiased, half the road was spent before anything showed
            float f   = uPlan2.x * 1.62 - rad - (n - 0.47) * 0.62 + 0.12;
            open = smoothstep(-0.055, 0.065, f);
          }
          if (open > 0.001 && pu.x > -0.12 && pu.x < 1.12 && pu.y > -0.12 && pu.y < 1.12) {
            // cover-fit inside the rect, so the plate is never distorted
            float ra = (hN.x * uRes.x) / (hN.y * uRes.y);
            float ia = uResP.x / uResP.y;
            vec2  su = pu;
            if (ra > ia) su.y = (su.y - 0.5) * (ia / ra) + 0.5;
            else         su.x = (su.x - 0.5) * (ra / ia) + 0.5;
            /* The picture is zoomed inside the cutout, not with it. Scaling
               the window moved the torn edge along with the drawing, which is
               not a zoom at all — it is a bigger hole. This reads a smaller
               piece of the frame into the same hole, so the mask below, which
               is measured off pu, never notices. */
            su = (su - 0.5 - vec2(uPlan3.y, uPlan3.z)) / max(uPlan3.x, 0.05) + 0.5;
            vec3 pl = texture2D(uP, clamp(su, 0.0, 1.0)).rgb;
            /* The edge is brushed, not cut. A square window on a sheet of
               paper reads as a video element dropped on top of it; a border
               that is eaten away by the same kind of noise the burn uses
               reads as something washed onto the page. Two scales of it —
               a broad tear and a finer fray — and the whole edge falls off
               over a wide band rather than at a line. */
            vec2  ee = min(pu, 1.0 - pu);
            float e0 = min(ee.x, ee.y * (uRes.y / uRes.x) * (hN.y / hN.x));
            vec2  bn = vec2(pu.x * 3.0, pu.y * 4.0);
            float bite = (fbmQ(bn * 2.2 + 4.0) - 0.5) * 0.085
                       + (fbmQ(bn * 7.5 - 2.0) - 0.5) * 0.035;
            float mask = smoothstep(0.0, 0.075, e0 + bite);
            // and it thins toward the edge rather than stopping dead
            mask *= mask;
            col = mix(col, pl, uFlat * mask * open);
          }
        }
        }
        /* The sheet is lit, and something is moving between it and the sun.
           Everything here is a number the panel owns: how fast the whole
           thing runs, how far the pattern travels, how much it jitters, how
           big the patches are, how deep they cut, how much the thresholds
           breathe, the rake across the sheet and the swing in its contrast.
           All sines — no texture, so nothing can be seen switching on. */
        if (uFlat > 0.001) {
          float T = uTime * uRay1.x;
          vec2  jig = vec2(sin(T * 1.63) * 0.013 + sin(T * 0.91 + 1.1) * 0.021,
                           cos(T * 1.27 + 0.4) * 0.015 + sin(T * 0.58) * 0.019) * uRay1.z;
          vec2  q = vUv * vec2(uRes.x / uRes.y, 1.0) * uRay1.w
                  + vec2(T * 0.026, T * 0.015) * uRay1.y + jig;
          float dap = sin(q.x * 3.1 + sin(q.y * 2.3 + T * 0.31) * 1.8)
                    + sin(q.y * 2.7 + sin(q.x * 1.9 - T * 0.24) * 1.4);
          float lo = 0.25 + 0.13 * sin(T * 0.53) * uRay2.y;
          float hi = 1.85 + 0.20 * sin(T * 0.37 + 2.0) * uRay2.y;
          dap = smoothstep(lo, hi, dap);
          float rake = (vUv.x * 0.62 + vUv.y * 0.38) - 0.5;
          vec3  lit = col * (1.0 + rake * uRay2.z - dap * uRay2.x);
          /* A sixth of the sheet's value was swinging in and out on a slow
             sine, which on a flat colour reads as the screen dimming rather
             than as light moving. Kept to a few percent. */
          float cyc = 1.0 + uRay2.w * (0.022 * sin(T * 0.42) + 0.012 * sin(T * 0.19 + 2.1));
          lit = (lit - 0.62) * cyc + 0.62;
          col = mix(col, lit, uFlat);
        }      }

      /* ------------------------------------------------------------------
         THE CLOSE — the beige is burnt away and there is plain black behind
         it, which is the next section's ground. The wipe is the one from the
         burn page rather than the tear's radial front: a diagonal bent by
         its own curve, torn by two decorrelated fields, stippled by ordered
         and hashed dither, scorched on the side about to go and blown out to
         ember along the cut. */
      if (uEnd > 0.0001) {
        /* The front fully through, the reveal is the whole frame: the lag
           has decayed, the ember is out, and the wipe resolves to one
           sample of the film — which is all the questions and the rise
           ever needed from this block. */
        if (uEnd >= 0.999) {
          col = texture2D(uG, coverPan(vUv, uResG, uPanPx + uPanG)).rgb;
        } else if (eDone) {
          /* Fully revealed: the whole path below resolves to one lagged
             sample of the film — char is zero past the cut, the darken is
             gated to the other side, and the ember's glow term has died.
             The same pixels, without the ceremony. */
          float lag = exp(-abs(eEdge) / max(uDrag.y, 0.001));
          vec2  tuv = coverPan(vUv, uResG, uPanPx + uPanG);
          tuv.y -= lag * uDrag.x;
          tuv.x += lag * uDrag.x * 0.18;
          col = texture2D(uG, tuv).rgb;
        } else {
        // the field was solved above the sheet, where the skip reads it
        float big = eBig, fine = eFine, ord = eOrd, rnd = eRnd;
        float edge  = eEdge;
        float aa    = eAa;
        float blend = smoothstep(-aa, aa, edge);

        /* The scorch is a band that travels with the front, not everything
           behind it. The depth term saturates a little way back, so left as
           it was the whole frame charred the instant the burn began and the
           beige turned to noise in one step. The second term lets it go
           again further back, where the wipe has already taken the frame to
           black anyway. The pass also eases in over the first of the travel,
           so there is no edge to the effect starting. */
        float ease    = smoothstep(0.0, 0.07, uEnd);
        float charT   = clamp(-edge / uEndC.x, 0.0, 1.0)
                      * clamp(1.0 + edge / (uEndC.x * uEndC.y), 0.0, 1.0);
        float mottle  = clamp(0.5 + fine * 2.2 + big * 0.35, 0.0, 1.0);
        // named covr, not cover: a local of that name shadows the cover-fit
        // function from its declaration on, and the reveal below calls it
        float covr    = smoothstep(0.0, 1.0, charT) * mix(0.55, 1.15, mottle);
        float stipple = step(0.5 + ord * 1.6 + rnd * 0.9, covr * 1.25);
        /* The stipple has to be gated on there being any coverage to stipple.
           step(a, b) is 1 whenever b >= a, and with ord and rnd both able to
           reach -0.5 the threshold goes negative on a scatter of pixels — so
           stipple fired at 1 even where charT, and therefore covr, was 0.
           Everything ahead of the front is edge < 0, so those pixels charred
           across the whole sheet the instant the burn began: the speckle that
           appeared the moment you scrolled. Gated here, the scorch exists only
           inside its own band. */
        float charAmt = mix(covr, stipple, 0.72)
                      * step(edge, 0.0) * step(0.0005, charT) * uEndC.z * ease;
        vec3  tint    = mix(vec3(0.72, 0.55, 0.40), vec3(0.14, 0.10, 0.09),
                            charT * mix(0.65, 1.0, mottle));
        col = mix(col, col * tint + col * (mottle - 0.5) * 0.30 * charT,
                  clamp(charAmt, 0.0, 1.0));

        /* The world behind arrives moving, and moving the way the burn is.
           Right at the cut it is still offset to the right — it has not
           caught up with the edge that uncovered it — and it settles as the
           front leaves it behind. So the reveal reads as the new picture
           being drawn in leftward rather than as a static image under a
           hole. The lag is 1 at the cut and gone a little way past it. */
        /* Measured from the cut in both directions. It used to be
           exp(-max(edge,0)/d), and everything ahead of the front has
           edge < 0 — so max() pinned it at 1 and the darkening below was
           applied to the entire sheet the instant the burn began. That is
           the dim that appeared the moment the plate settled. */
        float lag = exp(-abs(edge) / max(uDrag.y, 0.001));
        vec2  tuv = coverPan(vUv, uResG, uPanPx + uPanG);
        tuv.y -= lag * uDrag.x;
        tuv.x += lag * uDrag.x * 0.18;
        vec3  nxtG = texture2D(uG, tuv).rgb;
        // and the sheet darkens as it is dragged off, so both sides of the
        // cut agree on which way the world is going
        col = mix(col, col * (1.0 - lag * uDrag.z * 0.45), step(edge, 0.0));
        col = mix(col, nxtG, blend);

        float glow = smoothstep(0.0, uEndC.w, abs(edge));
        float mult = mix(2.2, 5.0, 0.5 + 0.5 * big * sin(uTime * 1.4 + vUv.x * 10.0));
        col = mix(col, col * mult + vec3(1.0, 0.62, 0.26) * (1.0 - glow) * 0.55,
                  (1.0 - glow) * ease);
        }
      }

      /* The renaissance scrim, baked. It lived as a full-viewport DOM
         layer of #595551 at hard-light — which, with every channel of
         the blend colour at or under one half, is exactly a per-channel
         multiply by 2·Cs, faded by its opacity. Same math, same sRGB
         domain, no compositing group over a canvas that repaints every
         frame for the last two thirds of the road. */
      col *= mix(vec3(1.0), vec3(0.698039, 0.666667, 0.635294), uScrim);
      gl_FragColor = vec4(col, 1.0);
    }`,
    At = `attribute vec2 a; varying vec2 vUv;void main(){ vUv = a*0.5+0.5; gl_Position = vec4(a,0.,1.); }`,
    jt = `precision highp float;
uniform sampler2D t1, t2;
uniform float progress, grade, scaleB, mode, radius, width, intensity, time;
uniform vec2 res, img;
varying vec2 vUv;
vec2 cover(vec2 uv){
  float ca = res.x/res.y, ia = img.x/img.y;
  if (ca > ia) uv.y = (uv.y-0.5)*(ia/ca)+0.5;
  else         uv.x = (uv.x-0.5)*(ca/ia)+0.5;
  return uv;
}
vec3 lift(vec3 c){
  float l = dot(c, vec3(0.2126,0.7152,0.0722));
  return clamp(vec3(l) + (c-vec3(l))*grade, 0.0, 1.0);
}
float hash(vec2 p){ return fract(1e4*sin(17.*p.x + p.y*0.1)*(0.1+abs(sin(p.y*13.+p.x)))); }
float hnoise(vec2 x){
  vec2 i = floor(x), f = fract(x);
  float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}
void main(){
  vec2 p  = cover(vUv);
  vec2 pB = (p-0.5)/scaleB + 0.5;
  vec3 A, B;
  if (mode < 0.5) {
    /* demo3 — a front opening from the centre, softened by width and broken
       by noise, with each picture scaling through it. */
    vec2 asp = vec2(res.y/res.x, 1.0);
    float n = hnoise(p*res/220.0 + time*0.06);
    float pr = progress*0.66 + n*0.04;
    float circ = 1.0 - smoothstep(-width, 0.0,
                   radius*distance(vec2(0.5,0.47)*asp, p*asp) - pr*(1.+width));
    float k = clamp(circ, 0.0, 1.0);
    A =      texture2D(t1, (p -0.5)*(1.0-k)+0.5).rgb;
    B = lift(texture2D(t2, (pB-0.5)*k     +0.5).rgb);
    gl_FragColor = vec4(mix(A,B,k), 1.0); return;
  }
  if (mode < 1.5) {
    float hn = hnoise(p*res/intensity);
    vec2 d = vec2(0.0, normalize(vec2(0.5,0.5) - p).y);
    A =      texture2D(t1, p  + d*progress      /5.0*(1.0+hn/2.0)).rgb;
    B = lift(texture2D(t2, pB - d*(1.0-progress)/5.0*(1.0+hn/2.0)).rgb);
    gl_FragColor = vec4(mix(A,B,progress), 1.0); return;
  }
  if (mode < 2.5) {
    float x = smoothstep(0.0, 1.0, progress*2.0 + p.y - 1.0);
    A =      texture2D(t1, (p -0.5)*(1.-x)+0.5).rgb;
    B = lift(texture2D(t2, (pB-0.5)*x     +0.5).rgb);
    gl_FragColor = vec4(mix(A,B,x), 1.0); return;
  }
  A =      texture2D(t1, p ).rgb;
  B = lift(texture2D(t2, pB).rgb);
  gl_FragColor = vec4(mode < 3.5 ? mix(A,B,progress)
                                 : (progress < 0.5 ? A : B), 1.0);
}`,
    Mt = `uRes.uResA.uResB.uPanPx.uPanY.uZoom.uT.uTime.uMode.uPanG.uZoomE.uPanE.uPanEY.uPlateFit.uDot.uBlk.uScale.uAsc.uHeat.uOrigin.uGlow.uMode2.uT2.uResC.uBurn.uBurnX.uBurnY.uPan.uBurnAB.uBurnFld.uBurnChr.uSplit.uBurnE.uPlateZ.uReelZ.uSeam.uSeamWH.uSeamCol.uSeamSoft.uDrift.uMBlur.uEdgeBl.uSpin.uCoda.uFlat.uResE.uEnd.uEndF.uEndC.uResG.uPaperC.uRay1.uRay2.uPap.uDrag.uScrim.uResP.uPlan.uPlan2.uPlan3.uShape`.split(`.`);

function Nt(e) {
    let t = document.querySelector(`.gl`),
        n = t.getContext(`webgl`, {
            alpha: !1,
            antialias: !1,
            depth: !1
        }),
        r = !!n.getExtension(`OES_standard_derivatives`),
        i = (e, t) => {
            let r = n.createShader(e);
            return n.shaderSource(r, t), n.compileShader(r), n.getShaderParameter(r, n.COMPILE_STATUS) ? r : (console.warn(n.getShaderInfoLog(r)), null)
        },
        a = n.createProgram();
    n.attachShader(a, i(n.VERTEX_SHADER, Ot)), n.attachShader(a, i(n.FRAGMENT_SHADER, kt(r, innerWidth <= 720))), n.linkProgram(a), n.getProgramParameter(a, n.LINK_STATUS) || console.warn(n.getProgramInfoLog(a)), n.useProgram(a);
    let o = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, o), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), n.STATIC_DRAW);
    let s = n.getAttribLocation(a, `aPos`);
    n.enableVertexAttribArray(s), n.vertexAttribPointer(s, 2, n.FLOAT, !1, 0, 0);

    function c(e) {
        let t = n.createTexture();
        return n.activeTexture(n.TEXTURE0 + e), n.bindTexture(n.TEXTURE_2D, t), n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, new Uint8Array([11, 10, 9, 255])), t
    }
    let l = {
            A: c(0),
            B: c(1),
            C: c(2),
            E: c(3),
            G: c(4),
            P: c(5)
        },
        u = {};
    for (let e of Mt) u[e] = n.getUniformLocation(a, e);
    n.uniform1i(n.getUniformLocation(a, `uA`), 0), n.uniform1i(n.getUniformLocation(a, `uB`), 1), n.uniform1i(n.getUniformLocation(a, `uC`), 2), n.uniform1i(n.getUniformLocation(a, `uE`), 3), n.uniform1i(n.getUniformLocation(a, `uG`), 4), n.uniform1i(n.getUniformLocation(a, `uP`), 5);
    let d = (e, t, r) => {
            n.activeTexture(n.TEXTURE0 + e), n.bindTexture(n.TEXTURE_2D, t);
            let i = r.videoWidth || r.naturalWidth || r.width,
                a = r.videoHeight || r.naturalHeight || r.height;
            t._w === i && t._h === a ? n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, n.RGBA, n.UNSIGNED_BYTE, r) : (n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r), t._w = i, t._h = a)
        },
        f = new Image;
    return f.onload = () => {
        d(2, l.C, f), n.uniform2f(u.uResC, f.naturalWidth, f.naturalHeight)
    }, f.src = `/art/scaffold_expand.jpg`, n.uniform1f(u.uDot, 7), n.uniform1f(u.uBlk, 11), n.uniform1f(u.uScale, 3.2), n.uniform1f(u.uAsc, 9), n.uniform1f(u.uHeat, 1), n.uniform2f(u.uOrigin, e.origin[0], e.origin[1]), n.uniform1f(u.uGlow, .62), {
        gl: n,
        canvas: t,
        tex: l,
        u,
        upload: d,
        plate: f
    }
}
var Pt = 320,
    Ft = new Path2D(`M12 0Q13.1 10.9 24 12Q13.1 13.1 12 24Q10.9 13.1 0 12Q10.9 10.9 12 0Z`),
    It, Lt, Rt, zt, Bt = 0,
    Vt = null,
    Ht = 0,
    Ut, Wt, Gt, Kt, qt, Jt = () => Ht;

function Yt() {
    It = document.querySelector(`.ov .lines`), It && (Lt = It.getContext(`2d`), Rt = document.createElement(`canvas`), zt = Rt.getContext(`2d`, {
        willReadFrequently: !0
    }), Ut = document.querySelector(`.ov .gv:not(.gv--r)`), Wt = document.querySelector(`.ov .gv--r`), Gt = document.querySelector(`.ov .gh[data-out="u"]`), Kt = document.querySelector(`.ov .gh[data-out="d"]`), qt = [...document.querySelectorAll(`.ov .gx:not(.gx--lock)`)])
}
var Xt = e => 1 - (1 - d(e, 0, 1)) ** 3,
    Zt = [
        [0, 0, 2.6],
        [.4, 1, .78],
        [.62, .15, 1.14],
        [1, 1, 1]
    ];

function Qt(e) {
    for (let t = 1; t < Zt.length; t++)
        if (e <= Zt[t][0]) {
            let [n, r, i] = Zt[t - 1], [a, o, s] = Zt[t], c = (e - n) / (a - n);
            return {
                a: r + (o - r) * c,
                s: i + (s - i) * c
            }
        } return {
        a: 1,
        s: 1
    }
}

function $t(e, t, n, r, i, a) {
    if (!It) return;
    let o = 1 - d(t / .08, 0, 1),
        s = e.readyState >= 2 && e.videoWidth,
        c = a && a.el && a.el.complete && a.el.naturalWidth,
        l = s ? e : c ? a.el : null;
    if (Ht = l ? o : 0, Ht <= .001) {
        It.style.opacity !== `0` && (It.style.opacity = `0`, Lt.clearRect(0, 0, It.width, It.height));
        return
    }
    It.style.opacity = Ht.toFixed(3);
    let u = l.videoWidth || l.naturalWidth,
        f = l.videoHeight || l.naturalHeight,
        p = Math.min(devicePixelRatio || 1, 2),
        m = Math.round(innerWidth * p),
        h = Math.round(innerHeight * p);
    (It.width !== m || It.height !== h) && (It.width = m, It.height = h);
    let g = m / innerWidth,
        _ = S.t0 < 0 ? -1 : C ? 10 : (n - S.t0) / 1e3;
    if (Lt.clearRect(0, 0, m, h), _ < 0) return;
    let v = document.querySelector(`.ov`).classList.contains(`on-light`),
        y = v ? `rgba(29,28,25,0.165)` : `rgba(255,255,255,0.225)`,
        b = v ? `rgb(29,28,25)` : `#fff`;
    Lt.fillStyle = y;
    let x = (e, t, n) => {
        if (!e) return;
        let r = e.getBoundingClientRect();
        if (!r.width && !r.height) return;
        let i = Xt((_ - t) / 1.15);
        i <= 0 || (n ? Lt.fillRect(r.left * g, r.top * g, g, r.height * g * i) : Lt.fillRect(r.left * g, r.top * g, r.width * g * i, g))
    };
    if (x(Ut, .2, !0), x(Wt, .3, !0), x(Gt, .25, !1), x(Kt, .4, !1), Lt.fillStyle = b, qt.forEach((e, t) => {
            let n = e.getBoundingClientRect();
            if (!n.width) return;
            let r = d((_ - (t ? 1.18 : 1.05)) / .72, 0, 1);
            if (r <= 0) return;
            let {
                a: i,
                s: a
            } = Qt(r), o = n.width * g * a, s = (n.left + n.width / 2) * g, c = (n.top + n.height / 2) * g;
            Lt.globalAlpha = i, Lt.setTransform(o / 24, 0, 0, o / 24, s - o / 2, c - o / 2), Lt.fill(Ft), Lt.setTransform(1, 0, 0, 1, 0, 0), Lt.globalAlpha = 1
        }), n - Bt > 40 || l !== Vt) {
        Bt = n, Vt = l;
        let e = Pt,
            t = Math.max(1, Math.round(Pt * f / u));
        (Rt.width !== e || Rt.height !== t) && (Rt.width = e, Rt.height = t);
        try {
            zt.drawImage(l, 0, 0, e, t);
            let n = zt.getImageData(0, 0, e, t),
                r = n.data;
            for (let e = 0; e < r.length; e += 4) {
                let t = (r[e + 2] - Math.max(r[e], r[e + 1]) - 8) / 34;
                r[e + 3] = t <= 0 ? 0 : t >= 1 ? 255 : Math.round(t * 255)
            }
            zt.putImageData(n, 0, 0)
        } catch {
            return
        }
    }
    let ee = Math.max(m / u, h / f),
        te = u * ee,
        w = f * ee,
        T = (m - te) / 2 - (r || 0) * te,
        E = (h - w) / 2;
    {
        let e = (i || 1) * (a ? 1.06 - .06 * a.p : 1),
            t = m / 2,
            n = h / 2;
        T = t + (T - t) * e, E = n + (E - n) * e, te *= e, w *= e
    }
    Lt.globalCompositeOperation = `destination-in`, Lt.drawImage(Rt, T, E, te, w), Lt.globalCompositeOperation = `source-over`
}
var en, tn, nn, rn = [],
    an = [],
    on = -1,
    sn = -1;

function cn(e) {
    let t = [],
        n = [];
    return [...e.childNodes].forEach(e => {
        if (e.nodeType !== 3) return;
        let r = document.createDocumentFragment();
        e.nodeValue.split(/(\s+)/).forEach(e => {
            if (!e) return;
            if (/^\s+$/.test(e)) {
                r.appendChild(document.createTextNode(e));
                return
            }
            let i = document.createElement(`span`);
            i.className = `wd`;
            for (let t of e) {
                let e = document.createElement(`span`);
                e.className = `ch`, e.textContent = t, e.dataset.c = t, i.appendChild(e), n.push(e)
            }
            t.push(i), r.appendChild(i)
        }), e.parentNode.replaceChild(r, e)
    }), {
        words: t,
        chars: n
    }
}

function ln(e) {
    let t = e.textContent;
    e.textContent = ``;
    let n = [];
    return t.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (/^\s+$/.test(t)) {
            e.appendChild(document.createTextNode(t));
            return
        }
        let r = document.createElement(`span`);
        r.className = `wd`;
        for (let e of t) {
            let t = document.createElement(`span`);
            t.className = `ch`, t.textContent = e, r.appendChild(t), n.push(t)
        }
        e.appendChild(r)
    }), n
}

function un() {
    en = document.querySelector(`.ov`), tn = document.querySelector(`.ov .fill`), nn = document.querySelector(`.ov .tag`), rn = [
        [0, .045],
        [.26, .4],
        [.44, .55],
        [.56, .65]
    ].map(([e, t], n) => {
        let r = [...document.querySelectorAll(`.bk[data-beat="${n}"]`)];
        return {
            a: e,
            b: t,
            els: r,
            lines: r.flatMap(e => [...e.querySelectorAll(`.ln i`)]),
            stand: r.map(e => e.querySelector(`.stand`)).filter(Boolean),
            chars: r.flatMap(e => [...e.querySelectorAll(`.stand`)].flatMap(ln)),
            heads: [...r.flatMap(e => [...e.querySelectorAll(`.ln i`)])].map(e => ({
                i: e,
                ...cn(e)
            })),
            shown: !1
        }
    }), an = [...document.querySelectorAll(`.ov [data-out]`)].map(e => ({
        el: e,
        role: e.dataset.out,
        base: parseFloat(getComputedStyle(e).opacity) || 1,
        x0: 0,
        y0: 0
    })), addEventListener(`resize`, dn), requestAnimationFrame(dn)
}

function dn() {
    for (let e of an) {
        e.el.style.transform = ``;
        let t = e.el.getBoundingClientRect();
        e.x0 = t.left + t.width / 2, e.y0 = t.top + t.height / 2, e.el.classList.contains(`gv--r`) && (e.el.style.top = ``, e.top0 = e.el.getBoundingClientRect().top)
    }
}

function fn(e, t) {
    en.classList.add(`go`), sn = e + t, S.t0 = e
}

function pn(e, t) {
    e.heads.forEach((e, n) => {
        let r = m(d((t - n * .115) / .6, 0, 1));
        e.i.style.transform = `translate(var(--exitX, 0px), calc(${((1-r)*175).toFixed(2)}% + var(--exitY, 0px)))`
    })
}

function mn(e, t) {
    let n = v.pan,
        r = !1;
    for (let n of rn) {
        let i = n.b - n.a,
            a = d((e - n.a) / i, 0, 1),
            o = e > n.a - .02 && e < n.b + .02;
        if (o !== n.shown && (n.shown = o, n.els.forEach(e => {
                e.style.visibility = o ? `visible` : `hidden`
            })), !o) continue;
        r = !0;
        let s = n === rn[0],
            c = s ? f(d((1 - a) / .28, 0, 1)) : Math.min(f(d(a / .16, 0, 1)), f(d((1 - a) / .2, 0, 1)));
        if (s) {
            let e = 1 - c,
                t = e * e;
            n.els.forEach(e => {
                e.style.opacity = c.toFixed(3)
            }), n.heads.forEach((e, n) => {
                let r = t * (1 + n * .16);
                e.i.style.setProperty(`--exitX`, `${(-r*54).toFixed(2)}px`), e.i.style.setProperty(`--exitY`, `${(-r*7).toFixed(2)}px`)
            }), n.els.forEach(n => {
                n.style.transform = `translate3d(${(-t*86).toFixed(1)}px,${(-t*14).toFixed(1)}px,0) scale(${(1-t*.04).toFixed(4)})`, n.style.filter = e > .02 ? `blur(${(t*5).toFixed(2)}px)` : ``
            })
        } else n.els.forEach(e => {
            e.style.opacity = c.toFixed(3), e.style.transform = ``, e.style.filter = ``
        });
        let l = s ? sn < 0 ? 0 : d((t - sn) / Ve, 0, 1) : d((a - .03) / .3, 0, 1);
        if (pn(n, l), s) {
            let e = m(d((l - .34) / .3, 0, 1)),
                t = m(d((l - .52) / .22, 0, 1));
            n.els.forEach(n => {
                let r = n.querySelector(`.cta`);
                if (!r) return;
                r.style.opacity = e.toFixed(3), r.style.transform = `translateY(${((1-e)*14).toFixed(1)}px)`;
                let i = r.querySelector(`.flood`);
                i && (i.style.clipPath = `inset(${((1-t)*100).toFixed(2)}% 0 0 0)`)
            })
        }
        if (nn) {
            let e = rn.indexOf(n);
            e !== on && (on = e, nn.textContent = Re[e] || Re[0]);
            let t = m(d((l - (s ? .8 : .35)) / .2, 0, 1)) * c;
            nn.style.opacity = t.toFixed(3), nn.style.transform = `translateY(${((1-t)*10).toFixed(1)}px)`
        }
        let u = d(s ? (l - .56) / .36 : (a - .14) / .26, 0, 1) * (n.chars.length + 4);
        n.chars.forEach((e, t) => {
            e.style.opacity = d((u - t) * 2.4, 0, 1).toFixed(2)
        })
    }
    nn && !r && on !== -1 && (on = -1, nn.style.opacity = `0`);
    {
        let t = k.at + A.over * k.len;
        v.p = e, v.lockEnd = t;
        let r = f(d((e - (t - A.len)) / A.len, 0, 1)),
            i = innerWidth * le.x,
            a = innerHeight * (1 - le.y),
            o = A.e > 0 ? innerWidth * (A.e / k.ax) : innerWidth * A.w / 100,
            s = A.e > 0 ? innerHeight * (A.e / k.ay) : innerHeight * A.h / 100,
            c = {
                l: i - o,
                r: i + o,
                ld: i - o,
                rd: i + o,
                lu: i - o,
                ru: i + o
            },
            l = {
                u: a - s,
                d: a + s,
                ld: a + s,
                rd: a + s,
                lu: a - s,
                ru: a - s
            },
            u = d((e - k.at) / k.len, 0, 1),
            p = g(d((u - (A.auto > .5 ? d(M() + A.lead, 0, 1) : A.ret)) / A.retLen, 0, 1), A.ease),
            m = f(d((u - (A.ret - .18)) / .18, 0, 1)),
            h = 1 + .85 * Math.max(0, Math.sin(Math.PI * d((r - .55) / .45, 0, 1)));
        for (let e of an) {
            if (n > 0 && e.el.classList.contains(`fill`)) continue;
            let t = e.el.classList.contains(`gx`),
                i = t ? r : r * (1 - p),
                a = c[e.role] === void 0 ? 0 : (c[e.role] - e.x0) * i,
                o = l[e.role] === void 0 ? 0 : (l[e.role] - e.y0) * i,
                s = e.el.classList.contains(`gh`) && e.role === `d`,
                u = e.el.classList.contains(`gv--r`);
            if (s && (o += p * (innerHeight + 24 - e.y0)), u) {
                let t = innerWidth <= 720 ? 1 - f(d((v.burn - .1) / .25, 0, 1)) : 1;
                a += p * t * (y.x - e.x0)
            }
            let g = t ? ` scale(${h.toFixed(3)})` : ``;
            if (u) {
                let t = innerWidth <= 720 ? 0 : f(d((v.coda - .42) / .3, 0, 1));
                e.el.style.top = (e.top0 * (1 - Math.max(i, p)) + t * innerHeight).toFixed(1) + `px`
            }
            e.el.style.transform = `translate(${a.toFixed(1)}px,${o.toFixed(1)}px)${g}`;
            let _ = e.el.classList.contains(`fill`) ? 1 - r : 1,
                b = e.el.classList.contains(`gx--lock`) ? f(d(r / .5, 0, 1)) : 1,
                x = t ? 1 - m : s ? 1 - p : 1,
                ee = 1 - Jt();
            e.el.style.opacity = (e.base * _ * b * x * ee).toFixed(3)
        }
        if (v.g = r, v.off = p, ee.lit) en.style.getPropertyValue(`--rule`) && (en.style.removeProperty(`--rule`), en.style.removeProperty(`--cross`), en.style.removeProperty(`--mark`));
        else if (r > .001) {
            let e = (e, t) => e + (t - e) * p,
                t = [e(29, 255), e(28, 255), e(25, 255)].map(Math.round).join(` `);
            en.style.setProperty(`--rule`, `rgb(${t} / ${e(.165+.5*r,.225).toFixed(3)})`), en.style.setProperty(`--cross`, `rgb(${t} / ${e(.34+.6*r,.525).toFixed(3)})`), en.style.setProperty(`--mark`, p > .5 ? `#fff` : `var(--ink)`)
        } else en.style.getPropertyValue(`--rule`) && (en.style.removeProperty(`--rule`), en.style.removeProperty(`--cross`), en.style.removeProperty(`--mark`))
    }
    if (v.burn = d((e - k.at) / k.len, 0, 1), tn)
        if (n > 0) tn.style.opacity = `0`;
        else {
            let t = ze * (1 - f(d((e - .052) / .09, 0, 1)));
            tn.style.left = t.toFixed(2) + `%`, tn.style.width = ((Be - t) * f(e)).toFixed(2) + `%`
        }
}
var hn = `M12 0Q13.1 10.9 24 12Q13.1 13.1 12 24Q10.9 13.1 0 12Q10.9 10.9 12 0Z`,
    gn, _n, vn, yn, bn = [];

function xn() {
    if (gn = document.querySelector(`.faq`), _n = gn && gn.querySelector(`.faq-lead`), vn = _n && _n.querySelector(`line`), yn = _n && _n.querySelector(`rect`), bn = [], gn)
        for (let e = 0; e < Te.length; e++) {
            let t = document.createElement(`div`);
            t.className = `fq`, t.innerHTML = `<span class="fr"></span><span class="st a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${hn}"/></svg></span><span class="st b"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${hn}"/></svg></span><h3>${Te[e][0]}</h3><p>${Te[e][2]}</p>`, gn.appendChild(t), bn.push(t)
        }
}
var Sn = !1;

function Cn(e) {
    if (!gn) return;
    if (gn.style.opacity = e > .001 ? `1` : `0`, e <= .001) {
        if (Sn) return;
        Sn = !0
    } else Sn = !1;
    let t = innerWidth,
        n = innerHeight,
        r = bn.length,
        i = Math.max(t / De[0], n / De[1]),
        a = De[0] * i,
        o = De[1] * i,
        s = (t - a) / 2,
        c = (n - o) / 2,
        l = d(e / .85, 0, 1),
        u = .22,
        p = d((l - u) / (1 - u), 0, 1),
        m = 360 / r,
        h = -p * (360 - m),
        g = 0,
        _ = -2;
    for (let e = 0; e < r; e++) {
        let t = Math.cos(((e * m + h) % 360 + 360) % 360 * Math.PI / 180);
        t > _ && (_ = t, g = e)
    }
    let v = t <= 720,
        y = v ? t * .36 : Math.min(360, t * .26),
        x = v ? Math.min(1, t / 560) : 1;
    for (let e = 0; e < r; e++) {
        let t = bn[e],
            r = f(d((l - .04 - e * .05) / .22, 0, 1)),
            i = ((e * m + h) % 360 + 360) % 360,
            a = i * Math.PI / 180,
            o = (Math.cos(a) + 1) / 2,
            s = e === g && o > .9 && r > .92;
        s !== t.classList.contains(`on`) && t.classList.toggle(`on`, s), t.style.left = `50%`, t.style.top = (n * .602).toFixed(0) + `px`, t.style.transform = `translate(${(-50+b.x*2.4).toFixed(2)}%,${(-50+b.y*2).toFixed(2)}%) rotateY(${i.toFixed(2)}deg) translateZ(${y}px) rotateY(${(-i).toFixed(2)}deg) translateY(${(Math.sin(a)*26-(1-r)*34).toFixed(1)}px) scale(${(Math.round(r*x*(.58+.42*o**1.4)*100)/100).toFixed(2)})`;
        let c = Math.round((1 - o) * 8.4) / 2;
        t.style.filter = c > .05 ? `blur(${c.toFixed(1)}px)` : ``, t.style.zIndex = Math.round(o * 100)
    }
    let [ee, S] = Ee[g], C = s + ee * a, te = c + S * o, w = bn[g].getBoundingClientRect(), T = C < t / 2 ? w.left - 34 : w.right + 34, E = w.top + 26, ne = f(d(((_ + 1) / 2 - .9) / .055, 0, 1));
    yn.setAttribute(`x`, (T - 4).toFixed(1)), yn.setAttribute(`y`, (E - 4).toFixed(1)), vn.setAttribute(`x1`, C.toFixed(1)), vn.setAttribute(`y1`, te.toFixed(1)), vn.setAttribute(`x2`, T.toFixed(1)), vn.setAttribute(`y2`, E.toFixed(1)), _n.style.opacity = ne.toFixed(3)
}

function wn(e) {
    if (!gn) return 0;
    let t = f(d((e - .8) / .2, 0, 1));
    return gn.classList.toggle(`out`, t > .001), t > .001 ? (gn.style.setProperty(`--go`, Math.round((80 - t * 80) / 2) * 2 + `%`), gn.style.filter = `blur(${(Math.round(t*18)/2).toFixed(1)}px)`, gn.style.transform = `translateY(${(-t*innerHeight*.06).toFixed(1)}px) scale(${(Math.round((1+t*.05)*100)/100).toFixed(2)})`) : (gn.style.filter = ``, gn.style.transform = ``), t
}
var Tn = `0x4AAAAAAECR6CzEFNGbEa4o`,
    En = null,
    Dn = null,
    On = null,
    kn = null;

function An() {
    return On || (On = new Promise((e, t) => {
        window.__pearTurnstileReady = () => e(window.turnstile);
        let n = document.createElement(`script`);
        n.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__pearTurnstileReady`, n.async = !0, n.onerror = () => t(Error(`turnstile script`)), document.head.appendChild(n)
    }), On)
}
async function jn() {
    if (En = await An(), Dn === null) {
        let e = document.createElement(`div`);
        e.style.cssText = `position:fixed;left:-9999px;bottom:0`, document.body.appendChild(e), Dn = En.render(e, {
            sitekey: Tn,
            execution: `execute`,
            callback: e => kn && kn.resolve(e),
            "error-callback": () => kn && kn.reject(Error(`challenge`))
        })
    }
    return new Promise((e, t) => {
        kn = {
            resolve: e,
            reject: t
        };
        let n = setTimeout(() => e(``), 15e3);
        kn.resolve = t => {
            clearTimeout(n), e(t)
        }, kn.reject = () => {
            clearTimeout(n), e(``)
        }, En.reset(Dn), En.execute(Dn)
    })
}

function Mn() {
    let e = document.querySelector(`.cf-cta`);
    if (!e) return;
    let t = e => document.querySelector(`.cf-in [data-k="${e}"]`),
        n = e.textContent,
        r = !1,
        i = !1;
    document.querySelector(`.cf-in`).addEventListener(`focusin`, () => {
        An().catch(() => {})
    }, {
        once: !0
    }), e.addEventListener(`click`, async () => {
        if (r || i) return;
        let a = t(`name`).value.trim(),
            o = t(`email`).value.trim(),
            s = t(`grow`).value.trim();
        if (!a) return t(`name`).focus();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)) return t(`email`).focus();
        if (!s) return t(`grow`).focus();
        r = !0, e.textContent = `Sending —`;
        try {
            let t = await jn().catch(() => ``),
                n = await (await fetch(`/api/apply`, {
                    method: `POST`,
                    headers: {
                        "content-type": `application/json`
                    },
                    body: JSON.stringify({
                        name: a,
                        email: o,
                        message: s,
                        fax: ``,
                        turnstileToken: t
                    })
                })).json().catch(() => ({
                    ok: !1
                }));
            if (!n.ok) throw Error(n.error || `send`);
            i = !0, e.textContent = `Application sent.`, e.style.cursor = `default`
        } catch {
            r = !1, e.textContent = `Send failed — email info@pear.no`, setTimeout(() => {
                !i && !r && (e.textContent = n)
            }, 4e3)
        } finally {
            i || (r = !1)
        }
    })
}
var Nn, Pn, Fn, In = -1,
    Ln = null,
    Rn = 0,
    zn, Bn, Vn, Hn, Un, Wn, Gn = [],
    Kn = [],
    qn = -1,
    Jn = [],
    Yn = 0,
    Xn = [0, 0],
    Zn, Qn = !1,
    $n = !1,
    er = !1,
    tr, nr, rr, ir, ar, or, sr, cr, lr = -1,
    ur = null;

function dr(e, t) {
    (e.width !== t.naturalWidth || e.height !== t.naturalHeight) && (e.width = t.naturalWidth, e.height = t.naturalHeight), e.getContext(`2d`).drawImage(t, 0, 0)
}
var fr, pr = null,
    mr = null,
    hr = -1,
    gr = !1,
    _r = -1,
    vr = 0,
    yr = 0,
    br = !1,
    xr = null,
    Sr = [];

function Cr(e) {
    let t = e || 1,
        n = () => (t = t * 1103515245 + 12345 & 2147483647) / 2147483647;
    Sr = [];
    for (let e = 0; e < 4; e++) {
        let e = n() * Math.PI * 2,
            t = .35 + n() * .9;
        Sr.push({
            d: +(n() * .34).toFixed(3),
            r: +(.42 + n() * .58).toFixed(3),
            e: Math.floor(n() * _.length),
            ax: +(Math.cos(e) * t).toFixed(3),
            ay: +(Math.sin(e) * t * .6).toFixed(3),
            rz: +((n() - .5) * 7).toFixed(2)
        })
    }
}

function wr() {
    Cr(0), Nn = document.querySelector(`.fly`), Pn = document.querySelector(`.fly-w`), Fn = wt(`/films/flysky`, 121, 2, 1 - ce - se - oe, 1), sr = document.querySelector(`.trans`), cr = wt(`/films/trans`, 121, 2, 1 - ce, 1), Zn = document.querySelector(`.foot`), Zn.muted = !0, Zn.setAttribute(`muted`, ``);
    let e = () => {
        if (er) return;
        let t = document.documentElement.scrollHeight - innerHeight;
        if (t < 1 || scrollY / t < .5) return;
        er = !0, removeEventListener(`touchstart`, e);
        let n = Zn.play();
        n && n.then && n.then(() => {
            Qn || Zn.pause()
        }).catch(() => {})
    };
    if (addEventListener(`touchstart`, e, {
            passive: !0
        }), fr = document.querySelector(`.ftx`), tr = document.querySelector(`.ft`), nr = tr && tr.querySelector(`.ft-in`), rr = tr ? [...tr.querySelectorAll(`.ft-r`)] : [], ir = tr && tr.querySelector(`.ft-box rect`), ar = tr ? [...tr.querySelectorAll(`.ft-st,.ft-mark,.ft-tag,.ft-meta`)] : [], or = tr ? [...tr.querySelectorAll(`.ft-tag .ln i`)] : [], ir && (ir.style.strokeDasharray = 2 * 1442), zn = document.querySelector(`.cf`), Bn = document.querySelector(`.cf-lead`), Vn = zn && zn.querySelector(`.cf-in`), Hn = document.querySelector(`.cf-orb`), Un = Hn ? [...Hn.querySelectorAll(`ellipse`)] : [], Wn = document.querySelector(`.cf-gl`), Wn)
        for (let e = 0; e < ke.length; e++) {
            let t = document.createElement(`i`);
            t.style.setProperty(`--dur`, (1.9 + e % 7 * .42).toFixed(2) + `s`), t.style.setProperty(`--dl`, (-(e * .53) % 3.1).toFixed(2) + `s`), Wn.appendChild(t), Gn.push(t)
        }
    Tr()
}

function Tr() {
    if (!Vn) return;
    for (let e = 0; e < Oe.length; e++) {
        let [t, n, r, i, a, o, s, c] = Oe[e], l = document.createElement(`div`);
        l.className = r === `area` ? `cf-f` : `cf-f pill`, l.style.cssText = `left:${i}px;top:${a}px;width:${o}px;height:${s}px`, l.innerHTML = `<span class="rim"></span><span class="rim2"></span><span class="ic"><svg viewBox="0 0 24 24"><path d="${c}"/></svg></span>${r===`area`?`<textarea data-k="${t}" rows="4" placeholder="${n}"></textarea>`:`<input data-k="${t}" type="${r}" placeholder="${n}">`}`;
        let u = l.querySelector(`input,textarea`);
        l.addEventListener(`click`, () => u.focus()), l.addEventListener(`pointerenter`, () => {
            qn = e
        }), l.addEventListener(`pointerleave`, () => {
            qn === e && (qn = -1)
        }), Vn.appendChild(l), Kn.push(l)
    }
    let e = document.createElement(`button`);
    e.className = `cf-cta`, e.type = `button`, e.textContent = `Send the application`, e.style.cssText = `left:452px;top:486px;width:262px;height:40px`, e.addEventListener(`pointerenter`, () => {
        qn = Kn.length - 1
    }), e.addEventListener(`pointerleave`, () => {
        qn === Kn.length - 1 && (qn = -1)
    }), Vn.appendChild(e), Kn.push(e), Vn.addEventListener(`pointerdown`, e => {
        if (!(e.target.closest && e.target.closest(`input,textarea,button`)))
            for (let t of Kn) {
                let n = t.getBoundingClientRect();
                if (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) continue;
                let r = t.querySelector && t.querySelector(`input,textarea`);
                r ? (e.preventDefault(), r.focus()) : t.click && t.click();
                return
            }
    }), Mn()
}

function Er(e, t) {
    let n = innerWidth,
        r = innerHeight,
        i = t === void 0 ? I.bgScale : t,
        a = e === void 0 ? innerWidth <= 720 ? 50 + (Ye.x - 50) * d((Rn - Ye.from) / Math.max(.02, Ye.span), 0, 1) : 50 + (I.bgX - 50) * f(d((Rn - .26) / .34, 0, 1)) : e,
        o = Math.max(n / 1280, r / 720),
        s = 1280 * o * i,
        c = 720 * o * i;
    return {
        dw: s,
        dh: c,
        ox: (n - s) * (a / 100),
        oy: (r - c) * (I.bgY / 100)
    }
}

function Dr(e) {
    if (!Nn) return;
    if (Rn = e, e > 1e-4 && !er && (er = !0, Zn.load()), e <= 1e-4) {
        Nn.style.opacity = `0`, In = -1;
        return
    } {
        let t = Math.min(120, Math.round(e * 120));
        if (Fn.aim(t), Fn.ready && t !== In) {
            let e = Fn.near(t);
            e && (e !== Ln && (dr(Nn, e), Ln = e), In = t)
        }
    }
    Nn.style.opacity = f(d(e / .05, 0, 1)).toFixed(3), Pn.style.opacity = `0`;
    let t = Er();
    Nn.style.width = t.dw.toFixed(1) + `px`, Nn.style.height = t.dh.toFixed(1) + `px`, Nn.style.left = t.ox.toFixed(1) + `px`, Nn.style.top = t.oy.toFixed(1) + `px`
}
var Or = ``,
    kr = [];

function Ar(e) {
    if (!Hn || (Hn.style.opacity = e.toFixed(3), e < .002)) return;
    let t = Er(),
        n = `${e.toFixed(3)}|${t.ox.toFixed(1)}|${t.oy.toFixed(1)}|${t.dw.toFixed(1)}`,
        r = n !== Or;
    Or = n;
    for (let n = 0; n < Un.length; n++) {
        let [i, a, o, s, c] = Ae[n], l = Un[n], u = t.ox + i * t.dw, p = t.oy + a * t.dh, m = o * t.dw, h = s * t.dh;
        if (r) {
            l.setAttribute(`cx`, u.toFixed(1)), l.setAttribute(`cy`, p.toFixed(1)), l.setAttribute(`rx`, m.toFixed(1)), l.setAttribute(`ry`, h.toFixed(1));
            let t = (m - h) ** 2 / (m + h) ** 2,
                r = Math.PI * (m + h) * (1 + 3 * t / (10 + Math.sqrt(4 - 3 * t))),
                i = f(d((e - n * .16) / .52, 0, 1));
            l.style.strokeDasharray = `1.4 7`, l.style.strokeDashoffset = ((1 - i) * r).toFixed(1), l.style.opacity = i.toFixed(3), l.style.setProperty(`--adur`, (7.5 + n * 2.6).toFixed(1) + `s`), l.style.setProperty(`--adl`, (-(n * 3.1)).toFixed(1) + `s`)
        }
        let g = c + performance.now() / 1e3 * (n % 2 ? -.6 : .9),
            _ = (Math.round(g / .2) * .2).toFixed(1);
        (kr[n] !== _ || r) && (kr[n] = _, l.setAttribute(`transform`, `rotate(${_} ${u.toFixed(1)} ${p.toFixed(1)})`))
    }
}
var jr = ``;

function Mr(e) {
    if (!Wn || (Wn.style.opacity = e.toFixed(3), e < .002)) return;
    let t = Er(),
        n = `${t.ox.toFixed(1)}|${t.oy.toFixed(1)}|${t.dw.toFixed(1)}`;
    if (n !== jr) {
        jr = n;
        for (let e = 0; e < Gn.length; e++) {
            let [n, r, i] = ke[e], a = (i === 2 ? 78 : 46) * I.bgScale, o = Gn[e];
            o.style.left = (t.ox + n * t.dw).toFixed(1) + `px`, o.style.top = (t.oy + r * t.dh).toFixed(1) + `px`, o.style.width = a.toFixed(1) + `px`, o.style.height = a.toFixed(1) + `px`
        }
    }
}
var Nr = !1,
    Pr = null;

function Fr(e, t) {
    if (!zn) return;
    if (e <= 5e-4 && Yn <= 5e-4 && t <= I.at) {
        if (Nr) return;
        Nr = !0
    } else Nr = !1;
    Mr(f(d((t - .9) / .1, 0, 1))), Ar(f(d((t - .8) / .2, 0, 1)));
    let n = d((t - I.at) / I.span, 0, 1),
        r = f(n);
    if (Bn) {
        let e = d((n - I.hold - .1) / .46, 0, 1),
            t = e * e * e * (e * (e * 6 - 15) + 10);
        Bn.style.opacity = t.toFixed(3), Bn.style.transform = `translateY(${((1-t)*11).toFixed(1)}px)`
    }
    zn.style.opacity = r > .001 || e > .001 ? `1` : `0`;
    {
        let t = e > .001 || n > .995;
        zn.classList.toggle(`live`, t), zn.inert = !t, zn.setAttribute(`aria-hidden`, String(!t))
    }
    zn.style.perspective = I.persp + `px`;
    let i = innerWidth,
        a = innerHeight,
        o = i <= 720,
        s = o ? Math.min(i * Ze.w / 496, (a - 240) / 378) / I.scale : Math.min(i / 1180, a / 900),
        c = o ? Ze.x - 210 * s * I.scale : I.px,
        l = s * I.scale,
        u = o ? 60 - a / 2 + 232 * l + Ze.y : I.py,
        p = Math.max(f(d((e - .06) / .4, 0, 1)), r),
        m = (1 - p) * I.ryIn + I.ry + b.x * 5.5,
        h = (1 - p) * I.rxIn + I.rx - b.y * 4,
        g = (1 - p) * I.rzIn + I.rz,
        v = Er(),
        y = v.ox + .3715 * v.dw,
        x = v.oy + .148 * v.dh,
        ee = d((n - I.hold) / Math.max(.02, I.run), 0, 1),
        S = 1 - _[I.ease | 0].f(ee),
        C = Yn > 5e-4 ? `translate3d(0,${(-Yn*innerHeight*1.22).toFixed(1)}px,0) scale(${(1+Yn*.1).toFixed(4)}) ` : ``,
        te = (e, t) => C + `translate(${(c+e+b.x*16).toFixed(1)}px, ${(u+t+(1-p)*90+b.y*12).toFixed(1)}px) scale(${(s*I.scale).toFixed(4)}) rotateX(${h.toFixed(2)}deg) rotateY(${m.toFixed(2)}deg) rotateZ(${g.toFixed(2)}deg)`;
    !Pr && Kn[0] && (Pr = Kn[0].querySelector(`.ic`));
    let w = S > .002 && Pr;
    if (w) {
        Vn.style.transform = te(0, 0);
        let e = w.getBoundingClientRect();
        Xn = [y - (e.left + e.width / 2), x - (e.top + e.height / 2)]
    }
    Vn.style.transform = te(Xn[0] * S, Xn[1] * S);
    for (let e = 0; e < Kn.length; e++) {
        let t = Sr[e % Sr.length],
            n = f(d((r - e * I.stagger) / I.each, 0, 1));
        Kn[e].style.opacity = n.toFixed(3);
        let i = qn < 0 ? 0 : e === qn ? I.pop : -I.push;
        Jn[e] = (Jn[e] || 0) + (i - (Jn[e] || 0)) * .12;
        let a = e === qn ? 1 : qn < 0 ? 0 : -1,
            o = (Kn.length - 1 - e) * 7,
            s = d((ee - t.d) / Math.max(.05, t.r), 0, 1),
            c = 1 - _[t.e].f(s),
            l = (t.ax * c * 90).toFixed(1),
            u = (t.ay * c * 90).toFixed(1);
        Kn[e].style.transform = `translate3d(${l}px, ${u}px, ${((1-n)*-180+o+Jn[e]).toFixed(1)}px) rotateZ(${(t.rz*c).toFixed(2)}deg)`, Kn[e].style.filter = a < 0 && innerWidth > 720 ? `brightness(${(1-.1*(-Jn[e]/Math.max(1,I.push))).toFixed(3)})` : ``;
        let p = Kn[e].style;
        p.setProperty(`--blur`, I.blur + `px`), p.setProperty(`--fill`, I.fill), p.setProperty(`--rim`, I.rim), p.setProperty(`--bev`, I.bev + `px`), p.setProperty(`--bev2`, I.bev2), p.setProperty(`--spec`, I.spec), p.setProperty(`--sat`, I.sat), p.setProperty(`--ins`, I.ins), p.setProperty(`--insB`, I.insB + `px`), p.setProperty(`--insY`, I.insY + `px`)
    }
}

function Ir() {
    let e = fr.getContext(`webgl`);
    if (!e) return null;
    let t = (t, n) => {
            let r = e.createShader(t);
            return e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (console.warn(e.getShaderInfoLog(r)), null)
        },
        n = t(e.VERTEX_SHADER, At),
        r = t(e.FRAGMENT_SHADER, jt);
    if (!n || !r) return null;
    let i = e.createProgram();
    e.attachShader(i, n), e.attachShader(i, r), e.linkProgram(i), e.useProgram(i);
    let a = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, a), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), e.STATIC_DRAW);
    let o = e.getAttribLocation(i, `a`);
    e.enableVertexAttribArray(o), e.vertexAttribPointer(o, 2, e.FLOAT, !1, 0, 0), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0);
    let s = t => {
            let n = e.createTexture();
            return e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, n), [
                [e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE],
                [e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE],
                [e.TEXTURE_MIN_FILTER, e.LINEAR],
                [e.TEXTURE_MAG_FILTER, e.LINEAR]
            ].forEach(([t, n]) => e.texParameteri(e.TEXTURE_2D, t, n)), n
        },
        c = s(0),
        l = s(1),
        u = new Uint8Array([11, 10, 9, 255]);
    for (let [t, n] of [
            [0, c],
            [1, l]
        ]) e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, n), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, u);
    let d = {};
    for (let t of [`progress`, `grade`, `scaleB`, `mode`, `radius`, `width`, `intensity`, `time`, `res`, `img`]) d[t] = e.getUniformLocation(i, t);
    let f = t => e.getUniformLocation(i, t);
    return e.uniform1i(f(`t1`), 0), e.uniform1i(f(`t2`), 1), e.uniform1f(d.scaleB, Fe.scaleB), e.uniform1f(d.mode, Fe.mode), e.uniform1f(d.radius, Fe.radius), e.uniform1f(d.width, Fe.width), e.uniform1f(d.intensity, Fe.noise), e.uniform2f(d.img, 1920, 1080), {
        g: e,
        loc: d,
        tA: c,
        tB: l
    }
}
var Lr = e => {
    let t = 1;
    for (; t < Ie.length - 1 && e > Ie[t];) t++;
    let n = (e - Ie[t - 1]) / (Ie[t] - Ie[t - 1]);
    return Le[t - 1] + (Le[t] - Le[t - 1]) * d(n, 0, 1)
};

function Rr(e, t) {
    if (pr ||= Ir(), !pr) return 0;
    let n = d((e - Fe.at) / Fe.span, 0, 1);
    if (n <= 5e-4) return fr.style.opacity = `0`, br = !1, 0;
    fr.style.opacity = `1`, br = !0;
    let {
        g: r,
        loc: i
    } = pr, a = Math.min(devicePixelRatio, innerWidth <= 720 ? 1.5 : 2), o = Math.round(innerWidth * a), s = Math.round(innerHeight * a);
    (fr.width !== o || fr.height !== s) && (fr.width = o, fr.height = s), r.viewport(0, 0, fr.width, fr.height);
    let c = !1;
    if (t && t.complete && t.naturalWidth && t !== mr && (mr = t, c = !0, r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, pr.tA), gr ? r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, t) : (r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t), gr = !0)), Zn.readyState >= 2 && Zn.currentTime !== hr) {
        let e = hr < 0;
        hr = Zn.currentTime, c = !0, r.activeTexture(r.TEXTURE1), r.bindTexture(r.TEXTURE_2D, pr.tB), e ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, Zn) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, Zn)
    }
    if (n !== _r && (_r = n, c = !0), (fr.width !== vr || fr.height !== yr) && (vr = fr.width, yr = fr.height, c = !0), !c) return 1;
    let l = d(Zn.currentTime || 0, 0, 10);
    return r.uniform1f(i.progress, n), r.uniform1f(i.grade, .955 / Lr(l)), r.uniform1f(i.time, performance.now() / 1e3), r.uniform2f(i.res, fr.width, fr.height), r.drawArrays(r.TRIANGLES, 0, 3), 1
}

function zr(e) {
    if (!tr || (tr.style.opacity = e > .001 ? `1` : `0`, document.body.classList.toggle(`ft-on`, e > .02), e < .001)) return;
    let t = Math.min(innerWidth / 1920, innerHeight / 1080) * (innerWidth <= 720 ? Qe.k : 1);
    nr.style.transform = `scale(${t.toFixed(5)})`;
    for (let t = 0; t < rr.length; t++) {
        let n = f(d((e - t * .04) / .26, 0, 1));
        rr[t].style.transform = rr[t].classList.contains(`h`) ? `scaleX(${n.toFixed(3)})` : `scaleY(${n.toFixed(3)})`
    }
    let n = f(d((e - .1) / .42, 0, 1));
    ir.style.strokeDashoffset = (2884 * (1 - n)).toFixed(1);
    for (let t = 0; t < ar.length; t++) {
        let n = f(d((e - .14 - t * .045) / .26, 0, 1));
        ar[t].style.opacity = n.toFixed(3)
    }
    for (let t = 0; t < or.length; t++) {
        let n = m(d((e - .2 - t * .075) / .34, 0, 1));
        or[t].style.transform = `translateY(${((1-n)*120).toFixed(1)}%)`
    }
}

function Br(e) {
    if (!Zn) return;
    if (!(e > 5e-4)) {
        zr(0), sr.style.opacity = `0`, Zn.style.opacity = `0`, fr.style.opacity = `0`, $n && ($n = !1, Yn = 0, zn && (zn.style.transform = ``, zn.style.filter = ``, zn.style.opacity = ``, zn.style.zIndex = ``), Vn && (Vn.style.filter = ``), Bn && (Bn.style.opacity = ``)), Qn && (Qn = !1, Zn.pause()), lr = -1;
        return
    }
    if (Qn = !0, Zn.paused && Zn.readyState >= 2) {
        let e = Zn.play();
        e && e.catch && e.catch(() => {})
    }
    let t = f(d(e / .34, 0, 1));
    $n = !0, Yn = t, zn && (zn.style.zIndex = `7`, zn.style.transform = ``, zn.style.filter = ``, zn.style.opacity = t > .99 ? `0` : `1`), Vn && (Vn.style.filter = t > .02 ? `blur(${(t*7).toFixed(2)}px)` : ``), Bn && (Bn.style.opacity = (1 - f(d(e / .28, 0, 1))).toFixed(3));
    let n = d(e / je, 0, 1);
    {
        let e = Math.min(120, Math.round(n * 120));
        if (cr.aim(e), cr.ready && e !== lr) {
            let t = cr.near(e);
            t && (t !== ur && (ur = t, br || (dr(sr, t), xr = t)), lr = e)
        }
    }
    let r = innerWidth <= 720,
        i = r ? 50 + (Ye.x - 50) * d((1 - Ye.from) / Math.max(.02, Ye.span), 0, 1) : I.bgX,
        a = f(d((n - (r ? Xe.at : .12)) / Math.max(.02, r ? Xe.span : .6), 0, 1)),
        o = Er(i + (50 - i) * a, I.bgScale + (1 - I.bgScale) * a);
    sr.style.width = o.dw.toFixed(1) + `px`, sr.style.height = o.dh.toFixed(1) + `px`, sr.style.left = o.ox.toFixed(1) + `px`, sr.style.top = o.oy.toFixed(1) + `px`;
    let s = Rr(n, lr >= 0 ? ur : null);
    !s && ur && xr !== ur && (dr(sr, ur), xr = ur), sr.style.opacity = lr >= 0 && !s ? `1` : `0`, Zn.style.opacity = !s && n >= 1 ? `1` : `0`, zr(f(d((e - je * .3) / (1 - je * .3), 0, 1)))
}
var Vr, Hr, Ur, Wr, Gr = [],
    Kr = [],
    qr = [],
    Jr = [],
    Yr, Xr, Zr, Qr, $r, ei = [],
    ti = [],
    ni = [],
    ri = 0,
    ii = !1,
    ai = -1,
    oi = 0,
    si = 0,
    ci = -1;

function li() {
    if (Vr = document.querySelector(`.fin`), Hr = [...document.querySelectorAll(`.fin-top, .fin-bot`)], Ur = document.querySelector(`.fin-g[data-f="1"] .fin-top`), Wr = document.querySelector(`.fin-g[data-f="1"] .fin-bot`), Gr = [...document.querySelectorAll(`.fin-g`)], Kr = Gr.map(e => [...e.querySelectorAll(`.fin-h .ln i`)]), qr = Gr.map(e => [...e.querySelectorAll(`.fin-l, .fin-chip, .fin-s`)]), Jr = Gr.map(e => [...e.querySelectorAll(`.fin-soak`)]), Yr = document.querySelector(`#inkf feDisplacementMap`), Xr = document.querySelector(`#inkf feFuncA`), innerWidth <= 720)
        for (let e of Jr)
            for (let t of e) t.style.filter = `none`;
    else
        for (let e of Jr[1] || []) e.style.filter = `none`;
    Zr = document.querySelector(`.sign`), Qr = Zr && Zr.querySelector(`.sg-a`), $r = Zr && Zr.querySelector(`.sg-b`), ei = $r ? [...$r.querySelectorAll(`path`)].map(e => {
        let t = e.getTotalLength();
        return e.style.strokeDasharray = t, e.style.strokeDashoffset = t, e.style.opacity = `0`, {
            el: e,
            a: +e.dataset.a,
            b: +e.dataset.b,
            len: t
        }
    }) : [], ti = [...document.querySelectorAll(`.ov .wob`)], ni = [...document.querySelectorAll(`.ov .gv, .ov .gh`)]
}

function ui(e, t, n) {
    if (!Vr) return ri;
    let r = innerWidth <= 720,
        i = innerWidth / 1516;
    r && Vr._join !== Ke.join && (Vr._join = Ke.join, Vr.style.setProperty(`--join`, (Ke.join * 100).toFixed(1) + `%`));
    for (let e of Hr) e === Ur || e === Wr || (e.style.transform = r ? `scale(1)` : `scale(${i.toFixed(5)})`);
    let a = d((v.plan - ge) / (1 - ge), 0, 1);
    ri = d((t - _e) / (1 - _e), 0, 1), v.ink = a;
    let o = d(e / ve, 0, 1),
        s = ri > .5 ? f(d((be(e) - Ce) / we, 0, 1)) : 0,
        c = [f(d(a / .22, 0, 1)), f(d(o / .02, 0, 1)) * (1 - s)];
    if (Ur) {
        let e = f(d(o / .78, 0, 1)),
            t = m(d(r ? e : (e - .62) / .38, 0, 1)),
            n = 1 + ((r ? qe : P) - 1) * (1 - t);
        if (r && (n = Math.round(n * 100) / 100), Ur.style.transform = r ? `translate(0px,${((1-e)*520).toFixed(1)}px) scale(${n.toFixed(4)})` : `scale(${i.toFixed(5)}) translate(0px,${((1-e)*1190).toFixed(1)}px) scale(${n.toFixed(4)})`, Wr) {
            let t = f(d((e - .55) / .4, 0, 1));
            Wr.style.transform = r ? `translateY(${((1-t)*110).toFixed(1)}px)` : `scale(${i.toFixed(5)}) translateY(${((1-t)*230).toFixed(1)}px)`, Wr.style.opacity = t.toFixed(3)
        }
    }
    let l = a >= .999 || a <= .001;
    if (Yr && Math.abs(a - ai) > 5e-4 && (l || innerWidth > 720 || n - oi > 33)) {
        oi = n, ai = a;
        let e = f(a);
        if (r)
            for (let t of Jr[0]) t.style.filter = a >= .999 ? `none` : `blur(${((1-e)*3.4).toFixed(2)}px) contrast(${(1+(1-e)*6).toFixed(2)})`, t.style.opacity = d(a * 1.12, 0, 1).toFixed(3);
        else {
            Yr.setAttribute(`scale`, ((1 - e) * 34).toFixed(2)), Xr.setAttribute(`intercept`, (-7.4 + 8.4 * d(a * 1.12, 0, 1)).toFixed(3)), Xr.setAttribute(`slope`, (9 - 5 * e).toFixed(2));
            for (let t of Jr[0]) t.style.setProperty(`--soak`, ((1 - e) * 3.4).toFixed(2) + `px`), t.style.setProperty(`--bite`, (1 + (1 - e) * 6).toFixed(2)), t.style.filter = a >= .999 ? `none` : ``
        }
    } {
        let e = !!ee.lit * (1 - f(d((ri - .35) / .2, 0, 1)));
        if (e > .01 !== ii) {
            ii = e > .01;
            for (let e of ni) e.classList.toggle(`warp`, ii);
            for (let e of ti) e._L = void 0
        }
        if (ii && n - si > 32) {
            si = n;
            let t = n * .001;
            for (let n of ti) {
                let r = n.parentElement;
                if (n._L === void 0) {
                    let e = r.getBoundingClientRect();
                    n._L = Math.max(1, r.classList.contains(`gv`) ? e.height : e.width)
                }
                let i = r.classList.contains(`gv`),
                    a = n._L,
                    o = e * 7.5,
                    s = ``;
                for (let e = 0; e <= 14; e++) {
                    let n = e / 14,
                        r = n * a,
                        c = o * (Math.sin(n * 5.2 + t * 1.25) * .62 + Math.sin(n * 11.4 - t * .87) * .38);
                    s += (e ? `L` : `M`) + (i ? `${(24+c).toFixed(1)},${r.toFixed(1)}` : `${r.toFixed(1)},${(24+c).toFixed(1)}`)
                }
                n.setAttribute(`viewBox`, i ? `0 0 49 ${a.toFixed(0)}` : `0 0 ${a.toFixed(0)} 49`), n.firstElementChild.setAttribute(`d`, s)
            }
        }
    }
    let u = r ? Math.round(s * 26) / 2 : s * 13;
    if (Gr[1].style.filter = u > .01 ? `blur(${u.toFixed(2)}px)` : ``, Math.abs(ri - ci) > 5e-4) {
        ci = ri;
        let e = (1.52 - 2.04 * ri) * 100;
        r ? (Gr[0].style.clipPath = ri > .001 ? `inset(0 0 ${d(100-e,0,100).toFixed(2)}% 0)` : ``, Gr[1].style.clipPath = ri > .001 && ri < .999 ? `inset(${d(e,0,100).toFixed(2)}% 0 0 0)` : ``) : (Gr[0].style.webkitMaskImage = Gr[0].style.maskImage = ri > .001 ? `linear-gradient(to top, rgba(0,0,0,0) ${(100-e-1.5).toFixed(1)}%, #000 ${(100-e+3).toFixed(1)}%)` : ``, Gr[1].style.webkitMaskImage = Gr[1].style.maskImage = ri > .001 && ri < .999 ? `linear-gradient(to top, #000 ${(100-e-1.5).toFixed(1)}%, rgba(0,0,0,0) ${(100-e+3).toFixed(1)}%)` : ``)
    }
    Vr.style.opacity = Math.max(c[0], c[1]) > .001 ? `1` : `0`;
    for (let e = 0; e < Gr.length; e++) {
        let t = c[e];
        Gr[e].style.opacity = t.toFixed(3);
        let n = Kr[e];
        for (let e = 0; e < n.length; e++) {
            let r = m(d((t - e * .12) / .62, 0, 1));
            n[e].style.transform = `translateY(${((1-r)*120).toFixed(1)}%)`
        }
        for (let t of qr[e]) t.style.opacity = `1`, t.style.transform = `translateY(0px)`
    }
    return ri
}

function di(e, t) {
    if (!Zr) return;
    let n = Math.round(t * 22) / 2;
    Zr.style.filter = n > .01 ? `blur(${n.toFixed(1)}px)` : ``;
    let r = d((e - F) / (1 - F), 0, 1),
        i = f(d((r - .3) / .7, 0, 1)),
        a = innerWidth <= 720 ? Je + (1 - Je) * i : 1 - (1 - Je) * i,
        o = Math.round(a * (1 + t * .06) * 100) / 100;
    Zr.style.transform = `translate(${(b.x*15).toFixed(1)}px,${(-i*innerHeight*.072+b.y*12-t*innerHeight*.09).toFixed(1)}px) scale(${o.toFixed(2)})`, Zr.style.opacity = (1 - t).toFixed(3), Qr && (Qr.style.opacity = f(d(r / .22, 0, 1)).toFixed(3));
    let s = f(d((r - .2) / .62, 0, 1));
    if ($r) {
        $r.style.opacity = s > .001 ? `1` : `0`;
        for (let e = 0; e < ei.length; e++) {
            let t = ei[e],
                n = d((s - t.a) / Math.max(1e-4, t.b - t.a), 0, 1);
            t.el.style.opacity = n > 0 ? `1` : `0`, t.el.style.strokeDashoffset = (t.len * (1 - n)).toFixed(2)
        }
    }
}
var fi, pi, mi, hi = [],
    gi = [],
    _i = [],
    vi = [],
    yi = [],
    bi = [],
    xi = 0,
    Si = 0;

function Ci() {
    fi = document.querySelector(`.pf`), pi = document.querySelector(`.pf-in`), mi = document.querySelector(`.pf-head`), hi = [...document.querySelectorAll(`.pf-g`)], gi = hi.map(e => [...e.querySelectorAll(`.pf-h .ln i`)]), _i = hi.map(e => [e.querySelector(`.pf-chip`), e.querySelector(`.pf-b`)]), yi = hi.map(() => 0), bi = hi.map(() => 0);
    let e = document.querySelector(`.pf-ticks`);
    if (vi = [], e)
        for (let t = 1; t < 34; t++) {
            let n = t * rt,
                r = t % 5 == 0,
                i = document.createElementNS(`http://www.w3.org/2000/svg`, `line`);
            i.setAttribute(`x1`, 818), i.setAttribute(`x2`, 818 + (r ? 13 : 6)), i.setAttribute(`y1`, n), i.setAttribute(`y2`, n), e.appendChild(i), vi.push({
                el: i,
                y: n,
                long: r
            })
        }
}
var wi = e => (Si ||= e, (e - Si) / 1e3);

function Ti(e, t, n, r, i) {
    if (!fi) return;
    if (t <= 0 || i <= .001) {
        fi.style.opacity !== `0` && (fi.style.opacity = `0`);
        return
    }
    fi.style.opacity = `1`;
    let a = innerWidth / et,
        o = innerWidth <= 720 ? innerWidth * .0475 - 818 * a : 0,
        s = innerHeight - innerHeight * t * (1 - n);
    pi.style.transform = `translate(${o.toFixed(2)}px,${s.toFixed(2)}px) scale(${a.toFixed(5)})`;
    let c = A.auto > .5 ? d(M() + A.lead, 0, 1) : A.ret,
        l = Math.min(.8, c + A.retLen * .85),
        u = f(d((i - l) / Math.max(.06, 1 - l), 0, 1));
    wi(r);
    let p = d((innerHeight * .92 - s) / a, 0, tt);
    if (mi) {
        mi.style.transform = `translateY(${p.toFixed(1)}px)`, mi.style.opacity = (u * f(d((1 - e) / .08, 0, 1))).toFixed(3);
        let t = Math.round(p / tt * 100);
        t !== mi._p && (mi._p = t, mi.firstChild.textContent = t + `%`)
    }
    let m = 0;
    for (let e = 0; e < nt.length; e++) p >= nt[e] && (m = e);
    let h = nt[m],
        g = m + 1 < nt.length ? nt[m + 1] : tt,
        _ = 0;
    for (let e of vi) e.j = e.y >= h && e.y < g ? _++ : -1;
    for (let e = 0; e < vi.length; e++) {
        let t = vi[e],
            n = d((p - t.y) / 60, 0, 1),
            r = Math.exp(-Math.abs(p - t.y) / 190),
            i = .5 + .5 * Math.sin(p * .011 + e * 1.7),
            a = t.long ? 15 : 7,
            o = 0;
        if (t.j >= 0) {
            let e = _ > 1 ? .62 / (_ - 1) : 0;
            o = f(d((yi[m] - t.j * e) / .34, 0, 1))
        }
        let s = a * (.55 + .75 * i + .9 * r) + o * (t.long ? 30 : 23);
        t.el.setAttribute(`x2`, (818 + s).toFixed(1)), t.el.style.opacity = (u * Math.max(n * ((t.long ? .62 : .38) + .38 * r), o * .96)).toFixed(3)
    }
    let v = xi ? Math.min(64, r - xi) : 16;
    xi = r;
    for (let t = 0; t < hi.length; t++) {
        let n = innerWidth <= 720,
            r = n ? e >= $e[t] : p >= nt[t],
            i = n && t + 1 < $e.length && e >= $e[t + 1],
            a = u > .1 && r && !i,
            o = t === 0 ? 340 : 0,
            s = v / 820;
        bi[t] = d(bi[t] + (a ? s : -s), 0, 1);
        let c = f(d(bi[t] + (a && o ? o / 820 : 0), 0, 1)),
            l = n ? 0 : (nt[t] - p) * .375;
        yi[t] = c;
        let m = c;
        hi[t].style.opacity = c.toFixed(3), hi[t].style.transform = `translateY(${(l+(1-m)*10).toFixed(1)}px)`;
        let h = gi[t];
        for (let e = 0; e < h.length; e++) {
            let t = d((m - e * .055) / .8, 0, 1);
            h[e].style.transform = `translateX(${((1-t)*115).toFixed(2)}%)`
        }
        let g = d(m / .42, 0, 1),
            _ = d((m - .3) / .7, 0, 1);
        _i[t][0] && (_i[t][0].style.opacity = g.toFixed(3), _i[t][0].style.transform = `translateY(${((1-g)*8).toFixed(1)}px)`), _i[t][1] && (_i[t][1].style.opacity = _.toFixed(3), _i[t][1].style.transform = `translateY(${((1-_)*10).toFixed(1)}px)`)
    }
}

function Ei(e) {
    fi && e > 0 && (fi.style.opacity = (1 - f(d(e / .16, 0, 1))).toFixed(3))
}
var Di = [];

function Oi() {
    Di = [...document.querySelectorAll(`.rail a`)].map(e => ({
        el: e,
        at: parseFloat(e.dataset.at || `0`)
    }));
    for (let e of Di) e.el.addEventListener(`click`, t => {
        t.preventDefault(), L.target = d(e.at * R(), 0, R()), L.on || (st(L.target), scrollTo(0, L.target), L.current = L.target)
    })
}

function ki(e) {
    let t = -1;
    for (let n = 0; n < Di.length; n++) e >= Di[n].at - .002 && (t = n);
    for (let e = 0; e < Di.length; e++) {
        let n = e === t;
        n !== Di[e].on && (Di[e].on = n, Di[e].el.classList.toggle(`on`, n))
    }
}
var Ai = new URLSearchParams(location.search),
    ji = Ai.has(`hud`),
    Mi = parseFloat(Ai.get(`drive`) || `0`),
    Ni = {
        nogl: Ai.has(`nogl`),
        nofin: Ai.has(`nofin`),
        noscrub: Ai.has(`noscrub`)
    },
    z = null,
    B = 0,
    Pi = 0,
    Fi = 0,
    Ii = 0,
    Li = 0,
    Ri = 0,
    zi = !1,
    Bi = 0,
    Vi = {};

function Hi(e) {
    if (!ji) return;
    let t = performance.now();
    e && (Vi[e] = (Vi[e] || 0) + (t - Bi)), Bi = t
}

function Ui(e, t) {
    if (!ji && !Mi) return;
    if (!B) {
        B = e;
        return
    }
    let n = e - B;
    if (B = e, Mi) {
        let e = document.documentElement.scrollHeight - innerHeight;
        scrollY < e && scrollBy(0, e / (Mi * 1e3) * n)
    }
    if (ji && (z || (z = document.createElement(`div`), z.style.cssText = `position:fixed;top:70px;left:12px;z-index:99;padding:6px 10px;font:700 13px/1.4 monospace;color:#0f0;background:rgba(0,0,0,.72);pointer-events:none;white-space:pre-wrap;max-width:calc(100vw - 24px)`, document.body.appendChild(z)), Pi += n, Fi++, Ii = Math.max(Ii, n), Li < 150 && (Li++, n > 31 && n < 36 && Ri++, Li === 150 && (zi = Ri / Li > .8)), Pi >= 500)) {
        let e = Object.values(Vi).reduce((e, t) => e + t, 0),
            n = Object.entries(Vi).sort((e, t) => t[1] - e[1]).slice(0, 5).map(([e, t]) => `${e} ${(t/Fi).toFixed(1)}`);
        z.textContent = (zi ? `LPM? rAF is 30Hz-quantised
` : ``) + `${Math.round(Fi/(Pi/1e3))}fps worst ${Ii.toFixed(0)}ms\nroad ${(t*100).toFixed(1)}%\n` + n.join(`  `) + `  unacct ${((Pi-e)/Fi).toFixed(1)}\n` + mt.map(e => `${e.name} ${e.seq.loaded}/${e.count}`).join(` `);
        for (let e in Vi) delete Vi[e];
        Pi = 0, Fi = 0, Ii = 0
    }
}
var Wi = !1;

function Gi() {
    if (Wi) return;
    Wi = !0, `scrollRestoration` in history && (history.scrollRestoration = `manual`), scrollTo(0, 0), L.target = L.current = 0, document.documentElement.style.overflow = `hidden`;
    let e = !1,
        t = document.querySelector(`.boot-note`),
        n = () => {
            e || (e = !0, document.documentElement.style.overflow = ``, t && (t.classList.add(`off`), setTimeout(() => t.remove(), 800)))
        };
    if (setTimeout(n, 4e3), x(), ct(), un(), xn(), wr(), li(), Ni.nofin) {
        let e = document.querySelector(`.fin`);
        e && e.style.setProperty(`display`, `none`, `important`)
    }
    Ci(), Oi(), Yt();
    let r = at,
        i = document.querySelector(`.src`);
    i.src = r.src;
    let a = () => C ? 1 : 1.06,
        o = (e, t) => {
            if (!e || !t) return 0;
            let n = innerWidth / innerHeight,
                i = e / t;
            if (n >= i) return 0;
            let o = r.pos[innerWidth < 768 ? 0 : innerWidth < 1180 ? 1 : 2];
            return (1 - n / i / a()) * (o - .5)
        },
        s = document.querySelector(`.boot`),
        c = !1,
        l = !s,
        u = 0,
        m = 0,
        g = 0,
        _ = () => {
            try {
                i.duration && i.buffered.length && (u = Math.max(u, Math.min(.92, i.buffered.end(i.buffered.length - 1) / i.duration)))
            } catch {}
        };
    i.addEventListener(`progress`, _), i.addEventListener(`loadedmetadata`, _), i.addEventListener(`canplaythrough`, () => {
        u = 1
    }), i.addEventListener(`playing`, () => {
        u = 1
    });
    let S = () => {
            c || !s || (c = !0, s.classList.add(`off`), s.addEventListener(`transitionend`, () => {
                s.remove(), l = !0
            }, {
                once: !0
            }))
        },
        te = n => {
            if (!s || c) return;
            let r = g ? Math.min(.1, (n - g) / 1e3) : .016;
            g = n, m = Math.min(u, m + r * .55);
            let i = f(m);
            if (s.style.filter = `blur(${((1-i)*26).toFixed(1)}px) saturate(${(.62+.38*i).toFixed(3)}) brightness(${(.92+.08*i).toFixed(3)})`, s.style.transform = `scale(${(a()*(1.06-.06*i)).toFixed(4)})`, t && !e) {
                let e = Math.round(m * 100);
                t._p !== e && (t._p = e, t.lastElementChild.textContent = e + `%`)
            }
            if (s.naturalWidth) {
                let e = innerHeight * (s.naturalWidth / s.naturalHeight),
                    t = innerWidth - e;
                if (t < -1) {
                    let n = o(s.naturalWidth, s.naturalHeight),
                        r = (t / 2 - n * e) / t * 100;
                    s.style.objectPosition = `${r.toFixed(2)}% 50%`
                } else s.style.objectPosition = `50% 50%`
            }
        };
    i.muted = !0, i.setAttribute(`muted`, ``);
    let w = () => {
        let e = i.play();
        e && e.catch(() => {})
    };
    w(), i.addEventListener(`canplay`, w), i.addEventListener(`canplay`, n), i.addEventListener(`playing`, n), addEventListener(`pointerdown`, w, {
        once: !0
    });
    let M = matchMedia(`(max-width: 820px)`).matches ? `768` : `1440`,
        ge = Dt(r.bridge, M, T + E),
        _e = wt(`/films/plan`, 121, 2, T + E + ne, T + E + ne + re),
        ve = wt(`/films/coda`, 89, 3, T + E, T + E + ne + re),
        ye = wt(`/films/tree`, 121, 2, T + E + ne, 1 - ce - se - oe),
        {
            gl: P,
            canvas: Ce,
            tex: we,
            u: F,
            upload: Te,
            plate: Ee
        } = Nt(r),
        De = document.querySelector(`.stage`),
        I = () => Ee.naturalWidth ? Ee.naturalHeight * Ce.clientWidth / (Ee.naturalWidth * Ce.clientHeight) : 0,
        Oe = [`breathe`, `slice`, `halftone`, `displace`, `static`, `ring`],
        ke = (new URLSearchParams(location.search).get(`t`) || ``).toLowerCase(),
        Ae = Oe.indexOf(ke) >= 0 ? Oe.indexOf(ke) : Oe.indexOf(`ring`),
        je = [`none`, `slabs`, `halftone`, `warp`, `tear`, `fine`, `mosaic`, `dither`, `shred`, `ditherblock`],
        Me = {
            overlap: [.4, 1],
            after: [.7, 1]
        },
        Pe = document.querySelector(`.ov`),
        Fe = document.createElement(`canvas`);
    Fe.width = 8, Fe.height = 5;
    let Ie = Fe.getContext(`2d`, {
            willReadFrequently: !0
        }),
        Le = !1,
        Re = 0;

    function ze(e) {
        if (!e) return;
        let t = e.videoWidth || e.naturalWidth,
            n = e.videoHeight || e.naturalHeight;
        if (!(!t || !n)) try {
            innerWidth <= 720 ? Ie.drawImage(e, t * .3, n * .15, t * .4, n * .75, 0, 0, 8, 5) : Ie.drawImage(e, 0, n * .18, t * .58, n * .68, 0, 0, 8, 5);
            let r = Ie.getImageData(0, 0, 8, 5).data,
                i = 0;
            for (let e = 0; e < r.length; e += 4) i += .299 * r[e] + .587 * r[e + 1] + .114 * r[e + 2];
            let a = i / (r.length / 4),
                o = innerWidth <= 720 ? a > (Le ? 150 : 185) : a > (Le ? 132 : 168);
            o !== Le && (Le = o, Pe.classList.toggle(`on-light`, o))
        } catch {}
    }
    let Be = -1,
        Ve = null,
        qe = null,
        Je = null,
        Ye = 0,
        Xe = innerWidth <= 720 ? 1.5 : 2,
        Ze = Xe,
        Qe = 0,
        $e = 0,
        et = 0,
        tt = 0,
        nt = 0,
        rt = 0,
        it = !1,
        ot = performance.now();

    function R(t) {
        if (requestAnimationFrame(R), te(t), !e && L.on && (L.target = L.current = 0), L.on) {
            let e = L.current;
            L.current += (L.target - L.current) * .085, Math.abs(L.target - L.current) < .08 && (L.current = L.target), L.velocity = L.current - e, L.current !== e && (st(L.current), scrollTo(0, L.current))
        } else L.velocity = scrollY - L.current, L.target = scrollY, L.current += (L.target - L.current) * .3, Math.abs(L.target - L.current) < .5 && (L.current = L.target);
        let c = I(),
            u = tt ? t - tt : 16.7;
        tt = t, innerWidth <= 720 && (u > 26 ? (Qe++, $e = 0) : ($e++, Qe = Math.max(0, Qe - 1)), Qe > 150 && Ze > 1 && t - et > 4e3 ? (Ze = Math.max(1, Ze - .25), Qe = 0, et = t) : $e > 900 && Ze < Xe && t - et > 4e3 && (Ze = Math.min(Xe, Ze + .25), $e = 0, et = t));
        let g = Math.min(devicePixelRatio || 1, Ze),
            _ = 1,
            x = Math.round(Ce.clientWidth * g),
            C = Math.round(Ce.clientHeight * g);
        (Ce.width !== x || Ce.height !== C) && (Ce.width = x, Ce.height = C, P.viewport(0, 0, x, C));
        let M = Math.max(1, De.offsetHeight - innerHeight),
            Oe = e => Ne(e, innerWidth <= 720),
            ke = Oe(d(L.current / M, 0, 1));
        yt(Oe(d(L.target / M, 0, 1))), Ui(t, ke), Hi(), b.x += (b.tx - b.x) * .055, b.y += (b.ty - b.y) * .055;
        let Fe = d(ke / T, 0, 1),
            Ie = d((ke - T) / E, 0, 1),
            at = d((ke - T - E) / ne, 0, 1),
            ct = d((ke - T - E - ne) / re, 0, 1),
            lt = re * .25,
            ut = d((ke - T - E - ne - re + lt) / (ie + lt), 0, 1),
            dt = d((ke - (T + E + ne + re + ie)) / ae, 0, 1);
        nt = p(d(dt / .85, 0, 1));
        let ft = d(Fe / D, 0, 1),
            pt = d((Fe - D) / (O - D), 0, 1),
            mt = d((Fe - k.at) / k.len, 0, 1),
            ht = Ie;
        v.pan = ht, v.raw = ke;
        let gt = ft * ft * (3 - 2 * ft);
        i.readyState >= 2 && (gt < .999 ? (Te(0, we.A, i), P.uniform2f(F.uResA, i.videoWidth, i.videoHeight), i.paused && w(), n(), m > .99 && S()) : i.paused || i.pause()), gt >= .999 && S();
        let _t = Math.round(pt * (ge.N - 1)),
            vt = ge.frameNear(_t);
        vt && vt !== Be && (Be = vt, Te(1, we.B, vt), P.uniform2f(F.uResB, vt.naturalWidth, vt.naturalHeight)), P.uniform2f(F.uRes, x, C);
        let bt = innerWidth <= 720,
            xt = i.videoWidth ? o(i.videoWidth, i.videoHeight) : s && s.naturalWidth ? o(s.naturalWidth, s.naturalHeight) : 0,
            St = e => e / 1179 * x,
            Ct = e => e / 2556 * C,
            wt = f(d((_t + 1 - (He[r.bridge] || 100)) / 8, 0, 1)),
            Tt = 0;
        if (xt && i.videoWidth) {
            let e = x / C,
                t = i.videoWidth / i.videoHeight;
            Tt = xt * x * (t / e)
        }
        P.uniform1f(F.uPanPx, Tt + (St(-20) - Tt) * wt), P.uniform1f(F.uPanY, 0), P.uniform1f(F.uZoom, a() + (1 - a()) * wt), P.uniform1f(F.uZoomE, bt ? We.z : 1), P.uniform1f(F.uPanE, bt ? St(We.x) : 0), P.uniform1f(F.uPanEY, bt ? Ct(We.y) : 0);
        let Et = f(d((ht - Ge.at) / Math.max(.05, Ge.span), 0, 1));
        P.uniform3f(F.uPlateFit, bt ? St(Ge.x) * Et : 0, bt ? Ct(Ge.y) * Et : 0, bt ? 1 + (Ge.z - 1) * Et : 1), P.uniform1f(F.uPanG, bt ? St(Ue.x) * f(d((be(ut) - Ue.from) / Math.max(.001, Ue.ramp), 0, 1)) : 0), Hi(`film`), $t(i, ft, t, xt, a(), l ? null : {
            el: s,
            p: f(m)
        }), Hi(`mask`), P.uniform1f(F.uT, gt), P.uniform1f(F.uTime, t / 1e3), P.uniform1i(F.uMode, Ae);
        let Dt = Me.overlap,
            Ot = d((gt - Dt[0]) / (Dt[1] - Dt[0]), 0, 1);
        P.uniform1i(F.uMode2, je.indexOf(`fine`));
        let kt = d((mt - k.fxAt) / Math.max(.001, k.fxLen), 0, 1),
            At = Math.sin(Math.PI * Ot),
            jt = mt > 0 && mt < 1 ? Math.sin(Math.PI * kt) * k.fx : 0;
        P.uniform1f(F.uT2, Math.max(At, jt)), P.uniform1f(F.uBurn, mt), le.x = k.x + k.dx / innerWidth, le.y = k.y + k.dy / innerHeight, P.uniform1f(F.uBurnX, le.x), P.uniform1f(F.uBurnY, le.y), P.uniform2f(F.uBurnAB, k.ax, k.ay), P.uniform4f(F.uBurnFld, k.noise, k.grain, k.dither, k.hash), P.uniform4f(F.uBurnChr, k.char, k.charW, k.glowW, k.glowH), P.uniform1f(F.uSplit, j.part * f(d(mt / j.lag, 0, 1))), P.uniform2f(F.uBurnE, k.e0, k.e1);
        let Mt = k.at + A.over * k.len - A.len * (1 - h(j.at)),
            Nt = d((Fe - Mt) / Math.max(1e-4, k.at + k.len - Mt), 0, 1),
            Pt = Nt * (j.lin + (1 - j.lin) * Nt * Nt);
        v.push = Pt, P.uniform1f(F.uReelZ, 1 + j.zoom * Pt), P.uniform2f(F.uDrift, ue.driftX * Pt, ue.driftY * Pt), P.uniform1f(F.uMBlur, ue.mblur * Pt), P.uniform1f(F.uSpin, j.spin * Pt), P.uniform1f(F.uEdgeBl, ue.edgeBl * f(d((mt - ue.edgeAt) / Math.max(.02, 1 - ue.edgeAt), 0, 1))), P.uniform1f(F.uSeam, k.seam * f(d(mt / .55, 0, 1)) * (1 - f(d((mt - .55) / .4, 0, 1)))), P.uniform2f(F.uSeamWH, k.seamW, k.seamH), P.uniform3f(F.uSeamCol, .898, .882, .839), P.uniform1f(F.uSeamSoft, Math.max(.002, k.seamSoft));
        let Ft = k.at + k.zoomAt * k.len,
            It = f(d((Fe - Ft) / Math.max(1e-4, 1 - Ft), 0, 1)),
            Lt = 1 + k.zoom * (1 - f(mt)) + k.zoomPan * It;
        y.x = innerWidth * (818 / 1328), P.uniform1f(F.uPlateZ, Lt), P.uniform1i(F.uShape, k.shape | 0);
        let Rt = c > 0 ? (1 - 1 / c) * (1 - ht) : 0;
        if (c > 0 && P.uniform1f(F.uPan, Rt), Hi(`uni`), at <= .2 && Ti(ht, c, Rt, t, mt), Hi(`plate`), at > 0 && rt < .999) {
            let e = Math.min(88, Math.round(at * 88));
            if (ve.aim(e), ve.ready && !Ni.noscrub) {
                let t = ve.near(e);
                t && t !== Ve && _ > 0 && (_--, Ve = t, Te(3, we.E, t), P.uniform2f(F.uResE, t.naturalWidth, t.naturalHeight))
            }
        }
        if (Ye = ve.ready ? Math.min(1, Ye + .055) : 0, P.uniform1f(F.uCoda, f(d(at / xe, 0, 1)) * Ye), P.uniform1f(F.uFlat, f(d((at - Se) / (1 - Se), 0, 1))), v.coda = at, v.end = ct, ct > 0 && ke < .7489719626168224) {
            let e = be(ut),
                t = Math.max(0, Math.min(120, Math.round(e * 120) - Math.round(nt * 36)));
            if (ye.aim(t), ye.ready && !Ni.noscrub) {
                let e = ye.near(t);
                e && e !== qe && _ > 0 && (_--, qe = e, Te(4, we.G, e), P.uniform2f(F.uResG, e.naturalWidth, e.naturalHeight))
            }
        }
        Hi(`tex`), rt = ui(ut, ct, t), Hi(`fin`), ee.lit = at > .44 && rt < .55, P.uniform3f(F.uPaperC, N.r / 255, N.g / 255, N.b / 255), P.uniform4f(F.uRay1, N.speed, N.drift, N.jiggle, N.scale), P.uniform4f(F.uRay2, N.depth, N.breathe, N.rake, N.cycle), P.uniform4f(F.uPap, N.pulp, N.fibre, N.tooth, N.fleck), P.uniform3f(F.uDrag, N.lag, N.lagD, N.smear);
        let zt = d((ke - (T + E + ne)) / fe, 0, 1);
        if (v.plan = zt, ke > .3725233644859813 && rt < .999) {
            let e = d((ke - (T + E + ne)) / (fe * pe), 0, 1),
                t = Math.min(120, Math.round(e * 120));
            if (_e.aim(t), _e.ready && !Ni.noscrub) {
                let e = _e.near(t);
                e && e !== Je && _ > 0 && (_--, Je = e, Te(5, we.P, e), P.uniform2f(F.uResP, e.naturalWidth, e.naturalHeight))
            }
        }
        P.uniform4f(F.uPlan2, Je ? f(d(zt / he, 0, 1)) : 0, 0, 0, 0), P.uniform4f(F.uPlan3, N.zoom, N.panX, N.panY, 0), P.uniform4f(F.uPlan, f(d((zt - me[0]) / me[1], 0, 1)), bt ? Ke.x : N.keyX, bt ? Ke.y : N.keyY, bt ? Ke.s : N.keyS), Cn(dt), Hi(`faq`);
        let Bt = wn(dt),
            Vt = d((ke - (T + E + ne + re + ie + ae)) / oe, 0, 1);
        Dr(Vt), Fr(d((ke - (T + E + ne + re + ie + ae + oe)) / se, 0, 1), Vt), Br(d((ke - (T + E + ne + re + ie + ae + oe + se)) / ce, 0, 1)), di(ut, Bt), Hi(`sky`), P.uniform1f(F.uEnd, qe ? rt >= .94 ? 1 : rt : 0), P.uniform1f(F.uScrim, .18 * f(d((Fe - .26) / .08, 0, 1))), P.uniform4f(F.uEndF, de.noise, de.grain, de.dither, de.hash), P.uniform4f(F.uEndC, de.charW, de.charBack, de.char, de.glowW), Ei(at), !Ni.nogl && Vt <= .06 && P.drawArrays(P.TRIANGLES, 0, 3), Hi(`gl`), !it && (L.current > 6 || t - ot > 620) && (it = !0, fn(t, 425)), mn(Fe, t), ki(ke), Hi(`ov`), t - Re > 160 && (Re = t, ee.lit ? Pe.classList.contains(`on-light`) || (Le = !0, Pe.classList.add(`on-light`)) : ze(mt > .5 ? Ee.naturalWidth ? Ee : null : gt < .5 ? i.readyState >= 2 ? i : null : vt))
    }
    requestAnimationFrame(R)
}
var Ki = e((e => {
        var t = Symbol.for(`react.transitional.element`),
            n = Symbol.for(`react.fragment`);

        function r(e, n, r) {
            var i = null;
            if (r !== void 0 && (i = `` + r), n.key !== void 0 && (i = `` + n.key), `key` in n)
                for (var a in r = {}, n) a !== `key` && (r[a] = n[a]);
            else r = n;
            return n = r.ref, {
                $$typeof: t,
                type: e,
                key: i,
                ref: n === void 0 ? null : n,
                props: r
            }
        }
        e.Fragment = n, e.jsx = r, e.jsxs = r
    })),
    V = e(((e, t) => {
        t.exports = Ki()
    }))();

function qi() {
    return (0, V.jsxs)(V.Fragment, {
        children: [(0, V.jsx)(`div`, {
            className: `nvs`,
            "aria-hidden": `true`
        }), (0, V.jsx)(`canvas`, {
            className: `gl`
        }), (0, V.jsx)(`img`, {
            className: `boot`,
            src: at.poster,
            fetchPriority: `high`,
            alt: ``,
            "aria-hidden": `true`
        }), (0, V.jsxs)(`p`, {
            className: `boot-note`,
            "aria-hidden": `true`,
            children: [`The film is loading`, (0, V.jsx)(`b`, {})]
        }), (0, V.jsx)(`svg`, {
            className: `inkdef`,
            "aria-hidden": `true`,
            children: (0, V.jsxs)(`defs`, {
                children: [(0, V.jsxs)(`filter`, {
                    id: `inkf`,
                    x: `-18%`,
                    y: `-30%`,
                    width: `136%`,
                    height: `160%`,
                    colorInterpolationFilters: `sRGB`,
                    children: [(0, V.jsx)(`feTurbulence`, {
                        type: `fractalNoise`,
                        baseFrequency: `0.011 0.017`,
                        numOctaves: `4`,
                        seed: `9`,
                        result: `cl`
                    }), (0, V.jsx)(`feColorMatrix`, {
                        in: `cl`,
                        type: `matrix`,
                        result: `clA`,
                        values: `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0`
                    }), (0, V.jsx)(`feComponentTransfer`, {
                        in: `clA`,
                        result: `m`,
                        children: (0, V.jsx)(`feFuncA`, {
                            type: `linear`,
                            slope: `9`,
                            intercept: `1`
                        })
                    }), (0, V.jsx)(`feDisplacementMap`, {
                        in: `SourceGraphic`,
                        in2: `cl`,
                        scale: `0`,
                        xChannelSelector: `R`,
                        yChannelSelector: `G`,
                        result: `warp`
                    }), (0, V.jsx)(`feComposite`, {
                        in: `warp`,
                        in2: `m`,
                        operator: `in`
                    })]
                }), (0, V.jsxs)(`filter`, {
                    id: `fqTear`,
                    x: `-30%`,
                    y: `-30%`,
                    width: `160%`,
                    height: `160%`,
                    colorInterpolationFilters: `sRGB`,
                    children: [(0, V.jsx)(`feTurbulence`, {
                        type: `fractalNoise`,
                        baseFrequency: `0.016 0.021`,
                        numOctaves: `3`,
                        seed: `11`,
                        result: `t1`
                    }), (0, V.jsx)(`feDisplacementMap`, {
                        in: `SourceGraphic`,
                        in2: `t1`,
                        scale: `23`,
                        xChannelSelector: `R`,
                        yChannelSelector: `G`,
                        result: `d1`
                    }), (0, V.jsx)(`feTurbulence`, {
                        type: `fractalNoise`,
                        baseFrequency: `0.075`,
                        numOctaves: `2`,
                        seed: `4`,
                        result: `t2`
                    }), (0, V.jsx)(`feDisplacementMap`, {
                        in: `d1`,
                        in2: `t2`,
                        scale: `7`,
                        xChannelSelector: `R`,
                        yChannelSelector: `G`
                    })]
                })]
            })
        })]
    })
}
var Ji = {
        s: `m 0,0 c 0.8998,-1.65154,2.121,-3.29839,3.3735,-5.1263,-0.2787,0.96871,-1.1734,1.00844,-0.2198,5.15939,0.4113,1.79038,-0.5215,6.68874,-4.6089,3.67108,3.1181,2.66904,5.8064,0.17923,8.4005,-3.43958`,
        i: `m 0,0 c 0,0,-4.8682,5.76765,-2.7782,7.34219,1.5603,1.17547,4.6964,-3.50573,4.6964,-3.50573`,
        dot: `m 0,0 c 0.3633,-0.0304,0.4348,-0.30446,0.3157,-0.57296,-0.1562,-0.35196,-0.6165,-0.38945,-0.7951,-0.0117,-0.1647,0.34829,0.089,0.6173,0.4794,0.58463 z`,
        g1: `m 0,0 c 0.1355,-1.79073,-5.8898,-2.14856,-7.9513,2.05798,-3.8317,7.81871,4.153,5.14364,5.5971,2.69243`,
        g2: `m 0,0 c -1.1619,-0.25254,-8.6588,20.79796,-12.722,19.17658,-1.5259,-0.60889,-0.7548,-2.64348,0.2135,-4.07912,1.7572,-2.60534,12.9435,-8.17985,14.3794,-11.26214`,
        n: `m 0,0 c 0,0,2.639,-5.27928,3.8696,-4.26641,2.2794,1.87613,-3.6711,8.89662,-3.6711,8.89662,0.8673,0.0578,5.7877,-10.21518,8.8635,-8.23516,2.4603,1.58379,-4.2138,6.92561,-1.6867,8.40053,2.1168,1.23542,5.2255,-4.76251,5.2255,-4.76251`
    },
    Yi = [{
        d: Ji.s,
        tf: `translate(1.455 -5.254)`,
        a: 0,
        b: .1027
    }, {
        d: Ji.i,
        tf: `translate(11.699 -8.694)`,
        a: .1027,
        b: .1526
    }, {
        d: Ji.dot,
        tf: `translate(13.564 -10.621)`,
        a: .1526,
        b: .1619
    }, {
        d: Ji.g1,
        tf: `translate(23.476 -7.671)`,
        a: .1619,
        b: .2361
    }, {
        d: Ji.g2,
        tf: `translate(24.318 -8.84)`,
        a: .2361,
        b: .3945
    }, {
        d: Ji.n,
        tf: `translate(26.188 -5.089)`,
        a: .3945,
        b: .5514
    }, {
        d: Ji.i,
        tf: `translate(42.087 -8.694)`,
        a: .5514,
        b: .6012
    }, {
        d: Ji.dot,
        tf: `translate(43.953 -10.621)`,
        a: .6012,
        b: .6106
    }, {
        d: Ji.n,
        tf: `translate(44.321 -5.089)`,
        a: .6106,
        b: .7674
    }, {
        d: Ji.g1,
        tf: `translate(66.465 -7.671)`,
        a: .7674,
        b: .8415
    }, {
        d: Ji.g2,
        tf: `translate(67.307 -8.84)`,
        a: .8415,
        b: 1
    }];

function Xi() {
    return (0, V.jsx)(`div`, {
        className: `sign`,
        "aria-hidden": `true`,
        children: (0, V.jsxs)(`p`, {
            children: [(0, V.jsxs)(`span`, {
                className: `sg-a`,
                children: [`Asked before`, ` `]
            }), (0, V.jsx)(`span`, {
                className: `sg-b`,
                children: (0, V.jsx)(`svg`, {
                    className: `sg-svg`,
                    viewBox: `-0.900 -12.374 70.978 23.698`,
                    fill: `none`,
                    xmlns: `http://www.w3.org/2000/svg`,
                    "aria-hidden": `true`,
                    children: Yi.map((e, t) => (0, V.jsx)(`path`, {
                        d: e.d,
                        transform: e.tf,
                        "data-a": e.a.toFixed(4),
                        "data-b": e.b.toFixed(4)
                    }, t))
                })
            })]
        })
    })
}
var Zi = JSON.stringify({
    "@context": `https://schema.org`,
    "@type": `FAQPage`,
    mainEntity: Te.map(([e, , t]) => ({
        "@type": `Question`,
        name: e,
        acceptedAnswer: {
            "@type": `Answer`,
            text: t
        }
    }))
});

function Qi() {
    return (0, V.jsxs)(`div`, {
        className: `faq`,
        "aria-hidden": `true`,
        children: [(0, V.jsx)(`script`, {
            type: `application/ld+json`,
            dangerouslySetInnerHTML: {
                __html: Zi
            }
        }), (0, V.jsxs)(`svg`, {
            className: `faq-lead`,
            fill: `none`,
            xmlns: `http://www.w3.org/2000/svg`,
            children: [(0, V.jsx)(`line`, {
                x1: `0`,
                y1: `0`,
                x2: `0`,
                y2: `0`
            }), (0, V.jsx)(`rect`, {
                width: `8`,
                height: `8`,
                x: `-99`,
                y: `-99`
            })]
        })]
    })
}

function $i() {
    return (0, V.jsxs)(V.Fragment, {
        children: [(0, V.jsx)(`canvas`, {
            className: `fly`,
            "aria-hidden": `true`
        }), (0, V.jsx)(`div`, {
            className: `fly-w`,
            "aria-hidden": `true`
        })]
    })
}
var ea = `M12 0Q13.1 10.9 24 12Q13.1 13.1 12 24Q10.9 13.1 0 12Q10.9 10.9 12 0Z`,
    ta = () => (0, V.jsx)(`svg`, {
        viewBox: `0 0 24 24`,
        "aria-hidden": `true`,
        children: (0, V.jsx)(`path`, {
            d: ea
        })
    }),
    na = ({
        vertical: e,
        right: t,
        out: n,
        style: r,
        delay: i
    }) => (0, V.jsxs)(`span`, {
        className: e ? t ? `gv gv--r` : `gv` : `gh`,
        "data-out": n,
        style: r,
        children: [(0, V.jsx)(`i`, {
            style: {
                animationDelay: i
            }
        }), (0, V.jsx)(`svg`, {
            className: `wob`,
            "aria-hidden": `true`,
            children: (0, V.jsx)(`path`, {})
        })]
    }),
    ra = ({
        lock: e,
        out: t,
        style: n,
        delay: r
    }) => (0, V.jsx)(`i`, {
        className: e ? `gx gx--lock` : `gx`,
        "data-out": t,
        style: n,
        children: (0, V.jsx)(`span`, {
            style: r ? {
                animationDelay: r
            } : void 0,
            children: (0, V.jsx)(`svg`, {
                viewBox: `0 0 24 24`,
                "aria-hidden": `true`,
                children: (0, V.jsx)(`path`, {
                    d: ea
                })
            })
        })
    }),
    ia = [`M496.175 94.1679C513.597 91.6249 528.131 103.956 523.257 122.14C516.926 145.755 476.449 142.036 479.235 112.85C480.058 104.173 487.515 95.4202 496.175 94.1679Z`, `M35.0131 19.7672C35.0004 20.0614 33.3707 20.8803 35.3314 20.7267C53.4873 -3.95308 89.1624 -5.01499 111.698 14.3425C145.502 43.3723 142.115 108.059 103.066 131.012C81.3831 143.768 50.0878 141.119 35.3187 119.228C33.3707 119.075 35.0004 119.919 35.0004 120.188V180H0V4.0944H35.0131C34.8348 9.3016 35.255 14.56 35.0131 19.7672ZM62.8962 32.4333C24.6237 36.553 23.8726 103.991 64.7042 107.01C111.915 110.503 112.004 27.1494 62.8962 32.4333Z`, `M177.005 80.3756C178.859 92.877 188.675 105.009 201.133 108.121C217.896 112.305 234.342 106.182 241.491 89.9175C244.717 91.7289 269.849 102.151 269.658 104.179C269.519 105.608 262.598 115.66 261.163 117.37C243.739 138.086 212.537 143.903 187.329 136.033C134.246 119.449 128.062 39.5927 173.017 10.3291C195.736 -4.46853 233.453 -3.75416 253.861 14.9853C271.525 31.1989 274.827 57.5285 272.897 80.3756H177.005ZM178.275 55.5002H240.818C241.428 55.0155 241.555 54.9644 241.53 54.1863C241.479 52.7448 239.46 47.6804 238.71 46.1369C225.719 19.7307 183.189 26.951 178.275 55.5002Z`, `M453.603 135.341H418.645V4.69977H453.603C453.502 9.04598 453.743 13.4304 453.629 17.7894C453.616 18.312 452.141 24.6082 454.226 22.5434C454.328 22.4542 454.671 20.8228 455.218 20.0453C460.112 13.15 470.345 4.0625 479.333 4.0625H490.774L491.727 5.01841V35.6076L490.774 36.5635H475.519C465.197 36.5635 453.591 52.1639 453.591 61.7358V135.341H453.603Z`, `M403.76 134.164C402.782 137.224 390.593 136.776 387.815 136.483C363.711 133.871 355.025 102.33 345.203 84.2014C320.258 85.7219 309.87 111.473 315.172 133.676H285.492L284.181 132.078C278.86 99.5624 298.307 65.8774 330.765 57.7875C325.13 39.444 314.741 23.5567 292.79 31.5101C295.431 24.122 295.137 10.5739 297.857 4.00458C299.931 -1.00528 318.576 1.23649 323.173 2.60104C334.795 6.07091 342.914 16.6365 348.784 26.6367C361.129 47.7483 369.757 72.5442 381.652 94.0067C386.465 102.701 390.671 110.264 402.351 106.678L403.76 107.906V134.183V134.164Z`];

function aa() {
    return (0, V.jsxs)(V.Fragment, {
        children: [(0, V.jsx)(`div`, {
            className: `ft`,
            "aria-hidden": `true`,
            children: (0, V.jsxs)(`div`, {
                className: `ft-in`,
                children: [(0, V.jsx)(`i`, {
                    className: `ft-r h`,
                    style: {
                        top: 125
                    }
                }), (0, V.jsx)(`i`, {
                    className: `ft-r h`,
                    style: {
                        top: 982
                    }
                }), (0, V.jsx)(`i`, {
                    className: `ft-r v`,
                    style: {
                        left: 675
                    }
                }), (0, V.jsx)(`i`, {
                    className: `ft-r v`,
                    style: {
                        left: 1262
                    }
                }), (0, V.jsx)(`svg`, {
                    className: `ft-box`,
                    viewBox: `0 0 587 857`,
                    fill: `none`,
                    children: (0, V.jsx)(`rect`, {
                        x: `0.5`,
                        y: `0.5`,
                        width: `586`,
                        height: `856`
                    })
                }), (0, V.jsx)(`i`, {
                    className: `ft-st`,
                    style: {
                        left: 675,
                        top: 125
                    },
                    children: (0, V.jsx)(ta, {})
                }), (0, V.jsx)(`i`, {
                    className: `ft-st`,
                    style: {
                        left: 1262,
                        top: 982
                    },
                    children: (0, V.jsx)(ta, {})
                }), (0, V.jsx)(`div`, {
                    className: `ft-mark`,
                    children: (0, V.jsx)(`svg`, {
                        viewBox: `0 0 524.211 180`,
                        fill: `none`,
                        xmlns: `http://www.w3.org/2000/svg`,
                        children: (0, V.jsx)(`g`, {
                            children: ia.map((e, t) => (0, V.jsx)(`path`, {
                                d: e,
                                fill: `var(--fill-0, #EBEBEB)`
                            }, t))
                        })
                    })
                }), (0, V.jsxs)(`p`, {
                    className: `ft-tag`,
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `Not an agency on the clock, a`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `partner in the upside.`
                        })
                    })]
                }), (0, V.jsx)(`p`, {
                    className: `ft-meta l`,
                    children: `PEAR AS · ORG NR 919 062 517 · OSLO`
                }), (0, V.jsx)(`p`, {
                    className: `ft-meta r`,
                    children: (0, V.jsx)(`a`, {
                        href: `mailto:info@pear.no`,
                        children: `INFO@PEAR.NO`
                    })
                })]
            })
        }), (0, V.jsx)(`canvas`, {
            className: `trans`,
            "aria-hidden": `true`
        }), (0, V.jsx)(`video`, {
            className: `foot`,
            src: `/films/footer-loop.mp4`,
            muted: !0,
            loop: !0,
            playsInline: !0,
            preload: `none`
        }), (0, V.jsx)(`canvas`, {
            className: `ftx`,
            "aria-hidden": `true`
        })]
    })
}

function oa() {
    return (0, V.jsxs)(`div`, {
        className: `cf`,
        "aria-hidden": `true`,
        inert: ``,
        children: [(0, V.jsxs)(`svg`, {
            className: `cf-orb`,
            fill: `none`,
            xmlns: `http://www.w3.org/2000/svg`,
            children: [(0, V.jsx)(`ellipse`, {}), (0, V.jsx)(`ellipse`, {}), (0, V.jsx)(`ellipse`, {})]
        }), (0, V.jsx)(`div`, {
            className: `cf-gl`
        }), (0, V.jsxs)(`div`, {
            className: `cf-lead`,
            children: [(0, V.jsx)(`b`, {
                children: `The application`
            }), (0, V.jsx)(`p`, {
                children: `Tell us what you sell and where you want to grow. Every application is read, and when the model fits we answer within a week.`
            })]
        }), (0, V.jsx)(`div`, {
            className: `cf-in`
        })]
    })
}

function sa() {
    return (0, V.jsxs)(`div`, {
        className: `fin`,
        "aria-hidden": `true`,
        children: [(0, V.jsxs)(`div`, {
            className: `fin-g`,
            "data-f": `0`,
            children: [(0, V.jsx)(`div`, {
                className: `fin-top`,
                children: (0, V.jsx)(`div`, {
                    className: `fin-soak`,
                    children: (0, V.jsxs)(`h2`, {
                        className: `fin-h`,
                        style: {
                            width: 540
                        },
                        children: [(0, V.jsx)(`span`, {
                            className: `ln`,
                            children: (0, V.jsx)(`i`, {
                                children: `No fees. A share`
                            })
                        }), (0, V.jsx)(`span`, {
                            className: `ln`,
                            children: (0, V.jsx)(`i`, {
                                children: `of the upside.`
                            })
                        })]
                    })
                })
            }), (0, V.jsx)(`div`, {
                className: `fin-bot`,
                children: (0, V.jsxs)(`div`, {
                    className: `fin-soak`,
                    children: [(0, V.jsx)(`p`, {
                        className: `fin-l`,
                        style: {
                            width: 545
                        },
                        children: `You pay nothing to start: no retainer, no project fee, no hours on a clock. We carry the cost of strategy, development, content and links.`
                    }), (0, V.jsxs)(`div`, {
                        className: `fin-row`,
                        children: [(0, V.jsx)(`span`, {
                            className: `fin-chip`,
                            children: (0, V.jsx)(`b`, {
                                children: `Full disclosure`
                            })
                        }), (0, V.jsx)(`p`, {
                            className: `fin-s`,
                            style: {
                                width: 315
                            },
                            children: `Our pay is an agreed share of the revenue the work creates, measured against your baseline and visible to both sides. You keep everything we build: the software, the content, the rankings. And we take on a few partners at a time, because when we are paid on the outcome, yes has to be earned.`
                        })]
                    })]
                })
            })]
        }), (0, V.jsxs)(`div`, {
            className: `fin-g`,
            "data-f": `1`,
            children: [(0, V.jsx)(`div`, {
                className: `fin-top`,
                children: (0, V.jsx)(`div`, {
                    className: `fin-soak`,
                    children: (0, V.jsxs)(`h2`, {
                        className: `fin-h`,
                        style: {
                            width: 614
                        },
                        children: [(0, V.jsx)(`span`, {
                            className: `ln`,
                            children: (0, V.jsx)(`i`, {
                                children: `We say no more`
                            })
                        }), (0, V.jsx)(`span`, {
                            className: `ln`,
                            children: (0, V.jsx)(`i`, {
                                children: `often than yes.`
                            })
                        })]
                    })
                })
            }), (0, V.jsx)(`div`, {
                className: `fin-bot`,
                children: (0, V.jsxs)(`div`, {
                    className: `fin-soak`,
                    children: [(0, V.jsx)(`p`, {
                        className: `fin-l`,
                        style: {
                            width: 595
                        },
                        children: `Our partners sell real products and services, have revenue to grow, and compete in markets where customers search: e-commerce, Saas, marketplaces, service companies.`
                    }), (0, V.jsxs)(`div`, {
                        className: `fin-row`,
                        children: [(0, V.jsx)(`span`, {
                            className: `fin-chip`,
                            children: (0, V.jsx)(`b`, {
                                children: `Full disclosure`
                            })
                        }), (0, V.jsx)(`p`, {
                            className: `fin-s`,
                            style: {
                                width: 338
                            },
                            children: `If that’s you, the terms above are the whole pitch. If you’re pre-revenue, want to rent developers by the hour, or need results by Friday, we’re the wrong partner, and we’ll tell you so in the first call.`
                        })]
                    })]
                })
            })]
        })]
    })
}

function ca() {
    return (0, V.jsxs)(`div`, {
        className: `pf`,
        "aria-hidden": `true`,
        children: [(0, V.jsxs)(`div`, {
            className: `pf-in`,
            children: [(0, V.jsx)(`svg`, {
                className: `pf-lines`,
                viewBox: `0 0 1328 3515`,
                fill: `none`,
                children: (0, V.jsx)(`g`, {
                    className: `pf-ticks`
                })
            }), (0, V.jsx)(`i`, {
                className: `pf-head`,
                children: (0, V.jsx)(`b`, {})
            })]
        }), (0, V.jsxs)(`div`, {
            className: `pf-fix`,
            children: [(0, V.jsxs)(`div`, {
                className: `pf-g pf-g--fix`,
                "data-g": `0`,
                style: {
                    width: 360,
                    "--gap": `14px`
                },
                children: [(0, V.jsx)(`span`, {
                    className: `pf-chip`,
                    style: {
                        width: 168
                    },
                    children: (0, V.jsx)(`b`, {
                        children: `Search engine optimization`
                    })
                }), (0, V.jsxs)(`h2`, {
                    className: `pf-h`,
                    style: {
                        width: 280
                    },
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `Everything it takes to be`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `found, under one roof.`
                        })
                    })]
                }), (0, V.jsx)(`p`, {
                    className: `pf-b`,
                    style: {
                        marginTop: 26
                    },
                    children: `Search and software are one discipline at Pear. The product is built to rank from its first commit, and the SEO is done by the people who wrote the code.`
                })]
            }), (0, V.jsxs)(`div`, {
                className: `pf-g pf-g--fix`,
                "data-g": `1`,
                style: {
                    width: 360,
                    "--gap": `13px`
                },
                children: [(0, V.jsx)(`span`, {
                    className: `pf-chip`,
                    style: {
                        width: 168
                    },
                    children: (0, V.jsx)(`b`, {
                        children: `Search engine optimization`
                    })
                }), (0, V.jsxs)(`h2`, {
                    className: `pf-h`,
                    style: {
                        width: 280
                    },
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `Search and software are one`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `discipline at Pear.`
                        })
                    })]
                }), (0, V.jsx)(`p`, {
                    className: `pf-b`,
                    style: {
                        marginTop: 25
                    },
                    children: `The product is built to rank from its first commit, and the SEO is done by the people who wrote the code.`
                })]
            }), (0, V.jsxs)(`div`, {
                className: `pf-g pf-g--fix`,
                "data-g": `2`,
                style: {
                    width: 384,
                    "--gap": `17px`
                },
                children: [(0, V.jsx)(`span`, {
                    className: `pf-chip`,
                    style: {
                        width: 104
                    },
                    children: (0, V.jsx)(`b`, {
                        children: `Custom software`
                    })
                }), (0, V.jsxs)(`h2`, {
                    className: `pf-h`,
                    style: {
                        width: 384
                    },
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `We design and build the thing being`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `ranked: storefronts, marketplaces,`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `booking systems, the machinery a`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `modern company sells through.`
                        })
                    })]
                }), (0, V.jsx)(`p`, {
                    className: `pf-b`,
                    style: {
                        width: 360,
                        marginTop: 27
                    },
                    children: `Most software is built first and optimized later, which is backwards. Architecture, speed and structure decide rankings before the first word of copy is written, so ours ships fast, renders clean, and gives search engines a site they can read without excuses.`
                })]
            })]
        })]
    })
}

function la() {
    return (0, V.jsxs)(`div`, {
        className: `nvm`,
        id: `nvm`,
        "aria-hidden": `true`,
        children: [(0, V.jsxs)(`a`, {
            href: `#model`,
            "data-at": `0.012`,
            children: [(0, V.jsx)(`b`, {
                children: `Ch. 1`
            }), (0, V.jsx)(`em`, {
                children: `The Model`
            })]
        }), (0, V.jsxs)(`a`, {
            href: `#work`,
            "data-at": `0.232`,
            children: [(0, V.jsx)(`b`, {
                children: `Ch. 2`
            }), (0, V.jsx)(`em`, {
                children: `The Work`
            })]
        }), (0, V.jsxs)(`a`, {
            href: `#terms`,
            "data-at": `0.400`,
            children: [(0, V.jsx)(`b`, {
                children: `Ch. 3`
            }), (0, V.jsx)(`em`, {
                children: `The Terms`
            })]
        }), (0, V.jsxs)(`a`, {
            href: `#questions`,
            "data-at": `0.628`,
            children: [(0, V.jsx)(`b`, {
                children: `Ch. 4`
            }), (0, V.jsx)(`em`, {
                children: `Questions`
            })]
        })]
    })
}
var ua = `M153.19 22.53C168.21 23.03 182.32 28.8 193.13 38.92C202.3 47.51 208.57 58.46 211.23 70.6C220.52 112.92 237.69 155.75 262.27 197.92C273.65 217.44 279.66 239.79 279.66 262.54C279.66 296.89 266.29 329.18 242.01 353.46C217.73 377.74 185.45 391.11 151.13 391.12L149.08 391.11C80.4 390.15 23.57 333.39 22.51 264.58C22.14 240.37 28.5 216.71 40.91 196.17C63.74 158.4 80.6 116 91.02 70.15C93.73 58.21 99.95 47.41 109.01 38.92C120.33 28.33 135.27 22.5 151.08 22.5C151.79 22.5 152.49 22.51 153.19 22.53Z`;

function da() {
    return (0, V.jsxs)(`div`, {
        className: `ov`,
        children: [(0, V.jsx)(na, {
            vertical: !0,
            out: `l`,
            style: {
                left: `var(--v1)`
            },
            delay: `.20s`
        }), (0, V.jsx)(na, {
            vertical: !0,
            right: !0,
            out: `r`,
            style: {
                left: `var(--v2)`
            },
            delay: `.30s`
        }), (0, V.jsx)(na, {
            out: `u`,
            style: {
                top: `var(--h1)`
            },
            delay: `.25s`
        }), (0, V.jsx)(na, {
            out: `d`,
            style: {
                top: `var(--h2)`
            },
            delay: `.40s`
        }), (0, V.jsx)(`span`, {
            className: `fill`,
            "data-out": `d`,
            "aria-hidden": `true`
        }), (0, V.jsx)(ra, {
            out: `ld`,
            style: {
                left: `var(--v1)`,
                top: `var(--h2)`
            },
            delay: `1.05s`
        }), (0, V.jsx)(ra, {
            out: `rd`,
            style: {
                left: `var(--v2)`,
                top: `var(--h2)`
            },
            delay: `1.18s`
        }), (0, V.jsx)(ra, {
            lock: !0,
            out: `lu`,
            style: {
                left: `var(--v1)`,
                top: `var(--h1)`
            }
        }), (0, V.jsx)(ra, {
            lock: !0,
            out: `ru`,
            style: {
                left: `var(--v2)`,
                top: `var(--h1)`
            }
        }), (0, V.jsx)(`canvas`, {
            className: `lines`,
            "aria-hidden": `true`
        }), (0, V.jsx)(`a`, {
            className: `mark`,
            href: `#top`,
            "aria-label": `Pear`,
            children: (0, V.jsx)(`svg`, {
                viewBox: `0 0 305 415`,
                fill: `none`,
                xmlns: `http://www.w3.org/2000/svg`,
                "aria-hidden": `true`,
                children: (0, V.jsx)(`path`, {
                    pathLength: `1`,
                    d: ua,
                    strokeWidth: `40`,
                    strokeMiterlimit: `10`,
                    strokeLinecap: `round`
                })
            })
        }), (0, V.jsxs)(`button`, {
            className: `menu`,
            type: `button`,
            "aria-label": `Menu`,
            children: [(0, V.jsx)(`span`, {}), (0, V.jsx)(`span`, {}), (0, V.jsx)(`span`, {}), (0, V.jsx)(`span`, {})]
        }), (0, V.jsx)(`nav`, {
            className: `hdr label`,
            children: (0, V.jsxs)(`a`, {
                className: `apply`,
                href: `#top`,
                children: [`Apply `, (0, V.jsx)(`span`, {
                    className: `arw`,
                    children: `→`
                })]
            })
        }), (0, V.jsxs)(`nav`, {
            className: `rail`,
            "aria-label": `Chapters`,
            children: [(0, V.jsxs)(`a`, {
                href: `#model`,
                "data-at": `0.012`,
                children: [(0, V.jsx)(`i`, {}), (0, V.jsx)(`em`, {
                    children: `The Model`
                })]
            }), (0, V.jsxs)(`a`, {
                href: `#work`,
                "data-at": `0.232`,
                children: [(0, V.jsx)(`i`, {}), (0, V.jsx)(`em`, {
                    children: `The Work`
                })]
            }), (0, V.jsxs)(`a`, {
                href: `#terms`,
                "data-at": `0.400`,
                children: [(0, V.jsx)(`i`, {}), (0, V.jsx)(`em`, {
                    children: `The Terms`
                })]
            }), (0, V.jsxs)(`a`, {
                href: `#questions`,
                "data-at": `0.628`,
                children: [(0, V.jsx)(`i`, {}), (0, V.jsx)(`em`, {
                    children: `Questions`
                })]
            })]
        }), (0, V.jsxs)(`div`, {
            className: `col-head`,
            children: [(0, V.jsxs)(`div`, {
                className: `bk`,
                "data-beat": `0`,
                children: [(0, V.jsx)(`h1`, {
                    children: (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `Pear makes you appear.`
                        })
                    })
                }), (0, V.jsxs)(`p`, {
                    className: `subhead`,
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `Not an agency on the clock,`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `a partner in the upside.`
                        })
                    })]
                }), (0, V.jsxs)(`a`, {
                    className: `cta`,
                    href: `#top`,
                    children: [(0, V.jsxs)(`span`, {
                        className: `face`,
                        children: [`Request Partnership `, (0, V.jsx)(`span`, {
                            className: `arw`,
                            children: `→`
                        })]
                    }), (0, V.jsx)(`span`, {
                        className: `flood`,
                        "aria-hidden": `true`,
                        children: (0, V.jsxs)(`span`, {
                            className: `face`,
                            children: [`Request Partnership `, (0, V.jsx)(`span`, {
                                className: `arw`,
                                children: `→`
                            })]
                        })
                    })]
                })]
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `1`,
                children: (0, V.jsx)(`div`, {
                    className: `beat`,
                    children: (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `We build it.`
                        })
                    })
                })
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `2`,
                children: (0, V.jsx)(`div`, {
                    className: `beat`,
                    children: (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `We rank it.`
                        })
                    })
                })
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `3`,
                children: (0, V.jsxs)(`div`, {
                    className: `beat`,
                    children: [(0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `We share in`
                        })
                    }), (0, V.jsx)(`span`, {
                        className: `ln`,
                        children: (0, V.jsx)(`i`, {
                            children: `what it earns.`
                        })
                    })]
                })
            })]
        }), (0, V.jsxs)(`div`, {
            className: `col-stand`,
            children: [(0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `0`,
                children: (0, V.jsx)(`p`, {
                    className: `stand`,
                    children: `We build custom software, rank it where customers search, and take our pay as a share of the revenue it earns. No retainers, no hours: if you don’t grow, we don’t get paid.`
                })
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `1`,
                children: (0, V.jsx)(`p`, {
                    className: `stand`,
                    children: `Tailored software, built to be found.`
                })
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `2`,
                children: (0, V.jsx)(`p`, {
                    className: `stand`,
                    children: `Search and links that put you in front of the crowd.`
                })
            }), (0, V.jsx)(`div`, {
                className: `bk`,
                "data-beat": `3`,
                children: (0, V.jsx)(`p`, {
                    className: `stand`,
                    children: `No hours billed — we co-own the outcome.`
                })
            })]
        }), (0, V.jsx)(`span`, {
            className: `tag`,
            children: `At your service`
        })]
    })
}

function fa() {
    return (0, l.useEffect)(() => {
        Gi()
    }, []), (0, V.jsxs)(`main`, {
        id: `top`,
        children: [(0, V.jsx)(`section`, {
            className: `stage`,
            children: (0, V.jsxs)(`div`, {
                className: `pin`,
                children: [(0, V.jsx)(qi, {}), (0, V.jsx)(Xi, {}), (0, V.jsx)(Qi, {}), (0, V.jsx)($i, {}), (0, V.jsx)(aa, {}), (0, V.jsx)(oa, {}), (0, V.jsx)(sa, {}), (0, V.jsx)(ca, {}), (0, V.jsx)(la, {}), (0, V.jsx)(da, {})]
            })
        }), (0, V.jsx)(`video`, {
            className: `src`,
            muted: !0,
            loop: !0,
            playsInline: !0,
            preload: `auto`,
            autoPlay: !0,
            "aria-hidden": `true`
        })]
    })
}

function pa() {
    return (0, V.jsx)(fa, {})
}(0, u.createRoot)(document.getElementById(`root`)).render((0, V.jsx)(l.StrictMode, {
    children: (0, V.jsx)(pa, {})
}));