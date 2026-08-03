#!/usr/bin/env python
"""
design-teardown · 收藏馆封面生成(自动发现)
============================================
扫描一个 teardowns 目录下的各站子目录(每个含 teardown.html),读各站 tokens.json 取真实调色板、
用真实截图作缩略图,生成一页数据驱动的收藏馆封面 index.html。

用法:python build_index.py --dir /path/to/teardowns [--title "Design Teardown"]
约定:每站子目录内有 teardown.html;缩略图优先 screenshots/hero.jpg,退 assets/actual-hero.jpg;
      调色板取自 tokens.json(probe.body.background-color / accentGuess / tokens.topHex)。
子目录名以 _ 开头(如 _data)会被跳过。
"""
import argparse, json, pathlib

def palette(site_dir):
    tj = site_dir / "tokens.json"
    out = []
    if tj.exists():
        try:
            rec = json.loads(tj.read_text()); pr = rec.get("probe") or {}; tk = rec.get("tokens") or {}
            body = pr.get("body") or {}
            if body.get("background-color"): out.append(body["background-color"].strip())
            if pr.get("accentGuess"): out.append(pr["accentGuess"].strip())
            for h in tk.get("topHex", []):
                if h["hex"] not in ("#000", "#fff") and h["hex"] not in out: out.append(h["hex"])
                if len(out) >= 4: break
        except Exception: pass
    while len(out) < 3: out.append("#888")
    return out[:4]

def thumb(site_dir):
    for cand in ["screenshots/hero.jpg", "assets/actual-hero.jpg", "assets/actual-full.jpg", "screenshots/full.jpg"]:
        if (site_dir / cand).exists(): return cand
    return ""

def meta(site_dir):
    tj = site_dir / "tokens.json"
    name = site_dir.name; tag = ""
    if tj.exists():
        try:
            rec = json.loads(tj.read_text())
            name = rec.get("site") or name
            tag = ((rec.get("probe") or {}).get("h1") or {}).get("text", "")[:40]
        except Exception: pass
    return name, tag

def card(site_dir):
    name, tag = meta(site_dir); pal = palette(site_dir); th = thumb(site_dir)
    dots = "".join(f'<span class="dot" style="background:{c}"></span>' for c in pal)
    thumb_html = f'<img src="{site_dir.name}/{th}" alt="{name} 真实渲染" loading="lazy"/>' if th else '<div class="noimg"></div>'
    return f'''    <a class="card" href="{site_dir.name}/teardown.html">
      <div class="thumb">{thumb_html}</div>
      <div class="cbody"><div class="ctop"><h3>{name}</h3><span class="pal">{dots}</span></div>
      <p class="tag">{tag}</p></div>
    </a>'''

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", required=True, help="teardowns 目录")
    ap.add_argument("--title", default="Design Teardown")
    a = ap.parse_args()
    root = pathlib.Path(a.dir)
    existing = root / "index.html"
    if existing.exists() and "the gallery wall" in existing.read_text(encoding="utf-8"):
        print("teardowns/index.html 是手工维护的画廊页（拆解画廊），本脚本已停用。")
        print("新增站点时，请在 index.html 里复制一个 <article class=\"plate\"> 区块并顺延编号。")
        return
    sites = sorted([d for d in root.iterdir() if d.is_dir() and not d.name.startswith("_")
                    and (d / "teardown.html").exists()])
    cards = "\n".join(card(d) for d in sites)
    html = f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{a.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@600;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet"/>
<style>
 :root{{--bg:#08090B;--panel:#101318;--ink:#F4F6F5;--ink2:rgba(244,246,245,.62);--ink3:rgba(244,246,245,.4);--line:rgba(255,255,255,.1);--line2:rgba(255,255,255,.18);--cyan:#1FB8CD;
   --serif:"Fraunces","Noto Serif SC",Georgia,serif;--sans:"Inter","Noto Sans SC",-apple-system,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace;}}
 *{{box-sizing:border-box;margin:0;padding:0}} body{{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased}}
 .wrap{{max-width:1180px;margin:0 auto;padding:0 32px}}
 header{{padding:100px 0 40px;position:relative;overflow:hidden}}
 header::before{{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0,rgba(31,184,205,.12),transparent 60%);pointer-events:none}}
 .eyebrow{{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan)}}
 h1{{font-family:var(--serif);font-weight:600;font-size:clamp(40px,6vw,80px);line-height:1.05;letter-spacing:-.01em;margin-top:18px}}
 h1 .it{{font-style:italic;color:var(--cyan)}}
 .lede{{color:var(--ink2);font-size:clamp(16px,1.4vw,19px);max-width:60ch;margin-top:22px}}
 .grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:30px 0 90px}}
 @media(max-width:900px){{.grid{{grid-template-columns:repeat(2,1fr)}}}} @media(max-width:600px){{.grid{{grid-template-columns:1fr}}}}
 .card{{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel);transition:border-color .3s cubic-bezier(.19,1,.22,1),transform .3s cubic-bezier(.19,1,.22,1);display:block;color:inherit}}
 .card:hover{{border-color:var(--line2);transform:translateY(-3px)}}
 .thumb{{aspect-ratio:16/10;overflow:hidden;background:#000;border-bottom:1px solid var(--line)}} .thumb img{{width:100%;height:100%;object-fit:cover;display:block}} .noimg{{width:100%;height:100%}}
 .cbody{{padding:18px 20px 20px}} .ctop{{display:flex;align-items:center;justify-content:space-between;gap:10px}}
 .ctop h3{{font-family:var(--serif);font-weight:600;font-size:22px}} .pal{{display:flex;gap:5px}} .dot{{width:12px;height:12px;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.14)}}
 .tag{{color:var(--ink2);font-size:13.5px;margin-top:8px}}
 footer{{border-top:1px solid var(--line);padding:40px 0 60px;color:var(--ink3);font-size:13px}}
</style></head><body>
<header><div class="wrap"><div class="eyebrow">{a.title}</div>
 <h1>把顶级产品,拆到<span class="it">可复刻</span>的每一个数值</h1>
 <p class="lede">对世界级产品落地页的设计逆向拆解。每份从线上真实抽取 token 与资产,配真实录屏与关键帧,针对该站自身设计语言拆解,给出可复刻的开发思路。</p>
</div></header>
<main class="wrap"><div class="grid">
{cards}
</div></main>
<footer><div class="wrap">{a.title} · 数值以真实抽取为准,营销层技术栈为公开资料推断 · 受版权素材仅限内部研究比对,务必私有。</div></footer>
</body></html>
'''
    (root / "index.html").write_text(html)
    print(f"wrote {root/'index.html'}  ({len(sites)} sites: {', '.join(d.name for d in sites)})")

if __name__ == "__main__":
    main()
