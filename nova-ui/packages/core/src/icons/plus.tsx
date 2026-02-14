import { motion } from "motion/react";
import styles from './svg.module.css';

interface IPlusProps {
    width: string;
    disable?: boolean;
}

export const IPlus = ({ width }: IPlusProps) => {
    return (
        <motion.svg 
            key="btn-enabled"
            className={styles.icon}
            style={{
                pointerEvents: "auto", 
                cursor:"pointer",
                opacity: 1,
                filter: "none",
            }}
            viewBox="0 0 24 24" fill="none" width={`${width}px`}
            stroke="currentColor"
            strokeWidth="3"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </motion.svg>
    )
}