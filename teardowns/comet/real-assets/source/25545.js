// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
import "/strings.m.js";
import { updateScreenConstants, SCALE_FACTOR } from '../config/config.js';
import { generateStars, generateGalaxies, galaxys } from './galaxy.js';
import { loadGame } from './saveSystem.js';
import { gameState, comet, camera, currentGalaxy, setSessionHoles, resetComet, updateComet, updateCamera, checkCollisions, cometParticleEmitter, setCometParticleEmitter, updateWormholeRings, updateTransition, updateWormholeTransition, holeTransitionTimer, setHoleTransitionTimer, } from './gameLogic.js';
import { handleInput, proceedToNextGalaxy } from './inputHandler.js';
import { renderUI, setShowFullMessage, updateStateTextFade } from '../rendering/ui.js';
import { drawStars, drawGalaxies, drawComet, drawAimLines } from '../rendering/renderer.js';
import { sendAnalytics } from './analytics.js';
import { engineInit, cameraScale, vec2, ParticleEmitter, rgb, setCameraPos, setCameraScale, setGlEnable, setCanvasMaxSize, setCanvasFixedSize, setCanvasPixelated, setTilesPixelated, setTileSizeDefault } from '../littlejs.esm.js';
// Main game file - coordinates all systems and handles game loop
export let globalTick = 0;
export let targetCameraScale = 1;
const MSX = 761216;
const MIN_CAMERA_SCALE = 1;
const MAX_CAMERA_SCALE = 1.5;
const FRACTION = 0.6; // How much to push camera towards black hole at max zoom
let timeDilation = 1; // 1 = normal speed, <1 = slow motion
export let slowZoom = true; // Default slowZoom
export let shakeAmplitude = 0;
let shakeDecay = 0.92;
let shakeOffset = vec2(0, 0);
let blackHoleParticleEmitter = null;
// Setter function for targetCameraScale
export function setTargetCameraScale(value) { targetCameraScale = value; }
// Setter function for slowZoom
export function setSlowZoom(value) { slowZoom = value; }
// Setter function for globalTick
export function setGlobalTick(value) { globalTick = value; }
// Setter function for shakeAmplitude
export function setShakeAmplitude(value) { shakeAmplitude = value; }
// Send analytics when the game is closed or the page is unloaded
window.addEventListener('unload', function () {
    sendAnalytics('browser game closed');
});
function gameInit() {
    setGlEnable(true);
    // Ensure font is loaded before use
    document.fonts.load('20px Berkeley Mono').then(() => {
        // Font loaded successfully
    });
    // Remove fixed canvas size - let it be responsive
    setCameraPos(vec2(0, 0)); // Origin
    setCameraScale(1); // 1:1
    setCanvasMaxSize(vec2(3 * 1024, 2 * 1024)); // Remove size limits
    setCanvasFixedSize(vec2(0, 0)); // Let it be responsive
    setCanvasPixelated(false);
    setTilesPixelated(false);
    setTileSizeDefault(256);
    // Reset session counters
    setSessionHoles(0);
    setShowFullMessage(true);
    // Update screen constants based on actual canvas size
    updateScreenConstants();
    generateStars();
    generateGalaxies();
    resetComet(); // Always reset to ensure comet object exists
    // Create comet particle emitter
    setCometParticleEmitter(new ParticleEmitter(vec2(comet.x, comet.y), // position
    0, // angle (emits in all directions)
    comet.radius / 2 * SCALE_FACTOR, // emitSize
    0, // emitTime (continuous)
    20, // emitRate (particles per second) - base rate, will be adjusted dynamically
    Math.PI * 2, // emitConeAngle (full circle)
    null, // tileInfo (use default circle)
    rgb(1, 1, 0.8, 0.3), // colorStartA (comet color)
    rgb(1, 1, 0.8, 0.1), // colorStartB (slight variation)
    rgb(1, 1, 0.8, 0), // colorEndA (fade to transparent)
    rgb(1, 1, 0.8, 0), // colorEndB
    1.25, // particleTime (particle lifetime)
    7 * SCALE_FACTOR, // sizeStart
    0 * SCALE_FACTOR, // sizeEnd (fade to nothing)
    10 * SCALE_FACTOR, // speed
    10, // angleSpeed
    1, // damping
    1, // angleDamping
    0, // gravityScale (no gravity)
    Math.PI * 2, // particleConeAngle
    0.5, // fadeRate
    0.3, // randomness
    false, // collideTiles
    true, // additive (glow effect)
    true, // randomColorLinear
    0, // renderOrder
    false // localSpace
    ));
    // --- Black hole particle emitter ---
    {
        const galaxy = galaxys[currentGalaxy - 1];
        const bh = galaxy.blackHole;
        // Create particles that spawn around the black hole and move inward
        blackHoleParticleEmitter = new ParticleEmitter(vec2(bh.x, bh.y), // position (black hole center)
        0, // angle (will be calculated per particle)
        bh.pullRadius * 1.2, // emitSize (spawn in pull radius)
        0, // emitTime (continuous)
        60, // emitRate (particles per second)
        Math.PI * 2, // emitConeAngle (full circle)
        null, // tileInfo (default circle)
        rgb(1, 1, 0.8, 0.08), // colorStartA (very faint at start)
        rgb(1, 1, 0.8, 0.12), // colorStartB (slight variation)
        rgb(1, 1, 0.8, 0.4), // colorEndA (more opaque near center)
        rgb(1, 1, 0.8, 0.5), // colorEndB
        2.0, // particleTime (lifetime)
        3 * SCALE_FACTOR, // sizeStart
        0, // sizeEnd (fade to nothing)
        15 * SCALE_FACTOR, // speed (positive, but we'll use gravity)
        0, // angleSpeed (no rotation)
        0.95, // damping (slight slowdown)
        1, // angleDamping
        0.8, // gravityScale (pull toward black hole)
        Math.PI * 2, // particleConeAngle
        0.3, // fadeRate (balanced fade)
        0.3, // randomness
        false, // collideTiles
        false, // additive (regular blend for subtle effect)
        true, // randomColorLinear
        -1, // renderOrder (draw below comet/glow)
        false // localSpace
        );
        // Custom particle creation to spawn at edge and move inward
        blackHoleParticleEmitter.particleCreateCallback = function (particle) {
            const galaxy = galaxys[currentGalaxy - 1];
            const bh = galaxy.blackHole;
            // Spawn particle at random position around the black hole's pull radius
            const spawnRadius = bh.pullRadius * 1.1;
            const spawnAngle = Math.random() * Math.PI * 2;
            const spawnX = bh.x + Math.cos(spawnAngle) * spawnRadius;
            const spawnY = bh.y + Math.sin(spawnAngle) * spawnRadius;
            // Set particle position to spawn location
            particle.pos = vec2(spawnX, spawnY);
            // Calculate direction toward black hole center
            const dx = bh.x - spawnX;
            const dy = bh.y - spawnY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                // Set velocity toward black hole center
                const speed = 25 * SCALE_FACTOR;
                particle.velocity = vec2((dx / distance) * speed, (dy / distance) * speed);
            }
            // Disable gravity since we're manually controlling movement
            particle.gravityScale = 0;
            // Add custom update to make particles spiral inward
            const originalUpdate = particle.update;
            particle.update = function () {
                // Call original update first
                originalUpdate.call(this);
                // Check distance to black hole center
                const currentDx = bh.x - this.pos.x;
                const currentDy = bh.y - this.pos.y;
                const currentDistance = Math.sqrt(currentDx * currentDx + currentDy * currentDy);
                // If particle gets very close to center, destroy it
                if (currentDistance < bh.radius) {
                    this.destroy();
                    return;
                }
                // Calculate spiral movement
                if (currentDistance > 0) {
                    // Base inward speed
                    const inwardSpeed = 25 * SCALE_FACTOR;
                    // Calculate tangential (spiral) speed - faster when closer to center
                    const spiralSpeed = (bh.pullRadius / currentDistance) * 15 * SCALE_FACTOR;
                    // Get current angle from center
                    const currentAngle = Math.atan2(currentDy, currentDx);
                    // Add spiral rotation (perpendicular to radial direction)
                    const spiralAngle = currentAngle + Math.PI / 2; // 90 degrees offset
                    // Combine inward and spiral velocities
                    const inwardVx = (currentDx / currentDistance) * inwardSpeed;
                    const inwardVy = (currentDy / currentDistance) * inwardSpeed;
                    const spiralVx = Math.cos(spiralAngle) * spiralSpeed;
                    const spiralVy = Math.sin(spiralAngle) * spiralSpeed;
                    this.velocity.x = inwardVx + spiralVx;
                    this.velocity.y = inwardVy + spiralVy;
                }
            };
        };
    }
    // Load saved game
    loadGame();
    // Send analytics for game launch
    sendAnalytics('browser game launched');
    setGlobalTick(0);
}
function gameUpdate() {
    globalTick++;
    // Update screen constants each frame in case window is resized
    updateScreenConstants();
    updateCamera();
    // Update comet particle emitter position
    if (cometParticleEmitter) {
        cometParticleEmitter.pos = vec2(comet.x, comet.y);
    }
    // Update black hole particle emitter position & size each frame
    if (blackHoleParticleEmitter) {
        const galaxy = galaxys[currentGalaxy - 1];
        const bh = galaxy.blackHole;
        blackHoleParticleEmitter.pos = vec2(bh.x, bh.y);
        blackHoleParticleEmitter.emitSize = bh.pullRadius * 1.4;
    }
    // Update state text fade effect
    updateStateTextFade();
    // --- Apply time dilation to updates ---
    if (gameState === "aiming" || gameState === "nearmiss") {
        updateComet(timeDilation);
    }
    else if (gameState === "firing") {
        updateComet(timeDilation);
        checkCollisions();
    }
    else if (gameState === "animating") {
        updateTransition(timeDilation);
    }
    else if (gameState === "wormhole_animating") {
        updateWormholeTransition(1 / 60); // Assume 60 FPS for dt
    }
    else if (gameState === "holein") {
        // Update hole transition timer
        setHoleTransitionTimer(holeTransitionTimer - 1 / 60); // Assuming 60 FPS
        if (holeTransitionTimer <= 0) {
            proceedToNextGalaxy();
        }
    }
    // Update wormhole ring animations every frame
    updateWormholeRings(1 / 60);
}
function gameUpdatePost() {
    // Apply screen shake if active
    if (shakeAmplitude > 0.1) {
        const angle = Math.random() * Math.PI * 2;
        const offsetX = Math.cos(angle) * shakeAmplitude;
        const offsetY = Math.sin(angle) * shakeAmplitude;
        shakeOffset = vec2(offsetX, offsetY);
        shakeAmplitude *= shakeDecay;
    }
    else {
        shakeOffset = vec2(0, 0);
        shakeAmplitude = 0;
    }
    setCameraPos(vec2(camera.x + shakeOffset.x, camera.y + shakeOffset.y));
    // Guard: let wormhole animation control the camera scale
    if (gameState === "wormhole_animating") {
        const cs = cameraScale + (targetCameraScale - cameraScale) * 0.12;
        setCameraScale(cs);
        return;
    }
    if (gameState === "aiming" || gameState === "firing" || gameState === "nearmiss") {
        const galaxy = galaxys[currentGalaxy - 1];
        const bh = galaxy.blackHole;
        if (comet && bh) {
            if (slowZoom) {
                const dx = comet.x - bh.x;
                const dy = comet.y - bh.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const zoomRadius = bh.pullRadius * 1.2;
                // Store the normal target (before zoom push)
                const normalTargetX = galaxy.x;
                const normalTargetY = galaxy.y;
                if (dist < zoomRadius) {
                    let t = Math.max(0, Math.min(1, (dist - bh.radius) / (zoomRadius - bh.radius)));
                    // Move camera a fraction of the way towards the black hole
                    camera.targetX = normalTargetX + (bh.x - normalTargetX) * (1 - t) * FRACTION;
                    camera.targetY = normalTargetY + (bh.y - normalTargetY) * (1 - t) * FRACTION;
                    // Zoom in as you get closer
                    targetCameraScale = MIN_CAMERA_SCALE + (MAX_CAMERA_SCALE - MIN_CAMERA_SCALE) * (1 - t);
                    // Time dilation: slow time as you zoom in (0.3 at max zoom)
                    timeDilation = 1 - 0.75 * (1 - t);
                }
                else {
                    camera.targetX = normalTargetX;
                    camera.targetY = normalTargetY;
                    targetCameraScale = MIN_CAMERA_SCALE;
                    timeDilation = 1;
                }
            }
            else {
                // Default camera and time values when slowZoom is off
                camera.targetX = galaxy.x;
                camera.targetY = galaxy.y;
                targetCameraScale = MIN_CAMERA_SCALE;
                timeDilation = 1;
            }
        }
    }
    else {
        // Default camera target (galaxy center)
        const galaxy = galaxys[currentGalaxy - 1];
        camera.targetX = galaxy.x;
        camera.targetY = galaxy.y;
        targetCameraScale = MIN_CAMERA_SCALE;
        timeDilation = 1;
    }
    // Smoothly lerp cameraScale towards targetCameraScale
    setCameraScale(cameraScale + (targetCameraScale - cameraScale) * 0.12);
}
function gameRender() {
    // Draw all visual elements
    drawStars();
    drawGalaxies();
    drawComet();
    drawAimLines();
}
function gameRenderPost() {
    // Render UI elements
    renderUI();
}
// Override the update function to include input handling
const originalGameUpdate = gameUpdate;
gameUpdate = function () {
    handleInput();
    originalGameUpdate();
};
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['assets/tiles.png'], document.body);
