import { Router } from "express";
import * as TodoController from "../controllers/todo.controller"


export const todosRouter = Router();


todosRouter.post("/api/todos", TodoController.createTodo)
todosRouter.get("/api/todos", TodoController.getTodos)
todosRouter.get("/api/todos/:todoId", TodoController.getTodo)