import { RequestHandler } from "express";
import Todo from "../models/Todo.model";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created", createdTodo: TODOS });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(201).json(TODOS);
};

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;

  const updateText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id == id);

  if (todoIndex < 0) throw new Error("not fount");

  TODOS[todoIndex].text = updateText;
  res.status(201).json({ message: "Todo updated", updatedTodo: TODOS });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id == id);

  if (todoIndex < 0) throw new Error("not fount");

  TODOS.splice(todoIndex, 1);
  res.status(201).json({ message: "Todo Deleted", Todo: TODOS });
};
