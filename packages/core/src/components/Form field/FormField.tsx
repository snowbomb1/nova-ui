import { useId } from 'react';
import styles from './styles.module.css';
import type { LabelHTMLAttributes } from "react";

export interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label?: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}


export const FormField = ({ label, helperText, error, required=false, disabled=false, fullWidth=false, children }: FormFieldProps) => {
    const fieldId = useId();

     return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container} ${!label ? styles.containerNoLabel : ''}`}>
                {label && (
                    <label
                        htmlFor={fieldId}
                        className={`${styles.label} ${error ? styles.labelError : ''}`}
                    >
                        {label}
                        {required && <span>*</span>}
                    </label>
                )}
                 <div
                    className={`
                        ${styles.border}
                        ${error ? styles.borderError : ''}
                        ${disabled ? styles.borderDisabled : ''}
                        ${fullWidth ? styles.fullWidth : ''}
                    `}
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