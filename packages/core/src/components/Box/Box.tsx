import styles from './box.module.css';
import { forwardRef } from "react";

export type BoxPosition = 'left' | 'right' | 'center';
export type FlexDirection = 'horizontal' | 'vertical';

export interface BoxProps {
    /** The content to display inside the box */
    children: React.ReactNode;
    /** 
     * Alignment of children within the box
     * - 'left' - Align to start
     * - 'center' - Align to center
     * - 'right' - Align to end
     * @default 'center'
     */
    position?: BoxPosition;
    /** 
     * The flex direction of the box
     * - 'horizontal' - Row layout
     * - 'vertical' - Column layout
     * @default 'vertical'
     */
    direction?: FlexDirection;
    /** 
     * Whether to reverse the order of children
     * @default false
     */
    reverse?: boolean;
    /** Custom inline styles */
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

Box.displayName = 'Box';
