// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
/**
 * @fileoverview A helper object used from the "Sync" section
 * to interact with the browser.
 */
// clang-format off
import { sendWithPromise } from 'chrome://resources/js/cr.js';
// The mirror of syncer::SyncPrefs::SyncAccountState
export var SyncAccountState;
(function (SyncAccountState) {
    SyncAccountState[SyncAccountState["kNotSignedIn"] = 0] = "kNotSignedIn";
    SyncAccountState[SyncAccountState["kSignedInNotSyncing"] = 1] = "kSignedInNotSyncing";
    SyncAccountState[SyncAccountState["kSyncing"] = 2] = "kSyncing";
})(SyncAccountState || (SyncAccountState = {}));
export var PerplexityDeviceFormFactor;
(function (PerplexityDeviceFormFactor) {
    PerplexityDeviceFormFactor["kUnknown"] = "Unknown";
    PerplexityDeviceFormFactor["kDesktop"] = "Desktop";
    PerplexityDeviceFormFactor["kPhone"] = "Phone";
    PerplexityDeviceFormFactor["kTablet"] = "Tablet";
    PerplexityDeviceFormFactor["kAutomotive"] = "Automotive";
    PerplexityDeviceFormFactor["kWearable"] = "Wearable";
    PerplexityDeviceFormFactor["kTv"] = "TV";
})(PerplexityDeviceFormFactor || (PerplexityDeviceFormFactor = {}));
;
export var PerplexityDeviceOsType;
(function (PerplexityDeviceOsType) {
    PerplexityDeviceOsType["kWindows"] = "Windows";
    PerplexityDeviceOsType["kMacOS"] = "MacOS";
    PerplexityDeviceOsType["kAndroid"] = "Android";
    PerplexityDeviceOsType["kOther"] = "Other";
})(PerplexityDeviceOsType || (PerplexityDeviceOsType = {}));
;
export class SynchronisationBrowserProxyImpl {
    requestSynchronisationState() {
        return sendWithPromise('requestSynchronisationState');
    }
    signInToPerplexity() {
        chrome.send('signInToPerplexity');
    }
    joinSynchronisationByCode(syncCode, isNewSync = false) {
        return sendWithPromise('joinSynchronisationByCode', syncCode, isNewSync);
    }
    startNewSynchronisation() {
        return sendWithPromise('startNewSynchronisation');
    }
    deleteSynchronisation() {
        return sendWithPromise('deleteSynchronisation');
    }
    leaveSynchronisation() {
        return sendWithPromise('leaveSynchronisation');
    }
    deleteSynchronisationDevice(deviceGuid) {
        return sendWithPromise('deleteSynchronisationDevice', deviceGuid);
    }
    getSynchronisationCode() {
        return sendWithPromise('getSynchronisationCode');
    }
    setSynchronisationDataType(dataType, enabled) {
        return sendWithPromise('setSynchronisationDataType', dataType, enabled);
    }
    setSynchroniseAllDataTypes() {
        return sendWithPromise('setSynchroniseAllDataTypes');
    }
    fetchSyncChainInfo() {
        return sendWithPromise('fetchSyncChainInfo');
    }
    static getInstance() {
        return instance || (instance = new SynchronisationBrowserProxyImpl());
    }
    static setInstance(obj) {
        instance = obj;
    }
}
let instance = null;
