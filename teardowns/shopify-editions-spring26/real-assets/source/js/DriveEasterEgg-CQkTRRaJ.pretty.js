const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/ScrollerSpeedLinesEffect-DMyCV-sm.js", "assets/three.core-DVcoLpfz.js", "assets/build-BrX_XJXO.js", "assets/ScrollerSpeedLinesSettings-BRNWmK7Y.js"]))) => i.map(i => d[i]);
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
    f as r
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as i
} from "./sceneTimeScale-DgHP24AK.js";
import {
    n as a
} from "./externalPointer-CwD6cY1y.js";
import {
    n as o
} from "./postEffectRegistry-BOLQjc4E.js";
import {
    i as s,
    r as c,
    t as l
} from "./PopupChannel-CKEOmnbs.js";
import {
    r as u,
    t as d
} from "./ScrollerSpeedLinesSettings-BRNWmK7Y.js";
var f = e(t(), 1);

function p(e) {
    return Math.max(-1, Math.min(1, typeof e == `number` && Number.isFinite(e) ? e : 0))
}

function m() {
    (0, f.useEffect)(() => {
        let e = window.matchMedia?.(`(prefers-reduced-motion: reduce)`),
            t = null,
            n = () => {
                t !== null && window.clearTimeout(t), t = null, a(null)
            },
            r = s.on(l.DRIVE_STATE, r => {
                if (c(r.sessionId)) {
                    if (e?.matches) {
                        n();
                        return
                    }
                    a({
                        x: p(r.gazeX),
                        y: 0
                    }), t !== null && window.clearTimeout(t), t = window.setTimeout(() => {
                        t = null, a(null)
                    }, 500)
                }
            }),
            i = s.on(l.POPUP_CLOSED, e => {
                c(e.sessionId) && n()
            });
        return e?.addEventListener(`change`, n), () => {
            r(), i(), e?.removeEventListener(`change`, n), t !== null && window.clearTimeout(t), a(null)
        }
    }, [])
}
var h = .08;

function g() {
    (0, f.useEffect)(() => {
        let e = window.matchMedia?.(`(prefers-reduced-motion: reduce)`),
            t = d,
            i = null,
            a = {
                velocity: 0,
                direction: 1,
                gazeX: 0,
                lastMessageAt: 0
            },
            f = {
                velocity: 0,
                gazeX: 0
            },
            p = null,
            m = null,
            g = null,
            _ = 0,
            v = null,
            y = !1,
            b = null,
            x = null,
            S = async () => {
                if (!(i || y)) try {
                    let {
                        ScrollerSpeedLinesEffect: e
                    } = await n(async () => {
                        let {
                            ScrollerSpeedLinesEffect: e
                        } = await import(`./ScrollerSpeedLinesEffect-DMyCV-sm.js`);
                        return {
                            ScrollerSpeedLinesEffect: e
                        }
                    }, __vite__mapDeps([0, 1, 2, 3]));
                    y || (i = e)
                } catch {}
            }, C = window.requestIdleCallback;
        typeof C == `function` ? b = C(() => {
            b = null, S()
        }) : x = window.setTimeout(() => {
            x = null, S()
        }, 1e3);
        let w = () => {
                _ += 1, v = null, p = null, a.velocity = 0, f.velocity = 0, m?.setDriveState({
                    time: 0,
                    velocity: 0,
                    direction: 1,
                    gazeX: 0
                }), g?.(), g = null, m?.dispose(), m = null, r()
            },
            T = (e, n) => {
                if (!m) return;
                let r = !t.enabled || performance.now() - a.lastMessageAt > t.timeoutMs;
                r && (a.velocity = 0);
                let i = 1 - Math.exp(-n * Math.max(.01, t.smoothing));
                f.velocity += (a.velocity - f.velocity) * i, f.gazeX += (a.gazeX - f.gazeX) * i, f.velocity < .001 && (f.velocity = 0), m.setDriveState({
                    time: e.clock.elapsedTime * .5,
                    velocity: f.velocity,
                    direction: a.direction,
                    gazeX: f.gazeX
                }), r && f.velocity === 0 && w()
            },
            E = async () => {
                if (m || v !== null) return;
                let e = _;
                v = e;
                try {
                    if (!i) {
                        let {
                            ScrollerSpeedLinesEffect: e
                        } = await n(async () => {
                            let {
                                ScrollerSpeedLinesEffect: e
                            } = await import(`./ScrollerSpeedLinesEffect-DMyCV-sm.js`);
                            return {
                                ScrollerSpeedLinesEffect: e
                            }
                        }, __vite__mapDeps([0, 1, 2, 3]));
                        i = e
                    }
                    if (v === e && (v = null), y || e !== _ || !p || a.velocity < h) return;
                    m = new i, m.setSettings(t), g = o({
                        effect: m,
                        update: T
                    }), r()
                } catch {
                    v === e && (v = null)
                }
            }, D = s.on(l.DRIVE_STATE, n => {
                if (!c(n.sessionId)) return;
                p = n.sessionId ?? null, n.speedOverlay && (t = u(n.speedOverlay), m?.setSettings(t));
                let i = Math.max(.001, n.maxSpeed || 1),
                    o = Math.min(Math.abs(n.speed) / i, 1.5) * t.velocityMultiplier;
                if (a.direction = n.speed < -.01 ? 1 : -1, a.gazeX = Math.max(-1, Math.min(1, n.gazeX || 0)), a.lastMessageAt = performance.now(), e?.matches || !t.enabled) {
                    a.velocity = 0, m && r();
                    return
                }
                a.velocity = o, (m || a.velocity >= h) && (E(), r())
            }), O = s.on(l.POPUP_CLOSED, e => {
                e.sessionId && e.sessionId !== p && !c(e.sessionId) || w()
            });
        return () => {
            y = !0, b !== null && window.cancelIdleCallback(b), x !== null && window.clearTimeout(x), D(), O(), w()
        }
    }, [])
}
var _ = 750;

function v(e) {
    return Math.max(-8, Math.min(12, typeof e == `number` && Number.isFinite(e) ? e : 1))
}

function y() {
    (0, f.useEffect)(() => {
        let e = 1,
            t = 0,
            n = null,
            r = () => {
                n !== null && (window.clearTimeout(n), n = null)
            },
            a = (n, r = !1) => {
                let a = performance.now();
                !r && a - t < 100 || (t = a, e = n, i(n))
            },
            o = () => {
                r(), n = window.setTimeout(() => {
                    n = null, a(1, !0)
                }, _)
            },
            u = s.on(l.DRIVE_STATE, t => {
                if (!c(t.sessionId)) return;
                o();
                let n = v(t.timeScale);
                Math.abs(n - e) < .05 || a(n)
            }),
            d = s.on(l.POPUP_CLOSED, e => {
                c(e.sessionId) && (r(), a(1, !0))
            });
        return () => {
            u(), d(), r(), i(1)
        }
    }, [])
}

function b() {
    return m(), y(), g(), null
}
export {
    b as DriveEasterEgg
};
//# sourceMappingURL=DriveEasterEgg-CQkTRRaJ.js.map