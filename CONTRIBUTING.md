# Contributing to Design Teardowns / 贡献指南

Thank you for helping grow this gallery of design teardowns. This guide explains
how to contribute a new teardown and the one rule that keeps the project safe to
publish: only publishable material may be added here.

By taking part you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

感谢你参与扩充这个设计拆解画廊。本指南说明如何贡献一篇新的拆解，以及保证项目可以
公开发布的唯一硬规则：只允许加入可公开的材料。参与即表示你同意遵守本项目的
[行为准则](CODE_OF_CONDUCT.md)。

---

## What you can contribute / 可以贡献什么

- A new teardown of a real product's landing page.
- Fixes or improvements to an existing teardown, its tokens, or its write-up.
- Improvements to the gallery, the scaffolding, or the extraction scripts.

---

## The one hard rule: publishable material only / 唯一硬规则：只收录可公开材料

This is a **public** repository. Add only material that is lawful to publish
here.

Allowed:

- Factual design tokens: color values, font-family names, easing curves,
  durations, and corner radii. Facts are not copyrightable.
- Your own original analysis, commentary, and write-up.
- CSS that you reimplemented yourself.
- Low-resolution screenshots used for commentary and illustration.

Never add, and never commit:

- Commercial or proprietary fonts (no `.woff2`, `.otf`, or `.ttf` files).
- Video or audio captured from the subject (no `.mp4`, `.webm`, `.mp3`, or
  `.wav` files).
- Proprietary source code copied from the subject.

If your analysis relied on any of the above, do not include the asset itself.
Instead, describe it in the teardown as a short manifest entry and link to its
original source, so a reader can obtain it from the rights holder. The
[`.gitignore`](.gitignore) in this repository blocks these binary types as a
safety net, but the responsibility is ultimately yours.

中文要点：本仓库是公开仓库，只允许加入可以合法公开的材料，即客观设计标记（颜色、
字体名称、缓动、时长、圆角）、你自己的原创分析与评论、你自己重新实现的 CSS，以及
用于评论的低分辨率截图。切勿加入商业或专有字体、从被分析产品截取的视频或音频，以及
被分析产品的专有源码；若分析用到了这些素材，请改为在拆解文档中以清单方式描述，并
链接原始出处。仓库中的 `.gitignore` 会作为安全网拦截这些二进制类型，但最终责任
在贡献者本人。

---

## Folder convention / 目录约定

Each teardown lives in its own kebab-case folder under `teardowns/`, using the
fixed filenames below so the gallery and tooling can find everything:

```
teardowns/<subject-slug>/
├── teardown.html        # the interactive teardown page; self-contained; opens via file://
├── design-tokens.css    # the extracted tokens as CSS custom properties
├── tokens.json          # the same tokens as structured JSON (colors, fonts, easing, durations, radii)
├── <docs>.md            # your design write-up and analysis (one or more Markdown docs)
└── assets/              # low-resolution screenshots and other publishable images
```

- `<subject-slug>` is kebab-case, for example `linear` or `notion`.
- Keep the fixed filenames shown above. The gallery relies on them.
- `teardown.html` must be self-contained. Inline everything, or reference files
  by relative path within the folder, so the page opens directly from disk via
  `file://` with no server and no build step. There is no build system in this
  project.

---

## Steps to add a teardown / 新增拆解的步骤

1. Create `teardowns/<subject-slug>/` and add the files shown above.
2. Fill `tokens.json` and `design-tokens.css` with the real values you extracted.
3. Write your design docs (one or more Markdown files): your original analysis,
   presented in the subject's own design language.
4. Put only low-resolution screenshots into `assets/`.
5. Regenerate the gallery index so your teardown appears. See the repository
   README for how the gallery index is produced. Because there is no build
   system, this may be a small script run or a manual entry in
   `teardowns/index.html`.
6. Open both `teardowns/index.html` and your `teardown.html` directly from disk
   (double-click the file, or use a `file://` URL) and confirm they render
   correctly with no network access.
7. Declare the license of anything you added (see below), then open a pull
   request using the template.

---

## Declaring licenses of added material / 声明所加材料的许可

- By contributing, you agree that the code you add is offered under the MIT
  License ([LICENSE-CODE](LICENSE-CODE)) and that your original content is
  offered under CC BY 4.0 ([LICENSE](LICENSE)).
- If you include any third-party material that carries its own license (for
  example, an openly licensed asset, or a screenshot you did not take yourself),
  say so explicitly in your pull request. Name the material, its source, and its
  license. Do not include material you are not permitted to publish.

贡献即表示：你所加入的代码依 MIT 许可证提供，你的原创内容依 CC BY 4.0 提供。若加入
任何带有独立许可的第三方材料，请在合并请求中写明该材料、来源与许可；不得加入你无权
公开的材料。

---

## Developer Certificate of Origin (sign-off) / 开发者原创声明（签署）

This project uses the [Developer Certificate of Origin](https://developercertificate.org).
Every commit must be signed off, which certifies that you wrote the contribution
or otherwise have the right to submit it under the project's licenses. Add the
sign-off automatically with:

```
git commit -s -m "your message"
```

This appends a `Signed-off-by` trailer to the commit message. Pull requests
whose commits are not signed off may be asked to amend before they can be merged.

本项目采用「开发者原创声明」（DCO）。每个提交都必须签署，以证明该贡献由你本人完成，
或你有权依本项目许可提交。用 `git commit -s` 即可自动追加 `Signed-off-by` 尾注；
未签署的提交在合并前可能会被要求补签。

---

## Pull request checklist / 合并请求清单

Before opening a pull request, confirm the items in the pull request template:
the folder convention is followed, the gallery is regenerated, the page opens
under `file://`, no commercial fonts, video, audio, or proprietary source were
added, the license of any added material is declared, and screenshots are
attached.
