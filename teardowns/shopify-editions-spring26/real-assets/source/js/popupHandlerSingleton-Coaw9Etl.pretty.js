import {
    t as e
} from "./lenisManager-BuYlhEBR.js";
import {
    n as t
} from "./useSectionStore-Sy0UOQiX.js";
import {
    a as n,
    i as r,
    n as i,
    r as a,
    t as o
} from "./PopupChannel-CKEOmnbs.js";
import {
    n as s,
    t as c
} from "./popupWindow-BQxEzWgS.js";
var l = `spring-webrtc-signaling`,
    u = new class {
        channel = null;
        listeners = new Map;
        pendingData = new Map;
        storageListenerAdded = !1;
        handleMessage(e) {
            if (!e?.roomId || !e?.type) return;
            let t = `${e.roomId}-${e.type}`,
                n = this.listeners.get(t);
            if (n?.size) {
                n.forEach(t => t(e.data));
                return
            }
            this.pendingData.has(t) || this.pendingData.set(t, []), this.pendingData.get(t).push(e.data)
        }
        ensureStorageListener() {
            this.storageListenerAdded || typeof window > `u` || (this.storageListenerAdded = !0, window.addEventListener(`storage`, e => {
                if (!(e.key !== `spring-webrtc-signaling-msg` || !e.newValue)) try {
                    let t = JSON.parse(e.newValue);
                    this.handleMessage(t)
                } catch {}
            }))
        }
        getChannel() {
            return this.ensureStorageListener(), typeof BroadcastChannel > `u` ? null : (this.channel || (this.channel = new BroadcastChannel(l), this.channel.onmessage = e => {
                this.handleMessage(e.data)
            }), this.channel)
        }
        send(e, t, n) {
            let r = {
                    type: t,
                    roomId: e,
                    data: n
                },
                i = this.getChannel();
            if (i) {
                i.postMessage(r);
                return
            }
            try {
                localStorage.setItem(`spring-webrtc-signaling-msg`, JSON.stringify({
                    ...r,
                    t: Date.now()
                }))
            } catch {}
        }
        on(e, t, n) {
            this.getChannel();
            let r = `${e}-${t}`;
            return this.listeners.has(r) || this.listeners.set(r, new Set), this.listeners.get(r).add(n), () => this.listeners.get(r)?.delete(n)
        }
        getPending(e, t) {
            return this.pendingData.get(`${e}-${t}`) || []
        }
        clear(e) {
            for (let t of [`offer`, `answer`, `ice-tx`, `ice-rx`]) this.pendingData.delete(`${e}-${t}`)
        }
    };

function d() {
    return new DOMException(`WebRTC sender startup aborted`, `AbortError`)
}

function f(e, t, n) {
    return new Promise((r, i) => {
        if (n?.aborted) {
            i(d());
            return
        }
        let a = null,
            o = () => {
                a?.(), a = null, n?.removeEventListener(`abort`, s)
            },
            s = () => {
                o(), i(d())
            },
            c = t => {
                o(), e.setRemoteDescription(new RTCSessionDescription(t)).then(r).catch(i)
            };
        n?.addEventListener(`abort`, s, {
            once: !0
        });
        let l = u.getPending(t, `answer`);
        if (l.length > 0) {
            c(l[0]);
            return
        }
        a = u.on(t, `answer`, c)
    })
}
async function p(e, t = `default`, n = {}) {
    let {
        signal: r
    } = n;
    if (r?.aborted) throw d();
    let i = e.captureStream ? e.captureStream(60) : null;
    if (!i) throw Error(`captureStream not supported`);
    let a = location.hostname === `localhost` || location.hostname === `127.0.0.1`,
        o = new RTCPeerConnection({
            iceServers: a ? [] : [{
                urls: `stun:stun.l.google.com:19302`
            }],
            bundlePolicy: `max-bundle`,
            rtcpMuxPolicy: `require`
        });
    for (let e of i.getTracks()) {
        let t = o.addTrack(e, i);
        if (t.setParameters && e.kind === `video`) try {
            let e = t.getParameters();
            e.encodings?.[0] && (e.encodings[0].maxBitrate = 5e6, e.encodings[0].maxFramerate = 60, await t.setParameters(e))
        } catch {}
    }
    let s = i.getVideoTracks()[0],
        c = s?.requestFrame ? window.setInterval(() => s.requestFrame?.(), 16) : null,
        l = null,
        p = null,
        m = o.close.bind(o);
    o.close = () => {
        c !== null && window.clearInterval(c), l !== null && window.clearInterval(l), p?.(), p = null;
        for (let e of i.getTracks()) e.stop();
        m()
    };
    let h = () => o.close();
    r?.addEventListener(`abort`, h, {
        once: !0
    }), u.clear(t), o.onicecandidate = e => {
        e.candidate && u.send(t, `ice-tx`, e.candidate.toJSON())
    };
    let g = await o.createOffer({
        offerToReceiveVideo: !1
    });
    await o.setLocalDescription(g), u.send(t, `offer`, g), l = window.setInterval(() => {
        o.signalingState === `have-local-offer` && u.send(t, `offer`, g)
    }, 500), await f(o, t, r), l !== null && (window.clearInterval(l), l = null), p = u.on(t, `ice-rx`, e => {
        o.addIceCandidate(new RTCIceCandidate(e)).catch(() => {})
    });
    for (let e of u.getPending(t, `ice-rx`)) o.addIceCandidate(new RTCIceCandidate(e)).catch(() => {});
    return r?.removeEventListener(`abort`, h), o
}
var m = !1,
    h = null,
    g = null,
    _ = null,
    v = null,
    y = null,
    b = null,
    x = null,
    S = 820,
    C = 0,
    w = null,
    T = null;

function E() {
    b !== null && (cancelAnimationFrame(b), b = null), x !== null && (cancelAnimationFrame(x), x = null)
}

function D() {
    C = 0, T = null, w !== null && (cancelAnimationFrame(w), w = null)
}

function O() {
    y !== null && (window.clearTimeout(y), y = null), v?.abort(), v = null, h?.close(), h = null, g = null, i(_), _ = null, E(), D()
}

function k() {
    let e = _;
    e && r.emitLocal(o.POPUP_CLOSED, {
        time: Date.now(),
        sessionId: e
    })
}

function A(t) {
    if (Math.abs(C) <= .5) {
        C = 0, T = null, w = null;
        return
    }
    let n = T ?? t - 1e3 / 60;
    T = t;
    let r = 1 - .85 ** Math.min(4, Math.max(0, (t - n) / (1e3 / 60))),
        i = C * r;
    C -= i;
    let a = e();
    a ? a.scrollTo(window.scrollY + i, {
        immediate: !0
    }) : window.scrollBy(0, i), w = requestAnimationFrame(A)
}

function j(e) {
    C += e, w === null && (T = null, w = requestAnimationFrame(A))
}

function M() {
    let e = Array.from(document.querySelectorAll(`canvas`)),
        t = e.find(e => e.getAttribute(`data-engine`)?.startsWith(`three.js`));
    return t ||= (e.sort((e, t) => t.width * t.height - e.width * e.height), e[0]), t
}

function N(t) {
    let n = e();
    if (t === `hero`) {
        n ? n.scrollTo(0, {
            duration: 1.2
        }) : window.scrollTo({
            top: 0,
            behavior: `smooth`
        });
        return
    }
    let r = document.querySelector(`[data-section-key="${t}"], #${t}`);
    r && (n ? n.scrollTo(r, {
        duration: 1.2
    }) : r.scrollIntoView({
        behavior: `smooth`
    }))
}

function P(e, t) {
    let n = t?.sessionId?.trim();
    if (n) return n;
    try {
        return new URL(e.location.href).searchParams.get(`drive-session`) || `default`
    } catch {
        return `default`
    }
}

function F(e, i = P(e)) {
    E(), g = e, _ = i, n(i);
    let a = M();
    if (!a || a.width === 0 || a.height === 0) return;
    let c = () => {
        if (e.closed) {
            k();
            return
        }
        let t = a.getBoundingClientRect();
        t.width > 0 && t.height > 0 && r.send(o.CANVAS_RECT, {
            x: t.x,
            y: t.y,
            w: t.width,
            h: t.height,
            winW: window.innerWidth,
            winH: window.innerHeight
        }), b = requestAnimationFrame(c)
    };
    b = requestAnimationFrame(c);
    let l = () => {
        if (e.closed) {
            k();
            return
        }
        r.send(o.MAIN_WINDOW, {
            x: window.screenX ?? window.screenLeft ?? 0,
            y: window.screenY ?? window.screenTop ?? 0,
            w: window.innerWidth,
            h: window.innerHeight,
            scroll: window.scrollY ?? 0
        });
        let n = t.getState(),
            i = n.totalSections || n.sectionHandles.length || 1,
            a = n.activeSection ?? 0,
            c = a + 1 < n.sectionHandles.length ? a + 1 : null,
            u = n.sectionProgress[a] ?? 0,
            d = n.sectionHandles[a] ?? `hero`,
            f = s(d, ``);
        r.send(o.ACTIVE_SECTION, {
            index: a,
            handle: d,
            drivePortalTarget: f || void 0,
            progress: u,
            transitionProgress: n.crossfadeProgress ?? 0,
            nextIndex: c,
            nextHandle: c === null ? null : n.sectionHandles[c],
            theatreTime: u,
            totalProgress: (a + u) / i,
            sectionHandles: n.sectionHandles
        }), x = requestAnimationFrame(l)
    };
    x = requestAnimationFrame(l), v?.abort();
    let u = new AbortController;
    v = u, y = window.setTimeout(() => {
        y = null, p(a, i, {
            signal: u.signal
        }).then(t => {
            if (u.signal.aborted || e.closed) {
                t.close();
                return
            }
            v = null, h = t
        }).catch(() => {
            v === u && (v = null)
        })
    }, S)
}

function I() {
    return typeof crypto < `u` && `randomUUID` in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function L(e) {
    return e.sessionId ? e : {
        ...e,
        sessionId: I()
    }
}

function R(e = {}) {
    O();
    let t = M();
    if (!t || t.width === 0 || t.height === 0) return;
    let n = L(e),
        r = c(n);
    r && F(r, n.sessionId || `default`)
}

function z() {
    if (m || new URLSearchParams(window.location.search).get(`popup`) === `1`) return;
    m = !0, window.addEventListener(`beforeunload`, () => {
        try {
            let e = g || window.__easterEggPopupWindow;
            e && !e.closed && e.close()
        } catch {}
        O(), r.close()
    }), r.on(o.POPUP_CLOSED, ({
        sessionId: e
    }) => {
        !e || e !== _ || O()
    }), r.on(o.NAVIGATE_TO_SECTION, ({
        handle: e
    }) => {
        N(e)
    }), r.on(o.WHEEL_EVENT, e => {
        a(e.sessionId) && (Date.now() - e.time > 1e3 || j(e.deltaY))
    }), window.addEventListener(`open-popup`, e => {
        let t = e.detail || {},
            n = window.__easterEggPopupWindow;
        if (n && !n.closed) {
            let e = {
                ...window.__easterEggPopupOptions || null,
                ...t
            };
            window.__easterEggPopupWindow = null, window.__easterEggPopupOptions = null, O(), F(n, P(n, e));
            return
        }
        R(t)
    });
    let e = window.__easterEggPopupWindow;
    if (e && !e.closed) {
        let t = window.__easterEggPopupOptions || null;
        window.__easterEggPopupWindow = null, window.__easterEggPopupOptions = null, F(e, P(e, t))
    }
}

function B() {
    return m
}
export {
    z as initPopupHandler, B as isPopupHandlerInitialized
};
//# sourceMappingURL=popupHandlerSingleton-Coaw9Etl.js.map