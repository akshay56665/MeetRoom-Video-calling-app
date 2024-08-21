import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from './SocketContext.jsx'
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <CssBaseline/>
      <App/>
    </ContextProvider>
  </React.StrictMode>,
)
