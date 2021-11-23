import { ChangeEvent, useContext, useRef } from 'react'
import { TaskStateContext, TaskSubmitHandlerContext } from '../Contexts'
import { defaultTask } from '../helpers/defaultTask'

type HandleInputChange = ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export default function TaskForm(): JSX.Element {
  const inputTitle = useRef<HTMLInputElement>(null)
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
    inputTitle.current?.focus()
  }

  const handleClearTask = (e: ButtonClickEvent) => {
    e.preventDefault()
    formTaskState.setTask(defaultTask)
    inputTitle.current?.focus()
  }

  return (
    <div className='card card-body bg-none'>
      <h1>Add Task</h1>

      <form>
        <input name='title' type="text" placeholder='Write a title'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.title}
          autoFocus ref={inputTitle}/>

        <textarea name="description" rows={2} placeholder='Write a description'
          className='form-control mb-3 shadow-none border-0'
          onChange={handleInputChange} value={formTaskState.task.description}/>

        <button className='btn btn-success' onClick={handleTaskSubmit}>
          Save
        </button>
        <button className='btn btn-secondary' onClick={handleTaskSubmit}>
          Update
        </button>
        <button className='btn btn-warning' onClick={handleClearTask}>
          Clear
        </button>
      </form>
    </div>
  )
}
