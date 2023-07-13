import styled from "styled-components";

const STATUS_COLORS = {
  yellow: "yellow-500",
  blue: "blue-500",
  red: "red-500",
} as const;

interface StatusContainerProps {
  statusColor: "yellow" | "red" | "blue";
}

export const StatusContainer = styled.span<StatusContainerProps>`
  display: flex;
  gap: 0.5rem;

  align-items: center;

  &::before {
    content: "";

    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    border-radius: 9999px;

    height: 0.5rem;
    width: 0.5rem;
  }
`;
