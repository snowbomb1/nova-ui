import styles from './checkbox.module.css';
import { useId } from "react";
import { MinusIcon, CheckIcon } from '../../icons';

export interface CheckboxProps {
    /** Whether the checkbox is checked */
    checked: boolean;
    /** Callback fired when the checkbox state changes */
    onChange: (checked: boolean) => void;
    /** Label text displayed next to the checkbox */
    label?: string;
    /** 
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /** 
     * Whether the checkbox is in an indeterminate state (partially checked)
     * @default false
     */
    indeterminate?: boolean;
    /** 
     * Shows a skeleton placeholder. Use when the checkbox hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const Checkbox = ({ checked, onChange, label, disabled=false, indeterminate=false, skeleton=false }: CheckboxProps) => {
    const id = useId();

    if (skeleton) {
        return (
            <div className={`${styles.container} ${styles.skeletonContainer}`} aria-hidden="true">
                <div className={styles.skeletonBox} />
                {label && <div className={styles.skeletonLabel}><span>{label}</span></div>}
            </div>
        );
    }

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
                    {checked && !indeterminate && <CheckIcon size={16} />}
                    {indeterminate && <MinusIcon size={16} />}
                </div>
                {label && <span onClick={(e) => e.stopPropagation()} className={styles.labelText}>{label}</span>}
            </label>
        </div>
    )
}
