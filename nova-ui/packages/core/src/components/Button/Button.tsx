import { motion, type HTMLMotionProps } from "motion/react";
import { Tooltip, TooltipPosition } from "../Tooltip/Tooltip";
import styles from "./button.module.css";

export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    disabledMessage?: string;
    tooltipPosition?: TooltipPosition;
}

export const Button = ({ children, onClick, variant = 'primary', disabled = false, disabledMessage, tooltipPosition = 'top', ...props }: ButtonProps) => {
    const variantClass = {
        primary: 'buttonPrimary',
        secondary: 'buttonSecondary',
        icon: 'buttonIcon',
    }

    return (
        <Tooltip message={disabled ? disabledMessage : undefined} position={tooltipPosition}>
            <button
                className={`${styles.button} ${styles[variantClass[variant]]}`}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        </Tooltip>
    )
}