import { motion } from "motion/react";
import styles from './svg.module.css';

interface IHamburgerProps {
    width: string;
    onClick?: () => void;
}

export const IHamburger = ({ width, onClick }: IHamburgerProps) => {
    return (
        <motion.svg className={styles.icon}
            viewBox="0 0 100 80"
            width={width} onClick={onClick}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
        >
            <rect fill="currentColor" width="100" height="12" rx="8"></rect>
            <rect fill="currentColor" y="30" width="100" height="12" rx="8"></rect>
            <rect fill="currentColor" y="60" width="100" height="12" rx="8"></rect>
        </motion.svg>
    )
}