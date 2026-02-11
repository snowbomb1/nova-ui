import { useMemo, useState } from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "motion/react";
import { MdClose } from "react-icons/md";
import styles from './styles.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    onChange: (newValue: string) => void;
    autoComplete?: "on" | "off";
    suggestions?: string[]
}

const Input = ({ value, onChange, autoComplete = "off", suggestions = [], placeholder, ...props }: InputProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = useMemo(() => {
        if (autoComplete === "off" || suggestions.length === 0 || !value) return [];
        return suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    }, [autoComplete, suggestions, value])

    return (
        <div className={styles.inputContainer}>
        <motion.input
            id="input"
            className={styles.input}
            whileFocus={{ scale: 1.02 }}
            value={value}
            onChange={({ target }) => onChange(target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            {...props as HTMLMotionProps<"input">}
        />
        {value && <MdClose className={styles.clearButton} size={20} onClick={() => onChange("")} />}
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
                                    onChange(suggestion);
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

export default Input;