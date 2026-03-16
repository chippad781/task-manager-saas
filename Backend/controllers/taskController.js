const pool = require("../db/db")

exports.getTasks = async (req, res) => {
  try {

    const tasks = await pool.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(tasks.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body

    const task = await pool.query(
      "INSERT INTO tasks(title) VALUES($1) RETURNING *",
      [title]
    )

    res.json(task.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    await pool.query("DELETE FROM tasks WHERE id=$1", [id])

    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await pool.query(
      "UPDATE tasks SET completed = NOT completed WHERE id=$1 RETURNING *",
      [id]
    );

    res.json(task.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
