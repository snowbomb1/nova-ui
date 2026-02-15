import { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './accordion.module.css';

export interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Accordion = ({ title, children, defaultOpen=false }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    useLayoutEffect(() => {
        setIsOpen(defaultOpen)
    }, [defaultOpen])

    return (
        <div className={styles.container}>
            <button 
                className={styles.header}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <motion.span
                    className={styles.icon}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        className={styles.content}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.contentInner}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}