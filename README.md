# Design Teardowns

> Reverse-engineer world-class product landing pages into **source-level** design teardowns — real extracted design tokens, evidence-backed analysis, each rebuilt in the subject's own visual language.
>
> 把顶级产品落地页拆到可复刻的每一个数值:真实抽取的设计 token 加逐值可回溯的分析,用被拆对象自己的视觉语言重建。

[![License: MIT (code)](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE-CODE) [![License: CC BY 4.0 (content)](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey.svg)](LICENSE) [![Claude Agent Skill](https://img.shields.io/badge/Claude-Agent%20Skill-8A3FFC.svg)](skills/design-teardown) ![No build](https://img.shields.io/badge/build-none-brightgreen.svg)

**Live gallery:** https://yunyueli.github.io/design-teardowns/ — or clone and double-click `index.html`.

Design Teardowns is two things in one repo:

1. **A gallery of 17 in-depth teardowns** — famous AI-native products (Comet, Linear, Notion, ChatGPT, Gemini), flagship marketing sites (Shopify Editions, Arknights: Endfield), and indie work. Each is a self-contained interactive page plus design docs, built in that product's own visual language.
2. **A reusable Claude Agent Skill** — [`design-teardown`](skills/design-teardown) — that produces one for any URL: it pulls real computed styles and design tokens with Playwright, then writes the teardown page, the replication docs, and an adversarial self-review.

The principle throughout is **facts, not vibes**: every color, font, easing curve, and duration is measured from the live site, never eyeballed.

## The teardowns

| Site | Teardown | Signature look |
|---|---|---|
| **Comet** (flagship, native app) | [`teardowns/comet/`](teardowns/comet/teardown.html) | Cosmic planet motif, source-level tokens, real CDP recording |
| Linear | [`teardowns/linear/`](teardowns/linear/teardown.html) | Dark precision, animated agent dot-matrix |
| Moonshot AI | [`teardowns/moonshot/`](teardowns/moonshot/teardown.html) | Pure black, eclipse halo, brand-type RGB glitch |
| tutti | [`teardowns/tutti/`](teardowns/tutti/teardown.html) | Cinematic black, parallax hero, macOS window frame |
| OJO | [`teardowns/ojo/`](teardowns/ojo/teardown.html) | Starry-night narrative, typewriter code, skill marquee |
| Converge AI | [`teardowns/converge/`](teardowns/converge/teardown.html) | Minimal black-and-white, floating converging orbs |
| ChatGPT | [`teardowns/chatgpt/`](teardowns/chatgpt/teardown.html) | Minimal white, prompt-card sea, watercolor base |
| Notion | [`teardowns/notion/`](teardowns/notion/teardown.html) | Friendly white, highlight pills, hand-drawn avatars |
| Gemini | [`teardowns/gemini/`](teardowns/gemini/teardown.html) | Soft glow gradients, rounded chat entry |
| Lovart | [`teardowns/lovart/`](teardowns/lovart/teardown.html) | Elegant serif, agent thinking-process visualized |
| Latrix | [`teardowns/latrix/`](teardowns/latrix/teardown.html) | Off-white gallery wall, giant Playfair serif, twisting wordmark helix |
| **Shopify Editions W26** | [`teardowns/shopify-editions/`](teardowns/shopify-editions/teardown.html) | Renaissance manuscript: da Vinci construction lines, Theatre.js-driven WebGL, a two-window WebRTC key easter egg |
| **Arknights: Endfield** | [`teardowns/endfield/`](teardowns/endfield/teardown.html) | Industrial HUD, 218k-point E.P.S point-cloud ritual, luminance-keyed FX pipeline |
| Lagom (imlagom) | [`teardowns/imlagom/`](teardowns/imlagom/teardown.html) | Paper viewfinder: travel photo annuals, quiet personal-site typography |
| EasyCode | [`teardowns/easycode/`](teardowns/easycode/teardown.html) | White paper and red pen -- a graded-homework motif across sixteen screens |
| JourneyPilot | [`teardowns/journeypilot/`](teardowns/journeypilot/teardown.html) | Retro-aviation cockpit: crew instrument-panel dashboards |
| 海龟汤事务所 | [`teardowns/turtle-soup/`](teardowns/turtle-soup/teardown.html) | Rainy-night detective bureau, stamp-press physics on case files |

Each folder holds: `teardown.html` (interactive), `设计解构.md` / `复刻指南.md` / `出处与方法.md` (deconstruction, replication guide, provenance), `事实核查.md` / `设计评审.md` (fact-check and design review), `design-tokens.css`, `tokens.json`, and as-seen screenshots. Docs are in Chinese; tokens and code are language-neutral.

> **On assets.** This is the single archive repo: each teardown's `real-assets/` keeps copies of the third-party materials referenced during analysis (webfonts, media, production source bundles, captured geometry) strictly for design research, verification, and comparison (see [NOTICE](NOTICE)). Those materials belong to their owners and are excluded from this repo's licenses. Design tokens are factual measurements; the analysis and reimplemented CSS are original work.

## Use the skill

Ask in plain language — *"tear down the design of https://linear.app"*, *"reverse-engineer stripe.com's real colors, fonts and easing"*, *"扒出某站的真实配色、字体、缓动"* — and the skill runs the full pipeline.

**Install (Claude Code) — pick one:**

Plugin marketplace, two lines:
```
/plugin marketplace add YunyueLi/design-teardowns
/plugin install design-teardown@design-teardowns
```
Or copy the skill into your skills directory:
```bash
git clone https://github.com/YunyueLi/design-teardowns
cp -r design-teardowns/skills/design-teardown ~/.claude/skills/
```
Or grab the packaged skill: download [`design-teardown.skill`](design-teardown.skill) and drag it into Claude (Settings, then Skills), or unzip it into `~/.claude/skills/`.

**Run the pipeline directly** (needs Playwright: `pip install playwright && playwright install chromium`):
```bash
python skills/design-teardown/scripts/capture_site.py --url https://example.com --out ./out/example --name Example
python skills/design-teardown/scripts/build_index.py --dir ./out    # gallery cover for many sites
```

## How it works

The skill follows one pipeline, and every step leaves a verifiable artifact:

1. **Capture (real, not guessed).** Playwright reads computed styles; a server-side fetch pulls stylesheet text directly (bypassing CORS). Out come `tokens.json` and `design-tokens.css`.
2. **Define the visual language.** Read the real base color, type, and motif; the teardown page is built in *that* language, never a shared template.
3. **Build the page and docs.** An interactive teardown that reproduces at least one signature effect with the real easing and durations, plus the replication guide and provenance docs. Every number is tagged measured-vs-inferred.
4. **Adversarial self-review.** A fact-check pass reconciles every number on the page against `tokens.json`, and a design review grades precision and completeness.

See [`skills/design-teardown/SKILL.md`](skills/design-teardown/SKILL.md) and its `references/` for the full method, including the native-app path (unpacking `resources.pak` and CDP frame capture) used for the Comet flagship.

## Open the examples

- **Live:** the gallery deploys to GitHub Pages at https://yunyueli.github.io/design-teardowns/.
- **Local, zero build:** clone, then double-click `index.html` (it redirects to the gallery). For full font fidelity, serve it locally — under `file://` the browser blocks local `@font-face`, so titles fall back to system fonts (content is unaffected):
  ```bash
  python3 -m http.server 8000    # then open http://localhost:8000
  ```

## Repo layout

| Path | What |
|---|---|
| `teardowns/` | The gallery `index.html` and one self-contained folder per site |
| `skills/design-teardown/` | The reusable skill (SKILL.md, scripts, references) |
| `tools/` | Extraction and recording scripts (web sites and native apps) |
| `.claude-plugin/marketplace.json` | Makes the repo a one-command plugin marketplace |

## License

Code (the gallery, scripts, and the skill) is **MIT** — see [LICENSE-CODE](LICENSE-CODE). Original teardown content (docs, measured token values, our own screenshots) is **CC BY 4.0** — see [LICENSE](LICENSE). Third-party product names, logos, and any reproduced material are excluded from these grants and remain the property of their owners.

## Disclaimer

This is an independent educational and research design study. It is **not affiliated with, endorsed by, or sponsored by** any of the companies whose products are analyzed. All product names, logos, and trademarks belong to their respective owners and are used nominatively for identification and commentary. No proprietary fonts, video, audio, or source code from the analyzed products are redistributed here. Full terms in [NOTICE](NOTICE). If you hold rights in referenced material and want something changed, please open an issue and we will act in good faith.
