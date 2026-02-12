import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import styles from './tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    children: React.ReactNode;
    message?: string;
    position?: TooltipPosition;
}

const Tooltip = ({ children, message = undefined,  position = 'top' }: TooltipProps) => {
    const [visible, setVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!visible) return;
        const trigger = triggerRef.current?.getBoundingClientRect();
        const tooltip = tooltipRef.current;

        if (trigger && tooltip) {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const gap = 10;

            const positions = {
                top: {
                    x: trigger.left + (trigger.width / 2) - (tooltipWidth / 2),
                    y: trigger.top - tooltipHeight - gap,
                },
                bottom: {
                    x: trigger.left + (trigger.width / 2) - (tooltipWidth / 2),
                    y: trigger.bottom + gap,
                },
                left: {
                    x: trigger.left - tooltipWidth - gap,
                    y: trigger.top + (trigger.height / 2) - (tooltipHeight / 2),
                },
                right: {
                    x: trigger.right + gap,
                    y: trigger.top + (trigger.height / 2) - (tooltipHeight / 2),
                },
            };

            const { x, y } = positions[position];

            // Set CSS variables on the tooltip element
            if (tooltipRef.current) {
                tooltipRef.current.style.setProperty('--tooltip-x', `${x + window.scrollX}px`);
                tooltipRef.current.style.setProperty('--tooltip-y', `${y + window.scrollY}px`);
            }
        }
    }, [visible, position]);
    
    const handleMouseEnter = () => {
        if (!message) return;
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    }

    if (!message) {
        return <>{children}</>;
    }

    return (
        <>
            <div ref={triggerRef} className={styles.triggerWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            {createPortal(
                <AnimatePresence>
                    {visible && (
                        <motion.div
                            ref={tooltipRef}
                            data-position={position}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className={styles.tooltip}
                        >
                            {message}
                            <div className={styles.arrow} />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default Tooltip;