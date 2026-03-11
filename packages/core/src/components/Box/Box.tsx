import styles from './box.module.css';
import { forwardRef } from "react";

export type BoxPosition = 'left' | 'right' | 'center';
export type FlexDirection = 'horizontal' | 'vertical';

export interface BoxProps {
    children: React.ReactNode;
    position?: BoxPosition;
    direction?: FlexDirection;
    reverse?: boolean;
    style?: React.CSSProperties;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
    ({ children, position="center", direction = "vertical", reverse=false, style }, ref) => {
    return (
        <div ref={ref}
            className={styles.box}
            data-position={position}
            data-direction={direction}
            data-reverse={reverse ? true : undefined}
            style={style}
        >
            {children}
        </div>
    );
});