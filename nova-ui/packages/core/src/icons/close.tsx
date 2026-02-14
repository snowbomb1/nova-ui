import { motion } from 'motion/react';
import styles from './svg.module.css';

interface ICloseProps {
    width: string;
}

export const IClose = ({ width }: ICloseProps) => {
    return (
        <motion.svg className={styles.icon}
            viewBox="0 0 24 24" fill="none" width={`${width}px`}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.svg>
    )
}