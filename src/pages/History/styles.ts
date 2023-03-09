import styled from 'styled-components'

export const HistoryContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }

  padding: 3.5rem;
`

export const HistoryList = styled.div`
  flex: 1;

  overflow: auto;

  margin-top: 2rem;

  table {
    border-collapse: collapse;

    min-width: 600px;
    width: 100%;

    th {
      background: ${(props) => props.theme['gray-600']};

      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: left;

      padding: 1rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};

      font-size: 0.875rem;
      line-height: 1.6;

      padding: 1rem;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green'
}

export const Status = styled.span<StatusProps>`
  display: flex;
  gap: 0.5rem;

  align-items: center;

  &::before {
    content: '';

    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    border-radius: 9999px;

    height: 0.5rem;
    width: 0.5rem;
  }
`
