#!/usr/bin/env python
"""按 Comet 完整拆解包的规格,为每个标杆站铺目录骨架 + 生成真实 design-tokens.css + 落实拍图。
   数据源:teardowns/_data/<site>.json(真实抽取)。参考截图:mirofish research-screenshots。
   每站目录:teardowns/<site>/{design-tokens.css, assets/actual.jpg, keyframes/, recording/}"""
import json, pathlib, shutil, re

ROOT = pathlib.Path("/Users/admin/Desktop/Github/design-teardowns-product")
DATA = ROOT / "teardowns/_data"
REF  = pathlib.Path("/Users/admin/Desktop/mirofish/products/eval-studio/design/landing-redesign/research-screenshots")

REF_MAP = {
    "tutti":"ref-01-tutti","moonshot":"ref-02-moonshot","perplexity-comet":"ref-03-comet",
    "ojo":"ref-04-ojo","converge":"ref-05-converge","chatgpt":"ref-06-chatgpt",
    "gemini":"ref-07-gemini","notion":"ref-08-notion","linear":"ref-09-linear","lovart":"ref-10-lovart",
}

def css_from(rec):
    site = rec["site"]; pr = rec.get("probe") or {}; tk = rec.get("tokens") or {}
    L = [f"/* ============================================================",
         f"   {site} — 从线上站点真实抽取的设计 token（实锤，非观感推断）",
         f"   源:{rec['url']}  · 抽取:playwright 计算样式 + 样式表文本",
         f"   ============================================================ */",
         ":root{"]
    body = pr.get("body") or {}; h1 = pr.get("h1") or {}; btn = pr.get("btn") or {}
    L.append(f"  /* —— 基底 / 文字（computed）—— */")
    if body.get("background-color"): L.append(f"  --bg:{body['background-color'].strip()};")
    if body.get("color"): L.append(f"  --ink:{body['color'].strip()};")
    if pr.get("accentGuess"): L.append(f"  --accent:{pr['accentGuess'].strip()};   /* --accent/--brand 变量实测 */")
    # 高频 hex
    hexes = [h["hex"] for h in tk.get("topHex",[])][:10]
    if hexes: L.append("  /* 高频色值（样式表出现次数 top）:" + " ".join(hexes) + " */")
    L.append("")
    L.append("  /* —— 字体（computed / fontsLoaded）—— */")
    if body.get("font-family"): L.append(f"  --font-sans:{body['font-family'].strip()};")
    if pr.get("fontsLoaded"): L.append("  /* 实际加载字体:" + ", ".join(pr["fontsLoaded"]) + " */")
    if h1:
        L.append(f"  /* h1:{h1.get('font-size','')}/{h1.get('font-weight','')} 字距 {h1.get('letter-spacing','')} 行高 {h1.get('line-height','')} */")
    L.append("")
    L.append("  /* —— 动效（样式表实测）—— */")
    bez = [b["v"] for b in tk.get("cubicBezier",[])][:6]
    for i,b in enumerate(bez): L.append(f"  --ease-{i+1}:{b};")
    if btn.get("transition"): L.append(f"  /* 按钮过渡:{btn['transition'].strip()} */")
    durs = [d["v"] for d in tk.get("durations",[])][:8]
    if durs: L.append("  /* 时长梯:" + " ".join(durs) + " */")
    L.append("")
    L.append("  /* —— 圆角（实测 top）—— */")
    radii = [r["v"] for r in tk.get("radii",[]) if not r["v"].startswith("var")][:6]
    for i,r in enumerate(radii): L.append(f"  --radius-{i+1}:{r};")
    if btn.get("border-radius"): L.append(f"  /* 按钮圆角:{btn['border-radius'].strip()} */")
    if pr.get("libs"): L.append(f"\n  /* 探测到的库:{', '.join(pr['libs'])} */")
    m = pr.get("media") or {}
    L.append(f"  /* 媒体清单:video {m.get('video')} · canvas {m.get('canvas')} · svg {m.get('svg')} · img {m.get('img')} */")
    L.append("}")
    # 附:原始 CSS 自定义变量(前 40,给复刻参考)
    cp = tk.get("customProps") or {}
    if cp:
        L.append("\n/* —— 站点原始 CSS 自定义变量(节选，复刻参考) —— */\n:root{")
        for k,v in list(cp.items())[:40]:
            L.append(f"  {k}:{v};")
        L.append("}")
    return "\n".join(L) + "\n"

def main():
    for jf in sorted(DATA.glob("*.json")):
        rec = json.loads(jf.read_text())
        site = rec["site"]
        d = ROOT / "teardowns" / site
        (d / "assets").mkdir(parents=True, exist_ok=True)
        (d / "keyframes").mkdir(exist_ok=True)
        (d / "recording").mkdir(exist_ok=True)
        # tokens.css
        if rec.get("ok"):
            (d / "design-tokens.css").write_text(css_from(rec))
        # 实拍图
        ref = REF_MAP.get(site)
        if ref:
            src = REF / f"{ref}.jpg"; srcfull = REF / f"{ref}-full.jpg"
            if src.exists(): shutil.copy(src, d / "assets" / "actual-hero.jpg")
            if srcfull.exists(): shutil.copy(srcfull, d / "assets" / "actual-full.jpg")
        print(f"scaffolded {site:18s} tokens={'y' if rec.get('ok') else 'n'} ref={ref}")
    print("done")

main()
