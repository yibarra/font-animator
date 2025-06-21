import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import MainProvider from './contexts/Main'
import Main from './layout/Main'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MainProvider>
        <Main />
      </MainProvider>
    </BrowserRouter>
  </StrictMode>,
)
