import { motion } from "motion/react";
import styles from './alert.module.css';


export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
    type?: AlertType
    children: React.ReactNode;
}

const statusIcons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ⓘ'
};

export const Alert = ({ type="info", children }: AlertProps) => {
    return (
        <div
            className={`${styles.alert} ${styles[type]}`}
            role={type === 'error' ? 'alert' : 'status'}
            aria-live={type === 'error' ? 'assertive' : 'polite'}
            aria-atomic="true"
        >
            <div className={styles.iconWrapper}>
                <span className={styles.statusIcon}>
                    {statusIcons[type]}
                </span>
            </div>
            
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}