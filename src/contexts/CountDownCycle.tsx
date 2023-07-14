import { ReactNode, createContext, useContext, useEffect } from 'react'
import { CyclesContext } from './CyclesContext'
import { differenceInSeconds } from 'date-fns'

interface CountDownContextType {
  minutes: string
  seconds: string
}

export const CountDownContext = createContext({} as CountDownContextType)

interface CountDownContextProviderProps {
  children: ReactNode
}

export function CountDownContextProvider({
  children,
}: CountDownContextProviderProps) {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setAmountSecondsPassedProxy,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountSecondsPassedProxy(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassedProxy(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setAmountSecondsPassedProxy,
  ])

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}
