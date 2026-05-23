import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from "../../icons";
import styles from './alert.module.css';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
    /** 
     * The type/severity of the alert which determines its color and icon
     * @default 'info'
     */
    type?: AlertType;
    /** The content to display inside the alert */
    children: React.ReactNode;
}

export const Alert = ({ type="info", children }: AlertProps) => {

    const statusIcons = {
        success: <CheckCircleIcon size={18} />,
        warning: <ExclamationTriangleIcon size={18} />,
        error: <XCircleIcon size={18} />,
        info: <InformationCircleIcon size={18} />
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
