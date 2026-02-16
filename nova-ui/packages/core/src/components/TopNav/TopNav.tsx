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

    return (
        <motion.nav className={styles.topnavContainer}>
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
        </motion.nav>
    );
}