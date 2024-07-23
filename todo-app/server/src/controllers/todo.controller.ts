import { RequestHandler, Request } from "express";
import Todo from "../models/todo.model";
import { AuthRequest } from "../types/express";

const getTodos: RequestHandler = async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const todos = await Todo.find({ postedBy: req.userId }).populate('postedBy', 'username');
      res.status(200).json({ todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

const updateTodoStatus: RequestHandler = async (req, res) => {
    const { todoId } = req.params;
    let { status } = req.body;
    status = status.trim();

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        if (!['todo', 'doing', 'done'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        todo.status = status;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo status", error);
        res.status(500).json({ message: "Error updating todo status" });
    }
};

const createTodo: RequestHandler = async (req: AuthRequest, res) => {
    const { todo } = req.body;
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newTodo = new Todo({ todo, postedBy: req.userId });
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error("Error creating todo", error);
      res.status(500).json({ message: "Error creating todo" });
    }
  };

const getTodo: RequestHandler = async (req, res) => {
    const { todoId } = req.params;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error getting todo", error);
        res.status(500).json({ message: "Error getting todo" });
    }
};

const editTodo: RequestHandler = async (req, res) => {
    const { todoId } = req.params;
    const { todo: updatedTodo } = req.body;
    if (!updatedTodo) {
        return res.status(400).json("Please enter the new updated todo");
    }
    try {
        const existingTodo = await Todo.findById(todoId);
        if (!existingTodo) {
            return res.status(404).json("Todo not found");
        }
        existingTodo.todo = updatedTodo;
        await existingTodo.save();
        res.status(200).json(existingTodo);
    } catch (error) {
        console.error("Error editing todo", error);
        res.status(500).json({ message: "Error editing todo" });
    }
};

const deleteTodo: RequestHandler = async (req, res) => {
    const { todoId } = req.params;    
    try {
        const todo = await Todo.findByIdAndDelete(todoId);
        if (!todo) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json("Todo deleted successfully");
    } catch (error) {
        console.error("Error deleting todo", error);
        res.status(500).json({ message: "Error deleting todo" });
    }
};

export { getTodos, updateTodoStatus, createTodo, getTodo, editTodo, deleteTodo };
