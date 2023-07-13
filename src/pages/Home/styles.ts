import styled from "styled-components";

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
`;

export const WorkingOnSpan = styled.span`
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;

  height: 2.5rem;
`;

const BaseCountdownButton = styled.button`
  display: flex;
  gap: 0.5rem;

  align-items: center;
  justify-content: center;

  padding: 1rem;

  color: ${(props) => props.theme["gray-100"]};
  font-weight: bold;

  border: 0;
  border-radius: 8px;
  cursor: pointer;

  width: 100%;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["blue-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["blue-700"]};
  }
`;
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["red-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`;
