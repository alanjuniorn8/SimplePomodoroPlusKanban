import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Timer'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'
import Board from './pages/Board'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Board />} />
        <Route path="/timer" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
