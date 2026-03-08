import styles from './checkbox.module.css';
import { useId } from "react";
import { MinusIcon, CheckIcon } from '@heroicons/react/24/solid';

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
}

export const Checkbox = ({ checked, onChange, label, disabled=false, indeterminate=false }: CheckboxProps) => {
    const id = useId();
    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
            <input id={id} type="checkbox"
                checked={checked}
                onChange={({ target }) => onChange(target.checked)}
                disabled={disabled}
                className={styles.hiddenInput}
                aria-checked={indeterminate ? 'mixed' : checked}
            />
            <label htmlFor={id}
                className={styles.label}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`${styles.box} ${checked || indeterminate ? styles.checked : ''}`}>
                    {checked && !indeterminate && <CheckIcon width="20" />}
                    {indeterminate && <MinusIcon width="20" />}
                </div>
                {label && <span onClick={(e) => e.stopPropagation()} className={styles.labelText}>{label}</span>}
            </label>
        </div>
    )
}