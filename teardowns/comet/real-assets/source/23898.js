// Copyright 2025 The Perplexity Browser Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import "chrome://resources/cr_elements/cr_view_manager/cr_view_manager.js";
import "/shared/settings/prefs/prefs.js";
import "../settings_shared.css.js";
import "./perplexity_notifications_page.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { routes } from "../route.js";
import { RouteObserverMixin } from "../router.js";
import { SearchableViewContainerMixin } from "../settings_page/searchable_view_container_mixin.js";
import { getTemplate } from "./perplexity_notifications_page_index.html.js";
const PerplexitySettingsNotificationsPageIndexElementBase = SearchableViewContainerMixin(RouteObserverMixin(PolymerElement));
export class PerplexitySettingsNotificationsPageIndexElement extends PerplexitySettingsNotificationsPageIndexElementBase {
    static get is() {
        return "perplexity-notifications-page-index";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            prefs: Object,
        };
    }
    currentRouteChanged(newRoute, oldRoute) {
        super.currentRouteChanged(newRoute, oldRoute);
        // Need to wait for currentRouteChanged observers on child views to run
        // first, before switching views.
        queueMicrotask(() => {
            switch (newRoute) {
                case routes.NOTIFICATIONS:
                    this.$.viewManager.switchView("notifications", "no-animation", "no-animation");
                    break;
                case routes.BASIC:
                    // Switch back to the default view in case they are part of search
                    // results.
                    this.$.viewManager.switchView("notifications", "no-animation", "no-animation");
                    break;
                default:
                    // Nothing to do. Other parent elements are responsible for updating
                    // the displayed contents.
                    break;
            }
        });
    }
}
customElements.define(PerplexitySettingsNotificationsPageIndexElement.is, PerplexitySettingsNotificationsPageIndexElement);
