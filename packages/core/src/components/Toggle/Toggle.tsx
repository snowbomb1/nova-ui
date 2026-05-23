import { useId, useLayoutEffect, useRef } from "react";
import styles from './toggle.module.css'

export interface ToggleProps {
    /** Label text displayed next to the toggle */
    label: string;
    /** 
     * Whether the toggle is on or off
     * @deprecated Use `checked` instead for consistency with Checkbox
     */
    value?: boolean;
    /** Whether the toggle is on or off */
    checked?: boolean;
    /** Callback fired when the toggle state changes */
    onChange: (enabled: boolean) => void;
    /** 
     * Whether the toggle is disabled
     * @default false
     */
    disabled?: boolean;
    /** 
     * Shows a skeleton placeholder. Use when the toggle hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}


export const Toggle = ({ label, value, checked, onChange, disabled=false, skeleton=false }: ToggleProps) => {
    const toggleRef = useRef<HTMLButtonElement>(null);
    const labelId = useId();
    
    // Support both `checked` and `value` for backwards compatibility
    const isChecked = checked ?? value ?? false;

    useLayoutEffect(() => {
        if (!toggleRef.current) return;
        if (isChecked) toggleRef.current.style.setProperty('--toggle-direction', 'flex-end');
        else toggleRef.current.style.setProperty('--toggle-direction', 'flex-start')
    }, [isChecked])

    if (skeleton) {
        return (
            <div className={styles.wrapper} aria-hidden="true">
                <span className={styles.skeletonLabel}><span>{label}</span></span>
                <div className={styles.skeletonSwitch} />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <span id={labelId} className={styles.label}>{label}</span>
            <button
                ref={toggleRef}
                role="switch"
                aria-checked={isChecked}
                aria-labelledby={labelId}
                className={`${styles.switch} ${isChecked ? styles.enabled : ""}`}
                onClick={() => onChange(!isChecked)}
                disabled={disabled}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        onChange(!isChecked);
                    }
                }}
            >
                <div className={styles.handle} />
            </button>
        </div>
    )
}
