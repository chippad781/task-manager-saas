import { useEffect, useState } from "react"
import { fetchTasks, createTask } from "../api/api"

export default function TaskList() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  const loadTasks = async () => {
    const data = await fetchTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const addTask = async () => {
    await createTask(title)
    setTitle("")
    loadTasks()
  }

  return (
    <div>

      <h2>Tasks</h2>

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        {tasks.map(t=>(
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>

    </div>
  )
}