import { ICard, IDraggingCard } from '../../../../models/Card'
import { CardContainer } from './styles'
import { XYCoord, useDrag, useDrop } from 'react-dnd'
import { Trash } from 'phosphor-react'
import React, { useCallback, useEffect, useRef } from 'react'
import { ListType } from '../../../../enums/List'

export default function Card(props: {
  card: ICard
  index: number
  onUpdate: (id: string, task: string, list: ListType) => void
  onDelete: (id: string, list: ListType) => void
  swapCards: (
    movingCardId: number,
    toBeSwapedCardId: number,
    list: ListType,
  ) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {
      from: props.card.list,
      id: props.card.id,
      index: props.index,
      task: props.card.task,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [_, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item: IDraggingCard, monitor) => {
      const draggedCardIndex = item.index
      const hoveredCardIndex = props.index

      const draggedCardList = item.from
      const hoveredCardList = props.card.list

      if (draggedCardIndex === hoveredCardIndex) return
      if (draggedCardList !== hoveredCardList) return

      const isDraggedCardAboveHovered = draggedCardIndex < hoveredCardIndex
      const isDraggedCardBelowHovered = !isDraggedCardAboveHovered

      const mouse = monitor.getClientOffset() as XYCoord

      const hoveredInfo = ref.current?.getBoundingClientRect()
      const hoveredMiddle =
        ((hoveredInfo?.bottom as number) - (hoveredInfo?.top as number)) / 2

      const mouseYRelativeToHovered = mouse.y - (hoveredInfo?.top as number)
      const isMouseYAboveHoveredMiddle = mouseYRelativeToHovered < hoveredMiddle
      const isMouseYBelowHoveredMiddle = mouseYRelativeToHovered > hoveredMiddle

      if (isDraggedCardAboveHovered && isMouseYAboveHoveredMiddle) {
        return
      }

      if (isDraggedCardBelowHovered && isMouseYBelowHoveredMiddle) {
        return
      }

      props.swapCards(draggedCardIndex, hoveredCardIndex, props.card.list)

      item.index = hoveredCardIndex
    },
  })

  const handleTaskChange = useCallback(
    (newTask: string) => {
      props.onUpdate(props.card.id, newTask, props.card.list)
    },
    [props],
  )

  dragRef(dropRef(ref))

  return (
    <CardContainer ref={ref} isDragging={isDragging}>
      <Trash
        size={24}
        onClick={() => props.onDelete(props.card.id, props.card.list)}
      />
      <textarea
        value={props.card.task}
        onChange={(e) => handleTaskChange(e.target.value)}
        onBlur={(e) => handleTaskChange(e.target.value.trim())}
        maxLength={50}
      />
    </CardContainer>
  )
}
