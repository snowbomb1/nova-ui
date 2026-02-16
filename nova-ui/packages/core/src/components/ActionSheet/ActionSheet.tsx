import { useLayoutEffect } from 'react';
import { motion, useMotionValue, PanInfo } from 'motion/react';
import styles from './action-sheet.module.css';

export interface ActionSheetAction {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    destructive?: boolean;
    disabled?: boolean;
}

export interface ActionSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    actions: ActionSheetAction[];
    showCancel?: boolean;
}

export const ActionSheet = ({ isOpen, onClose, title, message, actions, showCancel=true }: ActionSheetProps) => {
    const y = useMotionValue(0);

    useLayoutEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 150 || info.velocity.y > 500) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Sheet */}
            <motion.div
                className={styles.sheet}
                style={{ y }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={handleDragEnd}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
                {/* Drag handle */}
                <div className={styles.handle}>
                    <div className={styles.handleBar} />
                </div>

                {/* Header */}
                {(title || message) && (
                    <div className={styles.header}>
                        {title && <h3 className={styles.title}>{title}</h3>}
                        {message && <p className={styles.message}>{message}</p>}
                    </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className={`${styles.action} ${action.destructive ? styles.destructive : ''}`}
                            onClick={() => {
                                action.onClick();
                                onClose();
                            }}
                            disabled={action.disabled}
                        >
                            {action.icon && <span className={styles.actionIcon}>{action.icon}</span>}
                            <span className={styles.actionLabel}>{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* Cancel button */}
                {showCancel && (
                    <button className={styles.cancel} onClick={onClose}>
                        Cancel
                    </button>
                )}
            </motion.div>
        </>
    );
}