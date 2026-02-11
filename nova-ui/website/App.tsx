import { useState } from 'react'
import reactLogo from './assets/react.svg'
import styles from './App.module.css';
import { SupernovaLogo } from './logo/Logo'
import { Button, Viewer, TopNav, Header, Input, FormField, Modal, Box, Tooltip } from '@nova-ui/core'

function App() {
  const [count, setCount] = useState(0)
  const [string, setString] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <>
      <TopNav
        header={
          <Header variant='h2'>
            Nova UI
          </Header>
        }
        logo={<SupernovaLogo />}
        search={<Input value={string} onChange={setString} placeholder='Fill this out' />}
      />
    <div className={styles.appWrapper}>
      <Viewer src={reactLogo} alt="React logo" />
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
      size="s"
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      header={<Header variant='h2'>Modal Header</Header>}
      footer={<Box position='center'>
        <Button variant='primary' onClick={() => setIsVisible(false)}>Close</Button>
      </Box>}
    >
      This is my modal
    </Modal>
    </>
  )
}

export default App;
