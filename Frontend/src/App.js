import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function App() {

  const API = "http://localhost:5000/api/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const loadStats = async () => {
    const res = await fetch("http://localhost:5000/api/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const addTask = async () => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTasks();
    loadStats();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    loadTasks();
    loadStats();
  };

  const toggleTask = async (id) => {
    await fetch(`${API}/${id}/toggle`, {
      method: "PUT",
    });

    loadTasks();
    loadStats();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

            <button
              onClick={() => toggleTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>

      <h2>Task Analytics</h2>

      <div style={{ width: "300px" }}>
        <Pie
          data={{
            labels: ["Completed", "Pending"],
            datasets: [
              {
                data: [
                  stats.completed,
                  stats.total - stats.completed
                ],
                backgroundColor: ["#4CAF50", "#FF9800"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default App;