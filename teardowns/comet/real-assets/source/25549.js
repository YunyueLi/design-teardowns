// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { SCALE_FACTOR, colAttract, colRepel, gridEnabled, gridSpacing, gridOpacity, textPrimary, GALAXY_COUNT, MAX_AIM_DISTANCE, lerp, } from '../config/config.js';
import { stars, galaxys } from '../game/galaxy.js';
import { gameState, transitionData, comet, aim, lastShot, ringAnimations, currentGalaxy, camera, keyboardMode, keyboardAimAngle, keyboardAimPower, } from '../game/gameLogic.js';
import { globalTick } from '../game/main.js';
import { drawCircle, drawLine, drawTile, tile, overlayContext, vec2, rgb, mainContext, mainCanvasSize, cameraScale, time, textureInfos, worldToScreen, } from '../littlejs.esm.js';
// Rendering system - handles all visual drawing functions
// Load SVG noise image for background texture
const noiseImage = new window.Image();
const svgString = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="saturate" values="0.1"></feColorMatrix>
        <feComponentTransfer>
            <feFuncR type="linear" slope="0.7"></feFuncR>
            <feFuncG type="linear" slope="0.7"></feFuncG>
            <feFuncB type="linear" slope="0.7"></feFuncB>
            <feFuncA type="linear" slope="1.0"></feFuncA>
        </feComponentTransfer>
        <feComponentTransfer>
            <feFuncR type="linear" slope="3" intercept="-1.00"/>
            <feFuncG type="linear" slope="3" intercept="-1.00"/>
            <feFuncB type="linear" slope="3" intercept="-1.00"/>
        </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)"></rect>
</svg>
`;
noiseImage.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
let noiseLoaded = false;
noiseImage.onload = () => { noiseLoaded = true; };
function drawSpiralVortex(ctx, center, innerRadius, outerRadius, color, rotation = 0, revolutions = 4, lineWidth = 3, alpha = 0.5) {
    if (!ctx)
        return;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = lineWidth;
    let points = 64;
    for (let i = 0; i <= points; i++) {
        let t = (i / points) * Math.PI * 2 * revolutions;
        let r = innerRadius + (outerRadius - innerRadius) * (i / points);
        let angle = t + rotation;
        let x = center.x + Math.cos(angle) * r;
        let y = center.y + Math.sin(angle) * r;
        if (i === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
}
export function drawSpaceBackground() {
    // Create a space-like background with gradient and noise
    const ctx = mainContext;
    if (!ctx)
        return;
    const width = mainCanvasSize.x;
    const height = mainCanvasSize.y;
    // Use current galaxy to vary the background
    const galaxyIndex = currentGalaxy - 1;
    const hue = (galaxyIndex * 30) % 360; // Cycle through colors every 12 galaxies
    // Calculate gradient center with variation
    const centerX = width * (0.3 + Math.sin(galaxyIndex * 0.5) * 0.2);
    const centerY = height * (0.2 + Math.cos(galaxyIndex * 0.3) * 0.2);
    const endX = width * (0.7 + Math.sin(galaxyIndex * 0.7) * 0.1);
    const endY = height * (0.8 + Math.cos(galaxyIndex * 0.4) * 0.1);
    // Calculate the maximum distance from center to any corner to ensure full coverage
    const maxDistanceFromCenter = Math.sqrt(Math.max(Math.pow(centerX, 2) + Math.pow(centerY, 2), Math.pow(width - centerX, 2) + Math.pow(centerY, 2), Math.pow(centerX, 2) + Math.pow(height - centerY, 2), Math.pow(width - centerX, 2) + Math.pow(height - centerY, 2)));
    // Create gradient from deep space colors with galaxy-based variation
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, // Start position
    endX, endY, maxDistanceFromCenter * 1.2 // End position with extra margin
    );
    // Deep space gradient colors with galaxy-based hue variation
    const baseR = 12 + Math.sin((hue * Math.PI) / 180) * 3;
    const baseG = 6 + Math.cos((hue * Math.PI) / 180) * 2;
    const baseB = 22 + Math.sin(((hue + 120) * Math.PI) / 180) * 6;
    gradient.addColorStop(0, `rgba(${baseR + 3}, ${baseG + 1}, ${baseB + 3}, 1)`);
    gradient.addColorStop(0.3, `rgba(${baseR + 6}, ${baseG + 3}, ${baseB + 8}, 1)`);
    gradient.addColorStop(0.6, `rgba(${baseR + 3}, ${baseG + 2}, ${baseB + 5}, 1)`);
    gradient.addColorStop(1, `rgba(${baseR - 3}, ${baseG - 2}, ${baseB - 5}, 1)`);
    // Fill the entire canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // Add some very subtle nebula-like areas with galaxy-based variation
    const nebulaCount = 3;
    for (let i = 0; i < nebulaCount; i++) {
        const x = (i * 0.3 + 0.1 + Math.sin(galaxyIndex * 0.2 + i) * 0.1) * width;
        const y = (i * 0.4 + 0.1 + Math.cos(galaxyIndex * 0.3 + i) * 0.1) * height;
        const radius = (0.1 + Math.random() * 0.2) * Math.max(width, height);
        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        nebulaGradient.addColorStop(0, `rgba(${baseR + 12}, ${baseG + 6}, ${baseB + 20}, 0.08)`);
        nebulaGradient.addColorStop(0.5, `rgba(${baseR + 6}, ${baseG + 3}, ${baseB + 12}, 0.04)`);
        nebulaGradient.addColorStop(1, `rgba(${baseR}, ${baseG}, ${baseB + 3}, 0)`);
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, width, height);
    }
    // Draw SVG noise texture over the background
    if (noiseLoaded) {
        ctx.save();
        ctx.globalAlpha = 0.088; // Adjust for subtlety
        ctx.drawImage(noiseImage, 0, 0, width, height);
        ctx.restore();
    }
}
function drawGrid() {
    // Skip if disabled or spacing too small
    if (!gridEnabled || gridSpacing <= 0)
        return;
    const ctx = mainContext;
    if (!ctx)
        return;
    const spacing = Math.max(5, gridSpacing); // world-space spacing
    // Calculate the extents of the current view in world coordinates
    const halfWidthWorld = mainCanvasSize.x / (2 * cameraScale);
    const halfHeightWorld = mainCanvasSize.y / (2 * cameraScale);
    const worldMinX = camera.x - halfWidthWorld;
    const worldMaxX = camera.x + halfWidthWorld;
    const worldMinY = camera.y - halfHeightWorld;
    const worldMaxY = camera.y + halfHeightWorld;
    // Find the first grid line to draw so we align perfectly
    const startX = Math.floor(worldMinX / spacing) * spacing;
    const startY = Math.floor(worldMinY / spacing) * spacing;
    // Scale dot size with camera zoom, but clamp to reasonable bounds
    const baseDotSize = 2;
    const dotSize = Math.max(1, Math.min(8, baseDotSize * cameraScale));
    ctx.save();
    // Render in screen space (identity transform)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(255,255,255,${gridOpacity})`;
    // Iterate through visible world cells and draw dots
    for (let wx = startX; wx <= worldMaxX; wx += spacing) {
        for (let wy = startY; wy <= worldMaxY; wy += spacing) {
            // Use the proper worldToScreen function for consistent coordinate conversion
            const screenPos = worldToScreen(vec2(wx, wy));
            // Skip if outside visible area
            if (screenPos.x < -dotSize || screenPos.x > mainCanvasSize.x + dotSize ||
                screenPos.y < -dotSize || screenPos.y > mainCanvasSize.y + dotSize)
                continue;
            ctx.fillRect(screenPos.x - dotSize / 2, screenPos.y - dotSize / 2, dotSize, dotSize);
        }
    }
    ctx.restore();
}
export function drawStars() {
    // Draw space background first
    drawSpaceBackground();
    // Optional grid overlay (drawn above background, below stars)
    if (gridEnabled) {
        drawGrid();
    }
    // Draw stars
    for (const star of stars) {
        const parallaxX = (camera.x / star.z) * 20;
        const parallaxY = (camera.y / star.z) * 20;
        const screenX = star.x - parallaxX;
        const screenY = star.y - parallaxY;
        drawCircle(vec2(screenX, screenY), star.size, rgb(1, 1, 1, star.brightness));
    }
}
export function drawGalaxies() {
    // Draw galaxies
    if (gameState === "animating" && transitionData.prevGalaxy !== undefined) {
        drawGalaxy(galaxys[transitionData.prevGalaxy]);
    }
    drawGalaxy(galaxys[currentGalaxy - 1]);
    if (currentGalaxy < GALAXY_COUNT) {
        drawGalaxy(galaxys[currentGalaxy]);
    }
}
function drawGalaxy(galaxy) {
    // Draw planets
    for (const planet of galaxy.planets) {
        // Only update planet position for orbits if this is a 'moving' stage
        if (galaxy.moving &&
            planet.orbitRadius &&
            planet.orbitOmega &&
            planet.orbitPhase !== undefined &&
            planet.orbitCenterX !== undefined &&
            planet.orbitCenterY !== undefined) {
            const theta = planet.orbitPhase + planet.orbitOmega * globalTick;
            planet.x = planet.orbitCenterX + Math.cos(theta) * planet.orbitRadius;
            planet.y = planet.orbitCenterY + Math.sin(theta) * planet.orbitRadius;
        }
        else if (!galaxy.moving &&
            planet.orbitCenterX !== undefined &&
            planet.orbitCenterY !== undefined) {
            planet.x = planet.orbitCenterX;
            planet.y = planet.orbitCenterY;
        }
        // Draw gravity field as concentric circles
        let colArea = planet.isRepeller ? colRepel : colAttract;
        let colAlpha = planet.isRepeller ? 0.2 : 0.15;
        // Calculate the gravity field range
        const gravityFieldStart = planet.radius - 3 * SCALE_FACTOR;
        const gravityFieldEnd = planet.radius + (planet.gravityRadius - planet.radius) * 1.0;
        const gravityFieldRange = gravityFieldEnd - gravityFieldStart;
        // Settings for concentric circles
        const circleSpacing = 15 * SCALE_FACTOR; // Spacing between circles
        const numCircles = Math.floor(gravityFieldRange / circleSpacing);
        const effectiveRange = numCircles * circleSpacing;
        // Animation timing
        const animationSpeed = 1;
        const animationProgress = (time * animationSpeed) % 1;
        const radiusOffset = animationProgress * circleSpacing;
        for (let i = 0; i < numCircles; i++) {
            let animatedRadius;
            const baseRadius = gravityFieldStart + i * circleSpacing;
            if (planet.isRepeller) {
                // Repellers: circles animate outward
                animatedRadius = baseRadius + radiusOffset;
                if (animatedRadius > gravityFieldStart + effectiveRange) {
                    animatedRadius -= effectiveRange;
                }
            }
            else {
                // Attractors: circles animate inward
                animatedRadius = baseRadius - radiusOffset;
                if (animatedRadius < gravityFieldStart) {
                    animatedRadius += effectiveRange;
                }
            }
            // Get distance from start of field
            const distance = animatedRadius - gravityFieldStart;
            if (distance < 0 || distance > effectiveRange)
                continue;
            // Lerp thickness over the last 25% of the distance
            const maxThickness = 2 * SCALE_FACTOR;
            const lerpStart = effectiveRange * 0.75;
            let thickness = maxThickness;
            if (distance > lerpStart && effectiveRange - lerpStart > 0) {
                const progress = (distance - lerpStart) / (effectiveRange - lerpStart);
                thickness = lerp(maxThickness, 0, progress);
            }
            // Draw the concentric circle as an outline with constant alpha
            drawCircle(vec2(planet.x, planet.y), animatedRadius, colArea.scale(1, 0), thickness, colArea.scale(1, colAlpha));
        }
        // Check if tiles are available, otherwise fallback to circles
        if (textureInfos.length > 0 && textureInfos[0]) {
            // Draw planet with tiles
            const spriteSize = vec2(planet.radius * 2, planet.radius * 2);
            const tileInfo = tile(planet.spriteIndex, vec2(256, 256), 0);
            drawTile(vec2(planet.x, planet.y), spriteSize, tileInfo, planet.color, planet.rotation);
        }
        else {
            // Draw planet with full opacity color
            drawCircle(vec2(planet.x, planet.y), planet.radius, planet.color);
        }
        // Draw semi-opaque circle around planet edge for better visibility
        const edgeRadius = planet.radius + comet.radius;
        const edgeColor = rgb(planet.color.r, planet.color.g, planet.color.b, 0.15);
        drawCircle(vec2(planet.x, planet.y), edgeRadius, edgeColor);
    }
    // Draw wormholes
    if (galaxy.wormholes) {
        for (const wormhole of galaxy.wormholes) {
            if (wormhole.used)
                continue; // Skip used wormholes
            // Draw outer glow
            drawCircle(vec2(wormhole.x, wormhole.y), wormhole.radius + comet.radius, wormhole.glowColor);
            // Draw outer glow
            drawCircle(vec2(wormhole.x, wormhole.y), wormhole.radius + comet.radius / 4, wormhole.color);
            // Draw main wormhole circle
            const center = vec2(wormhole.x, wormhole.y);
            drawCircle(center, wormhole.radius, wormhole.color);
            // Find paired wormhole once
            const pairedWormhole = galaxy.wormholes.find((w) => w.pairIndex === wormhole.pairIndex && w !== wormhole && !w.used);
            // Set up clipping region for custom wormhole interior drawing
            const ctx = mainContext;
            if (!ctx)
                return;
            ctx.save();
            const screenPos = worldToScreen(vec2(wormhole.x, wormhole.y));
            const r = wormhole.radius * cameraScale;
            ctx.beginPath();
            ctx.arc(screenPos.x, screenPos.y, r, 0, 2 * Math.PI);
            ctx.clip();
            // Draw a line from this wormhole center to its paired wormhole center (clipped)
            if (galaxy.wormholes && galaxy.wormholes.length > 1) {
                const pairedWormhole = galaxy.wormholes.find((w) => w.pairIndex === wormhole.pairIndex && w !== wormhole && !w.used);
                if (pairedWormhole) {
                    const pairedScreenPos = worldToScreen(vec2(pairedWormhole.x, pairedWormhole.y));
                    // Main direction from paired to this
                    const dx = screenPos.x - pairedScreenPos.x;
                    const dy = screenPos.y - pairedScreenPos.y;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const mainAngle = Math.atan2(dy, dx);
                    const r = wormhole.radius * cameraScale;
                    const pairedR = pairedWormhole.radius * cameraScale;
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.lineWidth = 2 * SCALE_FACTOR;
                    // Main line
                    const mainStartX = screenPos.x + (dx / len) * r;
                    const mainStartY = screenPos.y + (dy / len) * r;
                    ctx.beginPath();
                    ctx.moveTo(mainStartX, mainStartY);
                    ctx.lineTo(pairedScreenPos.x, pairedScreenPos.y);
                    ctx.stroke();
                    // Side lines: ±°
                    const angleOffsets = [Math.PI / 4, -Math.PI / 4];
                    for (const offset of angleOffsets) {
                        // Start at this wormhole, offset by ±
                        const startAngle = mainAngle + offset;
                        const startX = screenPos.x + Math.cos(startAngle) * r;
                        const startY = screenPos.y + Math.sin(startAngle) * r;
                        // End at paired wormhole, offset by ∓, but further from the center
                        const endAngle = mainAngle - offset * 2; // opposite sign
                        const endX = pairedScreenPos.x + Math.cos(endAngle) * pairedR * 3;
                        const endY = pairedScreenPos.y + Math.sin(endAngle) * pairedR * 3;
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.stroke();
                    }
                    // Draw two circles of different radii, each at its corresponding distance toward the paired wormhole, filled with a radial gradient (clipped)
                    const dx2 = pairedScreenPos.x - screenPos.x;
                    const dy2 = pairedScreenPos.y - screenPos.y;
                    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    const radii = [wormhole.radius * 1.1 * cameraScale, wormhole.radius * cameraScale];
                    const dists = [0.44 * wormhole.radius * cameraScale, 1.04 * wormhole.radius * cameraScale];
                    for (let i = 0; i < dists.length; i++) {
                        const dist = dists[i];
                        const radius = radii[i];
                        const circleCx = screenPos.x + (dx2 / len2) * dist;
                        const circleCy = screenPos.y + (dy2 / len2) * dist;
                        const grad = ctx.createRadialGradient(circleCx, circleCy, 0, circleCx, circleCy, radius);
                        grad.addColorStop(0, 'rgba(0,0,0,1)');
                        grad.addColorStop(1, 'rgba(0,0,0,0)');
                        ctx.globalAlpha = 0.6;
                        ctx.beginPath();
                        ctx.arc(circleCx, circleCy, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = grad;
                        ctx.fill();
                        // Draw white outline (clipped)
                        ctx.globalAlpha = 1.0;
                        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                        ctx.lineWidth = 1.2 * SCALE_FACTOR;
                        ctx.beginPath();
                        ctx.arc(circleCx, circleCy, radius, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
            // Draw connecting line to paired wormhole (series of circles)
            if (pairedWormhole) {
                const start = vec2(wormhole.x, wormhole.y);
                const end = vec2(pairedWormhole.x, pairedWormhole.y);
                const dx = end.x - start.x;
                const dy = end.y - start.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Decide number of circles: proportional to distance, always odd, min 3
                const minCircles = 3;
                const circleSpacing = wormhole.radius * 3 * SCALE_FACTOR; // adjust for density
                let numCircles = Math.max(minCircles, Math.round(dist / circleSpacing * 2));
                if (numCircles % 2 === 0)
                    numCircles += 1; // ensure odd
                // Draw circles along the line
                for (let i = 0; i < numCircles; i++) {
                    const t = i / (numCircles - 1); // 0 to 1
                    const x = start.x + dx * t;
                    const y = start.y + dy * t;
                    // Lerp size: largest at ends, smallest at center
                    const fromEnd = Math.abs(0.5 - t) * 2; // 1 at ends, 0 at center
                    const radius = lerp(wormhole.radius * 0.2, wormhole.radius, fromEnd);
                    drawCircle(vec2(x, y), radius, rgb(1, 1, 1, 0), // transparent fill
                    1 * SCALE_FACTOR, // outline thickness
                    rgb(1, 1, 1, 0.1) // white stroke
                    );
                }
            }
        }
    }
    // Draw wormhole ring animations (entry/exit)
    if (typeof ringAnimations !== 'undefined' && Array.isArray(ringAnimations)) {
        for (const anim of ringAnimations) {
            const t = Math.min(1, anim.elapsed / anim.duration);
            let radius, alpha;
            if (anim.fadeIn) {
                // Entry: fade in and shrink
                radius = lerp(anim.startRadius, anim.endRadius, t);
                alpha = t;
            }
            else {
                // Exit: fade out and grow
                radius = lerp(anim.startRadius, anim.endRadius, t);
                alpha = 1 - t;
            }
            drawRingEffect(vec2(anim.x, anim.y), radius, anim.color, alpha, anim.thickness !== undefined ? anim.thickness : 25 * SCALE_FACTOR, anim.fillColor !== undefined ? anim.fillColor : null);
        }
    }
    // Draw black hole
    const bh = galaxy.blackHole;
    // Draw outer pull radius with dynamic opacity
    const pullOpacity = 0.2 + 0.1 * Math.sin(time * 2);
    drawCircle(vec2(bh.x, bh.y), bh.pullRadius * 1, rgb(0.15, 0.15, 0.15, pullOpacity));
    // Draw gradient glow with multiple circles fading outwards
    const baseGlowSize = bh.radius + comet.radius / 2;
    const numGlowLayers = 20;
    const glowSpacing = 5 * SCALE_FACTOR;
    for (let i = 0; i < numGlowLayers; i++) {
        const glowRadius = baseGlowSize + i * glowSpacing;
        const alpha = 0.06 * (1 - i / numGlowLayers); // Fade to 0
        if (alpha > 0.01) {
            // Only draw if visible
            drawCircle(vec2(bh.x, bh.y), glowRadius, rgb(1, 1, 0.8, alpha));
        }
    }
    // Draw the black hole core with pulsing effect
    const pulseOpacity = 0.8 + 0.1 * Math.sin(time * 4);
    drawCircle(vec2(bh.x, bh.y), comet.radius * 2, rgb(0, 0, 0, 1));
    // Draw spiral vortex in the center of the black hole (single arm)
    const bhScreen = worldToScreen(vec2(bh.x, bh.y));
    drawSpiralVortex(mainContext, bhScreen, comet.radius * 0.5 * cameraScale, comet.radius * 1.7 * cameraScale, 'rgba(16,16,16, 1)', time * 1.5, // rotation
    3, // revolutions
    3, // lineWidth
    0.25 // alpha
    );
}
export function drawComet() {
    // Draw comet trail
    for (let i = 0; i < comet.trail.length - 1; i++) {
        const alpha = i / comet.trail.length;
        const current = comet.trail[i];
        const next = comet.trail[i + 1];
        drawLine(vec2(current.x, current.y), vec2(next.x, next.y), comet.radius * (2 * alpha), rgb(1, 1, 0.8, alpha * 0.35));
    }
    // Draw comet
    const cometTileInfo = tile(10, vec2(256, 256), 0);
    const cometTileScale = 1.19;
    const cometSize = vec2(comet.radius * 2 * cometTileScale, comet.radius * 2 * cometTileScale);
    drawCircle(vec2(comet.x, comet.y), comet.radius * 1.5, rgb(1, 1, 0.8, 0.2));
    if (gameState === "animating") {
        const pulseScale = 1 + 0.3 * Math.sin(time * 8);
        drawTile(vec2(comet.x, comet.y), cometSize.scale(pulseScale), cometTileInfo, rgb(1, 1, 0.8, 1), 0);
    }
    else {
        // Comet itself
        drawTile(vec2(comet.x, comet.y), cometSize, cometTileInfo, rgb(1, 1, 0.8, 1), 0);
        // Outer glow circle with pulse only in aiming mode
        if (gameState === "aiming") {
            const pulseScale = 1 + 0.1 * Math.sin(time * 3);
            drawCircle(vec2(comet.x, comet.y), comet.radius * 2 * pulseScale, rgb(1, 1, 0.8, 0.1));
        }
    }
}
export function drawAimLines() {
    // Draw aim lines only when actively aiming
    if (gameState === "aiming") {
        if (lastShot.active) {
            drawLine(vec2(lastShot.startX, lastShot.startY), vec2(lastShot.endX, lastShot.endY), 4 * SCALE_FACTOR, rgb(1, 1, 1, 0.3));
            drawCircle(vec2(lastShot.startX, lastShot.startY), lastShot.power * 30 * SCALE_FACTOR, rgb(0.8, 0.8, 0.8, 0.2));
        }
        if (aim.active) {
            drawLine(vec2(aim.startX, aim.startY), vec2(aim.endX, aim.endY), 4 * SCALE_FACTOR, rgb(1, 0.9, 0, 0.6));
            drawCircle(vec2(aim.startX, aim.startY), aim.power * 30 * SCALE_FACTOR, rgb(1, 0.9, 0, 0.6));
        }
        else if (keyboardMode) {
            // Draw keyboard mode aim even when not actively pressing keys
            const dist = keyboardAimPower * MAX_AIM_DISTANCE;
            const endX = comet.x + Math.cos(keyboardAimAngle) * dist;
            const endY = comet.y + Math.sin(keyboardAimAngle) * dist;
            drawLine(vec2(comet.x, comet.y), vec2(endX, endY), 4 * SCALE_FACTOR, rgb(1, 0.9, 0, 0.6));
            drawCircle(vec2(comet.x, comet.y), keyboardAimPower * 30 * SCALE_FACTOR, rgb(1, 0.9, 0, 0.6));
        }
    }
}
function drawRingEffect(position, radius, color, alpha = 1, thickness = 25 * SCALE_FACTOR, fillColor = null) {
    // Draw a soft, colored ring at the given position and radius
    // color: Color object (should support .scale)
    // position: Vector2 (screen coordinates)
    // radius: number (pixels)
    // alpha: number (0-1)
    // thickness: number (pixels)
    // fillColor: Color object or null
    if (fillColor && fillColor.a > 0) {
        // Animate fill alpha with the ring's alpha
        let animatedFill = fillColor.scale(1, fillColor.a * alpha);
        drawCircle(position, radius, animatedFill, 0 // fill only
        );
    }
    drawCircle(position, radius, color.scale(1, 0), thickness, color.scale(1, alpha / 5));
}
export function drawRoundRect(x, y, w, h, r = 16, fillColor = "rgba(255,255,255, 0.04)", strokeColor = textPrimary.replace(/[\d.]+\)$/, "0.7)"), strokeWidth = 2) {
    const ctx = overlayContext;
    ctx.save();
    // Draw main rectangle
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor && strokeWidth > 0) {
        ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, "0.1)");
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
    ctx.restore();
}
