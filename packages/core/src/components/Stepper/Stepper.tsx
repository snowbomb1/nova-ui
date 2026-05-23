import { PlusIcon, MinusIcon } from "../../icons";
import { FormField, FormFieldProps } from "../FormField";
import styles from './stepper.module.css';
import { useState, useRef, useEffect } from "react";

export interface StepperProps extends Pick<FormFieldProps, 'label' | 'helperText' | 'error' | 'required'> {
    /** The current numeric value */
    value: number;
    /** Callback fired when the value changes */
    onChange: (value: number) => void;
    /** 
     * The minimum allowed value
     * @default 0
     */
    min?: number;
    /** The maximum allowed value */
    max?: number;
    /** 
     * The amount to increment/decrement by
     * @default 1
     */
    step?: number;
    /** 
     * Whether the stepper is disabled
     * @default false
     */
    disabled?: boolean;
    /** 
     * Shows a skeleton placeholder. Use when the stepper hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const Stepper = ({ label, helperText, error, required,
    value, onChange, min = 0, max, step = 1, disabled = false, skeleton = false }: StepperProps) => {
    const [inputValue, setInputValue] = useState(value.toString());
    const [announcement, setAnnouncement] = useState('');
    const liveRef = useRef<HTMLDivElement>(null);
    const decreaseDisabled = disabled || value <= min;
    const increaseDisabled = disabled || (max !== undefined && value >= max);

    // Sync input value when prop changes
    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);
    
    const handleDecrease = () => {
        if (decreaseDisabled) return;
        const newValue = Math.max(min, value - step);
        onChange(newValue);
        setInputValue(newValue.toString());
        setAnnouncement(`Value decreased to ${newValue}`);
    };

    const handleIncrease = () => {
        if (increaseDisabled) return;
        const newValue = value + step;
        const clamped = max !== undefined ? Math.min(max, newValue) : newValue;
        onChange(clamped);
        setInputValue(clamped.toString());
        setAnnouncement(`Value increased to ${clamped}`);
    };

    const handleInputChange = (val: string) => {
        setInputValue(val);
    };

    const handleBlur = () => {
        const numValue = parseInt(inputValue);
        if (isNaN(numValue)) {
            setInputValue(value.toString());
            return;
        }
        const clamped = max !== undefined
            ? Math.min(max, Math.max(min, numValue))
            : Math.max(min, numValue);
        onChange(clamped);
        setInputValue(clamped.toString());
        if (clamped !== value) {
            setAnnouncement(`Value set to ${clamped}`);
        }
    };

    if (skeleton) {
        return (
            <FormField label={label} required={required} disabled={disabled} helperText={helperText} error={error} skeleton>
                <div className={`${styles.container} ${styles.skeletonContainer}`} aria-hidden="true">
                    <div className={styles.skeletonButton} />
                    <div className={styles.skeletonInput} />
                    <div className={styles.skeletonButton} />
                </div>
            </FormField>
        );
    }

    return (
        <FormField label={label} required={required} disabled={disabled} helperText={helperText} error={error}>
            <div className={`${styles.container}`} role="group" aria-label={label || "Stepper"}>
                <button
                    className={styles.stepper}
                    disabled={decreaseDisabled}
                    onClick={handleDecrease}
                    aria-label="Decrease value"
                    type="button"
                >
                    <MinusIcon size={18} />
                </button>
                
                <input
                    className={styles.input}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleBlur}
                    disabled={disabled}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label="Value"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value}
                />
                <button
                    className={styles.stepper}
                    disabled={increaseDisabled}
                    onClick={handleIncrease}
                    aria-label="Increase value"
                    type="button"
                >
                    <PlusIcon size={18} />
                </button>
                
                {/* Live region for screen reader announcements */}
                <div 
                    ref={liveRef}
                    aria-live="polite" 
                    aria-atomic="true" 
                    className={styles.srOnly}
                >
                    {announcement}
                </div>
            </div>
        </FormField>
    );
};
