import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import styles from './toggle.module.css'

export interface ToggleProps {
    label: string;
    value: boolean;
    onChange: (enabaled: boolean) => void;
    disabled?: boolean;
}


export const Toggle = ({ label, value, onChange, disabled=false }: ToggleProps) => {
    const toggleRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        if (!toggleRef.current) return;
        if (value) toggleRef.current.style.setProperty('--toggle-direction', 'flex-end');
        else toggleRef.current.style.setProperty('--toggle-direction', 'flex-start')
    }, [value])

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <motion.button
                ref={toggleRef}
                aria-label={`Toggle ${label}`}
                className={`${styles.switch} ${value ? styles.enabled : ""}`}
                onClick={() => onChange(!value)}
                disabled={disabled}
                {...(!disabled && { whileHover: { scale: 1.1 } })}
            >
                <motion.div 
                    layout
                    className={styles.handle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                />
            </motion.button>
        </div>
    )
}