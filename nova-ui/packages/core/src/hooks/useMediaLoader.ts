import { useState, useEffect, useCallback } from 'react';

interface UseMediaLoaderProps {
    src: string;
    onError?: (error: Error) => void;
}

export const useMediaLoader = ({ src, onError }: UseMediaLoaderProps ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [reloadTrigger, setReloadTrigger] = useState<number>(0);

    const reload = useCallback(() => {
        setReloadTrigger(prev => prev + 1)
    }, [])

    useEffect(() => {
        console.log('src', src)
        if (!src.length) return;
        setIsLoading(true);
        setHasError(false);
        const timeout = setTimeout(() => {
            const error = new Error(`Media loading timed out: ${src}`);
            setHasError(true);
            setIsLoading(false);
            onError?.(error)
        }, 10000);
        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg');
        setIsVideo(isVideo)
        const media = isVideo ? document.createElement('video') : new Image();
        media.src = src;
        media.onerror = () => {
            const error = new Error(`Failed to load media: ${src}`);
            setHasError(true);
            onError?.(error)
        }
        if (isVideo) {
            (media as HTMLVideoElement).onloadeddata = () => setIsLoading(false);
            clearTimeout(timeout)
        } else {
            media.onload = () => setIsLoading(false);
            clearTimeout(timeout)
        }
        return () => {
            media.onload = null;
            (media as HTMLVideoElement).onloadeddata = null;
            media.onerror = null;
            clearInterval(timeout)
        }

    }, [src, reloadTrigger])

    return { isLoading, hasError, isVideo, reload }
};