import { motion } from 'motion/react';
import { IPlus } from '../../icons/plus';
import styles from './floating-menu-button.module.css'

interface FloatingMenuButtonProps {
    onClick: () => void;
}

export const FloatingMenuButton = ({ onClick }: FloatingMenuButtonProps) => {
    return (
        <motion.button
            className={styles.floatingButton}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
        >
            <IPlus width="24" />
        </motion.button>
    );
};