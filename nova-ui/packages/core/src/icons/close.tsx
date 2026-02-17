import styles from './svg.module.css';

interface ICloseProps {
    width: string;
}

export const IClose = ({ width }: ICloseProps) => {
    return (
        <svg className={styles.icon}
            viewBox="0 0 24 24" fill="none" width={`${width}px`}
        >
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    )
}