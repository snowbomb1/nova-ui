import { useId } from 'react';
import { ExclamationCircleIcon } from '../../icons';
import styles from './form-field.module.css';
import type { LabelHTMLAttributes } from "react";

export interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
    /** Label text displayed above the field */
    label?: string;
    /** Helper text displayed below the field */
    helperText?: string;
    /** Error message to display below the field */
    error?: string;
    /** 
     * Whether the field is required
     * @default false
     */
    required?: boolean;
    /** 
     * Whether the field is disabled
     * @default false
     */
    disabled?: boolean;
    /** 
     * Whether the field should take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /** The form control element(s) to wrap */
    children: React.ReactNode;
    /** 
     * Shows a skeleton placeholder for the label. Use when the field hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}


export const FormField = ({ label, helperText, error, required=false, disabled=false, fullWidth=false, skeleton=false, children }: FormFieldProps) => {
    const fieldId = useId();

     return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container} ${!label ? styles.containerNoLabel : ''}`}>
                {label && (
                    <label
                        htmlFor={fieldId}
                        className={`${styles.label} ${error ? styles.labelError : ''} ${skeleton ? styles.labelSkeleton : ''}`}
                    >
                        {skeleton ? (
                            <span className={styles.labelSkeletonText}>{label}</span>
                        ) : (
                            <>
                                {label}
                                {required && <span className={styles.required}>*</span>}
                            </>
                        )}
                    </label>
                )}
                 <div
                    className={`
                        ${styles.border}
                        ${error ? styles.borderError : ''}
                        ${disabled ? styles.borderDisabled : ''}
                        ${fullWidth ? styles.fullWidth : ''}
                        ${skeleton ? styles.borderSkeleton : ''}
                    `}
                >
                    {children}
                </div>
            </div>
            {helperText && !skeleton && (
                <span className={styles.helperText}>{helperText}</span>
            )}

            {error && !skeleton && (
                <p className={styles.errorText} role="alert">
                    <ExclamationCircleIcon size={14} />
                    {error}
                </p>
            )}
        </div>
    );
}
