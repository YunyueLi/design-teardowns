/* Beamline C · real-time instrument. All physical surfaces share this renderer. */
(function () {
  "use strict";
  const T = window.THREE;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mix = (a, b, t) => a + (b - a) * t;
  function rendererInfo(gl) {
    const debug = gl?.getExtension("WEBGL_debug_renderer_info");
    const name = gl
      ? String(
          gl.getParameter(
            debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER,
          ) || "unknown",
        )
      : "unknown";
    // Only explicit driver evidence opts into the reduced profile. A privacy-masked
    // renderer, low frame rate or device type is not evidence of software rendering.
    return {
      name,
      software: /swiftshader|llvmpipe|softpipe|software rasterizer/i.test(name),
    };
  }
  function softwareAntialiasFallback() {
    // Context antialiasing is immutable. Probe a tiny, disposable context before
    // creating the visible one so hardware keeps its original antialiasing.
    const probe = document.createElement("canvas");
    probe.width = probe.height = 1;
    const options = { antialias: false, powerPreference: "high-performance" };
    const gl =
      probe.getContext("webgl2", options) || probe.getContext("webgl", options);
    try {
      return rendererInfo(gl).software;
    } finally {
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    }
  }
  class BeamlineScene {
    constructor(canvas, onFallback) {
      if (!T) throw new Error("The local Three.js runtime could not load.");
      this.canvas = canvas;
      this.onFallback = onFallback;
      this.progress = 0;
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.reduced = matchMedia("(prefers-reduced-motion: reduce)");
      this.renderer = new T.WebGLRenderer({
        canvas,
        antialias: !softwareAntialiasFallback(),
        alpha: false,
        powerPreference: "high-performance",
      });
      this.gpu = rendererInfo(this.renderer.getContext());
      this.qualityProfile = this.gpu.software ? "software" : "hardware";
      this.environment = null;
      this.sceneTarget = this.glowA = this.glowB = null;
      this.renderer.outputColorSpace = T.SRGBColorSpace;
      this.renderer.toneMapping = T.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.05;
      this.renderer.shadowMap.enabled = !this.gpu.software;
      this.renderer.shadowMap.type = T.PCFSoftShadowMap;
      this.scene = new T.Scene();
      this.scene.background = new T.Color(0x050606);
      this.scene.fog = new T.FogExp2(0x050606, 0.013);
      this.camera = new T.PerspectiveCamera(32, 1586 / 992, 0.1, 180);
      this.world = new T.Group();
      this.world.name = "optical-instrument";
      this.scene.add(this.world);
      this.makeEnvironment();
      this.makeMaterials();
      this.makeFloor();
      this.makeRails();
      this.gates = [3.1, -7.9, -18.9, -29.9, -40.9].map((z, i) =>
        this.makeGate(z, i),
      );
      this.makeEmitter();
      this.makeSpecimen();
      this.makeLighting();
      if (this.gpu.software) this.simplifySoftwareMaterials();
      this.makePostProcessing();
      this.raycaster = new T.Raycaster();
      this.hitPoint = new T.Vector3();
      this.frame = 0;
      this.ready = false;
      this.lost = false;
      this.lastTime = 0;
      this.resize();
      // compile() also traverses hidden materials in the bundled Three.js runtime.
      // Match the real scene target so the first moving frame does not compile
      // hidden grid/glass shader variants, on either rendering backend.
      this.renderer.setRenderTarget(this.sceneTarget);
      this.renderer.compile(this.scene, this.camera);
      this.renderer.setRenderTarget(null);
      this.render(performance.now());
      this.ready = true;
      this.canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        this.suspendForContextLoss();
      });
      this.canvas.addEventListener("webglcontextrestored", () => {
        this.lost = false;
        this.onFallback(!this.sampleReady);
        // Render-target contents are GPU resources and must be regenerated after loss.
        this.environment?.dispose();
        this.makeEnvironment();
        this.resize();
        this.requestRender();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          cancelAnimationFrame(this.frame);
          this.frame = 0;
        } else this.requestRender();
      });
      this.reduced.addEventListener("change", () => this.requestRender());
      this.canvas.addEventListener("pointermove", (event) => {
        const rect = this.canvas.getBoundingClientRect();
        if (event.pointerType === "touch") return;
        this.pointer.targetX = clamp(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -1,
          1,
        );
        this.pointer.targetY = clamp(
          ((event.clientY - rect.top) / rect.height) * 2 - 1,
          -1,
          1,
        );
        this.canvas.style.cursor = this.pick(event) ? "pointer" : "";
        this.requestRender();
      });
      this.canvas.addEventListener("pointerleave", () => {
        this.pointer.targetX = this.pointer.targetY = 0;
        this.requestRender();
      });
      let down = null;
      this.canvas.addEventListener("pointerdown", (e) => {
        down = { x: e.clientX, y: e.clientY };
      });
      this.canvas.addEventListener("pointerup", (event) => {
        if (
          down &&
          Math.hypot(event.clientX - down.x, event.clientY - down.y) < 7 &&
          this.pick(event)
        ) {
          document.querySelector("#open-study").click();
        }
        down = null;
      });
      document.fonts.ready.then(() => {
        this.labelPainters.forEach((paint) => paint());
        this.requestRender();
      });
    }
    suspendForContextLoss() {
      this.lost = true;
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.onFallback(true);
    }
    makeEnvironment() {
      if (this.gpu.software) {
        this.environment = null;
        this.scene.environment = null;
        return;
      }
      // A studio environment provides broad, physically based reflections on the metal.
      // These meshes are baked into an environment map; they are not a backdrop image.
      const studio = new T.Scene();
      studio.background = new T.Color(0.06, 0.065, 0.07);
      const softbox = (x, y, z, w, h, intensity) => {
        const material = new T.MeshBasicMaterial({
          color: new T.Color(intensity, intensity, intensity),
          side: T.DoubleSide,
        });
        const mesh = new T.Mesh(new T.PlaneGeometry(w, h), material);
        mesh.position.set(x, y, z);
        mesh.lookAt(0, 0, 0);
        studio.add(mesh);
      };
      softbox(-8, 8, 4, 5, 12, 3.4);
      softbox(8, 4, 2, 3, 14, 1.4);
      softbox(0, 10, -8, 14, 4, 2.6);
      softbox(0, 6, 12, 14, 8, 1.9);
      const generator = new T.PMREMGenerator(this.renderer);
      this.environment = generator.fromScene(studio, 0.025, 0.1, 100);
      this.scene.environment = this.environment.texture;
      generator.dispose();
      studio.traverse((o) => {
        if (o.isMesh) {
          o.geometry.dispose();
          o.material.dispose();
        }
      });
    }
    makeMaterials() {
      const size = 512,
        data = new Uint8Array(size * size * 4);
      let seed = 9717;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      for (let y = 0; y < size; y++) {
        const band = random() * 14;
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;
          const v = 150 + band + random() * 30;
          data[i] = data[i + 1] = data[i + 2] = v;
          data[i + 3] = 255;
        }
      }
      const grain = new T.DataTexture(data, size, size, T.RGBAFormat);
      grain.wrapS = grain.wrapT = T.RepeatWrapping;
      grain.repeat.set(1.7, 2.4);
      grain.magFilter = grain.minFilter = T.LinearFilter;
      grain.needsUpdate = true;
      const albedoData = data.slice();
      for (let i = 0; i < albedoData.length; i += 4) {
        const value = 165 + (albedoData[i] - 150) * 1.35;
        albedoData[i] = albedoData[i + 1] = albedoData[i + 2] = value;
      }
      const albedo = new T.DataTexture(albedoData, size, size, T.RGBAFormat);
      albedo.colorSpace = T.SRGBColorSpace;
      albedo.wrapS = albedo.wrapT = T.RepeatWrapping;
      albedo.repeat.set(2, 3);
      albedo.magFilter = albedo.minFilter = T.LinearFilter;
      albedo.needsUpdate = true;
      this.grain = grain;
      this.metal = new T.MeshStandardMaterial({
        color: 0x9ba19c,
        map: albedo,
        metalness: 0.88,
        roughness: 0.57,
        roughnessMap: grain,
        bumpMap: grain,
        bumpScale: 0.028,
        envMapIntensity: 1.25,
      });
      this.dark = new T.MeshStandardMaterial({
        color: 0x161c19,
        metalness: 0.8,
        roughness: 0.5,
        bumpMap: grain,
        bumpScale: 0.008,
        envMapIntensity: 0.8,
      });
      this.edge = new T.MeshStandardMaterial({
        color: 0x9ca5a0,
        metalness: 0.95,
        roughness: 0.32,
        envMapIntensity: 0.85,
      });
      this.bolt = new T.MeshStandardMaterial({
        color: 0x171c19,
        metalness: 0.88,
        roughness: 0.28,
      });
      this.paper = new T.MeshStandardMaterial({
        color: 0xf4f2ea,
        metalness: 0,
        roughness: 0.8,
      });
      this.labelPainters = [];
    }
    simplifySoftwareMaterials() {
      // Diffuse-only lighting avoids the PBR specular work on CPU renderers.
      // Share each replacement across meshes and keep the authored render state;
      // albedo and emissive maps survive, but normal/bump/roughness work is omitted.
      const replacements = new Map();
      const replace = (material) => {
        if (!material.isMeshStandardMaterial) return material;
        if (replacements.has(material)) return replacements.get(material);
        const diffuse = new T.MeshLambertMaterial();
        T.Material.prototype.copy.call(diffuse, material);
        diffuse.color.copy(material.color);
        diffuse.emissive.copy(material.emissive);
        for (const key of [
          "map",
          "lightMap",
          "lightMapIntensity",
          "aoMap",
          "aoMapIntensity",
          "emissiveMap",
          "emissiveIntensity",
          "alphaMap",
          "wireframe",
          "wireframeLinewidth",
          "wireframeLinecap",
          "wireframeLinejoin",
          "flatShading",
          "fog",
        ])
          diffuse[key] = material[key];
        replacements.set(material, diffuse);
        return diffuse;
      };
      this.scene.traverse((object) => {
        if (object.material) {
          object.material = Array.isArray(object.material)
            ? object.material.map(replace)
            : replace(object.material);
        }
      });
      // Animation must update the material actually used by the gantry strips.
      for (const gate of this.gates) {
        gate.userData.light = replace(gate.userData.light);
      }
      for (const [key, value] of Object.entries(this)) {
        if (replacements.has(value)) this[key] = replacements.get(value);
      }
      // Material disposal leaves the shared textures available to replacements.
      for (const material of replacements.keys()) material.dispose();
    }
    box(w, h, d, x, y, z, material, parent = this.world) {
      const mesh = new T.Mesh(new T.BoxGeometry(w, h, d), material);
      mesh.position.set(x, y, z);
      mesh.castShadow = mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    }
    roundPath(path, left, bottom, w, h, r) {
      path.moveTo(left + r, bottom);
      path.lineTo(left + w - r, bottom);
      path.quadraticCurveTo(left + w, bottom, left + w, bottom + r);
      path.lineTo(left + w, bottom + h - r);
      path.quadraticCurveTo(left + w, bottom + h, left + w - r, bottom + h);
      path.lineTo(left + r, bottom + h);
      path.quadraticCurveTo(left, bottom + h, left, bottom + h - r);
      path.lineTo(left, bottom + r);
      path.quadraticCurveTo(left, bottom, left + r, bottom);
      path.closePath();
    }
    makeGate(z, index) {
      const group = new T.Group();
      group.name = "gantry-" + index;
      group.position.set(0.15, 0, z - 0.77);
      this.world.add(group);
      const shape = new T.Shape();
      this.roundPath(shape, -2.76, -0.8, 5.52, 5.68, 0.15);
      const hole = new T.Path();
      this.roundPath(hole, -1.9, -0.55, 3.8, 4.44, 0.1);
      shape.holes.push(hole);
      const geometry = new T.ExtrudeGeometry(shape, {
        depth: 0.77,
        bevelEnabled: true,
        bevelSize: 0.055,
        bevelThickness: 0.055,
        bevelSegments: 3,
        curveSegments: 6,
      });
      group.userData.dock = new T.Object3D();
      group.userData.dock.position.z = geometry.parameters.options.depth / 2;
      group.add(group.userData.dock);
      const body = new T.Mesh(geometry, [this.metal, this.dark]);
      body.castShadow = body.receiveShadow = true;
      group.add(body);
      // Back seam, recessed aperture lip and a separate brushed header cap.
      this.box(5.47, 0.025, 0.75, 0, 4.84, 0.3, this.edge, group);
      this.box(5.46, 0.026, 0.032, 0, 4.64, 0.816, this.dark, group);
      [
        [-1.89, 1.63, 0.07, 4.38],
        [1.89, 1.63, 0.07, 4.38],
        [0, 3.87, 3.83, 0.07],
        [0, -0.54, 3.83, 0.07],
      ].forEach(([x, y, w, h]) =>
        this.box(w, h, 0.18, x, y, 0.73, this.edge, group),
      );
      const luminous = new T.MeshStandardMaterial({
        color: 0xe4e9e5,
        emissive: 0xd9e5dd,
        emissiveIntensity: 2.2,
        roughness: 0.4,
      });
      [
        [0, 3.77, 3.57, 0.045],
        [-1.79, 1.62, 0.035, 4.25],
        [1.79, 1.62, 0.035, 4.25],
      ].forEach(([x, y, w, h]) =>
        this.box(w, h, 0.035, x, y, 0.71, luminous, group),
      );
      [-2.28, 2.28].forEach((x) => {
        this.box(0.85, 0.28, 1.32, x, -0.77, 0.3, this.dark, group);
        this.box(0.7, 0.07, 1.15, x, -0.6, 0.3, this.edge, group);
      });
      const screwGeo = new T.CylinderGeometry(0.069, 0.069, 0.035, 16);
      const screws = new T.InstancedMesh(screwGeo, this.bolt, 18);
      const dummy = new T.Object3D();
      const locations = [];
      [-2.51, 2.51].forEach((x) =>
        [-0.3, 0.9, 2.1, 3.3, 4.43].forEach((y) => locations.push([x, y])),
      );
      [-1.65, -0.55, 0.55, 1.65].forEach((x) => {
        locations.push([x, 4.62]);
        locations.push([x, -0.64]);
      });
      locations.forEach(([x, y], i) => {
        dummy.position.set(x, y, 0.84);
        dummy.rotation.x = Math.PI / 2;
        dummy.updateMatrix();
        screws.setMatrixAt(i, dummy.matrix);
      });
      screws.instanceMatrix.needsUpdate = true;
      group.add(screws);
      const screwRims = new T.InstancedMesh(
        new T.TorusGeometry(0.041, 0.009, 6, 12),
        this.edge,
        locations.length,
      );
      locations.forEach(([x, y], i) => {
        dummy.position.set(x, y, 0.861);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        screwRims.setMatrixAt(i, dummy.matrix);
      });
      screwRims.instanceMatrix.needsUpdate = true;
      group.add(screwRims);
      const labels = ["CAPTURE", "MEASURE", "RECONSTRUCT", "VERIFY", "ARCHIVE"];
      const label = this.makeLabel(
        (index < 5 ? String(index + 1).padStart(2, "0") + "  " : "") +
          labels[index],
      );
      const plate = new T.Mesh(
        new T.PlaneGeometry(3.2, 0.46),
        new T.MeshBasicMaterial({
          map: label,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      plate.position.set(-0.35, 4.3, 0.839);
      group.add(plate);
      const light = new T.PointLight(0xe3eee5, 9, 6, 2);
      light.position.set(0, 3.35, 1.03);
      group.add(light);
      group.userData.light = luminous;
      return group;
    }
    makeLabel(text) {
      const canvas = document.createElement("canvas");
      canvas.width = 768;
      canvas.height = 112;
      const ctx = canvas.getContext("2d"),
        texture = new T.CanvasTexture(canvas);
      texture.colorSpace = T.SRGBColorSpace;
      const paint = () => {
        ctx.clearRect(0, 0, 768, 112);
        ctx.fillStyle = "#dedfd7";
        ctx.font = "400 60px Oswald, sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 10, 58);
        texture.needsUpdate = true;
      };
      paint();
      this.labelPainters.push(paint);
      return texture;
    }
    makeRails() {
      const length = 78,
        center = -20;
      this.box(4.68, 0.22, length, 0, -1.03, center, this.dark);
      [-2.27, 2.27].forEach((x) =>
        this.box(0.055, 0.04, length, x, -0.89, center, this.edge),
      );
      [-1.64, 1.64].forEach((x) => {
        this.box(0.55, 0.25, length, x, -0.89, center, this.dark);
        this.box(0.32, 0.18, length, x, -0.67, center, this.edge);
        this.box(0.038, 0.035, length, x - 0.14, -0.56, center, this.metal);
        this.box(0.05, 0.1, length, x + 0.13, -0.7, center, this.dark);
      });
      [-2.5, 2.5].forEach((x) =>
        this.box(0.4, 0.45, length, x, -1.02, center, this.dark),
      );
      const bed = new T.InstancedMesh(
          new T.BoxGeometry(5.8, 0.15, 0.65),
          this.dark,
          40,
        ),
        dummy = new T.Object3D();
      for (let i = 0; i < 40; i++) {
        dummy.position.set(0, -1.1, 18 - i * 1.7);
        dummy.updateMatrix();
        bed.setMatrixAt(i, dummy.matrix);
      }
      bed.instanceMatrix.needsUpdate = true;
      bed.receiveShadow = true;
      bed.castShadow = true;
      this.world.add(bed);
      const feet = new T.InstancedMesh(
        new T.BoxGeometry(0.65, 0.1, 0.52),
        this.metal,
        80,
      );
      const bolts = new T.InstancedMesh(
        new T.CylinderGeometry(0.095, 0.095, 0.08, 12),
        this.bolt,
        80,
      );
      for (let i = 0; i < 80; i++) {
        dummy.position.set(
          i % 2 ? -2.49 : 2.49,
          -1,
          18 - Math.floor(i / 2) * 1.7,
        );
        dummy.updateMatrix();
        feet.setMatrixAt(i, dummy.matrix);
        dummy.position.y = -0.9;
        dummy.updateMatrix();
        bolts.setMatrixAt(i, dummy.matrix);
      }
      feet.instanceMatrix.needsUpdate = true;
      bolts.instanceMatrix.needsUpdate = true;
      this.world.add(feet, bolts);
      this.treads = new T.InstancedMesh(
        new T.BoxGeometry(2.72, 0.14, 0.58),
        new T.MeshStandardMaterial({
          color: 0x303b34,
          metalness: 0.65,
          roughness: 0.54,
          roughnessMap: this.grain,
        }),
        124,
      );
      this.treadEdges = new T.InstancedMesh(
        new T.BoxGeometry(2.58, 0.018, 0.018),
        this.edge,
        124,
      );
      this.treads.castShadow = this.treads.receiveShadow = true;
      this.world.add(this.treads, this.treadEdges);
      this.beltDummy = new T.Object3D();
      this.rollers = [];
      for (let z = 16; z > -60; z -= 2.2) {
        const axle = new T.Group();
        axle.position.set(0, -0.75, z);
        this.world.add(axle);
        const cylinder = new T.Mesh(
          new T.CylinderGeometry(0.23, 0.23, 3.56, 20),
          this.dark,
        );
        cylinder.rotation.z = Math.PI / 2;
        axle.add(cylinder);
        [-1.8, 1.8].forEach((x) => {
          const cap = new T.Mesh(
            new T.CylinderGeometry(0.24, 0.24, 0.09, 20),
            this.edge,
          );
          cap.rotation.z = Math.PI / 2;
          cap.position.x = x;
          axle.add(cap);
          this.box(0.11, 0.035, 0.39, x, 0, 0, this.bolt, axle);
        });
        this.rollers.push(axle);
      }
    }
    driveConveyor(travel) {
      const pitch = 0.62,
        count = 124,
        span = pitch * count;
      const dummy = this.beltDummy;
      for (let i = 0; i < count; i++) {
        const z = 16 - ((((i * pitch - travel) % span) + span) % span);
        dummy.position.set(0, -0.46, z);
        dummy.updateMatrix();
        this.treads.setMatrixAt(i, dummy.matrix);
        dummy.position.set(0, -0.382, z + 0.255);
        dummy.updateMatrix();
        this.treadEdges.setMatrixAt(i, dummy.matrix);
      }
      this.treads.instanceMatrix.needsUpdate = true;
      this.treadEdges.instanceMatrix.needsUpdate = true;
      this.rollers.forEach((roller) => {
        roller.rotation.x = travel / 0.23;
      });
    }
    makeFloor() {
      const material = new T.MeshStandardMaterial({
        color: 0x101311,
        metalness: 0.38,
        roughness: 0.72,
        bumpMap: this.grain,
        bumpScale: 0.025,
        envMapIntensity: 0.24,
      });
      const floor = new T.Mesh(new T.PlaneGeometry(240, 240), material);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.24;
      floor.receiveShadow = true;
      this.world.add(floor);
    }
    makeEmitter() {
      this.emitter = new T.Group();
      this.emitter.position.set(0, -0.04, 10.3);
      this.world.add(this.emitter);
      const body = new T.Mesh(
        new T.CylinderGeometry(0.8, 1.03, 3.7, 64),
        this.metal,
      );
      body.rotation.x = Math.PI / 2;
      body.castShadow = true;
      this.emitter.add(body);
      [1.7, 1.43, -1.5].forEach((z) => {
        const ring = new T.Mesh(
          new T.TorusGeometry(z < 0 ? 0.82 : 0.99, 0.055, 12, 64),
          this.edge,
        );
        ring.position.z = z;
        this.emitter.add(ring);
      });
      const front = new T.Mesh(
        new T.CylinderGeometry(0.34, 0.68, 1.05, 48),
        this.dark,
      );
      front.rotation.x = Math.PI / 2;
      front.position.z = -2.32;
      front.castShadow = true;
      this.emitter.add(front);
      const nozzle = new T.Mesh(
        new T.CylinderGeometry(0.24, 0.36, 0.55, 48),
        this.edge,
      );
      nozzle.rotation.x = Math.PI / 2;
      nozzle.position.z = -3.02;
      this.emitter.add(nozzle);
      const lens = new T.Mesh(
        new T.CircleGeometry(0.235, 48),
        new T.MeshBasicMaterial({ color: 0xebfff2 }),
      );
      lens.rotation.y = Math.PI;
      lens.position.z = -3.3;
      this.emitter.add(lens);
      this.aperture = new T.Object3D();
      this.aperture.position.z = -3.32;
      this.emitter.add(this.aperture);
      this.box(2.3, 0.25, 2.6, 0, -1.04, 0.2, this.dark, this.emitter);
      const material = new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: T.AdditiveBlending,
        side: T.DoubleSide,
        uniforms: { color: { value: new T.Color(0.82, 0.9, 0.86) } },
        vertexShader:
          "varying vec2 vUv;varying vec3 vNormal;varying vec3 vPosition;void main(){vUv=uv;vNormal=normalMatrix*normal;vec4 mv=modelViewMatrix*vec4(position,1.);vPosition=mv.xyz;gl_Position=projectionMatrix*mv;}",
        fragmentShader:
          "varying vec2 vUv;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 color;void main(){float edge=pow(abs(dot(normalize(vNormal),normalize(-vPosition))),2.);float fade=smoothstep(0.,.025,vUv.y)*smoothstep(1.,.9,vUv.y);gl_FragColor=vec4(color,edge*fade*.36);}",
      });
      this.beam = new T.Mesh(
        new T.CylinderGeometry(0.055, 0.13, 1, 32, 1, true),
        material,
      );
      this.scene.add(this.beam);
      this.beamCore = new T.Mesh(
        new T.CylinderGeometry(0.016, 0.013, 1, 12, 1, true),
        new T.MeshBasicMaterial({
          color: new T.Color(5.0, 5.3, 5.05),
          transparent: true,
          opacity: 0.93,
          depthWrite: false,
          blending: T.AdditiveBlending,
        }),
      );
      this.scene.add(this.beamCore);
      this.hitLight = new T.PointLight(0xcfe8d6, 2.2, 3, 2);
      this.scene.add(this.hitLight);
    }
    makeSpecimen() {
      this.carriage = new T.Group();
      this.carriage.name = "specimen-carriage";
      this.world.add(this.carriage);
      this.box(3.5, 0.16, 1.6, 0.15, -0.28, 0, this.dark, this.carriage);
      this.box(0.15, 1.01, 0.16, 0.15, 0.29, -0.14, this.edge, this.carriage);
      [-1.3, 1.3].forEach((x) =>
        this.box(0.48, 0.24, 1.05, x, -0.47, 0, this.edge, this.carriage),
      );
      this.specimen = new T.Group();
      this.specimen.position.set(0.15, 1.15, 0);
      this.specimen.scale.setScalar(0.94);
      this.specimen.rotation.set(0, 0.04939, -0.01023);
      this.carriage.add(this.specimen);
      const width = 3.992,
        height = 2.516;
      this.specimenBacking = this.box(
        width + 0.025,
        height + 0.025,
        0.04,
        0,
        0,
        0,
        this.paper,
        this.specimen,
      );
      this.surfaceMaterial = new T.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
      });
      this.surface = new T.Mesh(
        new T.PlaneGeometry(width, height),
        this.surfaceMaterial,
      );
      this.surface.position.z = 0.023;
      this.surface.name = "study-surface";
      this.specimen.add(this.surface);
      const backing = new T.Mesh(
        new T.PlaneGeometry(width, height),
        new T.MeshStandardMaterial({ color: 0x323934, roughness: 0.6 }),
      );
      backing.rotation.y = Math.PI;
      backing.position.z = -0.022;
      this.specimen.add(backing);
      this.sampleReady = false;
      this.registration = new T.Group();
      this.registration.position.set(0.15, 1.15, -1.28);
      this.carriage.add(this.registration);
      this.referenceLayers = [];
      [0xef5b51, 0x4cc7ca].forEach((color, i) => {
        const group = new T.Group();
        group.position.set(
          i ? 0.045 : -0.045,
          i ? -0.025 : 0.025,
          i ? 0.018 : 0,
        );
        const mat = new T.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.85,
        });
        const points = [
          [-2.13, -1.36],
          [2.13, -1.36],
          [2.13, 1.36],
          [-2.13, 1.36],
        ].map(([x, y]) => new T.Vector3(x, y, 0));
        group.add(
          new T.LineLoop(new T.BufferGeometry().setFromPoints(points), mat),
        );
        this.registration.add(group);
        this.referenceLayers.push(group);
      });
      const glass = new T.Mesh(
        new T.PlaneGeometry(4.25, 2.7),
        new T.MeshPhysicalMaterial({
          color: 0xc7d8ce,
          roughness: 0.22,
          metalness: 0,
          transparent: true,
          opacity: 0.075,
          side: T.DoubleSide,
          depthWrite: false,
        }),
      );
      this.registration.add(glass);
      this.grid = new T.Group();
      const gridPoints = [];
      for (let x = -2; x <= 2; x += 0.25)
        gridPoints.push(new T.Vector3(x, -1.3, 0), new T.Vector3(x, 1.3, 0));
      for (let y = -1.25; y <= 1.3; y += 0.25)
        gridPoints.push(new T.Vector3(-2.1, y, 0), new T.Vector3(2.1, y, 0));
      this.grid.add(
        new T.LineSegments(
          new T.BufferGeometry().setFromPoints(gridPoints),
          new T.LineBasicMaterial({
            color: 0xced8d0,
            transparent: true,
            opacity: 0.13,
          }),
        ),
      );
      this.grid.position.z = 0.03;
      this.registration.add(this.grid);
      this.reticle = new T.Group();
      this.reticle.position.set(0.15, 1.15, -1.8);
      this.carriage.add(this.reticle);
      const reticleMaterial = new T.LineBasicMaterial({
        color: 0xd3ded5,
        transparent: true,
        opacity: 0.63,
        depthWrite: false,
      });
      [0.7, 1.2, 1.65].forEach((radius) => {
        const points = [];
        for (let i = 0; i < 128; i++) {
          let angle = (i / 128) * Math.PI * 2;
          points.push(
            new T.Vector3(
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ),
          );
        }
        this.reticle.add(
          new T.LineLoop(
            new T.BufferGeometry().setFromPoints(points),
            reticleMaterial,
          ),
        );
      });
      const cross = [
        [-3.9, 0],
        [2.4, 0],
        [0, -4.8],
        [0, 4.7],
      ].map(([x, y]) => new T.Vector3(x, y, 0.01));
      this.reticle.add(
        new T.LineSegments(
          new T.BufferGeometry().setFromPoints(cross),
          reticleMaterial,
        ),
      );
      const ticks = [];
      [-1.2, 0, 1.2].forEach((v) => {
        ticks.push(
          new T.Vector3(v, -0.065, 0.02),
          new T.Vector3(v, 0.065, 0.02),
          new T.Vector3(-0.065, v, 0.02),
          new T.Vector3(0.065, v, 0.02),
        );
      });
      this.reticle.add(
        new T.LineSegments(
          new T.BufferGeometry().setFromPoints(ticks),
          reticleMaterial,
        ),
      );
      this.cornerPoints = [
        [-width / 2, height / 2],
        [width / 2, height / 2],
        [width / 2, -height / 2],
        [-width / 2, -height / 2],
      ].map(([x, y]) => new T.Vector3(x, y, 0.025));
      this.setSample({ title: "Latrix", sceneCover: "latrix/screenshots/hero.jpg" });
    }
    setSample(item) {
      if (!item?.sceneCover) return;
      const image = new Image();
      const request = (this.sampleRequest = (this.sampleRequest || 0) + 1);
      let source = item.sceneCover;
      const fallbackSource = item.cover;
      image.decoding = "async";
      image.onload = () => {
        if (request !== this.sampleRequest) return;
        const canvas = document.createElement("canvas");
        canvas.width = 1536;
        canvas.height = 968;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#e9e9e2";
        ctx.fillRect(0, 0, 1536, 968);
        ctx.fillStyle = "#272d28";
        ctx.font = "32px Georgia,serif";
        ctx.fillText(String(item.title || "Study").slice(0, 25), 48, 68);
        ctx.font = "16px monospace";
        ctx.fillText("DESIGN TEARDOWNS / 01", 1175, 63);
        const imageAspect = image.width / image.height;
        const targetW = 1440,
          targetH = 808;
        const sw =
          imageAspect > targetW / targetH
            ? (image.height * targetW) / targetH
            : image.width;
        const sh =
          imageAspect > targetW / targetH
            ? image.height
            : (image.width * targetH) / targetW;
        ctx.filter = "grayscale(1)";
        ctx.drawImage(image, 0, 0, sw, sh, 48, 110, targetW, targetH);
        this.sampleTexture?.dispose();
        this.sampleTexture = new T.CanvasTexture(canvas);
        this.sampleTexture.colorSpace = T.SRGBColorSpace;
        this.sampleTexture.anisotropy = this.gpu.software
          ? 1
          : Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
        this.surfaceMaterial.map = this.sampleTexture;
        this.surfaceMaterial.needsUpdate = true;
        this.sampleReady = true;
        this.sampleError = false;
        this.onFallback(this.lost);
        if (!this.lost) this.resize();
        this.requestRender();
      };
      image.onerror = () => {
        if (request !== this.sampleRequest) return;
        if (fallbackSource && item.slug !== "latrix" && source !== fallbackSource) {
          source = fallbackSource;
          image.src = source;
          return;
        }
        this.sampleReady = false;
        this.sampleError = true;
        this.onFallback(true);
      };
      image.src = source;
    }
    makeLighting() {
      this.scene.add(new T.HemisphereLight(0xc5d5ca, 0x242a21, 1.2));
      const key = new T.DirectionalLight(0xf2f2e9, 1.65);
      key.position.set(-4, 13, 10);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      Object.assign(key.shadow.camera, {
        near: 1,
        far: 70,
        left: -15,
        right: 15,
        top: 20,
        bottom: -15,
      });
      key.shadow.bias = -0.00012;
      key.shadow.normalBias = 0.018;
      key.shadow.radius = 4;
      this.scene.add(key);
      const fill = new T.DirectionalLight(0xc5cfc8, 0.75);
      fill.position.set(10, 4, -18);
      this.scene.add(fill);
      const emitterLight = new T.SpotLight(0xd8e1da, 95, 26, 0.65, 0.85, 2);
      emitterLight.position.set(-5, 8, 13);
      emitterLight.target.position.set(0, 0, 9);
      this.scene.add(emitterLight, emitterLight.target);
    }
    makePostProcessing() {
      if (this.gpu.software) return;
      // A small HDR bloom pass belongs to the optical lights, not to the HTML interface.
      const options = {
        type: T.HalfFloatType,
        depthBuffer: false,
        minFilter: T.LinearFilter,
        magFilter: T.LinearFilter,
      };
      this.sceneTarget = new T.WebGLRenderTarget(1, 1, {
        ...options,
        depthBuffer: true,
        samples: this.renderer.capabilities.isWebGL2 ? 4 : 0,
      });
      this.glowA = new T.WebGLRenderTarget(1, 1, options);
      this.glowB = new T.WebGLRenderTarget(1, 1, options);
      this.postScene = new T.Scene();
      this.postCamera = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const vertex =
        "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}";
      this.brightMaterial = new T.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        uniforms: { source: { value: this.sceneTarget.texture } },
        vertexShader: vertex,
        fragmentShader:
          "varying vec2 vUv;uniform sampler2D source;void main(){vec3 c=texture2D(source,vUv).rgb;float l=max(c.r,max(c.g,c.b));gl_FragColor=vec4(c*smoothstep(1.0,2.4,l),1.);}",
      });
      this.blurMaterial = new T.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        uniforms: {
          source: { value: null },
          direction: { value: new T.Vector2() },
        },
        vertexShader: vertex,
        fragmentShader:
          "varying vec2 vUv;uniform sampler2D source;uniform vec2 direction;void main(){vec3 c=texture2D(source,vUv).rgb*.227027;c+=texture2D(source,vUv+direction*1.384615).rgb*.316216;c+=texture2D(source,vUv-direction*1.384615).rgb*.316216;c+=texture2D(source,vUv+direction*3.230769).rgb*.070270;c+=texture2D(source,vUv-direction*3.230769).rgb*.070270;gl_FragColor=vec4(c,1.);}",
      });
      this.compositeMaterial = new T.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        uniforms: {
          source: { value: this.sceneTarget.texture },
          glow: { value: this.glowA.texture },
        },
        vertexShader: vertex,
        fragmentShader: `varying vec2 vUv;
      uniform sampler2D source;uniform sampler2D glow;
      void main(){
        vec3 color=texture2D(source,vUv).rgb+texture2D(glow,vUv).rgb*.22;
        gl_FragColor=vec4(color,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        float noise=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;
        gl_FragColor.rgb+=noise*.003;
      }`,
      });
      this.quad = new T.Mesh(new T.PlaneGeometry(2, 2), this.brightMaterial);
      this.postScene.add(this.quad);
    }
    draw() {
      const r = this.renderer;
      r.setRenderTarget(this.sceneTarget ?? null);
      r.render(this.scene, this.camera);
      this.sceneStats = {
        calls: r.info.render.calls,
        triangles: r.info.render.triangles,
      };
      if (!this.sceneTarget) return;
      this.quad.material = this.brightMaterial;
      r.setRenderTarget(this.glowA);
      r.render(this.postScene, this.postCamera);
      this.quad.material = this.blurMaterial;
      this.blurMaterial.uniforms.source.value = this.glowA.texture;
      this.blurMaterial.uniforms.direction.value.set(1.8 / this.glowA.width, 0);
      r.setRenderTarget(this.glowB);
      r.render(this.postScene, this.postCamera);
      this.blurMaterial.uniforms.source.value = this.glowB.texture;
      this.blurMaterial.uniforms.direction.value.set(
        0,
        1.8 / this.glowB.height,
      );
      r.setRenderTarget(this.glowA);
      r.render(this.postScene, this.postCamera);
      this.quad.material = this.compositeMaterial;
      r.setRenderTarget(null);
      r.render(this.postScene, this.postCamera);
    }
    resize() {
      if (
        this.lost ||
        this.renderer.getContext().isContextLost() ||
        !this.canvas.clientWidth ||
        !this.canvas.clientHeight
      )
        return;
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.compact = document.body.classList.contains("compact");
      this.phone = window.innerWidth <= 600;
      const ratio = Math.min(
        devicePixelRatio || 1,
        this.gpu.software ? 0.75 : this.compact ? 1.5 : 1.7,
        Math.sqrt(
          (this.gpu.software ? 196608 : 4000000) / (this.width * this.height),
        ),
      );
      // Software must obey the pixel budget even on very large/HiDPI displays;
      // the hardware profile retains its original minimum pixel ratio.
      this.renderer.setPixelRatio(
        this.gpu.software ? ratio : Math.max(0.75, ratio),
      );
      this.renderer.setSize(this.width, this.height, false);
      if (this.sceneTarget) {
        const size = this.renderer.getDrawingBufferSize(new T.Vector2());
        this.sceneTarget.setSize(size.x, size.y);
        this.glowA.setSize(
          Math.max(1, Math.round(size.x / 3)),
          Math.max(1, Math.round(size.y / 3)),
        );
        this.glowB.setSize(this.glowA.width, this.glowA.height);
      }
      this.camera.aspect = this.width / this.height;
      this.camera.fov = this.compact ? (this.phone ? 43 : 38) : 32;
      this.camera.updateProjectionMatrix();
      this.requestRender();
    }
    setProgress(progress) {
      this.progress = clamp(progress, 0, 1);
      this.requestRender();
    }
    requestRender() {
      if (!this.frame && !this.lost && !document.hidden)
        this.frame = requestAnimationFrame((now) => this.render(now));
    }
    render(now) {
      this.frame = 0;
      if (this.lost) return;
      // GPU loss can precede delivery of the DOM context-lost event.
      if (this.renderer.getContext().isContextLost()) {
        this.suspendForContextLoss();
        return;
      }
      const delta = Math.min(
        0.05,
        Math.max(0.001, (now - this.lastTime) / 1000 || 1 / 60),
      );
      this.lastTime = now;
      const p = this.reduced.matches
        ? Math.round(this.progress * 4) / 4
        : this.progress;
      const raw = p * 4,
        index = Math.min(3, Math.floor(raw)),
        t = raw - index;
      // Dock at the centre of the actual gantry depth, never a separate stop list.
      const stops = this.gates.map(
        (gate) => gate.position.z + gate.userData.dock.position.z,
      );
      this.carriage.position.z = mix(stops[index], stops[index + 1], t);
      const travel = this.carriage.position.z - stops[0];
      const cameraTravel = this.carriage.position.z + 3.5;
      this.driveConveyor(travel);
      this.specimen.rotation.y =
        0.04939 + Math.sin((p - 0.75) * Math.PI * 2) * 0.035;
      this.specimen.rotation.z = -0.01023;
      this.registration.visible = raw > 0.55;
      this.grid.visible = raw > 0.6 && raw < 3.6;
      this.reticle.visible = raw > 1.4;
      this.referenceLayers[0].position.x = mix(
        -0.15,
        -0.045,
        clamp(raw - 2, 0, 1),
      );
      this.referenceLayers[1].position.x = mix(
        0.15,
        0.045,
        clamp(raw - 2, 0, 1),
      );
      this.gates.forEach((gate, i) => {
        gate.userData.light.emissiveIntensity =
          2.1 + (i === Math.round(raw) ? 1.2 : 0);
      });
      const motion = this.reduced.matches || this.compact ? 0 : 1;
      const damping = 1 - Math.exp(-delta / 0.12);
      this.pointer.x += (this.pointer.targetX - this.pointer.x) * damping;
      this.pointer.y += (this.pointer.targetY - this.pointer.y) * damping;
      if (this.compact) {
        this.camera.position.set(
          this.phone ? 13.6 : 16,
          8.9,
          (this.phone ? 17.9 : 20.5) +
            cameraTravel * (this.phone ? 0.83 : 0.94),
        );
        this.camera.lookAt(
          this.phone ? -0.4 : -0.6,
          this.phone ? -0.5 : -1.3,
          -3.5 + cameraTravel * (this.phone ? 0.83 : 0.94),
        );
        this.world.scale.setScalar(this.phone ? 0.83 : 0.94);
        this.world.position.set(
          this.phone ? -0.2 : 0,
          this.phone ? 0.85 : 1,
          0,
        );
      } else {
        this.world.scale.setScalar(1);
        this.world.position.set(0, 0, 0);
        this.camera.position.set(
          17.289 + this.pointer.x * 0.09 * motion,
          9 + this.pointer.y * 0.045 * motion,
          18.3325 + cameraTravel,
        );
        this.camera.lookAt(-0.72, 0, -4.65 + cameraTravel);
      }
      this.scene.updateMatrixWorld(true);
      this.camera.updateMatrixWorld(true);
      const start = new T.Vector3(),
        end = new T.Vector3();
      this.aperture.getWorldPosition(start);
      this.reticle.getWorldPosition(end);
      const vector = end.clone().sub(start),
        length = vector.length();
      // Intersect opaque hardware and the specimen; the beam ends at the first physical surface.
      this.raycaster.set(start, vector.clone().normalize());
      this.raycaster.far = length;
      const hits = this.raycaster
        .intersectObjects([this.specimenBacking, ...this.gates], true)
        .filter(
          (hit) =>
            hit.object.material &&
            (Array.isArray(hit.object.material)
              ? hit.object.material.every((material) => !material.transparent)
              : !hit.object.material.transparent),
        );
      if (hits.length) end.copy(hits[0].point);
      this.hitLight.position.copy(end);
      [this.beam, this.beamCore].forEach((mesh) => {
        const d = end.clone().sub(start);
        mesh.position.copy(start).add(end).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(
          new T.Vector3(0, 1, 0),
          d.clone().normalize(),
        );
        mesh.scale.set(1, d.length(), 1);
      });
      const access = document.querySelector("#specimen-access");
      const center = this.specimen
        .localToWorld(new T.Vector3())
        .project(this.camera);
      if (access) {
        access.style.left = (center.x + 1) * 0.5 * this.width + "px";
        access.style.top = (1 - center.y) * 0.5 * this.height + "px";
      }
      try {
        this.draw();
      } catch (error) {
        // A context may also disappear in the middle of a shader compilation.
        // Recover only that explicit device-loss case; retain all other errors.
        if (!this.renderer.getContext().isContextLost()) throw error;
        this.suspendForContextLoss();
        return;
      }
      this.renderedProgress = p;
      if (
        motion &&
        Math.abs(this.pointer.x - this.pointer.targetX) +
          Math.abs(this.pointer.y - this.pointer.targetY) >
          0.001
      )
        this.requestRender();
    }
    pick(event) {
      if (this.lost) return false;
      const rect = this.canvas.getBoundingClientRect();
      this.raycaster.far = this.camera.far;
      this.raycaster.setFromCamera(
        new T.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          (-(event.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        this.camera,
      );
      const hits = this.raycaster.intersectObjects(
        [this.specimenBacking, this.surface, ...this.gates],
        true,
      );
      return (
        hits.length &&
        (hits[0].object === this.specimenBacking ||
          hits[0].object === this.surface)
      );
    }
    inspect() {
      return {
        renderer: {
          name: this.gpu.name,
          software: this.gpu.software,
          profile: this.qualityProfile,
          pixelRatio: this.renderer.getPixelRatio(),
          drawingBuffer: {
            width: this.canvas.width,
            height: this.canvas.height,
          },
          antialias:
            this.renderer.getContext().getContextAttributes()?.antialias ??
            false,
          bloom: Boolean(this.sceneTarget),
          shadows: this.renderer.shadowMap.enabled,
          environment: Boolean(this.environment),
        },
        ready: this.ready,
        sampleReady: this.sampleReady,
        lost: this.lost,
        progress: this.renderedProgress,
        carriageZ: this.carriage.position.z,
        corners: this.cornerPoints.map((p) => {
          const v = this.specimen.localToWorld(p.clone()).project(this.camera);
          return {
            x: ((v.x + 1) * this.width) / 2,
            y: ((1 - v.y) * this.height) / 2,
          };
        }),
        calls: this.sceneStats?.calls,
        triangles: this.sceneStats?.triangles,
        beltPhase:
          this.carriage.position.z -
          (this.gates[0].position.z + this.gates[0].userData.dock.position.z),
        sampleWorldZ: this.specimenBacking.getWorldPosition(new T.Vector3()).z,
        gantryWorldZ: this.gates.map(
          (gate) => gate.userData.dock.getWorldPosition(new T.Vector3()).z,
        ),
        rollerAngle: this.rollers[0].rotation.x,
        canvas: { width: this.width, height: this.height },
      };
    }
  }
  window.BeamlineScene = BeamlineScene;
})();
