import { motion } from "motion/react";
import styles from './checkbox.module.css';

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
}

export const Checkbox = ({ checked, onChange, label, disabled=false, indeterminate=false }: CheckboxProps) => {
    const id = `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
            <input id={id} type="checkbox"
                checked={checked}
                onChange={({ target }) => onChange(target.checked)}
                disabled={disabled}
                className={styles.hiddenInput}
                aria-checked={indeterminate ? 'mixed' : checked}
            />
            <motion.label htmlFor={id}
                className={styles.label}
                whileTap={!disabled ? { scale: 0.95 }: {}}
            >
                <div className={`${styles.box} ${checked || indeterminate ? styles.checked : ''}`}>
                    {checked && !indeterminate && (
                        <motion.svg
                            className={styles.checkmark}
                            viewBox="0 0 24 24"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                            />
                        </motion.svg>
                    )}
                    {indeterminate && (
                        <motion.div 
                            className={styles.indeterminate}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </div>
                {label && <span className={styles.labelText}>{label}</span>}
            </motion.label>
        </div>
    )
}