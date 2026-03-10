import { useId, useMemo, useState } from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "motion/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FormField } from "../Form field";
import styles from './input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    suggestions?: string[];
    hideClear?: boolean;
    required?: boolean;
    label?: string;
    error?: string;
    fullWidth?: boolean;
    helperText?: string;
}

export const Input = ({ value, onChange, disabled=false, suggestions = [],
    placeholder, hideClear=false, label, error, required=false, fullWidth=false, helperText, ...props }: InputProps
) => {
    const inputId = useId();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { onBlur, ...rest } = props;

    const filtered = useMemo(() => {
        if (suggestions.length === 0 || !value) return [];
        return suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    }, [suggestions, value]);

    return (
        <FormField
            label={label} required={required}
            disabled={disabled} helperText={helperText}
            error={error} fullWidth={fullWidth}
        >
            <div className={styles.inputContainer}>
                <motion.input
                    id={inputId}
                    className={styles.input}
                    value={value}
                    disabled={disabled}
                    onChange={({ target }) => onChange?.(target.value)}
                    placeholder={placeholder}
                    required={required}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={(e) => {
                        setTimeout(() => setShowSuggestions(false), 150);
                        onBlur?.(e);
                    }}
                    {...rest as HTMLMotionProps<"input">}
                />

                {!hideClear && value && (
                    <button
                        className={styles.clearButton}
                        onClick={() => onChange?.("")}
                        aria-label="Clear input"
                        type="button"
                    >
                        <XMarkIcon width="20" strokeWidth={2.5} />
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
        </FormField>
    );
};