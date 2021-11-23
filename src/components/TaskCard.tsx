import { useContext } from 'react'
import { DeleteTaskContext, TaskContext, UpdateTaskContext } from '../Contexts'


export default function TaskCard(): JSX.Element {
  const deleteTask = useContext(DeleteTaskContext)
  const updateTask = useContext(UpdateTaskContext)
  const task = useContext(TaskContext)

  return (
    <div className='card card-body bg-primary rounded-0'>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button className='btn btn-warning' onClick={() => updateTask(task)}>
        Update
      </button>
      <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  )
}