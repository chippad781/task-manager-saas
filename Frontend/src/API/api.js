const API = "http://localhost:5000/api"

export const fetchTasks = async () => {
  const res = await fetch(`${API}/tasks`)
  return res.json()
}

export const createTask = async (title) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })

  return res.json()
}