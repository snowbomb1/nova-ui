import { useId, useRef } from "react";
import { FormField } from "../FormField"
import styles from './progressbar.module.css';

export interface ProgressBarProps {
    /** Label text displayed above the progress bar */
    label: string;
    /** The current progress value */
    value: number;
    /** The maximum value (100% progress) */
    max: number;
    /** 
     * Whether to show indeterminate (loading) state
     * @default false
     */
    indeterminate?: boolean;
    /** 
     * Size variant of the progress bar
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /** 
     * Shows a skeleton placeholder. Use when the progress bar hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const ProgressBar = ({ label, value, max, indeterminate = false, size = 'md', skeleton = false }: ProgressBarProps) => {
    const id = useId();
    const liveRef = useRef<HTMLDivElement>(null);
    const percent = Math.round((value / max) * 100);

    if (skeleton) {
        return (
            <FormField label={label} skeleton>
                <div className={`${styles.bar} ${styles.skeleton} ${styles[size]}`} aria-hidden="true">
                    <div className={styles.skeletonFill} />
                </div>
            </FormField>
        );
    }

    return (
        <FormField label={indeterminate ? label : `${label}: ${percent}%`}>
            <div
                className={`${styles.bar} ${styles[size]} ${indeterminate ? styles.indeterminate : ''}`}
                id={id}
                role="progressbar"
                aria-valuenow={indeterminate ? undefined : value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={indeterminate ? `${label}: Loading` : `${label}: ${percent}%`}
            >
                {indeterminate ? (
                    <div className={styles.indeterminateFill} />
                ) : (
                    <div className={styles.fill} style={{ width: `${percent}%` }} />
                )}
            </div>
            {/* Live region for screen reader announcements */}
            <div 
                ref={liveRef}
                aria-live="polite" 
                aria-atomic="true" 
                className={styles.srOnly}
            >
                {indeterminate ? 'Loading in progress' : `Progress: ${percent}%`}
            </div>
        </FormField>
    )
}
