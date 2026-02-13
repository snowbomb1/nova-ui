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
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div id="overlay" className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div id="modal"
                        className={styles.modal}
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
                            <div className={styles.close}>
                                <IClose width="30" onClick={onClose} />
                            </div>
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