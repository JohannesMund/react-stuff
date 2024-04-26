export interface Task {
  id: number;
  taskName: string;
  taskPriority: number;
  dueDate: Date;
  isDone: boolean;
}

type TaskState = { tasks: Task[] };
export type TaskAction =
  | { type: "add"; task: Task }
  | { type: "done"; id: number }
  | { type: "undone"; id: number }
  | { type: "delete"; id: number };

export function dispatchFunction(state: TaskState, action: TaskAction) {
  const maxTaskId = () => {
    if (state.tasks.length === 0 || !Array.isArray(state.tasks)) {
      return 0;
    }
    return Math.max(...state.tasks.map((task) => task.id));
  };

  const nextTaskId = () => {
    return maxTaskId() + 1;
  };

  switch (action.type) {
    case "add":
      action.task.id = nextTaskId();
      return { ...state, tasks: [...state.tasks, action.task] };
    case "delete":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.id)],
      };
    case "done":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((t) => {
            if (t.id === action.id) t.isDone = true;
            return t;
          }),
        ],
      };

    case "undone":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((t) => {
            if (t.id === action.id) t.isDone = false;
            return t;
          }),
        ],
      };
    default:
      throw new Error();
  }
}
