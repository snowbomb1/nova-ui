import { useState, useLayoutEffect, useId, useRef } from 'react';
import styles from './accordion.module.css';
import { MinusIcon, PlusIcon } from '../../icons';
import { useAccordionGroup } from './AccordionGroup';

export interface AccordionProps {
    /** The title displayed in the accordion header */
    title: string;
    /** The content to display when the accordion is expanded */
    children: React.ReactNode;
    /** 
     * Whether the accordion is open by default (ignored when inside AccordionGroup)
     * @default false
     */
    defaultOpen?: boolean;
    /** 
     * Unique identifier for this accordion (required when inside AccordionGroup)
     */
    id?: string;
    /** 
     * Shows a skeleton placeholder. Use when the accordion hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const Accordion = ({ title, children, defaultOpen=false, skeleton=false, id: propId }: AccordionProps) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Check if we're inside an AccordionGroup
    const group = useAccordionGroup();
    
    // Local state for standalone usage
    const [localIsOpen, setLocalIsOpen] = useState<boolean>(defaultOpen);
    
    // Determine if open based on group context or local state
    const isOpen = group ? group.openItems.has(id) : localIsOpen;
    
    const handleToggle = () => {
        if (group) {
            group.toggleItem(id);
        } else {
            setLocalIsOpen(!localIsOpen);
        }
    };

    useLayoutEffect(() => {
        if (!group) {
            setLocalIsOpen(defaultOpen);
        }
    }, [defaultOpen, group]);

    if (skeleton) {
        return (
            <div className={`${styles.container} ${styles.skeletonContainer}`} aria-hidden="true">
                <div className={styles.accordion}>
                    <span className={styles.skeletonHeader}><span>{title}</span></span>
                    <span className={styles.skeletonIcon} />
                </div>
                {defaultOpen && (
                    <div className={`${styles.content} ${styles.open}`}>
                        <div className={styles.skeletonContent}>
                            <div className={styles.skeletonLine} style={{ width: '100%' }} />
                            <div className={styles.skeletonLine} style={{ width: '80%' }} />
                            <div className={styles.skeletonLine} style={{ width: '60%' }} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button
                id={id}
                onClick={handleToggle}
                className={styles.accordion}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
            >
                <span className={styles.header}>{title}</span>
                <span className={styles.icon}>
                    {isOpen ? <MinusIcon size={20} /> : <PlusIcon size={20} />}
                </span>
            </button>
            <div 
                id={`${id}-content`}
                role="region" 
                aria-labelledby={id}
                className={`${styles.content} ${isOpen ? styles.open : ''}`}
                ref={contentRef}
            >
                <div>{children}</div>
            </div>
        </div>
    )
}
