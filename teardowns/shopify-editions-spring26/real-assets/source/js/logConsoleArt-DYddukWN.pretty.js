import {
    t as e
} from "./preload-helper-OoqSwf-_.js";
var t = 560,
    n = 300,
    r = -135,
    i = `rotateX(18deg) rotateY(-295deg)`,
    a = `animation:spring-2026-console-art-spin 120s linear infinite`,
    o = `color: #1a1a1a; color: CanvasText;`,
    s = `Shopify Editions | Spring ’26`,
    c = `███████╗██╗   ██╗███████╗██████╗ ██╗   ██╗██╗    ██╗██╗  ██╗███████╗██████╗ ███████╗
██╔════╝██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝██║    ██║██║  ██║██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██████╔╝ ╚████╔╝ ██║ █╗ ██║███████║█████╗  ██████╔╝█████╗  
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗  ╚██╔╝  ██║███╗██║██╔══██║██╔══╝  ██╔══██╗██╔══╝  
███████╗ ╚████╔╝ ███████╗██║  ██║   ██║   ╚███╔███╔╝██║  ██║███████╗██║  ██║███████╗
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝`,
    l = !1;

function u(e) {
    let t = encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (e, t) => String.fromCharCode(parseInt(t, 16)));
    return `data:image/svg+xml;base64,${btoa(t)}`
}

function d(e, t) {
    let n = t ? `transform:${i}` : `transform:${i};${a}`;
    return e.replace(`<style>`, `<style>:root{color-scheme:light dark}`).replace(`color:#000;`, o).replace(a, n)
}
async function f(i) {
    if (l || typeof window > `u`) return;
    l = !0;
    let a = i?.trim() || s,
        o = window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches === !0,
        f = window.navigator.userAgent.toLowerCase();
    if (f.includes(`safari`) && !f.includes(`chrome`)) console.log(`%c${c}`, `font-family: monospace; font-size: 11px; line-height: 1;`);
    else {
        let {
            default: i
        } = await e(async () => {
            let {
                default: e
            } = await import(`./heroRingConsole-DX389niE.js`);
            return {
                default: e
            }
        }, []), a = u(d(i, o));
        console.log(`%c `, `
      color: transparent;
      display: inline-block;
      font-size: 1px;
      line-height: 0;
      padding: 0 0 ${n}px ${t}px;
      background-image: url(${a});
      background-position: left ${r}px;
      background-repeat: no-repeat;
      background-size: ${t}px ${t}px;
      `)
    }
    console.log(`%c%s`, `font-family: monospace; font-size: 16px;`, a)
}
export {
    f as logConsoleArt
};
//# sourceMappingURL=logConsoleArt-DYddukWN.js.map