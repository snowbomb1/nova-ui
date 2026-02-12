import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { SpeedInsights } from "@vercel/speed-insights/react";
import { routes } from './routes';
import NavBar from './NavBar';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {routes.map((r) => (
            <Route path={r.path} Component={r.Component} />
          ))}
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </>
  )
}

export default App;
