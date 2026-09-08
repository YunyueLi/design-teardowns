# Design Teardowns

把优秀界面拆成可验证、可复用的设计知识。

![实时 Three.js 光束线画廊：样本随传送带经过五个研究工位](teardowns/_gallery/beamline-readme.jpg)

[浏览画廊](https://yunyueli.github.io/design-teardowns/teardowns/index.html) · [研究方法](skills/design-teardown/references/method.md) · [实现说明](DESIGN.md) · [授权与出处](NOTICE)

## 一件界面，五步拆解

**Capture → Measure → Reconstruct → Verify → Archive**

从真实页面开始，记录素材与状态，测量样式和动效，重建关键体验，再将结论与出处逐项对照。每份研究区分实测与推断，保留没有拿到的证据和复现边界。

画廊把这五步做成一条可探索的光束线。滚动或点击工位，传送带、滚轮和样本同步移动，相机跟随样本前进。滚动停止后保留当前位置，点击工位才精确停靠；阶段文字在样本实际到站后切换。场景由本地 Three.js 实时渲染；金属、灯光、光束和样本拥有共同的空间与遮挡关系。它是一种研究过程的视觉表达，研究本身仍由各作品中的证据与分析完成。

馆藏目前有 **17 份研究**。首页展示六件作品，支持搜索、分类、排序和分页；展开 Archive 可以继续浏览。馆藏增加时，五站旅程和每页六项的布局保持不变。手机、横屏、键盘访问和减弱动态偏好均有对应路径；三维场景不可用时仍可通过静态入口进入研究。

## 当前展览

| 作品                                                                    | 研究对象                               |
| ----------------------------------------------------------------------- | -------------------------------------- |
| [Latrix](teardowns/latrix/teardown.html)                                | AI Beings 品牌页面的古典排版与字母螺旋 |
| [ChatGPT](teardowns/chatgpt/teardown.html)                              | OpenAI overview 页面的留白与产品叙事   |
| [EasyCode](teardowns/easycode/teardown.html)                            | 编程练习、指导与反馈页面               |
| [Gemini](teardowns/gemini/teardown.html)                                | 捕获时的签出状态入口与柔光界面         |
| [Notion](teardowns/notion/teardown.html)                                | 英文首页的团队与 Agent 协作叙事        |
| [Shopify Editions Winter ’26](teardowns/shopify-editions/teardown.html) | The Renaissance Edition 的发布系统     |

完整目录见 [catalogue.js](teardowns/_gallery/catalogue.js)。点击作品进入对应研究页，三维台车中的示例固定为 Latrix。

## 本地运行

在仓库根目录运行：

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

打开 [本地画廊](http://127.0.0.1:4174/teardowns/index.html)。画廊不需要安装 npm 依赖、构建或后端服务；运行时、字体和图像均随仓库提供。请通过 HTTP 预览，避免 `file://` 对图片纹理的限制。

## 维护馆藏

先在 [catalogue.js](teardowns/_gallery/catalogue.js) 中添加经过出处核对的记录、研究页和封面，再运行：

```bash
node tools/build-gallery-featured.mjs
node tools/build-gallery-featured.mjs --check
node tools/check-gallery.mjs
```

这两个工具只使用 Node.js 内置模块。生成器同步精选数据与数量；检查器核对数据一致性、研究入口、封面、文档和许可路径。精选六项的元数据从完整目录派生，默认顺序在加载完整目录、筛选后返回及展开弹窗时保持一致。旧的 `tools/generate_index.py` 兼容入口也只更新数据，不再覆盖首页布局。

## 研究产物

| 文件                                                            | 用途                           |
| --------------------------------------------------------------- | ------------------------------ |
| `teardown.html`                                                 | 可交互的研究页与复现示例       |
| `设计解构.md`                                                   | 视觉系统、布局与交互分析       |
| `复刻指南.md`                                                   | 实现步骤与工程取舍             |
| `出处与方法.md`                                                 | 捕获来源、测量方法、推断和局限 |
| `事实核查.md`、`设计评审.md`                                    | 逐项核对与研究复盘             |
| `tokens.json`、`design-tokens.css`、`real-assets/manifest.json` | 已采集的结构化证据与资产出处   |

具体产物以每份研究为准。可复用的捕获与研究流程位于 [design-teardown Skill](skills/design-teardown/SKILL.md)。通过 Claude Code 插件市场安装：

```text
/plugin marketplace add YunyueLi/design-teardowns
/plugin install design-teardown@design-teardowns
```

也可使用仓库中的 [design-teardown.skill](design-teardown.skill)。捕获工具的浏览器依赖与画廊运行依赖分开管理。

## 验证与交付

浏览器验收覆盖五站停靠、连续滚动、阶段切换、搜索分页、键盘、横竖屏及真实 WebGL 故障恢复；馆藏专项检查 **18/18 通过**。README 上图来自本次实际运行的页面。命令、实测数据和验证边界见 [验收记录](ACCEPTANCE.md)。发布前由 CI 重跑数据与浏览器检查，通过后部署到 GitHub Pages；线上版本以 [发布记录](https://github.com/YunyueLi/design-teardowns/actions/workflows/pages.yml) 为准。

## 授权

项目代码采用 [MIT](LICENSE-CODE)，项目有权许可的原创内容采用 [CC BY 4.0](LICENSE)。第三方商标、截图内容、字体、媒体和原站素材保留原权利人的权利；素材的研究用途与使用边界见 [NOTICE](NOTICE) 及各研究的出处文档。

Three.js 与内置字体的许可随仓库保存。本项目独立于所研究产品，无隶属、赞助或背书关系。
