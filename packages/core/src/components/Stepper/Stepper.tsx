import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import styles from './stepper.module.css';
import { useState } from "react";

export interface StepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}

export const Stepper = ({ 
    value, 
    onChange, 
    min = 0, 
    max, 
    step = 1,
    disabled = false,
}: StepperProps) => {
    const [inputValue, setInputValue] = useState(value.toString());
    const decreaseDisabled = disabled || value <= min;
    const increaseDisabled = disabled || (max !== undefined && value >= max);
    
    const handleDecrease = () => {
        if (decreaseDisabled) return;
        const newValue = Math.max(min, value - step);
        onChange(newValue);
        setInputValue(newValue.toString());
    };

    const handleIncrease = () => {
        if (increaseDisabled) return;
        const newValue = value + step;
        const clamped = max !== undefined ? Math.min(max, newValue) : newValue;
        onChange(clamped);
        setInputValue(clamped.toString());
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
    };

    return (
        <div className={`${styles.container}`}>
            <button
                className={`${styles.stepper} ${disabled ? styles.disabled : ''}`}
                disabled={disabled}
                onClick={handleDecrease}
                aria-label="Decrease value"
                type="button"
            >
                <MinusIcon width="20" strokeWidth={2.5} />
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
            />
            <button
                className={`${styles.stepper} ${disabled ? styles.disabled : ''}`}
                disabled={disabled}
                onClick={handleIncrease}
                aria-label="Increase value"
                type="button"
            >
                <PlusIcon width="20" strokeWidth={2.5} />
            </button>
        </div>
    );
};