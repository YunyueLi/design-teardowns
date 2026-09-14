#!/usr/bin/env python3
"""Stage tracked public files without altering media or the source checkout.

Archive-only source captures and raw scroll recordings stay in GitHub. A literal
URL, download link, or dynamic directory prefix in published code keeps them in
Pages too. Everything else under teardowns is retained conservatively.
"""
import argparse
from collections import deque
import html
import json
import re
import shutil
import subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

TEXT = {'.html', '.css', '.js', '.mjs', '.md', '.svg'}

def archive(path):
    return '/real-assets/source/' in path or path.endswith('/recording/scroll.webm')


def public(path):
    parts = Path(path).parts
    return (parts[0] in {'teardowns', 'skills'} or
            (len(parts) == 1 and not parts[0].startswith('.')))


def references(text, suffix):
    if suffix == '.md':
        # Actual Markdown links and reference definitions, not prose/code citations.
        return re.findall(r'\]\(<?([^\s)>]+)', text) + re.findall(r'^\s*\[[^\]]+\]:\s*<?([^\s>]+)', text, re.M)
    class Attributes(HTMLParser):
        def __init__(self):
            super().__init__()
            self.urls = []

        def handle_starttag(self, tag, attrs):
            for key, value in attrs:
                if value and key in {'src', 'href', 'poster', 'data', 'srcset'}:
                    self.urls.extend(part.strip().split()[0] for part in value.split(',') if part.strip())

    attributes = Attributes()
    if suffix in {'.html', '.svg'}:
        attributes.feed(text)
    # A conservative superset of HTML attributes, CSS URLs, JS/JSON literals,
    # module imports and dynamic template prefixes. It may keep extra files.
    values = re.findall(r'''["'`]([^"'`\n<>]+)["'`]''', text)
    values += re.findall(r'url\(\s*([^\s)"\']+)\s*\)', text)
    return values + attributes.urls


def targets(ref, source):
    ref = html.unescape(ref).replace('\\/', '/')
    if not ref or ref.startswith(('#', '//')) or re.match(r'^[a-z][a-z\d+.-]*:', ref, re.I):
        return []
    # Preserve a whole directory when a URL is assembled at runtime.
    prefix = re.split(r'\$\{|[\*]', ref, maxsplit=1)[0]
    prefix = unquote(urlsplit(prefix).path)
    if not prefix or '\\' in prefix:
        return []
    if prefix.startswith('/design-teardowns/'):
        prefix = prefix[len('/design-teardowns/'):]
        bases = [Path('.')]
    elif prefix.startswith('/'):
        prefix = prefix.lstrip('/')
        bases = [Path('.')]
    else:
        # Script URLs are often relative to the document, while imports are
        # relative to the script. Keep both interpretations when they exist.
        bases = [Path(source).parent, Path('.'), Path('teardowns')]
        if Path(source).suffix in {'.js', '.mjs', '.json'}:
            bases += [Path('teardowns') / part for part in ['_gallery']]
    import posixpath
    return [posixpath.normpath(str(base / prefix)) + ('/' if prefix.endswith('/') else '') for base in bases]


def select(root, paths):
    selected = {p for p in paths if public(p) and not archive(p)}
    excluded = {p for p in paths if public(p) and archive(p)}
    kept_archives = set()
    # Scan the published entry points; captured third-party source is an archive,
    # not application code. No generic tree shaking of dynamic runtime assets.
    known = set(paths)
    pending = deque(sorted(p for p in selected if Path(p).suffix in TEXT))
    scanned = set()
    while pending:
        source = pending.popleft()
        if source in scanned:
            continue
        scanned.add(source)
        suffix = Path(source).suffix
        text = (root / source).read_text(encoding='utf-8', errors='replace')
        for ref in references(text, suffix):
            for target in targets(ref, source):
                # Only URL-referenced JSON participates in dependency discovery;
                # unused research inventories do not pull every capture into Pages.
                if target in known and Path(target).suffix == '.json' and target not in scanned:
                    pending.append(target)
                if target in excluded:
                    kept_archives.add(target)
                archive_prefix = '/real-assets/' in target or '/recording/' in target
                if target.endswith('/') and archive_prefix:
                    kept_archives.update(p for p in excluded if p.startswith(target))
                # A JS literal may be a partial filename used in concatenation.
                if suffix in {'.js', '.mjs', '.html'} and archive_prefix:
                    kept_archives.update(p for p in excluded if p.startswith(target))
    selected.update(kept_archives)
    return selected, excluded - kept_archives


def package(root, output):
    root, output = root.resolve(), output.resolve()
    if output == root or root.is_relative_to(output):
        raise ValueError('Output must not contain the source checkout')
    if output.exists():
        raise ValueError('Output must be a new directory; refusing to overwrite files')
    paths = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')[:-1]
    for path in paths:
        if (root / path).is_symlink():
            raise ValueError(f'Symlinks are not supported: {path}')
    selected, excluded = select(root, paths)
    output.mkdir(parents=True)
    for path in sorted(selected):
        target = output / path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(root / path, target)
    (output / '.nojekyll').touch()
    size = lambda files: sum((root / p).stat().st_size for p in files)
    result = dict(files=len(selected), source_bytes=size(paths), published_bytes=size(selected),
                  omitted_bytes=size(set(paths) - selected), omitted_archives=sorted(excluded))
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True)
    parser.add_argument('--report')
    args = parser.parse_args()
    result = package(Path(__file__).resolve().parents[2], Path(args.output))
    if args.report:
        Path(args.report).write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({k: v for k, v in result.items() if k != 'omitted_archives'}))
