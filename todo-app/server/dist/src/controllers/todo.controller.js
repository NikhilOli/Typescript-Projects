"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.getTodo = exports.createTodo = exports.updateTodoStatus = exports.getTodos = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const todos = yield todo_model_1.default.find({ postedBy: req.userId }).populate('postedBy', 'username');
        res.status(200).json({ todos });
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getTodos = getTodos;
const updateTodoStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    let { status } = req.body;
    status = status.trim();
    try {
        const todo = yield todo_model_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        if (!['todo', 'doing', 'done'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        todo.status = status;
        yield todo.save();
        res.status(200).json(todo);
    }
    catch (error) {
        console.error("Error updating todo status", error);
        res.status(500).json({ message: "Error updating todo status" });
    }
});
exports.updateTodoStatus = updateTodoStatus;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo } = req.body;
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newTodo = new todo_model_1.default({ todo, postedBy: req.userId });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        console.error("Error creating todo", error);
        res.status(500).json({ message: "Error creating todo" });
    }
});
exports.createTodo = createTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const todo = yield todo_model_1.default.findById(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json(todo);
    }
    catch (error) {
        console.error("Error getting todo", error);
        res.status(500).json({ message: "Error getting todo" });
    }
});
exports.getTodo = getTodo;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const { todo: updatedTodo } = req.body;
    if (!updatedTodo) {
        return res.status(400).json("Please enter the new updated todo");
    }
    try {
        const existingTodo = yield todo_model_1.default.findById(todoId);
        if (!existingTodo) {
            return res.status(404).json("Todo not found");
        }
        existingTodo.todo = updatedTodo;
        yield existingTodo.save();
        res.status(200).json(existingTodo);
    }
    catch (error) {
        console.error("Error editing todo", error);
        res.status(500).json({ message: "Error editing todo" });
    }
});
exports.editTodo = editTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const todo = yield todo_model_1.default.findByIdAndDelete(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json("Todo deleted successfully");
    }
    catch (error) {
        console.error("Error deleting todo", error);
        res.status(500).json({ message: "Error deleting todo" });
    }
});
exports.deleteTodo = deleteTodo;
