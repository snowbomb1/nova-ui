import { motion } from "motion/react";
import styles from './svg.module.css';

interface IMinusProps {
    width: string;
    onClick?: () => void;
    disable?: boolean;
}

export const IMinus = ({ width, onClick, disable=false }: IMinusProps) => {
    return (
        <motion.svg 
            key={disable ? "btn-disabled" : "btn-enabled"}
            className={styles.icon}
            style={{
                pointerEvents: disable ? "none" : "auto", 
                cursor: disable ? "not-allowed" : "pointer",
                opacity: disable ? 0.5 : 1,
                filter: disable ? "grayscale(0.3)" : "none",
            }}
            viewBox="0 0 24 24" fill="none" width={width}
            stroke="currentColor"
            strokeWidth="3"
            initial={{ scale: 1 }}
            whileHover={disable ? undefined : { scale: 1.1 }}
            whileTap={disable ? undefined : { scale: 0.9 }}
            onClick={disable ? undefined : onClick}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </motion.svg>
    )
}