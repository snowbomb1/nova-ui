import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Button from './components/Button/Button'
import Viewer from './components/Viewer/Viewer'
import styles from './App.module.css';
import TopNav from './components/TopNav/TopNav'
import Header from './components/Header/Header'
import { SupernovaLogo } from './Logo'
import Input from './components/Input/Input';
import FormField from './components/Form field/FormField';
import Modal from './components/Modal/Modal';
import Box from './components/Box/Box';
import Tooltip from './components/Tooltip/Tooltip';

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
