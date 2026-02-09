import { type RefObject } from "react";
import { motion } from "motion/react";
import styles from "./styles.module.css";

interface ViewerLoderProps {
    divRef: RefObject<HTMLDivElement | null>
}

export const ViewerLoader = ({ divRef }: ViewerLoderProps) => {

    return (
        <motion.div
            ref={divRef} className={`${styles.thumbnail} ${styles.skeleton}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            aria-busy={true} aria-label="Loading image"
        />
    )
}