import { motion } from "motion/react";
import styles from './styles.module.css';
import type { LabelHTMLAttributes } from "react";

interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    label: string;
    description?: string;
}


const FormField = ({ label, description, children }: FormFieldProps) => {
    return (
        <div className={styles.container}>
            <motion.label className={styles.label}>
                {label}
            </motion.label>
            <motion.span whileHover={{ scale: 1.5, translateX: 50 }} className={styles.description}>
                {description}
            </motion.span>
            {children}
        </div>
    )
}

export default FormField;