import { motion } from "motion/react";
import styles from './svg.module.css';

interface IMinusProps {
    width: string;
    onClick?: () => void;
}

export const IMinus = ({ width, onClick }: IMinusProps) => {
    return (
        <motion.svg className={styles.icon}
            viewBox="0 0 24 24" fill="none" width={width}
            onClick={onClick}
            stroke="currentColor"
            strokeWidth="3"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </motion.svg>
    )
}