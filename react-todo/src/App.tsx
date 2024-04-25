import React from "react";
import { HashRouter as Router } from "react-router-dom";

import "./App.css";
import TaskView from "./TaskView";

function App() {
  return (
    <div className="App">
      <Router>
        <TaskView />
      </Router>
    </div>
  );
}

export default App;
