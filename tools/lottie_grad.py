#!/usr/bin/env python3
import json, glob, os, sys
WORK=sys.argv[1]

def hx(r,g,b):
    f=lambda x:max(0,min(255,round(float(x)*255)))
    return f"#{f(r):02x}{f(g):02x}{f(b):02x}"

def grads(o, out):
    if isinstance(o,dict):
        if o.get("ty")=="gf" or o.get("ty")=="gs":
            g=o.get("g",{})
            n=g.get("p",0)
            k=g.get("k",{}).get("k")
            if isinstance(k,list) and n:
                stops=[]
                for i in range(n):
                    b=i*4
                    if b+3<len(k):
                        stops.append((round(k[b],3), hx(k[b+1],k[b+2],k[b+3])))
                out.append((o.get("ty"),stops))
        for v in o.values(): grads(v,out)
    elif isinstance(o,list):
        for v in o: grads(v,out)

for f in sorted(glob.glob(os.path.join(WORK,"pak","interesting","*.json"))):
    try: d=json.load(open(f))
    except: continue
    if "layers" not in d: continue
    L0=d["layers"][0]
    assets=d.get("assets",[])
    a0=assets[0] if assets else {}
    akeys=list(a0.keys())
    # asset image?
    p=a0.get("p",""); embedded = isinstance(p,str) and p.startswith("data:")
    out=[]; grads(d,out)
    print(f"\n=== {os.path.basename(f)} '{d.get('nm','')}' ===")
    print(f"  layer0 ty={L0.get('ty')} (0=precomp,1=solid,2=img,4=shape)  refId={L0.get('refId')}")
    print(f"  asset0 keys={akeys} embedded_image={embedded} external_file={a0.get('u','')+a0.get('p','') if not embedded else 'n/a'}")
    print(f"  gradient fills: {len(out)}")
    for ty,stops in out[:4]:
        print(f"    {ty}: " + "  ".join(f"{pos}:{c}" for pos,c in stops))
