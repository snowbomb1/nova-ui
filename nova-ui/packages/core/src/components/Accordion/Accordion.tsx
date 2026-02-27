import { useState, useLayoutEffect, useId } from 'react';
import styles from './accordion.module.css';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

export interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Accordion = ({ title, children, defaultOpen=false }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const id = useId();

    useLayoutEffect(() => {
        setIsOpen(defaultOpen)
    }, [defaultOpen])

    return (
        <div className={styles.container}>
            <button
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                className={styles.accordion}
                aria-expanded={isOpen}
            >
                <span className={styles.header}>{title}</span>
                <span className={styles.icon}>
                    {isOpen ? <MinusIcon width="24" /> : <PlusIcon width="24" />}
                </span>
            </button>
            <div role="region" aria-labelledby={id}
                className={`${styles.content} ${isOpen ? styles.open : undefined}`}
            >
                {children}
            </div>
        </div>
    )
}