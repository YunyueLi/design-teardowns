// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
// @ts-nocheck
import { averageShotsPerHole, galaxyShots, sessionHoles, totalShots, currentGalaxy, currentUniverse, holesCompleted, } from "./gameLogic.js";
import { AnalyticsService } from "//resources/perplexity/libs/analytics/analytics_service.js";
const analyticsService = new AnalyticsService({
    logger: console,
    shouldCollectBasicContextParams: true,
    isDebugMode: false,
    offline: {
        offlineTracker: {
            addOfflineListener: (listener) => window.addEventListener("offline", listener),
            addOnlineListener: (listener) => window.addEventListener("online", listener),
            isOnlineNow: navigator.onLine,
        },
        maxOfflineStoredEvents: 100,
    },
});
// Analytics function - placeholder for now
export function sendAnalytics(eventName, event_data = {}) {
    analyticsService.trackEvent({
        name: eventName, additional: {
            currentGalaxy,
            currentUniverse,
            sessionHoles,
            averageShotsPerHole,
            galaxyShots,
            totalShots,
            holesCompleted,
            ...event_data
        }
    });
}
