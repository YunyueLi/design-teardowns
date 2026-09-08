var e = null,
    t = [];

function n(n) {
    e = n, t.forEach(e => e(n))
}

function r() {
    return e
}

function i(n) {
    if (e) return n(e), () => {};
    let r = e => {
        e && n(e)
    };
    return t.push(r), () => {
        let e = t.indexOf(r);
        e > -1 && t.splice(e, 1)
    }
}
export {
    i as n, n as r, r as t
};
//# sourceMappingURL=lenisManager-BuYlhEBR.js.map