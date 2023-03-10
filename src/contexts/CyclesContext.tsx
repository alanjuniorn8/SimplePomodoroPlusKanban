import {
  useState,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrrentCycleAction,
  interruptCurrrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
        '@ignite-Timer:cycles-state=1.0.0',
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

    localStorage.setItem('@ignite-Timer:cycles-state=1.0.0', stateJSON)
  }, [cyclesState])

  function setAmountSecondsPassedProxy(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
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
