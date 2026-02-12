import { AnimatePresence, motion } from "motion/react";
import { ThemeToggler } from "./ThemeToggler";
import styles from './topnav.module.css';
import { useState, useLayoutEffect } from "react";
import { IClose } from '../../icons/close';
import { Button } from "../Button/Button";
import { IHamburger } from "../../icons/hamburger";

export interface TopNavProps {
    header: React.ReactNode;
    logo?: React.ReactNode;
    logoClick?: () => void;
    search?: React.ReactNode;
}

export const TopNav = ({ header, logo, logoClick, search }: TopNavProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(true);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false);
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.nav className={styles.topnavContainer}>
            <div className={styles.topRow}>
                <div className={styles.header}>
                    <>
                        <div onClick={logoClick}>
                            {logo}
                        </div>
                        {header}
                    </>
                </div>
                
                {/* Only show hamburger on mobile */}
                {isMobile && (
                    <Button variant="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IClose width="20" /> : <IHamburger width="20" />}
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {(isOpen || !isMobile) && (
                    <motion.div 
                        className={styles.collapsibleContent}
                        initial={isMobile ? { height: 0, opacity: 0 } : false}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className={styles.searchWrapper}>
                            {search}
                        </div>
                        
                        {/* Desktop Theme: Pushed right via flex */}
                        <div className={styles.themeWrapper}>
                            <ThemeToggler />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}