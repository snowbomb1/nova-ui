import { motion } from "motion/react";
import styles from './box.module.css'

export type BoxPosition = 'left' | 'right' | 'center'

export interface BoxProps {
    children: React.ReactNode;
    position: 'left' | 'right' | 'center'
}

export const Box = ({ children, position }: BoxProps) => {
    return (
        <motion.div
            className={styles.box}
            data-position={position}
        >
            {children}
        </motion.div>
    )
}