var e = {
        background: .25,
        main: 1,
        foreground: .25
    },
    t = .1,
    n = {
        curl: 1.5,
        velocityDissipation: .965,
        densityDissipation: .9,
        pressure: .6,
        splatRadius: .25,
        splatForce: .125,
        simSize: 128,
        dyeSize: 256
    },
    r = {
        enabled: !1,
        opacity: .35,
        pointSizeScale: .75,
        jitter: .01
    };

function i(e, t) {
    return e.bgColor3 ?? (e.bgGradientPoints === void 0 ? e.bgColor2 : t) ?? t
}
var a = [`none`, `linear`, `reinhard`, `cineon`, `aces`, `agx`, `neutral`],
    o = -.5,
    s = [0, 0],
    c = [1, 0],
    l = [0, 1e3],
    u = 1e6,
    d = 25e4,
    f = [.5, 0, 0];

function p(e, t = !1) {
    return {
        ...e,
        pointcloud: {
            ...e.pointcloud,
            fluid: {
                ...n,
                enabled: !t && e.pointcloud.fluid.enabled,
                influence: e.pointcloud.fluid.influence
            }
        }
    }
}

function m(e, t) {
    let n = Math.min(e.pointcloud.maxPoints ?? 1 / 0, t);
    return n === e.pointcloud.maxPoints ? e : {
        ...e,
        pointcloud: {
            ...e.pointcloud,
            maxPoints: n
        }
    }
}

function h(e, t) {
    let n = e.pointcloud.sources;
    if (n.length === 0) return null;
    let r = n.find(e => e.resolution === t);
    if (r) return {
        asset: r.src,
        textureSize: r.resolution
    };
    let i = [...n].sort((e, t) => e.resolution - t.resolution),
        a = i.find(e => e.resolution >= t) ?? i[i.length - 1];
    return {
        asset: a.src,
        textureSize: a.resolution
    }
}
export {
    l as a, n as c, r as d, a as f, i as g, h, c as i, d as l, m, t as n, s as o, p, f as r, o as s, e as t, u
};
//# sourceMappingURL=presets-BdwQB_Rb.js.map