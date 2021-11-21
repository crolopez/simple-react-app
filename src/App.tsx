import React, { useState } from 'react'
import './App.css'
import { Props } from './types/Props'
import { Task } from './types/Task'
import logo from './logo.svg'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { SimpleTask } from './types/SimpleTask'

export function App({ title }: Props) {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Default task',
      description: 'Default task description',
      completed: false,
    },
  ])

  const getNewId = (): number => {
    return new Date().getTime()
  }

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addNewTask = (simpleTask: SimpleTask): void => {
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
            <TaskForm addNewTask={addNewTask}/>
          </div>
          <div className='col-md-8'>
            <div className='row'>
              <TaskList tasks={tasks} deleteTask={deleteTask}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
