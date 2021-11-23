import { ChangeEvent, useContext, useEffect, useRef } from 'react'
import { TaskStateContext, TaskSubmitHandlerContext } from '../Contexts'
import { defaultTask } from '../helpers/defaultTask'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function TaskForm(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const updateButtonRef = useRef<HTMLButtonElement>(null)
  const inputTitleRef = useRef<HTMLInputElement>(null)
  const taskSubmitHandler = useContext(TaskSubmitHandlerContext)
  const formTaskState = useContext(TaskStateContext)

  const handleInputChange = (event: HandleInputChange) => {
    const {name, value} = event.target
    console.log(`[INPUT] ${name}: ${value}`)
    formTaskState.setTask({...formTaskState.task, [name]: value})
  }

  const handleTaskSubmit = (e: ButtonClickEvent) => {
    e.preventDefault()
    taskSubmitHandler(formTaskState.task)
    formTaskState.setTask(defaultTask)
    inputTitleRef.current?.focus()
  }

  const handleClearTask = (e: ButtonClickEvent) => {
    e.preventDefault()
    formTaskState.setTask(defaultTask)
    inputTitleRef.current?.focus()
  }

  useEffect(() => {
    if (headerRef.current == null
      || saveButtonRef.current == null
      || updateButtonRef.current == null) return

    const newTask = formTaskState.task.id == 0

    headerRef.current.textContent = newTask
      ? 'Create a new task': 'Update the task'
    saveButtonRef.current.hidden = !newTask
    updateButtonRef.current.hidden = newTask
  })

  return (
    <div className='card card-body bg-none'>
      <h1 ref={headerRef}></h1>

      <form>
        <input name='title' type="text" placeholder='Write a title'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.title}
          autoFocus ref={inputTitleRef}/>

        <textarea name="description" rows={2} placeholder='Write a description'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.description}/>

        <button className='btn btn-success' onClick={handleTaskSubmit}
          ref={saveButtonRef}>
          Save
        </button>
        <button className='btn btn-secondary' onClick={handleTaskSubmit}
          ref={updateButtonRef}>
          Update
        </button>
        <button className='btn btn-warning' onClick={handleClearTask}>
          Clear
        </button>
      </form>
    </div>
  )
}
