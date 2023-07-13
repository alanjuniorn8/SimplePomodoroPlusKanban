import { useContext } from 'react'
import List from './components/List'
import { BoardContainer } from './styles'
import { ListsContext } from '../../contexts/ListsContext'

export default function Board() {
  const { lists } = useContext(ListsContext)
  return (
    <BoardContainer>
      {Object.values(lists).map((list) => (
        <List
          key={list.id}
          id={list.id}
          done={list.done}
          addble={list.addble}
          listType={list.listType}
        />
      ))}
    </BoardContainer>
  )
}
