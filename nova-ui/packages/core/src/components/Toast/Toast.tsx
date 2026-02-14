import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IClose } from "../../icons/close";
import styles from './toast.module.css';

export type ToastPosition = 'top' | 'bottom';
export type ToastStatus = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
    visible: boolean;
    onDismiss: () => void;
    timeout?: number;
    position?: ToastPosition;
    status?: ToastStatus;
    children: React.ReactNode;
    dismissible?: boolean;
}

export const Toast = ({ 
    visible, 
    onDismiss, 
    timeout = 5000,  // Changed to milliseconds
    position = "top", 
    status = "info", 
    children,
    dismissible = true
}: ToastProps) => {
    
    // Auto dismiss after timeout
    useEffect(() => {
        if (!visible || !timeout) return;
        
        const timer = setTimeout(() => {
            onDismiss();
        }, timeout);
        
        return () => clearTimeout(timer);
    }, [visible, timeout, onDismiss]);

    const statusIcons = {
        success: '✓',
        warning: '⚠',
        error: '✕',
        info: 'ⓘ'
    };

    return (
        <div className={`${styles.container} ${styles[position]}`}>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: position === 'top' ? -50 : 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: 100 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className={`${styles.toast} ${styles[status]}`}
                        role={status === 'error' ? 'alert' : 'status'}
                        aria-live={status === 'error' ? 'assertive' : 'polite'}
                        aria-atomic="true"
                    >
                        <div className={styles.glow} />
                        
                        <div className={styles.iconWrapper}>
                            <span className={styles.statusIcon}>
                                {statusIcons[status]}
                            </span>
                        </div>
                        
                        <div className={styles.content}>
                            {children}
                        </div>
                        
                        {dismissible && (
                            <motion.button
                                className={styles.closeButton}
                                onClick={onDismiss}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Dismiss"
                            >
                                <IClose width="16" />
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};