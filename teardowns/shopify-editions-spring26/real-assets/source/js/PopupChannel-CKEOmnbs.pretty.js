var e = {
        CANVAS_RECT: `canvas-rect`,
        MAIN_WINDOW: `main-window`,
        ACTIVE_SECTION: `active-section`,
        POPUP_POSITION: `popup-position`,
        POPUP_CENTER: `popup-center`,
        POPUP_CLOSED: `popup-closed`,
        WHEEL_EVENT: `wheel-event`,
        NAVIGATE_TO_SECTION: `navigate-to-section`,
        WEBRTC_READY: `webrtc-ready`,
        DRIVE_STATE: `drive-state`,
        DRIVE_SCENE_REVEAL: `drive-scene-reveal`,
        KEY_ANIMATED_OUT: `key-animated-out`
    },
    t = new Set([e.MAIN_WINDOW, e.CANVAS_RECT, e.ACTIVE_SECTION, e.POPUP_POSITION, e.POPUP_CENTER, e.WHEEL_EVENT]),
    n = new Set([e.MAIN_WINDOW, e.CANVAS_RECT, e.ACTIVE_SECTION, e.POPUP_POSITION, e.POPUP_CENTER]),
    r = null,
    i = null;

function a(e) {
    i !== null && (clearTimeout(i), i = null), r = e?.trim() || null
}

function o(e) {
    let t = r;
    !t || e && e !== t || (i !== null && clearTimeout(i), i = setTimeout(() => {
        r === t && (r = null), i = null
    }, 0))
}

function s(e) {
    return !!(e && r === e)
}
var c = new class {
    channel = null;
    listeners = new Map;
    lastData = new Map;
    storageListenerAdded = !1;
    getChannel() {
        return this.ensureStorageListener(), typeof BroadcastChannel > `u` ? null : (this.channel || (this.channel = new BroadcastChannel(`spring-popup-sync`), this.channel.onmessage = e => {
            let {
                type: t,
                data: n
            } = e.data;
            this.handleMessage(t, n)
        }), this.channel)
    }
    ensureStorageListener() {
        this.storageListenerAdded || typeof window > `u` || (this.storageListenerAdded = !0, window.addEventListener(`storage`, e => {
            if (!(e.key !== `spring-popup-channel-msg` || !e.newValue)) try {
                let {
                    type: t,
                    data: n
                } = JSON.parse(e.newValue);
                this.handleMessage(t, n)
            } catch {}
        }))
    }
    handleMessage(e, t) {
        n.has(e) && this.lastData.set(e, t), this.listeners.get(e)?.forEach(e => {
            try {
                e(t)
            } catch {}
        })
    }
    send(e, n) {
        let r = this.getChannel();
        if (r?.postMessage({
                type: e,
                data: n
            }), !(r || t.has(e) || typeof window > `u`)) try {
            localStorage.setItem(`spring-popup-channel-msg`, JSON.stringify({
                type: e,
                data: n,
                t: Date.now()
            }))
        } catch {}
    }
    emitLocal(e, t) {
        this.handleMessage(e, t)
    }
    on(e, t) {
        this.getChannel(), this.listeners.has(e) || this.listeners.set(e, new Set), this.listeners.get(e).add(t);
        let r = this.lastData.get(e);
        if (r && n.has(e)) try {
            t(r)
        } catch {}
        return () => this.listeners.get(e)?.delete(t)
    }
    get(e) {
        return this.lastData.get(e) || null
    }
    close() {
        this.channel?.close(), this.channel = null, this.listeners.clear(), this.lastData.clear()
    }
};
export {
    a,
    c as i,
    o as n,
    s as r,
    e as t
};
//# sourceMappingURL=PopupChannel-CKEOmnbs.js.map