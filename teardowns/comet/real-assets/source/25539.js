// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { ALLOWED_AUDIO_MODES } from '../config/config.js';
import { Sound, soundEnable, setSoundVolume, zzfx } from '../littlejs.esm.js';
import { saveGame } from '../game/saveSystem.js';
// Audio Manager - handles all sound effects and audio context
// Simple Audio wrapper to replace SoundWave with native Audio API
class SimpleAudio {
    constructor(src, volume = 1, pitch = 1, randomness = 1, onLoad = null) {
        this.audioElement = new Audio();
        this.audioElement.src = src;
        this.audioElement.preload = 'auto';
        this.loaded = false;
        this.defaultVolume = volume;
        this.onLoadCallback = onLoad;
        this.audioElement.addEventListener('canplaythrough', () => {
            this.loaded = true;
            if (this.onLoadCallback) {
                this.onLoadCallback();
            }
        });
        this.audioElement.addEventListener('error', () => {
            console.warn('Failed to load audio:', src);
        });
    }
    play(time = undefined, volume = this.defaultVolume, pitch = 1, randomness = 1, loop = false) {
        if (!this.loaded) {
            return null;
        }
        // Create a new audio instance for overlapping sounds
        const audio = this.audioElement.cloneNode();
        audio.volume = Math.max(0, Math.min(1, volume));
        audio.loop = loop;
        // Simple pitch adjustment via playbackRate (limited but better than nothing)
        if (pitch !== 1) {
            audio.playbackRate = Math.max(0.25, Math.min(4, pitch));
        }
        const playPromise = audio.play();
        if (playPromise) {
            playPromise.catch(e => {
                // Ignore play errors in case audio context isn't ready
            });
        }
        // Return object with stop method for compatibility
        return {
            stop: () => {
                audio.pause();
                audio.currentTime = 0;
            },
            audio: audio
        };
    }
}
// Zzfx sound definitions
const sndBounds = new Sound([1.6, 0, 80, .01, .06, .74, , 2.2, , 9, , , , .1, 49, .2, .03, .41, .25, .13, 178]); // Explosion 100
const sndBump = new Sound([0.5, 0, 42, , .01, .06, , 5, 2, -49, , , , .7, , .1, , .97]); // Jump 144
const sndConfirm = new Sound([.3, 0, 257, , .03, .02, 1, 1.3, 1, -18, 78, .04, , -0.2, , , , .89, .02, , -1304]); // Blip 79 - Mutation 2
const sndDrone = new Sound([, 0, 65.40639, , 3, 0, , 4, , , , , , , , , , .4, , , -1337]); // Music 41
const sndHole = new Sound([, 0, 350, .1, .12, .06, , 4, , 74.1, 238, .09, .03, , , , , .4, .28, .28]); // Powerup 61 shortened
const sndHole1 = new Sound([, 0, 386, .03, .15, .42, , 3.8, -1, 74, 238, .09, .03, , , , , .68, .26, .28]); // Powerup 61
const sndNear = new Sound([.6, , 59, .01, .02, .34, 3, 2, 6, , , , , .2, , .3, , .35, .17, .03, -3469]); // Explosion 151
const sndRestore = new Sound([, 0, 155, .01, 1.2, .5, , 1.1, , -59, , , .07, , 23, , .16, .77, .22, .46]); // Powerup 83
const sndSwing = new Sound([, 0, 488, .05, .04, .06, 1, 1.6, -7, 4, , , , , , .2, , .65, .12, , -738]); // Shoot 34
const sndTeleport = new Sound([1.1, , 262, .04, .21, .08, 1, 2.2, -4, , -68, .1, .09, , , .1, , .85, .25, .44, -1456]); // Powerup 147
// Wave file instantiations using native Audio API
const sndBoundsWave = new SimpleAudio('assets/sndBounds.wav');
const sndBumpWave = new SimpleAudio('assets/sndBump.wav');
const sndConfirmWave = new SimpleAudio('assets/sndConfirm.wav');
const sndHole1Wave = new SimpleAudio('assets/sndHole1.wav');
const sndHoleWave = new SimpleAudio('assets/sndHole.wav');
const sndNearWave = new SimpleAudio('assets/sndNear.wav');
const sndRestoreWave = new SimpleAudio('assets/sndRestore.wav');
const sndSwingWave = new SimpleAudio('assets/sndSwing.wav');
const sndTeleportWave = new SimpleAudio('assets/sndTeleport.wav');
// Background music
const backgroundMusic = new SimpleAudio('assets/music.mp3', 0.5, 1, 1, () => {
    // Auto-start music if it should be playing but isn't currently playing
    if (isMusicEnabled() && !currentMusic) {
        playBackgroundMusic();
    }
});
// Audio mode system - combines mute, music, and sound type
// Mode 0: MUTE - All Muted
// Mode 1: SFX - Synth SFX only
// Mode 2: WAV - Wave SFX only
// Mode 3: MUS+SFX - Music + Synth SFX
// Mode 4: MUS+WAV - Music + Wave SFX
// Mode 5: MUS - Music only
// Background music settings
let musicVolume = 0.5; // Lower volume for background music
let currentMusic = null; // Track current music instance
// Audio context handling
window.audioContextReady = false;
let pendingSounds = [];
// Helper functions to determine what's enabled
function isMusicEnabled() {
    return window.audioMode === 3 || window.audioMode === 4 || window.audioMode === 5;
}
function isSFXEnabled() {
    return window.audioMode === 1 || window.audioMode === 2 || window.audioMode === 3 || window.audioMode === 4;
}
function useWaveSounds() {
    return window.audioMode === 2 || window.audioMode === 4 || window.audioMode === 5;
}
// Unified sound playing function
export function playSound(soundName, volume = 1, pitch = 1, randomness = 1, loop = false) {
    // Check if SFX is enabled
    if (!soundEnable || !isSFXEnabled()) {
        return;
    }
    // If audio context isn't ready yet, queue the sound
    if (!window.audioContextReady) {
        pendingSounds.push({ soundName, volume, pitch, randomness, loop });
        return;
    }
    let sound;
    if (useWaveSounds()) {
        // Use wave files
        switch (soundName) {
            case 'bounds':
                sound = sndBoundsWave;
                break;
            case 'hole1':
                sound = sndHole1Wave;
                break;
            case 'hole':
                sound = sndHoleWave;
                break;
            case 'near':
                sound = sndNearWave;
                break;
            case 'bump':
                sound = sndBumpWave;
                break;
            case 'swing':
                sound = sndSwingWave;
                break;
            case 'restore':
                sound = sndRestoreWave;
                break;
            case 'confirm':
                sound = sndConfirmWave;
                break;
            case 'drone':
                sound = sndDrone;
                break;
            case 'teleport':
                sound = sndTeleportWave;
                break;
            default:
                return;
        }
    }
    else {
        // Use zzfx sounds
        switch (soundName) {
            case 'bounds':
                sound = sndBounds;
                break;
            case 'hole1':
                sound = sndHole1;
                break;
            case 'hole':
                sound = sndHole;
                break;
            case 'near':
                sound = sndNear;
                break;
            case 'bump':
                sound = sndBump;
                break;
            case 'swing':
                sound = sndSwing;
                break;
            case 'restore':
                sound = sndRestore;
                break;
            case 'confirm':
                sound = sndConfirm;
                break;
            case 'drone':
                sound = sndDrone;
                break;
            case 'teleport':
                sound = sndTeleport;
                break;
            default:
                return;
        }
    }
    sound.play(undefined, volume, pitch, randomness, loop);
}
// Background music functions
export function playBackgroundMusic() {
    if (!isMusicEnabled() || !soundEnable) {
        return;
    }
    // Don't restart music if it's already playing
    if (currentMusic) {
        return;
    }
    // Check if background music is ready to play
    if (!backgroundMusic.loaded || !backgroundMusic.audioElement) {
        return;
    }
    // Play background music in loop
    currentMusic = backgroundMusic.play(undefined, musicVolume, 1, 1, true);
}
export function stopBackgroundMusic() {
    if (currentMusic) {
        currentMusic.stop();
        currentMusic = null;
    }
}
function setMusicVolume(volume) {
    const oldVolume = musicVolume;
    musicVolume = Math.max(0, Math.min(1, volume));
    // If music is currently playing, restart it with new volume
    if (isMusicEnabled() && currentMusic) {
        stopBackgroundMusic();
        playBackgroundMusic();
    }
    // Save the game after changing music volume
    if (typeof saveGame === 'function') {
        saveGame();
    }
}
function setSFXVolume(volume) {
    if (typeof setSoundVolume === 'function') {
        setSoundVolume(Math.max(0, Math.min(1, volume)));
    }
    // Save the game after changing SFX volume
    if (typeof saveGame === 'function') {
        saveGame();
    }
}
// Function to initialize audio context after user interaction
export function initAudioContext() {
    const wasAudioContextReady = window.audioContextReady;
    if (!window.audioContextReady) {
        // Try to resume the audio context
        if (typeof zzfx !== 'undefined' && zzfx.audioContext) {
            zzfx.audioContext.resume().then(() => {
                window.audioContextReady = true;
                // Play any pending sounds
                while (pendingSounds.length > 0) {
                    const sound = pendingSounds.shift();
                    playSound(sound.soundName, sound.volume, sound.pitch, sound.randomness, sound.loop);
                }
                // Start background music if enabled
                if (isMusicEnabled()) {
                    playBackgroundMusic();
                }
            }).catch(err => {
                // Audio context resume failed
            });
        }
        else {
            // Fallback: just mark as ready
            window.audioContextReady = true;
            // Start background music if enabled
            if (isMusicEnabled()) {
                playBackgroundMusic();
            }
        }
    }
    else {
        // Audio context is already ready, but this might be the first user interaction after loading
        // Check if we need to start music (e.g., after loading a saved game)
        // Force restart music if it should be enabled but isn't currently playing
        if (isMusicEnabled()) {
            // Stop any existing music first to ensure clean restart
            stopBackgroundMusic();
            // Then start fresh
            playBackgroundMusic();
        }
    }
}
// Function to cycle through audio modes
export function cycleAudioMode() {
    const previousMode = window.audioMode;
    // Find the index of the current mode in the allowed list
    let idx = ALLOWED_AUDIO_MODES.indexOf(window.audioMode);
    // Move to the next allowed mode, wrap around
    idx = (idx + 1) % ALLOWED_AUDIO_MODES.length;
    window.audioMode = ALLOWED_AUDIO_MODES[idx];
    // Handle background music based on mode changes
    const hadMusicBefore = previousMode === 3 || previousMode === 4 || previousMode === 5;
    const hasMusicNow = isMusicEnabled();
    if (hadMusicBefore && !hasMusicNow) {
        // Switching from music mode to non-music mode - stop music
        stopBackgroundMusic();
    }
    else if (!hadMusicBefore && hasMusicNow) {
        // Switching from non-music mode to music mode - start music
        playBackgroundMusic();
    }
    // If both had music or both don't have music, do nothing (preserves music position)
    // Play a sound to indicate the change (if SFX is enabled)
    if (isSFXEnabled()) {
        playSound('confirm');
    }
    // Save the game after changing audio mode
    if (typeof saveGame === 'function') {
        saveGame();
    }
}
// Function to get current audio mode
export function getAudioMode() {
    return window.audioMode;
}
// Function to get audio button text
export function getAudioButtonText() {
    const modeTexts = [
        "MUTE",
        "SFX",
        "WAV",
        "MUS+SFX",
        "MUS+WAV",
        "MUS"
    ];
    // Only show allowed modes
    return modeTexts[window.audioMode];
}
// Legacy functions for compatibility
export function cycleSoundMode() {
    cycleAudioMode();
}
function getSoundMode() {
    return window.audioMode;
}
function getSoundButtonText() {
    return getAudioButtonText();
}
