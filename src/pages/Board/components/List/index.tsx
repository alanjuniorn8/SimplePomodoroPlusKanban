import { useDrop } from 'react-dnd'
import { ListContainer } from './styles'

import { Monitor, Plus } from 'phosphor-react'
import { useContext, useRef } from 'react'
import { ListsContext } from '../../../../contexts/ListsContext'
import Card from '../Card'
import { ListType } from '../../../../enums/List'
import { IDraggingCard } from '../../../../models/Card'

export default function List(props: {
  id: string
  addble: boolean
  listType: ListType
  done: boolean
}) {
  const { lists, createCard, updateCard, deleteCard, moveCard, swapCards } =
    useContext(ListsContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop: (draggedItem: IDraggingCard) => {
      if (!draggedItem || draggedItem.from === props.listType) return

      moveCard(draggedItem.from, props.listType, draggedItem.id)
    },
  })

  return (
    <ListContainer ref={dropRef} done={props.done}>
      <header>
        <h2>{props.listType}</h2>
        {props.addble && (
          <button onClick={() => createCard(props.listType)}>
            <Plus size={24} color="#FFF" />
          </button>
        )}
      </header>

      <div>
        <ul>
          {lists[props.listType].cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              card={card}
              onDelete={deleteCard}
              onUpdate={updateCard}
              swapCards={swapCards}
            />
          ))}
        </ul>
      </div>
    </ListContainer>
  )
}
