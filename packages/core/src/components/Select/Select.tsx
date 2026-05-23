import { useMemo, useState, useEffect, useRef, useId, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon } from "../../icons";
import styles from './select.module.css';
import { Input } from "../Input/Input";
import { FormField } from "../FormField";

export type Option = { label: string, value: string | number };

interface SharedProps {
    /** Array of options to display in the dropdown */
    options: Option[];
    /** 
     * Whether to show a search input to filter options
     * @default false
     */
    autoFilter?: boolean;
    /** Placeholder text shown when no option is selected */
    placeholder?: string;
    /** 
     * Whether the select is disabled
     * @default false
     */
    disabled?: boolean;
    /** Name attribute for the hidden select element (for form submission) */
    name?: string;
    /** 
     * Whether the select is required
     * @default false
     */
    required?: boolean;
    /** Label text displayed above the select */
    label?: string;
    /** Helper text displayed below the select */
    helperText?: string;
    /** 
     * Whether the select should take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /** Error message to display below the select */
    error?: string;
    /** 
     * Shows a skeleton placeholder. Use when the select hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
    /** 
     * Whether to show a clear button when an option is selected
     * @default false
     */
    clearable?: boolean;
    /** 
     * Whether the select is in a loading state
     * @default false
     */
    loading?: boolean;
}

interface SingleSelectBaseProps extends SharedProps {
    /** 
     * The selection mode
     * @default 'single'
     */
    selectType?: 'single';
    /** The currently selected option */
    selectedOption?: Option;
}

interface SingleSelectClearableProps extends SingleSelectBaseProps {
    /** Whether to show a clear button when an option is selected */
    clearable: true;
    /** Callback fired when an option is selected or cleared */
    onChange: (option: Option | undefined) => void;
}

interface SingleSelectNonClearableProps extends SingleSelectBaseProps {
    /** Whether to show a clear button when an option is selected */
    clearable?: false;
    /** Callback fired when an option is selected */
    onChange: (option: Option) => void;
}

type SingleSelectProps = SingleSelectClearableProps | SingleSelectNonClearableProps;

interface MultiSelectProps extends SharedProps {
    /** The selection mode for multiple selections */
    selectType: 'multi';
    /** Array of currently selected options */
    selectedOption?: Option[];
    /** Callback fired when options are selected/deselected */
    onChange: (options: Option[]) => void;
    /** Whether to show a clear button (always available for multi-select) */
    clearable?: boolean;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

export const Select = (props: SelectProps) => {
    const { selectedOption, selectType = "single", autoFilter = false,
        options, onChange, placeholder = "Select...", disabled = false,
        name, required, label, helperText, error, fullWidth=false, skeleton=false,
        clearable=false, loading=false } = props;

    const selectId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [announcement, setAnnouncement] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSelect = useCallback((option: Option) => {
        if (disabled) return;
        if (selectType === "multi") {
            const current = Array.isArray(selectedOption) ? selectedOption : [];
            const exists = current.find(o => o.value === option.value);
            const next = exists
                ? current.filter(o => o.value !== option.value)
                : [...current, option];
            (onChange as (options: Option[]) => void)(next);
            setAnnouncement(exists ? `${option.label} removed` : `${option.label} selected`);
            controlRef.current?.focus();
        } else {
            (onChange as (option: Option | undefined) => void)(option);
            setAnnouncement(`${option.label} selected`);
            setIsOpen(false);
            controlRef.current?.blur();
        }
        setQuery("");
    }, [disabled, selectType, selectedOption, onChange]);

    const handleClear = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectType === "multi") {
            (onChange as (options: Option[]) => void)([]);
            setAnnouncement('Selection cleared');
        } else {
            (onChange as (option: Option | undefined) => void)(undefined);
            setAnnouncement('Selection cleared');
        }
    }, [selectType, onChange]);

    const filteredOptions = useMemo(() => {
        return options.filter(o =>
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    useEffect(() => {
        if (!isOpen) {
            setHighlightedIndex(null);
            return;
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev => {
                        const last = prev ?? -1;
                        return last < filteredOptions.length - 1 ? last + 1 : 0;
                    });
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => {
                        const last = prev ?? 0;
                        return last > 0 ? last - 1 : filteredOptions.length - 1;
                    });
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex !== null && filteredOptions[highlightedIndex]) {
                        handleSelect(filteredOptions[highlightedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    controlRef.current?.focus();
                    break;
                case 'Tab':
                    // Close on tab out
                    setIsOpen(false);
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredOptions, highlightedIndex, handleSelect]);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                controlRef.current?.focus();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleToggle = () => {
        if (disabled || loading) return;
        setIsOpen(prev => !prev);
    };

    const displayLabel = useMemo(() => {
        if (selectType === "multi" && Array.isArray(selectedOption)) {
            return selectedOption.length > 0
                ? selectedOption.map(o => o.label).join(", ")
                : placeholder;
        }
        return (selectedOption as Option)?.label || placeholder;
    }, [selectedOption, selectType, placeholder]);

    const isEmpty = selectType === 'multi'
        ? !Array.isArray(selectedOption) || selectedOption.length === 0
        : !selectedOption;

    const isSelected = (opt: Option) => {
        if (selectType === "multi" && Array.isArray(selectedOption)) {
            return selectedOption.some(o => o.value === opt.value);
        }
        return (selectedOption as Option)?.value === opt.value;
    };

    const showClearButton = clearable && !isEmpty && !disabled && !loading;

    if (skeleton) {
        return (
            <FormField
                label={label} required={required}
                disabled={disabled} helperText={helperText}
                error={error} fullWidth={fullWidth}
                skeleton
            >
                <div className={styles.container}>
                    <div className={`${styles.control} ${styles.skeleton}`} aria-hidden="true">
                        <span className={styles.skeletonText}>{placeholder}</span>
                        <span className={styles.arrow}>▼</span>
                    </div>
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
                    onChange={() => {}}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <div
                    ref={controlRef}
                    className={`${styles.control} ${disabled ? styles.disabled : ''} ${loading ? styles.loading : ''}`}
                    onClick={handleToggle}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={`${selectId}-listbox`}
                    aria-busy={loading}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (!isOpen) handleToggle();
                        }
                    }}
                >
                    <span className={`${styles.value} ${isEmpty ? styles.placeholder : ''}`}>
                        {loading ? 'Loading...' : displayLabel}
                    </span>
                    
                    <div className={styles.controls}>
                        {showClearButton && (
                            <button
                                type="button"
                                className={styles.clearButton}
                                onClick={handleClear}
                                aria-label="Clear selection"
                                tabIndex={-1}
                            >
                                <XMarkIcon size={16} />
                            </button>
                        )}
                        {loading ? (
                            <span className={styles.spinner} aria-hidden="true" />
                        ) : (
                            <motion.span
                                className={styles.arrow}
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                ▼
                            </motion.span>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            id={`${selectId}-listbox`}
                            className={styles.menu}
                            initial={{ opacity: 0, y: -4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            role="listbox"
                            aria-label={label || "Select an option"}
                            aria-multiselectable={selectType === "multi"}
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
                            <div className={styles.list}>
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt, index) => {
                                        const selected = isSelected(opt);
                                        const highlighted = index === highlightedIndex;
                                        return (
                                            <div
                                                key={opt.value}
                                                className={`${styles.item} ${selected ? styles.selected : ''} ${highlighted ? styles.highlighted : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(opt);
                                                }}
                                                tabIndex={-1}
                                                role="option"
                                                aria-selected={selected}
                                            >
                                                {selectType === "multi" && (
                                                    <span className={styles.checkbox} aria-hidden>
                                                        {selected ? '✓' : '○'}
                                                    </span>
                                                )}
                                                {opt.label}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className={styles.empty}>No options found</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Live region for screen reader announcements */}
                <div 
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
