import styles from './playground.module.css';

interface PlaygroundProps {
    utils: React.ReactNode;
    component: React.ReactNode;
    code: string;
}


const Playground = ({ utils, component, code }: PlaygroundProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.utils}>
                {utils}
            </div>
            <div className={styles.displaySection}>
                <div className={styles.component}>
                    {component}
                </div>
                <pre className={styles.code}>
                    <code>{code.trim()}</code>
                </pre>
            </div>
        </div>
    )
}

export default Playground;