import {
    t as e
} from "./react-_Rk6hbya.js";

function t(e) {
    return e === 0 || e === 1 || e === 2 || e === 3
}

function n() {
    try {
        let e = document.createElement(`canvas`).getContext(`webgl2`);
        return e ? (e.getExtension(`WEBGL_lose_context`)?.loseContext(), !0) : !1
    } catch {
        return !1
    }
}

function r(e) {
    return e.overrideTier === null ? {
        tier: e.deviceTier,
        source: e.deviceSource
    } : {
        tier: e.overrideTier,
        source: `override`
    }
}

function i() {
    if (typeof window > `u`) return {
        deviceTier: 3,
        deviceSource: `default`,
        overrideTier: null
    };
    let e = new URLSearchParams(window.location.search).get(`tier`),
        r = e === null ? NaN : Number(e),
        i = t(r) ? r : null;
    return window.__S26_FORCE_TIER_0__ ? {
        deviceTier: 0,
        deviceSource: `load-timeout`,
        overrideTier: i
    } : typeof window.matchMedia == `function` && window.matchMedia(`(pointer: coarse) and (hover: none) and (orientation: portrait) and (max-width: 767px),(pointer: coarse) and (hover: none) and (orientation: landscape) and (max-height: 767px)`).matches ? {
        deviceTier: 0,
        deviceSource: `mobile`,
        overrideTier: i
    } : n() ? {
        deviceTier: 3,
        deviceSource: `default`,
        overrideTier: i
    } : {
        deviceTier: 0,
        deviceSource: `no-webgl`,
        overrideTier: i
    }
}
var a = i(),
    o = e(e => ({
        ...a,
        ...r(a),
        setTier: (t, n) => e(e => ({
            deviceTier: t,
            deviceSource: n,
            ...r({
                ...e,
                deviceTier: t,
                deviceSource: n
            })
        })),
        downgradeTier: t => e(e => e.deviceSource === "default" || e.overrideTier !== null || e.tier === 0 ? {} : {
            tier: e.tier - 1,
            source: t
        }),
        setOverrideTier: t => e(e => ({
            overrideTier: t,
            ...r({
                ...e,
                overrideTier: t
            })
        }))
    }));

function s() {
    return o(e => e.overrideTier ?? (e.deviceSource === "default" ? null : e.deviceTier))
}
export {
    o as n, s as t
};
//# sourceMappingURL=useTierStore-edsQsT8s.js.map