#!/usr/bin/env python
"""逐站提取**真实资产**(网页版的 real-assets):真实字体、视频、音频、关键图、Lottie、真实 CSS 源码。
   服务端请求下载(不受 CORS),按类型落到 teardowns/<site>/real-assets/,并写机器可读 manifest.json 供 AI/复刻参考。
   用法:cd /Users/admin/Desktop/mirofish && uv run python <此脚本> [site ...]"""
import sys, re, json, pathlib, hashlib
from urllib.parse import urlparse, urljoin
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path("/Users/admin/Desktop/Github/Design-Teardown/teardowns")
SITES = {
    "linear":"https://linear.app","moonshot":"https://www.moonshot.ai","tutti":"https://tutti.sh",
    "ojo":"https://ojo.art","converge":"https://converge.ai","chatgpt":"https://openai.com/chatgpt/overview/",
    "notion":"https://www.notion.com","gemini":"https://gemini.google","lovart":"https://www.lovart.ai",
    "perplexity-comet":"https://www.perplexity.ai/comet",
}
UA=("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")
MAXFILE = 30*1024*1024      # 单文件上限 30MB
MAXIMG  = 18                # 关键图张数上限

# 页面内收集所有候选资产 URL(字体/视频/音频/图片/lottie/样式表)
COLLECT = r"""
() => {
  const abs = u => { try { return new URL(u, location.href).href; } catch(e){ return null; } };
  const out = {fonts:new Set(), video:new Set(), audio:new Set(), image:new Set(), lottie:new Set(), css:new Set(), scripts:new Set()};
  // 加载的字体:document.fonts 拿不到 URL,靠样式表 @font-face 正则(在外层做);这里收 <link> 预载字体
  document.querySelectorAll('link[rel="preload"][as="font"]').forEach(l=>l.href&&out.fonts.add(abs(l.href)));
  // 视频 / 音频
  document.querySelectorAll('video, video source').forEach(v=>{ if(v.src) out.video.add(abs(v.src)); if(v.currentSrc) out.video.add(abs(v.currentSrc)); });
  document.querySelectorAll('link[rel="preload"][as="video"]').forEach(l=>l.href&&out.video.add(abs(l.href)));
  document.querySelectorAll('audio, audio source').forEach(a=>{ if(a.src) out.audio.add(abs(a.src)); });
  document.querySelectorAll('link[rel="preload"][as="audio"]').forEach(l=>l.href&&out.audio.add(abs(l.href)));
  // 图片:og 图、logo、可见大图(按渲染面积排序取前若干)、srcset 首项
  const ogimg = document.querySelector('meta[property="og:image"]'); if(ogimg&&ogimg.content) out.image.add(abs(ogimg.content));
  document.querySelectorAll('link[rel~="icon"]').forEach(l=>l.href&&out.image.add(abs(l.href)));
  const imgs = [...document.querySelectorAll('img')].map(im=>{
    const r=im.getBoundingClientRect(); return {u:im.currentSrc||im.src, a:r.width*r.height};
  }).filter(x=>x.u).sort((a,b)=>b.a-a.a).slice(0,20);
  imgs.forEach(x=>out.image.add(abs(x.u)));
  // 背景图 url()
  [...document.querySelectorAll('*')].slice(0,4000).forEach(el=>{
    const bg=getComputedStyle(el).backgroundImage;
    if(bg&&bg!=='none'){ const m=bg.match(/url\(["']?([^"')]+)/g)||[]; m.forEach(s=>{const u=s.replace(/url\(["']?/,''); if(!u.startsWith('data:')) out.image.add(abs(u));}); }
  });
  // lottie:script/link 指向 .json / .lottie
  document.querySelectorAll('[src],[href],[data-src]').forEach(el=>{
    ['src','href','data-src'].forEach(a=>{const v=el.getAttribute&&el.getAttribute(a); if(v&&/\.(lottie|json)(\?|$)/i.test(v)&&/lottie|anim/i.test(v)) out.lottie.add(abs(v));});
  });
  // 样式表 & 脚本
  document.querySelectorAll('link[rel~="stylesheet"]').forEach(l=>l.href&&out.css.add(abs(l.href)));
  document.querySelectorAll('script[src]').forEach(s=>out.scripts.add(abs(s.src)));
  const o={}; for(const k in out) o[k]=[...out[k]].filter(Boolean); return o;
}
"""

def fname(url, default_ext=""):
    p = urlparse(url); base = pathlib.Path(p.path).name or "asset"
    base = re.sub(r'[^A-Za-z0-9._-]', '_', base)[:80]
    if '.' not in base and default_ext: base += default_ext
    h = hashlib.md5(url.encode()).hexdigest()[:6]
    return f"{h}_{base}"

def save(ctx, url, dest_dir, manifest_list, kind):
    try:
        r = ctx.request.get(url, timeout=25000, headers={"Referer": url})
        if not r.ok: return False
        body = r.body()
        if len(body) == 0 or len(body) > MAXFILE: return False
        dest_dir.mkdir(parents=True, exist_ok=True)
        ext = {"fonts":".woff2","video":".mp4","audio":".mp3","image":"","lottie":".json","source":".css"}.get(kind,"")
        fp = dest_dir / fname(url, ext)
        fp.write_bytes(body)
        manifest_list.append({"url": url, "file": str(fp.relative_to(ROOT)), "bytes": len(body),
                              "type": r.headers.get("content-type","")})
        return True
    except Exception:
        return False

def run(names):
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name in names:
            url = SITES[name]; base = ROOT / name / "real-assets"
            man = {"site": name, "url": url, "fonts":[], "video":[], "audio":[], "image":[], "lottie":[], "source":[]}
            try:
                ctx = b.new_context(viewport={"width":1440,"height":900}, user_agent=UA)
                pg = ctx.new_page()
                pg.goto(url, wait_until="domcontentloaded", timeout=40000)
                pg.wait_for_timeout(3500)
                try: pg.keyboard.press("Escape")
                except Exception: pass
                pg.wait_for_timeout(500)
                # 逐屏滚一遍,触发懒加载资产
                for _ in range(6):
                    pg.evaluate("scrollBy(0, innerHeight)"); pg.wait_for_timeout(500)
                pg.evaluate("scrollTo(0,0)")
                cand = pg.evaluate(COLLECT)

                # 从样式表文本挖 @font-face src(真实字体 URL)
                css_all = ""
                for cssurl in cand.get("css", [])[:14]:
                    try:
                        rr = ctx.request.get(cssurl, timeout=15000)
                        if rr.ok:
                            txt = rr.text(); css_all += "\n"+txt
                            # 存真实 CSS 源码
                            save_src = base/"source"; save_src.mkdir(parents=True, exist_ok=True)
                            (save_src/fname(cssurl, ".css")).write_text(txt[:2000000])
                            man["source"].append({"url":cssurl,"file":str((save_src/fname(cssurl,'.css')).relative_to(ROOT)),"bytes":len(txt)})
                    except Exception: pass
                for m in re.findall(r'@font-face[^}]*?src\s*:\s*([^;]+)', css_all, re.I):
                    for u in re.findall(r'url\(["\']?([^"\')]+\.(?:woff2|woff|ttf|otf))', m, re.I):
                        cand.setdefault("fonts",[]).append(urljoin(url, u))
                # 存真实入口 HTML
                try:
                    (base/"source").mkdir(parents=True, exist_ok=True)
                    (base/"source"/"index.html").write_text(pg.content()[:3000000])
                    man["source"].append({"url":url,"file":str((base/'source'/'index.html').relative_to(ROOT)),"bytes":0})
                except Exception: pass

                # 下载各类资产
                for u in dict.fromkeys(cand.get("fonts",[])): save(ctx,u,base/"fonts",man["fonts"],"fonts")
                for u in dict.fromkeys(cand.get("video",[])): save(ctx,u,base/"video",man["video"],"video")
                for u in dict.fromkeys(cand.get("audio",[])): save(ctx,u,base/"audio",man["audio"],"audio")
                for u in dict.fromkeys(cand.get("lottie",[])): save(ctx,u,base/"lottie",man["lottie"],"lottie")
                for u in list(dict.fromkeys(cand.get("image",[])))[:MAXIMG]: save(ctx,u,base/"image",man["image"],"image")

                base.mkdir(parents=True, exist_ok=True)
                (base/"manifest.json").write_text(json.dumps(man, ensure_ascii=False, indent=2))
                print(f"OK   {name:16s} fonts {len(man['fonts'])} video {len(man['video'])} audio {len(man['audio'])} img {len(man['image'])} lottie {len(man['lottie'])} src {len(man['source'])}")
                ctx.close()
            except Exception as e:
                print(f"FAIL {name:16s} {repr(e)[:140]}")
        b.close()

if __name__ == "__main__":
    run(sys.argv[1:] or list(SITES.keys()))
    print("done ->", ROOT)
