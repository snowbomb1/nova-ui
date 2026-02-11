import styles from './playground.module.css';

interface PlaygroundProps {
    utils: React.ReactNode;
    component: React.ReactNode;
}


const Playground = ({ utils, component }: PlaygroundProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.utils}>
                {utils}
            </div>
            <div className={styles.component}>
                {component}
            </div>
        </div>
    )
}

export default Playground;