import { AnimatePresence, motion } from "motion/react";
import ThemeToggler from "./ThemeToggler";
import styles from './topnav.module.css';
import { useState, useLayoutEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";

interface TopNavProps {
    header: React.ReactNode;
    logo?: React.ReactNode;
    search?: React.ReactNode;
}

const TopNav = ({ header, logo, search }: TopNavProps) => {
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
            {/* Top Row: Always Visible */}
            <div className={styles.topRow}>
                <div className={styles.header}>
                    {logo}
                    {header}
                </div>
                
                <div className={styles.controls}>
                    <div className={styles.desktopTheme}>
                        <ThemeToggler />
                    </div>
                    {isMobile && (
                        <Button variant="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? (
                                <MdClose />
                            ) : <RxHamburgerMenu />
                            }
                        </Button>
                    )}
                </div>
            </div>

            {/* Collapsible Area: Search + Theme (on mobile) */}
            <AnimatePresence>
                {(isOpen || window.innerWidth > 768) && (
                    <motion.div 
                        className={styles.collapsibleContent}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className={styles.searchWrapper}>
                            {search}
                        </div>
                        <div className={styles.mobileTheme}>
                            <ThemeToggler />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default TopNav;