import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import styles from './applayout.module.css';

export interface AppLayoutProps {
    topNav?: ReactNode;
    sideNav?: ReactNode;
    sideNavOpen?: boolean;
    sideNavExpandedWidth?: string;
    children: ReactNode;
}

export const AppLayout = ({ topNav, sideNav, sideNavOpen = false, sideNavExpandedWidth = "280px", children }: AppLayoutProps) => {

    return (
        <div className={styles.layout}>
            {sideNav}

            {/* Main content area */}
            <motion.div
                className={styles.mainArea}
                animate={{
                    marginLeft: sideNavOpen ? sideNavExpandedWidth : "30px"
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200
                }}
            >
                {topNav}
                {/* Page content */}
                <main className={styles.content}>
                    {children}
                </main>
            </motion.div>
        </div>
    );
};