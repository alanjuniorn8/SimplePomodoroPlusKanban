import { StatusContainer } from "./styles";

export default function Status(props: {
  statusColor: "yellow" | "red" | "blue";
  statusLabel: string;
}) {
  return (
    <StatusContainer statusColor={props.statusColor}>
      {props.statusLabel}
    </StatusContainer>
  );
}
