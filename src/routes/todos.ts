import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodos,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodos);

export default router;
