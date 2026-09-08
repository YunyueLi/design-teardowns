var e = new Map;

function t(t, n) {
    let r = t.trim(),
        i = n.trim();
    !r || !i || e.set(r, i)
}

function n(t, n) {
    return e.get(t) ?? n
}
var r = .424,
    i = 4 / 3,
    a = 24,
    o = `spring_car_popup`;

function s(e, t, n) {
    return n < t ? t : Math.min(Math.max(e, t), n)
}

function c() {
    let e = Math.max(0, (window.outerWidth - window.innerWidth) / 2),
        t = Math.max(0, window.outerHeight - window.innerHeight);
    return {
        x: window.screenX + e,
        y: window.screenY + t
    }
}

function l() {
    let e = Math.min(window.innerWidth, window.innerHeight) * r;
    return {
        width: Math.round(e * i),
        height: Math.round(e)
    }
}

function u(e, t) {
    let n = c(),
        r = n.x + window.innerWidth - t.width - a,
        i = n.y + window.innerHeight - t.height - a;
    if (typeof e.clientX != `number` || typeof e.clientY != `number`) return {
        left: Math.round(r),
        top: Math.round(i)
    };
    let o = n.x + a,
        l = n.x + window.innerWidth - t.width - a,
        u = n.y + a,
        d = n.y + window.innerHeight - t.height - a;
    return {
        left: Math.round(s(n.x + e.clientX - t.width / 2, o, l)),
        top: Math.round(s(n.y + e.clientY - t.height / 2, u, d))
    }
}

function d(e) {
    let t = window.location.pathname.match(/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?editions\/spring2026/)?.[0] ?? `/editions/spring2026`,
        n = new URL(`${t}/drive`, window.location.origin);
    e.openWithTheatre && n.searchParams.set(`popup-studio`, `1`);
    let r = e.theatreSheetSrc?.trim();
    r && n.searchParams.set(`theatre-src`, r);
    let i = e.targetSceneHandle?.trim();
    i && n.searchParams.set(`drive-scene`, i);
    let a = e.sourceSectionHandle?.trim();
    a && n.searchParams.set(`drive-section`, a);
    let o = e.sessionId?.trim();
    return o && n.searchParams.set(`drive-session`, o), n.toString()
}

function f(e = {}) {
    let t = l(),
        n = u(e, t),
        r = `popup,width=${t.width},height=${t.height},left=${n.left},top=${n.top}`;
    return window.open(d(e), o, r)
}
export {
    n,
    t as r,
    f as t
};
//# sourceMappingURL=popupWindow-BQxEzWgS.js.map