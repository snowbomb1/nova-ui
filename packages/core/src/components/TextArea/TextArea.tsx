import { useId } from "react";
import { FormField } from "../Form field";
import styles from './textarea.module.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    label: string;
    helperText?: string;
    fullWidth?: boolean;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    value: string;
    placeHolder?: string;
    onChange: (value: string) => void;
}

export const TextArea = ({ value, onChange, placeHolder, label,
    helperText, required=false, fullWidth=false, error, disabled=false, ...props }: TextAreaProps
) => {
    const fieldId = useId();

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
                    placeholder={placeHolder}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
                    {...props}
               />
            </div>
        </FormField>
    )
}