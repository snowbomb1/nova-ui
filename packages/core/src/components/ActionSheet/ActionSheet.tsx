import { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, PanInfo, AnimatePresence } from 'motion/react';
import styles from './action-sheet.module.css';

export interface ActionSheetAction {
    /** Display text for the action */
    label: string;
    /** Icon element to display alongside the label */
    icon?: React.ReactNode;
    /** Callback fired when the action is selected */
    onClick: () => void;
    /** Whether this is a destructive action (displays in error color) */
    destructive?: boolean;
    /** Whether the action is disabled */
    disabled?: boolean;
}

export interface ActionSheetProps {
    /** Whether the action sheet is visible */
    isOpen: boolean;
    /** Callback fired when the action sheet should close */
    onClose: () => void;
    /** Title displayed at the top of the action sheet */
    title?: string;
    /** Descriptive message displayed below the title */
    message?: string;
    /** 
     * Position of the action sheet
     * - 'bottom' - Slides up from the bottom (mobile-style)
     * - 'side' - Slides in from the left side
     * @default 'bottom'
     */
    position?: "bottom" | "side";
    /** Array of actions to display */
    actions: ActionSheetAction[];
}

export const ActionSheet = ({ isOpen, onClose, title, message, actions, position="bottom" }: ActionSheetProps) => {
    const y = useMotionValue(0);
    const x = useMotionValue(0);
    const isBottom = position === 'bottom';
    const sheetRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (position === 'side') {
            if (info.offset.x < -250 || info.velocity.x < -500) handleClose();
        } else {
            if (info.offset.y > 250 || info.velocity.y > 500) handleClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    // Handle escape key
    useLayoutEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Focus trap
    useLayoutEffect(() => {
        if (!isOpen) return;
        const sheet = sheetRef.current;
        if (!sheet) return;

        const focusableElements = sheet.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        firstElement?.focus();
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className={styles.backdrop} onClick={handleClose} />

                    {/* Sheet */}
                    <motion.div
                        ref={sheetRef}
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
                                {title && <h3 id="action-sheet-title" className={styles.title}>{title}</h3>}
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
