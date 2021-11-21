import { useContext } from 'react'
import { TaskContext, TasksContext } from '../Contexts'
import TaskCard from './TaskCard'

export default function TaskList(): JSX.Element {
  const tasks = useContext(TasksContext)

  return (
    <>
      {
        tasks.map(task => (
          <div className='col-md-4 pb-2' key={task.id}>
            <TaskContext.Provider value={task}>
              <TaskCard/>
            </TaskContext.Provider>
          </div>
        ))
      }
    </>
  )
}
