var e = [`reds`, `yellows`, `greens`, `cyans`, `blues`, `magentas`, `whites`, `neutrals`, `blacks`],
    t = e.length;

function n() {
    return {
        h: 0,
        s: 0,
        l: 0
    }
}

function r() {
    let t = {
        enabled: !1,
        amount: 0
    };
    for (let r of e) t[r] = n();
    return t
}

function i(e) {
    return !e?.enabled || !a(e) ? 0 : Math.min(1, Math.max(0, e.amount))
}

function a(t) {
    return t ? e.some(e => {
        let n = t[e];
        return n.h !== 0 || n.s !== 0 || n.l !== 0
    }) : !1
}

function o(t, n) {
    for (let r = 0; r < e.length; r++) {
        let i = n?.[e[r]];
        t[r]?.set((i?.h ?? 0) / 360, i?.s ?? 0, i?.l ?? 0)
    }
}
var s = {
        bloomEnabled: !0,
        chromaticEnabled: !1,
        chromaticAmount: .0025,
        chromaticAngle: 1,
        afterimageEnabled: !0,
        afterimageStrength: .999,
        afterimageDamp: .999,
        afterimageScrollFadeLerp: 4,
        afterimageThreshold: .2,
        vignetteEnabled: !0,
        vignetteAmount: .5,
        vignetteRadius: .895,
        vignetteSoftness: .441,
        noiseEnabled: !1,
        noiseAmount: .06,
        noiseScale: 1
    },
    c = [.1, 60],
    l = {
        chromatic: {
            enabled: s.chromaticEnabled,
            amount: s.chromaticAmount,
            angle: s.chromaticAngle
        },
        vignette: {
            enabled: s.vignetteEnabled,
            amount: s.vignetteAmount,
            radius: s.vignetteRadius,
            softness: s.vignetteSoftness
        },
        afterimage: {
            enabled: s.afterimageEnabled,
            strength: s.afterimageStrength,
            damp: s.afterimageDamp,
            threshold: s.afterimageThreshold
        },
        noise: {
            enabled: s.noiseEnabled,
            amount: s.noiseAmount,
            scale: s.noiseScale
        },
        toneMapping: `neutral`,
        toneMappingExposure: 1
    },
    u = .25,
    d = .75,
    f = {
        darken: .75,
        speed: .2,
        saturation: .75,
        pointerInfluence: 0,
        reduceQuality: !0,
        offset: 0
    };

function p(e, t = 0) {
    return e + t
}

function m(e) {
    let t = (e - u) / (d - u),
        n = t < 0 ? 0 : t > 1 ? 1 : t;
    return n * n * (3 - 2 * n)
}
var h = .75,
    g = .75,
    _ = 1.25;

function v(e) {
    let t = (e - g) / (_ - g),
        n = t < 0 ? 0 : t > 1 ? 1 : t;
    return n * n * (3 - 2 * n)
}
var y = .2;

function b(e) {
    return 1 - v(e) * (1 - y)
}

function x(e, t = 1) {
    return Math.min(t, 1 - e * (1 - h))
}

function S(e, t = 1, n = !0) {
    return x(n ? v(e) : 0, t)
}

function C(e, t = !0) {
    return t ? b(e) : 1
}
var w = `hero`,
    T = `https://cdn.shopify.com/b/shopify-brochure2-assets/`,
    E = {
        id: `cloud-hill`,
        title: `Hill (bundled fallback)`,
        camera: {
            position: [0, 0, 4],
            target: [0, 0, 0]
        },
        environment: {
            url: ``,
            background: !1,
            blur: 0,
            darken: .85
        },
        pointcloud: {
            sources: [{
                src: `${T}b652c3a72faef93fa9f9485131c34229.bin`,
                resolution: 256
            }, {
                src: `${T}b0fddd720edc6ba212377f8243b9f2eb.bin`,
                resolution: 512
            }, {
                src: `${T}c1e2c6bc5c913607a5b915075ed7a23e.bin`,
                resolution: 1024
            }],
            flow: {
                enabled: !1,
                type: `rise`,
                layout: `off`,
                strength: .1943037974683542,
                speed: .3101265822784802,
                scale: 2,
                gridEnabled: !1,
                gridSize: .045,
                gridStrength: 1,
                gridMix: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                gridRotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                conveyorEnabled: !1,
                conveyorSpeed: .3101265822784802,
                conveyorDepth: 4,
                conveyorRotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                conveyorDistance: {
                    near: 1.2,
                    far: 4.5
                },
                randomnessExponent: 300,
                distanceNear: 1.2,
                distanceFar: 4.5
            },
            fluid: {
                enabled: !0,
                influence: .7911392405063289,
                curl: 6.556962025316462,
                velocityDissipation: .96,
                densityDissipation: .92,
                pressure: .8,
                splatRadius: .5,
                splatForce: .08,
                simSize: 128,
                dyeSize: 256
            },
            colorCorrections: r(),
            pointSize: .0174113924050633,
            distanceSizeInfluence: .25,
            distanceSizeNear: 4,
            distanceSizeFar: 18,
            distanceSizeMax: 1.5
        },
        postprocessing: {
            bloom: {
                enabled: !0,
                intensity: 1.3101265822784818,
                opacity: .33544303797468356,
                threshold: .23417721518987344,
                softness: .5,
                radius: .4620253164556961,
                tint: [1, .8627450980392157, .6],
                rgbShift: .0016835443037974684,
                rgbAngle: 1.7488607594936703
            },
            chromatic: {
                ...l.chromatic
            },
            vignette: {
                ...l.vignette
            },
            afterimage: {
                ...l.afterimage
            },
            noise: {
                ...l.noise
            },
            toneMapping: l.toneMapping,
            toneMappingExposure: l.toneMappingExposure
        },
        behindContent: {
            ...f
        }
    };
export {
    p as a, c, e as d, t as f, o as g, r as h, m as i, s as l, n as m, w as n, C as o, i as p, f as r, S as s, E as t, l as u
};
//# sourceMappingURL=sectionModels-CqSyktdl.js.map