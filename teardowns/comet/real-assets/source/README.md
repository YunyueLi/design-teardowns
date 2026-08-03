# onboarding 源码 · Perplexity-authored WebUI

本目录是从 `Comet.app` 的 `resources.pak` 解包后,筛出的 **162 个 Perplexity 自有源文件**(以文件头 `Copyright ... The Perplexity Browser Authors` 或引用 `perplexity-onboarding` 为准),即 `chrome://perplexity-onboarding` 及相关产品 WebUI 的真实源码。

文件按 pak 内数字资源 ID 命名(如 `22299.html`、`22315.css`)。关键定位:

| 文件 | 内容 |
|---|---|
| `22299.html` | 引导页壳(932B):`<base>`、preload MP4/audio、React `#root` |
| `22315.css` | **头像交互**:`rotate(-20deg)` 悬停、`slide-in`、Berkeley Mono 编号徽标 |
| `22316.css` / `22319.css` | `--transition-func` / `--transition-duration` / 回弹曲线 |
| `22320.css` / `22329.css` | `--glow-color`、`--perplexity-onboarding-gradient-color` |
| `53351.css` | 品牌青 `--perplexity-brand-highlight-rgb` 明/暗 |
| `2554*.js` / `2384*.js` | Perplexity 自有逻辑模块 |

> ⚠️ 版权归 Perplexity。仅供内部研究比对,勿分发或直接搬运。见根目录 `NOTICE.md`。
> 完整 6799 个资源可用 `../../../../tools/unpack_pak.py` 自行重放(其余为 Chromium 公共资源,故未收录)。
