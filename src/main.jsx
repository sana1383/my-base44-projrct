import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
