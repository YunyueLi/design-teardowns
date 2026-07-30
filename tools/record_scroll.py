#!/usr/bin/env python
"""网页版“真实录屏”:每站录一段真实滚动穿行(webm)+ 抽 8 张关键帧,落到 teardowns/<site>/。
   这是网页对应 Comet onboarding 录屏的等价物——捕捉截图抓不到的滚动/揭示动效。
   用法:cd /Users/admin/Desktop/mirofish && uv run python <此脚本> [site ...]"""
import sys, pathlib, time
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path("/Users/admin/Desktop/Github/design-teardowns-product/teardowns")
SITES = {
    "linear":"https://linear.app","moonshot":"https://www.moonshot.ai","tutti":"https://tutti.sh",
    "ojo":"https://ojo.art","converge":"https://converge.ai","chatgpt":"https://openai.com/chatgpt/overview/",
    "notion":"https://www.notion.com","gemini":"https://gemini.google","lovart":"https://www.lovart.ai",
    "perplexity-comet":"https://www.perplexity.ai/comet",
}
UA=("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")

def rec(names):
    with sync_playwright() as p:
        b=p.chromium.launch()
        for name in names:
            url=SITES[name]; d=ROOT/name; recdir=d/"recording"; kf=d/"keyframes"
            recdir.mkdir(parents=True,exist_ok=True); kf.mkdir(exist_ok=True)
            try:
                ctx=b.new_context(viewport={"width":1440,"height":900},user_agent=UA,
                                  record_video_dir=str(recdir),record_video_size={"width":1440,"height":900})
                pg=ctx.new_page()
                pg.goto(url,wait_until="domcontentloaded",timeout=40000)
                pg.wait_for_timeout(3000)
                try: pg.keyboard.press("Escape")
                except Exception: pass
                pg.wait_for_timeout(500)
                total=pg.evaluate("Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)")
                steps=8; vh=900
                for i in range(steps):
                    y=int((total-vh)*i/(steps-1)) if total>vh else 0
                    pg.evaluate(f"window.scrollTo(0,{y})")
                    pg.wait_for_timeout(1100)
                    try: pg.screenshot(path=str(kf/f"{i:02d}.jpg"),type="jpeg",quality=80)
                    except Exception: pass
                pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(800)
                vpath=pg.video.path() if pg.video else None
                ctx.close()  # flush video
                if vpath:
                    src=pathlib.Path(vpath)
                    if src.exists(): src.rename(recdir/"scroll.webm")
                print(f"OK   {name:18s} keyframes+scroll.webm")
            except Exception as e:
                print(f"FAIL {name:18s} {repr(e)[:140]}")
        b.close()

if __name__=="__main__":
    rec(sys.argv[1:] or list(SITES.keys()))
    print("done ->", ROOT)
