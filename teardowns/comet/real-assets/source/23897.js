// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import '../controls/settings_toggle_button.js';
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import 'chrome://resources/cr_elements/cr_link_row/cr_link_row.js';
import '../settings_page/settings_section.js';
import '../settings_shared.css.js';
import '../privacy_page/perplexity_exception_list/exception_list.js';
import { PrefsMixin } from '/shared/settings/prefs/prefs_mixin.js';
import { PolymerElement } from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { getTemplate } from './perplexity_notifications_page.html.js';
import { Router } from '../router.js';
import { routes } from '../route.js';
const PERPLEXITY_NOTIFICATIONS_SOUND_PREF = 'perplexity.notifications.sound.enabled';
const AUTO_ASSIST_NOTIFICATION_SETTINGS_FEATURE = "auto-assist-notification-settings";
const PerplexityNotificationsPageElementBase = PrefsMixin(PolymerElement);
export class PerplexityNotificationsPageElement extends PerplexityNotificationsPageElementBase {
    static get is() {
        return "perplexity-notifications-page";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            showAutoAssistNotificationSettings_: {
                type: Boolean,
                value: false,
            },
        };
    }
    flagChangedListener_ = null;
    connectedCallback() {
        super.connectedCallback();
        this.syncShowAutoAssistNotificationSettingsWithFeatureFlag();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.flagChangedListener_) {
            chrome.perplexity.features.onFlagChanged.removeListener(this.flagChangedListener_);
            this.flagChangedListener_ = null;
        }
    }
    syncShowAutoAssistNotificationSettingsWithFeatureFlag() {
        this.updateShowAutoAssistNotificationSettingsFromFlag();
        this.flagChangedListener_ = this.onFlagChanged_.bind(this);
        chrome.perplexity.features.onFlagChanged.addListener(this.flagChangedListener_);
    }
    onFlagChanged_(flagName) {
        if (flagName !== AUTO_ASSIST_NOTIFICATION_SETTINGS_FEATURE) {
            return;
        }
        this.updateShowAutoAssistNotificationSettingsFromFlag();
    }
    updateShowAutoAssistNotificationSettingsFromFlag() {
        chrome.perplexity.features
            .isFeatureEnabled(AUTO_ASSIST_NOTIFICATION_SETTINGS_FEATURE)
            .then((enabled) => {
            this.showAutoAssistNotificationSettings_ = enabled;
        });
    }
    onMainNotificationsSubpageLinkClick_() {
        Router.getInstance().navigateTo(routes.SITE_SETTINGS_NOTIFICATIONS);
    }
    onBadgeToggleClicked_(event) {
        const isBadgeOff = !event.detail;
        if (isBadgeOff) {
            this.disableSound();
        }
    }
    disableSound() {
        this.setPrefValue(PERPLEXITY_NOTIFICATIONS_SOUND_PREF, false);
    }
}
customElements.define(PerplexityNotificationsPageElement.is, PerplexityNotificationsPageElement);
