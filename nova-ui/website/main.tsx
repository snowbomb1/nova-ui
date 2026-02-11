import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@nova-ui/core/styles'
import App from '../website/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
