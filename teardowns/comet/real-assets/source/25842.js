import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect, useMemo, useCallback } from "react";
import { startClient } from "//resources/perplexity/libs/start_client.js";
import { EppoFeaturesPageCallbackRouter, EppoFeaturesHandlerFactory, EppoFeaturesHandlerRemote, } from "./perplexity_eppo_features_ui.mojom-webui.js";
class EppoFeaturesAPI {
    callbackRouter = new EppoFeaturesPageCallbackRouter();
    handler = new EppoFeaturesHandlerRemote();
    constructor() {
        const factory = EppoFeaturesHandlerFactory.getRemote();
        factory.createHandler(this.callbackRouter.$.bindNewPipeAndPassRemote(), this.handler.$.bindNewPipeAndPassReceiver());
        this.callbackRouter.onConnectionError.addListener(console.error);
    }
    async getFeaturesInfo() {
        const { info } = await this.handler.getFeaturesInfo();
        return info;
    }
    async forceDownloadNow() {
        await this.handler.forceDownloadNow();
    }
    static getInstance() {
        return instance || (instance = new EppoFeaturesAPI());
    }
}
let instance = null;
function getRelativeTime(milliseconds) {
    const now = Date.now();
    const diffMs = now - milliseconds;
    const isPast = diffMs > 0;
    const absDiff = Math.abs(diffMs);
    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let value;
    let unit;
    if (days > 0) {
        value = days;
        unit = days === 1 ? "day" : "days";
    }
    else if (hours > 0) {
        value = hours;
        unit = hours === 1 ? "hour" : "hours";
    }
    else if (minutes > 0) {
        value = minutes;
        unit = minutes === 1 ? "minute" : "minutes";
    }
    else {
        value = seconds;
        unit = seconds === 1 ? "second" : "seconds";
    }
    if (isPast) {
        return `${value} ${unit} ago`;
    }
    else {
        return `in ${value} ${unit}`;
    }
}
function formatTime(milliseconds) {
    if (!milliseconds || milliseconds === 0) {
        return "Not during this session";
    }
    const date = new Date(milliseconds);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    const relativeTime = getRelativeTime(milliseconds);
    return `${relativeTime} (${date.toString()})`;
}
function extractMojoValue(mojoValue) {
    if (mojoValue === undefined || mojoValue === null) {
        return null;
    }
    if ('nullValue' in mojoValue) {
        return null;
    }
    else if ('boolValue' in mojoValue) {
        return mojoValue.boolValue;
    }
    else if ('intValue' in mojoValue) {
        return mojoValue.intValue;
    }
    else if ('doubleValue' in mojoValue) {
        return mojoValue.doubleValue;
    }
    else if ('stringValue' in mojoValue) {
        return mojoValue.stringValue;
    }
    else if ('binaryValue' in mojoValue) {
        return mojoValue.binaryValue;
    }
    else if ('dictionaryValue' in mojoValue) {
        return mojoValue.dictionaryValue;
    }
    else if ('listValue' in mojoValue) {
        return mojoValue.listValue;
    }
    return mojoValue;
}
function getValueType(value) {
    if (value === undefined || value === null) {
        return 'UNKNOWN';
    }
    if (typeof value === 'boolean') {
        return 'BOOLEAN';
    }
    else if (typeof value === 'number') {
        return 'NUMBER';
    }
    else if (typeof value === 'string') {
        return 'STRING';
    }
    else if (Array.isArray(value)) {
        return 'LIST';
    }
    else if (typeof value === 'object') {
        return 'DICTIONARY';
    }
    return 'UNKNOWN';
}
function formatFlagValue(value) {
    if (value === undefined || value === null) {
        return 'N/A';
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    else if (typeof value === 'number') {
        return String(value);
    }
    else if (typeof value === 'string') {
        return value;
    }
    else if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }
    return String(value);
}
const RegisteredFlagTable = ({ flags }) => {
    return (_jsxs("table", { className: "flags-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Flag Name" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Value" }), _jsx("th", { children: "Non-Cached Value" })] }) }), _jsx("tbody", { children: flags.map((flag) => (_jsxs("tr", { children: [_jsx("td", { className: "flag-name", children: flag.name }), _jsx("td", { className: "flag-type", children: getValueType(flag.value) }), _jsx("td", { className: "flag-value", children: _jsx("pre", { children: formatFlagValue(flag.value) }) }), _jsx("td", { className: "flag-value", children: _jsx("pre", { children: formatFlagValue(flag.nonCachedValue) }) })] }, flag.name))) })] }));
};
const AllEppoFlagTable = ({ flags }) => {
    return (_jsxs("table", { className: "flags-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Flag Name" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Value" }), _jsx("th", { children: "Non-Cached Value" })] }) }), _jsx("tbody", { children: flags.map((flag) => (_jsxs("tr", { children: [_jsx("td", { className: "flag-name", children: flag.name }), _jsx("td", { className: "flag-type", children: getValueType(flag.value) }), _jsx("td", { className: "flag-value", children: _jsx("pre", { children: formatFlagValue(flag.value) }) }), _jsx("td", { className: "flag-value", children: _jsx("pre", { children: formatFlagValue(flag.nonCachedValue) }) })] }, flag.name))) })] }));
};
const EppoFeaturesPage = () => {
    const [info, setInfo] = useState(null);
    const [registeredFlags, setRegisteredFlags] = useState([]);
    const [allEppoFlags, setAllEppoFlags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('BOOLEAN');
    const loadData = useCallback(async () => {
        try {
            const api = EppoFeaturesAPI.getInstance();
            const featuresInfo = await api.getFeaturesInfo();
            setInfo(featuresInfo);
            const transformedFlags = (featuresInfo.registeredFeatureFlags || []).map((flag) => ({
                name: flag.name,
                value: extractMojoValue(flag.value),
                nonCachedValue: extractMojoValue(flag.nonCachedValue),
            }));
            setRegisteredFlags(transformedFlags);
            const transformedAllEppoFlags = (featuresInfo.allEppoFeatureFlags || []).map((flag) => ({
                name: flag.name,
                value: extractMojoValue(flag.value),
                nonCachedValue: extractMojoValue(flag.nonCachedValue),
            }));
            setAllEppoFlags(transformedAllEppoFlags);
        }
        catch (err) {
            console.error("Failed to load data:", err);
            setError("Failed to load features data.");
        }
        finally {
            setLoading(false);
        }
    }, []);
    const forceDownloadNow = useCallback(async () => {
        setLoading(true);
        const api = EppoFeaturesAPI.getInstance();
        await api.forceDownloadNow();
        loadData();
    }, []);
    useEffect(() => {
        loadData();
    }, []);
    const registeredFilteredFlags = useMemo(() => {
        if (selectedType === 'ALL') {
            return registeredFlags;
        }
        return registeredFlags.filter(flag => getValueType(flag.value) === selectedType);
    }, [registeredFlags, selectedType]);
    const allEppoFilteredFlags = useMemo(() => {
        if (selectedType === 'ALL') {
            return allEppoFlags;
        }
        return allEppoFlags.filter(flag => getValueType(flag.value) === selectedType);
    }, [allEppoFlags, selectedType]);
    const parsedEppoResponse = useMemo(() => {
        if (!info?.lastEppoResponseBody) {
            return null;
        }
        try {
            return JSON.parse(info.lastEppoResponseBody);
        }
        catch (err) {
            console.error("Failed to parse Eppo response body:", err);
            return null;
        }
    }, [info?.lastEppoResponseBody]);
    return (_jsxs("div", { className: "eppo-features-page", children: [_jsx("h1", { children: "Eppo Features" }), loading && _jsx("div", { className: "loading", children: "Loading..." }), error && _jsx("div", { className: "error", children: error }), !loading && info && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "info-section", children: [_jsx("h2", { children: "Download Status" }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Last download time:" }), _jsx("span", { className: "info-value", children: formatTime(Number(info.lastDownloadTimeMs)) })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Last update time:" }), _jsx("span", { className: "info-value", children: formatTime(Number(info.lastUpdateTimeMs)) })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Next download time:" }), _jsx("span", { className: "info-value", children: formatTime(Number(info.nextDownloadTimeMs)) })] }), _jsx("div", { className: "info-row", children: _jsx("button", { onClick: forceDownloadNow, children: "Force Download Now" }) })] }), _jsxs("div", { className: "flags-section", children: [_jsxs("div", { className: "flags-header", children: [_jsxs("h2", { children: ["Registered Feature Flags (", registeredFilteredFlags.length, ")"] }), _jsxs("div", { className: "filter-controls", children: [_jsx("label", { htmlFor: "type-filter", children: "Filter by type:" }), _jsxs("select", { id: "type-filter", className: "type-filter", value: selectedType, onChange: (e) => setSelectedType(e.target.value), children: [_jsx("option", { value: "ALL", children: "ALL" }), _jsx("option", { value: "BOOLEAN", children: "BOOLEAN" }), _jsx("option", { value: "NUMBER", children: "NUMBER" }), _jsx("option", { value: "STRING", children: "STRING" }), _jsx("option", { value: "LIST", children: "LIST" }), _jsx("option", { value: "DICTIONARY", children: "DICTIONARY" })] })] })] }), _jsx(RegisteredFlagTable, { flags: registeredFilteredFlags })] }), _jsxs("div", { className: "flags-section", children: [_jsxs("div", { className: "flags-header", children: [_jsxs("h2", { children: ["All Eppo Feature Flags (", allEppoFilteredFlags.length, ")"] }), _jsxs("div", { className: "filter-controls", children: [_jsx("label", { htmlFor: "type-filter", children: "Filter by type:" }), _jsxs("select", { id: "type-filter", className: "type-filter", value: selectedType, onChange: (e) => setSelectedType(e.target.value), children: [_jsx("option", { value: "ALL", children: "ALL" }), _jsx("option", { value: "BOOLEAN", children: "BOOLEAN" }), _jsx("option", { value: "NUMBER", children: "NUMBER" }), _jsx("option", { value: "STRING", children: "STRING" }), _jsx("option", { value: "LIST", children: "LIST" }), _jsx("option", { value: "DICTIONARY", children: "DICTIONARY" })] })] })] }), _jsx(AllEppoFlagTable, { flags: allEppoFilteredFlags })] }), parsedEppoResponse && (_jsxs("div", { className: "eppo-response-section", children: [_jsx("h2", { children: "Last Eppo Response" }), _jsx("pre", { className: "eppo-response-body", children: JSON.stringify(parsedEppoResponse, null, 2) })] })), info?.lastEppoResponseBody && !parsedEppoResponse && (_jsxs("div", { className: "eppo-response-section", children: [_jsx("h2", { children: "Last Eppo Response (Raw)" }), _jsx("div", { className: "error", children: "Failed to parse response as JSON. Showing raw content:" }), _jsx("pre", { className: "eppo-response-body", children: info.lastEppoResponseBody })] }))] }))] }));
};
startClient("#root", _jsx(EppoFeaturesPage, {}));
