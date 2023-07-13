import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { ListsContext } from '../../../../contexts/ListsContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  const { lists } = useContext(ListsContext)

  return (
    <FormContainer>
      <label htmlFor="task">Work on </label>
      <TaskInput
        id="task"
        placeholder="pick a task"
        defaultValue={'pick a task'}
        disabled={!!activeCycle}
        {...register('task')}
      >
        {Object.keys(lists).length > 0 && (
          <>
            <option disabled value={'pick a task'}>
              {'pick a task'}
            </option>
            {lists.ToDo.cards.map((card) => {
              return (
                <option
                  key={card.id}
                  value={`{"cardId": "${card.id}","cardTask": "${card.task}"}`}
                >
                  {card.task}
                </option>
              )
            })}
          </>
        )}
      </TaskInput>

      <label htmlFor="minutesAmount"> for </label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        defaultValue={50}
        step={5}
        min={25}
        max={50}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />
      <span> minutes.</span>
    </FormContainer>
  )
}
