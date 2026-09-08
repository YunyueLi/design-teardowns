var e = `State Machine 1`,
    t = .55,
    n = .61,
    r = .4,
    i = -.58,
    a = 2.802,
    o = .652,
    s = -Math.PI,
    c = Math.PI,
    l = {
        emissiveIntensity: 1,
        metalness: t,
        roughness: n,
        envMapIntensity: r
    },
    u = .58,
    d = .1,
    f = .15,
    p = .05,
    m = [`addProduct`, `addDiscount`, `addCustomer`, `splitPayment`],
    h = {
        addProduct: `goToAddProduct`,
        addDiscount: `goToAddDiscount`,
        addCustomer: `goToAddCustomer`,
        splitPayment: `goToSplitPayment`
    };

function g(e, t) {
    for (let n of e.data) {
        let e = m.indexOf(n);
        e >= 0 && t(e)
    }
}
export {
    g as _, i as a, t as c, u as d, d as f, h as g, m as h, s as i, n as l, p as m, r as n, a as o, f as p, c as r, o as s, e as t, l as u
};
//# sourceMappingURL=POSConstants-DDVeyt7I.js.map