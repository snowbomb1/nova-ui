import styles from './container.module.css';
import { forwardRef, useId } from 'react';

export type ContainerVariant = 'default' | 'outlined' | 'elevated' | 'flat';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps {
    /** The content to display inside the container */
    children: React.ReactNode;
    /** Content to display in the header section */
    header?: React.ReactNode;
    /** Action buttons or controls to display in the header */
    headerActions?: React.ReactNode;
    /** Content to display in the footer section */
    footer?: React.ReactNode;
    /**
     * The visual style variant of the container
     * - 'default' - Standard border
     * - 'outlined' - Thicker border for emphasis
     * - 'elevated' - Border with shadow
     * - 'flat' - Transparent background with no border
     * @default 'default'
     */
    variant?: ContainerVariant;
    /**
     * The padding size for the content area
     * - 'none' - No padding
     * - 'sm' - 1rem
     * - 'md' - 1.5rem
     * - 'lg' - 2rem
     * @default 'md'
     */
    padding?: ContainerPadding;
    /** 
     * Whether the container should take full width of its parent
     * @default false
     */
    fullWidth?: boolean;
    /** Custom inline styles */
    style?: React.CSSProperties;
    /** 
     * Shows a skeleton placeholder for the content. Use when the container content hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
    /** 
     * Number of skeleton lines to show when skeleton is true
     * @default 3
     */
    skeletonLines?: number;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, header, headerActions, footer, variant='default', padding='md', fullWidth=false, style, skeleton=false, skeletonLines=3 }, ref) => {
    const hasHeader = header || headerActions;
    const labeledBy = useId();

    const paddingString = {
        'sm': 'Sm',
        'md': 'Md',
        'lg': 'Lg',
        'none': 'None'
    }

    return (
        <div ref={ref}
            style={style}
            className={`${styles.container} ${styles[variant]} ${styles[`padding${paddingString[padding]}`]} ${fullWidth ? styles.fullWidth : ''}`}
            role={header ? "region" : undefined}
            aria-labelledby={header ? labeledBy : undefined}
        
        >
            {hasHeader && (
                <div className={`${styles.header} ${skeleton ? styles.headerSkeleton : ''}`}>
                    <div id={labeledBy} className={styles.headerContent}>
                        {skeleton ? (
                            <div className={styles.skeletonHeaderText} aria-hidden="true" />
                        ) : (
                            header
                        )}
                    </div>
                    {headerActions && !skeleton && (
                        <div className={styles.headerActions}>
                            {headerActions}
                        </div>
                    )}
                </div>
            )}
            <div className={styles.content}>
                {skeleton ? (
                    <div className={styles.skeletonContent} aria-hidden="true">
                        {Array.from({ length: skeletonLines }).map((_, i) => (
                            <div 
                                key={i} 
                                className={styles.skeletonLine}
                                style={{ width: i === skeletonLines - 1 ? '60%' : '100%' }}
                            />
                        ))}
                    </div>
                ) : (
                    children
                )}
            </div>
            {footer && !skeleton && (
                <div className={styles.footer}>
                    {footer}
                </div>
            )}
        </div>
    )
});

Container.displayName = 'Container';
