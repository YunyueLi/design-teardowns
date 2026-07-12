#!/usr/bin/env python3
"""Extract a Chromium .pak (GRIT data pack) and surface interesting WebUI resources.

Handles pak v4 and v5, and per-resource gzip / Chromium-brotli compression.
Writes decompressed 'interesting' resources (matching keyword filter) to <out>/interesting/,
and a full manifest to <out>/manifest.tsv.
"""
import os, sys, struct, gzip, io, re

pak_path = sys.argv[1]
out = sys.argv[2]
os.makedirs(os.path.join(out, "interesting"), exist_ok=True)

try:
    import brotli  # type: ignore
    HAVE_BROTLI = True
except Exception:
    HAVE_BROTLI = False

data = open(pak_path, "rb").read()
version = struct.unpack_from("<I", data, 0)[0]

entries = []  # (id, start, end)
if version == 5:
    encoding, res_count, alias_count = struct.unpack_from("<BxxxHH", data, 4)
    idx = 12
    offs = []
    for i in range(res_count + 1):
        rid, off = struct.unpack_from("<HI", data, idx); idx += 6
        offs.append((rid, off))
    for i in range(res_count):
        entries.append((offs[i][0], offs[i][1], offs[i + 1][1]))
elif version == 4:
    res_count, encoding = struct.unpack_from("<IB", data, 4)
    idx = 9
    offs = []
    for i in range(res_count + 1):
        rid, off = struct.unpack_from("<HI", data, idx); idx += 6
        offs.append((rid, off))
    for i in range(res_count):
        entries.append((offs[i][0], offs[i][1], offs[i + 1][1]))
else:
    print("Unknown pak version:", version); sys.exit(1)

print(f"pak version={version} encoding={encoding} resources={len(entries)} brotli={HAVE_BROTLI}")

def decompress(blob):
    """Return (bytes, method)."""
    if len(blob) >= 2 and blob[0] == 0x1f and blob[1] == 0x8b:
        try:
            return gzip.decompress(blob), "gzip"
        except Exception:
            return blob, "gzip-fail"
    if len(blob) >= 8 and blob[0] == 0x1e and blob[1] == 0x9b:
        # Chromium brotli: 2 magic + 6-byte little-endian uncompressed length, then brotli stream
        payload = blob[8:]
        if HAVE_BROTLI:
            try:
                return brotli.decompress(payload), "brotli"
            except Exception:
                return blob, "brotli-fail"
        return blob, "brotli-nomod"
    return blob, "raw"

KEYS = re.compile(rb"perplexity|onboarding|indigo|comet|aurora|@keyframes|cubic-bezier|"
                  rb"framer|lottie|rive|spring|particle|webgl|--tw-|--color|"
                  rb"avatar|theme|gradient|backdrop-filter|animation:", re.I)

def sniff_ext(b):
    head = b[:400].lstrip()
    low = head.lower()
    if low.startswith(b"<!doctype html") or low.startswith(b"<html") or b"<meta" in low[:200]:
        return "html"
    if low.startswith(b"<svg") or (b"<svg" in low[:100]):
        return "svg"
    if head[:1] == b"{" or head[:1] == b"[":
        return "json"
    if b"@keyframes" in b[:2000] or b"{" in head and (b":" in head) and (b";" in head) and b"function" not in head[:80]:
        # crude css guess
        if re.search(rb"[.#:@\w\-\[\]]+\s*\{[^}]*:[^}]*;", b[:2000]):
            return "css"
    if b"function" in b[:2000] or b"=>" in b[:2000] or b"var " in b[:200] or b"const " in b[:200] or b"import" in b[:200]:
        return "js"
    return None

man = open(os.path.join(out, "manifest.tsv"), "w")
man.write("id\tstored_len\tmethod\tdecomp_len\text\tinteresting\tpreview\n")
interesting = []
kinds = {}
for rid, s, e in entries:
    blob = data[s:e]
    dec, method = decompress(blob)
    ext = sniff_ext(dec)
    is_txt = ext in ("html", "css", "js", "json", "svg")
    hit = bool(KEYS.search(dec[:20000])) if is_txt else False
    kinds[ext or method] = kinds.get(ext or method, 0) + 1
    prev = ""
    if is_txt:
        try:
            prev = dec[:80].decode("utf-8", "replace").replace("\t", " ").replace("\n", " ")
        except Exception:
            prev = ""
    man.write(f"{rid}\t{len(blob)}\t{method}\t{len(dec)}\t{ext}\t{int(hit)}\t{prev}\n")
    if hit:
        fn = os.path.join(out, "interesting", f"{rid}.{ext}")
        open(fn, "wb").write(dec)
        interesting.append((rid, ext, len(dec), prev))
man.close()

print("kind counts:", kinds)
print(f"\n== {len(interesting)} interesting resources ==")
for rid, ext, n, prev in sorted(interesting, key=lambda x: -x[2])[:60]:
    print(f"  id={rid:<6} {ext:<5} {n:>8}B  {prev[:70]}")
