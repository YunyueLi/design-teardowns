// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { SAVE_KEY, GALAXY_COUNT, MAX_AIM_DISTANCE, MIN_POWER_RATIO, KEYBOARD_AIM_ANGLE_STEP, KEYBOARD_AIM_POWER_STEP, KEYBOARD_ACCELERATION_TIME, KEYBOARD_MAX_ANGLE_STEP, KEYBOARD_MAX_POWER_STEP, POWER_MULTIPLIER } from '../config/config.js';
import { playSound, initAudioContext, cycleSoundMode } from '../audio/audioManager.js';
import { keyWasPressed, keyIsDown, mousePosScreen, mouseWasPressed, mouseIsDown, mouseWasReleased, screenToWorld } from '../littlejs.esm.js';
import { gameState, comet, lastSafePosition, aim, lastShot, currentGalaxy, currentUniverse, galaxyShots, totalShots, keyboardMode, keyboardAimAngle, keyboardAimPower, keyboardAngleHoldTime, keyboardPowerHoldTime, setGameState, setCurrentGalaxy, setCurrentUniverse, setKeyboardMode, setKeyboardAimAngle, setKeyboardAimPower, setKeyboardAngleHoldTime, setKeyboardPowerHoldTime, startTransition, resetAllWormholes, resetComet, resetWormholes, setGalaxyShots, setTotalShots } from './gameLogic.js';
import { isReplaying, setReplayData, loadGame, saveGame, replayLastShot } from './saveSystem.js';
import { toggleFullMessage } from '../rendering/ui.js';
import { sendAnalytics } from './analytics.js';
import { galaxys } from './galaxy.js';
import { slowZoom, setSlowZoom } from './main.js';
// Input handling system - manages keyboard and mouse input
export function handleInput() {
    if (isReplaying) {
        return;
    }
    // Initialize audio context on first user interaction
    if (!window.audioContextReady) {
        initAudioContext();
    }
    // --- Keyboard mode activation ---
    // If any arrow key or space is pressed, enter keyboard mode
    if ((keyIsDown('ArrowLeft') || keyIsDown('ArrowRight') || keyIsDown('ArrowUp') || keyIsDown('ArrowDown') || keyIsDown('Space')) && (gameState === "aiming" || gameState === "nearmiss" || gameState === "holein")) {
        if (!keyboardMode) {
            setKeyboardMode(true);
            // Initialize aim from current comet position
            setKeyboardAimAngle(0);
            setKeyboardAimPower(0.5);
            if (aim.active) {
                // If already aiming, use current aim
                const dx = aim.endX - aim.startX;
                const dy = aim.endY - aim.startY;
                setKeyboardAimAngle(Math.atan2(dy, dx));
                const dist = Math.sqrt(dx * dx + dy * dy);
                setKeyboardAimPower(Math.min(1, dist / MAX_AIM_DISTANCE));
            }
            else if (lastShot.active) {
                // If there's a previous shot, use those values
                const dx = lastShot.endX - lastShot.startX;
                const dy = lastShot.endY - lastShot.startY;
                setKeyboardAimAngle(Math.atan2(dy, dx));
                const dist = Math.sqrt(dx * dx + dy * dy);
                setKeyboardAimPower(Math.min(1, dist / MAX_AIM_DISTANCE));
            }
            else {
                // At start of hole: aim from comet to black hole at 50% power
                // Always calculate this when in aiming state
                if (gameState === "aiming") {
                    const galaxy = galaxys[currentGalaxy - 1];
                    const bh = galaxy.blackHole;
                    const dx = bh.x - comet.x;
                    const dy = bh.y - comet.y;
                    setKeyboardAimAngle(Math.atan2(dy, dx));
                    setKeyboardAimPower(Math.max(MIN_POWER_RATIO, 0.5));
                }
                else {
                    // Use the default aim that was set when the galaxy/hole was initialized
                    // keyboardAimAngle and keyboardAimPower are already set by setKeyboardAimDefault()
                }
            }
            aim.active = true;
            aim.startX = comet.x;
            aim.startY = comet.y;
        }
    }
    // If mouse is pressed, disable keyboard mode
    if (mouseWasPressed(0)) {
        setKeyboardMode(false);
    }
    // --- Keyboard aiming logic ---
    if (keyboardMode && (gameState === "aiming" || gameState === "nearmiss")) {
        // Calculate dynamic step sizes based on hold time
        let currentAngleStep = KEYBOARD_AIM_ANGLE_STEP;
        let currentPowerStep = KEYBOARD_AIM_POWER_STEP;
        // Update angle hold time and step size
        if (keyIsDown('ArrowLeft') || keyIsDown('ArrowRight')) {
            setKeyboardAngleHoldTime(keyboardAngleHoldTime + 1);
            const acceleration = Math.min(1, keyboardAngleHoldTime / KEYBOARD_ACCELERATION_TIME);
            currentAngleStep = KEYBOARD_AIM_ANGLE_STEP + (KEYBOARD_MAX_ANGLE_STEP - KEYBOARD_AIM_ANGLE_STEP) * acceleration;
        }
        else {
            setKeyboardAngleHoldTime(0);
        }
        // Update power hold time and step size
        if (keyIsDown('ArrowUp') || keyIsDown('ArrowDown')) {
            setKeyboardPowerHoldTime(keyboardPowerHoldTime + 1);
            const acceleration = Math.min(1, keyboardPowerHoldTime / KEYBOARD_ACCELERATION_TIME);
            currentPowerStep = KEYBOARD_AIM_POWER_STEP + (KEYBOARD_MAX_POWER_STEP - KEYBOARD_AIM_POWER_STEP) * acceleration;
        }
        else {
            setKeyboardPowerHoldTime(0);
        }
        // Update aim angle (reversed: left increases, right decreases)
        if (keyIsDown('ArrowLeft')) {
            setKeyboardAimAngle(keyboardAimAngle + currentAngleStep);
        }
        if (keyIsDown('ArrowRight')) {
            setKeyboardAimAngle(keyboardAimAngle - currentAngleStep);
        }
        // Clamp angle to [0, 2PI)
        let newAngle = keyboardAimAngle;
        if (newAngle < 0)
            newAngle += Math.PI * 2;
        if (newAngle >= Math.PI * 2)
            newAngle -= Math.PI * 2;
        setKeyboardAimAngle(newAngle);
        // Update power
        if (keyIsDown('ArrowUp')) {
            setKeyboardAimPower(Math.min(1, keyboardAimPower + currentPowerStep));
        }
        if (keyIsDown('ArrowDown')) {
            setKeyboardAimPower(Math.max(MIN_POWER_RATIO, keyboardAimPower - currentPowerStep));
        }
        // Update aim vector
        aim.active = true;
        aim.startX = comet.x;
        aim.startY = comet.y;
        const dist = keyboardAimPower * MAX_AIM_DISTANCE;
        aim.endX = aim.startX + Math.cos(keyboardAimAngle) * dist;
        aim.endY = aim.startY + Math.sin(keyboardAimAngle) * dist;
        aim.power = keyboardAimPower;
        // Fire with space
        if (keyWasPressed('Space')) {
            fireShot();
        }
        // If mouse is pressed, exit keyboard mode (handled above)
        return; // Skip mouse aiming if in keyboard mode
    }
    // Keyboard: proceed after holein (can skip timer)
    if (keyboardMode && gameState === "holein") {
        if (keyWasPressed('Space')) {
            proceedToNextGalaxy();
            return;
        }
    }
    // --- Mouse aiming logic ---
    // Handle mouse press
    if (mouseWasPressed(0)) {
        // Check if click is within message area
        if (window.messageArea) {
            const mouseX = mousePosScreen.x;
            const mouseY = mousePosScreen.y;
            if (mouseX >= window.messageArea.x &&
                mouseX <= window.messageArea.x + window.messageArea.width &&
                mouseY >= window.messageArea.y &&
                mouseY <= window.messageArea.y + window.messageArea.height) {
                toggleFullMessage();
                return;
            }
        }
        // Check if click is within sound button area
        if (window.soundButtonArea) {
            const mouseX = mousePosScreen.x;
            const mouseY = mousePosScreen.y;
            if (mouseX >= window.soundButtonArea.x &&
                mouseX <= window.soundButtonArea.x + window.soundButtonArea.width &&
                mouseY >= window.soundButtonArea.y &&
                mouseY <= window.soundButtonArea.y + window.soundButtonArea.height) {
                cycleSoundMode();
                return;
            }
        }
        // Check if click is within comet button area
        if (window.cometButtonArea) {
            const mouseX = mousePosScreen.x;
            const mouseY = mousePosScreen.y;
            if (mouseX >= window.cometButtonArea.x &&
                mouseX <= window.cometButtonArea.x + window.cometButtonArea.width &&
                mouseY >= window.cometButtonArea.y &&
                mouseY <= window.cometButtonArea.y + window.cometButtonArea.height) {
                // Open comet game link in new tab
                window.open('https://www.perplexity.ai/b/home', '_blank');
                return;
            }
        }
        // Check if click is within pplx button area
        if (window.pplxButtonArea) {
            const mouseX = mousePosScreen.x;
            const mouseY = mousePosScreen.y;
            if (mouseX >= window.pplxButtonArea.x &&
                mouseX <= window.pplxButtonArea.x + window.pplxButtonArea.width &&
                mouseY >= window.pplxButtonArea.y &&
                mouseY <= window.pplxButtonArea.y + window.pplxButtonArea.height) {
                // Open pplx link in new tab
                window.open('https://www.perplexity.ai', '_blank');
                return;
            }
        }
        if (gameState === "holein") {
            proceedToNextGalaxy();
            return;
        }
        else if (gameState === "aiming" || gameState === "nearmiss") {
            const worldPos = screenToWorld(mousePosScreen);
            aim.active = true;
            aim.startX = comet.x;
            aim.startY = comet.y;
            aim.endX = worldPos.x;
            aim.endY = worldPos.y;
            aim.power = 0;
            // Reset to aiming state when starting a new shot
            if (gameState === "nearmiss") {
                setGameState("aiming");
            }
        }
    }
    // Handle mouse drag while aiming
    if (aim.active && mouseIsDown(0) && (gameState === "aiming" || gameState === "nearmiss")) {
        const worldPos = screenToWorld(mousePosScreen);
        const dx = worldPos.x - aim.startX;
        const dy = worldPos.y - aim.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > MAX_AIM_DISTANCE) {
            const angle = Math.atan2(dy, dx);
            aim.endX = aim.startX + Math.cos(angle) * MAX_AIM_DISTANCE;
            aim.endY = aim.startY + Math.sin(angle) * MAX_AIM_DISTANCE;
        }
        else {
            aim.endX = worldPos.x;
            aim.endY = worldPos.y;
        }
        aim.power = Math.min(distance / MAX_AIM_DISTANCE, 1.0);
    }
    // Handle firing
    if (mouseWasReleased(0) && aim.active && (gameState === "aiming" || gameState === "nearmiss")) {
        fireShot();
    }
    // Handle keyboard shortcuts
    handleKeyboardShortcuts();
}
export function fireShot() {
    // Save last position
    lastSafePosition.x = comet.x;
    lastSafePosition.y = comet.y;
    // Reset wormhole usage tracking for new shot
    const galaxy = galaxys[currentGalaxy - 1];
    if (galaxy.wormholes) {
        galaxy.wormholesWereAllUsedLastShot = false;
    }
    // Capture replay data before firing
    setReplayData({
        galaxyIndex: currentGalaxy,
        cometStartX: comet.x,
        cometStartY: comet.y,
        shotStartX: aim.startX,
        shotStartY: aim.startY,
        shotEndX: aim.endX,
        shotEndY: aim.endY,
        shotPower: aim.power
    });
    aim.active = false;
    lastShot.startX = aim.startX;
    lastShot.startY = aim.startY;
    lastShot.endX = aim.endX;
    lastShot.endY = aim.endY;
    lastShot.power = aim.power;
    const dx = aim.endX - aim.startX;
    const dy = aim.endY - aim.startY;
    const power = aim.power;
    comet.vx = dx * power * POWER_MULTIPLIER;
    comet.vy = dy * power * POWER_MULTIPLIER;
    comet.active = true;
    comet.trail = [];
    comet.inplay = true;
    setGameState("firing");
    setGalaxyShots(galaxyShots + 1);
    setTotalShots(totalShots + 1);
    playSound('swing');
    saveGame();
}
export function proceedToNextGalaxy() {
    const nextGalaxy = currentGalaxy + 1;
    if (nextGalaxy > GALAXY_COUNT) {
        setCurrentGalaxy(1);
        setCurrentUniverse(currentUniverse + 1);
    }
    else {
        setCurrentGalaxy(nextGalaxy);
    }
    playSound('confirm');
    startTransition();
}
export function handleKeyboardShortcuts() {
    // Replay last shot
    if (keyWasPressed('KeyR')) {
        replayLastShot();
    }
    // Reset hole
    if (keyWasPressed('KeyH')) {
        // galaxyShots = 0;
        setGameState("aiming");
        resetComet();
        resetAllWormholes();
    }
    // Load game
    if (keyWasPressed('KeyL')) {
        loadGame();
    }
    // Undo last shot
    if (keyWasPressed('KeyZ')) {
        setGameState("aiming");
        comet.active = false;
        comet.vx = 0;
        comet.vy = 0;
        comet.x = lastSafePosition.x; // Restore position
        comet.y = lastSafePosition.y; // Restore position
        comet.trail = [];
        lastShot.active = true;
        // Reset wormholes
        resetWormholes();
    }
    // Audio mode
    if (keyWasPressed('KeyA')) {
        cycleSoundMode();
    }
    // Toggle slowZoom
    if (keyWasPressed('KeyQ')) {
        setSlowZoom(!slowZoom);
    }
    // Delete save
    if (keyWasPressed('KeyJ')) {
        localStorage.removeItem(SAVE_KEY);
        // Send analytics for game new
        sendAnalytics('browser game started');
    }
}
