/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { defaultTask } from './helpers/defaultTask'
import { Task } from './types/Task'
import { TaskState } from './types/TaskState'

const dummyAdd = (x: Task): void => {}
export const AddNewTaskContext = React.createContext<(simpleTask: Task) => void>(dummyAdd)

const dummyDelete = (x: number): void => {}
export const DeleteTaskContext = React.createContext<(id: number) => void>(dummyDelete)

export const TasksContext = React.createContext<Task[]>([defaultTask])
export const TaskContext = React.createContext<Task>(defaultTask)

const dummySetTask: React.Dispatch<React.SetStateAction<Task>>
  = (x: React.SetStateAction<Task>) => void {}
const dummyTaskState: TaskState = { task: defaultTask, setTask: dummySetTask }
export const TaskStateContext = React.createContext<TaskState>(dummyTaskState)
