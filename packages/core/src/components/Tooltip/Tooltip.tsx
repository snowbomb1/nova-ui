import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import styles from './tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    /** The element that triggers the tooltip on hover/focus */
    children: React.ReactNode;
    /** The text content to display in the tooltip. If undefined, tooltip is disabled. */
    message?: string;
    /** 
     * Position of the tooltip relative to the trigger element
     * @default 'top'
     */
    position?: TooltipPosition;
}

export const Tooltip = ({ children, message = undefined,  position = 'top' }: TooltipProps) => {
    const [visible, setVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

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
        if (isTouchDevice()) return; // ignore on touch devices
        if (!message) return;
        setVisible(true);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice()) return; // ignore on touch devices
        setVisible(false);
    };

    const handleFocus = () => {
        if (!message) return;
        setVisible(true);
    };

    const handleBlur = () => {
        setVisible(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && visible) {
            setVisible(false);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!isTouchDevice()) return; // ignore on non-touch devices
        e.stopPropagation();
        setVisible(prev => !prev);
    };

    useEffect(() => {
        if (!visible) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [visible]);

    if (!message) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                ref={triggerRef}
                className={styles.triggerWrapper}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-describedby={visible ? 'tooltip' : undefined}
            >
                {children}
            </div>
            {createPortal(
                <AnimatePresence>
                    {visible && (
                        <motion.div
                            ref={tooltipRef}
                            id="tooltip"
                            data-position={position}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className={styles.tooltip}
                            role="tooltip"
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
