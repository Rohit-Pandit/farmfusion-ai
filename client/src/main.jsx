import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

import AuthContextProvider from './context/AuthContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
     <Toaster position="top-right" reverseOrder={false} />
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
