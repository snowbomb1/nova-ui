import { motion, AnimatePresence } from "motion/react";
import { MdClose } from "react-icons/md";
import styles from './modal.module.css';

export interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 's' | 'm' | 'l' | 'xl'
    header?: React.ReactNode;
    footer?: React.ReactNode;
}


const Modal = ({ isVisible, onClose, size="m", header, footer, children}: ModalProps) => {


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
                            <motion.div
                                className={styles.close}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MdClose size={30} onClick={onClose} />
                            </motion.div>
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

export default Modal;