import { useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import styles from './sidenav.module.css';
import { IHamburger } from "../../icons/hamburger";
import { IClose } from "../../icons/close";
import { ActionSheet } from "../ActionSheet";

export type NavItem = {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

export type NavPosition = 'left' | 'right'

export interface SideNavProps {
    isOpen: boolean;
    onToggle: () => void;
    items: NavItem[];
    /*
    * @default "280px"
    */
    expandedWidth?: string;
    /*
    * @default "50px"
    */
    collapsedWidth?: string;
    position?: NavPosition;
}

export const SideNav = ({ isOpen, items, onToggle, expandedWidth = "280px", 
    collapsedWidth="50px", position = 'left' }: SideNavProps) => {
    const [active, setActive] = useState<string>(() => {
        const url = window.location.pathname;
        const path = url.slice(1);
        return path || ""
    })
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useLayoutEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onToggle();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onToggle]);

    if (isMobile) {
        return (
            <ActionSheet
                isOpen={isOpen}
                onClose={onToggle}
                title="Menu"
                actions={items.map((item) => {
                    return {
                        label: item.label,
                        icon: item.icon,
                        onClick: item.onClick
                    }
                })}
            />
        )
    }

    return (
        <>
            {/* Overlay - only when expanded */}
            {isOpen && (
                <div className={styles.overlay} onClick={onToggle} />
            )}

            {/* Sidenav */}
            <motion.nav
                className={`${styles.sidenav} ${styles[position]} ${!isOpen ? styles.collapsed : ''}`}
                initial={false}
                animate={{
                    width: isOpen ? expandedWidth : collapsedWidth
                }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200
                }}
            >
                {/* Header with toggle */}
                <div className={styles.header}>
                    <motion.button
                        className={styles.toggleButton}
                        onClick={onToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <IClose width="20" /> : <IHamburger width="20" />}
                    </motion.button>
                </div>

                {/* Nav items */}
                <div className={styles.items}>
                    {items
                        .filter(item => isOpen || item.icon)
                        .map((item) => (
                            <button
                                key={item.label}
                                className={`${styles.item} ${item.label.toLowerCase() === active ? styles.active : ''}`}
                                aria-current={item.label === active ? 'page' : undefined}
                                onClick={() => {
                                    setActive(item.label.toLowerCase())
                                    item.onClick();
                                    if (isOpen) {
                                        onToggle();
                                    }
                                }}
                                title={!isOpen ? item.label : undefined}
                            >
                                {item.icon && (
                                    <span className={styles.itemIcon}>{item.icon}</span>
                                )}
                                {isOpen && (
                                    <span className={styles.itemLabel}>{item.label}</span>
                                )}
                            </button>
                        ))}
                </div>
            </motion.nav>
        </>
    );
};