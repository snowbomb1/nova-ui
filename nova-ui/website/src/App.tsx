import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { SpeedInsights } from "@vercel/speed-insights/react";
import { routes } from './routes';
import NavBar from './NavBar';
import { AppLayout, FloatingMenuButton } from '@nova-ui/core'
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
            <Route path={r.path} Component={r.Component} />
          ))}
        </Routes>
      <SpeedInsights />
      <FloatingMenuButton onClick={() => setIsOpen(true)} />
      </AppLayout>
    </BrowserRouter>
  )
}

export default App;
