import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react'
import { AddNewTaskContext } from '../Contexts'
import { Task } from '../types/Task'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type HandleSave = FormEvent<HTMLFormElement>

const initialState: Task = {
  id: 0,
  title: '',
  description: '',
  completed: false
}

export default function TaskForm(): JSX.Element {
  const [task, setTask] = useState<Task>(initialState)
  const inputTitle = useRef<HTMLInputElement>(null)
  const addNewTask = useContext(AddNewTaskContext)

  const handleInputChange = (event: HandleInputChange) => {
    const {name, value} = event.target
    console.log(`[INPUT] ${name}: ${value}`)
    setTask({...task, [name]: value})
  }

  const handleNewTask = (event: HandleSave) => {
    event.preventDefault()
    addNewTask(task)
    setTask(initialState)
    inputTitle.current?.focus()
  }

  return (
    <div className='card card-body bg-none'>
      <h1>Add Task</h1>

      <form onSubmit={handleNewTask}>
        <input name='title' type="text" placeholder='Write a title'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={task.title}
          autoFocus ref={inputTitle}/>

        <textarea name="description" rows={2} placeholder='Write a description'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={task.description}/>

        <button className='btn btn-success'>
          Save
        </button>
      </form>
    </div>
  )
}
