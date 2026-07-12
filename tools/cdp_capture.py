#!/usr/bin/env python3
"""Connect to a Comet/Chromium CDP page target, screencast REAL frames while
gently driving the onboarding flow. No screen-recording permission needed —
frames come straight from the renderer over the DevTools protocol."""
import websocket, json, base64, os, sys, time

WS = sys.argv[1]; OUT = sys.argv[2]; DUR = float(sys.argv[3]); DRIVE = (len(sys.argv) > 4 and sys.argv[4] == '1')
os.makedirs(OUT, exist_ok=True)
ws = websocket.create_connection(WS, max_size=None, suppress_origin=True)
mid = 0
def send(method, params=None):
    global mid; mid += 1
    ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}})); return mid

send('Page.enable'); send('Runtime.enable'); send('DOM.enable')
send('Page.navigate', {'url': 'chrome://perplexity-onboarding/'})  # restart onboarding from frame 0
send('Page.startScreencast', {'format': 'jpeg', 'quality': 82, 'maxWidth': 1600, 'maxHeight': 1040, 'everyNthFrame': 1})

PROBE = ("(function(){return JSON.stringify({title:document.title,"
         "txt:(document.body.innerText||'').replace(/\\s+/g,' ').slice(0,220),"
         "btns:[].slice.call(document.querySelectorAll('button,[role=button]')).map(b=>(b.textContent||'').trim().slice(0,22)).filter(Boolean).slice(0,14),"
         "inputs:document.querySelectorAll('input').length});})()")
USERNAME = ("(function(){function s(e,v){var d=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;"
            "d.call(e,v);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}"
            "var i=document.querySelector('input');if(i){i.focus();s(i,'Nova');return 'typed:Nova';}return 'no-input';})()")
AVATAR = ("(function(){var a=document.querySelector('.b-profile-avatar__root,[class*=avatar] button,[class*=avatar]');"
          "if(a){a.click();return 'avatar-clicked';}return 'no-avatar';})()")
THEME = ("(function(){var t=document.querySelector('[class*=theme] button,[data-theme],[class*=Theme] [role=button],[class*=theme] [class*=option]');"
         "if(t){t.click();return 'theme-clicked';}return 'no-theme';})()")
ADVANCE = ("(function(){var bs=[].slice.call(document.querySelectorAll('button,[role=button]')).filter(b=>b.offsetParent!==null);"
           "var bad=/google|sign|account|log ?in|登录|import|导入|skip|跳过|later|稍后|maybe/i;"
           "var good=/继续|下一步|下一|continue|next|开始|get started|完成|done|finish|confirm|确认|同意|agree|start browsing|let'?s|go\\b/i;"
           "var g=bs.find(b=>good.test((b.textContent||'')+' '+(b.getAttribute('aria-label')||''))&&!bad.test(b.textContent||''));"
           "if(!g)g=bs.filter(b=>!bad.test(b.textContent||'')).pop();"
           "if(g){g.click();return 'click:'+(g.textContent||'').trim().slice(0,26);}return 'no-btn';})()")

acts = [(2.0, PROBE), (7.0, ADVANCE), (11.0, USERNAME), (14.5, ADVANCE), (18.5, AVATAR),
        (22.0, ADVANCE), (26.0, THEME), (29.5, ADVANCE), (33.5, ADVANCE), (37.5, ADVANCE), (41.0, PROBE)]

frames = []; i = 0; ai = 0; start = time.time()
log = open(OUT + '/drive.log', 'w')
ws.settimeout(1.0)
while time.time() - start < DUR:
    el = time.time() - start
    if DRIVE and ai < len(acts) and el >= acts[ai][0]:
        send('Runtime.evaluate', {'expression': acts[ai][1], 'userGesture': True, 'returnByValue': True})
        log.write(f'[{el:5.1f}] act#{ai}\n'); log.flush(); ai += 1
    try:
        msg = ws.recv()
    except websocket.WebSocketTimeoutException:
        continue
    except Exception as e:
        log.write('recv-err ' + str(e) + '\n'); break
    try:
        m = json.loads(msg)
    except Exception:
        continue
    if m.get('method') == 'Page.screencastFrame':
        p = m['params']
        try:
            open(f'{OUT}/f{i:05d}.jpg', 'wb').write(base64.b64decode(p['data']))
            frames.append(p.get('metadata', {}).get('timestamp') or time.time()); i += 1
        except Exception:
            pass
        try: send('Page.screencastFrameAck', {'sessionId': p['sessionId']})
        except Exception: pass
    elif 'result' in m and isinstance(m.get('result'), dict):
        rv = m['result'].get('result', {})
        if isinstance(rv, dict) and 'value' in rv:
            log.write('   -> ' + str(rv['value'])[:240] + '\n'); log.flush()

send('Page.stopScreencast')
with open(OUT + '/frames.txt', 'w') as ft:
    for j in range(len(frames)):
        ft.write(f"file '{OUT}/f{j:05d}.jpg'\n")
        d = 0.06
        if j < len(frames) - 1:
            d = max(0.02, min(1.1, frames[j + 1] - frames[j]))
        ft.write(f"duration {d:.3f}\n")
    if frames:
        ft.write(f"file '{OUT}/f{len(frames)-1:05d}.jpg'\n")
log.close(); print('frames_captured', i)
