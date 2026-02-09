import { motion } from "motion/react";
import styles from './styles.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    onChange: (newValue: string) => void;
}

const Input = ({value, onChange, placeholder, ...props}: InputProps) => {
    return (
        <motion.input
            id="input"
            className={styles.input}
            whileFocus={{ scale: 1.02 }}
            value={value}
            onChange={({ target }) => onChange(target.value)}
            placeholder={placeholder}
        />
    )
}

export default Input;