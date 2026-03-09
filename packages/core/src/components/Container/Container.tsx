import styles from './container.module.css';
import { useId } from 'react';

export type ContainerVariant = 'default' | 'outlined' | 'elevated' | 'flat';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    headerActions?: React.ReactNode;
    footer?: React.ReactNode;
    /*
    * 'default' - Standard border
    * 'outlined' - Thicker border for emphasis
    * 'elevated' - Border with shadow
    * 'flat' - Transparent background with no border
    * 
    * @default 'default'
    */
    variant?: ContainerVariant;
   /* 
    * 'none' - No padding on content
    * 'sm' - 1rem
    * 'md' - 1.5rem
    * 'lg' - 2rem
    * 
    * @default 'md'
   */
    padding?: ContainerPadding;
    fullWidth?: boolean;
}

export const Container = ({ children, header, headerActions, footer, variant='default', padding='md', fullWidth=false }: ContainerProps) => {
    const hasHeader = header || headerActions;
    const labeledBy = useId();

    const paddingString = {
        'sm': 'Sm',
        'md': 'Md',
        'lg': 'Lg',
        'none': 'None'
    }

    return (
        <div
            className={`${styles.container} ${styles[variant]} ${styles[`padding${paddingString[padding]}`]} ${fullWidth ? styles.fullWidth : ''}`}
            role={header ? "region" : undefined}
            aria-labelledby={header ? labeledBy : undefined}
        
        >
            {hasHeader && (
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        {header}
                    </div>
                    {headerActions && (
                        <div className={styles.headerActions}>
                            {headerActions}
                        </div>
                    )}
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
            {footer && (
                <div className={styles.footer}>
                    {footer}
                </div>
            )}
        </div>
    )
}