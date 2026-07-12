#!/usr/bin/env python3
"""Scan a Chromium .pak and save embedded media (mp4/mp3/png/jpg/webp/woff/ogg)."""
import os, sys, struct, gzip
try:
    import brotli
    HB=True
except Exception:
    HB=False
pak=sys.argv[1]; out=sys.argv[2]; os.makedirs(out, exist_ok=True)
data=open(pak,"rb").read()
ver=struct.unpack_from("<I",data,0)[0]
entries=[]
if ver==5:
    enc,rc,ac=struct.unpack_from("<BxxxHH",data,4); idx=12
    offs=[struct.unpack_from("<HI",data,idx+6*i) for i in range(rc+1)]
    for i in range(rc): entries.append((offs[i][0],offs[i][1],offs[i+1][1]))
else:
    rc,enc=struct.unpack_from("<IB",data,4); idx=9
    offs=[struct.unpack_from("<HI",data,idx+6*i) for i in range(rc+1)]
    for i in range(rc): entries.append((offs[i][0],offs[i][1],offs[i+1][1]))

def dec(b):
    if len(b)>=2 and b[0]==0x1f and b[1]==0x8b:
        try: return gzip.decompress(b)
        except: return b
    if len(b)>=8 and b[0]==0x1e and b[1]==0x9b and HB:
        try: return brotli.decompress(b[8:])
        except: return b
    return b

def kind(b):
    if len(b)>=12 and b[4:8]==b'ftyp': return 'mp4'
    if b[:8]==b'\x89PNG\r\n\x1a\n': return 'png'
    if b[:2]==b'\xff\xd8': return 'jpg'
    if b[:4]==b'RIFF' and b[8:12]==b'WEBP': return 'webp'
    if b[:3]==b'ID3' or b[:2] in (b'\xff\xfb',b'\xff\xf3',b'\xff\xf2'): return 'mp3'
    if b[:4]==b'OggS': return 'ogg'
    if b[:4] in (b'wOFF',b'wOF2'): return 'woff'
    return None

saved=[]
for rid,s,e in entries:
    b=dec(data[s:e])
    k=kind(b)
    if k in ('mp4','mp3','ogg','woff') or (k in ('png','webp') and len(b)>20000):
        fn=os.path.join(out,f"{rid}.{k}")
        open(fn,"wb").write(b); saved.append((rid,k,len(b)))
for rid,k,n in sorted(saved,key=lambda x:-x[2]):
    print(f"  id={rid:<6} {k:<5} {n:>10}B")
print(f"total media saved: {len(saved)}")
