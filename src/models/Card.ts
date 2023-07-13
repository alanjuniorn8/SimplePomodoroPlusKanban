import { ListType } from '../enums/List'

export interface ICard {
  id: string
  task: string
  list: ListType
}

export interface IDraggingCard {
  index: number
  id: string
  from: ListType
}
