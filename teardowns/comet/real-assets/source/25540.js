// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
"use strict";
import { Color, mainCanvasSize } from "../littlejs.esm.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
// Game configuration and constants
export const SAVE_KEY = "comet_game_save";
// Base constants (these scale with screen size)
export const BASE_WIDTH = 1080;
export const BASE_HEIGHT = 768;
export const GRAVITY_STRENGTH = 6000;
export const GRAVITY_RADIUS_MULTIPLIER = 3.0;
export const MAX_AIM_DISTANCE_BASE = 180;
export const MAX_COMET_SPEED = 500;
export const COMET_FRICTION = 0.98;
export const GALAXY_COUNT = 256;
export const STAR_COUNT = 150 * GALAXY_COUNT;
export const POWER_MULTIPLIER = 6;
export const PLANET_SPRITE_COUNT = 10;
// Keyboard aiming constants
export const KEYBOARD_AIM_ANGLE_STEP = Math.PI / 360;
export const KEYBOARD_AIM_POWER_STEP = 0.02;
export const KEYBOARD_ACCELERATION_TIME = 60;
export const KEYBOARD_MAX_ANGLE_STEP = Math.PI / 15;
export const KEYBOARD_MAX_POWER_STEP = 0.08;
export const MIN_POWER_RATIO = 0.2;
// Dynamic screen dimensions - will be updated based on actual canvas size
export let SCREEN_WIDTH = -1;
export let SCREEN_HEIGHT = -1;
export let SCALE_FACTOR = -1;
// Dynamic constants that scale with screen size
export let CLUSTER_SPACING;
export let MAX_AIM_DISTANCE;
// UI Text Sizes (base sizes that will be scaled)
export const UI_TEXT_SIZES = {
    STATUS: 12, // Shot count and total shots
    HELP_MESSAGE: 14, // Help text and instructions
    SOUND_BUTTON: 14, // Sound toggle button
    SAVE_TEXT: 30, // Save/replay instructions
    STATE_TEXT: 24, // Game state text (aiming, firing, etc.)
    REPLAY_TEXT: 30, // Replay mode text
    GALAXY_TITLE: 36, // Galaxy and Universe titles
};
// Planet color palette
export const planetColors = [
    { r: 0.2, g: 0.8, b: 0.9, a: 1 }, // Cyan/turquoise
    { r: 1.0, g: 0.6, b: 0.4, a: 1 }, // Coral/salmon
    { r: 0.9, g: 0.4, b: 0.6, a: 1 }, // Pink/magenta
    { r: 1.0, g: 0.8, b: 0.2, a: 1 }, // Golden yellow
    { r: 0.9, g: 0.9, b: 0.3, a: 1 }, // Bright yellow
    { r: 0.7, g: 0.9, b: 0.5, a: 1 }, // Light green
    { r: 0.5, g: 0.7, b: 0.9, a: 1 }, // Light blue
    { r: 0.8, g: 0.6, b: 0.9, a: 1 }, // Lavender/purple
    { r: 1.0, g: 0.7, b: 0.3, a: 1 }, // Orange
    { r: 0.9, g: 0.5, b: 0.3, a: 1 }, // Burnt orange
    { r: 0.6, g: 0.9, b: 0.7, a: 1 }, // Mint green
];
// State descriptions for UI
export const stateDescriptions = {
    aiming: i18n("state_aiming"),
    firing: " ", // "Moving",
    animating: " ", // "Warping",
    holein: i18n("state_success"),
    holeinone: i18n("state_hole_in_one"),
    nearmiss: i18n("state_near_miss"),
    replay: i18n("state_replay"),
};
// Colors
export const textPrimary = "rgba(245,245,245,0.9)";
export const textSecondary = "rgba(167,169,169,0.9)";
export const textHighlight = "rgba(255,218,117,0.9)";
export const colAttract = new Color(1, 1, 1, 0.3);
export const colRepel = new Color(1, 0.8, 0, 0.3);
// Grid overlay defaults
export let gridEnabled = true;
export let gridSpacing = 60;
export let gridOpacity = 0.2;
// Audio mode configuration: specify allowed modes (by index)
// 0: MUTE, 1: SFX, 2: WAV, 3: MUS+SFX, 4: MUS+WAV, 5: MUS
export const ALLOWED_AUDIO_MODES = [0, 4]; // Only MUTE and MUS+WAV
export function updateScreenConstants() {
    SCREEN_WIDTH = mainCanvasSize.x;
    SCREEN_HEIGHT = mainCanvasSize.y;
    SCALE_FACTOR = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
    // Scale game elements based on screen size
    CLUSTER_SPACING = SCREEN_WIDTH * 1.8;
    MAX_AIM_DISTANCE = MAX_AIM_DISTANCE_BASE * SCALE_FACTOR;
}
// Utility functions
export function toSentenceCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
// Simple seeded random for consistent galaxy generation
export function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
