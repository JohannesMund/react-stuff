import React, { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { formatDateToString, setInputChange } from "./util";

interface ITaskCreate {
  onSave: (task: Task) => void; // Event Handler
}

function createTask(desc: string, prio: number): Task {
  console.log("create Task");
  return {
    id: -1,
    taskName: desc,
    dueDate: new Date(),
    taskPriority: prio,
    isDone: false,
  };
}

export default function TaskCreate(props: ITaskCreate) {
  const navigate = useNavigate();

  const [data, setData] = useState<Task>(() => createTask("", 3)); // Initial Wert macht sinn, sonst sind viele Attribute mit undefined belegt.

  const [info, setInfo] = useState("Keine");
  const [hasError, setHasError] = useState(false);

  const saveTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Sorgt dafür das das Submit die Seite nicht neu lädt.

    // Speichern... // Typ von data ist "Task | undefined" daher muss die Absicherung hier sein.
    if (data !== undefined) {
      props.onSave(data);
    }
    // Navigieren zur Erf. Seite
    navigate("/Table");
  };

  // Genereller Handler um Änderungen zu übernehmen.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChange(setData, event);
  };

  React.useEffect(() => {
    validate(data);
  }, [data]);

  const validate = (currentData: Task) => {
    let message = "";
    if (currentData.taskName === "") {
      message = message + "Description cannot be empty.";
    }
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (currentData.dueDate < now) {
      message = message + "Date cannot be in the past";
    }

    setInfo(message);
    setHasError(message !== "");
  };

  return (
    <React.Fragment>
      <h1>new task</h1>
      <form className="form" onSubmit={saveTask}>
        <label htmlFor="desc">Task</label>{" "}
        {/* The for attribute is called htmlFor for consistency with the DOM property API. */}
        <input
          id="desc"
          type="text"
          name="taskName"
          placeholder="Deine Aufgabe..."
          value={data?.taskName}
          onChange={handleInputChange}
        />
        <label htmlFor="prio">Priority</label>
        <select
          id="prio"
          value={data?.taskPriority}
          onChange={(e) =>
            setData({ ...data, taskPriority: parseInt(e.target.value) } as Task)
          }
        >
          <option value="1">1 - Important</option>
          <option value="2">2 - Somewhat important</option>
          <option value="3">
            3 - Let's be honest, nobody will ever do that
          </option>
        </select>
        <label htmlFor="dueDate">Due date</label>
        <input
          name="dueDate"
          type="date"
          id="dueDate"
          value={formatDateToString(data?.dueDate)} // Formatierung nach string notwendig
          onChange={handleInputChange}
        />
        <label htmlFor="done">Done?</label>
        <input
          name="isDone"
          type="checkbox"
          id="done"
          checked={data?.isDone}
          onChange={handleInputChange}
        />
        <p />
        <input type="submit" value="Create" disabled={hasError} />
        <p />
        {info.length !== 0 && (
          <p className="info">
            <em>{info}</em>
          </p>
        )}
      </form>
    </React.Fragment>
  );
}
