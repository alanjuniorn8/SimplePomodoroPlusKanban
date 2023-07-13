import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList } from "./styles";

import enUS from "date-fns/locale/en-US";
import { formatDistanceToNow } from "date-fns";
import Status from "../../components/Status";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Time</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle, índice) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmout} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="blue" statusLabel="Done" />
                    )}

                    {cycle.interruptedDate && (
                      <Status statusColor="red" statusLabel="Interrupted" />
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow" statusLabel="In Progress" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
