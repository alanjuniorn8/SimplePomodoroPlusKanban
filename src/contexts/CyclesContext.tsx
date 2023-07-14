import {
  useState,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrrentCycleAction,
  interruptCurrrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
import { ListsContext } from './ListsContext'
import { ListType } from '../enums/List'

interface CreateCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleFormData) => void
  interruptCycle: () => void
  markCurrentCycleAsFinished: () => void
  setAmountSecondsPassedProxy: (arg: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@Kanban-Timer:cycles-state=1.0.0',
      )
      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (!activeCycle) return 0

    return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@Kanban-Timer:cycles-state=1.0.0', stateJSON)
  }, [cyclesState])

  const { moveCard } = useContext(ListsContext)

  function setAmountSecondsPassedProxy(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleFormData) {
    const id = String(new Date().getTime())
    const cardJSON = JSON.parse(data.task)
    const cardId = cardJSON.cardId
    const cardTask = cardJSON.cardTask
    const newCycle: Cycle = {
      id,
      task: cardTask,
      minutesAmout: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
    moveCard(ListType.TODO, ListType.IN_PROGRESS, cardId)
  }

  function interruptCycle() {
    dispatch(interruptCurrrentCycleAction())
  }

  function markCurrentCycleAsFinished(): void {
    dispatch(finishCurrrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        interruptCycle,
        markCurrentCycleAsFinished,
        setAmountSecondsPassedProxy,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
