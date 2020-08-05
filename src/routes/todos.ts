import { Router } from "express";
import { createTodo } from "../controllers/todoController";

const router = Router();

router.get("/", createTodo);
router.post("/");
router.delete("/:id");
router.patch("/:id");

export default router;
