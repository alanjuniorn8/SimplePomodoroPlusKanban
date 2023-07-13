import styled from "styled-components";

interface ListContainerProps {
  done: boolean;
}

export const ListContainer = styled.div<ListContainerProps>`
  flex: 1;
  padding: 0 15px;
  height: 100%;

  header {
    align-items: center;
    justify-content: space-between;

    display: flex;

    height: 42px;

    h2 {
      font-size: 1rem;
      font-weight: bold;
      color: ${(props) => props.theme["gray-100"]};

      padding: 0.5rem;
    }

    button {
      height: 42px;
      width: 42px;

      background: ${(props) => props.theme["blue-700"]};
      border: 0;
      border-radius: 18px;
      cursor: pointer;

      display: flex;

      align-items: center;
      justify-content: center;
    }
  }

  div {
    margin-top: 1rem;
    overflow-y: scroll;
    height: calc(100% - 1rem - 42px);

    ::-webkit-scrollbar {
      background-color: transparent !important;
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent !important;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme["blue-700"]};
      border-radius: 8px;
    }
  }

  ul {
    padding-right: 0.5rem;
    color: ${(props) => props.theme["gray-800"]};
    opacity: ${(props) => (props.done ? 0.6 : 1)};
  }

  & + div {
    border-left: 1px solid ${(props) => props.theme["blue-700"]};
  }
`;
