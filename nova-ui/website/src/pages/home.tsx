import { useState } from 'react'
import styles from '../App.module.css';
import image from '../assets/PXL_20210711_131653816.PORTRAIT.jpg';
import { Button, Viewer, Header, Input, FormField, Modal, Box, Tooltip } from '@nova-ui/core'
import ViewerPlayground from './viewerPlayground';


const HomePage = () => {
      const [count, setCount] = useState(0)
      const [string, setString] = useState<string>();
      const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
        <>
            <div className={styles.appWrapper}>
            <Viewer src={image} alt="React logo" thumbnailWidth='200px' />
            <Tooltip message='This is a test'>
                <h1>Vite + React</h1>
            </Tooltip>
                <Button onClick={() => {
                setCount(prev => prev + 1)
                setIsVisible(true)
                }}>
                count is {count}
                </Button>
                <FormField label="This is a form" description='You have to fill it out'>
                <Input value={string} onChange={setString} />
                </FormField>
            </div>
            <Modal
            size="l"
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            header={<Header variant='h2'>Modal Header</Header>}
            footer={<Box position='center'>
                <Button variant='primary' onClick={() => setIsVisible(false)}>Close</Button>
            </Box>}
            >
            <ViewerPlayground />
            </Modal>
        </>
    )
}

export default HomePage;