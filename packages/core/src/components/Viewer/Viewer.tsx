import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaLoader } from "../../hooks/useMediaLoader";
import styles from "./viewer.module.css"

export interface VideoProps {
    /** Whether to show video controls */
    controls?: boolean;
    /** Whether the video should loop */
    loop?: boolean;
    /** Whether the video should autoplay */
    autoPlay?: boolean;
    /** Whether the video should be muted */
    muted?: boolean;
}

export type ViewerAspectRatio = '16/9' | '9/16' | '1/1' | '4/3' | '3/2' | '21/19'

export interface ViewerProps {
    /** URL of the image or video to display */
    src: string;
    /** Alt text for the media (required for accessibility) */
    alt: string;
    /** 
     * Video-specific options (only applies when src is a video)
     * @default { controls: true, loop: true, autoPlay: true, muted: true }
     */
    video?: VideoProps;
    /** 
     * Width of the thumbnail
     * @default '300px'
     */
    thumbnailWidth?: string;
    /** 
     * Aspect ratio of the thumbnail
     * @default '9/16'
     */
    aspectRatio?: ViewerAspectRatio;
    /** Callback fired when the media fails to load */
    onError?: (error: Error) => void;
}

export const Viewer = ({ src, alt, video = { controls: true, loop: true, autoPlay: true, muted: true }, thumbnailWidth = "300px", onError, aspectRatio='9/16' }: ViewerProps) => {
    const { isLoading, hasError, isVideo, reload } = useMediaLoader({ src, onError });
    const [isOpen, setIsOpen] = useState(false);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        thumbnailRef.current?.style.setProperty('--thumbnail-size', thumbnailWidth);
    }, [thumbnailWidth]);

    useLayoutEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    if (isLoading) {
        return (
            <div
                ref={thumbnailRef} 
                className={styles.thumbnailWrapper}
                style={{
                    width: thumbnailWidth,
                    aspectRatio: aspectRatio.toString(),
                    borderRadius: '0.5rem',
                }}
            >
                <div 
                    className={styles.skeleton}
                    aria-busy="true" 
                    aria-label="Loading media"
                    role="status"
                />
            </div>
        );
    }

    if (hasError) {
        return (
            <div ref={thumbnailRef} className={styles.errorState} role="alert">
                <span className={styles.errorIcon}>⚠️</span>
                <p className={styles.errorText}>Failed to load media</p>
                <button onClick={reload} className={styles.retryButton}>Retry</button>
            </div>
        );
    }

    return (
        <>
            <motion.div ref={thumbnailRef} className={styles.thumbnailWrapper} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {isVideo ? (
                    <motion.video
                        className={styles.thumbnail}
                        src={src}
                        muted
                        preload="none"
                        autoPlay={video.autoPlay}
                        loop={video.loop}
                        disablePictureInPicture
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsOpen(true)}
                    />
                ) : (
                    <motion.img
                        className={styles.thumbnail}
                        loading="lazy"
                        src={src}
                        alt={alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsOpen(true)}
                    />
                )}
                <motion.div className={styles.hoverOverlay} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                    <span className={styles.expandIcon}>🔍</span>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.lightboxOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            aria-label="Close lightbox"
                        >
                            ✕
                        </motion.button>

                        <motion.div
                            className={styles.lightboxContent}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {isVideo ? (
                                <video preload="none" className={styles.lightboxMedia} src={src} controls={video.controls} loop={video.loop} autoPlay={video.autoPlay} muted={video.muted}>
                                    <track kind="captions" />
                                </video>
                            ) : (
                                <img className={styles.lightboxMedia} src={src} alt={alt} />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
