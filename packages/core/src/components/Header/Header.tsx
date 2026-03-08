import styles from './styles.module.css';

export type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeaderProps {
    children: React.ReactNode
    variant?: HeaderVariant;
}

export const Header = ({ children, variant = "h1" }: HeaderProps) => {
    const Tag = variant;
    return (
        <Tag className={styles.header}>
            {children}
        </Tag>
    )
}