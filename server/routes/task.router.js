import express from "express";
import protect from "../middleware/auth.middleware.js"
import { addTask, editTask, getAllTasks, removeTask, updateTaskStatus } from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", addTask);
router.get("/", getAllTasks);
router.put("/edit/:taskId", editTask);
router.delete("/delete/:taskId", removeTask);
router.patch("/status/:id", updateTaskStatus);

export default router;