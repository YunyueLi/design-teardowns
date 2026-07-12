#!/usr/bin/env python
"""
design-teardown · 单站真实捕获(一次浏览器会话,任意 URL)
======================================================
给定一个落地页 URL,真实抽取并落盘:
  <out>/tokens.json            真实设计 token(计算样式 + 样式表文本挖掘)
  <out>/design-tokens.css      真实 token 的可复制 CSS(:root)
  <out>/real-assets/{fonts,video,audio,image,lottie,source}/ + manifest.json   真实资产
  <out>/recording/scroll.webm  真实滚动穿行录屏
  <out>/keyframes/00..07.jpg   逐屏关键帧
  <out>/screenshots/hero.jpg, full.jpg   首屏 + 整页真实渲染

数据是「实锤」——直接从线上站点计算样式与样式表原文抽取,不靠观感推断。
跨源样式表 / 资产用服务端请求抓取(不受 CORS)。

依赖:playwright(chromium)。用法:
  python capture_site.py --url https://example.com --out ./out/example [--name Example]
"""
import argparse, json, re, pathlib, hashlib, collections
from urllib.parse import urlparse, urljoin
from playwright.sync_api import sync_playwright

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")
MAXFILE = 30 * 1024 * 1024
MAXIMG = 18

PROBE = r"""
() => {
  const cs = el => el ? getComputedStyle(el) : null;
  const pick = (el, props) => { const c = cs(el); if(!c) return null; const o={}; props.forEach(p=>o[p]=c.getPropertyValue(p)); return o; };
  const h1 = document.querySelector('h1') || document.querySelector('[class*="hero"] h1, [class*="title"]');
  const nav = document.querySelector('nav, header');
  const btn = document.querySelector('a[class*="btn"], button, [class*="button"]');
  const rootCS = getComputedStyle(document.documentElement);
  const has = k => { try { return !!window[k]; } catch(e){ return false; } };
  const libs = [];
  if (has('gsap')||has('TweenMax')||has('ScrollTrigger')) libs.push('GSAP');
  if (has('Lenis')||has('lenis')||document.querySelector('[class*="lenis"]')) libs.push('Lenis');
  if (has('THREE')) libs.push('three.js');
  if (has('lottie')||has('bodymovin')) libs.push('Lottie');
  if (has('Motion')||document.querySelector('[data-framer-name],[class*="framer"]')) libs.push('Framer/Motion');
  if (has('__NEXT_DATA__')||document.querySelector('#__next')) libs.push('Next.js');
  if (document.querySelector('#__nuxt')) libs.push('Nuxt');
  if (has('Webflow')||document.querySelector('html.w-mod-js')) libs.push('Webflow');
  const scripts = [...document.querySelectorAll('script[src]')].map(s=>s.src);
  return {
    title: document.title, lang: document.documentElement.lang,
    body: pick(document.body, ['background-color','color','font-family']),
    h1: h1 ? {text:(h1.textContent||'').trim().slice(0,120), ...pick(h1,['font-family','font-size','font-weight','letter-spacing','line-height','font-style','color'])} : null,
    nav: pick(nav, ['background-color','backdrop-filter','font-family']),
    btn: pick(btn, ['background-color','color','border-radius','transition','font-family']),
    accentGuess: rootCS.getPropertyValue('--accent')||rootCS.getPropertyValue('--brand')||rootCS.getPropertyValue('--color-accent')||'',
    libs: [...new Set(libs)],
    scriptHints: scripts.filter(s=>/gsap|lenis|three|lottie|framer|webflow|swiper|locomotive|barba/i.test(s)),
    media: {video:document.querySelectorAll('video').length, canvas:document.querySelectorAll('canvas').length,
            svg:document.querySelectorAll('svg').length, img:document.querySelectorAll('img').length,
            preloadVideo:document.querySelectorAll('link[rel="preload"][as="video"]').length,
            preloadFont:document.querySelectorAll('link[rel="preload"][as="font"]').length},
    fontsLoaded: (()=>{ try { return [...new Set([...document.fonts].map(f=>f.family))]; } catch(e){ return []; } })(),
  };
}
"""

COLLECT = r"""
() => {
  const abs = u => { try { return new URL(u, location.href).href; } catch(e){ return null; } };
  const out = {fonts:new Set(), video:new Set(), audio:new Set(), image:new Set(), lottie:new Set(), css:new Set()};
  document.querySelectorAll('link[rel="preload"][as="font"]').forEach(l=>l.href&&out.fonts.add(abs(l.href)));
  document.querySelectorAll('video, video source').forEach(v=>{ if(v.src) out.video.add(abs(v.src)); if(v.currentSrc) out.video.add(abs(v.currentSrc)); });
  document.querySelectorAll('link[rel="preload"][as="video"]').forEach(l=>l.href&&out.video.add(abs(l.href)));
  document.querySelectorAll('audio, audio source').forEach(a=>{ if(a.src) out.audio.add(abs(a.src)); });
  document.querySelectorAll('link[rel="preload"][as="audio"]').forEach(l=>l.href&&out.audio.add(abs(l.href)));
  const og = document.querySelector('meta[property="og:image"]'); if(og&&og.content) out.image.add(abs(og.content));
  document.querySelectorAll('link[rel~="icon"]').forEach(l=>l.href&&out.image.add(abs(l.href)));
  [...document.querySelectorAll('img')].map(im=>{const r=im.getBoundingClientRect();return {u:im.currentSrc||im.src,a:r.width*r.height};})
    .filter(x=>x.u).sort((a,b)=>b.a-a.a).slice(0,20).forEach(x=>out.image.add(abs(x.u)));
  [...document.querySelectorAll('*')].slice(0,4000).forEach(el=>{const bg=getComputedStyle(el).backgroundImage;
    if(bg&&bg!=='none'){(bg.match(/url\(["']?([^"')]+)/g)||[]).forEach(s=>{const u=s.replace(/url\(["']?/,'');if(!u.startsWith('data:'))out.image.add(abs(u));});}});
  document.querySelectorAll('[src],[href],[data-src]').forEach(el=>['src','href','data-src'].forEach(a=>{
    const v=el.getAttribute&&el.getAttribute(a); if(v&&/\.(lottie|json)(\?|$)/i.test(v)&&/lottie|anim/i.test(v)) out.lottie.add(abs(v));}));
  document.querySelectorAll('link[rel~="stylesheet"]').forEach(l=>l.href&&out.css.add(abs(l.href)));
  const o={}; for(const k in out) o[k]=[...out[k]].filter(Boolean); return o;
}
"""

def mine(css):
    def top(pat, n, flags=0):
        c = collections.Counter(f.strip() for f in re.findall(pat, css, flags))
        return [{"v": v, "n": k} for v, k in c.most_common(n)]
    hexc = collections.Counter(h.lower() for h in re.findall(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b', css))
    var_map = {}
    for k, v in re.findall(r'(--[\w-]+)\s*:\s*([^;{}]+)', css):
        v = v.strip()
        if k not in var_map and len(v) < 80: var_map[k] = v
    return {
        "customProps": dict(list(var_map.items())[:120]),
        "topHex": [{"hex": h, "n": n} for h, n in hexc.most_common(24)],
        "cubicBezier": top(r'cubic-bezier\([^)]+\)', 16),
        "fontFamily": top(r'font-family\s*:\s*([^;{}]+)', 16),
        "durations": top(r'(?:transition|animation)(?:-duration)?\s*:[^;{}]*?(\d+(?:\.\d+)?m?s)', 16),
        "radii": top(r'border-radius\s*:\s*([^;{}]+)', 14),
        "keyframes": top(r'@keyframes\s+([\w-]+)', 20),
        "cssBytes": len(css),
    }

def fname(url, ext=""):
    base = re.sub(r'[^A-Za-z0-9._-]', '_', pathlib.Path(urlparse(url).path).name or "asset")[:80]
    if '.' not in base and ext: base += ext
    return hashlib.md5(url.encode()).hexdigest()[:6] + "_" + base

def save(ctx, url, dest, manlist, kind):
    try:
        r = ctx.request.get(url, timeout=25000, headers={"Referer": url})
        if not r.ok: return
        body = r.body()
        if not (0 < len(body) <= MAXFILE): return
        dest.mkdir(parents=True, exist_ok=True)
        ext = {"fonts": ".woff2", "video": ".mp4", "audio": ".mp3", "lottie": ".json"}.get(kind, "")
        fp = dest / fname(url, ext)
        fp.write_bytes(body)
        manlist.append({"url": url, "file": fp.name, "bytes": len(body), "type": r.headers.get("content-type", "")})
    except Exception:
        pass

def css_dump(rec, out):
    pr = rec.get("probe") or {}; tk = rec.get("tokens") or {}
    body = pr.get("body") or {}; h1 = pr.get("h1") or {}; btn = pr.get("btn") or {}
    L = ["/* 从线上站点真实抽取的设计 token(实锤,非观感推断) */",
         f"/* 源:{rec['url']} */", ":root{"]
    if body.get("background-color"): L.append(f"  --bg:{body['background-color'].strip()};")
    if body.get("color"): L.append(f"  --ink:{body['color'].strip()};")
    if pr.get("accentGuess"): L.append(f"  --accent:{pr['accentGuess'].strip()};   /* 探针 accentGuess,复刻前请与 topHex 核对 */")
    if tk.get("topHex"): L.append("  /* 高频色值:" + " ".join(h["hex"] for h in tk["topHex"][:10]) + " */")
    if body.get("font-family"): L.append(f"  --font-sans:{body['font-family'].strip()};")
    if pr.get("fontsLoaded"): L.append("  /* 加载字体:" + ", ".join(pr["fontsLoaded"]) + " */")
    if h1: L.append(f"  /* h1:{h1.get('font-size','')}/{h1.get('font-weight','')} 字距 {h1.get('letter-spacing','')} 行高 {h1.get('line-height','')} */")
    for i, b in enumerate([x["v"] for x in tk.get("cubicBezier", [])][:6]): L.append(f"  --ease-{i+1}:{b};")
    if btn.get("transition"): L.append(f"  /* 按钮过渡:{btn['transition'].strip()} */")
    if tk.get("durations"): L.append("  /* 时长梯:" + " ".join(d["v"] for d in tk["durations"][:8]) + " */")
    for i, r in enumerate([x["v"] for x in tk.get("radii", []) if not x["v"].startswith("var")][:6]): L.append(f"  --radius-{i+1}:{r};")
    if btn.get("border-radius"): L.append(f"  /* 按钮圆角:{btn['border-radius'].strip()} */")
    if pr.get("libs"): L.append(f"  /* 探测到的库:{', '.join(pr['libs'])} */")
    m = pr.get("media") or {}
    L.append(f"  /* 媒体:video {m.get('video')} canvas {m.get('canvas')} svg {m.get('svg')} img {m.get('img')} */")
    L.append("}")
    cp = tk.get("customProps") or {}
    if cp:
        L.append("\n/* 站点原始 CSS 自定义变量(节选,复刻参考) */\n:root{")
        for k, v in list(cp.items())[:40]: L.append(f"  {k}:{v};")
        L.append("}")
    (out / "design-tokens.css").write_text("\n".join(L) + "\n")

def autoscroll(pg, steps=8, kf_dir=None):
    total = pg.evaluate("Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)")
    vh = 900
    for i in range(steps):
        y = int((total - vh) * i / max(1, steps - 1)) if total > vh else 0
        pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(1000)
        if kf_dir:
            kf_dir.mkdir(parents=True, exist_ok=True)
            try: pg.screenshot(path=str(kf_dir / f"{i:02d}.jpg"), type="jpeg", quality=80)
            except Exception: pass
    pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(800)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--out", required=True, help="输出目录")
    ap.add_argument("--name", default="", help="站点显示名(可选)")
    ap.add_argument("--no-assets", action="store_true")
    ap.add_argument("--no-record", action="store_true")
    a = ap.parse_args()
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
    rec = {"site": a.name or urlparse(a.url).netloc, "url": a.url}

    with sync_playwright() as p:
        b = p.chromium.launch()
        recdir = out / "recording"; recdir.mkdir(parents=True, exist_ok=True)
        ctx_kw = dict(viewport={"width": 1440, "height": 900}, user_agent=UA, device_scale_factor=1.5)
        if not a.no_record:
            ctx_kw.update(record_video_dir=str(recdir), record_video_size={"width": 1440, "height": 900})
        ctx = b.new_context(**ctx_kw)
        pg = ctx.new_page()
        pg.goto(a.url, wait_until="domcontentloaded", timeout=45000)
        pg.wait_for_timeout(3500)
        try: pg.keyboard.press("Escape")
        except Exception: pass
        pg.wait_for_timeout(500)
        try: pg.evaluate("async () => { await document.fonts.ready; return 1; }")
        except Exception: pass

        # ① 首屏截图
        (out / "screenshots").mkdir(parents=True, exist_ok=True)
        pg.screenshot(path=str(out / "screenshots" / "hero.jpg"), type="jpeg", quality=84)

        # ② 探针 + 样式表挖掘
        rec["probe"] = pg.evaluate(PROBE)
        cand = pg.evaluate(COLLECT)
        css_all = ""
        srcdir = out / "real-assets" / "source"
        man = {"site": rec["site"], "url": a.url, "fonts": [], "video": [], "audio": [], "image": [], "lottie": [], "source": []}
        for cssurl in cand.get("css", [])[:14]:
            try:
                rr = ctx.request.get(cssurl, timeout=15000)
                if rr.ok:
                    txt = rr.text(); css_all += "\n" + txt
                    if not a.no_assets:
                        srcdir.mkdir(parents=True, exist_ok=True)
                        (srcdir / fname(cssurl, ".css")).write_text(txt[:2000000])
                        man["source"].append({"url": cssurl, "file": fname(cssurl, ".css"), "bytes": len(txt)})
            except Exception: pass
        for m in re.findall(r'@font-face[^}]*?src\s*:\s*([^;]+)', css_all, re.I):
            for u in re.findall(r'url\(["\']?([^"\')]+\.(?:woff2|woff|ttf|otf))', m, re.I):
                cand.setdefault("fonts", []).append(urljoin(a.url, u))
        rec["tokens"] = mine(css_all)
        (out / "tokens.json").write_text(json.dumps(rec, ensure_ascii=False, indent=2))
        css_dump(rec, out)

        # ③ 真实资产下载
        if not a.no_assets:
            base = out / "real-assets"
            try: (base / "source" / "index.html").write_text(pg.content()[:3000000])
            except Exception: pass
            for u in dict.fromkeys(cand.get("fonts", [])): save(ctx, u, base / "fonts", man["fonts"], "fonts")
            for u in dict.fromkeys(cand.get("video", [])): save(ctx, u, base / "video", man["video"], "video")
            for u in dict.fromkeys(cand.get("audio", [])): save(ctx, u, base / "audio", man["audio"], "audio")
            for u in dict.fromkeys(cand.get("lottie", [])): save(ctx, u, base / "lottie", man["lottie"], "lottie")
            for u in list(dict.fromkeys(cand.get("image", [])))[:MAXIMG]: save(ctx, u, base / "image", man["image"], "image")
            base.mkdir(parents=True, exist_ok=True)
            (base / "manifest.json").write_text(json.dumps(man, ensure_ascii=False, indent=2))

        # ④ 滚动录屏 + 关键帧 + 整页
        autoscroll(pg, kf_dir=(None if a.no_record else out / "keyframes"))
        try: pg.evaluate("async () => { await document.fonts.ready; return 1; }")
        except Exception: pass
        pg.screenshot(path=str(out / "screenshots" / "full.jpg"), type="jpeg", quality=78, full_page=True)

        vpath = pg.video.path() if (pg.video and not a.no_record) else None
        ctx.close()
        if vpath and pathlib.Path(vpath).exists():
            pathlib.Path(vpath).rename(recdir / "scroll.webm")
        b.close()

    t = rec.get("tokens", {})
    pr = rec.get("probe", {})
    print(f"OK  {rec['site']}  css={t.get('cssBytes',0)//1024}KB vars={len(t.get('customProps',{}))} "
          f"bez={len(t.get('cubicBezier',[]))} fonts_loaded={pr.get('fontsLoaded')} libs={pr.get('libs')}")
    print(f"    -> {out}  (tokens.json / design-tokens.css / real-assets+manifest / recording / keyframes / screenshots)")

if __name__ == "__main__":
    main()
