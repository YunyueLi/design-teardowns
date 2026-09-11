/* ══════════════════════════════════════════════════════════════════════════
   ungetsu.net 首页电影级唱机 —— 复刻
   几何尺寸、材质参数、灯光色与强度、唱臂逆解、镜头样条，全部取自
   real-assets/js/music-chapter.Bm7fAGSv.js 原文；贴图为站点真实文件。
   与原站的差别只有一处（页内已注明）：玻璃镇盘器用 three.js 内置的
   屏幕空间 transmission，而不是原站自带 BVH 的光线追踪 pass。
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var host = document.getElementById('deck3d');
  if (!host) return;
  var T = window.THREE;
  var note = document.getElementById('deck3dNote');
  function fail(msg) { if (note) note.textContent = msg; host.dataset.state = 'failed'; }
  if (!T || !T.RectAreaLightUniformsLib) { fail('three.js 未加载，三维唱机不可用。'); return; }

  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var IMG = 'real-assets/image/';

  /* ── 真实常量 ─────────────────────────────────────────────────────── */
  var SPINDLE = new T.Vector3(-0.85, 0, 0.62);   // n9
  var PIVOT   = new T.Vector3(0.93, 0, -0.292);  // w4
  var ARM_LEN = 2.185;                           // I9
  var ARM_REST = 0.025;                          // g1
  var GUIDE = [[-0.4, -1.3], [2.2, -0.78], [2.2, 0.46], [0.18, -0.3]];  // m
  var SPECTRUM = [0x7049ad, 0x248cd0, 0x329835, 0xffce13, 0xff7a08, 0xe52b0d];

  /* 唱臂角度：按落针半径解三角形（余弦定理），原文逐字移植 */
  function armAngle(progress) {
    var r = 1.44 - clamp(progress, 0, 1) * 0.85;
    var d = PIVOT.clone().sub(SPINDLE);
    var n = Math.hypot(d.x, d.z);
    return Math.atan2(d.x, d.z) -
      Math.acos(clamp((r * r - n * n - ARM_LEN * ARM_LEN) / (2 * n * ARM_LEN), -1, 1));
  }

  /* ── 渲染器 ───────────────────────────────────────────────────────── */
  var renderer;
  try {
    renderer = new T.WebGLRenderer({ alpha: true, premultipliedAlpha: false, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { fail('这台设备无法创建 WebGL 上下文，三维唱机不可用。'); return; }
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;   // 原站 toneMapping 常量 = 4
  renderer.toneMappingExposure = 0.9;               // 原站曝光
  if ('transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;         // 原站常量 = 1
  renderer.shadowMap.autoUpdate = false;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  T.RectAreaLightUniformsLib.init();

  var scene = new T.Scene();
  var rig = new T.Group();
  scene.add(rig);
  var camera = new T.PerspectiveCamera(31, 1, 0.04, 150);   // 原站 FOV 31

  /* ── 贴图 ─────────────────────────────────────────────────────────── */
  var loader = new T.TextureLoader();
  var pending = 0, failed = 0;
  function tex(file, srgb) {
    pending++;
    var t = loader.load(IMG + file, function () { pending--; schedule(); }, undefined, function () { pending--; failed++; schedule(); });
    t.flipY = false;
    t.colorSpace = srgb ? T.SRGBColorSpace : T.NoColorSpace;
    t.minFilter = T.LinearMipmapLinearFilter;
    t.magFilter = T.LinearFilter;
    return t;
  }
  var texGuideColor = tex('guideColor.Bm3G9ZkQ.png', true);
  var texGuideEmit  = tex('guideEmission.SSVxwNL2.png', true);
  var texPlinth     = tex('plinth.N3VNeUWd.png', true);
  var texGrooves    = tex('grooves.CppvjjF6.png', false);
  var texGrooveRough = tex('grooveRoughness.C2wTPk0O.png', false);
  var texGrooveDir  = tex('grooveDirection.BLp3I64B.png', false);

  /* ── 材质（全部真实值） ───────────────────────────────────────────── */
  var mPlinth = new T.MeshPhysicalMaterial({ color: 0x080d10, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 });
  var mPlate  = new T.MeshPhysicalMaterial({ color: 0x050708, roughness: 0.26, clearcoat: 0.4, clearcoatRoughness: 0.18 });
  var mMetal  = new T.MeshStandardMaterial({ color: 0xd1d6d8, metalness: 1, roughness: 0.23 });
  var mDark   = new T.MeshStandardMaterial({ color: 0x030403, roughness: 0.85 });
  var mGlass  = new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.007, transmission: 1, thickness: 0.1, ior: 1.52, attenuationColor: new T.Color(0xc8e6e1), attenuationDistance: 8 });
  var mTop = mPlinth.clone();
  mTop.envMapIntensity = 0.32; mTop.specularIntensity = 0.45; mTop.clearcoat = 0.12;
  mTop.clearcoatRoughness = 0.25; mTop.roughness = 0.34; mTop.map = texPlinth; mTop.color.set(0xffffff);

  /* 黑胶：各向异性 + 三张唱纹贴图 */
  var mVinyl = new T.MeshPhysicalMaterial({
    color: 0x08090b, roughness: 0.82, ior: 1.54,
    anisotropy: 0.65, anisotropyMap: texGrooveDir,
    roughnessMap: texGrooveRough,
    normalMap: texGrooves, normalScale: new T.Vector2(0.6, 0.6),
    envMapIntensity: 0.6, specularIntensity: 0.75,
    clearcoat: 0.08, clearcoatRoughness: 0.24
  });
  var mVinylEdge = new T.MeshPhysicalMaterial({ color: 0x08090b, roughness: 0.24, ior: 1.54 });
  /* 原站这里贴当期专辑封面；本复刻自绘一张中性盘面，不搬第三方封面图 */
  var mLabel = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.77 });
  (function () {
    var cv = document.createElement('canvas');
    cv.width = cv.height = 512;
    var c = cv.getContext('2d');
    c.fillStyle = '#161311'; c.fillRect(0, 0, 512, 512);
    c.strokeStyle = '#cf5f45'; c.lineWidth = 3;
    c.beginPath(); c.arc(256, 256, 208, 0, Math.PI * 2); c.stroke();
    c.fillStyle = '#cf5f45'; c.fillRect(214, 150, 84, 84);
    c.fillStyle = '#d9d7d0'; c.textAlign = 'center';
    c.font = '46px Georgia, serif'; c.fillText('UNGETSU', 256, 320);
    c.font = '26px Georgia, serif'; c.fillStyle = '#8e8c85';
    c.fillText('33 1/3 RPM', 256, 372);
    var t = new T.CanvasTexture(cv);
    t.colorSpace = T.SRGBColorSpace;
    mLabel.map = t;
  })();
  var mSubPlatter = new T.MeshStandardMaterial({ color: 0xdce1e3, metalness: 1, roughness: 0.32, normalMap: texGrooves, normalScale: new T.Vector2(0.28, 0.28) });
  var mGuide = new T.MeshPhysicalMaterial({
    color: 0xffffff, map: texGuideColor,
    emissive: 0xffffff, emissiveMap: texGuideEmit, emissiveIntensity: 2.3,
    roughness: 0.38, clearcoat: 0.22, clearcoatRoughness: 0.22
  });
  var mGround = new T.MeshStandardMaterial({ color: 0x121615, roughness: 0.46, metalness: 0 });

  /* ── 建模辅助 ─────────────────────────────────────────────────────── */
  function put(geo, mat, parent, x, y, z) {
    var mesh = new T.Mesh(geo, mat);
    mesh.position.set(x || 0, y || 0, z || 0);
    mesh.castShadow = !(mat.transmission > 0);
    mesh.receiveShadow = true;
    (parent || rig).add(mesh);
    return mesh;
  }
  function cyl(r, h, mat, parent, x, y, z) { return put(new T.CylinderGeometry(r, r, h, 96), mat, parent, x, y, z); }
  function slab(pts, depth, bevel, mat, y) {
    var shape = new T.Shape();
    pts.forEach(function (p, i) { i ? shape.lineTo(p[0], -p[1]) : shape.moveTo(p[0], -p[1]); });
    shape.closePath();
    var geo = new T.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 4, steps: 1 });
    geo.rotateX(-Math.PI / 2);
    return put(geo, mat, rig, 0, y, 0);
  }

  /* ── 机身：一个三角形 + 彩虹那侧的四边形 ─────────────────────────── */
  var body = slab([[-0.85, -2.025], [-2.75, 2.025], [1.4, 2.025]], 0.265, 0.007, mTop, -0.28);
  (function () {   // 机身贴图的 UV 按真实包围盒归一
    var pos = body.geometry.getAttribute('position'), uv = body.geometry.getAttribute('uv');
    for (var i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + 2.75) / 4.15, (pos.getZ(i) + 2.025) / 4.05);
  })();
  [[-0.85, -1.7], [-2.35, 1.74], [1.03, 1.72]].forEach(function (f) {
    put(new T.CylinderGeometry(0.17, 0.12, 0.13, 64), mMetal, rig, f[0], -0.355, f[1]);
    put(new T.CylinderGeometry(0.119, 0.119, 0.015, 64), mDark, rig, f[0], -0.427, f[1]);
  });
  slab(GUIDE, 0.265, 0.007, mPlate, -0.28);
  slab(GUIDE, 0.016, 0.002, mPlate, -0.013);

  /* ── 彩虹发光面：64 × 24 网格 + 单应 UV ─────────────────────────── */
  function homography(q) {
    /* 把单位方块映射到任意四边形，用于透视正确的 UV */
    var x0 = q[3][0], y0 = q[3][1], x1 = q[0][0], y1 = q[0][1],
        x2 = q[1][0], y2 = q[1][1], x3 = q[2][0], y3 = q[2][1];
    var dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
    var sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1;
    var g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
    var m = new T.Matrix3();
    m.set(x1 - x0 + g * x1, x3 - x0 + h * x3, x0,
          y1 - y0 + g * y1, y3 - y0 + h * y3, y0,
          g, h, 1);
    return m.invert();
  }
  (function () {
    var H = homography(GUIDE), P = new T.Vector3();
    var COLS = 64, ROWS = 24, pos = [], uvs = [], idx = [];
    for (var r = 0; r <= ROWS; r++) {
      for (var c = 0; c <= COLS; c++) {
        var u = c / COLS, v = r / ROWS;
        var a = new T.Vector2().fromArray(GUIDE[3]).lerp(new T.Vector2().fromArray(GUIDE[0]), v);
        var b = new T.Vector2().fromArray(GUIDE[2]).lerp(new T.Vector2().fromArray(GUIDE[1]), v);
        a.lerp(b, u);
        pos.push(a.x, 0.009, a.y);
        P.set(a.x, a.y, 1).applyMatrix3(H);
        uvs.push(P.x / P.z, P.y / P.z);
        if (c < COLS && r < ROWS) {
          var i0 = r * (COLS + 1) + c, i1 = i0 + 1, i2 = i0 + COLS + 1, i3 = i2 + 1;
          idx.push(i0, i1, i3, i0, i3, i2);
        }
      }
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    put(geo, mGuide, rig).castShadow = false;
  })();

  /* ── 六盏彩虹矩形面光：强度 1.5，高 .11 ─────────────────────────── */
  var rainbow = [];
  for (var s = 0; s < 6; s++) {
    var t0 = (s + 0.5) / 6;
    var A = new T.Vector2().fromArray(GUIDE[3]).lerp(new T.Vector2().fromArray(GUIDE[0]), t0);
    var B = new T.Vector2().fromArray(GUIDE[2]).lerp(new T.Vector2().fromArray(GUIDE[1]), t0);
    var lamp = new T.RectAreaLight(SPECTRUM[s], 1.5, A.distanceTo(B), 0.11);
    lamp.position.set((A.x + B.x) / 2, 0.011, (A.y + B.y) / 2);
    lamp.lookAt(lamp.position.clone().add(new T.Vector3(0, 1, 0)));
    lamp.rotateZ(-Math.atan2(B.y - A.y, B.x - A.x));
    scene.add(lamp);
    rainbow.push(lamp);
  }

  /* ── 主光：三盏矩形面光 + 一盏投影定向光 ───────────────────────── */
  function area(color, intensity, w, h, pos, look) {
    var l = new T.RectAreaLight(color, intensity, w, h);
    l.position.set(pos[0], pos[1], pos[2]);
    l.lookAt(look[0], look[1], look[2]);
    scene.add(l);
    return l;
  }
  area(0xf5f8ff, 7, 4.2, 2.8, [-3, 5, 1.2], [-0.6, 0, 0.3]);
  area(0xdbeaf9, 9, 3.5, 0.65, [1.6, 3.7, -3], [0, 0, 0.2]);
  area(0xfff4e5, 2.5, 2, 3, [3.8, 2, 2.6], [0, 0.2, 0]);
  var sun = new T.DirectionalLight(0xf0f4ff, 0.5);
  sun.position.set(-3, 6, 2);
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.1, far: 14 });
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.normalBias = 0.009;
  sun.shadow.bias = -1e-4;
  scene.add(sun);
  put(new T.PlaneGeometry(200, 200), mGround, scene, 0, -0.438, 0).rotation.x = -Math.PI / 2;

  /* 环境贴图：原站没有，它靠 BVH 光追直接采场景。
     本复刻用 three.js 内置 transmission，必须给一张环境贴图才读得出玻璃与金属，
     所以就地烘一个极简影棚（三块发光板 + 一个暗盒），仅此一处是加出来的。 */
  (function () {
    var box = new T.Scene();
    var shell = new T.Mesh(new T.BoxGeometry(24, 18, 24),
      new T.MeshStandardMaterial({ color: 0x0b0d0e, side: T.BackSide, roughness: 1 }));
    box.add(shell);
    function panel(intensity, w, h, d, x, y, z) {
      var m = new T.Mesh(new T.BoxGeometry(w, h, d),
        new T.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveIntensity: intensity }));
      m.position.set(x, y, z);
      box.add(m);
      return m;
    }
    panel(9, 0.2, 6, 7, -9, 6, 1);
    panel(6, 6, 0.2, 6, 0, 8.6, 0);
    panel(3, 5, 4, 0.2, 3, 3, -9);
    var pmrem = new T.PMREMGenerator(renderer);
    var env = pmrem.fromScene(box, 0.03);
    scene.environment = env.texture;
    box.traverse(function (o) { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
    pmrem.dispose();
  })();

  /* ── 转盘组 ───────────────────────────────────────────────────────── */
  var deck = new T.Group();
  deck.position.copy(SPINDLE);
  rig.add(deck);
  put(new T.CylinderGeometry(0.69, 0.69, 0.073, 128), mSubPlatter, deck, 0, 0.05, 0);
  var motor = new T.Vector2(-0.89, 0.58);
  put(new T.CylinderGeometry(0.092, 0.105, 0.07, 64), mPlinth, deck, motor.x, 0.035, motor.y);
  put(new T.CylinderGeometry(0.074, 0.074, 0.05, 64), mMetal, deck, motor.x, 0.084, motor.y);

  /* 传动皮带：两个圆的凸包扫成管 */
  (function () {
    var pts = [];
    [[0, 0, 0.697], [motor.x, motor.y, 0.076]].forEach(function (c) {
      for (var i = 0; i < 128; i++) {
        var a = i / 128 * Math.PI * 2;
        pts.push(new T.Vector2(c[0] + Math.cos(a) * c[2], c[1] + Math.sin(a) * c[2]));
      }
    });
    pts.sort(function (a, b) { return a.x - b.x || a.y - b.y; });
    var cross = function (o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); };
    var half = function (list) {
      var out = [];
      for (var i = 0; i < list.length; i++) {
        while (out.length > 1 && cross(out[out.length - 2], out[out.length - 1], list[i]) <= 0) out.pop();
        out.push(list[i]);
      }
      return out;
    };
    var hull = half(pts).slice(0, -1).concat(half(pts.slice().reverse()).slice(0, -1));
    hull.push(hull[0]);
    var curve = new T.CurvePath();
    for (var i = 1; i < hull.length; i++) {
      curve.add(new T.LineCurve3(new T.Vector3(hull[i - 1].x, 0.075, hull[i - 1].y), new T.Vector3(hull[i].x, 0.075, hull[i].y)));
    }
    put(new T.TubeGeometry(curve, 256, 0.008, 6, false), mDark, deck);
  })();

  /* 玻璃转盘：8 点轮廓车削，256 段 */
  (function () {
    var profile = [[0, -0.05], [1.501, -0.05], [1.508, -0.047], [1.51, -0.043],
                   [1.51, 0.043], [1.508, 0.047], [1.501, 0.05], [0, 0.05]]
      .map(function (p) { return new T.Vector2(p[0], p[1]); });
    put(new T.LatheGeometry(profile, 256), mGlass, deck, 0, 0.14, 0);
  })();

  /* 唱片本体 */
  var record = new T.Group();
  deck.add(record);
  put(new T.CylinderGeometry(1.498, 1.498, 0.02, 256, 1, true), mVinylEdge, record, 0, 0.202, 0);
  put(new T.CircleGeometry(1.498, 256), mVinyl, record, 0, 0.212, 0).rotation.x = -Math.PI / 2;
  put(new T.CircleGeometry(1.498, 256), mVinylEdge, record, 0, 0.192, 0).rotation.x = Math.PI / 2;
  var label = put(new T.CircleGeometry(0.49, 128), mLabel, record, 0, 0.214, 0);
  label.rotation.x = -Math.PI / 2;
  put(new T.CylinderGeometry(0.035, 0.036, 0.071, 48), mMetal, deck, 0, 0.225, 0);

  /* ── 玻璃镇盘棱锥：真实轮廓 ──────────────────────────────────────── */
  var weight = new T.Group();
  weight.position.copy(SPINDLE).add(new T.Vector3(0, 0.215, 0));
  rig.add(weight);
  (function () {
    var mGlassWeight = mGlass.clone();
    mGlassWeight.thickness = 0.59;
    mGlassWeight.roughness = 0.003;
    mGlassWeight.attenuationColor = new T.Color(0xffffff);
    var ring = function (half, y) {
      var c = Math.min(0.005, half * 0.3);
      return [[-half + c, y, -half], [half - c, y, -half], [half, y, -half + c], [half, y, half - c],
              [half - c, y, half], [-half + c, y, half], [-half, y, half - c], [-half, y, -half + c]];
    };
    var levels = [ring(0.292, 0), ring(0.295, 0.003), ring(0.295, 0.078),
                  ring(0.292, 0.084), ring(0.006, 0.71), ring(0.004, 0.72)];
    var tri = [];
    var push = function (a, b, c) { tri.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); };
    for (var l = 0; l < levels.length - 1; l++) {
      for (var i = 0; i < 8; i++) {
        var j = (i + 1) % 8;
        push(levels[l][i], levels[l + 1][i], levels[l][j]);
        push(levels[l][j], levels[l + 1][i], levels[l + 1][j]);
      }
    }
    for (var i2 = 0; i2 < 8; i2++) push(levels[levels.length - 1][i2], [0, 0.72, 0], levels[levels.length - 1][(i2 + 1) % 8]);
    /* 底面：外八边形挖一个 .037 的轴孔 */
    var base = new T.Shape();
    levels[0].forEach(function (p, i) { i ? base.lineTo(p[0], p[2]) : base.moveTo(p[0], p[2]); });
    base.closePath();
    var hole = new T.Path();
    hole.absarc(0, 0, 0.037, 0, Math.PI * 2, true);
    base.holes.push(hole);
    var baseGeo = new T.ShapeGeometry(base, 48);
    baseGeo.rotateX(Math.PI / 2);
    var bIdx = baseGeo.index, bPos = baseGeo.getAttribute('position');
    for (var k = 0; k < bIdx.count; k++) {
      var vi = bIdx.getX(k);
      tri.push(bPos.getX(vi), bPos.getY(vi), bPos.getZ(vi));
    }
    baseGeo.dispose();
    /* 轴孔内壁 */
    for (var m = 0; m < 96; m++) {
      var a0 = m / 96 * Math.PI * 2, a1 = (m + 1) / 96 * Math.PI * 2;
      var p0 = [Math.cos(a0) * 0.037, 0, Math.sin(a0) * 0.037], p1 = [Math.cos(a1) * 0.037, 0, Math.sin(a1) * 0.037];
      var q0 = [p0[0], 0.075, p0[2]], q1 = [p1[0], 0.075, p1[2]];
      push(p0, p1, q0); push(p1, q1, q0); push(q0, q1, [0, 0.075, 0]);
    }
    /* 退化三角剔除，阈值与原站一致 */
    var kept = [], A = new T.Vector3(), B = new T.Vector3(), C = new T.Vector3();
    for (var t2 = 0; t2 < tri.length; t2 += 9) {
      A.fromArray(tri, t2); B.fromArray(tri, t2 + 3); C.fromArray(tri, t2 + 6);
      if (B.sub(A).cross(C.sub(A)).lengthSq() > 1e-16) kept.push.apply(kept, tri.slice(t2, t2 + 9));
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(kept, 3));
    geo.computeVertexNormals();
    put(geo, mGlassWeight, weight);
  })();

  /* ── 唱臂 ─────────────────────────────────────────────────────────── */
  var bearing = new T.Group();
  bearing.position.copy(PIVOT);
  rig.add(bearing);
  cyl(0.218, 0.075, mPlinth, bearing, 0, 0.059, 0);
  put(new T.CircleGeometry(0.214, 96), mDark, bearing, 0, 0.089, 0).rotation.x = -Math.PI / 2;
  cyl(0.181, 0.118, mPlinth, bearing, 0, 0.16, 0);
  cyl(0.06, 0.132, mPlinth, bearing, 0, 0.264, 0);

  var arm = new T.Group();
  arm.position.y = 0.365;
  bearing.add(arm);

  /* 臂管：穿过四个控制点的样条扫成管 */
  var armCurve = new T.CatmullRomCurve3([
    new T.Vector3(0, 0, -0.32), new T.Vector3(0, 0, 0.3),
    new T.Vector3(-0.025, -0.015, 1.48), new T.Vector3(-0.13, -0.025, 1.97)
  ]);
  put(new T.TubeGeometry(armCurve, 40, 0.026, 12, false), mMetal, arm);
  cyl(0.09, 0.284, mPlinth, arm, 0, 0, 0).rotation.x = Math.PI / 2;
  cyl(0.092, 0.018, mPlinth, arm, 0, 0, 0.147).rotation.x = Math.PI / 2;
  /* 配重 */
  cyl(0.025, 0.47, mPlinth, arm, 0, 0, -0.31).rotation.x = Math.PI / 2;
  cyl(0.122, 0.113, mPlinth, arm, 0, 0, -0.43).rotation.x = Math.PI / 2;
  cyl(0.119, 0.01, mPlinth, arm, 0, 0, -0.491).rotation.x = Math.PI / 2;
  /* 唱头壳：挖 .093 圆孔后挤出，5 段倒角 */
  (function () {
    var shell = new T.Shape();
    [[-0.17, -0.097], [-0.14, -0.146], [0.133, -0.146], [0.171, -0.106],
     [0.155, 0.114], [0.112, 0.147], [-0.12, 0.147], [-0.161, 0.101]]
      .forEach(function (p, i) { i ? shell.lineTo(p[0], p[1]) : shell.moveTo(p[0], p[1]); });
    shell.closePath();
    var hole = new T.Path();
    hole.absarc(0, 0, 0.093, 0, Math.PI * 2, true);
    shell.holes.push(hole);
    var geo = new T.ExtrudeGeometry(shell, { depth: 0.126, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.01, bevelSegments: 5, curveSegments: 48, steps: 1 });
    geo.translate(0, 0, -0.063);
    var yoke = mGlass.clone(); yoke.thickness = 0.095;
    put(geo, yoke, arm);
  })();
  /* 唱头 + 唱针 */
  put(new T.CylinderGeometry(0.103, 0.057, 0.142, 48), mPlinth, arm, 0, -0.063, 1.986);
  put(new T.CylinderGeometry(0.084, 0.046, 0.037, 48), mPlinth, arm, 0, -0.089, 2.047).rotation.x = -0.17;
  put(new T.CylinderGeometry(0.0017, 0.0006, 0.039, 12), mMetal, arm, 0, -0.116, 1.995);
  put(new T.SphereGeometry(0.003, 12, 8), new T.MeshStandardMaterial({ color: 0xdddfdc, metalness: 0.1, roughness: 0.25 }), arm, 0, -0.138, 1.995);
  /* 四根唱头接线，颜色为真实值 */
  [0x713e32, 0x344958, 0x315448, 0xafa697].forEach(function (color, i) {
    var x = (i - 1.5) * 0.011;
    var curve = new T.CatmullRomCurve3([
      new T.Vector3(x, -0.02, 1.82), new T.Vector3(x + 0.02, -0.005, 1.86), new T.Vector3(x + 0.025, -0.055, 1.915)
    ]);
    put(new T.TubeGeometry(curve, 12, 0.002, 6, false), new T.MeshStandardMaterial({ color: color, roughness: 0.5 }), arm);
    put(new T.CylinderGeometry(0.004, 0.004, 0.025, 24), new T.MeshStandardMaterial({ color: 0xac9562, metalness: 1, roughness: 0.25 }), arm, x + 0.025, -0.055, 1.92).rotation.x = Math.PI / 2;
  });
  /* 循迹力刻度盘：256² canvas 现画 */
  (function () {
    var cv = document.createElement('canvas');
    cv.width = cv.height = 256;
    var c2 = cv.getContext('2d');
    c2.clearRect(0, 0, 256, 256);
    c2.fillStyle = '#d1d5d5';
    c2.textAlign = 'center';
    c2.font = '32px Arial';
    c2.fillText('1.5  2  2.5', 128, 154);
    [63, 123, 183].forEach(function (x) { c2.fillRect(x, 69, 15, 24); });
    var t = new T.CanvasTexture(cv);
    t.colorSpace = T.SRGBColorSpace;
    var dial = put(new T.CircleGeometry(0.054, 48), new T.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }), bearing, 0.103, 0.126, 0.126);
    dial.rotation.x = -Math.PI / 2;
    dial.castShadow = false;
    cyl(0.058, 0.027, mPlinth, bearing, 0.103, 0.112, 0.126);
  })();
  /* 防滑锤：12 圈螺旋扫成管 */
  (function () {
    var pts = [];
    for (var i = 0; i <= 96; i++) {
      var a = i / 96 * Math.PI * 12;
      pts.push(new T.Vector3(0.12 + Math.cos(a) * 0.012, 0.25 + Math.sin(a) * 0.012, 0.1 + i / 96 * 0.12));
    }
    put(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 96, 0.0015, 6, false), mMetal, bearing);
  })();

  arm.scale.z = ARM_LEN / 1.995;
  arm.rotation.set(-0.055, ARM_REST, 0);
  rig.rotation.y = 0;

  /* ── 镜头：两条 centripetal 样条 ─────────────────────────────────── */
  var camPath, lookPath;
  function layout() {
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    /* 像素预算：总渲染像素封顶 500 万 */
    var ratio = Math.min(Math.max(2, devicePixelRatio || 1), Math.sqrt(5e6 / (w * h)));
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    host.dataset.renderPixels = String(Math.round(w * h * ratio * ratio));

    /* 取景距离：包围盒八角投影到视轴，取最大再乘 1.02 */
    var axis = new T.Vector3(0.2, 0.83, 1).normalize();
    var right = new T.Vector3(0, 1, 0).cross(axis).normalize();
    var up = axis.clone().cross(right);
    var tanV = Math.tan(T.MathUtils.degToRad(camera.fov / 2)), tanH = tanV * camera.aspect;
    var end = new T.Vector3(-0.3, -0.95, 0.46);
    var dist = 0;
    [-2.98, 2.24].forEach(function (x) {
      [-0.44, 0.96].forEach(function (y) {
        [-2.05, 2.18].forEach(function (z) {
          var v = new T.Vector3(x, y, z).sub(end);
          dist = Math.max(dist, v.dot(axis) + Math.abs(v.dot(right)) / tanH, v.dot(axis) + Math.abs(v.dot(up)) / tanV);
        });
      });
    });
    var far = end.clone().addScaledVector(axis, dist * 1.02);
    var narrow = matchMedia('(max-width: 700px)').matches;
    var pull = narrow ? 1.4 : 1;
    var a1 = new T.Vector3(-0.69, 0.37, 0.54), a2 = new T.Vector3(0.86, 0.35, 0.53);
    var p1 = new T.Vector3(-0.82, 2.15, 3.6).sub(a1).multiplyScalar(pull).add(a1);
    var p2 = new T.Vector3(2.25, 2.3, 4.1).sub(a2).multiplyScalar(pull).add(a2);
    var near = new T.Vector3(-0.3, 0.12, 0.46);
    var p0 = near.clone().add(new T.Vector3(-0.1, 0.76, 1).normalize().multiplyScalar(dist * 0.89));
    var a3 = new T.Vector3(0.87, 0.35, -0.13);
    var p3 = new T.Vector3(3.15, 2.45, -2.15);
    if (narrow) p3.sub(a3).multiplyScalar(1.25).add(a3);
    camPath = new T.CatmullRomCurve3([p0, p1, p3, p2, far], false, 'centripetal');
    lookPath = new T.CatmullRomCurve3([near, a1, a3, a2, end], false, 'centripetal');
    renderer.shadowMap.needsUpdate = true;
    schedule();
  }

  /* ── 状态与循环 ───────────────────────────────────────────────────── */
  var dolly = 0.93, spin = 0, playing = false, progress = 0, raf = 0, visible = false, last = 0;
  var range = document.getElementById('deck3dDolly');
  var playBtn = document.getElementById('deck3dPlay');
  var rainbowBtn = document.getElementById('deck3dRainbow');
  var readout = document.getElementById('deck3dRead');

  function frame(now) {
    raf = 0;
    var dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    if (playing && !reduce.matches) {
      spin -= Math.PI * 2 * 33.333 / 60 * dt;     // 真实 33⅓ 转
      progress = (progress + dt / 30) % 1;         // 30 秒试听
    }
    record.rotation.y = spin;
    arm.rotation.y = playing ? armAngle(progress) : ARM_REST;
    if (camPath && lookPath) {
      camera.position.copy(camPath.getPoint(clamp(dolly, 0, 1)));
      camera.lookAt(lookPath.getPoint(clamp(dolly, 0, 1)));
    }
    renderer.render(scene, camera);
    if (readout) {
      readout.textContent = '推轨 ' + dolly.toFixed(2) +
        '　唱臂 ' + (arm.rotation.y).toFixed(3) + ' rad' +
        '　落针半径 ' + (playing ? (1.44 - progress * 0.85).toFixed(2) : '—');
    }
    if (playing && !reduce.matches && visible) schedule();
  }
  function schedule() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }

  if (range) range.addEventListener('input', function () { dolly = parseFloat(range.value); schedule(); });
  if (playBtn) playBtn.addEventListener('click', function () {
    playing = !playing;
    playBtn.setAttribute('aria-pressed', String(playing));
    playBtn.textContent = playing ? '停止' : '上针播放';
    last = 0;
    schedule();
  });
  if (rainbowBtn) rainbowBtn.addEventListener('click', function () {
    var on = rainbowBtn.getAttribute('aria-pressed') !== 'true';
    rainbowBtn.setAttribute('aria-pressed', String(on));
    rainbowBtn.textContent = on ? '彩虹灯 on' : '彩虹灯 off';
    rainbow.forEach(function (l) { l.intensity = on ? 1.5 : 0; });
    mGuide.emissiveIntensity = on ? 2.3 : 0;
    schedule();
  });

  new ResizeObserver(layout).observe(host);
  new IntersectionObserver(function (en) {
    visible = en[0].isIntersecting;
    if (visible) schedule(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }, { rootMargin: '200px' }).observe(host);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });
  renderer.domElement.addEventListener('webglcontextlost', function (e) {
    e.preventDefault(); visible = false;
    fail('WebGL 上下文丢失，三维唱机已停止。');
  });

  host.dataset.state = 'ready';
  layout();
  visible = true;
  schedule();
})();
