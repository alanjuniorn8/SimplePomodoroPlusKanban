import styled, { css } from 'styled-components'

interface CardContainerProps {
  isDragging: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
  position: relative;

  background: ${(props) => props.theme['gray-100']};
  border-radius: 5px;

  cursor: grab;

  margin-bottom: 0.6rem;
  padding: 1rem 0.4rem 0.4rem 0.4rem;

  textarea {
    font-weight: bold;
    line-height: 1.6;

    background-color: transparent;

    border: none;
    cursor: inherit;

    height: 70px;
    resize: none;

    width: 100%;

    margin-top: 1rem;
    padding: 0;

    ::-webkit-scrollbar {
      background-color: transparent !important;
      width: 6px;
      margin-right: 1px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent !important;
      margin-right: 1px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme['blue-700']};
      border-radius: 8px;
      margin-right: 1px;
    }
  }

  svg {
    right: 0;
    top: 0;
    margin: 2px;
    padding: 2px;
    position: absolute;
    opacity: 0.6;
  }

  svg:hover {
    opacity: 1;
    transition: all 0.8ms;
  }

  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed ${(props) => props.theme['gray-100']};
      border-radius: 0;
      background: transparent;
      cursor: grabbing;

      textarea {
        opacity: 0;
      }

      svg {
        opacity: 0;
      }
    `};
`

export const Label = styled.div``
