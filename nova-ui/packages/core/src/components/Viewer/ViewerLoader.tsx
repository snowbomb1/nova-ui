import { type RefObject } from "react";
import { motion } from "motion/react";
import styles from "./viewer.module.css"
import { ViewerAspectRatio } from "./Viewer";

interface ViewerLoderProps {
    divRef: RefObject<HTMLDivElement | null>
    width: string;
    aspectRatio: ViewerAspectRatio;
}

export const ViewerLoader = ({ divRef, width, aspectRatio }: ViewerLoderProps) => {

    return (
        <div
            ref={divRef} 
            className={styles.thumbnailWrapper}
            style={{ 
                aspectRatio: aspectRatio.toString(),
            }}
        >
            <div 
                className={styles.skeleton}
                aria-busy="true" 
                aria-label="Loading media"
            />
        </div>
    );
}