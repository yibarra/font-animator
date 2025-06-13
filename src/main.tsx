import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import MainProvider from './contexts/Main'
import Main from './layout/Main'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider>
      <Main />
    </MainProvider>
  </StrictMode>,
)
