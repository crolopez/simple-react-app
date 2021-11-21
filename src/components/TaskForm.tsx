import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { SimpleTask } from '../types/SimpleTask'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type HandleSave = FormEvent<HTMLFormElement>

interface Props {
  addNewTask: (simpleTask: SimpleTask) => void
}

const initialState = {
  title: '',
  description: '',
}

export default function TaskForm({addNewTask}: Props): JSX.Element {
  const [task, setTask] = useState<SimpleTask>(initialState)
  const inputTitle = useRef<HTMLInputElement>(null)

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
