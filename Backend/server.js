const express = require("express")
const cors = require("cors")
const pool = require("./db/db")

const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json())

app.use("/api/tasks", taskRoutes)

const PORT = process.env.PORT || 5000

app.get("/api/stats", async (req, res) => {
  try {
    const total = await pool.query("SELECT COUNT(*) FROM tasks")

    const completed = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE completed=true"
    )

    res.json({
      total: total.rows[0].count,
      completed: completed.rows[0].count
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const authRoutes = require("./routes/authRoutes")
app.use("/api/auth",authRoutes)