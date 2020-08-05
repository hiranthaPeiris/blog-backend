"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Todo_model_1 = __importDefault(require("../models/Todo.model"));
var TODOS = [];
exports.createTodo = function (req, res, next) {
    var text = req.body.text;
    var newTodo = new Todo_model_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Todo created", createdTodo: TODOS });
};
