import { HeaderContainer } from './styles'

import { Timer, Scroll, Kanban } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="/" title="Board">
          <Kanban size={24} />
        </NavLink>
        <NavLink to="/Timer" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
