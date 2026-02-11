import { useState } from 'react';
import { Header, Input, TopNav } from '@nova-ui/core';
import { SupernovaLogo } from './logo/Logo'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const suggestions: string[] = routes.map(r => r?.path!)

function App() {
  const [string, setString] = useState<string>()

  const handleChange = (value: string) => {
    setString(value)
    const matchingRoute = routes.find((route) => route.path === value);
    if (matchingRoute) {
      window.location.href = value;
    }
  }

  return (
    <BrowserRouter>
      <TopNav
        header={
          <Header variant='h2'>
            Nova UI
          </Header>
        }
        logo={<SupernovaLogo />}
        search={<Input value={string} autoComplete='on' suggestions={suggestions} onChange={(value) => handleChange(value)} placeholder='Fill this out' />}
      />
      <Routes>
        {routes.map((r) => (
          <Route path={r.path} Component={r.Component} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
