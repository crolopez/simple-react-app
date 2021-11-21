import { Task } from '../types/Task'

interface Props {
  task: Task,
  deleteTask: (id: number) => void
}

export default function TaskCard({ task, deleteTask }: Props) {
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