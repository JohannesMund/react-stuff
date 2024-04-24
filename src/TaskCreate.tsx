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
      message = message + "Beschreibung darf nicht leer sein. ";
    }
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (currentData.dueDate < now) {
      message = message + "Datum darf nicht in der Vergangenheit liegen. ";
    }

    setInfo(message);
    setHasError(message !== "");
  };

  return (
    <React.Fragment>
      <h1>new task</h1>
      <form className="form" onSubmit={saveTask}>
        <label htmlFor="desc">Aufgabe</label>{" "}
        {/* The for attribute is called htmlFor for consistency with the DOM property API. */}
        <input
          id="desc"
          type="text"
          name="taskName"
          placeholder="Deine Aufgabe..."
          value={data?.taskName}
          onChange={handleInputChange}
        />
        <label htmlFor="prio">Priorität</label>
        <select
          id="prio"
          value={data?.taskPriority}
          onChange={(e) =>
            setData({ ...data, taskPriority: parseInt(e.target.value) } as Task)
          }
        >
          <option value="1">1 - Wichtig</option>
          <option value="2">2 - Irgendwie schon wichtig</option>
          <option value="3">3 - Muss nicht, kann aber</option>
        </select>
        <label htmlFor="dueDate">Ziel-Datum</label>
        <input
          name="dueDate"
          type="date"
          id="dueDate"
          value={formatDateToString(data?.dueDate)} // Formatierung nach string notwendig
          onChange={handleInputChange}
        />
        <label htmlFor="done">Erledigt?</label>
        <input
          name="isDone"
          type="checkbox"
          id="done"
          checked={data?.isDone}
          onChange={handleInputChange}
        />
        <p />
        <input type="submit" value="Erstellen" disabled={hasError} />
        <p />
        {/* String(data?.done) - String umwandlung muss sein, sonst erfolgt keine Ausgabe */}
        {
          <>
            <p />
            <span>Info: {info}</span>
          </>
        }
      </form>
    </React.Fragment>
  );
}
