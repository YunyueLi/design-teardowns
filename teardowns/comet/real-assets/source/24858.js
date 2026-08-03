import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import '/strings.m.js';
import { useCallback, useRef, useEffect } from 'react';
import Sortable from 'sortablejs';
import { cx } from '//resources/perplexity/libs/classnames.js';
import { captureError } from "//resources/perplexity/libs/capture_error.js";
import { i18n } from '//resources/perplexity/libs/i18n.js';
import { startClient } from '//resources/perplexity/libs/start_client.js';
import { PinIcon } from "./components/pin_icon.js";
import { ApplicationsService } from "./services/applications/applications_service.js";
import { PopupsService } from "./services/popups/popups_service.js";
import { getWindowIdFromSidebar } from "./utils/get_window_id_from_sidebar.js";
import { PlusIcon } from "./components/icons/plus_icon.js";
import { usePreventZoom } from '//resources/perplexity/hooks/prevent_zoom.js';
const MARGIN_PX = 13;
const TOOLBAR_HEIGHT = 47;
const APP_SIZE = 36 + 2; // 36 height + 2px margins
const MARGIN_Y_PX = -13;
const ADD_BUTTON_MARGIN_Y = 4;
const POPUP_HEIGHT = 280;
const WINDOW_BORDER = 4;
const sidebarWindowId = getWindowIdFromSidebar();
const calcPopupPosition = (cursorY) => {
    const cursorOnAppPosition = Math.floor(cursorY - (cursorY % APP_SIZE));
    const popupToPinPosition = cursorOnAppPosition + MARGIN_Y_PX - TOOLBAR_HEIGHT;
    const positionFromTop = Math.max(popupToPinPosition, MARGIN_PX);
    const maxHeightPosition = window.outerHeight - POPUP_HEIGHT - 2 * MARGIN_PX - TOOLBAR_HEIGHT + MARGIN_Y_PX - WINDOW_BORDER;
    return Math.min(positionFromTop, maxHeightPosition);
};
const App = ({ app, isRunning, onClick, onRightClick, isPopupActive }) => {
    const appsService = ApplicationsService.getInstance(sidebarWindowId);
    const active = appsService.useActive();
    const handleAppClick = useCallback(() => {
        onClick(app.id);
    }, [onClick, app.id, app]);
    return (_jsx("div", { "data-id": app.name, "data-appid": app.id, title: app.name, className: cx('b-app', {
            'is-active': active && active == app.tabId,
            'is-running': isRunning,
            'is-popup-active': isPopupActive
        }), onClick: handleAppClick, onContextMenu: onRightClick, children: _jsx(PinIcon, { appIcon: app.icon, appUrl: app.url, className: "icon" }) }, app.id));
};
const AppList = ({ apps, onAppClick, onAppMenuClick, activeAppId, onAppMove }) => {
    const listRef = useRef(null);
    useEffect(() => {
        if (!listRef.current)
            return;
        const sortable = Sortable.create(listRef.current, {
            group: {
                name: 'sidebar-apps',
                put: true,
            },
            touchStartThreshold: 5,
            draggable: '.b-app',
            direction: 'vertical',
            forceFallback: true,
            fallbackOnBody: false,
            fallbackTolerance: 5,
            fallbackClass: 'sortable-fallback',
            onUpdate: (event) => {
                const appId = event.item.dataset['appid'];
                const to = event.newIndex;
                if (to === undefined || !appId)
                    return;
                onAppMove(appId, to);
            }
        });
        return () => {
            sortable.destroy();
        };
    }, [listRef.current]);
    return (_jsx("div", { ref: listRef, children: apps.map((app) => {
            return (_jsx(App, { app: app, isRunning: app.tabId !== undefined, onClick: onAppClick, isPopupActive: activeAppId === app.id, onRightClick: (event) => onAppMenuClick(event, app.id) }, app.id));
        }) }));
};
const AddButton = ({ onClick }) => {
    return (_jsx("button", { tabIndex: -1, className: "add-button", onClick: onClick, title: i18n("plus_button_tooltip"), children: _jsx(PlusIcon, { width: "16px", height: "16px" }) }));
};
const Sidebar = () => {
    const appsService = ApplicationsService.getInstance(sidebarWindowId);
    const popupsService = PopupsService.getInstance(sidebarWindowId);
    const apps = appsService.useApps();
    const activeAppId = appsService.useCurrentActiveAppId();
    const onAppClick = useCallback((id) => {
        appsService.selectApp(id).catch(captureError);
    }, [appsService]);
    const onAddButtonClick = useCallback((event) => {
        popupsService.showAppAddPopup({ x: MARGIN_PX, y: calcPopupPosition(event.pageY) + ADD_BUTTON_MARGIN_Y }).catch(captureError);
    }, [appsService]);
    const handleContextMenu = (event, appId) => {
        event.preventDefault();
        popupsService.showAppEditPopup({ x: MARGIN_PX, y: calcPopupPosition(event.pageY) }, appId).catch(captureError);
    };
    const handleAppMove = useCallback((appId, to) => {
        appsService.moveAppByIdToIndex(appId, to);
    }, [appsService]);
    const handleSidebarContextMenu = (event) => {
        event.preventDefault();
    };
    usePreventZoom();
    return (_jsx("div", { className: "b-sidebar", onContextMenu: handleSidebarContextMenu, children: _jsxs("div", { className: "b-sidebar_container", children: [_jsx("div", { className: "b-sidebar_apps-list", children: _jsx(AppList, { onAppClick: onAppClick, apps: apps, onAppMenuClick: handleContextMenu, onAppMove: handleAppMove, activeAppId: activeAppId }) }), _jsx("div", { className: "b-sidebar_add-button", children: _jsx(AddButton, { onClick: onAddButtonClick }) })] }) }));
};
startClient('#root', _jsx(Sidebar, {}));
