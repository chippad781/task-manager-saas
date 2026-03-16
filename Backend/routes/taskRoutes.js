const express = require("express")
const router = express.Router()

const {
  getTasks,
  createTask,
  deleteTask,
  toggleTask
} = require("../controllers/taskController")

router.get("/", getTasks)
router.post("/", createTask)
router.delete("/:id", deleteTask)
router.put("/:id/toggle", toggleTask)

module.exports = router