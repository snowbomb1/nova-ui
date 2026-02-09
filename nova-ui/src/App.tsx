import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Button from './components/Button/Button'
import Viewer from './components/Viewer/Viewer'
import styles from './App.module.css';
import TopNav from './components/TopNav/TopNav'
import Header from './components/Header/Header'
import { SupernovaLogo } from './Logo'
import Input from './components/Input/Input';
import FormField from './components/Form Field/FormField';

function App() {
  const [count, setCount] = useState(0)
  const [string, setString] = useState<string>();

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
      <h1>Vite + React</h1>
        <Button onClick={() => setCount(prev => prev + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <FormField label="This is a form" description='You have to fill it out'>
          <Input value={string} onChange={setString} />
        </FormField>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </div>
    </>
  )
}

export default App;
