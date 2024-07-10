import { Router } from "express";
import * as TodoController from "../controllers/todo.controller"


export const todosRouter = Router();


todosRouter.post("/api/todos", TodoController.createTodo)
todosRouter.put("/api/todos/:todoId/status", TodoController.updateTodoStatus)
todosRouter.get("/api/todos", TodoController.getTodos)
todosRouter.get("/api/todos/:todoId", TodoController.getTodo)
todosRouter.put("/api/todos/:todoId", TodoController.editTodo)
todosRouter.delete("/api/todos/:todoId", TodoController.deleteTodo)