// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { SCREEN_WIDTH, SCREEN_HEIGHT, CLUSTER_SPACING, GALAXY_COUNT, STAR_COUNT, SCALE_FACTOR, GRAVITY_RADIUS_MULTIPLIER, seededRandom, planetColors, PLANET_SPRITE_COUNT } from '../config/config.js';
import { isPositionSafe, isPositionSafeFromBlackHole } from './physics.js';
import { currentUniverse } from './gameLogic.js';
import { rgb } from '../littlejs.esm.js';
// Galaxy and star generation system
export let stars = [];
export let galaxys = [];
export function generateStars() {
    stars = [];
    // Calculate the vertical range needed to cover all galaxies
    const verticalRange = SCREEN_HEIGHT * 2; // Double the screen height to cover up/down movement
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * (SCREEN_WIDTH / 2 + CLUSTER_SPACING * GALAXY_COUNT) - SCREEN_WIDTH,
            y: Math.random() * verticalRange - verticalRange / 2, // Center the vertical range around 0
            z: Math.random() * 90 + 10,
            brightness: Math.random() * 0.7 + 0.3,
            size: (Math.random() * 2 + 0.5) * SCALE_FACTOR
        });
    }
}
// Planet arrangement strategies
export function arrangePlanetsCircular(galaxy, i, planetCount, centralRadius) {
    for (let j = 0; j < planetCount; j++) {
        let planetPlaced = false;
        let attempts = 0;
        const maxAttempts = 200;
        while (!planetPlaced && attempts < maxAttempts) {
            let angle, distance, radius;
            if (attempts < 50) {
                // Circular arrangement with some randomness
                angle = (j / planetCount) * Math.PI * 2 + (seededRandom(i * 17 + j + attempts) - 0.5) * 0.3;
                distance = centralRadius + (seededRandom(i * 19 + j + attempts) - 0.5) * 80 * SCALE_FACTOR;
            }
            else {
                // Random placement with increased spacing
                angle = seededRandom(i * 23 + j + attempts) * Math.PI * 2;
                distance = centralRadius * (1 + seededRandom(i * 29 + j + attempts) * 0.8);
            }
            radius = (seededRandom(i * 31 + j + attempts) * 45 + 25) * SCALE_FACTOR;
            const planetX = galaxy.x + Math.cos(angle) * distance;
            const planetY = galaxy.y + Math.sin(angle) * distance;
            if (isPositionSafe(planetX, planetY, radius, galaxy.planets)) {
                const mass = radius * 20;
                const isRepeller = seededRandom(i * 37 + j) < 0.2;
                // Pick a color from the palette using seeded random
                const colorIndex = Math.floor(seededRandom(i * 53 + j) * planetColors.length);
                const baseColor = planetColors[colorIndex];
                // Create LittleJS color object with full opacity for the planet itself
                const planetColor = rgb(baseColor.r, baseColor.g, baseColor.b, 1.0);
                // Add orbital motion parameters for all arrangements
                const orbitRadius = (seededRandom(i * 71 + j) * 30 + 10) * SCALE_FACTOR;
                const orbitOmega = (seededRandom(i * 73 + j) * 0.005 + 0.002) * (seededRandom(i * 79 + j) < 0.5 ? 1 : -1);
                const orbitPhase = seededRandom(i * 83 + j) * Math.PI * 2;
                const planet = {
                    x: planetX,
                    y: planetY,
                    angle: angle,
                    distance: distance,
                    radius: radius,
                    mass: mass,
                    gravityRadius: radius + Math.sqrt(mass) * GRAVITY_RADIUS_MULTIPLIER,
                    color: planetColor,
                    gravityColor: rgb(baseColor.r, baseColor.g, baseColor.b, baseColor.a),
                    isRepeller: isRepeller,
                    spriteIndex: Math.floor(seededRandom(i * 59 + j) * PLANET_SPRITE_COUNT),
                    // Orbital motion parameters
                    orbitCenterX: planetX,
                    orbitCenterY: planetY,
                    orbitRadius: orbitRadius,
                    orbitOmega: orbitOmega,
                    orbitPhase: orbitPhase,
                };
                galaxy.planets.push(planet);
                planetPlaced = true;
            }
            attempts++;
        }
    }
}
export function arrangePlanetsSpiral(galaxy, i, planetCount, centralRadius) {
    const spiralTightness = 0.2 + seededRandom(i * 13) * 0.3;
    const spiralArms = 2 + Math.floor(seededRandom(i * 17) * 2);
    for (let j = 0; j < planetCount; j++) {
        let planetPlaced = false;
        let attempts = 0;
        const maxAttempts = 200;
        while (!planetPlaced && attempts < maxAttempts) {
            const baseAngle = (j / planetCount) * Math.PI * 2;
            const spiralOffset = (j / planetCount) * Math.PI * 3 * spiralTightness;
            const armOffset = Math.floor(seededRandom(i * 19 + j) * spiralArms) * (Math.PI * 2 / spiralArms);
            const angle = baseAngle + spiralOffset + armOffset;
            const distance = centralRadius * (1 + (j / planetCount) * 0.4);
            const radius = (seededRandom(i * 31 + j + attempts) * 45 + 25) * SCALE_FACTOR;
            const planetX = galaxy.x + Math.cos(angle) * distance;
            const planetY = galaxy.y + Math.sin(angle) * distance;
            if (isPositionSafe(planetX, planetY, radius, galaxy.planets)) {
                const mass = radius * 20;
                const isRepeller = seededRandom(i * 37 + j) < 0.2;
                const colorIndex = Math.floor(seededRandom(i * 53 + j) * planetColors.length);
                const baseColor = planetColors[colorIndex];
                const planetColor = rgb(baseColor.r, baseColor.g, baseColor.b, 1.0);
                // Add orbital motion parameters for all arrangements
                const orbitRadius = (seededRandom(i * 71 + j) * 30 + 10) * SCALE_FACTOR;
                const orbitOmega = (seededRandom(i * 73 + j) * 0.005 + 0.002) * (seededRandom(i * 79 + j) < 0.5 ? 1 : -1);
                const orbitPhase = seededRandom(i * 83 + j) * Math.PI * 2;
                const planet = {
                    x: planetX,
                    y: planetY,
                    angle: angle,
                    distance: distance,
                    radius: radius,
                    mass: mass,
                    gravityRadius: radius + Math.sqrt(mass) * GRAVITY_RADIUS_MULTIPLIER,
                    color: planetColor,
                    gravityColor: rgb(baseColor.r, baseColor.g, baseColor.b, baseColor.a),
                    isRepeller: isRepeller,
                    spriteIndex: Math.floor(seededRandom(i * 59 + j) * PLANET_SPRITE_COUNT),
                    // Orbital motion parameters
                    orbitCenterX: planetX,
                    orbitCenterY: planetY,
                    orbitRadius: orbitRadius,
                    orbitOmega: orbitOmega,
                    orbitPhase: orbitPhase,
                };
                galaxy.planets.push(planet);
                planetPlaced = true;
            }
            attempts++;
        }
    }
}
export function arrangePlanetsRings(galaxy, i, planetCount, centralRadius) {
    const ringCount = 2 + Math.floor(seededRandom(i * 11) * 2);
    const planetsPerRing = Math.ceil(planetCount / ringCount);
    for (let ring = 0; ring < ringCount; ring++) {
        const ringRadius = centralRadius * (1 + ring * 0.5);
        const ringPlanetCount = Math.min(planetsPerRing, planetCount - ring * planetsPerRing);
        for (let j = 0; j < ringPlanetCount; j++) {
            let planetPlaced = false;
            let attempts = 0;
            const maxAttempts = 200;
            while (!planetPlaced && attempts < maxAttempts) {
                const angle = (j / ringPlanetCount) * Math.PI * 2 + (seededRandom(i * 17 + ring + j) - 0.5) * 0.2;
                const radius = (seededRandom(i * 31 + ring + j) * 45 + 25) * SCALE_FACTOR;
                const planetX = galaxy.x + Math.cos(angle) * ringRadius;
                const planetY = galaxy.y + Math.sin(angle) * ringRadius;
                if (isPositionSafe(planetX, planetY, radius, galaxy.planets)) {
                    const mass = radius * 20;
                    const isRepeller = seededRandom(i * 37 + ring + j) < 0.2;
                    const colorIndex = Math.floor(seededRandom(i * 53 + ring + j) * planetColors.length);
                    const baseColor = planetColors[colorIndex];
                    const planetColor = rgb(baseColor.r, baseColor.g, baseColor.b, 1.0);
                    // Add orbital motion parameters for all arrangements
                    const orbitRadius = (seededRandom(i * 71 + ring + j) * 30 + 10) * SCALE_FACTOR;
                    const orbitOmega = (seededRandom(i * 73 + ring + j) * 0.005 + 0.002) * (seededRandom(i * 79 + ring + j) < 0.5 ? 1 : -1);
                    const orbitPhase = seededRandom(i * 83 + ring + j) * Math.PI * 2;
                    const planet = {
                        x: planetX,
                        y: planetY,
                        angle: angle,
                        distance: ringRadius,
                        radius: radius,
                        mass: mass,
                        gravityRadius: radius + Math.sqrt(mass) * GRAVITY_RADIUS_MULTIPLIER,
                        color: planetColor,
                        gravityColor: rgb(baseColor.r, baseColor.g, baseColor.b, baseColor.a),
                        isRepeller: isRepeller,
                        spriteIndex: Math.floor(seededRandom(i * 59 + ring + j) * PLANET_SPRITE_COUNT),
                        // Orbital motion parameters
                        orbitCenterX: planetX,
                        orbitCenterY: planetY,
                        orbitRadius: orbitRadius,
                        orbitOmega: orbitOmega,
                        orbitPhase: orbitPhase,
                    };
                    galaxy.planets.push(planet);
                    planetPlaced = true;
                }
                attempts++;
            }
        }
    }
}
export function arrangePlanetsBinary(galaxy, i, planetCount, centralRadius) {
    const pairCount = Math.floor(planetCount / 2);
    const remainingPlanets = planetCount % 2;
    for (let pair = 0; pair < pairCount; pair++) {
        let pairPlaced = false;
        let attempts = 0;
        const maxAttempts = 200;
        while (!pairPlaced && attempts < maxAttempts) {
            const pairAngle = seededRandom(i * 17 + pair) * Math.PI * 2;
            const pairDistance = centralRadius * (0.6 + seededRandom(i * 19 + pair) * 0.4);
            const radius1 = (seededRandom(i * 31 + pair) * 45 + 25) * SCALE_FACTOR;
            const planet1X = galaxy.x + Math.cos(pairAngle) * pairDistance;
            const planet1Y = galaxy.y + Math.sin(pairAngle) * pairDistance;
            if (isPositionSafe(planet1X, planet1Y, radius1, galaxy.planets)) {
                const orbitRadius = radius1 * 3.0;
                const orbitAngle = pairAngle + Math.PI + (seededRandom(i * 23 + pair) - 0.5) * 0.3;
                const radius2 = (seededRandom(i * 29 + pair) * 45 + 25) * SCALE_FACTOR;
                const planet2X = planet1X + Math.cos(orbitAngle) * orbitRadius;
                const planet2Y = planet1Y + Math.sin(orbitAngle) * orbitRadius;
                if (isPositionSafe(planet2X, planet2Y, radius2, galaxy.planets)) {
                    for (let p = 0; p < 2; p++) {
                        const isFirst = p === 0;
                        const x = isFirst ? planet1X : planet2X;
                        const y = isFirst ? planet1Y : planet2Y;
                        const radius = isFirst ? radius1 : radius2;
                        const mass = radius * 20;
                        const isRepeller = seededRandom(i * 37 + pair + p) < 0.2;
                        const colorIndex = Math.floor(seededRandom(i * 53 + pair + p) * planetColors.length);
                        const baseColor = planetColors[colorIndex];
                        const planetColor = rgb(baseColor.r, baseColor.g, baseColor.b, 1.0);
                        // Add orbital motion parameters for all arrangements
                        const orbitRadius = (seededRandom(i * 71 + pair + p) * 30 + 10) * SCALE_FACTOR;
                        const orbitOmega = (seededRandom(i * 73 + pair + p) * 0.005 + 0.002) * (seededRandom(i * 79 + pair + p) < 0.5 ? 1 : -1);
                        const orbitPhase = seededRandom(i * 83 + pair + p) * Math.PI * 2;
                        const planet = {
                            x: x,
                            y: y,
                            angle: Math.atan2(y - galaxy.y, x - galaxy.x),
                            distance: Math.sqrt((x - galaxy.x) ** 2 + (y - galaxy.y) ** 2),
                            radius: radius,
                            mass: mass,
                            gravityRadius: radius + Math.sqrt(mass) * GRAVITY_RADIUS_MULTIPLIER,
                            color: planetColor,
                            gravityColor: rgb(baseColor.r, baseColor.g, baseColor.b, baseColor.a),
                            isRepeller: isRepeller,
                            spriteIndex: Math.floor(seededRandom(i * 59 + pair + p) * PLANET_SPRITE_COUNT),
                            // Orbital motion parameters
                            orbitCenterX: x,
                            orbitCenterY: y,
                            orbitRadius: orbitRadius,
                            orbitOmega: orbitOmega,
                            orbitPhase: orbitPhase,
                        };
                        galaxy.planets.push(planet);
                    }
                    pairPlaced = true;
                }
            }
            attempts++;
        }
    }
    if (remainingPlanets > 0) {
        let planetPlaced = false;
        let attempts = 0;
        const maxAttempts = 200;
        while (!planetPlaced && attempts < maxAttempts) {
            const angle = seededRandom(i * 71) * Math.PI * 2;
            const distance = centralRadius * (1 + seededRandom(i * 73) * 0.4);
            const radius = (seededRandom(i * 79) * 45 + 25) * SCALE_FACTOR;
            const planetX = galaxy.x + Math.cos(angle) * distance;
            const planetY = galaxy.y + Math.sin(angle) * distance;
            if (isPositionSafe(planetX, planetY, radius, galaxy.planets)) {
                const mass = radius * 20;
                const isRepeller = seededRandom(i * 83) < 0.2;
                const colorIndex = Math.floor(seededRandom(i * 89) * planetColors.length);
                const baseColor = planetColors[colorIndex];
                const planetColor = rgb(baseColor.r, baseColor.g, baseColor.b, 1.0);
                // Add orbital motion parameters for all arrangements
                const orbitRadius = (seededRandom(i * 71 + attempts) * 30 + 10) * SCALE_FACTOR;
                const orbitOmega = (seededRandom(i * 73 + attempts) * 0.005 + 0.002) * (seededRandom(i * 79 + attempts) < 0.5 ? 1 : -1);
                const orbitPhase = seededRandom(i * 83 + attempts) * Math.PI * 2;
                const planet = {
                    x: planetX,
                    y: planetY,
                    angle: angle,
                    distance: distance,
                    radius: radius,
                    mass: mass,
                    gravityRadius: radius + Math.sqrt(mass) * GRAVITY_RADIUS_MULTIPLIER,
                    color: planetColor,
                    gravityColor: rgb(baseColor.r, baseColor.g, baseColor.b, baseColor.a),
                    isRepeller: isRepeller,
                    spriteIndex: Math.floor(seededRandom(i * 97) * PLANET_SPRITE_COUNT),
                    // Orbital motion parameters
                    orbitCenterX: planetX,
                    orbitCenterY: planetY,
                    orbitRadius: orbitRadius,
                    orbitOmega: orbitOmega,
                    orbitPhase: orbitPhase,
                };
                galaxy.planets.push(planet);
                planetPlaced = true;
            }
            attempts++;
        }
    }
}
export function generateGalaxies() {
    galaxys = [];
    for (let i = 1; i <= GALAXY_COUNT; i++) {
        const verticalOffset = (seededRandom(currentUniverse * 2000 + i * 13) - 0.5) * SCREEN_HEIGHT;
        const galaxy = {
            x: (i - 1) * CLUSTER_SPACING,
            y: verticalOffset,
            planets: []
        };
        // Deterministically select some stages as 'moving'
        galaxy.moving = seededRandom(currentUniverse * 3000 + i * 97) < 0.25;
        const planetCount = Math.floor(seededRandom(currentUniverse * 1000 + i * 7) * 4) + 4; // 4-7 planets
        const centralRadius = (seededRandom(i * 11) * 220 + 80) * SCALE_FACTOR;
        // Choose arrangement strategy based on galaxy number
        const strategy = i % 4; // Cycle through different strategies
        let typeName;
        switch (strategy) {
            case 0:
                typeName = 'Circular';
                arrangePlanetsCircular(galaxy, i, planetCount, centralRadius);
                break;
            case 1:
                typeName = 'Spiral';
                arrangePlanetsSpiral(galaxy, i, planetCount, centralRadius);
                break;
            case 2:
                typeName = 'Rings';
                arrangePlanetsRings(galaxy, i, planetCount, centralRadius);
                break;
            case 3:
                typeName = 'Binary';
                arrangePlanetsBinary(galaxy, i, planetCount, centralRadius);
                break;
        }
        galaxy.typeName = typeName;
        // Position black hole to the RIGHT of galaxy center using polar coordinates
        let blackHolePlaced = false;
        let bhAttempts = 0;
        while (!blackHolePlaced && bhAttempts < 30) {
            const blackHoleAngle = (seededRandom(i * 51 + bhAttempts) - 0.5) * Math.PI * 0.3; // Mostly to the right
            const blackHoleDistance = (centralRadius + 200 * SCALE_FACTOR) + bhAttempts * 20 * SCALE_FACTOR;
            const blackHoleRadius = 40 * SCALE_FACTOR;
            let blackHoleX = galaxy.x + Math.cos(blackHoleAngle) * blackHoleDistance;
            let blackHoleY = galaxy.y + Math.sin(blackHoleAngle) * blackHoleDistance;
            // Clamp X so black hole never goes past the right edge minus its radius
            const maxBlackHoleX = galaxy.x + SCREEN_WIDTH / 2 - blackHoleRadius;
            if (blackHoleX > maxBlackHoleX)
                blackHoleX = maxBlackHoleX;
            if (isPositionSafe(blackHoleX, blackHoleY, blackHoleRadius, galaxy.planets, 60 * SCALE_FACTOR)) {
                galaxy.blackHole = {
                    x: blackHoleX,
                    y: blackHoleY,
                    angle: blackHoleAngle,
                    distance: blackHoleDistance,
                    radius: blackHoleRadius,
                    pullRadius: 120 * SCALE_FACTOR,
                    mass: 2500
                };
                blackHolePlaced = true;
            }
            bhAttempts++;
        }
        // Fallback if black hole couldn't be placed safely
        if (!blackHolePlaced) {
            const blackHoleDistance = centralRadius + 300 * SCALE_FACTOR;
            const blackHoleAngle = 0; // Directly to the right
            const blackHoleRadius = 40 * SCALE_FACTOR;
            const blackHoleDiameter = blackHoleRadius * 2;
            let blackHoleX = galaxy.x + blackHoleDistance;
            let blackHoleY = galaxy.y;
            // Clamp X so black hole never goes past the right edge minus its diameter
            const maxBlackHoleX = galaxy.x + SCREEN_WIDTH / 2 - blackHoleDiameter;
            if (blackHoleX > maxBlackHoleX)
                blackHoleX = maxBlackHoleX;
            galaxy.blackHole = {
                x: blackHoleX,
                y: blackHoleY,
                angle: blackHoleAngle,
                distance: blackHoleDistance,
                radius: blackHoleRadius,
                pullRadius: 120 * SCALE_FACTOR,
                mass: 3000
            };
        }
        // Add wormholes only every 7th galaxy (and only if not moving)
        let hasWormhole = false;
        if (i % 7 === 0 && !galaxy.moving) {
            hasWormhole = true;
            galaxy.wormholes = [];
            let wormhole1Placed = false;
            let wormhole2Placed = false;
            let attempts = 0;
            const maxAttempts = 50;
            // Calculate visible area for wormhole placement
            const visibleLeft = galaxy.x - SCREEN_WIDTH / 2;
            const visibleRight = galaxy.x + SCREEN_WIDTH / 2;
            const visibleTop = galaxy.y - SCREEN_HEIGHT / 2;
            const visibleBottom = galaxy.y + SCREEN_HEIGHT / 2;
            // Add some padding to keep wormholes away from screen edges
            const padding = 100 * SCALE_FACTOR;
            const safeLeft = visibleLeft + padding;
            const safeRight = visibleRight - padding;
            const safeTop = visibleTop + padding;
            const safeBottom = visibleBottom - padding;
            // Calculate vertical midpoints for top and bottom halves
            const verticalMidpoint = galaxy.y;
            const topHalfTop = safeTop;
            const topHalfBottom = verticalMidpoint - padding;
            const bottomHalfTop = verticalMidpoint + padding;
            const bottomHalfBottom = safeBottom;
            while ((!wormhole1Placed || !wormhole2Placed) && attempts < maxAttempts) {
                // Try to place first wormhole in top half
                if (!wormhole1Placed) {
                    // Place first wormhole in the left half of the screen, top vertical half
                    const x1 = safeLeft + seededRandom(i * 73 + attempts) * (SCREEN_WIDTH / 2 - padding * 2);
                    const y1 = topHalfTop + seededRandom(i * 79 + attempts) * (topHalfBottom - topHalfTop);
                    const radius1 = 25 * SCALE_FACTOR;
                    if (isPositionSafe(x1, y1, radius1, galaxy.planets, 60 * SCALE_FACTOR)) {
                        galaxy.wormholes.push({
                            x: x1,
                            y: y1,
                            radius: radius1,
                            pairIndex: 1,
                            color: rgb(0.4, 0.2, 0.8, 1),
                            glowColor: rgb(0.4, 0.2, 0.8, 0.3),
                            used: false
                        });
                        wormhole1Placed = true;
                    }
                }
                // Try to place second wormhole in bottom half
                if (wormhole1Placed && !wormhole2Placed) {
                    // Place near black hole but ensure it's in the right half and bottom half of the screen
                    const minX = Math.max(galaxy.blackHole.x, safeLeft + SCREEN_WIDTH / 2);
                    const maxX = safeRight;
                    const x2 = minX + seededRandom(i * 83 + attempts) * (maxX - minX);
                    const y2 = bottomHalfTop + seededRandom(i * 89 + attempts) * (bottomHalfBottom - bottomHalfTop);
                    const radius2 = 25 * SCALE_FACTOR;
                    if (isPositionSafeFromBlackHole(x2, y2, radius2, galaxy, 60 * SCALE_FACTOR)) {
                        galaxy.wormholes.push({
                            x: x2,
                            y: y2,
                            radius: radius2,
                            pairIndex: 1,
                            color: rgb(0.5, 0.3, 0.9, 0.5),
                            glowColor: rgb(0.4, 0.2, 0.8, 0.3),
                            used: false
                        });
                        wormhole2Placed = true;
                    }
                }
                attempts++;
            }
        }
        galaxys.push(galaxy);
    }
}
