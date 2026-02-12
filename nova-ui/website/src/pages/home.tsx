import { Box, Header, Stepper } from "@nova-ui/core";
import styles from '../App.module.css';

const HomePage = () => {
 
    return (
        <div className={styles.appWrapper}>
            <Box position='center'>
                <Header variant='h1'>Welcome to Nova UI</Header>
                <br/>
                <p>Use the search bar above to view components</p>
                <p>Current available components playgrounds:</p>
                <ul>
                    <li>Box</li>
                    <li>Button</li>
                    <li>Toggle</li>
                    <li>Tooltip</li>
                    <li>TopNav</li>
                    <li>Viewer</li>
                </ul>
            </Box>
            <Stepper value={1} onChange={() => null} />
        </div>
    )
}

export default HomePage;