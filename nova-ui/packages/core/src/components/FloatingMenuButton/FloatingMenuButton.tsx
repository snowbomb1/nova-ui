import { PlusIcon, Bars3Icon } from '@heroicons/react/24/solid';
import styles from './floating-menu-button.module.css'

export type FloatingButtonVariant = 'menu' | 'action'

export interface FloatingButtonProps {
    variant: FloatingButtonVariant;
    ariaLabel: string;
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
                ? (<PlusIcon width="24" />)
                : (<Bars3Icon width="24" />)
            }
        </button>
    );
};