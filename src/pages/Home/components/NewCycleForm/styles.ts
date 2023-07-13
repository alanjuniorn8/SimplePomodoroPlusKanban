import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  width: 100%;

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;

  padding: 0 0.5rem;

  height: 2.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["blue-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const TaskInput = styled.select`
  flex: 1;
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;

  padding: 0 0.5rem;

  height: 2.5rem;

  option {
    background-color: ${(props) => props.theme["gray-700"]};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["blue-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
