import styles from './svg.module.css';

interface IMinusProps {
    width: string;
    disable?: boolean;
}

export const IMinus = ({ width }: IMinusProps) => {
    return (
        <svg 
            key="btn-enabled"
            className={styles.icon}
            style={{
                pointerEvents: "auto", 
                cursor: "pointer",
                opacity:1,
                filter: "none",
            }}
            viewBox="0 0 24 24" fill="none" width={`${width}px`}
            stroke="currentColor"
            strokeWidth="3"
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}