import styles from './alert.module.css';
import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
    type?: AlertType
    children: React.ReactNode;
}

export const Alert = ({ type="info", children }: AlertProps) => {

    const statusIcons = {
        success: <CheckCircleIcon width="20" />,
        warning: <ExclamationTriangleIcon width="20" />,
        error: <XCircleIcon width="20" />,
        info: <InformationCircleIcon width="20" />
    };

    return (
        <div
            className={`${styles.alert} ${styles[type]}`}
            role={type === 'error' ? 'alert' : 'status'}
            aria-live={type === 'error' ? 'assertive' : 'polite'}
            aria-atomic="true"
        >
            <div className={styles.iconWrapper}>
                <span className={styles.statusIcon}>
                    {statusIcons[type]}
                </span>
            </div>
            
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}