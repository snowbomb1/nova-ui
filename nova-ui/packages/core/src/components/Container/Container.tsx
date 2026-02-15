import styles from './container.module.css';


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
    * @default 'defualt'
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
}

export const Container = ({ children, header, headerActions, footer, variant='default', padding='md' }: ContainerProps) => {
    const hasHeader = header || headerActions;

    return (
        <div className={`${styles.container} ${styles[variant]} ${styles[`padding-${padding}`]}`}>
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