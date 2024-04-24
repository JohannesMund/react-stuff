import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import { getInitialData } from "./util";
import { Task } from "./interfaces";
import TaskTable from "./TaskTable";
import TaskCreate from "./TaskCreate";

interface IContent {
  tableData: Task[];
  onSave: (task: Task) => void; // Event Handler
  onDone: (id: number, done: boolean) => void; // Event Handler
  onDelete: (id: number) => void; // Event Handler
}

function Navigation() {
  return (
    <div>
      <nav>
        <Link to="Table">[Table]</Link>
        <Link to="Create">[Create]</Link>
      </nav>
    </div>
  );
}

export default function TaskView() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    setTaskList(getInitialData());
  }, []);

  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((eachTask) => eachTask.id !== id));
  };

  const maxTaskId = () => {
    return Math.max(...taskList.map((task) => task.id));
  };

  const nextTaskId = () => {
    return maxTaskId() + 1;
  };

  const handleDone = (id: number, done: boolean) => {
    setTaskList(
      taskList.map((eachTask) => {
        if (eachTask.id === id) {
          eachTask.isDone = done;
        }
        return eachTask;
      })
    );
  };

  const handleSave = (task: Task) => {
    var tasks: Task[] = taskList;
    task.id = nextTaskId();
    tasks.push(task);
    setTaskList(tasks);
  };

  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Content
          tableData={taskList}
          onSave={handleSave}
          onDelete={handleDelete}
          onDone={handleDone}
        />
      </Router>
    </React.Fragment>
  );
}

function Content(props: IContent) {
  return (
    <Routes>
      <Route
        path="Table"
        element={
          <TaskTable
            tableData={props.tableData}
            onDelete={props.onDelete}
            onDone={props.onDone}
          />
        }
      />
      <Route path="Create" element={<TaskCreate onSave={props.onSave} />} />
      <Route
        path="/"
        element={
          /* Default nicht vergessen, dass ist der Start-Pfad. */
          <TaskTable
            tableData={props.tableData}
            onDelete={props.onDelete}
            onDone={props.onDone}
          />
        }
      />
    </Routes>
  );
}
