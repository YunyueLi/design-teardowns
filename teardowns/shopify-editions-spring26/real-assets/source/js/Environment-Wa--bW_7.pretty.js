import {
    i as e
} from "./rolldown-runtime-aKtaBQYM.js";
import {
    t
} from "./react-Dvkprh6u.js";
import {
    $a as n,
    Ft as r,
    Hn as i,
    In as a,
    Ja as o,
    Jt as s,
    Kn as c,
    Li as l,
    N as u,
    Oa as d,
    Qi as f,
    Rn as p,
    Rt as m,
    Tr as h,
    V as g,
    Wa as _,
    Wn as v,
    Yi as y,
    Zi as b,
    Zr as x,
    Zt as S,
    ft as C,
    ia as w,
    ir as T,
    kr as E,
    mt as D,
    nt as O,
    pt as k,
    rr as A,
    so as j,
    un as M
} from "./three.core-DVcoLpfz.js";
import {
    D as ee,
    E as te,
    b as N,
    d as P,
    g as F,
    l as I,
    s as L,
    v as R
} from "./events-760a1017.esm-DCPtHAo6.js";
import {
    t as ne
} from "./extends-CvVTau-c.js";
import {
    n as re
} from "./Gltf-yU3CSC93.js";
var z = Uint8Array,
    B = Uint16Array,
    ie = Uint32Array,
    ae = new z([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    oe = new z([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    se = new z([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    ce = function(e, t) {
        for (var n = new B(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
        for (var i = new ie(n[30]), r = 1; r < 30; ++r)
            for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
        return [n, i]
    },
    le = ce(ae, 2),
    ue = le[0],
    de = le[1];
ue[28] = 258, de[258] = 28;
var fe = ce(oe, 0),
    pe = fe[0];
fe[1];
for (var me = new B(32768), V = 0; V < 32768; ++V) {
    var H = (V & 43690) >>> 1 | (V & 21845) << 1;
    H = (H & 52428) >>> 2 | (H & 13107) << 2, H = (H & 61680) >>> 4 | (H & 3855) << 4, me[V] = ((H & 65280) >>> 8 | (H & 255) << 8) >>> 1
}
for (var U = (function(e, t, n) {
        for (var r = e.length, i = 0, a = new B(t); i < r; ++i) ++a[e[i] - 1];
        var o = new B(t);
        for (i = 0; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
        var s;
        if (n) {
            s = new B(1 << t);
            var c = 15 - t;
            for (i = 0; i < r; ++i)
                if (e[i])
                    for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[me[d] >>> c] = l
        } else
            for (s = new B(r), i = 0; i < r; ++i) e[i] && (s[i] = me[o[e[i] - 1]++] >>> 15 - e[i]);
        return s
    }), W = new z(288), V = 0; V < 144; ++V) W[V] = 8;
for (var V = 144; V < 256; ++V) W[V] = 9;
for (var V = 256; V < 280; ++V) W[V] = 7;
for (var V = 280; V < 288; ++V) W[V] = 8;
for (var G = new z(32), V = 0; V < 32; ++V) G[V] = 5;
var K = U(W, 9, 1),
    he = U(G, 5, 1),
    q = function(e) {
        for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
        return t
    },
    J = function(e, t, n) {
        var r = t / 8 | 0;
        return (e[r] | e[r + 1] << 8) >> (t & 7) & n
    },
    ge = function(e, t) {
        var n = t / 8 | 0;
        return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7)
    },
    _e = function(e) {
        return (e / 8 | 0) + (e & 7 && 1)
    },
    ve = function(e, t, n) {
        (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length);
        var r = new(e instanceof B ? B : e instanceof ie ? ie : z)(n - t);
        return r.set(e.subarray(t, n)), r
    },
    ye = function(e, t, n) {
        var r = e.length;
        if (!r || n && !n.l && r < 5) return t || new z(0);
        var i = !t || n,
            a = !n || n.i;
        n ||= {}, t ||= new z(r * 3);
        var o = function(e) {
                var n = t.length;
                if (e > n) {
                    var r = new z(Math.max(n * 2, e));
                    r.set(t), t = r
                }
            },
            s = n.f || 0,
            c = n.p || 0,
            l = n.b || 0,
            u = n.l,
            d = n.d,
            f = n.m,
            p = n.n,
            m = r * 8;
        do {
            if (!u) {
                n.f = s = J(e, c, 1);
                var h = J(e, c + 1, 3);
                if (c += 3, !h) {
                    var g = _e(c) + 4,
                        _ = e[g - 4] | e[g - 3] << 8,
                        v = g + _;
                    if (v > r) {
                        if (a) throw `unexpected EOF`;
                        break
                    }
                    i && o(l + _), t.set(e.subarray(g, v), l), n.b = l += _, n.p = c = v * 8;
                    continue
                } else if (h == 1) u = K, d = he, f = 9, p = 5;
                else if (h == 2) {
                    var y = J(e, c, 31) + 257,
                        b = J(e, c + 10, 15) + 4,
                        x = y + J(e, c + 5, 31) + 1;
                    c += 14;
                    for (var S = new z(x), C = new z(19), w = 0; w < b; ++w) C[se[w]] = J(e, c + w * 3, 7);
                    c += b * 3;
                    for (var T = q(C), E = (1 << T) - 1, D = U(C, T, 1), w = 0; w < x;) {
                        var O = D[J(e, c, E)];
                        c += O & 15;
                        var g = O >>> 4;
                        if (g < 16) S[w++] = g;
                        else {
                            var k = 0,
                                A = 0;
                            for (g == 16 ? (A = 3 + J(e, c, 3), c += 2, k = S[w - 1]) : g == 17 ? (A = 3 + J(e, c, 7), c += 3) : g == 18 && (A = 11 + J(e, c, 127), c += 7); A--;) S[w++] = k
                        }
                    }
                    var j = S.subarray(0, y),
                        M = S.subarray(y);
                    f = q(j), p = q(M), u = U(j, f, 1), d = U(M, p, 1)
                } else throw `invalid block type`;
                if (c > m) {
                    if (a) throw `unexpected EOF`;
                    break
                }
            }
            i && o(l + 131072);
            for (var ee = (1 << f) - 1, te = (1 << p) - 1, N = c;; N = c) {
                var k = u[ge(e, c) & ee],
                    P = k >>> 4;
                if (c += k & 15, c > m) {
                    if (a) throw `unexpected EOF`;
                    break
                }
                if (!k) throw `invalid length/literal`;
                if (P < 256) t[l++] = P;
                else if (P == 256) {
                    N = c, u = null;
                    break
                } else {
                    var F = P - 254;
                    if (P > 264) {
                        var w = P - 257,
                            I = ae[w];
                        F = J(e, c, (1 << I) - 1) + ue[w], c += I
                    }
                    var L = d[ge(e, c) & te],
                        R = L >>> 4;
                    if (!L) throw `invalid distance`;
                    c += L & 15;
                    var M = pe[R];
                    if (R > 3) {
                        var I = oe[R];
                        M += ge(e, c) & (1 << I) - 1, c += I
                    }
                    if (c > m) {
                        if (a) throw `unexpected EOF`;
                        break
                    }
                    i && o(l + 131072);
                    for (var ne = l + F; l < ne; l += 4) t[l] = t[l - M], t[l + 1] = t[l + 1 - M], t[l + 2] = t[l + 2 - M], t[l + 3] = t[l + 3 - M];
                    l = ne
                }
            }
            n.l = u, n.p = N, n.b = l, u && (s = 1, n.m = f, n.d = d, n.n = p)
        } while (!s);
        return l == t.length ? t : ve(t, 0, l)
    },
    be = new z(0),
    xe = function(e) {
        if ((e[0] & 15) != 8 || e[0] >>> 4 > 7 || (e[0] << 8 | e[1]) % 31) throw `invalid zlib data`;
        if (e[1] & 32) throw `invalid zlib data: preset dictionaries not supported`
    };

function Se(e, t) {
    return ye((xe(e), e.subarray(2, -4)), t)
}
var Ce = typeof TextDecoder < `u` && new TextDecoder;
try {
    Ce.decode(be, {
        stream: !0
    })
} catch {}
var we = e => e && e.isCubeTexture,
    Te = class extends A {
        constructor(e, t) {
            let n = we(e),
                r = ((n ? e.image[0]?.width : e.image.width) ?? 1024) / 4,
                i = Math.floor(Math.log2(r)),
                a = 2 ** i,
                o = 3 * Math.max(a, 112),
                s = 4 * a,
                c = [n ? `#define ENVMAP_TYPE_CUBE` : ``, `#define CUBEUV_TEXEL_WIDTH ${1/o}`, `#define CUBEUV_TEXEL_HEIGHT ${1/s}`, `#define CUBEUV_MAX_MIP ${i}.0`].join(`
`) + `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${re>=154?`colorspace_fragment`:`encodings_fragment`}>
        }
        `,
                l = {
                    map: {
                        value: e
                    },
                    height: {
                        value: t?.height || 15
                    },
                    radius: {
                        value: t?.radius || 100
                    }
                },
                u = new S(1, 16),
                d = new f({
                    uniforms: l,
                    fragmentShader: c,
                    vertexShader: `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,
                    side: 2
                });
            super(u, d)
        }
        set radius(e) {
            this.material.uniforms.radius.value = e
        }
        get radius() {
            return this.material.uniforms.radius.value
        }
        set height(e) {
            this.material.uniforms.height.value = e
        }
        get height() {
            return this.material.uniforms.height.value
        }
    },
    Ee = class extends k {
        constructor(e) {
            super(e), this.type = s
        }
        parse(e) {
            let t = function(e, t) {
                    switch (e) {
                        case 1:
                            throw Error(`THREE.RGBELoader: Read Error: ` + (t || ``));
                        case 2:
                            throw Error(`THREE.RGBELoader: Write Error: ` + (t || ``));
                        case 3:
                            throw Error(`THREE.RGBELoader: Bad File Format: ` + (t || ``));
                        default:
                        case 4:
                            throw Error(`THREE.RGBELoader: Memory Error: ` + (t || ``))
                    }
                },
                n = function(e, t, n) {
                    t ||= 1024;
                    let r = e.pos,
                        i = -1,
                        a = 0,
                        o = ``,
                        s = String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128)));
                    for (; 0 > (i = s.indexOf(`
`)) && a < t && r < e.byteLength;) o += s, a += s.length, r += 128, s += String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128)));
                    return -1 < i ? (!1 !== n && (e.pos += a + i + 1), o + s.slice(0, i)) : !1
                },
                r = function(e) {
                    let r = /^#\?(\S+)/,
                        i = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
                        a = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
                        o = /^\s*FORMAT=(\S+)\s*$/,
                        s = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
                        c = {
                            valid: 0,
                            string: ``,
                            comments: ``,
                            programtype: `RGBE`,
                            format: ``,
                            gamma: 1,
                            exposure: 1,
                            width: 0,
                            height: 0
                        },
                        l, u;
                    for ((e.pos >= e.byteLength || !(l = n(e))) && t(1, `no header found`), (u = l.match(r)) || t(3, `bad initial token`), c.valid |= 1, c.programtype = u[1], c.string += l + `
`; l = n(e), !1 !== l;) {
                        if (c.string += l + `
`, l.charAt(0) === `#`) {
                            c.comments += l + `
`;
                            continue
                        }
                        if ((u = l.match(i)) && (c.gamma = parseFloat(u[1])), (u = l.match(a)) && (c.exposure = parseFloat(u[1])), (u = l.match(o)) && (c.valid |= 2, c.format = u[1]), (u = l.match(s)) && (c.valid |= 4, c.height = parseInt(u[1], 10), c.width = parseInt(u[2], 10)), c.valid & 2 && c.valid & 4) break
                    }
                    return c.valid & 2 || t(3, `missing format specifier`), c.valid & 4 || t(3, `missing image size specifier`), c
                },
                i = function(e, n, r) {
                    let i = n;
                    if (i < 8 || i > 32767 || e[0] !== 2 || e[1] !== 2 || e[2] & 128) return new Uint8Array(e);
                    i !== (e[2] << 8 | e[3]) && t(3, `wrong scanline width`);
                    let a = new Uint8Array(4 * n * r);
                    a.length || t(4, `unable to allocate buffer space`);
                    let o = 0,
                        s = 0,
                        c = 4 * i,
                        l = new Uint8Array(4),
                        u = new Uint8Array(c),
                        d = r;
                    for (; d > 0 && s < e.byteLength;) {
                        s + 4 > e.byteLength && t(1), l[0] = e[s++], l[1] = e[s++], l[2] = e[s++], l[3] = e[s++], (l[0] != 2 || l[1] != 2 || (l[2] << 8 | l[3]) != i) && t(3, `bad rgbe scanline format`);
                        let n = 0,
                            r;
                        for (; n < c && s < e.byteLength;) {
                            r = e[s++];
                            let i = r > 128;
                            if (i && (r -= 128), (r === 0 || n + r > c) && t(3, `bad scanline data`), i) {
                                let t = e[s++];
                                for (let e = 0; e < r; e++) u[n++] = t
                            } else u.set(e.subarray(s, s + r), n), n += r, s += r
                        }
                        let f = i;
                        for (let e = 0; e < f; e++) {
                            let t = 0;
                            a[o] = u[e + t], t += i, a[o + 1] = u[e + t], t += i, a[o + 2] = u[e + t], t += i, a[o + 3] = u[e + t], o += 4
                        }
                        d--
                    }
                    return a
                },
                a = function(e, t, n, r) {
                    let i = 2 ** (e[t + 3] - 128) / 255;
                    n[r + 0] = e[t + 0] * i, n[r + 1] = e[t + 1] * i, n[r + 2] = e[t + 2] * i, n[r + 3] = 1
                },
                o = function(e, t, n, r) {
                    let i = 2 ** (e[t + 3] - 128) / 255;
                    n[r + 0] = D.toHalfFloat(Math.min(e[t + 0] * i, 65504)), n[r + 1] = D.toHalfFloat(Math.min(e[t + 1] * i, 65504)), n[r + 2] = D.toHalfFloat(Math.min(e[t + 2] * i, 65504)), n[r + 3] = D.toHalfFloat(1)
                },
                c = new Uint8Array(e);
            c.pos = 0;
            let l = r(c),
                u = l.width,
                d = l.height,
                f = i(c.subarray(c.pos), u, d),
                p, h, g;
            switch (this.type) {
                case m:
                    g = f.length / 4;
                    let e = new Float32Array(g * 4);
                    for (let t = 0; t < g; t++) a(f, t * 4, e, t * 4);
                    p = e, h = m;
                    break;
                case s:
                    g = f.length / 4;
                    let t = new Uint16Array(g * 4);
                    for (let e = 0; e < g; e++) o(f, e * 4, t, e * 4);
                    p = t, h = s;
                    break;
                default:
                    throw Error(`THREE.RGBELoader: Unsupported type: ` + this.type)
            }
            return {
                width: u,
                height: d,
                data: p,
                header: l.string,
                gamma: l.gamma,
                exposure: l.exposure,
                type: h
            }
        }
        setDataType(e) {
            return this.type = e, this
        }
        load(e, t, n, r) {
            function i(e, n) {
                switch (e.type) {
                    case m:
                    case s:
                        `colorSpace` in e ? e.colorSpace = `srgb-linear` : e.encoding = 3e3, e.minFilter = a, e.magFilter = a, e.generateMipmaps = !1, e.flipY = !0;
                        break
                }
                t && t(e, n)
            }
            return super.load(e, i, n, r)
        }
    },
    De = re >= 152,
    Oe = class extends k {
        constructor(e) {
            super(e), this.type = s
        }
        parse(e) {
            let t = 65536,
                n = 8192,
                r = 65537,
                i = 16384,
                a = i - 1,
                o = 65535,
                c = 2.7182818 ** 2.2;

            function u(e, n) {
                for (var r = 0, i = 0; i < t; ++i)(i == 0 || e[i >> 3] & 1 << (i & 7)) && (n[r++] = i);
                for (var a = r - 1; r < t;) n[r++] = 0;
                return a
            }

            function d(e) {
                for (var t = 0; t < i; t++) e[t] = {}, e[t].len = 0, e[t].lit = 0, e[t].p = null
            }
            let f = {
                l: 0,
                c: 0,
                lc: 0
            };

            function p(e, t, n, r, i) {
                for (; n < e;) t = t << 8 | U(r, i), n += 8;
                n -= e, f.l = t >> n & (1 << e) - 1, f.c = t, f.lc = n
            }
            let h = Array(59);

            function g(e) {
                for (var t = 0; t <= 58; ++t) h[t] = 0;
                for (var t = 0; t < r; ++t) h[e[t]] += 1;
                for (var n = 0, t = 58; t > 0; --t) {
                    var i = n + h[t] >> 1;
                    h[t] = n, n = i
                }
                for (var t = 0; t < r; ++t) {
                    var a = e[t];
                    a > 0 && (e[t] = a | h[a]++ << 6)
                }
            }

            function _(e, t, n, r, i, a, o) {
                for (var s = n, c = 0, l = 0; i <= a; i++) {
                    if (s.value - n.value > r) return !1;
                    p(6, c, l, e, s);
                    var u = f.l;
                    if (c = f.c, l = f.lc, o[i] = u, u == 63) {
                        if (s.value - n.value > r) throw `Something wrong with hufUnpackEncTable`;
                        p(8, c, l, e, s);
                        var d = f.l + 6;
                        if (c = f.c, l = f.lc, i + d > a + 1) throw `Something wrong with hufUnpackEncTable`;
                        for (; d--;) o[i++] = 0;
                        i--
                    } else if (u >= 59) {
                        var d = u - 59 + 2;
                        if (i + d > a + 1) throw `Something wrong with hufUnpackEncTable`;
                        for (; d--;) o[i++] = 0;
                        i--
                    }
                }
                g(o)
            }

            function v(e) {
                return e & 63
            }

            function y(e) {
                return e >> 6
            }

            function b(e, t, n, r) {
                for (; t <= n; t++) {
                    var i = y(e[t]),
                        a = v(e[t]);
                    if (i >> a) throw `Invalid table entry`;
                    if (a > 14) {
                        var o = r[i >> a - 14];
                        if (o.len) throw `Invalid table entry`;
                        if (o.lit++, o.p) {
                            var s = o.p;
                            o.p = Array(o.lit);
                            for (var c = 0; c < o.lit - 1; ++c) o.p[c] = s[c]
                        } else o.p = [, ];
                        o.p[o.lit - 1] = t
                    } else if (a)
                        for (var l = 0, c = 1 << 14 - a; c > 0; c--) {
                            var o = r[(i << 14 - a) + l];
                            if (o.len || o.p) throw `Invalid table entry`;
                            o.len = a, o.lit = t, l++
                        }
                }
                return !0
            }
            let S = {
                c: 0,
                lc: 0
            };

            function C(e, t, n, r) {
                e = e << 8 | U(n, r), t += 8, S.c = e, S.lc = t
            }
            let w = {
                c: 0,
                lc: 0
            };

            function T(e, t, n, r, i, a, o, s, c, l) {
                if (e == t) {
                    r < 8 && (C(n, r, i, o), n = S.c, r = S.lc), r -= 8;
                    var u = n >> r,
                        u = new Uint8Array([u])[0];
                    if (c.value + u > l) return !1;
                    for (var d = s[c.value - 1]; u-- > 0;) s[c.value++] = d
                } else if (c.value < l) s[c.value++] = e;
                else return !1;
                w.c = n, w.lc = r
            }

            function E(e) {
                return e & 65535
            }

            function O(e) {
                var t = E(e);
                return t > 32767 ? t - 65536 : t
            }
            let k = {
                a: 0,
                b: 0
            };

            function A(e, t) {
                var n = O(e),
                    r = O(t),
                    i = n + (r & 1) + (r >> 1),
                    a = i,
                    o = i - r;
                k.a = a, k.b = o
            }

            function j(e, t) {
                var n = E(e),
                    r = E(t),
                    i = n - (r >> 1) & o,
                    a = r + i - 32768 & o;
                k.a = a, k.b = i
            }

            function M(e, t, n, r, i, a, o) {
                for (var s = o < 16384, c = n > i ? i : n, l = 1, u; l <= c;) l <<= 1;
                for (l >>= 1, u = l, l >>= 1; l >= 1;) {
                    for (var d = 0, f = d + a * (i - u), p = a * l, m = a * u, h = r * l, g = r * u, _, v, y, b; d <= f; d += m) {
                        for (var x = d, S = d + r * (n - u); x <= S; x += g) {
                            var C = x + h,
                                w = x + p,
                                T = w + h;
                            s ? (A(e[x + t], e[w + t]), _ = k.a, y = k.b, A(e[C + t], e[T + t]), v = k.a, b = k.b, A(_, v), e[x + t] = k.a, e[C + t] = k.b, A(y, b), e[w + t] = k.a, e[T + t] = k.b) : (j(e[x + t], e[w + t]), _ = k.a, y = k.b, j(e[C + t], e[T + t]), v = k.a, b = k.b, j(_, v), e[x + t] = k.a, e[C + t] = k.b, j(y, b), e[w + t] = k.a, e[T + t] = k.b)
                        }
                        if (n & l) {
                            var w = x + p;
                            s ? A(e[x + t], e[w + t]) : j(e[x + t], e[w + t]), _ = k.a, e[w + t] = k.b, e[x + t] = _
                        }
                    }
                    if (i & l)
                        for (var x = d, S = d + r * (n - u); x <= S; x += g) {
                            var C = x + h;
                            s ? A(e[x + t], e[C + t]) : j(e[x + t], e[C + t]), _ = k.a, e[C + t] = k.b, e[x + t] = _
                        }
                    u = l, l >>= 1
                }
                return d
            }

            function ee(e, t, n, r, i, o, s, c, l, u) {
                for (var d = 0, f = 0, p = c, m = Math.trunc(i.value + (o + 7) / 8); i.value < m;)
                    for (C(d, f, n, i), d = S.c, f = S.lc; f >= 14;) {
                        var h = t[d >> f - 14 & a];
                        if (h.len) f -= h.len, T(h.lit, s, d, f, n, r, i, l, u, p), d = w.c, f = w.lc;
                        else {
                            if (!h.p) throw `hufDecode issues`;
                            var g;
                            for (g = 0; g < h.lit; g++) {
                                for (var _ = v(e[h.p[g]]); f < _ && i.value < m;) C(d, f, n, i), d = S.c, f = S.lc;
                                if (f >= _ && y(e[h.p[g]]) == (d >> f - _ & (1 << _) - 1)) {
                                    f -= _, T(h.p[g], s, d, f, n, r, i, l, u, p), d = w.c, f = w.lc;
                                    break
                                }
                            }
                            if (g == h.lit) throw `hufDecode issues`
                        }
                    }
                var b = 8 - o & 7;
                for (d >>= b, f -= b; f > 0;) {
                    var h = t[d << 14 - f & a];
                    if (h.len) f -= h.len, T(h.lit, s, d, f, n, r, i, l, u, p), d = w.c, f = w.lc;
                    else throw `hufDecode issues`
                }
                return !0
            }

            function te(e, t, n, a, o, s) {
                var c = {
                        value: 0
                    },
                    l = n.value,
                    u = H(t, n),
                    f = H(t, n);
                n.value += 4;
                var p = H(t, n);
                if (n.value += 4, u < 0 || u >= r || f < 0 || f >= r) throw `Something wrong with HUF_ENCSIZE`;
                var m = Array(r),
                    h = Array(i);
                if (d(h), _(e, t, n, a - (n.value - l), u, f, m), p > 8 * (a - (n.value - l))) throw `Something wrong with hufUncompress`;
                b(m, u, f, h), ee(m, h, e, t, n, p, f, s, o, c)
            }

            function N(e, t, n) {
                for (var r = 0; r < n; ++r) t[r] = e[t[r]]
            }

            function P(e) {
                for (var t = 1; t < e.length; t++) e[t] = e[t - 1] + e[t] - 128
            }

            function F(e, t) {
                for (var n = 0, r = Math.floor((e.length + 1) / 2), i = 0, a = e.length - 1; !(i > a || (t[i++] = e[n++], i > a));) t[i++] = e[r++]
            }

            function I(e) {
                for (var t = e.byteLength, n = [], r = 0, i = new DataView(e); t > 0;) {
                    var a = i.getInt8(r++);
                    if (a < 0) {
                        var o = -a;
                        t -= o + 1;
                        for (var s = 0; s < o; s++) n.push(i.getUint8(r++))
                    } else {
                        var o = a;
                        t -= 2;
                        for (var c = i.getUint8(r++), s = 0; s < o + 1; s++) n.push(c)
                    }
                }
                return n
            }

            function L(e, t, n, r, i, a) {
                var o = new DataView(a.buffer),
                    s = n[e.idx[0]].width,
                    c = n[e.idx[0]].height,
                    l = 3,
                    u = Math.floor(s / 8),
                    d = Math.ceil(s / 8),
                    f = Math.ceil(c / 8),
                    p = s - (d - 1) * 8,
                    m = c - (f - 1) * 8,
                    h = {
                        value: 0
                    },
                    g = Array(l),
                    _ = Array(l),
                    v = Array(l),
                    y = Array(l),
                    b = Array(l);
                for (let n = 0; n < l; ++n) b[n] = t[e.idx[n]], g[n] = n < 1 ? 0 : g[n - 1] + d * f, _[n] = new Float32Array(64), v[n] = new Uint16Array(64), y[n] = new Uint16Array(d * 64);
                for (let t = 0; t < f; ++t) {
                    var x = 8;
                    t == f - 1 && (x = m);
                    var S = 8;
                    for (let e = 0; e < d; ++e) {
                        e == d - 1 && (S = p);
                        for (let e = 0; e < l; ++e) v[e].fill(0), v[e][0] = i[g[e]++], R(h, r, v[e]), ne(v[e], _[e]), re(_[e]);
                        z(_);
                        for (let t = 0; t < l; ++t) B(_[t], y[t], e * 64)
                    }
                    let a = 0;
                    for (let r = 0; r < l; ++r) {
                        let i = n[e.idx[r]].type;
                        for (let e = 8 * t; e < 8 * t + x; ++e) {
                            a = b[r][e];
                            for (let t = 0; t < u; ++t) {
                                let n = t * 64 + (e & 7) * 8;
                                o.setUint16(a + 0 * i, y[r][n + 0], !0), o.setUint16(a + 2 * i, y[r][n + 1], !0), o.setUint16(a + 4 * i, y[r][n + 2], !0), o.setUint16(a + 6 * i, y[r][n + 3], !0), o.setUint16(a + 8 * i, y[r][n + 4], !0), o.setUint16(a + 10 * i, y[r][n + 5], !0), o.setUint16(a + 12 * i, y[r][n + 6], !0), o.setUint16(a + 14 * i, y[r][n + 7], !0), a += 16 * i
                            }
                        }
                        if (u != d)
                            for (let e = 8 * t; e < 8 * t + x; ++e) {
                                let t = b[r][e] + 8 * u * 2 * i,
                                    n = u * 64 + (e & 7) * 8;
                                for (let e = 0; e < S; ++e) o.setUint16(t + e * 2 * i, y[r][n + e], !0)
                            }
                    }
                }
                for (var C = new Uint16Array(s), o = new DataView(a.buffer), w = 0; w < l; ++w) {
                    n[e.idx[w]].decoded = !0;
                    var T = n[e.idx[w]].type;
                    if (n[w].type == 2)
                        for (var E = 0; E < c; ++E) {
                            let e = b[w][E];
                            for (var D = 0; D < s; ++D) C[D] = o.getUint16(e + D * 2 * T, !0);
                            for (var D = 0; D < s; ++D) o.setFloat32(e + D * 2 * T, q(C[D]), !0)
                        }
                }
            }

            function R(e, t, n) {
                for (var r, i = 1; i < 64;) r = t[e.value], r == 65280 ? i = 64 : r >> 8 == 255 ? i += r & 255 : (n[i] = r, i++), e.value++
            }

            function ne(e, t) {
                t[0] = q(e[0]), t[1] = q(e[1]), t[2] = q(e[5]), t[3] = q(e[6]), t[4] = q(e[14]), t[5] = q(e[15]), t[6] = q(e[27]), t[7] = q(e[28]), t[8] = q(e[2]), t[9] = q(e[4]), t[10] = q(e[7]), t[11] = q(e[13]), t[12] = q(e[16]), t[13] = q(e[26]), t[14] = q(e[29]), t[15] = q(e[42]), t[16] = q(e[3]), t[17] = q(e[8]), t[18] = q(e[12]), t[19] = q(e[17]), t[20] = q(e[25]), t[21] = q(e[30]), t[22] = q(e[41]), t[23] = q(e[43]), t[24] = q(e[9]), t[25] = q(e[11]), t[26] = q(e[18]), t[27] = q(e[24]), t[28] = q(e[31]), t[29] = q(e[40]), t[30] = q(e[44]), t[31] = q(e[53]), t[32] = q(e[10]), t[33] = q(e[19]), t[34] = q(e[23]), t[35] = q(e[32]), t[36] = q(e[39]), t[37] = q(e[45]), t[38] = q(e[52]), t[39] = q(e[54]), t[40] = q(e[20]), t[41] = q(e[22]), t[42] = q(e[33]), t[43] = q(e[38]), t[44] = q(e[46]), t[45] = q(e[51]), t[46] = q(e[55]), t[47] = q(e[60]), t[48] = q(e[21]), t[49] = q(e[34]), t[50] = q(e[37]), t[51] = q(e[47]), t[52] = q(e[50]), t[53] = q(e[56]), t[54] = q(e[59]), t[55] = q(e[61]), t[56] = q(e[35]), t[57] = q(e[36]), t[58] = q(e[48]), t[59] = q(e[49]), t[60] = q(e[57]), t[61] = q(e[58]), t[62] = q(e[62]), t[63] = q(e[63])
            }

            function re(e) {
                let t = .5 * Math.cos(3.14159 / 4),
                    n = .5 * Math.cos(3.14159 / 16),
                    r = .5 * Math.cos(3.14159 / 8),
                    i = .5 * Math.cos(3 * 3.14159 / 16),
                    a = .5 * Math.cos(5 * 3.14159 / 16),
                    o = .5 * Math.cos(3 * 3.14159 / 8),
                    s = .5 * Math.cos(7 * 3.14159 / 16);
                for (var c = [, , , , ], l = [, , , , ], u = [, , , , ], d = [, , , , ], f = 0; f < 8; ++f) {
                    var p = f * 8;
                    c[0] = r * e[p + 2], c[1] = o * e[p + 2], c[2] = r * e[p + 6], c[3] = o * e[p + 6], l[0] = n * e[p + 1] + i * e[p + 3] + a * e[p + 5] + s * e[p + 7], l[1] = i * e[p + 1] - s * e[p + 3] - n * e[p + 5] - a * e[p + 7], l[2] = a * e[p + 1] - n * e[p + 3] + s * e[p + 5] + i * e[p + 7], l[3] = s * e[p + 1] - a * e[p + 3] + i * e[p + 5] - n * e[p + 7], u[0] = t * (e[p + 0] + e[p + 4]), u[3] = t * (e[p + 0] - e[p + 4]), u[1] = c[0] + c[3], u[2] = c[1] - c[2], d[0] = u[0] + u[1], d[1] = u[3] + u[2], d[2] = u[3] - u[2], d[3] = u[0] - u[1], e[p + 0] = d[0] + l[0], e[p + 1] = d[1] + l[1], e[p + 2] = d[2] + l[2], e[p + 3] = d[3] + l[3], e[p + 4] = d[3] - l[3], e[p + 5] = d[2] - l[2], e[p + 6] = d[1] - l[1], e[p + 7] = d[0] - l[0]
                }
                for (var m = 0; m < 8; ++m) c[0] = r * e[16 + m], c[1] = o * e[16 + m], c[2] = r * e[48 + m], c[3] = o * e[48 + m], l[0] = n * e[8 + m] + i * e[24 + m] + a * e[40 + m] + s * e[56 + m], l[1] = i * e[8 + m] - s * e[24 + m] - n * e[40 + m] - a * e[56 + m], l[2] = a * e[8 + m] - n * e[24 + m] + s * e[40 + m] + i * e[56 + m], l[3] = s * e[8 + m] - a * e[24 + m] + i * e[40 + m] - n * e[56 + m], u[0] = t * (e[m] + e[32 + m]), u[3] = t * (e[m] - e[32 + m]), u[1] = c[0] + c[3], u[2] = c[1] - c[2], d[0] = u[0] + u[1], d[1] = u[3] + u[2], d[2] = u[3] - u[2], d[3] = u[0] - u[1], e[0 + m] = d[0] + l[0], e[8 + m] = d[1] + l[1], e[16 + m] = d[2] + l[2], e[24 + m] = d[3] + l[3], e[32 + m] = d[3] - l[3], e[40 + m] = d[2] - l[2], e[48 + m] = d[1] - l[1], e[56 + m] = d[0] - l[0]
            }

            function z(e) {
                for (var t = 0; t < 64; ++t) {
                    var n = e[0][t],
                        r = e[1][t],
                        i = e[2][t];
                    e[0][t] = n + 1.5747 * i, e[1][t] = n - .1873 * r - .4682 * i, e[2][t] = n + 1.8556 * r
                }
            }

            function B(e, t, n) {
                for (var r = 0; r < 64; ++r) t[n + r] = D.toHalfFloat(ie(e[r]))
            }

            function ie(e) {
                return e <= 1 ? Math.sign(e) * Math.abs(e) ** 2.2 : Math.sign(e) * c ** (Math.abs(e) - 1)
            }

            function ae(e) {
                return new DataView(e.array.buffer, e.offset.value, e.size)
            }

            function oe(e) {
                var t = e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size),
                    n = new Uint8Array(I(t)),
                    r = new Uint8Array(n.length);
                return P(n), F(n, r), new DataView(r.buffer)
            }

            function se(e) {
                var t = Se(e.array.slice(e.offset.value, e.offset.value + e.size)),
                    n = new Uint8Array(t.length);
                return P(t), F(t, n), new DataView(n.buffer)
            }

            function ce(e) {
                for (var r = e.viewer, i = {
                        value: e.offset.value
                    }, a = new Uint16Array(e.width * e.scanlineBlockSize * (e.channels * e.type)), o = new Uint8Array(n), s = 0, c = Array(e.channels), l = 0; l < e.channels; l++) c[l] = {}, c[l].start = s, c[l].end = c[l].start, c[l].nx = e.width, c[l].ny = e.lines, c[l].size = e.type, s += c[l].nx * c[l].ny * c[l].size;
                var d = J(r, i),
                    f = J(r, i);
                if (f >= n) throw `Something is wrong with PIZ_COMPRESSION BITMAP_SIZE`;
                if (d <= f)
                    for (var l = 0; l < f - d + 1; l++) o[l + d] = W(r, i);
                var p = new Uint16Array(t),
                    m = u(o, p),
                    h = H(r, i);
                te(e.array, r, i, h, a, s);
                for (var l = 0; l < e.channels; ++l)
                    for (var g = c[l], _ = 0; _ < c[l].size; ++_) M(a, g.start + _, g.nx, g.size, g.ny, g.nx * g.size, m);
                N(p, a, s);
                for (var v = 0, y = new Uint8Array(a.buffer.byteLength), b = 0; b < e.lines; b++)
                    for (var x = 0; x < e.channels; x++) {
                        var g = c[x],
                            S = g.nx * g.size,
                            C = new Uint8Array(a.buffer, g.end * 2, S * 2);
                        y.set(C, v), v += S * 2, g.end += S
                    }
                return new DataView(y.buffer)
            }

            function le(e) {
                var t = Se(e.array.slice(e.offset.value, e.offset.value + e.size));
                let n = e.lines * e.channels * e.width,
                    r = e.type == 1 ? new Uint16Array(n) : new Uint32Array(n),
                    i = 0,
                    a = 0,
                    o = [, , , , ];
                for (let n = 0; n < e.lines; n++)
                    for (let n = 0; n < e.channels; n++) {
                        let n = 0;
                        switch (e.type) {
                            case 1:
                                o[0] = i, o[1] = o[0] + e.width, i = o[1] + e.width;
                                for (let i = 0; i < e.width; ++i) {
                                    let e = t[o[0]++] << 8 | t[o[1]++];
                                    n += e, r[a] = n, a++
                                }
                                break;
                            case 2:
                                o[0] = i, o[1] = o[0] + e.width, o[2] = o[1] + e.width, i = o[2] + e.width;
                                for (let i = 0; i < e.width; ++i) {
                                    let e = t[o[0]++] << 24 | t[o[1]++] << 16 | t[o[2]++] << 8;
                                    n += e, r[a] = n, a++
                                }
                                break
                        }
                    }
                return new DataView(r.buffer)
            }

            function ue(e) {
                var t = e.viewer,
                    n = {
                        value: e.offset.value
                    },
                    r = new Uint8Array(e.width * e.lines * (e.channels * e.type * 2)),
                    i = {
                        version: G(t, n),
                        unknownUncompressedSize: G(t, n),
                        unknownCompressedSize: G(t, n),
                        acCompressedSize: G(t, n),
                        dcCompressedSize: G(t, n),
                        rleCompressedSize: G(t, n),
                        rleUncompressedSize: G(t, n),
                        rleRawSize: G(t, n),
                        totalAcUncompressedCount: G(t, n),
                        totalDcUncompressedCount: G(t, n),
                        acCompression: G(t, n)
                    };
                if (i.version < 2) throw `EXRLoader.parse: ` + Z.compression + ` version ` + i.version + ` is unsupported`;
                for (var a = [], o = J(t, n) - 2; o > 0;) {
                    var s = de(t.buffer, n),
                        c = W(t, n),
                        l = c >> 2 & 3,
                        u = (c >> 4) - 1,
                        d = new Int8Array([u])[0],
                        f = W(t, n);
                    a.push({
                        name: s,
                        index: d,
                        type: f,
                        compression: l
                    }), o -= s.length + 3
                }
                for (var p = Z.channels, m = Array(e.channels), h = 0; h < e.channels; ++h) {
                    var g = m[h] = {},
                        _ = p[h];
                    g.name = _.name, g.compression = 0, g.decoded = !1, g.type = _.pixelType, g.pLinear = _.pLinear, g.width = e.width, g.height = e.lines
                }
                for (var v = {
                        idx: [, , , ]
                    }, y = 0; y < e.channels; ++y)
                    for (var g = m[y], h = 0; h < a.length; ++h) {
                        var b = a[h];
                        g.name == b.name && (g.compression = b.compression, b.index >= 0 && (v.idx[b.index] = y), g.offset = y)
                    }
                if (i.acCompressedSize > 0) switch (i.acCompression) {
                    case 0:
                        var x = new Uint16Array(i.totalAcUncompressedCount);
                        te(e.array, t, n, i.acCompressedSize, x, i.totalAcUncompressedCount);
                        break;
                    case 1:
                        var S = e.array.slice(n.value, n.value + i.totalAcUncompressedCount),
                            C = Se(S),
                            x = new Uint16Array(C.buffer);
                        n.value += i.totalAcUncompressedCount;
                        break
                }
                if (i.dcCompressedSize > 0) {
                    var w = {
                            array: e.array,
                            offset: n,
                            size: i.dcCompressedSize
                        },
                        T = new Uint16Array(se(w).buffer);
                    n.value += i.dcCompressedSize
                }
                if (i.rleRawSize > 0) {
                    var S = e.array.slice(n.value, n.value + i.rleCompressedSize),
                        C = Se(S),
                        E = I(C.buffer);
                    n.value += i.rleCompressedSize
                }
                for (var D = 0, O = Array(m.length), h = 0; h < O.length; ++h) O[h] = [];
                for (var k = 0; k < e.lines; ++k)
                    for (var A = 0; A < m.length; ++A) O[A].push(D), D += m[A].width * e.type * 2;
                L(v, O, m, x, T, r);
                for (var h = 0; h < m.length; ++h) {
                    var g = m[h];
                    if (!g.decoded) switch (g.compression) {
                        case 2:
                            for (var j = 0, M = 0, k = 0; k < e.lines; ++k) {
                                for (var ee = O[h][j], N = 0; N < g.width; ++N) {
                                    for (var P = 0; P < 2 * g.type; ++P) r[ee++] = E[M + P * g.width * g.height];
                                    M++
                                }
                                j++
                            }
                            break;
                        default:
                            throw `EXRLoader.parse: unsupported channel compression`
                    }
                }
                return new DataView(r.buffer)
            }

            function de(e, t) {
                for (var n = new Uint8Array(e), r = 0; n[t.value + r] != 0;) r += 1;
                var i = new TextDecoder().decode(n.slice(t.value, t.value + r));
                return t.value = t.value + r + 1, i
            }

            function fe(e, t, n) {
                var r = new TextDecoder().decode(new Uint8Array(e).slice(t.value, t.value + n));
                return t.value += n, r
            }

            function pe(e, t) {
                return [V(e, t), H(e, t)]
            }

            function me(e, t) {
                return [H(e, t), H(e, t)]
            }

            function V(e, t) {
                var n = e.getInt32(t.value, !0);
                return t.value += 4, n
            }

            function H(e, t) {
                var n = e.getUint32(t.value, !0);
                return t.value += 4, n
            }

            function U(e, t) {
                var n = e[t.value];
                return t.value += 1, n
            }

            function W(e, t) {
                var n = e.getUint8(t.value);
                return t.value += 1, n
            }
            let G = function(e, t) {
                let n;
                return n = `getBigInt64` in DataView.prototype ? Number(e.getBigInt64(t.value, !0)) : e.getUint32(t.value + 4, !0) + Number(e.getUint32(t.value, !0) << 32), t.value += 8, n
            };

            function K(e, t) {
                var n = e.getFloat32(t.value, !0);
                return t.value += 4, n
            }

            function he(e, t) {
                return D.toHalfFloat(K(e, t))
            }

            function q(e) {
                var t = (e & 31744) >> 10,
                    n = e & 1023;
                return (e >> 15 ? -1 : 1) * (t ? t === 31 ? n ? NaN : 1 / 0 : 2 ** (t - 15) * (1 + n / 1024) : n / 1024 * 6103515625e-14)
            }

            function J(e, t) {
                var n = e.getUint16(t.value, !0);
                return t.value += 2, n
            }

            function ge(e, t) {
                return q(J(e, t))
            }

            function _e(e, t, n, r) {
                for (var i = n.value, a = []; n.value < i + r - 1;) {
                    var o = de(t, n),
                        s = V(e, n),
                        c = W(e, n);
                    n.value += 3;
                    var l = V(e, n),
                        u = V(e, n);
                    a.push({
                        name: o,
                        pixelType: s,
                        pLinear: c,
                        xSampling: l,
                        ySampling: u
                    })
                }
                return n.value += 1, a
            }

            function ve(e, t) {
                return {
                    redX: K(e, t),
                    redY: K(e, t),
                    greenX: K(e, t),
                    greenY: K(e, t),
                    blueX: K(e, t),
                    blueY: K(e, t),
                    whiteX: K(e, t),
                    whiteY: K(e, t)
                }
            }

            function ye(e, t) {
                return [`NO_COMPRESSION`, `RLE_COMPRESSION`, `ZIPS_COMPRESSION`, `ZIP_COMPRESSION`, `PIZ_COMPRESSION`, `PXR24_COMPRESSION`, `B44_COMPRESSION`, `B44A_COMPRESSION`, `DWAA_COMPRESSION`, `DWAB_COMPRESSION`][W(e, t)]
            }

            function be(e, t) {
                return {
                    xMin: H(e, t),
                    yMin: H(e, t),
                    xMax: H(e, t),
                    yMax: H(e, t)
                }
            }

            function xe(e, t) {
                return [`INCREASING_Y`][W(e, t)]
            }

            function Ce(e, t) {
                return [K(e, t), K(e, t)]
            }

            function we(e, t) {
                return [K(e, t), K(e, t), K(e, t)]
            }

            function Te(e, t, n, r, i) {
                if (r === `string` || r === `stringvector` || r === `iccProfile`) return fe(t, n, i);
                if (r === `chlist`) return _e(e, t, n, i);
                if (r === `chromaticities`) return ve(e, n);
                if (r === `compression`) return ye(e, n);
                if (r === `box2i`) return be(e, n);
                if (r === `lineOrder`) return xe(e, n);
                if (r === `float`) return K(e, n);
                if (r === `v2f`) return Ce(e, n);
                if (r === `v3f`) return we(e, n);
                if (r === `int`) return V(e, n);
                if (r === `rational`) return pe(e, n);
                if (r === `timecode`) return me(e, n);
                if (r === `preview`) return n.value += i, `skipped`;
                n.value += i
            }

            function Ee(e, t, n) {
                let r = {};
                if (e.getUint32(0, !0) != 20000630) throw `THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.`;
                r.version = e.getUint8(4);
                let i = e.getUint8(5);
                r.spec = {
                    singleTile: !!(i & 2),
                    longName: !!(i & 4),
                    deepFormat: !!(i & 8),
                    multiPart: !!(i & 16)
                }, n.value = 8;
                for (var a = !0; a;) {
                    var o = de(t, n);
                    if (o == 0) a = !1;
                    else {
                        var s = de(t, n),
                            c = Te(e, t, n, s, H(e, n));
                        c === void 0 ? `${s}` : r[o] = c
                    }
                }
                if (i & -5) throw console.error(`EXRHeader:`, r), `THREE.EXRLoader: provided file is currently unsupported.`;
                return r
            }

            function Oe(e, t, n, r, i) {
                let a = {
                    size: 0,
                    viewer: t,
                    array: n,
                    offset: r,
                    width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
                    height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
                    channels: e.channels.length,
                    bytesPerLine: null,
                    lines: null,
                    inputSize: null,
                    type: e.channels[0].pixelType,
                    uncompress: null,
                    getter: null,
                    format: null,
                    [De ? `colorSpace` : `encoding`]: null
                };
                switch (e.compression) {
                    case `NO_COMPRESSION`:
                        a.lines = 1, a.uncompress = ae;
                        break;
                    case `RLE_COMPRESSION`:
                        a.lines = 1, a.uncompress = oe;
                        break;
                    case `ZIPS_COMPRESSION`:
                        a.lines = 1, a.uncompress = se;
                        break;
                    case `ZIP_COMPRESSION`:
                        a.lines = 16, a.uncompress = se;
                        break;
                    case `PIZ_COMPRESSION`:
                        a.lines = 32, a.uncompress = ce;
                        break;
                    case `PXR24_COMPRESSION`:
                        a.lines = 16, a.uncompress = le;
                        break;
                    case `DWAA_COMPRESSION`:
                        a.lines = 32, a.uncompress = ue;
                        break;
                    case `DWAB_COMPRESSION`:
                        a.lines = 256, a.uncompress = ue;
                        break;
                    default:
                        throw `EXRLoader.parse: ` + e.compression + ` is unsupported`
                }
                if (a.scanlineBlockSize = a.lines, a.type == 1) switch (i) {
                    case m:
                        a.getter = ge, a.inputSize = 2;
                        break;
                    case s:
                        a.getter = J, a.inputSize = 2;
                        break
                } else if (a.type == 2) switch (i) {
                    case m:
                        a.getter = K, a.inputSize = 4;
                        break;
                    case s:
                        a.getter = he, a.inputSize = 4
                } else throw `EXRLoader.parse: unsupported pixelType ` + a.type + ` for ` + e.compression + `.`;
                a.blockCount = (e.dataWindow.yMax + 1) / a.scanlineBlockSize;
                for (var o = 0; o < a.blockCount; o++) G(t, r);
                a.outputChannels = a.channels == 3 ? 4 : a.channels;
                let c = a.width * a.height * a.outputChannels;
                switch (i) {
                    case m:
                        a.byteArray = new Float32Array(c), a.channels < a.outputChannels && a.byteArray.fill(1, 0, c);
                        break;
                    case s:
                        a.byteArray = new Uint16Array(c), a.channels < a.outputChannels && a.byteArray.fill(15360, 0, c);
                        break;
                    default:
                        console.error(`THREE.EXRLoader: unsupported type: `, i);
                        break
                }
                return a.bytesPerLine = a.width * a.inputSize * a.channels, a.outputChannels == 4 ? a.format = x : a.format = l, De ? a.colorSpace = `srgb-linear` : a.encoding = 3e3, a
            }
            let Y = new DataView(e),
                ke = new Uint8Array(e),
                X = {
                    value: 0
                },
                Z = Ee(Y, e, X),
                Q = Oe(Z, Y, ke, X, this.type),
                Ae = {
                    value: 0
                },
                je = {
                    R: 0,
                    G: 1,
                    B: 2,
                    A: 3,
                    Y: 0
                };
            for (let e = 0; e < Q.height / Q.scanlineBlockSize; e++) {
                let t = H(Y, X);
                Q.size = H(Y, X), Q.lines = t + Q.scanlineBlockSize > Q.height ? Q.height - t : Q.scanlineBlockSize;
                let n = Q.size < Q.lines * Q.bytesPerLine ? Q.uncompress(Q) : ae(Q);
                X.value += Q.size;
                for (let t = 0; t < Q.scanlineBlockSize; t++) {
                    let r = t + e * Q.scanlineBlockSize;
                    if (r >= Q.height) break;
                    for (let e = 0; e < Q.channels; e++) {
                        let i = je[Z.channels[e].name];
                        for (let a = 0; a < Q.width; a++) {
                            Ae.value = (t * (Q.channels * Q.width) + e * Q.width + a) * Q.inputSize;
                            let o = (Q.height - 1 - r) * (Q.width * Q.outputChannels) + a * Q.outputChannels + i;
                            Q.byteArray[o] = Q.getter(n, Ae)
                        }
                    }
                }
            }
            return {
                header: Z,
                width: Q.width,
                height: Q.height,
                data: Q.byteArray,
                format: Q.format,
                [De ? `colorSpace` : `encoding`]: Q[De ? `colorSpace` : `encoding`],
                type: this.type
            }
        }
        setDataType(e) {
            return this.type = e, this
        }
        load(e, t, n, r) {
            function i(e, n) {
                De ? e.colorSpace = n.colorSpace : e.encoding = n.encoding, e.minFilter = a, e.magFilter = a, e.generateMipmaps = !1, e.flipY = !1, t && t(e, n)
            }
            return super.load(e, i, n, r)
        }
    },
    Y = e(t()),
    ke = (e, t, n) => {
        let r;
        switch (e) {
            case _:
                r = new Uint8ClampedArray(t * n * 4);
                break;
            case s:
                r = new Uint16Array(t * n * 4);
                break;
            case o:
                r = new Uint32Array(t * n * 4);
                break;
            case u:
                r = new Int8Array(t * n * 4);
                break;
            case w:
                r = new Int16Array(t * n * 4);
                break;
            case M:
                r = new Int32Array(t * n * 4);
                break;
            case m:
                r = new Float32Array(t * n * 4);
                break;
            default:
                throw Error(`Unsupported data type`)
        }
        return r
    },
    X, Z = (e, t, n, r) => {
        if (X !== void 0) return X;
        let i = new j(1, 1, r);
        t.setRenderTarget(i);
        let a = new A(new E, new T({
            color: 16777215
        }));
        t.render(a, n), t.setRenderTarget(null);
        let o = ke(e, i.width, i.height);
        return t.readRenderTargetPixels(i, 0, 0, i.width, i.height, o), i.dispose(), a.geometry.dispose(), a.material.dispose(), X = o[0] !== 0, X
    },
    Q = class e {
        _renderer;
        _rendererIsDisposable = !1;
        _material;
        _scene;
        _camera;
        _quad;
        _renderTarget;
        _width;
        _height;
        _type;
        _colorSpace;
        _supportsReadPixels = !0;
        constructor(t) {
            this._width = t.width, this._height = t.height, this._type = t.type, this._colorSpace = t.colorSpace;
            let n = {
                format: x,
                depthBuffer: !1,
                stencilBuffer: !1,
                type: this._type,
                colorSpace: this._colorSpace,
                anisotropy: t.renderTargetOptions?.anisotropy === void 0 ? 1 : t.renderTargetOptions?.anisotropy,
                generateMipmaps: t.renderTargetOptions?.generateMipmaps !== void 0 && t.renderTargetOptions?.generateMipmaps,
                magFilter: t.renderTargetOptions?.magFilter === void 0 ? a : t.renderTargetOptions?.magFilter,
                minFilter: t.renderTargetOptions?.minFilter === void 0 ? a : t.renderTargetOptions?.minFilter,
                samples: t.renderTargetOptions?.samples === void 0 ? void 0 : t.renderTargetOptions?.samples,
                wrapS: t.renderTargetOptions?.wrapS === void 0 ? g : t.renderTargetOptions?.wrapS,
                wrapT: t.renderTargetOptions?.wrapT === void 0 ? g : t.renderTargetOptions?.wrapT
            };
            if (this._material = t.material, t.renderer ? this._renderer = t.renderer : (this._renderer = e.instantiateRenderer(), this._rendererIsDisposable = !0), this._scene = new b, this._camera = new h, this._camera.position.set(0, 0, 10), this._camera.left = -.5, this._camera.right = .5, this._camera.top = .5, this._camera.bottom = -.5, this._camera.updateProjectionMatrix(), !Z(this._type, this._renderer, this._camera, n)) {
                let e;
                switch (this._type) {
                    case s:
                        e = this._renderer.extensions.has(`EXT_color_buffer_float`) ? m : void 0;
                        break
                }
                e === void 0 ? this._supportsReadPixels = !1 : (`${this._type}${m}`, this._type = e)
            }
            this._quad = new A(new E, this._material), this._quad.geometry.computeBoundingBox(), this._scene.add(this._quad), this._renderTarget = new j(this.width, this.height, n), this._renderTarget.texture.mapping = t.renderTargetOptions?.mapping === void 0 ? 300 : t.renderTargetOptions?.mapping
        }
        static instantiateRenderer() {
            let e = new ee;
            return e.setSize(128, 128), e
        }
        render = () => {
            this._renderer.setRenderTarget(this._renderTarget);
            try {
                this._renderer.render(this._scene, this._camera)
            } catch (e) {
                throw this._renderer.setRenderTarget(null), e
            }
            this._renderer.setRenderTarget(null)
        };
        toArray() {
            if (!this._supportsReadPixels) throw Error(`Can't read pixels in this browser`);
            let e = ke(this._type, this._width, this._height);
            return this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, e), e
        }
        toDataTexture(e) {
            let t = new C(this.toArray(), this.width, this.height, x, this._type, e?.mapping || 300, e?.wrapS || 1001, e?.wrapT || 1001, e?.magFilter || 1006, e?.minFilter || 1006, e?.anisotropy || 1, i);
            return t.generateMipmaps = e?.generateMipmaps !== void 0 && e?.generateMipmaps, t
        }
        disposeOnDemandRenderer() {
            this._renderer.setRenderTarget(null), this._rendererIsDisposable && (this._renderer.dispose(), this._renderer.forceContextLoss())
        }
        dispose(e) {
            this.disposeOnDemandRenderer(), e && this.renderTarget.dispose(), this.material instanceof f && Object.values(this.material.uniforms).forEach(e => {
                e.value instanceof d && e.value.dispose()
            }), Object.values(this.material).forEach(e => {
                e instanceof d && e.dispose()
            }), this.material.dispose(), this._quad.geometry.dispose()
        }
        get width() {
            return this._width
        }
        set width(e) {
            this._width = e, this._renderTarget.setSize(this._width, this._height)
        }
        get height() {
            return this._height
        }
        set height(e) {
            this._height = e, this._renderTarget.setSize(this._width, this._height)
        }
        get renderer() {
            return this._renderer
        }
        get renderTarget() {
            return this._renderTarget
        }
        set renderTarget(e) {
            this._renderTarget = e, this._width = e.width, this._height = e.height
        }
        get material() {
            return this._material
        }
        get type() {
            return this._type
        }
        get colorSpace() {
            return this._colorSpace
        }
    },
    Ae = class extends Error {},
    je = class extends Error {},
    Me = (e, t, n) => {
        let r = RegExp(`${t}="([^"]*)"`, `i`).exec(e);
        if (r) return r[1];
        let i = RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, `i`).exec(e);
        if (i) {
            let e = i[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
            return e && e.length === 3 ? e.map(e => e.replace(/<\/?rdf:li>/g, ``)) : i[1].trim()
        }
        if (n !== void 0) return n;
        throw Error(`Can't find ${t} in gainmap metadata`)
    },
    Ne = e => {
        let t;
        t = typeof TextDecoder < `u` ? new TextDecoder().decode(e) : e.toString();
        let n = t.indexOf(`<x:xmpmeta`);
        for (; n !== -1;) {
            let e = t.indexOf(`x:xmpmeta>`, n),
                r = t.slice(n, e + 10);
            try {
                let e = Me(r, `hdrgm:GainMapMin`, `0`),
                    t = Me(r, `hdrgm:GainMapMax`),
                    n = Me(r, `hdrgm:Gamma`, `1`),
                    i = Me(r, `hdrgm:OffsetSDR`, `0.015625`),
                    a = Me(r, `hdrgm:OffsetHDR`, `0.015625`),
                    o = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(r),
                    s = o ? o[1] : `0`,
                    c = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(r);
                if (!c) throw Error(`Incomplete gainmap metadata`);
                let l = c[1];
                return {
                    gainMapMin: Array.isArray(e) ? e.map(e => parseFloat(e)) : [parseFloat(e), parseFloat(e), parseFloat(e)],
                    gainMapMax: Array.isArray(t) ? t.map(e => parseFloat(e)) : [parseFloat(t), parseFloat(t), parseFloat(t)],
                    gamma: Array.isArray(n) ? n.map(e => parseFloat(e)) : [parseFloat(n), parseFloat(n), parseFloat(n)],
                    offsetSdr: Array.isArray(i) ? i.map(e => parseFloat(e)) : [parseFloat(i), parseFloat(i), parseFloat(i)],
                    offsetHdr: Array.isArray(a) ? a.map(e => parseFloat(e)) : [parseFloat(a), parseFloat(a), parseFloat(a)],
                    hdrCapacityMin: parseFloat(s),
                    hdrCapacityMax: parseFloat(l)
                }
            } catch {}
            n = t.indexOf(`<x:xmpmeta`, e)
        }
    },
    Pe = class {
        options;
        constructor(e) {
            this.options = {
                debug: e && e.debug !== void 0 ? e.debug : !1,
                extractFII: e && e.extractFII !== void 0 ? e.extractFII : !0,
                extractNonFII: e && e.extractNonFII !== void 0 ? e.extractNonFII : !0
            }
        }
        extract(e) {
            return new Promise((t, n) => {
                let r = this.options.debug,
                    i = new DataView(e.buffer);
                if (i.getUint16(0) !== 65496) {
                    n(Error(`Not a valid jpeg`));
                    return
                }
                let a = i.byteLength,
                    o = 2,
                    s = 0,
                    c;
                for (; o < a;) {
                    if (++s > 250) {
                        n(Error(`Found no marker after ${s} loops 😵`));
                        return
                    }
                    if (i.getUint8(o) !== 255) {
                        n(Error(`Not a valid marker at offset 0x${o.toString(16)}, found: 0x${i.getUint8(o).toString(16)}`));
                        return
                    }
                    if (c = i.getUint8(o + 1), r && console.log(`Marker: ${c.toString(16)}`), c === 226) {
                        r && console.log(`Found APP2 marker (0xffe2)`);
                        let e = o + 4;
                        if (i.getUint32(e) === 1297106432) {
                            let r = e + 4,
                                a;
                            if (i.getUint16(r) === 18761) a = !1;
                            else if (i.getUint16(r) === 19789) a = !0;
                            else {
                                n(Error(`No valid endianness marker found in TIFF header`));
                                return
                            }
                            if (i.getUint16(r + 2, !a) !== 42) {
                                n(Error(`Not valid TIFF data! (no 0x002A marker)`));
                                return
                            }
                            let o = i.getUint32(r + 4, !a);
                            if (o < 8) {
                                n(Error(`Not valid TIFF data! (First offset less than 8)`));
                                return
                            }
                            let s = r + o,
                                c = i.getUint16(s, !a),
                                l = s + 2,
                                u = 0;
                            for (let e = l; e < l + 12 * c; e += 12) i.getUint16(e, !a) === 45057 && (u = i.getUint32(e + 8, !a));
                            let d = s + 2 + c * 12 + 4,
                                f = [];
                            for (let e = d; e < d + u * 16; e += 16) {
                                let t = {
                                    MPType: i.getUint32(e, !a),
                                    size: i.getUint32(e + 4, !a),
                                    dataOffset: i.getUint32(e + 8, !a),
                                    dependantImages: i.getUint32(e + 12, !a),
                                    start: -1,
                                    end: -1,
                                    isFII: !1
                                };
                                t.dataOffset ? (t.start = r + t.dataOffset, t.isFII = !1) : (t.start = 0, t.isFII = !0), t.end = t.start + t.size, f.push(t)
                            }
                            if (this.options.extractNonFII && f.length) {
                                let e = new Blob([i]),
                                    n = [];
                                for (let t of f) {
                                    if (t.isFII && !this.options.extractFII) continue;
                                    let r = e.slice(t.start, t.end + 1, `image/jpeg`);
                                    n.push(r)
                                }
                                t(n)
                            }
                        }
                    }
                    o += 2 + i.getUint16(o + 2)
                }
            })
        }
    },
    Fe = async e => {
        let t = Ne(e);
        if (!t) throw new je(`Gain map XMP metadata not found`);
        let n = await new Pe({
            extractFII: !0,
            extractNonFII: !0
        }).extract(e);
        if (n.length !== 2) throw new Ae(`Gain map recovery image not found`);
        return {
            sdr: new Uint8Array(await n[0].arrayBuffer()),
            gainMap: new Uint8Array(await n[1].arrayBuffer()),
            metadata: t
        }
    }, Ie = e => new Promise((t, n) => {
        let r = document.createElement(`img`);
        r.onload = () => {
            t(r)
        }, r.onerror = e => {
            n(e)
        }, r.src = URL.createObjectURL(e)
    }), Le = class extends v {
        _renderer;
        _renderTargetOptions;
        _internalLoadingManager;
        _config;
        constructor(e, t) {
            super(t), this._config = e, e.renderer && (this._renderer = e.renderer), this._internalLoadingManager = new c
        }
        setRenderer(e) {
            return this._renderer = e, this
        }
        setRenderTargetOptions(e) {
            return this._renderTargetOptions = e, this
        }
        prepareQuadRenderer() {
            this._renderer;
            let e = this._config.createMaterial({
                gainMapMax: [1, 1, 1],
                gainMapMin: [0, 0, 0],
                gamma: [1, 1, 1],
                offsetHdr: [1, 1, 1],
                offsetSdr: [1, 1, 1],
                hdrCapacityMax: 1,
                hdrCapacityMin: 0,
                maxDisplayBoost: 1,
                gainMap: new d,
                sdr: new d
            });
            return this._config.createQuadRenderer({
                width: 16,
                height: 16,
                type: s,
                colorSpace: i,
                material: e,
                renderer: this._renderer,
                renderTargetOptions: this._renderTargetOptions
            })
        }
        async processImages(e, t, n) {
            let r = t ? new Blob([t], {
                    type: `image/jpeg`
                }) : void 0,
                i = new Blob([e], {
                    type: `image/jpeg`
                }),
                a, o, s = !1;
            if (typeof createImageBitmap > `u`) {
                let e = await Promise.all([r ? Ie(r) : Promise.resolve(void 0), Ie(i)]);
                o = e[0], a = e[1], s = n === `flipY`
            } else {
                let e = await Promise.all([r ? createImageBitmap(r, {
                    imageOrientation: n || `flipY`
                }) : Promise.resolve(void 0), createImageBitmap(i, {
                    imageOrientation: n || `flipY`
                })]);
                o = e[0], a = e[1]
            }
            return {
                sdrImage: a,
                gainMapImage: o,
                needsFlip: s
            }
        }
        createTextures(e, t, n) {
            let r = new d(t || new ImageData(2, 2), 300, g, g, a, p, x, _, 1, i);
            r.flipY = n, r.needsUpdate = !0;
            let o = new d(e, 300, g, g, a, p, x, _, 1, y);
            return o.flipY = n, o.needsUpdate = !0, {
                gainMap: r,
                sdr: o
            }
        }
        updateQuadRenderer(e, t, n, r, i) {
            e.width = t.width, e.height = t.height, e.material.gainMap = n, e.material.sdr = r, e.material.gainMapMin = i.gainMapMin, e.material.gainMapMax = i.gainMapMax, e.material.offsetHdr = i.offsetHdr, e.material.offsetSdr = i.offsetSdr, e.material.gamma = i.gamma, e.material.hdrCapacityMin = i.hdrCapacityMin, e.material.hdrCapacityMax = i.hdrCapacityMax, e.material.maxDisplayBoost = 2 ** i.hdrCapacityMax, e.material.needsUpdate = !0
        }
    }, Re = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`, ze = `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`, Be = class extends f {
        _maxDisplayBoost;
        _hdrCapacityMin;
        _hdrCapacityMax;
        constructor({
            gamma: e,
            offsetHdr: t,
            offsetSdr: r,
            gainMapMin: i,
            gainMapMax: a,
            maxDisplayBoost: o,
            hdrCapacityMin: s,
            hdrCapacityMax: c,
            sdr: l,
            gainMap: u
        }) {
            super({
                name: `GainMapDecoderMaterial`,
                vertexShader: Re,
                fragmentShader: ze,
                uniforms: {
                    sdr: {
                        value: l
                    },
                    gainMap: {
                        value: u
                    },
                    gamma: {
                        value: new n(1 / e[0], 1 / e[1], 1 / e[2])
                    },
                    offsetHdr: {
                        value: new n().fromArray(t)
                    },
                    offsetSdr: {
                        value: new n().fromArray(r)
                    },
                    gainMapMin: {
                        value: new n().fromArray(i)
                    },
                    gainMapMax: {
                        value: new n().fromArray(a)
                    },
                    weightFactor: {
                        value: (Math.log2(o) - s) / (c - s)
                    }
                },
                blending: 0,
                depthTest: !1,
                depthWrite: !1
            }), this._maxDisplayBoost = o, this._hdrCapacityMin = s, this._hdrCapacityMax = c, this.needsUpdate = !0, this.uniformsNeedUpdate = !0
        }
        get sdr() {
            return this.uniforms.sdr.value
        }
        set sdr(e) {
            this.uniforms.sdr.value = e
        }
        get gainMap() {
            return this.uniforms.gainMap.value
        }
        set gainMap(e) {
            this.uniforms.gainMap.value = e
        }
        get offsetHdr() {
            return this.uniforms.offsetHdr.value.toArray()
        }
        set offsetHdr(e) {
            this.uniforms.offsetHdr.value.fromArray(e)
        }
        get offsetSdr() {
            return this.uniforms.offsetSdr.value.toArray()
        }
        set offsetSdr(e) {
            this.uniforms.offsetSdr.value.fromArray(e)
        }
        get gainMapMin() {
            return this.uniforms.gainMapMin.value.toArray()
        }
        set gainMapMin(e) {
            this.uniforms.gainMapMin.value.fromArray(e)
        }
        get gainMapMax() {
            return this.uniforms.gainMapMax.value.toArray()
        }
        set gainMapMax(e) {
            this.uniforms.gainMapMax.value.fromArray(e)
        }
        get gamma() {
            let e = this.uniforms.gamma.value;
            return [1 / e.x, 1 / e.y, 1 / e.z]
        }
        set gamma(e) {
            let t = this.uniforms.gamma.value;
            t.x = 1 / e[0], t.y = 1 / e[1], t.z = 1 / e[2]
        }
        get hdrCapacityMin() {
            return this._hdrCapacityMin
        }
        set hdrCapacityMin(e) {
            this._hdrCapacityMin = e, this.calculateWeight()
        }
        get hdrCapacityMax() {
            return this._hdrCapacityMax
        }
        set hdrCapacityMax(e) {
            this._hdrCapacityMax = e, this.calculateWeight()
        }
        get maxDisplayBoost() {
            return this._maxDisplayBoost
        }
        set maxDisplayBoost(e) {
            this._maxDisplayBoost = Math.max(1, Math.min(65504, e)), this.calculateWeight()
        }
        calculateWeight() {
            let e = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
            this.uniforms.weightFactor.value = Math.max(0, Math.min(1, e))
        }
    }, Ve = class extends Le {
        constructor(e, t) {
            super({
                renderer: e,
                createMaterial: e => new Be(e),
                createQuadRenderer: e => new Q(e)
            }, t)
        }
        async render(e, t, n, r) {
            let {
                sdrImage: i,
                gainMapImage: a,
                needsFlip: o
            } = await this.processImages(n, r, `flipY`), {
                gainMap: s,
                sdr: c
            } = this.createTextures(i, a, o);
            this.updateQuadRenderer(e, i, s, c, t), e.render()
        }
    }, He = class extends Ve {
        load([e, t, n], i, a, o) {
            let s = this.prepareQuadRenderer(),
                c, l, u, d = async () => {
                    if (c && l && u) {
                        try {
                            await this.render(s, u, c, l)
                        } catch (r) {
                            this.manager.itemError(e), this.manager.itemError(t), this.manager.itemError(n), typeof o == `function` && o(r), s.disposeOnDemandRenderer();
                            return
                        }
                        typeof i == `function` && i(s), this.manager.itemEnd(e), this.manager.itemEnd(t), this.manager.itemEnd(n), s.disposeOnDemandRenderer()
                    }
                }, f = !0, p = 0, m = 0, h = !0, g = 0, _ = 0, v = !0, y = 0, b = 0, x = () => {
                    if (typeof a == `function`) {
                        let e = p + g + y,
                            t = m + _ + b;
                        a(new ProgressEvent(`progress`, {
                            lengthComputable: f && h && v,
                            loaded: t,
                            total: e
                        }))
                    }
                };
            this.manager.itemStart(e), this.manager.itemStart(t), this.manager.itemStart(n);
            let S = new r(this._internalLoadingManager);
            S.setResponseType(`arraybuffer`), S.setRequestHeader(this.requestHeader), S.setPath(this.path), S.setWithCredentials(this.withCredentials), S.load(e, async e => {
                if (typeof e == `string`) throw Error(`Invalid sdr buffer`);
                c = e, await d()
            }, e => {
                f = e.lengthComputable, m = e.loaded, p = e.total, x()
            }, t => {
                this.manager.itemError(e), typeof o == `function` && o(t)
            });
            let C = new r(this._internalLoadingManager);
            C.setResponseType(`arraybuffer`), C.setRequestHeader(this.requestHeader), C.setPath(this.path), C.setWithCredentials(this.withCredentials), C.load(t, async e => {
                if (typeof e == `string`) throw Error(`Invalid gainmap buffer`);
                l = e, await d()
            }, e => {
                h = e.lengthComputable, _ = e.loaded, g = e.total, x()
            }, e => {
                this.manager.itemError(t), typeof o == `function` && o(e)
            });
            let w = new r(this._internalLoadingManager);
            return w.setRequestHeader(this.requestHeader), w.setPath(this.path), w.setWithCredentials(this.withCredentials), w.load(n, async e => {
                if (typeof e != `string`) throw Error(`Invalid metadata string`);
                u = JSON.parse(e), await d()
            }, e => {
                v = e.lengthComputable, b = e.loaded, y = e.total, x()
            }, e => {
                this.manager.itemError(n), typeof o == `function` && o(e)
            }), s
        }
    }, Ue = class extends Ve {
        load(e, t, n, i) {
            let a = this.prepareQuadRenderer(),
                o = new r(this._internalLoadingManager);
            return o.setResponseType(`arraybuffer`), o.setRequestHeader(this.requestHeader), o.setPath(this.path), o.setWithCredentials(this.withCredentials), this.manager.itemStart(e), o.load(e, async n => {
                if (typeof n == `string`) throw Error(`Invalid buffer, received [string], was expecting [ArrayBuffer]`);
                let r = new Uint8Array(n),
                    o, s, c;
                try {
                    let e = await Fe(r);
                    o = e.sdr, s = e.gainMap, c = e.metadata
                } catch (t) {
                    if (t instanceof je || t instanceof Ae)`${e}`, c = {
                        gainMapMin: [0, 0, 0],
                        gainMapMax: [1, 1, 1],
                        gamma: [1, 1, 1],
                        hdrCapacityMin: 0,
                        hdrCapacityMax: 1,
                        offsetHdr: [0, 0, 0],
                        offsetSdr: [0, 0, 0]
                    }, o = r;
                    else throw t
                }
                try {
                    await this.render(a, c, o.buffer, s?.buffer)
                } catch (t) {
                    this.manager.itemError(e), typeof i == `function` && i(t), a.disposeOnDemandRenderer();
                    return
                }
                typeof t == `function` && t(a), this.manager.itemEnd(e), a.disposeOnDemandRenderer()
            }, n, t => {
                this.manager.itemError(e), typeof i == `function` && i(t)
            }), a
        }
    }, We = {
        apartment: `lebombo_1k.hdr`,
        city: `potsdamer_platz_1k.hdr`,
        dawn: `kiara_1_dawn_1k.hdr`,
        forest: `forest_slope_1k.hdr`,
        lobby: `st_fagans_interior_1k.hdr`,
        night: `dikhololo_night_1k.hdr`,
        park: `rooitou_park_1k.hdr`,
        studio: `studio_small_03_1k.hdr`,
        sunset: `venice_sunset_1k.hdr`,
        warehouse: `empty_warehouse_01_1k.hdr`
    }, Ge = `https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/`, $ = e => Array.isArray(e), Ke = [`/px.png`, `/nx.png`, `/py.png`, `/ny.png`, `/pz.png`, `/nz.png`];

function qe({
    files: e = Ke,
    path: t = ``,
    preset: n = void 0,
    colorSpace: r = void 0,
    extensions: i
} = {}) {
    n && (Xe(n), e = We[n], t = Ge);
    let a = $(e),
        {
            extension: o,
            isCubemap: s
        } = Ze(e),
        c = Qe(o);
    if (!c) throw Error(`useEnvironment: Unrecognized file extension: ` + e);
    let l = N(e => e.gl);
    (0, Y.useLayoutEffect)(() => {
        if (o !== `webp` && o !== `jpg` && o !== `jpeg`) return;

        function t() {
            R.clear(c, a ? [e] : e)
        }
        l.domElement.addEventListener(`webglcontextlost`, t, {
            once: !0
        })
    }, [e, l.domElement]);
    let u = R(c, a ? [e] : e, e => {
            (o === `webp` || o === `jpg` || o === `jpeg`) && e.setRenderer(l), e.setPath == null || e.setPath(t), i && i(e)
        }),
        d = a ? u[0] : u;
    return (o === `jpg` || o === `jpeg` || o === `webp`) && (d = d.renderTarget?.texture), d.mapping = s ? 301 : 303, d.colorSpace = r ?? (s ? `srgb` : `srgb-linear`), d
}
var Je = {
    files: Ke,
    path: ``,
    preset: void 0,
    extensions: void 0
};
qe.preload = e => {
    let t = {
            ...Je,
            ...e
        },
        {
            files: n,
            path: r = ``
        } = t,
        {
            preset: i,
            extensions: a
        } = t;
    i && (Xe(i), n = We[i], r = Ge);
    let {
        extension: o
    } = Ze(n);
    if (o === `webp` || o === `jpg` || o === `jpeg`) throw Error(`useEnvironment: Preloading gainmaps is not supported`);
    let s = Qe(o);
    if (!s) throw Error(`useEnvironment: Unrecognized file extension: ` + n);
    R.preload(s, $(n) ? [n] : n, e => {
        e.setPath == null || e.setPath(r), a && a(e)
    })
};
var Ye = {
    files: Ke,
    preset: void 0
};
qe.clear = e => {
    let t = {
            ...Ye,
            ...e
        },
        {
            files: n
        } = t,
        {
            preset: r
        } = t;
    r && (Xe(r), n = We[r]);
    let {
        extension: i
    } = Ze(n), a = Qe(i);
    if (!a) throw Error(`useEnvironment: Unrecognized file extension: ` + n);
    R.clear(a, $(n) ? [n] : n)
};

function Xe(e) {
    if (!(e in We)) throw Error(`Preset must be one of: ` + Object.keys(We).join(`, `))
}

function Ze(e) {
    var t;
    let n = $(e) && e.length === 6,
        r = $(e) && e.length === 3 && e.some(e => e.endsWith(`json`)),
        i = $(e) ? e[0] : e;
    return {
        extension: n ? `cube` : r ? `webp` : i.startsWith(`data:application/exr`) ? `exr` : i.startsWith(`data:application/hdr`) ? `hdr` : i.startsWith(`data:image/jpeg`) ? `jpg` : (t = i.split(`.`).pop()) == null || (t = t.split(`?`)) == null || (t = t.shift()) == null ? void 0 : t.toLowerCase(),
        isCubemap: n,
        isGainmap: r
    }
}

function Qe(e) {
    return e === `cube` ? O : e === `hdr` ? Ee : e === `exr` ? Oe : e === `jpg` || e === `jpeg` ? Ue : e === `webp` ? He : null
}
var $e = e => e.current && e.current.isScene,
    et = e => $e(e) ? e.current : e;

function tt(e, t, n, r, i = {}) {
    var a, o;
    i = {
        backgroundBlurriness: 0,
        backgroundIntensity: 1,
        backgroundRotation: [0, 0, 0],
        environmentIntensity: 1,
        environmentRotation: [0, 0, 0],
        ...i
    };
    let s = et(t || n),
        c = s.background,
        l = s.environment,
        u = {
            backgroundBlurriness: s.backgroundBlurriness,
            backgroundIntensity: s.backgroundIntensity,
            backgroundRotation: ((a = s.backgroundRotation) == null || a.clone == null ? void 0 : a.clone()) ?? [0, 0, 0],
            environmentIntensity: s.environmentIntensity,
            environmentRotation: ((o = s.environmentRotation) == null || o.clone == null ? void 0 : o.clone()) ?? [0, 0, 0]
        };
    return e !== `only` && (s.environment = r), e && (s.background = r), L(s, i), () => {
        e !== `only` && (s.environment = l), e && (s.background = c), L(s, u)
    }
}

function nt({
    scene: e,
    background: t = !1,
    map: n,
    ...r
}) {
    let i = N(e => e.scene);
    return Y.useLayoutEffect(() => {
        if (n) return tt(t, e, i, n, r)
    }), null
}

function rt({
    background: e = !1,
    scene: t,
    blur: n,
    backgroundBlurriness: r,
    backgroundIntensity: i,
    backgroundRotation: a,
    environmentIntensity: o,
    environmentRotation: s,
    ...c
}) {
    let l = qe(c),
        u = N(e => e.scene);
    return Y.useLayoutEffect(() => tt(e, t, u, l, {
        backgroundBlurriness: n ?? r,
        backgroundIntensity: i,
        backgroundRotation: a,
        environmentIntensity: o,
        environmentRotation: s
    })), Y.useEffect(() => () => {
        l.dispose()
    }, [l]), null
}

function it({
    children: e,
    near: t = .1,
    far: n = 1e3,
    resolution: r = 256,
    frames: i = 1,
    map: a,
    background: o = !1,
    blur: c,
    backgroundBlurriness: l,
    backgroundIntensity: u,
    backgroundRotation: d,
    environmentIntensity: f,
    environmentRotation: p,
    scene: m,
    files: h,
    path: g,
    preset: _ = void 0,
    extensions: v
}) {
    let y = N(e => e.gl),
        x = N(e => e.scene),
        S = Y.useRef(null),
        [C] = Y.useState(() => new b),
        w = Y.useMemo(() => {
            let e = new te(r);
            return e.texture.type = s, e
        }, [r]);
    Y.useEffect(() => () => {
        w.dispose()
    }, [w]), Y.useLayoutEffect(() => {
        if (i === 1) {
            let e = y.autoClear;
            y.autoClear = !0, S.current.update(y, C), y.autoClear = e
        }
        return tt(o, m, x, w.texture, {
            backgroundBlurriness: c ?? l,
            backgroundIntensity: u,
            backgroundRotation: d,
            environmentIntensity: f,
            environmentRotation: p
        })
    }, [e, C, w.texture, m, x, o, i, y]);
    let T = 1;
    return F(() => {
        if (i === 1 / 0 || T < i) {
            let e = y.autoClear;
            y.autoClear = !0, S.current.update(y, C), y.autoClear = e, T++
        }
    }), Y.createElement(Y.Fragment, null, I(Y.createElement(Y.Fragment, null, e, Y.createElement(`cubeCamera`, {
        ref: S,
        args: [t, n, w]
    }), h || _ ? Y.createElement(rt, {
        background: !0,
        files: h,
        preset: _,
        path: g,
        extensions: v
    }) : a ? Y.createElement(nt, {
        background: !0,
        map: a,
        extensions: v
    }) : null), C))
}

function at(e) {
    let t = qe(e),
        n = e.map || t;
    Y.useMemo(() => P({
        GroundProjectedEnvImpl: Te
    }), []), Y.useEffect(() => () => {
        t.dispose()
    }, [t]);
    let r = Y.useMemo(() => [n], [n]),
        i = e.ground?.height,
        a = e.ground?.radius,
        o = e.ground?.scale ?? 1e3;
    return Y.createElement(Y.Fragment, null, Y.createElement(nt, ne({}, e, {
        map: n
    })), Y.createElement(`groundProjectedEnvImpl`, {
        args: r,
        scale: o,
        height: i,
        radius: a
    }))
}

function ot(e) {
    return e.ground ? Y.createElement(at, e) : e.map ? Y.createElement(nt, e) : e.children ? Y.createElement(it, e) : Y.createElement(rt, e)
}
export {
    ot as t
};
//# sourceMappingURL=Environment-Wa--bW_7.js.map