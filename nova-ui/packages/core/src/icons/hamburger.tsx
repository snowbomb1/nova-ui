import { motion } from "motion/react";
import styles from './svg.module.css';

interface IHamburgerProps {
    width: string;
}

export const IHamburger = ({ width }: IHamburgerProps) => {
    return (
        <motion.svg className={styles.icon}
            viewBox="0 0 100 80"
            width={`${width}px`}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <rect fill="currentColor" width="100" height="12" rx="8"></rect>
            <rect fill="currentColor" y="30" width="100" height="12" rx="8"></rect>
            <rect fill="currentColor" y="60" width="100" height="12" rx="8"></rect>
        </motion.svg>
    )
}