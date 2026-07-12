#!/usr/bin/env python
"""
从线上标杆站真实抽取设计 token(网页版的“源码级实锤”):
CSS 自定义变量、真实字体、缓动曲线(cubic-bezier)、色值、时长、圆角、动画库、hero 手法、媒体清单。
—— 不是观感推断,是从真实 CSS/DOM 抽出来的值。跨源样式表用服务端请求抓文本(不受 CORS 限制)。

用法(仓库根,借 mirofish .venv 的 playwright):
  cd /Users/admin/Desktop/mirofish && uv run python \
    /Users/admin/Desktop/Github/Design-Teardown/tools/extract_web_tokens.py [site ...]
输出:Design-Teardown/teardowns/_data/<site>.json
"""
import json, re, sys, pathlib, collections
from playwright.sync_api import sync_playwright

OUT = pathlib.Path("/Users/admin/Desktop/Github/Design-Teardown/teardowns/_data")
OUT.mkdir(parents=True, exist_ok=True)

SITES = {
    "linear":   "https://linear.app",
    "moonshot": "https://www.moonshot.ai",
    "tutti":    "https://tutti.sh",
    "ojo":      "https://ojo.art",
    "converge": "https://converge.ai",
    "chatgpt":  "https://openai.com/chatgpt/overview/",
    "notion":   "https://www.notion.com",
    "gemini":   "https://gemini.google",
    "lovart":   "https://www.lovart.ai",
    "perplexity-comet": "https://www.perplexity.ai/comet",
}

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")

COLLECT_CSS = """
async () => {
  const out = {inline:[], links:[]};
  document.querySelectorAll('style').forEach(s => { if(s.textContent) out.inline.push(s.textContent); });
  document.querySelectorAll('link[rel~="stylesheet"]').forEach(l => { if(l.href) out.links.push(l.href); });
  // 尝试直接读同源 cssRules(跨源会抛,忽略)
  let ruleText = '';
  for (const sh of Array.from(document.styleSheets)) {
    try { for (const r of Array.from(sh.cssRules)) ruleText += r.cssText + '\\n'; } catch(e){}
  }
  out.sameOriginRules = ruleText.slice(0, 800000);
  return out;
}
"""

PROBE = """
() => {
  const cs = el => el ? getComputedStyle(el) : null;
  const pick = (el, props) => { const c = cs(el); if(!c) return null; const o={}; props.forEach(p=>o[p]=c.getPropertyValue(p)); return o; };
  const h1 = document.querySelector('h1') || document.querySelector('[class*="title"],[class*="hero"] h1,h1');
  const nav = document.querySelector('nav,header');
  const btn = document.querySelector('a[class*="btn"],button,[class*="button"]');
  // 自定义属性:枚举 :root 上生效的 --vars(computed 无法直接枚举,回退由 CSS 正则补)
  const rootCS = getComputedStyle(document.documentElement);
  const libs = [];
  const w = window;
  const has = k => { try { return !!w[k]; } catch(e){ return false; } };
  if (has('gsap') || has('TweenMax') || has('ScrollTrigger')) libs.push('GSAP');
  if (has('Lenis') || has('lenis') || document.querySelector('[class*="lenis"]')) libs.push('Lenis');
  if (has('THREE')) libs.push('three.js');
  if (has('lottie') || has('bodymovin')) libs.push('Lottie');
  if (has('Motion') || document.querySelector('[data-framer-name],[class*="framer"]')) libs.push('Framer/Motion');
  if (has('__NEXT_DATA__') || document.querySelector('#__next')) libs.push('Next.js');
  if (document.querySelector('#__nuxt')) libs.push('Nuxt');
  if (has('Webflow') || document.querySelector('html.w-mod-js')) libs.push('Webflow');
  const scripts = Array.from(document.querySelectorAll('script[src]')).map(s=>s.src);
  const scriptHints = scripts.filter(s=>/gsap|lenis|three|lottie|framer|webflow|swiper|locomotive|barba/i.test(s));
  return {
    title: document.title,
    lang: document.documentElement.lang,
    body: pick(document.body, ['background-color','color','font-family']),
    h1: h1 ? {text:(h1.textContent||'').trim().slice(0,120), ...pick(h1,['font-family','font-size','font-weight','letter-spacing','line-height','font-style','color'])} : null,
    nav: pick(nav, ['background-color','backdrop-filter','font-family']),
    btn: pick(btn, ['background-color','color','border-radius','transition','font-family']),
    accentGuess: rootCS.getPropertyValue('--accent') || rootCS.getPropertyValue('--brand') || rootCS.getPropertyValue('--color-accent') || '',
    libs: Array.from(new Set(libs)),
    scriptHints,
    media: {
      video: document.querySelectorAll('video').length,
      canvas: document.querySelectorAll('canvas').length,
      svg: document.querySelectorAll('svg').length,
      img: document.querySelectorAll('img').length,
      preloadVideo: document.querySelectorAll('link[rel="preload"][as="video"]').length,
      preloadFont: document.querySelectorAll('link[rel="preload"][as="font"]').length,
    },
    fontsLoaded: (()=>{ try { return Array.from(new Set(Array.from(document.fonts).map(f=>f.family))); } catch(e){ return []; } })(),
  };
}
"""

def mine(css):
    def top(pat, n, flags=0, key=None):
        found = re.findall(pat, css, flags)
        found = [f.strip() for f in found]
        c = collections.Counter(found)
        return [{"v": v, "n": k} for v, k in c.most_common(n)]
    hexes = re.findall(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b', css)
    hexc = collections.Counter(h.lower() for h in hexes)
    vars_ = re.findall(r'(--[\w-]+)\s*:\s*([^;{}]+)', css)
    var_map = {}
    for k, v in vars_:
        v = v.strip()
        if k not in var_map and len(v) < 80:
            var_map[k] = v
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

def run(names):
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name in names:
            url = SITES[name]
            ctx = b.new_context(viewport={"width":1440,"height":900}, user_agent=UA, device_scale_factor=1)
            pg = ctx.new_page()
            rec = {"site": name, "url": url}
            try:
                pg.goto(url, wait_until="domcontentloaded", timeout=40000)
                pg.wait_for_timeout(3500)
                try: pg.keyboard.press("Escape")
                except Exception: pass
                pg.wait_for_timeout(500)
                rec["probe"] = pg.evaluate(PROBE)
                css_sources = pg.evaluate(COLLECT_CSS)
                css = "\n".join(css_sources.get("inline", []))
                css += "\n" + css_sources.get("sameOriginRules", "")
                # 抓外链样式表文本(服务端请求,不受 CORS)
                fetched = 0
                for href in css_sources.get("links", [])[:12]:
                    try:
                        r = ctx.request.get(href, timeout=15000)
                        if r.ok:
                            css += "\n" + r.text()[:400000]; fetched += 1
                    except Exception: pass
                rec["cssFetched"] = fetched
                rec["tokens"] = mine(css)
                rec["ok"] = True
                print(f"OK   {name:18s} css={rec['tokens']['cssBytes']//1024}KB "
                      f"vars={len(rec['tokens']['customProps'])} beziers={len(rec['tokens']['cubicBezier'])} "
                      f"libs={rec['probe'].get('libs')}")
            except Exception as e:
                rec["ok"] = False; rec["error"] = repr(e)[:200]
                print(f"FAIL {name:18s} {rec['error']}")
            (OUT / f"{name}.json").write_text(json.dumps(rec, ensure_ascii=False, indent=2))
            ctx.close()
        b.close()

if __name__ == "__main__":
    names = sys.argv[1:] or list(SITES.keys())
    run(names)
    print("done ->", OUT)
