import { type ReactNode, useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './applayout.module.css';

export interface AppLayoutProps {
    /** Navigation component to display at the top of the layout */
    topNav?: ReactNode;
    /** Navigation component to display on the side of the layout */
    sideNav?: ReactNode;
    /** 
     * Whether the side navigation is expanded
     * @default false
     */
    sideNavOpen?: boolean;
    /** 
     * Width of the side navigation when expanded
     * @default '280px'
     */
    sideNavExpandedWidth?: string;
    /** 
     * Width of the side navigation when collapsed
     * @default '50px'
     */
    sideNavCollapsedWidth?: string;
    /** The main content of the application */
    children: ReactNode;
}

export const AppLayout = ({ topNav, sideNav, sideNavOpen = false, 
    sideNavExpandedWidth = "280px", sideNavCollapsedWidth = "50px", children }: AppLayoutProps
) => {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    return (
        <div className={styles.layout}>
            {sideNav}

            {/* Main content area */}
            <motion.div
                className={styles.mainArea}
                animate={{
                    marginLeft: !sideNav || isMobile 
                        ? '0px'
                        : (sideNavOpen ? sideNavExpandedWidth : sideNavCollapsedWidth)
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
