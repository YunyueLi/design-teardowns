// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { captureError } from "//resources/perplexity/libs/capture_error.js";
import { DetailedError } from "//resources/perplexity/libs/detailed_error.js";
export class VideoError extends DetailedError {
    name = "VideoError";
}
export const captureVideoError = (videoEl, message) => {
    captureError(new VideoError(message), {
        extra: {
            currentTime: videoEl.currentTime,
            canPlayMp4: videoEl.canPlayType("video/mp4"),
            readyState: videoEl.readyState,
            errorCode: videoEl.error?.code,
            errorMessage: videoEl.error?.message,
            duration: videoEl.duration,
        },
    });
};
