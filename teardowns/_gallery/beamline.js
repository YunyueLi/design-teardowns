(function () {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const pad = (n) => String(n).padStart(2, "0");
  const stations = [
    {
      id: "capture",
      title: "Capture",
      line: "Real interface first.",
      description: "先记录真实界面，再下结论。",
    },
    {
      id: "measure",
      title: "Measure",
      line: "Every detail, measured.",
      description: "读取字体、间距、色彩与动效。",
    },
    {
      id: "reconstruct",
      title: "Reconstruct",
      line: "Rebuilt from evidence.",
      description: "用原作的设计语言，重建关键体验。",
    },
    {
      id: "verify",
      title: "Verify",
      line: "Every number traceable.",
      description: "区分实测与推断，让结论回到出处。",
    },
    {
      id: "archive",
      title: "Archive",
      line: "A growing body of knowledge.",
      description: "藏品持续增加，五站旅程保持不变。",
    },
  ];
  const experience = $("#experience"),
    composition = $("#composition");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let progress = 0,
    activeStation = -1,
    transportFrame = 0,
    scene = null;
  let targetProgress = 0,
    velocity = 0,
    lastFrameTime = 0,
    navigation = null;
  let scrollGeometry = null,
    writtenScroll = null;
  const modalOpen = () => Boolean(document.querySelector("dialog[open]"));
  // One critically damped controller drives both the readout and the scene.
  // Native scrolling supplies its target; station navigation adds a speed limit.
  const response = 38,
    positionTolerance = 0.0002,
    velocityTolerance = 0.008;
  const featured = Array.isArray(window.DESIGN_TEARDOWNS_FEATURED)
    ? window.DESIGN_TEARDOWNS_FEATURED.slice(0, 6)
    : [];
  const featuredOrder = new Map(
    featured.map((item, index) => [item.slug, index]),
  );
  let catalogue = null,
    cataloguePromise = null,
    query = "",
    category = "all",
    sort = "curated",
    page = 0,
    requestSequence = 0;
  let archiveError = false;
  const count = Number(window.DESIGN_TEARDOWNS_TOTAL) || featured.length;
  const pageSize = 6;
  const screenshotHeroSlugs = new Set([
    "easycode",
    "endfield",
    "imlagom",
    "journeypilot",
    "latrix",
    "pear",
    "shopify-editions",
    "shopify-editions-spring26",
    "turtle-soup",
  ]);
  let selectedStudy =
    featured.find((item) => item.slug === "latrix") || featured[0] || null;
  const panel = $("#archive-panel");
  const panelHome = document.createComment(
    "The archive panel returns here after its dialog closes.",
  );
  panel.before(panelHome);
  const openers = new WeakMap();
  const closedDialogs = new WeakSet();
  function layout() {
    const compact = innerWidth <= 1200 || innerWidth / innerHeight < 1.25;
    document.body.classList.toggle("compact", compact);
    if (!compact) {
      const scale = Math.min(innerWidth / 1586, innerHeight / 992);
      document.documentElement.style.setProperty("--scale", String(scale));
    }
    if (scene) scene.resize();
  }
  function measureScroll() {
    scrollGeometry = {
      top: experience.offsetTop,
      range: Math.max(1, experience.offsetHeight - innerHeight),
      width: innerWidth,
      height: innerHeight,
    };
  }
  function scrollProgress() {
    return clamp((scrollY - scrollGeometry.top) / scrollGeometry.range, 0, 1);
  }
  function writeScroll(p) {
    window.scrollTo({
      left: 0,
      top: scrollGeometry.top + scrollGeometry.range * p,
      behavior: "instant",
    });
    writtenScroll = scrollY;
  }
  function setStage(p) {
    const previous = progress;
    progress = clamp(p, 0, 1);
    // Keep the last arrival throughout transit. For a frame that crosses several
    // stops (or reduced motion), publish the last stop crossed in that direction.
    const crossed =
      progress >= previous
        ? Math.floor(progress * (stations.length - 1))
        : Math.ceil(progress * (stations.length - 1));
    const crossedProgress = crossed / (stations.length - 1);
    const reached =
      crossedProgress >= Math.min(previous, progress) &&
      crossedProgress <= Math.max(previous, progress);
    const station = activeStation < 0 || reached ? crossed : activeStation;
    if (station !== activeStation) {
      activeStation = station;
      const meta = stations[station];
      $("#station-number").textContent = pad(station + 1);
      $("#station-word").textContent = meta.title.toUpperCase();
      $("#station-line").textContent =
        station === 0 && selectedStudy ? selectedStudy.subtitle : meta.line;
      $("#station-description").textContent =
        station === 0 && selectedStudy
          ? "以 " + selectedStudy.title + " 为对象，先记录真实界面。"
          : meta.description;
      $("#readout-index").textContent = pad(station + 1) + " / 05";
      $("#readout-word").textContent = meta.title;
      $("#archive-heading").textContent =
        station === 4 ? "Archive" : "Select study";
      $("#archive-scope").textContent = station === 4 ? " studies" : " featured / " + count;
      all("[data-station]").forEach((link) => {
        if (Number(link.dataset.station) === station)
          link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
      document.body.dataset.station = stations[station].id;
      const openStudy = $("#open-study");
      if (openStudy)
        openStudy.classList.toggle("is-complete", station === 4);
    }
    $("#track-progress").style.width = progress * 100 + "%";
    if (scene) scene.setProgress(progress);
  }
  function sampleSource(item) {
    if (!item) return "";
    return screenshotHeroSlugs.has(item.slug)
      ? item.slug + "/screenshots/hero.jpg"
      : item.slug + "/assets/actual-hero.jpg";
  }
  function updateSelectedStudy(item, { resetStage = true } = {}) {
    if (!item) return;
    const archiveDialog = $("#archive-dialog");
    if (archiveDialog?.open) closeDialog(archiveDialog);
    selectedStudy = item;
    document.body.dataset.selectedStudy = item.slug;
    $("#selected-study-title").textContent = item.title;
    $("#selected-study-kind").textContent = item.kind;
    const open = $("#open-study");
    open.href = item.href;
    open.setAttribute("aria-label", "打开 " + item.title + " 拆解");
    open.classList.add("is-ready");
    const access = $("#specimen-access");
    access.href = item.href;
    access.setAttribute("aria-label", "进入当前样本 " + item.title + " 拆解");
    access.querySelector("span").textContent = "Open " + item.title;
    const fallbackLink = $("#fallback-specimen a");
    if (fallbackLink) {
      fallbackLink.href = item.href;
      fallbackLink.querySelector("img").src = item.cover;
      fallbackLink.querySelector("img").alt = item.title + " 拆解";
      fallbackLink.querySelector("span").firstChild.textContent =
        "进入 " + item.title + " 拆解";
    }
    if (scene && typeof scene.setSample === "function")
      scene.setSample({ ...item, sceneCover: sampleSource(item) });
    all(".archive-item").forEach((card) => {
      const active = card.dataset.slug === item.slug;
      card.classList.toggle("is-selected", active);
      if (active) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });
    if (resetStage) goToStation(0);
  }
  function stopTransport() {
    cancelAnimationFrame(transportFrame);
    transportFrame = 0;
    navigation = null;
    targetProgress = progress;
    velocity = 0;
    writeScroll(progress);
    document.body.removeAttribute("data-moving");
  }
  function updateAddress(index) {
    const url = new URL(location.href);
    url.searchParams.delete("station");
    url.hash = stations[index].id;
    history.replaceState(null, "", url);
  }
  function finishTransport() {
    // The reduced-motion scene renders only whole stations. Quantize its target
    // so the readout and specimen describe the same arrival without moving native scroll.
    if (reduced.matches)
      targetProgress =
        Math.round(targetProgress * (stations.length - 1)) /
        (stations.length - 1);
    setStage(targetProgress);
    velocity = 0;
    transportFrame = 0;
    if (navigation) {
      writeScroll(progress);
      updateAddress(navigation.index);
      navigation = null;
    }
    document.body.removeAttribute("data-moving");
  }
  function tick(now) {
    if (
      scrollGeometry.width !== innerWidth ||
      scrollGeometry.height !== innerHeight
    )
      resize();
    // Native coordinates can change before the queued scroll event is delivered.
    // Consume that input before an old navigation frame can overwrite it.
    if (
      navigation &&
      Math.abs(
        scrollY -
          (writtenScroll ??
            scrollGeometry.top + scrollGeometry.range * progress),
      ) >= 1
    ) {
      navigation = null;
      targetProgress = scrollProgress();
      velocity = 0;
      writtenScroll = null;
    }
    // Integrate in seconds, including missed frames, without a second easing curve.
    const dt = Math.max(0, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    const distance = targetProgress - progress,
      direction = Math.sign(distance);
    if (velocity * direction < 0) velocity = 0;
    const offset = -distance,
      coefficient = velocity + response * offset,
      decay = Math.exp(-response * dt);
    const next = targetProgress + (offset + coefficient * dt) * decay;
    let nextVelocity = (velocity - response * coefficient * dt) * decay;
    let step = clamp((next - progress) * direction, 0, Math.abs(distance));
    if (navigation) {
      step = Math.min(step, navigation.maxSpeed * dt);
      nextVelocity = clamp(
        nextVelocity,
        -navigation.maxSpeed,
        navigation.maxSpeed,
      );
    }
    setStage(progress + direction * step);
    velocity = nextVelocity * direction > 0 ? nextVelocity : 0;
    if (navigation) writeScroll(progress);
    if (
      Math.abs(targetProgress - progress) <= positionTolerance &&
      Math.abs(velocity) <= velocityTolerance
    ) {
      finishTransport();
      return;
    }
    transportFrame = requestAnimationFrame(tick);
  }
  function followTarget() {
    if (reduced.matches) {
      cancelAnimationFrame(transportFrame);
      finishTransport();
      return;
    }
    if (transportFrame) return;
    if (
      Math.abs(targetProgress - progress) <= positionTolerance &&
      Math.abs(velocity) <= velocityTolerance
    ) {
      finishTransport();
      return;
    }
    lastFrameTime = performance.now();
    document.body.dataset.moving = "true";
    transportFrame = requestAnimationFrame(tick);
  }
  function goToStation(index, instant = false) {
    if (modalOpen()) return;
    index = clamp(Math.round(index), 0, 4);
    targetProgress = index / 4;
    const distance = Math.abs(targetProgress - progress);
    navigation = {
      index,
      maxSpeed: Math.max(0.25, distance / (0.65 + 1.05 * distance)),
    };
    if (instant) {
      cancelAnimationFrame(transportFrame);
      finishTransport();
      return;
    }
    followTarget();
  }
  function takeOver() {
    if (modalOpen()) return;
    if (!navigation) return;
    navigation = null;
    targetProgress = scrollProgress();
    followTarget();
  }
  function resize() {
    // A viewport change can dispatch scroll before resize. Preserve controller state
    // before reading scroll coordinates in the new geometry.
    layout();
    measureScroll();
    writeScroll(navigation ? progress : targetProgress);
    setStage(progress);
  }
  function readScroll() {
    if (modalOpen()) return;
    if (
      scrollGeometry.width !== innerWidth ||
      scrollGeometry.height !== innerHeight
    ) {
      resize();
      return;
    }
    if (writtenScroll !== null && Math.abs(scrollY - writtenScroll) < 1) {
      writtenScroll = null;
      return;
    }
    writtenScroll = null;
    navigation = null;
    targetProgress = scrollProgress();
    followTarget();
  }
  all("[data-station]").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goToStation(Number(link.dataset.station));
    }),
  );
  all('a[href="#capture"]:not([data-station])').forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      goToStation(0);
    }),
  );
  window.addEventListener("scroll", readScroll, { passive: true });
  ["wheel", "touchstart", "pointerdown"].forEach((type) =>
    window.addEventListener(type, takeOver, { passive: true }),
  );
  window.addEventListener("keydown", (event) => {
    if (
      [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " ",
      ].includes(event.key) &&
      !event.target.closest(
        'input,select,textarea,[contenteditable]:not([contenteditable="false"])',
      )
    )
      takeOver();
  });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("hashchange", () => {
    const index = stations.findIndex((s) => "#" + s.id === location.hash);
    if (index >= 0) goToStation(index, true);
  });
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      cancelAnimationFrame(transportFrame);
      finishTransport();
    } else setStage(progress);
  });
  function setFallback(failed) {
    $("#fallback-specimen").hidden = !failed;
    $("#beamline-3d").hidden = failed;
    $("#specimen-access").hidden = failed;
    document.body.classList.toggle("scene-unavailable", failed);
  }
  layout();
  measureScroll();
  try {
    scene = new window.BeamlineScene($("#beamline-3d"), setFallback);
    setFallback(false);
  } catch (error) {
    setFallback(true);
    console.error("The three-dimensional scene could not initialize.", error);
  }
  all(".collection-count").forEach((node) => {
    node.textContent = String(count);
  });
  function ensureCatalogue() {
    if (catalogue) return Promise.resolve(catalogue);
    if (cataloguePromise) return cataloguePromise;
    cataloguePromise = new Promise((resolve, reject) => {
      if (
        Array.isArray(window.DESIGN_TEARDOWNS) &&
        window.DESIGN_TEARDOWNS.length
      ) {
        catalogue = window.DESIGN_TEARDOWNS;
        resolve(catalogue);
        return;
      }
      const script = document.createElement("script");
      script.src = "_gallery/catalogue.js";
      script.onload = () => {
        if (
          Array.isArray(window.DESIGN_TEARDOWNS) &&
          window.DESIGN_TEARDOWNS.length
        ) {
          catalogue = window.DESIGN_TEARDOWNS;
          resolve(catalogue);
        } else {
          script.remove();
          reject(new Error("Catalogue data is missing."));
        }
      };
      script.onerror = () => {
        script.remove();
        reject(new Error("Catalogue could not load."));
      };
      document.head.append(script);
    }).catch((error) => {
      cataloguePromise = null;
      throw error;
    });
    return cataloguePromise;
  }
  function archiveItem(item) {
    const a = document.createElement("a");
    a.className = "archive-item";
    a.href = item.href;
    a.dataset.slug = item.slug;
    if (item.slug === selectedStudy?.slug) {
      a.setAttribute("aria-current", "true");
      a.classList.add("is-selected");
    }
    const image = document.createElement("img");
    image.src = item.cover;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    const label = document.createElement("span"),
      title = document.createElement("b"),
      kind = document.createElement("small");
    title.textContent = item.title;
    kind.textContent = item.kind;
    label.append(title, kind);
    a.append(image, label);
    a.setAttribute(
      "aria-label",
      "进入 " +
        (item.titleZh ? item.titleZh + " / " : "") +
        item.title +
        " 拆解",
    );
    a.addEventListener("click", (event) => {
      event.preventDefault();
      updateSelectedStudy(item);
    });
    return a;
  }
  function showMessage(text, action, handler) {
    const host = $("#archive-message");
    host.hidden = false;
    host.querySelector("p").textContent = text;
    const button = host.querySelector("button");
    button.textContent = action;
    button.onclick = handler;
    $("#archive-results").hidden = true;
  }
  function clearFilters() {
    query = "";
    category = "all";
    page = 0;
    $("#archive-search").value = "";
    $("#archive-category").value = "all";
    refreshArchive();
  }
  function renderArchive() {
    const focused = document.activeElement;
    const focusedPage = $("#page-numbers").contains(focused);
    const focusedMessage = $("#archive-message").contains(focused);
    const list = catalogue || featured;
    const filtered = list.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (!query ||
          [item.title, item.titleZh, item.subtitle, item.kind, item.category]
            .join(" ")
            .toLocaleLowerCase()
            .includes(query)),
    );
    if (sort === "title")
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    else
      filtered.sort(
        (a, b) =>
          (featuredOrder.get(a.slug) ?? featured.length) -
          (featuredOrder.get(b.slug) ?? featured.length),
      );
    const total = catalogue ? filtered.length : count;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    page = clamp(page, 0, pages - 1);
    const visible = filtered.slice(page * pageSize, page * pageSize + pageSize);
    $("#archive-results").replaceChildren(...visible.map(archiveItem));
    $("#archive-results").hidden = !visible.length;
    $("#archive-message").hidden = true;
    if (!visible.length)
      showMessage("没有匹配的作品。", "清除筛选", clearFilters);
    $("#archive-status").textContent =
      total +
      " 份拆解，" +
      (visible.length
        ? "第 " +
          (page * pageSize + 1) +
          "–" +
          (page * pageSize + visible.length) +
          " 项"
        : "暂无匹配") +
      "。";
    $("#page-prev").disabled = page === 0;
    $("#page-next").disabled = page >= pages - 1;
    const numbers = [];
    // The pager stays bounded as the collection grows.
    const first = Math.max(0, Math.min(page - 2, pages - 5));
    for (let i = first; i < Math.min(pages, first + 5); i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(i + 1);
      button.setAttribute("aria-label", "第 " + (i + 1) + " 页");
      if (i === page) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => {
        page = i;
        refreshArchive();
      });
      numbers.push(button);
    }
    $("#page-numbers").replaceChildren(...numbers);
    if (
      focusedPage ||
      (focused === $("#page-prev") && focused.disabled) ||
      (focused === $("#page-next") && focused.disabled)
    ) {
      $('#page-numbers [aria-current="page"]').focus({ preventScroll: true });
    } else if (focusedMessage && $("#archive-message").hidden) {
      $("#archive-search").focus({ preventScroll: true });
    }
  }
  async function refreshArchive() {
    const sequence = ++requestSequence;
    panel.setAttribute("aria-busy", "true");
    archiveError = false;
    try {
      await ensureCatalogue();
      if (sequence !== requestSequence) return;
      renderArchive();
    } catch (error) {
      if (sequence !== requestSequence) return;
      archiveError = true;
      showMessage("完整馆藏暂时无法加载，请重试。", "重新加载", refreshArchive);
      $("#archive-status").textContent = "完整馆藏加载失败。";
    } finally {
      if (sequence === requestSequence) panel.removeAttribute("aria-busy");
    }
  }
  $("#archive-search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLocaleLowerCase();
    page = 0;
    refreshArchive();
  });
  $("#archive-category").addEventListener("change", (e) => {
    category = e.target.value;
    page = 0;
    refreshArchive();
  });
  $("#archive-sort").addEventListener("change", (e) => {
    sort = e.target.value;
    page = 0;
    refreshArchive();
  });
  $("#page-prev").addEventListener("click", () => {
    page--;
    refreshArchive();
  });
  $("#page-next").addEventListener("click", () => {
    page++;
    refreshArchive();
  });
  function openDialog(id, trigger) {
    const dialog = document.getElementById(id);
    if (!dialog || dialog.open) return;
    closedDialogs.delete(dialog);
    stopTransport();
    openers.set(dialog, trigger || document.activeElement);
    if (id === "archive-dialog") {
      $("#archive-slot").append(panel);
      refreshArchive();
    }
    dialog.showModal();
    document.body.classList.add("dialog-open");
    (id === "archive-dialog"
      ? $("#archive-search")
      : dialog.querySelector("[data-close]")
    ).focus({ preventScroll: true });
  }
  function restoreDialog(dialog) {
    if (dialog.open || closedDialogs.has(dialog)) return;
    closedDialogs.add(dialog);
    if (dialog.id === "archive-dialog") panelHome.after(panel);
    if (!document.querySelector("dialog[open]")) {
      document.body.classList.remove("dialog-open");
      const opener = openers.get(dialog);
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    }
  }
  function closeDialog(dialog) {
    dialog.close();
    restoreDialog(dialog);
  }
  all("[data-dialog]").forEach((button) =>
    button.addEventListener("click", () =>
      openDialog(button.dataset.dialog, button),
    ),
  );
  all("[data-close]").forEach((button) =>
    button.addEventListener("click", () =>
      closeDialog(button.closest("dialog")),
    ),
  );
  all("dialog").forEach((dialog) => {
    dialog.addEventListener("keydown", (event) => {
      // Search inputs otherwise consume Escape by clearing the query first.
      if (event.key === "Escape" && !event.isComposing) {
        event.preventDefault();
        closeDialog(dialog);
      }
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      // close is queued: do not repeat cleanup or steal focus after the user moves on.
      restoreDialog(dialog);
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          closeDialog(dialog);
      }
    });
  });
  const skip = $(".skip-link");
  skip.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      panel.parentElement === composition &&
      getComputedStyle(panel).display === "none"
    )
      openDialog("archive-dialog", skip);
    else $("#archive-search").focus({ preventScroll: true });
  });
  renderArchive();
  updateSelectedStudy(selectedStudy, { resetStage: false });
  const parameter = new URLSearchParams(location.search).get("station");
  const fromHash = stations.findIndex((s) => "#" + s.id === location.hash);
  const initial =
    parameter !== null
      ? clamp(Number(parameter) || 0, 0, 4)
      : Math.max(0, fromHash);
  goToStation(initial, true);
  // Read-only runtime diagnostics, used by acceptance checks and useful when reporting a defect.
  window.BEAMLINE = {
    inspect: () => ({
      station: activeStation,
      progress,
      targetProgress,
      velocity,
      frameTime: lastFrameTime,
      navigating: Boolean(navigation),
      moving: Boolean(transportFrame),
      archive: {
        loaded: Boolean(catalogue),
        error: archiveError,
        page,
        query,
        category,
        total: catalogue ? catalogue.length : count,
      },
      scene: scene ? scene.inspect() : null,
    }),
  };
})();
