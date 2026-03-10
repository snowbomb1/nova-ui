import { motion } from "motion/react";
import styles from './box.module.css';
import { forwardRef } from "react";

export type BoxPosition = 'left' | 'right' | 'center';
export type FlexDirection = 'horizontal' | 'vertical';

export interface BoxProps {
    children: React.ReactNode;
    position?: BoxPosition;
    direction?: FlexDirection;
    reverse?: boolean;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
    ({ children, position="center", direction = "vertical", reverse=false }, ref) => {
    return (
        <div ref={ref}
            className={styles.box}
            data-position={position}
            data-direction={direction}
            data-reverse={reverse ? true : undefined}
        >
            {children}
        </div>
    );
});