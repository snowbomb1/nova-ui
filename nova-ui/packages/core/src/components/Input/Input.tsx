import { useId, useMemo, useState } from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "motion/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import styles from './input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    suggestions?: string[]
    hideClear?: boolean;
    required?: boolean;
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = ({ value, onChange, disabled=false, suggestions = [], 
    placeholder, hideClear=false, label, error, required=false, helperText, ...props }: InputProps
) => {
    const inputId = useId();
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = useMemo(() => {
        if (suggestions.length === 0 || !value) return [];
        return suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    }, [suggestions, value])

    return (
        <div className={styles.inputWrapper}>
            {(label || helperText) && (
                <div className={styles.labelRow}>
                    {label && (
                        <label htmlFor={inputId} className={styles.label}>
                            {label}
                            {required && <span className={styles.required} aria-label="required">*</span>}
                        </label>
                    )}
                    {helperText && (
                        <span id={`${inputId}-helper`} className={styles.helperText}>
                            {helperText}
                        </span>
                    )}
                </div>
            )}
            
            <div className={styles.inputContainer}>
                <motion.input
                    id={inputId}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                    whileFocus={{ scale: 1.02 }}
                    value={value}
                    disabled={disabled}
                    onChange={({ target }) => onChange?.(target.value)}
                    placeholder={placeholder}
                    required={required}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    {...props as HTMLMotionProps<"input">}
                />
                {!hideClear && value && (
                    <button
                        className={styles.clearButton}
                        onClick={() => onChange?.("")}
                        aria-label="Clear input"
                        type="button"
                    >
                        <XMarkIcon width="20" />
                    </button>
                )}
                
                <AnimatePresence>
                    {showSuggestions && filtered.length > 0 && (
                        <motion.ul 
                            className={styles.suggestionsList}
                            role="listbox"
                            aria-label="Suggestions"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {filtered.map((suggestion) => (
                                <li 
                                    key={suggestion}
                                    role="option"
                                    aria-selected={value === suggestion}
                                    className={styles.suggestionItem}
                                    onClick={() => {
                                        onChange?.(suggestion);
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <p id={`${inputId}-error`} className={styles.errorText} role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}