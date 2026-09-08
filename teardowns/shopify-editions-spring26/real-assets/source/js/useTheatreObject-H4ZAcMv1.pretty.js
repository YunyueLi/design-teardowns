import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    $a as n,
    Hr as r,
    jt as i
} from "./three.core-DVcoLpfz.js";
import {
    g as a
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as o
} from "./dist-4Ign8GoJ.js";
import {
    t as s
} from "./subscribeWithInitial-Ckw6yogw.js";
var c = e(t(), 1),
    l = o(),
    u = {
        transition: 0,
        direction: Object.freeze(new n(1, 0, 0)),
        feather: 1,
        mode: `directional`
    },
    d = {
        fadeMode: l.types.stringLiteral(`directional`, {
            directional: `Directional`,
            screen: `Screen`
        }),
        fadeDirection: {
            x: l.types.number(1, {
                nudgeMultiplier: .1
            }),
            y: l.types.number(0, {
                nudgeMultiplier: .1
            }),
            z: l.types.number(0, {
                nudgeMultiplier: .1
            })
        },
        fadeFeather: l.types.number(1, {
            nudgeMultiplier: .1,
            range: [.001, 20]
        })
    },
    f = new WeakMap;

function p(e, t) {
    let n = f.get(e);
    return n || (n = new Set, f.set(e, n)), n.add(t), () => {
        n.delete(t), n.size === 0 && f.delete(e)
    }
}

function m(e) {
    let t = f.get(e);
    if (t)
        for (let e of t) e()
}
var h = new WeakMap;

function g(e) {
    let t = h.get(e);
    return t || (t = {
        transition: 0,
        direction: new n(1, 0, 0),
        feather: 1,
        mode: `directional`
    }, h.set(e, t)), t
}

function _(e, t, n, r, i = `directional`) {
    let a = g(e);
    return a.transition = t, a.direction.set(n.x, n.y, n.z), a.feather = r, a.mode = i, a
}

function v(e, t, n, r) {
    e.userData.theatreTransition = n.transition, e.userData.theatreFadeDirection = n.direction, e.userData.theatreFadeFeather = n.feather, e.userData.theatreFadeMode = n.mode;
    let i = t === 0 || Math.abs(n.transition) >= 1;
    e.userData.theatreOpacity = t, e.visible = !i, m(e), r?.(t, n)
}

function y(e, t, n, r, i, a) {
    let {
        x: o,
        y: c,
        z: u
    } = n.position, {
        x: f,
        y: p,
        z: m
    } = n.rotation, g = {
        position: {
            x: l.types.number(o, {
                nudgeMultiplier: .01
            }),
            y: l.types.number(c, {
                nudgeMultiplier: .01
            }),
            z: l.types.number(u, {
                nudgeMultiplier: .01
            })
        },
        rotation: {
            x: l.types.number(f, {
                nudgeMultiplier: .01
            }),
            y: l.types.number(p, {
                nudgeMultiplier: .01
            }),
            z: l.types.number(m, {
                nudgeMultiplier: .01
            })
        },
        scale: {
            x: l.types.number(n.scale.x, {
                nudgeMultiplier: .01,
                range: [.001, 10]
            }),
            y: l.types.number(n.scale.y, {
                nudgeMultiplier: .01,
                range: [.001, 10]
            }),
            z: l.types.number(n.scale.z, {
                nudgeMultiplier: .01,
                range: [.001, 10]
            })
        },
        opacity: l.types.number(1, {
            nudgeMultiplier: .01,
            range: [0, 1]
        }),
        renderOrder: l.types.number(0, {
            nudgeMultiplier: 1,
            range: [-1e3, 1e3]
        }),
        transition: {
            progress: l.types.number(0, {
                nudgeMultiplier: .01,
                range: [-1, 1]
            }),
            ...d
        }
    }, y = s(e.object(t, i ? {
        ...g,
        ...i
    } : g, {
        reconfigure: !0
    }), e => {
        n.position.set(e.position.x, e.position.y, e.position.z), n.rotation.set(e.rotation.x, e.rotation.y, e.rotation.z), n.scale.set(e.scale.x, e.scale.y, e.scale.z), n.userData.theatreRenderOrder = e.renderOrder;
        let t = e.transition,
            i = _(n, t.progress, t.fadeDirection, t.fadeFeather, t.fadeMode);
        v(n, e.opacity, i, r), a?.(e)
    });
    return () => {
        y(), e.detachObject(t), h.delete(n), n.visible = !0, delete n.userData.theatreOpacity, delete n.userData.theatreTransition, delete n.userData.theatreFadeDirection, delete n.userData.theatreFadeFeather, delete n.userData.theatreFadeMode, delete n.userData.theatreRenderOrder
    }
}
var b = new i;

function x(e, t, i, o, u) {
    let [f, p] = (0, c.useState)(null), m = (0, c.useRef)(new n), h = (0, c.useRef)(new r), g = (0, c.useRef)(new n(1, 1, 1)), _ = (0, c.useRef)(!1);
    return (0, c.useLayoutEffect)(() => {
        if (!e || !i) return;
        let r = t.current;
        _.current = !1;
        let a = {
                position: {
                    x: l.types.number(r?.position.x ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    y: l.types.number(r?.position.y ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    z: l.types.number(r?.position.z ?? 0, {
                        nudgeMultiplier: .01
                    })
                },
                rotation: {
                    x: l.types.number(r?.rotation.x ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    y: l.types.number(r?.rotation.y ?? 0, {
                        nudgeMultiplier: .01
                    }),
                    z: l.types.number(r?.rotation.z ?? 0, {
                        nudgeMultiplier: .01
                    })
                },
                scale: {
                    x: l.types.number(r?.scale.x ?? 1, {
                        nudgeMultiplier: .01
                    }),
                    y: l.types.number(r?.scale.y ?? 1, {
                        nudgeMultiplier: .01
                    }),
                    z: l.types.number(r?.scale.z ?? 1, {
                        nudgeMultiplier: .01
                    })
                },
                opacity: l.types.number(1, {
                    nudgeMultiplier: .01,
                    range: [0, 1]
                }),
                ...u?.includeRenderOrder !== !1 && {
                    renderOrder: l.types.number(0, {
                        nudgeMultiplier: 1,
                        range: [-1e3, 1e3]
                    })
                },
                transition: {
                    progress: l.types.number(0, {
                        nudgeMultiplier: .01,
                        range: [-1, 1]
                    }),
                    ...d
                },
                ...o
            },
            c = e.object(i, a, {
                reconfigure: !0
            });
        p(c);
        let f = u?.includeRenderOrder !== !1,
            y = {
                transition: 0,
                direction: new n,
                feather: 1,
                mode: `directional`
            },
            x = s(c, e => {
                let n = t.current;
                if (!n) return;
                let r = e;
                m.current.set(r.position.x, r.position.y, r.position.z), b.set(r.rotation.x, r.rotation.y, r.rotation.z), h.current.setFromEuler(b), g.current.set(r.scale.x, r.scale.y, r.scale.z), _.current ||= (n.position.copy(m.current), n.quaternion.copy(h.current), n.scale.copy(g.current), !0), f && (n.userData.theatreRenderOrder = r.renderOrder), y.transition = r.transition.progress, y.direction.set(r.transition.fadeDirection.x, r.transition.fadeDirection.y, r.transition.fadeDirection.z), y.feather = r.transition.fadeFeather, y.mode = r.transition.fadeMode, v(n, r.opacity, y)
            });
        return () => {
            x(), p(null), e.detachObject(i), r && (r.visible = !0, delete r.userData.theatreOpacity, delete r.userData.theatreTransition, delete r.userData.theatreFadeDirection, delete r.userData.theatreFadeFeather, delete r.userData.theatreFadeMode, f && delete r.userData.theatreRenderOrder)
        }
    }, [e, i, o, u?.includeRenderOrder]), a(() => {
        let e = t.current;
        !e || !_.current || (e.position.copy(m.current), e.quaternion.copy(h.current), e.scale.copy(g.current))
    }, -1), f
}
export {
    y as i, u as n, p as r, x as t
};
//# sourceMappingURL=useTheatreObject-H4ZAcMv1.js.map