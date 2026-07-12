---
name: design-teardown
description: >-
  Reverse-engineer a real, existing website or app into a source-level design teardown: pull its
  actual design tokens (colors, fonts, easing, durations, radii) and assets from the live page, then
  rebuild it faithfully in the subject's own visual language. Use whenever someone names or links a
  specific real product and wants its true design taken apart — "extract the fonts/colors/easing from
  X", "reverse-engineer X's design system", "how did X build this landing page, I want to replicate
  the colors/fonts/motion", "turn X into a replicable design doc", "how'd they make this effect on X",
  "what font/colors/easing does X use".
  中文同理:拆解、逆向、复刻某真实网站或产品的设计,扒出真实配色、字体、缓动、动效。
  The trigger: a named real site plus wanting its genuine measured values/assets, even without the
  word "teardown". Pulls real computed styles/files via Playwright; never guesses. Not for
  from-scratch/net-new designs, vague "make it nicer" redesigns, copywriting, data scraping, perf/a11y
  audits, or generic CSS help with no reference site.
---

# Design Teardown · 顶级产品设计逆向拆解

把一个产品(网页落地页,或本地原生 app)拆到**可复刻的每一个数值**。产出既给人读(交互页 + 文档),
也给 AI、工程师复用(真实 token + 真实资产 + 机器可读 manifest)。

## 这个 skill 为什么这样设计(先读)

一份合格的设计拆解,核心不是「看起来像」,而是**每个结论可回溯到真实来源**。所以两条铁律贯穿始终:

1. **真实抽取,不靠观感。** 色值、字体、缓动、时长、圆角一律从线上站点的**计算样式 + 样式表原文**抽,
   字体、视频、图、源码一律**真的下下来**。凭肉眼印象写的数值一文不值,还会误导复刻。
2. **实锤 vs 推断,分清楚。** 抽取到的是「实锤」;营销层技术栈、动效意图等观察推断是「推断」。
   每个数值标好来源,冲突处以抽取为准。这是拆解可信度的命根子。

第二个信念:**针对性,不套模板。** 拆 Linear 就用 Linear 的精密无衬线紫、拆 Moonshot 就用它的极黑日食、
拆 tutti 就用它的电影感——**拆解页本身用被拆对象的视觉语言呈现**,让人一眼知道在拆谁。套统一模板 = 失败。

## 产出物(每站一个目录)

```
<site>/
├── teardown.html          交互式拆解页(该站视觉语言 + 真实素材 + 至少一个签名效果可跑 demo)
├── 设计解构.md            定位、色彩、字体、动效、Hero 手法、签名母题、工艺、关键发现(标实锤/推断)
├── 复刻指南.md            可复制 :root token + 复现签名效果的代码 + 选型决策 + 工程坑
├── 出处与方法.md          抽取链路、实锤清单、推断清单、局限
├── 事实核查.md            逐条核对页面数值 vs 真实抽取,列漂移并改正
├── 设计评审.md            以顶级设计视角评审精度与完成度,给可执行改进
├── design-tokens.css      真实 token 的可复制 CSS
├── tokens.json            机器可读:probe(计算样式)+ tokens(挖掘)
├── real-assets/           真字体、视频、音频、图、CSS 源码 + manifest.json
├── recording/scroll.webm  真实滚动录屏
├── keyframes/*.jpg         逐屏关键帧
└── screenshots/           hero.jpg 首屏 + full.jpg 整页(真实渲染)
```

## 工作流

### 1、真实捕获(脚本,一条命令)

对每个站跑一次 `scripts/capture_site.py`,它在一次浏览器会话里完成 token 抽取 + 真实资产下载 + 滚动录屏 + 截图:

```bash
# 需 playwright(chromium)。若本机没有:pip install playwright && playwright install chromium
python scripts/capture_site.py --url https://example.com --out <workdir>/example --name Example
```

产出 `tokens.json`、`design-tokens.css`、`real-assets/**+manifest.json`、`recording/scroll.webm`、`keyframes/`、`screenshots/`。
先读 `tokens.json` 与 `real-assets/manifest.json`——这是后面所有判断的**唯一事实源**。
(可选 `--no-assets`、`--no-record` 只抽 token 快速试。)

### 2、定视觉语言(针对性,不套模板)

看 `screenshots/hero.jpg`、`full.jpg` 与 `tokens.json` 的 `probe`(body 底色、文字色、h1 字体、nav、btn)、
`fontsLoaded`、`libs`,判断该站的设计语言:深色还是浅色、无衬线还是衬线、极简还是电影感、签名视觉母题是什么。
拆解页就用这套语言搭建——真实底色、文字色、强调色、真实字体(见第 3 步接入)、真实圆角、缓动。

### 3、接真实素材(精度命门)

- **真字体**:从 `real-assets/fonts/` 挑该站**真正用于标题、正文、等宽的 1 到 3 支**(按 `probe.h1.font-family` 与
  `fontsLoaded` 判断,别把所有权重、图标字、无障碍字全接),用 `@font-face`(相对路径本地文件)接进页面,
  CDN 同名字降为兜底。接完读回自检无 tofu(字族名与文件对得上)。取不到真字体(如登录墙)就如实标注、保留替身,不硬造。
- **真媒体**:`real-assets/video/`、`image/` 里若有 hero、背景、演示媒体,嵌进对应区替换 CSS 近似(视频 `muted autoplay loop playsinline` + `prefers-reduced-motion` 兜底)。判断视频到底是不是 hero(有的站首屏是 canvas 驱动,视频只是别处的演示),别张冠李戴。

### 4、建拆解页 + 三份文档

拆解页结构对齐深度标杆(见 `references/method.md` 的分节清单与「签名效果 demo」要求:至少一个可跑的交互 demo 复现该站签名效果、色板点击复制、真实截图作 as-seen)。三份文档把数值、复刻代码、出处方法讲透,逐值标实锤、推断。
**详细的建页方法、分节清单、写作与红线见 [`references/method.md`](references/method.md),动手建页前必读。**

### 5、对抗审查(别省)

写 `事实核查.md` + `设计评审.md`:逐条把页面里出现的每个数值与 `tokens.json` 核对,抓出任何漂移(编造、误标、误读)
并当场改正;再以设计视角评审精度与完成度。这一步真的会抓出错(误把 `.15s` 读成 `15s`、把探针猜测色当实锤、
把第三方内嵌色当品牌色……),是拆解可信度的最后一道闸。

### 6、收藏馆封面(多站时)

多个站放同一个 teardowns 目录下,跑 `scripts/build_index.py --dir <teardowns>` 自动发现各站、读真实调色板 + 真实缩略图,
生成一页数据驱动的封面 `index.html`。

## 验证(务必做)

起本地静态服务后用 playwright 验渲染:**逐屏滚动触发 IntersectionObserver 揭示** + **等 `document.fonts.ready`** 再截图,
否则会截到空白、回退字体。检查控制台 0 报错、真字体真生效(CJK 变量字 `document.fonts.check()` 常假阴性,以肉眼字形为准)、真媒体加载。
所有引用用**相对路径**,保证克隆、拷走后仍完整可用。

## 红线

- **真实值优先,拿不准标「推断」,绝不编造精确数值。**
- **针对性视觉,不套统一模板**(拆解页用被拆对象的语言)。
- 面向人读的产物**零 emoji、禁点串**(不写 `A · B · C`、`A × B`、`A / B` 这类堆砌)、**不写真实人名**(用 role)。
- 逆向提取的**受版权素材与商业字体仅限内部研究比对**,连同拆解仓库**务必私有**;别把它们对外公开发布。

## 本地原生 app(进阶,最高深度)

若拆的是本地安装的原生 app(如 Chromium 系浏览器的 `chrome://` 内建页),深度可远超网页——能解包 `resources.pak`
拿到 HTML/CSS/JS/Lottie/字体源文件、用 CDP 从渲染器直抓真实帧录屏。做法见 [`references/native-app.md`](references/native-app.md)。
