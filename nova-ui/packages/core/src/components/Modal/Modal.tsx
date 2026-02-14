import { useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IClose } from '../../icons/close';
import styles from './modal.module.css';

export type ModalSize = 's' | 'm' | 'l' | 'xl';

export interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}


export const Modal = ({ isVisible, onClose, size="m", header, footer, children}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isVisible) return;
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
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
    }, [isVisible]);

    useLayoutEffect(() => {
        if (!isVisible) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div id="overlay" className={styles.overlay}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div id="modal"
                        ref={modalRef}
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                        data-size={size}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <motion.div id="header" className={styles.header}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {header}
                             <motion.button
                                className={styles.close}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                onClick={onClose}
                                aria-label="Close Modal"
                                type="button"
                            >
                                 <IClose width="30" />
                            </motion.button>
                        </motion.div>
                        <motion.div id="content" className={styles.content}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                        {footer && (
                            <motion.div id="footer" className={styles.footer}
                                onClick={(event) => event.stopPropagation()}
                            >
                                {footer}
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}