import { motion } from "motion/react";
import styles from './box.module.css';

export type BoxPosition = 'left' | 'right' | 'center';
export type FlexDirection = 'horizontal' | 'vertical';

export interface BoxProps {
    children: React.ReactNode;
    position?: BoxPosition;
    direction?: FlexDirection;
}

export const Box = ({ children, position="center", direction = "vertical" }: BoxProps) => {
    return (
        <motion.div
            className={styles.box}
            data-position={position}
            data-direction={direction}
        >
            {children}
        </motion.div>
    );
};