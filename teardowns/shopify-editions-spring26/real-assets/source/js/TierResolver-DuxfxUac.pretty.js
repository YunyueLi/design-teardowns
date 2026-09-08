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
    A as r
} from "./chunk-62JRHF6Z--_Rw5Cj0.js";
import {
    t as i
} from "./jsx-runtime-DKdBMi_L.js";
import {
    p as a
} from "./chunk-5MM2A4YW-DFO2Eo6J.js";
import {
    t as o
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    n as s
} from "./useTierStore-edsQsT8s.js";
import {
    t as c
} from "./componentTelemetry-BHGR3cLK.js";
var l = e(t(), 1),
    u = i();

function d({
    state: e,
    trackers: t,
    pageViewToken: n,
    fpsTrackerEnabled: r,
    deviceTier: i,
    deviceSource: a,
    gpuDetection: o,
    forceTierFlag: s,
    viewport: l
}) {
    if (!r || a === "default" || !t?.dux) return e;
    let u = {
            resolvedTier: i,
            tierSource: a,
            ...o
        },
        d = {
            ...e
        };
    return a === `load-timeout` && !e.loadTimeoutSent && (c({
        trackers: t,
        pageViewToken: n,
        enabled: !0,
        targetName: `page_loading_overlay_load_timeout_tier0`,
        parentName: `page_loading_overlay`,
        width: l.width,
        height: l.height,
        duration: 0,
        metadata: {
            source: `load-timeout`,
            forcedTier: 0,
            forceTierFlag: s,
            ...u
        }
    }), d.loadTimeoutSent = !0), e.webglBackgroundSent || (c({
        trackers: t,
        pageViewToken: n,
        enabled: !0,
        targetName: `webgl_background`,
        parentName: `background_loader`,
        width: l.width,
        height: l.height,
        duration: 0,
        metadata: u
    }), d.webglBackgroundSent = !0), d
}

function f() {
    let e = (0, l.useRef)({}),
        t = s(e => e.tier);
    return (0, l.useEffect)(() => (document.documentElement.dataset.renderTier = String(t), () => {
        delete document.documentElement.dataset.renderTier
    }), [t]), (0, l.useEffect)(() => {
        let e = () => {
            s.getState().deviceSource !== `load-timeout` && s.getState().setTier(0, `load-timeout`)
        };
        return window.__S26_FORCE_TIER_0__ && e(), window.addEventListener(`s26:force-tier-0`, e), () => window.removeEventListener(`s26:force-tier-0`, e)
    }, []), (0, l.useEffect)(() => {
        if (s.getState().deviceSource !== "default") return;
        let t = !1,
            r, i, a = (e, t) => {
                s.getState().deviceSource === "default" && s.getState().setTier(e, t)
            },
            c = () => {
                let e = o.getState().isCoarsePointer === !0,
                    t = s.getState().deviceTier;
                a(e && t > 1 ? 1 : t, `error`)
            },
            l = async () => {
                try {
                    let {
                        getGPUTier: r
                    } = await n(async () => {
                        let {
                            getGPUTier: e
                        } = await import(`./dist-D4e1Ritz.js`);
                        return {
                            getGPUTier: e
                        }
                    }, []), i = await r();
                    if (t) return;
                    if (e.current = {
                            gpuTier: i.tier ?? 0,
                            isMobile: i.isMobile ?? !1,
                            gpuType: i.type ?? `UNKNOWN`,
                            gpuFps: i.fps ?? 0,
                            gpu: i.gpu ?? `UNKNOWN`,
                            device: i.device ?? `UNKNOWN`
                        }, i.type === `BLOCKLISTED` || i.type === `WEBGL_UNSUPPORTED`) {
                        a(0, `gpu`);
                        return
                    }
                    if (i.type === `BENCHMARK_FETCH_FAILED`) {
                        c();
                        return
                    }
                    let o = s.getState().deviceTier,
                        l = Math.min(Math.max(i.tier ?? o, 0), 3);
                    i.isMobile && l > 1 && (l = 1), a(l, `gpu`)
                } catch {
                    if (t) return;
                    e.current = {
                        gpuTier: 0,
                        isMobile: !1,
                        gpuType: `DETECTION_FAILED`,
                        gpuFps: 0,
                        gpu: `UNKNOWN`,
                        device: `UNKNOWN`
                    }, c()
                }
            };
        return typeof window.requestIdleCallback == `function` ? r = window.requestIdleCallback(l, {
            timeout: 2e3
        }) : i = setTimeout(l, 200), () => {
            t = !0, r !== void 0 && window.cancelIdleCallback?.(r), i !== void 0 && clearTimeout(i)
        }
    }, []), (0, u.jsx)(p, {
        gpuDetectionRef: e
    })
}

function p({
    gpuDetectionRef: e
}) {
    let t = s(e => e.deviceTier),
        n = s(e => e.deviceSource),
        i = a(e => e.trackers),
        o = a(e => e.pageViewToken),
        c = r()?.fpsTrackerEnabled,
        u = (0, l.useRef)(!1),
        f = (0, l.useRef)(!1);
    return (0, l.useEffect)(() => {
        let r = d({
            state: {
                webglBackgroundSent: u.current,
                loadTimeoutSent: f.current
            },
            trackers: i,
            pageViewToken: o,
            fpsTrackerEnabled: !!c,
            deviceTier: t,
            deviceSource: n,
            gpuDetection: e.current,
            forceTierFlag: !!window.__S26_FORCE_TIER_0__,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        u.current = r.webglBackgroundSent, f.current = r.loadTimeoutSent
    }, [t, n, i, o, c, e]), null
}
export {
    f as t
};
//# sourceMappingURL=TierResolver-DuxfxUac.js.map