// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { GRAVITY_STRENGTH, COMET_FRICTION, SCALE_FACTOR, GALAXY_COUNT, SCREEN_WIDTH, SCREEN_HEIGHT, seededRandom, lerp, MIN_POWER_RATIO } from '../config/config.js';
import { checkCollision, applyGravity, isCometOutOfBounds, isCometTooFarFromCluster, hasCometStopped, isCometInBlackHolePullRadius, isCometCapturedByBlackHole, isPositionSafe } from './physics.js';
import { galaxys } from './galaxy.js';
import { playSound } from '../audio/audioManager.js';
import { saveGame } from './saveSystem.js';
import { setGlobalTick, setShakeAmplitude, setTargetCameraScale } from './main.js';
import { isReplaying, setIsReplaying } from './saveSystem.js';
import { setShowFullMessage } from '../rendering/ui.js';
import { sendAnalytics } from './analytics.js';
import { vec2, ParticleEmitter, rgb, cameraScale } from '../littlejs.esm.js';
// Core game logic and state management
// Game state
export let gameState = "aiming";
export let camera = { x: 0, y: 0, targetX: 0, targetY: 0 };
export let galaxyShots = 0;
export let totalShots = 0;
export let currentUniverse = 1;
export let currentGalaxy = 1;
export let transitionProgress = 0;
export let transitionSpeed = 1;
export let transitionData = {};
export let comet = {};
export let aim = { active: false, startX: 0, startY: 0, endX: 0, endY: 0, power: 0 };
export let lastShot = { active: false, startX: 0, startY: 0, endX: 0, endY: 0, power: 0 };
export let lastSafePosition = { x: 0, y: 0 };
export let sessionHoles = 0;
export let averageShotsPerHole = 0;
export let holesCompleted = 0;
export let shotsHistory = []; // store last 18 hole shot counts
// Hole transition timer
export let holeTransitionTimer = 0;
export let holeTransitionDelay = 1.0; // seconds
// Keyboard aiming variables
export let keyboardMode = false;
export let keyboardAimAngle = 0;
export let keyboardAimPower = 0.5;
export let keyboardAngleHoldTime = 0;
export let keyboardPowerHoldTime = 0;
// Track active ring animations
export let ringAnimations = [];
// Particle system
export let cometParticleEmitter = null;
// Setter functions for variables modified in other files
export function setGameState(value) { gameState = value; }
export function setTotalShots(value) { totalShots = value; }
export function setGalaxyShots(value) { galaxyShots = value; }
export function setCurrentGalaxy(value) { currentGalaxy = value; }
export function setCurrentUniverse(value) { currentUniverse = value; }
export function setAverageShotsPerHole(value) { averageShotsPerHole = value; }
export function setHolesCompleted(value) { holesCompleted = value; }
export function setShotsHistory(value) { shotsHistory = value; }
export function setKeyboardMode(value) { keyboardMode = value; }
export function setKeyboardAimAngle(value) { keyboardAimAngle = value; }
export function setKeyboardAimPower(value) { keyboardAimPower = value; }
export function setKeyboardAngleHoldTime(value) { keyboardAngleHoldTime = value; }
export function setKeyboardPowerHoldTime(value) { keyboardPowerHoldTime = value; }
export function setSessionHoles(value) { sessionHoles = value; }
export function setCometParticleEmitter(value) { cometParticleEmitter = value; }
export function setTransitionProgress(value) { transitionProgress = value; }
export function setHoleTransitionTimer(value) { holeTransitionTimer = value; }
export function setHoleTransitionDelay(value) { holeTransitionDelay = value; }
// Helper to get the transition start position for a galaxy
function getTransitionStartPosition(galaxy, galaxyIndex) {
    let endX = galaxy.x - SCREEN_WIDTH * 0.4;
    let endY = galaxy.y + (seededRandom(galaxyIndex * 43) - 0.5) * SCREEN_HEIGHT * 0.6;
    let attempts = 0;
    while (!isPositionSafe(endX, endY, 15 * SCALE_FACTOR, galaxy.planets) && attempts < 20) {
        endX = galaxy.x - SCREEN_WIDTH * 0.4;
        endY = galaxy.y + (seededRandom(galaxyIndex * 43 + attempts) - 0.5) * SCREEN_HEIGHT * 0.6;
        attempts++;
    }
    return { x: endX, y: endY };
}
export function resetComet() {
    const galaxy = galaxys[currentGalaxy - 1];
    // Use transition logic for comet start position
    const startPos = getTransitionStartPosition(galaxy, currentGalaxy);
    comet = {
        x: startPos.x,
        y: startPos.y,
        vx: 0,
        vy: 0,
        radius: 15 * SCALE_FACTOR,
        trail: [],
        active: false,
        inplay: false
    };
    lastSafePosition.x = comet.x;
    lastSafePosition.y = comet.y;
    if (gameState === "aiming" && transitionProgress === 0) {
        lastShot.active = false;
    }
    if (gameState === "aiming") {
        camera.targetX = galaxy.x;
        camera.targetY = galaxy.y;
    }
    // Set keyboard aim default to point to black hole
    setKeyboardAimDefault();
    // Reset particle emitter to base values when comet is reset
    if (cometParticleEmitter) {
        resetCometParticleEmitter();
    }
    setGlobalTick(0);
}
export function updateCamera() {
    const lerpSpeed = 2;
    // Skip camera interpolation during replay for immediate positioning
    if (isReplaying) {
        camera.x = camera.targetX;
        camera.y = camera.targetY;
    }
    else {
        camera.x = lerp(camera.x, camera.targetX, lerpSpeed / 60);
        camera.y = lerp(camera.y, camera.targetY, lerpSpeed / 60);
    }
}
function updateCometParticleEmitter(speed) {
    if (!cometParticleEmitter)
        return;
    // Base emit rate when stationary
    const baseEmitRate = 20;
    // Maximum emit rate at high speeds
    const maxEmitRate = 200;
    // Speed threshold for maximum emission
    const maxSpeedThreshold = 300;
    // Calculate emit rate based on speed
    const speedRatio = Math.min(speed / maxSpeedThreshold, 1.0);
    const emitRate = baseEmitRate + (maxEmitRate - baseEmitRate) * speedRatio;
    // Calculate comet's direction and set particle emitter to opposite direction
    if (speed > 0.1) { // Only update direction if comet is moving
        const cometDirection = Math.atan2(comet.vy, comet.vx);
        const oppositeDirection = cometDirection + Math.PI; // Add 180 degrees
        cometParticleEmitter.angle = oppositeDirection;
        // Reduce cone angle to make particles more directional
        cometParticleEmitter.emitConeAngle = Math.PI; // 180 degree cone instead of full circle
    }
    else {
        // When stationary, emit in all directions
        cometParticleEmitter.emitConeAngle = Math.PI * 2;
    }
    // Apply dynamic comet trail
    cometParticleEmitter.emitRate = emitRate;
    cometParticleEmitter.sizeStart = emitRate / 40 * SCALE_FACTOR;
    cometParticleEmitter.angleSpeed = emitRate / 20 * SCALE_FACTOR;
    cometParticleEmitter.speed = speedRatio * SCALE_FACTOR;
    cometParticleEmitter.damping = (1 + speedRatio) * SCALE_FACTOR;
    cometParticleEmitter.particleTime = 0.25 + speedRatio * 0.75;
}
function resetCometParticleEmitter() {
    if (!cometParticleEmitter)
        return;
    cometParticleEmitter.emitRate = 40;
    cometParticleEmitter.sizeStart = cometParticleEmitter.emitRate / 40 * SCALE_FACTOR;
    cometParticleEmitter.angleSpeed = 10;
    cometParticleEmitter.damping = 1;
    cometParticleEmitter.emitConeAngle = Math.PI * 2; // Reset to full circle when stationary
}
export function updateComet(timeDilation = 1) {
    comet.trail.push({ x: comet.x, y: comet.y });
    if (comet.trail.length > 50) {
        comet.trail.shift();
    }
    if (!comet.active)
        return;
    const galaxy = galaxys[currentGalaxy - 1];
    // Apply gravity from planets
    for (const planet of galaxy.planets) {
        const { fx, fy } = applyGravity(planet, comet, GRAVITY_STRENGTH, planet.radius, planet.gravityRadius);
        comet.vx += (fx / 60) * timeDilation;
        comet.vy += (fy / 60) * timeDilation;
    }
    // Apply gravity from black hole
    const bh = galaxy.blackHole;
    const { fx, fy } = applyGravity(bh, comet, GRAVITY_STRENGTH, bh.radius, bh.pullRadius);
    comet.vx += (fx / 60) * timeDilation;
    comet.vy += (fy / 60) * timeDilation;
    // Apply friction
    comet.vx *= Math.pow(COMET_FRICTION, timeDilation);
    comet.vy *= Math.pow(COMET_FRICTION, timeDilation);
    // Update position
    comet.x += (comet.vx / 60) * timeDilation;
    comet.y += (comet.vy / 60) * timeDilation;
    // Calculate comet speed
    const speed = Math.sqrt(comet.vx * comet.vx + comet.vy * comet.vy);
    // Update particle emitter emit rate based on speed
    if (cometParticleEmitter) {
        updateCometParticleEmitter(speed);
    }
    // Check if comet has stopped
    if (hasCometStopped(comet)) {
        // Check if all wormholes were used during this shot
        if (galaxy.wormholes) {
            galaxy.wormholesWereAllUsedLastShot = galaxy.wormholes.every(wormhole => wormhole.used);
        }
        // Check if comet is inside black hole's pull radius
        if (isCometInBlackHolePullRadius(comet, bh)) {
            gameState = "nearmiss";
            playSound('near');
        }
        else {
            gameState = "aiming";
        }
        comet.vx = 0;
        comet.vy = 0;
        comet.active = false;
        lastShot.active = false;
        // Reset particle emitter to base rate when stopped
        if (cometParticleEmitter) {
            resetCometParticleEmitter();
        }
        if (isReplaying) {
            setIsReplaying(false);
        }
        saveGame();
        return;
    }
    // Check bounds
    if (isCometOutOfBounds(comet, galaxy)) {
        // Check if all wormholes were used during this shot
        if (galaxy.wormholes) {
            galaxy.wormholesWereAllUsedLastShot = galaxy.wormholes.every(wormhole => wormhole.used);
        }
        const speed = Math.sqrt(comet.vx * comet.vx + comet.vy * comet.vy);
        setShakeAmplitude(Math.min(speed * 0.12, 32)); // Shake scales with speed
        comet.x = lastSafePosition.x;
        comet.y = lastSafePosition.y;
        comet.vx = 0;
        comet.vy = 0;
        comet.active = false;
        comet.trail = [];
        gameState = "aiming";
        lastShot.active = true;
        playSound('bounds');
        // Reset particle emitter to base rate when out of bounds
        if (cometParticleEmitter) {
            resetCometParticleEmitter();
        }
        if (isReplaying) {
            setIsReplaying(false);
        }
        // Send analytics for game stopped (out of bounds)
        sendAnalytics('browser game out of bounds');
        saveGame();
        return;
    }
}
export function startTransition() {
    const oldGalaxy = currentGalaxy - 1;
    const prevGalaxyIndex = oldGalaxy < 1 ? GALAXY_COUNT : oldGalaxy;
    transitionData.startX = galaxys[prevGalaxyIndex - 1].blackHole.x;
    transitionData.startY = galaxys[prevGalaxyIndex - 1].blackHole.y;
    transitionData.prevGalaxy = prevGalaxyIndex - 1;
    const galaxy = galaxys[currentGalaxy - 1];
    // Use transition logic for comet start position
    const startPos = getTransitionStartPosition(galaxy, currentGalaxy);
    let endX = startPos.x;
    let endY = startPos.y;
    transitionData.endX = endX;
    transitionData.endY = endY;
    transitionData.cameraStartX = galaxys[prevGalaxyIndex - 1].x;
    transitionData.cameraStartY = galaxys[prevGalaxyIndex - 1].y;
    transitionData.cameraEndX = galaxys[currentGalaxy - 1].x;
    transitionData.cameraEndY = galaxys[currentGalaxy - 1].y;
    setTransitionProgress(0);
    gameState = "animating";
    playSound('restore');
    galaxyShots = 0;
    // Reset hole transition timer
    setHoleTransitionTimer(0);
    saveGame();
}
export function updateTransition(timeDilation = 1) {
    // Remove timeDelta from transition progress
    setTransitionProgress(transitionProgress + (transitionSpeed / 60) * timeDilation);
    // Round out very small transition amounts
    if (transitionProgress > 0.9) {
        setTransitionProgress(1.0);
    }
    if (transitionProgress >= 1.0) {
        setTransitionProgress(0);
        gameState = "aiming";
        // Snap comet to intended entry point
        const galaxy = galaxys[currentGalaxy - 1];
        const startPos = getTransitionStartPosition(galaxy, currentGalaxy);
        comet.x = startPos.x;
        comet.y = startPos.y;
        lastSafePosition.x = comet.x;
        lastSafePosition.y = comet.y;
        // Set keyboard aim default to point to black hole
        setKeyboardAimDefault();
        // Reset particle emitter to base rate when transition ends
        if (cometParticleEmitter) {
            resetCometParticleEmitter();
        }
        saveGame();
    }
    else {
        // With a smoother easing:
        const t = 0.5 * (1 - Math.cos(transitionProgress * Math.PI));
        // Calculate previous position for velocity estimation
        const prevX = comet.x;
        const prevY = comet.y;
        comet.x = lerp(transitionData.startX, transitionData.endX, t);
        comet.y = lerp(transitionData.startY, transitionData.endY, t);
        // Calculate effective velocity from position change for particle effects
        const effectiveVx = (comet.x - prevX) * 60; // Convert to velocity units
        const effectiveVy = (comet.y - prevY) * 60;
        const effectiveSpeed = Math.sqrt(effectiveVx * effectiveVx + effectiveVy * effectiveVy);
        // Update particle emitter based on effective speed during transition
        if (cometParticleEmitter) {
            updateCometParticleEmitter(effectiveSpeed);
        }
        // Set actual velocity to 0 for collision detection
        comet.vx = 0;
        comet.vy = 0;
        comet.trail.push({ x: comet.x, y: comet.y });
        if (comet.trail.length > 50) {
            comet.trail.shift();
        }
        camera.targetX = lerp(transitionData.cameraStartX, transitionData.cameraEndX, t);
        camera.targetY = lerp(transitionData.cameraStartY, transitionData.cameraEndY, t);
    }
}
export function checkCollisions() {
    const galaxy = galaxys[currentGalaxy - 1];
    const bh = galaxy.blackHole;
    const dx = bh.x - comet.x;
    const dy = bh.y - comet.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collision_radius = bh.radius * 2;
    if (distance <= collision_radius) {
        const nx = distance > 0 ? dx / distance : 0;
        const ny = distance > 0 ? dy / distance : 0;
        const proximity = distance / collision_radius;
        // Remove timeDelta from all these calculations
        const dampening = (1 - proximity) * 12 / 60;
        comet.vx *= (1 - dampening);
        comet.vy *= (1 - dampening);
        const vortex_strength = 1000 * (1 - proximity) / 60;
        comet.vx -= ny * vortex_strength;
        comet.vy += nx * vortex_strength;
        const pull_strength = 1600 * (1 - proximity) / 60;
        comet.vx += nx * pull_strength;
        comet.vy += ny * pull_strength;
        // Check if comet is close enough to be "captured"
        if (isCometCapturedByBlackHole(comet, bh)) {
            // Check if all wormholes were used during this shot
            if (galaxy.wormholes) {
                galaxy.wormholesWereAllUsedLastShot = galaxy.wormholes.every(wormhole => wormhole.used);
            }
            comet.active = false;
            comet.trail = [];
            comet.x = bh.x;
            comet.y = bh.y;
            comet.vx = 0;
            comet.vy = 0;
            gameState = "holein";
            // Emit a ring at the black hole position, in comet color
            ringAnimations.push({
                x: bh.x,
                y: bh.y,
                color: comet.color || rgb(1, 1, 0.8, 1),
                startRadius: 0,
                endRadius: (bh.radius * 3 + comet.radius) * SCALE_FACTOR,
                duration: 0.32,
                elapsed: 0,
                fadeIn: false,
                thickness: comet.radius * SCALE_FACTOR,
                fillColor: comet.color || rgb(1, 1, 0.8, 0.2)
            });
            // Reset particle emitter to base values when hole in
            if (cometParticleEmitter) {
                resetCometParticleEmitter();
            }
            if (galaxyShots == 1) {
                // Golden yellow particle explosion!
                new ParticleEmitter(vec2(bh.x, bh.y), // position
                0, // angle (all directions)
                bh.radius * 4, // emitSize (covers black hole)
                0.18, // emitTime (short burst)
                240, // emitRate (particles per second)
                Math.PI * 2, // emitConeAngle (full circle)
                null, // tileInfo (default circle)
                rgb(1, 0.85, 0.2, 0.8), // colorStartA (golden yellow)
                rgb(1, 1, 1, 0.8), // colorStartB (variation)
                rgb(1, 0.85, 0.2, 0), // colorEndA (fade out)
                rgb(1, 0.7, 0.1, 0), // colorEndB (fade out)
                0.64, // particleTime (lifetime)
                6 * SCALE_FACTOR, // sizeStart (big)
                0, // sizeEnd (fade to nothing)
                60 * SCALE_FACTOR, // speed (fast)
                0, // angleSpeed
                1, // damping
                1, // angleDamping
                0, // gravityScale
                Math.PI * 2, // particleConeAngle
                0.5, // fadeRate
                0.2, // randomness
                false, // collideTiles
                true, // additive (glow)
                true, // randomColorLinear
                0, // renderOrder
                false // localSpace
                );
                playSound('hole1');
                // Send analytics for hole in 1
                sendAnalytics('browser game hole in', { isHoleInOne: true });
            }
            else {
                playSound('hole');
                // Send analytics for hole in
                sendAnalytics('browser game hole in', { isHoleInOne: false });
            }
            // Increment session holes and update message display
            setSessionHoles(sessionHoles + 1);
            // Minimise info box after 3 holes, and on any holein if more than 3 holes are completed
            if (sessionHoles >= 3) {
                setShowFullMessage(false);
            }
            // Update rolling average over last 9 holes
            shotsHistory.push(galaxyShots);
            if (shotsHistory.length > 18)
                shotsHistory.shift();
            holesCompleted = shotsHistory.length;
            const sum = shotsHistory.reduce((a, b) => a + b, 0);
            averageShotsPerHole = holesCompleted ? sum / holesCompleted : 0;
            if (isReplaying) {
                setIsReplaying(false);
            }
            setHoleTransitionTimer(holeTransitionDelay);
            saveGame();
            return;
        }
    }
    // Check wormhole collisions
    if (galaxy.wormholes) {
        for (const wormhole of galaxy.wormholes) {
            let dist = wormhole.radius * 1.5;
            if (wormhole.used)
                continue; // Skip used wormholes
            const collision = checkCollision(wormhole, comet, dist + comet.radius);
            // Only trigger transition if comet center is within dist
            const centerDistance = Math.sqrt((wormhole.x - comet.x) ** 2 + (wormhole.y - comet.y) ** 2);
            if (centerDistance <= dist) {
                // Find the paired wormhole
                const pairedWormhole = galaxy.wormholes.find(w => w.pairIndex === wormhole.pairIndex && w !== wormhole);
                if (pairedWormhole) {
                    startWormholeTransition(wormhole, pairedWormhole);
                    return; // Exit collision check while animating
                }
                break;
            }
        }
    }
    // Planet collisions
    for (const planet of galaxy.planets) {
        const collision = checkCollision(planet, comet, planet.radius + comet.radius);
        if (collision.collided) {
            const normalX = collision.dx / collision.distance;
            const normalY = collision.dy / collision.distance;
            const overlap = (planet.radius + comet.radius) - collision.distance;
            comet.x -= normalX * (overlap + 1);
            comet.y -= normalY * (overlap + 1);
            const bounceForce = 0.7;
            const dotProduct = comet.vx * normalX + comet.vy * normalY;
            comet.vx -= 2 * dotProduct * normalX;
            comet.vy -= 2 * dotProduct * normalY;
            comet.vx *= bounceForce;
            comet.vy *= bounceForce;
            playSound('bump');
            // Emit a ring at the comet's position and size, in comet color
            ringAnimations.push({
                x: comet.x,
                y: comet.y,
                color: comet.color || rgb(1, 1, 0.8, 1),
                startRadius: 0,
                endRadius: comet.radius * 3 * SCALE_FACTOR,
                duration: 0.32,
                elapsed: 0,
                fadeIn: false,
                thickness: comet.radius / 2 * SCALE_FACTOR,
                fillColor: rgb(0, 0, 0, 0)
            });
        }
    }
    // Check distance from cluster center
    if (isCometTooFarFromCluster(comet, galaxy)) {
        gameState = "aiming";
        resetComet();
    }
}
function setKeyboardAimDefault() {
    // Set keyboard aim to point from comet to black hole at 50% power
    const galaxy = galaxys[currentGalaxy - 1];
    const bh = galaxy.blackHole;
    const dx = bh.x - comet.x;
    const dy = bh.y - comet.y;
    setKeyboardAimAngle(Math.atan2(dy, dx));
    setKeyboardAimPower(Math.max(MIN_POWER_RATIO, 0.5));
}
export function resetWormholes() {
    const galaxy = galaxys[currentGalaxy - 1];
    if (galaxy.wormholes && galaxy.wormholesWereAllUsedLastShot) {
        for (const wormhole of galaxy.wormholes) {
            wormhole.used = false;
        }
        galaxy.wormholesWereAllUsedLastShot = false;
    }
    setGlobalTick(0);
}
export function resetAllWormholes() {
    const galaxy = galaxys[currentGalaxy - 1];
    if (galaxy.wormholes) {
        for (const wormhole of galaxy.wormholes) {
            wormhole.used = false;
        }
        galaxy.wormholesWereAllUsedLastShot = false;
    }
    setGlobalTick(0);
}
let wormholeTransition = {
    active: false,
    progress: 0,
    duration: 0.32, // seconds
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    cameraStart: { x: 0, y: 0, scale: 1 },
    cameraEnd: { x: 0, y: 0, scale: 1 },
    cometVx: 0,
    cometVy: 0,
    wormholeA: null,
    wormholeB: null,
    ringRadius: 0,
    ringAlpha: 0
};
// Use a more extreme zoom for wormhole animation
const WORMHOLE_CAMERA_SCALE = 2;
function startWormholeTransition(wormholeA, wormholeB) {
    wormholeTransition.active = true;
    wormholeTransition.progress = 0;
    wormholeTransition.start = { x: comet.x, y: comet.y };
    wormholeTransition.end = { x: wormholeB.x, y: wormholeB.y };
    wormholeTransition.cameraStart = { x: camera.x, y: camera.y, scale: cameraScale };
    wormholeTransition.cameraEnd = { x: wormholeB.x, y: wormholeB.y, scale: WORMHOLE_CAMERA_SCALE };
    wormholeTransition.cometVx = comet.vx;
    wormholeTransition.cometVy = comet.vy;
    wormholeTransition.wormholeA = wormholeA;
    wormholeTransition.wormholeB = wormholeB;
    gameState = "wormhole_animating";
    playSound('teleport');
    // Send analytics for wormhole entry
    sendAnalytics('browser game wormhole hit');
    // Clear trail for clean teleport effect
    comet.trail = [];
    // Trigger entry ring animation at wormholeA
    ringAnimations.push({
        x: wormholeA.x,
        y: wormholeA.y,
        color: wormholeA.color,
        startRadius: wormholeA.radius * 10,
        endRadius: wormholeA.radius,
        duration: 0.32, // match transition duration
        elapsed: 0,
        fadeIn: true
    });
}
export function updateWormholeTransition(dt) {
    if (!wormholeTransition.active)
        return;
    wormholeTransition.progress += dt / wormholeTransition.duration;
    let t = Math.min(1, wormholeTransition.progress);
    // More extreme zoom: quickly zoom in, hold, then zoom out at the very end
    let zoomT;
    if (t < 0.2) {
        zoomT = t / 0.2; // 0 to 1 quickly
    }
    else if (t > 0.8) {
        zoomT = 1 - (t - 0.8) / 0.2; // 1 to 0 quickly
    }
    else {
        zoomT = 1; // Hold max zoom
    }
    zoomT = Math.max(0, Math.min(1, zoomT));
    // Animate comet position
    comet.x = lerp(wormholeTransition.start.x, wormholeTransition.end.x, t);
    comet.y = lerp(wormholeTransition.start.y, wormholeTransition.end.y, t);
    // Bias camera movement to focus on exit wormhole more quickly
    let camT = Math.pow(t, 0.7);
    camera.targetX = lerp(wormholeTransition.cameraStart.x, wormholeTransition.cameraEnd.x, camT);
    camera.targetY = lerp(wormholeTransition.cameraStart.y, wormholeTransition.cameraEnd.y, camT);
    setTargetCameraScale(lerp(wormholeTransition.cameraStart.scale, WORMHOLE_CAMERA_SCALE, zoomT));
    // End animation
    if (t >= 1) {
        wormholeTransition.active = false;
        gameState = "firing";
        // Place comet just outside the paired wormhole to prevent re-entry
        const dx = wormholeTransition.end.x - wormholeTransition.start.x;
        const dy = wormholeTransition.end.y - wormholeTransition.start.y;
        comet.x = wormholeTransition.end.x + dx * 0.1;
        comet.y = wormholeTransition.end.y + dy * 0.1;
        // Maintain velocity
        comet.vx = wormholeTransition.cometVx;
        comet.vy = wormholeTransition.cometVy;
        comet.active = true;
        comet.trail = [];
        // Mark both wormholes as used (after animation)
        if (wormholeTransition.wormholeA)
            wormholeTransition.wormholeA.used = true;
        if (wormholeTransition.wormholeB)
            wormholeTransition.wormholeB.used = true;
        // Trigger exit ring animation at wormholeB
        if (wormholeTransition.wormholeB) {
            ringAnimations.push({
                x: wormholeTransition.wormholeB.x,
                y: wormholeTransition.wormholeB.y,
                color: wormholeTransition.wormholeB.color,
                startRadius: wormholeTransition.wormholeB.radius,
                endRadius: wormholeTransition.wormholeB.radius * 6,
                duration: 0.32, // match transition duration
                elapsed: 0,
                fadeIn: false
            });
        }
    }
}
// Update and clean up wormhole ring animations
export function updateWormholeRings(dt) {
    for (let i = ringAnimations.length - 1; i >= 0; i--) {
        const anim = ringAnimations[i];
        anim.elapsed += dt;
        if (anim.elapsed >= anim.duration) {
            ringAnimations.splice(i, 1);
        }
    }
}
