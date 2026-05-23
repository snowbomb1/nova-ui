import { useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import styles from './sidenav.module.css';
import { XMarkIcon, Bars3Icon } from '../../icons';
import { ActionSheet } from "../ActionSheet";

export type NavItem = {
    /** Display text for the navigation item */
    label: string;
    /** Icon element to display alongside the label */
    icon?: React.ReactNode;
    /** Whether this is a destructive action (displays in error color) */
    destructive?: boolean;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** 
     * Type of item - 'nav' for navigation links, 'action' for buttons
     * @default 'nav'
     */
    type?: 'nav' | 'action';
    /** Callback fired when the item is clicked */
    onClick: () => void;
}

export type NavPosition = 'left' | 'right'

export interface SideNavProps {
    /** Whether the side navigation is expanded */
    isOpen: boolean;
    /** Callback fired when the navigation should toggle open/closed */
    onToggle: () => void;
    /** Array of navigation items to display */
    items: NavItem[];
    /** 
     * Width of the navigation when expanded
     * @default '280px'
     */
    expandedWidth?: string;
    /** 
     * Width of the navigation when collapsed (icons only)
     * @default '50px'
     */
    collapsedWidth?: string;
    /** 
     * Which side of the screen to display the navigation
     * @default 'left'
     */
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
                        onClick: item.onClick,
                        destructive: item.destructive
                    }
                })}
            />
        )
    }

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className={styles.overlay} 
                    onClick={onToggle} 
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onToggle();
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close navigation"
                />
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
                        {isOpen ? <XMarkIcon size={24} /> : <Bars3Icon size={24} />}
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
                                    if (item.type !== 'action') {
                                        setActive(item.label.toLowerCase());
                                    }
                                    item.onClick();
                                    if (isOpen) onToggle();
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
