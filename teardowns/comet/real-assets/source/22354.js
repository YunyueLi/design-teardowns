// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useEffect, useRef } from "react";
const TOTAL_AFFECTED_DISTANCE_IN_PX = 370;
const DEFAULT_BOUNCING = 1.4;
const BOUNCE_MULTIPLIER = 0.25;
const DEFAULT_WIDTH_MULTIPLIER = 1.493;
const DEFAULT_WIDTH = 73;
export const PLANET_JS_CONTROLLER = "planet";
const getMouseDistanceFromPlanetCenter = (planet, xCoord) => {
    const rect = planet.getBoundingClientRect();
    const elemCenterX = rect.left + window.scrollX + rect.width / 2;
    return xCoord - elemCenterX;
};
export const calculateAnimationParams = (planets, xCoord) => {
    return planets.map((planet) => {
        const distance = getMouseDistanceFromPlanetCenter(planet, xCoord);
        const distanceTooFar = distance > TOTAL_AFFECTED_DISTANCE_IN_PX ||
            distance < -TOTAL_AFFECTED_DISTANCE_IN_PX;
        if (distanceTooFar) {
            return {
                width: `${DEFAULT_WIDTH}px`,
                bouncing: `${DEFAULT_BOUNCING}`,
            };
        }
        const radians = (distance / TOTAL_AFFECTED_DISTANCE_IN_PX) * (Math.PI / 2);
        /** The lesser distance from mouse to center of planet the bigger value */
        const widthFunc = (rad) => DEFAULT_WIDTH * DEFAULT_WIDTH_MULTIPLIER * Math.cos(rad) ** 2;
        const bounceFunc = (rad) => BOUNCE_MULTIPLIER * Math.cos(rad);
        return {
            width: `${DEFAULT_WIDTH + widthFunc(radians)}px`,
            bouncing: `${DEFAULT_BOUNCING + bounceFunc(radians)}`,
        };
    });
};
export const setParams = (planets, params) => {
    planets.forEach((planet, index) => {
        const { width, bouncing } = params[index];
        planet.style.width = width;
        planet.style.setProperty("--bounce-coefficient", bouncing);
    });
};
export const useRequestAnimationFrame = (callback, disabled = false, deps = []) => {
    const requestRef = useRef();
    const previousTimeRef = useRef();
    useEffect(() => {
        if (disabled) {
            return;
        }
        function animate(now) {
            if (previousTimeRef.current !== undefined) {
                callback(now);
            }
            previousTimeRef.current = now;
            requestRef.current = requestAnimationFrame(animate);
        }
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [disabled, ...deps]);
    return requestRef;
};
const getPlanets = () => {
    return Array.from(document.querySelectorAll(`[data-js-controller="${PLANET_JS_CONTROLLER}"]`));
};
export const useWidthAnimation = (xCoord) => {
    const requestRef = useRequestAnimationFrame(() => {
        if (xCoord === null) {
            return;
        }
        const planets = getPlanets();
        const params = calculateAnimationParams(planets, xCoord);
        setParams(planets, params);
    }, false, [xCoord]);
    useEffect(() => {
        if (xCoord === null && requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            getPlanets().forEach((planet) => {
                planet.style.width = `${DEFAULT_WIDTH}px`;
            });
        }
    }, [xCoord]);
};
