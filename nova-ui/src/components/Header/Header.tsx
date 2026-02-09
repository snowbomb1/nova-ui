import styles from './styles.module.css';

export interface HeaderProps {
    children: React.ReactNode
    variant?: 'h1' | 'h2' | 'h3' | 'h4'
}

const Header = ({ children, variant = "h1" }: HeaderProps) => {
    const Tag = variant;
    return (
        <Tag className={styles.header}>
            {children}
        </Tag>
    )
}

export default Header;