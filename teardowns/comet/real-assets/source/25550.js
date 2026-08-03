// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
import { overlayCanvas, mainCanvasSize, combineCanvases, mousePosScreen } from '../littlejs.esm.js';
import { UI_TEXT_SIZES, stateDescriptions, textPrimary, textHighlight, SCALE_FACTOR, GALAXY_COUNT, toSentenceCase, } from '../config/config.js';
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { gameState, currentGalaxy, currentUniverse, galaxyShots, totalShots, averageShotsPerHole, holesCompleted, comet, transitionProgress, } from '../game/gameLogic.js';
import { galaxys } from '../game/galaxy.js';
import { showSaveButton } from '../game/saveSystem.js';
import { drawRoundRect } from './renderer.js';
// UI rendering and text display system
// Load SVG icons
const audioOnImage = new window.Image();
const audioOffImage = new window.Image();
const pplxImage = new window.Image();
const cometImage = new window.Image();
// Hover state tracking
let mouseX = 0;
let mouseY = 0;
let isHoveringAudio = false;
let isHoveringComet = false;
let isHoveringPplx = false;
let isHoveringMessage = false;
// Function to update hover states
function updateHoverStates() {
    // Reset all hover states
    isHoveringAudio = false;
    isHoveringComet = false;
    isHoveringPplx = false;
    isHoveringMessage = false;
    // Use mousePosScreen from the game engine
    if (typeof mousePosScreen !== 'undefined') {
        mouseX = mousePosScreen.x;
        mouseY = mousePosScreen.y;
    }
    // Check if mouse is over any button areas
    if (window.soundButtonArea) {
        isHoveringAudio = mouseX >= window.soundButtonArea.x &&
            mouseX <= window.soundButtonArea.x + window.soundButtonArea.width &&
            mouseY >= window.soundButtonArea.y &&
            mouseY <= window.soundButtonArea.y + window.soundButtonArea.height;
    }
    if (window.cometButtonArea) {
        isHoveringComet = mouseX >= window.cometButtonArea.x &&
            mouseX <= window.cometButtonArea.x + window.cometButtonArea.width &&
            mouseY >= window.cometButtonArea.y &&
            mouseY <= window.cometButtonArea.y + window.cometButtonArea.height;
    }
    if (window.pplxButtonArea) {
        isHoveringPplx = mouseX >= window.pplxButtonArea.x &&
            mouseX <= window.pplxButtonArea.x + window.pplxButtonArea.width &&
            mouseY >= window.pplxButtonArea.y &&
            mouseY <= window.pplxButtonArea.y + window.pplxButtonArea.height;
    }
    if (window.messageArea) {
        isHoveringMessage = mouseX >= window.messageArea.x &&
            mouseX <= window.messageArea.x + window.messageArea.width &&
            mouseY >= window.messageArea.y &&
            mouseY <= window.messageArea.y + window.messageArea.height;
    }
}
// Load SVG images using direct URLs
audioOnImage.src = 'assets/audio_on.svg';
audioOffImage.src = 'assets/audio_off.svg';
pplxImage.src = 'assets/pplx.svg';
cometImage.src = 'assets/comet.svg';
export let uiContainer = null;
// UI state
export let showFullMessage = false;
export let helpMessage = "?";
export let stateTextOpacity = 1;
export let displayedStateText = i18n("state_aiming");
export let fadeState = "visible"; // visible, fadingOut, invisible, fadingIn
export let lastGameState = "aiming";
// Setter functions for variables modified in other files
export function setShowFullMessage(value) { showFullMessage = value; }
function createUIText(id, text, x, y, size, color = textPrimary, align = "left", weight = "normal") {
    if (!uiContainer) {
        uiContainer = document.createElement("div");
        uiContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            font-family: "PP Editorial New", serif;
            z-index: 1000;
        `;
        document.body.appendChild(uiContainer);
    }
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElement("div");
        element.id = id;
        uiContainer.appendChild(element);
    }
    element.textContent = text;
    element.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        text-align: ${align};
        white-space: nowrap;
        ${weight === "normal"
        ? "font-family: \"PP Editorial New\", serif; font-weight: 400;"
        : "font-family: \"PP Editorial New\", serif; font-weight: 400; font-style: italic;"}
        ${align === "center" ? "transform: translateX(-50%);" : ""}
        ${align === "right" ? "transform: translateX(-100%);" : ""}
        ${align === "left" ? "width: max-content;" : ""}
    `;
}
function createUITextAlt(id, text, x, y, size, color = textPrimary, align = "left") {
    if (!uiContainer) {
        uiContainer = document.createElement("div");
        uiContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            font-family: "PP Editorial New", serif;
            z-index: 1000;
        `;
        document.body.appendChild(uiContainer);
    }
    // Remove existing element if it exists
    let existingElement = document.getElementById(id);
    if (existingElement) {
        existingElement.remove();
    }
    // Create container for the mixed text
    let container = document.createElement("div");
    container.id = id;
    container.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        text-align: ${align};
        white-space: nowrap;
        font-family: "PP Editorial New", serif; font-weight: 400;
        ${align === "center" ? "transform: translateX(-50%);" : ""}
        ${align === "right" ? "transform: translateX(-100%);" : ""}
        ${align === "left" ? "width: max-content;" : ""}
    `;
    if (text.length === 0) {
        container.textContent = "";
        uiContainer.appendChild(container);
        return;
    }
    // Split text into first letter and rest
    const firstLetter = text[0];
    const restOfText = text.slice(1);
    // Create span for first letter (italic)
    const firstLetterSpan = document.createElement("span");
    firstLetterSpan.textContent = firstLetter;
    firstLetterSpan.style.cssText = `
        font-family: "PP Editorial New", serif; font-weight: 400; font-style: italic;
        display: inline-block;
    `;
    // Create span for rest of text (normal)
    const restSpan = document.createElement("span");
    restSpan.textContent = restOfText;
    restSpan.style.cssText = `
        font-family: "PP Editorial New", serif; font-weight: 400;
        display: inline-block;
    `;
    // Add spans to container
    container.appendChild(firstLetterSpan);
    container.appendChild(restSpan);
    uiContainer.appendChild(container);
}
function createHUDText(id, text, x, y, size, color = textPrimary, align = "left") {
    if (!uiContainer) {
        uiContainer = document.createElement("div");
        uiContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            font-family: 'Berkeley Mono', monospace;
            z-index: 1000;
        `;
        document.body.appendChild(uiContainer);
    }
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElement("div");
        element.id = id;
        uiContainer.appendChild(element);
    }
    if (text !== undefined) {
        element.textContent = text.includes('\n') ? text : ` ${text} `;
    }
    else {
        element.textContent = text;
    }
    element.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        text-align: ${align};
        white-space: pre-line;
        line-height: 1.6;
        font-family: 'Berkeley Mono', monospace;
        ${align === "center" ? "transform: translateX(-50%);" : ""}
        ${align === "right" ? "transform: translateX(-100%);" : ""}
        ${align === "left" ? "width: max-content;" : ""}
    `;
}
export function updateStateTextFade() {
    // Update state text fade effect
    if (gameState !== lastGameState) {
        fadeState = "fadingOut";
        lastGameState = gameState;
    }
    // Handle fade states
    switch (fadeState) {
        case "fadingOut":
            stateTextOpacity = Math.max(0, stateTextOpacity - 0.1); // Fade out over ~0.5 seconds
            if (stateTextOpacity === 0) {
                fadeState = "invisible";
                // Update the displayed text only when fully invisible
                let newStateText;
                if (gameState === "holein") {
                    // Check for hole in one
                    newStateText =
                        galaxyShots === 1
                            ? stateDescriptions["holeinone"]
                            : stateDescriptions[gameState];
                }
                else if (gameState === "animating") {
                    // Only show warping text in first half of transition
                    newStateText =
                        transitionProgress < 0.65 ? stateDescriptions[gameState] : " ";
                }
                else {
                    newStateText =
                        stateDescriptions[gameState] || toSentenceCase(gameState);
                }
                displayedStateText = newStateText;
            }
            break;
        case "invisible":
            // Wait a moment before starting fade in
            fadeState = "fadingIn";
            break;
        case "fadingIn":
            stateTextOpacity = Math.min(1, stateTextOpacity + 0.1); // Fade in over ~0.5 seconds
            if (stateTextOpacity === 1) {
                fadeState = "visible";
            }
            break;
        case "visible":
            // Update displayed text during transition if needed
            if (gameState === "animating" && transitionProgress >= 0.65) {
                fadeState = "fadingOut";
            }
            break;
    }
}
export function renderUI() {
    const uiScale = Math.max(SCALE_FACTOR, 1);
    // Update hover states
    updateHoverStates();
    // Calculate text for each score element
    const shotText = i18n("shot_text", galaxyShots == 0 ? "-" : galaxyShots);
    const totalText = i18n("total_text", totalShots);
    const avgText = holesCompleted === 0 ? i18n("average_text", "-") : i18n("average_text", averageShotsPerHole.toFixed(1));
    // Estimate widths for each element (fallback if not rendered yet)
    function measureText(id, text, size, font) {
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement("div");
            el.id = id;
            el.style.cssText = `position: absolute; left: -9999px; top: -9999px; font-size: ${size}px; font-family: 'Berkeley Mono', monospace; white-space: pre-line;`;
            el.textContent = text;
            document.body.appendChild(el);
        }
        else {
            el.textContent = text;
            el.style.fontSize = `${size}px`;
            el.style.fontFamily = "'Berkeley Mono', monospace";
        }
        const width = el.getBoundingClientRect().width;
        return width;
    }
    const totalWidth = measureText("total-measure", totalText, UI_TEXT_SIZES.STATUS);
    const avgWidth = measureText("avg-measure", avgText, UI_TEXT_SIZES.STATUS);
    const statusWidth = measureText("status-measure", shotText, UI_TEXT_SIZES.STATUS);
    const spacing = 32 * uiScale;
    const totalScoreWidth = totalWidth + avgWidth + statusWidth + 2 * spacing;
    const centerX = mainCanvasSize.x / 2;
    const baseY = mainCanvasSize.y - 65 * uiScale;
    // Calculate X positions for each element, left-aligned within the centered group
    const groupLeft = centerX - totalScoreWidth / 2 - 20;
    const totalX = groupLeft + totalWidth / 2;
    const avgX = totalX + totalWidth / 2 + spacing + avgWidth / 2;
    const statusX = avgX + avgWidth / 2 + spacing + statusWidth / 2;
    // Create TOTAL, AVG, SHOT texts left-aligned within the centered group
    createHUDText("total", totalText, totalX, baseY, UI_TEXT_SIZES.STATUS, textPrimary, "left");
    createHUDText("avg", avgText, avgX, baseY, UI_TEXT_SIZES.STATUS, textPrimary, "left");
    createHUDText("status", shotText, statusX, baseY, UI_TEXT_SIZES.STATUS, textPrimary, "left");
    // Adjust roundrect to include all three
    const statusEl = document.getElementById("status");
    const totalEl = document.getElementById("total");
    const avgEl = document.getElementById("avg");
    if (statusEl && totalEl && avgEl && overlayCanvas) {
        const statusRect = statusEl.getBoundingClientRect();
        const totalRect = totalEl.getBoundingClientRect();
        const avgRect = avgEl.getBoundingClientRect();
        const containerRect = overlayCanvas.getBoundingClientRect();
        const msgPadding = 12;
        const left = Math.min(statusRect.left, totalRect.left, avgRect.left) - containerRect.left - msgPadding;
        const right = Math.max(statusRect.right, totalRect.right, avgRect.right) - containerRect.left + msgPadding;
        const top = Math.min(statusRect.top, totalRect.top, avgRect.top) - containerRect.top - msgPadding;
        const bottom = Math.max(statusRect.bottom, totalRect.bottom, avgRect.bottom) - containerRect.top + msgPadding;
        const width = right - left;
        const height = bottom - top;
        drawRoundRect(left, top, width, height);
    }
    // Show combined galaxy+universe number as 'Galaxy N'
    const galaxyNumber = (currentUniverse - 1) * GALAXY_COUNT + currentGalaxy;
    createUITextAlt("galaxy", i18n("galaxy_text", galaxyNumber), mainCanvasSize.x / 2, 20 * uiScale, UI_TEXT_SIZES.GALAXY_TITLE, textPrimary, "center");
    // Show special label for moving or wormhole stages
    const galaxy = galaxys[currentGalaxy - 1];
    let specialLabel = "";
    if (galaxy) {
        let labels = [];
        // if (galaxy.typeName) labels.push(galaxy.typeName.toUpperCase());
        if (galaxy.wormholes && galaxy.wormholes.length > 0)
            labels.push(i18n("label_wormhole"));
        else if (galaxy.moving)
            labels.push(i18n("label_orbital"));
        specialLabel = labels.join(" · ");
    }
    if (specialLabel) {
        createHUDText("galaxyType", specialLabel, mainCanvasSize.x / 2, 74 * uiScale, UI_TEXT_SIZES.HELP_MESSAGE, textHighlight, "center");
    }
    else {
        // Remove the label if not needed
        const oldLabel = document.getElementById("galaxyType");
        if (oldLabel)
            oldLabel.remove();
    }
    let message;
    if (gameState === "aiming") {
        message = showFullMessage
            ? i18n("help_aiming")
            : helpMessage;
    }
    else if (gameState === "firing") {
        message = showFullMessage
            ? i18n("help_firing")
            : helpMessage;
    }
    else if (gameState === "animating") {
        message = showFullMessage ? i18n("help_warping") : helpMessage;
    }
    else if (gameState === "holein") {
        message = showFullMessage
            ? i18n("help_success")
            : helpMessage;
    }
    else if (gameState === "nearmiss") {
        message = showFullMessage
            ? i18n("help_near_miss")
            : helpMessage;
    }
    else if (gameState === "wormhole_animating") {
        message = showFullMessage ? i18n("help_wormhole") : helpMessage;
    }
    else {
        // Default fallback for any other game states
        message = helpMessage;
    }
    // Calculate padding and adjust text position accordingly
    const msgPadding = message.length > 1 ? 16 * uiScale : 8;
    const textX = 30 * uiScale + (message.length > 1 ? 8 * uiScale : 0); // Extra offset for multi-line text
    const textY = 30 * uiScale + (message.length > 1 ? 8 * uiScale : 0);
    createHUDText("message", message, textX, textY, UI_TEXT_SIZES.HELP_MESSAGE, textPrimary);
    // Draw a rounded rectangle behind the message text
    const messageEl = document.getElementById("message");
    if (messageEl && overlayCanvas) {
        const messageRect = messageEl.getBoundingClientRect();
        const containerRect = overlayCanvas.getBoundingClientRect();
        const left = messageRect.left - containerRect.left - msgPadding;
        const top = messageRect.top - containerRect.top - msgPadding;
        const width = messageRect.width + msgPadding * 2;
        const height = messageRect.height + msgPadding * 2;
        // Make the message area clickable
        const messageArea = {
            x: left,
            y: top,
            width: width,
            height: height,
        };
        // Store the message area for click detection
        window.messageArea = messageArea;
        if (message) {
            // Use height/2 for small message (more circular), smaller radius for multi-line text
            const radius = showFullMessage ? 20 * uiScale : height / 2;
            const messageFillColor = isHoveringMessage ? "rgba(255,255,255, 0.12)" : "rgba(255,255,255, 0.04)";
            drawRoundRect(left, top, width, height, radius, messageFillColor);
        }
    }
    // Draw SVG audio button in lower left
    const buttonSize = 40 * uiScale; // Size of the button area
    const iconSize = 20 * uiScale; // Size of the SVG icon
    const audioButtonX = 30 * uiScale;
    const audioButtonY = mainCanvasSize.y - 30 * uiScale - buttonSize;
    // Determine which icon to show
    const isMuted = window.audioMode === 0; // MUTE mode
    const audioIconImage = isMuted ? audioOffImage : audioOnImage;
    // Draw round button background (radius = half height for perfect circle)
    const audioFillColor = isHoveringAudio ? "rgba(255,255,255, 0.12)" : "rgba(255,255,255, 0.04)";
    drawRoundRect(audioButtonX, audioButtonY, buttonSize, buttonSize, buttonSize / 2, audioFillColor);
    // Draw the SVG icon on the overlay canvas
    if (audioIconImage && audioIconImage.complete) {
        const iconX = audioButtonX + (buttonSize - iconSize) / 2;
        const iconY = audioButtonY + (buttonSize - iconSize) / 2;
        const overlayCtx = overlayCanvas.getContext('2d');
        overlayCtx.drawImage(audioIconImage, iconX, iconY, iconSize, iconSize);
    }
    // Store the sound button area for click detection
    window.soundButtonArea = {
        x: audioButtonX,
        y: audioButtonY,
        width: buttonSize,
        height: buttonSize,
    };
    // Draw comet button above pplx button
    const cometButtonX = mainCanvasSize.x - 30 * uiScale - buttonSize;
    const cometButtonY = mainCanvasSize.y - 30 * uiScale - buttonSize - buttonSize - 15 * uiScale; // 15px gap
    // Draw round button background (radius = half height for perfect circle)
    const cometFillColor = isHoveringComet ? "rgba(255,255,255, 0.12)" : "rgba(255,255,255, 0.04)";
    drawRoundRect(cometButtonX, cometButtonY, buttonSize, buttonSize, buttonSize / 2, cometFillColor);
    // Draw the comet SVG icon on the overlay canvas
    if (cometImage && cometImage.complete) {
        const iconX = cometButtonX + (buttonSize - iconSize) / 2;
        const iconY = cometButtonY + (buttonSize - iconSize) / 2;
        const overlayCtx = overlayCanvas.getContext('2d');
        overlayCtx.drawImage(cometImage, iconX, iconY, iconSize, iconSize);
    }
    // Store the comet button area for click detection
    window.cometButtonArea = {
        x: cometButtonX,
        y: cometButtonY,
        width: buttonSize,
        height: buttonSize,
    };
    // Draw pplx button in lower right
    const pplxButtonX = mainCanvasSize.x - 30 * uiScale - buttonSize;
    const pplxButtonY = mainCanvasSize.y - 30 * uiScale - buttonSize;
    // Draw round button background (radius = half height for perfect circle)
    const pplxFillColor = isHoveringPplx ? "rgba(255,255,255, 0.12)" : "rgba(255,255,255, 0.04)";
    drawRoundRect(pplxButtonX, pplxButtonY, buttonSize, buttonSize, buttonSize / 2, pplxFillColor);
    // Draw the pplx SVG icon on the overlay canvas
    if (pplxImage && pplxImage.complete) {
        const iconX = pplxButtonX + (buttonSize - iconSize) / 2;
        const iconY = pplxButtonY + (buttonSize - iconSize) / 2;
        const overlayCtx = overlayCanvas.getContext('2d');
        overlayCtx.drawImage(pplxImage, iconX, iconY, iconSize, iconSize);
    }
    // Store the pplx button area for click detection
    window.pplxButtonArea = {
        x: pplxButtonX,
        y: pplxButtonY,
        width: buttonSize,
        height: buttonSize,
    };
    // Clean up any old soundButton text element
    const oldSoundButton = document.getElementById("soundButton");
    if (oldSoundButton)
        oldSoundButton.remove();
    if (showSaveButton) {
        // createUIText('save', 'S to save video, U to copy URL',
        //     mainCanvasSize.x/2, mainCanvasSize.y - 70 * uiScale, 20 * uiScale, 'white', 'center');
    }
    else {
        if (comet.inplay) {
            createUIText("save", i18n("controls_text"), mainCanvasSize.x / 2, mainCanvasSize.y - 70 * uiScale, UI_TEXT_SIZES.SAVE_TEXT, textPrimary, "center");
        }
        const saveEl = document.getElementById("save");
        if (saveEl)
            saveEl.remove();
    }
    combineCanvases();
}
export function toggleFullMessage() {
    showFullMessage = !showFullMessage;
}
