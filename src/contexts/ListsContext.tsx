import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ListType } from '../enums/List'
import { ICard } from '../models/Card'

import { v4 as uuidV4 } from 'uuid'

import { swap } from '../utils/swapArrayPositions'

interface IList {
  id: string
  addble: boolean
  listType: ListType
  done: boolean
  cards: ICard[]
}

interface ILists {
  ToDo: IList
  'In Progress': IList
  Done: IList
}

interface ListsContextType {
  lists: ILists
  createCard: (list: ListType) => void
  updateCard: (id: string, task: string, list: ListType) => void
  deleteCard: (id: string, list: ListType) => void
  moveCard: (from: ListType, to: ListType, movingCardId: string) => void
  swapCards: (
    movingCardId: number,
    toBeSwapedCardId: number,
    list: ListType,
  ) => void
}

export const ListsContext = createContext({} as ListsContextType)

interface ListsContextProviderProps {
  children: ReactNode
}

export function ListsContextProvider({ children }: ListsContextProviderProps) {
  const [lists, setLists] = useState<ILists>({} as ILists)

  const store = useCallback((state: ILists) => {
    const stateJSON = JSON.stringify(state)
    localStorage.setItem('@Kanban-Timer:lists-state=1.0.0', stateJSON)
  }, [])

  useEffect(() => {
    const storedListsAsJSON =
      localStorage.getItem('@Kanban-Timer:lists-state=1.0.0') || '{}'
    const storedListsAsObj = JSON.parse(storedListsAsJSON)

    if (storedListsAsObj && Object.keys(storedListsAsObj).length > 0) {
      setLists(storedListsAsObj)
    } else {
      const initialListsState = {
        ToDo: {
          id: uuidV4(),
          addble: true,
          listType: ListType.TODO,
          done: false,
          cards: [
            {
              id: uuidV4(),
              task: 'Todo',
              list: ListType.TODO,
            },
          ],
        },
        'In Progress': {
          id: uuidV4(),
          addble: false,
          listType: ListType.IN_PROGRESS,
          done: false,
          cards: [
            {
              id: uuidV4(),
              task: 'In Progress',
              list: ListType.IN_PROGRESS,
            },
          ],
        },
        Done: {
          id: uuidV4(),
          addble: false,
          listType: ListType.DONE,
          done: true,
          cards: [
            {
              id: uuidV4(),
              task: 'Done',
              list: ListType.DONE,
            },
          ],
        },
      }
      setLists(initialListsState)
    }
  }, [])

  useEffect(() => {
    store(lists)
  }, [lists, store])

  const createCard = useCallback(
    (list: ListType) => {
      setLists((state) => {
        const listState = state[list]
        const listCards = state[list].cards

        if (listCards.length > 20) return state

        const newListCard: ICard = {
          id: uuidV4(),
          list,
          task: `New ${list}`,
        }

        return {
          ...state,
          [list]: {
            ...listState,
            cards: [newListCard, ...listCards],
          },
        }
      })
    },
    [setLists],
  )

  const updateCard = useCallback(
    (id: string, task: string, list: ListType) => {
      setLists((state) => {
        const listState = state[list]
        const listCards = state[list].cards

        return {
          ...state,
          [list]: {
            ...listState,
            cards: listCards.map((card) =>
              card.id === id ? { ...card, task } : card,
            ),
          },
        }
      })
    },
    [setLists],
  )

  const deleteCard = useCallback(
    (id: string, list: ListType) => {
      setLists((state) => {
        const listState = state[list]
        const listCards = state[list].cards

        return {
          ...state,
          [list]: {
            ...listState,
            cards: listCards.filter((card) => card.id !== id),
          },
        }
      })
    },
    [setLists],
  )

  function moveCard(from: ListType, to: ListType, movingCardId: string) {
    setLists((state) => {
      const fromList = state[from]
      const toList = state[to]
      const toListCards = state[to].cards
      const movingCard = fromList.cards.find((card) => card.id === movingCardId)

      if (movingCard) movingCard.list = to

      return {
        ...state,
        [from]: {
          ...fromList,
          cards: fromList.cards.filter((card) => card.id !== movingCardId),
        },
        [to]: {
          ...toList,
          cards: [...toListCards, movingCard],
        },
      }
    })
  }

  function swapCards(
    movingCardId: number,
    toBeSwapedCardId: number,
    list: ListType,
  ) {
    setLists((state) => {
      const listState = state[list]
      return {
        ...state,
        [list]: {
          ...listState,
          cards: swap<ICard>(listState.cards, movingCardId, toBeSwapedCardId),
        },
      }
    })
  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        createCard,
        updateCard,
        deleteCard,
        moveCard,
        swapCards,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}
