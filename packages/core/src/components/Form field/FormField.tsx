import { cloneElement, isValidElement, useId, useState } from 'react';
import styles from './styles.module.css';
import type { LabelHTMLAttributes } from "react";

export interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label?: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}


export const FormField = ({ label, helperText, error, required, disabled, children }: FormFieldProps) => {
    const fieldId = useId();
    const [isFocused, setIsFocused] = useState(false);

     return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container} ${!label ? styles.containerNoLabel : ''}`}>
                {label && (
                    <label
                        htmlFor={fieldId}
                        className={`${styles.label} ${isFocused ? styles.labelFocused : ''} ${error ? styles.labelError : ''}`}
                    >
                        {label}
                        {required && <span>*</span>}
                    </label>
                )}
                 <div
                    className={`
                        ${styles.border}
                        ${isFocused ? styles.borderFocused : ''}
                        ${error ? styles.borderError : ''}
                        ${disabled ? styles.borderDisabled : ''}
                    `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    {children}
                </div>
            </div>
            {helperText && (
                <span className={styles.helperText}>{helperText}</span>
            )}

            {error && (
                <p className={styles.errorText} role="alert">{error}</p>
            )}
        </div>
    );
}