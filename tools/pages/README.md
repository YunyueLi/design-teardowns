# Pages publication package

`python3 tools/pages/package.py --output _site` copies tracked public files into a
new directory without changing their bytes. It includes the root landing page,
root documents/licenses/downloads, `skills/`, and `teardowns/`. Maintenance tools,
agent settings, dependencies and untracked files are not published.

The only excluded files inside `teardowns/` are captured upstream source files
under `real-assets/source/` and raw `recording/scroll.webm` research recordings
that have no URL reference from published HTML/CSS/JavaScript/SVG or Markdown
links. Actual embeds/downloads and dynamic archive directory prefixes retain
those files. Other media, fonts, models, offline pages, research documents and
metadata stay intact. This intentionally avoids general-purpose tree shaking.
Archive originals remain available in the GitHub repository; plain-text source
citations in research documents refer to that repository. To publish an archive,
add an actual relative link from a published page/document. JSON files referenced by published URLs are scanned for dependencies too;
unreferenced research inventories do not pull every archived capture into Pages.

The browser acceptance server serves `_site`, and deployment builds the same
directory. Changes to the packaging script or Pages workflow require site
validation and publication. A byte/count summary is printed on every build;
`--report /tmp/package-report.json` also records omitted archive paths.

After `deploy-pages` finishes successfully, a separate job with `actions: write`
checks the uploaded artifact ID, name and workflow run ID, then deletes only that
run's `github-pages` artifact. It does not delete run logs, reports or other runs'
packages. A failed/cancelled deployment retains its package; one-day expiration
is the fallback if cleanup cannot run. Removing this transfer artifact does not
remove the deployed site. Old successful packages cannot be reused for a deploy
job rerun: rerun the full publishing workflow to build/upload a fresh package.

Local verification:

```sh
python3 -m unittest discover -s tools/pages -p 'test_*.py'
npm test --prefix tools/ci
python3 tools/pages/package.py --output /tmp/new-pages-preview --report /tmp/pages-report.json
```
