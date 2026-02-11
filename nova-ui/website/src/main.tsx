import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import "@nova-ui/core/styles"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
