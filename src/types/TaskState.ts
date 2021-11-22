import { Task } from './Task'

export type TaskState = {
  task: Task,
  setTask: React.Dispatch<React.SetStateAction<Task>>,
}