import { useContext } from 'react'
import { DeleteTaskContext, TaskContext } from '../Contexts'


export default function TaskCard(): JSX.Element {
  const deleteTask = useContext(DeleteTaskContext)
  const task = useContext(TaskContext)

  return (
    <div className='card card-body bg-primary rounded-0'>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  )
}