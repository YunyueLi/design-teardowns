import {
    t as e
} from "./react-_Rk6hbya.js";
import {
    t
} from "./middleware-D_nWYfbo.js";
import {
    t as n
} from "./useSectionRegistry-BcvkvUON.js";

function r(e, t, n) {
    let r = 0,
        i = null,
        a = 0;
    for (let t = e.length - 1; t >= 0; t--) {
        let {
            transition: n
        } = e[t];
        if (n > -1) {
            n < 0 ? (i = t, a = 1 + n, r = Math.max(0, t - 1)) : r = t;
            break
        }
    }
    let o = t.length !== e.length,
        s = n.length !== e.length,
        c = Array(e.length),
        l = Array(e.length);
    for (let r = 0; r < e.length; r++) c[r] = e[r].progress, l[r] = e[r].transition, !o && t[r] !== c[r] && (o = !0), !s && n[r] !== l[r] && (s = !0);
    let u = i !== null && a >= .5 ? i : r;
    return {
        activeSection: r,
        nextSection: i,
        crossfadeProgress: a,
        totalSections: e.length,
        interactiveSection: u,
        sectionHandles: e.map(e => e.handle),
        ...o ? {
            sectionProgress: c
        } : {},
        ...s ? {
            sectionTransitions: l
        } : {}
    }
}
var i = e()(t(e => ({
    activeSection: 0,
    nextSection: null,
    crossfadeProgress: 0,
    totalSections: 0,
    sectionProgress: [],
    sectionTransitions: [],
    sectionHandles: [],
    interactiveSection: 0,
    isInitialized: !1,
    setSections: t => {
        e(e => r(t, e.sectionProgress, e.sectionTransitions))
    },
    setInitialized: t => {
        e({
            isInitialized: t
        })
    }
})));

function a() {
    return n.subscribe(e => e.sections, e => {
        let t = Array.from(e.entries());
        t.sort(([e], [t]) => e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1), i.getState().setSections(t.map(([e, t]) => ({
            handle: e.dataset.sectionKey ?? e.id ?? ``,
            progress: t.progress,
            transition: t.transition
        })))
    }, {
        fireImmediately: !0
    })
}
export {
    i as n, a as t
};
//# sourceMappingURL=useSectionStore-Sy0UOQiX.js.map