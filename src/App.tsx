import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContext'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ListsContextProvider } from './contexts/ListsContext'
import { CountDownContextProvider } from './contexts/CountDownCycle'

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <ListsContextProvider>
            <CyclesContextProvider>
              <CountDownContextProvider>
                <Router />
              </CountDownContextProvider>
            </CyclesContextProvider>
          </ListsContextProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </DndProvider>
  )
}
