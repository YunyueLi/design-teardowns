/* ============================================================
   EasyCode 落地页 · 动效与装置底座
   契约:docs/landing-pages/easycode/DESIGN.md
   底座:vendored GSAP core + ScrollTrigger + SplitText + Lenis(零外部请求)。
   全局法则(用户明令):双向可重演——窗口经过即重演,向上向下都演,
   但运动方向必须与滚动方向一致:向下从下方进入/向上离开,
   向上从上方进入/向下离开;仪式(印章/盖章/描画)同样反向响应。
   章节标题例外:只在首次经过时做一次行级轻揭,回滚不重演。
   纪律:零裸 scroll 监听;只动 transform/opacity/clip-path;
   反馈型 ≤300ms,叙事型按电影节拍;演示数据全部来自产品真实采集。
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 刷新回顶(用户明令,与 JourneyPilot 同则):浏览器不恢复上次滚动位置,
     每次进入都从序幕开始——开场批改演出因此总能完整上演。
     置于一切之前(含环境门),GSAP/Lenis 缺席同样生效。 ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  /* ---------- 顶栏项目切换(click 切换;hover 展开由 CSS;点击外部/Esc 收起)。
     置于环境门之前,GSAP 缺失也能用。 ---------- */
  (function navMenu() {
    var proj = document.getElementById("navProj");
    var btn = document.getElementById("navProjBtn");
    if (!proj || !btn) return;
    function setOpen(open) {
      proj.classList.toggle("open", open);
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!proj.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (!proj.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    /* 2026-07-19 二审:水彩晕染单发——指针跨过条目分界发一枚柔焦色斑「面」(.np-wash),
       悬停不循环;配色按该项缩影卡 --w1/2/3 轮转。落点光晕(--mx/--my)与线环退役。 */
    var fineNav = matchMedia("(hover:hover) and (pointer:fine)").matches;
    Array.prototype.forEach.call(proj.querySelectorAll(".npm-item"), function (item) {
      var cs = getComputedStyle(item),
          pal = [(cs.getPropertyValue("--w1") || "#b3402a").trim(), (cs.getPropertyValue("--w2") || "#8a3020").trim(), (cs.getPropertyValue("--w3") || "#423a31").trim()],
          ci = 0;
      item.addEventListener("pointerenter", function (e) {
        if (!fineNav) return;
        var r = item.getBoundingClientRect();
        var s = document.createElement("span");
        s.className = "np-wash";
        s.style.setProperty("--rx", (e.clientX - r.left) + "px");
        s.style.setProperty("--ry", (e.clientY - r.top) + "px");
        s.style.setProperty("--rc", pal[ci++ % pal.length]);
        s.style.animation = "np-wash 1100ms cubic-bezier(.19,1,.22,1) forwards";
        item.appendChild(s);
        s.addEventListener("animationend", function () { s.remove(); });
      });
    });
  })();

  /* ---------- 静态兜底:GSAP/vendor 缺失时六装置不留空白,直接呈现已解态 ----------
     与 init 内的装置数据保持逐字一致(回放末帧/tutor 第 1 层/评级 A 复盘/SRS A 初始态)。 */
  function renderStaticFallback() {
    function q(s) { return document.querySelector(s); }
    function put(s, html) { var el = q(s); if (el) el.innerHTML = html; }
    function txt(s, t) { var el = q(s); if (el) el.textContent = t; }
    /* 交互按钮全部失效,统一禁用 */
    Array.prototype.forEach.call(
      document.querySelectorAll("#replay-play, #replay-slider, .ask-btn, #judge-run, #universe-toggle, #iv-next, [data-srs], #srs-reset"),
      function (el) { el.disabled = true; }
    );
    /* Ch2 回放:停在末帧(t=1:30 完稿) */
    put("#replay-code", [
      "from typing import List", " ", "class Solution:",
      "    def search(self, nums: List[int], target: int) -> int:",
      "        lo, hi = 0, len(nums) - 1",
      "        while lo <= hi:", "            mid = (lo + hi) // 2",
      "            if nums[mid] == target:", "                return mid",
      "            if nums[mid] < target:", "                lo = mid + 1",
      "            else:", "                hi = mid - 1",
      "        return lo"
    ].map(function (l) { return '<span class="cl">' + l + "</span>"; }).join(""));
    txt("#replay-meta", "4 / 4 · 1:30");
    /* Ch3 判题:展示改对后的终态 */
    put("#judge-verdict", '<span class="verdict tone-ok">通过 · 4/4 样例通过</span>');
    put("#judge-body",
      '<div class="code">' + [
        "            if nums[mid] < target:", "                lo = mid + 1",
        "            else:", "                hi = mid - 1",
        "        return -1"
      ].map(function (l) { return '<span class="cl">' + l + "</span>"; }).join("") + "</div>" +
      '<div class="case-row tone-ok" style="margin-top:12px"><span class="st">样例全部通过</span> <span class="lbl">含 2 个隐藏用例</span></div>' +
      '<p class="hint" style="margin-top:12px">只把 return lo 改成 return -1，四个用例全绿。</p>');
    /* Ch4 求助:第 1 层问答誊本 */
    txt("#tutor-tier", "第 1 层 / 共 4 层 · 思路方向");
    put("#tutor-chat",
      '<div class="msg student">样例 c2 挂了：target 不存在的时候，我的函数返回了 2 而不是 -1。我卡在返回值这里的思路上。</div>' +
      '<div class="msg tutor"><span class="tier-tag">第 1 层 / 共 4 层 · 思路方向</span>你正在使用 <strong>二分查找</strong> 算法，核心思想是每次比较中间元素，根据大小关系将搜索范围缩小一半。你已经正确实现了查找部分的逻辑。<br><br>关键观察：你的搜索区间定义为<strong>左闭右闭</strong> <code>[lo, hi]</code>。当循环结束(<code>lo &gt; hi</code>)，说明整个区间都被排查完且没有找到目标。此时你应该如何表示「未找到」的状态？</div>');
    /* Ch5 雷达+复盘 rail:评级 A 已解态(与 buildRadar/applyReview 同一几何与语料) */
    (function () {
      var svg = q("#radar"); if (!svg) return;
      var LABELS = ["正确性", "复杂度", "代码质量", "过程", "建议"];
      var C = 110, R = 74, L = 96;
      function pt(i, r) {
        var a = -Math.PI / 2 + (Math.PI * 2 * i) / 5;
        return [C + r * Math.cos(a), C + r * Math.sin(a)];
      }
      var s = "";
      [0.25, 0.5, 0.75, 1].forEach(function (lv) {
        s += '<polygon class="rgrid" points="' + LABELS.map(function (_, i) { return pt(i, R * lv).join(","); }).join(" ") + '"/>';
      });
      LABELS.forEach(function (lb, i) {
        var p = pt(i, R);
        s += '<line class="raxis" x1="' + C + '" y1="' + C + '" x2="' + p[0] + '" y2="' + p[1] + '"/>';
        var lp = pt(i, L);
        var anchor = Math.abs(lp[0] - C) < 8 ? "middle" : (lp[0] > C ? "start" : "end");
        s += '<text class="rlabel" x="' + lp[0] + '" y="' + lp[1] + '" text-anchor="' + anchor + '" dominant-baseline="middle">' + lb + "</text>";
      });
      var poly = LABELS.map(function (_, i) { return pt(i, R).join(","); }).join(" ");
      s += '<polygon class="rfill" points="' + poly + '"/>';
      s += '<polyline class="rline" points="' + poly + " " + pt(0, R).join(",") + '"/>';
      LABELS.forEach(function (_, i) {
        var p = pt(i, R);
        s += '<circle class="rdot tone-ok" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>';
      });
      svg.innerHTML = s;
      svg.classList.add("is-in");   /* 触发 CSS 侧入场动画,让 rfill/rdot/rlabel 落到可见终态 */
    })();
    put("#review-rail", [
      { k: "主诊断", p: "代码通过所有测试用例，风格优秀，复杂度最优，解题过程流畅，无需进一步改进。", strong: true },
      { k: "代码质量", v: "9<small> / 10</small>", p: "代码清晰规范，变量命名好，类型提示完整，包含主函数处理输入输出。" },
      { k: "复杂度", v: "O(log n) · O(1)", p: "每次循环缩小一半范围，对数级别时间；仅使用常数个变量。" },
      { k: "过程复盘", p: "首帧只写了部分逻辑，但很快在下一帧补全并添加主函数，体现了对循环不变量的理解，修改高效，思路连贯。" },
      { k: "训练处方", p: "复习安排已更新：评级 A，进入更长间隔。", strong: true }
    ].map(function (r) {
      return '<div class="review-sec"><span class="kicker kicker--zh">' + r.k + "</span>" +
        (r.v ? '<div class="big">' + r.v + "</div>" : "") +
        "<p" + (r.strong ? ' class="strong"' : "") + ">" + r.p + "</p></div>";
    }).join(""));
    /* Ch7 SRS:评级 A 初始态(刻度为真实算法节点,对数轴) */
    (function () {
      var ax = q("#srs-axis"); if (!ax) return;
      function pos(d) { return (Math.log(d) / Math.log(180)) * 100; }
      [1, 3, 7, 14, 28, 56, 112, 180].forEach(function (m) {
        var t = document.createElement("div");
        t.className = "srs-tick"; t.style.left = pos(m) + "%";
        t.innerHTML = "<i>" + m + "天</i>";
        ax.appendChild(t);
      });
      var mk = q("#srs-marker"); if (mk) mk.style.left = pos(14) + "%";
      var read = q("#srs-read");
      if (read) {
        read.className = "srs-read tone-neutral";
        read.innerHTML = "评级 A 生成 14 天间隔，列入「可以顺手巩固」。<br>本次目标：快速复现核心思路，避免长期遗忘。";
      }
      put("#srs-chips", '<span class="srs-chip tone-ok">A</span>');
    })();
  }

  /* ---------- 环境门 ---------- */
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (!hasGsap) { document.documentElement.classList.remove("boot"); renderStaticFallback(); return; }
  gsap.registerPlugin(ScrollTrigger);
  var hasSplit = typeof SplitText !== "undefined";
  if (hasSplit) gsap.registerPlugin(SplitText);
  /* 签名曲线(6.1 收敛):与 CSS --ease 同源的 cubic-bezier(.22,1,.36,1),
     统治入场/描画/揭幕。例外:盖章的 power2.in 冲击(仪式)、scrub 的 none。
     CustomEase 插件缺席时退回 power3.out(最接近的内置曲线)。 */
  var hasCustomEase = typeof CustomEase !== "undefined";
  if (hasCustomEase) { gsap.registerPlugin(CustomEase); CustomEase.create("sig", "0.22,1,0.36,1"); }
  var EASE = hasCustomEase ? "sig" : "power3.out";
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 定高滚动框只在「真的溢出」时才拦截页面滚动(挂 data-lenis-prevent)。
     空态/内容不足时不挂,鼠标停在框内也能带动整页滚动——修「滑不动」。
     触屏(3.1):定高内滚已在 CSS pointer:coarse 下取消,永不拦截页面滚动。 */
  var coarsePointer = matchMedia("(pointer:coarse)").matches;
  function syncScrollLock(el) {
    if (!el) return;
    if (coarsePointer) { el.removeAttribute("data-lenis-prevent"); return; }
    el.toggleAttribute("data-lenis-prevent", el.scrollHeight - el.clientHeight > 2);
  }

  /* ---------- Lenis 平滑滚动(接驳 gsap ticker,零裸监听) ---------- */
  var lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.05, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__ec = { lenis: lenis, rev: "r19" };   /* 调试句柄:可见 tab 下原生 scrollTo 会被 Lenis 每帧回卷,验收脚本须走 lenis.scrollTo */
    /* 站内锚点走 Lenis glide(程序化滚动:分镜墙只夹真实输入,不夹它,故无需闸门标记) */
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = $(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -124 });   /* 与 scroll-margin-top 同步(3.4) */
      });
    });
  }

  /* ---------- 通用:方向感知的双向调度器 ----------
     向下:从视口下方进入,向视口上方退出。
     向上:从视口上方进入,向视口下方退出。
     build(side, entering) 的 side:1=下方,-1=上方。入场与离场显式建轨,
     不复用旧 timeline,因此快速往返也不会瞬移回错误一侧。 */
  function replayable(trigger, build, opts) {
    opts = opts || {};
    var tl = null;
    function stop() {
      if (!tl) return;
      tl.kill();
      tl = null;
    }
    function enter(origin) {
      stop();
      tl = build(origin, true);
      tl.play(0);
    }
    function leave(destination) {
      if (opts.keep) return;
      stop();
      if (opts.instantExit) {
        tl = build(destination, true);
        tl.pause(0);
        return;
      }
      tl = build(destination, false);
      tl.play(0);
    }
    ScrollTrigger.create({
      trigger: trigger,
      start: opts.start || "top 80%",
      end: opts.end || "bottom 12%",
      fastScrollEnd: true,
      onEnter: function () { enter(1); },
      onEnterBack: function () { enter(-1); },
      onLeave: function () { leave(-1); },
      onLeaveBack: function () { leave(1); }
    });
  }

  /* ---------- 标题:一次性轻揭 ----------
     标题不参与全局双向重演。首次从任一方向进入时只做小幅行级显影,
     此后保持静止,避免用户回滚时整页视觉层级被反复刷新。 */
  function revealOnce(trigger, build, opts) {
    opts = opts || {};
    var shown = false;
    var tl = null;
    function show(origin) {
      if (shown) return;
      shown = true;
      if (tl) tl.kill();
      tl = build(origin);
      tl.play(0);
    }
    ScrollTrigger.create({
      trigger: trigger,
      start: opts.start || "top 84%",
      end: opts.end || "bottom 12%",
      onEnter: function () { show(1); },
      onEnterBack: function () { show(-1); }
    });
  }

  /* ---------- 通用:红笔描画(dashoffset;长度运行时实测,宁准勿估) ---------- */
  function primeStroke(path) {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    return len;
  }
  function drawStroke(tl, path, dur, pos, ease) {
    var len = primeStroke(path);
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease: ease || EASE }, pos);
    return tl;
  }

  /* ---------- 初始态:JS 接管隐藏(接住 html.boot 的门),随后揭幕 ----------
     boot 竞态防护(3.5):慢网下内联 3s 定时器可能已先行揭幕(html.boot 已摘)。
     此时内容已可见,再做初始隐藏会产生「闪现-再藏-再揭」;故只在门还关着时
     接管隐藏与入场编排,否则整页保持已解态(入场动画整批跳过,装置仪式不受影响)。 */
  var bootAlive = document.documentElement.classList.contains("boot");
  var rvEls = $$("[data-rv]").filter(function (el) {
    /* 分镜段(data-cine)整体不参与显影,以免扰动 pin/scrub;
       唯独其 story-head 正文例外:它须在标题之后揭幕(否则正文先于标题静显),
       且只是一次性淡入、揭幕后即留住,不干预分镜时间线。 */
    return !el.closest("#hero") &&
      (!el.closest("[data-cine]") || el.matches(".story-head .sub")) &&
      !el.querySelector("[data-split]");
  });
  if (bootAlive) {
    gsap.set(rvEls, { autoAlpha: 0 });
    gsap.set("[data-split]", { autoAlpha: 0 });
    gsap.set(["#hero-sub", "#hero-cta", "#hero-shot"], { autoAlpha: 0 });
    /* 终章印章:入场前先藏,否则它随页面滚入时已可见,到触发点又盖一次章=重复出现(不自然)。
       盖章时间轴本身 fromTo autoAlpha 0→1,预藏只是补上触发前的初始态。
       只在它仍位于视口下方时预藏——防刷新恰停在底部时其触发器已越过、印章被永久藏住。 */
    (function () {
      var sImg = $("#seal img");
      if (sImg && sImg.getBoundingClientRect().top > window.innerHeight) gsap.set(sImg, { autoAlpha: 0 });
    })();
    /* 批注初始态=向左收成 0 宽(与其揭幕 fromTo 起点一致)：进入前什么都不显示,
       杜绝「滚到之前批注已在、触发时又重画」的闪烁。 */
    gsap.set(".mk-note", { clipPath: "inset(-8% 100% -12% 0)" });
    document.documentElement.classList.remove("boot");
  }

  /* ---------- 字体就绪后再拆字(避免 SplitText 量错行);1.2s 兜底 ---------- */
  var fontsReady = (document.fonts && document.fonts.ready)
    ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1200); })])
    : Promise.resolve();

  fontsReady.then(init);

  function init() {

    /* ===== 1 · 标题行级轻揭(data-split,首次经过后保持静止) ===== */
    if (!bootAlive) {
      /* 已被内联定时器揭幕:标题/显影/批注保持可见终态,不再注册入场 */
    } else if (hasSplit) {
      $$("[data-split]").forEach(function (h) {
        var shown = false;
        /* autoSplit:视口/字体变化时自动重新断行并重建入场,杜绝旧行盒残留造成的 mask 裁切错位 */
        SplitText.create(h, {
          type: "lines", mask: "lines", autoSplit: true,
          onSplit: function (self) {
            gsap.set(h, { autoAlpha: 1 });
            if (shown) { gsap.set(self.lines, { y: 0, autoAlpha: 1 }); return; }
            return gsap.from(self.lines, {
              y: 14, autoAlpha: 0, duration: 0.52, ease: EASE, stagger: 0.055,
              scrollTrigger: { trigger: h, start: "top 84%", once: true,
                onEnter: function () { shown = true; } }
            });
          }
        });
      });
    } else {
      $$("[data-split]").forEach(function (h) {
        revealOnce(h, function (origin) {
          return gsap.timeline({ paused: true })
            .fromTo(h,
              { y: origin * 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.52, ease: EASE });
        });
      });
    }

    /* ===== 2 · 通用显影(data-rv,只淡入一次、出现即留住) ===== */
    if (bootAlive) rvEls.forEach(function (el) {
      /* data-rv-lag(4.3):同屏多元素分批入场,滞后秒数写在标记上(Ch5 高潮屏用) */
      var lag = parseFloat(el.dataset.rvLag) || 0;
      revealOnce(el, function () {
        return gsap.timeline({ paused: true })
          .fromTo(el, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE }, lag);
      }, { start: "top 88%" });
    });

    /* ===== 3 · 批注写字(mk-note:clip 揭开一次,读作"现场写上去",写完留住) =====
       #verdict-beat 的页边批例外:改由判定丸时间轴在两枚水波荡完后才写出(见 §5),故此处排除。 */
    if (bootAlive) $$(".mk-note").filter(function (n) { return !n.closest("#verdict-beat"); }).forEach(function (n) {
      revealOnce(n, function () {
        return gsap.timeline({ paused: true })
          .fromTo(n,
            { clipPath: "inset(-8% 100% -12% 0)", autoAlpha: 1 },
            { clipPath: "inset(-8% 0% -12% 0)", duration: 0.9, ease: EASE });
      }, { start: "top 86%" });
    });

    /* ===== 4 · 序幕:批改开工(load 演出;回顶重演;滚动即跳过) ===== */
    (function heroSequence() {
      var h1 = $("#hero-h1"), strike = $("#strike-line"), strike2 = $("#strike-line-2"),
          remark = $("#hero-remark"),
          marks = $$("#hero-marks .hm");
      var tl = null;
      function buildHero(origin) {
        var isDown = origin > 0;
        var at = isDown
          ? { h1: 0.05, strike: 0.9, remark: 1.75, sub: 1.95, cta: 2.1, shot: 2.24, marks: 2.6 }
          : { shot: 0, cta: 0.14, sub: 0.26, h1: 0.5, strike: 1.05, remark: 1.9, marks: 2.24 };
        var next = gsap.timeline({ paused: true });
        next.fromTo(h1, { autoAlpha: 0, y: origin * 34, filter: "blur(5px)" },
                        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: EASE }, at.h1);
        /* 红笔落纸:先慢慢一笔划掉「刷题」(慢=像老师稳稳地落笔),再补一道更淡的复笔(手来回描的质感),
           最后把楷体眉批一笔笔写出来 */
        drawStroke(next, strike, 1.1, at.strike);
        if (strike2) drawStroke(next, strike2, 0.72, at.strike + 0.55);
        /* 眉批是手写的字:无论向下首演还是回顶重演,都从左往右一笔笔写出(右侧 inset 100%→0%);
           不随方向镜像成从右往左(那读作倒着写,反自然)。 */
        next.fromTo(remark,
            { clipPath: "inset(-12% 100% -16% 0%)", autoAlpha: 1 },
            { clipPath: "inset(-12% 0% -16% 0%)", duration: 0.9, ease: EASE }, at.remark)
          .fromTo("#hero-sub",  { autoAlpha: 0, y: origin * 22 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE }, at.sub)
          .fromTo("#hero-cta",  { autoAlpha: 0, y: origin * 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE }, at.cta)
          .fromTo("#hero-shot", { autoAlpha: 0, y: origin * 34, scale: 1.02 },
                                { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: EASE }, at.shot);
        /* 批注不在开场画:见 heroMarksReveal(图完整可见后才逐笔) */
        return next;
      }
      function playHero(origin) {
        if (tl) tl.kill();
        tl = buildHero(origin);
        tl.play(0);
      }
      /* 滚动即跳过开场(只裁剪一次,不打断后续重演) */
      var skipOnce = function () {
        if (tl && tl.isActive()) tl.progress(1);
        window.removeEventListener("wheel", skipOnce);
        window.removeEventListener("touchmove", skipOnce);
      };
      window.addEventListener("wheel", skipOnce, { passive: true });
      window.addEventListener("touchmove", skipOnce, { passive: true });
      /* 回到顶部重演(全局重演法则;hero 无 onLeave 复位,离场保持定格避免上方留白闪动) */
      ScrollTrigger.create({
        trigger: "#hero", start: "top top", end: "bottom 35%",
        onEnterBack: function () { playHero(-1); }
      });
      /* boot 竞态(3.5):已被定时器揭幕时跳过开场演出(hero 保持已解态,回顶重演仍生效) */
      if (bootAlive) playHero(1);

      /* 批注与开场解耦:产品图每「完整进入视口」一次就逐笔错落重演一次;
         整图完全移出视口时清空痕迹、重新武装,待下次完整出现再画。 */
      (function heroMarksReveal() {
        if (!marks.length) return;
        var MARK_DELAYS = [0, 0.34, 0.72, 1.16, 1.5];
        var armed = false, mtl = null;
        function prime() {                                 /* 收成 0 长度=清空痕迹,待画 */
          if (mtl) mtl.kill();                             /* 先杀掉在飞的描画(快速滚出时也能真清空) */
          marks.forEach(primeStroke); armed = true;
        }
        prime();
        function draw(origin) {
          if (!armed) return; armed = false;
          mtl = gsap.timeline();
          (origin > 0 ? marks : marks.slice().reverse()).forEach(function (p, i) {
            var dur = parseFloat(p.getAttribute("data-dur")) || 0.5;
            drawStroke(mtl, p, dur, MARK_DELAYS[i] != null ? MARK_DELAYS[i] : i * 0.32);
          });
        }
        /* 完整可见→画:start"bottom bottom"=图底升到视口底(整图入场),end"top top"=图顶抵视口顶(将离场);
           两个方向完整进入都重演 */
        ScrollTrigger.create({
          trigger: "#hero-shot", start: "bottom bottom", end: "top top",
          onEnter: function () { draw(1); },
          onEnterBack: function () { draw(-1); }
        });
        /* 整图移出视口→清空重置:范围=图任意部分可见(start"top bottom"→end"bottom top"),
           越过任一端=整图不可见,重新武装等下次完整出现 */
        ScrollTrigger.create({
          trigger: "#hero-shot", start: "top bottom", end: "bottom top",
          onLeave: prime, onLeaveBack: prime
        });
      })();
    })();

    /* ===== 5 · 一幕:红灯,绿灯(判定丸「从内到外」荡水波纹,未通过完成后再通过,双向重演) ===== */
    (function verdictBeat() {
      var pills = { danger: $('[data-pill="danger"]'), ok: $('[data-pill="ok"]') };
      /* 每枚判定丸底部注入 3 环水波(一次性),供时间轴反复驱动 scale/opacity */
      function rings(pill) {
        if (!pill) return [];
        if (pill._rings) return pill._rings;
        var arr = [];
        for (var i = 0; i < 3; i++) { var s = document.createElement("span"); s.className = "ripple"; pill.appendChild(s); arr.push(s); }
        pill._rings = arr; return arr;
      }
      var dRings = rings(pills.danger), oRings = rings(pills.ok);
      var note = $("#verdict-beat .mk-note");   /* 页边批「红绿灯只判对错」:两枚水波荡完后才写出 */
      replayable("#verdict-beat", function (origin) {
        var tl = gsap.timeline({ paused: true });
        /* 顺序:向下=未通过→通过;向上=通过→未通过(方向感知的双向重演) */
        var seq = origin > 0 ? [pills.danger, pills.ok] : [pills.ok, pills.danger];
        /* 水波节拍略收紧(间隔 1.05→0.8、每环 0.95→0.78、错开 0.18→0.13),
           让「红绿灯只判对错」这句更快登场,避免用户滚过错过它 */
        var GAP = 0.8, RIPPLE_DUR = 0.78, RING_STAG = 0.13, ripEnd = 0;
        tl.set([pills.danger, pills.ok], { autoAlpha: 0 });
        tl.set([].concat(dRings, oRings), { scale: 0.55, opacity: 0 });
        if (note) tl.set(note, { clipPath: "inset(-8% 100% -12% 0)", autoAlpha: 1 }, 0);
        seq.forEach(function (pill, i) {
          var base = i * GAP;   /* 前一枚水波将荡完,后一枚才起 */
          tl.fromTo(pill, { autoAlpha: 0, scale: 0.92 },
                          { autoAlpha: 1, scale: 1, duration: 0.4, ease: EASE }, base);
          pill._rings.forEach(function (r, ri) {
            var at = base + 0.05 + ri * RING_STAG;
            tl.fromTo(r, { scale: 0.55, opacity: 0.5 },
                         { scale: 4.6, opacity: 0, duration: RIPPLE_DUR, ease: EASE }, at);
            ripEnd = Math.max(ripEnd, at + RIPPLE_DUR);
          });
        });
        /* 两枚都荡完,页边批才一笔写出(趁最后一环几近淡尽处轻微搭接) */
        if (note) tl.to(note, { clipPath: "inset(-8% 0% -12% 0)", duration: 0.9, ease: EASE }, ripEnd - 0.18);
        return tl;
      }, { start: "top 62%", instantExit: true });
    })();

    /* ===== 6 · 主张句逐行读亮(scrub:滚动的速度就是读它的速度) ===== */
    (function lightup() {
      var p = $("#thesis-lightup");
      if (!p || !hasSplit) return;
      var rs = getComputedStyle(document.documentElement);
      var cFrom = rs.getPropertyValue("--ink-muted").trim() || "#6f6b61";
      var cTo = rs.getPropertyValue("--ink").trim() || "#1c1b18";
      /* autoSplit 让换行随视口重排、scrub 触发器随之重建;颜色取自设计令牌 */
      SplitText.create(p, {
        type: "lines", autoSplit: true,
        onSplit: function (self) {
          return gsap.fromTo(self.lines,
            { color: cFrom },
            { color: cTo, stagger: 0.25, ease: "none",
              scrollTrigger: { trigger: p, start: "top 78%", end: "top 34%", scrub: true } });
        }
      });
    })();

    /* ===== 7 · stepper(真实状态机;集合式追踪,回滚不指错) ===== */
    (function stepper() {
      var steps = $$(".step");
      var order = steps.map(function (s) { return s.dataset.step; });
      function setStage(name) {
        var idx = order.indexOf(name);
        if (idx < 0) return;
        steps.forEach(function (s, i) {
          s.classList.toggle("is-active", i === idx);
          s.classList.toggle("is-done", i < idx);
        });
      }
      var live = new Set();
      function pickLast() {
        var best = null;
        live.forEach(function (el) {
          if (!best || (el.compareDocumentPosition(best) & Node.DOCUMENT_POSITION_PRECEDING)) best = el;
        });
        if (best) setStage(best.dataset.stage);
      }
      $$("[data-stage]").forEach(function (el) {
        /* 3.6:提交是满屏短过场,区间加宽让它驻留可感知,不再一闪而过 */
        var wide = el.id === "submit-beat";
        ScrollTrigger.create({
          trigger: el, start: wide ? "top 85%" : "top 70%", end: wide ? "bottom 15%" : "bottom 45%",
          onToggle: function (self) {
            self.isActive ? live.add(el) : live.delete(el);
            pickLast();
          }
        });
      });
    })();

    /* ===== 8 · 第 2 章:快照回放 ===== */
    var FRAMES = [
      { t: "0:00", note: "t=0:00，从题目自带的 ACM 外壳模板开始（输入输出处理已折叠）。", lines: [
        ["from typing import List", ""], [""], ["class Solution:", ""],
        ["    def search(self, nums: List[int], target: int) -> int:", ""],
        ["        # 在这里开始写你的代码", ""], ["        pass", ""]
      ]},
      { t: "0:30", note: "t=0:30，先立好左闭右闭的搜索区间。", lines: [
        ["from typing import List", ""], [""], ["class Solution:", ""],
        ["    def search(self, nums: List[int], target: int) -> int:", ""],
        ["        lo, hi = 0, len(nums) - 1", "new"], ["        pass", ""]
      ]},
      { t: "1:00", note: "t=1:00，循环骨架成形，命中直接返回。", lines: [
        ["from typing import List", ""], [""], ["class Solution:", ""],
        ["    def search(self, nums: List[int], target: int) -> int:", ""],
        ["        lo, hi = 0, len(nums) - 1", ""],
        ["        while lo <= hi:", "new"], ["            mid = (lo + hi) // 2", "new"],
        ["            if nums[mid] == target:", "new"], ["                return mid", "new"]
      ]},
      { t: "1:30", note: "t=1:30，写完收工。注意最后一行：返回了 lo，一个还没被发现的 bug。", lines: [
        ["from typing import List", ""], [""], ["class Solution:", ""],
        ["    def search(self, nums: List[int], target: int) -> int:", ""],
        ["        lo, hi = 0, len(nums) - 1", ""],
        ["        while lo <= hi:", ""], ["            mid = (lo + hi) // 2", ""],
        ["            if nums[mid] == target:", ""], ["                return mid", ""],
        ["            if nums[mid] < target:", "new"], ["                lo = mid + 1", "new"],
        ["            else:", "new"], ["                hi = mid - 1", "new"],
        ["        return lo", "new"]
      ]}
    ];
    function hiCode(txt) {
      var esc = txt.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      var ci = esc.indexOf("#");
      var code = ci >= 0 ? esc.slice(0, ci) : esc;
      var comment = ci >= 0 ? '<span class="tk-cm">' + esc.slice(ci) + "</span>" : "";
      code = code.replace(/\b(from|import|class|def|while|if|elif|else|return|pass)\b/g, '<span class="tk-kw">$1</span>');
      code = code.replace(/\b(List|int)\b/g, '<span class="tk-ty">$1</span>');
      return code + comment;
    }
    function renderFrame(i) {
      var f = FRAMES[i];
      $("#replay-code").innerHTML = f.lines.map(function (l) {
        return '<span class="cl' + (l[1] === "new" ? " is-new" : "") + '">' + (hiCode(l[0]) || " ") + "</span>";
      }).join("");
      $("#replay-meta").textContent = (i + 1) + " / " + FRAMES.length + " · " + f.t;
      var noteEl = $("#replay-note"); if (noteEl) noteEl.textContent = f.note;
      $("#replay-slider").value = i;
    }
    /* 面板高度按最大帧一次撑住,回放不跳动 */
    var maxLines = Math.max.apply(null, FRAMES.map(function (f) { return f.lines.length; }));
    $("#replay-code").style.minHeight = "calc(" + maxLines + " * 1.75em + 28px)";
    renderFrame(0);
    /* 按钮交互版(窄屏/降级路径) */
    var replayTimer = null, playBtn = $("#replay-play");
    function stopReplay() { clearInterval(replayTimer); replayTimer = null; playBtn.textContent = "播放"; }
    playBtn.addEventListener("click", function () {
      if (replayTimer) { stopReplay(); return; }
      var i = +$("#replay-slider").value;
      if (i >= FRAMES.length - 1) i = -1;
      playBtn.textContent = "暂停";
      var step = function () { i++; renderFrame(i); if (i >= FRAMES.length - 1) stopReplay(); };
      step();
      replayTimer = setInterval(step, 1100);
    });
    $("#replay-slider").addEventListener("input", function (e) { stopReplay(); renderFrame(+e.target.value); });

    /* ===== 9 · 对话数据(启发式苏格拉底助教与深度面试追问) ===== */
    var TUTOR = [
      { tier: 1, tierName: "思路方向",
        student: "样例 c2 挂了：target 不存在的时候，我的函数返回了 2 而不是 -1。我卡在返回值这里的思路上。",
        tutor: "你正在使用 <strong>二分查找</strong> 算法，核心思想是每次比较中间元素，根据大小关系将搜索范围缩小一半。你已经正确实现了查找部分的逻辑。<br><br>关键观察：你的搜索区间定义为<strong>左闭右闭</strong> <code>[lo, hi]</code>。当循环结束(<code>lo &gt; hi</code>)，说明整个区间都被排查完且没有找到目标。此时你应该如何表示「未找到」的状态？<br><br>提示：想一想你代码里最后的 <code>return lo</code>。当找不到目标时，<code>lo</code> 停在的位置真的代表「没找到」吗？它的具体数值受什么影响？" },
      { tier: 2, tierName: "关键观察",
        student: "所以 while 退出的时候 lo 停在的位置意味着什么？为什么不能直接把 lo 当成没找到时的返回值？",
        tutor: "当 <code>while lo &lt;= hi</code> 退出时，lo 是<strong>第一个大于等于 target 的元素的索引</strong>（若所有元素都小于 target，则 lo = len(nums)）。循环结束时 lo &gt; hi，区间为空，而 lo 恰好跳到了「target 如果被插入，应该插入的位置」。这就是经典的<strong>二分求下界</strong>。<br><br>但本题要求是「存在返回下标，不存在返回 -1」，而不是返回插入位置。如果你找不到时直接返回 lo，它是一个 0 到 len(nums) 之间的有效下标，这会误导调用者以为找到了目标。因此，找不到时不能直接返回 lo，必须返回一个明确的哨兵值。" },
      { tier: 3, tierName: "伪代码骨架",
        student: "给我一个骨架吧，我想对着骨架检查我自己的写法。",
        tutor: "这是二分查找（左闭右闭区间版）的伪代码骨架。对照你的实现，逐行检查每一步的语义是否匹配：",
        code: "search(nums, target):\n    left = 0\n    right = len(nums) - 1     # 定义 target 在 [left, right] 区间\n\n    while left <= right:      # 区间不为空\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            # 找到了，返回 mid\n        elif nums[mid] < target:\n            left = # ...       # 新区间应排除已检查的 mid\n        else:\n            right = # ...      # 同理，更新哪一边？\n    # 循环结束，全部排查完都没找到\n    return # ...               # 题目要求：找不到时返回什么？",
        after: "特别注意最后 return 的值——你的代码里用了 lo，但本题要求「不存在返回 -1」。留空的部分，就是你今天已经搞清楚的那个关键点。" }
    ];
    /* 面试语料(3.2,用户拍板 2026-07-17):保持三个问答对,文本自产品真实对话精炼而来,
       以适配 scrub 读速;精炼不改技术事实。 */
    var INTERVIEW = [
      { q: "循环条件为什么是 while left <= right？如果改成 left < right，用长度为 1 的数组说明会发生什么。",
        a: "我用左闭右闭 [left, right]，两端都是待检查的候选：left == right 时还剩一个元素，必须再查一次，所以带等号。改成 left < right 的话，nums=[5] 找 5 会一次都不进循环就返回 -1，漏掉唯一候选。" },
      { q: "你说时间复杂度是 O(log n)，这个上界是怎么得出的？数组长度为 n 时循环最多执行多少次？",
        a: "每轮检查完 mid 就排除一半，第 k 轮后剩余候选不超过 n/2^k，区间空了就终止。上界是 ⌊log2(n)⌋+1：n 最大 10000 时最多 14 轮，每轮常数次操作，所以 O(log n)、空间 O(1)。" },
      { q: "target 不存在时，循环结束后 left 和 right 分别停在哪？这说明了什么？",
        a: "结束时一定 left = right + 1：right 停在最后一个小于 target 的位置，left 停在第一个大于 target 的位置，也就是插入点。这正是为什么没找到不能直接 return left——那是插入位置不是命中位置，必须显式返回 -1。" }
    ];
    var IV_FINALE_HTML = '\n      <div class="panel-head"><span class="kicker kicker--zh">面试如何影响评级</span></div>\n      <div class="panel-body">\n        <p class="hint">追问围着你刚提交的这份代码展开，不出新题，可以连续三到五轮。答得清楚，面试官会继续深挖；答得含糊，它会追到你答不上来为止。</p>\n        <div class="srs-read tone-ok-soft" style="margin-top:12px"><strong>面试只能收紧，不能放水。</strong> 终局评估只在严格低于当前评级时才采纳。讲得再流畅，也不会把评过的 C 抬成 A。</div>';
    function pushMsg(box, cls, html, tag) {
      var el = document.createElement("div");
      el.className = "msg " + cls;
      el.innerHTML = (tag ? '<span class="tier-tag">' + tag + "</span>" : "") + html;
      box.appendChild(el);
      return el;
    }
    function msgHTML(m) {
      return '<div class="msg ' + m.cls + '">' + (m.tag ? '<span class="tier-tag">' + m.tag + "</span>" : "") + m.html + "</div>";
    }
    var TYPING_HTML = '<div class="typing"><i></i><i></i><i></i></div>';
    function pinBottom(el) { if (el) el.scrollTop = el.scrollHeight; }
    /* 把某条消息顶到滚动框顶部：桌面只动框自身 scrollTop，不惊动整页(Lenis)。
       EC-1 · 触屏下定高内滚已被 CSS(pointer:coarse)取消，scroller.scrollTop 成 no-op，
       新消息把「下一轮追问」推出视口且页面不跟随——故 coarse 下改走 Lenis 页面滚动把该条带进视口。 */
    function scrollElTop(scroller, el) {
      if (!scroller || !el) return;
      if (coarsePointer && lenis) { lenis.scrollTo(el, { offset: -120 }); return; }
      scroller.scrollTop += (el.getBoundingClientRect().top - scroller.getBoundingClientRect().top) - 14;
    }
    function tutorTierLabel(i) { return "第 " + TUTOR[i].tier + " 层 / 共 4 层 · " + TUTOR[i].tierName; }
    function tutorBody(i) {
      var s = TUTOR[i], html = s.tutor;
      if (s.code) html += '<div class="msg-code">' + s.code.replace(/</g, "&lt;") + "</div>";
      if (s.after) html += '<div style="margin-top:8px">' + s.after + "</div>";
      return html;
    }

    /* ===== 10 · 第 4 章装置:你来追问(阶梯选项 → 真实固定回答) ===== */
    (function askDevice() {
      var box = $("#tutor-chat"), tierEl = $("#tutor-tier");
      var scroller = box.parentElement;              /* .tutor-transcript：定高·内部滚动 */
      var btns = $$(".ask-btn:not(.is-locked)");     /* 第 4 层是锁死的展示格,不参与交互 */
      var asked = 0, timer = null;
      /* 阶梯语义:一次只上一层——只有下一层可点 */
      function syncEnabled() {
        btns.forEach(function (b, i) {
          b.disabled = (i !== asked) || i >= TUTOR.length;
          b.classList.toggle("is-asked", i < asked);
        });
      }
      syncEnabled();
      syncScrollLock(scroller);                             /* 空态不锁:鼠标停在誊本里也能滚动整页 */
      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          var i = +b.dataset.ask;
          if (i !== asked) return;
          var stu = pushMsg(box, "student", TUTOR[i].student, null);
          var typing = document.createElement("div");
          typing.className = "typing"; typing.innerHTML = "<i></i><i></i><i></i>";
          box.appendChild(typing);
          scrollElTop(scroller, stu);
          syncScrollLock(scroller);
          btns.forEach(function (x) { x.disabled = true; });
          timer = setTimeout(function () {
            typing.remove();
            pushMsg(box, "tutor", tutorBody(i), tutorTierLabel(i));
            tierEl.textContent = tutorTierLabel(i);
            asked++;
            syncEnabled();
            scrollElTop(scroller, stu);                      /* 答案落定后,仍让这一问停在顶部 */
            syncScrollLock(scroller);                        /* 内容变长后再判断是否需要内部滚动 */
          }, 1000);
        });
      });
    })();

    /* ===== 11 · 第 3 章装置:那行 bug 你亲手改 ===== */
    (function judgeDevice() {
      var body = $("#judge-body"), verdictEl = $("#judge-verdict"),
          statusEl = $("#judge-status"), runBtn = $("#judge-run");
      var BUGGY_ROWS =
        '<div class="case-row tone-warn"><div><span class="st">答案错误</span> <span class="lbl">样例 c2</span></div>' +
        '<div><span class="lbl">输入</span>-1 0 3 5 9 12 ⏎ 2</div>' +
        '<div><span class="lbl">期望</span>-1</div>' +
        '<div><span class="lbl">实际</span><strong>2</strong></div></div>' +
        '<div class="case-row tone-warn"><div><span class="st">答案错误</span> <span class="lbl">样例 c4 · 隐藏用例</span></div></div>';
      var SNIPPET_LINES = [
        "            if nums[mid] < target:",
        "                lo = mid + 1",
        "            else:",
        "                hi = mid - 1",
        "        return lo"
      ];
      /* 代码块常驻:从一开始就摆在台面上,改完也不消失。
         marked=true 时才在最后一行挂上红圈靶标(运行出错后才标记错在哪)。 */
      function codeHtml(marked) {
        return '<div class="code" id="fix-code">' + SNIPPET_LINES.map(function (l, i) {
          var target = marked && i === SNIPPET_LINES.length - 1;
          return '<span class="cl' + (target ? " is-target" : "") + '">' + hiCode(l) + "</span>";
        }).join("") + "</div>";
      }
      /* 初始态:含 bug 的代码始终显示,但不标记错处,只等你运行 */
      function renderInitial() {
        verdictEl.innerHTML = "";
        body.innerHTML = codeHtml(false) +
          '<div id="judge-result"><p class="hint" style="margin-top:14px">点击「运行测试」，看看发生了什么？</p></div>';
      }
      function renderBuggy() {
        verdictEl.innerHTML = '<span class="verdict tone-warn">答案错误 · 2/4 样例通过</span>';
        body.innerHTML = codeHtml(true) +
          '<div id="judge-result">' +
          BUGGY_ROWS +
          '<p style="margin-top:12px"><span class="fix-hint" aria-hidden="true">红笔圈出了那一行。点它一下，亲手改对。</span></p>' +
          '</div>';
        var target = $("#fix-code .is-target");
        /* 红笔圈:运行时按行框生成手绘椭圆,描画入场 */
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "mk-strokes");
        svg.setAttribute("viewBox", "0 0 200 44");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.style.cssText = "position:absolute;inset:-8px -4px;width:calc(100% + 8px);height:calc(100% + 16px)";
        svg.innerHTML = '<path d="M14 8 Q88 1 168 6 Q196 10 192 24 Q186 40 96 40 Q18 40 8 26 Q3 16 22 9" stroke-width="2.6"/>';
        target.style.position = "relative";
        target.appendChild(svg);
        var tl = gsap.timeline();
        drawStroke(tl, svg.querySelector("path"), 0.7, 0.15);
        function fix() {
          if (target.classList.contains("is-fixed")) return;
          target.classList.add("is-fixed");
          target.classList.remove("is-target");
          gsap.to(svg, { autoAlpha: 0, duration: 0.24, ease: EASE });
          /* 原位改写:清掉整行旧内容(只留红圈 svg),再逐字写出 return -1 */
          Array.prototype.slice.call(target.childNodes).forEach(function (n) {
            if (n !== svg) target.removeChild(n);
          });
          var rewrite = document.createElement("span");
          target.insertBefore(rewrite, svg);
          var final = "        return -1";
          var i = 0;
          statusEl.textContent = "";
          var typeTimer = setInterval(function () {
            i++;
            rewrite.innerHTML = hiCode(final.slice(0, i));
            if (i >= final.length) {
              clearInterval(typeTimer);
              statusEl.textContent = "正在重跑全部用例";
              setTimeout(renderFixed, 750);
            }
          }, 22);
        }
        target.addEventListener("click", fix);
      }
      /* 只翻转代码下方的判定区:代码块 #fix-code 原样留在页面上。
         内容同步替换(正确性不依赖动画完成),淡入仅作装饰。 */
      function renderFixed() {
        statusEl.textContent = "";
        verdictEl.innerHTML = '<span class="verdict tone-ok">通过 · 4/4 样例通过</span>';
        var passHtml =
          '<div class="case-row tone-ok"><span class="st">样例全部通过</span> <span class="lbl">含 2 个隐藏用例</span></div>' +
          '<p class="hint" style="margin-top:12px">只把 return lo 改成 return -1，四个用例全绿。接下来，正式提交。</p>';
        var result = $("#judge-result");
        if (result) {
          result.innerHTML = passHtml;
          gsap.fromTo(result, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE, clearProps: "opacity,visibility,transform" });
        } else {
          body.innerHTML = codeHtml(false) + '<div id="judge-result">' + passHtml + "</div>";
        }
        runBtn.textContent = "重看这一段";
        runBtn.classList.remove("btn-primary");
        runBtn.classList.add("btn-ghost");
      }
      runBtn.addEventListener("click", function () {
        runBtn.textContent = "重跑含 bug 的版本";
        runBtn.classList.add("btn-primary");
        runBtn.classList.remove("btn-ghost");
        /* 代码始终留在台面上,只在其下方给出「运行中」态,绝不清空代码块 */
        verdictEl.innerHTML = "";
        body.innerHTML = codeHtml(false) + '<div id="judge-result"></div>';
        statusEl.textContent = "正在准备本地 Python 运行时";
        setTimeout(function () { statusEl.textContent = ""; renderBuggy(); }, 900);
      });
      renderInitial();
    })();

    /* ===== 12 · 第 5 章:五维雷达 + 平行宇宙 + 导师手写签收 ===== */
    var DIMS = [
      { key: "correctness", label: "正确性" }, { key: "complexity", label: "复杂度" },
      { key: "quality", label: "代码质量" }, { key: "process", label: "过程" }, { key: "guidance", label: "建议" }
    ];
    var REVIEW_STATES = {
      A: { values: [100, 100, 100, 100, 100], tones: ["tone-ok", "tone-ok", "tone-ok", "tone-ok", "tone-ok"],
        stampTone: "tone-ok", stampSolid: true, rating: "A",
        statLine: "已用 04:24 / 2 个思考节点",
        graderNote: "批完。别骄傲，十四天后见。",
        rail: [
          { k: "主诊断", p: "代码通过所有测试用例，风格优秀，复杂度最优，解题过程流畅，无需进一步改进。", strong: true },
          { k: "代码质量", v: "9 / 10", p: "代码清晰规范，变量命名好，类型提示完整，包含主函数处理输入输出。" },
          { k: "复杂度", v: "O(log n) · O(1)", p: "每次循环缩小一半范围，对数级别时间；仅使用常数个变量。" },
          { k: "过程复盘", p: "首帧只写了部分逻辑，但很快在下一帧补全并添加主函数，体现了对循环不变量的理解，修改高效，思路连贯。" },
          { k: "训练处方", p: "复习安排已更新：评级 A，进入更长间隔。", strong: true }
        ] },
      C: { values: [40, 100, 60, 80, 80], tones: ["tone-danger", "tone-ok", "tone-warn", "tone-ok-soft", "tone-ok-soft"],
        stampTone: "tone-warn", stampSolid: false, rating: "C",
        statLine: "已用 07:00 / 4 个思考节点",
        graderNote: "返回值差一口气。三天后，再来。",
        rail: [
          { k: "主诊断", p: "思路正确，实现了二分查找逻辑，但最终返回值错误（返回 lo 而非 -1），导致两个用例失败。正确性不达标，故评级为 C。移除该 bug 后即可通过。", strong: true },
          { k: "代码质量", v: "6 / 10", p: "代码结构清晰，使用二分查找框架正确，但返回 lo 而非 -1 是明显错误，不符合题目要求。缺少注释，可读性一般。" },
          { k: "复杂度", v: "O(log n) · O(1)", p: "每次循环将搜索范围减半，时间复杂度 O(log n)；仅使用常数个变量，空间复杂度 O(1)。" },
          { k: "过程复盘", p: "从空白逐步添加二分查找逻辑，时间线连贯，没有反复修改同一处。但最终返回 lo 而非 -1 可能是对题目要求不熟或笔误，建议仔细审题。" },
          { k: "训练处方", p: "评级 C:3 天后必须复习。", strong: true }
        ] }
    };
    var R_SIZE = 220, R_C = 110, R_RADIUS = 74, R_LABEL = 96;
    function rPoint(i, frac) {
      var ang = -Math.PI / 2 + (Math.PI * 2 * i) / DIMS.length;
      return [R_C + R_RADIUS * frac * Math.cos(ang), R_C + R_RADIUS * frac * Math.sin(ang)];
    }
    function rLabelPoint(i) {
      var ang = -Math.PI / 2 + (Math.PI * 2 * i) / DIMS.length;
      return [R_C + R_LABEL * Math.cos(ang), R_C + R_LABEL * Math.sin(ang)];
    }
    (function buildRadar() {
      var svg = $("#radar"), s = "";
      [0.25, 0.5, 0.75, 1].forEach(function (lv) {
        s += '<polygon class="rgrid" points="' + DIMS.map(function (_, i) { return rPoint(i, lv).join(","); }).join(" ") + '"/>';
      });
      DIMS.forEach(function (d, i) {
        var p = rPoint(i, 1);
        s += '<line class="raxis" x1="' + R_C + '" y1="' + R_C + '" x2="' + p[0] + '" y2="' + p[1] + '"/>';
        var lp = rLabelPoint(i);
        var anchor = Math.abs(lp[0] - R_C) < 8 ? "middle" : (lp[0] > R_C ? "start" : "end");
        s += '<text class="rlabel" x="' + lp[0] + '" y="' + lp[1] + '" text-anchor="' + anchor + '" dominant-baseline="middle" style="animation-delay:' + (640 + i * 120) + 'ms">' + d.label + "</text>";
      });
      s += '<polygon class="rfill" id="rfill" points=""/>';
      s += '<polyline class="rline" id="rline" points=""/>';
      DIMS.forEach(function (_, i) {
        s += '<circle class="rdot tone-ok" id="rdot-' + i + '" cx="' + R_C + '" cy="' + R_C + '" r="4" style="animation-delay:' + (420 + i * 200) + 'ms"/>';
      });
      svg.innerHTML = s;
    })();
    var radarVals = REVIEW_STATES.A.values.slice(), morphRaf = null;
    function radarGeometry(vals) {
      var pts = vals.map(function (v, i) { return rPoint(i, v / 100); });
      var poly = pts.map(function (p) { return p.join(","); }).join(" ");
      $("#rfill").setAttribute("points", poly);
      $("#rline").setAttribute("points", poly + " " + pts[0].join(","));
      pts.forEach(function (p, i) {
        var d = $("#rdot-" + i);
        d.setAttribute("cx", p[0]); d.setAttribute("cy", p[1]);
      });
    }
    function morphTo(target) {
      cancelAnimationFrame(morphRaf);
      var from = radarVals.slice(), t0 = performance.now(), dur = 620;
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        radarVals = from.map(function (f, i) { return f + (target[i] - f) * e; });
        radarGeometry(radarVals);
        if (p < 1) morphRaf = requestAnimationFrame(step);
      })(t0);
    }
    var gradeRing = $("#mk-grade-ring");
    function drawGradeRing() {
      var tl = gsap.timeline();
      drawStroke(tl, gradeRing, 0.7, 0);
      return tl;
    }
    function applyReview(state, restamp) {
      var d = REVIEW_STATES[state];
      morphTo(d.values);
      DIMS.forEach(function (_, i) {
        var dot = $("#rdot-" + i);
        dot.setAttribute("class", "rdot " + d.tones[i]);
        dot.style.animationDelay = (420 + i * 200) + "ms";
      });
      var stamp = $("#stamp");
      stamp.className = "stamp " + d.stampTone + (d.stampSolid ? " solid" : "");
      stamp.innerHTML = '<span class="letter">' + d.rating + "</span>";
      if (restamp) { void stamp.offsetWidth; stamp.classList.add("is-stamping"); }
      $("#stamp-note").textContent = d.statLine;
      $("#review-rail").innerHTML = d.rail.map(function (r) {
        return '<div class="review-sec"><span class="kicker kicker--zh">' + r.k + "</span>" +
          (r.v ? '<div class="big">' + r.v.replace(" / 10", "<small> / 10</small>") + "</div>" : "") +
          "<p" + (r.strong ? ' class="strong"' : "") + ">" + r.p + "</p></div>";
      }).join("");
      $("#mk-grade-letter").textContent = d.rating;
      $("#mk-grade-note").textContent = d.graderNote;
      if (restamp) drawGradeRing();
    }
    radarGeometry(radarVals);
    applyReview("A", false);
    var universe = "A";
    /* 雷达绘入+盖章:双向可重演(镜像出入场) */
    (function radarReplay() {
      var radar = $("#radar"), stamp = $("#stamp");
      replayable("#review", function (origin, entering) {
        var tl = gsap.timeline({ paused: true });
        if (entering) {
          tl.set(radar, { autoAlpha: 0 });
          tl.set(stamp, { autoAlpha: 0, scale: 1.15, y: origin * 20 });
          tl.to(radar, { autoAlpha: 1, duration: 0.5, ease: EASE })
            .call(function() { radar.classList.add("is-in"); })
            .to(stamp, { autoAlpha: 1, scale: 1, y: 0, duration: 0.24, ease: "power2.in" }, "+=0.3")
            .call(function() { stamp.classList.add("is-stamping"); drawGradeRing(); }, null, "+=0.1");
        } else {
          tl.to(stamp, { autoAlpha: 0, y: -origin * 20, duration: 0.3, ease: "power2.in" })
            .to(radar, { autoAlpha: 0, duration: 0.3, ease: EASE }, "<")
            .call(function() {
              radar.classList.remove("is-in");
              stamp.classList.remove("is-stamping");
              primeStroke(gradeRing);
            });
        }
        return tl;
      }, { start: "top 62%", end: "bottom 20%" });
    })();
    $("#universe-toggle").addEventListener("click", function () {
      universe = universe === "A" ? "C" : "A";
      applyReview(universe, true);
      /* 3.7:平行宇宙联动 SRS——切换宇宙时复习模拟器同步为对应评级初始态,回切复位 */
      srsInterval = universe === "A" ? 14 : 3;
      srsHistory = [universe];
      srsRender();
      this.textContent = universe === "A" ? "如果当时没抓住那个 bug?" : "回到修正后的世界";
    });

    /* ===== 13 · 面试:按钮交互版(降级路径;分镜接管时互斥) ===== */
    var ivCineActive = false;
    function ivMsgs(i) {
      var r = INTERVIEW[i];
      return [
        { cls: "tutor", html: r.q, tag: "面试官 · 第 " + (i + 1) + " 轮" },
        { cls: "student", html: r.a, tag: "你" }
      ];
    }
    var ivStep = 0, ivBtn = $("#iv-next"), ivT1 = null, ivT2 = null;
    var IV_INITIAL_HINT = '<p class="hint">面试开始后，面试官会先针对你的提交发起第一轮追问。</p>';
    function ivClick() {
      if (ivCineActive) return;
      var box = $("#iv-chat"), scroller = box.parentElement;  /* .chat-body：定高·内部滚动 */
      if (ivStep === 0) box.innerHTML = "";
      if (ivStep < INTERVIEW.length) {
        var pair = ivMsgs(ivStep);
        ivBtn.disabled = true;
        var typing = document.createElement("div");
        typing.className = "typing"; typing.innerHTML = "<i></i><i></i><i></i>";
        box.appendChild(typing);
        pinBottom(scroller);                       /* 先把「正在输入」露在框底 */
        syncScrollLock(scroller);
        var qEl = null;
        ivT1 = setTimeout(function () {
          ivT1 = null;
          typing.remove();
          qEl = pushMsg(box, pair[0].cls, pair[0].html, pair[0].tag);
          scrollElTop(scroller, qEl);              /* 新一轮:面试官这一问顶到框顶 */
          syncScrollLock(scroller);
          ivT2 = setTimeout(function () {
            ivT2 = null;
            pushMsg(box, pair[1].cls, pair[1].html, pair[1].tag);
            ivStep++;
            $("#iv-round").textContent = "当前轮次 " + ivStep + "/5";
            ivBtn.disabled = false;
            ivBtn.textContent = ivStep < INTERVIEW.length ? "下一轮追问" : "面试如何影响评级？";
            ivBtn.classList.toggle("btn-primary", ivStep >= INTERVIEW.length);
            ivBtn.classList.toggle("btn-ghost", ivStep < INTERVIEW.length);
            scrollElTop(scroller, qEl);             /* 答完仍让这一问停在框顶 */
            syncScrollLock(scroller);               /* 内容变长后再判断是否需要内部滚动 */
          }, 900);
        }, 800);
      } else {
        ivBtn.remove();
        var card = document.createElement("div");
        card.className = "panel"; card.style.marginTop = "6px";
        card.innerHTML = IV_FINALE_HTML;
        box.appendChild(card);
        scrollElTop(scroller, card);                /* 终局卡顶到框顶 */
        syncScrollLock(scroller);
      }
    }
    ivBtn.addEventListener("click", ivClick);
    function resetInterviewInteractive() {
      clearTimeout(ivT1); clearTimeout(ivT2); ivT1 = ivT2 = null;
      ivStep = 0;
      $("#iv-chat").innerHTML = IV_INITIAL_HINT;
      syncScrollLock($("#iv-chat").parentElement);          /* 复位到空态:解锁,鼠标停在框内也能滚整页 */
      $("#iv-round").textContent = "当前轮次 0/5";
      var btn = $("#iv-next");
      if (!btn) {
        btn = document.createElement("button");
        btn.id = "iv-next";
        btn.addEventListener("click", ivClick);
        var foot = $("#interview .cine-foot-interactive");
        foot.insertBefore(btn, foot.firstChild);
      }
      btn.className = "btn btn-primary";
      btn.textContent = "开始面试";
      btn.disabled = false;
      ivBtn = btn;
    }

    /* ===== 14 · 滚动分镜(GSAP pin + scrub;桌面增强,窄屏保持按钮版) ===== */
    var mm = gsap.matchMedia();

    /* ===== 分镜到站「墙」(2026-07-27 重写) =====
       病根:此前的墙是「事后补救」——先让页面越过边界,再用 lenis.scrollTo 把人拽回来。
       那记拽回就是用户看到的「回弹」;而且拽回与手势互为因果(拽回改滚动位置 → 触发
       scroll → 再判定 → 再拽),任何拽不干净的边角(锁期外的余量、冷却窗口里溜进来的
       一记滚轮、动量把落点甩到 grab 距离之外)都会让它复发。参数怎么调都只是挪走复发点。

       新法:墙前移到输入端,一次也不越界,于是没有任何东西需要弹回。
       Lenis 的每一次真实输入(滚轮/触摸/触摸惯性)最终都收敛到同一句
       scrollTo(targetScroll + delta, { programmatic: false }) —— 在这一句上夹取落点:
       落点若要跨过分镜边界(起点=首帧满屏 / 终点=末帧满屏),就地改成边界值。
       动量被吸在墙上(targetScroll 停在边界,不累积越界余量),页面只会「停下」,
       结构上不存在越界,也就不可能回弹。

       随之根绝的隐患:
       · 不再有程序化滚动,故不必与锚点 glide 抢方向盘(程序化调用不带 programmatic:false,
         天然放行),glide.active / 冷却窗 / lock 这三个状态位一并取消——没有状态就没有竞态。
       · 不再依赖 grab 距离:多远飞进来都在同一句上夹住,不存在「飞太快够不着墙」。
       · 到站后 targetScroll 恰在边界,人贴墙(EDGE 容差内),下一手势的落点直接越过,
         入场/离场都不需要额外手势,也不会被墙反复扣住。 */
    var cineWalls = [];
    (function installCineWalls() {
      if (!lenis) return;
      var native = lenis.scrollTo.bind(lenis);
      var EDGE = 2;   /* 贴墙容差:落在边界 2px 内即视为已到站,该墙对下一手不再生效 */
      var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
      lenis.scrollTo = function (target, opts) {
        /* 只夹真实输入:程序化滚动(锚点 glide、回到顶部、把消息带进视口)一律放行 */
        if (!cineWalls.length || !opts || opts.programmatic !== false || typeof target !== "number") {
          return native(target, opts);
        }
        var y = lenis.animatedScroll, wall = null;
        for (var i = 0; i < cineWalls.length; i++) {
          var s = cineWalls[i].start(), e = cineWalls[i].end();
          if (!(e - s > 1)) continue;                                   /* 未 refresh 完的坐标不布墙 */
          var cand = null;
          if (target > y) {
            if (y <= s - EDGE && target > s) cand = s;                  /* 向下进站:停在首帧满屏 */
            else if (y < e - EDGE && target > e) cand = e;              /* 向下出站:停在末帧满屏 */
          } else if (target < y) {
            if (y >= e + EDGE && target < e) cand = e;                  /* 向上进站:停在末帧满屏 */
            else if (y > s + EDGE && target < s) cand = s;              /* 向上出站:停在首帧满屏 */
          }
          /* 一记猛滚可能同时越过两章的边界:取行进方向上最近的那堵,先撞先停,
             不能让下游章节的墙抢在上游前面(向上滚时尤其明显)。 */
          if (cand !== null && (wall === null || Math.abs(cand - y) < Math.abs(wall - y))) wall = cand;
        }
        if (wall === null) return native(target, opts);
        /* 到站收口用一段短促自有缓动(距离越短越快),不改 Lenis 全局手感;
           不用 lock:不吞输入就没有「锁一解开、攒着的动量一次泄出」这种越界方式。 */
        var o = {};
        for (var k in opts) o[k] = opts[k];
        /* Lenis 的 Animate:duration+easing 优先于 lerp。本站是 duration 制(1.05s),
           故只在 duration 制的调用上换成短促曲线;若哪天改回纯 lerp 制,原样放行不干预。 */
        if (o.duration && o.easing) {
          o.duration = Math.min(0.5, Math.max(0.18, (Math.abs(wall - y) / window.innerHeight) * 0.5));
          o.easing = easeOut;
        }
        return native(wall, o);
      };
    })();
    /* 布墙/撤墙:边界每次都现读 st.start/st.end,故 ScrollTrigger.refresh()(改窗、改字号、
       上游 pin-spacer 变高)之后墙自动跟到新坐标,不存在陈旧边界。 */
    function cineWall(st) {
      var wall = { start: function () { return st.start; }, end: function () { return st.end; } };
      cineWalls.push(wall);
      return function () {
        var i = cineWalls.indexOf(wall);
        if (i > -1) cineWalls.splice(i, 1);
      };
    }

    /* 锁屏交给 CSS sticky(见 main.css 分镜块),ScrollTrigger 只剩「报进度」一件事:
       量程＝轨道高 − 舞台高,也就是 sticky 真正贴顶的那段。写成函数,每次 refresh 现量,
       故改窗、svh 与 vh 不等、舞台被内容顶高时,进度量程与 sticky 区间永远同一段——
       不会出现「帧演完了还没解锁」或「解锁了帧还没演完」。 */
    function cineScrubEnd(sec) {
      return function () {
        var track = sec.querySelector(".cine-track"), stage = sec.querySelector(".cine-stage");
        return "+=" + Math.max(1, track.offsetHeight - stage.offsetHeight);
      };
    }

    /* 第 2 章:滚动即时间线
       EC-10 · 2026-07-28:撤掉 min-width 闸口。锁屏已是原生 sticky、轨道高度是纯 CSS
       (100svh + --cine-scrub),与视口宽度无关;窄屏此前退回按钮版,只是当初 JS pin 时代
       留下的保守门槛。手机上「滚动即时间线」正是这件装置的主张,不该只有桌面看得到。
       min-height 保留:横屏手机(844×390)放不下舞台,仍走按钮版。
       内滚陷阱不存在——Lenis 同时接管 wheel 与 touch,未挂 data-lenis-prevent 的
       .chat-body/.code 在分镜模式下都不会截走手势。 */
    mm.add("(min-height: 600px)", function () {
      var sec = $("#code");
      sec.style.setProperty("--cine-scrub", ((FRAMES.length - 1) * 42) + "svh");
      sec.classList.add("is-cine");
      stopReplay();
      var cur = 0;
      renderFrame(0);
      var st = ScrollTrigger.create({
        trigger: sec.querySelector(".cine-track"),
        start: "top top",
        end: cineScrubEnd(sec),
        fastScrollEnd: true,
        preventOverlaps: true,
        scrub: 0.32,
        onUpdate: function (self) {
          var f = Math.round(self.progress * (FRAMES.length - 1));
          if (f !== cur) { cur = f; renderFrame(f); }
          $("#replay-scrub-fill").style.transform = "scaleX(" + self.progress + ")";
        }
      });
      var unwall = cineWall(st);
      return function () {
        sec.classList.remove("is-cine");
        sec.style.removeProperty("--cine-scrub");
        st.kill();
        unwall();
        renderFrame(0);
      };
    });
    /* 第 6 章:滚动推进对话(7 拍:q1,a1,q2,a2,q3,a3,终局卡)
       EC-10 · 同上撤宽度闸口;min-height 从 700px 保留(对话框 min(56vh,560px) 加标题与
       进度条,700 以下舞台放不下)。 */
    mm.add("(min-height: 700px)", function () {
      var sec = $("#interview"), beats = 7, curK = -1, curTyping = false;
      sec.style.setProperty("--cine-scrub", (beats * 28 + 24) + "svh");   /* 3.2:354%→220%vh,语料已同步精炼 */
      sec.classList.add("is-cine");
      /* 分镜模式:滚动驱动 scrub,对话框永不拦截页面滚动(syncScrollLock 只在非分镜时判断) */
      ivCineActive = true;
      resetInterviewInteractive();
      function render(k, typing) {
        var box = $("#iv-chat"), scroller = $("#interview .chat-body"), html = "", ans = 0;
        /* 粘底检测(3.3):只有用户本就贴着框底时才自动跟底,手动上滚回看不被打断 */
        var stick = !scroller || scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop < 48;
        for (var i = 0; i < INTERVIEW.length; i++) {
          var pair = ivMsgs(i);
          if (2 * i + 1 <= k) html += msgHTML(pair[0]);
          if (2 * i + 2 <= k) { html += msgHTML(pair[1]); ans++; }
        }
        if (typing) html += TYPING_HTML;
        if (k >= 7) html += '<div class="panel" style="margin-top:6px">' + IV_FINALE_HTML + "</div>";
        box.innerHTML = html;
        $("#iv-round").textContent = "当前轮次 " + Math.min(3, ans) + "/5";
        if (stick) pinBottom(scroller);
      }
      var st = ScrollTrigger.create({
        trigger: sec.querySelector(".cine-track"),
        start: "top top",
        end: cineScrubEnd(sec),
        fastScrollEnd: true,
        preventOverlaps: true,
        scrub: 0.5,
        onUpdate: function (self) {
          var p = self.progress;
          var k = Math.min(beats, 1 + Math.floor(p * beats));
          var frac = p * beats - Math.floor(p * beats);
          var typing = k < beats && frac > 0.45 && (k + 1) % 2 === 1 && (k + 1) <= 6;
          if (k !== curK || typing !== curTyping) { curK = k; curTyping = typing; render(k, typing); }
          $("#iv-scrub-fill").style.transform = "scaleX(" + p + ")";
        }
      });
      render(1, false);
      var unwall = cineWall(st);
      return function () {
        sec.classList.remove("is-cine");
        sec.style.removeProperty("--cine-scrub");
        st.kill();
        unwall();
        /* 回到可点模式:对话框恢复内部滚动(溢出与否由 resetInterviewInteractive 里的 syncScrollLock 判断) */
        ivCineActive = false;
        resetInterviewInteractive();
      };
    });

    /* ===== 15 · SRS 复利数轴(产品真实算法:A14/B7/C3/D1,连续巩固 ×2.0/×1.3,封顶 180) ===== */
    var SRS_BASE = { A: 14, B: 7, C: 3, D: 1 }, SRS_CAP = 180;
    var SRS_MARKS = [1, 3, 7, 14, 28, 56, 112, 180];
    var SRS_TARGET = {
      A: "快速复现核心思路，避免长期遗忘",
      B: "确认卡点已经消失，再进入更长间隔",
      C: "补稳边界和复杂度，争取升到 B",
      D: "修正基础正确性，先写出能运行的版本"
    };
    var srsInterval = 14, srsHistory = ["A"];
    function srsPos(days) { return (Math.log(Math.max(1, days)) / Math.log(SRS_CAP)) * 100; }
    (function initSrsAxis() {
      var ax = $("#srs-axis");
      SRS_MARKS.forEach(function (m) {
        var t = document.createElement("div");
        t.className = "srs-tick"; t.style.left = srsPos(m) + "%";
        t.dataset.d = m;   /* EC-3 · 供 ≤480px 隐去 28/112 两档,消解窄屏刻度碰撞 */
        t.innerHTML = "<i>" + m + "天</i>";
        ax.appendChild(t);
      });
    })();
    function srsToneOf(r) { return r === "A" ? "tone-ok" : r === "B" ? "tone-ok-soft" : r === "C" ? "tone-warn" : "tone-danger"; }
    function srsRender() {
      $("#srs-marker").style.left = srsPos(srsInterval) + "%";
      $("#srs-interval").textContent = srsInterval + " 天后";
      $("#srs-chips").innerHTML = srsHistory.map(function (r) {
        return '<span class="srs-chip ' + srsToneOf(r) + '">' + r + "</span>";
      }).join("");
      var last = srsHistory[srsHistory.length - 1];
      var read = $("#srs-read");
      var runA = (/A+$/.exec(srsHistory.join("")) || [""])[0].length;
      if (last === "A" && runA > 1) {
        read.className = "srs-read tone-ok";
        read.innerHTML = "连续 " + runA + " 个 A：间隔复利到 <strong>" + srsInterval + " 天</strong>" + (srsInterval >= SRS_CAP ? "（已封顶）" : "") + "。这道题正在离开你的日程。<br>本次目标：" + SRS_TARGET.A + "。";
      } else if (last === "A") {
        read.className = "srs-read tone-neutral";
        read.innerHTML = "评级 A 生成 14 天间隔，列入「可以顺手巩固」。<br>本次目标：" + SRS_TARGET.A + "。";
      } else if (last === "B") {
        read.className = "srs-read tone-neutral";
        read.innerHTML = "评级 B 生成 " + srsInterval + " 天间隔，列入「建议今天完成」。<br>本次目标：" + SRS_TARGET.B + "。";
      } else if (last === "C") {
        read.className = "srs-read tone-warn";
        read.innerHTML = "评级 C 生成 3 天间隔，断崖回落，列入「必须优先」。<br>本次目标：" + SRS_TARGET.C + "。";
      } else {
        read.className = "srs-read tone-danger";
        read.innerHTML = "评级 D 生成 1 天间隔，明天就得回来，列入「必须优先」。<br>本次目标：" + SRS_TARGET.D + "。";
      }
    }
    $$("[data-srs]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var r = btn.dataset.srs, last = srsHistory[srsHistory.length - 1];
        if (r === "A" && last === "A") srsInterval = Math.min(SRS_CAP, Math.round(srsInterval * 2.0));
        else if (r === "B" && (last === "B" || last === "A")) srsInterval = Math.min(SRS_CAP, Math.round(Math.max(SRS_BASE.B, srsInterval) * 1.3));
        else srsInterval = SRS_BASE[r];
        srsHistory.push(r);
        if (srsHistory.length > 10) srsHistory.shift();
        srsRender();
      });
    });
    $("#srs-reset").addEventListener("click", function () {
      /* 复位=回到当前宇宙的本局评级初始态(与 3.7 联动一致) */
      srsInterval = universe === "C" ? 3 : 14; srsHistory = [universe]; srsRender();
    });
    srsRender();

    /* ===== 16 · 尾花转正(双向可重演) + 终章印章(盖上不撤) ===== */
    (function rituals() {
      var tail = $("#tailpiece img");
      replayable("#tailpiece", function (origin, entering) {
        var tl = gsap.timeline({ paused: true });
        if (entering) {
          tl.fromTo(tail, { rotate: -6, y: origin * 18, autoAlpha: 0.4 }, { rotate: 0, y: 0, autoAlpha: 1, duration: 0.8, ease: EASE });
        } else {
          tl.to(tail, { rotate: -6, y: -origin * 18, autoAlpha: 0.4, duration: 0.5, ease: EASE });
        }
        return tl;
      }, { start: "top 80%" });

      var sealImg = $("#seal img");
      /* 官印落定后就该留在纸上：不随继续下滑而消失(keep)，只做一次盖章入场 */
      replayable("#seal", function (origin, entering) {
        var tl = gsap.timeline({ paused: true });
        tl.fromTo(sealImg, { autoAlpha: 0, scale: 1.12, y: origin * 20, rotate: -2 }, { autoAlpha: 1, scale: 1, y: 0, rotate: 0, duration: 0.24, ease: "power2.in" });
        return tl;
      }, { start: "top 78%", keep: true });
    })();

    /* 视口尺寸变化时定高框的溢出状态可能翻转:重新判断是否需要拦截页面滚动 */
    window.addEventListener("resize", function () {
      var t = $("#tutor-chat"); if (t) syncScrollLock(t.parentElement);
      var iv = $("#iv-chat"); if (iv && !ivCineActive) syncScrollLock(iv.parentElement);
    });

    /* 分镜滚程现在是 .cine-track 的 CSS 高度(改 sticky 后无 pin-spacer),
       量坐标前布局已定,不再需要按文档序重排触发器来消 spacer 偏差。 */
    ScrollTrigger.refresh();
  }
})();
