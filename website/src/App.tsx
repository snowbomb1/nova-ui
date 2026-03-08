import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { SpeedInsights } from "@vercel/speed-insights/react";
import { routes } from './routes';
import NavBar from './NavBar';
import { AppLayout, FloatingButton } from '@nova-ui/core'
import { useState } from 'react';
import { SideNavBar } from './SideNavBar';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <AppLayout
          sideNavOpen={isOpen}
          sideNav={
            <SideNavBar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
          } 
          topNav={<NavBar />}
        >    
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} Component={r.Component} />
          ))}
        </Routes>
      <SpeedInsights />
      <FloatingButton onClick={() => setIsOpen(true)} variant='menu' ariaLabel='Component menu' />
      </AppLayout>
    </BrowserRouter>
  )
}

export default App;
