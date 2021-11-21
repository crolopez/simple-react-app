/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react"
import { Task } from "./types/Task"

const dummyAdd = (x: Task): void => {}
export const AddNewTaskContext = React.createContext<(simpleTask: Task) => void>(dummyAdd)

const dummyDelete = (x: number): void => {}
export const DeleteTaskContext = React.createContext<(id: number) => void>(dummyDelete)

const dummyTask: Task = {
  id: 0,
  title: '',
  description: '',
  completed: false
}
export const TasksContext = React.createContext<Task[]>([dummyTask])
export const TaskContext = React.createContext<Task>(dummyTask)
