import { useId } from "react";
import { FormField } from "../FormField";
import styles from './textarea.module.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    /** Label text displayed above the textarea */
    label?: string;
    /** Helper text displayed below the textarea */
    helperText?: string;
    /** 
     * Whether the textarea should take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /** 
     * Whether the textarea is required
     * @default false
     */
    required?: boolean;
    /** Error message to display below the textarea */
    error?: string;
    /** 
     * Whether the textarea is disabled
     * @default false
     */
    disabled?: boolean;
    /** The current value of the textarea */
    value: string;
    /** Placeholder text shown when the textarea is empty */
    placeholder?: string;
    /** Callback fired when the textarea value changes */
    onChange: (value: string) => void;
    /** 
     * Shows a skeleton placeholder. Use when the textarea hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const TextArea = ({ value, onChange, placeholder, label,
    helperText, required=false, fullWidth=false, error, disabled=false, skeleton=false, ...props }: TextAreaProps
) => {
    const fieldId = useId();

    if (skeleton) {
        return (
            <FormField
                disabled={disabled} fullWidth={fullWidth} 
                required={required} label={label} 
                helperText={helperText} error={error}
                skeleton
            >
                <div className={styles.container}>
                    <div className={styles.skeleton} aria-hidden="true" />
                </div>
            </FormField>
        );
    }

    return (
        <FormField
            disabled={disabled} fullWidth={fullWidth} 
            required={required} label={label} 
            helperText={helperText} error={error}
        >
            <div className={styles.container}>
                <textarea
                    id={fieldId}
                    className={styles.field}
                    value={value}
                    onChange={({ target }) => onChange(target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
                    {...props}
               />
            </div>
        </FormField>
    )
}
