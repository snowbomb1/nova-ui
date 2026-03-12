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
    position?: "bottom" | "side"
    actions: ActionSheetAction[];
}

export const ActionSheet = ({ isOpen, onClose, title, message, actions, position="bottom" }: ActionSheetProps) => {
    const y = useMotionValue(0);
    const x = useMotionValue(0);
    const isBottom = position === 'bottom';

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (position === 'side') {
            if (info.offset.x < -250 || info.velocity.x < -500) handleClose();
        } else {
            if (info.offset.y > 250 || info.velocity.y > 500) handleClose();
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
                        className={`${styles.sheet} ${isBottom ? styles.bottomSheet : styles.sideSheet}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "action-sheet-title" : undefined}
                        style={isBottom ? { y } : { x }}
                        drag={isBottom ? "y" : "x"}
                        dragConstraints={isBottom ? { top: 0, bottom: 0 } : { left: 0, right: 0 }}
                        dragElastic={isBottom ? { top: 0, bottom: 0.5 } : { left: 0.5, right: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={isBottom ? { y: '100%' } : { x: '-100%' }}
                        animate={isBottom ? { y: 0 } : { x: 0 }}
                        exit={isBottom ? { y: '100%' } : { x: '-100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        {/* Drag handle */}
                        {isBottom && (
                            <div className={styles.handle}>
                                <div className={styles.handleBar} />
                            </div>
                        )}

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