<div align="center">

<a href="https://yunyueli.github.io/design-teardowns/teardowns/index.html">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/YunyueLi/design-teardowns/main/teardowns/_gallery/beamline-readme.jpg">
    <img src=".github/readme/beamline.webp" width="100%" alt="The Design Teardowns gallery: a study rides a live Three.js beamline through Capture, Measure, Reconstruct, Verify and Archive.">
  </picture>
</a>

<sub>Real capture of the running gallery: each frame is the live WebGL scene, settled at an exact scroll position.</sub>

# Design Teardowns

**Interfaces, examined.** Great interfaces, taken apart into design knowledge you can verify and reuse.

[Open the gallery](https://yunyueli.github.io/design-teardowns/teardowns/index.html) · [Method](skills/design-teardown/references/method.md) · [Run a teardown](#run-your-own-teardown) · [Rights & sources](NOTICE) · [简体中文](README.zh-CN.md)

</div>

## One study, five stations

<table>
  <tr>
    <td align="center" valign="top" width="20%"><sub>01</sub><br><b>Capture</b><br><sub>Start with the real interface.</sub></td>
    <td align="center" valign="top" width="20%"><sub>02</sub><br><b>Measure</b><br><sub>Measure the system, not the surface.</sub></td>
    <td align="center" valign="top" width="20%"><sub>03</sub><br><b>Reconstruct</b><br><sub>Reconstruct from evidence.</sub></td>
    <td align="center" valign="top" width="20%"><sub>04</sub><br><b>Verify</b><br><sub>Every claim is traceable.</sub></td>
    <td align="center" valign="top" width="20%"><sub>05</sub><br><b>Archive</b><br><sub>A living archive of design evidence.</sub></td>
  </tr>
</table>

Every study starts from the live page. It records assets and interaction states, measures type, color, layout and motion, rebuilds the key experience in the original's own design language, then checks each conclusion against its source.

<img src=".github/readme/measured.svg" width="18" height="10" alt=""> **Measured** marks a traceable, direct observation. <img src=".github/readme/inferred.svg" width="18" height="10" alt=""> **Inferred** marks a reading built on evidence, with its basis and limits disclosed.

In the gallery, the five stations form one live Three.js instrument. Scroll or pick a station and the conveyor, rollers and specimen move together while the camera follows; scrolling holds its place, and picking a station docks precisely. Phone, landscape, keyboard and reduced-motion paths are covered, and a static entry still leads to the studies when 3D is unavailable. The scene pictures the process; the conclusions live in each study's evidence.

## On view

Six studies are featured in the gallery. Each is an interactive page written in its subject's own design language.

<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/shopify-editions/teardown.html"><img src=".github/readme/studies/shopify-editions.jpg" alt="The Shopify Editions Winter ’26 study page"><br><b>Shopify Editions Winter ’26</b></a><br>
      <sub>The Renaissance Edition<br>Web · Launch system</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/ungetsu/teardown.html"><img src=".github/readme/studies/ungetsu.jpg" alt="The ungetsu study page"><br><b>ungetsu · 雲月</b></a><br>
      <sub>A moon that dissolves into dust<br>Web · Photographic gallery</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/pear/teardown.html"><img src=".github/readme/studies/pear.jpg" alt="The Pear study page"><br><b>Pear</b></a><br>
      <sub>Pear makes you appear<br>Web · Scroll film</sub>
    </td>
  </tr>
</table>
<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/shopify-editions-spring26/teardown.html"><img src=".github/readme/studies/shopify-editions-spring26.jpg" alt="The Shopify Editions Spring ’26 study page"><br><b>Shopify Editions Spring ’26</b></a><br>
      <sub>The Everywhere Edition<br>Web · Launch system</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/moonshot/teardown.html"><img src=".github/readme/studies/moonshot.jpg" alt="The Moonshot AI study page"><br><b>Moonshot AI · 月之暗面</b></a><br>
      <sub>The dark side of the moon<br>Web · AI platform</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://yunyueli.github.io/design-teardowns/teardowns/comet/teardown.html"><img src=".github/readme/studies/comet.jpg" alt="The Comet study page"><br><b>Comet</b></a><br>
      <sub>Perplexity's native browser<br>Desktop · AI browser</sub>
    </td>
  </tr>
</table>

The archive holds **21 studies** across reference, agent, product and independent work. Search, filter and page through all of them in the [gallery](https://yunyueli.github.io/design-teardowns/teardowns/index.html), or read the full [catalogue](teardowns/_gallery/catalogue.js). Study pages and write-ups are in Simplified Chinese; tokens, CSS and reconstructions read in any language.

## Inside a study

Each study lives in `teardowns/<slug>/`. What it holds depends on the subject:

| File | Contents |
| :--- | :--- |
| `teardown.html` | The interactive study page, with working reconstructions |
| `设计解构.md` · design anatomy | Visual system, layout and interaction analysis |
| `复刻指南.md` · rebuild guide | Implementation steps and engineering trade-offs |
| `出处与方法.md` · sources and method | Capture sources, measurement method, inferences and limits |
| `事实核查.md` · `设计评审.md` · fact check and review | Item-by-item verification and a retrospective |
| `tokens.json` · `design-tokens.css` | Extracted tokens as structured evidence |
| `real-assets/manifest.json` | Provenance of the collected assets |

## Run your own teardown

The capture and research workflow ships as the [design-teardown skill](skills/design-teardown/SKILL.md) for Claude Code. It pulls real computed styles and files from the live page with Playwright instead of estimating by eye, and labels every value by its source. Install it from the plugin marketplace:

```text
/plugin marketplace add YunyueLi/design-teardowns
/plugin install design-teardown@design-teardowns
```

Or use [design-teardown.skill](design-teardown.skill) from this repository. The capture tools manage their browser dependencies separately from the gallery runtime.

## Run locally

From the repository root:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Then open the [local gallery](http://127.0.0.1:4174/teardowns/index.html). There is no npm install, build step or backend: the runtime, fonts and images ship with the repository. Serve over HTTP, since `file://` blocks the image textures.

## Maintain the archive

New studies follow the [contributing guide](CONTRIBUTING.md). Add a provenance-checked record to [catalogue.js](teardowns/_gallery/catalogue.js), along with its study page and cover, then run:

```bash
node tools/build-gallery-featured.mjs
node tools/build-gallery-featured.mjs --check
node tools/check-gallery.mjs
```

Both tools use only Node.js built-ins. The generator syncs the featured data and counts; the checker verifies data consistency, study entries, covers, documents and license paths. The six featured records derive from the full catalogue, and their default order holds when the full catalogue loads, after filtering and when the archive dialog opens. The legacy `tools/generate_index.py` entry point only updates data; it no longer rewrites the homepage layout.

The README media come from the running gallery. With the local server up, `node tools/readme-media.mjs` recaptures the loop above, its still (also the gallery's social image) and the study thumbnails. It needs hardware WebGL, the locked browser dependency (`npm ci --ignore-scripts --prefix tools/browser`) and Python 3 with Pillow. It warns when the grid under [On view](#on-view) no longer matches the featured order.

Implementation notes are in [DESIGN.md](DESIGN.md), and product behavior in [PRODUCT.md](PRODUCT.md).

## Verification and delivery

Browser acceptance covers five-station docking, continuous scrolling, station changes, search and pagination, keyboard use, portrait and landscape layouts, and recovery from real WebGL context loss. The latest full local run passed **45/45** (functional acceptance under SwiftShader; GPU timing thresholds are not certified). Commands, measurements and limits are in the [acceptance record](ACCEPTANCE.md). CI reruns the data and browser checks before each GitHub Pages deploy; the [Pages workflow](https://github.com/YunyueLi/design-teardowns/actions/workflows/pages.yml) records what is live.

## License

Code is [MIT](LICENSE-CODE). Original content the project has the right to license is [CC BY 4.0](LICENSE). Third-party marks, screenshot content, fonts, media and source assets keep their owners' rights; see [NOTICE](NOTICE) and each study's sources document for how they are used for research and where that use stops.

Three.js and the bundled font licenses ship with the repository. This project is independent of the products it studies and has no affiliation with, sponsorship from or endorsement by them.
