import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { Button } from "../../components/button/button.js";
import { SoundOnIcon } from "./sound_on_icon.js";
import { SoundOffIcon } from "./sound_off_icon.js";
import { useSoundController, useSoundState } from "./sound_context.js";
export const SoundToggle = () => {
    const { toggleSound } = useSoundController();
    const isPlaying = useSoundState();
    return (_jsx(Button, { onClick: toggleSound, className: "b-sound-toggle__root", view: "outline", children: isPlaying ? (_jsx(SoundOnIcon, { width: 16, height: 16 })) : (_jsx(SoundOffIcon, { width: 16, height: 16 })) }));
};
