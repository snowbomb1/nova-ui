import { useId } from "react";
import { FormField } from "../Form field"
import styles from './progressbar.module.css';

interface ProgressBarProps {
    label: string;
    value: number;
    max: number;

}

export const ProgressBar = ({ label, value, max }: ProgressBarProps) => {
    const id = useId();
    const percent = Math.round((value / max) * 100);

    return (
        <FormField label={`${label}: ${percent}%`}>
            <div
                className={styles.bar}
                id={id}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div className={styles.fill} style={{ width: `${percent}%` }} />
            </div>
        </FormField>
    )
}