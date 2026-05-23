import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from "../../icons";
import styles from './toast.module.css';

export type ToastPosition = 'top' | 'bottom';
export type ToastStatus = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
    /** Whether the toast is visible */
    visible: boolean;
    /** Callback fired when the toast should be dismissed */
    onDismiss: () => void;
    /** 
     * Time in milliseconds before the toast auto-dismisses. Set to 0 to disable auto-dismiss.
     * @default 5000
     */
    timeout?: number;
    /** 
     * Position of the toast on screen
     * @default 'top'
     */
    position?: ToastPosition;
    /** 
     * The type/severity of the toast which determines its color and icon
     * @default 'info'
     */
    status?: ToastStatus;
    /** The content to display inside the toast */
    children: React.ReactNode;
    /** 
     * Whether to show the dismiss button
     * @default true
     */
    dismissible?: boolean;
}

export const Toast = ({ 
    visible, 
    onDismiss, 
    timeout = 5000,
    position = "top", 
    status = "info", 
    children,
    dismissible = true
}: ToastProps) => {
    
    useEffect(() => {
        if (!visible || !timeout) return;
        
        const timer = setTimeout(() => {
            onDismiss();
        }, timeout);
        
        return () => clearTimeout(timer);
    }, [visible, timeout, onDismiss]);

    const statusIcons = {
        success: <CheckCircleIcon size={18} />,
        warning: <ExclamationTriangleIcon size={18} />,
        error: <XCircleIcon size={18} />,
        info: <InformationCircleIcon size={18} />
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
                                <XCircleIcon size={20} />
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
