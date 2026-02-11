import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import styles from './toggle.module.css'

export interface ToggleProps {
    label: string;
    enabled: boolean;
    onChange: (enabaled: boolean) => void;
}


const Toggle = ({ label, enabled, onChange}: ToggleProps) => {
    const toggleRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        if (!toggleRef.current) return;
        if (enabled) toggleRef.current.style.setProperty('--toggle-direction', 'flex-end');
        else toggleRef.current.style.setProperty('--toggle-direction', 'flex-start')
    }, [enabled])

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <motion.button
                ref={toggleRef}
                className={`${styles.switch} ${enabled ? styles.enabled : ""}`}
                onClick={() => onChange(!enabled)}
                whileHover={{ scale: 1.1 }}
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

export default Toggle;