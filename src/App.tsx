import React, { useState } from 'react'
import './App.css'
import { Props } from './types/Props'
import { Task } from './types/Task'
import logo from './logo.svg'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { DeleteTaskContext, TasksContext, TaskStateContext, TaskSubmitHandlerContext, UpdateTaskContext } from './Contexts'
import { defaultTask } from './helpers/defaultTask'

export function App({ title }: Props): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [formTask, setFormTask] = useState<Task>(defaultTask)

  // Component functions
  const getNewId = (): number => {
    return new Date().getTime()
  }

  const addTask = (newTask: Task): void => {
    setTasks([...tasks, newTask])
  }

  const replaceTask = (task: Task): void => {
    setTasks(tasks.map(x => {
      if (x.id !== task.id) return x
      return task
    }))
  }

  // Card component functions
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (task: Task): void => {
    setFormTask(task)
  }

  // Form component functions
  const taskSubmitHandler = (task: Task): void => {
    if (task.id == 0) {
      addTask({ ...task,
        id: getNewId(),
        completed: false,
      })
      return
    }

    replaceTask(task)
  }

  // Render
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
            <TaskSubmitHandlerContext.Provider value={taskSubmitHandler}>
              <TaskStateContext.Provider value={{ task: formTask, setTask: setFormTask }}>
                <TaskForm/>
              </TaskStateContext.Provider>
            </TaskSubmitHandlerContext.Provider>
          </div>
          <div className='col-md-8'>
            <div className='row'>
              <DeleteTaskContext.Provider value={deleteTask}>
                <UpdateTaskContext.Provider value={updateTask}>
                  <TasksContext.Provider value={tasks}>
                    <TaskList/>
                  </TasksContext.Provider>
                </UpdateTaskContext.Provider>
              </DeleteTaskContext.Provider>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
