#!/usr/bin/env bash
set -euo pipefail

# Pin both the release and checksum; do not execute a mutable install script.
if [ -z "${ACTIONLINT_BIN:-}" ]; then
  test "$(uname -s)-$(uname -m)" = Linux-x86_64
  lint_dir="$(mktemp -d "${RUNNER_TEMP:-/tmp}/design-actionlint.XXXXXX")"
  trap 'rm -rf "$lint_dir"' EXIT
  archive=actionlint_1.7.12_linux_amd64.tar.gz
  curl --fail --silent --show-error --location --retry 2 --max-time 60 \
    "https://github.com/rhysd/actionlint/releases/download/v1.7.12/$archive" -o "$lint_dir/$archive"
  echo "8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8  $lint_dir/$archive" | sha256sum --check
  tar -xzf "$lint_dir/$archive" -C "$lint_dir" actionlint
  ACTIONLINT_BIN="$lint_dir/actionlint"
fi
"$ACTIONLINT_BIN" -shellcheck= .github/workflows/*.yml
