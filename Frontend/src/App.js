import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function App() {

  const API = "https://task-manager-saas-production.up.railway.app/api/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const loadStats = async () => {
    const res = await fetch("https://task-manager-saas-production.up.railway.app/api/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

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
  try {
    const res = await fetch(`${API}/${id}/toggle`, {
      method: "PUT",
    });

    if (!res.ok) {
      console.error("Toggle failed");
      return;
    }

    await loadTasks();
    await loadStats();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>Task Manager Dashboard</h1>

        <div style={styles.inputSection}>
          <input
            style={styles.input}
            placeholder="Enter new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button style={styles.addButton} onClick={addTask}>
            Add
          </button>
        </div>

        <div style={styles.card}>

          <h2>Tasks</h2>

          {tasks.length === 0 && (
            <p style={{color:"#888"}}>No tasks yet</p>
          )}

          {tasks.map((task) => (
            <div key={task.id} style={styles.taskRow}>

              <span
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#777" : "#000"
                }}
              >
                {task.title}
              </span>

              <div>

                <button
                  style={styles.toggleBtn}
                  onClick={() => toggleTask(task.id)}
                >
                  ✓
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task.id)}
                >
                  ✕
                </button>

              </div>

            </div>
          ))}

        </div>

        <div style={styles.card}>

          <h2>Analytics</h2>

          <div style={{ width: "250px", margin: "auto" }}>
            <Pie
              data={{
                labels: ["Completed", "Pending"],
                datasets: [
                  {
                    data: [
                      stats.completed,
                      stats.total - stats.completed
                    ],
                    backgroundColor: ["#22c55e", "#f97316"]
                  }
                ]
              }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#f5f7fb",
    display:"flex",
    justifyContent:"center",
    alignItems:"flex-start",
    paddingTop:"50px",
    fontFamily:"Segoe UI"
  },

  container:{
    width:"500px"
  },

  title:{
    textAlign:"center",
    marginBottom:"30px"
  },

  inputSection:{
    display:"flex",
    gap:"10px",
    marginBottom:"20px"
  },

  input:{
    flex:1,
    padding:"12px",
    borderRadius:"8px",
    border:"1px solid #ccc"
  },

  addButton:{
    padding:"12px 18px",
    background:"#2563eb",
    color:"white",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer"
  },

  card:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 5px 15px rgba(0,0,0,0.08)",
    marginBottom:"20px"
  },

  taskRow:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"10px 0",
    borderBottom:"1px solid #eee"
  },

  taskText:{
    fontSize:"16px"
  },

  toggleBtn:{
    marginRight:"8px",
    background:"#22c55e",
    border:"none",
    color:"white",
    padding:"6px 10px",
    borderRadius:"6px",
    cursor:"pointer"
  },

  deleteBtn:{
    background:"#ef4444",
    border:"none",
    color:"white",
    padding:"6px 10px",
    borderRadius:"6px",
    cursor:"pointer"
  }

};

export default App;