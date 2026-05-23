import { useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon } from "../../icons";
import styles from './modal.module.css';

export type ModalSize = 's' | 'm' | 'l' | 'xl' | 'fullscreen';

export interface ModalProps {
    /** Whether the modal is visible */
    isVisible: boolean;
    /** Callback fired when the modal should close */
    onClose: () => void;
    /** The content to display inside the modal body */
    children: React.ReactNode;
    /** 
     * The size of the modal
     * - 's' - Small (400px max)
     * - 'm' - Medium (600px max)
     * - 'l' - Large (800px max)
     * - 'xl' - Extra large (1140px max)
     * - 'fullscreen' - Full screen
     * @default 'm'
     */
    size?: ModalSize;
    /** Content to display in the modal header */
    header?: React.ReactNode;
    /** Content to display in the modal footer */
    footer?: React.ReactNode;
    /** 
     * Whether to prevent closing the modal by clicking outside or pressing Escape
     * @default false
     */
    preventClose?: boolean;
    /** 
     * Whether to hide the close button
     * @default false
     */
    hideCloseButton?: boolean;
}


export const Modal = ({ isVisible, onClose, size="m", header, footer, children, preventClose=false, hideCloseButton=false }: ModalProps) => {
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
        if (!isVisible || preventClose) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, onClose, preventClose]);

    const handleOverlayClick = () => {
        if (!preventClose) {
            onClose();
        }
    };

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
                    onClick={handleOverlayClick}
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
                            {!hideCloseButton && (
                                <motion.button
                                    className={styles.close}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onClose}
                                    aria-label="Close Modal"
                                    type="button"
                                >
                                    <XMarkIcon size={24} />
                                </motion.button>
                            )}
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
