import { Box, Header } from "@nova-ui/core";
import styles from '../App.module.css';

const HomePage = () => {
    const isMobile = window.innerWidth <= 768;
    console.log(isMobile)
 
    return (
        <div className={styles.appWrapper}>
            <Box position='center'>
                <Header variant='h1'>Welcome to Nova UI</Header>
                <br/>
                {isMobile ? (
                    <p>Use the menu button to view components</p>
                ): (
                    <p>Use the search bar above or SideNav to view components</p>
                )}
            </Box>
        </div>
    )
}

export default HomePage;