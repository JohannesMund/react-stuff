import React, { useReducer } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { getInitialData } from "./util";
import { Task, TaskAction, dispatchFunction } from "./TaskInterface";
import TaskTable from "./TaskTable";
import TaskCreate from "./TaskCreate";

interface IContent {
  tableData: Task[];
  onDispatch: React.Dispatch<TaskAction>;
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

function TaskViewContent(props: IContent) {
  return (
    <Routes>
      <Route
        path="Table"
        element={
          <TaskTable
            tableData={props.tableData}
            onDispatch={props.onDispatch}
          />
        }
      />
      <Route
        path="Create"
        element={<TaskCreate onDispatch={props.onDispatch} />}
      />
      <Route
        path="/"
        element={
          <TaskTable
            tableData={props.tableData}
            onDispatch={props.onDispatch}
          />
        }
      />
    </Routes>
  );
}

export default function TaskView() {
  const [state, dispatch] = useReducer(dispatchFunction, {
    tasks: getInitialData(),
  });
  return (
    <React.Fragment>
      <Navigation />
      <TaskViewContent tableData={state.tasks} onDispatch={dispatch} />
    </React.Fragment>
  );
}
