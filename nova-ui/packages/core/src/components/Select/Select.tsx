import { useMemo, useState, type SelectHTMLAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from './select.module.css';
import { Input } from "../Input/Input";

export type Option = { label: string, value: string | number };

interface SharedProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
    options: Option[];
    autoFilter?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

interface SingleSelectProps extends SharedProps {
    selectType?: 'single';
    selectedOption?: Option;
    onChange: (option: Option) => void;
}

interface MultiSelectProps extends SharedProps {
    selectType: 'multi';
    selectedOption?: Option[];
    onChange: (options: Option[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

export const Select = (props: SelectProps) => {
    const {
        selectedOption,
        selectType = "single",
        autoFilter = false,
        options,
        onChange,
        placeholder = "Select...",
        disabled = false,
        className = "",
        name,
        id,
        required,
        ...htmlProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSelect = (option: Option) => {
        if (disabled) return;

        if (selectType === "multi") {
            const current = Array.isArray(selectedOption) ? selectedOption : [];
            const exists = current.find(o => o.value === option.value);
            const next = exists
                ? current.filter(o => o.value !== option.value)
                : [...current, option];
            
            (onChange as (options: Option[]) => void)(next);
        } else {
            (onChange as (option: Option | undefined) => void)(option);
            setIsOpen(false);
        }
        setQuery("");
    };

    const handleToggle = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const filteredOptions = useMemo(() => {
        return options.filter(o => 
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    const label = useMemo(() => {
        if (selectType === "multi" && Array.isArray(selectedOption)) {
            return selectedOption.length > 0 
                ? selectedOption.map(o => o.label).join(", ") 
                : placeholder;
        }
        return (selectedOption as Option)?.label || placeholder;
    }, [selectedOption, selectType, placeholder]);

    const isSelected = (opt: Option) => {
        if (selectType === "multi" && Array.isArray(selectedOption)) {
            return selectedOption.some(o => o.value === opt.value);
        }
        return (selectedOption as Option)?.value === opt.value;
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <select
                name={name}
                id={id}
                required={required}
                disabled={disabled}
                multiple={selectType === "multi"}
                value={
                    selectType === "multi" 
                        ? (selectedOption as Option[])?.map(o => String(o.value)) // Force values to strings
                        : (selectedOption as Option)?.value?.toString() || ""     // Force value to string
                }
                className={styles.hiddenSelect}
                tabIndex={-1}
                aria-hidden="true"
                {...htmlProps}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>

            <motion.div 
                className={`${styles.control} ${disabled ? styles.disabled : ''}`}
                onClick={handleToggle}
                whileHover={!disabled ? { borderColor: 'var(--color-primary)' } : {}}
                transition={{ duration: 0.2 }}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle();
                    }
                }}
            >
                <span className={`${styles.value} ${!selectedOption ? styles.placeholder : ''}`}>
                    {label}
                </span>
                <motion.span 
                    className={styles.arrow}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ▼
                </motion.span>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className={styles.menu}
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        role="listbox"
                    >
                        {autoFilter && (
                            <div className={styles.searchWrapper}>
                                <Input 
                                    value={query} 
                                    onChange={setQuery} 
                                    placeholder="Search..." 
                                    autoFocus
                                />
                            </div>
                        )}
                        <div className={styles.list}>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <motion.div 
                                        key={opt.value} 
                                        className={`${styles.item} ${isSelected(opt) ? styles.selected : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(opt);
                                        }}
                                        whileHover={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                                        transition={{ duration: 0.15 }}
                                        role="option"
                                        aria-selected={isSelected(opt)}
                                    >
                                        {selectType === "multi" && (
                                            <span className={styles.checkbox}>
                                                {isSelected(opt) ? '✓' : '○'}
                                            </span>
                                        )}
                                        {opt.label}
                                    </motion.div>
                                ))
                            ) : (
                                <div className={styles.empty}>No options found</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};