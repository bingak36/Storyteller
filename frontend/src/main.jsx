import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './store/auth.store.jsx'
import App from './App.jsx'
import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
