// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
/**
 * @fileoverview
 * 'perplexity-synchronisation-details' is a component for displaying sync details
 * when synchronisation is active.
 */
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
import 'chrome://resources/cr_elements/cr_icon_button/cr_icon_button.js';
import 'chrome://resources/cr_elements/cr_radio_group/cr_radio_group.js';
import 'chrome://resources/cr_elements/cr_radio_button/cr_radio_button.js';
import 'chrome://resources/cr_elements/cr_toggle/cr_toggle.js';
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import '../settings_shared.css.js';
import './perplexity_confirmation_dialog.js';
import { PolymerElement } from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { loadTimeData } from 'chrome://resources/js/load_time_data.js';
import { PluralStringProxyImpl } from 'chrome://resources/js/plural_string_proxy.js';
import { SynchronisationBrowserProxyImpl } from './perplexity_synchronisation_browser_proxy.js';
import { getTemplate } from './perplexity_synchronisation_details.html.js';
const USER_SELECTED_CUSTOMIZE_KEY_ = 'perplexity_sync_user_selected_customize';
export class PerplexitySynchronisationDetailsElement extends PolymerElement {
    static get is() {
        return 'perplexity-synchronisation-details';
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            accountInfo: {
                type: Object,
            },
            deviceInfos: {
                type: Array,
                value: () => [],
            },
            deviceInfosWithFormattedTime_: {
                type: Array,
                value: () => [],
            },
            selectedSyncOption_: {
                type: String,
                value: 'everything',
            },
            syncDataTypes_: {
                type: Array,
                value: () => [],
            },
            syncDetails: {
                type: Object,
            },
        };
    }
    userSelectedCustomize_ = false;
    browserProxy_ = SynchronisationBrowserProxyImpl.getInstance();
    ready() {
        super.ready();
        this.userSelectedCustomize_ = localStorage.getItem(USER_SELECTED_CUSTOMIZE_KEY_) === 'true';
        if (this.userSelectedCustomize_) {
            this.selectedSyncOption_ = 'customize';
        }
        if (this.syncDetails && this.syncDetails.syncDataTypes && this.syncDetails.syncDataTypes.dataTypes) {
            this.syncDataTypes_ = this.syncDetails.syncDataTypes.dataTypes;
        }
        this.updateSelectedSyncOption_();
    }
    onDeleteSyncClick_() {
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.show({
                title: loadTimeData.getString('synchronisationDeleteSyncDialogTitle'),
                description: loadTimeData.getString('synchronisationDeleteSyncDialogDesc'),
                cancelText: loadTimeData.getString('synchronisationDialogNevermind'),
                confirmText: loadTimeData.getString('synchronisationDeleteSyncAccountButton'),
                onConfirm: async () => {
                    try {
                        await this.browserProxy_.deleteSynchronisation();
                    }
                    catch (error) {
                        console.error('Failed to delete sync:', error);
                    }
                },
            });
        }
    }
    onLeaveSyncClick_() {
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.show({
                title: loadTimeData.getString('synchronisationLeaveSyncDialogTitle'),
                description: loadTimeData.getString('synchronisationLeaveSyncDialogDesc'),
                cancelText: loadTimeData.getString('synchronisationDialogNevermind'),
                confirmText: loadTimeData.getString('synchronisationDialogConfirm'),
                onConfirm: async () => {
                    try {
                        await this.browserProxy_.leaveSynchronisation();
                    }
                    catch (error) {
                        console.error('Failed to leave sync:', error);
                    }
                },
            });
        }
    }
    getSyncingToEmailText_() {
        if (!this.accountInfo?.email) {
            return '';
        }
        return loadTimeData.getStringF('synchronisationDetailsSyncingToEmail', this.accountInfo.email);
    }
    onDeleteDeviceClick_(e) {
        const target = e.target;
        const deviceGuid = target.dataset['deviceGuid'];
        if (!deviceGuid) {
            return;
        }
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.show({
                title: loadTimeData.getString('synchronisationRemoveDeviceDialogTitle'),
                description: loadTimeData.getString('synchronisationRemoveDeviceDialogDesc'),
                cancelText: loadTimeData.getString('synchronisationDialogNevermind'),
                confirmText: loadTimeData.getString('synchronisationDialogConfirm'),
                onConfirm: async () => {
                    try {
                        const success = await this.browserProxy_.deleteSynchronisationDevice(deviceGuid);
                        if (!success) {
                            alert(loadTimeData.getString('somethingWentWrongError'));
                        }
                    }
                    catch (error) {
                        console.error('Failed to delete device:', error);
                    }
                },
            });
        }
    }
    async formatLastActiveTime_(timestamp) {
        if (!timestamp) {
            return '';
        }
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        if (diffInMinutes < 5) {
            return loadTimeData.getString('synchronisationActiveNow');
        }
        else if (diffInMinutes < 60) {
            return await PluralStringProxyImpl.getInstance().getPluralString('synchronisationMinutesAgo', diffInMinutes);
        }
        else if (diffInMinutes < 1440) {
            const diffInHours = Math.floor(diffInMinutes / 60);
            return await PluralStringProxyImpl.getInstance().getPluralString('synchronisationHoursAgo', diffInHours);
        }
        else {
            const diffInDays = Math.floor(diffInMinutes / 1440);
            return await PluralStringProxyImpl.getInstance().getPluralString('synchronisationDaysAgo', diffInDays);
        }
    }
    isLastDevice_(index) {
        return index === this.deviceInfosWithFormattedTime_.length - 1;
    }
    computeDeviceRowClass_(index) {
        return this.isLastDevice_(index) ? 'last-device' : '';
    }
    onAddNewDeviceClick_() {
        this.dispatchEvent(new CustomEvent('add-new-device', { bubbles: true, composed: true }));
    }
    shouldShowCustomizeSection_(selectedOption) {
        return selectedOption === 'customize';
    }
    static get observers() {
        return [
            'updateSyncDataTypes_(syncDetails.*)',
            'updateDeviceInfosWithFormattedTime_(deviceInfos.*)',
        ];
    }
    async updateDeviceInfosWithFormattedTime_(deviceInfosChange) {
        const devices = deviceInfosChange?.base || this.deviceInfos;
        if (!devices || !Array.isArray(devices)) {
            return;
        }
        const devicesWithTime = [];
        for (const device of devices) {
            const formattedLastActive = await this.formatLastActiveTime_(device.lastUpdatedTimestamp);
            devicesWithTime.push({
                ...device,
                formattedLastActive,
            });
        }
        this.deviceInfosWithFormattedTime_ = devicesWithTime;
    }
    updateSyncDataTypes_(syncDetailsChange) {
        if (syncDetailsChange?.base?.syncDataTypes) {
            const syncDataTypes = syncDetailsChange.base.syncDataTypes;
            if (syncDataTypes.dataTypes && Array.isArray(syncDataTypes.dataTypes)) {
                this.syncDataTypes_ = [...syncDataTypes.dataTypes];
            }
            else if (Array.isArray(syncDataTypes)) {
                this.syncDataTypes_ = [...syncDataTypes];
            }
        }
        else if (this.syncDetails && this.syncDetails.syncDataTypes) {
            const syncDataTypes = this.syncDetails.syncDataTypes;
            if (syncDataTypes.dataTypes && Array.isArray(syncDataTypes.dataTypes)) {
                this.syncDataTypes_ = [...syncDataTypes.dataTypes];
            }
        }
        this.updateSelectedSyncOption_();
    }
    updateSelectedSyncOption_() {
        if (!this.syncDetails?.syncDataTypes) {
            return;
        }
        const backendSaysEverything = this.syncDetails.syncDataTypes.syncAllDataTypes;
        if (this.selectedSyncOption_ === 'everything' && !backendSaysEverything) {
            this.selectedSyncOption_ = 'customize';
            return;
        }
        if (this.userSelectedCustomize_) {
            return;
        }
        this.selectedSyncOption_ = backendSaysEverything ? 'everything' : 'customize';
    }
    onSyncOptionChange_(e) {
        const selectedValue = e.detail.value;
        if (selectedValue === 'everything') {
            this.userSelectedCustomize_ = false;
            localStorage.removeItem(USER_SELECTED_CUSTOMIZE_KEY_);
            this.browserProxy_.setSynchroniseAllDataTypes();
        }
        else if (selectedValue === 'customize') {
            this.userSelectedCustomize_ = true;
            localStorage.setItem(USER_SELECTED_CUSTOMIZE_KEY_, 'true');
        }
    }
    onSyncDataToggleChange_(e) {
        if (this.selectedSyncOption_ !== 'customize') {
            return;
        }
        const target = e.target;
        const dataType = target.dataset.type;
        const enabled = target.checked;
        if (dataType !== undefined) {
            this.browserProxy_.setSynchronisationDataType(parseInt(dataType), enabled);
        }
    }
    hasMultipleDevices_(deviceInfos) {
        return Array.isArray(deviceInfos) && deviceInfos.length > 1;
    }
    _computeSyncDataItemClass(index, items) {
        return index === items.length - 1 ? 'last-item' : '';
    }
}
customElements.define(PerplexitySynchronisationDetailsElement.is, PerplexitySynchronisationDetailsElement);
