import styled from "styled-components";

export const CountdownContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme["gray-700"]};
    border-radius: 8px;

    padding: 2rem 1rem;
  }
`;
export const Separator = styled.div`
  color: ${(props) => props.theme["blue-500"]};

  padding: 2rem 0;
  overflow: hiden;

  display: flex;

  justify-content: center;

  width: 4rem;
`;
