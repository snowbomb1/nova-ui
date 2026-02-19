import { ThemeToggler } from "./ThemeToggler";
import styles from './topnav.module.css';

export interface TopNavProps {
    header: React.ReactNode;
    logo?: React.ReactNode;
    logoClick?: () => void;
    search?: React.ReactNode;
}

export const TopNav = ({ header, logo, logoClick, search }: TopNavProps) => {

    return (
        <nav className={styles.topnavContainer} aria-label="Main navigation">
            <div className={styles.topRow}>
                <div className={styles.header}>
                    <div onClick={logoClick} style={{ cursor: logoClick ? 'pointer' : 'default' }}>
                        {logo}
                    </div>
                    {header}
                </div>
            </div>

            <div className={styles.collapsibleContent}>
                <div className={styles.searchWrapper}>
                    {search}
                </div>
                
                <div className={styles.themeWrapper}>
                    <ThemeToggler />
                </div>
            </div>
        </nav>
    );
}