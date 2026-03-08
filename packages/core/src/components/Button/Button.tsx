import { Tooltip, TooltipPosition } from "../Tooltip/Tooltip";
import styles from "./button.module.css";

export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    disabledMessage?: string;
    tooltipPosition?: TooltipPosition;
}

export const Button = ({ children, onClick, variant='primary', 
    disabled=false, disabledMessage, tooltipPosition='top', ...props }: ButtonProps
) => {

    return (
        <Tooltip message={disabled ? disabledMessage : undefined} position={tooltipPosition}>
            <button
                className={`${styles.button} ${styles[variant]}`}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        </Tooltip>
    )
}