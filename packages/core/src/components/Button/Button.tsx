import { Tooltip, TooltipPosition } from "../Tooltip/Tooltip";
import styles from "./button.module.css";

export type ButtonVariant = 'primary' | 'secondary' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The content to display inside the button */
    children: React.ReactNode;
    /** 
     * The visual style variant of the button
     * @default 'primary'
     */
    variant?: ButtonVariant;
    /** 
     * The size of the button
     * @default 'md'
     */
    size?: ButtonSize;
    /** 
     * Whether the button should take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /** 
     * Whether the button is disabled
     * @default false
     */
    disabled?: boolean;
    /** Message to display in a tooltip when the button is disabled */
    disabledMessage?: string;
    /** 
     * Position of the disabled tooltip
     * @default 'top'
     */
    tooltipPosition?: TooltipPosition;
    /** 
     * Shows a spinner and disables the button. Use when the button action is in progress.
     * @default false
     */
    loading?: boolean;
    /** 
     * Shows a skeleton placeholder. Use when the button hasn't loaded yet.
     * @default false
     */
    skeleton?: boolean;
}

export const Button = ({ children, onClick, variant='primary', size='md', fullWidth=false,
    disabled=false, disabledMessage, tooltipPosition='top', loading=false, skeleton=false, ...props }: ButtonProps
) => {

    if (skeleton) {
        return (
            <div 
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${styles.skeleton} ${fullWidth ? styles.fullWidth : ''}`}
                aria-hidden="true"
            >
                <span className={styles.skeletonText}>{children}</span>
            </div>
        );
    }

    return (
        <Tooltip message={disabled ? disabledMessage : undefined} position={tooltipPosition}>
            <button
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ''} ${fullWidth ? styles.fullWidth : ''}`}
                disabled={disabled || loading}
                onClick={onClick}
                aria-busy={loading}
                {...props}
            >
                {loading && (
                    <span className={styles.spinner} aria-hidden="true" />
                )}
                <span className={loading ? styles.loadingText : undefined}>{children}</span>
                {loading && <span className={styles.srOnly}>Loading</span>}
            </button>
        </Tooltip>
    )
}