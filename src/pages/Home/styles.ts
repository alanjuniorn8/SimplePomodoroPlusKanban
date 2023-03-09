import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;

    align-items: center;
  }
`

export const FormContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  width: 100%;

  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;

  padding: 0 0.5rem;

  height: 2.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
export const CountdownContainer = styled.div`
  color: ${(props) => props.theme['gray-100']};
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    border-radius: 8px;

    padding: 2rem 1rem;
  }
`
export const Separator = styled.div`
  color: ${(props) => props.theme['green-500']};

  padding: 2rem 0;
  overflow: hiden;

  display: flex;

  justify-content: center;

  width: 4rem;
`

export const StartCountdownButton = styled.button`
  display: flex;
  gap: 0.5rem;

  align-items: center;
  justify-content: center;

  padding: 1rem;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;

  border: 0;
  border-radius: 8px;
  cursor: pointer;

  width: 100%;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
