import { motion } from "motion/react";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./styles.module.css";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    variant?: 'primary' | 'secondary' | 'icon';
    disabled?: boolean;
    disabledMessage?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const Button = ({ children, onClick, variant = 'primary', disabled = false, disabledMessage, tooltipPosition = 'top', ...props }: ButtonProps) => {
    const variantClass = {
        primary: 'buttonPrimary',
        secondary: 'buttonSecondary',
        icon: 'buttonIcon',
    }

    return (
        <Tooltip message={disabled ? disabledMessage : undefined} position={tooltipPosition}>
            <motion.button
                className={`${styles.button} ${styles[variantClass[variant]]}`}
                disabled={disabled}
                onClick={onClick}
                whileHover={disabled ? undefined : { scale: 1.05 }}
                whileTap={disabled ? undefined : { scale: 0.95 }}
            >
                {children}
            </motion.button>
        </Tooltip>
    )
}

export default Button;