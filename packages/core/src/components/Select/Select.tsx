import { useMemo, useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from './select.module.css';
import { Input } from "../Input/Input";

export type Option = { label: string, value: string | number };

interface SharedProps {
    options: Option[];
    autoFilter?: boolean;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    label?: string;
    helperText?: string;
    error?: string;
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
        name,
        required,
        label,
        helperText,
        error,
    } = props;

    const selectId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const filteredOptions = useMemo(() => {
        return options.filter(o => 
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev => {
                        const last = prev || 0
                        return last < filteredOptions.length - 1 ? last + 1 : 0
                    }
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => {
                        const last = prev || 0
                        return last > 0 ? last - 1 : filteredOptions.length - 1
                    }
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex && filteredOptions && filteredOptions[highlightedIndex]) {
                        handleSelect(filteredOptions[highlightedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredOptions, highlightedIndex]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const displayLabel = useMemo(() => {
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
        <div className={styles.selectWrapper}>
            {(label || helperText) && (
                <div className={styles.labelRow}>
                    {label && (
                        <label htmlFor={selectId} className={styles.label}>
                            {label}
                            {required && <span className={styles.required} aria-label="required">*</span>}
                        </label>
                    )}
                    {helperText && (
                        <span id={`${selectId}-helper`} className={styles.helperText}>
                            {helperText}
                        </span>
                    )}
                </div>
            )}

            <div ref={containerRef} className={styles.container}>
                <select
                    name={name}
                    id={selectId}
                    required={required}
                    disabled={disabled}
                    multiple={selectType === "multi"}
                    value={
                        selectType === "multi" 
                            ? (selectedOption as Option[])?.map(o => String(o.value))
                            : (selectedOption as Option)?.value?.toString() || ""
                    }
                    className={styles.hiddenSelect}
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <div 
                    className={`${styles.control} ${disabled ? styles.disabled : ''} ${error ? styles.controlError : ''}`}
                    onClick={handleToggle}
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-describedby={
                        error ? `${selectId}-error` : 
                        helperText ? `${selectId}-helper` : 
                        undefined
                    }
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggle();
                        }
                    }}
                >
                    <span className={`${styles.value} ${!selectedOption ? styles.placeholder : ''}`}>
                        {displayLabel}
                    </span>
                    <motion.span 
                        className={styles.arrow}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        ▼
                    </motion.span>
                </div>

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
                                        hideClear
                                    />
                                </div>
                            )}
                            <div className={styles.list} role="listbox" aria-label="Select an option">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt, index) => {
                                        const selected = isSelected(opt);
                                        const highlighted = index === highlightedIndex;
                                        return (
                                            <div 
                                                key={opt.value} 
                                                className={`${styles.item} ${selected ? styles.selected : ''} ${index === highlightedIndex ? styles.highlighted : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(opt);
                                                }}
                                                tabIndex={highlighted ? 0 : -1}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        handleSelect(opt);
                                                    }
                                                }}
                                                role="option"
                                                aria-selected={selected}
                                                onFocus={() => {
                                                    if (highlighted) handleSelect(opt);
                                                }}
                                            >
                                                {selectType === "multi" && (
                                                    <span className={styles.checkbox} aria-hidden>
                                                        {selected ? '✓' : '○'}
                                                    </span>
                                                )}
                                                {opt.label}
                                            </div>
                                        )})
                                    ) : (
                                        <div className={styles.empty}>No options found</div>
                                    )}
                                </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <p id={`${selectId}-error`} className={styles.errorText} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};