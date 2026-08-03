import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useEffect, useState } from "react";
import { ProfileAvatar } from "./profile_avatar.js";
import { useWidthAnimation } from "./use_width_animation.js";
import { useDelayedHover } from "./use_delayed_hover.js";
export const ProfileAvatarPicker = ({ onSelect, avatars }) => {
    const { setHoveredIndex, index: hoverIndex } = useDelayedHover();
    const [xCoord, setXCoord] = useState(null);
    useWidthAnimation(xCoord);
    useEffect(() => {
        if (!avatars) {
            return;
        }
        onSelect(avatars.find((av) => av.selected)?.index ?? 0);
    }, [avatars]);
    const handleMouseMove = (event) => {
        setXCoord(event.pageX);
    };
    const handleMouseLeave = () => {
        setXCoord(null);
    };
    return (_jsx("div", { className: "b-profile-avatar-picker__root", onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, children: avatars?.map((avatar, index) => {
            return (_jsx("section", { onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null), children: _jsx(ProfileAvatar, { onClick: () => onSelect(avatar.index), isHovered: index === hoverIndex, avatar: avatar, position: index + 1 }) }, avatar.url));
        }) }));
};
