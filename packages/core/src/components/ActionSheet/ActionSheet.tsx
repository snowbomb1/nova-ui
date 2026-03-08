import { motion, useMotionValue, PanInfo, AnimatePresence } from 'motion/react';
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
}

export const ActionSheet = ({ isOpen, onClose, title, message, actions }: ActionSheetProps) => {
    const y = useMotionValue(0);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 250 || info.velocity.y > 500) {
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className={styles.backdrop} onClick={handleClose} />

                    {/* Sheet */}
                    <motion.div
                        className={styles.sheet}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "action-sheet-title" : undefined}
                        style={{ y }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={handleDragEnd}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
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
                                        handleClose();
                                    }}
                                    disabled={action.disabled}
                                >
                                    {action.icon && <span className={styles.actionIcon}>{action.icon}</span>}
                                    <span className={styles.actionLabel}>{action.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Cancel button */}
                        <button className={styles.cancel} onClick={handleClose}>
                            Cancel
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}