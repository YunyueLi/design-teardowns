// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { SAVE_KEY, ALLOWED_AUDIO_MODES, SCALE_FACTOR, SCREEN_WIDTH, POWER_MULTIPLIER } from '../config/config.js';
import { currentGalaxy, currentUniverse, gameState, comet, lastSafePosition, totalShots, galaxyShots, averageShotsPerHole, holesCompleted, shotsHistory, camera, setTotalShots, setGalaxyShots, setCurrentGalaxy, setCurrentUniverse, setAverageShotsPerHole, setHolesCompleted, setShotsHistory, setGameState, resetComet, resetWormholes } from './gameLogic.js';
import { isCometOutOfBounds } from './physics.js';
import { showFullMessage, setShowFullMessage } from '../rendering/ui.js';
import { playSound, getAudioMode } from '../audio/audioManager.js';
import { galaxys } from './galaxy.js';
import { sendAnalytics } from './analytics.js';
// Save/Load and Replay system
export let replayData = null;
export let isReplaying = false;
export let showSaveButton = false;
export let audioMode = ALLOWED_AUDIO_MODES[1]; // Default to second allowed mode (MUS+WAV)
window.audioMode = audioMode;
// Setter functions for variables modified in other files
export function setReplayData(value) { replayData = value; }
export function setIsReplaying(value) { isReplaying = value; }
export function saveGame() {
    const galaxy = galaxys[currentGalaxy - 1];
    const cometAngle = Math.atan2(comet.y - galaxy.y, comet.x - galaxy.x);
    const cometDistance = Math.sqrt((comet.x - galaxy.x) ** 2 + (comet.y - galaxy.y) ** 2);
    const safeAngle = Math.atan2(lastSafePosition.y - galaxy.y, lastSafePosition.x - galaxy.x);
    const safeDistance = Math.sqrt((lastSafePosition.x - galaxy.x) ** 2 + (lastSafePosition.y - galaxy.y) ** 2);
    const saveData = {
        totalShots,
        galaxyShots,
        currentGalaxy,
        currentUniverse,
        gameState,
        audioMode: getAudioMode(),
        cometAngle,
        cometDistance: cometDistance / SCALE_FACTOR, // Normalize by scale
        safeAngle,
        safeDistance: safeDistance / SCALE_FACTOR,
        averageShotsPerHole,
        holesCompleted,
        shotsHistory,
        showFullMessage
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}
export function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        setTotalShots(data.totalShots || 0);
        setGalaxyShots(data.galaxyShots || 0);
        setCurrentGalaxy(data.currentGalaxy || 1);
        setCurrentUniverse(data.currentUniverse || 1);
        setAverageShotsPerHole(data.averageShotsPerHole || 0);
        setHolesCompleted(data.holesCompleted || 0);
        setShotsHistory(data.shotsHistory || []);
        if (shotsHistory.length) {
            const sum = shotsHistory.reduce((a, b) => a + b, 0);
            setAverageShotsPerHole(sum / shotsHistory.length);
            setHolesCompleted(shotsHistory.length);
        }
        // Restore audio mode if available, otherwise set to default (second allowed mode)
        if (typeof data.audioMode !== 'undefined' && ALLOWED_AUDIO_MODES.includes(data.audioMode)) {
            audioMode = data.audioMode;
            window.audioMode = audioMode;
        }
        else {
            audioMode = ALLOWED_AUDIO_MODES[1];
            window.audioMode = audioMode;
        }
        // Music will start on first user interaction via initAudioContext()
        // Restore info box state if available
        if (typeof data.showFullMessage !== 'undefined') {
            setShowFullMessage(data.showFullMessage);
        }
        if (data.cometAngle !== undefined && comet) {
            const galaxy = galaxys[currentGalaxy - 1];
            // Restore from polar coordinates
            const scaledCometDistance = data.cometDistance * SCALE_FACTOR;
            const scaledSafeDistance = data.safeDistance * SCALE_FACTOR;
            // If restoring to a 'holein' state, place comet at black hole
            if (data.gameState === 'holein') {
                comet.x = galaxy.blackHole.x;
                comet.y = galaxy.blackHole.y;
                lastSafePosition.x = galaxy.blackHole.x;
                lastSafePosition.y = galaxy.blackHole.y;
            }
            else {
                comet.x = galaxy.x + Math.cos(data.cometAngle) * scaledCometDistance;
                comet.y = galaxy.y + Math.sin(data.cometAngle) * scaledCometDistance;
                lastSafePosition.x = galaxy.x + Math.cos(data.safeAngle) * scaledSafeDistance;
                lastSafePosition.y = galaxy.y + Math.sin(data.safeAngle) * scaledSafeDistance;
            }
            // If the loaded gameState is 'firing', set it to 'aiming' instead
            if (data.gameState === 'firing') {
                setGameState('aiming');
            }
            else {
                setGameState(data.gameState || "aiming");
            }
            camera.targetX = galaxy.x;
            camera.targetY = galaxy.y;
            // Skip camera interpolation on load
            camera.x = camera.targetX - SCREEN_WIDTH * 3;
            camera.y = camera.targetY;
            // Check if comet is on screen, else reset the hole
            if (typeof isCometOutOfBounds === 'function' && isCometOutOfBounds(comet, galaxy)) {
                resetComet();
            }
        }
        playSound('restore');
        // Send analytics for game restored
        sendAnalytics('browser game restored');
    }
}
export function replayLastShot() {
    if (!replayData) {
        return;
    }
    setIsReplaying(true);
    setCurrentGalaxy(replayData.galaxyIndex);
    // Reset wormholes
    resetWormholes();
    // Reset comet to replay position
    comet.x = replayData.cometStartX;
    comet.y = replayData.cometStartY;
    comet.vx = 0;
    comet.vy = 0;
    comet.active = false;
    comet.trail = [];
    // Execute the shot immediately
    const dx = replayData.shotEndX - replayData.shotStartX;
    const dy = replayData.shotEndY - replayData.shotStartY;
    comet.vx = dx * replayData.shotPower * POWER_MULTIPLIER;
    comet.vy = dy * replayData.shotPower * POWER_MULTIPLIER;
    comet.active = true;
    comet.trail = [];
    setGameState("firing");
}
