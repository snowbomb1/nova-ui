import { PlusIcon, Bars3Icon } from '../../icons';
import styles from './floating-menu-button.module.css'

export type FloatingButtonVariant = 'menu' | 'action'

export interface FloatingButtonProps {
    /** 
     * The visual style variant
     * - 'menu' - Shows a hamburger menu icon
     * - 'action' - Shows a plus icon
     */
    variant: FloatingButtonVariant;
    /** Accessible label for the button (required for icon-only buttons) */
    ariaLabel: string;
    /** Callback fired when the button is clicked */
    onClick: () => void;
}

export const FloatingButton = ({ onClick, variant, ariaLabel }: FloatingButtonProps) => {
    return (
        <button
            className={styles.floatingButton}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {variant === "action" 
                ? (<PlusIcon size={24} />)
                : (<Bars3Icon size={24} />)
            }
        </button>
    );
};
