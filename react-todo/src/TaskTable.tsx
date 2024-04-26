import React from "react";
import { Task, TaskAction } from "./TaskInterface";

interface ITaskRow {
  task: Task;
  onDispatch: React.Dispatch<TaskAction>;
}

interface ITaskTable {
  tableData: Task[];
  onDispatch: React.Dispatch<TaskAction>;
}

export default function TaskTable(props: ITaskTable) {
  const taskRows = props.tableData.map((task) => (
    <TableRow key={task.id} onDispatch={props.onDispatch} task={task} />
  ));

  return (
    <React.Fragment>
      <h1>task list</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Done</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>{taskRows}</tbody>
      </table>
    </React.Fragment>
  );
}

function TableRow(taskRow: ITaskRow) {
  const pastDue =
    Date.now() > taskRow.task.dueDate.getTime() &&
    taskRow.task.isDone === false;

  return (
    <tr className={pastDue ? "critical" : ""}>
      <td>{taskRow.task.id}</td>
      <td>{taskRow.task.taskName}</td>
      <td>{taskRow.task.taskPriority.toString()}</td>
      <td>{taskRow.task.dueDate.toDateString()}</td>
      <td>{taskRow.task.isDone ? "Yeah" : "Nooo"}</td>
      <td>
        {taskRow.task.isDone ? (
          <button
            onClick={() => {
              taskRow.onDispatch({ type: "undone", id: taskRow.task.id });
            }}
          >
            Set Undone
          </button>
        ) : (
          <button
            onClick={() => {
              taskRow.onDispatch({ type: "done", id: taskRow.task.id });
            }}
          >
            Set Done
          </button>
        )}
      </td>
      <td>
        <button
          onClick={() => {
            taskRow.onDispatch({ type: "delete", id: taskRow.task.id });
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
