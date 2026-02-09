import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import { ViewerLoader } from "./ViewerLoader";
import { useMediaLoader } from "../../hooks/useMediaLoader";
import styles from "./styles.module.css";


interface VideoProps {
    controls?: boolean;
    loop?: boolean;
}

export interface ViewerProps {
    src: string;
    alt?: string;
    video?: VideoProps;
    thumbnailWidth?: string;
    onError?: (error: Error) => void;
}

const Viewer = ({ src, alt, video = { controls: false, loop: true }, thumbnailWidth = "300px", onError }: ViewerProps) => {
    const { isLoading, hasError, isVideo, reload } = useMediaLoader({ src, onError })
    const [isOpen, setIsOpen] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        imageRef.current?.style.setProperty('--thumbnail-size', thumbnailWidth)
    }, [src]);

    if (isLoading) {
        return <ViewerLoader divRef={imageRef} />
    }

    if (hasError) {
        return (
            <div className={styles.errorState} role="alert">
                <span className={styles.errorIcon}>⚠️</span>
                <p className={styles.errorText}>Failed to load media</p>
                <button onClick={reload} className={styles.retryButton}>
                    Retry
                </button>
            </div>
        );
    }

    if (!isOpen) {
        return (
            <motion.div>
                {!isVideo ? (
                    <motion.img
                        className={styles.thumbnail}
                        rel="preload" src={src} alt={alt} 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        onClick={() => setIsOpen(true)}
                    />
                ) : (
                    <motion.video controls={video.controls} src={src} loop={video.loop} disablePictureInPicture initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                )}
            </motion.div>
        )
    }

    return (
        <motion.div>
            {!isVideo ? (
                <motion.img
                    className={styles.thumbnail}
                    rel="preload" src={src} alt={alt} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    onClick={() => setIsOpen(true)}
                />
            ) : (
                <motion.video controls={video.controls} src={src} loop={video.loop} disablePictureInPicture initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            )}
        </motion.div>
    )
}

export default Viewer;