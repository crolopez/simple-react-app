import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react'
import { AddNewTaskContext, TaskStateContext } from '../Contexts'
import { defaultTask } from '../helpers/defaultTask'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type HandleSave = FormEvent<HTMLFormElement>

export default function TaskForm(): JSX.Element {
  const inputTitle = useRef<HTMLInputElement>(null)
  const addNewTask = useContext(AddNewTaskContext)
  const formTaskState = useContext(TaskStateContext)

  const handleInputChange = (event: HandleInputChange) => {
    const {name, value} = event.target
    console.log(`[INPUT] ${name}: ${value}`)
    formTaskState.setTask({...formTaskState.task, [name]: value})
  }

  const handleNewTask = (event: HandleSave) => {
    event.preventDefault()
    addNewTask(formTaskState.task)
    formTaskState.setTask(defaultTask)
    inputTitle.current?.focus()
  }

  return (
    <div className='card card-body bg-none'>
      <h1>Add Task</h1>

      <form onSubmit={handleNewTask}>
        <input name='title' type="text" placeholder='Write a title'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.title}
          autoFocus ref={inputTitle}/>

        <textarea name="description" rows={2} placeholder='Write a description'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.description}/>

        <button className='btn btn-success'>
          Save
        </button>
      </form>
    </div>
  )
}
