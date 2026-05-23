import { useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon } from "../../icons";
import { FormField } from "../FormField";
import styles from './input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'prefix'> {
    /** The current value of the input */
    value: string | undefined;
    /** Callback fired when the input value changes */
    onChange?: (newValue: string) => void;
    /** 
     * The type of input
     * @default "text"
     */
    type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number';
    /** 
     * Whether the input is disabled
     * @default false
     */
    disabled?: boolean;
    /** Array of suggestion strings to show as autocomplete options */
    suggestions?: string[];
    /** 
     * Whether to hide the clear button
     * @default false
     */
    hideClear?: boolean;
    /** 
     * Whether the input is required
     * @default false
     */
    required?: boolean;
    /** Label text displayed above the input */
    label?: string;
    /** Error message to display below the input */
    error?: string;
    /** 
     * Whether the input should take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /** Helper text displayed below the input */
    helperText?: string;
    /** 
     * Shows a skeleton placeholder. Use when the input hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
    /** Content to display before the input (e.g., icon or text) */
    startAdornment?: React.ReactNode;
    /** Content to display after the input (e.g., icon or text) */
    endAdornment?: React.ReactNode;
}

export const Input = ({ value, onChange, disabled=false, suggestions = [],
    placeholder, hideClear=false, label, error, required=false, fullWidth=false, helperText, skeleton=false, type='text', startAdornment, endAdornment, ...props }: InputProps
) => {
    const inputId = useId();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { onBlur, ...rest } = props;

    const filtered = useMemo(() => {
        if (suggestions.length === 0 || !value) return [];
        return suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    }, [suggestions, value]);

    // Determine if we should show the clear button
    const showClear = !hideClear && value && type !== 'password';
    const hasPrefix = !!startAdornment;
    const hasSuffix = !!endAdornment || showClear;

    if (skeleton) {
        return (
            <FormField
                label={label} required={required}
                disabled={true} helperText={helperText}
                error={error} fullWidth={fullWidth}
                skeleton
            >
                <div className={`${styles.inputContainer} ${styles.skeleton}`}>
                    <div className={styles.skeletonInput} aria-hidden="true" />
                </div>
            </FormField>
        );
    }

    return (
        <FormField
            label={label} required={required}
            disabled={disabled} helperText={helperText}
            error={error} fullWidth={fullWidth}
        >
            <div className={styles.inputContainer}>
                {startAdornment && (
                    <span className={styles.prefix}>{startAdornment}</span>
                )}
                <input
                    id={inputId}
                    type={type}
                    className={`${styles.input} ${hasPrefix ? styles.hasPrefix : ''} ${hasSuffix ? styles.hasSuffix : ''}`}
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
                    {...rest}
                />

                {(endAdornment || showClear) && (
                    <span className={styles.suffix}>
                        {showClear && (
                            <button
                                className={styles.clearButton}
                                onClick={() => onChange?.("")}
                                aria-label="Clear input"
                                type="button"
                            >
                                <XMarkIcon size={18} />
                            </button>
                        )}
                        {endAdornment}
                    </span>
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
