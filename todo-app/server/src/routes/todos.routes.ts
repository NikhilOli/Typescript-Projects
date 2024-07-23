import { Router } from "express";
import * as TodoController from "../controllers/todo.controller"
import { authMiddleware } from "../middlewares/auth.middleware";
import { todoAuthMiddleware } from "../middlewares/todoAuth.middleware";


export const todosRoutes = Router();

// todosRoutes.use(authMiddleware)
todosRoutes.use(todoAuthMiddleware)

todosRoutes.post("/api/todos", TodoController.createTodo)
todosRoutes.put("/api/todos/:todoId/status", TodoController.updateTodoStatus)
todosRoutes.get("/api/todos", TodoController.getTodos)
todosRoutes.get("/api/todos/:todoId", TodoController.getTodo)
todosRoutes.put("/api/todos/:todoId", TodoController.editTodo)
todosRoutes.delete("/api/todos/:todoId", TodoController.deleteTodo)