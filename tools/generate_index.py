#!/usr/bin/env python
"""生成 teardowns/index.html —— 设计拆解收藏馆封面(数据驱动)。
   读 _data/<site>.json 取真实调色板,配真实实拍缩略图,链到各站 teardown.html。
   路径相对脚本自身推导,克隆到任意位置都能重跑。"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "teardowns"

# (key, 展示名, 定位一句话, 视觉看点(顿号分隔,不用点串), 缩略图相对路径, 拆解页相对路径, _data key)
SITES = [
    ("comet",    "Comet", "Perplexity 浏览器首启引导", "宇宙行星母题、源码级 token、真实录屏",
                 "comet/assets/actual-hero.jpg", "comet/teardown.html", None),
    ("linear",   "Linear", "为团队与 Agent 打造的产品开发系统", "深色精密、Inter 510、发丝线、Agent 点阵",
                 "linear/assets/actual-hero.jpg", "linear/teardown.html", "linear"),
    ("moonshot", "Moonshot AI", "从能量到智能的最优转化", "极黑到底、日食光环、品牌字色散故障",
                 "moonshot/assets/actual-hero.jpg", "moonshot/teardown.html", "moonshot"),
    ("tutti",    "tutti", "人与 Agent 实时同频共建", "纯黑电影感、超现实大图、冷暖对撞、滚动视差",
                 "tutti/assets/actual-hero.jpg", "tutti/teardown.html", "tutti"),
    ("ojo",      "OJO", "全球首个设计 Agent 团队工作台", "星夜艺术叙事、点阵底、Agent 拟人为画家",
                 "ojo/assets/actual-hero.jpg", "ojo/teardown.html", "ojo"),
    ("converge", "Converge AI", "通向 AI-native 商业的门户", "极简黑白、Grotesk 巨字、浮动收敛小球",
                 "converge/assets/actual-hero.jpg", "converge/teardown.html", "converge"),
    ("chatgpt",  "ChatGPT", "帮你获取答案、寻找灵感、提升效率", "极简纯白、Prompt 卡海、水彩渐变托底",
                 "chatgpt/keyframes/04.jpg", "chatgpt/teardown.html", "chatgpt"),
    ("notion",   "Notion", "团队与 Agent 一起交付", "纯白亲和、彩色高亮胶囊、手绘头像",
                 "notion/assets/actual-hero.jpg", "notion/teardown.html", "notion"),
    ("gemini",   "Gemini", "Google 的 AI 助手", "浅色柔光、多色径向渐变、圆润居中对话",
                 "gemini/assets/actual-hero.jpg", "gemini/teardown.html", "gemini"),
    ("lovart",   "Lovart", "全球首款 AI 设计智能体", "深黑纸感、优雅衬线、Agent 思考过程可视化",
                 "lovart/assets/actual-hero.jpg", "lovart/teardown.html", "lovart"),
]

# comet 的真实品牌色(True Turquoise / Plex Blue / 天青),不走 _data。
COMET_PALETTE = ["#20808D", "#1FB8CD", "#BADEDD"]

def palette(datakey):
    if not datakey: return COMET_PALETTE
    f = ROOT / "_data" / f"{datakey}.json"
    if not f.exists(): return ["#888", "#bbb", "#ddd"]
    rec = json.loads(f.read_text()); pr = rec.get("probe") or {}; tk = rec.get("tokens") or {}
    out = []
    body = pr.get("body") or {}
    if body.get("background-color"): out.append(body["background-color"].strip())
    if pr.get("accentGuess"): out.append(pr["accentGuess"].strip())
    for h in tk.get("topHex", []):
        hx = h["hex"]
        if hx not in ("#000", "#fff") and hx not in out: out.append(hx)
        if len(out) >= 4: break
    while len(out) < 3: out.append("#888")
    return out[:4]

def card(s):
    key, name, tagline, look, thumb, link, datakey = s
    pal = palette(datakey)
    dots = "".join(f'<span class="dot" style="background:{c}"></span>' for c in pal)
    return f'''    <a class="card" href="{link}">
      <div class="thumb"><img src="{thumb}" alt="{name} 真实渲染" loading="lazy" /></div>
      <div class="cbody">
        <div class="ctop"><h3>{name}</h3><span class="pal">{dots}</span></div>
        <p class="tag">{tagline}</p>
        <p class="look">{look}</p>
      </div>
    </a>'''

cards = "\n".join(card(s) for s in SITES)
html = f'''<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Design Teardown — 顶级产品的设计逆向拆解</title>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@600;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root{{--bg:#08090B;--panel:#101318;--ink:#F4F6F5;--ink-2:rgba(244,246,245,.62);--ink-3:rgba(244,246,245,.4);--line:rgba(255,255,255,.1);--line-2:rgba(255,255,255,.18);--cyan:#1FB8CD;
    --serif:"Fraunces","Noto Serif SC",Georgia,serif;--sans:"Inter","Noto Sans SC",-apple-system,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace;}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased}}
  .wrap{{max-width:1180px;margin:0 auto;padding:0 32px}}
  header{{padding:100px 0 40px;position:relative;overflow:hidden}}
  header::before{{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 80% 0,rgba(31,184,205,.12),transparent 60%),radial-gradient(50% 40% at 10% 100%,rgba(113,112,255,.1),transparent);pointer-events:none}}
  .eyebrow{{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan)}}
  h1{{font-family:var(--serif);font-weight:600;font-size:clamp(40px,6vw,84px);line-height:1.05;letter-spacing:-.01em;margin-top:18px}}
  h1 .it{{font-style:italic;color:var(--cyan)}}
  .lede{{color:var(--ink-2);font-size:clamp(16px,1.4vw,19px);max-width:60ch;margin-top:22px}}
  .meta{{font-family:var(--mono);font-size:12px;color:var(--ink-3);margin-top:20px;display:flex;gap:18px;flex-wrap:wrap}}
  .grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:30px 0 90px}}
  @media(max-width:900px){{.grid{{grid-template-columns:repeat(2,1fr)}}}}
  @media(max-width:600px){{.grid{{grid-template-columns:1fr}}}}
  .card{{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel);transition:border-color .3s cubic-bezier(.19,1,.22,1),transform .3s cubic-bezier(.19,1,.22,1);display:block;color:inherit}}
  .card:hover{{border-color:var(--line-2);transform:translateY(-3px)}}
  .thumb{{aspect-ratio:16/10;overflow:hidden;background:#000;border-bottom:1px solid var(--line)}}
  .thumb img{{width:100%;height:100%;object-fit:cover;display:block}}
  .cbody{{padding:18px 20px 20px}}
  .ctop{{display:flex;align-items:center;justify-content:space-between;gap:10px}}
  .ctop h3{{font-family:var(--serif);font-weight:600;font-size:22px}}
  .pal{{display:flex;gap:5px}}
  .dot{{width:12px;height:12px;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.14)}}
  .tag{{color:var(--ink-2);font-size:14px;margin-top:8px}}
  .look{{font-family:var(--mono);font-size:11.5px;color:var(--ink-3);margin-top:10px;letter-spacing:.02em}}
  footer{{border-top:1px solid var(--line);padding:40px 0 60px;color:var(--ink-3);font-size:13px}}
</style></head>
<body>
<header><div class="wrap">
  <div class="eyebrow">Design Teardown</div>
  <h1>把顶级产品,拆到<span class="it">可复刻</span>的每一个数值</h1>
  <p class="lede">对一批世界级 AI-native 产品落地页的设计逆向拆解。每份都从线上站点真实抽取 token(色值、字体、缓动曲线、时长、圆角、动画库),配真实滚动录屏与关键帧,针对该站自身的设计语言拆解,并给出可复刻的开发思路。</p>
  <div class="meta"><span>真实抽取,不靠观感</span><span>每站含设计解构、复刻指南、出处方法与交互式拆解页</span><span>供内部研究与复刻参考</span></div>
</div></header>
<main class="wrap"><div class="grid">
{cards}
</div></main>
<footer><div class="wrap">Design Teardown。数值以真实抽取为准,营销层技术栈为公开资料推断;受版权素材与商业字体仅限内部研究比对,务必私有。</div></footer>
</body></html>
'''
(ROOT / "index.html").write_text(html)
print("wrote", ROOT / "index.html", "(", len(SITES), "sites )")
