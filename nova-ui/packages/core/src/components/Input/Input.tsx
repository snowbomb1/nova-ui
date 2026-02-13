import { useMemo, useState } from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "motion/react";
import { IClose } from '../../icons/close';
import styles from './styles.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    onChange?: (newValue: string) => void;
    disabled?: boolean;
    suggestions?: string[]
    hideClear?: boolean;
}

export const Input = ({ value, onChange, disabled=false, suggestions = [], placeholder, hideClear = false, ...props }: InputProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = useMemo(() => {
        if (suggestions.length === 0 || !value) return [];
        return suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    }, [suggestions, value])

    return (
        <div className={styles.inputContainer}>
        <motion.input
            id="input"
            className={styles.input}
            whileFocus={{ scale: 1.02 }}
            value={value}
            disabled={disabled}
            onChange={({ target }) => onChange?.(target.value)}
            placeholder={placeholder}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            {...props as HTMLMotionProps<"input">}
        />
        <div className={styles.clearButton}>
            {!hideClear && value && <IClose width="20" onClick={() => onChange?.("")} />}
        </div>
        <AnimatePresence>
                {showSuggestions && filtered.length > 0 && (
                    <motion.ul 
                        className={styles.suggestionsList}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filtered.map((suggestion) => (
                            <li 
                                key={suggestion}
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
    )
}