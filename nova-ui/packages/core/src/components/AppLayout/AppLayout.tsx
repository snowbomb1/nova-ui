import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import styles from './applayout.module.css';
import { FloatingMenuButton } from '../FloatingMenuButton';

export interface AppLayoutProps {
    topNav?: ReactNode;
    sideNav?: ReactNode;
    sideNavOpen?: boolean;
    sideNavExpandedWidth?: string;
    sideNavCollapsedWidth?: string;
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
                    marginLeft: isMobile 
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