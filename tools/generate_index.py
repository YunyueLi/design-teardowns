#!/usr/bin/env python3
"""Legacy command: generate gallery data/count text, then run static checks.

The old eleven-study homepage template has been retired. This entry point never
rebuilds HTML layout; build-gallery-featured.mjs owns the narrow count-text edit.
"""
import argparse
from pathlib import Path
import shutil
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check only; write no files")
    args = parser.parse_args()
    node = shutil.which("node")
    if node is None:
        print("FAIL: Node.js is required for gallery generation and checks; no files written.", file=sys.stderr)
        return 1

    tools = Path(__file__).resolve().parent
    print("Compatibility entry: the legacy homepage template is retired.", flush=True)
    print("Check only; no files will be written." if args.check else
          "Generate featured data and homepage count text only; preserve the existing layout.", flush=True)
    generate = [node, str(tools / "build-gallery-featured.mjs")]
    if args.check:
        generate.append("--check")
    for command in [generate, [node, str(tools / "check-gallery.mjs")]]:
        result = subprocess.run(command, check=False)
        if result.returncode:
            print("FAIL: gallery maintenance stopped; see the error above.", file=sys.stderr)
            return result.returncode
    print("PASS: gallery data and resource checks complete; homepage layout preserved.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
