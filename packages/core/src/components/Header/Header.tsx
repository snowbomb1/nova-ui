import styles from './header.module.css';

export type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeaderProps {
    /** The text content of the header */
    children: React.ReactNode;
    /** 
     * The HTML heading level to render
     * @default 'h1'
     */
    variant?: HeaderVariant;
    /** 
     * Shows a skeleton placeholder. Use when the header text hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const Header = ({ children, variant = "h1", skeleton = false }: HeaderProps) => {
    const Tag = variant;

    if (skeleton) {
        return (
            <Tag className={`${styles.header} ${styles.skeleton}`} aria-hidden="true">
                <span className={styles.skeletonText}>{children}</span>
            </Tag>
        );
    }

    return (
        <Tag className={styles.header}>
            {children}
        </Tag>
    )
}
