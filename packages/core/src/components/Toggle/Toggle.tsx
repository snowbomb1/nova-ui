import { useId, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import styles from './toggle.module.css'

export interface ToggleProps {
    label: string;
    value: boolean;
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
}


export const Toggle = ({ label, value, onChange, disabled=false }: ToggleProps) => {
    const toggleRef = useRef<HTMLButtonElement>(null);
    const labelId = useId();

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
                role="switch"
                aria-checked={value}
                aria-labelledby={labelId}
                className={`${styles.switch} ${value ? styles.enabled : ""}`}
                onClick={() => onChange(!value)}
                disabled={disabled}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        onChange(!value);
                    }
                }}
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