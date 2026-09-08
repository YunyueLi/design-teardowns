const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/RiveInner-CnkUcQun.js", "assets/rolldown-runtime-aKtaBQYM.js", "assets/react-Dvkprh6u.js", "assets/jsx-runtime-DKdBMi_L.js", "assets/useBrowserSpecsStore-KSBuyu5W.js", "assets/react-_Rk6hbya.js", "assets/vanilla-DZJGj1NY.js", "assets/classnames-R0nST0CP.js", "assets/tailwind-config-Df-ObWL6.js", "assets/riveHelpers-Bp-4xNrr.js", "assets/reportError-D4E52G70.js", "assets/chunk-T3U33ZZ5-BudId7g_.js", "assets/chunk-5MM2A4YW-DFO2Eo6J.js", "assets/shallow-D10MTZ8f.js"]))) => i.map(i => d[i]);
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
    t as a
} from "./reportError-D4E52G70.js";
import {
    t as o
} from "./safeLazy-9BL36byX.js";
import {
    t as s
} from "./classnames-R0nST0CP.js";
import {
    t as c
} from "./tailwind-config-Df-ObWL6.js";
import {
    t as l
} from "./clamp-DM1hWUcE.js";
import {
    t as u
} from "./useSectionRegistry-BcvkvUON.js";
var d = e(t(), 1),
    f = r(),
    p = d.forwardRef(({
        alt: e,
        aspectRatio: t,
        crop: n = `center`,
        data: r,
        decoding: i = `async`,
        height: a = `auto`,
        loader: o = _,
        loading: s = `lazy`,
        sizes: c,
        src: l,
        srcSetOptions: u = {
            intervals: 15,
            startingWidth: 200,
            incrementSize: 200,
            placeholderWidth: 100
        },
        width: p = `100%`,
        ...g
    }, S) => {
        let w = d.useMemo(() => {
                let e = r?.width && r?.height ? r?.width : void 0,
                    t = r?.width && r?.height ? r?.height : void 0;
                return {
                    width: e,
                    height: t,
                    unitsMatch: !!v(e, t)
                }
            }, [r]),
            T = d.useMemo(() => {
                let n = y((p || `100%`).toString()),
                    i = `${n.number}${n.unit}`,
                    o = a == null,
                    s = o ? null : y(a.toString()),
                    c = s ? `${s.number}${s.unit}` : ``;
                return {
                    width: i,
                    height: o ? `auto` : c,
                    src: l || r?.url,
                    alt: r?.altText && !e ? r?.altText : e || ``,
                    aspectRatio: t || (w.unitsMatch ? [b(w.width), b(w.height)].join(`/`) : void 0)
                }
            }, [p, a, l, r, e, t, w, g?.key]),
            {
                intervals: E,
                startingWidth: D,
                incrementSize: O,
                placeholderWidth: k
            } = u,
            A = d.useMemo(() => C(p, E, D, O), [p, E, D, O]);
        return x(T.width) ? (0, f.jsx)(m, {
            aspectRatio: t,
            crop: n,
            decoding: i,
            height: a,
            imageWidths: A,
            loader: o,
            loading: s,
            normalizedProps: T,
            passthroughProps: g,
            ref: S,
            width: p,
            data: r
        }) : (0, f.jsx)(h, {
            aspectRatio: t,
            crop: n,
            decoding: i,
            imageWidths: A,
            loader: o,
            loading: s,
            normalizedProps: T,
            passthroughProps: g,
            placeholderWidth: k,
            ref: S,
            sizes: c,
            data: r
        })
    }),
    m = d.forwardRef(({
        aspectRatio: e,
        crop: t,
        decoding: n,
        height: r,
        imageWidths: i,
        loader: a = _,
        loading: o,
        normalizedProps: s,
        passthroughProps: c,
        width: l,
        data: u
    }, p) => {
        let m = d.useMemo(() => {
            let n = b(l),
                o = b(r),
                c = e || (v(s.width, s.height) ? [n, o].join(`/`) : s.aspectRatio ? s.aspectRatio : void 0),
                d = i === void 0 ? void 0 : T(i, c, t, {
                    width: u?.width ?? void 0,
                    height: u?.height ?? void 0
                }),
                f = o || (c && n ? n * (w(c) ?? 1) : void 0);
            return {
                width: n,
                aspectRatio: c,
                height: f,
                srcSet: S(s.src, d, a, `density`),
                src: a({
                    src: s.src,
                    width: n,
                    height: f,
                    crop: s.height === `auto` ? void 0 : t
                })
            }
        }, [e, t, u, r, i, a, s, l]);
        return (0, f.jsx)(`img`, {
            ref: p,
            alt: s.alt,
            decoding: n,
            height: m.height,
            loading: o,
            src: m.src,
            srcSet: m.srcSet,
            width: m.width,
            style: {
                aspectRatio: m.aspectRatio,
                ...c.style
            },
            ...c
        })
    }),
    h = d.forwardRef(({
        crop: e,
        decoding: t,
        imageWidths: n,
        loader: r = _,
        loading: i,
        normalizedProps: a,
        passthroughProps: o,
        placeholderWidth: s,
        sizes: c,
        data: l
    }, u) => {
        let p = d.useMemo(() => {
            let t = n === void 0 ? void 0 : T(n, a.aspectRatio, e, {
                    width: l?.width ?? void 0,
                    height: l?.height ?? void 0
                }),
                i = a.aspectRatio && s ? s * (w(a.aspectRatio) ?? 1) : void 0;
            return {
                placeholderHeight: i,
                srcSet: S(a.src, t, r),
                src: r({
                    src: a.src,
                    width: s,
                    height: i,
                    crop: e
                })
            }
        }, [e, l, n, r, a, s]);
        return (0, f.jsx)(`img`, {
            ref: u,
            alt: a.alt,
            decoding: t,
            height: p.placeholderHeight,
            loading: i,
            sizes: c,
            src: p.src,
            srcSet: p.srcSet,
            width: s,
            ...o,
            style: {
                width: a.width,
                aspectRatio: a.aspectRatio,
                ...o.style
            }
        })
    }),
    g = `https://placeholder.shopify.com`;

function _({
    src: e,
    width: t,
    height: n,
    crop: r
}) {
    if (!e) return ``;
    let i = new URL(e, g);
    return t && i.searchParams.append(`width`, Math.round(t).toString()), n && i.searchParams.append(`height`, Math.round(n).toString()), r && i.searchParams.append(`crop`, r), i.href.replace(g, ``)
}

function v(e = `100%`, t = `auto`) {
    return y(e.toString()).unit === y(t.toString()).unit
}

function y(e) {
    let t = e.replace(/[0-9.]/g, ``),
        n = parseFloat(e.replace(t, ``));
    return {
        unit: t === `` ? n === void 0 ? `auto` : `px` : t,
        number: n
    }
}

function b(e) {
    if (e === void 0) return;
    let {
        unit: t,
        number: n
    } = y(e.toString());
    switch (t) {
        case `em`:
            return n * 16;
        case `rem`:
            return n * 16;
        case `px`:
            return n;
        case ``:
            return n;
        default:
            return
    }
}

function x(e) {
    return typeof e == `number` || /\d(px|em|rem)$/.test(e)
}

function S(e, t, n = _, r = `width`) {
    return e ? t?.length === 0 || !t ? e : t.map((t, i) => `${n({src:e,width:t.width,height:t.height,crop:t.crop})} ${r===`density`?`${i+1}x`:`${t.width??0}w`}`).join(`, `) : ``
}

function C(e = `100%`, t, n, r) {
    let i = Array.from({
            length: t
        }, (e, t) => t * r + n),
        a = Array.from({
            length: 3
        }, (t, n) => (n + 1) * (b(e) ?? 0));
    return x(e) ? a : i
}

function w(e) {
    if (!e) return;
    let [t, n] = e.split(`/`);
    return 1 / (Number(t) / Number(n))
}

function T(e, t, n = `center`, r) {
    if (e) return e.map(e => ({
        width: e,
        height: t ? e * (w(t) ?? 1) : void 0,
        crop: n
    })).filter(({
        width: e,
        height: t
    }) => !(r?.width && e > r.width || r?.height && t && t > r.height))
}
var E = (0, d.forwardRef)((e, t) => {
        let {
            data: n,
            previewImageOptions: r,
            id: i = n.id,
            playsInline: a = !0,
            controls: o = !0,
            sourceProps: s = {},
            ...c
        } = e, l = _({
            src: n.previewImage?.url ?? ``,
            ...r
        });
        if (!n.sources) throw Error(`<Video/> requires a 'data.sources' array`);
        return (0, f.jsx)(`video`, {
            ...c,
            id: i,
            playsInline: a,
            controls: o,
            poster: l,
            ref: t,
            children: n.sources.map(e => {
                if (!(e?.url && e?.mimeType)) throw Error(`<Video/> needs 'source.url' and 'source.mimeType'`);
                return (0, d.createElement)(`source`, {
                    ...s,
                    key: e.url,
                    src: e.url,
                    type: e.mimeType
                })
            })
        })
    }),
    D = e => {
        let t = `1 / 1`;
        if (!e) return t;
        let n = e.split(`:`);
        return n.length === 2 ? isNaN(parseInt(n[0])) ? (`${n[0]}`, t) : isNaN(parseInt(n[1])) ? (`${n[1]}`, t) : `${n[0]} / ${n[1]}` : (`${e}`, t)
    },
    O = class extends d.Component {
        constructor(e) {
            super(e), this.state = {
                hasError: !1
            }
        }
        static getDerivedStateFromError() {
            return {
                hasError: !0
            }
        }
        componentDidCatch(e, t) {
            console.error(`Rive component failed to load:`, e, t), this.props.onError?.(e, t)
        }
        render() {
            return this.state.hasError ? this.props.fallback || null : this.props.children
        }
    },
    k = e(s(), 1),
    A = o(() => n(() => import(`./RiveInner-CnkUcQun.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))),
    j = 2;

function M(e, t) {
    return !e || !t || typeof window > `u` ? null : `${window.location.pathname.match(/^(.*\/editions\/spring2026)(?:\/|$)/)?.[1]??`/editions/spring2026`}/api/rive-runtime/${encodeURIComponent(e)}?media=${t}`
}
var N = class extends Error {
    retryable;
    constructor(e, t) {
        super(`Rive runtime request failed: ${e}`), this.retryable = t
    }
};

function P({
    artboard: e,
    aspectRatio: t = `1:1`,
    mobileAspectRatio: n,
    className: r,
    src: o,
    lazyRiveRuntime: s,
    productHandle: u,
    mediaKey: p,
    stateMachines: m,
    pausePlayback: h,
    riveClassName: g,
    description: _ = ``,
    assetsMap: v,
    posterImage: y,
    maxWidth: b = 1800,
    strings: x,
    interactive: S,
    tooltipText: C,
    tooltipTheme: w = `light`,
    tracksMouseOver: T,
    playsOnHover: E,
    input: P,
    rootMargin: F = `30% 30% 30% 30%`,
    viewModelName: I,
    skipAspectRatio: ee = !1,
    onRiveEvent: te,
    onStateChange: L,
    viewModelTrigger: ne,
    bindDefaultViewModel: R,
    renderImmediately: z = !1,
    isMobile: re,
    viewModelIsMobile: ie,
    role: ae,
    ariaHidden: oe,
    fullBleedOnMobile: se = !1
}) {
    let B = (0, d.useRef)(null),
        V = (0, d.useRef)(null),
        H = (0, d.useRef)(null),
        U = (0, d.useRef)(null),
        ce = (0, d.useRef)(null),
        W = i(e => e.isTouchDevice),
        le = i(e => e.isMobile),
        G = i(e => e.preferReducedMotion) === !0,
        K = re ?? le,
        q = G && K !== !1,
        [ue, J] = (0, d.useState)(z && !G),
        [de, fe] = (0, d.useState)(z && !G),
        Y = (0, d.useRef)(null),
        pe = (0, d.useRef)(h);
    (0, d.useEffect)(() => {
        pe.current = h
    }, [h]);
    let [me, X] = (0, d.useState)(!0), [Z, he] = (0, d.useState)(null), [ge, Q] = (0, d.useState)(0), ve = (0, d.useRef)(!1), [ye, be] = (0, d.useState)(!1), [xe, Se] = (0, d.useState)(!1), Ce = (0, d.useRef)(!1), we = (0, d.useRef)(null), Te = ie ?? (K === !0 && !!n), Ee = K && n ? n : t, $ = (E || G) && K === !1, De = G && ye, Oe = K ? 600 : 300;
    (0, d.useEffect)(() => {
        G && (J(!1), q && fe(!1), Y.current &&= (clearTimeout(Y.current), null))
    }, [G, q]), (0, d.useEffect)(() => {
        let e = B.current;
        if (!e || K === null || q) return;
        if (z) {
            fe(!0), G || J(!0);
            return
        }
        I && J(!1);
        let t = new IntersectionObserver(([e]) => {
            if (Y.current &&= (clearTimeout(Y.current), null), fe(e.isIntersecting), e.isIntersecting) {
                if (pe.current || $) return;
                Y.current = setTimeout(() => {
                    e.isIntersecting && !pe.current && J(!0)
                }, Oe)
            } else J(!1)
        }, {
            rootMargin: `100% 100% 100% 100%`
        });
        return t.observe(e), () => {
            e && t.unobserve(e), Y.current &&= (clearTimeout(Y.current), null)
        }
    }, [K, I, z, $, G, q, Oe]), (0, d.useEffect)(() => {
        if (Y.current &&= (clearTimeout(Y.current), null), h) {
            J(!1);
            return
        }
        if (!(!de || z || $ || q)) return Y.current = setTimeout(() => {
            pe.current || J(!0), Y.current = null
        }, Oe), () => {
            Y.current &&= (clearTimeout(Y.current), null)
        }
    }, [de, Oe, h, z, $, q]);
    let ke = (0, d.useCallback)(() => {
        let e = B.current,
            t = V.current;
        !e || !t || !H.current || (U.current && U.current.disconnect(), U.current = new ResizeObserver(() => {
            if (!H.current) return;
            let n = e.offsetWidth / H.current.width;
            t.style.transform = `scale(${n})`
        }), U.current.observe(e))
    }, []);
    (0, d.useEffect)(() => {
        let e = B.current,
            t = V.current;
        if (!e || !t || !E || K === null || K) return;
        let n = () => {
                if (H.current) return ke(), !0;
                if (!e.offsetWidth) return !1;
                let n = e.closest(`.hover-grid`);
                if (!n) return !1;
                let r = getComputedStyle(n).gridTemplateColumns.split(` `).length,
                    i = r === 2 ? 1.5 : r === 3 ? 2 : 1,
                    a = e.offsetWidth * i,
                    o = e.offsetHeight * i;
                return H.current = {
                    width: a,
                    height: o
                }, t.style.width = `${a}px`, t.style.height = `${o}px`, ke(), !0
            },
            r = null;
        return n() || (r = new ResizeObserver(() => {
            n() && r?.disconnect()
        }), r.observe(e)), () => {
            r?.disconnect(), U.current?.disconnect(), U.current = null
        }
    }, [E, K, ke]), (0, d.useEffect)(() => {
        let e = B.current;
        if (!e || !$ || K === null || K) return;
        let t = () => {
                Ce.current = !0, be(!0), fe(!0), J(!0), ve.current && X(!1)
            },
            n = () => {
                Ce.current = !1, be(!1)
            },
            r = e.closest(`.hover-grid > *`);
        if (r) {
            let i = new MutationObserver(() => {
                    r.hasAttribute(`data-hover-active`) ? t() : n()
                }),
                a = r.closest(`.hover-grid`),
                o = () => {
                    let e = a?.querySelector(`[data-hover-active]`);
                    e && e !== r && e.removeAttribute(`data-hover-active`), r.setAttribute(`data-hover-active`, ``), t()
                },
                s = () => {
                    r.removeAttribute(`data-hover-active`), n()
                };
            return i.observe(r, {
                attributes: !0,
                attributeFilter: [`data-hover-active`]
            }), e.addEventListener(`focusin`, o), e.addEventListener(`focusout`, s), () => {
                i.disconnect(), e.removeEventListener(`focusin`, o), e.removeEventListener(`focusout`, s)
            }
        }
        return e.addEventListener(`mouseenter`, t), e.addEventListener(`mouseleave`, n), e.addEventListener(`focusin`, t), e.addEventListener(`focusout`, n), () => {
            e.removeEventListener(`mouseenter`, t), e.removeEventListener(`mouseleave`, n), e.removeEventListener(`focusin`, t), e.removeEventListener(`focusout`, n)
        }
    }, [$, K]), (0, d.useEffect)(() => {
        ue || H.current || (X(!0), ve.current = !1)
    }, [ue]), (0, d.useEffect)(() => {
        if (!S || !C || W || K || W === null || K === null) return;
        let e = B.current,
            t = ce.current;
        if (!t || !e) return;
        let n = null,
            r = null,
            i = null,
            a = !1,
            o = (e, t, n) => e + (t - e) * (G ? 1 : n),
            s = r => {
                let i = e.getBoundingClientRect(),
                    s = t.getBoundingClientRect(),
                    c = r.clientX - i.left + 10,
                    u = r.clientY - i.top - s.height - 10;
                c + s.width > i.width && (c = i.width - s.width), c < 0 && (c = 0), u + 80 < 0 && (u = r.clientY - i.top + 10), u + s.height > i.height && (u = i.height - s.height);
                let d = () => {
                    let e = parseFloat(t.style.left) || 0,
                        r = parseFloat(t.style.top) || 0,
                        i = l(Math.sqrt((c - e) ** 2 + (u - r) ** 2) / 100, .1, 1),
                        s = o(e, c, i * .5),
                        f = o(r, u, i * .5);
                    if (t.style.left = `${s}px`, t.style.top = `${f}px`, a) {
                        let e = parseFloat(t.style.opacity || `1`);
                        if (t.style.opacity = `${e-.25}`, e <= 0) {
                            t.style.opacity = `0`, cancelAnimationFrame(n);
                            return
                        }
                    }
                    Math.abs(s - c) > 1 || Math.abs(f - u) > 1 ? n = requestAnimationFrame(d) : (cancelAnimationFrame(n), n = null)
                };
                cancelAnimationFrame(n), n = requestAnimationFrame(d)
            },
            c = () => {
                a = !1, t.style.opacity = `1`, e.addEventListener(`mousemove`, s), r &&= (clearTimeout(r), null), i &&= (clearInterval(i), null), i = window.setInterval(() => {
                    a = !0, clearInterval(i), i = null
                }, 3e3)
            },
            u = () => {
                t.style.opacity = `0`, r = window.setTimeout(() => {
                    e.removeEventListener(`mousemove`, s), n &&= (cancelAnimationFrame(n), null)
                }, 200), i &&= (clearInterval(i), null)
            },
            d = () => {
                a = !0, t.style.opacity = `0`, e.removeEventListener(`mousemove`, s), e.removeEventListener(`mouseenter`, c), e.removeEventListener(`mouseleave`, u), e.removeEventListener(`click`, d), n && cancelAnimationFrame(n), r && clearTimeout(r), i && clearInterval(i)
            };
        return e.addEventListener(`mouseenter`, c), e.addEventListener(`mouseleave`, u), e.addEventListener(`click`, d), () => {
            e.removeEventListener(`mousemove`, s), e.removeEventListener(`mouseenter`, c), e.removeEventListener(`mouseleave`, u), e.removeEventListener(`click`, d), n && cancelAnimationFrame(n), r && clearTimeout(r), i && clearInterval(i)
        }
    }, [S, C, W, K, G]);
    let Ae = s ? M(u, p) : null;
    (0, d.useEffect)(() => {
        if (!s || o || u && p) return;
        let e = `${u??`missing-product`}:${p??`missing-media`}`;
        we.current !== e && (we.current = e)
    }, [s, o, u, p]), (0, d.useEffect)(() => {
        he(null), Q(0)
    }, [Ae]), (0, d.useEffect)(() => {
        if (!de || q || o || !Ae || Z) return;
        let e = new AbortController,
            t = null;
        return fetch(Ae, {
            signal: e.signal
        }).then(e => {
            if (!e.ok) throw new N(e.status, e.status >= 500);
            return e.json()
        }).then(e => {
            he(e), Q(0)
        }).catch(e => {
            if (!(e instanceof DOMException && e.name === `AbortError`)) {
                if ((!(e instanceof N) || e.retryable) && ge < j - 1) {
                    t = setTimeout(() => {
                        Q(e => e + 1)
                    }, 750 * (ge + 1));
                    return
                }
                a(e, `Rive.runtime`, {
                    retryable: e instanceof N ? e.retryable : void 0
                })
            }
        }), () => {
            e.abort(), t && clearTimeout(t)
        }
    }, [de, q, o, Ae, Z, ge]);
    let je = (0, d.useCallback)(e => {
            te && te(e)
        }, [te]),
        Me = o ?? Z?.src,
        Ne = o ? I : Z?.viewModelName,
        Pe = xe || !y,
        Fe = C || _,
        Ie = $ && Fe;
    return (0, f.jsxs)(`div`, {
        ref: B,
        className: c((0, k.default)(`relative transition-opacity duration-300`, {
            "h-full": ee,
            "cursor-pointer": $,
            "w-[calc(100%+var(--spacing-grid-spacing)*2)] ml-[calc(var(--spacing-grid-spacing)*-1)] sm:w-full sm:ml-0 sm:max-w-full": se,
            "w-full max-w-full": !se,
            "opacity-0": !Pe,
            "opacity-100": Pe
        }, r)),
        tabIndex: Ie ? 0 : void 0,
        role: Ie ? `img` : void 0,
        "aria-label": Ie ? Fe : void 0,
        style: ee ? void 0 : {
            aspectRatio: D(Ee)
        },
        children: [(0, f.jsx)(`div`, {
            ref: V,
            className: `absolute inset-0 overflow-hidden`,
            style: {
                transformOrigin: `top left`
            },
            children: ue && !q && Me && (0, f.jsx)(d.Suspense, {
                fallback: null,
                children: (0, f.jsx)(O, {
                    fallback: null,
                    onError: e => a(e, `Rive.render`, {
                        src: Me
                    }),
                    children: (0, f.jsx)(A, {
                        className: (0, k.default)(g, E && !K && me ? `opacity-0 pointer-events-none` : ``),
                        description: _,
                        src: Me,
                        stateMachines: m ?? Z?.stateMachines,
                        artboard: e ?? Z?.artboard,
                        pausePlayback: h,
                        assetsMap: v ?? Z?.assetsMap,
                        interactive: S,
                        strings: x ?? Z?.strings,
                        tracksMouseOver: T,
                        playsOnHover: E,
                        input: P,
                        isTouch: W,
                        maxWidth: b,
                        rootMargin: F,
                        isMobile: K,
                        viewModelIsMobile: Te,
                        viewModelName: Ne,
                        skipAspectRatio: ee,
                        onRiveEvent: je,
                        onStateChange: L,
                        viewModelTrigger: ne,
                        bindDefaultViewModel: R,
                        role: ae,
                        ariaHidden: oe,
                        isHovered: ye,
                        allowReducedMotionPlayback: De,
                        onRiveReady: () => {
                            if (ve.current = !0, E && !K && Ce.current && B.current && V.current) {
                                let e = B.current.offsetWidth,
                                    t = B.current.offsetHeight;
                                H.current && e !== H.current.width && (H.current = {
                                    width: e,
                                    height: t
                                }, V.current.style.width = `${e}px`, V.current.style.height = `${t}px`)
                            }(!E && !G || K || Ce.current) && X(!1)
                        }
                    })
                })
            })
        }), y && (0, f.jsx)(_e, {
            media: y,
            loading: `lazy`,
            className: (0, k.default)(`size-full object-cover absolute top-0 left-0 pointer-events-none transition-opacity duration-200`, me ? `opacity-100` : `opacity-0`),
            skipAspectRatio: !0,
            onLoad: () => Se(!0)
        }), S && C && !W && !K && (0, f.jsx)(`span`, {
            className: (0, k.default)(`rive-tooltip hidden sm:block absolute px-12 py-8 rounded-[75px_100px_100px_20px] transition-opacity duration-500 uppercase text-xs select-none pointer-events-none`, {
                "bg-b100 text-white": w === `dark`,
                "bg-white text-b90": w === `light`
            }),
            style: {
                opacity: 0,
                left: `0px`,
                top: `0px`
            },
            ref: ce,
            "aria-hidden": !0,
            children: C
        })]
    })
}
var F = {
        intervals: 16,
        startingWidth: 200,
        incrementSize: 100,
        placeholderWidth: 100
    },
    I = {
        intervals: 17,
        startingWidth: 400,
        incrementSize: 200,
        placeholderWidth: 200
    },
    ee = `(min-width: 1920px) 1680px, (min-width: 1024px) 1200px, 100vw`,
    te = `(min-width: 1920px) 560px, (min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw`,
    L = `(min-width: 1920px) 840px, (min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw`;

function ne(e) {
    return {
        url: e,
        altText: ``,
        originalSrc: ``,
        src: ``,
        transformedSrc: ``
    }
}
var R = [720, 1440],
    z = [500, 1e3, 1250, 2500],
    re = 720,
    ie = 1250,
    ae = 500,
    oe = 2,
    se = (e, t, n, r, i) => {
        let a = r * i,
            o = [...n].sort((e, t) => e - t),
            s = n => {
                let r = o.map(r => ({
                    width: r,
                    url: e[`${n}${t}W${r}`]
                })).filter(e => !!e.url);
                if (r.length === 0) return;
                let i = r.find(e => e.width >= a);
                return i ? i.url : r[r.length - 1].url
            };
        return {
            mp4: s(`mp4`),
            hevc: s(`hevc`),
            h264: s(`h264`),
            webm: s(`webm`),
            mov: s(`mov`)
        }
    },
    B = ({
        data: e,
        placement: t,
        dpr: n
    }) => {
        let r = Math.min(n || 1, oe),
            i = t === `grid` ? ae : ie;
        return {
            mobile: se(e, `Mobile`, R, re, r),
            desktop: se(e, `Desktop`, z, i, r)
        }
    };

function V(e, t = .05) {
    let n = e.getBoundingClientRect(),
        r = window.innerHeight * t,
        i = window.innerWidth * t;
    return n.bottom >= -r && n.top <= window.innerHeight + r && n.right >= -i && n.left <= window.innerWidth + i
}
var H = (e, t, {
    pausePlayback: n,
    forcePlay: r = !1,
    onRelease: a,
    defersFirstPlay: o = !0
}) => {
    let s = (0, d.useRef)(!1),
        [c, l] = (0, d.useState)(!1),
        u = (0, d.useCallback)(e => {
            s.current = e, l(e)
        }, []),
        f = (0, d.useRef)(!1),
        p = (0, d.useRef)(!1),
        [m, h] = (0, d.useState)(!1),
        g = (0, d.useCallback)(e => {
            p.current = e, h(e)
        }, []),
        _ = (0, d.useRef)(null),
        [v, y] = (0, d.useState)(!1),
        b = (0, d.useRef)(a);
    (0, d.useEffect)(() => {
        b.current = a
    }, [a]);
    let x = i(e => e.preferReducedMotion),
        S = i(e => e.isSafari),
        C = (0, d.useRef)(n),
        w = (0, d.useRef)(n);
    (0, d.useEffect)(() => {
        C.current = n
    }, [n]);
    let T = (0, d.useCallback)(() => e.current ? e.current.currentTime > 0 && !e.current.paused && !e.current.ended && e.current.readyState > e.current.HAVE_CURRENT_DATA : !1, [e]),
        E = (0, d.useCallback)(async (t = !1) => {
            if (!t && (C.current || f.current || x)) return;
            if (o && !v) {
                y(!0);
                return
            }
            if (!e.current) return;
            let n = T();
            g(!0), n || (_.current && await _.current.catch(() => {}), _.current = e.current.play(), _.current.then(() => {
                _.current = null
            }).catch(() => {
                _.current = null, g(!1)
            }))
        }, [o, v, e, x, T, g]),
        D = (0, d.useCallback)(async () => {
            e.current && (_.current &&= (await _.current.catch(() => {}), null), g(!1), e.current.paused || e.current.pause())
        }, [e, g]),
        O = (0, d.useCallback)(e => {
            [`Space`, `Enter`].includes(e.code) && (e.preventDefault(), p.current ? (f.current = !0, D()) : (f.current = !1, E(!0)))
        }, [D, E]),
        k = (0, d.useCallback)(async () => {
            let t = e.current;
            t && (_.current &&= (await _.current.catch(() => {}), null), g(!1), t.paused || t.pause(), r || (t.querySelectorAll(`source`).forEach(e => {
                e.remove()
            }), t.load()), b.current?.(), o && y(!1))
        }, [e, g, o, r]),
        A = (0, d.useCallback)(async ([e]) => {
            if (e.isIntersecting) u(!0), E();
            else {
                if (u(!1), r) return;
                await k()
            }
        }, [r, E, k, u]);
    (0, d.useEffect)(() => {
        let e = t.current;
        if (!e) return;
        let n = new IntersectionObserver(A, {
            rootMargin: `5%`
        });
        return n.observe(e), () => {
            n.unobserve(e), n.disconnect()
        }
    }, [t, A]), (0, d.useEffect)(() => {
        r && E()
    }, [r, E]), (0, d.useEffect)(() => {
        let t = null,
            n = 0,
            i = () => {
                if (!(!s.current && !r) && !(o && !v)) {
                    if (e.current) {
                        E();
                        return
                    }
                    n += 1, n <= 12 && (t = requestAnimationFrame(i))
                }
            };
        return i(), () => {
            t !== null && cancelAnimationFrame(t)
        }
    }, [o, v, S, E, c, r, e]);
    let j = (0, d.useCallback)(r => {
        let i = t.current,
            a = i ? V(i) : s.current,
            o = !!r && !n && a;
        if (!(!s.current && !o)) {
            if (!a) {
                u(!1), k();
                return
            }
            s.current || u(!0), n ? e.current && D() : E()
        }
    }, [t, D, E, n, k, u, e]);
    return (0, d.useEffect)(() => {
        j(w.current), w.current = n
    }, [j, n]), (0, d.useEffect)(() => () => {
        let t = e.current;
        _.current && _.current.catch(() => {}), s.current && (b.current?.(), t && (t.paused || t.pause(), t.querySelectorAll(`source`).forEach(e => e.remove()), t.load()))
    }, []), {
        renderVideo: v,
        isSafari: S,
        playing: m,
        handleKeyUp: O,
        isIntersecting: c
    }
};

function U({
    data: e,
    className: t,
    mediaClassName: n,
    pausePlayback: r,
    loading: i = `lazy`,
    loop: a = !0,
    tabIndex: o,
    forcePlay: s = !1,
    placement: l = `xxl`,
    placeholderClassName: u,
    imageSizes: m,
    imageSrcSetOptions: h,
    title: g,
    isMobile: _
}) {
    let v = (0, d.useMemo)(() => {
            let t = _ ? e.posterMobile : e.posterDesktop,
                n = _ ? e.posterDesktop : e.posterMobile,
                r = t || n;
            return r ? ne(r) : null
        }, [e.posterDesktop, e.posterMobile, _]),
        y = (0, d.useRef)(!1),
        b = (0, d.useRef)(null),
        x = (0, d.useRef)(null),
        S = (0, d.useMemo)(() => typeof window > `u` ? {
            mobile: {},
            desktop: {}
        } : B({
            data: e,
            placement: l,
            dpr: window.devicePixelRatio || 1
        }), [e, l]),
        {
            renderVideo: C,
            isSafari: w,
            playing: T,
            handleKeyUp: E
        } = H(b, x, {
            pausePlayback: r,
            forcePlay: s,
            onRelease: () => {
                y.current = !1
            }
        });
    return (0, f.jsxs)(`div`, {
        ref: x,
        className: c((0, k.default)(`relative`, t)),
        "aria-hidden": o === void 0 || void 0,
        children: [v && (0, f.jsx)(p, {
            loading: i,
            className: c((0, k.default)(`block h-full max-h-full max-w-full absolute left-0 top-0 pointer-events-none object-cover`, C && y.current ? `invisible opacity-0` : ``, n, u)),
            data: v,
            alt: g,
            sizes: m,
            srcSetOptions: h
        }), C && w !== null && (0, f.jsx)(`video`, {
            ref: b,
            className: n,
            controls: !1,
            muted: !0,
            autoPlay: !1,
            preload: `metadata`,
            playsInline: !0,
            disablePictureInPicture: !0,
            disableRemotePlayback: !0,
            loop: a,
            tabIndex: o,
            role: o === void 0 ? void 0 : `button`,
            "aria-label": o === void 0 ? void 0 : T ? `Pause video` : `Play video`,
            "aria-pressed": o === void 0 ? void 0 : T,
            onCanPlay: () => {
                if (!x.current || y.current) return;
                let e = x.current.querySelector(`img`);
                e && (e.style.opacity = `0`, y.current = !0)
            },
            onKeyUp: E,
            children: [`mobile`, `desktop`].map(t => {
                let n = S[t],
                    r = t === `mobile` ? `(max-width: 767px)` : `(min-width: 768px)`;
                return (0, f.jsxs)(d.Fragment, {
                    children: [!e.isStacked && w && n.mov && (0, f.jsx)(`source`, {
                        src: n.mov,
                        type: `video/quicktime`,
                        media: r
                    }), !w && n.webm && (0, f.jsx)(`source`, {
                        src: n.webm,
                        type: `video/webm`,
                        media: r
                    }), !e.isStacked && n.mp4 && (0, f.jsx)(`source`, {
                        src: n.mp4,
                        type: `video/mp4; codecs="av01.0.08M.08.0.110.01.01.01.0"`,
                        media: r
                    }), !e.isStacked && n.hevc && (0, f.jsx)(`source`, {
                        src: n.hevc,
                        type: `video/mp4; codecs="hvc1.1.60000000.L150.B0"`,
                        media: r
                    }), !e.isStacked && n.h264 && (0, f.jsx)(`source`, {
                        src: n.h264,
                        type: `video/mp4; codecs="avc1.640032"`,
                        media: r
                    })]
                }, t)
            })
        })]
    })
}

function ce(e, t = {}) {
    if (typeof window > `u`) return () => {};
    let n = window,
        {
            timeout: r = 200
        } = t;
    if (typeof n.requestIdleCallback == `function`) {
        let t = n.requestIdleCallback(e, {
            timeout: r
        });
        return () => n.cancelIdleCallback?.(t)
    }
    let i = n.setTimeout(e, 0);
    return () => n.clearTimeout(i)
}

function W(e, t, n) {
    let r = e.createShader(t);
    return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (e.deleteShader(r), null)) : null
}

function le(e, t, n) {
    let r = W(e, e.VERTEX_SHADER, t),
        i = W(e, e.FRAGMENT_SHADER, n),
        a = e.createProgram();
    return !r || !i || !a ? (r && e.deleteShader(r), i && e.deleteShader(i), a && e.deleteProgram(a), null) : (e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), e.deleteShader(r), e.deleteShader(i), e.getProgramParameter(a, e.LINK_STATUS) ? a : (e.deleteProgram(a), null))
}

function G(e, t) {
    let n = e.createVertexArray(),
        r = e.createBuffer();
    if (!n || !r) return n && e.deleteVertexArray(n), r && e.deleteBuffer(r), null;
    let i = new Float32Array([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0]);
    e.bindVertexArray(n), e.bindBuffer(e.ARRAY_BUFFER, r), e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW);
    let a = e.getAttribLocation(t, `a_pos`),
        o = e.getAttribLocation(t, `a_uv`);
    return e.enableVertexAttribArray(a), e.vertexAttribPointer(a, 2, e.FLOAT, !1, 16, 0), e.enableVertexAttribArray(o), e.vertexAttribPointer(o, 2, e.FLOAT, !1, 16, 8), {
        vertexArray: n,
        buffer: r
    }
}
var K = `#version 300 es
in vec2 a_pos;
in vec2 a_uv;
out vec2 v_uv;
void main() { v_uv = a_uv; gl_Position = vec4(a_pos, 0.0, 1.0); }`,
    q = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_tex;
out vec4 outColor;
void main() {
  vec3 rgb = texture(u_tex, vec2(v_uv.x, v_uv.y * 0.5)).rgb;
  float alpha = texture(u_tex, vec2(v_uv.x, 0.5 + v_uv.y * 0.5)).r;
  outColor = vec4(rgb * alpha, alpha);
}`,
    ue = new WeakMap,
    J = null,
    de = () => {
        if (typeof window > `u`) return !1;
        if (J !== null) return J;
        let e = document.createElement(`canvas`).getContext(`webgl2`);
        return J = !!e, e?.getExtension(`WEBGL_lose_context`)?.loseContext(), J
    };

function fe(e, t) {
    let n = document.createElement(`canvas`),
        r = n.getContext(`webgl2`, {
            premultipliedAlpha: !0,
            alpha: !0,
            preserveDrawingBuffer: t
        });
    if (!r) return null;
    let i = le(r, K, q);
    if (!i) return null;
    r.useProgram(i);
    let a = G(r, i),
        o = r.createTexture();
    if (!a || !o) return a && (r.deleteBuffer(a.buffer), r.deleteVertexArray(a.vertexArray)), o && r.deleteTexture(o), r.deleteProgram(i), null;
    let {
        vertexArray: s,
        buffer: c
    } = a;
    return r.bindTexture(r.TEXTURE_2D, o), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), n.addEventListener(`webglcontextlost`, t => {
        t.preventDefault(), e()
    }), {
        canvas: n,
        gl: r,
        program: i,
        vertexArray: s,
        buffer: c,
        texture: o,
        needsFlushBeforeBlit: t
    }
}
var Y = new class {
    resources = null;
    activeConsumers = 0;
    isSafari = !1;
    retain(e) {
        return this.isSafari = e, this.activeConsumers += 1, this
    }
    release() {
        this.activeConsumers = Math.max(0, this.activeConsumers - 1), this.activeConsumers === 0 && this.destroy()
    }
    draw(e, t) {
        let n = e.videoWidth,
            r = Math.floor(e.videoHeight / 2);
        if (!n || !r) return !1;
        let i = ue.get(t);
        if (!i) {
            if (i = t.getContext(`2d`, {
                    alpha: !0,
                    desynchronized: !0
                }), !i) return !1;
            ue.set(t, i)
        }
        let a = this.ensureResources();
        if (!a) return !1;
        a.canvas.width < n && (a.canvas.width = n), a.canvas.height < r && (a.canvas.height = r), t.width !== n && (t.width = n), t.height !== r && (t.height = r);
        let {
            gl: o
        } = a;
        return o.viewport(0, 0, n, r), o.bindTexture(o.TEXTURE_2D, a.texture), o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, e), o.clearColor(0, 0, 0, 0), o.clear(o.COLOR_BUFFER_BIT), o.drawArrays(o.TRIANGLE_STRIP, 0, 4), a.needsFlushBeforeBlit && o.flush(), i.clearRect(0, 0, n, r), i.drawImage(a.canvas, 0, a.canvas.height - r, n, r, 0, 0, n, r), !0
    }
    dropResources() {
        this.resources = null
    }
    ensureResources() {
        return this.resources ||= fe(() => this.dropResources(), this.isSafari), this.resources
    }
    destroy() {
        let e = this.resources;
        e && (e.gl.deleteTexture(e.texture), e.gl.deleteBuffer(e.buffer), e.gl.deleteVertexArray(e.vertexArray), e.gl.deleteProgram(e.program), e.gl.getExtension(`WEBGL_lose_context`)?.loseContext(), this.resources = null)
    }
};

function pe(e) {
    return Y.retain(e)
}

function me({
    data: e,
    className: t,
    mediaClassName: n,
    pausePlayback: r,
    loading: i = `lazy`,
    loop: a = !0,
    tabIndex: o,
    forcePlay: s = !1,
    placement: l = `xxl`,
    placeholderClassName: u,
    imageSizes: m,
    imageSrcSetOptions: h,
    title: g,
    isMobile: _
}) {
    let v = (0, d.useMemo)(() => {
            let t = _ ? e.posterMobile : e.posterDesktop,
                n = _ ? e.posterDesktop : e.posterMobile,
                r = t || n;
            return r ? ne(r) : null
        }, [e.posterDesktop, e.posterMobile, _]),
        y = (0, d.useRef)(null),
        b = (0, d.useRef)(null),
        x = (0, d.useRef)(null),
        S = (0, d.useRef)(null),
        C = (0, d.useRef)(null),
        w = (0, d.useRef)(null),
        T = (0, d.useRef)(-1),
        [E, D] = (0, d.useState)(!1),
        O = (0, d.useRef)(!1),
        A = (0, d.useMemo)(() => typeof window > `u` ? {
            mobile: {},
            desktop: {}
        } : B({
            data: e,
            placement: l,
            dpr: window.devicePixelRatio || 1
        }), [e, l]),
        j = !!(A.mobile.hevc || A.desktop.hevc || A.mobile.h264 || A.desktop.h264),
        M = j || !!(A.mobile.mp4 || A.desktop.mp4),
        [N, P] = (0, d.useState)(!1);
    (0, d.useEffect)(() => {
        P(de() && M)
    }, [M]);
    let F = (0, d.useCallback)(() => {
            b.current && w.current !== null && b.current.cancelVideoFrameCallback(w.current), w.current = null, C.current !== null && cancelAnimationFrame(C.current), C.current = null, S.current?.release(), S.current = null, O.current = !1
        }, []),
        {
            playing: I,
            handleKeyUp: ee,
            isIntersecting: te,
            isSafari: L
        } = H(b, x, {
            pausePlayback: r,
            forcePlay: s,
            defersFirstPlay: !1,
            onRelease: () => {
                O.current = !1, D(!1)
            }
        }),
        R = N && !r && L !== null && (L ? j : M) && (te || s),
        z = (0, d.useRef)(r);
    return (0, d.useEffect)(() => {
        z.current = r, r && (O.current = !1, D(!1))
    }, [r]), (0, d.useEffect)(() => {
        if (!R || !y.current || !b.current) return;
        let e = b.current,
            t = y.current,
            n = pe(L === !0);
        S.current = n;
        let r = () => {
                e.videoWidth && (t.width = e.videoWidth, t.height = Math.floor(e.videoHeight / 2))
            },
            i, a = () => {
                i?.(), i = ce(r)
            };
        e.readyState >= 1 ? a() : e.addEventListener(`loadedmetadata`, a, {
            once: !0
        });
        let o = () => {
                if (S.current && !e.paused && !z.current && e.readyState >= 2 && e.videoWidth) try {
                    (t.width !== e.videoWidth || t.height !== Math.floor(e.videoHeight / 2)) && (i?.(), r()), S.current.draw(e, t) && (O.current || (O.current = !0, D(!0)))
                } catch {
                    S.current?.release(), S.current = null, O.current = !1
                }
            },
            s, c, l = e;
        if (l.requestVideoFrameCallback && l.cancelVideoFrameCallback) {
            let t = () => {
                S.current && (o(), w.current = l.requestVideoFrameCallback.call(e, t))
            };
            w.current = l.requestVideoFrameCallback.call(e, t), s = () => {
                w.current !== null && (l.cancelVideoFrameCallback.call(e, w.current), w.current = null)
            }, c = () => {
                w.current = l.requestVideoFrameCallback.call(e, t)
            }
        } else {
            let t = () => {
                S.current && (e.currentTime !== T.current && (T.current = e.currentTime, o()), C.current = requestAnimationFrame(t))
            };
            C.current = requestAnimationFrame(t), s = () => {
                C.current !== null && (cancelAnimationFrame(C.current), C.current = null)
            }, c = () => {
                C.current = requestAnimationFrame(t)
            }
        }
        let u = () => {
            s(), c()
        };
        return e.addEventListener(`playing`, u), e.addEventListener(`seeked`, u), () => {
            e.removeEventListener(`playing`, u), e.removeEventListener(`seeked`, u), e.removeEventListener(`loadedmetadata`, a), i?.(), F()
        }
    }, [F, R, L]), (0, f.jsxs)(`div`, {
        ref: x,
        className: c((0, k.default)(`relative`, t)),
        "aria-hidden": o === void 0 || void 0,
        children: [v && (0, f.jsx)(p, {
            loading: i,
            className: c((0, k.default)(`block h-full max-h-full max-w-full absolute left-0 top-0 pointer-events-none object-cover`, E ? `invisible opacity-0` : ``, n, u)),
            data: v,
            alt: g,
            sizes: m,
            srcSetOptions: h
        }), R && (0, f.jsx)(`canvas`, {
            ref: y,
            className: c((0, k.default)(`absolute inset-0 size-full object-cover`, n)),
            tabIndex: o,
            role: o === void 0 ? void 0 : `button`,
            "aria-label": o === void 0 ? void 0 : I ? `Pause video` : `Play video`,
            "aria-hidden": o === void 0 || void 0,
            "aria-pressed": o === void 0 ? void 0 : I,
            onKeyUp: ee
        }), R && (0, f.jsx)(`video`, {
            ref: b,
            crossOrigin: `anonymous`,
            className: `absolute inset-0 size-full pointer-events-none opacity-0`,
            "aria-hidden": !0,
            controls: !1,
            muted: !0,
            autoPlay: !1,
            preload: `metadata`,
            playsInline: !0,
            disablePictureInPicture: !0,
            disableRemotePlayback: !0,
            loop: a,
            children: [`mobile`, `desktop`].map(e => {
                let t = A[e],
                    n = e === `mobile` ? `(max-width: 767px)` : `(min-width: 768px)`;
                return (0, f.jsxs)(d.Fragment, {
                    children: [!L && t.mp4 && (0, f.jsx)(`source`, {
                        src: t.mp4,
                        type: `video/mp4; codecs="av01.0.08M.08.0.110.01.01.01.0"`,
                        media: n
                    }), t.hevc && (0, f.jsx)(`source`, {
                        src: t.hevc,
                        type: `video/mp4; codecs="hvc1.1.60000000.L150.B0"`,
                        media: n
                    }), t.h264 && (0, f.jsx)(`source`, {
                        src: t.h264,
                        type: `video/mp4; codecs="avc1.640032"`,
                        media: n
                    })]
                }, e)
            })
        })]
    })
}
var X = null;

function Z() {
    if (typeof window > `u`) return !1;
    if (X !== null) return X;
    if (/iPad|iPhone|iPod/i.test(navigator.userAgent) || navigator.platform === `MacIntel` && navigator.maxTouchPoints > 1) return X = !1, !1;
    let e = /Chrome|Chromium/i.test(navigator.userAgent),
        t = /Firefox/i.test(navigator.userAgent);
    return !e && !t ? (X = !1, !1) : (X = document.createElement(`video`).canPlayType(`video/webm; codecs="vp9"`) === `probably`, X)
}

function he(e) {
    let [t, n] = (0, d.useState)(!1), r = !!(e.data.webmDesktopW500 || e.data.webmDesktopW1000 || e.data.webmDesktopW1250 || e.data.webmDesktopW2500), i = !!(e.data.webmMobileW720 || e.data.webmMobileW1440);
    return (0, d.useEffect)(() => {
        n(r && i && Z())
    }, [r, i]), e.data.isStacked && !t ? (0, f.jsx)(me, {
        ...e
    }) : (0, f.jsx)(U, {
        ...e
    })
}
var ge = (e, t) => e?.rive ? t && e.rive.mobileAspectRatio ? D(e.rive.mobileAspectRatio) : D(e.rive.aspectRatio || `1:1`) : e?.customVideo?.aspectRatio ? D(e.customVideo.aspectRatio) : e?.video ? `${e.video.sources[0].width} / ${e.video.sources[0].height}` : e?.image ? `${e.image.width} / ${e.image.height}` : `auto`;

function Q({
    className: e,
    data: t,
    loop: n = !0,
    tabIndex: r,
    pausePlayback: a,
    loading: o = `lazy`,
    mediaClassName: s,
    forcePlay: l = !1,
    imageSizes: u,
    imageSrcSetOptions: m,
    placeholderClassName: h,
    overlayVideo: g = !1
}) {
    let _ = (0, d.useRef)(!1),
        v = (0, d.useRef)(null),
        y = (0, d.useRef)(null),
        b = (0, d.useRef)(!1),
        x = (0, d.useRef)(!1),
        S = (0, d.useRef)(!1),
        C = (0, d.useRef)(null),
        [w, T] = (0, d.useState)(!1),
        D = i(e => e.preferReducedMotion),
        O = (0, d.useCallback)(() => v.current ? v.current.currentTime > 0 && !v.current.paused && !v.current.ended && v.current.readyState > v.current.HAVE_CURRENT_DATA : !1, []),
        A = (0, d.useCallback)(() => {
            let e = v.current;
            e && (S.current = !1, e.paused || e.pause(), C.current &&= (C.current.catch(() => {}), null), e.src = ``, e.querySelectorAll(`source`)?.forEach(e => e.remove()), e.load(), _.current = !1, T(!1))
        }, []),
        j = (0, d.useCallback)(async (e = !1) => {
            if (!e && (a || x.current || D)) return;
            if (!w) {
                T(!0);
                return
            }
            if (!v.current) return;
            let t = O();
            S.current = !0, t || (C.current && await C.current.catch(() => {}), C.current = v.current.play(), C.current.then(() => {
                C.current = null
            }).catch(() => {
                C.current = null, S.current = !1
            }))
        }, [w, a, D, O]),
        M = (0, d.useCallback)(async () => {
            v.current && (C.current &&= (await C.current.catch(() => {}), null), S.current = !1, O() && v.current.pause())
        }, [O]);

    function N(e) {
        [`Space`, `Enter`].includes(e.code) && (S.current ? (x.current = !0, M()) : (x.current = !1, j(!0)))
    }
    let P = (0, d.useCallback)(async ([e]) => {
        e.isIntersecting ? (j(), b.current = !0) : (A(), b.current = !1)
    }, [j, A]);
    (0, d.useEffect)(() => {
        let e = y.current;
        if (!e) return;
        let t = new IntersectionObserver(P, {
            rootMargin: `5%`
        });
        return t.observe(e), () => {
            t.unobserve(e), t.disconnect()
        }
    }, [P]), (0, d.useEffect)(() => {
        l && j()
    }, [l, j]), (0, d.useEffect)(() => {
        if (!y.current || !w) return;
        let e = y.current.querySelector(`video`);
        e && (v.current = e, b.current && j())
    }, [w, j]), (0, d.useEffect)(() => () => {
        C.current && C.current.catch(() => {})
    }, []);
    let F = (0, d.useCallback)(() => {
        if (!b.current) return;
        let e = y.current;
        if (e && !V(e)) {
            b.current = !1, A();
            return
        }
        a ? v.current && M() : j()
    }, [M, j, a, A]);
    return (0, d.useEffect)(() => {
        F()
    }, [F, a]), (0, f.jsxs)(`div`, {
        ref: y,
        className: c((0, k.default)(`relative`, e)),
        "data-id": t.id,
        "aria-hidden": r === void 0 || void 0,
        children: [(0, f.jsx)(p, {
            loading: o,
            className: c((0, k.default)(`block max-h-full max-w-full absolute transition-[opacity,visibility] duration-300 ease left-0 top-0 pointer-events-none`, s, h)),
            src: t.previewImage?.url ?? ``,
            ...!u && {
                width: t.sources[0].width ?? 0,
                height: t.sources[0].height ?? 0
            },
            alt: t.alt ?? ``,
            sizes: u,
            srcSetOptions: m
        }), w && (0, f.jsx)(E, {
            className: g ? c((0, k.default)(`absolute left-0 top-0`, s)) : s,
            data: {
                ...t,
                previewImage: {}
            },
            controls: !1,
            muted: !0,
            autoPlay: !D && !a,
            playsInline: !0,
            disablePictureInPicture: !0,
            disableRemotePlayback: !0,
            loop: n,
            tabIndex: r,
            onCanPlay: () => {
                if (!_.current) {
                    if (!g) {
                        let e = y.current?.querySelector(`img`);
                        e && (e.style.opacity = `0`)
                    }
                    _.current = !0
                }
            },
            onKeyUp: N
        })]
    })
}

function _e({
    media: e,
    className: t,
    loading: n = `lazy`,
    mediaClassName: r,
    imageSizes: a,
    srcSetOptions: o,
    pausePlayback: s,
    handle: l,
    mediaKey: m,
    rootMargin: h,
    isMobile: g,
    skipAspectRatio: _ = !1,
    placement: v = `xxl`,
    onLoad: y
}) {
    let b = (0, d.useRef)(null),
        x = (0, d.useRef)(!1);
    (0, d.useEffect)(() => {
        let e = b.current;
        e?.complete && e.naturalWidth > 0 && y && !x.current && (x.current = !0, y())
    }, [y]);
    let S = () => {
            y && !x.current && (x.current = !0, y())
        },
        C = i(e => e.preferReducedMotion),
        w = u(e => e.isProgrammaticScroll),
        T = s || w,
        E = e.rive?.globalRiveEnabled || `enabled`,
        D = E === `all-disabled` || E === `mobile-disabled` && g,
        O = e.rive?.useFallbackImage || D,
        A = !!e.rive && C === !0 && g === !0;
    (0, d.useEffect)(() => {}, [D, e.rive, E, g]);
    let j = () => {
            let t = e.customVideo;
            return t ? g ? !!(t.mp4MobileW720 || t.mp4MobileW1440 || t.webmMobileW720 || t.webmMobileW1440 || t.movMobileW720 || t.movMobileW1440) : !!(t.mp4DesktopW500 || t.mp4DesktopW1000 || t.mp4DesktopW1250 || t.mp4DesktopW2500 || t.webmDesktopW500 || t.webmDesktopW1000 || t.webmDesktopW1250 || t.webmDesktopW2500 || t.movDesktopW500 || t.movDesktopW1000 || t.movDesktopW1250 || t.movDesktopW2500) : !1
        },
        M = () => {
            if (!e.backgroundMedia) return null;
            let t = null;
            return e.backgroundMedia.backgroundVideo ? t = (0, f.jsx)(Q, {
                data: e.backgroundMedia.backgroundVideo,
                loading: n,
                className: `absolute left-0 top-0 size-full`,
                mediaClassName: `size-full object-cover object-center`,
                placeholderClassName: `size-full object-cover object-center`,
                overlayVideo: !0,
                pausePlayback: !0
            }) : e.backgroundMedia.backgroundImage && (t = (0, f.jsx)(p, {
                className: `absolute left-0 top-0 size-full block object-cover`,
                loading: n,
                data: e.backgroundMedia.backgroundImage,
                sizes: a,
                srcSetOptions: o
            })), t ? (0, f.jsx)(`div`, {
                className: `background-media absolute inset-0`,
                "aria-hidden": !0,
                children: t
            }) : null
        },
        N = () => {
            if (j()) {
                let t = e.rive?.description || ``;
                return (0, f.jsx)(he, {
                    data: e.customVideo,
                    placement: v,
                    className: c((0, k.default)(`absolute left-0 top-0 size-full block`, r)),
                    mediaClassName: c((0, k.default)(`size-full object-cover object-center`, r)),
                    pausePlayback: T,
                    loading: n,
                    forcePlay: e.customVideo.debugForcePlay === !0,
                    imageSizes: a,
                    imageSrcSetOptions: o,
                    title: t,
                    isMobile: g
                })
            }
            if (A && e.rive) {
                let t = e.rive.fallbackImageMobile ?? e.rive.fallbackImage,
                    i = e.rive.posterImageMobile?.image ?? e.rive.posterImage?.image,
                    s = t ?? i ?? e.image;
                if (!s) return null;
                let l = {
                    ...s,
                    altText: s.altText || e.rive.description || ``
                };
                return (0, f.jsx)(`div`, {
                    className: c((0, k.default)(`absolute left-0 top-0 h-full block`, {
                        "w-[calc(100%+var(--spacing-grid-spacing)*2)] ml-[calc(var(--spacing-grid-spacing)*-1)] sm:w-full sm:ml-0 sm:max-w-full": e.rive.fullBleedOnMobile,
                        "w-full max-w-full": !e.rive.fullBleedOnMobile
                    })),
                    children: (0, f.jsx)(p, {
                        ref: b,
                        className: c((0, k.default)(`size-full object-cover`, r)),
                        loading: n,
                        data: l,
                        ...!a && {
                            width: s.width ?? 0,
                            height: s.height ?? 0
                        },
                        sizes: a,
                        draggable: !1,
                        srcSetOptions: o,
                        onLoad: S
                    })
                })
            }
            if (e.rive && !O) {
                let t = g && e.rive.posterImageMobile ? e.rive.posterImageMobile : e.rive.posterImage;
                return (0, f.jsx)(P, {
                    ...e.rive,
                    posterImage: t,
                    rootMargin: h,
                    skipAspectRatio: _,
                    pausePlayback: T,
                    isMobile: g,
                    productHandle: l,
                    mediaKey: m
                })
            }
            if (e.video) return (0, f.jsx)(Q, {
                data: e.video,
                loading: n,
                className: c((0, k.default)(`absolute left-0 top-0 size-full block`, r)),
                mediaClassName: r,
                pausePlayback: T,
                imageSizes: a,
                imageSrcSetOptions: o
            });
            if (e.youtubePreroll) return (0, f.jsx)(Q, {
                data: e.youtubePreroll,
                loading: n,
                className: c((0, k.default)(`absolute left-0 top-0 size-full`, r)),
                mediaClassName: `size-full object-cover object-center`,
                placeholderClassName: `size-full object-cover object-center`,
                overlayVideo: !0,
                pausePlayback: T || (C ?? !1),
                imageSizes: a,
                imageSrcSetOptions: o
            });
            let t = O && e.rive && (e.rive.fallbackImage || e.rive.fallbackImageMobile);
            if (e.image || t) {
                let t = O && e.rive ? g && e.rive.fallbackImageMobile ? e.rive.fallbackImageMobile : e.rive.fallbackImage : void 0;
                return (0, f.jsx)(p, {
                    ref: b,
                    className: c((0, k.default)(`absolute left-0 top-0 size-full block object-cover`, r)),
                    loading: n,
                    data: e.image || t,
                    ...!a && {
                        width: (e.image?.width || t?.width) ?? 0,
                        height: (e.image?.height || t?.height) ?? 0
                    },
                    sizes: a,
                    draggable: !1,
                    srcSetOptions: o,
                    onLoad: S
                })
            }
        };
    return (0, f.jsxs)(`div`, {
        ...e.rive && !O && !A && {
            "data-viewable-component": !0,
            "data-component-name": `rive-container`
        },
        className: c((0, k.default)(`relative w-full max-w-full animate-show-media`, t, {
            "h-full": _
        })),
        style: _ ? void 0 : {
            aspectRatio: ge(e, g)
        },
        children: [M(), N()]
    })
}
export {
    L as a, I as c, te as i, P as l, ge as n, F as o, ne as r, ee as s, _e as t, p as u
};
//# sourceMappingURL=Media-rC-WqwU8.js.map