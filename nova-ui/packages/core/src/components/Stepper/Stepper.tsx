import { motion } from "motion/react";
import { IMinus } from "../../icons/minus";
import { IPlus } from "../../icons/plus";
import { Input } from "../Input";
import styles from './stepper.module.css';

export type StepperSize = 'sm' | 'md' | 'lg';

export interface StepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: StepperSize;
}

export const Stepper = ({ 
    value, 
    onChange, 
    min = 0, 
    max, 
    step = 1,
    disabled = false,
    size = 'md'
}: StepperProps) => {
    const decreaseDisabled = disabled || value <= min;
    const increaseDisabled = disabled || (max !== undefined && value >= max);
    
    const handleDecrease = () => {
        if (decreaseDisabled) return;
        onChange(Math.max(min, value - step));
    };

    const handleIncrease = () => {
        if (increaseDisabled) return;
        const newValue = value + step;
        onChange(max !== undefined ? Math.min(max, newValue) : newValue);
    };

    const handleInputChange = (val: string) => {
        const numValue = parseInt(val) || min;
        const clampedValue = max !== undefined 
            ? Math.min(max, Math.max(min, numValue))
            : Math.max(min, numValue);
        onChange(clampedValue);
    };

    const iconSize = {
        sm: "16",
        md: "20",
        lg: "24"
    };

    return (
        <motion.div 
            className={`${styles.stepper} ${styles[size]} ${disabled ? styles.disabled : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <IMinus 
                disable={decreaseDisabled} 
                width={iconSize[size]} 
                onClick={handleDecrease} 
            />
            
            <Input 
                className={styles.input}
                value={value.toString()} 
                onChange={handleInputChange}
                hideClear 
                disabled={disabled}
                type="number"
                min={min}
                max={max}
                step={step}
            />
            
            <IPlus 
                disable={increaseDisabled} 
                width={iconSize[size]} 
                onClick={handleIncrease} 
            />
        </motion.div>
    );
};