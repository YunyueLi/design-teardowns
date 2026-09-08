import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    t as n
} from "./jsx-runtime-DKdBMi_L.js";
import {
    p as r
} from "./chunk-5MM2A4YW-DFO2Eo6J.js";
import {
    t as i
} from "./useBrowserSpecsStore-KSBuyu5W.js";
import {
    t as a
} from "./reportError-D4E52G70.js";
import {
    n as o,
    t as s
} from "./useTierStore-edsQsT8s.js";
import {
    t as c
} from "./useAssetLoadingStore-BjdwlLYn.js";
import {
    a as l,
    d as u,
    f as d,
    g as f,
    i as p,
    o as m,
    p as h,
    s as g
} from "./sectionModels-CqSyktdl.js";
import {
    d as _,
    u as v
} from "./presets-BdwQB_Rb.js";
import {
    t as y
} from "./SceneDataContext-BXyXjH22.js";
import {
    t as b
} from "./useStickyMountGate-DmTxtK8v.js";
import {
    $a as x,
    $n as S,
    A as C,
    Dt as w,
    E as ee,
    Ft as T,
    G as te,
    Hn as E,
    Hr as ne,
    Nr as re,
    Qi as ie,
    Sr as ae,
    U as oe,
    Wn as D,
    Yi as O,
    Zi as se,
    dn as k,
    eo as A,
    fn as ce,
    j,
    jt as M,
    nr as N,
    so as le
} from "./three.core-DVcoLpfz.js";
import {
    b as P,
    g as ue,
    l as F
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    a as de,
    i as fe,
    n as pe,
    r as me
} from "./FluidField-CPsolzcx.js";
import {
    t as he
} from "./componentTelemetry-BHGR3cLK.js";
import {
    t as ge
} from "./sharedZeroTexture-C5JcVREk.js";
import {
    a as _e,
    c as I,
    f as ve,
    h as ye,
    i as be,
    l as xe,
    m as L,
    n as Se,
    p as Ce,
    r as R,
    t as we,
    u as z
} from "./AssetSdf-BrECqyB9.js";
var B = e(t(), 1);

function Te() {
    let e = globalThis.navigator?.connection;
    return {
        visibilityState: globalThis.document?.visibilityState,
        ...e ? {
            networkEffectiveType: e.effectiveType,
            networkSaveData: e.saveData,
            networkDownlink: e.downlink
        } : {}
    }
}

function Ee(e) {
    let t = performance.now() - e;
    return Math.max(0, Math.round(t))
}

function V(e, t) {
    return Object.assign(e, {
        assetTelemetry: t
    }), e
}

function H(e) {
    let t = e?.assetTelemetry;
    return t && typeof t == `object` ? t : {}
}
var De = 1024,
    U = .25;

function W(e) {
    return !e || !Number.isFinite(e) ? 1 : 1 + (Math.max(1, De / e) - 1) * U
}
var Oe = {
        source512: W(512),
        source256: W(256)
    },
    ke = .01;

function Ae(e) {
    return 1 - (1 - S.clamp(e, 0, 1)) ** 3
}

function je(e, t, n) {
    if (n.reducedMotion) return 1;
    let r = S.clamp(e, 0, 1);
    return n.offscreen || r >= 1 ? r : Math.min(1, r + Math.min(Math.max(t, 0), 1 / 30) / Math.max(n.durationSeconds, 1e-6))
}
var Me = {
        256: 256,
        512: 512,
        1024: 1024,
        full: 1024,
        center: 512
    },
    Ne = {
        3: `512`,
        2: `512`,
        1: `256`,
        0: `256`
    };

function Pe(e, t) {
    if (e.length === 0) throw Error(`resolveCloudAsset: sources must not be empty`);
    let n = Ne[t],
        r = Me[n],
        i = Fe(e, r);
    return {
        asset: i.src,
        textureSize: i.resolution,
        preferredResolution: n
    }
}

function Fe(e, t) {
    let n, r, i;
    for (let a of e) a.resolution === t ? n = a : a.resolution > t && (!r || a.resolution < r.resolution) && (r = a), (!i || a.resolution > i.resolution) && (i = a);
    return n ?? r ?? i
}
var Ie = new WeakMap,
    Le = class extends D {
        constructor(e) {
            super(e), this.decoderPath = ``, this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = ``, this.defaultAttributeIDs = {
                position: `POSITION`,
                normal: `NORMAL`,
                color: `COLOR`,
                uv: `TEX_COORD`
            }, this.defaultAttributeTypes = {
                position: `Float32Array`,
                normal: `Float32Array`,
                color: `Float32Array`,
                uv: `Float32Array`
            }
        }
        setDecoderPath(e) {
            return this.decoderPath = e, this
        }
        setDecoderConfig(e) {
            return this.decoderConfig = e, this
        }
        setWorkerLimit(e) {
            return this.workerLimit = e, this
        }
        load(e, t, n, r) {
            let i = new T(this.manager);
            i.setPath(this.path), i.setResponseType(`arraybuffer`), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, e => {
                this.parse(e, t, r)
            }, n, r)
        }
        parse(e, t, n = () => {}) {
            this.decodeDracoFile(e, t, null, null, O, n).catch(n)
        }
        decodeDracoFile(e, t, n, r, i = E, a = () => {}) {
            let o = {
                attributeIDs: n || this.defaultAttributeIDs,
                attributeTypes: r || this.defaultAttributeTypes,
                useUniqueIDs: !!n,
                vertexColorSpace: i
            };
            return this.decodeGeometry(e, o).then(t).catch(a)
        }
        decodeGeometry(e, t) {
            let n = JSON.stringify(t);
            if (Ie.has(e)) {
                let t = Ie.get(e);
                if (t.key === n) return t.promise;
                if (e.byteLength === 0) throw Error(`THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.`)
            }
            let r, i = this.workerNextTaskID++,
                a = e.byteLength,
                o = this._getWorker(i, a).then(n => (r = n, new Promise((n, a) => {
                    r._callbacks[i] = {
                        resolve: n,
                        reject: a
                    }, r.postMessage({
                        type: `decode`,
                        id: i,
                        taskConfig: t,
                        buffer: e
                    }, [e])
                }))).then(e => this._createGeometry(e.geometry));
            return o.catch(() => !0).then(() => {
                r && i && this._releaseTask(r, i)
            }), Ie.set(e, {
                key: n,
                promise: o
            }), o
        }
        _createGeometry(e) {
            let t = new j;
            e.index && t.setIndex(new C(e.index.array, 1));
            for (let n = 0; n < e.attributes.length; n++) {
                let {
                    name: r,
                    array: i,
                    itemSize: a,
                    stride: o,
                    vertexColorSpace: s
                } = e.attributes[n], c;
                c = a === o ? new C(i, a) : new ce(new k(i, o), a, 0), r === `color` && (this._assignVertexColorSpace(c, s), c.normalized = !(i instanceof Float32Array)), t.setAttribute(r, c)
            }
            return t
        }
        _assignVertexColorSpace(e, t) {
            if (t !== `srgb`) return;
            let n = new oe;
            for (let t = 0, r = e.count; t < r; t++) n.fromBufferAttribute(e, t), te.colorSpaceToWorking(n, O), e.setXYZ(t, n.r, n.g, n.b)
        }
        _loadLibrary(e, t) {
            let n = new T(this.manager);
            return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((t, r) => {
                n.load(e, t, void 0, r)
            })
        }
        preload() {
            return this._initDecoder(), this
        }
        _initDecoder() {
            if (this.decoderPending) return this.decoderPending;
            let e = typeof WebAssembly != `object` || this.decoderConfig.type === `js`,
                t = [];
            return e ? t.push(this._loadLibrary(`draco_decoder.js`, `text`)) : (t.push(this._loadLibrary(`draco_wasm_wrapper.js`, `text`)), t.push(this._loadLibrary(`draco_decoder.wasm`, `arraybuffer`))), this.decoderPending = Promise.all(t).then(t => {
                let n = t[0];
                e || (this.decoderConfig.wasmBinary = t[1]);
                let r = Re.toString(),
                    i = [`/* draco decoder */`, n, ``, `/* worker */`, r.substring(r.indexOf(`{`) + 1, r.lastIndexOf(`}`))].join(`
`);
                this.workerSourceURL = URL.createObjectURL(new Blob([i]))
            }), this.decoderPending
        }
        _getWorker(e, t) {
            return this._initDecoder().then(() => {
                if (this.workerPool.length < this.workerLimit) {
                    let e = new Worker(this.workerSourceURL);
                    e._callbacks = {}, e._taskCosts = {}, e._taskLoad = 0, e.postMessage({
                        type: `init`,
                        decoderConfig: this.decoderConfig
                    }), e.onmessage = function(t) {
                        let n = t.data;
                        switch (n.type) {
                            case `decode`:
                                e._callbacks[n.id].resolve(n);
                                break;
                            case `error`:
                                e._callbacks[n.id].reject(n);
                                break;
                            default:
                                console.error(`THREE.DRACOLoader: Unexpected message, "` + n.type + `"`)
                        }
                    }, this.workerPool.push(e)
                } else this.workerPool.sort(function(e, t) {
                    return e._taskLoad > t._taskLoad ? -1 : 1
                });
                let n = this.workerPool[this.workerPool.length - 1];
                return n._taskCosts[e] = t, n._taskLoad += t, n
            })
        }
        _releaseTask(e, t) {
            e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t]
        }
        debug() {
            console.log(`Task load: `, this.workerPool.map(e => e._taskLoad))
        }
        dispose() {
            for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
            return this.workerPool.length = 0, this.workerSourceURL !== `` && URL.revokeObjectURL(this.workerSourceURL), this
        }
    };

function Re() {
    let e, t;
    onmessage = function(r) {
        let i = r.data;
        switch (i.type) {
            case `init`:
                e = i.decoderConfig, t = new Promise(function(t) {
                    e.onModuleLoaded = function(e) {
                        t({
                            draco: e
                        })
                    }, DracoDecoderModule(e)
                });
                break;
            case `decode`:
                let r = i.buffer,
                    a = i.taskConfig;
                t.then(e => {
                    let t = e.draco,
                        o = new t.Decoder;
                    try {
                        let e = n(t, o, new Int8Array(r), a),
                            s = e.attributes.map(e => e.array.buffer);
                        e.index && s.push(e.index.array.buffer), self.postMessage({
                            type: `decode`,
                            id: i.id,
                            geometry: e
                        }, s)
                    } catch (e) {
                        console.error(e), self.postMessage({
                            type: `error`,
                            id: i.id,
                            error: e.message
                        })
                    } finally {
                        t.destroy(o)
                    }
                });
                break
        }
    };

    function n(e, t, n, a) {
        let o = a.attributeIDs,
            s = a.attributeTypes,
            c, l, u = t.GetEncodedGeometryType(n);
        if (u === e.TRIANGULAR_MESH) c = new e.Mesh, l = t.DecodeArrayToMesh(n, n.byteLength, c);
        else if (u === e.POINT_CLOUD) c = new e.PointCloud, l = t.DecodeArrayToPointCloud(n, n.byteLength, c);
        else throw Error(`THREE.DRACOLoader: Unexpected geometry type.`);
        if (!l.ok() || c.ptr === 0) throw Error(`THREE.DRACOLoader: Decoding failed: ` + l.error_msg());
        let d = {
            index: null,
            attributes: []
        };
        for (let n in o) {
            let r = self[s[n]],
                l, u;
            if (a.useUniqueIDs) u = o[n], l = t.GetAttributeByUniqueId(c, u);
            else {
                if (u = t.GetAttributeId(c, e[o[n]]), u === -1) continue;
                l = t.GetAttribute(c, u)
            }
            let f = i(e, t, c, n, r, l);
            n === `color` && (f.vertexColorSpace = a.vertexColorSpace), d.attributes.push(f)
        }
        return u === e.TRIANGULAR_MESH && (d.index = r(e, t, c)), e.destroy(c), d
    }

    function r(e, t, n) {
        let r = n.num_faces() * 3,
            i = r * 4,
            a = e._malloc(i);
        t.GetTrianglesUInt32Array(n, i, a);
        let o = new Uint32Array(e.HEAPF32.buffer, a, r).slice();
        return e._free(a), {
            array: o,
            itemSize: 1
        }
    }

    function i(e, t, n, r, i, o) {
        let s = n.num_points(),
            c = o.num_components(),
            l = a(e, i),
            u = c * i.BYTES_PER_ELEMENT,
            d = Math.ceil(u / 4) * 4,
            f = d / i.BYTES_PER_ELEMENT,
            p = s * u,
            m = s * d,
            h = e._malloc(p);
        t.GetAttributeDataArrayForAllPoints(n, o, l, p, h);
        let g = new i(e.HEAPF32.buffer, h, p / i.BYTES_PER_ELEMENT),
            _;
        if (u === d) _ = g.slice();
        else {
            _ = new i(m / i.BYTES_PER_ELEMENT);
            let e = 0;
            for (let t = 0, n = g.length; t < n; t++) {
                for (let n = 0; n < c; n++) _[e + n] = g[t * c + n];
                e += f
            }
        }
        return e._free(h), {
            name: r,
            count: s,
            itemSize: c,
            array: _,
            stride: f
        }
    }

    function a(e, t) {
        switch (t) {
            case Float32Array:
                return e.DT_FLOAT32;
            case Int8Array:
                return e.DT_INT8;
            case Int16Array:
                return e.DT_INT16;
            case Int32Array:
                return e.DT_INT32;
            case Uint8Array:
                return e.DT_UINT8;
            case Uint16Array:
                return e.DT_UINT16;
            case Uint32Array:
                return e.DT_UINT32
        }
    }
}
var ze = 8e3,
    Be = [250, 1e3];

function Ve(e) {
    return e.reason ?? new DOMException(`The operation was aborted.`, `AbortError`)
}

function He(e) {
    if (e?.aborted) throw Ve(e)
}

function Ue(e, t) {
    return new Promise((n, r) => {
        let i = () => {
                clearTimeout(a), r(Ve(t))
            },
            a = setTimeout(() => {
                t?.removeEventListener(`abort`, i), n()
            }, e);
        t?.addEventListener(`abort`, i, {
            once: !0
        })
    })
}
async function We(e, t = {}) {
    let {
        signal: n,
        retryDelaysMs: r = Be
    } = t;
    for (let t = 0;; t++) {
        He(n);
        try {
            return await e()
        } catch (e) {
            if (n?.aborted || t >= r.length) throw e;
            await Ue(r[t], n)
        }
    }
}

function Ge(e, t = {}) {
    let {
        timeoutMs: n = ze,
        retryDelaysMs: r
    } = t;
    return We(async () => {
        let t = new AbortController,
            r = setTimeout(() => t.abort(new DOMException(`fetch timeout`, `TimeoutError`)), n);
        try {
            return await fetch(e, {
                signal: t.signal
            })
        } finally {
            clearTimeout(r)
        }
    }, {
        retryDelaysMs: r
    })
}
var Ke = "let e=null;const t=self;t.onmessage=async e=>{let{id:i}=e.data;try{let a=`buffer`in e.data?await r(e.data.buffer):n(e.data);t.postMessage({id:i,result:a},[a.positions.buffer,a.colors.buffer])}catch(e){t.postMessage({id:i,error:e instanceof Error?e.message:String(e)})}};function n(e){return{positions:a(e.posBytes,e.meta),colors:o(e.y,e.cb,e.cr,e.meta),count:e.meta.N,bounds:{min:[e.meta.bbox[0],e.meta.bbox[1],e.meta.bbox[2]],max:[e.meta.bbox[3],e.meta.bbox[4],e.meta.bbox[5]]}}}async function r(e){let t=new Uint8Array(e),r=new DataView(t.buffer,t.byteOffset,4).getUint32(0,!0),a=JSON.parse(new TextDecoder().decode(t.slice(4,4+r)));if(!a.format?.startsWith(`mdpc-`))throw Error(`Unsupported MDPC format: ${a.format}`);let o=4+r,s=t.slice(o,o+a.posLen);o+=a.posLen;let c=t.slice(o,o+a.yLen);o+=a.yLen;let l=t.slice(o,o+a.cbLen);o+=a.cbLen;let u=t.slice(o,o+a.crLen),[d,f,p,m]=await Promise.all([i(s,a.codec),i(c,a.codec),i(l,a.codec),i(u,a.codec)]);return n({id:0,meta:a,posBytes:d,y:f,cb:p,cr:m})}async function i(t,n){let r=n===`deflate`?`deflate`:`br`,i=globalThis.DecompressionStream;if(i)try{let e=new Uint8Array(t.byteLength);e.set(t);let n=new Blob([e.buffer]).stream().pipeThrough(new i(r));return new Uint8Array(await new Response(n).arrayBuffer())}catch(e){if(r===`deflate`)throw e}else if(r===`deflate`)throw Error(`DecompressionStream is unavailable for deflate streams`);e??=import(`https://cdn.jsdelivr.net/npm/brotli-wasm@3.0.1/index.web.js`).then(async e=>{let t=await(e.default??e);if(typeof t?.decompress!=`function`)throw Error(`brotli-wasm did not expose decompress()`);return t});let a=(await e).decompress(t);return a instanceof Uint8Array?a:new Uint8Array(a)}function a(e,t){let[n,r,i,a,o,s]=t.bbox,c=(1<<t.qpPos)-1,l=(a-n)/c,u=(o-r)/c,d=(s-i)/c,f=new Float32Array(t.N*3),p=0n,m=0;for(let a=0;a<t.N;a+=1){let o=0n,s=0n;for(;;){let t=e[m++]??0;if(o|=BigInt(t&127)<<s,!(t&128))break;s+=7n}p+=o;let c=0,h=0,g=0;for(let e=0;e<t.qpPos;e+=1)p>>BigInt(e*3)&1n&&(c|=1<<e),p>>BigInt(e*3+1)&1n&&(h|=1<<e),p>>BigInt(e*3+2)&1n&&(g|=1<<e);f[a*3]=n+c*l,f[a*3+1]=r+h*u,f[a*3+2]=i+g*d}return f}function o(e,t,n,r){let i=new Float32Array(r.N*3);for(let a=0;a<r.N;a+=1){let o=e[a]??0,c=(t[Math.min(t.length-1,Math.floor(a/r.chromaSub))]??128)-128,l=(n[Math.min(n.length-1,Math.floor(a/r.chromaSub))]??128)-128;i[a*3]=s((o+1.402*l)/255),i[a*3+1]=s((o-.344136*c-.714136*l)/255),i[a*3+2]=s((o+1.772*c)/255)}return i}function s(e){return e<0?0:e>1?1:e}",
    qe = typeof self < `u` && self.Blob && new Blob([`URL.revokeObjectURL(import.meta.url);`, Ke], {
        type: `text/javascript;charset=utf-8`
    });

function Je(e) {
    let t;
    try {
        if (t = qe && (self.URL || self.webkitURL).createObjectURL(qe), !t) throw ``;
        let n = new Worker(t, {
            type: `module`,
            name: e?.name
        });
        return n.addEventListener(`error`, () => {
            (self.URL || self.webkitURL).revokeObjectURL(t)
        }), n
    } catch {
        return new Worker(`data:text/javascript;charset=utf-8,` + encodeURIComponent(Ke), {
            type: `module`,
            name: e?.name
        })
    }
}
var Ye = `Unsupported MDPC deflate stream: DecompressionStream('deflate') is unavailable in this browser`,
    G = null,
    Xe = 1,
    K = new Map,
    Ze = 1e4,
    q = null;
async function Qe(e, t = {}) {
    let n = await Ge(e);
    if (!n.ok) throw V(Error(`Failed to fetch ${e}: ${n.status}`), {
        assetUrl: e,
        phase: `mdpc-fetch`
    });
    let r;
    try {
        r = await n.arrayBuffer()
    } catch (t) {
        throw V(t instanceof Error ? t : Error(String(t)), {
            assetUrl: e,
            phase: `mdpc-read`
        })
    }
    let i = r.byteLength,
        {
            meta: a,
            metaLen: o
        } = tt(r, e);
    nt(a, e);
    let s = await rt(r, a, o),
        c = s ? await pt(s, e) : await ft(r, e);
    return {
        ...t.orientAsConverted ?? e.includes(`/converted/`) ? $e(c) : c,
        byteSize: i,
        hasColors: !0
    }
}

function $e(e) {
    let t = new Float32Array(e.positions);
    for (let n = 0; n < e.count; n++) {
        let e = n * 3;
        t[e + 1] = -t[e + 1], t[e + 2] = -t[e + 2]
    }
    return {
        ...e,
        positions: t,
        bounds: {
            min: [e.bounds.min[0], -e.bounds.max[1], -e.bounds.max[2]],
            max: [e.bounds.max[0], -e.bounds.min[1], -e.bounds.min[2]]
        }
    }
}

function et() {
    return globalThis.DecompressionStream
}

function tt(e, t) {
    try {
        let t = new Uint8Array(e),
            n = new DataView(t.buffer, t.byteOffset, 4).getUint32(0, !0),
            r = JSON.parse(new TextDecoder().decode(t.slice(4, 4 + n)));
        if (!r.format?.startsWith(`mdpc-`)) throw Error(`Unsupported MDPC format: ${r.format}`);
        return {
            meta: r,
            metaLen: n
        }
    } catch (e) {
        throw V(e instanceof Error ? e : Error(String(e)), {
            assetUrl: t,
            phase: `mdpc-parse`
        })
    }
}

function nt(e, t) {
    if (e.codec !== `deflate`) return;
    let n = et();
    if (!q || q.Ctor !== n) try {
        if (!n) throw Error(`missing constructor`);
        new n(`deflate`), q = {
            Ctor: n,
            supported: !0
        }
    } catch {
        q = {
            Ctor: n,
            supported: !1
        }
    }
    if (!q.supported) throw V(Error(Ye), {
        assetUrl: t,
        phase: `mdpc-unsupported-decompression-stream`,
        decodeKind: `mdpc-native-preflight`,
        mdpcFormat: e.format,
        mdpcCodec: e.codec,
        decompressionFormat: `deflate`
    })
}
async function rt(e, t, n) {
    let r = et();
    if (!r) return null;
    try {
        let i = new Uint8Array(e),
            a = t.codec === `deflate` ? `deflate` : `br`,
            o = 4 + n,
            s = i.slice(o, o + t.posLen);
        o += t.posLen;
        let c = i.slice(o, o + t.yLen);
        o += t.yLen;
        let l = i.slice(o, o + t.cbLen);
        o += t.cbLen;
        let u = i.slice(o, o + t.crLen),
            [d, f, p, m] = await Promise.all([it(s, r, a), it(c, r, a), it(l, r, a), it(u, r, a)]);
        return {
            meta: t,
            posBytes: d,
            y: f,
            cb: p,
            cr: m
        }
    } catch {
        return null
    }
}
async function it(e, t, n) {
    let r = new Uint8Array(e.byteLength);
    r.set(e);
    let i = new Blob([r.buffer]).stream().pipeThrough(new t(n));
    return new Uint8Array(await new Response(i).arrayBuffer())
}

function at(e, t) {
    return {
        assetUrl: e.url,
        phase: t,
        decodeKind: e.decodeKind,
        mdpcElapsedMs: Ee(e.startedAt)
    }
}

function ot(e, t) {
    return e === `DecompressionStream is unavailable for deflate streams` ? V(Error(Ye), {
        ...at(t, `mdpc-unsupported-decompression-stream`),
        mdpcCodec: `deflate`,
        decompressionFormat: `deflate`
    }) : V(Error(e), {
        ...at(t, `mdpc-decode`)
    })
}

function st(e) {
    for (let t of K.values()) t.reject(e(t));
    K.clear()
}

function ct() {
    G?.terminate(), G = null
}

function lt(e, t) {
    return e * (t + 1)
}

function ut(e, t) {
    return setTimeout(() => {
        K.has(e) && (ct(), st(e => V(Error(`MDPC worker decode timeout after ${t}ms`), {
            ...at(e, `mdpc-decode-timeout`),
            mdpcTimeoutMs: t
        })))
    }, t)
}

function dt(e, t, n, r, i, a) {
    K.set(e, {
        resolve: e => {
            clearTimeout(t), n(e)
        },
        reject: e => {
            clearTimeout(t), r(e)
        },
        url: i,
        decodeKind: a,
        startedAt: performance.now()
    })
}

function ft(e, t) {
    let n = Xe++,
        r = mt();
    return new Promise((i, a) => {
        let o = lt(Ze, K.size),
            s = ut(n, o);
        dt(n, s, i, a, t, `mdpc-worker`), r.postMessage({
            id: n,
            buffer: e
        }, [e])
    })
}

function pt(e, t) {
    let n = Xe++,
        r = mt();
    return new Promise((i, a) => {
        let o = lt(Ze, K.size),
            s = ut(n, o);
        dt(n, s, i, a, t, `mdpc-native-streams-worker`), r.postMessage({
            id: n,
            ...e
        }, [e.posBytes.buffer, e.y.buffer, e.cb.buffer, e.cr.buffer])
    })
}

function mt() {
    if (G) return G;
    let e = new Je;
    return e.onmessage = e => {
        let t = K.get(e.data.id);
        if (t) {
            if (K.delete(e.data.id), e.data.error) {
                t.reject(ot(e.data.error, t));
                return
            }
            t.resolve(e.data.result)
        }
    }, e.onerror = e => {
        let t = e.filename ? `${e.filename}:${e.lineno??`?`}:${e.colno??`?`}` : `unknown location`,
            n = e.message || `MDPC worker failed at ${t}`;
        st(e => V(Error(n), {
            ...at(e, `mdpc-worker-error`),
            workerLocation: t
        })), ct()
    }, G = e, e
}
var ht = 10,
    gt = [`Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`],
    J = null,
    Y = new Map,
    _t = new Map;
async function vt(e, t = {}) {
    if (Y.has(e)) {
        let n = _t.get(e);
        return t.orientAsConverted !== void 0 && n !== void 0 && t.orientAsConverted !== n && `${e}${n}${t.orientAsConverted}`, Y.get(e)
    }
    _t.set(e, t.orientAsConverted);
    let n = /^(https?|blob):/.test(e),
        r = (async () => {
            if (n) return bt(e, t.orientAsConverted);
            try {
                return await Qe(`/pointclouds/${e}.mdpc`, {
                    orientAsConverted: t.orientAsConverted
                })
            } catch {
                `${e}`
            }
            let r = `/pointclouds/${e}.bin`;
            if (await xt(r)) return Ct(r);
            throw Error(`Pointcloud not found: ${e} (no .mdpc or .bin)`)
        })();
    return Y.set(e, r), r.catch(() => {
        Y.get(e) === r && (Y.delete(e), _t.delete(e))
    }), r
}
var yt = /\.(mdpc|bin)(?=[?#]|$)/;
async function bt(e, t) {
    let n = yt.test(e) ? [e.replace(yt, `.bin`), e.replace(yt, `.mdpc`)] : [e],
        r;
    for (let e = 0; e < n.length; e++) try {
        return await Qe(n[e], {
            orientAsConverted: t
        })
    } catch (t) {
        r = t, e < n.length - 1 && `${n[e]}${n[e+1]}`
    }
    throw r instanceof Error ? r : Error(`Failed to load pointcloud: ${e}`)
}
async function xt(e) {
    try {
        let t = await fetch(e, {
            method: `HEAD`,
            signal: AbortSignal.timeout(ze)
        });
        return t.ok ? !(t.headers.get(`content-type`) ?? ``).startsWith(`text/html`) : !1
    } catch {
        return !1
    }
}

function St() {
    return J || (J = new Le, J.setDecoderPath(`/draco/`), J.setDecoderConfig({
        type: `wasm`
    }), J.preload()), J
}
async function Ct(e) {
    let t = await Ge(e);
    if (!t.ok) throw Error(`Failed to fetch ${e}: ${t.status}`);
    let n = await t.arrayBuffer(),
        r = new TextDecoder,
        i = parseInt(r.decode(n.slice(0, ht)), 10);
    if (!Number.isFinite(i) || i <= 0) throw Error(`Invalid point cloud header: ${e}`);
    let a = JSON.parse(r.decode(n.slice(ht, ht + i))),
        o = {},
        s = {};
    if (Array.isArray(a.attributes))
        for (let e = 0; e < a.attributes.length; e++) {
            let [t, n] = a.attributes[e];
            o[t] = e, s[t] = gt[n] ?? `Float32Array`
        } else if (a.format === `draco-pointcloud` && a.attributes) o.position = 0, o.color = 1, s.position = `Float32Array`, s.color = `Float32Array`;
        else throw Error(`Unsupported point cloud metadata: ${e}`);
    return {
        ...wt(await St().decodeGeometry(n.slice(ht + i), {
            attributeIDs: o,
            attributeTypes: s,
            useUniqueIDs: !0
        }), Tt(a.bounds)),
        byteSize: n.byteLength
    }
}

function wt(e, t) {
    let n = e.getAttribute(`position`) ?? e.getAttribute(`positions`);
    if (!n) throw Error(`Point cloud has no position attribute`);
    let r = n.array instanceof Float32Array ? n.array : new Float32Array(n.array),
        i = r.length / 3,
        a = e.getAttribute(`color`) ?? e.getAttribute(`colors`),
        o = new Float32Array(i * 3),
        s = !1;
    if (a) {
        let e = a.array,
            t = a.array instanceof Uint8Array ? 1 / 255 : a.array instanceof Uint16Array ? 1 / 65535 : 1;
        o = new Float32Array(e.length);
        for (let n = 0; n < e.length; n++) o[n] = (e[n] ?? 0) * t;
        s = kt(o)
    }
    return s || o.fill(1), e.dispose(), {
        positions: r,
        colors: o,
        count: i,
        hasColors: s,
        bounds: t
    }
}

function Tt(e) {
    if (!e || typeof e != `object`) return;
    let t = e;
    if (!(!Et(t.min) || !Et(t.max))) return {
        min: t.min,
        max: t.max
    }
}

function Et(e) {
    return Array.isArray(e) && e.length === 3 && e.every(e => typeof e == `number` && Number.isFinite(e))
}

function Dt(e, t) {
    let n = Math.random();
    if (!e.cdf || t <= 0 || Math.random() > t) return Math.floor(n * e.count);
    let r = 0,
        i = e.cdf.length - 1;
    for (; r < i;) {
        let t = r + i >> 1;
        e.cdf[t] < n ? r = t + 1 : i = t
    }
    return r
}

function Ot(e, t) {
    let n = new Float32Array(e.positions),
        r = e.bounds ? new x(...e.bounds.min) : new x(1 / 0, 1 / 0, 1 / 0),
        i = e.bounds ? new x(...e.bounds.max) : new x(-1 / 0, -1 / 0, -1 / 0);
    if (!e.bounds)
        for (let t = 0; t < e.count; t++) {
            let e = n[t * 3],
                a = n[t * 3 + 1],
                o = n[t * 3 + 2];
            e < r.x && (r.x = e), e > i.x && (i.x = e), a < r.y && (r.y = a), a > i.y && (i.y = a), o < r.z && (r.z = o), o > i.z && (i.z = o)
        }
    let a = new x().subVectors(i, r),
        o = new x().addVectors(r, i).multiplyScalar(.5),
        s = t * 2 / (Math.max(a.x, a.y, a.z) || 1);
    for (let t = 0; t < e.count; t++) n[t * 3] = (n[t * 3] - o.x) * s, n[t * 3 + 1] = (n[t * 3 + 1] - o.y) * s, n[t * 3 + 2] = (n[t * 3 + 2] - o.z) * s;
    return n
}

function kt(e) {
    let t = -1 / 0,
        n = 1 / 0;
    for (let r = 0; r < e.length; r++) {
        let i = e[r];
        if (!Number.isFinite(i)) return !1;
        i < n && (n = i), i > t && (t = i)
    }
    return n >= 0 && t <= 1.5
}
var At = {
        off: 0,
        dots: 1,
        xLines: 2,
        yLines: 3,
        zLines: 4,
        floorGrid: 5,
        sphere: 6,
        ripple: 7,
        spokes: 8,
        spiral: 10
    },
    jt = new Set([`xLines`, `yLines`, `zLines`, `floorGrid`]),
    Mt = 2.5,
    Nt = Math.PI * 2;

function Pt(e) {
    return At[e] ?? At.off
}

function Ft(e, t) {
    return `${e.layout}:${e.gridSize}:${e.layoutRadius}:${e.layoutThickness}:${e.layoutPreserveY}:${e.layoutTwist}:${e.layoutAmplitude}:${e.layoutFrequency}:${e.layoutSpokes}:${e.layoutRadialSpacing}:${e.layoutTurns}:${e.layoutHeight}:${t}`
}

function It(e, t, n) {
    let r = new Float32Array(t * 3),
        i = n.layout;
    if (i === `off` || i === `dots`) return r;
    let a = Math.max(Math.abs(n.gridSize), 1e-4);
    return jt.has(i) ? (Lt(r, e, t, i, a), r) : (Rt(r, e, t, n, a), r)
}

function Lt(e, t, n, r, i) {
    for (let a = 0; a < n; a++) {
        let n = a * 3,
            o = t[n] ?? 0,
            s = t[n + 1] ?? 0,
            c = t[n + 2] ?? 0,
            l = X(o, i),
            u = X(s, i),
            d = X(c, i);
        if (r === `xLines`) e[n] = o, e[n + 1] = u, e[n + 2] = d;
        else if (r === `yLines`) e[n] = l, e[n + 1] = s, e[n + 2] = d;
        else if (r === `zLines`) e[n] = l, e[n + 1] = u, e[n + 2] = c;
        else {
            let t = (s - u) ** 2 + (c - d) ** 2,
                r = (o - l) ** 2 + (s - u) ** 2;
            e[n] = r < t ? l : o, e[n + 1] = u, e[n + 2] = r < t ? c : d
        }
    }
}

function Rt(e, t, n, r, i) {
    let a = Ut(t, n),
        o = new x,
        s = new x;
    for (let c = 0; c < n; c++) {
        let n = c * 3;
        o.set(t[n] ?? 0, t[n + 1] ?? 0, t[n + 2] ?? 0).sub(a.center).multiplyScalar(a.scale), r.layout === `sphere` ? zt(s, o, r) : r.layout === `ripple` ? Bt(s, o, r, i) : r.layout === `spokes` ? Vt(s, o, r) : Ht(s, o, r), s.divideScalar(a.scale).add(a.center), e[n] = s.x, e[n + 1] = s.y, e[n + 2] = s.z
    }
}

function zt(e, t, n) {
    let r = t.length(),
        i = Math.max(n.layoutRadius ?? 4.5, .001),
        a = S.clamp(n.layoutThickness ?? .9, 0, 1),
        o = S.clamp(n.layoutPreserveY ?? .35, 0, 1),
        s = r > 1e-4 ? e.copy(t).divideScalar(r) : e.set(0, 1, 0);
    e.copy(s).multiplyScalar(S.lerp(i, r, a)), e.y = S.lerp(e.y, t.y, o), Gt(e, e.y * (n.layoutTwist ?? 0))
}

function Bt(e, t, n, r) {
    let i = X(Math.hypot(t.x, t.z), r),
        a = Math.atan2(t.z, t.x) + t.y * (n.layoutTwist ?? 0),
        o = Math.sin(i * (n.layoutFrequency ?? 11.5)) * (n.layoutAmplitude ?? .16);
    e.set(Math.cos(a) * i, t.y + o, Math.sin(a) * i)
}

function Vt(e, t, n) {
    let r = Nt / Math.max(n.layoutSpokes ?? 24, 3),
        i = X(Math.atan2(t.z, t.x) + t.y * (n.layoutTwist ?? 0), r),
        a = n.layoutRadialSpacing ?? 0,
        o = Math.hypot(t.x, t.z);
    a > 1e-4 && (o = X(o, a)), e.set(Math.cos(i) * o, t.y, Math.sin(i) * o)
}

function Ht(e, t, n) {
    let r = S.clamp(t.y / 5 + .5, 0, 1),
        i = Math.max(n.layoutRadius ?? 2.5, .001),
        a = Math.max(n.layoutHeight ?? 5, .001),
        o = r * (n.layoutTurns ?? 3) * Nt + Math.hypot(t.x, t.z) * (n.layoutTwist ?? 0);
    e.set(Math.cos(o) * i, (r - .5) * a, Math.sin(o) * i)
}

function Ut(e, t) {
    let n = Wt(e, t, .001),
        r = n.getCenter(new x),
        i = n.getSize(new x),
        a = Math.max(i.x, i.y, i.z, 1e-4);
    return {
        center: r,
        scale: Mt * 2 / a
    }
}

function Wt(e, t, n) {
    let r = new ee,
        i = new x;
    for (let n = 0; n < t; n++) {
        let t = n * 3;
        i.set(e[t] ?? 0, e[t + 1] ?? 0, e[t + 2] ?? 0), r.expandByPoint(i)
    }
    return r.min.set(Math.floor(r.min.x / n) * n - n, Math.floor(r.min.y / n) * n - n, Math.floor(r.min.z / n) * n - n), r.max.set(Math.ceil(r.max.x / n) * n + n, Math.ceil(r.max.y / n) * n + n, Math.ceil(r.max.z / n) * n + n), r
}

function X(e, t) {
    return Math.round(e / t) * t
}

function Gt(e, t) {
    let n = Math.cos(t),
        r = Math.sin(t),
        i = e.x * n - e.z * r,
        a = e.x * r + e.z * n;
    e.x = i, e.z = a
}
var Kt = `uniform float uTime;
uniform float uPointSize;
uniform float uDistanceSizeInfluence;
uniform float uDistanceSizeNear;
uniform float uDistanceSizeFar;
uniform float uDistanceSizeMax;
uniform float uPointSizeScale;
uniform float uDensityFillJitter;
uniform float uDensityFillPass;
uniform float uDensityFillPointSizeScale;
uniform float uMaxPointSize;
uniform float uSimplePoints;
uniform float uOpacity;
uniform float uExposure;
uniform float uTransparentPoints;
uniform vec3 uRandomize;
uniform float uCamFadeNear;
uniform float uCamFadeFar;
uniform float uCamFadeEnabled;
uniform float uDPR;
// Adaptive render scale (1 = full). gl_PointSize and uMaxPointSize are both in
// render-target device pixels; uDPR already carries renderScale into the point
// size, so the max-size ceiling is scaled here too to stay invariant on the
// upsampled quad (clamped near points pixelate with the scene, not balloon).
uniform float uRenderScale;
uniform float uFlowEnabled;
uniform float uFlowType;
uniform float uFlowStrength;
uniform float uFlowSpeed;
uniform float uFlowScale;
uniform float uFlowGridLayout;
uniform float uFlowGridEnabled;
uniform float uFlowGridSize;
uniform float uFlowGridStrength;
uniform vec3 uFlowGridMix;
uniform vec3 uFlowGridRotation;
uniform float uFlowConveyorEnabled;
uniform float uFlowConveyorSpeed;
uniform float uFlowConveyorDepth;
uniform vec3 uFlowConveyorAxis;
uniform float uFlowConveyorDistanceNear;
uniform float uFlowConveyorDistanceFar;
uniform float uFlowRandomnessExponent;
uniform float uFlowDistanceNear;
uniform float uFlowDistanceFar;
uniform sampler2D uFluidVelocity;
uniform float uFluidInfluence;
uniform float uTransitionYOffset;
uniform float uTransitionProgress;
uniform float uTransitionRestProgress;
uniform float uTransitionPow;
uniform float uIntroColorMix;
uniform float uSelectiveAmount;
uniform vec3 uSelectiveAdj[__POINTCLOUD_COLOR_CORRECTION_RANGE_COUNT__];
uniform float uAnchorHighlightOpacity;
uniform float uAnchorHighlightScale;
uniform vec3 uAnchorGlowPositions[8];
uniform float uAnchorGlowRadius;
uniform float uAnchorGlowStrength;
uniform float uAnchorGlowPulse[8];
uniform float uAnchorGlowStrumStrength;
const int SDF_SHAPE_COUNT = __SDF_SHAPE_COUNT__;
uniform int uSdfShapeCount;
uniform float uSdfShapeType[SDF_SHAPE_COUNT];
uniform float uSdfShapeStrength[SDF_SHAPE_COUNT];
uniform float uSdfShapeFalloff[SDF_SHAPE_COUNT];
uniform float uSdfShapeGradient[SDF_SHAPE_COUNT];
uniform float uSdfShapePolarity[SDF_SHAPE_COUNT];
uniform vec4 uSdfShapeParams[SDF_SHAPE_COUNT];
uniform vec4 uSdfShapeBounds[SDF_SHAPE_COUNT];
uniform mat4 uSdfShapeInverseMatrices[SDF_SHAPE_COUNT];

attribute float aSize;
attribute vec4 aRandom;
attribute float aAnchorHighlight;
attribute vec3 aLayoutTarget;

varying vec3 vCloudColor;
varying float vSplatSize;
varying vec3 vWorldPosition;
varying float vAnchorGlow;
varying float vProjectedPointSize;
varying float vCameraFade;
varying float vSparkleSeed;

const float ANCHOR_PROJECTED_POINT_SIZE = 2.0;
const float CONVEYOR_SPEED_SCALE = 0.6;

float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}

#if POINTCLOUD_USE_FLOW
float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z
  );
}

vec3 curlNoise(vec3 p) {
  float e = 0.1;
  float n1 = valueNoise(p + vec3(0.0, e, 0.0));
  float n2 = valueNoise(p - vec3(0.0, e, 0.0));
  float a = (n1 - n2) / (2.0 * e);
  n1 = valueNoise(p + vec3(0.0, 0.0, e));
  n2 = valueNoise(p - vec3(0.0, 0.0, e));
  float b = (n1 - n2) / (2.0 * e);
  n1 = valueNoise(p + vec3(e, 0.0, 0.0));
  n2 = valueNoise(p - vec3(e, 0.0, 0.0));
  float c = (n1 - n2) / (2.0 * e);
  return normalize(vec3(a - b, b - c, c - a));
}

float applyFlow(inout vec3 pos, float distanceToCamera) {
  if (uFlowEnabled < 0.5 || uFlowStrength <= 0.0) return 1.0;
  float flowMask = smoothstep(uFlowDistanceFar, uFlowDistanceNear, distanceToCamera);
  if (flowMask <= 0.0001) return 1.0;
  float t = uTime * uFlowSpeed;
  float s = max(uFlowScale, 0.0001);
  float strength = uFlowStrength * flowMask;
  if (uFlowType < 2.5) {
    vec3 curl = curlNoise(pos * s + vec3(t * 0.08, t * 0.05, -t * 0.04));
    pos += curl * strength * 0.16 * (0.45 + aRandom.w);
    return 1.0;
  } else {
    float sparseMask = pow(aRandom.x, max(uFlowRandomnessExponent, 1.0));
    float rise = fract(t * 0.04 + pow(aRandom.y, 10.0) * 20.0);
    float lifeScale = smoothstep(0.0, 0.08, rise) * (1.0 - smoothstep(0.82, 1.0, rise));
    pos.y += rise * sparseMask * strength * 7.0 * mix(0.4, 1.2, aRandom.z);
    pos.y += sin(t + aRandom.x * 20.0) * sparseMask * strength * 0.08 * aRandom.w;
    return lifeScale;
  }
}
#endif

#if POINTCLOUD_USE_FLOW_LAYOUT
vec3 rotateX(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

vec3 rotateY(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

vec3 rotateZ(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x * c - p.y * s, p.x * s + p.y * c, p.z);
}

vec3 rotateGrid(vec3 p, vec3 rotation) {
  p = rotateX(p, rotation.x);
  p = rotateY(p, rotation.y);
  return rotateZ(p, rotation.z);
}

vec3 rotateGridInverse(vec3 p, vec3 rotation) {
  p = rotateZ(p, -rotation.z);
  p = rotateY(p, -rotation.y);
  return rotateX(p, -rotation.x);
}

vec3 applyFlowLayout(vec3 pos, float mask) {
  if (
    uFlowGridEnabled < 0.5 ||
    uFlowGridLayout < 0.5 ||
    uFlowGridStrength <= 0.0 ||
    mask <= 0.0
  ) {
    return pos;
  }
  vec3 target = aLayoutTarget;
  if (uFlowGridLayout < 1.5) {
    float gridSize = max(uFlowGridSize, 0.0001);
    vec3 gridPos = rotateGridInverse(pos, uFlowGridRotation);
    vec3 snapped = floor(gridPos / gridSize + 0.5) * gridSize;
    vec3 gridMix = clamp(uFlowGridMix, vec3(0.0), vec3(1.0));
    return rotateGrid(mix(gridPos, snapped, gridMix), uFlowGridRotation);
  }
  return mix(pos, target, clamp(uFlowGridStrength, 0.0, 1.0));
}
#endif

#if POINTCLOUD_USE_CONVEYOR
float conveyorFlowOffset(vec4 mv, float mask, out float life) {
  life = 1.0;
  if (uFlowConveyorEnabled < 0.5 || mask <= 0.0) {
    return 0.0;
  }
  float speed = uFlowConveyorSpeed * CONVEYOR_SPEED_SCALE;
  if (abs(speed) <= 0.0001) {
    return 0.0;
  }
  float depth = max(uFlowConveyorDepth, 0.001);
  float distanceToCamera = max(-mv.z, 0.001);
  float flowMask = smoothstep(
    uFlowConveyorDistanceFar,
    uFlowConveyorDistanceNear,
    distanceToCamera
  );
  if (flowMask <= 0.0001) {
    return 0.0;
  }
  float direction = speed >= 0.0 ? 1.0 : -1.0;
  float phase = fract(aRandom.x + uTime * abs(speed) / depth);
  life = 1.0 - smoothstep(0.25, 0.5, abs(phase - 0.5));
  return (phase - 0.5) * depth * direction * flowMask;
}
#endif

float anchorGlowForPosition(vec3 pos) {
  float glow = 0.0;
  for (int i = 0; i < 8; i++) {
    float pulse = uAnchorGlowPulse[i];
    float radius = max(uAnchorGlowRadius, 0.0001);
    float particleStrength = mix(0.45, 1.15, pow(aRandom.y, 0.65));
    float strength = (uAnchorGlowStrength + pulse * uAnchorGlowStrumStrength) * particleStrength;
    float d = distance(pos, uAnchorGlowPositions[i]);
    float falloff = clamp(1.0 - d / radius, 0.0, 1.0);
    falloff = falloff * falloff * falloff * falloff;
    glow = max(glow, falloff * strength);
  }
  return glow;
}

float sdfSphere(vec3 p, float radius) {
  return length(p) - max(radius, 0.0001);
}

float sdfBox(vec3 p, vec3 halfExtents) {
  vec3 q = abs(p) - max(halfExtents, vec3(0.0001));
  return length(max(q, vec3(0.0))) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdfTorus(vec3 p, vec2 torus) {
  vec2 q = vec2(length(p.xz) - max(torus.x, 0.0001), p.y);
  return length(q) - max(torus.y, 0.0001);
}

float sdfCylinder(vec3 p, float radius, float halfHeight) {
  vec2 d = abs(vec2(length(p.xz), p.y)) -
    vec2(max(radius, 0.0001), max(halfHeight, 0.0001));
  return min(max(d.x, d.y), 0.0) + length(max(d, vec2(0.0)));
}

const float SDF_INV_SQRT_3 = 0.57735027;
const float DODECAHEDRON_NORMAL_SHORT = 0.35682209;
const float DODECAHEDRON_NORMAL_LONG = 0.93417236;
const vec3 DODECAHEDRON_NORMAL_111 = vec3(SDF_INV_SQRT_3);
const vec3 DODECAHEDRON_NORMAL_0SL = vec3(
  0.0,
  DODECAHEDRON_NORMAL_SHORT,
  DODECAHEDRON_NORMAL_LONG
);
const vec3 DODECAHEDRON_NORMAL_SL0 = vec3(
  DODECAHEDRON_NORMAL_SHORT,
  DODECAHEDRON_NORMAL_LONG,
  0.0
);
const vec3 DODECAHEDRON_NORMAL_L0S = vec3(
  DODECAHEDRON_NORMAL_LONG,
  0.0,
  DODECAHEDRON_NORMAL_SHORT
);

float sdfOctahedron(vec3 p, float size) {
  return (dot(abs(p), vec3(1.0)) - max(size, 0.0001)) * SDF_INV_SQRT_3;
}

float sdfDodecahedron(vec3 p, float radius) {
  vec3 q = abs(p);
  float d = dot(q, DODECAHEDRON_NORMAL_111);
  d = max(d, dot(q, DODECAHEDRON_NORMAL_0SL));
  d = max(d, dot(q, DODECAHEDRON_NORMAL_SL0));
  d = max(d, dot(q, DODECAHEDRON_NORMAL_L0S));
  return d - max(radius, 0.0001);
}

// Type indices must match getSdfShapeTypeIndex() in PointcloudObject.ts.
float sdfForShapeLocal(int shapeType, vec4 params, vec3 localPosition) {
  if (shapeType == 1) {
    return sdfSphere(localPosition, params.x);
  }
  if (shapeType == 2) {
    return sdfBox(localPosition, params.xyz);
  }
  if (shapeType == 3) {
    return sdfTorus(localPosition, params.xy);
  }
  if (shapeType == 4) {
    return sdfCylinder(localPosition, params.x, params.y);
  }
  if (shapeType == 5) {
    return sdfOctahedron(localPosition, params.x);
  }
  if (shapeType == 6) {
    return sdfDodecahedron(localPosition, params.x);
  }
  return 1e6;
}

vec3 sdfNormalForShapeLocal(int shapeType, vec4 params, vec3 localPosition) {
  float e = 0.006;
  vec2 k = vec2(1.0, -1.0);
  vec3 n =
    k.xyy * sdfForShapeLocal(shapeType, params, localPosition + k.xyy * e) +
    k.yyx * sdfForShapeLocal(shapeType, params, localPosition + k.yyx * e) +
    k.yxy * sdfForShapeLocal(shapeType, params, localPosition + k.yxy * e) +
    k.xxx * sdfForShapeLocal(shapeType, params, localPosition + k.xxx * e);
  float lenSq = dot(n, n);
  if (lenSq <= 0.000001) {
    vec3 fallback = localPosition + aRandom.xyz - vec3(0.5);
    lenSq = max(dot(fallback, fallback), 0.000001);
    return fallback * inversesqrt(lenSq);
  }
  return n * inversesqrt(lenSq);
}

// Quintic ease (Perlin smootherstep). C2-continuous, unlike GLSL's cubic
// smoothstep, so the push ramps in/out with no derivative kink -> the
// displacement varies smoothly with distance and reads as more fluid.
float smootherstep01(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

vec3 applySdfShapeCollision(vec3 pos, float mask) {
  if (mask <= 0.0 || uSdfShapeCount <= 0) {
    return pos;
  }
  vec3 pushed = pos;
  int shapeCount = min(uSdfShapeCount, SDF_SHAPE_COUNT);
  for (int i = 0; i < shapeCount; i++) {
    float strength = uSdfShapeStrength[i];
    float falloff = uSdfShapeFalloff[i];
    if (strength <= 0.0001 || falloff <= 0.0001) {
      continue;
    }

    vec4 bounds = uSdfShapeBounds[i];
    vec3 centerDelta = pushed - bounds.xyz;
    if (dot(centerDelta, centerDelta) > bounds.w * bounds.w) {
      continue;
    }

    int shapeType = int(uSdfShapeType[i] + 0.5);
    vec4 params = uSdfShapeParams[i];
    mat4 inverseMatrix = uSdfShapeInverseMatrices[i];
    vec3 localPosition = (inverseMatrix * vec4(pushed, 1.0)).xyz;
    float distanceToShape = sdfForShapeLocal(shapeType, params, localPosition);
    if (distanceToShape >= falloff) {
      continue;
    }

    vec3 localNormal = sdfNormalForShapeLocal(shapeType, params, localPosition);
    mat3 inverseBasis = mat3(inverseMatrix);
    vec3 cloudNormalRaw = vec3(
      dot(inverseBasis[0], localNormal),
      dot(inverseBasis[1], localNormal),
      dot(inverseBasis[2], localNormal)
    );
    float normalLenSq = dot(cloudNormalRaw, cloudNormalRaw);
    vec3 cloudNormal = normalLenSq > 0.000001
      ? cloudNormalRaw * inversesqrt(normalLenSq)
      : normalize(aRandom.xyz - vec3(0.5));
    // Normalized distance through the influence band: 0 at the surface,
    // 1 at the outer falloff edge. Reach (falloff) and push magnitude
    // (strength) are decoupled so widening the band no longer strengthens
    // the push -- they can be dialed independently.
    float outsideDistance = max(distanceToShape, 0.0);
    float bandT = clamp(outsideDistance / falloff, 0.0, 1.0);
    // Quintic shoulder, then gradient shapes how fast the push damps with
    // distance: >1 hugs the surface (steeper damping), <1 reaches farther
    // (gentler damping).
    float fade = 1.0 - smootherstep01(bandT);
    fade = pow(fade, max(uSdfShapeGradient[i], 0.001));
    // Particles inside the shape eject outward, ramping to a capped
    // one-falloff depth so deeply-buried points don't fling out arbitrarily.
    float interior = clamp(-distanceToShape / falloff, 0.0, 1.0);
    float repel = strength * (fade + interior);
    pushed += cloudNormal * repel * uSdfShapePolarity[i];
  }
  return pushed;
}

vec3 markdownPaletteColor(float seed) {
  float r = fract(seed * 4.91 + aRandom.y * 2.37);
  if (r < 0.2) return vec3(0.2196, 0.7765, 0.3059);
  if (r < 0.55) return vec3(0.5059, 0.4275, 0.9176);
  if (r < 0.72) return vec3(0.8549, 0.4078, 0.9843);
  if (r < 0.88) return vec3(0.2667, 0.5569, 0.9647);
  return vec3(0.8980);
}

vec3 remapToMarkdownColor(vec3 sourceColor, float seed) {
  vec3 palette = markdownPaletteColor(seed);
  float luma = dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));
  float value = max(max(sourceColor.r, sourceColor.g), sourceColor.b);
  float brightness = mix(luma, value, 0.45);
  vec3 chroma = normalize(max(palette, vec3(0.001)));
  vec3 colored = chroma * (0.18 + brightness * 1.55);
  return mix(vec3(brightness), colored, 0.86);
}

// Triangular weight for a hue sector centered at \`center\` (in turns 0..1),
// linearly falling to zero at ±1/6 turn away.
float hueSectorWeight(float hue, float center) {
  float d = abs(hue - center);
  d = min(d, 1.0 - d);
  return clamp(1.0 - d * 6.0, 0.0, 1.0);
}

float hueToRgbChannel(float p, float q, float t) {
  t = fract(t);
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 0.5) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

vec3 hslToRgb(vec3 hsl) {
  float h = hsl.x;
  float s = clamp(hsl.y, 0.0, 1.0);
  float l = clamp(hsl.z, 0.0, 1.0);
  if (s < 0.0001) return vec3(l);
  float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
  float p = 2.0 * l - q;
  return vec3(
    hueToRgbChannel(p, q, h + 1.0 / 3.0),
    hueToRgbChannel(p, q, h),
    hueToRgbChannel(p, q, h - 1.0 / 3.0)
  );
}

vec3 applySelectiveColor(vec3 rgb) {
  float amount = clamp(uSelectiveAmount, 0.0, 1.0);
  if (amount < 0.0001) return rgb;

  float maxC = max(rgb.r, max(rgb.g, rgb.b));
  float minC = min(rgb.r, min(rgb.g, rgb.b));
  float chroma = maxC - minC;

  // Hue weights (R/Y/G/C/B/M) — scaled by saturation so neutrals don't bleed.
  float hue = 0.0;
  vec4 wRYGC = vec4(0.0);
  vec2 wBM = vec2(0.0);
  if (chroma > 0.0001) {
    if (rgb.r >= rgb.g && rgb.r >= rgb.b) {
      hue = (rgb.g - rgb.b) / chroma;
      if (hue < 0.0) hue += 6.0;
    } else if (rgb.g >= rgb.b) {
      hue = (rgb.b - rgb.r) / chroma + 2.0;
    } else {
      hue = (rgb.r - rgb.g) / chroma + 4.0;
    }
    hue *= 1.0 / 6.0; // turns
    wRYGC = vec4(
      hueSectorWeight(hue, 0.0 / 6.0),
      hueSectorWeight(hue, 1.0 / 6.0),
      hueSectorWeight(hue, 2.0 / 6.0),
      hueSectorWeight(hue, 3.0 / 6.0)
    );
    wBM = vec2(
      hueSectorWeight(hue, 4.0 / 6.0),
      hueSectorWeight(hue, 5.0 / 6.0)
    );
  }

  // Lightness weights (W/N/K) — based on max+min midpoint.
  float L = (maxC + minC) * 0.5;
  float wW = smoothstep(0.5, 1.0, L);
  float wK = 1.0 - smoothstep(0.0, 0.5, L);
  float wN = clamp(1.0 - abs(L * 2.0 - 1.0), 0.0, 1.0);

  // Accumulate weighted HSL deltas. Each uSelectiveAdj is (hueShiftTurns, satAdd, litAdd).
  vec3 totalAdj =
    wRYGC.x * uSelectiveAdj[0] +
    wRYGC.y * uSelectiveAdj[1] +
    wRYGC.z * uSelectiveAdj[2] +
    wRYGC.w * uSelectiveAdj[3] +
    wBM.x   * uSelectiveAdj[4] +
    wBM.y   * uSelectiveAdj[5] +
    wW      * uSelectiveAdj[6] +
    wN      * uSelectiveAdj[7] +
    wK      * uSelectiveAdj[8];
  totalAdj *= amount;

  float saturation = chroma > 0.0001
    ? (L > 0.5 ? chroma / max(2.0 - maxC - minC, 0.0001) : chroma / max(maxC + minC, 0.0001))
    : 0.0;

  vec3 hsl = vec3(
    fract(hue + totalAdj.x),
    clamp(saturation + totalAdj.y, 0.0, 1.0),
    clamp(L + totalAdj.z, 0.0, 1.0)
  );
  return clamp(hslToRgb(hsl), 0.0, 1.0);
}

void main() {
  float anchorHighlight = clamp(aAnchorHighlight * uAnchorHighlightOpacity, 0.0, 1.0);
  vSplatSize = aSize;
  vSparkleSeed = fract(aRandom.x * 17.13 + aRandom.y * 3.71 + aRandom.z * 11.47);
  vec3 pos = position;
  float anchorMotionMask = 1.0 - step(0.0001, aAnchorHighlight);
  pos += (aRandom.xyz * 2.0 - 1.0) * uRandomize * anchorMotionMask;
#if POINTCLOUD_USE_DENSITY_FILL
  if (uDensityFillJitter > 0.0) {
    vec3 densityFillJitter = vec3(
      hash(aRandom.xyz + vec3(uDensityFillPass * 11.13, 0.0, 0.0)),
      hash(aRandom.yzx + vec3(0.0, uDensityFillPass * 17.71, 0.0)),
      hash(aRandom.zxy + vec3(0.0, 0.0, uDensityFillPass * 23.37))
    );
    pos += (densityFillJitter * 2.0 - 1.0) * uDensityFillJitter * anchorMotionMask;
  }
#endif
  pos.y += sin(uTime * 0.18 + aRandom.x * 12.0) * 0.006 * anchorMotionMask;
  float restProgress = clamp(uTransitionRestProgress, 0.0001, 1.0);
  float transitionSettle = smoothstep(0.0, restProgress, clamp(uTransitionProgress, 0.0, 1.0));
  float transitionMask = pow(aRandom.y, max(uTransitionPow, 0.0001)) * mix(0.35, 1.0, aRandom.z);
  float transitionFloat = transitionMask * (1.0 - transitionSettle);
  pos.y += uTransitionYOffset * transitionFloat * anchorMotionMask;
  float conveyorLife = 1.0;
  float conveyorOffset = 0.0;
  float flowSize = 1.0;
#if POINTCLOUD_USE_FLOW || POINTCLOUD_USE_CONVEYOR
  vec4 preFlowMv = viewMatrix * modelMatrix * vec4(pos, 1.0);
#endif
#if POINTCLOUD_USE_CONVEYOR
  conveyorOffset = conveyorFlowOffset(preFlowMv, anchorMotionMask, conveyorLife);
#endif
#if POINTCLOUD_USE_FLOW
  float preFlowDistance = length(preFlowMv.xyz);
  flowSize = anchorMotionMask > 0.5 ? applyFlow(pos, preFlowDistance) : 1.0;
#endif
#if POINTCLOUD_USE_FLOW_LAYOUT
  pos = applyFlowLayout(pos, anchorMotionMask);
#endif
  float simpleMask = step(0.5, uSimplePoints);
  pos = applySdfShapeCollision(pos, anchorMotionMask);
  vAnchorGlow = simpleMask > 0.5
    ? 0.0
    : clamp(anchorGlowForPosition(pos) * uAnchorHighlightOpacity, 0.0, 1.0);
  vec3 introColor = remapToMarkdownColor(color, aRandom.x);
  vec3 baseColor = mix(color, introColor, clamp(uIntroColorMix, 0.0, 1.0));
  baseColor = applySelectiveColor(baseColor) * exp2(uExposure);
  vCloudColor = mix(baseColor, vec3(1.0), clamp(vAnchorGlow, 0.0, 1.0));

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
#if POINTCLOUD_USE_CONVEYOR
  vec3 conveyorAxisWorld = normalize(mat3(modelMatrix) * uFlowConveyorAxis);
  worldPosition.xyz += conveyorAxisWorld * conveyorOffset;
#endif
  vec4 mv = viewMatrix * worldPosition;
  vWorldPosition = worldPosition.xyz;
#if POINTCLOUD_USE_FLUID
  if (simpleMask < 0.5 && uFluidInfluence > 0.0) {
    vec4 clipPos = projectionMatrix * mv;
    vec2 screenUV = clamp(clipPos.xy / max(clipPos.w, 0.0001) * 0.5 + 0.5, 0.0, 1.0);
    vec2 fluidVel = texture2D(uFluidVelocity, screenUV).xy;
    float depthAtten = 1.0 / (1.0 + max(-mv.z, 0.0) * 0.3);
    mv.xy += fluidVel * uFluidInfluence * 0.02 * depthAtten * anchorMotionMask;
  }
#endif
  float dist = length(mv.xyz);
  vCameraFade = uCamFadeEnabled > 0.5
    ? 1.0 - smoothstep(uCamFadeNear, max(uCamFadeFar, uCamFadeNear + 0.0001), dist)
    : 1.0;
  float baseSize = mix(0.6, 1.6, pow(aRandom.z, 4.0));
  float splatSize = mix(0.65, 1.35, vSplatSize);
  baseSize *= mix(1.0, splatSize, 0.3);
  float distSizeT = smoothstep(uDistanceSizeNear, uDistanceSizeFar, dist);
  float distSize = mix(1.0, uDistanceSizeMax, distSizeT);
  baseSize *= mix(1.0, distSize, uDistanceSizeInfluence);
  baseSize *= flowSize;
  baseSize *= conveyorLife;
  float opaqueSizeScale = mix(max(uOpacity, 0.0), 1.0, step(0.5, uTransparentPoints));
  float ps =
    uPointSize *
    max(uPointSizeScale, 0.001) *
    baseSize *
    opaqueSizeScale *
    max(uDensityFillPointSizeScale, 0.001) *
    uDPR *
    (120.0 / max(dist, 0.1));
  // ps is in render-target px, which shrink with renderScale; the frag's
  // min-size cull is an on-screen threshold, so normalize back to on-screen px
  // (÷ uRenderScale) — otherwise the cull tightens as the scale drops and faint
  // transparent points pop out while the scale animates. /1 at full scale.
  vProjectedPointSize = ps / uRenderScale;
  gl_PointSize = clamp(ps, 0.0, uMaxPointSize * uRenderScale);
  gl_Position = projectionMatrix * mv;
}
`,
    qt = `precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform float uLoadFade;
uniform float uDensityFillOpacityScale;
uniform float uTransparentPoints;
uniform float uCausticsEnabled;
uniform float uCausticsStrength;
uniform float uCausticsScale;
uniform float uCausticsPower;
uniform float uCausticsSparkle;
uniform vec3 uCausticsAxisScale;
uniform vec3 uCausticsSpeed;
uniform vec3 uCausticsColor;

varying vec3 vCloudColor;
varying vec3 vWorldPosition;
varying float vAnchorGlow;
varying float vProjectedPointSize;
varying float vCameraFade;
varying float vSparkleSeed;

const float MIN_PROJECTED_POINT_SIZE = 0.55;

#if POINTCLOUD_USE_CAUSTICS
float dotNoise(vec3 p) {
  const float PHI = 1.618033988;
  const mat3 GOLD = mat3(
    -0.571464913, 0.814921382, 0.096597072,
    -0.278044873, -0.303026659, 0.911518454,
    0.772087367, 0.494042493, 0.399753815
  );
  return dot(cos(GOLD * p), sin(PHI * p * GOLD));
}

float causticsPattern(vec3 worldPos) {
  float scale = max(uCausticsScale, 0.0001);
  vec3 p = worldPos * scale * max(uCausticsAxisScale, vec3(0.0001));
  vec3 drift = uTime * uCausticsSpeed;
  float n1 = dotNoise(p + drift);
  float n2 = dotNoise(p * 1.73 + vec3(-drift.y, drift.z, -drift.x));
  float n3 = dotNoise(p * 3.11 + vec3(drift.z, -drift.x, drift.y));
  float ridges = max(
    0.0,
    1.0 - min(min(abs(n1), abs(n2)), abs(n3)) * 1.7
  );
  float crossings = max(0.0, 1.0 - abs(n1 + n2 * 0.55 - n3 * 0.35) * 1.15);
  return pow(
    clamp(ridges * 0.82 + crossings * 0.28, 0.0, 1.0),
    max(0.001, uCausticsPower)
  );
}

vec3 applyCaustics(vec3 color, float r2) {
  if (uCausticsEnabled > 0.5) {
    float pointMask = 0.55 + 0.45 * smoothstep(0.25, 0.0, r2);
    float caustics = causticsPattern(vWorldPosition) * uCausticsStrength;
    color += uCausticsColor * caustics * pointMask;

    if (uCausticsSparkle > 0.0001) {
      float sparse = smoothstep(0.985, 1.0, vSparkleSeed);
      float twinkle = 0.5 + 0.5 * sin(
        uTime * mix(4.0, 11.0, vSparkleSeed) + vSparkleSeed * 37.699112
      );
      float pulse = smoothstep(0.72, 1.0, twinkle);
      pulse *= pulse * pulse;
      float center = smoothstep(0.18, 0.0, r2);
      float sparkle = uCausticsSparkle * sparse * pulse * center;
      color += mix(uCausticsColor, vec3(1.0), 0.82) * sparkle;
    }
  }
  return color;
}
#endif

void main() {
  float minPointSize = mix(0.01, MIN_PROJECTED_POINT_SIZE, step(0.5, uTransparentPoints));
  if (vProjectedPointSize < minPointSize) discard;

  vec2 uv = gl_PointCoord - 0.5;
  float r2 = dot(uv, uv);
  if (r2 > 0.25) discard;

  vec3 color = vCloudColor;
#if POINTCLOUD_USE_CAUSTICS
  color = applyCaustics(color, r2);
#endif
  float alpha = mix(1.0, uOpacity, step(0.5, uTransparentPoints)) * uDensityFillOpacityScale * vCameraFade * uLoadFade;
  gl_FragColor = vec4(clamp(color, vec3(0.0), vec3(1.0)), alpha);
}
`,
    Jt = `__POINTCLOUD_COLOR_CORRECTION_RANGE_COUNT__`,
    Yt = `__SDF_SHAPE_COUNT__`,
    Xt = 8,
    Zt = 1048576,
    Qt = 2.5,
    $t = .3,
    en = .995,
    tn = 1;

function nn(e, t) {
    let n = t.gridStrength ?? 1;
    return e.set(t.gridMix?.x ?? (t.gridAxes?.x === !1 ? 0 : n), t.gridMix?.y ?? (t.gridAxes?.y === !1 ? 0 : n), t.gridMix?.z ?? (t.gridAxes?.z === !1 ? 0 : n)), e.x = S.clamp(e.x, 0, 1), e.y = S.clamp(e.y, 0, 1), e.z = S.clamp(e.z, 0, 1), e
}
var rn = new M(0, 0, 0, `XYZ`);

function an(e, t) {
    return rn.set(t?.x ?? 0, t?.y ?? 0, t?.z ?? 0), e.set(0, 0, 1).applyEuler(rn).normalize()
}

function on(e) {
    return Math.max(e ?? 64, 1)
}

function sn(e) {
    return e ? `${e.source512}:${e.source256}` : `default`
}

function cn(e, t) {
    return e === 512 && t?.source512 !== void 0 ? t.source512 : e === 256 && t?.source256 !== void 0 ? t.source256 : W(e)
}

function ln(e) {
    let t = e ?? _;
    return `${t.enabled}:${t.opacity}:${t.pointSizeScale}:${t.jitter}`
}

function Z(e) {
    return +!!e
}

function un(e, t) {
    if (!e) return {
        POINTCLOUD_USE_FLOW: 1,
        POINTCLOUD_USE_FLOW_LAYOUT: 1,
        POINTCLOUD_USE_CONVEYOR: 1,
        POINTCLOUD_USE_FLUID: 1,
        POINTCLOUD_USE_DENSITY_FILL: 1,
        POINTCLOUD_USE_CAUSTICS: 1
    };
    let n = e.flow,
        r = n.enabled && n.strength > 0,
        i = n.gridEnabled && Pt(n.layout) > 0 && n.gridStrength > 0,
        a = n.conveyorEnabled && Math.abs(n.conveyorSpeed) > 1e-4,
        o = t.fluidEnabled !== !1 && e.fluid.enabled && e.fluid.influence > 0,
        s = e.densityFill ?? _,
        c = s.enabled && s.opacity > 0,
        l = e.caustics,
        u = l === void 0 || l.enabled && (l.strength > 0 || Math.max(l.sparkle, 0) > 0);
    return {
        POINTCLOUD_USE_FLOW: Z(r),
        POINTCLOUD_USE_FLOW_LAYOUT: Z(i),
        POINTCLOUD_USE_CONVEYOR: Z(a),
        POINTCLOUD_USE_FLUID: Z(o),
        POINTCLOUD_USE_DENSITY_FILL: Z(c),
        POINTCLOUD_USE_CAUSTICS: Z(u)
    }
}

function dn(e) {
    return `${e.POINTCLOUD_USE_FLOW}${e.POINTCLOUD_USE_FLOW_LAYOUT}${e.POINTCLOUD_USE_CONVEYOR}${e.POINTCLOUD_USE_FLUID}${e.POINTCLOUD_USE_DENSITY_FILL}${e.POINTCLOUD_USE_CAUSTICS}`
}
var fn = class e extends ae {
    pointCount;
    visiblePointCount;
    cloudInfo = null;
    sourcePositions;
    anchorHighlightValues;
    anchorHighlightAttribute;
    points;
    cloudMaterial;
    densityFillPoints;
    densityFillMaterial;
    pointcloud;
    transparentPoints = !0;
    blendMode = `normal`;
    loadFade = 1;
    textureSize;
    pointSizeResolutionMultiplier;
    lastParticleScalarsKey = ``;
    lastDensityFillKey = ``;
    lastShaderDefinesKey = ``;
    fluidOptionEnabled;
    lastColorCorrections = null;
    layoutTargetAttribute;
    layoutTargetSignature;
    constructor(e, t = {}) {
        let n = t.radius ?? Qt,
            r = t.maxPoints ?? Zt,
            i = t.samplingInfluence ?? $t,
            a = t.pointcloud ?? null,
            o = t.textureSize ?? Math.ceil(Math.sqrt(e.count)),
            s = pn(e, n, Math.min(o * o, r), i, a),
            c = cn(o, a?.particleScalars),
            l = gn({
                ...t,
                textureSize: o
            }, a);
        super();
        let u = hn(l);
        this.points = new re(s.geometry, l), this.densityFillPoints = new re(s.geometry, u), this.points.frustumCulled = !1, this.densityFillPoints.frustumCulled = !1, this.densityFillPoints.visible = !1, this.add(this.points, this.densityFillPoints), this.cloudMaterial = l, this.densityFillMaterial = u, this.pointcloud = a, this.pointCount = s.count, this.visiblePointCount = s.count, this.sourcePositions = s.positions, this.anchorHighlightValues = s.anchorHighlightValues, this.anchorHighlightAttribute = s.anchorHighlightAttribute, this.textureSize = o, this.pointSizeResolutionMultiplier = c, this.lastParticleScalarsKey = sn(a?.particleScalars), this.fluidOptionEnabled = t.fluidEnabled !== !1, this.lastShaderDefinesKey = dn(un(a, t)), this.layoutTargetAttribute = s.layoutTargetAttribute, this.layoutTargetSignature = s.layoutTargetSignature, this.frustumCulled = !1, this.applyDensityFill(a?.densityFill), typeof t.renderOrder == `number` && (this.renderOrder = t.renderOrder, this.points.renderOrder = t.renderOrder, this.densityFillPoints.renderOrder = t.renderOrder)
    }
    static async loadFromPointcloud(t, n, r = {}) {
        let i = Pe(t.sources, n),
            a = t.id?.startsWith(`cloud-converted-`) ? !0 : void 0,
            o = await vt(i.asset, {
                orientAsConverted: a
            }),
            s = i.textureSize,
            c = {
                id: t.id ?? ``,
                asset: i.asset,
                resolution: s,
                byteSize: o.byteSize
            },
            l = new e(o, {
                ...r,
                pointcloud: t,
                textureSize: s
            });
        return l.cloudInfo = c, {
            pointcloud: l,
            cloudInfo: c
        }
    }
    get material() {
        return this.cloudMaterial
    }
    get geometry() {
        return this.points.geometry
    }
    setTime(e) {
        this.cloudMaterial.uniforms.uTime.value = e
    }
    setDpr(e) {
        this.cloudMaterial.uniforms.uDPR.value = e
    }
    setRenderScale(e) {
        this.cloudMaterial.uniforms.uRenderScale.value = e
    }
    setPointSize(e) {
        this.cloudMaterial.uniforms.uPointSize.value = e * this.pointSizeResolutionMultiplier
    }
    setPointSizeScale(e) {
        this.cloudMaterial.uniforms.uPointSizeScale.value = Math.max(e, .001)
    }
    setOpacity(e) {
        this.cloudMaterial.uniforms.uOpacity.value = S.clamp(e, 0, 1), this.applyBlendMode()
    }
    setLoadFade(e) {
        this.loadFade = S.clamp(e, 0, 1), this.cloudMaterial.uniforms.uLoadFade.value = this.loadFade, this.applyBlendMode()
    }
    setExposure(e) {
        this.cloudMaterial.uniforms.uExposure.value = S.clamp(e, -4, 4)
    }
    setTransparent(e) {
        this.transparentPoints = e, this.cloudMaterial.uniforms.uTransparentPoints.value = +!!e, this.applyBlendMode()
    }
    setBlendMode(e) {
        this.blendMode = e, this.applyBlendMode()
    }
    applyBlendMode() {
        let e = this.transparentPoints ? this.blendMode === `additive` ? 2 : this.blendMode === `multiply` ? 4 : this.blendMode === `subtractive` ? 3 : this.cloudMaterial.uniforms.uOpacity.value >= en && this.loadFade >= 1 ? 0 : 1 : +(this.loadFade < 1);
        mn(this.cloudMaterial, e), mn(this.densityFillMaterial, e === 0 ? 1 : e, !0)
    }
    setRandomize(e) {
        this.cloudMaterial.uniforms.uRandomize.value.set(Math.max(e[0], 0), Math.max(e[1], 0), Math.max(e[2], 0))
    }
    setSimplePoints(e) {
        this.cloudMaterial.uniforms.uSimplePoints.value = +!!e
    }
    setCameraFade(e) {
        let t = Math.max(e.near, 0);
        this.cloudMaterial.uniforms.uCamFadeEnabled.value = +!!e.enabled, this.cloudMaterial.uniforms.uCamFadeNear.value = t, this.cloudMaterial.uniforms.uCamFadeFar.value = Math.max(e.far, t + 1e-4), this.transparentPoints && e.enabled && this.cloudMaterial.blending === 0 && (this.cloudMaterial.blending = 1, this.cloudMaterial.transparent = !0, this.cloudMaterial.depthWrite = !1, this.cloudMaterial.needsUpdate = !0)
    }
    setFluidVelocity(e) {
        this.cloudMaterial.uniforms.uFluidVelocity.value = e
    }
    setFluidInfluence(e) {
        this.cloudMaterial.uniforms.uFluidInfluence.value = Math.max(0, e)
    }
    setSdfShapes(e) {
        let t = this.cloudMaterial.uniforms,
            n = S.clamp(e.length, 0, 4),
            r = t.uSdfShapeType.value,
            i = t.uSdfShapeStrength.value,
            a = t.uSdfShapeFalloff.value,
            o = t.uSdfShapeGradient.value,
            s = t.uSdfShapePolarity.value,
            c = t.uSdfShapeParams.value,
            l = t.uSdfShapeBounds.value,
            u = t.uSdfShapeInverseMatrices.value;
        t.uSdfShapeCount.value = n;
        for (let t = 0; t < n; t++) {
            let n = e[t];
            r[t] = _n(n.type), i[t] = Math.max(0, n.strength), a[t] = Math.max(0, n.falloff), o[t] = Math.max(.001, n.gradient), s[t] = n.invert ? -1 : 1, c[t].copy(n.params), l[t].copy(n.bounds), u[t].copy(n.inverseMatrix)
        }
    }
    setIntroColorMix(e) {
        this.cloudMaterial.uniforms.uIntroColorMix.value = S.clamp(e, 0, 1)
    }
    setTransitionUniforms(e) {
        let t = this.cloudMaterial.uniforms;
        t.uTransitionYOffset.value = e.yOffset, t.uTransitionProgress.value = e.progress, t.uTransitionRestProgress.value = e.restProgress, t.uTransitionPow.value = e.pow
    }
    applyDynamicUniforms(e) {
        let t = this.cloudMaterial.uniforms,
            n = this.updatePointSizeResolutionMultiplier(e.particleScalars);
        t.uPointSize.value = e.pointSize * n, t.uMaxPointSize.value = on(e.maxPointSize) * n, t.uDistanceSizeInfluence.value = e.distanceSizeInfluence ?? .25, t.uDistanceSizeNear.value = e.distanceSizeNear ?? 4, t.uDistanceSizeFar.value = e.distanceSizeFar ?? 18, t.uDistanceSizeMax.value = e.distanceSizeMax ?? 1.5;
        let r = e.colorCorrections;
        r !== this.lastColorCorrections && (this.lastColorCorrections = r, t.uSelectiveAmount.value = h(r), f(t.uSelectiveAdj.value, r));
        let i = e.caustics;
        i && (t.uCausticsEnabled.value = +!!i.enabled, t.uCausticsStrength.value = i.strength, t.uCausticsScale.value = i.scale, t.uCausticsPower.value = i.power, t.uCausticsSparkle.value = Math.max(i.sparkle, 0), t.uCausticsAxisScale.value.set(i.axisScale.x, i.axisScale.y, i.axisScale.z), t.uCausticsSpeed.value.set(i.speed.x, i.speed.y, i.speed.z), t.uCausticsColor.value.setRGB(i.color.r, i.color.g, i.color.b, O));
        let a = e.flow;
        t.uFlowEnabled.value = +!!a.enabled, t.uFlowType.value = vn(a.type), t.uFlowStrength.value = a.strength, t.uFlowSpeed.value = a.speed, t.uFlowScale.value = a.scale, t.uFlowGridLayout.value = Pt(a.layout), t.uFlowGridEnabled.value = +!!a.gridEnabled, t.uFlowGridSize.value = Math.max(Math.abs(a.gridSize), 1e-4), t.uFlowGridStrength.value = a.gridStrength, nn(t.uFlowGridMix.value, a), t.uFlowGridRotation.value.set(a.gridRotation?.x ?? 0, a.gridRotation?.y ?? 0, a.gridRotation?.z ?? 0), t.uFlowConveyorEnabled.value = +!!a.conveyorEnabled, t.uFlowConveyorSpeed.value = a.conveyorSpeed, t.uFlowConveyorDepth.value = a.conveyorDepth, an(t.uFlowConveyorAxis.value, a.conveyorRotation), t.uFlowConveyorDistanceNear.value = a.conveyorDistance?.near ?? a.distanceNear, t.uFlowConveyorDistanceFar.value = a.conveyorDistance?.far ?? a.distanceFar, t.uFlowRandomnessExponent.value = a.randomnessExponent, t.uFlowDistanceNear.value = a.distanceNear, t.uFlowDistanceFar.value = a.distanceFar, this.applyDensityFill(e.densityFill), this.syncShaderDefines(e)
    }
    syncShaderDefines(e) {
        let t = un(e, {
                fluidEnabled: this.fluidOptionEnabled
            }),
            n = dn(t);
        n !== this.lastShaderDefinesKey && (this.lastShaderDefinesKey = n, Object.assign(this.cloudMaterial.defines, t), Object.assign(this.densityFillMaterial.defines, t, {
            POINTCLOUD_USE_DENSITY_FILL: 1
        }), this.cloudMaterial.needsUpdate = !0, this.densityFillMaterial.needsUpdate = !0)
    }
    updatePointSizeResolutionMultiplier(e) {
        let t = sn(e);
        return t !== this.lastParticleScalarsKey && (this.lastParticleScalarsKey = t, this.pointSizeResolutionMultiplier = cn(this.textureSize, e)), this.pointSizeResolutionMultiplier
    }
    applyDensityFill(e) {
        let t = ln(e);
        if (t === this.lastDensityFillKey) return;
        this.lastDensityFillKey = t;
        let n = e ?? _,
            r = n.enabled;
        this.densityFillPoints.visible = r, this.densityFillMaterial.uniforms.uDensityFillJitter.value = r ? Math.max(n.jitter, 0) : 0, this.densityFillMaterial.uniforms.uDensityFillOpacityScale.value = r ? S.clamp(n.opacity, 0, 1) : 0, this.densityFillMaterial.uniforms.uDensityFillPointSizeScale.value = r ? Math.max(n.pointSizeScale, .001) : 1, this.applyBlendMode()
    }
    setActivePointCount(e) {
        let t = Math.max(1, Math.min(this.effectiveMaxPoints, Math.round(e)));
        t !== this.visiblePointCount && (this.points.geometry.setDrawRange(0, t), this.visiblePointCount = t)
    }
    #e = 1 / 0;
    get effectiveMaxPoints() {
        return Math.min(this.pointCount, this.#e)
    }
    setMaxActivePoints(e) {
        let t = e === void 0 ? 1 / 0 : Math.max(1, Math.min(v, Math.round(e)));
        t !== this.#e && (this.#e = t, this.visiblePointCount > this.effectiveMaxPoints && this.setActivePointCount(this.effectiveMaxPoints))
    }
    #t = 1;
    applyBehindContentQuality(e, t, n) {
        n !== void 0 && (this.#t = n), this.setDpr(this.#t * e), this.setRenderScale(e), this.setActivePointCount(this.effectiveMaxPoints * t)
    }
    updateParticleLayoutTargets(e) {
        let t = e ?? this.pointcloud;
        if (!t) return;
        let n = this.points.geometry.getAttribute(`position`);
        if (!n || !(n.array instanceof Float32Array)) return;
        let r = Ft(t.flow, this.pointCount);
        if (r === this.layoutTargetSignature) return;
        let i = It(n.array, this.pointCount, t.flow);
        this.layoutTargetAttribute = new C(i, 3).setUsage(w), this.layoutTargetSignature = r, this.points.geometry.setAttribute(`aLayoutTarget`, this.layoutTargetAttribute)
    }
    markActive() {
        if (!this.cloudInfo) return;
        let {
            id: e,
            asset: t,
            resolution: n,
            byteSize: r
        } = this.cloudInfo;
        globalThis.__PRETEXT_ACTIVE_CLOUD__ = {
            id: e,
            asset: t,
            resolution: `${n}`,
            byteSize: r
        }
    }
    update(e, t) {
        this.setTime(e), typeof t == `number` && this.setDpr(t)
    }
    dispose() {
        this.points.geometry.dispose(), this.cloudMaterial.dispose(), this.densityFillMaterial.dispose()
    }
};

function pn(e, t, n, r, i) {
    let a = Ot(e, t),
        o = new Float32Array(n * 3),
        s = new Float32Array(n * 3),
        c = new Float32Array(n),
        l = new Float32Array(n * 4),
        u = new Float32Array(n);
    for (let t = 0; t < n; t++) {
        let n = Dt(e, r),
            i = t * 3,
            u = n * 3;
        o[i] = a[u], o[i + 1] = a[u + 1], o[i + 2] = a[u + 2], s[i] = e.colors[u] ?? 1, s[i + 1] = e.colors[u + 1] ?? 1, s[i + 2] = e.colors[u + 2] ?? 1, c[t] = e.sizes?.[n] ?? .5;
        let d = t * 4;
        l[d] = Math.random(), l[d + 1] = Math.random(), l[d + 2] = Math.random(), l[d + 3] = Math.random()
    }
    let d = i ? It(o, n, i.flow) : o.slice(),
        f = new j;
    f.setAttribute(`position`, new C(o, 3)), f.setAttribute(`color`, new C(s, 3)), f.setAttribute(`aSize`, new C(c, 1)), f.setAttribute(`aRandom`, new C(l, 4));
    let p = new C(d, 3).setUsage(w),
        m = i ? Ft(i.flow, n) : ``;
    f.setAttribute(`aLayoutTarget`, p);
    let h = new C(u, 1).setUsage(w);
    return f.setAttribute(`aAnchorHighlight`, h), f.setDrawRange(0, n), {
        geometry: f,
        count: n,
        positions: o,
        anchorHighlightValues: u,
        anchorHighlightAttribute: h,
        layoutTargetAttribute: p,
        layoutTargetSignature: m
    }
}

function mn(e, t, n = t !== 0) {
    e.blending === t && e.transparent === n && e.depthWrite === !n || (e.blending = t, e.transparent = n, e.depthWrite = !n, e.needsUpdate = !0)
}

function hn(e) {
    let t = new ie({
        defines: {
            ...e.defines,
            POINTCLOUD_USE_DENSITY_FILL: 1
        },
        vertexShader: e.vertexShader,
        fragmentShader: e.fragmentShader,
        vertexColors: e.vertexColors,
        transparent: e.transparent,
        alphaTest: e.alphaTest,
        depthWrite: e.depthWrite,
        blending: e.blending,
        uniforms: {
            ...e.uniforms,
            uDensityFillJitter: {
                value: 0
            },
            uDensityFillPass: {
                value: tn
            },
            uDensityFillPointSizeScale: {
                value: 1
            },
            uDensityFillOpacityScale: {
                value: 0
            }
        }
    });
    return mn(t, 1, !0), t
}

function gn(e, t) {
    let n = e.externals ?? {},
        r = n.zeroVelocityTexture ?? ge(),
        i = e.dpr ?? (typeof window < `u` ? window.devicePixelRatio : 1),
        a = n.glowPositions ?? Array.from({
            length: Xt
        }, () => new x),
        o = n.glowPulseValues ?? new Float32Array(Xt),
        s = new Float32Array(4),
        c = new Float32Array(4),
        l = new Float32Array(4),
        p = new Float32Array(4).fill(1),
        m = new Float32Array(4).fill(1),
        g = Array.from({
            length: 4
        }, () => new A),
        _ = Array.from({
            length: 4
        }, () => new A),
        v = Array.from({
            length: 4
        }, () => new N),
        y = t?.caustics ?? {
            enabled: !0,
            strength: 1.4,
            scale: .75,
            power: 2.1,
            sparkle: 0,
            axisScale: {
                x: 1,
                y: 1,
                z: 2.4
            },
            speed: {
                x: .18,
                y: -.12,
                z: .08
            },
            color: {
                r: .95,
                g: .78,
                b: .42
            }
        },
        b = t?.flow ?? {
            enabled: !1,
            type: `curl`,
            layout: `off`,
            strength: 0,
            speed: 0,
            scale: 1,
            gridEnabled: !1,
            gridSize: .1,
            gridStrength: 0,
            gridMix: {
                x: 0,
                y: 0,
                z: 0
            },
            gridRotation: {
                x: 0,
                y: 0,
                z: 0
            },
            conveyorEnabled: !1,
            conveyorSpeed: 0,
            conveyorDepth: 1,
            conveyorRotation: {
                x: 0,
                y: 0,
                z: 0
            },
            conveyorDistance: {
                near: 0,
                far: 1
            },
            randomnessExponent: 1,
            distanceNear: 0,
            distanceFar: 1
        },
        S = e.fluidEnabled !== !1 && t?.fluid?.enabled ? t.fluid.influence : 0,
        C = cn(e.textureSize, t?.particleScalars),
        w = u.map(() => new x);
    return f(w, t?.colorCorrections), new ie({
        defines: un(t, e),
        vertexShader: Kt.replace(Jt, String(d)).replaceAll(Yt, `4`),
        fragmentShader: qt,
        vertexColors: !0,
        transparent: !1,
        alphaTest: 0,
        depthWrite: !0,
        blending: 0,
        uniforms: {
            uTime: {
                value: 0
            },
            uPointSize: {
                value: (t?.pointSize ?? .018) * C
            },
            uDistanceSizeInfluence: {
                value: t?.distanceSizeInfluence ?? .25
            },
            uDistanceSizeNear: {
                value: t?.distanceSizeNear ?? 4
            },
            uDistanceSizeFar: {
                value: t?.distanceSizeFar ?? 18
            },
            uDistanceSizeMax: {
                value: t?.distanceSizeMax ?? 1.5
            },
            uPointSizeScale: {
                value: e.pointSizeScale ?? 1
            },
            uDensityFillJitter: {
                value: 0
            },
            uDensityFillPass: {
                value: 0
            },
            uDensityFillPointSizeScale: {
                value: 1
            },
            uMaxPointSize: {
                value: on(t?.maxPointSize) * C
            },
            uOpacity: {
                value: 1
            },
            uLoadFade: {
                value: 1
            },
            uExposure: {
                value: 0
            },
            uDensityFillOpacityScale: {
                value: 1
            },
            uTransparentPoints: {
                value: 1
            },
            uSimplePoints: {
                value: 0
            },
            uRandomize: {
                value: new x
            },
            uCamFadeEnabled: {
                value: 0
            },
            uCamFadeNear: {
                value: 0
            },
            uCamFadeFar: {
                value: 1
            },
            uCausticsEnabled: {
                value: +!!y.enabled
            },
            uCausticsStrength: {
                value: y.strength
            },
            uCausticsScale: {
                value: y.scale
            },
            uCausticsPower: {
                value: y.power
            },
            uCausticsSparkle: {
                value: Math.max(y.sparkle, 0)
            },
            uCausticsAxisScale: {
                value: new x(y.axisScale.x, y.axisScale.y, y.axisScale.z)
            },
            uCausticsSpeed: {
                value: new x(y.speed.x, y.speed.y, y.speed.z)
            },
            uCausticsColor: {
                value: new oe().setRGB(y.color.r, y.color.g, y.color.b, O)
            },
            uDPR: {
                value: i
            },
            uRenderScale: {
                value: 1
            },
            uFlowEnabled: {
                value: +!!b.enabled
            },
            uFlowType: {
                value: vn(b.type)
            },
            uFlowStrength: {
                value: b.strength
            },
            uFlowSpeed: {
                value: b.speed
            },
            uFlowScale: {
                value: b.scale
            },
            uFlowGridLayout: {
                value: Pt(b.layout)
            },
            uFlowGridEnabled: {
                value: +!!b.gridEnabled
            },
            uFlowGridSize: {
                value: b.gridSize
            },
            uFlowGridStrength: {
                value: b.gridStrength
            },
            uFlowGridMix: {
                value: nn(new x, b)
            },
            uFlowGridRotation: {
                value: new x(b.gridRotation?.x ?? 0, b.gridRotation?.y ?? 0, b.gridRotation?.z ?? 0)
            },
            uFlowConveyorEnabled: {
                value: +!!b.conveyorEnabled
            },
            uFlowConveyorSpeed: {
                value: b.conveyorSpeed
            },
            uFlowConveyorDepth: {
                value: b.conveyorDepth
            },
            uFlowConveyorAxis: {
                value: an(new x, b.conveyorRotation)
            },
            uFlowConveyorDistanceNear: {
                value: b.conveyorDistance?.near ?? b.distanceNear
            },
            uFlowConveyorDistanceFar: {
                value: b.conveyorDistance?.far ?? b.distanceFar
            },
            uFlowRandomnessExponent: {
                value: b.randomnessExponent
            },
            uFlowDistanceNear: {
                value: b.distanceNear
            },
            uFlowDistanceFar: {
                value: b.distanceFar
            },
            uFluidVelocity: {
                value: r
            },
            uFluidInfluence: {
                value: S
            },
            uTransitionYOffset: {
                value: 0
            },
            uTransitionProgress: {
                value: 1
            },
            uTransitionRestProgress: {
                value: .5
            },
            uTransitionPow: {
                value: 10
            },
            uIntroColorMix: {
                value: e.introColorMix ?? 0
            },
            uSelectiveAmount: {
                value: h(t?.colorCorrections)
            },
            uSelectiveAdj: {
                value: w
            },
            uAnchorHighlightOpacity: {
                value: 0
            },
            uAnchorHighlightScale: {
                value: 5
            },
            uAnchorGlowPositions: {
                value: a
            },
            uAnchorGlowRadius: {
                value: .13
            },
            uAnchorGlowStrength: {
                value: .22
            },
            uAnchorGlowPulse: {
                value: o
            },
            uAnchorGlowStrumStrength: {
                value: 1.05
            },
            uSdfShapeCount: {
                value: 0
            },
            uSdfShapeType: {
                value: s
            },
            uSdfShapeStrength: {
                value: c
            },
            uSdfShapeFalloff: {
                value: l
            },
            uSdfShapeGradient: {
                value: p
            },
            uSdfShapePolarity: {
                value: m
            },
            uSdfShapeParams: {
                value: g
            },
            uSdfShapeBounds: {
                value: _
            },
            uSdfShapeInverseMatrices: {
                value: v
            }
        }
    })
}

function _n(e) {
    return e === `sphere` ? 1 : e === `box` ? 2 : e === `torus` ? 3 : e === `cylinder` ? 4 : e === `octahedron` ? 5 : e === `dodecahedron` ? 6 : 0
}

function vn(e) {
    return e === `rise` ? 3 : 2
}
var Q = n(),
    yn = 1080,
    bn = 1.2,
    xn = .05,
    Sn = 12e3;

function Cn({
    isCriticalLoadingHandle: e,
    shouldLoad: t,
    renderTier: n
}) {
    return e && (!t || n === null)
}

function wn(e) {
    return !e
}

function Tn({
    error: e,
    phase: t,
    fallbackAssetTelemetry: n,
    id: r,
    handle: i,
    renderTier: a,
    elapsedMs: o,
    loadingHandle: s,
    isCriticalLoadingHandle: c,
    visibilityTelemetry: l,
    browserAssetTelemetry: u
}) {
    let d = H(e),
        f = e instanceof Error ? e.message : String(e),
        p = {
            phase: t,
            ...n,
            ...d,
            id: r,
            handle: i,
            renderTier: a,
            elapsedMs: o,
            loadingHandle: s,
            isCriticalLoadingHandle: c,
            ...l,
            ...u
        };
    return d.phase === `mdpc-unsupported-decompression-stream` || f === `Unsupported MDPC deflate stream: DecompressionStream('deflate') is unavailable in this browser` ? {
        kind: `component-telemetry`,
        targetName: `pointcloud_mdpc_unsupported_deflate`,
        parentName: `pointcloud_loader`,
        metadata: {
            source: `PointCloud.load`,
            ...p,
            phase: d.phase ?? `mdpc-unsupported-decompression-stream`,
            message: f
        }
    } : {
        kind: `report-error`,
        metadata: p
    }
}

function En(e) {
    let {
        id: t,
        pointcloud: n,
        timeScale: o = 1,
        visibility: u,
        pointSizeScale: d,
        position: f,
        rotation: h,
        scale: _,
        opacity: v,
        exposure: x,
        transparent: C,
        blendMode: w,
        simplePoints: ee,
        randomize: T,
        cameraFade: te,
        introColorMix: E,
        behindSpeed: ne = 1,
        reduceQualityBehind: re = !0,
        behindOffset: ie = 0,
        motion: ae,
        fluidVelocityRef: oe,
        onLoad: D,
        onError: O,
        loadingHandle: k,
        renderDpr: A,
        renderScale: ce = 1,
        parentObject: j,
        children: M
    } = e, N = P(e => e.gl), F = P(e => e.scene), _e = P(e => e.camera), I = P(e => e.size), ve = P(e => e.viewport.dpr), ye = r(e => e.trackers), be = r(e => e.pageViewToken), xe = (0, B.useRef)({
        trackers: ye,
        pageViewToken: be,
        size: I
    });
    xe.current = {
        trackers: ye,
        pageViewToken: be,
        size: I
    };
    let L = (0, B.useRef)(null),
        Se = (0, B.useRef)(j);
    Se.current = j, (0, B.useEffect)(() => {
        let e = L.current;
        e && (j ?? F).add(e)
    }, [j, L, F]);
    let Ce = (0, B.useContext)(y)?.handle,
        R = b(),
        we = c(e => k ? e.criticalHandles.includes(k) : !1),
        z = s(),
        V = (0, B.useRef)(null),
        H = (0, B.useRef)(!1);
    (0, B.useEffect)(() => {
        if (!Cn({
                isCriticalLoadingHandle: we,
                shouldLoad: R,
                renderTier: z
            })) {
            V.current = null, H.current = !1;
            return
        }
        if (V.current ??= me(), !wn(H.current)) return;
        let e = de(Sn, V.current, e => {
            if (!wn(H.current)) return;
            H.current = !0;
            let n = R ? `render-tier timeout` : `sticky-mount timeout`,
                r = Error(`PointCloud startup ${n} after ${Sn}ms`);
            a(r, `PointCloud.startup`, {
                id: t,
                loadingHandle: k,
                reason: n,
                shouldLoad: R,
                renderTier: z,
                ...e
            }), O?.(r)
        });
        return () => e.clear()
    }, [t, we, k, O, z, R]), (0, B.useEffect)(() => {
        if (!R || z === null) return;
        let e = !1,
            r = null,
            i = !1,
            o = `load`,
            s = performance.now(),
            l = () => {
                r &&= (r.removeFromParent(), r.dispose(), L.current === r && (L.current = null), null)
            };
        return fn.loadFromPointcloud({
            ...n,
            id: t
        }, z, {
            dpr: ve,
            pointSizeScale: d,
            introColorMix: E
        }).then(async ({
            pointcloud: t
        }) => {
            if (e) {
                t.dispose();
                return
            }
            r = t, o = `warmup`;
            let n = new se;
            n.add(t);
            try {
                await pe(async () => {
                    if (e) return;
                    let t = N.getRenderTarget(),
                        r = N.autoClear,
                        i = new le(2, 2);
                    try {
                        await N.compileAsync(n, _e), N.setRenderTarget(i), N.autoClear = !0, N.render(n, _e)
                    } finally {
                        N.autoClear = r, N.setRenderTarget(t), i.dispose()
                    }
                }, {
                    visibilityAwareWatchdog: !0
                })
            } finally {
                i = !0
            }
            if (e) {
                l();
                return
            }
            t.removeFromParent(), (Se.current ?? F).add(t), L.current = t, t.markActive(), D?.(t)
        }).catch(r => {
            if (i = !0, l(), e) return;
            let u = c.getState().criticalHandles,
                d = {};
            try {
                let e = Pe(n.sources, z);
                d = {
                    assetUrl: e.asset,
                    textureSize: e.textureSize,
                    preferredResolution: e.preferredResolution
                }
            } catch {}
            let f = Ee(s),
                p = Tn({
                    error: r,
                    phase: o,
                    fallbackAssetTelemetry: d,
                    id: t,
                    handle: Ce,
                    renderTier: z,
                    elapsedMs: f,
                    loadingHandle: k,
                    isCriticalLoadingHandle: k ? u.includes(k) : void 0,
                    visibilityTelemetry: fe(r),
                    browserAssetTelemetry: Te()
                });
            if (p.kind === `component-telemetry`) {
                let {
                    trackers: e,
                    pageViewToken: t,
                    size: n
                } = xe.current;
                he({
                    trackers: e,
                    pageViewToken: t,
                    enabled: !0,
                    targetName: p.targetName,
                    parentName: p.parentName,
                    width: n.width,
                    height: n.height,
                    duration: f,
                    metadata: p.metadata
                })
            } else a(r, `PointCloud.load`, p.metadata);
            O?.(r)
        }), () => {
            e = !0, i && l()
        }
    }, [R, z, t, n.sources]);
    let De = (0, B.useRef)(0),
        U = (0, B.useRef)(0),
        W = (0, B.useRef)(null);
    return ue((e, t) => {
        let r = L.current;
        if (!r) return;
        let a = ae?.current?.transition ?? 0,
            s = typeof u == `number` && u <= 0 || a <= -1 || a >= 1;
        W.current !== r && (W.current = r, U.current = 0);
        let c = typeof u == `number` && u <= 0 || a >= 1;
        U.current = je(U.current, t, {
            durationSeconds: bn,
            offscreen: c,
            reducedMotion: i.getState().preferReducedMotion === !0
        });
        let y = Ae(U.current);
        if (r.setLoadFade(y), typeof u == `number` && (r.visible = u > 0), f && r.position.set(f[0], f[1], f[2]), h && r.rotation.set(S.degToRad(h[0]), S.degToRad(h[1]), S.degToRad(h[2])), typeof _ == `number` && r.scale.setScalar(Math.max(_, .001)), typeof d == `number` && r.setPointSizeScale(d), typeof v == `number` && r.setOpacity(v), typeof x == `number` && r.setExposure(x), w && r.setBlendMode(w), typeof C == `boolean` && r.setTransparent(C), typeof ee == `boolean` && r.setSimplePoints(ee), T) {
            let e = xn * (1 - y);
            e === 0 ? r.setRandomize(T) : r.setRandomize([T[0] + e, T[1] + e, T[2] + e])
        }
        te && r.setCameraFade(te), typeof E == `number` && r.setIntroColorMix(E), r.updateParticleLayoutTargets(n), r.applyDynamicUniforms(n);
        let b = Math.max(1, I.height) / yn,
            D = ae?.current?.screenOffset ?? 0,
            O = p(D),
            se = l(D, ie);
        if (r.setMaxActivePoints(n.maxPoints), r.applyBehindContentQuality(g(se, ce, re), m(se, re), (A ?? ve) * b), s) return;
        let k = Math.min(t, 1 / 30),
            j = 1 - O * (1 - ne),
            M = i.getState().preferReducedMotion ? ke : 1;
        De.current += k * o * j * M, r.setTime(De.current), r.setFluidVelocity(oe?.current ?? ge()), r.setFluidInfluence(n.fluid.enabled ? n.fluid.influence * o : 0)
    }), M ? (0, Q.jsx)(Q.Fragment, {
        children: M
    }) : null
}
var $ = 0,
    Dn = new x(1, 1, 1);

function On({
    pointCloudRef: e,
    pointCloudVersion: t,
    sdfs: n,
    showHelpers: r = !1,
    children: i
}) {
    let a = o(e => e.tier >= 2),
        s = (0, B.useRef)(null),
        c = (0, B.useRef)($),
        l = (0, B.useRef)([]),
        u = (0, B.useRef)({
            activeShapes: [],
            cloudInverseMatrix: new N,
            sdfMatrix: new N,
            unscaledSdfMatrix: new N,
            position: new x,
            quaternion: new ne,
            scale: new x(1, 1, 1),
            shapes: Array.from({
                length: 4
            }, () => ({
                type: `box`,
                inverseMatrix: new N,
                params: new A,
                bounds: new A,
                strength: 0,
                falloff: 0,
                gradient: 1
            }))
        }),
        [d, f] = (0, B.useState)(null);
    (0, B.useEffect)(() => {
        f(e.current)
    }, [e, t]);
    let p = (0, B.useCallback)(e => (l.current.push(e), () => {
            l.current = l.current.filter(t => t !== e)
        }), []),
        m = (0, B.useMemo)(() => ({
            registerSdf: p
        }), [p]);
    ue(() => {
        let t = e.current,
            n = s.current;
        if (n !== t && (n?.setSdfShapes([]), s.current = t, c.current = $), !t) return;
        if (!a) {
            c.current > $ && (t.setSdfShapes([]), c.current = $);
            return
        }
        let r = l.current;
        if (!r.some(({
                objectRef: e,
                sdfRef: t
            }) => e.current && t.current.enabled !== !1)) {
            c.current > $ && (t.setSdfShapes([]), c.current = $);
            return
        }
        let i = u.current,
            o = i.activeShapes;
        o.length = 0, t.updateWorldMatrix(!0, !1), i.cloudInverseMatrix.copy(t.matrixWorld).invert();
        for (let {
                objectRef: e,
                sdfRef: t
            }
            of r) {
            if (o.length >= 4) break;
            let n = e.current,
                r = t.current;
            if (!n || r.enabled === !1) continue;
            n.updateWorldMatrix(!0, !1), i.sdfMatrix.multiplyMatrices(i.cloudInverseMatrix, n.matrixWorld);
            let a = i.shapes[o.length];
            kn(r, a, i.sdfMatrix, i) && o.push(a)
        }
        o.length === $ && c.current === $ || (t.setSdfShapes(o), c.current = o.length)
    }), (0, B.useEffect)(() => () => {
        s.current?.setSdfShapes([]), c.current = $
    }, []);
    let h = d && n?.length ? F((0, Q.jsx)(Q.Fragment, {
        children: n.map((e, t) => (0, Q.jsx)(we, {
            sdf: e,
            showHelper: r
        }, e.id ?? t))
    }), d) : null;
    return (0, Q.jsxs)(Se.Provider, {
        value: a ? m : null,
        children: [h, i]
    })
}

function kn(e, t, n, r) {
    let i = e.strength ?? .35,
        a = e.falloff ?? .35,
        o = e.gradient ?? 1;
    return n.decompose(r.position, r.quaternion, r.scale), !An(r.position) || !jn(r.quaternion) || !An(r.scale) ? !1 : (t.type = Nn(e.type), e.type === `cube` ? (t.params.set(R * Mn(r.scale.x), R * Mn(r.scale.y), R * Mn(r.scale.z), 0), In(r.position, t.params, a, t.bounds), r.unscaledSdfMatrix.compose(r.position, r.quaternion, Dn), t.inverseMatrix.copy(r.unscaledSdfMatrix).invert()) : (Pn(e.type, t.params), Fn(e.type, r.position, r.scale, a, t.bounds), t.inverseMatrix.copy(n).invert()), t.strength = i, t.falloff = a, t.gradient = o, t.invert = e.invert ?? !1, !0)
}

function An(e) {
    return Number.isFinite(e.x) && Number.isFinite(e.y) && Number.isFinite(e.z)
}

function jn(e) {
    return Number.isFinite(e.x) && Number.isFinite(e.y) && Number.isFinite(e.z) && Number.isFinite(e.w)
}

function Mn(e) {
    return Math.max(xe, Math.abs(e))
}

function Nn(e) {
    return e === `cube` ? `box` : e === `dodeca` ? `dodecahedron` : e
}

function Pn(e, t) {
    if (e === `torus`) {
        t.set(Ce, L, 0, 0);
        return
    }
    if (e === `cylinder`) {
        t.set(_e, be, 0, 0);
        return
    }
    if (e === `octahedron`) {
        t.set(z, 0, 0, 0);
        return
    }
    if (e === `dodeca`) {
        t.set(I, 0, 0, 0);
        return
    }
    if (e === `sphere`) {
        t.set(ve, 0, 0, 0);
        return
    }
    t.set(R, R, R, 0)
}

function Fn(e, t, n, r, i) {
    let a = Math.max(n.x, n.y, n.z),
        o = (ye(e) + Math.max(0, r)) * a;
    i.set(t.x, t.y, t.z, o)
}

function In(e, t, n, r) {
    let i = Math.hypot(t.x, t.y, t.z) + Math.max(0, n);
    r.set(e.x, e.y, e.z, i)
}
export {
    je as a, V as c, Ee as d, We as i, H as l, En as n, Ae as o, fn as r, Oe as s, On as t, Te as u
};
//# sourceMappingURL=SdfRegistry-CLZaosgv.js.map