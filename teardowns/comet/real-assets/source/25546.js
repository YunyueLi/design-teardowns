// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
'use strict';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SCALE_FACTOR } from '../config/config.js';
// Physics utilities for collision and distance calculations
export function checkCollision(obj1, obj2, radiusSum) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return {
        collided: distance < radiusSum,
        dx: dx,
        dy: dy,
        distance: distance
    };
}
// Check if a position is safe (no overlap with objects)
export function isPositionSafe(x, y, radius, objects, minSeparation = 0) {
    for (const obj of objects) {
        const dx = obj.x - x;
        const dy = obj.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Calculate minimum separation as half of the smallest radius
        const minRadius = Math.min(radius, obj.radius);
        const requiredSeparation = minRadius * 0.5;
        const minDistance = obj.radius + radius + requiredSeparation + minSeparation;
        if (distance < minDistance) {
            return false;
        }
    }
    return true;
}
// Check if a position is safe from both planets and black hole
export function isPositionSafeFromBlackHole(x, y, radius, galaxy, minSeparation = 0) {
    // First check planets
    if (!isPositionSafe(x, y, radius, galaxy.planets, minSeparation)) {
        return false;
    }
    // Then check black hole
    const bh = galaxy.blackHole;
    const dx = bh.x - x;
    const dy = bh.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Calculate minimum separation as half of the smallest radius
    const minRadius = Math.min(radius, bh.radius);
    const requiredSeparation = minRadius * 0.5;
    const minDistance = bh.radius + radius + requiredSeparation + minSeparation;
    if (distance < minDistance) {
        return false;
    }
    return true;
}
// Apply gravitational force between source and target
export function applyGravity(source, target, gravityStrength, minDistance, maxDistance) {
    const dx = source.x - target.x;
    const dy = source.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance >= minDistance && distance < maxDistance) {
        const force = gravityStrength * source.mass / (distance * distance);
        let fx = (dx / distance) * force;
        let fy = (dy / distance) * force;
        if (source.isRepeller) {
            fx = -fx;
            fy = -fy;
        }
        return { fx: fx, fy: fy };
    }
    return { fx: 0, fy: 0 };
}
// Check if comet is out of bounds
export function isCometOutOfBounds(comet, galaxy) {
    const viewLeft = galaxy.x - SCREEN_WIDTH / 2;
    const viewRight = galaxy.x + SCREEN_WIDTH / 2;
    const viewTop = galaxy.y - SCREEN_HEIGHT / 2;
    const viewBottom = galaxy.y + SCREEN_HEIGHT / 2;
    return (comet.x < viewLeft - comet.radius ||
        comet.x > viewRight + comet.radius ||
        comet.y < viewTop - comet.radius ||
        comet.y > viewBottom + comet.radius);
}
// Check if comet is too far from cluster center
export function isCometTooFarFromCluster(comet, galaxy) {
    const clusterCenterX = galaxy.x;
    const clusterCenterY = galaxy.y;
    const maxDistance = 800 * SCALE_FACTOR;
    const distanceFromCluster = Math.sqrt((comet.x - clusterCenterX) ** 2 + (comet.y - clusterCenterY) ** 2);
    return distanceFromCluster > maxDistance;
}
// Check if comet has stopped (speed below threshold)
export function hasCometStopped(comet) {
    const speed = Math.sqrt(comet.vx * comet.vx + comet.vy * comet.vy);
    return speed < 30;
}
// Check if comet is inside black hole's pull radius
export function isCometInBlackHolePullRadius(comet, blackHole) {
    const dx = blackHole.x - comet.x;
    const dy = blackHole.y - comet.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < blackHole.pullRadius;
}
// Check if comet is close enough to be captured by black hole
export function isCometCapturedByBlackHole(comet, blackHole) {
    const dx = blackHole.x - comet.x;
    const dy = blackHole.y - comet.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < blackHole.radius * 0.2;
}
