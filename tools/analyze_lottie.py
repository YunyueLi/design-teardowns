#!/usr/bin/env python3
import json, glob, os, sys

def hexc(arr):
    if not isinstance(arr, list) or len(arr) < 3: return None
    try:
        r,g,b = [max(0,min(255,round(float(x)*255))) for x in arr[:3]]
        return f"#{r:02x}{g:02x}{b:02x}"
    except Exception:
        return None

def walk_colors(o, out):
    # Lottie fill/stroke color: {"ty":"fl"/"st","c":{"a":0,"k":[r,g,b,a]}}
    if isinstance(o, dict):
        if o.get("ty") in ("fl","st") and isinstance(o.get("c"),dict):
            k = o["c"].get("k")
            h = hexc(k) if isinstance(k,list) else None
            if h: out.append(h)
        if o.get("ty")=="gf" and isinstance(o.get("g"),dict):  # gradient fill
            out.append("gradient")
        for v in o.values(): walk_colors(v,out)
    elif isinstance(o,list):
        for v in o: walk_colors(v,out)

def layer_names(layers, depth=0):
    names=[]
    for L in layers:
        nm=L.get("nm","?"); ty=L.get("ty")
        names.append(("  "*depth)+f"[{ty}] {nm}")
    return names

WORK=sys.argv[1]
files=sorted(glob.glob(os.path.join(WORK,"pak","interesting","*.json")))
for f in files:
    try:
        d=json.load(open(f))
    except Exception:
        continue
    if "layers" not in d: continue
    fr=d.get("fr",0); ip=d.get("ip",0); op=d.get("op",0)
    dur=(op-ip)/fr if fr else 0
    cols=[]; walk_colors(d,cols)
    from collections import Counter
    cc=Counter([c for c in cols if c!="gradient"])
    has_grad = "gradient" in cols
    print(f"\n=== {os.path.basename(f)}  nm='{d.get('nm','')}' ===")
    print(f"  {d.get('w')}x{d.get('h')}  fr={fr}fps  frames={ip}->{op}  dur={dur:.2f}s  layers={len(d.get('layers',[]))}  assets={len(d.get('assets',[]))}  gradients={has_grad}")
    mk=d.get("markers",[])
    if mk: print("  markers:", [ (m.get('cm') or m.get('tm')) for m in mk][:12])
    top=cc.most_common(12)
    if top: print("  palette:", ", ".join(f"{h}x{n}" for h,n in top))
    lns=layer_names(d.get("layers",[]))
    print("  layers:")
    for ln in lns[:18]: print("   ",ln)
