import { Children, cloneElement, isValidElement } from 'react';
import { motion } from "motion/react";
import styles from './styles.module.css';
import type { LabelHTMLAttributes } from "react";

export interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    children: React.ReactElement;
}


export const FormField = ({ label, description, error, required, children }: FormFieldProps) => {
    const fieldId = `field-${Math.random().toString(36).substring(2, 9)}`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    const enhancedChild = isValidElement(children)
        ? cloneElement(children, {
            id: fieldId,
            'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
            'aria-invalid': error ? 'true' : undefined,
            'aria-required': required ? 'true' : undefined,
        } as any)
        : children;

     return (
        <div className={styles.container}>
            <div className={styles.labelrow}>
                <label htmlFor={fieldId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required} aria-label="required">*</span>}
                </label>
                
                {description && (
                    <span id={descriptionId} className={styles.description}>
                        {description}
                    </span>
                )}
            </div>
            
            {enhancedChild}
            
            {error && (
                <p id={errorId} className={styles.errorText} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}