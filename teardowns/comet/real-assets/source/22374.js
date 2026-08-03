import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { createContext, useRef, useCallback, useContext, useEffect, useState, } from "react";
const SoundControllerContext = createContext({
    toggleSound: () => { },
    playSound: () => { },
});
const SoundStateContext = createContext(undefined);
export const SoundProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const playedAlreadyRef = useRef(false);
    useEffect(() => {
        const handlePlay = () => setIsPlaying(true);
        audioRef.current?.addEventListener("play", handlePlay);
        const handlePause = () => setIsPlaying(false);
        audioRef.current?.addEventListener("pause", handlePause);
        return () => {
            audioRef.current?.removeEventListener("play", handlePlay);
            audioRef.current?.removeEventListener("pause", handlePause);
        };
    }, []);
    const toggle = useCallback(() => {
        if (audioRef.current?.paused) {
            play();
        }
        else {
            pause();
        }
    }, []);
    const play = useCallback((params) => {
        if (!audioRef.current)
            return;
        const audio = audioRef.current;
        if (typeof params?.startTimeSec === "number") {
            audio.currentTime = params.startTimeSec;
        }
        playedAlreadyRef.current = true;
        audio.play();
    }, []);
    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);
    return (_jsx(SoundControllerContext.Provider, { value: { toggleSound: toggle, playSound: play }, children: _jsxs(SoundStateContext.Provider, { value: isPlaying, children: [children, _jsxs("audio", { autoPlay: true, loop: true, ref: audioRef, children: [_jsx("source", { src: "assets/ambient.mp3", type: "audio/mpeg" }), "Your browser does not support the audio element."] })] }) }));
};
export const useSoundController = () => {
    return useContext(SoundControllerContext);
};
export const useSoundState = () => {
    return useContext(SoundStateContext);
};
