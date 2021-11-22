import React, { useState } from 'react'
import './App.css'
import { Props } from './types/Props'
import { Task } from './types/Task'
import logo from './logo.svg'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { AddNewTaskContext, DeleteTaskContext, TaskContext, TasksContext, TaskStateContext } from './Contexts'
import { defaultTask } from './helpers/defaultTask'

export function App({ title }: Props): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [formTask, setFormTask] = useState<Task>(defaultTask)

  const getNewId = (): number => {
    return new Date().getTime()
  }

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addNewTask = (simpleTask: Task): void => {
    const newTask = {
      ...simpleTask,
      id: getNewId(),
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="bg-dark" style={{height: '100vh'}}>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a href='/' className='navbar-brand'>
            <img src={logo} alt='React logo' style={{width: '4rem'}}/>
            {title}
          </a>
        </div>
      </nav>

      <main className='container p-4'>
        <div className="row">
          <div className='col-md-4'>
            <AddNewTaskContext.Provider value={addNewTask}>
              <TaskStateContext.Provider value={{ task: formTask, setTask: setFormTask }}>
                <TaskForm/>
              </TaskStateContext.Provider>
            </AddNewTaskContext.Provider>
          </div>
          <div className='col-md-8'>
            <div className='row'>
              <DeleteTaskContext.Provider value={deleteTask}>
                <TasksContext.Provider value={tasks}>
                  <TaskList/>
                </TasksContext.Provider>
              </DeleteTaskContext.Provider>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
