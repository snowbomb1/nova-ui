import { motion } from "motion/react";
import ThemeToggler from "./ThemeToggler";
import styles from './styles.module.css';

interface TopNavProps {
    header: React.ReactNode;
    logo?: React.ReactNode;
    search?: React.ReactNode;
}

const TopNav = ({ header, logo, search }: TopNavProps) => {

    return (
        <motion.div className={styles.topnavContainer}>
            <div className={styles.header}>
                {logo}
                {header}
            </div>
            {search}
            <motion.div className={styles.themeToggler}>
                <ThemeToggler />
            </motion.div>
        </motion.div>
    )
}

export default TopNav;