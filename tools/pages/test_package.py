import importlib.util
import subprocess
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('pages_package', Path(__file__).with_name('package.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class PackageTests(unittest.TestCase):
    def test_preserves_runtime_downloads_and_dynamic_archives_without_modifying_bytes(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'repo'
            root.mkdir()
            files = {
                'index.html': '<a href="teardowns/a/teardown.html">Go</a>',
                'teardowns/a/teardown.html': '''<video src="recording/comet.mp4"></video>
                    <a download href="real-assets/source/linked.html">Download</a>
                    <script>fetch('runtime.json'); const capture = `real-assets/source/chunk-${number}.js`;</script>''',
                'teardowns/a/runtime.json': '{"file":"real-assets/source/from-data.css"}',
                'teardowns/a/real-assets/source/from-data.css': 'runtime data dependency',
                'teardowns/a/research.md': '[Recording](recording/scroll.webm)\n`real-assets/source/unused.html`',
                'teardowns/a/recording/comet.mp4': 'unchanged video',
                'teardowns/a/recording/scroll.webm': 'linked recording',
                'teardowns/b/recording/scroll.webm': 'unlinked recording',
                'teardowns/a/real-assets/source/linked.html': 'download',
                'teardowns/a/real-assets/source/chunk-1.js': 'dynamic',
                'teardowns/a/real-assets/source/unused.html': 'archive',
                'teardowns/a/real-assets/image/unproven.png': 'retain unknown media',
                'tools/private.txt': 'maintenance',
                '.impeccable/settings.txt': 'maintenance',
                'LICENSE': 'license',
                'design-teardown.skill': 'downloadable skill',
            }
            for path, value in files.items():
                target = root / path
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(value)
            subprocess.run(['git', 'init', '-q', str(root)], check=True)
            subprocess.run(['git', '-C', str(root), 'add', '.'], check=True)
            (root / 'teardowns/untracked.secret').write_text('never publish')
            output = Path(temporary) / 'site'
            report = module.package(root, output)
            excluded = {'tools/private.txt', '.impeccable/settings.txt',
                        'teardowns/b/recording/scroll.webm', 'teardowns/a/real-assets/source/unused.html'}
            for path, value in files.items():
                self.assertEqual((output / path).exists(), path not in excluded, path)
                self.assertEqual((root / path).read_text(), value)
                if path not in excluded:
                    self.assertEqual((output / path).read_bytes(), (root / path).read_bytes())
            self.assertFalse((output / 'teardowns/untracked.secret').exists())
            self.assertTrue((output / '.nojekyll').exists())
            self.assertLess(report['published_bytes'], report['source_bytes'])
            with self.assertRaises(ValueError):
                module.package(root, output)
            with self.assertRaises(ValueError):
                module.package(root, root)

    def test_unquoted_html_downloads(self):
        self.assertIn('recording/scroll.webm', module.references('<a href=recording/scroll.webm download>Video</a>', '.html'))

    def test_encoded_links_and_directory_prefixes(self):
        self.assertIn('teardowns/a/real-assets/source/', module.targets('real-assets/source/', 'teardowns/a/teardown.html'))
        self.assertIn('teardowns/a/recording/scroll.webm', module.targets('/design-teardowns/teardowns/a/recording/scroll.webm', 'index.html'))
        self.assertIn('teardowns/a/事实.md', module.targets('%E4%BA%8B%E5%AE%9E.md?download=1#top', 'teardowns/a/teardown.html'))
        self.assertEqual(module.targets('https://example.com/recording/scroll.webm', 'index.html'), [])


if __name__ == '__main__':
    unittest.main()
