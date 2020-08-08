"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_model_1 = __importDefault(require("../models/Todo.model"));
const TODOS = [];
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new Todo_model_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Todo created", createdTodo: TODOS });
};
exports.getTodos = (req, res, next) => {
    res.status(201).json(TODOS);
};
exports.updateTodos = (req, res, next) => {
    const id = req.params.id;
    const updateText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id == id);
    if (todoIndex < 0)
        throw new Error("not fount");
    TODOS[todoIndex].text = updateText;
    res.status(201).json({ message: "Todo updated", updatedTodo: TODOS });
};
exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id == id);
    if (todoIndex < 0)
        throw new Error("not fount");
    TODOS.splice(todoIndex, 1);
    res.status(201).json({ message: "Todo Deleted", Todo: TODOS });
};
