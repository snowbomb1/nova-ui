import { IPlus } from '../../icons/plus';
import { IHamburger } from '../../icons/hamburger';
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
                ? (<IPlus width="24" />)
                : (<IHamburger width='24' />)
            }
        </button>
    );
};